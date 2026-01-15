import json
import os

import execjs
import requests


class Spider:
    def __init__(self):
        self.cookies = {
            "SESSIONID": "9e5295946bf70de140473f468cb4dceb45aecd22",
            "JYGuestUID": "2007736939976851456",
            "Hm_lvt_52c42de35032567eb9d7a24a43c84bda": "1767516764",
            "HMACCOUNT": "DA5A6E10A4984465",
            "limitSearchTextFlag": "hpPOc1767516765980820278",
            "fid": "b1082c44673dfa88814a42763a6844f5",
            "JYTrustedId": "Fl5AVlcXBgQHAkcLFg9dTAoBBVRAXUdYVhUECAUBElpaRE9GAgAGAkdZSV1cTQUGCQBFW0VY",
            "Hm_lpvt_52c42de35032567eb9d7a24a43c84bda": "1767517272",
            "eid": "SeoQWRW1NwidMRH16EoQEwT72IM7Cb8N8QJCn9bl28k0No5a/YCSdLzJ97zDXHutzBfq5NtUkF3yTotGRquIPkk/4tTbWhi3W5n6LqDRCkmGekY+mbCg6d1JU2BdcXlLMou3FI88hTJl3Gh5x+BpOEOdURSPpK6mRNuWZT3QoHQ="
        }
        self.headers = {
            "accept": "application/json, text/plain, */*",
            "accept-language": "zh-CN,zh;q=0.9",
            "cache-control": "no-cache",
            "content-type": "application/json",
            "origin": "https://www.jianyu360.cn",
            "pragma": "no-cache",
            "priority": "u=1, i",
            "referer": "https://www.jianyu360.cn/jylab/supsearch/index.html",
            "sec-ch-ua": "\"Google Chrome\";v=\"143\", \"Chromium\";v=\"143\", \"Not A(Brand\";v=\"24\"",
            "sec-ch-ua-mobile": "?0",
            "sec-ch-ua-platform": "\"macOS\"",
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "same-origin",
            "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36"
        }
        self.url = "https://www.jianyu360.cn/jyapi/jybx/core/fType/searchList"

    def crawl(self, data):
        data = json.dumps(data, separators=(',', ':'))
        response = requests.post(self.url, headers=self.headers, cookies=self.cookies, data=data)
        res_json = response.json()

        # 检查是否需要验证码
        if res_json.get('antiVerify') == -1:
            print("需要通过反爬虫验证！")
            print(f"验证码文本: {res_json.get('textVerify')}")
            print("请手动处理验证码或更新 cookies")
            return

        cipher_text = res_json.get('data')  # AES加密的密文
        secret_key = res_json.get('secretKey')  # RSA加密的AES密钥

        if not cipher_text or not secret_key:
            print("响应中没有加密数据，可能需要登录或通过验证")
            print("完整响应:", res_json)
            return
        # 执行js解密方法
        current_dir = os.path.dirname(os.path.abspath(__file__))
        js_file = os.path.join(current_dir, "decode_response_data.js")
        with open(js_file, "r", encoding='utf-8') as f:
            js_code = f.read()
        ctx = execjs.compile(js_code)
        # 注意：base64Key是RSA加密的密钥，cipherText是AES加密的密文
        result = ctx.call('decryptData', {"base64Key": secret_key, "cipherText": cipher_text})
        print(result.get('plainText'))
        pass


if __name__ == '__main__':
    spider = Spider()
    spider.crawl({
        "searchGroup": 1,
        "reqType": "lastNews",
        "pageNum": 1,
        "pageSize": 50,
        "keyWords": "",
        "searchMode": 0,
        "bidField": "",
        "publishTime": "1735998375-1767534375",
        "selectType": "title,content",
        "subtype": "",
        "exclusionWords": "",
        "buyer": "",
        "winner": "",
        "agency": "",
        "industry": "",
        "province": "",
        "city": "",
        "district": "",
        "buyerClass": "",
        "fileExists": "",
        "price": "",
        "buyerTel": "",
        "winnerTel": ""
    })
