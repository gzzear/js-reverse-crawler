"""pkg_service FastAPI 入口。

启动顺序：
    1. node_worker.registry.bootstrap() → 拉起 0aq + mdkd 两个 Node pool
    2. db.session.init_schema() → create_all（首次部署）
    3. services.session_mgr.bootstrap() → 从 DB 加载账号到内存 + 启 refresher 线程

关停反向执行。
"""
from __future__ import annotations

import logging
from contextlib import asynccontextmanager

from fastapi import FastAPI, Response
from prometheus_client import CONTENT_TYPE_LATEST, generate_latest

from .config import settings
from .db.session import init_schema
from .node_worker import registry
from .routers import admin as admin_router
from .routers import bind as bind_router
from .routers import debug as debug_router
from .routers import image as image_router
from .routers import pkg_query as pkg_query_router
from .routers import push as push_router
from .scheduler import poll_worker
from .services import push_dispatcher, session_mgr

logging.basicConfig(
    level=getattr(logging, settings.log_level.upper(), logging.INFO),
    format="%(asctime)s %(levelname)s %(name)s %(message)s",
)
log = logging.getLogger("pkg_service.main")


@asynccontextmanager
async def lifespan(app: FastAPI):
    log.info("pkg_service starting up ...")
    registry.bootstrap(pool_size=settings.pool_size, node_bin=settings.node_bin)
    try:
        init_schema()
    except Exception:
        log.exception("init_schema failed — continuing anyway so /debug/health still works")
    try:
        session_mgr.bootstrap()
    except Exception:
        log.exception("session_mgr.bootstrap failed — accounts won't be usable until fixed")
    try:
        push_dispatcher.bootstrap()
    except Exception:
        log.exception("push_dispatcher.bootstrap failed — pushes won't be delivered")
    try:
        stations = session_mgr.get_manager().list_station_codes()
        if stations:
            poll_worker.bootstrap(stations=stations)
            log.info("poll_worker bootstrapped for stations=%s", stations)
        else:
            log.warning("no stations loaded — poll_worker not started (add mdkd_account first)")
    except Exception:
        log.exception("poll_worker.bootstrap failed — 增量轮询未启动，查件数据会停更")
    log.info("pkg_service started. pools=%s", registry.names())
    yield
    log.info("pkg_service shutting down ...")
    poll_worker.shutdown()
    push_dispatcher.shutdown()
    session_mgr.shutdown()
    registry.shutdown()
    log.info("pkg_service shutdown complete.")


app = FastAPI(title="pkg_service", version="0.1.0", lifespan=lifespan)
app.include_router(debug_router.router)
app.include_router(pkg_query_router.router)
app.include_router(bind_router.router)
app.include_router(image_router.router)
app.include_router(push_router.router)
app.include_router(admin_router.router)


@app.get("/metrics", include_in_schema=False)
def metrics_endpoint() -> Response:
    """Prometheus scrape endpoint."""
    return Response(content=generate_latest(), media_type=CONTENT_TYPE_LATEST)
