"""拼多多多多驿站 (mdkd) 账号登录：密码登录 + 短信登录。

流程：
    1. 构造设备指纹（pdd-id / terminalFinger / UUID cookies / api_uid）
    2. GET /sixers/api/user/getPasswordPublicKey → RSA 公钥 (DER SPKI, base64)
    3. RSA-PKCS1v1.5 加密密码 → base64url
    4. 从本进程 anti_content_0aq pool 拿 anti-content（不走 HTTP）
    5. POST /sixers/api/user/loginByMobile (密码) 或 /loginByMobileVerifyCode (短信)
    6. 从 Set-Cookie 中解出 SUB_PASS_ID（真正的登录态 token）

从 algo_service/app/services/mdkd_login.py 迁移；唯一改动：import 路径（registry
指向 pkg_service 本地）+ pool 名（仍是 anti_content_0aq，mdkd /login 用通用 0aq 即可）。
"""
from __future__ import annotations

import base64
import json
import os
import random
import secrets
import string
import threading
import time
import uuid
from dataclasses import dataclass

import requests
from cryptography.hazmat.primitives.asymmetric import padding
from cryptography.hazmat.primitives.serialization import load_der_public_key

from ..node_worker import registry
from ..node_worker.base import NodeWorkerError
from . import mdkd_http

BASE = "https://mdkd-api.pinduoduo.com"
ORIGIN = "https://mdkd.pinduoduo.com"
UA = (
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 "
    "(KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36"
)


_SMS_SESSION_TTL = 600  # 10 分钟
_sms_sessions: dict[str, dict] = {}
_sms_sessions_lock = threading.Lock()


def _sms_session_put(device: "_Device", session: requests.Session) -> str:
    sid = secrets.token_urlsafe(24)
    with _sms_sessions_lock:
        _sms_sessions[sid] = {
            "device": device,
            "session": session,
            "expires_at": time.time() + _SMS_SESSION_TTL,
        }
        now = time.time()
        for k in [k for k, v in _sms_sessions.items() if v["expires_at"] < now]:
            _sms_sessions.pop(k, None)
    return sid


def _sms_session_get(sid: str) -> dict | None:
    with _sms_sessions_lock:
        s = _sms_sessions.get(sid)
        if s and s["expires_at"] < time.time():
            _sms_sessions.pop(sid, None)
            return None
        return s


def _sms_session_drop(sid: str) -> None:
    with _sms_sessions_lock:
        _sms_sessions.pop(sid, None)


class MdkdLoginError(RuntimeError):
    def __init__(self, message: str, *, upstream: dict | None = None):
        super().__init__(message)
        self.upstream = upstream or {}


@dataclass(frozen=True)
class _Device:
    pdd_id: str
    terminal: str
    f77: str
    a42: str
    api_uid: str


def _rand_token(n: int = 32) -> str:
    alphabet = string.ascii_letters + string.digits
    return "".join(random.choice(alphabet) for _ in range(n))


def _build_device() -> _Device:
    return _Device(
        pdd_id=_rand_token(32),
        terminal=_rand_token(32),
        f77=str(uuid.uuid4()),
        a42=str(uuid.uuid4()),
        api_uid=base64.b64encode(os.urandom(16)).decode(),
    )


def _base_headers(dev: _Device) -> dict:
    return {
        "accept": "application/json, text/plain, */*",
        "accept-language": "zh-CN,zh;q=0.9",
        "cache-control": "no-cache",
        "origin": ORIGIN,
        "p-appname": "DDStore-PC",
        "pdd-id": dev.pdd_id,
        "etag": dev.pdd_id,
        "pragma": "no-cache",
        "priority": "u=1, i",
        "referer": ORIGIN + "/",
        "sec-ch-ua": '"Chromium";v="146", "Not-A.Brand";v="24", "Google Chrome";v="146"',
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": '"macOS"',
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-site",
        "user-agent": UA,
    }


