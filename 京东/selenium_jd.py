from selenium import webdriver
from selenium.webdriver.support.wait import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service
import selenium.common.exceptions
import json
import csv
import time


class JdSpider:

    # 二、打开或创建保存数据的文件
    def open_file(self):
        while True:
            self.fm = input('请输入文件保存格式(txt、json、csv):').strip().lower()
            print(f'输入的格式为: {self.fm}')
            if self.fm in ['txt', 'json', 'csv']:
                break
            print('输入错误，请重新输入文件保存格式(txt、json、csv):')

        if self.fm == 'txt':
            self.fd = open('Jd.txt', 'w', encoding='utf-8')
        elif self.fm == 'json':
            self.fd = open('../../../../Desktop/spider_jd/Jd.json', 'w', encoding='utf-8')
        elif self.fm == 'csv':
            self.fd = open('Jd.csv', 'w', encoding='utf-8-sig', newline='')  # 使用 utf-8-sig 编码
            writer = csv.DictWriter(self.fd, fieldnames=['link', 'price', 'name', 'shop'])
            writer.writeheader()

    # 三、打开浏览器并等待
    def open_browser(self):
        print('正在启动浏览器...')
        options = webdriver.ChromeOptions()
        options.add_argument('--disable-blink-features=AutomationControlled')
        options.add_experimental_option("excludeSwitches", ["enable-automation"])
        options.add_experimental_option('useAutomationExtension', False)
        service = Service('/Users/gaozhe/Desktop/chromedriver-mac-arm64/chromedriver')
        self.browser = webdriver.Chrome(options=options, service=service)

        # 覆盖navigator.webdriver属性
        self.browser.execute_script("Object.defineProperty(navigator, 'webdriver', {get: () => undefined})")

        self.browser.implicitly_wait(15)  # 增加隐式等待时间
        self.wait = WebDriverWait(self.browser, 15)
        print('浏览器启动成功！')

    # 四、初始化变量
    def init_variable(self):
        self.data = []
        self.isLast = False
        self.page_count = 0

    # 六、解析网页并获取关键数据
    def parse_page(self, retry=3):
        try:
            skus = self.wait.until(EC.presence_of_all_elements_located((By.XPATH, '//li[@class="gl-item"]')))
            for sku in skus:
                # 使用更通用的定位方式
                link = sku.find_element(By.CSS_SELECTOR, '.p-name a').get_attribute('href')
                price = sku.find_element(By.CSS_SELECTOR, '.p-price strong i').text
                name = sku.find_element(By.CSS_SELECTOR, '.p-name a em').text
                shop = sku.find_element(By.CSS_SELECTOR, '.p-shop span a').text
                self.data.append({
                    'link': link,
                    'price': price,
                    'name': name,
                    'shop': shop
                })
        except Exception as e:
            print(f'解析错误: {e}')
            if retry > 0:
                print(f'剩余重试次数: {retry}')
                time.sleep(2)
                self.parse_page(retry - 1)  # 减少重试次数
            else:
                print('解析失败，跳过当前页面')
                self.isLast = True  # 或执行其他恢复逻辑

    # 七、保存数据
    def write_to_file(self):
        if self.fm == 'txt':
            for item in self.data:
                self.fd.write('----------------------------------------\n')
                self.fd.write('link:' + str(item['link']) + '\n')
                self.fd.write('price:' + str(item['price']) + '\n')
                self.fd.write('name:' + str(item['name']) + '\n')
                self.fd.write('shop:' + str(item['shop']) + '\n')
        elif self.fm == 'json':
            for item in self.data:
                json.dump(item, self.fd, ensure_ascii=False)
                self.fd.write('\n')
        elif self.fm == 'csv':
            writer = csv.DictWriter(self.fd, fieldnames=['link', 'price', 'name', 'shop'])
            writer.writerows(self.data)

    # 八、实现换页
    def turn_page(self):
        try:
            next_button = self.wait.until(EC.element_to_be_clickable((By.XPATH, '//a[@class="pn-next"]')))
            next_button.click()
            time.sleep(1)
            self.browser.execute_script("window.scrollTo(0, document.body.scrollHeight)")
            time.sleep(2)
        except selenium.common.exceptions.NoSuchElementException:
            self.isLast = True
        except selenium.common.exceptions.TimeoutException:
            print('turn_page: TimeoutException')
            self.turn_page()
        except selenium.common.exceptions.StaleElementReferenceException:
            print('turn_page: StaleElementReferenceException')
            self.browser.refresh()

    # 九、关闭文件
    def close_file(self):
        self.fd.close()

    # 十、关闭驱动
    def close_browser(self):
        self.browser.quit()

    # 一、执行爬虫程序
    def crawl(self):
        self.open_file()
        self.open_browser()
        self.init_variable()
        print('开始爬取')
        self.browser.get('https://search.jd.com/Search?keyword=手机&enc=utf-8')
        time.sleep(15)

        # 确保页面完全加载
        self.wait.until(EC.presence_of_element_located((By.ID, 'J_goodsList')))

        self.browser.execute_script("window.scrollTo(0, document.body.scrollHeight)")
        time.sleep(2)

        while not self.isLast and self.page_count < 5:
            self.page_count += 1
            print(f'正在爬取第 {self.page_count} 页......')
            self.parse_page()
            self.write_to_file()
            self.data = []  # 清空数据列表，准备下一页的数据
            if self.page_count < 5:
                self.turn_page()

        self.close_file()
        self.close_browser()
        print('结束爬取')


if __name__ == '__main__':
    spider = JdSpider()
    spider.crawl()
