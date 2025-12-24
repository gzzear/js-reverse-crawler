from datetime import datetime
from urllib.parse import urlparse, parse_qs

import requests
from scrapy import Selector
import re
import json

from crawler.csdn论坛.models import Topic
from crawler.csdn论坛.signer import Signer


# 获取目录数据
def get_category_urls():
    urls = []
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
    }
    resp = requests.get('https://bbs.csdn.net/forums/f17cd0f691784535a2f181355fd6d6bf/', headers=headers)
    sel = Selector(text=resp.text)
    nodes = sel.xpath("//div[@id='left-floor-user-content_559']//*/div[@class='custom-tree-node' and @data-v-76fb4aa2]")
    for node in nodes:
        context = node.xpath(".//text()").getall()
        context = [c.strip() for c in context if c.strip()]
        forum_name = context[0]
        forum_nums = context[-1]
        if forum_name == '其他社区':
            for forum_num in range(int(forum_nums)):
                sign = Signer()
                code, json = sign.get_html(
                    f"https://bizapi.csdn.net/community-cloud/v1/homepage/community/by/tag?deviceType=PC&tagId={forum_num + 1}")
                if code == 200:
                    datas = json['data']
                    for data in datas:
                        url = data['url']
                        urls.append(url)
                    break
                else:
                    raise Exception("目录数据抓取失败")
    return urls

def get_forums_items_url(url):
    # 获取社区频道帖子
    # sign = Signer()
    # forums_item_url = f'https://bizapi.csdn.net/community-cloud/v1/community/listV2?communityId={get_community_id(url, forum_num + 1)}&noMore=false&page=3&pageSize=20&tabId={get_tab_id(url, forum_num + 1)}&type=1&viewType=0'
    # print(forums_item_url)
    # code, json = sign.get_html(forums_item_url)
    # print(f"code:{code} - json:{json}")
    pass

# 获取tab_id
def get_tab_id(url, category):
    """
    获取页面中的 tab ID

    参数:
        url: 基础URL
        category: 分类参数

    返回:
        tab ID (整数), 如果未找到返回 None
    """
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
    }

    try:
        # 发起请求
        resp = requests.get(f'{url}?category={category}', headers=headers)
        resp.raise_for_status()  # 检查HTTP错误

        sel = Selector(text=resp.text)

        # 定位带ID的div元素
        node = sel.xpath("//div[@class='__view']/*/div[contains(@class, 'user-tabs')]")

        if not node:
            print("未找到包含 'user-tabs' 的div元素")
            return None

        # 获取class属性
        class_str = " ".join(node.xpath('./@class').getall())

        print(f"获取到的类名: {class_str}")  # 调试输出

        # 使用正则提取数字
        tab_match = re.search(r'user-tabs-?(\d+)', class_str)

        if tab_match:
            tab_id = int(tab_match.group(1))
            print(f"提取到的Tab ID: {tab_id}")
            return tab_id

        print(f"在类名中未找到ID: {class_str}")
        return None

    except requests.exceptions.RequestException as e:
        print(f"请求发生错误: {e}")
        return None
    except Exception as e:
        print(f"处理时发生错误: {e}")
        return None




# 获取communityId
def get_community_id(url, category):
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
    }
    resp = requests.get(f'{url}?category={category}', headers=headers)
    sel = Selector(text=resp.text)
    node = sel.xpath("//meta[@name='report']")
    content = node.xpath('.//@content')
    contentJson = content.get()
    parsed = json.loads(contentJson)
    extra_data = json.loads(parsed['extra'])
    id_value = extra_data['id']
    return id_value

def extract_topics(datas):
    for value in datas:
        content = value['content']
        topic = Topic()
        topic.id = content['contentId']
        topic.title = content['topicTitle']
        topic.content = content['description']
        topic.create_time = datetime.strptime(content['createTime'], '%Y-%m-%d %H:%M:%S')
        topic.answer_nums = content['commentCount']
        topic.click_nums = content['viewCount']
        topic.praised_nums = content['diggNum']
        topic.author = content['username']
        existed_topic = Topic.select().where(Topic.id == topic.id)
        if existed_topic:
            topic.save()
        else:
            topic.save(force_insert=True)
        print()
    pass

def parse_category_list(url):
    next_page = 1  #下一页页码
    tabid = 0
    total_pages = 1 #总页码
    category_id = parse_qs(urlparse(url).query)['category']
    page_size = 20
    category_rsp = requests.get(url)
    if category_rsp.status_code != 200:
        raise Exception("反爬了")
    data = re.search(r'window.__INITIAL_STATE__= (.*);</script>', category_rsp.text)
    if data:
        data = data.group(1)
        data = json.loads(data)
        totals = data['pageData']['data']['baseInfo']['page']['total']
        tabid = data['pageData']['data']['baseInfo']['defaultActiveTab']
        total_pages = totals / page_size
        extract_topics(data['pageData']['data']['baseInfo']['dataList'])
        if totals % page_size > 0:
            total_pages += 1
        while next_page <= total_pages:
            sign = Signer()
            resp = sign.get_html(f"https://bizapi.csdn.net/community-cloud/v1/community/listV2?page={next_page}&pageSize={page_size}&tabId={tabid}&noMore=false&communityId={get_community_id(url, category_id)}&type=1&viewType=0")
            print(resp)

    else:
        raise Exception("反爬了")
    return data


if __name__ == '__main__':
    tab_id = parse_category_list('https://bbs.csdn.net/forums/moyu?category=2')
    print(tab_id)
