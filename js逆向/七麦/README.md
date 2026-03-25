# 七麦数据 榜单爬取

目标: `https://www.qimai.cn/rank/index/brand/free/device/iphone/country/cn/genre/36`

## 逆向分析

### 网站结构
- Vue SPA，所有路由由客户端 JS 处理
- 未登录时前端路由守卫将所有页面重定向到 `/404`，但 **API 请求在重定向前已发出**
- 真实数据来自 `api.qimai.cn`，与前端域名 `www.qimai.cn` 分离

### API 端点

```
GET https://api.qimai.cn/rank/indexPlus/brand_id/{brand_id}?page={page}&analysis={token}
GET https://api.qimai.cn/rank/indexPlus/brand_id/{brand_id}/genre_id/{genre_id}?page={page}&analysis={token}
```

| 参数 | 说明 |
|------|------|
| `brand_id` | 0=付费榜 1=免费榜 2=畅销榜 |
| `genre_id` | 七麦内部分类 ID（36=音乐，仅登录后有效）|
| `page` | 分页，每页20条 |
| `analysis` | **动态签名 token**，见下方说明 |

### analysis 参数（关键）

`analysis` 是每次页面加载时由前端 JS 动态生成的签名字符串，用于防爬。

**特征：**
- Base64 编码
- 包含时间戳信息，**有时效性**（几小时内有效）
- 每次打开页面生成不同的值

**获取方式：**
1. 打开浏览器，访问 `https://www.qimai.cn/rank`
2. F12 → Network → 筛选 `api.qimai.cn`
3. 点击任意请求，复制 URL 中的 `analysis=` 后面的值
4. 粘贴到脚本的 `ANALYSIS_TOKEN` 变量

### 限制

| 条件 | 可获取数量 |
|------|-----------|
| 未登录 | 最多 210 条（综合榜，genre 过滤无效）|
| 登录普通用户 | 更多，按 genre 过滤有效 |
| VIP 用户 | 完整 500 条 |

## 使用方法

```bash
# 安装依赖
pip install requests openpyxl

# 编辑脚本，更新 ANALYSIS_TOKEN 和 COOKIES
# 运行
python qimai_rank.py
```

输出文件保存至桌面：`七麦_免费榜_YYYYMMDD_HHMM.xlsx`

## 输出字段

| 字段 | 说明 |
|------|------|
| 排名 | 当前榜单位次 |
| 应用名称 | App 名称 |
| 副标题 | App Store 副标题 |
| 分类 | 游戏/工具/效率等 |
| 开发者 | 发行商 |
| 价格 | 免费 / ¥金额 |
| 排名变化 | +N 上升 / -N 下降 / 0 不变 |
| AppID | App Store 数字 ID |
| 是否广告 | 是否为推广位 |
| 文件大小MB | |
| 图标链接 | App 图标 CDN URL |
