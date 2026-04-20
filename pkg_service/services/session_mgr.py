"""账号池与 SUB_PASS_ID 会话保活。

职责：
    1. 启动时从 DB 加载 mdkd_account（status != disabled）→ 内存缓存
    2. 提供 `get_client(station_code)` 返回一个可直接发请求的 MdkdClient
    3. 后台线程周期性调 `refreshToken`（默认每 2h 50min）防止 SUB_PASS_ID 过期
    4. 上游请求失败时标记 status=need_relogin，后台跳过该账号，等人工登录刷新

**R0 定稿前的简化策略（2026-04-19）**：
    - 不走密码自动重登（密码登录必 2FA，memory pdd_mdkd_research_findings.md）
    - 只调 refreshToken 尝试续 TTL；失败即标 need_relogin，等站长页面短信重登
    - refreshToken 行为（真续 TTL vs no-op）未定论，保守打一下总归无害
      （memory pdd_mdkd_refresh_token.md）

线程模型：一个 refresher Thread + N 个业务协程。每次 get_client() 新建 MdkdClient
实例（requests.Session 内部不跨线程复用），避免并发冲突。
"""
from __future__ import annotations

import logging
import threading
import time
from dataclasses import dataclass, field
from datetime import datetime
from typing import Optional

from sqlalchemy import select, update

from ..clients.mdkd_client import MdkdApiError, MdkdClient
from ..config import settings
from ..db.models import MdkdAccount
from ..db.session import SessionLocal
from ..metrics import mdkd_account_refresh_total, mdkd_account_status

log = logging.getLogger("pkg_service.session_mgr")


class SessionManagerError(RuntimeError):
    pass


@dataclass
class AccountState:
    """内存中的账号运行态快照。"""
    id: int
    mobile: str
    station_code: str
    sub_pass_id: str
    device: dict
    user_id: str | None
    token: str | None
    status: int                          # 0=ok 1=need_relogin 2=disabled
    last_refresh_ts: float               # epoch seconds
    last_error: str | None = None
    lock: threading.Lock = field(default_factory=threading.Lock)


