"""
拼多多门店快递 (多多买菜.pinduoduo.com) 登录 demo

流程：
1. 生成/复用设备指纹 (pdd-id / terminalFinger / uuid cookies)
2. GET /sixers/api/user/getPasswordPublicKey 拿 RSA 公钥
3. 本地 RSA-PKCS1v1.5 加密密码, base64url 编码得到 encryptedPassword
4. 通过 Node subprocess 调 gen_anti.js 生成 anti-content
5. POST /sixers/api/user/loginByMobile

anti-content 复用 ../anti_content/0aq/ 的实现。
"""

import base64
import json
import os
import random
import string
import subprocess
import sys
import uuid
from pathlib import Path

import requests
from cryptography.hazmat.primitives.asymmetric import padding
from cryptography.hazmat.primitives.serialization import load_der_public_key

BASE = "https://mdkd-api.pinduoduo.com"
ORIGIN = "https://mdkd.pinduoduo.com"
UA = (
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 "
    "(KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36"
)
GEN_ANTI = Path(__file__).resolve().parent / "gen_anti.js"


def rand_token(n: int = 32) -> str:
    alphabet = string.ascii_letters + string.digits
    return "".join(random.choice(alphabet) for _ in range(n))


def build_device() -> dict:
    """生成一组自洽的设备指纹 / cookie。

    真实站点把 _bee / rckk / pdd-id / etag 关联到同一个 32 位 token，
    _f77==ru1k / _a42==ru2k 是 UUID v4，api_uid 为 16 字节 base64，
    terminalFinger 是另一个 32 位随机串。"""
    pdd_id = rand_token(32)
    terminal = rand_token(32)
    f77 = str(uuid.uuid4())
    a42 = str(uuid.uuid4())
    api_uid = base64.b64encode(os.urandom(16)).decode()
    return {
        "pdd_id": pdd_id,
        "terminal": terminal,
        "f77": f77,
        "a42": a42,
        "api_uid": api_uid,
    }


def base_headers(dev: dict) -> dict:
    return {
        "accept": "application/json, text/plain, */*",
        "accept-language": "zh-CN,zh;q=0.9",
        "cache-control": "no-cache",
        "origin": ORIGIN,
        "p-appname": "DDStore-PC",
        "pdd-id": dev["pdd_id"],
        "etag": dev["pdd_id"],
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


def base_cookies(dev: dict) -> dict:
    return {
        "_bee": dev["pdd_id"],
        "rckk": dev["pdd_id"],
        "_f77": dev["f77"],
        "ru1k": dev["f77"],
        "_a42": dev["a42"],
        "ru2k": dev["a42"],
        "api_uid": dev["api_uid"],
        "terminalFinger": dev["terminal"],
    }


def get_public_key(session: requests.Session, dev: dict) -> str:
    r = session.get(
        BASE + "/sixers/api/user/getPasswordPublicKey",
        headers=base_headers(dev),
        cookies=base_cookies(dev),
        timeout=15,
    )
    r.raise_for_status()
    data = r.json()
    if not data.get("success"):
        raise RuntimeError(f"getPasswordPublicKey failed: {data}")
    return data["result"]


def encrypt_password(pub_key_b64: str, password: str) -> str:
    key = load_der_public_key(base64.b64decode(pub_key_b64))
    ct = key.encrypt(password.encode("utf-8"), padding.PKCS1v15())
    return base64.urlsafe_b64encode(ct).rstrip(b"=").decode()


def gen_anti_content() -> str:
    out = subprocess.run(
        ["node", str(GEN_ANTI)],
        capture_output=True,
        check=True,
        timeout=30,
    )
    token = out.stdout.decode().strip()
    if not token.startswith("0a"):
        raise RuntimeError(f"anti-content bad output: {token!r} / err={out.stderr.decode()[:300]}")
    return token


def login(mobile: str, password: str) -> dict:
    """登录并返回 {session, sub_pass_id, user_id, device, body}。

    鉴权 token 由服务端通过 Set-Cookie: SUB_PASS_ID=x_...; HttpOnly 下发，
    后续业务请求只需复用 session（或手动带上 SUB_PASS_ID cookie）。
    """
    dev = build_device()
    session = requests.Session()
    # 把设备 cookie 预写入 session，这样 loginByMobile 后会自动合并 SUB_PASS_ID
    for k, v in base_cookies(dev).items():
        session.cookies.set(k, v, domain=".pinduoduo.com")

    pub = get_public_key(session, dev)
    enc_pwd = encrypt_password(pub, password)
    anti = gen_anti_content()

    headers = base_headers(dev)
    headers["content-type"] = "application/json"
    headers["anti-content"] = anti

    body = {"mobile": mobile, "encryptedPassword": enc_pwd, "appIndex": 0}
    r = session.post(
        BASE + "/sixers/api/user/loginByMobile",
        headers=headers,
        data=json.dumps(body, separators=(",", ":")),
        timeout=20,
    )
    data = r.json()
    if not data.get("success"):
        raise RuntimeError(f"login failed: {data}")

    sub_pass = next(
        (c.value for c in session.cookies if c.name == "SUB_PASS_ID"),
        None,
    )
    return {
        "session": session,
        "sub_pass_id": sub_pass,
        "user_id": data["result"]["userId"],
        "device": dev,
        "body": data,
    }


if __name__ == "__main__":
    mobile = sys.argv[1] if len(sys.argv) > 1 else "19113189219"
    password = sys.argv[2] if len(sys.argv) > 2 else "Gaozhe741234"
    r = login(mobile, password)
    print(json.dumps({
        "user_id": r["user_id"],
        "sub_pass_id": r["sub_pass_id"],
        "body": r["body"],
    }, ensure_ascii=False, indent=2))
