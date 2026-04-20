"""SQLAlchemy ORM：pkg_service 4 张核心表。

表设计对照 plan synchronous-snuggling-coral.md：
    mdkd_account      驿站 mdkd 账号池（5 条）
    packages          包裹流水，主查表（查件 SQL 的唯一目标）
    user_bind         openid ↔ mobile ↔ mobile_id 绑定
    push_subscription 微信订阅消息一次性凭证

索引策略：
    - packages.waybill_code UNIQUE   —— 运单号精确查
    - (mobile_id, time_ms DESC)      —— 手机号 → 最新包裹（查件主路径）
    - (station_code, time_ms DESC)   —— 按站分页、轮询水位
    - waybill_code(后缀)无法走索引，SQL 用 LIKE '%xxxxx' + station_code 过滤
"""
from __future__ import annotations

from datetime import datetime

from sqlalchemy import (
    JSON,
    BigInteger,
    Column,
    DateTime,
    Index,
    Integer,
    SmallInteger,
    String,
    Text,
    UniqueConstraint,
)
from sqlalchemy.orm import DeclarativeBase


class Base(DeclarativeBase):
    pass


class MdkdAccount(Base):
    """驿站 mdkd 账号池。

    `sub_pass_id` 是唯一的上游会话 token；加密密码仅在"降级存密码"策略下填（R0 未
    定稿前保持为空，手动短信登录填 sub_pass_id + device_json 即可）。
    """
    __tablename__ = "pkg_mdkd_account"

    id = Column(BigInteger, primary_key=True, autoincrement=True)
    mobile = Column(String(16), nullable=False, unique=True)
    password_enc = Column(Text, nullable=True)       # RSA-PKCS1v1.5 + b64url（如果存）
    sub_pass_id = Column(Text, nullable=True)        # 整串 x_base64(JSON)
    token = Column(String(64), nullable=True)        # SUB_PASS_ID.t 字段
    device_json = Column(JSON, nullable=True)        # pdd_id/terminal/f77/a42/api_uid
    station_code = Column(String(32), nullable=False, index=True)
    user_id = Column(String(32), nullable=True)      # PDD 返的 userId
    last_refresh = Column(DateTime, nullable=True)   # 最近一次 refreshToken/login
    last_error = Column(Text, nullable=True)         # 最近失败原因（方便排障）
    status = Column(SmallInteger, nullable=False, default=0)  # 0=ok 1=need_relogin 2=disabled
    created_at = Column(DateTime, nullable=False, default=datetime.utcnow)
    updated_at = Column(DateTime, nullable=False, default=datetime.utcnow, onupdate=datetime.utcnow)


class Package(Base):
    """包裹流水：B 端 opPackageSearch 的入库快照 + 延迟解密补齐。

    `mobile_id` 是 PDD 内部 hash ID，search 响应里直接带（见 memory
    pdd_mdkd_package_search_schema.md），相同手机号稳定不变，作为查件精确匹配键。

    `raw` 存完整响应项，方便后续加字段而不 migrate（前期快速迭代）。
    """
    __tablename__ = "pkg_packages"

    package_id = Column(String(32), primary_key=True)
    waybill_code = Column(String(32), nullable=False)
    station_code = Column(String(32), nullable=False)
    mobile_id = Column(String(64), nullable=True)           # 🌟 主匹配键
    mobile_masked = Column(String(16), nullable=True)        # "138****1234"
    mobile_last_four = Column(String(4), nullable=True)      # 用于 bind 未完成时回退
    customer_name_masked = Column(String(32), nullable=True)
    pickup_code = Column(String(16), nullable=True)
    wp_code = Column(String(16), nullable=True)
    wp_name = Column(String(32), nullable=True)
    waybill_status = Column(Integer, nullable=True)
    waybill_status_desc = Column(String(32), nullable=True)
    fulfillment_status = Column(Integer, nullable=True)
    fulfillment_status_desc = Column(String(32), nullable=True)
    stay_days = Column(Integer, nullable=True)
    first_in_time = Column(BigInteger, nullable=True)        # ms
    last_out_time = Column(BigInteger, nullable=True)        # ms
    time_ms = Column(BigInteger, nullable=True)              # search.time 字段（排序基准）
    has_image = Column(SmallInteger, nullable=False, default=0)  # opPackageOutImage 可拉
    sms_notified = Column(SmallInteger, nullable=False, default=0)  # 本地推送标记
    raw = Column(JSON, nullable=True)
    created_at = Column(DateTime, nullable=False, default=datetime.utcnow)
    updated_at = Column(DateTime, nullable=False, default=datetime.utcnow, onupdate=datetime.utcnow)

    __table_args__ = (
        UniqueConstraint("waybill_code", name="uk_waybill_code"),
        Index("idx_mid_time", "mobile_id", "time_ms"),
        Index("idx_station_time", "station_code", "time_ms"),
        Index("idx_last_four_station", "mobile_last_four", "station_code"),
        Index("idx_pickup_station", "pickup_code", "station_code"),
    )


class UserBind(Base):
    """openid ↔ mobile ↔ mobile_id 的绑定关系。

    `verified`：0=待 reverse 补 mobile_id；1=已绑定。C 端查件优先用
    已验证的 bind 走 mobile_id 精确匹配；未验证的退回 mobile_last_four。
    """
    __tablename__ = "pkg_user_bind"

    id = Column(BigInteger, primary_key=True, autoincrement=True)
    openid = Column(String(64), nullable=False)
    mobile = Column(String(16), nullable=False)
    mobile_id = Column(String(64), nullable=True)
    verified = Column(SmallInteger, nullable=False, default=0)
    created_at = Column(DateTime, nullable=False, default=datetime.utcnow)
    updated_at = Column(DateTime, nullable=False, default=datetime.utcnow, onupdate=datetime.utcnow)

    __table_args__ = (
        UniqueConstraint("openid", "mobile", name="uk_openid_mobile"),
        Index("idx_openid", "openid"),
        Index("idx_mobile", "mobile"),
        Index("idx_mobile_id", "mobile_id"),
    )


class PushSubscription(Base):
    """微信订阅消息一次性凭证池。"""
    __tablename__ = "pkg_push_subscription"

    id = Column(BigInteger, primary_key=True, autoincrement=True)
    openid = Column(String(64), nullable=False)
    template_id = Column(String(64), nullable=False)
    remaining_count = Column(Integer, nullable=False, default=1)  # 每次 requestSubscribeMessage 只给 1 次
    created_at = Column(DateTime, nullable=False, default=datetime.utcnow)
    updated_at = Column(DateTime, nullable=False, default=datetime.utcnow, onupdate=datetime.utcnow)

    __table_args__ = (
        Index("idx_openid_tpl", "openid", "template_id"),
    )
