# PDD Anti-Content Express API 服务

这是一个基于 Express 的 HTTP API 服务，用于生成拼多多的 `anti_content` 参数。

## 📁 目录结构

```
express_api/
├── server.js              # Express 服务器主文件
├── generate_worker.js     # Worker 进程（生成 anti_content）
├── anti_content_env.js    # 浏览器环境模拟
├── react_anti_co.js       # webpack 打包的核心算法
├── test_api.py           # Python 测试脚本
├── README.md             # 本文档
└── 易语言调用示例.md      # 易语言调用示例
```

## 🚀 快速开始

```bash
# 1. 安装依赖（首次运行需要，需要在父目录的 node_modules）
cd .. && npm install express && cd express_api

# 2. 启动服务
node server.js

# 或者后台启动
node server.js > server.log 2>&1 &
```

服务将在 `http://localhost:3000` 启动。

## 📡 API 接口说明

### 1. 健康检查

**接口**: `GET /health`

**响应示例**:
```json
{
  "status": "ok",
  "message": "PDD Anti-Content Service is running",
  "timestamp": "2026-01-19T12:00:00.000Z"
}
```

**测试命令**:
```bash
curl http://localhost:3000/health
```

### 2. 生成 anti_content

**接口**: `GET /api/anti_content`

**查询参数**: 无需参数

**响应示例**:
```json
{
  "code": 200,
  "message": "success",
  "data": {
    "anti_content": "0asWtxivm8TgFguEur5dfqiZkAnkmZgibTij5T..."
  },
  "timestamp": "2026-01-19T12:00:00.000Z"
}
```

**测试命令**:
```bash
# 使用当前时间生成
curl "http://localhost:3000/api/anti_content"
```

## 💻 客户端调用示例

### Python 调用

```python
import requests

# API 地址
api_url = "http://localhost:3000/api/anti_content"

# 调用接口
response = requests.get(api_url)
result = response.json()
anti_content = result['data']['anti_content']
print(f"anti_content: {anti_content}")
```

### JavaScript/Node.js 调用

```javascript
// 使用 fetch
const response = await fetch('http://localhost:3000/api/anti_content');
const result = await response.json();
console.log('anti_content:', result.data.anti_content);

// 使用 axios
const axios = require('axios');
const response = await axios.get('http://localhost:3000/api/anti_content');
console.log('anti_content:', response.data.data.anti_content);
```

### curl 调用

```bash
# 简单调用
curl http://localhost:3000/api/anti_content

# 格式化输出
curl -s http://localhost:3000/api/anti_content | python3 -m json.tool
```

### 易语言调用

详见 [易语言调用示例.md](./易语言调用示例.md) 文档。

## 🧪 测试

### 使用 Python 测试脚本

```bash
python3 test_api.py
```

测试脚本会自动测试所有接口并输出结果。

### 手动测试

```bash
# 1. 测试健康检查
curl http://localhost:3000/health

# 2. 测试 GET 请求
curl http://localhost:3000/api/anti_content

# 3. 测试 POST 请求
curl -X POST http://localhost:3000/api/anti_content \
  -H "Content-Type: application/json" \
  -d '{}'
```

## 🔧 配置说明

### 更改端口

默认端口为 `3000`，可以通过环境变量修改：

```bash
PORT=8080 node server.js
```

或修改 `server.js` 中的 `PORT` 常量。

### 跨域配置

服务已默认开启 CORS，允许所有域名访问。如需限制，请修改 `server.js` 中的跨域配置：

```javascript
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'https://yourdomain.com'); // 限制域名
    // ... 其他配置
});
```

## 📝 日志管理

### 查看实时日志

```bash
tail -f server.log
```

### 日志内容

- 启动信息
- 每次请求的时间戳和类型
- 错误信息

