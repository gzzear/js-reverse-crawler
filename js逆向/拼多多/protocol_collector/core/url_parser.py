"""Extract goods_id from pasted text (URL per line or bare numeric id)."""
from __future__ import annotations

import re

GOODS_ID_RE = re.compile(r"goods_id=(\d+)")


def extract_goods_ids(text: str) -> list[str]:
    out: list[str] = []
    seen: set[str] = set()
    for raw in text.splitlines():
        line = raw.strip()
        if not line:
            continue
        m = GOODS_ID_RE.search(line)
        gid: str | None = None
        if m:
            gid = m.group(1)
        elif line.isdigit() and 8 <= len(line) <= 20:
            gid = line
        if gid and gid not in seen:
            seen.add(gid)
            out.append(gid)
    return out
