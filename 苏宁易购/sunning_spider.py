import time

import selenium
from selenium import webdriver
import selenium.common.exceptions
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from selenium.webdriver.support.wait import WebDriverWait
from seleniumwire import webdriver
from selenium.webdriver.support import expected_conditions as EC

from crawler.苏宁易购.models import PhoneItem


class sunning_spider:

    def __init__(self):
        options = webdriver.ChromeOptions()
        options.add_argument('--disable-blink-features=AutomationControlled')
        options.add_experimental_option("excludeSwitches", ["enable-automation"])
        options.add_experimental_option('useAutomationExtension', False)
        service = Service('/Users/gaozhe/Desktop/chromedriver-mac-arm64/chromedriver')
        self.driver = webdriver.Chrome(options=options, service=service)
        self.data = []
        self.is_last_page = False
        self.page = 1

    # 自动滚动到接近底部直到所有数据加载完成，避免下一页按钮被遮挡
    def scroll_to_almost_bottom_until_loaded(self, wait_time=1.5, max_tries=20, offset=1500):
        last_height = self.driver.execute_script("return document.body.scrollHeight")
        tries = 0
        while True:
            self.driver.execute_script(f"window.scrollTo(0, document.body.scrollHeight - {offset});")
            time.sleep(wait_time)
            new_height = self.driver.execute_script("return document.body.scrollHeight")
            if new_height == last_height:
                tries += 1
                if tries >= 2:  # 连续两次高度不变，认为加载完毕
                    break
            else:
                tries = 0
                last_height = new_height

    # 打开页面
    def open_website(self):
        self.driver.get('https://list.suning.com/0-20006-0.html')
        self.driver.maximize_window()
        # 覆盖navigator.webdriver属性
        self.driver.execute_script("Object.defineProperty(navigator, 'webdriver', {get: () => undefined})")
        self.driver.implicitly_wait(15)  # 增加隐式等待时间
        self.wait = WebDriverWait(self.driver, 15)
        self.scroll_to_almost_bottom_until_loaded()  # 自动滚动到接近底部并等待全部数据加载
        time.sleep(3)

    # 解析页面数据
    def parse_page(self):
        item_titles = self.driver.find_elements(By.XPATH, "//div[@class='title-selling-point']")
        item_prices = self.driver.find_elements(By.XPATH, "//span[@class='def-price']")
        item_infos = self.driver.find_elements(By.XPATH, "//div[@class='info-config']/em")
        for t, p, i in zip(item_titles, item_prices, item_infos):
            self.data.append({
                'title': t.text,
                'price': p.text,
                'info': i.text
            })

    # 翻页
    def turn_page(self):
        try:
            next_button = self.wait.until(EC.element_to_be_clickable((By.XPATH, '//a[@id="nextPage"]')))
            next_button.click()
            self.page += 1
            time.sleep(5)
            self.scroll_to_almost_bottom_until_loaded()  # 自动滚动到接近底部并等待全部数据加载
            time.sleep(5)
        except selenium.common.exceptions.NoSuchElementException:
            print("turn_page: this is last page")
            self.is_last_page = True
        except selenium.common.exceptions.TimeoutException:
            print('turn_page: TimeoutException')
            self.turn_page()
        except selenium.common.exceptions.StaleElementReferenceException:
            print('turn_page: StaleElementReferenceException')
            self.driver.refresh()

    # 保存数据
    def save_data(self):
        for item in self.data:
            phone_item = PhoneItem()
            phone_item.title = item['title'].strip()
            phone_item.price = item['price'].strip()
            phone_item.info = item['info'].strip()
            phone_item.save(force_insert=True)

    # 爬虫主程序
    def crawl(self):
        self.open_website()
        while not self.is_last_page:
            print(f"正在爬取第{self.page}页数据")
            self.parse_page()
            self.save_data()
            self.turn_page()
        print("爬取完成")


if __name__ == '__main__':
    sunning_spider().crawl()
