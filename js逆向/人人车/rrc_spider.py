import base64
import re

from lxml import etree

import requests
from fontTools.ttLib import TTFont


class RRCSpider():
    def __init__(self):
        self.headers = {
            "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
            "accept-language": "zh-CN,zh;q=0.9",
            "cache-control": "no-cache",
            "pragma": "no-cache",
            "priority": "u=0, i",
            "referer": "https://www.renrenche.com/cd/ershouche/pn2/pve_5865_5_8_pve_112848_3_5_pve_5864_3_5/?reentries={%22reentry_id%22:%22224e64bc-7bc3-45f4-bae8-59a0609d19a2%22}",
            "sec-ch-ua": "\"Chromium\";v=\"142\", \"Google Chrome\";v=\"142\", \"Not_A Brand\";v=\"99\"",
            "sec-ch-ua-mobile": "?0",
            "sec-ch-ua-platform": "\"macOS\"",
            "sec-fetch-dest": "document",
            "sec-fetch-mode": "navigate",
            "sec-fetch-site": "same-origin",
            "sec-fetch-user": "?1",
            "upgrade-insecure-requests": "1",
            "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36"
        }
        self.cookies = {
            "id58": "ChACnGlLftcu54AMBHRHAg==",
            "fzq_h": "6dc297c6099bac0b0cca372771475177_1766555351642_f02f128122744812a63069523886638b_2882910413",
            "sessionid": "13e66fbf-3c7b-419c-a951-16a2e4149b94",
            "58ua": "rrcpc",
            "rrc_common_head_ipcity": "cd%7C%E6%88%90%E9%83%BD%7C102",
            "wmda_uuid": "963162959a25b40424e915ed5c152068",
            "wmda_new_uuid": "1",
            "xxzlclientid": "a9baa671-124e-47db-be78-1766555356582",
            "xxzlxxid": "pfmxEx2Da6ZIkg4SuNxRLEF4fJXIfYYRGdm6kp99YwMHYG/DK8EN/91mv9Pi7RM3wSKy",
            "wmda_visited_projects": "%3B1732039838209%3B1732038237441",
            "wmda_session_id_1732038237441": "1766563755053-345838d7-f1c6-48f6-a0e9-848f759bbdc0",
            "fzq_js_usdt_infodetail_car": "90723a543f6f740624d844cd8ad60f95_1766564278125_7",
            "fzq_js_usdt_infolist_car": "ab0df1d3e5f3cc3f9b2e8dcb978a9a86_1766564473864_6",
            "wmda_report_times": "6",
            "xxzlbbid": "pfmbRORZ3Vx8G+k0BG37ubJl6nMzzYsotsGYNUKZ3yHUk0kgsevGREf87hK1bThIJc62TAQXM3wTnySB41TL0hkQ8P5rDOzJWjUO1okdBikl4zOxm3vJsukp0zY3uu2V+7lfssgzmcExNzY2NTY0NDc1NjQxMTEz_1"
        }
        self.url = "https://www.renrenche.com/cd/ershouche/pve_5865_5_8_pve_112848_3_5/"
        self.response = ""
        self.cmap = {}
        self.data = []

    # 获取字体文件
    def get_font(self):
        try:
            response = requests.get(self.url, headers=self.headers, cookies=self.cookies)
            self.response = response.text
            font = re.findall(r"data:application/font-ttf;charset=utf-8;base64,(.*?)'\)", response.text)[0]
            font_content = base64.b64decode(font)
            with open("1.ttf", "wb") as f:
                f.write(font_content)
        except Exception as e:
            print('反爬了')

    # 获取字体文件映射关系
    def get_cmap(self):
        font = TTFont("1.ttf")
        # 获取cmap映射表
        cmap = font['cmap'].tables[0].ttFont.getGlyphOrder()[1:]
        # 前端混淆对应的字符解码
        s_cmap = [chr(int(code[3:], 16)) for code in cmap]
        # 由于是数字的混淆 所以按照数字自定义映射(每个案例得看不同的情况)
        self.cmap = {s_cmap[i]: i for i in range(0, len(s_cmap))}

    # 获取车辆信息
    def get_data(self):
        html = etree.HTML(self.response)
        lis = html.xpath("//div[@id='list']/ul[@class='infos infos-card h-clearfix']/li")
        for li in lis:
            item = {}
            title = li.xpath(".//h2[@class='info_title']/span[@class='info_link']/text()")[0].strip()
            years = li.xpath(".//a/div[@class='info--desc']/div[@class='info_params']/text()")[0].strip()
            kilometers = li.xpath(".//a/div[@class='info--desc']/div[@class='info_params']/text()")[1].strip()
            price = li.xpath(
                ".//div[@class='info--wrap']/a/div[@class='info--price']/b[@class='info_price fontSecret']/text()")[
                0].strip()
            new_price = ''
            for char in price:
                if char in self.cmap:
                    new_price += str(self.cmap[char])
                else:
                    new_price += char
            item['title'] = title
            item['years'] = years
            item['kilometers'] = kilometers
            item['price'] = new_price
            self.data.append(item)

    @staticmethod
    def run():
        spider = RRCSpider()
        spider.get_font()
        spider.get_cmap()
        spider.get_data()
        print(spider.data)


if __name__ == '__main__':
    RRCSpider.run()