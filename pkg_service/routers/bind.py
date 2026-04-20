"""C 端绑定 API：openid ↔ mobile → mobile_id。

流程见 services/bind_service.py。首次绑定若本地已有该 mobile 的包裹 → 调一次
上游 reverse 核对明文手机（消耗 1 次 anti-content）；若无候选包裹 → 落盘
verified=0，等后续轮询扫到 mobile_last_four 命中后异步补齐。
"""
from __future__ import annotations

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from ..db.session import get_db
from ..schemas import BindRequest, BindResponse, UnbindRequest
from ..services import bind_service

router = APIRouter(prefix="/v1/bind", tags=["bind"])


@router.post("/mobile", response_model=BindResponse)
def bind_mobile(req: BindRequest, db: Session = Depends(get_db)) -> BindResponse:
    try:
        res = bind_service.resolve_mobile_id(db, openid=req.openid, mobile=req.mobile)
    except bind_service.BindError as e:
        raise HTTPException(status_code=500, detail=str(e))
    return BindResponse(
        openid=req.openid,
        mobile=req.mobile,
        mobile_id=res.get("mobile_id"),
        verified=bool(res.get("verified")),
        message=res.get("message") or res.get("reason") or "",
    )


@router.post("/unbind")
def unbind_mobile(req: UnbindRequest, db: Session = Depends(get_db)) -> dict:
    ok = bind_service.unbind(db, req.openid, req.mobile)
    return {"ok": ok}


@router.get("/mine")
def list_my_binds(openid: str, db: Session = Depends(get_db)) -> dict:
    mobile_ids = bind_service.get_user_mobile_ids(db, openid)
    stations = bind_service.get_user_stations(db, openid)
    return {
        "openid": openid,
        "mobile_ids": mobile_ids,
        "stations": stations,
    }
