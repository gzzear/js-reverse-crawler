# 拼多多 H5 商详协议采集工具

PyQt6 桌面工具，**纯协议路径**批量抓取拼多多 H5 商详页 JSON，按 `goods_id` 落盘。
不嵌浏览器、不走 Selenium/Playwright，一次 HTTP GET + SSR 解析即可完成。

---

## 一、核心原理

拼多多 H5 商详 `https://mobile.yangkeduo.com/goods.html?goods_id=<id>` 的商品数据是 **SSR 直接内联**在 HTML 里的 —— 服务端把完整 `store.initDataObj.goods`（含商品名、SKU、图集、类目、商家等约 120 字段）塞进一段：

```html
<script>window.rawData = { "store": { "initDataObj": { "goods": {...} } } };</script>
```

工具只做三步：

1. `GET /goods.html?goods_id=X`（带 `PDDAccessToken` cookie）
2. 定位 `window.rawData`，**括号平衡**扫描 JSON 块（正确处理引号/转义）
3. `json.loads` → 取 `store.initDataObj.goods` → 写盘 `{goods_id}.json`

> ⚠️ **不走 `caterham/query/goods_detail_with_tags`**。那条 API 需要 `anti_content` + `pfb/a4` 会话握手，但真实浏览器在商详页**根本不调它** —— 是上游反爬埋的假目标。相关逆向资产仍保留在 `signer/`，万一未来 PDD 给 SSR 上墙可以秒切。

### 失败判定

| 场景 | 异常类型 | 处理 |
|---|---|---|
| 302 → /login.html | `RefusedError` | cookie 失效，计数 +1，换 cookie 重试 |
| HTTP 429 | `RefusedError` | 同上 |
| rawData 解析失败 | `ProtocolError` | 软跳过，记入失败列表 |
| `goodsName` 为空 / 含"售罄"/"已下架" | `GoodsUnavailable` | 商品级软封控，**不烧 cookie、不重试**，直接进失败列表 |
| `skus` 为空 | `GoodsUnavailable` | 同上 |
| HTTP 其他 4xx/5xx | `ProtocolError` | 软跳过 |

---

## 二、项目结构

```
protocol_collector/
├── main.py                     # PyQt6 应用入口
├── requirements.txt
├── README.md
│
├── ui/                         # GUI 层
│   ├── main_window.py          #   主窗口：URL / cookie 表 / 设置栏 / 日志 / 控制条
│   ├── styles.qss              #   浅色主题样式表
│   └── widgets/                #   预留自定义控件目录
│
├── core/                       # 业务层（除 collector 外与 Qt 解耦）
│   ├── collector.py            #   CollectorWorker（QObject+QThread）+ CollectorController
│   ├── pdd_client.py           #   httpx HTTP/2 客户端 + rawData 提取 + 软封控检测
│   ├── cookie_pool.py          #   Cookie 轮转池（round-robin + 连续失败死亡阈值）
│   ├── proxy_manager.py        #   代理解析 host:port[:user:pass] + 验证
│   ├── url_parser.py           #   从粘贴文本抽 goods_id（URL 或裸数字，去重）
│   └── result_writer.py        #   原子写：tmp 文件 + os.replace
│
├── signer/                     # 协议签名资产（H5 SSR 路线当前未使用，备用）
│   ├── anti_content.py         #   Node 子进程长连接 worker，生成 anti_content
│   ├── sign_worker.js          #   V8 侧入口，eval anti_co.js 后暴露 getAntiContent
│   ├── browser_stubs.js        #   navigator / document / screen / canvas 等浏览器 polyfill
│   ├── anti_co.js              #   从 static.pddpic.com 拉下的反爬模块（支持自动更新）
│   ├── anti_co.meta            #   url + hash，用于增量更新
│   ├── updater.py              #   检测版本变更并重下
│   ├── pfb_handshake.py        #   pfb/a3 → ba/dt/cg → pfb/a4 会话注册握手（Python 实现）
│   └── templates/
│       └── pfb_a4_template.bin #   16609 字节 TLV 指纹模板（102 字段，真实捕获）
│
├── data/
│   └── goods/                  # 输出：{goods_id}.json
└── logs/                       # 预留日志目录
```

