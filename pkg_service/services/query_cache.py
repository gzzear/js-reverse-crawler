"""C 端查件 Redis 缓存层。

键：
    pkgq:{openid}:{mode}:{raw}:{page}:{page_size}
TTL: 5 min（短，容忍轮询落地后小延迟，换取查件路径不打 DB）。

失效策略：
    - 不主动失效；等 TTL 自然过期。轮询 10min 一次 + 缓存 5min TTL，
      新包裹延迟 ≤ 15min 出现（业务方"10 分钟以上也可以"容忍内）。
    - 命中率 / 未命中计数用内存 Counter 暴露给 Prometheus。

序列化：Pydantic model_dump_json → str；读回来 QueryResponse.model_validate_json。
Redis 连不上时降级直通 DB（log warn，不抛）。
"""
from __future__ import annotations

import hashlib
import logging
from threading import Lock
from typing import Optional

import redis

from ..config import settings
from ..metrics import cache_hits_total, cache_misses_total
from ..schemas import QueryResponse

log = logging.getLogger("pkg_service.query_cache")

CACHE_TTL_SEC = 300  # 5 min
KEY_PREFIX = "pkgq"

_client: Optional[redis.Redis] = None
_client_lock = Lock()


class _Stats:
    """进程内命中统计，/debug/cache 暴露。"""

    def __init__(self) -> None:
        self.hit = 0
        self.miss = 0
        self.err = 0

    def hit_rate(self) -> float:
        total = self.hit + self.miss
        return self.hit / total if total else 0.0

    def snapshot(self) -> dict:
        return {"hit": self.hit, "miss": self.miss, "err": self.err,
                "hit_rate": round(self.hit_rate(), 4)}


stats = _Stats()


def _get_client() -> Optional[redis.Redis]:
    global _client
    if _client is not None:
        return _client
    with _client_lock:
        if _client is not None:
            return _client
        try:
            c = redis.Redis.from_url(
                settings.redis_url,
                decode_responses=True,
                socket_connect_timeout=0.5,
                socket_timeout=0.5,
            )
            c.ping()
            _client = c
            log.info("query_cache: redis connected %s", settings.redis_url)
        except Exception as e:
            log.warning("query_cache: redis unavailable (%s) — bypass", e)
            _client = None
    return _client


def _make_key(openid: str, mode: str, raw: str, page: int, page_size: int) -> str:
    """openid 原样（已限 64 字节）；raw 含连字符/字母，hash 避免键过长 & 注入。"""
    raw_h = hashlib.md5(raw.encode("utf-8")).hexdigest()[:12]
    return f"{KEY_PREFIX}:{openid}:{mode}:{raw_h}:{page}:{page_size}"


def get(openid: str, mode: str, raw: str, page: int, page_size: int) -> Optional[QueryResponse]:
    c = _get_client()
    if c is None:
        return None
    try:
        val = c.get(_make_key(openid, mode, raw, page, page_size))
    except Exception as e:
        stats.err += 1
        log.warning("query_cache.get err: %s", e)
        return None
    if val is None:
        stats.miss += 1
        cache_misses_total.inc()
        return None
    try:
        resp = QueryResponse.model_validate_json(val)
        stats.hit += 1
        cache_hits_total.inc()
        return resp
    except Exception as e:
        stats.err += 1
        log.warning("query_cache.get decode err (drop key): %s", e)
        return None


def set_(openid: str, mode: str, raw: str, page: int, page_size: int, resp: QueryResponse) -> None:
    c = _get_client()
    if c is None:
        return
    try:
        c.setex(
            _make_key(openid, mode, raw, page, page_size),
            CACHE_TTL_SEC,
            resp.model_dump_json(),
        )
    except Exception as e:
        stats.err += 1
        log.warning("query_cache.set err: %s", e)


def clear_all() -> int:
    """调试/运维用：清本服务所有查件缓存键。返回删除条数。"""
    c = _get_client()
    if c is None:
        return 0
    n = 0
    try:
        for k in c.scan_iter(match=f"{KEY_PREFIX}:*", count=500):
            c.delete(k)
            n += 1
    except Exception as e:
        log.warning("query_cache.clear_all err: %s", e)
    return n
