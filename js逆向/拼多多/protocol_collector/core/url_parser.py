"""Extract goods_id from pasted text (URL per line or bare numeric id)."""
from __future__ import annotations

import re

GOODS_ID_RE = re.compile(r"goods_id=(\d+)")


def extract_goods_ids(text: str) -> list[str]:
    return [gid for gid, _ in extract_url_entries(text)]


def extract_url_entries(text: str) -> list[tuple[str, str | None]]:
    """Return [(goods_id, original_url_or_None), ...] preserving the
    user's original URL (with uin, _oak_rcto, etc.) so we can replay it."""
    out: list[tuple[str, str | None]] = []
    seen: set[str] = set()
    for raw in text.splitlines():
        line = raw.strip()
        if not line:
            continue
        m = GOODS_ID_RE.search(line)
        gid: str | None = None
        url: str | None = None
        if m:
            gid = m.group(1)
            if line.startswith("http"):
                url = line
        elif line.isdigit() and 8 <= len(line) <= 20:
            gid = line
        if gid and gid not in seen:
            seen.add(gid)
            out.append((gid, url))
    return out
