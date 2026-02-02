import time

import ddddocr
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By

# 1. 创建链接
# 创建ChromeOptions对象，用于配置Chrome浏览器的选项
chrome_options = webdriver.ChromeOptions()
# 添加启动参数，'--disable-gpu'参数用于禁用GPU加速，适用于部分平台上的兼容性问题
chrome_options.add_argument('--disable-gpu')

# 2. 添加请求头伪装浏览器
chrome_options.add_argument(
    'user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.0.0 Safari/537.36')
drive_path = '/Users/gaozhe/Desktop/chromedriver-mac-arm64/chromedriver'
service = Service(drive_path)
driver = webdriver.Chrome(service=service,options=chrome_options)

# 3. 执行 `stealth.min.js` 文件进行隐藏浏览器指纹
with open('../../stealth.min.js') as f:
    js = f.read()
driver.execute_cdp_cmd("Page.addScriptToEvaluateOnNewDocument", {
    "source": js
})

# 4. 最大化浏览器窗口
driver.maximize_window()

# 5. 发送请求，打开网页
driver.get('https://captcha7.scrape.center/')
time.sleep(1)
driver.find_element(By.XPATH, '//*[@id="app"]/div[2]/div/div/div/div/div/form/div[1]/div/div/input').send_keys('19113189219')
driver.find_element(By.XPATH, '//*[@id="app"]/div[2]/div/div/div/div/div/form/div[2]/div/div/input').send_keys('gaozhe741234')
time.sleep(3)
captcha_elem = driver.find_element(By.XPATH, '//*[@id="captcha"]')
captcha_elem.screenshot('captcha.png')
# 实例化 DdddOcr
ocr = ddddocr.DdddOcr(show_ad=False)

# 读取图片文件
with open('captcha.png', 'rb') as f:
    img_bytes = f.read()

# 识别验证码
res = ocr.classification(img_bytes)
driver.find_element(By.XPATH, '//*[@id="app"]/div[2]/div/div/div/div/div/form/div[3]/div/div/div[1]/div/input').send_keys(res)
driver.find_element(By.XPATH, '//*[@id="app"]/div[2]/div/div/div/div/div/form/div[4]/div/button').click()


time.sleep(10)