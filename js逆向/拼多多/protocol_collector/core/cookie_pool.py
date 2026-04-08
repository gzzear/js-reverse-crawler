"""Parse pasted cookies, rotate them across requests, track success/failure."""
from __future__ import annotations

import threading
from dataclasses import dataclass, field
from http.cookies import SimpleCookie
from typing import Iterable, Optional

REQUIRED_KEYS = ("PDDAccessToken",)
USEFUL_KEYS = (
    "PDDAccessToken", "pdd_user_id", "api_uid", "_nano_fp",
    "pdd_vds", "njrpl", "jrpl", "dilx", "webp",
)


def parse_cookie_string(raw: str) -> dict[str, str]:
    """Parse a browser-exported cookie string into a dict."""
    out: dict[str, str] = {}
    if not raw:
        return out
    sc: SimpleCookie = SimpleCookie()
    try:
        sc.load(raw)
    except Exception:
        pass
    for k, morsel in sc.items():
        out[k] = morsel.value
    # Fallback: manual split (SimpleCookie is finicky about some values)
    if not out:
        for part in raw.split(";"):
            if "=" not in part:
                continue
            k, _, v = part.strip().partition("=")
            if k:
                out[k] = v
    return out


@dataclass
class CookieEntry:
    raw: str
    parsed: dict[str, str]
    success_count: int = 0
    fail_count: int = 0
    consecutive_fails: int = 0
    dead: bool = False

    @property
    def pdd_user_id(self) -> str:
        return self.parsed.get("pdd_user_id", "") or self.parsed.get("PDDAccessToken", "")[:8]

    @property
    def access_token(self) -> str:
        return self.parsed.get("PDDAccessToken", "")

    @property
    def valid(self) -> bool:
        return bool(self.parsed.get("PDDAccessToken"))

    def cookie_header(self) -> str:
        return "; ".join(f"{k}={v}" for k, v in self.parsed.items())


class CookiePool:
    """Round-robin cookie pool with automatic death on N consecutive failures."""

    DEFAULT_DEATH_THRESHOLD = 5

    def __init__(self, death_threshold: int = DEFAULT_DEATH_THRESHOLD) -> None:
        self._entries: list[CookieEntry] = []
        self._cursor = 0
        self._lock = threading.Lock()
        self._death_threshold = death_threshold

    def load_from_text(self, text: str) -> list[CookieEntry]:
        """Parse text where each non-empty line is a full cookie string."""
        with self._lock:
            self._entries.clear()
            self._cursor = 0
            for line in text.splitlines():
                line = line.strip()
                if not line:
                    continue
                entry = CookieEntry(raw=line, parsed=parse_cookie_string(line))
                self._entries.append(entry)
            return list(self._entries)

    def __iter__(self) -> Iterable[CookieEntry]:
        with self._lock:
            return iter(list(self._entries))

    def __len__(self) -> int:
        return len(self._entries)

    def entries(self) -> list[CookieEntry]:
        with self._lock:
            return list(self._entries)

    def acquire(self) -> Optional[CookieEntry]:
        """Return the next alive+valid cookie, or None if pool is exhausted."""
        with self._lock:
            n = len(self._entries)
            if n == 0:
                return None
            for _ in range(n):
                c = self._entries[self._cursor % n]
                self._cursor = (self._cursor + 1) % n
                if c.valid and not c.dead:
                    return c
            return None

    def set_death_threshold(self, n: int) -> None:
        with self._lock:
            self._death_threshold = max(1, int(n))

    def report_success(self, entry: CookieEntry) -> None:
        with self._lock:
            entry.success_count += 1
            entry.consecutive_fails = 0

    def report_failure(self, entry: CookieEntry) -> None:
        with self._lock:
            entry.fail_count += 1
            entry.consecutive_fails += 1
            if entry.consecutive_fails >= self._death_threshold:
                entry.dead = True

    def filter_alive(self) -> list[str]:
        with self._lock:
            return [e.raw for e in self._entries if e.success_count > 0]

    def filter_dead(self) -> list[str]:
        with self._lock:
            return [e.raw for e in self._entries if e.success_count == 0]
