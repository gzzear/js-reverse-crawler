"""Thread-safe Python wrapper around signer/sign_worker.js.

Spawns a long-lived `node sign_worker.js` child process and talks to it over
NDJSON on stdin/stdout. A single lock serializes requests since the worker is
single-threaded; for higher throughput, use `AntiContentPool`.
"""
from __future__ import annotations

import itertools
import json
import shutil
import subprocess
import threading
from dataclasses import dataclass, field
from pathlib import Path
from queue import Empty, Queue

SIGNER_DIR = Path(__file__).resolve().parent
WORKER_JS = SIGNER_DIR / "sign_worker.js"

_NODE_BIN = shutil.which("node") or "node"


class SignerError(RuntimeError):
    pass


@dataclass
class AntiContentSigner:
    """One Node.js signer subprocess. Not re-entrant — guarded by an internal lock."""

    node_bin: str = _NODE_BIN
    worker_js: Path = WORKER_JS
    _proc: subprocess.Popen | None = field(default=None, init=False, repr=False)
    _lock: threading.Lock = field(default_factory=threading.Lock, init=False, repr=False)
    _ids: "itertools.count[int]" = field(default_factory=lambda: itertools.count(1), init=False, repr=False)

    def start(self) -> None:
        if self._proc is not None:
            return
        if not self.worker_js.exists():
            raise SignerError(f"sign_worker.js not found: {self.worker_js}")
        self._proc = subprocess.Popen(
            [self.node_bin, str(self.worker_js)],
            stdin=subprocess.PIPE,
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE,
            bufsize=0,
            text=True,
        )
        # Wait for READY line on stderr before accepting requests.
        assert self._proc.stderr is not None
        while True:
            line = self._proc.stderr.readline()
            if not line:
                err = self._proc.stderr.read() if self._proc.stderr else ""
                raise SignerError(f"sign_worker exited before READY: {err}")
            if line.strip() == "READY":
                break
        # Drain further stderr in background so it doesn't block the pipe.
        threading.Thread(target=self._drain_stderr, daemon=True).start()

    def _drain_stderr(self) -> None:
        assert self._proc is not None and self._proc.stderr is not None
        for _ in self._proc.stderr:
            pass

    def stop(self) -> None:
        if self._proc is None:
            return
        try:
            if self._proc.stdin:
                self._proc.stdin.close()
            self._proc.wait(timeout=3)
        except Exception:
            self._proc.kill()
        finally:
            self._proc = None

    def sign(self, *, goods_id: str, ua: str | None = None, cookie: str | None = None) -> str:
        if self._proc is None:
            self.start()
        assert self._proc is not None and self._proc.stdin and self._proc.stdout
        req = {"id": next(self._ids), "goodsId": str(goods_id)}
        if ua:
            req["ua"] = ua
        if cookie:
            req["cookie"] = cookie
        payload = json.dumps(req, ensure_ascii=False) + "\n"
        with self._lock:
            try:
                self._proc.stdin.write(payload)
                self._proc.stdin.flush()
                line = self._proc.stdout.readline()
            except BrokenPipeError as e:
                raise SignerError(f"sign_worker pipe broken: {e}") from e
        if not line:
            raise SignerError("sign_worker closed stdout unexpectedly")
        resp = json.loads(line)
        if not resp.get("ok"):
            raise SignerError(resp.get("error") or "unknown signer error")
        return resp["antiContent"]

    def __enter__(self) -> "AntiContentSigner":
        self.start()
        return self

    def __exit__(self, exc_type, exc, tb) -> None:
        self.stop()


class AntiContentPool:
    """Fixed-size pool of signer workers for concurrent callers.

    Each worker is single-threaded; pool size should match the collector's
    thread count.
    """

    def __init__(self, size: int = 3) -> None:
        if size < 1:
            raise ValueError("pool size must be >= 1")
        self._size = size
        self._pool: Queue[AntiContentSigner] = Queue()
        self._all: list[AntiContentSigner] = []

    def start(self) -> None:
        for _ in range(self._size):
            s = AntiContentSigner()
            s.start()
            self._all.append(s)
            self._pool.put(s)

    def stop(self) -> None:
        for s in self._all:
            s.stop()
        self._all.clear()
        while True:
            try:
                self._pool.get_nowait()
            except Empty:
                break

    def sign(self, *, goods_id: str, ua: str | None = None, cookie: str | None = None) -> str:
        if not self._all:
            self.start()
        worker = self._pool.get()
        try:
            return worker.sign(goods_id=goods_id, ua=ua, cookie=cookie)
        finally:
            self._pool.put(worker)


if __name__ == "__main__":
    import argparse
    ap = argparse.ArgumentParser()
    ap.add_argument("--goods-id", required=True)
    ap.add_argument("--ua", default=None)
    ap.add_argument("--cookie", default=None)
    ap.add_argument("-n", type=int, default=3, help="how many signatures to generate")
    args = ap.parse_args()
    with AntiContentSigner() as s:
        for i in range(args.n):
            sig = s.sign(goods_id=args.goods_id, ua=args.ua, cookie=args.cookie)
            print(f"[{i+1}] len={len(sig)} head={sig[:32]}... tail={sig[-16:]}")
