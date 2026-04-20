"""anti-content 的两个 Node pool 工厂。

- `0aq`：通用版本，mdkd /login 用
- `mdkd`：模块 1351 变体，用于 opPackageSearch / reverse / out-image 等 orion 接口

两个 pool 目录都在 `pkg_service/workers_js/` 下，worker.js 接口一致（NDJSON）。
"""
from __future__ import annotations

from pathlib import Path

from .base import NodeWorkerPool

WORKERS_JS_ROOT = Path(__file__).resolve().parents[1] / "workers_js"


def build_0aq_pool(size: int, node_bin: str | None = None) -> NodeWorkerPool:
    worker_js = WORKERS_JS_ROOT / "anti_content_0aq" / "worker.js"
    return NodeWorkerPool(worker_js=worker_js, size=size, node_bin=node_bin)


def build_mdkd_pool(size: int, node_bin: str | None = None) -> NodeWorkerPool:
    """mdkd orion 接口专用 anti-content 变体，走 RiskControlCrawler messagePack。

    每次 generate 必须重建 jsdom，否则 RC 内部缓存会导致后续 token 被风控识别（~359
    字符短 token → 40002）。
    """
    worker_js = WORKERS_JS_ROOT / "anti_content_mdkd" / "worker.js"
    return NodeWorkerPool(worker_js=worker_js, size=size, node_bin=node_bin)
