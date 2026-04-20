"""Prometheus 指标集中定义。

M5 SLO 所需面板：
    - query_requests_total{mode,result}     —— 各模式请求分布 + 缓存命中
    - query_latency_seconds{mode}           —— p95/p99 histogram
    - cache_hits_total / cache_misses_total —— 命中率
    - mdkd_account_status{mobile,station}   —— 账号失效告警（告警表达式见 docs）
    - anti_content_gen_total{result}        —— node pool 压力
    - bind_events_total{result}             —— 绑定成功/失败分布
    - pkg_upsert_total{station,result}      —— 轮询入库速度
"""
from __future__ import annotations

from prometheus_client import Counter, Gauge, Histogram

# ---- C 端查件 ---------------------------------------------------------
query_requests_total = Counter(
    "pkg_query_requests_total",
    "查件 API 请求数",
    ["mode", "result"],  # result: hit / miss / bad_input
)

query_latency_seconds = Histogram(
    "pkg_query_latency_seconds",
    "查件 API 延迟（端到端）",
    ["mode"],
    # 贴合 SLO：200ms/400ms 附近分辨率要高
    buckets=(0.001, 0.005, 0.010, 0.025, 0.050, 0.100, 0.200, 0.400, 0.800, 1.500, 3.000),
)

cache_hits_total = Counter("pkg_query_cache_hits_total", "Redis 查件缓存命中")
cache_misses_total = Counter("pkg_query_cache_misses_total", "Redis 查件缓存未命中")

# ---- 账号 & Node pool --------------------------------------------------
mdkd_account_status = Gauge(
    "mdkd_account_status",
    "驿站账号状态（0=ok 1=need_relogin 2=disabled）",
    ["mobile", "station"],
)

mdkd_account_refresh_total = Counter(
    "mdkd_account_refresh_total",
    "refreshToken 调用次数",
    ["result"],  # ok / err
)

anti_content_gen_total = Counter(
    "pkg_anti_content_gen_total",
    "anti-content 生成次数",
    ["pool", "result"],  # pool=mdkd/0aq, result=ok/err
)

# ---- 业务事件 ---------------------------------------------------------
bind_events_total = Counter(
    "pkg_bind_events_total",
    "绑定流程结果",
    ["result"],  # verified / no_candidate / reverse_mismatch / unbind
)

pkg_upsert_total = Counter(
    "pkg_upsert_total",
    "包裹 upsert 次数（轮询落地）",
    ["station", "result"],  # inserted / updated / skipped
)

image_fetch_total = Counter(
    "pkg_image_fetch_total",
    "底单图 API 结果",
    ["result"],  # cached / ok / soft_block / err / no_perm / not_found
)

# ---- 订阅消息 ---------------------------------------------------------
push_enqueued_total = Counter(
    "pkg_push_enqueued_total",
    "入队推送任务数",
)

push_sent_total = Counter(
    "pkg_push_sent_total",
    "已投递的订阅消息",
    ["result"],  # ok / no_quota / err / exception
)

push_queue_depth = Gauge(
    "pkg_push_queue_depth",
    "推送队列当前深度（lazy，下次 scrape 时读）",
    ["queue"],  # queue / dlq
)
