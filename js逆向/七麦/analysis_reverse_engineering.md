# 七麦数据 `analysis` 参数逆向分析报告

## 目标

`https://api.qimai.cn` 的所有请求都携带一个 `analysis` 查询参数，用于防止爬取。本文档记录该参数的完整逆向过程与结论。

---

## 一、初步侦察

### 流量特征

通过 Chrome DevTools Network 面板过滤 `api.qimai.cn` 请求，观察到如下 URL：

```
GET https://api.qimai.cn/rank/indexPlus/brand_id/1?page=1&analysis=ezRbWihb...
```

`analysis` 参数特征：
- Base64 编码字符串
- 每次页面加载生成不同值
- 不同请求（不同 page、不同路径）生成不同值
- 有时效性（几小时内有效）

### 网站架构

- Vue SPA，Webpack 打包，全局对象 `webpackChunkqimai`
- 未登录时前端路由守卫将页面重定向到 `/404`，但 **API 请求在重定向前已发出**
- 真实数据来自 `api.qimai.cn`（与前端域名分离），通过 axios 实例请求

---

## 二、定位加密逻辑

### 2.1 获取 Webpack require 函数

通过劫持 `webpackChunkqimai.push` 获取模块加载函数 `__webpack_require__`：

```javascript
let req;
webpackChunkqimai.push([[Symbol()], {}, (r) => { req = r; }]);
```

### 2.2 定位 axios 请求拦截器（模块 65165）

`analysis` 参数由 axios 请求拦截器动态注入。通过枚举模块工厂函数源码，找到模块 `65165` 包含核心逻辑：

```javascript
// 模块 65165 — axios 请求拦截器（关键片段，变量名已混淆）
o()[Wt][Kt][Ut](function(t) {
  try {
    var n;
    // 从 cookie 同步服务器时间
    f || $!=s || (n=(0,i[Zt])(m), s=c[x][k][Rt]=-(0,i[Zt])(l)||+new R[K]-r2*n);

    var e, r = +new R[K] - (s||H) - 1661224081041,  // timeDelta
        a = [];

    // 收集所有请求参数（排除 analysis 自身）
    void 0===t[Ot] && (t[Ot]={});
    R[W][o7](t[Ot])[M](function(n) {
      if (n==v) return !B;           // 跳过 analysis 参数
      t[Ot][_2](n) && a[b](t[Ot][n]);
    });

    a = a[jt]()[I5](N);             // 排序后拼接
    a = (0,i[Jt])(a);               // cv() = base64 编码
    a = (a += p + t[qt][T](t[Tt],N)) + (p+r) + (p+3);
    //       ↑ "@#" + url_path         ↑ "@#"+timeDelta  ↑ "@#3"

    e = (0,i[Jt])((0,i[Qt])(a, d)); // base64(XOR(明文, d))

    // 将 analysis token 追加到 URL query string
    -B==t[qt][O](v) && (t[qt] += (-B!=t[qt][O](Bn)?Nn:Bn)+v+B5+R[V5](e));
    return t;
  } catch(t) {}
}, function(n) { return R[Yt][Vt](n) });
```

### 2.3 定位加密工具模块（模块 21725）

模块 65165 依赖模块 `21725` 提供加密工具函数，导出包含：

| 导出名 | 功能 |
|--------|------|
| `cv`   | `btoa`（Base64 编码） |
| `i`    | XOR 加密函数 |
| `oZ`   | 带偏移的 XOR 变体 |

**XOR 函数源码**（已还原）：

```javascript
function xor(n, t) {
  t = t || defaultKey();
  for (var e = (n = n.split(''))[length],
           r = t[length],
           i = 0; i < e; i++) {
    n[i] = String.fromCharCode(n[i].charCodeAt(0) ^ t[i % r].charCodeAt(0));
  }
  return n.join('');
}
```

默认密钥 `defaultKey()` 返回：`a12c0fa6ab9119bc90e4ac7700796a53`（32字符）。

---

## 三、提取加密密钥 `d`

拦截器中真正使用的 XOR 密钥是 `d`，通过以下方式计算：

```javascript
d = XOR(Bt, defaultKey)
```

其中 `Bt` 是混淆的硬编码字符串常量。

### 方法：Hook `String.prototype.split` 捕获明文

XOR 函数内部调用 `n.split('')`，此时 `n` 就是完整明文。在请求发出前注入钩子：

```javascript
const origSplit = String.prototype.split;
String.prototype.split = function(sep) {
  if (sep === '' && this.length >= 40 && this.length <= 70) {
    window.__lastPlaintext = String(this);
  }
  return origSplit.apply(this, arguments);
};
```

再 Hook `window.btoa` 捕获 XOR 输出（最终 Base64 编码前的字节序列）：

