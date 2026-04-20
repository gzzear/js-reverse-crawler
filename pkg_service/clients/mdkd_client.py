"""mdkd orion API 客户端：包裹查询 / 反查 / 底单图 / 面板聚合 / refreshToken。

会话载体是 `SUB_PASS_ID` cookie（登录返回），additional cookies 取自 device 指纹
（pdd-id/terminalFinger/f77/a42/api_uid）。每个请求需要现 gen 一个 anti-content。

参考：
- memory pdd_mdkd_package_search_schema.md （search 字段源真值）
- memory pdd_mdkd_image_api.md             （out/image body）
- memory pdd_mdkd_refresh_token.md         （refreshToken 路径）

依赖 node_worker.registry 已 bootstrap。
"""
from __future__ import annotations

import json
import logging
from typing import Any

import requests

from ..metrics import anti_content_gen_total
from ..node_worker import registry
from ..node_worker.base import NodeWorkerError

BASE = "https://mdkd-api.pinduoduo.com"
ORIGIN = "https://mdkd.pinduoduo.com"
UA = (
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 "
    "(KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36"
)

log = logging.getLogger("pkg_service.mdkd_client")


class MdkdApiError(RuntimeError):
    def __init__(self, message: str, *, status: int = 0, upstream: dict | None = None):
        super().__init__(message)
        self.status = status
        self.upstream = upstream or {}


