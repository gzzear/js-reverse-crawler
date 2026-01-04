import requests
import execjs
import json
import os


def get_headers(page_path="/gongying/6630768/"):
    """
    通过 execjs 调用 JS 生成惠农网请求 headers
    
    Args:
        page_path: 页面路径，如 "/gongying/6630768/"
    
    Returns:
        dict: 生成的 headers 字典
    """
    # 获取当前文件所在目录
    current_dir = os.path.dirname(os.path.abspath(__file__))
    js_file = os.path.join(current_dir, 'hnb_generate_headers.js')
    
    # 读取 JS 文件
    with open(js_file, 'r', encoding='utf-8') as f:
        js_code = f.read()
    
    # 编译 JS 代码
    ctx = execjs.compile(js_code)
    
    # 调用 JS 函数生成 headers
    js_headers = ctx.call('generateHeaders', page_path)
    
    # 构建完整的 HTTP headers
    headers = {
        "accept": "application/json, text/plain, */*",
        "accept-language": "zh-CN,zh;q=0.9",
        "cache-control": "no-cache",
        "content-type": "application/x-www-form-urlencoded",
        "origin": "https://www.cnhnb.com",
        "pragma": "no-cache",
        "priority": "u=1, i",
        "referer": "https://www.cnhnb.com/",
        "sec-ch-ua": '"Google Chrome";v="143", "Chromium";v="143", "Not A(Brand";v="24"',
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": '"macOS"',
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-site",
        "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36",
    }
    
    # 将 JS 生成的加密 headers 添加到完整 headers 中（转换为小写）
    for key, value in js_headers.items():
        headers[key.lower()] = str(value)
    
    return headers


def get_comments(supply_id, page_num=1, page_size=10, min_rating=0):
    """
    获取供应商品评论
    
    Args:
        supply_id: 供应商品 ID
        page_num: 页码
        page_size: 每页数量
        min_rating: 最低评分筛选
    
    Returns:
        dict: 评论数据
    """
    # 生成动态 headers
    page_path = f"/gongying/{supply_id}/"
    headers = get_headers(page_path)
    
    # 请求 URL
    url = "https://pcapi.cnhnb.com/hn-biz-gateway/api/biz-gateway/supply/comment/page"
    
    # 请求数据
    data = {
        "supplyId": supply_id,
        "pageNum": str(page_num),
        "pageSize": str(page_size),
        "minRating": str(min_rating)
    }
    
    try:
        response = requests.post(url, headers=headers, data=data, timeout=10)
        print(f"状态码: {response.status_code}")
        print(f"响应内容: {response.text[:500]}")  # 只打印前500字符
        
        if response.status_code == 200:
            return response.json()
        else:
            print(f"请求失败: {response.status_code}")
            return None
    except Exception as e:
        print(f"请求出错: {e}")
        return None


if __name__ == "__main__":
    print("=" * 60)
    print("惠农网评论爬虫测试")
    print("=" * 60)
    
    # 测试：获取商品 6630768 的评论
    supply_id = "7024051"
    result = get_comments(supply_id, page_num=1, page_size=10)
    
    if result:
        print("\n评论获取成功！")
        print(json.dumps(result, ensure_ascii=False, indent=2))
    else:
        print("\n评论获取失败！")
    
    print("\n" + "=" * 60)