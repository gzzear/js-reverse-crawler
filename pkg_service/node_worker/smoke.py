"""node_worker smoke test：验证 0aq + mdkd pool 能各起一个实例并生成合法 anti-content。

用法：
    python -m pkg_service.node_worker.smoke

预期：
    0aq → "0aq..." 开头，至少 400 字符（memory pdd_mdkd_anti_content_0aq.md）
    mdkd → "0aq..." 开头，约 410 字符
"""
from __future__ import annotations

import sys
import time

from . import registry


def run() -> int:
    print("bootstrapping pools ...", flush=True)
    t0 = time.time()
    registry.bootstrap(pool_size=1)
    print(f"boot ok ({time.time() - t0:.2f}s). pools={registry.names()}", flush=True)

    try:
        ok = True
        for name in ("anti_content_0aq", "anti_content_mdkd"):
            t0 = time.time()
            res = registry.get(name).call({})
            dt_ms = (time.time() - t0) * 1000
            tok = res.get("anti_content", "")
            head = tok[:30] + "..." if len(tok) > 30 else tok
            status = "ok" if isinstance(tok, str) and tok.startswith("0aq") and len(tok) >= 300 else "BAD"
            print(f"  {name:22s} [{status:3s}] len={len(tok)} time={dt_ms:.0f}ms head={head!r}", flush=True)
            if status != "ok":
                ok = False
        return 0 if ok else 1
    finally:
        print("shutting down ...", flush=True)
        registry.shutdown()


if __name__ == "__main__":
    sys.exit(run())
