import csv
import json
import re

import requests
from openpyxl import Workbook
from scrapy import Selector


class doubanSpider():
    # 打开或创建保存数据的文件
    def open_file(self):
        while True:
            self.fr = input('请输入文件保存格式(txt、json、csv、xlsx):').strip().lower()
            if self.fr in ['txt', 'json', 'csv', 'xlsx']:
                break
            else:
                print('输入文件格式不存在,请重新输入')
        if self.fr == 'txt':
            self.fw = open('douban.txt', 'w', encoding='utf-8')
        if self.fr == 'json':
            self.fw = open('douban.json', 'w', encoding='utf-8')
        if self.fr == 'csv':
            self.fw = open('douban.csv', 'w', encoding='utf-8-sig', newline='')  # 使用 utf-8-sig 编码
            writer = csv.DictWriter(self.fw,
                                    fieldnames=['title', 'img_url', 'director', 'starring', 'years', 'location',
                                                'rating', 'reviews', 'genre'])
            writer.writeheader()

    # 保存数据
    def write_to_file(self):
        if self.fr == 'txt':
            for item in self.data:
                self.fw.write('----------------------------------------\n')
                self.fw.write('标题:' + str(item['title']) + '\n')
                self.fw.write('图片链接:' + str(item['img_url']) + '\n')
                self.fw.write('类型:' + str(item['genre']) + '\n')
                self.fw.write('导演:' + str(item['director']) + '\n')
                self.fw.write('主演:' + str(item['actors']) + '\n')
                self.fw.write('年份:' + str(item['year']) + '\n')
                self.fw.write('地区:' + str(item['location']) + '\n')
                self.fw.write('评分:' + str(item['rating']) + '\n')
                self.fw.write('评论数:' + str(item['reviews']) + '\n')
        elif self.fr == 'json':
            for item in self.data:
                self.fw.write('----------------------------------------\n')
                self.fw.write(json.dumps(item, ensure_ascii=False, indent=4) + '\n')
                self.fw.write('\n')
        elif self.fr == 'csv':
            writer = csv.DictWriter(self.fw,
                                    fieldnames=['title', 'img_url', 'director', 'actors', 'year', 'location', 'rating',
                                                'reviews', 'genre'])
            writer.writerows(self.data)
        elif self.fr == 'xlsx':
            workbook = Workbook()
            sheet = workbook.active
            sheet.append(['标题', '图片链接', '类型', '导演', '主演', '年份', '地区', '评分', '评论数'])
            for data in self.data:
                sheet.append(list(data.values()))
            workbook.save('豆瓣.xlsx')

    # 初始化变量
    def init_variables(self):
        self.start = 25
        self.is_last_page = False
        self.data = []

    # 爬虫主程序
    def crawl(self, retry=3):
        self.init_variables()
        self.open_file()
        print("开始爬取数据")
        try:
            while not self.is_last_page:
                headers = {
                    "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
                    "accept-language": "zh-CN,zh;q=0.9",
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
                url = "https://movie.douban.com/top250"
                params = {
                    "start": self.start,
                    "filter": ""
                }
                response = requests.get(url, headers=headers, params=params)
                if '<div class="item">' not in response.text:
                    print("爬取完成")
                    self.is_last_page = True
                if response.status_code != 200:
                    print("反爬了")
                    print(response.text)
                    pass
                self.parse_page(response)
                self.write_to_file()
                self.start += 25
        except Exception as e:
            print(f"爬取数据报错:{e}")
            if retry > 0:
                print("开始重试")
                self.crawl(retry - 1)
        pass

    def parse_page(self, response):
        sel = Selector(text=response.text)
        movies_items = sel.xpath("//li/div[@class='item']")
        for movies_item in movies_items:
            titles = movies_item.xpath(".//div[@class='hd']//span[@class='title']/text()").extract()
            title = " ".join(titles).strip()  # 电影标题
            img_url = movies_item.xpath(".//div[@class='pic']/a/img/@src").get()  # 图片url
            infos = movies_item.xpath(".//div[@class='info']//div[@class='bd']/p/text()").extract()
            info = " ".join(infos).strip()
            pattern = re.compile(
                r'导演:\s*(?P<director>[^:]+?)\s{2,}主演:\s*(?P<actors>.+?)\s*'
                r'(?P<year>\d{4})\s*/\s*'
                r'(?P<regions>[^/]+?)\s*/\s*'
                r'(?P<genres>.+)',
                re.DOTALL  # 允许点号匹配换行符
            )
            match = re.search(pattern, info)
            director = ''
            actors = ''
            year = ''
            region_list = ''
            genre_list = ''
            if match:
                director = match.group(1).strip()
                actors = match.group(2).strip()
                year = match.group(3)
                regions = match.group(4).strip()
                genres = match.group(5).strip()

                # 进一步分割区域和类型
                region_list = re.split(r'\s+', regions)
                region_list = ', '.join(region_list)
                genre_list = re.split(r'\s+', genres)
                genre_list = ', '.join(genre_list)
            rating = movies_item.xpath(".//span[@class='rating_num']/text()").extract()
            rating = " ".join(rating).strip()  # 评分
            reviews = movies_item.xpath(".//div[@class='bd']/div/span[last()]/text()").extract()
            reviews = " ".join(reviews).strip()  # 评论数

            self.data.append({
                "title": title,
                "img_url": img_url,
                "director": director,
                "actors": actors,
                "year": year,
                "location": region_list,
                "rating": rating,
                "reviews": reviews,
                "genre": genre_list
            })


if __name__ == '__main__':
    doubanSpider().crawl()
