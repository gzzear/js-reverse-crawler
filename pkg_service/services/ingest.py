"""包裹 upsert：opPackageSearch 响应项 → packages 表。

职责（单一）：把一条 search 响应项写进库，返回变更摘要。轮询 / 触发式拉取共用。

字段过滤：
    - `first_in_time` / `last_out_time` / `inventory_date` 可能是 placeholder
      (1000 / 2147483647000 / -28800000)，写库前清成 None，避免前端拿到假时间
    - `mobile_id` 可能缺失（极少数情况），允许 None
    - 未知字段塞进 `raw` JSON 列，方便后续加展示字段不迁移

幂等：按 `package_id` 主键 upsert。time_ms 更新时 **仅当新值更大** 才写
（防止乱序触发错误覆盖）。
"""
from __future__ import annotations

import logging
from datetime import datetime
from typing import Any

from sqlalchemy import select
from sqlalchemy.orm import Session

from ..config import settings
from ..db.models import Package, UserBind
from . import push_queue

log = logging.getLogger("pkg_service.ingest")

# PDD search 响应里明显的 placeholder：视为 None
_PLACEHOLDER_TIMES = {0, 1000, -28800000, 2147483647000}


def _clean_time(v: Any) -> int | None:
    if v is None:
        return None
    try:
        n = int(v)
    except (TypeError, ValueError):
        return None
    if n in _PLACEHOLDER_TIMES:
        return None
    return n


def _str_or_none(v: Any, max_len: int = 64) -> str | None:
    if v is None:
        return None
    s = str(v)
    if not s or s.lower() in ("null", "none"):
        return None
    return s[:max_len]


def extract_fields(item: dict, station_code: str) -> dict:
    """把 search 响应项转成 Package 列字典。"""
    mobile_masked = _str_or_none(item.get("mobile"), 16)
    mobile_last_four = _str_or_none(item.get("mobile_last_four"), 4)
    if not mobile_last_four and mobile_masked and len(mobile_masked) >= 4:
        mobile_last_four = mobile_masked[-4:]

    return {
        "package_id": str(item["package_id"]),
        "waybill_code": str(item.get("waybill_code") or ""),
        "station_code": _str_or_none(item.get("station_code"), 32) or station_code,
        "mobile_id": _str_or_none(item.get("mobile_id"), 64),
        "mobile_masked": mobile_masked,
        "mobile_last_four": mobile_last_four,
        "customer_name_masked": _str_or_none(item.get("customer_name"), 32),
        "pickup_code": _str_or_none(item.get("pickup_code"), 16),
        "wp_code": _str_or_none(item.get("wp_code"), 16),
        "wp_name": _str_or_none(item.get("wp_name"), 32),
        "waybill_status": item.get("waybill_status"),
        "waybill_status_desc": _str_or_none(item.get("waybill_status_desc"), 32),
        "fulfillment_status": item.get("fulfillment_status"),
        "fulfillment_status_desc": _str_or_none(item.get("fulfillment_status_desc"), 32),
        "stay_days": item.get("stay_days"),
        "first_in_time": _clean_time(item.get("first_in_time")),
        "last_out_time": _clean_time(item.get("last_out_time")),
        "time_ms": _clean_time(item.get("time")),
    }


def upsert_package(db: Session, item: dict, station_code: str) -> tuple[str, Package]:
    """幂等 upsert。返回 ("inserted" | "updated" | "unchanged", Package)。"""
    fields = extract_fields(item, station_code)
    pid = fields["package_id"]

    existing: Package | None = db.execute(
        select(Package).where(Package.package_id == pid)
    ).scalar_one_or_none()

    now = datetime.utcnow()

    if existing is None:
        row = Package(
            **fields,
            raw=item,
            created_at=now,
            updated_at=now,
            has_image=1,          # 保守：允许前端点击拉图，首次 131013 再置 0
            sms_notified=0,
        )
        db.add(row)
        db.flush()
        return ("inserted", row)

    # 只在 time_ms 更大时覆盖状态字段（防止乱序）
    new_ts = fields["time_ms"] or 0
    old_ts = existing.time_ms or 0
    changed = False
    if new_ts >= old_ts:
        for k, v in fields.items():
            if k == "package_id":
                continue
            if getattr(existing, k) != v and v is not None:
                setattr(existing, k, v)
                changed = True
        # raw 始终用最新
        existing.raw = item
    if changed:
        existing.updated_at = now
        db.flush()
        return ("updated", existing)
    return ("unchanged", existing)


def _enqueue_pushes(db: Session, newly_visible: list[str]) -> int:
    """对新插入的、且 mobile_id 命中已绑定用户的包裹，入队推送任务。

    只对"新到件"（waybill_status 属于已入库待通知）推送；其它状态（已取件等）
    跳过。具体枚举见 memory pdd_mdkd_query_enums.md。
    """
    if not newly_visible or not settings.wx_template_new_pkg:
        return 0
    rows = db.execute(
        select(Package).where(Package.package_id.in_(newly_visible))
    ).scalars().all()

    # 查一次所有 mobile_id → [openid] 的映射
    mids = [r.mobile_id for r in rows if r.mobile_id]
    if not mids:
        return 0
    bind_rows = db.execute(
        select(UserBind.openid, UserBind.mobile_id)
        .where(UserBind.mobile_id.in_(mids), UserBind.verified == 1)
    ).all()
    by_mid: dict[str, list[str]] = {}
    for openid, mid in bind_rows:
        by_mid.setdefault(mid, []).append(openid)

    enq_count = 0
    for r in rows:
        if not r.mobile_id:
            continue
        # 已取件/异常等状态跳过；只推"已入库待通知"类（status < 100 按经验）
        # TODO(M4+)：用 memory pdd_mdkd_query_enums.md 的 btn_type 精确判定
        if r.waybill_status and r.waybill_status >= 100:
            continue
        for openid in by_mid.get(r.mobile_id, []):
            job = {
                "package_id": r.package_id,
                "openid": openid,
                "template_id": settings.wx_template_new_pkg,
                "data": {
                    "thing1": {"value": (r.wp_name or "快递") + "包裹已到站"},
                    "character_string2": {"value": r.pickup_code or "见短信"},
                    "time3": {"value": datetime.utcnow().strftime("%Y-%m-%d %H:%M")},
                },
                "page": f"pages/package/detail?pid={r.package_id}",
            }
            if push_queue.enqueue(job):
                enq_count += 1
    return enq_count


def ingest_batch(db: Session, items: list[dict], station_code: str) -> dict:
    """批量 upsert，一次 commit。返回统计。"""
    inserted = updated = unchanged = 0
    newly_visible: list[str] = []
    max_time = 0
    for it in items:
        if not it.get("package_id"):
            continue
        try:
            kind, row = upsert_package(db, it, station_code)
        except Exception:
            log.exception("upsert failed package_id=%s", it.get("package_id"))
            continue
        if kind == "inserted":
            inserted += 1
            newly_visible.append(row.package_id)
        elif kind == "updated":
            updated += 1
        else:
            unchanged += 1
        if row.time_ms and row.time_ms > max_time:
            max_time = row.time_ms
    db.commit()

    pushes = 0
    try:
        pushes = _enqueue_pushes(db, newly_visible)
    except Exception:
        log.exception("enqueue_pushes failed (non-fatal)")

    return {
        "inserted": inserted,
        "updated": updated,
        "unchanged": unchanged,
        "newly_visible": newly_visible,
        "max_time_ms": max_time,
        "total": len(items),
        "pushes_enqueued": pushes,
    }
