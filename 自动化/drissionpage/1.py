import requests  # 也可以继续用 httpx，这里用 requests 做演示
from DrissionPage import ChromiumPage, ChromiumOptions

# --- 配置信息 (保持你的变量) ---
LOCAL_API_BASE = "http://127.0.0.1:50325"
Browser_ID = "k19j3unu"  # 替换你的 ID
apiKey = "1f40b245aa0603c023b611b3c28f0d0d00827004cc21a0ae"


def main():
    # 1. 调用 AdsPower 启动接口
    start_url = f"{LOCAL_API_BASE}/api/v2/browser-profile/start"
    headers = {'Authorization': f'Bearer {apiKey}'}
    json_data = {
        "profile_id": Browser_ID,
        "last_opened_tabs": "0",  # 不打开之前的标签页
        "proxy_detection": "0",  # 不检测代理 (加快启动速度)
    }

    try:
        # 发送请求启动浏览器
        resp = requests.post(start_url, headers=headers, json=json_data)
        resp_json = resp.json()

        # 2. 检查启动是否成功
        if resp.status_code == 200 and resp_json['code'] == 0:
            print(f"浏览器启动成功: {Browser_ID}")

            # --- 关键修改点 ---
            # Playwright 用的是 ['ws']['puppeteer'] (ws://...)
            # DrissionPage 建议用 ['ws']['selenium'] (127.0.0.1:xxxxx)
            # 这两个地址指向的是同一个浏览器实例，只是格式不同
            debug_address = resp_json['data']['ws']['selenium']
            print(f"接管地址: {debug_address}")

            # 3. 配置 DrissionPage 接管
            co = ChromiumOptions()
            co.set_address(debug_address)  # 设置接管地址

            # 初始化页面 (自动接管该浏览器)
            page = ChromiumPage(addr_or_opts=co)

            # 4. 业务逻辑 (对应原本的 page.goto)
            print("正在访问 BrowserScan...")
            page.get("https://www.browserscan.net")

            print("页面标题:", page.title)

            # 这里的 wait 不需要像 playwright 那样用 timeout，
            # DrissionPage 的操作通常是自动等待的，或者用 time.sleep
            # input("按回车关闭浏览器...")

            # 如果需要通过代码关闭浏览器：
            # requests.get(f"{LOCAL_API_BASE}/api/v2/browser-profile/stop", params={"profile_id": Browser_ID}, headers=headers)

        else:
            print(f"启动失败: {resp_json}")

    except Exception as e:
        print(f"发生错误: {e}")


if __name__ == "__main__":
    main()