import csv
import random
import time

import requests
from DrissionPage import ChromiumPage, ChromiumOptions

# --- 配置 ---
LOCAL_API_BASE = "http://127.0.0.1:50325"
Browser_ID = "k19j3unu"
apiKey = "1f40b245aa0603c023b611b3c28f0d0d00827004cc21a0ae"

SAVE_CSV = "pdd_goods_list.csv"

# 全局去重集合
seen_goods_ids = set()


def save_to_csv(rows):
    """保存数据到 CSV"""
    header = [
        "goods_id", "goods_name", "price",
        "sales", "shop_sales_tip",
        "thumb_url", "link_url"
    ]
    file_exists = False
    try:
        with open(SAVE_CSV, "r", encoding="utf-8"):
            file_exists = True
    except:
        pass

    with open(SAVE_CSV, "a", newline="", encoding="utf-8-sig") as f:
        writer = csv.DictWriter(f, fieldnames=header)
        if not file_exists:
            writer.writeheader()
        for row in rows:
            writer.writerow(row)


def handle_response(resp):
    """处理监听到的响应"""
    try:
        data = resp.response.body
        if not data:
            return

        goods_list = data.get("data", {}).get("goods_list", [])
        if not goods_list:
            return

        new_rows = []

        for item in goods_list:
            goods = item.get("data", {})
            goods_id = goods.get("goods_id")
            if not goods_id:
                continue

            # 去重
            if goods_id in seen_goods_ids:
                continue
            seen_goods_ids.add(goods_id)

            row = {
                "goods_id": goods_id,
                "goods_name": goods.get("goods_name"),
                "price": goods.get("price_info"),
                "sales": goods.get("sales"),
                "shop_sales_tip": goods.get("sales_tip"),
                "thumb_url": goods.get("thumb_url"),
                "link_url": goods.get("link_url"),
            }
            new_rows.append(row)

            print(f"[+] 新商品: {goods_id} | {row['goods_name']} | ¥{row['price']} | 销量:{row['sales']}")

        if new_rows:
            save_to_csv(new_rows)
            print(f"💾 本批保存 {len(new_rows)} 条，总计: {len(seen_goods_ids)}")

    except Exception as e:
        print("解析响应异常:", e)


def human_scroll(dp, times=3):
    """模拟人工滚动"""
    for _ in range(times):
        px = random.randint(400, 900)
        dp.run_js(f"window.scrollBy(0, {px})")
        time.sleep(random.uniform(0.8, 1.5))

    # 偶尔回拉一点，更像真人
    if random.random() < 0.2:
        back_px = random.randint(100, 300)
        dp.run_js(f"window.scrollBy(0, -{back_px})")
        time.sleep(random.uniform(0.5, 1.0))


def main():
    start_url = f"{LOCAL_API_BASE}/api/v2/browser-profile/start"
    headers = {'Authorization': f'Bearer {apiKey}'}
    json_data = {
        "profile_id": Browser_ID,
        "last_opened_tabs": "0",
        "proxy_detection": "0",
    }

    try:
        resp = requests.post(start_url, headers=headers, json=json_data)
        resp_json = resp.json()

        if resp.status_code == 200 and resp_json['code'] == 0:
            print(f"浏览器启动成功: {Browser_ID}")

            debug_address = resp_json['data']['ws']['selenium']
            print(f"接管地址: {debug_address}")

            co = ChromiumOptions()
            co.set_address(debug_address)
            dp = ChromiumPage(addr_or_opts=co)

            # 打开拼多多首页
            dp.get("https://mobile.yangkeduo.com/")
            time.sleep(5)

            # 开始监听接口
            dp.listen.start('/proxy/api/api/alexa/cells/hub/v3', method='GET')
            print("🎧 开始监听商品列表接口...")

            # 主循环：滚动 + 处理监听数据
            while True:
                human_scroll(dp, times=2)  # 模拟人工滚动
                time.sleep(1)

                # 设置超时，避免阻塞（超时后继续下一次循环）
                for resp in dp.listen.steps(timeout=3):
                    handle_response(resp)

                print(f"当前已采集商品数: {len(seen_goods_ids)}")
                time.sleep(random.uniform(1.0, 2.0))

        else:
            print(f"启动失败: {resp_json}")

    except Exception as e:
        print(f"发生错误: {e}")


if __name__ == "__main__":
    main()
