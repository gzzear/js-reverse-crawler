"""Redis list-based push job queue。

设计轻量：
    - 入队 `LPUSH pkgsvc:push:queue <json>`
    - 出队 `BRPOP`（dispatcher 阻塞拉）
    - 失败 / 无凭证 → DLQ `LPUSH pkgsvc:push:dlq <json>`
    - 去重 key `pkgsvc:push:sent:{package_id}:{openid}` TTL 7d，避免重复推送

不用 MySQL 表的原因：push 延迟可容忍，数据短寿，Redis 列表够用；
若 Redis 挂了 → 自然降级（新包裹仍然入库，只是不推送）。
"""
from __future__ import annotations

import json
import logging
import time
from typing import Optional

import redis

from ..config import settings
from ..metrics import push_enqueued_total, push_queue_depth

log = logging.getLogger("pkg_service.push_queue")

QUEUE_KEY = "pkgsvc:push:queue"
DLQ_KEY = "pkgsvc:push:dlq"
DEDUP_KEY = "pkgsvc:push:sent:{package_id}:{openid}"
DEDUP_TTL = 7 * 86400

_rc: Optional[redis.Redis] = None
_rc_blocking: Optional[redis.Redis] = None


def _redis() -> Optional[redis.Redis]:
    """短超时（非阻塞操作）客户端。"""
    global _rc
    if _rc is not None:
        return _rc
    try:
        c = redis.Redis.from_url(settings.redis_url, decode_responses=True,
                                  socket_connect_timeout=0.5, socket_timeout=0.5)
        c.ping()
        _rc = c
    except Exception as e:
        log.warning("push_queue: redis unavailable (%s)", e)
        _rc = None
    return _rc


def _redis_blocking() -> Optional[redis.Redis]:
    """BRPOP 专用客户端，socket_timeout 放大到 BRPOP 超时 + 余量。"""
    global _rc_blocking
    if _rc_blocking is not None:
        return _rc_blocking
    try:
        c = redis.Redis.from_url(settings.redis_url, decode_responses=True,
                                  socket_connect_timeout=2.0, socket_timeout=30.0)
        c.ping()
        _rc_blocking = c
    except Exception as e:
        log.warning("push_queue: blocking redis unavailable (%s)", e)
        _rc_blocking = None
    return _rc_blocking


def enqueue(job: dict) -> bool:
    """入队。job 必须含 package_id / openid / template_id / data / page。

    幂等：DEDUP_KEY 已存在时直接返 False。
    """
    rc = _redis()
    if rc is None:
        return False
    dedup = DEDUP_KEY.format(package_id=job["package_id"], openid=job["openid"])
    try:
        ok = rc.set(dedup, "1", nx=True, ex=DEDUP_TTL)
        if not ok:
            return False
        job.setdefault("enqueue_ts", int(time.time()))
        rc.lpush(QUEUE_KEY, json.dumps(job, ensure_ascii=False))
        push_enqueued_total.inc()
        return True
    except Exception as e:
        log.warning("push_queue.enqueue err: %s", e)
        return False


def dequeue(timeout_sec: int = 2) -> Optional[dict]:
    """阻塞出队；timeout 后返 None。"""
    rc = _redis_blocking()
    if rc is None:
        return None
    try:
        item = rc.brpop(QUEUE_KEY, timeout=timeout_sec)
    except redis.exceptions.TimeoutError:
        return None  # 正常 BRPOP 空超时
    except Exception as e:
        log.warning("push_queue.dequeue err: %s", e)
        return None
    if not item:
        return None
    _, payload = item
    try:
        return json.loads(payload)
    except Exception as e:
        log.warning("push_queue: bad payload %s: %s", payload[:80], e)
        return None


def dead_letter(job: dict, reason: str) -> None:
    rc = _redis()
    if rc is None:
        return
    job["fail_reason"] = reason
    job["fail_ts"] = int(time.time())
    try:
        rc.lpush(DLQ_KEY, json.dumps(job, ensure_ascii=False))
    except Exception as e:
        log.warning("push_queue.dlq err: %s", e)


def snapshot() -> dict:
    """队列长度快照，/debug/push 用。"""
    rc = _redis()
    if rc is None:
        return {"redis_connected": False}
    try:
        q = rc.llen(QUEUE_KEY)
        d = rc.llen(DLQ_KEY)
        push_queue_depth.labels(queue="queue").set(q)
        push_queue_depth.labels(queue="dlq").set(d)
        return {
            "redis_connected": True,
            "queue_len": q,
            "dlq_len": d,
        }
    except Exception as e:
        return {"redis_connected": False, "err": str(e)}
