from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.by import By
from selenium.webdriver.common.action_chains import ActionChains
import time
import requests
from fake_useragent import UserAgent as ua
import cv2
from random import randint


# 设计函数，计算滑块须移动的x轴距离
# 1 从组合图中裁剪出滑块碎片，保存至本地 'slider.png'
def crop_slider(img_path):
    # 读取组合图
    zuhe_img = cv2.imread(img_path)
    # 裁剪
    x, y, w, h = 141, 491, 119, 119  # (x,y)是要被裁剪部分的左上角坐标，w和h是从(x,y)点处开始向右、向下延伸的长度
    slider = zuhe_img[y:y + h, x:x + w]  # 直接剪切法
    # 展示被裁剪部分
    # cv2.imshow('slider', slider)
    # cv2.waitKey(0)
    # cv2.destroyAllWindows()
    # 保存至本地
    cv2.imwrite('slider.png', slider)


# 2 定位背景图中缺口的左上角位置
def locate_gap(bg_path, slider_path):  # bg_path和slider_path分别为背景图和被剪切后滑块的图片本地路径
    # 读取背景图和被剪切后的滑块图，转置为灰度图
    bg_img = cv2.imread(bg_path, cv2.COLOR_RGB2GRAY)
    slider_img = cv2.imread(slider_path, cv2.COLOR_RGB2GRAY)

    # 识别灰度图片边缘
    edges_bg = cv2.Canny(bg_img, 100, 200)
    edges_slider = cv2.Canny(slider_img, 100, 200)

    # 转化图片格式
    rgb_bg = cv2.cvtColor(edges_bg, cv2.COLOR_GRAY2RGB)
    rgb_slider = cv2.cvtColor(edges_slider, cv2.COLOR_GRAY2RGB)

    # 缺口匹配
    res = cv2.matchTemplate(rgb_bg, rgb_slider, cv2.TM_CCOEFF_NORMED)
    # cv2.TM_CCOEFF_NORMED：归一化相关匹配。返回-1至1的浮点数，1表示完全匹配；0表示没有相关性，-1是完全相反。
    min_val, max_val, min_loc, max_loc = cv2.minMaxLoc(res)
    # max_val越接近1，表示匹配越好；max_loc是匹配区域左上角的坐标
    top_left = max_loc  # 找到背景图中缺口的左上角
    return top_left


# 开始模拟登陆：
# 创建Options对象，设置启动参数
options = Options()
options.add_argument('--disable-blink-features=AutomationControlled')  # 关闭chrome自动化脚本，更像真人操作
options.add_argument(
    '--user-agent=Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36')

service = Service(executable_path='/Users/gaozhe/Desktop/chromedriver-mac-arm64/chromedriver')
driver = webdriver.Chrome(service=service, options=options)

# 1 打开豆瓣首页
driver.get('https://www.douban.com/')

# 浏览器页面最大化
driver.maximize_window()

# 切入iframe子框架
iframe = WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.TAG_NAME, 'iframe')))
driver.switch_to.frame(iframe)

# 2 用户名/密码输入阶段
# 点击‘密码登录’
login_btn = WebDriverWait(driver, 10).until(
    EC.element_to_be_clickable((By.XPATH, '/html/body/div[1]/div[1]/ul[1]/li[contains(text(), "密码登录")]')))
login_btn.click()

# 输入用户名和密码
username = WebDriverWait(driver, 10).until(EC.visibility_of_element_located((By.ID, 'username')))
username.send_keys('19113189219')

password = driver.find_element(By.XPATH, '//*[@id="password"]')
password.send_keys('Gaozhe741234')

# 点击“登录豆瓣”
submit = driver.find_element(By.XPATH, '/html/body/div[1]/div[2]/div[1]/div[5]/a[contains(text(), "登录豆瓣")]')
submit.click()

# 3 进入滑块验证阶段
# 切换到滑块验证的iframe
slider_iframe = WebDriverWait(driver, 10).until(
    EC.presence_of_element_located((By.XPATH, '//iframe[@id="tcaptcha_iframe_dy"]')))
