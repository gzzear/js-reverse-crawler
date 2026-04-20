"""Collector worker: pulls URLs off a queue, signs + fetches + writes."""
from __future__ import annotations

import threading
import traceback
from collections import deque
from dataclasses import dataclass
from pathlib import Path
from typing import Callable, Optional

from PyQt6.QtCore import QObject, QThread, pyqtSignal

from core.cookie_pool import CookieEntry, CookiePool
from core.pdd_client import DEFAULT_UA, GoodsUnavailable, PddClient, ProtocolError, RefusedError
from core.proxy_manager import Proxy
from core.result_writer import ResultWriter


@dataclass
class CollectorConfig:
    urls: list                          # list[tuple[str, str|None]] (goods_id, original_url)
    ua: str = DEFAULT_UA
    interval_sec: float = 1.0
    threads: int = 3
    per_cookie_reuse: int = 1           # requests per cookie before rotating
    proxy: Optional[Proxy] = None
    death_threshold: int = 5
    max_retries: int = 3                # per-gid retries before giving up
    output_dir: Optional[Path] = None


class CollectorWorker(QObject):
    log = pyqtSignal(str, str)              # (level, text) — level in INFO/OK/WARN/ERR
    progress = pyqtSignal(int, int)          # (done, total)
    cookie_updated = pyqtSignal(int)         # row index in pool
    gid_consumed = pyqtSignal(str)           # emitted once when a gid reaches terminal state
    finished = pyqtSignal()

    def __init__(self, config: CollectorConfig, cookie_pool: CookiePool) -> None:
        super().__init__()
        self._cfg = config
        self._pool = cookie_pool
        self._pool.set_death_threshold(config.death_threshold)
        # queue holds (gid, original_url) tuples
        self._queue: deque = deque(
            (u if isinstance(u, tuple) else (u, None)) for u in config.urls
        )
        self._url_map: dict[str, str | None] = {gid: url for gid, url in self._queue}
        self._queue_lock = threading.Lock()
        self._stop = threading.Event()
        self._done = 0
        self._total = len(config.urls)
        self._writer = ResultWriter(out_dir=config.output_dir) if config.output_dir else ResultWriter()
        self._client = PddClient(ua=config.ua, proxy=config.proxy)
        # track per-cookie consecutive uses for rotation
        self._cookie_uses: dict[int, int] = {}
        self._cookie_uses_lock = threading.Lock()
        self._done_lock = threading.Lock()
        self._attempts: dict[str, int] = {}
        self._attempts_lock = threading.Lock()
        self._failed: list[str] = []
        self._failed_seen: set[str] = set()
        self._failed_lock = threading.Lock()

    def _bump_done(self) -> int:
        with self._done_lock:
            self._done += 1
            return self._done

    def _bump_attempt(self, gid: str) -> int:
        with self._attempts_lock:
            n = self._attempts.get(gid, 0) + 1
            self._attempts[gid] = n
            return n

    def _interruptible_sleep(self, secs: float) -> None:
        if secs > 0:
            self._stop.wait(secs)

    def failed_gids(self) -> list[str]:
        with self._failed_lock:
            return list(self._failed)

    def _record_failure(self, gid: str) -> None:
        with self._failed_lock:
            if gid in self._failed_seen:
                return
            self._failed_seen.add(gid)
            self._failed.append(gid)

    # --- control ---
    def request_stop(self) -> None:
        self._stop.set()

    # --- queue ---
    def _pop(self) -> Optional[tuple]:
        with self._queue_lock:
            if not self._queue:
                return None
            return self._queue.popleft()

    def _push_front(self, item: tuple) -> None:
        with self._queue_lock:
            self._queue.appendleft(item)

    # --- per-worker cookie rotation ---
    def _next_cookie(self, current: Optional[CookieEntry]) -> Optional[CookieEntry]:
        reuse = max(1, self._cfg.per_cookie_reuse)
        if current is not None:
            idx = id(current)
            with self._cookie_uses_lock:
                uses = self._cookie_uses.get(idx, 0) + 1
                self._cookie_uses[idx] = uses
                keep = uses < reuse and not current.dead
                if not keep:
                    self._cookie_uses[idx] = 0
            if keep:
                return current
        return self._pool.acquire()

    # --- worker thread ---
    def _run_one(self, thread_idx: int) -> None:
        try:
            self._run_one_inner(thread_idx)
        except Exception:
            self.log.emit("ERR", f"[T{thread_idx}] worker 异常退出:\n" + traceback.format_exc())

    def _run_one_inner(self, thread_idx: int) -> None:
        current: Optional[CookieEntry] = None
        while not self._stop.is_set():
            item = self._pop()
            if item is None:
                return
            gid, original_url = item
            cookie = self._next_cookie(current if not (current and current.dead) else None)
            current = cookie
            if cookie is None:
                self._push_front(item)
                with self._queue_lock:
                    remaining = len(self._queue)
                self.log.emit("ERR", f"[T{thread_idx}] 没有可用 cookie，队列剩余 {remaining}，终止该线程")
                return

            def _retry_or_fail(reason: str) -> None:
                attempt = self._bump_attempt(gid)
                if attempt >= self._cfg.max_retries:
                    self.log.emit("ERR", f"[T{thread_idx}] goods_id={gid} 重试 {attempt} 次仍失败 ({reason})，放弃")
                    self._record_failure(gid)
                    done = self._bump_done()
                    self.progress.emit(done, self._total)
                    self.gid_consumed.emit(gid)
                else:
                    self._push_front(item)

            try:
                data = self._client.fetch_goods_detail(
                    goods_id=gid, cookie=cookie, original_url=original_url,
                )
            except GoodsUnavailable as e:
                # 商品级软封控（售罄/下架）— 不计 cookie 失败、不重试
                self.log.emit("WARN", f"[T{thread_idx}] goods_id={gid} 商品不可用: {e}")
                self._record_failure(gid)
                done = self._bump_done()
                self.progress.emit(done, self._total)
                self.gid_consumed.emit(gid)
                continue
            except RefusedError as e:
                self._pool.report_failure(cookie)
                self._emit_cookie_update(cookie)
                self.log.emit("WARN", f"[T{thread_idx}] goods_id={gid} 风控拒绝 (cookie#{self._cookie_row(cookie)}) {str(e)[:120]}")
                _retry_or_fail("REFUSE")
                self._interruptible_sleep(self._cfg.interval_sec)
                continue
            except ProtocolError as e:
                # Per-item parse failure (e.g. removed/invalid goods_id) — skip,
                # don't blame the cookie or requeue.
                self.log.emit("WARN", f"[T{thread_idx}] goods_id={gid} 跳过 (无商品数据): {e}")
                self._record_failure(gid)
                done = self._bump_done()
                self.progress.emit(done, self._total)
                self.gid_consumed.emit(gid)
                continue
            except Exception as e:
                self._pool.report_failure(cookie)
                self._emit_cookie_update(cookie)
                self.log.emit("ERR", f"[T{thread_idx}] goods_id={gid} 请求失败 {e!s}")
                _retry_or_fail(f"err:{type(e).__name__}")
                self._interruptible_sleep(self._cfg.interval_sec)
                continue

            try:
                path = self._writer.dump(gid, data)
            except Exception as e:
                self.log.emit("ERR", f"[T{thread_idx}] goods_id={gid} 写盘失败 {e}")
                _retry_or_fail("write")
                self._interruptible_sleep(self._cfg.interval_sec)
                continue

            self._pool.report_success(cookie)
            self._emit_cookie_update(cookie)
            done = self._bump_done()
            self.progress.emit(done, self._total)
            try:
                rel = path.relative_to(self._writer.out_dir.parent.parent)
            except ValueError:
                rel = path.name
            self.log.emit("OK", f"[T{thread_idx}] goods_id={gid} → {rel}")
            self.gid_consumed.emit(gid)
            self._interruptible_sleep(self._cfg.interval_sec)

    def _cookie_row(self, cookie: CookieEntry) -> int:
        for i, e in enumerate(self._pool.entries()):
            if e is cookie:
                return i + 1
        return -1

    def _emit_cookie_update(self, cookie: CookieEntry) -> None:
        row = self._cookie_row(cookie) - 1
        if row >= 0:
            self.cookie_updated.emit(row)

    def run(self) -> None:
        try:
            self.log.emit("INFO", f"启动采集: {self._total} 个商品, {self._cfg.threads} 线程, 间隔 {self._cfg.interval_sec}s")
            threads = [
                threading.Thread(target=self._run_one, args=(i + 1,), daemon=True)
                for i in range(self._cfg.threads)
            ]
            for t in threads:
                t.start()
            for t in threads:
                t.join()
            # Anything still in the queue (no cookies left, or stopped early) counts as failed.
            with self._queue_lock:
                leftover = list(self._queue)
                self._queue.clear()
            for item in leftover:
                gid = item[0] if isinstance(item, tuple) else item
                self._record_failure(gid)
            if self._stop.is_set():
                self.log.emit("INFO", "采集已停止")
            else:
                self.log.emit("OK", f"采集完成, 成功 {self._done}/{self._total}")
        except Exception:
            self.log.emit("ERR", "采集异常终止:\n" + traceback.format_exc())
        finally:
            self._client.close()
            self.finished.emit()


