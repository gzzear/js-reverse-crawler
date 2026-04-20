"""管理端路由：站长 mdkd 登录（SMS 两段式）+ 账号状态查看。

所有 /v1/admin/* 路由要求 header `X-Admin-Token: <settings.admin_token>`。
`admin_token` 为空（未配置）时整个路由组 503，避免无意暴露。

路由：
    POST /v1/admin/send_sms    {mobile}                    → 调 mdkd sendVerifyCode
    POST /v1/admin/login_sms   {mobile, code, station_code?}
                                → loginByMobileVerifyCode + session_mgr.upsert_login
    GET  /v1/admin/accounts                                → 账号池状态（mobile 打码）

小程序 "站长管理后台" 页面会直调这两个接口完成登录流程：
    1. 输入手机号 → send_sms → 返回 "验证码已发送"
    2. 输入验证码 → login_sms → 返回 {success, user_id, station_code}
    3. session_mgr 立刻把新 SUB_PASS_ID 注入内存 + DB，下一轮 poll_worker 能跑通

state 文件 /tmp/mdkd_sms_state_{mobile}.json 在 step_send 时写、step_login 时删，
生命周期 ≤ 10 分钟（mdkd_sms_flow 内部校验 age ≤ 600s）。
"""
from __future__ import annotations

import logging
from typing import Optional

from fastapi import APIRouter, Depends, Header, HTTPException
from pydantic import BaseModel, Field
from sqlalchemy import select

from ..config import settings
from ..db.models import MdkdAccount
from ..db.session import SessionLocal
from ..services import mdkd_login, mdkd_sms_flow, session_mgr

log = logging.getLogger("pkg_service.admin")

router = APIRouter(prefix="/v1/admin", tags=["admin"])


def _require_admin_token(x_admin_token: Optional[str] = Header(default=None)) -> None:
    if not settings.admin_token:
        # 未配置就完全关闭管理端，防生产未设 token 时路由可用
        raise HTTPException(status_code=503, detail="admin routes disabled (ADMIN_TOKEN unset)")
    if x_admin_token != settings.admin_token:
        raise HTTPException(status_code=401, detail="bad admin token")


# ==== SMS 登录 ====

class SendSmsRequest(BaseModel):
    mobile: str = Field(..., pattern=r"^1\d{10}$")


class SendSmsResponse(BaseModel):
    success: bool
    message: str


class LoginSmsRequest(BaseModel):
    mobile: str = Field(..., pattern=r"^1\d{10}$")
    code: str = Field(..., pattern=r"^\d{4,8}$")
    # 新账号首次登录必填；已存在的 mobile 沿用 DB 记录的 station_code
    station_code: Optional[str] = Field(None, max_length=32)


class LoginSmsResponse(BaseModel):
    success: bool
    account_id: int
    user_id: str
    mobile_masked: str
    station_code: str
    sub_pass_id_preview: str


@router.post("/send_sms", response_model=SendSmsResponse,
             dependencies=[Depends(_require_admin_token)])
def send_sms(req: SendSmsRequest) -> SendSmsResponse:
    """触发 PDD 发送登录验证码（132 失败会自动降级 124）。"""
    try:
        res = mdkd_sms_flow.step_send(req.mobile)
    except mdkd_login.MdkdLoginError as e:
        log.warning("send_sms mobile=%s failed: %s", req.mobile, e)
        raise HTTPException(status_code=400, detail=f"send_sms failed: {e}")
    log.info("send_sms ok mobile=%s state=%s", req.mobile, res.get("state_path"))
    return SendSmsResponse(success=True, message="验证码已发送，请在 10 分钟内提交")


@router.post("/login_sms", response_model=LoginSmsResponse,
             dependencies=[Depends(_require_admin_token)])
def login_sms(req: LoginSmsRequest) -> LoginSmsResponse:
    """提交验证码完成登录 → 持久化到 mdkd_account + 热载到 session_mgr。

    如果 DB 已有该 mobile（重登场景）：
        - 沿用旧的 station_code，请求体传入的 station_code 被忽略
    新账号：
        - station_code 必填，否则返 400
    """
    # 先看 DB 里这个 mobile 是否已存在，决定 station_code 来源
    existing_station: Optional[str] = None
    with SessionLocal() as s:
        row = s.execute(
            select(MdkdAccount).where(MdkdAccount.mobile == req.mobile)
        ).scalar_one_or_none()
        if row is not None:
            existing_station = row.station_code

    station_code = existing_station or req.station_code
    if not station_code:
        raise HTTPException(
            status_code=400,
            detail="station_code required for new account (首次登录必须指定驿站编码)",
        )

    try:
        res = mdkd_sms_flow.step_login(req.mobile, req.code)
    except mdkd_login.MdkdLoginError as e:
        log.warning("login_sms mobile=%s failed: %s", req.mobile, e)
        raise HTTPException(status_code=400, detail=f"login_sms failed: {e}")

    aid = session_mgr.get_manager().upsert_login(
        mobile=req.mobile,
        station_code=station_code,
        sub_pass_id=res["sub_pass_id"],
        device=res["device"],
        user_id=res["user_id"],
        token=res["token"],
    )
    sp = res["sub_pass_id"]
    sp_preview = sp[:16] + "..." + sp[-8:] if len(sp) > 30 else sp
    return LoginSmsResponse(
        success=True,
        account_id=aid,
        user_id=res["user_id"],
        mobile_masked=req.mobile[:3] + "****" + req.mobile[-4:],
        station_code=station_code,
        sub_pass_id_preview=sp_preview,
    )


# ==== 账号状态（与 /debug/accounts 相同，但走 admin token） ====

@router.get("/accounts", dependencies=[Depends(_require_admin_token)])
def list_accounts() -> dict:
    mgr = session_mgr.get_manager()
    return {"accounts": mgr.list_accounts()}
