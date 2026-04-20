"""订阅消息配额收集 + 测试发送。

`/v1/push/collect`：小程序调 wx.requestSubscribeMessage 后，把用户点击"允许"
的模板 id 列表发过来，后端每个 +1 配额。

`/v1/push/test`（内部）：强制对 openid 发一条测试消息（不扣队列，直接发）。
"""
from __future__ import annotations

import logging
from datetime import datetime, timezone

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import select
from sqlalchemy.orm import Session

from ..config import settings
from ..db.models import PushSubscription
from ..db.session import get_db
from ..schemas import PushCollectRequest, PushCollectResponse, PushTestRequest
from ..services import wx_push

router = APIRouter(prefix="/v1/push", tags=["push"])
log = logging.getLogger("pkg_service.push")


def _naive_utcnow() -> datetime:
    return datetime.now(timezone.utc).replace(tzinfo=None)


@router.post("/collect", response_model=PushCollectResponse)
def collect(req: PushCollectRequest, db: Session = Depends(get_db)) -> PushCollectResponse:
    granted: dict[str, int] = {}
    totals: dict[str, int] = {}
    now = _naive_utcnow()

    for tpl in req.accepted_templates:
        row = db.execute(
            select(PushSubscription)
            .where(PushSubscription.openid == req.openid, PushSubscription.template_id == tpl)
            .order_by(PushSubscription.id.asc())
        ).scalar_one_or_none()
        if row is None:
            row = PushSubscription(
                openid=req.openid,
                template_id=tpl,
                remaining_count=1,
                created_at=now,
                updated_at=now,
            )
            db.add(row)
            db.flush()
        else:
            row.remaining_count += 1
            row.updated_at = now
        granted[tpl] = granted.get(tpl, 0) + 1
        totals[tpl] = row.remaining_count
    db.commit()
    return PushCollectResponse(openid=req.openid, granted=granted, total_remaining=totals)


@router.post("/test")
def send_test(req: PushTestRequest) -> dict:
    """直接调微信发测试消息（不入队、不扣本地配额）。用于联调模板。"""
    tpl = req.template_id or settings.wx_template_new_pkg
    if not tpl:
        raise HTTPException(status_code=400, detail="no template_id configured")
    # 用通用占位数据；字段名需要和模板配置对齐
    data = {
        "thing1": {"value": "这是一条测试通知"},
        "time2": {"value": _naive_utcnow().strftime("%Y-%m-%d %H:%M")},
    }
    ok, reason = wx_push.send_subscribe_message(
        openid=req.openid, template_id=tpl, data=data, page=None,
    )
    return {"ok": ok, "reason": reason, "template_id": tpl}


@router.get("/remaining")
def remaining(openid: str, db: Session = Depends(get_db)) -> dict:
    rows = db.execute(
        select(PushSubscription).where(PushSubscription.openid == openid)
    ).scalars().all()
    return {
        "openid": openid,
        "quotas": [{"template_id": r.template_id, "remaining": r.remaining_count} for r in rows],
    }
