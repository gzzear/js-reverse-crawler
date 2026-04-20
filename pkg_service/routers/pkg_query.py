"""C 端查件 API：4 种输入模式 + 脱敏输出。

延迟要求（plan SLO）：
    p95 ≤ 200ms, p99 ≤ 400ms

实现约束：
    - 只查 MySQL 索引（无 Redis 缓存先跑起来，后续 M5 再加）
    - 绝不在请求路径里调上游 mdkd API
    - waybill_full / mobile_full 命中索引；waybill_tail5 / pickup_code 有
      station_code 组合索引兜底
"""
from __future__ import annotations

import logging
import time

from fastapi import APIRouter, BackgroundTasks, Depends, HTTPException
from sqlalchemy import select, func
from sqlalchemy.orm import Session

from ..db.models import Package
from ..db.session import get_db
from ..metrics import query_latency_seconds, query_requests_total
from ..scheduler import poll_worker
from ..schemas import (
    PackageItem,
    QueryMode,
    QueryRequest,
    QueryResponse,
    classify_query,
)
from ..services import bind_service, query_cache

router = APIRouter(prefix="/v1/pkg", tags=["pkg_query"])

log = logging.getLogger("pkg_service.pkg_query")

# 查件窗口：近 90 天（对齐产品决策：只跟 3 个月数据）
QUERY_WINDOW_MS = 90 * 86400 * 1000
# 手机号模式一次最多返回 100 条（产品决策：一页展示最近 100 条）
MOBILE_FULL_MAX_PAGE_SIZE = 100


def _row_to_item(r: Package) -> PackageItem:
    return PackageItem(
        package_id=r.package_id,
        waybill_code=r.waybill_code,
        station_code=r.station_code,
        wp_name=r.wp_name,
        wp_code=r.wp_code,
        pickup_code=r.pickup_code,
        waybill_status=r.waybill_status,
        waybill_status_desc=r.waybill_status_desc,
        stay_days=r.stay_days,
        first_in_time=r.first_in_time,
        last_out_time=r.last_out_time,
        time_ms=r.time_ms,
        mobile_masked=r.mobile_masked,
        mobile_last_four=r.mobile_last_four,
        customer_name_masked=r.customer_name_masked,
        has_image=bool(r.has_image),
    )


def _query_by_mode(
    db: Session,
    *,
    mode: QueryMode,
    raw: str,
    openid: str,
    page: int,
    page_size: int,
) -> tuple[int, list[Package], set[str]]:
    """返回 (total, rows, stations_touched) — stations_touched 用于触发式兜底拉取。"""
    # 90 天时间窗统一过滤
    cutoff = int(time.time() * 1000) - QUERY_WINDOW_MS
    q = select(Package).where(Package.time_ms >= cutoff)
    count_q = select(func.count(Package.package_id)).where(Package.time_ms >= cutoff)
    stations_touched: set[str] = set()

    if mode == "waybill_full":
        q = q.where(Package.waybill_code == raw)
        count_q = count_q.where(Package.waybill_code == raw)

    elif mode == "waybill_tail5":
        # 后 5 位 LIKE '%xxxxx'；必须附带 station_code 过滤免全表扫
        stations = bind_service.get_user_stations(db, openid)
        if not stations:
            # 无绑定站点直接拒绝（防止全表扫）
            return 0, [], stations_touched
        stations_touched.update(stations)
        q = q.where(Package.waybill_code.like(f"%{raw}"), Package.station_code.in_(stations))
        count_q = count_q.where(Package.waybill_code.like(f"%{raw}"), Package.station_code.in_(stations))

    elif mode == "mobile_full":
        ids = bind_service.get_user_mobile_ids(db, openid)
        stations = bind_service.get_user_stations(db, openid)
        stations_touched.update(stations)
        if ids:
            q = q.where(Package.mobile_id.in_(ids))
            count_q = count_q.where(Package.mobile_id.in_(ids))
        else:
            # 未绑定/未 verified → 退回 mobile_last_four，限制到用户绑过的站点
            tail = raw[-4:]
            if not stations:
                # 彻底无历史 → 禁止返回（plan 禁 mobile_last_four 开放查询）
                return 0, [], stations_touched
            q = q.where(Package.mobile_last_four == tail, Package.station_code.in_(stations))
            count_q = count_q.where(Package.mobile_last_four == tail,
                                    Package.station_code.in_(stations))

    elif mode == "pickup_code":
        stations = bind_service.get_user_stations(db, openid)
        if not stations:
            return 0, [], stations_touched
        stations_touched.update(stations)
        q = q.where(Package.pickup_code == raw, Package.station_code.in_(stations))
        count_q = count_q.where(Package.pickup_code == raw, Package.station_code.in_(stations))

    else:
        return 0, [], stations_touched

    q = q.order_by(Package.time_ms.desc()).offset((page - 1) * page_size).limit(page_size)
    total = db.execute(count_q).scalar_one()
    rows = db.execute(q).scalars().all()
    return total, rows, stations_touched


