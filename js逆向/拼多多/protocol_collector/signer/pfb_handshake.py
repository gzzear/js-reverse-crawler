"""PDD pfb/a4 session-bootstrap handshake.

Sequence:
  1. GET  /proxy/api/xg/pfb/a3                              -> {"result": "<njrpl_seed>"}
  2. POST /proxy/api/api/phantom/ba/dt/cg?pdduid=<uid>      -> plugin-detection dict
  3. POST /proxy/api/xg/pfb/a4                              -> {"result": {"a": njrpl, "b": dilx, ...}}

The pfb/a4 body is `{data, timestamp, appKey, sign}` where:
  data      = "0a" + base64url( zlib.deflate( tlv_encode(payload_dict) ) )
  appKey    = "fe"   (hardcoded in goods page bundle)
  sign      = sha1_hex( appKey + SECRET + str(timestamp_ms) + data )
  SECRET    = "HJ6793TJDI86DLS9D"

The TLV wire format is a flat sequence of (key, value) pairs. Each entry is:
  marker: b"\xe2\x03"
  length: LEB128 varint, real_length = (varint_value >> 1)
  bytes:  utf-8 payload of the key or value

Even-indexed chunks are keys, odd-indexed chunks are their values.
"""
from __future__ import annotations

import base64
import hashlib
import json
import random
import string
import time
import zlib
from dataclasses import dataclass
from pathlib import Path
from typing import Optional

import httpx

from .templates import TEMPLATE_PATH

# ---------------------------------------------------------------------------
# Constants
# ---------------------------------------------------------------------------

PFB_A3_URL = "https://mobile.yangkeduo.com/proxy/api/xg/pfb/a3"
BA_DT_CG_URL = "https://mobile.yangkeduo.com/proxy/api/api/phantom/ba/dt/cg"
PFB_A4_URL = "https://mobile.yangkeduo.com/proxy/api/xg/pfb/a4"

APP_KEY = "fe"
SIGN_SECRET = "HJ6793TJDI86DLS9D"

TLV_MARKER = b"\xe2\x03"

DEFAULT_UA = (
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) "
    "AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36"
)

# Fields whose values must be refreshed each handshake.
# (Most other fields are stable browser-fingerprint values from the captured template.)
DYNAMIC_KEYS = {
    "reportTimestamp",
    "uid",
    "FKGJ",        # mirrors dilx cookie
    "pageId",
    "moveData",
    "rawData",     # JSON blob containing UA + various sub-fields
    "perfTiming",
}


# ---------------------------------------------------------------------------
# TLV codec
# ---------------------------------------------------------------------------

def _read_varint(buf: bytes, pos: int) -> tuple[int, int]:
    result = 0
    shift = 0
    while True:
        b = buf[pos]
        pos += 1
        result |= (b & 0x7F) << shift
        if not (b & 0x80):
            return result, pos
        shift += 7


def _write_varint(value: int) -> bytes:
    out = bytearray()
    while True:
        b = value & 0x7F
        value >>= 7
        if value:
            out.append(b | 0x80)
        else:
            out.append(b)
            return bytes(out)


def tlv_decode(blob: bytes) -> list[tuple[str, bytes]]:
    """Parse a TLV blob into an ordered list of (key, value) pairs."""
    pos = 0
    chunks: list[bytes] = []
    while pos < len(blob):
        if blob[pos:pos + 2] != TLV_MARKER:
            raise ValueError(f"missing TLV marker at offset {pos}")
        pos += 2
        ln_v, pos = _read_varint(blob, pos)
        ln = ln_v >> 1
        chunks.append(blob[pos:pos + ln])
        pos += ln
    if len(chunks) % 2 != 0:
        raise ValueError(f"odd number of TLV chunks: {len(chunks)}")
    return [
        (chunks[i].decode("utf-8"), chunks[i + 1])
        for i in range(0, len(chunks), 2)
    ]


def tlv_encode(pairs: list[tuple[str, bytes]]) -> bytes:
    out = bytearray()
    for k, v in pairs:
        kb = k.encode("utf-8")
        for chunk in (kb, v):
            out += TLV_MARKER
            out += _write_varint(len(chunk) << 1)
            out += chunk
    return bytes(out)


# ---------------------------------------------------------------------------
# Wire encoding
# ---------------------------------------------------------------------------

