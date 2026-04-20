"""仅供运维/开发排障的内部路由，不对 C 端暴露。

M1 验收：`GET /debug/accounts` 看 5 个账号 status=ok。

TODO 线上部署要加 API key 保护；目前只做本地验收。
"""
from __future__ import annotations

from fastapi import APIRouter

from ..node_worker import registry
from ..services import push_queue, query_cache, session_mgr

router = APIRouter(prefix="/debug", tags=["debug"])


@router.get("/accounts")
def list_accounts() -> dict:
    """返回账号池快照，sub_pass_id 只露头尾。"""
    mgr = session_mgr.get_manager()
    accounts = mgr.list_accounts()
    summary = {
        "total": len(accounts),
        "ok": sum(1 for a in accounts if a["status"] == 0),
        "need_relogin": sum(1 for a in accounts if a["status"] == 1),
        "disabled": sum(1 for a in accounts if a["status"] == 2),
    }
    return {"summary": summary, "accounts": accounts}


@router.get("/pools")
def list_pools() -> dict:
    """Node worker pool 状态（名字列表）。"""
    return {"pools": registry.names()}


@router.get("/health")
def health() -> dict:
    return {"ok": True}


@router.get("/cache")
def cache_stats() -> dict:
    """查件 Redis 缓存命中统计 + Redis 连接状态。"""
    c = query_cache._get_client()
    return {
        "redis_connected": c is not None,
        "stats": query_cache.stats.snapshot(),
        "ttl_sec": query_cache.CACHE_TTL_SEC,
    }


@router.post("/cache/clear")
def cache_clear() -> dict:
    n = query_cache.clear_all()
    return {"deleted": n}


@router.get("/push")
def push_stats() -> dict:
    """推送队列快照（长度 + DLQ）。"""
    return push_queue.snapshot()
