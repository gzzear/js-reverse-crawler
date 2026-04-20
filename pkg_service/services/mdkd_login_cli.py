"""mdkd 登录 CLI：验收 M0（需要真实账号）。

用法：
    # 密码登录
    python -m pkg_service.services.mdkd_login_cli password --mobile 1xxx --password XXX

    # 短信登录（两步）
    python -m pkg_service.services.mdkd_login_cli sms-send --mobile 1xxx
    python -m pkg_service.services.mdkd_login_cli sms-login --mobile 1xxx --code 123456 --session <sid>

    # RSA 加密密码（不联网跑登录）
    python -m pkg_service.services.mdkd_login_cli encrypt --password XXX
"""
from __future__ import annotations

import argparse
import json
import sys

from ..node_worker import registry
from . import mdkd_login


def _print_login_result(res: dict) -> None:
    print(
        json.dumps(
            {
                "user_id": res["user_id"],
                "token": res["token"],
                "sub_pass_id_len": len(res["sub_pass_id"]),
                "sub_pass_id_head": res["sub_pass_id"][:40] + "...",
                "device": res["device"],
            },
            ensure_ascii=False,
            indent=2,
        )
    )


def main(argv: list[str] | None = None) -> int:
    parser = argparse.ArgumentParser(description="mdkd login CLI")
    sub = parser.add_subparsers(dest="cmd", required=True)

    p_pwd = sub.add_parser("password")
    p_pwd.add_argument("--mobile", required=True)
    p_pwd.add_argument("--password", required=True)

    p_send = sub.add_parser("sms-send")
    p_send.add_argument("--mobile", required=True)
    p_send.add_argument("--type", type=int, default=132)

    p_sms = sub.add_parser("sms-login")
    p_sms.add_argument("--mobile", required=True)
    p_sms.add_argument("--code", required=True)
    p_sms.add_argument("--session", required=True)

    p_enc = sub.add_parser("encrypt")
    p_enc.add_argument("--password", required=True)

    args = parser.parse_args(argv)

    registry.bootstrap(pool_size=1)
    try:
        if args.cmd == "password":
            res = mdkd_login.login(args.mobile, args.password)
            _print_login_result(res)
        elif args.cmd == "sms-send":
            res = mdkd_login.send_sms(args.mobile, args.type)
            print(json.dumps({k: v for k, v in res.items() if k != "upstream"}, ensure_ascii=False, indent=2))
        elif args.cmd == "sms-login":
            res = mdkd_login.login_by_sms(args.mobile, args.code, args.session)
            _print_login_result(res)
        elif args.cmd == "encrypt":
            print(mdkd_login.encrypt_password(args.password))
        return 0
    except mdkd_login.MdkdLoginError as e:
        print(f"ERROR: {e}", file=sys.stderr)
        print(f"upstream: {json.dumps(e.upstream, ensure_ascii=False)}", file=sys.stderr)
        return 2
    finally:
        registry.shutdown()


if __name__ == "__main__":
    sys.exit(main())
