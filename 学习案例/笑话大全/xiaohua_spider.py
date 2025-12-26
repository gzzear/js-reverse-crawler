import asyncio
import json
from urllib.parse import quote

import aiohttp
import requests
from scrapy import Selector


async def crawl(page):
    print(f"正在爬取第{page}页数据")
    url = f"https://xiaohua.zol.com.cn/lengxiaohua/{page}.html"
    headers = {
        "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36"
    }
    async with aiohttp.ClientSession(headers=headers) as session:
        async with session.get(url) as response:
            text = await response.text()
            sel = Selector(text=text)
            # 获取好评、差评数量
            xhs_ids = sel.xpath("//div[@class='article-commentbar articleCommentbar clearfix']/@data-id").extract()
            good_bad_url = "https://xiaohua.zol.com.cn/index.php"
            params = {
                "c": "Ajax_Xiaohua",
                "a": "XhVoteGoodBad",
                "xhId": quote(",".join(xhs_ids), safe="")
            }
            good_bad_response = requests.get(good_bad_url, headers=headers, params=params).text
            xhs_good_bad_dict = json.loads(good_bad_response)
            items = sel.xpath("//ul[@class='article-list']/li")
            for item in items:
                title = "".join(item.xpath(".//span[@class='article-title']/a/text()").extract())
                xhs_id = "".join(
                    item.xpath(".//div[@class='article-commentbar articleCommentbar clearfix']/@data-id").extract())
                good_bad_sums = xhs_good_bad_dict[xhs_id]
                good_sum = good_bad_sums[0]
                bad_sum = good_bad_sums[1]
                print(title, good_sum, bad_sum)

if __name__ == '__main__':
    tasks = []
    for i in range(5):
        tasks.append(crawl(i + 1))
    asyncio.get_event_loop().run_until_complete(asyncio.wait(tasks))