def _base_cookies(dev: _Device) -> dict:
    return {
        "_bee": dev.pdd_id,
        "rckk": dev.pdd_id,
        "_f77": dev.f77,
        "ru1k": dev.f77,
        "_a42": dev.a42,
        "ru2k": dev.a42,
        "api_uid": dev.api_uid,
        "terminalFinger": dev.terminal,
    }


def _new_session(dev: _Device) -> requests.Session:
    """建 Session：打 device cookies + 应用 MDKD_PROXY（如已配置）。"""
    s = mdkd_http.new_session()
    for k, v in _base_cookies(dev).items():
        s.cookies.set(k, v, domain=".pinduoduo.com")
    return s


def _get_public_key(session: requests.Session, dev: _Device) -> str:
    r = session.get(
        BASE + "/sixers/api/user/getPasswordPublicKey",
        headers=_base_headers(dev),
        timeout=15,
    )
    r.raise_for_status()
    data = r.json()
    if not data.get("success"):
        raise MdkdLoginError("getPasswordPublicKey failed", upstream=data)
    return data["result"]


def _encrypt_password(pub_key_b64: str, password: str) -> str:
    key = load_der_public_key(base64.b64decode(pub_key_b64))
    ct = key.encrypt(password.encode("utf-8"), padding.PKCS1v15())
    return base64.urlsafe_b64encode(ct).rstrip(b"=").decode()


def _gen_anti_content() -> str:
    """直接调本进程里 anti_content_0aq 的 Node 池。"""
    pool = registry.get_0aq_pool()
    try:
        result = pool.call({})
    except NodeWorkerError as e:
        raise MdkdLoginError(f"anti_content worker error: {e}") from e
    token = result.get("anti_content")
    if not isinstance(token, str) or not token.startswith("0aq"):
        raise MdkdLoginError(f"bad anti_content from worker: {token!r}")
    return token


def _send_verify_code_once(session: requests.Session, dev: _Device, mobile: str, type_: int) -> dict:
    anti = _gen_anti_content()
    headers = _base_headers(dev)
    headers["content-type"] = "application/json"
    headers["anti-content"] = anti
    body = {"mobile": mobile, "type": type_}
    r = session.post(
        BASE + "/sixers/api/verifyCode/sendVerifyCode",
        headers=headers,
        data=json.dumps(body, separators=(",", ":")),
        timeout=20,
    )
    try:
        return r.json()
    except ValueError:
        raise MdkdLoginError(f"sendVerifyCode non-json (status={r.status_code}): {r.text[:200]}")


def send_sms(mobile: str, type_: int = 132) -> dict:
    """调 /sixers/api/verifyCode/sendVerifyCode 触发短信。

    type: 132=纯短信登录（默认），124=密码登录 2FA 兜底，123=找回密码。
    如果 type=132 失败自动回落 124（和 mdkd 前端逻辑一致）。

    返回 {"success": True, "session_id": "...", "expires_in": 600, "upstream": {...}}
    """
    dev = _build_device()
    session = _new_session(dev)

    data = _send_verify_code_once(session, dev, mobile, type_)
    if not data.get("success") and type_ == 132:
        data = _send_verify_code_once(session, dev, mobile, 124)

    if not data.get("success"):
        raise MdkdLoginError(
            f"sendVerifyCode failed: {data.get('errorCode')} {data.get('errorMsg')}",
            upstream=data,
        )
    sid = _sms_session_put(dev, session)
    return {
        "success": True,
        "session_id": sid,
        "expires_in": _SMS_SESSION_TTL,
        "upstream": data,
    }


