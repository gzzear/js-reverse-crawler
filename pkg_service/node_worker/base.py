"""长生命周期 Node worker 的 Python 侧通用基座。

- `NodeWorker`：一个常驻 `node worker.js` 子进程，stdin/stdout 走 NDJSON。
- `NodeWorkerPool`：固定大小池，多线程调用者从 Queue 里抢 worker。

worker.js 必须满足：启动后向 stderr 打一行 `READY`；每次 stdin 收到一行 JSON
`{"id": N, "payload": {...}}`，stdout 回一行 `{"id": N, "ok": bool, "result"|"error": ...}`。
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
from typing import Any

_NODE_BIN_DEFAULT = shutil.which("node") or "node"


class NodeWorkerError(RuntimeError):
    pass


@dataclass
class NodeWorker:
    """单个 `node worker.js` 子进程，内部有锁，非可重入。"""

    worker_js: Path
    node_bin: str = _NODE_BIN_DEFAULT
    ready_timeout: float = 30.0
    _proc: subprocess.Popen | None = field(default=None, init=False, repr=False)
    _lock: threading.Lock = field(default_factory=threading.Lock, init=False, repr=False)
    _ids: "itertools.count[int]" = field(
        default_factory=lambda: itertools.count(1), init=False, repr=False
    )

    def start(self) -> None:
        if self._proc is not None:
            return
        if not self.worker_js.exists():
            raise NodeWorkerError(f"worker.js not found: {self.worker_js}")
        self._proc = subprocess.Popen(
            [self.node_bin, str(self.worker_js)],
            stdin=subprocess.PIPE,
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE,
            bufsize=0,
            text=True,
            cwd=str(self.worker_js.parent),
        )
        assert self._proc.stderr is not None
        while True:
            line = self._proc.stderr.readline()
            if not line:
                tail = self._proc.stderr.read() if self._proc.stderr else ""
                raise NodeWorkerError(f"worker exited before READY: {tail}")
            if line.strip() == "READY":
                break
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

    def call(self, payload: dict[str, Any]) -> dict[str, Any]:
        if self._proc is None:
            self.start()
        assert self._proc is not None and self._proc.stdin and self._proc.stdout
        req = {"id": next(self._ids), "payload": payload}
        data = json.dumps(req, ensure_ascii=False) + "\n"
        with self._lock:
            try:
                self._proc.stdin.write(data)
                self._proc.stdin.flush()
                line = self._proc.stdout.readline()
            except BrokenPipeError as e:
                raise NodeWorkerError(f"worker pipe broken: {e}") from e
        if not line:
            raise NodeWorkerError("worker closed stdout unexpectedly")
        resp = json.loads(line)
        if not resp.get("ok"):
            raise NodeWorkerError(resp.get("error") or "unknown worker error")
        return resp["result"]

    def __enter__(self) -> "NodeWorker":
        self.start()
        return self

    def __exit__(self, exc_type, exc, tb) -> None:
        self.stop()


class NodeWorkerPool:
    """固定大小 worker 池，blocking Queue 调度。每个 worker 单线程，池大小决定并发上限。"""

    def __init__(self, worker_js: Path, size: int = 2, node_bin: str | None = None) -> None:
        if size < 1:
            raise ValueError("pool size must be >= 1")
        self._worker_js = worker_js
        self._node_bin = node_bin or _NODE_BIN_DEFAULT
        self._size = size
        self._pool: Queue[NodeWorker] = Queue()
        self._all: list[NodeWorker] = []
        self._started = False
        self._start_lock = threading.Lock()

    def start(self) -> None:
        with self._start_lock:
            if self._started:
                return
            for _ in range(self._size):
                w = NodeWorker(worker_js=self._worker_js, node_bin=self._node_bin)
                w.start()
                self._all.append(w)
                self._pool.put(w)
            self._started = True

    def stop(self) -> None:
        with self._start_lock:
            for w in self._all:
                w.stop()
            self._all.clear()
            self._started = False
            while True:
                try:
                    self._pool.get_nowait()
                except Empty:
                    break

    def call(self, payload: dict[str, Any], timeout: float | None = None) -> dict[str, Any]:
        if not self._started:
            self.start()
        worker = self._pool.get(timeout=timeout)
        try:
            return worker.call(payload)
        finally:
            self._pool.put(worker)

    @property
    def size(self) -> int:
        return self._size
