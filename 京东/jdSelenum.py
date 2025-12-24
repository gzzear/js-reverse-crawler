import base64
import json
import os
import random
import time

import ddddocr
import numpy as np
from selenium.common.exceptions import NoSuchElementException
from selenium.webdriver import ActionChains
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.support.ui import WebDriverWait
from seleniumwire import webdriver  # 替换为seleniumwire


def downloadImage(bg_url, file_name):
    """Download image from base64 URL"""
    try:
        img = bg_url.replace('data:image/jpg;base64,', '').replace('data:image/png;base64,', '').replace(
            'data:image/webp;base64,',
            '')  # 将base64去掉
        lens = 4 - len(img) % 4  # 判断base64数据是否为4的整数倍，如果不是用=号填充
        img += '=' * lens  # 差多少个数据就填充多少个=号

        # 将data:image/jpg;base64格式的数据转化为图片
        page_content = base64.b64decode(img)
        file_path = f'./{file_name}'
        with open(file_path, 'wb') as f:
            f.write(page_content)
        return True
    except Exception as e:
        print(f"Error downloading image {file_name}: {e}")
        return False


def human_like_move(actions, element, distance):
    """生成更自然的人类风格滑动动作"""
    # 添加初始的微小移动（模拟鼠标定位）
    actions.pause(random.uniform(0.1, 0.3))
    actions.move_by_offset(random.randint(-2, 2), random.randint(-1, 1))
    actions.pause(random.uniform(0.05, 0.15))

    # 生成更复杂的Bezier曲线控制点
    control_points = np.array([
        [0, 0],
        [distance * 0.2, random.randint(-3, 3)],
        [distance * 0.5, random.randint(-2, 2)],
        [distance * 0.8, random.randint(-1, 1)],
        [distance, 0]
    ])

    # 在曲线上生成轨迹点，使用更多控制点
    num_steps = random.randint(15, 25)  # 增加步数让滑动更平滑
    steps = []
    for i in range(num_steps + 1):
        t = i / num_steps
        # 使用4次Bezier曲线
        point = (1 - t) ** 4 * control_points[0] + \
                4 * (1 - t) ** 3 * t * control_points[1] + \
                6 * (1 - t) ** 2 * t ** 2 * control_points[2] + \
                4 * (1 - t) * t ** 3 * control_points[3] + \
                t ** 4 * control_points[4]
        steps.append(point)

    # 添加轨迹点之间的动作，模拟人类的不规则移动
    last_x = 0
    last_y = 0
    for i, point in enumerate(steps[1:], 1):
        dx = point[0] - last_x
        dy = point[1] - last_y

        # 根据移动距离调整延时
        move_distance = (dx ** 2 + dy ** 2) ** 0.5
        if move_distance > 5:
            actions.pause(random.uniform(0.08, 0.15))
        else:
            actions.pause(random.uniform(0.03, 0.08))

        # 添加更自然的垂直抖动
        if random.random() > 0.6:  # 40%概率添加垂直移动
            small_dy = random.randint(-2, 2)
            actions.move_by_offset(0, small_dy).pause(0.02)

        # 移动主体
        actions.move_by_offset(dx, dy)
        last_x = point[0]
        last_y = point[1]

    # 添加结束时的犹豫和微调
    actions.pause(random.uniform(0.2, 0.4))

    return actions


def find_chromedriver():
    """Find ChromeDriver in common locations"""
    possible_paths = [
        '/Users/gaozhe/Desktop/chromedriver-mac-arm64/chromedriver',
        '/usr/local/bin/chromedriver',
        '/opt/homebrew/bin/chromedriver',
        './chromedriver',
        'chromedriver'
    ]

    for path in possible_paths:
        if os.path.exists(path):
            return path

    raise FileNotFoundError("ChromeDriver not found. Please install it or specify the correct path.")