def login_by_sms(mobile: str, code: str, session_id: str) -> dict:
    """调 /sixers/api/user/loginByMobileVerifyCode 用短信验证码登录。

    必须带 send_sms() 返回的 session_id，复用同一 device + cookies，否则 PDD
    认不出验证码（4000003 验证码错误或已失效）。
    """
    s = _sms_session_get(session_id)
    if not s:
        raise MdkdLoginError(
            "session_id invalid or expired; call send_sms() again to get a new one",
            upstream={"errorCode": "SESSION_INVALID"},
        )
    dev: _Device = s["device"]
    session: requests.Session = s["session"]

    anti = _gen_anti_content()
    headers = _base_headers(dev)
    headers["content-type"] = "application/json"
    headers["anti-content"] = anti

    body = {"mobile": mobile, "mobileVerifyCode": code, "appIndex": 0}
    r = session.post(
        BASE + "/sixers/api/user/loginByMobileVerifyCode",
        headers=headers,
        data=json.dumps(body, separators=(",", ":")),
        timeout=20,
    )
    try:
        data = r.json()
    except ValueError:
        raise MdkdLoginError(f"loginByMobileVerifyCode non-json (status={r.status_code}): {r.text[:200]}")
    if not data.get("success"):
        raise MdkdLoginError(
            f"sms-login failed: {data.get('errorCode')} {data.get('errorMsg')}",
            upstream=data,
        )

    cookies = {c.name: c.value for c in session.cookies}
    sub_pass = cookies.get("SUB_PASS_ID")
    if not sub_pass:
        raise MdkdLoginError("SUB_PASS_ID missing from response", upstream=data)
    _sms_session_drop(session_id)
    token = _extract_token(sub_pass)
    return {
        "user_id": str(data["result"]["userId"]),
        "token": token,
        "sub_pass_id": sub_pass,
        "device": {
            "pdd_id": dev.pdd_id,
            "terminal_finger": dev.terminal,
            "f77": dev.f77,
            "a42": dev.a42,
            "api_uid": dev.api_uid,
        },
        "cookies": cookies,
        "raw": data,
    }


def login(mobile: str, password: str) -> dict:
    """密码登录。返回 {"user_id", "token", "sub_pass_id", "device", "cookies", "raw"}"""
    dev = _build_device()
    session = _new_session(dev)

    pub = _get_public_key(session, dev)
    enc_pwd = _encrypt_password(pub, password)
    anti = _gen_anti_content()

    headers = _base_headers(dev)
    headers["content-type"] = "application/json"
    headers["anti-content"] = anti

    body = {"mobile": mobile, "encryptedPassword": enc_pwd, "appIndex": 0}
    r = session.post(
        BASE + "/sixers/api/user/loginByMobile",
        headers=headers,
        data=json.dumps(body, separators=(",", ":")),
        timeout=20,
    )
    try:
        data = r.json()
    except ValueError:
        raise MdkdLoginError(f"login upstream non-json (status={r.status_code}): {r.text[:200]}")
    if not data.get("success"):
        raise MdkdLoginError(
            f"login failed: {data.get('errorCode')} {data.get('errorMsg')}",
            upstream=data,
        )

    cookies = {c.name: c.value for c in session.cookies}
    sub_pass = cookies.get("SUB_PASS_ID")
    if not sub_pass:
        raise MdkdLoginError("SUB_PASS_ID missing from response", upstream=data)

    token = _extract_token(sub_pass)
    return {
        "user_id": str(data["result"]["userId"]),
        "token": token,
        "sub_pass_id": sub_pass,
        "device": {
            "pdd_id": dev.pdd_id,
            "terminal_finger": dev.terminal,
            "f77": dev.f77,
            "a42": dev.a42,
            "api_uid": dev.api_uid,
        },
        "cookies": cookies,
        "raw": data,
    }


def encrypt_password(password: str) -> str:
    """在线取 PDD 公钥 + RSA-PKCS1v1.5 加密 + base64url。"""
    dev = _build_device()
    session = _new_session(dev)
    pub = _get_public_key(session, dev)
    return _encrypt_password(pub, password)


def _extract_token(sub_pass_id: str) -> str:
    if not sub_pass_id.startswith("x_"):
        return ""
    payload = sub_pass_id[2:]
    pad = (-len(payload)) % 4
    try:
        decoded = base64.urlsafe_b64decode(payload + "=" * pad)
        obj = json.loads(decoded.decode("utf-8"))
        return str(obj.get("t", ""))
    except Exception:
        return ""