driver.switch_to.frame(slider_iframe)

# 休眠一下
time.sleep(3)

# 定位至滑块验证的背景图和被滑动的碎片
bg_image = driver.find_element(By.XPATH, '//*[@id="slideBg" and @class="tc-bg-img unselectable"]')
# print(bg_image.get_attribute('class'))  #‘tc-bg-img unselectable’，验证元素class属性，定位成功
slider_image = driver.find_element(By.XPATH,
                                   '//*[@id="tcOperation"]/div[@class="tc-fg-item" and contains(@style, "left: 2")]')
# 每次刷新时，碎片html代码段会变化位置，单用xpath定位存在偏失，因此要加入多个属性条件

# 抓取背景图、被滑动的碎片的url
bg_url = bg_image.get_attribute('style').split('("')[1].split('")')[0]
slider_url = slider_image.get_attribute('style').split('("')[1].split('")')[0]


# 下载背景图和碎片至本地
def download_pic(url, img_name):
    with requests.get(url, headers={'User-Agent': ua().random}) as resp1:
        with open(img_name + '.png', mode='wb') as f:
            f.write(resp1.content)


download_pic(bg_url, 'background')
download_pic(slider_url, 'assembly_slider')  # 此处发现下载的滑块碎片图是包含碎片、滑动轴和滑动块的组合图，因此需要单独剪切出滑块碎片部分

# 剪切出滑块碎片，并保存至本地
crop_slider('assembly_slider.png')

# 确认背景图中缺口左上角位置
top_left = locate_gap('background.png', 'slider.png')

# 确认缺口中心位置
gap_center = (top_left[0] + 119 // 2, top_left[1] + 119 // 2)

# 将中心位置匹配至网页中位置（原图(672x390)与网页中图片(278x199)存在缩放差异）
# 新缺口坐标=原缺口坐标*新画布宽度/原画布宽度
gap_x = gap_center[0] * 278 // 672

# 定位滑块按钮
swipe = driver.find_element(By.XPATH, '//*[@id="tcOperation"]/div[@class="tc-fg-item tc-slider-normal"]')

# 获取滑块按钮初始位置的左侧点和按钮宽度
swipe_left = swipe.get_attribute('style').split('px;')[0].split(': ')[1]
swipe_width = swipe.get_attribute('style').split('px;')[2].split('th: ')[1]

# 获取滑块按钮初始位置的x轴中心点
swipe_center = float(swipe_left) + float(swipe_width) / 2

# 滑块按钮滑动距离
distance = int(gap_x - swipe_center)

# 点击并按住滑块
ActionChains(driver).click_and_hold(swipe).perform()

# 滑动滑块:模拟人类，逐步拉动且低速
accumulated_steps = 0
while True:
    per_step = randint(10, 15)
    ActionChains(driver).move_by_offset(xoffset=per_step, yoffset=0).perform()
    accumulated_steps += per_step

    if accumulated_steps > distance:
        break

# 松开滑块
ActionChains(driver).release().perform()

# 等待加载页面
time.sleep(5)
cookies = driver.get_cookies()
cookies_dict = {}
for cookie in cookies:
    cookies_dict[cookie['name']] = cookie['value']

headers = {
    "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
    "accept-language": "zh-CN,zh;q=0.9",
    "cache-control": "no-cache",
    "pragma": "no-cache",
    "priority": "u=0, i",
    "sec-ch-ua": "\"Not)A;Brand\";v=\"8\", \"Chromium\";v=\"138\", \"Google Chrome\";v=\"138\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"macOS\"",
    "sec-fetch-dest": "document",
    "sec-fetch-mode": "navigate",
    "sec-fetch-site": "none",
    "sec-fetch-user": "?1",
    "upgrade-insecure-requests": "1",
    "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36"
}

res = requests.get(url='https://www.douban.com/', headers=headers, cookies=cookies_dict)
print(res.status_code)
if 'gzzear' in res.text:
    print('登录成功')
else:
    print('登录失败')
# 退出浏览器
driver.quit()
