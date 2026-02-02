# PDD Anti-Content FastAPI 服务部署文档

## 📋 部署前准备

### 需要上传的文件（共 5 个）
- `main.py` - FastAPI 主程序（必需）
- `requirements.txt` - Python 依赖列表（必需）
- `generate_worker.js` - Node.js 生成脚本（必需）
- `anti_content_env.js` - 环境脚本（必需）
- `react_anti_co.js` - React 反爬脚本（必需）

---

## 🚀 完整部署流程

### 第一步：上传文件到服务器

#### 1.1 在服务器上创建目录
```bash
ssh root@YOUR_SERVER_IP "mkdir -p /opt/pdd-anti-content"
```

#### 1.2 使用 scp 上传所有文件
```bash
# 在 crawler/js逆向/pdd/anti_content 目录下执行
cd js逆向/pdd/anti_content
scp fast_api/main.py fast_api/requirements.txt fast_api/generate_worker.js \
    0as/anti_content_env.js 0as/react_anti_co.js \
    root@YOUR_SERVER_IP:/opt/pdd-anti-content/
```

#### 1.3 验证文件上传成功
```bash
ssh root@YOUR_SERVER_IP "ls -la /opt/pdd-anti-content/"
```
应该看到 5 个文件都在目录中。

---

### 第二步：安装系统依赖（必需）

```bash
# SSH 登录到服务器
ssh root@YOUR_SERVER_IP

# 更新系统并安装必需软件
apt-get update
apt-get install -y python3 python3-venv python3-pip nginx ufw
```

**必需组件说明：**
- `python3` - 运行 FastAPI（必需）
- `python3-venv` - 创建 Python 虚拟环境（必需）
- `nginx` - Web 服务器，用于反向代理（必需）
- `ufw` - 防火墙管理（推荐）

---

### 第三步：安装 Node.js（必需）

⚠️ **重要：FastAPI 服务需要调用 Node.js 执行 JS 脚本**

#### 方法一：使用 apt 安装（推荐新手）
```bash
# 添加 NodeSource 仓库（安装 Node.js 18 LTS）
curl -fsSL https://deb.nodesource.com/setup_18.x | bash -
apt-get install -y nodejs

# 验证安装
node --version  # 应显示 v18.x.x
```

#### 方法二：如果已用 nvm 安装
```bash
# 查看 node 路径
which node
# 记住这个路径，后面配置 systemd 服务时会用到
```

---

### 第四步：配置 Python 环境（必需）

```bash
# 进入项目目录
cd /opt/pdd-anti-content

# 创建虚拟环境
python3 -m venv venv

# 激活虚拟环境
source venv/bin/activate

# 安装 Python 依赖
pip install -r requirements.txt

# 验证安装
pip list  # 应该看到 fastapi、uvicorn 等包
```

---

### 第五步：创建 systemd 服务（必需）

⚠️ **注意：PATH 环境变量必须包含 node 命令路径**

#### 5.1 确定 Node.js 路径
```bash
which node
```

常见路径：
- apt 安装：`/usr/bin/node`
- nvm 安装：`/root/.nvm/versions/node/vXX.X.X/bin/node`

#### 5.2 创建服务配置文件

**如果 node 在 `/usr/bin/node`（apt 安装）：**
```bash
cat > /etc/systemd/system/pdd-anti-content.service << 'EOF'
[Unit]
Description=PDD Anti-Content FastAPI Service
After=network.target

[Service]
Type=simple
User=root
WorkingDirectory=/opt/pdd-anti-content
Environment="PATH=/opt/pdd-anti-content/venv/bin:/usr/local/bin:/usr/bin:/bin"
ExecStart=/opt/pdd-anti-content/venv/bin/uvicorn main:app --host 0.0.0.0 --port 8000 --workers 4
Restart=always
RestartSec=10

[Install]
WantedBy=multi-user.target
EOF
```

**如果 node 在 nvm 路径（如 `/root/.nvm/versions/node/v25.5.0/bin/node`）：**
```bash
cat > /etc/systemd/system/pdd-anti-content.service << 'EOF'
[Unit]
Description=PDD Anti-Content FastAPI Service
After=network.target

[Service]
Type=simple
User=root
WorkingDirectory=/opt/pdd-anti-content
Environment="PATH=/opt/pdd-anti-content/venv/bin:/root/.nvm/versions/node/v25.5.0/bin:/usr/local/bin:/usr/bin:/bin"
ExecStart=/opt/pdd-anti-content/venv/bin/uvicorn main:app --host 0.0.0.0 --port 8000 --workers 4
Restart=always
RestartSec=10

[Install]
WantedBy=multi-user.target
EOF
```

⚠️ **关键点：** `Environment="PATH=..."` 这一行必须包含 node 所在的目录！

#### 5.3 启动服务
```bash
systemctl daemon-reload
systemctl enable pdd-anti-content
systemctl start pdd-anti-content
```

#### 5.4 检查服务状态
```bash
systemctl status pdd-anti-content
```

应该看到 `Active: active (running)`

#### 5.5 测试服务
```bash
curl http://127.0.0.1:8000/api/anti_content
```

应该返回 JSON 数据，而不是错误信息。

---

### 第六步：配置 Nginx 反向代理（必需）

#### 6.1 创建 Nginx 配置文件
```bash
cat > /etc/nginx/sites-available/pdd-anti-content << 'EOF'
server {
    listen 80;
    server_name _;

    location / {
        proxy_pass http://127.0.0.1:8000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
EOF
```

#### 6.2 启用配置
```bash
# 创建软链接
ln -sf /etc/nginx/sites-available/pdd-anti-content /etc/nginx/sites-enabled/

# 删除默认配置（避免冲突）
rm -f /etc/nginx/sites-enabled/default

# 测试配置文件语法
nginx -t
```