def login(driver, username, password, headless=False):
    """Login to JD.com with slider captcha handling"""
    cookie_dict = {}
    try:
        driver.find_element(By.XPATH, '//*[@id="J_user"]/div/div[2]/a').click()
        # Wait for page to load
        wait = WebDriverWait(driver, 10)

        # Fill in credentials
        username_input = wait.until(EC.presence_of_element_located((By.XPATH, "//input[@id='loginname']")))
        username_input.send_keys(username)

        password_input = driver.find_element(By.XPATH, "//input[@type='password']")
        password_input.send_keys(password)

        # Click login button
        login_button = driver.find_element(By.XPATH, "//div[contains(@class,'login-btn')]/a")
        login_button.click()

        # Wait for captcha to appear
        time.sleep(5)

        # Handle slider captcha
        try:
            bg_image = driver.find_element(By.XPATH,
                                           "//*[@id='JDJRV-wrap-loginsubmit']/div/div/div/div[1]/div[2]/div[1]/img")
            bg_base64 = bg_image.get_attribute("src")
            if not downloadImage(bg_base64, "bg_image.png"):
                raise Exception("Failed to download background image")

            slider_image = driver.find_element(By.XPATH,
                                               "//*[@id='JDJRV-wrap-loginsubmit']/div/div/div/div[1]/div[2]/div[2]/img")
            slider_base64 = slider_image.get_attribute("src")
            if not downloadImage(slider_base64, "slider_image.png"):
                raise Exception("Failed to download slider image")

            # Use ddddocr to recognize slider position
            ocr = ddddocr.DdddOcr(det=False, ocr=False, show_ad=False)
            with open('slider_image.png', 'rb') as f:
                target_bytes = f.read()
            with open('bg_image.png', 'rb') as f:
                bg_image_bytes = f.read()

            res = ocr.slide_match(target_bytes, bg_image_bytes, simple_target=True)
            print(f"OCR result: {res}")
            print(f'滑块需要滑动的距离: {res["target"][0]}')

            # Execute sliding once
            base_distance = res['target'][0]
            distance = base_distance + 1
            print(f"滑动距离: {distance}")

            # Execute smooth human-like sliding
            actions = ActionChains(driver)
            actions.click_and_hold(slider_image)
            actions.pause(random.uniform(0.3, 0.6))  # 初始等待时间

            # Execute Bezier curve generated sliding trajectory
            actions = human_like_move(actions, slider_image, distance=distance)

            # Add final random release delay
            actions.pause(random.uniform(0.2, 0.4))
            actions.release()
            actions.perform()

            print("滑块验证完成")

        except NoSuchElementException:
            print("No slider captcha found, login might be successful")
        except Exception as e:
            print(f"Error handling slider captcha: {e}")
            raise

        # Wait for login to complete
        time.sleep(20)
        # Check if login was successful
        try:
            # Look for user info or dashboard elements
            user_element = driver.find_element(By.XPATH, "//a[contains(@class,'user')]")
            print("Login successful!")
            cookies = driver.get_cookies()
            for cookie in cookies:
                cookie_dict[cookie["name"]] = cookie["value"]
            return cookie_dict
        except NoSuchElementException:
            print("Login might have failed, check manually")
            return cookie_dict

    except Exception as e:
        print(f"Login error: {e}")
        return cookie_dict


def cleanup_images():
    """Clean up downloaded images"""
    image_files = ['bg_image.png', 'slider_image.png']
    for file in image_files:
        if os.path.exists(file):
            os.remove(file)
            print(f"Cleaned up {file}")


