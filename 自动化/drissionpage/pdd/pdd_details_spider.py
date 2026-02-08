#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
拼多多商品详情采集工具 - 深度优化版
1. 解决 ElementLostError: 采用实时属性重定位
2. 规避风控: 引入数据就绪检测 & 真人模拟轨迹
3. 增强稳定性: 详情页超时自愈
"""

import json
import random
import re
import time
import requests
from DrissionPage import ChromiumPage, ChromiumOptions

# --- 配置 ---
LOCAL_API_BASE = "http://127.0.0.1:50325"
Browser_ID = "k19j3unu"
ApiKey = "1f40b245aa0603c023b611b3c28f0d0d00827004cc21a0ae"

# 状态记录
seen_goods_ids = set()
clicked_uniqids = set()


def check_risk_control(dp):
    """检测页面是否触发风控关键词"""
    risk_keywords = ["账号存在风险", "请进行验证", "滑动验证", "验证操作", "APP内进行验证"]
    page_html = dp.html
    for kw in risk_keywords:
        if kw in page_html:
            print(f"\n🚨 [风控阻断] 检测到关键词: {kw}")
            return True
    return False


def wait_data_ready(dp, timeout=6):
    """
    等待 window.rawData 填充完成。
    解决服务器返回“脱水版”HTML的问题。
    """
    start = time.time()
    while time.time() - start < timeout:
        # 检查 window.rawData 是否存在且不为 null
        is_ready = dp.run_js('return window.rawData !== null && typeof window.rawData === "object"')
        if is_ready:
            return True
        time.sleep(0.5)
    return False


def is_product_card(item):
    """排除金刚位，只选商品"""
    try:
        # 排除掉父级 ID 包含快捷入口的
        parent_id = item.parent().attr('id')
        if parent_id and 'quick-entrance' in parent_id:
            return False
        # 包含图片和数字价格
        return item.ele('tag:img', timeout=0.1) and re.search(r'\d+', item.text)
    except:
        return False


def handle_detail_save(resp):
    """解析并保存监听到的详情数据"""
    try:
        url = resp.url
        if "goods.html" not in url: return None

        gid_match = re.search(r'goods_id=(\d+)', url)
        if not gid_match: return None
        goods_id = gid_match.group(1)

        if goods_id in seen_goods_ids: return goods_id

        html_body = resp.response.body
        if not isinstance(html_body, str): return None

        match = re.search(r'window\.rawData\s*=\s*(\{.*?\});', html_body, re.S)
        if match:
            raw_data = json.loads(match.group(1))
            with open(f"{goods_id}.txt", "w", encoding="utf-8") as f:
                json.dump(raw_data, f, ensure_ascii=False, indent=2)
            seen_goods_ids.add(goods_id)
            print(f"✅ 成功提取: {goods_id}")
            return goods_id
    except Exception as e:
        print(f"❌ 数据解析异常: {e}")
    return None


def main():
    # 1. 启动并连接浏览器
    start_resp = requests.post(f"{LOCAL_API_BASE}/api/v2/browser-profile/start",
                               headers={'Authorization': f'Bearer {ApiKey}'},
                               json={"profile_id": Browser_ID}).json()
    if start_resp.get('code') != 0: return

    co = ChromiumOptions().set_address(start_resp['data']['ws']['selenium'])
    dp = ChromiumPage(addr_or_opts=co)
    dp.listen.start('goods.html')

    print("🚀 正在加载列表页...")
    dp.get("https://mobile.yangkeduo.com/")
    time.sleep(2)

    scroll_count = 0
    while scroll_count < 50:
        if check_risk_control(dp): break

        print(f"\n--- 扫描第 {scroll_count + 1} 屏 ---")

        # 实时获取带有 data-uniqid 的元素，解决 ElementLostError 的关键
        # 不再一次性循环整个列表，而是每次只找下一个“未点击”的
        for _ in range(8):  # 每屏最多尝试点击 8 个
            if check_risk_control(dp): break

            # 重新寻找 DOM，确保 handle 永远是最新的
            all_divs = dp.eles('tag:div@@data-uniqid')
            target = None

            for div in all_divs:
                u_id = div.attr('data-uniqid')
                if u_id not in clicked_uniqids and is_product_card(div):
                    target = div
                    break

            if not target: break  # 本屏没有新商品了

            try:
                current_u_id = target.attr('data-uniqid')
                clicked_uniqids.add(current_u_id)

                # --- 拟人化操作 ---
                dp.scroll.to_see(target)
                time.sleep(random.uniform(0.3, 0.8))

                # 模拟鼠标悬停后再点击，避开瞬时点击检测
                target.hover()
                time.sleep(random.uniform(0.2, 0.4))
                target.click()

                # --- 详情页处理 ---
                time.sleep(1.5)
                if check_risk_control(dp): break

                # 检查 rawData 是否真的刷出来了
                if wait_data_ready(dp):
                    # 获取监听到最新的详情包
                    for res in dp.listen.steps(timeout=2):
                        handle_detail_save(res)
                else:
                    print(f"⚠️ 商品数据加载超时(window.rawData 为空)，跳过")

                # 返回列表页
                dp.back()
                time.sleep(random.uniform(2, 3))  # 留出页面重绘时间

            except Exception as e:
                print(f"❌ 流程异常: {e}")
                if "goods.html" in dp.url: dp.back()

        # 翻页逻辑：模拟非等距滑动
        step = random.randint(800, 1300)
        dp.run_js(f"window.scrollBy(0, {step})")
        scroll_count += 1
        print(f"📊 已采集: {len(seen_goods_ids)} | 已跳过/处理卡片: {len(clicked_uniqids)}")
        time.sleep(random.uniform(1.5, 3))


if __name__ == "__main__":
    main()