class CollectorController:
    """Owns a QThread + Worker pair to run a collection session."""

    def __init__(self) -> None:
        self.thread: Optional[QThread] = None
        self.worker: Optional[CollectorWorker] = None

    def start(
        self,
        config: CollectorConfig,
        cookie_pool: CookiePool,
        on_log: Callable[[str, str], None],
        on_progress: Callable[[int, int], None],
        on_cookie_updated: Callable[[int], None],
        on_finished: Callable[[], None],
        on_gid_consumed: Optional[Callable[[str], None]] = None,
    ) -> None:
        self.stop_blocking()
        self.thread = QThread()
        self.worker = CollectorWorker(config, cookie_pool)
        self.worker.moveToThread(self.thread)
        self.worker.log.connect(on_log)
        self.worker.progress.connect(on_progress)
        self.worker.cookie_updated.connect(on_cookie_updated)
        if on_gid_consumed is not None:
            self.worker.gid_consumed.connect(on_gid_consumed)
        self.worker.finished.connect(on_finished)
        self.worker.finished.connect(self.thread.quit)
        self.thread.started.connect(self.worker.run)
        self.thread.start()

    def failed_gids(self) -> list[str]:
        if self.worker is None:
            return []
        return self.worker.failed_gids()

    def stop(self) -> None:
        if self.worker is not None:
            self.worker.request_stop()

    def stop_blocking(self) -> None:
        if self.worker is not None:
            self.worker.request_stop()
        if self.thread is not None:
            # Wait long enough for in-flight httpx requests to time out (~15s).
            self.thread.quit()
            if not self.thread.wait(20000):
                # Last-resort: detach so we don't dereference a still-running QThread.
                self.thread.terminate()
                self.thread.wait(2000)
        self.thread = None
        self.worker = None
