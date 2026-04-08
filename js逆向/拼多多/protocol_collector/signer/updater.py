"""Fetch and cache PDD's react_anti_co_*.js bundle.

The file name contains a rolling hash that changes ~monthly. We resolve it by
GET'ing a goods.html page and regex'ing the script tag out of the HTML.
"""
from __future__ import annotations

import hashlib
import re
from pathlib import Path

import httpx

SIGNER_DIR = Path(__file__).resolve().parent
ANTI_CO_PATH = SIGNER_DIR / "anti_co.js"
META_PATH = SIGNER_DIR / "anti_co.meta"

BOOTSTRAP_URL = "https://mobile.yangkeduo.com/goods.html?goods_id=878497893729"
SCRIPT_RE = re.compile(r"(?:https://static\.pddpic\.com/)?assets/js/react_anti_co_[0-9a-f]+_\d+\.js")
CDN_BASE = "https://static.pddpic.com/"

DEFAULT_UA = (
    "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) "
    "AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1"
)


def resolve_anti_co_url(ua: str = DEFAULT_UA) -> str:
    r = httpx.get(BOOTSTRAP_URL, headers={"user-agent": ua}, timeout=15, follow_redirects=True)
    r.raise_for_status()
    m = SCRIPT_RE.search(r.text)
    if not m:
        raise RuntimeError("cannot find react_anti_co_*.js url in goods.html")
    hit = m.group(0)
    if hit.startswith("assets/"):
        hit = CDN_BASE + hit
    return hit


def ensure_anti_co(force: bool = False, ua: str = DEFAULT_UA) -> Path:
    """Ensure anti_co.js is present on disk, return its path.

    If META_PATH records a matching URL and the file exists, skip re-download.
    """
    url = resolve_anti_co_url(ua)
    if not force and ANTI_CO_PATH.exists() and META_PATH.exists():
        if META_PATH.read_text().strip() == url:
            return ANTI_CO_PATH

    r = httpx.get(url, headers={"user-agent": ua}, timeout=30)
    r.raise_for_status()
    ANTI_CO_PATH.write_bytes(r.content)
    META_PATH.write_text(url)
    digest = hashlib.sha256(r.content).hexdigest()[:12]
    print(f"[updater] downloaded {url} ({len(r.content)} bytes, sha256={digest})")
    return ANTI_CO_PATH


if __name__ == "__main__":
    path = ensure_anti_co(force=True)
    print(f"[updater] anti_co.js at {path}")
