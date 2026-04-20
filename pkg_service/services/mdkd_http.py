"""mdkd 出站 HTTP 代理统一接入点。

ECS 机房 IP 发短信 / 登录会被 PDD 风控（40001 / 4000003 / 拒 SMS 下发），
所有 mdkd-api.pinduoduo.com 的出站流量都必须走住宅 / 家宽静态 IP 代理。

两种配置模式（config.py / .env）：

**模式 A · 静态 URL**：`MDKD_PROXY=http://user:pass@ip:port`
    固定 IP 套餐（独享 / 长效静态 / 隧道 tpsXXXX.kdlapi.com）直接填。

**模式 B · 动态 API**：快代理 "私密代理 kps"
    `MDKD_PROXY_FETCH_URL=https://kps.kdlapi.com/api/getkps/?secret_id=...&signature=...&num=1&sep=1`
    `MDKD_PROXY_USER=<代理用户名>`  `MDKD_PROXY_PASS=<代理密码>`
    启动/首次调用时向 fetch_url 拉 1 个 IP，拼 user:pass 鉴权，
    缓存 TTL 秒内复用 —— 同一个 IP 能跨 send_sms+login_sms 两次调用
    （state 里也快照存 IP，跨进程也能复用）。

invalidate() 用于上游报 40001 / 连接失败时强制下次刷新。

统一入口，3 处使用：
    - clients/mdkd_client.py       —— 查件 session
    - services/mdkd_login.py       —— 密码 + 短信登录 session
    - services/mdkd_sms_flow.py    —— 两段式登录 session
"""
from __future__ import annotations

import logging
import threading
import time
from typing import Optional

import requests

from ..config import settings

log = logging.getLogger("pkg_service.mdkd_http")


_lock = threading.Lock()
_cached_url: Optional[str] = None
_cached_at: float = 0.0


def _fetch_dynamic_url() -> str:
    """调 MDKD_PROXY_FETCH_URL 拉 1 个 IP，拼上 user:pass 认证。"""
    url = settings.mdkd_proxy_fetch_url
    if not url:
        raise RuntimeError("MDKD_PROXY_FETCH_URL not configured")
    r = requests.get(url, timeout=10)
    r.raise_for_status()
    ip_port = r.text.strip()
    # 快代理 API 失败会返 JSON {"code": xxx, "msg": ...}；成功是纯 "ip:port"
    if not ip_port or ":" not in ip_port or ip_port.startswith("{"):
        raise RuntimeError(f"proxy fetch returned unexpected body: {ip_port[:200]!r}")
    user = settings.mdkd_proxy_user
    pwd = settings.mdkd_proxy_pass
    if user and pwd:
        return f"http://{user}:{pwd}@{ip_port}"
    return f"http://{ip_port}"


def _get_proxy_url() -> Optional[str]:
    """返回当前要用的 proxy URL（静态 > 动态 > 无）。"""
    # 模式 A：静态 URL 优先
    if settings.mdkd_proxy:
        return settings.mdkd_proxy

    # 模式 B：动态 API（缓存 TTL 内复用）
    if not settings.mdkd_proxy_fetch_url:
        return None

    global _cached_url, _cached_at
    ttl = max(60, settings.mdkd_proxy_ttl_sec)
    now = time.time()
    if _cached_url and (now - _cached_at) < ttl:
        return _cached_url
    with _lock:
        if _cached_url and (time.time() - _cached_at) < ttl:
            return _cached_url
        fresh = _fetch_dynamic_url()
        _cached_url = fresh
        _cached_at = time.time()
        # 日志不打印认证串，只打 IP
        ip_part = fresh.split("@", 1)[-1] if "@" in fresh else fresh
        log.info("fetched fresh MDKD proxy IP=%s (ttl=%ds)", ip_part, ttl)
        return fresh


def invalidate() -> None:
    """强制下次 get_proxies() 重新拉。上游 40001 / 连接失败时调。"""
    global _cached_url, _cached_at
    with _lock:
        _cached_url = None
        _cached_at = 0.0
        log.info("mdkd proxy cache invalidated")


def get_proxies() -> Optional[dict]:
    """返回 requests.proxies dict 或 None（未配置 → 直连）。"""
    url = _get_proxy_url()
    if not url:
        return None
    return {"http": url, "https": url}


def current_url() -> Optional[str]:
    """诊断用：不触发 fetch，只返回当前缓存的 URL。"""
    if settings.mdkd_proxy:
        return settings.mdkd_proxy
    return _cached_url


def apply(session: requests.Session) -> requests.Session:
    """给传入 session 打上代理设置（若已配置）。返回原 session 方便链式调用。"""
    proxies = get_proxies()
    if proxies:
        session.proxies.update(proxies)
    return session


def new_session() -> requests.Session:
    """建新 Session 并应用代理（无 cookies，cookies 由调用方设置）。"""
    return apply(requests.Session())
