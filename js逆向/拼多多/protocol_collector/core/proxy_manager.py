"""Parse / validate simple http(s) proxies."""
from __future__ import annotations

from dataclasses import dataclass

import httpx


@dataclass
class Proxy:
    host: str
    port: int
    user: str | None = None
    password: str | None = None

    @property
    def url(self) -> str:
        auth = f"{self.user}:{self.password}@" if self.user else ""
        return f"http://{auth}{self.host}:{self.port}"


def parse_proxy(raw: str) -> Proxy | None:
    raw = (raw or "").strip()
    if not raw:
        return None
    parts = raw.split(":")
    if len(parts) == 2:
        return Proxy(parts[0], int(parts[1]))
    if len(parts) == 4:
        return Proxy(parts[0], int(parts[1]), parts[2], parts[3])
    raise ValueError(f"invalid proxy: expected host:port or host:port:user:pass, got {raw!r}")


def verify_proxy(proxy: Proxy, timeout: float = 5.0) -> tuple[bool, str]:
    try:
        with httpx.Client(proxy=proxy.url, timeout=timeout) as c:
            r = c.get("https://mobile.yangkeduo.com/api/server/_stm")
            return (r.status_code == 200, f"HTTP {r.status_code}")
    except Exception as e:
        return (False, str(e))