---

## 三、模块职责

### `core/collector.py` — 调度器

- **`CollectorConfig`** 数据类：`urls / ua / interval_sec / threads / per_cookie_reuse / proxy / death_threshold / max_retries`
- **`CollectorWorker(QObject)`** 跑在 `QThread` 里，内部再开 N 个 daemon Python 线程并发拉取：
  - 线程安全 URL 队列 + per-gid 重试计数 + cookie 轮转
  - 可中断 `sleep`（`_stop.wait()`），"停止"按钮秒响应
  - `log / progress / cookie_updated / finished` 四条 `pyqtSignal` 跨线程推 UI
  - `failed_gids()` 导出全部失败 gid（ProtocolError 跳过 / 重试耗尽 / 商品不可用 / 停止时队列残留）
  - daemon 线程整体包 try/except，异常不再静默吞
- **`CollectorController`** 管 QThread+Worker 生命周期：`start / stop / stop_blocking`
  - `stop_blocking()` 等满 20s（> httpx 15s 超时），最后兜底 `terminate()`，防止停止中出现僵尸线程

### `core/pdd_client.py` — HTTP 客户端

- 单一复用 `httpx.Client(http2=True)`（worker 生命周期内唯一，连接池复用）
- `fetch_goods_detail(goods_id, cookie)` 返回 goods dict
- `_extract_raw_data(html)` 自己做括号平衡扫描，正确处理转义引号、字符串内大括号
- 三级异常：`RefusedError`（账号级）/ `GoodsUnavailable`（商品级）/ `ProtocolError`（结构异常）

### `core/cookie_pool.py`

- `parse_cookie_string()` 宽松解析浏览器导出字符串
- `CookieEntry`：`success_count / fail_count / consecutive_fails / dead`
- `CookiePool.acquire()` round-robin 跳过 dead+invalid
- `report_failure()` 连续 N 次失败标死（N = `death_threshold`，运行时可通过 `set_death_threshold` 热更新）
- `filter_alive() / filter_dead()` 供 UI"复制有效/无效 cookie"按钮

### `core/url_parser.py`

支持粘贴格式：
- 完整 URL：`https://mobile.yangkeduo.com/goods.html?goods_id=878497893729`
- 裸 goods_id：`878497893729`
- 多行混排 + 自动去重 + 位数校验（8–20 位）

### `core/result_writer.py`

原子写：先写 `{id}.json.tmp`，再 `os.replace` 落位，并发写安全。

### `ui/main_window.py`

布局（自上而下）：

```
┌──────────────────────────────────────────────┐
│ 链接列表（QPlainTextEdit + 剩余计数 + 文件导入）│
├──────────────────────────────────────────────┤
│ Cookie 表格（序号/Cookie/成功/失败/状态）       │
│ [粘贴] [清空] [复制有效] [复制无效]             │
├──────────────────────────────────────────────┤
│ 间隔 / 并发 / reuse / 重试 / 死亡阈值 / 代理    │
│ User-Agent:   [............................] │
├──────────────────────────────────────────────┤
│ [开始] [停止] [导出失败链接]  [===进度条===]    │
├──────────────────────────────────────────────┤
│ 运行日志（INFO 蓝 / OK 绿 / WARN 黄 / ERR 红）   │
└──────────────────────────────────────────────┘
```

---

## 四、使用

### 安装

```bash
pip install -r requirements.txt
```

### 启动

```bash
python main.py
```

### 操作流程

1. 在"链接列表"粘贴商详 URL 或 goods_id（一行一个），或点"从文件导入"
2. 在"Cookie 列表"粘贴浏览器导出的 cookie（至少含 `PDDAccessToken`），一行一个
3. 调节采集设置（推荐默认）
4. 点 **开始采集**
5. 结束后如有失败，点 **导出失败链接** 另存为 txt（一行一条可再次投喂的 URL）