def _trigger_on_demand(stations: set[str]) -> None:
    """后台线程里异步触发各站点的 on_demand_poll（30s cooldown 自控防刷）。"""
    for st in stations:
        try:
            poll_worker.on_demand_poll(st)
        except Exception:
            log.exception("on_demand_poll station=%s failed (异步容错)", st)


@router.post("/query", response_model=QueryResponse)
def query_packages(
    req: QueryRequest,
    bg: BackgroundTasks,
    db: Session = Depends(get_db),
) -> QueryResponse:
    t0 = time.time()
    mode = classify_query(req.query)
    if mode is None:
        query_requests_total.labels(mode="unknown", result="bad_input").inc()
        raise HTTPException(
            status_code=400,
            detail="输入格式不支持（支持：完整运单号 11-18 位 / 后 5 位 / 手机 11 位 / 取件码）",
        )

    # 手机号模式：page_size 放到 100；其它模式保留用户传入（默认 20）
    page_size = req.page_size
    if mode == "mobile_full" and page_size < MOBILE_FULL_MAX_PAGE_SIZE:
        page_size = MOBILE_FULL_MAX_PAGE_SIZE

    cached = query_cache.get(req.openid, mode, req.query, req.page, page_size)
    if cached is not None:
        dt = time.time() - t0
        query_latency_seconds.labels(mode=mode).observe(dt)
        query_requests_total.labels(mode=mode, result="hit").inc()
        log.info("query HIT mode=%s openid=%s total=%d took=%.1fms",
                 mode, req.openid[:8], cached.total, dt * 1000)
        return cached

    total, rows, stations_touched = _query_by_mode(
        db,
        mode=mode,
        raw=req.query,
        openid=req.openid,
        page=req.page,
        page_size=page_size,
    )
    resp = QueryResponse(
        mode=mode,
        total=total,
        page=req.page,
        page_size=page_size,
        items=[_row_to_item(r) for r in rows],
    )
    query_cache.set_(req.openid, mode, req.query, req.page, page_size, resp)

    # 异步兜底：查的同时踢一下 on_demand_poll，30s cooldown 自控防刷
    # 不阻塞响应 — 下一次查件时才能看到新增件
    if stations_touched:
        bg.add_task(_trigger_on_demand, stations_touched)

    dt = time.time() - t0
    query_latency_seconds.labels(mode=mode).observe(dt)
    query_requests_total.labels(mode=mode, result="miss").inc()
    log.info("query MISS mode=%s openid=%s total=%d took=%.1fms",
             mode, req.openid[:8], total, dt * 1000)
    return resp


@router.get("/classify")
def classify(q: str) -> dict:
    """前端调试用：给输入返回识别出的 mode（无/错误时返 null）。"""
    return {"query": q, "mode": classify_query(q)}
