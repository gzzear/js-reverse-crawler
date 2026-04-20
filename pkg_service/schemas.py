"""C 端 API 的请求/响应 pydantic 模型。

Query 模式四选一（前后端统一正则）：
    WAYBILL_FULL     完整运单号（可含字母前缀）  ^[A-Za-z]{0,4}\\d{10,18}$
    WAYBILL_TAIL5    运单号后 5 位数字           ^\\d{5}$
    MOBILE_FULL      手机全号 11 位              ^1\\d{10}$
    PICKUP_CODE      取件码 (数字+连字符)        ^[\\d\\-]{3,12}$

实样：YT3761912065449 (圆通)、YZXB... (邮政)、9822063002006 (纯数字)。
手机后 4 位输入被**显式禁用**（产品决策：避免模糊匹配带来的隐私/误判）。
"""
from __future__ import annotations

import re
from typing import Literal, Optional

from pydantic import BaseModel, Field, field_validator

# ==== 统一正则 ====
RE_WAYBILL_FULL = re.compile(r"^[A-Za-z]{0,4}\d{10,18}$")
RE_WAYBILL_TAIL5 = re.compile(r"^\d{5}$")
RE_MOBILE_FULL = re.compile(r"^1\d{10}$")
RE_PICKUP_CODE = re.compile(r"^[\d\-]{3,12}$")


QueryMode = Literal["waybill_full", "waybill_tail5", "mobile_full", "pickup_code"]


def classify_query(raw: str) -> QueryMode | None:
    """匹配优先级：waybill_full > mobile_full > waybill_tail5 > pickup_code。

    （mobile_full 必然 11 位以 1 开头，waybill_full 11-18 位但不要求以 1 开头，
     冲突时 mobile_full 优先，因为以 1 开头 11 位更像手机号。）
    """
    s = raw.strip()
    if RE_MOBILE_FULL.match(s):
        return "mobile_full"
    if RE_WAYBILL_FULL.match(s):
        return "waybill_full"
    if RE_WAYBILL_TAIL5.match(s):
        return "waybill_tail5"
    if RE_PICKUP_CODE.match(s):
        return "pickup_code"
    return None


# ==== 查件 ====

class QueryRequest(BaseModel):
    query: str = Field(..., min_length=3, max_length=24, description="输入内容（前端已正则校验）")
    openid: str = Field(..., min_length=1, max_length=64, description="微信小程序 openid")
    page: int = Field(1, ge=1, le=50)
    page_size: int = Field(20, ge=1, le=100)

    @field_validator("query")
    @classmethod
    def _strip(cls, v: str) -> str:
        return v.strip()


class PackageItem(BaseModel):
    """C 端展示字段（脱敏/裁剪）。"""
    package_id: str
    waybill_code: str
    station_code: str
    wp_name: Optional[str] = None
    wp_code: Optional[str] = None
    pickup_code: Optional[str] = None
    waybill_status: Optional[int] = None
    waybill_status_desc: Optional[str] = None
    stay_days: Optional[int] = None
    first_in_time: Optional[int] = None
    last_out_time: Optional[int] = None
    time_ms: Optional[int] = None
    mobile_masked: Optional[str] = None
    mobile_last_four: Optional[str] = None
    customer_name_masked: Optional[str] = None
    has_image: bool = True


class QueryResponse(BaseModel):
    mode: QueryMode
    total: int
    page: int
    page_size: int
    items: list[PackageItem]


# ==== 绑定 ====

class BindRequest(BaseModel):
    openid: str = Field(..., min_length=1, max_length=64)
    mobile: str = Field(..., pattern=r"^1\d{10}$")


class BindResponse(BaseModel):
    openid: str
    mobile: str
    mobile_id: Optional[str] = None
    verified: bool
    message: str


class UnbindRequest(BaseModel):
    openid: str
    mobile: str = Field(..., pattern=r"^1\d{10}$")


# ==== 图片（M5 懒加载） ====

class ImageRequest(BaseModel):
    openid: str = Field(..., min_length=1, max_length=64)
    package_id: str


class ImageResponse(BaseModel):
    package_id: str
    has_image: bool
    url: Optional[str] = None
    message: Optional[str] = None


# ==== 订阅消息 ====

class PushCollectRequest(BaseModel):
    """小程序调 wx.requestSubscribeMessage 后上报结果。

    `accepted_templates`：该次用户接受订阅的模板 id 列表（每个 +1 配额）。
    """
    openid: str = Field(..., min_length=1, max_length=64)
    accepted_templates: list[str] = Field(default_factory=list)


class PushCollectResponse(BaseModel):
    openid: str
    granted: dict[str, int]  # template_id -> 新增配额数
    total_remaining: dict[str, int]  # template_id -> 当前剩余配额


class PushTestRequest(BaseModel):
    openid: str = Field(..., min_length=1, max_length=64)
    template_id: Optional[str] = None  # 缺省用 wx_template_new_pkg
