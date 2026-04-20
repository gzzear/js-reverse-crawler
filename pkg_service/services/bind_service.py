"""openid ↔ mobile ↔ mobile_id 绑定解析。

核心流程 `resolve_mobile_id`：
    1. 查 user_bind 已有且 verified=1 → 直接返 mobile_id
    2. 否则去 pkg_packages 扫 mobile_last_four 命中的候选包裹
    3. 对候选 package_id 调 opPackageReverse，明文 mobile 和输入对比
    4. 对上 → 拿到 mobile_id，写 user_bind.verified=1
    5. 对不上/没有候选 → 写 user_bind.verified=0，等后续轮询新包裹再试

reverse 走哪个账号？：每条 package 有 station_code → 拿该 station 的账号客户端
就近调，避免跨站风控。
"""
from __future__ import annotations

import logging
from datetime import datetime

from sqlalchemy import select
from sqlalchemy.orm import Session

from ..clients.mdkd_client import MdkdApiError
from ..db.models import Package, UserBind
from . import session_mgr

log = logging.getLogger("pkg_service.bind_service")


class BindError(RuntimeError):
    pass


def _pick_candidate_packages(db: Session, mobile: str, limit: int = 5) -> list[Package]:
    """按 mobile_last_four 找候选包裹。返回按 time_ms DESC 最多 limit 条。"""
    tail = mobile[-4:]
    return db.execute(
        select(Package)
        .where(Package.mobile_last_four == tail)
        .order_by(Package.time_ms.desc())
        .limit(limit)
    ).scalars().all()


def _existing_bind(db: Session, openid: str, mobile: str) -> UserBind | None:
    return db.execute(
        select(UserBind).where(UserBind.openid == openid, UserBind.mobile == mobile)
    ).scalar_one_or_none()


def _upsert_bind(
    db: Session,
    *,
    openid: str,
    mobile: str,
    mobile_id: str | None,
    verified: bool,
) -> UserBind:
    row = _existing_bind(db, openid, mobile)
    now = datetime.utcnow()
    if row is None:
        row = UserBind(
            openid=openid,
            mobile=mobile,
            mobile_id=mobile_id,
            verified=1 if verified else 0,
            created_at=now,
            updated_at=now,
        )
        db.add(row)
        db.flush()
    else:
        if mobile_id and row.mobile_id != mobile_id:
            row.mobile_id = mobile_id
        if verified:
            row.verified = 1
        row.updated_at = now
        db.flush()
    return row


def resolve_mobile_id(db: Session, *, openid: str, mobile: str) -> dict:
    """绑定主入口。返回 {verified, mobile_id, reason}。

    - 已 verified 的 bind 直接返回（不再上游消耗 anti-content）
    - 新绑定时尝试 reverse，成功即 verified=1；失败保留 verified=0
    """
    existing = _existing_bind(db, openid, mobile)
    if existing and existing.verified and existing.mobile_id:
        return {
            "verified": True,
            "mobile_id": existing.mobile_id,
            "reason": "already_bound",
        }

    tail = mobile[-4:]
    candidates = _pick_candidate_packages(db, mobile)
    if not candidates:
        _upsert_bind(db, openid=openid, mobile=mobile, mobile_id=None, verified=False)
        db.commit()
        return {
            "verified": False,
            "mobile_id": None,
            "reason": "no_candidate_package",
            "message": f"暂无后 4 位为 {tail} 的包裹，后续新到件自动关联",
        }

    mgr = session_mgr.get_manager()
    last_err: str | None = None
    for pkg in candidates:
        try:
            client = mgr.get_client(pkg.station_code)
        except session_mgr.SessionManagerError as e:
            last_err = f"no_active_account:{pkg.station_code}"
            log.warning("bind: %s", last_err)
            continue
        try:
            resp = client.op_package_reverse(pkg.package_id)
        except MdkdApiError as e:
            last_err = f"reverse_api_err: {e}"
            log.warning("bind reverse pid=%s err=%s", pkg.package_id, e)
            continue

        result = resp.get("result") or {}
        plain_mobile = str(result.get("mobile") or "")
        # reverse 不返 mobile_id，但 search 的 item 里有，直接用 pkg.mobile_id
        if plain_mobile == mobile:
            row = _upsert_bind(
                db,
                openid=openid,
                mobile=mobile,
                mobile_id=pkg.mobile_id,
                verified=True,
            )
            db.commit()
            return {
                "verified": True,
                "mobile_id": pkg.mobile_id,
                "reason": "matched_via_reverse",
                "message": f"已绑定（通过 {pkg.wp_name or ''} 包裹验证）",
            }
        else:
            log.info("bind: reverse mobile %s != input %s (pkg=%s)",
                     plain_mobile[:3] + "****" + plain_mobile[-4:],
                     mobile[:3] + "****" + mobile[-4:],
                     pkg.package_id)

    _upsert_bind(db, openid=openid, mobile=mobile, mobile_id=None, verified=False)
    db.commit()
    return {
        "verified": False,
        "mobile_id": None,
        "reason": "reverse_mismatch_or_err",
        "message": last_err or "候选包裹反查明文后不匹配",
    }


def unbind(db: Session, openid: str, mobile: str) -> bool:
    row = _existing_bind(db, openid, mobile)
    if not row:
        return False
    db.delete(row)
    db.commit()
    return True


def get_user_mobile_ids(db: Session, openid: str) -> list[str]:
    """取该用户所有 verified=1 的 mobile_id。"""
    rows = db.execute(
        select(UserBind.mobile_id)
        .where(UserBind.openid == openid, UserBind.verified == 1, UserBind.mobile_id.isnot(None))
    ).scalars().all()
    return [r for r in rows if r]


def get_user_stations(db: Session, openid: str) -> list[str]:
    """该用户曾取件的 station_code 集合（按他绑的 mobile_id 反查 packages）。"""
    ids = get_user_mobile_ids(db, openid)
    if not ids:
        return []
    rows = db.execute(
        select(Package.station_code).where(Package.mobile_id.in_(ids)).distinct()
    ).scalars().all()
    return [r for r in rows if r]
