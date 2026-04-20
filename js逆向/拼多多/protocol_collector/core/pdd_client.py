"""HTTP client for PDD H5 goods detail.

The H5 goods page (`/goods.html?goods_id=…`) renders the full product data
server-side and inlines it as `window.rawData = {…};` in the HTML response.
We extract that blob directly — no anti_content / pfb/a4 handshake required
when consuming the SSR'd page.

Failure modes:
  * 302 → /login.html  → cookie's PDDAccessToken is invalid → RefusedError
  * 200 but rawData missing / empty goods block → ProtocolError
  * 200 with anti-bot interstitial → RefusedError
"""
from __future__ import annotations

import json
from dataclasses import dataclass

import httpx

from .cookie_pool import CookieEntry
from .proxy_manager import Proxy

GOODS_URL = "https://mobile.yangkeduo.com/goods.html"
DEFAULT_UA = (
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) "
    "AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36"
)


class RefusedError(RuntimeError):
    """Request was refused by PDD's anti-bot layer or login required."""


class GoodsUnavailable(RuntimeError):
    """商品级软封控（售罄/下架/空 stub），重试无意义。"""


class ProtocolError(RuntimeError):
    """Unexpected response shape (HTML missing rawData, etc.)."""


def _extract_raw_data(html: str) -> dict:
    """Find `window.rawData = {…};` and return the parsed object."""
    needle = "window.rawData"
    i = html.find(needle)
    if i < 0:
        raise ProtocolError("rawData marker not found in HTML")
    brace_start = html.find("{", i)
    if brace_start < 0:
        raise ProtocolError("rawData opening brace not found")
    depth = 0
    in_str: str | None = None
    esc = False
    j = brace_start
    n = len(html)
    while j < n:
        ch = html[j]
        if in_str:
            if esc:
                esc = False
            elif ch == "\\":
                esc = True
            elif ch == in_str:
                in_str = None
        else:
            if ch in ('"', "'"):
                in_str = ch
            elif ch == "{":
                depth += 1
            elif ch == "}":
                depth -= 1
                if depth == 0:
                    j += 1
                    break
        j += 1
    if depth != 0:
        raise ProtocolError("rawData braces unbalanced")
    blob = html[brace_start:j]
    try:
        return json.loads(blob)
    except json.JSONDecodeError as e:
        raise ProtocolError(f"rawData JSON parse failed: {e}") from e


@dataclass
class PddClient:
    ua: str = DEFAULT_UA
    proxy: Proxy | None = None
    timeout: float = 15.0

    def __post_init__(self) -> None:
        self._http = httpx.Client(
            http2=True,
            timeout=self.timeout,
            proxy=(self.proxy.url if self.proxy else None),
            follow_redirects=False,
        )

    def close(self) -> None:
        try:
            self._http.close()
        except Exception:
            pass

    def fetch_goods_detail(
        self,
        *,
        goods_id: str,
        cookie: CookieEntry,
        anti_content: str | None = None,  # accepted for backwards compat, unused
        original_url: str | None = None,
    ) -> dict:
        headers = {
            "user-agent": self.ua,
            "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
            "accept-language": "zh-CN,zh;q=0.9",
            "sec-ch-ua": '"Chromium";v="146", "Not-A.Brand";v="24", "Google Chrome";v="146"',
            "sec-ch-ua-mobile": "?0",
            "sec-ch-ua-platform": '"macOS"',
            "sec-fetch-dest": "document",
            "sec-fetch-mode": "navigate",
            "sec-fetch-site": "none",
            "sec-fetch-user": "?1",
            "upgrade-insecure-requests": "1",
        }
        if original_url:
            r = self._http.get(
                original_url,
                headers=headers,
                cookies=cookie.parsed,
            )
        else:
            r = self._http.get(
                GOODS_URL,
                params={"goods_id": goods_id},
                headers=headers,
                cookies=cookie.parsed,
            )

        # Login redirect → cookie is dead
        if r.status_code in (301, 302, 303, 307, 308):
            loc = r.headers.get("location", "")
            if "login" in loc:
                raise RefusedError(
                    f"PDDAccessToken invalid (redirected to login): {loc[:120]}"
                )
            raise ProtocolError(f"unexpected redirect: {r.status_code} -> {loc}")

        if r.status_code == 429:
            raise RefusedError(f"HTTP 429: {r.text[:200]}")
        if r.status_code >= 400:
            raise ProtocolError(f"HTTP {r.status_code}: {r.text[:200]}")

        html = r.text
        if "login.html" in html[:2000] and "PDDAccessToken" not in html[:2000]:
            raise RefusedError("response is login page")

        raw = _extract_raw_data(html)
        try:
            goods = raw["store"]["initDataObj"]["goods"]
        except (KeyError, TypeError) as e:
            raise ProtocolError(f"goods block missing in rawData: {e}") from e
        if not goods.get("goodsID") and not goods.get("goods_id"):
            raise GoodsUnavailable("goods block empty")
        name = (goods.get("goodsName") or "").strip()
        if not name or "售罄" in name or "已下架" in name:
            raise GoodsUnavailable(f"goodsName={name!r}")
        sku_list = goods.get("skus") or goods.get("sku") or goods.get("sku_list") or []
        if not sku_list:
            raise GoodsUnavailable("no sku")
        # 返回完整 rawData（调用方写盘），校验用 goods 块
        return raw