if __name__ == '__main__':
    # 设置为False可以看到浏览器操作过程，便于调试
    headless_mode = False
    # Setup Chrome options with enhanced anti-detection
    chrome_options = webdriver.ChromeOptions()

    # 基础反检测设置
    chrome_options.add_experimental_option('useAutomationExtension', False)
    chrome_options.add_experimental_option("excludeSwitches", ['enable-automation'])
    chrome_options.add_argument('--disable-blink-features=AutomationControlled')

    # 添加更多反检测参数
    chrome_options.add_argument('--no-sandbox')
    chrome_options.add_argument('--disable-dev-shm-usage')
    chrome_options.add_argument('--disable-gpu')
    chrome_options.add_argument('--disable-web-security')
    chrome_options.add_argument('--disable-features=VizDisplayCompositor')
    chrome_options.add_argument('--disable-extensions')
    chrome_options.add_argument('--disable-plugins')
    chrome_options.add_argument('--disable-images')
    chrome_options.add_argument('--disable-javascript')
    chrome_options.add_argument('--disable-default-apps')
    chrome_options.add_argument('--disable-sync')
    chrome_options.add_argument('--disable-translate')
    chrome_options.add_argument('--disable-background-timer-throttling')
    chrome_options.add_argument('--disable-backgrounding-occluded-windows')
    chrome_options.add_argument('--disable-renderer-backgrounding')
    chrome_options.add_argument('--disable-field-trial-config')
    chrome_options.add_argument('--disable-ipc-flooding-protection')

    # 设置用户代理
    chrome_options.add_argument(
        '--user-agent=Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36')

    # 设置窗口大小
    chrome_options.add_argument('--window-size=1920,1080')

    if headless_mode:
        chrome_options.add_argument('--headless')

    # Find and setup ChromeDriver
    chromedriver_path = find_chromedriver()
    service = Service(chromedriver_path)
    driver = webdriver.Chrome(service=service, options=chrome_options)

    # Execute multiple anti-detection scripts
    driver.execute_script("Object.defineProperty(navigator, 'webdriver', {get: () => undefined})")
    driver.execute_script("Object.defineProperty(navigator, 'plugins', {get: () => [1, 2, 3, 4, 5]})")
    driver.execute_script("Object.defineProperty(navigator, 'languages', {get: () => ['zh-CN', 'zh', 'en']})")
    driver.execute_script("Object.defineProperty(navigator, 'platform', {get: () => 'MacIntel'})")
    driver.execute_script("Object.defineProperty(navigator, 'hardwareConcurrency', {get: () => 8})")
    driver.execute_script("Object.defineProperty(navigator, 'deviceMemory', {get: () => 8})")
    driver.execute_script("Object.defineProperty(navigator, 'maxTouchPoints', {get: () => 0})")

    # 移除Chrome特有的属性
    driver.execute_script("delete window.cdc_adoQpoasnfa76pfcZLmcfl_Array;")
    driver.execute_script("delete window.cdc_adoQpoasnfa76pfcZLmcfl_Promise;")
    driver.execute_script("delete window.cdc_adoQpoasnfa76pfcZLmcfl_Symbol;")

    # 先访问京东首页，建立正常的会话
    driver.get("https://www.jd.com")
    with open('cookies.json', 'r') as f:
        cookies = json.loads(f.read())
        for name, value in cookies.items():
            print(name, value)
            driver.add_cookie({'domain': '.jd.com','name': name, 'value': value})

    time.sleep(1)
    print("添加cookies后: ")
    print(driver.get_cookies())
    time.sleep(150)

    if '请登录' in driver.page_source :
        # 重新登录
        cookies = login(driver, "19113189219", "gaozhe741234", headless=headless_mode)
        if len(cookies) == 0:
            print('登录失败')
            driver.close()
        else:
            # 将cookies保存到本地，只保存有效的cookies
            valid_cookies = {}
            for name, value in cookies.items():
                if name and value and name != 'cn':  # 排除无效的cookie
                    valid_cookies[name] = value

            cookies_json = json.dumps(valid_cookies, ensure_ascii=False, indent=2)
            with open('cookies.json', 'w', encoding='utf-8') as f:
                f.write(cookies_json)
            print(f'cookies保存成功，共保存{len(valid_cookies)}个有效cookie')

    time.sleep(5)

    # 访问商品页并抓取所有相关HTTP请求
    item_url = "https://item.jd.com/100195510718.html"
    driver.get(item_url)
    time.sleep(5)

    print("\n==== 商品页相关HTTP请求报文 ====")
    for request in driver.requests:
        if request.response and (item_url in request.url or 'item.jd.com' in request.url):
            print(f"请求URL: {request.url}")
            print(f"状态码: {request.response.status_code}")
            print(f"请求头: {dict(request.headers)}")
            print(f"响应头: {dict(request.response.headers)}")
            print(f"重定向到: {request.response.headers.get('Location')}")
            print('-' * 60)
        elif request.response and request.response.status_code in [302, 403]:
            print(f"异常请求URL: {request.url}")
            print(f"状态码: {request.response.status_code}")
            print(f"响应头: {dict(request.response.headers)}")
            print(f"重定向到: {request.response.headers.get('Location')}")
            print('-' * 60)

    print("\n==== 所有cookie ====")
    print(driver.get_cookies())
    time.sleep(100)