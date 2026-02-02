"""
PDD Anti-Content FastAPI 服务

提供 RESTful API 接口生成拼多多 anti_content 参数
"""
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from pydantic import BaseModel
import subprocess
import json
import os
from pathlib import Path
from datetime import datetime
import logging

# 配置日志
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# 创建 FastAPI 应用
app = FastAPI(
    title="PDD Anti-Content API",
    description="生成拼多多 anti_content 参数的 RESTful API 服务",
    version="1.0.0",
    docs_url="/docs",  # Swagger UI
    redoc_url="/redoc"  # ReDoc
)

# 配置 CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # 允许所有源，生产环境建议限制
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 获取当前目录
BASE_DIR = Path(__file__).resolve().parent
WORKER_SCRIPT = BASE_DIR / "generate_worker.js"


class AntiContentResponse(BaseModel):
    """响应模型"""
    code: int
    message: str
    data: dict
    timestamp: str


def generate_anti_content() -> str:
    """
    调用 Node.js worker 生成 anti_content
    
    Returns:
        str: 生成的 anti_content 字符串
        
    Raises:
        HTTPException: 生成失败时抛出异常
    """
    try:
        # 使用当前时间戳
        server_time = int(datetime.now().timestamp() * 1000)
        
        # 构造命令
        command = ["node", str(WORKER_SCRIPT), str(server_time)]
        
        # 执行子进程
        result = subprocess.run(
            command,
            capture_output=True,
            text=True,
            timeout=10,
            check=True,
            cwd=str(BASE_DIR)
        )
        
        # 解析输出（取最后一行 JSON）
        lines = result.stdout.strip().split('\n')
        last_line = lines[-1]
        data = json.loads(last_line)
        
        if data.get('success'):
            logger.info(f"Successfully generated anti_content")
            return data['anti_content']
        else:
            error_msg = data.get('error', 'Unknown error')
            logger.error(f"Failed to generate anti_content: {error_msg}")
            raise HTTPException(status_code=500, detail=error_msg)
            
    except subprocess.TimeoutExpired:
        logger.error("Worker process timeout")
        raise HTTPException(status_code=500, detail="生成超时")
    except subprocess.CalledProcessError as e:
        logger.error(f"Worker process failed: {e.stderr}")
        raise HTTPException(status_code=500, detail=f"生成失败: {e.stderr}")
    except json.JSONDecodeError as e:
        logger.error(f"Failed to parse worker output: {e}")
        raise HTTPException(status_code=500, detail="解析输出失败")
    except Exception as e:
        logger.error(f"Unexpected error: {e}")
        raise HTTPException(status_code=500, detail=f"内部错误: {str(e)}")


@app.get("/", summary="欢迎页面")
async def root():
    """API 根路径"""
    return {
        "message": "PDD Anti-Content API Service",
        "version": "1.0.0",
        "docs": "/docs",
        "health": "/health",
        "api": "/api/anti_content"
    }


@app.get("/health", summary="健康检查")
async def health_check():
    """
    健康检查接口
    
    检查服务是否正常运行
    """
    return {
        "status": "ok",
        "message": "PDD Anti-Content Service is running",
        "timestamp": datetime.now().isoformat()
    }


@app.get(
    "/api/anti_content",
    response_model=AntiContentResponse,
    summary="生成 anti_content",
    description="生成拼多多 anti_content 参数，自动使用当前时间戳",
    responses={
        200: {
            "description": "成功生成",
            "content": {
                "application/json": {
                    "example": {
                        "code": 200,
                        "message": "success",
                        "data": {
                            "anti_content": "0asWtxivm8TgFguEur5dfqiZkAnkmZgibTij5T..."
                        },
                        "timestamp": "2026-01-19T12:00:00.000000"
                    }
                }
            }
        },
        500: {
            "description": "服务器内部错误",
            "content": {
                "application/json": {
                    "example": {
                        "detail": "生成失败: error message"
                    }
                }
            }
        }
    }
)
async def get_anti_content():
    """
    生成 anti_content 参数
    
    - 自动使用当前时间戳
    - 每次调用生成不同的结果
    - 返回标准 JSON 响应
    """
    try:
        anti_content = generate_anti_content()
        
        return JSONResponse(
            status_code=200,
            content={
                "code": 200,
                "message": "success",
                "data": {
                    "anti_content": anti_content
                },
                "timestamp": datetime.now().isoformat()
            }
        )
    except HTTPException as e:
        logger.error(f"HTTP Exception: {e.detail}")
        raise
    except Exception as e:
        logger.error(f"Unexpected error in endpoint: {e}")
        raise HTTPException(status_code=500, detail=str(e))


@app.exception_handler(404)
async def not_found_handler(request, exc):
    """404 错误处理"""
    return JSONResponse(
        status_code=404,
        content={
            "code": 404,
            "message": "API endpoint not found",
            "path": str(request.url.path),
            "timestamp": datetime.now().isoformat()
        }
    )


@app.exception_handler(500)
async def internal_error_handler(request, exc):
    """500 错误处理"""
    return JSONResponse(
        status_code=500,
        content={
            "code": 500,
            "message": "Internal server error",
            "error": str(exc),
            "timestamp": datetime.now().isoformat()
        }
    )


if __name__ == "__main__":
    import uvicorn
    
    # 启动服务
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=8000,
        reload=True,  # 开发模式下自动重载
        log_level="info"
    )
