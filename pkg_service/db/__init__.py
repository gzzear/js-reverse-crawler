"""DB 层：SQLAlchemy 2.0 同步 engine + ORM models。

查件是 pkg_service 的核心 I/O，对延迟敏感（p95 ≤ 200ms），所以所有 ORM 定义集中
在 db/models.py，engine/SessionLocal 放 db/session.py。FastAPI 路由层通过
`get_db()` 依赖拿 session。
"""
