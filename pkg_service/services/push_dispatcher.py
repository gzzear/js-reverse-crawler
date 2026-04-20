"""后台线程：从 Redis 队列拉 push 任务，扣配额 + 调微信 API。

配额来源：pkg_push_subscription.remaining_count，每次 wx.requestSubscribeMessage
用户接受就 +1；发送前 -1。
无可用凭证 → 任务丢 DLQ，等用户下次打开小程序领凭证再触发。

流程：
    1. dequeue 一条 job {package_id, openid, template_id, data, page}
    2. 扣配额：UPDATE pkg_push_subscription SET remaining_count=remaining_count-1
       WHERE openid=? AND template_id=? AND remaining_count>0 LIMIT 1
       rowcount=0 → 无凭证，DLQ
    3. wx_push.send_subscribe_message
    4. 成功：更新 pkg_packages.sms_notified=1（给轮询 dedup 参考）
    5. 失败：DLQ + metric
"""
from __future__ import annotations

import logging
import threading
import time
from typing import Optional

from sqlalchemy import update

from ..config import settings
from ..db.models import Package, PushSubscription
from ..db.session import SessionLocal
from ..metrics import push_sent_total
from . import push_queue, wx_push

log = logging.getLogger("pkg_service.push_dispatcher")


class PushDispatcher:
    """单线程 worker。5 站×10K DAU×低频新件，推送 QPS << 1，单线程绰绰有余。"""

    def __init__(self) -> None:
        self._stop = threading.Event()
        self._thread: Optional[threading.Thread] = None

    def start(self) -> None:
        if self._thread is not None:
            return
        self._stop.clear()
        t = threading.Thread(target=self._loop, name="push-dispatcher", daemon=True)
        t.start()
        self._thread = t
        log.info("push dispatcher started")

    def stop(self) -> None:
        self._stop.set()
        if self._thread is not None:
            self._thread.join(timeout=5)
            self._thread = None

    def _loop(self) -> None:
        while not self._stop.is_set():
            try:
                job = push_queue.dequeue(timeout_sec=settings.push_dispatch_interval_sec)
            except Exception:
                log.exception("dequeue err")
                self._stop.wait(settings.push_dispatch_interval_sec)
                continue
            if job is None:
                continue
            try:
                self._handle(job)
            except Exception:
                log.exception("handle err job=%s", job)
                push_queue.dead_letter(job, "exception")
                push_sent_total.labels(result="exception").inc()

    def _handle(self, job: dict) -> None:
        openid = job.get("openid")
        template_id = job.get("template_id")
        package_id = job.get("package_id")
        data = job.get("data") or {}
        page = job.get("page")
        if not (openid and template_id and package_id):
            push_queue.dead_letter(job, "bad_job")
            return

        # 扣配额：FOR UPDATE SKIP LOCKED 锁一条可用凭证，避免并发超扣
        with SessionLocal() as s:
            row = (
                s.query(PushSubscription)
                .filter(
                    PushSubscription.openid == openid,
                    PushSubscription.template_id == template_id,
                    PushSubscription.remaining_count > 0,
                )
                .order_by(PushSubscription.id.asc())
                .with_for_update(skip_locked=True)
                .first()
            )
            if row is None:
                push_queue.dead_letter(job, "no_quota")
                push_sent_total.labels(result="no_quota").inc()
                log.info("push skip (no quota) openid=%s tpl=%s pid=%s",
                         openid[:8], template_id[:8], package_id)
                return
            row.remaining_count -= 1
            s.commit()

        # 调微信
        ok, reason = wx_push.send_subscribe_message(
            openid=openid, template_id=template_id, data=data, page=page,
        )
        if ok:
            # 标记包裹已通知
            with SessionLocal() as s:
                s.execute(
                    update(Package)
                    .where(Package.package_id == package_id)
                    .values(sms_notified=1)
                )
                s.commit()
            push_sent_total.labels(result="ok").inc()
            log.info("push ok openid=%s tpl=%s pid=%s", openid[:8], template_id[:8], package_id)
        else:
            # 发送失败退还配额（本地事务；微信侧不算消耗）
            with SessionLocal() as s:
                row = (
                    s.query(PushSubscription)
                    .filter(PushSubscription.openid == openid, PushSubscription.template_id == template_id)
                    .order_by(PushSubscription.id.asc())
                    .first()
                )
                if row is not None:
                    row.remaining_count += 1
                    s.commit()
            push_queue.dead_letter(job, reason)
            push_sent_total.labels(result="err").inc()
            log.warning("push fail openid=%s pid=%s reason=%s", openid[:8], package_id, reason)


_disp: Optional[PushDispatcher] = None


def bootstrap() -> PushDispatcher:
    global _disp
    if _disp is None:
        _disp = PushDispatcher()
    _disp.start()
    return _disp


def shutdown() -> None:
    global _disp
    if _disp is not None:
        _disp.stop()