def encode_data_field(payload: bytes) -> str:
    """payload (raw TLV blob) -> '0a' + base64url(zlib.deflate(payload))."""
    compressed = zlib.compress(payload, 6)
    b64 = base64.urlsafe_b64encode(compressed).rstrip(b"=").decode("ascii")
    return "0a" + b64


def compute_sign(data: str, timestamp_ms: int) -> str:
    raw = APP_KEY + SIGN_SECRET + str(timestamp_ms) + data
    return hashlib.sha1(raw.encode("utf-8")).hexdigest()


# ---------------------------------------------------------------------------
# Field mutation
# ---------------------------------------------------------------------------

def _rand_pageid_prefix(rng: random.Random) -> str:
    """Mimic the captured prefix shape e.g. 'D9OGKAooY6kby9~poBGWR'."""
    alpha = string.ascii_letters + string.digits + "~"
    return "".join(rng.choice(alpha) for _ in range(21))


def mutate_template(
    pairs: list[tuple[str, bytes]],
    *,
    uid: str,
    nano_fp: str,
    dilx: str,
    ua: str = DEFAULT_UA,
    rng: Optional[random.Random] = None,
) -> tuple[list[tuple[str, bytes]], int]:
    """Refresh dynamic fields. Returns (new_pairs, timestamp_ms)."""
    rng = rng or random.Random()
    now_ms = int(time.time() * 1000)
    page_ts = now_ms - rng.randint(50, 500)
    move_ts = now_ms - rng.randint(500, 2000)

    page_id = f"{_rand_pageid_prefix(rng)}{page_ts}"
    move_data = json.dumps([{
        "clientX": round(rng.uniform(50, 1200), 1),
        "clientY": round(rng.uniform(50, 800), 1),
        "timestamp": move_ts,
        "isTrusted": False,
    }], separators=(",", ":"))

    out: list[tuple[str, bytes]] = []
    for k, v in pairs:
        if k == "reportTimestamp":
            v = str(now_ms).encode("utf-8")
        elif k == "uid":
            v = uid.encode("utf-8")
        elif k == "FKGJ":
            v = dilx.encode("utf-8")
        elif k == "pageId":
            v = page_id.encode("utf-8")
        elif k == "moveData":
            v = move_data.encode("utf-8")
        elif k == "rawData":
            try:
                obj = json.loads(v.decode("utf-8"))
                obj["ua"] = ua
                if "_nano_fp" in obj:
                    obj["_nano_fp"] = nano_fp
                if "uid" in obj:
                    obj["uid"] = uid
                v = json.dumps(obj, separators=(",", ":"), ensure_ascii=False).encode("utf-8")
            except Exception:
                pass
        out.append((k, v))
    return out, now_ms


# ---------------------------------------------------------------------------
# Handshake
# ---------------------------------------------------------------------------

@dataclass
class HandshakeResult:
    njrpl: str
    dilx: str
    raw: dict

    def cookies(self) -> dict[str, str]:
        return {"njrpl": self.njrpl, "jrpl": self.njrpl, "dilx": self.dilx}