class MdkdClient:
    """单账号会话。线程不安全（内部 requests.Session 可能并发冲突），每线程一个实例。

    使用：
        client = MdkdClient(sub_pass_id=..., device={...})
        detail = client.op_package_search(stay_days_list=[-4], page_index=1, page_size=50)
    """

    def __init__(
        self,
        sub_pass_id: str,
        device: dict,
        *,
        cookies: dict | None = None,
        timeout: float = 20.0,
    ) -> None:
        """
        cookies: 登录返回的完整 cookie jar（含 JSESSIONID 等 PDD 下发的会话 cookie）。
            强烈建议传入 —— 光有 device 派生 cookie 会漏 JSESSIONID，search 会被
            风控返 999998。保留 device 回退仅为兼容老调用。
        """
        if not sub_pass_id:
            raise ValueError("sub_pass_id required")
        self.sub_pass_id = sub_pass_id
        self.device = device
        self.timeout = timeout
        self._session = requests.Session()
        self._set_cookies(sub_pass_id, device, cookies or {})

    def _set_cookies(self, sub_pass_id: str, device: dict, extra_cookies: dict) -> None:
        # device 字段可能用两种命名，兼容一下
        pdd_id = device.get("pdd_id") or device.get("pddId") or ""
        terminal = device.get("terminal_finger") or device.get("terminal") or device.get("terminalFinger") or ""
        f77 = device.get("f77") or ""
        a42 = device.get("a42") or ""
        api_uid = device.get("api_uid") or device.get("apiUid") or ""
        jar = {
            "SUB_PASS_ID": sub_pass_id,
            "_bee": pdd_id,
            "rckk": pdd_id,
            "_f77": f77,
            "ru1k": f77,
            "_a42": a42,
            "ru2k": a42,
            "api_uid": api_uid,
            "terminalFinger": terminal,
        }
        # extra_cookies 覆盖 device 派生（登录回来的 SUB_PASS_ID/JSESSIONID 权威）
        jar.update({k: v for k, v in extra_cookies.items() if v})
        for k, v in jar.items():
            if v:
                self._session.cookies.set(k, v, domain=".pinduoduo.com")

    def _base_headers(self) -> dict:
        pdd_id = self.device.get("pdd_id") or self.device.get("pddId") or ""
        return {
            "accept": "application/json, text/plain, */*",
            "accept-language": "zh-CN,zh;q=0.9",
            "origin": ORIGIN,
            "p-appname": "DDStore-PC",
            "pdd-id": pdd_id,
            "etag": pdd_id,
            "referer": ORIGIN + "/",
            "sec-ch-ua": '"Chromium";v="146", "Not-A.Brand";v="24", "Google Chrome";v="146"',
            "sec-ch-ua-mobile": "?0",
            "sec-ch-ua-platform": '"macOS"',
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "same-site",
            "user-agent": UA,
        }

    def _gen_anti_content(self) -> str:
        """orion API 使用 mdkd 变体的 anti-content（模块 1351）。"""
        pool = registry.get_mdkd_pool()
        try:
            result = pool.call({})
        except NodeWorkerError as e:
            anti_content_gen_total.labels(pool="mdkd", result="err").inc()
            raise MdkdApiError(f"anti_content worker error: {e}") from e
        token = result.get("anti_content")
        if not isinstance(token, str) or not token.startswith("0aq"):
            anti_content_gen_total.labels(pool="mdkd", result="err").inc()
            raise MdkdApiError(f"bad anti_content from worker: {token!r}")
        anti_content_gen_total.labels(pool="mdkd", result="ok").inc()
        return token

    def _post_json(self, path: str, body: dict) -> dict:
        headers = self._base_headers()
        headers["content-type"] = "application/json"
        headers["anti-content"] = self._gen_anti_content()
        r = self._session.post(
            BASE + path,
            headers=headers,
            data=json.dumps(body, separators=(",", ":"), ensure_ascii=False).encode("utf-8"),
            timeout=self.timeout,
        )
        return self._parse(r, path)

    def _get_json(self, path: str, params: dict | None = None) -> dict:
        headers = self._base_headers()
        headers["anti-content"] = self._gen_anti_content()
        r = self._session.get(
            BASE + path,
            headers=headers,
            params=params,
            timeout=self.timeout,
        )
        return self._parse(r, path)

    def _parse(self, r: requests.Response, path: str) -> dict:
        try:
            data = r.json()
        except ValueError:
            raise MdkdApiError(
                f"{path}: non-json response (status={r.status_code}): {r.text[:200]}",
                status=r.status_code,
            )
        # orion 常见两种 shape:
        #   {"success": true, "result": {...}}
        #   {"result": {...}, "error_code": 0} / {"error_code": 40001, "error_msg": ...}
        if data.get("success") is False or (data.get("error_code") and data.get("error_code") != 0):
            ec = data.get("error_code") or data.get("errorCode")
            em = data.get("error_msg") or data.get("errorMsg") or data.get("msg")
            raise MdkdApiError(f"{path}: upstream err {ec} {em}", status=r.status_code, upstream=data)
        return data

    # ---------------- 业务接口 ------------------------------------------------

    def op_package_search(
        self,
        *,
        stay_days_list: list[int] | None = None,
        page_index: int = 1,
        page_size: int = 50,
        days: int = 30,
        start_in_cabinet_date: int | None = None,
        end_in_cabinet_date: int | None = None,
        selected: bool = False,
        content: str | None = None,
        extra: dict | None = None,
    ) -> dict:
        """POST /api/orion/op/package/search

        **注意**（从 js逆向/pdd/mdkd/search.py 摸出来）：
        - start/end_in_cabinet_date 必须带（ms），漏掉风控返 999998
        - selected 是 bool False，不是 []
        - content 单字段全能搜（运单号/取件码/手机后4位/收件人）

        返回 {"success": true, "result": {"detail": [...], "total": N, "search_mode": ...}}
        """
        import time as _time
        now_ms = int(_time.time() * 1000)
        body: dict[str, Any] = {
            "start_in_cabinet_date": start_in_cabinet_date if start_in_cabinet_date is not None
                                      else now_ms - days * 86400 * 1000,
            "end_in_cabinet_date": end_in_cabinet_date if end_in_cabinet_date is not None else now_ms,
            "stay_days_list": stay_days_list if stay_days_list is not None else [-4],
            "page_index": page_index,
            "page_size": page_size,
            "selected": selected,
        }
        if content:
            body["content"] = content
        if extra:
            body.update(extra)
        return self._post_json("/api/orion/op/package/search", body)

    def op_package_reverse(self, package_id: str) -> dict:
        """GET /api/orion/op/package/reverse?package_id=...

        返回 {"success": true, "result": {"waybill_code", "mobile", "customer_name", "customer_info"}}
        """
        return self._get_json("/api/orion/op/package/reverse", {"package_id": package_id})

    def op_package_out_image(self, package_id: str) -> dict:
        """POST /api/orion/op/package/out/image body {package_id}"""
        return self._post_json("/api/orion/op/package/out/image", {"package_id": package_id})

    def get_home_stock(self) -> dict:
        """GET /api/orion/op/home/stock：面板聚合 todo_list。"""
        return self._get_json("/api/orion/op/home/stock")

    def refresh_token(self) -> dict:
        """GET /sixers/api/token/refreshToken：尝试续 SUB_PASS_ID TTL。

        实际语义（续 TTL vs no-op）未验证 — 见 R0 研究项。
        """
        headers = self._base_headers()
        # refreshToken 不强制 anti-content（memory 未记录），先按需加一个试试
        headers["anti-content"] = self._gen_anti_content()
        r = self._session.get(
            BASE + "/sixers/api/token/refreshToken",
            headers=headers,
            timeout=self.timeout,
        )
        # 可能返回新 token，也可能 204，容错处理
        try:
            data = r.json()
            return {"status": r.status_code, "json": data}
        except ValueError:
            return {"status": r.status_code, "text": r.text[:200]}
