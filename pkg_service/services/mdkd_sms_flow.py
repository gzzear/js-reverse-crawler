"""两段式 SMS 登录：持久化 device + cookies 到磁盘，跨进程完成。

用于交互场景（agent/CLI）发短信 -> 等用户给码 -> 再起进程登录。

state 文件（默认 /tmp/mdkd_sms_state_{mobile}.json）：
    {
        "mobile": "...",
        "device": {pdd_id/terminal_finger/f77/a42/api_uid},
        "cookies": {name: value},
        "sent_at": ts,
        "upstream": {...}
    }
"""
from __future__ import annotations

import argparse
import json
import logging
import os
import sys
import time
from pathlib import Path

import requests

from ..node_worker import registry
from . import mdkd_http, mdkd_login

log = logging.getLogger("pkg_service.mdkd_sms_flow")


def _state_path(mobile: str) -> Path:
    return Path(f"/tmp/mdkd_sms_state_{mobile}.json")


def _make_session_from_state(
    device_dict: dict,
    cookies: dict,
    proxy_url: str | None = None,
) -> tuple[mdkd_login._Device, requests.Session]:
    dev = mdkd_login._Device(
        pdd_id=device_dict["pdd_id"],
        terminal=device_dict["terminal_finger"],
        f77=device_dict["f77"],
        a42=device_dict["a42"],
        api_uid=device_dict["api_uid"],
    )
    # proxy_url 显式传入时，强制用 state 里 send 阶段那个 IP（不走 mdkd_http cache）
    # 这样即使 send/login 跨进程或跨 TTL，login_sms 仍能用同一 IP 出站
    # —— 否则 IP 换了就会被 PDD 判定为 "验证码对应的会话不存在" → 4000003
    if proxy_url:
        s = requests.Session()
        s.proxies.update({"http": proxy_url, "https": proxy_url})
    else:
        s = mdkd_http.new_session()
    for name, val in cookies.items():
        s.cookies.set(name, val, domain=".pinduoduo.com")
    return dev, s


def step_send(mobile: str, type_: int = 132) -> dict:
    """发短信 + 落盘 state。"""
    dev = mdkd_login._build_device()
    session = mdkd_login._new_session(dev)

    data = mdkd_login._send_verify_code_once(session, dev, mobile, type_)
    if not data.get("success") and type_ == 132:
        data = mdkd_login._send_verify_code_once(session, dev, mobile, 124)
    if not data.get("success"):
        raise mdkd_login.MdkdLoginError(
            f"sendVerifyCode failed: {data.get('errorCode')} {data.get('errorMsg')}",
            upstream=data,
        )
    state = {
        "mobile": mobile,
        "device": {
            "pdd_id": dev.pdd_id,
            "terminal_finger": dev.terminal,
            "f77": dev.f77,
            "a42": dev.a42,
            "api_uid": dev.api_uid,
        },
        "cookies": {c.name: c.value for c in session.cookies},
        # 快照当前出站 IP —— step_login 必须用同一 IP 提交码，否则 4000003
        "proxy_url": mdkd_http.current_url(),
        "sent_at": time.time(),
        "upstream": data,
    }
    path = _state_path(mobile)
    path.write_text(json.dumps(state, ensure_ascii=False, indent=2))
    return {"success": True, "state_path": str(path), "upstream": data}


def step_login(mobile: str, code: str) -> dict:
    """读 state + loginByMobileVerifyCode。成功后删 state 文件。"""
    path = _state_path(mobile)
    if not path.exists():
        raise mdkd_login.MdkdLoginError(f"no state file at {path}, run step_send first")
    state = json.loads(path.read_text())
    age = time.time() - state["sent_at"]
    if age > 600:
        raise mdkd_login.MdkdLoginError(f"state too old ({age:.0f}s > 600s), run step_send again")
    dev, session = _make_session_from_state(
        state["device"], state["cookies"], state.get("proxy_url"),
    )

    anti = mdkd_login._gen_anti_content()
    headers = mdkd_login._base_headers(dev)
    headers["content-type"] = "application/json"
    headers["anti-content"] = anti

    body = {"mobile": mobile, "mobileVerifyCode": code, "appIndex": 0}
    r = session.post(
        mdkd_login.BASE + "/sixers/api/user/loginByMobileVerifyCode",
        headers=headers,
        data=json.dumps(body, separators=(",", ":")),
        timeout=20,
    )
    try:
        data = r.json()
    except ValueError:
        raise mdkd_login.MdkdLoginError(
            f"loginByMobileVerifyCode non-json (status={r.status_code}): {r.text[:200]}"
        )
    if not data.get("success"):
        raise mdkd_login.MdkdLoginError(
            f"sms-login failed: {data.get('errorCode')} {data.get('errorMsg')}",
            upstream=data,
        )

    cookies = {c.name: c.value for c in session.cookies}
    sub_pass = cookies.get("SUB_PASS_ID")
    if not sub_pass:
        raise mdkd_login.MdkdLoginError("SUB_PASS_ID missing from response", upstream=data)
    try:
        path.unlink()
    except OSError:
        pass
    token = mdkd_login._extract_token(sub_pass)
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


def main(argv: list[str] | None = None) -> int:
    p = argparse.ArgumentParser(description="mdkd 两段式 SMS 登录（跨进程）")
    sub = p.add_subparsers(dest="cmd", required=True)
    p_send = sub.add_parser("send"); p_send.add_argument("--mobile", required=True)
    p_send.add_argument("--type", dest="type_", type=int, default=132)
    p_login = sub.add_parser("login"); p_login.add_argument("--mobile", required=True)
    p_login.add_argument("--code", required=True)
    p_login.add_argument("--out", default=None, help="写登录结果到文件（含完整 sub_pass_id）")
    args = p.parse_args(argv)

    logging.basicConfig(level=logging.INFO, format="%(asctime)s %(levelname)s %(message)s")
    registry.bootstrap(pool_size=1)
    try:
        if args.cmd == "send":
            res = step_send(args.mobile, args.type_)
            print(json.dumps({k: v for k, v in res.items() if k != "upstream"},
                             ensure_ascii=False, indent=2))
        elif args.cmd == "login":
            res = step_login(args.mobile, args.code)
            preview = {
                "user_id": res["user_id"],
                "token": res["token"],
                "sub_pass_id_len": len(res["sub_pass_id"]),
                "sub_pass_id_head": res["sub_pass_id"][:30] + "...",
                "device": res["device"],
            }
            print(json.dumps(preview, ensure_ascii=False, indent=2))
            if args.out:
                Path(args.out).write_text(json.dumps({
                    "mobile": args.mobile,
                    "user_id": res["user_id"],
                    "token": res["token"],
                    "sub_pass_id": res["sub_pass_id"],
                    "device": res["device"],
                }, ensure_ascii=False, indent=2))
                print(f"full login state saved to {args.out}", file=sys.stderr)
        return 0
    except mdkd_login.MdkdLoginError as e:
        print(f"ERROR: {e}", file=sys.stderr)
        print(f"upstream: {json.dumps(e.upstream, ensure_ascii=False)}", file=sys.stderr)
        return 2
    finally:
        registry.shutdown()


if __name__ == "__main__":
    sys.exit(main())