class SessionManager:
    """单例，由 main.py 在 lifespan 启动时实例化。"""

    def __init__(self) -> None:
        self._by_id: dict[int, AccountState] = {}
        self._by_station: dict[str, list[int]] = {}  # station_code → [account_id]
        self._lock = threading.RLock()
        self._stop = threading.Event()
        self._refresher: threading.Thread | None = None

    # ---------------- lifecycle ----------------------------------------------

    def bootstrap(self) -> int:
        """从 DB 加载启用账号到内存。返回加载数。"""
        with self._lock:
            self._by_id.clear()
            self._by_station.clear()
            with SessionLocal() as s:
                rows = s.execute(
                    select(MdkdAccount).where(MdkdAccount.status != 2)
                ).scalars().all()
                for r in rows:
                    if not r.sub_pass_id or not r.device_json:
                        log.warning("account id=%s mobile=%s missing sub_pass_id/device, skipped",
                                    r.id, r.mobile)
                        continue
                    state = AccountState(
                        id=r.id,
                        mobile=r.mobile,
                        station_code=r.station_code,
                        sub_pass_id=r.sub_pass_id,
                        device=dict(r.device_json),
                        user_id=r.user_id,
                        token=r.token,
                        status=r.status,
                        last_refresh_ts=r.last_refresh.timestamp() if r.last_refresh else 0.0,
                    )
                    self._by_id[r.id] = state
                    self._by_station.setdefault(r.station_code, []).append(r.id)
                    mdkd_account_status.labels(
                        mobile=r.mobile[:3] + "****" + r.mobile[-4:],
                        station=r.station_code,
                    ).set(r.status)
            log.info("session_mgr loaded %d accounts across %d stations",
                     len(self._by_id), len(self._by_station))
            return len(self._by_id)

    def start(self) -> None:
        if self._refresher is not None:
            return
        self._stop.clear()
        t = threading.Thread(target=self._refresh_loop, name="session-refresher", daemon=True)
        t.start()
        self._refresher = t

    def stop(self) -> None:
        self._stop.set()
        if self._refresher is not None:
            self._refresher.join(timeout=5)
            self._refresher = None

    # ---------------- public API ---------------------------------------------

    def get_client(self, station_code: str) -> MdkdClient:
        """按 station_code 取一个可用账号，构造 MdkdClient。

        选择策略：轮转（按 id 排序，轮询下一条 status=0 的）。简陋但够 5 站点用。
        """
        with self._lock:
            ids = self._by_station.get(station_code, [])
            for aid in ids:
                st = self._by_id.get(aid)
                if st and st.status == 0:
                    return MdkdClient(sub_pass_id=st.sub_pass_id, device=st.device)
        raise SessionManagerError(f"no active account for station {station_code!r}")

    def get_account_by_id(self, account_id: int) -> AccountState | None:
        return self._by_id.get(account_id)

    def list_station_codes(self) -> list[str]:
        """返回当前账号池覆盖的所有站点（去重，顺序稳定）。poll_worker 启动时用。"""
        with self._lock:
            return sorted(self._by_station.keys())

    def list_accounts(self) -> list[dict]:
        """`/debug/accounts` 用：账号池快照。不含敏感字段（sub_pass_id 只露头尾）。"""
        out = []
        for st in self._by_id.values():
            sp = st.sub_pass_id
            sp_head = sp[:16] + "..." + sp[-8:] if len(sp) > 30 else sp
            out.append({
                "id": st.id,
                "mobile_masked": st.mobile[:3] + "****" + st.mobile[-4:],
                "station_code": st.station_code,
                "user_id": st.user_id,
                "status": st.status,
                "last_refresh": datetime.fromtimestamp(st.last_refresh_ts).isoformat()
                                 if st.last_refresh_ts else None,
                "last_error": st.last_error,
                "sub_pass_id_preview": sp_head,
            })
        return sorted(out, key=lambda x: (x["station_code"], x["id"]))

    def mark_need_relogin(self, account_id: int, reason: str) -> None:
        st = self._by_id.get(account_id)
        if not st:
            return
        with st.lock:
            st.status = 1
            st.last_error = reason[:500]
        self._persist_status(account_id, status=1, last_error=reason)
        mdkd_account_status.labels(
            mobile=st.mobile[:3] + "****" + st.mobile[-4:],
            station=st.station_code,
        ).set(1)
        log.error("ALERT account id=%s station=%s marked need_relogin: %s",
                  account_id, st.station_code, reason)

    def upsert_login(
        self,
        *,
        mobile: str,
        station_code: str,
        sub_pass_id: str,
        device: dict,
        user_id: str | None,
        token: str | None,
    ) -> int:
        """登录/重登成功后，把新 sub_pass_id 写回 DB + 内存。

        用于未来 M1.5 站长小程序页面发起 SMS 登录的回调。返回 account_id。
        """
        now = datetime.utcnow()
        with SessionLocal() as s:
            row = s.execute(select(MdkdAccount).where(MdkdAccount.mobile == mobile)).scalar_one_or_none()
            if row is None:
                row = MdkdAccount(
                    mobile=mobile,
                    station_code=station_code,
                    sub_pass_id=sub_pass_id,
                    device_json=device,
                    user_id=user_id,
                    token=token,
                    last_refresh=now,
                    status=0,
                )
                s.add(row)
                s.flush()
            else:
                row.station_code = station_code
                row.sub_pass_id = sub_pass_id
                row.device_json = device
                row.user_id = user_id
                row.token = token
                row.last_refresh = now
                row.status = 0
                row.last_error = None
            s.commit()
            aid = row.id

        with self._lock:
            self._by_id[aid] = AccountState(
                id=aid,
                mobile=mobile,
                station_code=station_code,
                sub_pass_id=sub_pass_id,
                device=dict(device),
                user_id=user_id,
                token=token,
                status=0,
                last_refresh_ts=now.timestamp(),
            )
            bucket = self._by_station.setdefault(station_code, [])
            if aid not in bucket:
                bucket.append(aid)
        log.info("upsert_login ok id=%s mobile=%s station=%s", aid, mobile, station_code)
        return aid

    # ---------------- internals ----------------------------------------------

    def _refresh_loop(self) -> None:
        interval = settings.session_refresh_interval_sec
        # 启动后先等一小段时间，避免和 bootstrap 同时打上游
        self._stop.wait(30)
        while not self._stop.is_set():
            try:
                self._refresh_due()
            except Exception:  # noqa: BLE001
                log.exception("refresh tick failed")
            # 每分钟醒一次检查哪些账号到期；实际 refresh 动作按 last_refresh 判定
            self._stop.wait(min(60, interval))

    def _refresh_due(self) -> None:
        now = time.time()
        interval = settings.session_refresh_interval_sec
        candidates: list[int] = []
        with self._lock:
            for st in self._by_id.values():
                if st.status != 0:
                    continue
                if now - st.last_refresh_ts >= interval:
                    candidates.append(st.id)
        for aid in candidates:
            self._refresh_one(aid)

    def _refresh_one(self, account_id: int) -> None:
        st = self._by_id.get(account_id)
        if not st or st.status != 0:
            return
        # 同一账号串行，避免并发 refresh
        with st.lock:
            if not st or st.status != 0:
                return
            try:
                client = MdkdClient(sub_pass_id=st.sub_pass_id, device=st.device)
                resp = client.refresh_token()
                # 可能 200/204/401；40001/40003 认为失效
                status = resp.get("status", 0)
                j = resp.get("json") or {}
                if status in (401, 403) or j.get("error_code") in (40001, 40003):
                    self.mark_need_relogin(account_id, f"refresh rejected: {resp}")
                    mdkd_account_refresh_total.labels(result="err").inc()
                    return
                st.last_refresh_ts = time.time()
                self._persist_status(account_id, last_refresh=datetime.utcnow())
                mdkd_account_refresh_total.labels(result="ok").inc()
                log.info("refresh ok id=%s mobile=%s status=%s", account_id, st.mobile, status)
            except MdkdApiError as e:
                mdkd_account_refresh_total.labels(result="err").inc()
                if e.status in (401, 403) or (e.upstream.get("error_code") in (40001, 40003)):
                    self.mark_need_relogin(account_id, f"refresh err: {e}")
                else:
                    st.last_error = str(e)[:500]
                    log.warning("refresh soft-fail id=%s: %s", account_id, e)
            except Exception as e:  # noqa: BLE001
                st.last_error = str(e)[:500]
                log.exception("refresh exception id=%s", account_id)

    def _persist_status(
        self,
        account_id: int,
        *,
        status: int | None = None,
        last_error: str | None = None,
        last_refresh: datetime | None = None,
    ) -> None:
        fields: dict = {}
        if status is not None:
            fields["status"] = status
        if last_error is not None:
            fields["last_error"] = last_error[:500]
        if last_refresh is not None:
            fields["last_refresh"] = last_refresh
        if not fields:
            return
        try:
            with SessionLocal() as s:
                s.execute(update(MdkdAccount).where(MdkdAccount.id == account_id).values(**fields))
                s.commit()
        except Exception:
            log.exception("persist_status failed id=%s", account_id)


# 模块级单例，由 main.py lifespan 初始化
_mgr: Optional[SessionManager] = None


def bootstrap() -> SessionManager:
    global _mgr
    if _mgr is None:
        _mgr = SessionManager()
    _mgr.bootstrap()
    _mgr.start()
    return _mgr


def shutdown() -> None:
    global _mgr
    if _mgr is not None:
        _mgr.stop()


def get_manager() -> SessionManager:
    if _mgr is None:
        raise SessionManagerError("session_mgr not bootstrapped")
    return _mgr
