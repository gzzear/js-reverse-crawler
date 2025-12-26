import time
import random
from hashlib import md5

import requests
import pyautogui
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By

# 设置pyautogui的安全设置，防止鼠标移动到屏幕角落
pyautogui.FAILSAFE = True
pyautogui.PAUSE = 0.1  # 减少基础暂停时间，让操作更自然


class Chaojiying_Client(object):

    def __init__(self, username, password, soft_id):
        self.username = username
        password = password.encode('utf8')
        self.password = md5(password).hexdigest()
        self.soft_id = soft_id
        self.base_params = {
            'user': self.username,
            'pass2': self.password,
            'softid': self.soft_id,
        }
        self.headers = {
            'Connection': 'Keep-Alive',
            'User-Agent': 'Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 5.1; Trident/4.0)',
        }

    def PostPic(self, im, codetype):
        """
        im: 图片字节
        codetype: 题目类型 参考 http://www.chaojiying.com/price.html
        """
        params = {
            'codetype': codetype,
        }
        params.update(self.base_params)
        files = {'userfile': ('ccc.jpg', im)}
        r = requests.post('http://upload.chaojiying.net/Upload/Processing.php', data=params, files=files,
                          headers=self.headers)
        return r.json()

    def PostPic_base64(self, base64_str, codetype):
        """
        im: 图片字节
        codetype: 题目类型 参考 http://www.chaojiying.com/price.html
        """
        params = {
            'codetype': codetype,
            'file_base64': base64_str
        }
        params.update(self.base_params)
        r = requests.post('http://upload.chaojiying.net/Upload/Processing.php', data=params, headers=self.headers)
        return r.json()

    def ReportError(self, im_id):
        """
        im_id:报错题目的图片ID
        """
        params = {
            'id': im_id,
        }
        params.update(self.base_params)
        r = requests.post('http://upload.chaojiying.net/Upload/ReportError.php', data=params, headers=self.headers)
        return r.json()


def crop_image(driver, image_file_name):
    # 截图验证码图片
    # 定位某个元素在浏览器中的位置
    time.sleep(2)
    img = driver.find_element(By.XPATH, "//*[@class='geetest_holder geetest_silver']")
    img.screenshot(image_file_name)
    return img


def login(driver, username, password):
    url = 'https://passport.bilibili.com/login'
    driver.get(url)
    driver.maximize_window()
    
    # 短暂延迟
    time.sleep(1)
    
    # 找到用户名输入框
    username_input = driver.find_element(By.XPATH, '//*[@id="app-main"]/div/div[2]/div[3]/div[2]/div[1]/div[1]/input')
    username_input.click()
    time.sleep(0.3)
    simulate_human_typing(username_input, username)
    
    # 短暂延迟
    time.sleep(0.5)
    
    # 找到密码输入框
    password_input = driver.find_element(By.XPATH, '//*[@id="app-main"]/div/div[2]/div[3]/div[2]/div[1]/div[3]/input')
    password_input.click()
    time.sleep(0.3)
    simulate_human_typing(password_input, password)
    
    # 短暂延迟
    time.sleep(0.5)
    
    # 点击登录按钮
    login_button = driver.find_element(By.XPATH, "//div[@class='btn_wp']/div[@class='btn_primary ']")
    login_button.click()
    time.sleep(3)


def human_like_click(x, y, duration=0.5):
    """
    模拟人类点击行为
    """
    # 获取当前鼠标位置
    current_x, current_y = pyautogui.position()
    
    # 生成贝塞尔曲线路径点，模拟人类鼠标移动
    points = pyautogui.easeOutQuad(pyautogui.easeInQuad(
        [(current_x, current_y), (x, y)], 
        duration=duration
    ))
    
    # 移动到目标位置
    pyautogui.moveTo(x, y, duration=duration, tween=pyautogui.easeOutQuad)
    
    # 点击
    pyautogui.click()
    
    # 点击后短暂停顿
    time.sleep(0.1)

def advanced_human_click(x, y, click_type="normal"):
    """
    高级人类点击模拟
    """
    current_x, current_y = pyautogui.position()
    
    # 随机选择移动时间
    move_duration = random.uniform(0.2, 0.5)
    
    # 添加一些随机偏移，模拟手抖
    offset_x = random.randint(-2, 2)
    offset_y = random.randint(-2, 2)
    target_x = x + offset_x
    target_y = y + offset_y
    
    # 移动到目标位置，使用缓动函数
    pyautogui.moveTo(target_x, target_y, duration=move_duration, tween=pyautogui.easeOutQuad)
    
    # 根据点击类型选择不同的点击方式
    if click_type == "normal":
        pyautogui.click()
    elif click_type == "double":
        pyautogui.doubleClick()
    elif click_type == "right":
        pyautogui.rightClick()
    
    # 点击后短暂停顿
    time.sleep(0.1)

