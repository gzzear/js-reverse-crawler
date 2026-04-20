"""环境变量驱动的运行时配置。

加载顺序（后者覆盖前者）：
    1. pkg_service/.env           —— 本地开发/RDS creds（git ignore）
    2. pkg_service/.env.local     —— 每人本地覆盖（git ignore）
    3. shell 环境变量             —— 部署时最终来源
"""
from __future__ import annotations

import os
from dataclasses import dataclass
from pathlib import Path

try:
    from dotenv import load_dotenv
    _HERE = Path(__file__).resolve().parent
    for fn in (".env", ".env.local"):
        load_dotenv(_HERE / fn, override=False)
except ImportError:
    pass  # dotenv 可选依赖，线上用真正的环境变量


def _split_csv(val: str | None) -> list[str]:
    if not val:
        return []
    return [p.strip() for p in val.split(",") if p.strip()]


@dataclass(frozen=True)
class Settings:
    # Node worker
    pool_size: int
    node_bin: str | None

    # FastAPI / 日志
    log_level: str
    allowed_origins: tuple[str, ...]
    api_keys: tuple[str, ...]

    # DB / Redis
    db_url: str              # e.g. mysql+pymysql://user:pw@host:3306/pkg_service?charset=utf8mb4
    redis_url: str           # e.g. redis://localhost:6379/0

    # 微信小程序
    wx_appid: str
    wx_secret: str
    wx_template_new_pkg: str  # "新包裹到件"订阅消息模板 id

    # 管理端 admin 路由（站长登录/运维）
    # 为空时所有 /v1/admin/* 路由 503，避免无意间暴露（保护生产）
    admin_token: str

    # 业务参数
    poll_interval_sec: int   # 稳态增量轮询周期（默认 600s = 10min）
    on_demand_cooldown_sec: int  # 触发式拉取 cooldown（默认 30s）
    session_refresh_interval_sec: int  # refreshToken 触发周期（默认 2h 50min）
    push_dispatch_interval_sec: int  # push dispatcher 空轮询间隔（默认 2s）

    @classmethod
    def from_env(cls) -> "Settings":
        return cls(
            pool_size=int(os.getenv("POOL_SIZE", "2")),
            node_bin=os.getenv("NODE_BIN") or None,
            log_level=os.getenv("LOG_LEVEL", "info"),
            allowed_origins=tuple(_split_csv(os.getenv("ALLOWED_ORIGINS")) or ["*"]),
            api_keys=tuple(_split_csv(os.getenv("API_KEYS"))),
            db_url=os.getenv("DB_URL", "mysql+pymysql://root@localhost:3306/pkg_service?charset=utf8mb4"),
            redis_url=os.getenv("REDIS_URL", "redis://localhost:6379/0"),
            wx_appid=os.getenv("WX_APPID", ""),
            wx_secret=os.getenv("WX_SECRET", ""),
            wx_template_new_pkg=os.getenv("WX_TEMPLATE_NEW_PKG", ""),
            admin_token=os.getenv("ADMIN_TOKEN", ""),
            poll_interval_sec=int(os.getenv("POLL_INTERVAL_SEC", "600")),
            on_demand_cooldown_sec=int(os.getenv("ON_DEMAND_COOLDOWN_SEC", "30")),
            session_refresh_interval_sec=int(os.getenv("SESSION_REFRESH_INTERVAL_SEC", "10200")),
            push_dispatch_interval_sec=int(os.getenv("PUSH_DISPATCH_INTERVAL_SEC", "2")),
        )


settings = Settings.from_env()