### 输出

每个商品落盘 `data/goods/{goods_id}.json`，是完整的 `window.rawData` 对象（含 `store.initDataObj.goods` 等全部字段）。软封控校验基于 `store.initDataObj.goods` 内的 goodsName / skus 字段。

---

## 五、配置项语义

| 字段 | 默认 | 说明 |
|---|---|---|
| 请求间隔 | `1.0s` | 每个线程每次请求后的 sleep（可中断） |
| 并发线程 | `3` | 同时工作的 Python 线程数 |
| 每 cookie 请求数 | `1` | 同一 cookie 连续复用多少次再轮换 |
| 最大重试 | `3` | 单个 goods_id 在 REFUSE/网络异常后的最多重试次数 |
| Cookie 死亡阈值 | `5` | 连续失败 N 次后该 cookie 标记 dead 并停用 |
| 使用代理 | off | `host:port` 或 `host:port:user:pass` |
| User-Agent | Mac Chrome 146 | 建议保持桌面浏览器常见值 |

---

## 六、已知限制

1. **价格/库存脱敏**：PDD H5 商详的 `minOnSalePrice / maxOnSalePrice` 等价格字段默认被服务端置 0，完整价格锁在 App 协议里 —— 这是 PDD 的产品策略，不是封控，真实浏览器也是 0，前端会渲染成"前往 APP 查看价格"。
2. **Cookie 有效期短**：`PDDAccessToken` 风控更新频繁，跑一阵子会被刷死，需要换号。
3. **售罄/下架占位**：PDD 对部分商品返回"空壳" goods 块（`goodsName=null`、`skus=[]`），本工具会检测并计入失败列表而非伪装成功。
4. **不做图片下载，不做 App 协议路线。**

---

## 七、`signer/` 目录的历史意义

`signer/` 下是前期对 caterham API 路线的完整逆向成果：

- 定位 `anti_content = "0a" + base64url(zlib_deflate(TLV(指纹)))`，由嵌套 webpack `module 47927 → 32455 → mod[3]/mod[4]` 生成
- 破解 pfb/a4 的 sign 公式：`sha1("fe" + "HJ6793TJDI86DLS9D" + ts + data)`
- 用 `Object.prototype` setter 陷阱捕获 js-sha1 实例
- 完整捕获并可回放 pfb/a3 → ba/dt/cg → pfb/a4 三步会话握手
- `pfb_handshake.py` 已实现并验证（live pfb/a4 返回 `success:true`）

后来在浏览器 Network tab 验证发现**商详页根本不发起 caterham 请求**，SSR 路线可直接出数据，于是切换了方案。这套代码作为"上墙兜底"保留 —— 如果未来 PDD 对 `goods.html` 加校验，可以快速切回协议 API 路线。

---

## 八、依赖

```
PyQt6 >= 6.6
httpx[http2] >= 0.27
msgpack >= 1.0    # 仅 signer 调试用
```

Node.js 只有在启用 `signer/anti_content.py` 时才需要（当前 SSR 路线不用）。

---

## 九、架构决策与设计取舍

| 决策 | 理由 |
|---|---|
| 纯协议 + SSR 抽取 | 不用浏览器驱动，启动秒开、内存占用低、绕开 `navigator.webdriver` / CDP 检测 |
| `httpx[http2]` 单实例复用 | HTTP/2 多路复用 + TLS 会话复用，降低指纹差异和请求延迟 |
| Qt 信号槽跨线程 | `pyqtSignal` 自带跨线程队列，worker 无需持有 UI 引用 |
| 括号平衡手写扫描 | 正则在嵌套 JSON + 转义引号场景下会失控 |
| `GoodsUnavailable` 独立异常 | 售罄类失败不应消耗 cookie 重试次数 |
| 原子写（tmp + replace） | 断电/崩溃不会留下半截 JSON |
| per-gid 重试上限 | 避免单个坏 gid 把整池 cookie 烧死 |
| daemon 线程 + 可中断 sleep | 停止按钮秒响应，无需等满间隔 |
