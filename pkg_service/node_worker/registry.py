"""算法 pool 全局注册表（pkg_service 精简版：只保留 0aq + mdkd）。

启动时调 `bootstrap()` 起所有 pool；关闭时调 `shutdown()`。
pool_size / node_bin 从 config.py 读取，没配就用默认（size=2，node=which node）。
"""
from __future__ import annotations

import os
from typing import Dict

from .anti_content import build_0aq_pool, build_mdkd_pool
from .base import NodeWorkerPool

_POOLS: Dict[str, NodeWorkerPool] = {}


def _env_int(name: str, default: int) -> int:
    val = os.getenv(name)
    if val is None:
        return default
    try:
        return int(val)
    except ValueError:
        return default


def bootstrap(pool_size: int | None = None, node_bin: str | None = None) -> None:
    if _POOLS:
        return
    size = pool_size if pool_size is not None else _env_int("POOL_SIZE", 2)
    node = node_bin or os.getenv("NODE_BIN") or None
    _POOLS["anti_content_0aq"] = build_0aq_pool(size=size, node_bin=node)
    _POOLS["anti_content_mdkd"] = build_mdkd_pool(size=size, node_bin=node)
    for pool in _POOLS.values():
        pool.start()


def shutdown() -> None:
    for pool in _POOLS.values():
        pool.stop()
    _POOLS.clear()


def get(name: str) -> NodeWorkerPool:
    pool = _POOLS.get(name)
    if pool is None:
        raise KeyError(f"unknown pool: {name}; call bootstrap() first")
    return pool


def get_0aq_pool() -> NodeWorkerPool:
    return get("anti_content_0aq")


def get_mdkd_pool() -> NodeWorkerPool:
    return get("anti_content_mdkd")


def names() -> list[str]:
    return list(_POOLS.keys())
