"""C 端包裹底单图片懒加载 API。

设计：
    - 点击才拉，一次 anti-content / 一张图
    - 不落 DB，Redis 缓存 1h（URL 本身是短期签名）
    - 访问控制：只有该用户绑过的 station_code 或 mobile_id 命中才放行
    - 131013 soft-block（memory pdd_mdkd_image_api.md）→ 返 has_image=False 友好错误

上游返回形状（参考 memory + 代码防御）：
    {"success": true, "result": {"image": "https://..."}}  或 image_url / url 其它别名
"""
from __future__ import annotations

import logging
from typing import Optional

import redis
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from ..clients.mdkd_client import MdkdApiError
from ..config import settings
from ..db.models import Package
from ..db.session import get_db
from ..metrics import image_fetch_total
from ..schemas import ImageRequest, ImageResponse
from ..services import bind_service, session_mgr

log = logging.getLogger("pkg_service.image")

router = APIRouter(prefix="/v1/pkg", tags=["pkg_image"])

IMG_CACHE_KEY = "pkgimg:{}"
IMG_CACHE_TTL = 3600  # 1h

_rc: Optional[redis.Redis] = None


def _redis() -> Optional[redis.Redis]:
    global _rc
    if _rc is not None:
        return _rc
    try:
        c = redis.Redis.from_url(settings.redis_url, decode_responses=True,
                                  socket_connect_timeout=0.5, socket_timeout=0.5)
        c.ping()
        _rc = c
    except Exception as e:
        log.warning("image cache redis unavailable: %s", e)
        _rc = None
    return _rc


def _extract_url(result: dict) -> Optional[str]:
    for key in ("image", "image_url", "imageUrl", "url", "out_image", "outImage"):
        v = result.get(key)
        if isinstance(v, str) and v.startswith(("http://", "https://")):
            return v
    return None


def _user_can_see(db: Session, openid: str, pkg: Package) -> bool:
    """用户与包裹的归属校验：
       1. 绑定的 mobile_id 命中（verified=1）—— 这是客户本人
       2. 曾在该 station_code 有 verified 包裹 —— 站长/家人场景
    """
    mids = bind_service.get_user_mobile_ids(db, openid)
    if pkg.mobile_id and pkg.mobile_id in mids:
        return True
    stations = bind_service.get_user_stations(db, openid)
    if pkg.station_code in stations:
        return True
    return False


@router.post("/image", response_model=ImageResponse)
def fetch_image(req: ImageRequest, db: Session = Depends(get_db)) -> ImageResponse:
    pkg = db.get(Package, req.package_id)
    if pkg is None:
        image_fetch_total.labels(result="not_found").inc()
        raise HTTPException(status_code=404, detail="package not found")

    if not _user_can_see(db, req.openid, pkg):
        image_fetch_total.labels(result="no_perm").inc()
        raise HTTPException(status_code=403, detail="no permission")

    if pkg.has_image == 0:
        image_fetch_total.labels(result="soft_block").inc()
        return ImageResponse(package_id=req.package_id, has_image=False,
                              message="该包裹无底单图")

    rc = _redis()
    cache_key = IMG_CACHE_KEY.format(req.package_id)
    if rc is not None:
        try:
            cached = rc.get(cache_key)
            if cached:
                image_fetch_total.labels(result="cached").inc()
                return ImageResponse(package_id=req.package_id, has_image=True, url=cached,
                                      message="cached")
        except Exception as e:
            log.warning("image cache read err: %s", e)

    try:
        client = session_mgr.get_manager().get_client(pkg.station_code)
    except session_mgr.SessionManagerError as e:
        image_fetch_total.labels(result="err").inc()
        raise HTTPException(status_code=503, detail=f"no active account for {pkg.station_code}: {e}")

    try:
        resp = client.op_package_out_image(pkg.package_id)
    except MdkdApiError as e:
        ec = (e.upstream or {}).get("error_code")
        if ec == 131013:
            if pkg.has_image:
                pkg.has_image = 0
                db.commit()
            image_fetch_total.labels(result="soft_block").inc()
            return ImageResponse(package_id=req.package_id, has_image=False,
                                  message="站点未配置摄像头，无底单图")
        image_fetch_total.labels(result="err").inc()
        log.warning("image fetch err pid=%s: %s", pkg.package_id, e)
        raise HTTPException(status_code=502, detail=f"upstream err: {e}")

    url = _extract_url(resp.get("result") or {})
    if not url:
        image_fetch_total.labels(result="err").inc()
        return ImageResponse(package_id=req.package_id, has_image=False, message="no image url in response")

    if rc is not None:
        try:
            rc.setex(cache_key, IMG_CACHE_TTL, url)
        except Exception as e:
            log.warning("image cache write err: %s", e)

    image_fetch_total.labels(result="ok").inc()
    return ImageResponse(package_id=req.package_id, has_image=True, url=url, message="ok")