应该看到 `syntax is ok` 和 `test is successful`

#### 6.3 重启 Nginx
```bash
systemctl restart nginx
```

#### 6.4 测试 Nginx 代理
```bash
curl http://127.0.0.1/api/anti_content
```

应该返回 JSON 数据。

---

### 第七步：配置防火墙（必需）

```bash
# 允许 SSH（必需，防止锁死）
ufw allow 22/tcp

# 允许 HTTP
ufw allow 80/tcp

# 启用防火墙
ufw --force enable

# 查看防火墙状态
ufw status
```

---

## ✅ 验证部署成功

### 1. 在服务器本地测试
```bash
curl http://127.0.0.1/api/anti_content
```

### 2. 在浏览器访问
```
http://YOUR_SERVER_IP/api/anti_content
```

### 3. 访问 API 文档
```
http://YOUR_SERVER_IP/docs
```

应该能看到 FastAPI 自动生成的交互式 API 文档。

---

## 🔧 服务管理命令

### 常用命令

```bash
# 查看服务状态
systemctl status pdd-anti-content

# 启动服务
systemctl start pdd-anti-content

# 停止服务
systemctl stop pdd-anti-content

# 重启服务
systemctl restart pdd-anti-content

# 查看实时日志
journalctl -u pdd-anti-content -f

# 查看最近 50 条日志
journalctl -u pdd-anti-content -n 50 --no-pager
```

### Nginx 管理

```bash
# 重启 Nginx
systemctl restart nginx

# 重新加载配置（不中断服务）
systemctl reload nginx

# 测试配置文件
nginx -t

# 查看 Nginx 错误日志
tail -f /var/log/nginx/error.log
```

---

## 🐛 常见问题排查

### 问题 1：访问报 502 错误

**原因：** FastAPI 服务未运行或 Nginx 配置错误

**排查步骤：**
```bash
# 1. 检查 FastAPI 服务状态
systemctl status pdd-anti-content

# 2. 查看服务日志
journalctl -u pdd-anti-content -n 50

# 3. 测试本地是否能访问
curl http://127.0.0.1:8000/api/anti_content

# 4. 检查 Nginx 配置
nginx -t
cat /etc/nginx/sites-enabled/pdd-anti-content
```

### 问题 2：服务启动失败，日志显示 "No such file or directory: 'node'"

**原因：** systemd 服务找不到 node 命令

**解决方法：**
```bash
# 1. 查看 node 路径
which node

# 2. 修改 systemd 服务配置，在 Environment="PATH=..." 中添加 node 所在目录
# 参考上面"第五步"的配置示例

# 3. 重新加载并重启
systemctl daemon-reload
systemctl restart pdd-anti-content
```

### 问题 3：Nginx 配置文件为空

**原因：** 创建配置时可能出错

**解决方法：**
```bash
# 重新创建配置文件（参考第六步）
# 然后重启 Nginx
systemctl restart nginx
```

### 问题 4：防火墙阻止访问

**检查防火墙：**
```bash
ufw status

# 确保 80 端口已开放
ufw allow 80/tcp
```

### 问题 5：Python 依赖安装失败

**解决方法：**
```bash
# 更新 pip
pip install --upgrade pip

# 重新安装依赖
pip install -r requirements.txt
```

---

## 📝 部署检查清单

部署前请确认以下每一项都已完成：

- [ ] 5 个文件已全部上传到 `/opt/pdd-anti-content/`
- [ ] 系统依赖已安装（python3、nginx、ufw）
- [ ] Node.js 已安装且可用（`node --version`）
- [ ] Python 虚拟环境已创建并激活
- [ ] Python 依赖已安装（`pip list` 能看到 fastapi、uvicorn）
- [ ] systemd 服务配置文件已创建且 PATH 包含 node 路径
- [ ] FastAPI 服务已启动（`systemctl status pdd-anti-content` 显示 running）
- [ ] 本地能访问 FastAPI（`curl http://127.0.0.1:8000/api/anti_content` 返回 JSON）
- [ ] Nginx 配置文件已创建且语法正确（`nginx -t` 通过）
- [ ] Nginx 已重启（`systemctl restart nginx`）
- [ ] 通过 Nginx 能访问（`curl http://127.0.0.1/api/anti_content` 返回 JSON）
- [ ] 防火墙已配置（22 和 80 端口已开放）
- [ ] 浏览器能访问 `http://YOUR_IP/api/anti_content`
- [ ] API 文档可访问 `http://YOUR_IP/docs`

---

## 🎯 核心要点总结

### 必需组件
1. **Python 3** + **虚拟环境** - 运行 FastAPI
2. **Node.js** - 执行 JS 脚本（关键！）
3. **Nginx** - 反向代理
4. **Uvicorn** - ASGI 服务器（通过 requirements.txt 安装）

### 关键配置
1. **systemd 服务的 PATH 环境变量** - 必须包含 node 命令路径
2. **Nginx 反向代理配置** - 将外部请求转发到内部 8000 端口
3. **防火墙规则** - 开放 80 端口

### 服务架构
```
外部请求（80 端口）
    ↓
Nginx 反向代理
    ↓
FastAPI（8000 端口）
    ↓
Node.js（执行 JS 脚本）
```

---

## 📞 获取帮助

如果部署遇到问题，请提供以下信息：

1. 服务状态：`systemctl status pdd-anti-content`
2. 服务日志：`journalctl -u pdd-anti-content -n 50`
3. 本地测试：`curl http://127.0.0.1:8000/api/anti_content`
4. Nginx 测试：`nginx -t`
5. Node 路径：`which node`
