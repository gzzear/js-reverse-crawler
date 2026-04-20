"""微信小程序订阅消息推送 —— access_token 缓存 + subscribe/send。

API 参考：
    - 获取 access_token: GET https://api.weixin.qq.com/cgi-bin/token
      ?grant_type=client_credential&appid=X&secret=Y
    - 下发订阅消息: POST https://api.weixin.qq.com/cgi-bin/message/subscribe/send
      ?access_token=Z
      body: {touser, template_id, page, data: {key: {value}}}

access_token TTL 7200s，全局唯一，并发刷会互相覆盖 → Redis `SET NX PX` 锁。
消耗 1 条模板：configure template in WeChat admin → 每次 wx.requestSubscribeMessage
上报接入量 1 条。

本模块是纯函数层。队列消费由 push_dispatcher 调用。
凭证不足 / appid 未配置 → 直接返 False，上层记账。
"""
from __future__ import annotations

import json
import logging
import time
from threading import Lock
from typing import Optional

import redis
import requests

from ..config import settings

log = logging.getLogger("pkg_service.wx_push")

WX_TOKEN_URL = "https://api.weixin.qq.com/cgi-bin/token"
WX_SUBSCRIBE_URL = "https://api.weixin.qq.com/cgi-bin/message/subscribe/send"

TOKEN_KEY = "pkgsvc:wxat:global"
TOKEN_LOCK_KEY = "pkgsvc:wxat:lock"
TOKEN_LOCK_TTL_MS = 5000  # 5s，刷 token 通常 <1s

_rc: Optional[redis.Redis] = None
_rc_lock = Lock()


def _redis() -> Optional[redis.Redis]:
    global _rc
    if _rc is not None:
        return _rc
    with _rc_lock:
        if _rc is not None:
            return _rc
        try:
            c = redis.Redis.from_url(settings.redis_url, decode_responses=True,
                                      socket_connect_timeout=0.5, socket_timeout=0.5)
            c.ping()
            _rc = c
        except Exception as e:
            log.warning("wx_push: redis unavailable (%s)", e)
            _rc = None
    return _rc


def _is_configured() -> bool:
    return bool(settings.wx_appid and settings.wx_secret)


def get_access_token(force: bool = False) -> Optional[str]:
    """返回可用的 access_token；未配置或刷新失败返回 None。

    缓存 TTL = 腾讯返 expires_in - 300s 余量。并发用 Redis 锁避免重复刷。
    """
    if not _is_configured():
        return None

    rc = _redis()
    if rc is not None and not force:
        try:
            cached = rc.get(TOKEN_KEY)
            if cached:
                return cached
        except Exception as e:
            log.warning("wx_push: redis get err: %s", e)

    # 拿锁刷
    locked = False
    if rc is not None:
        try:
            locked = bool(rc.set(TOKEN_LOCK_KEY, "1", nx=True, px=TOKEN_LOCK_TTL_MS))
        except Exception as e:
            log.warning("wx_push: lock err: %s", e)
    if rc is not None and not locked:
        # 别人在刷，等一下再读一次
        time.sleep(0.3)
        try:
            cached = rc.get(TOKEN_KEY)
            if cached:
                return cached
        except Exception:
            pass

    try:
        r = requests.get(
            WX_TOKEN_URL,
            params={
                "grant_type": "client_credential",
                "appid": settings.wx_appid,
                "secret": settings.wx_secret,
            },
            timeout=5.0,
        )
        data = r.json()
    except Exception as e:
        log.exception("wx_push: fetch token err: %s", e)
        return None
    finally:
        if rc is not None and locked:
            try:
                rc.delete(TOKEN_LOCK_KEY)
            except Exception:
                pass

    token = data.get("access_token")
    ttl = int(data.get("expires_in", 0))
    if not token or ttl <= 0:
        log.error("wx_push: bad token response: %s", data)
        return None
    # 留 5min 余量
    ttl_eff = max(60, ttl - 300)
    if rc is not None:
        try:
            rc.setex(TOKEN_KEY, ttl_eff, token)
        except Exception as e:
            log.warning("wx_push: redis setex err: %s", e)
    return token


def send_subscribe_message(
    *,
    openid: str,
    template_id: str,
    data: dict[str, dict],
    page: Optional[str] = None,
) -> tuple[bool, str]:
    """发送一条订阅消息。返回 (ok, reason)。

    data 形如 `{"thing1": {"value": "新包裹到件"}, "time2": {"value": "..."}}`
    按模板配置的字段名决定。
    """
    if not _is_configured():
        return False, "wx_not_configured"

    token = get_access_token()
    if not token:
        return False, "no_access_token"

    body = {
        "touser": openid,
        "template_id": template_id,
        "miniprogram_state": "developer",  # developer/trial/formal
        "lang": "zh_CN",
        "data": data,
    }
    if page:
        body["page"] = page

    try:
        r = requests.post(
            WX_SUBSCRIBE_URL,
            params={"access_token": token},
            data=json.dumps(body, ensure_ascii=False).encode("utf-8"),
            headers={"Content-Type": "application/json"},
            timeout=5.0,
        )
        resp = r.json()
    except Exception as e:
        log.warning("wx_push: send err: %s", e)
        return False, f"net_err:{e}"

    errcode = resp.get("errcode", 0)
    if errcode == 0:
        return True, "ok"

    # 40001 access_token 失效 → 强刷重试一次
    if errcode == 40001:
        log.warning("wx_push: access_token invalid, force refresh")
        token2 = get_access_token(force=True)
        if token2:
            try:
                r2 = requests.post(
                    WX_SUBSCRIBE_URL,
                    params={"access_token": token2},
                    data=json.dumps(body, ensure_ascii=False).encode("utf-8"),
                    headers={"Content-Type": "application/json"},
                    timeout=5.0,
                )
                resp2 = r2.json()
                if resp2.get("errcode", 0) == 0:
                    return True, "ok_after_refresh"
                return False, f"err_{resp2.get('errcode')}:{resp2.get('errmsg')}"
            except Exception as e:
                return False, f"retry_net_err:{e}"

    return False, f"err_{errcode}:{resp.get('errmsg')}"
