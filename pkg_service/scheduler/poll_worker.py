"""按站点轮询 mdkd opPackageSearch + 增量 upsert。

稳态：每 `poll_interval_sec` 触发一轮 `incremental_poll_all()`，每站拉第一页。
冷启动：站长登录后首次运行，调 `cold_start_station(station_code, days=30)` 一次。
触发式兜底：C 端 `/v1/pkg/query` 接到请求 → 异步调 `on_demand_poll(station_code)`，
30s cooldown 防刷。

Redis key 策略：
    poll:wm:{station_code}         —— 水位线 time_ms（最近一次 upsert 的 max）
    poll:cooldown:{station_code}   —— 触发式 cooldown 标记，TTL=30s

轮询失败不阻塞其他站；连续 5 次失败打告警（log.error），同时 session_mgr 会
把账号标 need_relogin，下一轮自动跳过。
"""
from __future__ import annotations

import logging
import threading
import time
from typing import Optional

import redis as redis_sync

from ..clients.mdkd_client import MdkdApiError, MdkdClient
from ..config import settings
from ..db.session import SessionLocal
from ..services import session_mgr
from ..services.ingest import ingest_batch

log = logging.getLogger("pkg_service.poll_worker")


def _redis() -> redis_sync.Redis:
    return redis_sync.Redis.from_url(settings.redis_url, decode_responses=True)


def _wm_key(station_code: str) -> str:
    return f"pkgsvc:poll:wm:{station_code}"


def _cooldown_key(station_code: str) -> str:
    return f"pkgsvc:poll:cooldown:{station_code}"


def _get_watermark(r: redis_sync.Redis, station_code: str) -> int:
    v = r.get(_wm_key(station_code))
    try:
        return int(v) if v else 0
    except (TypeError, ValueError):
        return 0


def _set_watermark(r: redis_sync.Redis, station_code: str, time_ms: int) -> None:
    if time_ms > 0:
        # SET without TTL — 水位线应该长期保留
        r.set(_wm_key(station_code), str(time_ms))


def _poll_page(
    client: MdkdClient,
    *,
    page_index: int,
    page_size: int,
    stay_days_list: list[int] | None = None,
) -> dict:
    return client.op_package_search(
        stay_days_list=stay_days_list if stay_days_list is not None else [-4],
        page_index=page_index,
        page_size=page_size,
    )


def incremental_poll_station(
    station_code: str,
    *,
    page_size: int = 50,
    max_pages: int = 3,
) -> dict:
    """拉第一页（最多 max_pages 页作为兜底），按 Redis 水位线过滤新项 upsert。

    返回 {fetched, inserted, updated, watermark_before, watermark_after, pages_scanned}
    """
    mgr = session_mgr.get_manager()
    client = mgr.get_client(station_code)
    r = _redis()
    wm_before = _get_watermark(r, station_code)
    wm_after = wm_before

    total_fetched = 0
    total_inserted = 0
    total_updated = 0
    newly_visible: list[str] = []
    pages = 0

    try:
        for page in range(1, max_pages + 1):
            pages = page
            resp = _poll_page(client, page_index=page, page_size=page_size)
            result = resp.get("result") or {}
            items = result.get("detail") or []
            total_fetched += len(items)
            if not items:
                break

            # 过滤 time_ms <= wm_before 的旧项（水位线对齐）
            new_items = [
                it for it in items
                if not wm_before or (int(it.get("time") or 0) > wm_before)
            ]
            if not new_items:
                # 已追到水位线，无需继续翻页
                break

            with SessionLocal() as db:
                stats = ingest_batch(db, new_items, station_code)
            total_inserted += stats["inserted"]
            total_updated += stats["updated"]
            newly_visible.extend(stats["newly_visible"])
            if stats["max_time_ms"] > wm_after:
                wm_after = stats["max_time_ms"]

            # 这一页里还剩没命中水位线的项说明后续全是旧项，停
            if len(new_items) < len(items):
                break

        if wm_after > wm_before:
            _set_watermark(r, station_code, wm_after)

    except MdkdApiError as e:
        log.warning("poll station=%s api err: %s", station_code, e)
        raise
    finally:
        try:
            r.close()
        except Exception:
            pass

    return {
        "station_code": station_code,
        "fetched": total_fetched,
        "inserted": total_inserted,
        "updated": total_updated,
        "newly_visible": newly_visible,
        "pages_scanned": pages,
        "watermark_before": wm_before,
        "watermark_after": wm_after,
    }


