import re
from DrissionPage import ChromiumPage
from lxml import etree


def parse_tax_html(html_content):
    """解析表格数据"""
    tree = etree.HTML(html_content)
    rows = tree.xpath('//tr[./td[@class="blue14"]]')
    parsed_data = []

    for row in rows:
        tds = row.xpath('./td')
        if len(tds) < 5: continue
        item = {
            "税务机关": tds[0].xpath('string(.)').strip(),
            "主体名称": tds[1].xpath('string(.)').strip(),
            "识别号": tds[2].xpath('string(.)').strip(),
            "详情ID": re.search(r"xx\('(\d+)'\)", tds[4].xpath('./input/@onclick')[0]).group(1) if tds[4].xpath(
                './input/@onclick') else ""
        }
        parsed_data.append(item)
    return parsed_data


def get_total_pages(html_content):
    """
    从HTML中提取总页数
    HTML片段: 共1537项查询结果 154 页 1/154<input ...
    """
    tree = etree.HTML(html_content)
    # 定位到底部包含页码信息的文本
    # 策略：找包含 "共" 和 "页" 字样的文本
    text_content = tree.xpath('string(//td[contains(text(), "共") and contains(text(), "页")])')

    # 使用正则提取 "X 页" 中的数字
    # 匹配模式：共...结果(数字)页
    match = re.search(r"共\d+项.*?(\d+)\s*页", text_content)
    if match:
        return int(match.group(1))
    return 1  # 如果没找到，默认只有1页


def main():
    dp = ChromiumPage()
    # 开启监听
    dp.listen.start("zdsswfaj/wwquery", method='POST')

    dp.get("http://beijing.chinatax.gov.cn/bjsat/office/jsp/zdsswfaj/wwquery.jsp")

    # --- 第一次查询 ---
    dp.ele("#zcdz").input("东城")
    dp.ele("text:查 询").click()

    # 等待第一页响应
    res = dp.listen.wait(timeout=10)

    if not res:
        print("第一页抓取失败")
        return

    # 解析第一页
    first_page_html = res.response.body
    data = parse_tax_html(first_page_html)
    total_pages = get_total_pages(first_page_html)

    print(f"--- 第 1 页抓取完成，数据量: {len(data)} ---")
    print(f"检测到总页数: {total_pages}")

    # --- 开始循环翻页 (从第2页开始) ---
    # range(2, total_pages + 1) 意味着包含最后一页
    for page_num in range(2, total_pages + 1):
        print(f"正在翻页: 第 {page_num} / {total_pages} 页...")

        try:
            # 1. 点击下一页
            # 这里的 "下一页" 需要根据页面实际显示的文本或者 title 来定
            # 你的HTML里是: <a ...>下一页</a>
            next_btn = dp.ele("text:下一页")

            # 检查按钮是否存在（防止也就是最后一页点完了按钮消失的情况）
            if next_btn:
                next_btn.click()

                # 2. 核心：点击后，立刻等待新的数据包
                res = dp.listen.wait(timeout=10)

                if res:
                    # 3. 解析新的一页
                    new_data = parse_tax_html(res.response.body)
                    print(new_data)

                else:
                    print(f"第 {page_num} 页等待响应超时")
            else:
                print("未找到下一页按钮，停止翻页")
                break

        except Exception as e:
            print(f"翻页过程中发生错误: {e}")
            break

    print("抓取结束")


if __name__ == "__main__":
    main()