class PfbHandshake:
    """Run the pfb/a3 → ba/dt/cg → pfb/a4 bootstrap and inject session cookies."""

    def __init__(
        self,
        *,
        client: httpx.Client,
        uid: str,
        cookies: dict[str, str],
        ua: str = DEFAULT_UA,
        template_path: Path = TEMPLATE_PATH,
    ) -> None:
        self.client = client
        self.uid = uid
        self.cookies = dict(cookies)
        self.ua = ua
        self.template_path = template_path
        self._template_pairs: Optional[list[tuple[str, bytes]]] = None

    # --- helpers ----------------------------------------------------------

    def _common_headers(self, *, content_type: Optional[str] = None) -> dict[str, str]:
        headers = {
            "user-agent": self.ua,
            "accept": "application/json, text/plain, */*",
            "accept-language": "zh-CN,zh;q=0.9",
            "origin": "https://mobile.yangkeduo.com",
            "referer": "https://mobile.yangkeduo.com/goods.html",
            "sec-ch-ua": '"Chromium";v="146", "Not-A.Brand";v="24", "Google Chrome";v="146"',
            "sec-ch-ua-mobile": "?0",
            "sec-ch-ua-platform": '"macOS"',
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "same-origin",
        }
        if content_type:
            headers["content-type"] = content_type
        return headers

    def _load_template(self) -> list[tuple[str, bytes]]:
        if self._template_pairs is None:
            blob = self.template_path.read_bytes()
            self._template_pairs = tlv_decode(blob)
        # return a shallow copy so callers can mutate
        return list(self._template_pairs)

    # --- steps ------------------------------------------------------------

    def fetch_pfb_a3(self) -> str:
        r = self.client.get(
            PFB_A3_URL, headers=self._common_headers(), cookies=self.cookies
        )
        r.raise_for_status()
        body = r.json()
        seed = body.get("result")
        if not isinstance(seed, str) or not seed:
            raise RuntimeError(f"pfb/a3 missing result: {body}")
        return seed

    def fetch_ba_dt_cg(self) -> dict:
        r = self.client.post(
            BA_DT_CG_URL,
            params={"pdduid": self.uid},
            headers=self._common_headers(),
            cookies=self.cookies,
            content=b"",
        )
        r.raise_for_status()
        body = r.json()
        if not body.get("success"):
            raise RuntimeError(f"ba/dt/cg failed: {body}")
        return body.get("result") or {}

    def post_pfb_a4(
        self,
        *,
        njrpl_seed: str,
        plugin_dict: dict,
    ) -> HandshakeResult:
        # Mutate template fields
        pairs = self._load_template()
        nano_fp = self.cookies.get("_nano_fp", "")
        dilx_in = self.cookies.get("dilx", "")
        pairs, ts_ms = mutate_template(
            pairs, uid=self.uid, nano_fp=nano_fp, dilx=dilx_in, ua=self.ua
        )
        # NOTE: domElems / plugin scan results are taken straight from template;
        # the captured value already represents an empty/no-extension page so it
        # passes server-side scoring without us re-running ba/dt/cg detection.

        blob = tlv_encode(pairs)
        data = encode_data_field(blob)
        sign = compute_sign(data, ts_ms)
        body = {
            "data": data,
            "timestamp": ts_ms,
            "appKey": APP_KEY,
            "sign": sign,
        }

        r = self.client.post(
            PFB_A4_URL,
            headers=self._common_headers(content_type="application/json;charset=UTF-8"),
            cookies=self.cookies,
            json=body,
        )
        r.raise_for_status()
        resp = r.json()
        if not resp.get("success"):
            raise RuntimeError(f"pfb/a4 failed: {resp}")
        result = resp.get("result") or {}
        a = result.get("a")
        b = result.get("b")
        if not a or not b:
            raise RuntimeError(f"pfb/a4 missing a/b in result: {resp}")
        return HandshakeResult(njrpl=a, dilx=b, raw=result)

    def run(self) -> HandshakeResult:
        seed = self.fetch_pfb_a3()
        # Servers expect the seed to be present in the cookie jar before subsequent calls.
        self.cookies.setdefault("njrpl", seed)
        self.cookies.setdefault("jrpl", seed)
        plugin_dict = self.fetch_ba_dt_cg()
        return self.post_pfb_a4(njrpl_seed=seed, plugin_dict=plugin_dict)


# ---------------------------------------------------------------------------
# Self-test entry point
# ---------------------------------------------------------------------------

def _selftest_roundtrip() -> None:
    """Verify TLV decode/encode is byte-identical against the bundled template."""
    blob = TEMPLATE_PATH.read_bytes()
    pairs = tlv_decode(blob)
    again = tlv_encode(pairs)
    assert again == blob, f"roundtrip mismatch: {len(again)} vs {len(blob)}"
    print(f"OK: roundtrip identical, {len(pairs)} key/value pairs, {len(blob)} bytes")


def _selftest_sign() -> None:
    """Verify the sign formula against a captured request body."""
    sample = Path("/tmp/pdd_pfb_a4_latest_req.bin")
    if not sample.exists():
        print("skip sign self-test: sample missing")
        return
    body = json.loads(sample.read_bytes())
    expected = body["sign"]
    got = compute_sign(body["data"], body["timestamp"])
    assert got == expected, f"sign mismatch: {got} vs {expected}"
    print(f"OK: sign matches captured ({expected})")


if __name__ == "__main__":  # pragma: no cover
    _selftest_roundtrip()
    _selftest_sign()