def cold_start_station(
    station_code: str,
    *,
    stay_days: int = -90,
    page_size: int = 50,
    max_pages: int = 500,
) -> dict:
    """站长首次接入：分页拉到底，建立 3 个月历史基线。

    默认 `stay_days=-90` 对齐查件 SLA（近 3 个月）。5 站 × ~500包/日 × 90d
    ≈ 22.5 万条，pool=2 的 anti-content 下跑完约 3-5 分钟，可接受的一次性代价。
    """
    mgr = session_mgr.get_manager()
    client = mgr.get_client(station_code)
    r = _redis()
    total_fetched = 0
    total_inserted = 0
    total_updated = 0
    max_time = 0
    pages = 0
    try:
        for page in range(1, max_pages + 1):
            pages = page
            resp = _poll_page(client, page_index=page, page_size=page_size,
                              stay_days_list=[stay_days])
            result = resp.get("result") or {}
            items = result.get("detail") or []
            total_fetched += len(items)
            if not items:
                break
            with SessionLocal() as db:
                stats = ingest_batch(db, items, station_code)
            total_inserted += stats["inserted"]
            total_updated += stats["updated"]
            if stats["max_time_ms"] > max_time:
                max_time = stats["max_time_ms"]
            # PDD 分页满时才继续，否则判到底
            if len(items) < page_size:
                break
        if max_time > 0:
            _set_watermark(r, station_code, max_time)
    finally:
        try:
            r.close()
        except Exception:
            pass
    return {
        "station_code": station_code,
        "fetched": total_fetched,
        "inserted": total_inserted,
        "updated": total_updated,
        "pages_scanned": pages,
        "watermark": max_time,
    }


def on_demand_poll(station_code: str) -> dict | None:
    """触发式拉取：30s cooldown 内直接跳过。"""
    r = _redis()
    key = _cooldown_key(station_code)
    try:
        if not r.set(key, "1", nx=True, ex=settings.on_demand_cooldown_sec):
            return None  # 在 cooldown 期内
    finally:
        r.close()
    return incremental_poll_station(station_code)


def _ensure_baseline(station_code: str) -> None:
    """没有水位线 → 视为新站，先拉 90 天基线再进入稳态轮询。

    已有水位线的站直接跳过，所以重启服务不会重复冷启动。
    """
    r = _redis()
    try:
        wm = _get_watermark(r, station_code)
    finally:
        try:
            r.close()
        except Exception:
            pass
    if wm > 0:
        return
    log.info("station=%s no baseline watermark → cold_start(-90d)", station_code)
    try:
        stats = cold_start_station(station_code, stay_days=-90)
        log.info("cold_start %s done → %s", station_code, stats)
    except Exception:
        log.exception("cold_start %s failed — 稳态轮询会继续，但历史缺口需手动补",
                      station_code)


class PollWorker:
    """后台周期轮询线程（所有站点）。"""

    def __init__(self, stations: list[str] | None = None) -> None:
        self._stop = threading.Event()
        self._thread: threading.Thread | None = None
        self._stations = stations or []

    def set_stations(self, stations: list[str]) -> None:
        self._stations = list(stations)

    def start(self) -> None:
        if self._thread is not None:
            return
        self._stop.clear()
        t = threading.Thread(target=self._run, name="poll-worker", daemon=True)
        t.start()
        self._thread = t

    def stop(self) -> None:
        self._stop.set()
        if self._thread is not None:
            self._thread.join(timeout=10)
            self._thread = None

    def _run(self) -> None:
        interval = settings.poll_interval_sec
        # 启动时对每站做一次 baseline 检查（水位线为 0 → 冷启动拉 90 天）
        for st in list(self._stations):
            if self._stop.is_set():
                return
            try:
                _ensure_baseline(st)
            except Exception:
                log.exception("baseline check station=%s failed", st)
        while not self._stop.is_set():
            for st in list(self._stations):
                if self._stop.is_set():
                    break
                try:
                    stats = incremental_poll_station(st)
                    log.info("poll %s → %s", st, {k: v for k, v in stats.items()
                                                    if k != "newly_visible"})
                except Exception:  # noqa: BLE001
                    log.exception("poll station=%s failed", st)
            # 分散心跳：sleep interval 秒，但每秒检查 stop
            for _ in range(interval):
                if self._stop.is_set():
                    break
                time.sleep(1)


_worker: Optional[PollWorker] = None


def bootstrap(stations: list[str]) -> PollWorker:
    global _worker
    if _worker is None:
        _worker = PollWorker(stations=stations)
    else:
        _worker.set_stations(stations)
    _worker.start()
    return _worker


def shutdown() -> None:
    global _worker
    if _worker is not None:
        _worker.stop()


def get_worker() -> PollWorker:
    if _worker is None:
        raise RuntimeError("poll_worker not bootstrapped")
    return _worker