def simulate_human_typing(element, text):
    """
    模拟人类输入行为
    """
    for char in text:
        element.send_keys(char)
        time.sleep(random.uniform(0.02, 0.08))  # 减少打字延迟


if __name__ == '__main__':
    options = Options()
    options.add_argument('--disable-blink-features=AutomationControlled')  # 关闭chrome自动化脚本，更像真人操作
    options.add_argument('--disable-web-security')  # 禁用web安全策略
    options.add_argument('--disable-features=VizDisplayCompositor')  # 禁用某些特性
    options.add_argument('--no-sandbox')  # 禁用沙盒
    options.add_argument('--disable-dev-shm-usage')  # 禁用/dev/shm使用
    options.add_argument('--disable-gpu')  # 禁用GPU加速
    options.add_argument('--disable-extensions')  # 禁用扩展
    options.add_argument('--disable-plugins')  # 禁用插件
    options.add_argument('--disable-images')  # 禁用图片加载，提高速度
    options.add_argument('--disable-javascript')  # 禁用JavaScript（如果需要的话）
    options.add_experimental_option("excludeSwitches", ["enable-automation"])  # 排除自动化开关
    options.add_experimental_option('useAutomationExtension', False)  # 禁用自动化扩展
    options.add_argument(
        '--user-agent=Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36')
    
    service = Service(executable_path='/Users/gaozhe/Desktop/chromedriver-mac-arm64/chromedriver')
    driver = webdriver.Chrome(service=service, options=options)
    
    # 执行 `stealth.min.js` 文件进行隐藏浏览器指纹
    try:
        with open('../../stealth.min.js') as f:
            js = f.read()
        driver.execute_cdp_cmd("Page.addScriptToEvaluateOnNewDocument", {
            "source": js
        })
    except FileNotFoundError:
        print("stealth.min.js文件未找到，跳过浏览器指纹隐藏")
    
    # 添加更多反检测脚本
    stealth_js = """
    // 隐藏webdriver属性
    Object.defineProperty(navigator, 'webdriver', {
        get: () => undefined,
    });
    
    // 修改navigator属性
    const newProto = navigator.__proto__;
    delete newProto.webdriver;
    navigator.__proto__ = newProto;
    
    // 修改plugins
    Object.defineProperty(navigator, 'plugins', {
        get: () => [1, 2, 3, 4, 5],
    });
    
    // 修改languages
    Object.defineProperty(navigator, 'languages', {
        get: () => ['zh-CN', 'zh', 'en'],
    });
    """
    
    driver.execute_cdp_cmd("Page.addScriptToEvaluateOnNewDocument", {
        "source": stealth_js
    })
    
    # 随机延迟启动
    time.sleep(1)
    
    login(driver, '19113189219', 'gaozhe741234')
    
    # 等待验证码加载
    time.sleep(2)
    
    img_element = crop_image(driver, 'captcha.png')
    img_location = img_element.location
    ele_x = img_location["x"]
    ele_y = img_location["y"] + 114  # 这里114是因为浏览器顶部的区域并没有被selenium识别
    
    # 短暂延迟
    time.sleep(1)

    # 通过超级鹰获取各文字的位置
    # 超级鹰参考 http://www.chaojiying.com/
    # 多次尝试识别，最大尝试3次
    # 注意一下，超级鹰接口验证不一定每次都是正确的，多试几次就可以了
    chaojiying = Chaojiying_Client('gaozhe373795878', 'gaozhe741234', '971607')
    for i in range(3):
        print("第{}次尝试识别".format(i))
        im = open('captcha.png', 'rb').read()  # 本地图片文件路径 来替换 a.jpg 有时WIN系统须要//
        print("验证码坐标：")
        json_data = chaojiying.PostPic(im, 9004)
        location_list = []
        print(json_data)
        if json_data["err_no"] == 0:
            print("识别成功！")
            for location_info in json_data["pic_str"].split("|"):
                location_list.append((location_info.split(",")[0], location_info.split(",")[1]))
            print(location_list)
            
            for i, (x, y) in enumerate(location_list):
                # 短暂延迟
                time.sleep(0.3)
                
                # 随机选择点击类型
                click_type = random.choice(["normal", "normal", "normal"])  # 大部分是普通点击
                
                # 使用高级人类点击模拟
                advanced_human_click(ele_x + int(x), ele_y + int(y), click_type)
            
            # 点击确认按钮前短暂延迟
            time.sleep(0.5)
            
            # 使用Selenium点击确认按钮，而不是pyautogui
            try:
                confirm_button = driver.find_element(By.XPATH, "//div[@class='geetest_commit_tip']")
                confirm_button.click()
            except:
                # 如果Selenium点击失败，使用pyautogui
                print("使用pyautogui点击确认按钮")
                # 这里需要计算确认按钮的坐标
                # 暂时使用固定坐标，实际使用时需要动态计算
                pyautogui.click()
            
            time.sleep(3)
            break
        else:
            print("识别失败，继续尝试！")
            time.sleep(1)