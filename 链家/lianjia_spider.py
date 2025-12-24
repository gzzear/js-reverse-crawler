import time

import requests
from fake_useragent import UserAgent
from scrapy import Selector

from crawler.proxies.horocn_proxy import horocn_proxy


class lianjia_spider():

    def init_variables(self):
        self.page = 1
        self.isLast = False
        self.data = []
        pass

    # 执行爬虫程序: cookies手动页面获取
    def crawl(self, cookies):
        self.init_variables()
        print('开始爬取数据')
        while not self.isLast:
            url = f"https://bj.lianjia.com/ershoufang/dongcheng/pg{self.page}/"
            headers = {
                "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
                "Accept-Language": "zh-CN,zh;q=0.9",
                "Cache-Control": "no-cache",
                "Connection": "keep-alive",
                "Pragma": "no-cache",
                "Referer": "https://clogin.lianjia.com/",
                "Sec-Fetch-Dest": "document",
                "Sec-Fetch-Mode": "navigate",
                "Sec-Fetch-Site": "same-site",
                "Sec-Fetch-User": "?1",
                "Upgrade-Insecure-Requests": "1",
                "User-Agent": UserAgent().random
            }
            response = requests.get(url, headers=headers, cookies=cookies, allow_redirects=True, proxies=horocn_proxy().get_proxies())
            print(response.url)
            print(response.status_code)
            print(response.text)
            if '<title>登录</title>' in response.text:
                print('cookies已过期,请重新登录')
                pass
            if response.status_code != 200:
                self.isLast = True
                print('反爬了或者不存在该页码')
            self.parse_page(response)
        pass

    # 解析页面
    def parse_page(self, response, retry=3):
        sel = Selector(text=response.text)
        try:
            house_items = sel.xpath("//ul[@class='sellListContent']/li")
            for house_item in house_items:
                # house_locations = house_item.xpath('.//a/text()').extract()
                # print(house_locations)

                # house_infos = house_item.xpath(".//div[@class='houseInfo']/text()").extract()
                # house_infos = [house_item.strip() for house_item in house_infos[0].split("|")]

                follow_infos = house_items.xpath(".//div[@class='followInfo']/text()").extract()
                # follow_infos = [follow_info.strip() for follow_info in follow_infos[0].split("/")]
                print(follow_infos)
        except Exception as e:
            print(f'页面解析失败: {e}')
            if retry > 0:
                print(f'剩余重试次数: {retry}')
                time.sleep(5)
                self.parse_page(response, retry=retry - 1)
        pass

if __name__ == '__main__':
    cookies = {
        "select_city": "110000",
        "lianjia_ssid": "d83ad2b8-02eb-4274-bba0-6e68c34f571a",
        "lianjia_uuid": "73cda248-d4ca-406d-9f9c-53e761427e19",
        "crosSdkDT2019DeviceId": "-590phg-38beax-pobecyukisyv5io-psj0xy6ae",
        "login_ucid": "2000000491777227",
        "lianjia_token": "2.0015519e98409b1fbf04fcb7a93dc02d8d",
        "lianjia_token_secure": "2.0015519e98409b1fbf04fcb7a93dc02d8d",
        "security_ticket": "jokNBScGwlbn0c+MhNUFeiXkeaEdZ6ffTJM2ckw2XykeMNCQ3NvSWGODnz70UNzhqDi7NHVpd4Vg+Irx/FeGX+LvRzRUZONVIx5Ott3bceTfaUySYAjrX0PYiN0fBn7pRoELVq4rPCvxjMXryOW/K20nbPeUiFq0bVsnepTLRs0=",
        "lfrc_": "885e3019-83c3-4103-8814-3b0dbadc7342",
        "Hm_lvt_46bf127ac9b856df503ec2dbf942b67e": "1753346330",
        "HMACCOUNT": "EE969F8CDBD5EB25",
        "_jzqa": "1.2264729008516375000.1753346331.1753346331.1753346331.1",
        "_jzqc": "1",
        "_jzqx": "1.1753346331.1753346331.1.jzqsr=clogin%2Elianjia%2Ecom|jzqct=/.-",
        "_jzqckmp": "1",
        "sajssdk_2015_cross_new_user": "1",
        "_qzjc": "1",
        "_ga": "GA1.2.590024505.1753346342",
        "_gid": "GA1.2.273927142.1753346342",
        "_qzja": "1.1251515975.1753346331862.1753346331862.1753346331862.1753346374347.1753346410958.0.0.0.3.1",
        "_qzjb": "1.1753346331862.3.0.0.0",
        "_qzjto": "3.1.0",
        "_jzqb": "1.3.10.1753346331.1",
        "sensorsdata2015jssdkcross": "%7B%22distinct_id%22%3A%221983b95d3bee1f-0eb777aa1d2f208-17525636-1296000-1983b95d3bf2177%22%2C%22%24device_id%22%3A%221983b95d3bee1f-0eb777aa1d2f208-17525636-1296000-1983b95d3bf2177%22%2C%22props%22%3A%7B%22%24latest_traffic_source_type%22%3A%22%E7%9B%B4%E6%8E%A5%E6%B5%81%E9%87%8F%22%2C%22%24latest_referrer%22%3A%22%22%2C%22%24latest_referrer_host%22%3A%22%22%2C%22%24latest_search_keyword%22%3A%22%E6%9C%AA%E5%8F%96%E5%88%B0%E5%80%BC_%E7%9B%B4%E6%8E%A5%E6%89%93%E5%BC%80%22%7D%7D",
        "srcid": "eyJ0Ijoie1wiZGF0YVwiOlwiNzljZGM3Yjg0MWNmNGY2MGY0MDI0NTVmYWI4ZDEzMmVjYTA0ZmZkM2RlNDdkZGQ5ZTNjNmI5OGE3OTY2NDM0MTNlMGU4YTdhZGY1OTZlNjljMzJkY2E2NmNjYjZmZDQ5ZmFmZmI1N2MwMmZhNjg2ZTAzMTM1MDI5Y2FhZjU2YzJiNTE0NTk4YzZhNmJmODE2NDI1Zjk1ODA2NTg3ZGIxNzA2MWFiOGE0M2M5YTI4ZTA5NTRhNjU0OTQxMjljYzg4YjUzODRjZTVmNGJmYmRjZDliYzU3MGI4MGY0ZTE5YTcxZTlmOTUxYWVmMTM0MWE4NmNhY2ZmYjJkMzA3YWY3OVwiLFwia2V5X2lkXCI6XCIxXCIsXCJzaWduXCI6XCI4ZWUxNWE2ZVwifSIsInIiOiJodHRwczovL2JqLmxpYW5qaWEuY29tL2Vyc2hvdWZhbmcvIiwib3MiOiJ3ZWIiLCJ2IjoiMC4xIn0=",
        "Hm_lpvt_46bf127ac9b856df503ec2dbf942b67e": "1753346411",
        "_gat": "1",
        "_gat_past": "1",
        "_gat_global": "1",
        "_gat_new_global": "1",
        "_gat_dianpu_agent": "1",
        "_ga_KJTRWRHDL1": "GS2.2.s1753346342$o1$g1$t1753346422$j60$l0$h0",
        "_ga_QJN1VP0CMS": "GS2.2.s1753346342$o1$g1$t1753346422$j60$l0$h0"
    }
    lianjia_spider().crawl(cookies)
