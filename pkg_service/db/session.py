"""SQLAlchemy engine + SessionLocal。同步 PyMySQL（pool=20 够单机场景用）。

`init_schema()` 用 metadata.create_all 建表；首次部署调一次，后期迁移再上 alembic。
"""
from __future__ import annotations

from contextlib import contextmanager
from typing import Iterator

from sqlalchemy import create_engine
from sqlalchemy.orm import Session, sessionmaker

from ..config import settings
from .models import Base

_engine_kwargs: dict = {"pool_pre_ping": True, "future": True}
if not settings.db_url.startswith("sqlite"):
    # MySQL / Postgres：才有 QueuePool 的 pool_size / max_overflow / recycle
    _engine_kwargs.update(pool_size=20, max_overflow=10, pool_recycle=3600)

_engine = create_engine(settings.db_url, **_engine_kwargs)

SessionLocal = sessionmaker(bind=_engine, autoflush=False, autocommit=False, future=True)


def get_engine():
    return _engine


def init_schema() -> None:
    Base.metadata.create_all(_engine)


def get_db() -> Iterator[Session]:
    """FastAPI 依赖：`db: Session = Depends(get_db)`"""
    s = SessionLocal()
    try:
        yield s
    finally:
        s.close()


@contextmanager
def db_scope() -> Iterator[Session]:
    """脚本/后台任务用的 context manager，自动 commit/rollback。"""
    s = SessionLocal()
    try:
        yield s
        s.commit()
    except Exception:
        s.rollback()
        raise
    finally:
        s.close()