```javascript
const origBtoa = window.btoa;
window.btoa = function(s) {
  const result = origBtoa.call(this, s);
  if (s && s.length >= 40 && s.length <= 70 && window.__lastPlaintext) {
    // 同时持有明文和密文，逐字节 XOR 反推密钥
    const keyBytes = Array.from(s).map((c, i) =>
      c.charCodeAt(0) ^ window.__lastPlaintext.charCodeAt(i)
    );
    window.__keyCapture = keyBytes;
  }
  return result;
};
```

### 捕获结果

触发一次 `/rank/indexPlus/brand_id/1?page=1` 请求后，捕获到：

```
明文:     "MQ==@#/rank/indexPlus/brand_id/1@#113115077990@#3"
明文长度: 49 字节
XOR输出:  [123,52,91,90,40,91,86,8,84,95,92,76,13,15,...]
密钥字节: [54,101,102,103,104,120,121,122,53,49,55,99,100,97,57,  // 重复
           54,101,102,103,104,120,121,122,53,49,55,99,100,97,57,
           54,101,102,103,104,120,121,122,53,49,55,99,100,97,57,
           54,101,102,103]
```

密钥字节转 ASCII：`6efghxyz517cda9`，**以 15 字符为周期循环**，验证 `isRepeating = true`。

---

## 四、完整算法

```
analysis = base64( XOR( plaintext, "6efghxyz517cda9" ) )
```

其中明文结构为：

```
plaintext = cv(sorted_param_values) + "@#" + url_path + "@#" + timeDelta + "@#3"
```

各字段说明：

| 字段 | 说明 | 示例 |
|------|------|------|
| `cv(sorted_param_values)` | 将请求参数值（排除 `analysis`）排序后拼接，再 Base64 编码 | `page=1` → `"1"` → `"MQ=="` |
| `"@#"` | 固定分隔符 | — |
| `url_path` | 请求路径（去掉 baseURL `https://api.qimai.cn`） | `/rank/indexPlus/brand_id/1` |
| `timeDelta` | 相对参考时间戳的毫秒差 | `113115077990` |
| `"@#3"` | 固定后缀 | — |

### timeDelta 计算

```
timeDelta = Date.now() + syncd_ms - 1661224081041
```

- `1661224081041`：固定参考时间戳（2022-08-23 UTC）
- `syncd_ms`：浏览器 cookie `syncd` 的整数值，表示服务器时钟与客户端时钟的偏差（毫秒）
  - 示例：`syncd=-1452009`，即服务器时钟比客户端慢约 24 分钟
  - 来源：访问 `https://www.qimai.cn` 后，站点通过 API 响应头同步服务器时间并写入 cookie

---

## 五、Python 实现

```python
import base64
import time

_XOR_KEY = "6efghxyz517cda9"
_BASE_TS = 1661224081041

def _xor(text: str, key: str) -> bytes:
    kb = key.encode()
    return bytes(b ^ kb[i % len(kb)] for i, b in enumerate(text.encode()))

def generate_analysis(url_path: str, params: dict, syncd_ms: int = -1452009) -> str:
    # 排序参数值（排除 analysis 本身）
    values = sorted(str(v) for k, v in params.items() if k != "analysis")
    cv = base64.b64encode("".join(values).encode()).decode()

    time_delta = int(time.time() * 1000) + syncd_ms - _BASE_TS
    plaintext = f"{cv}@#{url_path}@#{time_delta}@#3"
    return base64.b64encode(_xor(plaintext, _XOR_KEY)).decode()
```

### 使用示例

```python
url_path = "/rank/indexPlus/brand_id/1"
params   = {"page": 1}
params["analysis"] = generate_analysis(url_path, params)

resp = requests.get(
    "https://api.qimai.cn" + url_path,
    params=params,
    headers={"Referer": "https://www.qimai.cn/"},
    cookies=COOKIES,
)
```

---

## 六、关键常量汇总

| 常量 | 值 | 说明 |
|------|----|------|
| XOR 密钥 | `6efghxyz517cda9` | 15字符，循环使用 |
| 分隔符 | `@#` | 明文各段之间的分隔符 |
| 参考时间戳 | `1661224081041` | Unix 毫秒，约 2022-08-23 |
| 默认 XOR 密钥（未使用） | `a12c0fa6ab9119bc90e4ac7700796a53` | `u()` 的返回值，仅用于解密 `d` |

---

## 七、有效期与更新策略

| 参数 | 有效期 | 更新方式 |
|------|--------|----------|
| `analysis` | 每请求自动生成，无需手动维护 | `generate_analysis()` 函数自动计算 |
| `syncd_ms` | 与会话绑定，通常数小时稳定 | 从浏览器 cookie `syncd` 复制 |
| `PHPSESSID` / `qm_check` | 登录会话有效期 | 重新登录后从浏览器 cookie 更新 |

> **注意**：`syncd_ms` 偏差约 24 分钟，但 analysis token 有效窗口为数小时，因此此偏差不影响实际使用。
> 未登录状态下最多获取 210 条（11页）；VIP 账号可获取完整 500 条。
