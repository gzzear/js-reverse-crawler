import time

import execjs
import requests


def fetch_key(ctx):
    headers = {
        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/139.0.0.0 Safari/537.36",
    }
    url = "https://dict.youdao.com/webtranslate/key"
    mysticTime = int(time.time() * 1000)
    sign = ctx.call('generateSign', mysticTime, 'yU5nT5dK3eZ1pI4j')
    params = {
        "keyid": "webfanyi-key-getter-2025",
        "sign": f"{sign}",
        "client": "fanyideskweb",
        "product": "webfanyi",
        "appVersion": "1.0.0",
        "vendor": "web",
        "pointParam": "client,mysticTime,product",
        "mysticTime": f'{mysticTime}',
        "keyfrom": "fanyi.web",
        "mid": "1",
        "screen": "1",
        "model": "1",
        "network": "wifi",
        "abtest": "0",
        "yduuid": "abcdefg"
    }
    response = requests.get(url, headers=headers, params=params)
    if response.status_code == 200:
        result = response.json()
        secretKey = result['data']['secretKey']
        aesKey = result['data']['aesKey']
        aesIv = result['data']['aesIv']
        return secretKey, aesKey, aesIv
    else:
        print('获取secretKey失败', response)
        return None


def translate(text, ctx, secretKey, decodeKey, decodeIv):
    headers = {
        "Accept": "application/json, text/plain, */*",
        "Accept-Language": "zh-CN,zh;q=0.9",
        "Cache-Control": "no-cache",
        "Connection": "keep-alive",
        "Content-Type": "application/x-www-form-urlencoded",
        "Origin": "https://fanyi.youdao.com",
        "Pragma": "no-cache",
        "Referer": "https://fanyi.youdao.com/",
        "Sec-Fetch-Dest": "empty",
        "Sec-Fetch-Mode": "cors",
        "Sec-Fetch-Site": "same-site",
        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/139.0.0.0 Safari/537.36",
        "sec-ch-ua": "\"Not;A=Brand\";v=\"99\", \"Google Chrome\";v=\"139\", \"Chromium\";v=\"139\"",
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": "\"macOS\""
    }
    url = "https://dict.youdao.com/webtranslate"

    mysticTime = int(time.time() * 1000)
    sign = ctx.call("generateSign", mysticTime, secretKey)


    data = {
        "i": f"{text}",
        "from": "auto",
        "to": "",
        "useTerm": "false",
        "domain": "0",
        "dictResult": "true",
        "keyid": "webfanyi",
        "sign": f"{sign}",
        "client": "fanyideskweb",
        "product": "webfanyi",
        "appVersion": "1.0.0",
        "vendor": "web",
        "pointParam": "client,mysticTime,product",
        "mysticTime": f"{mysticTime}",
        "keyfrom": "fanyi.web",
        "mid": "1",
        "screen": "1",
        "model": "1",
        "network": "wifi",
        "abtest": "0",
        "yduuid": "abcdefg"
    }
    response = requests.post(url, headers=headers, data=data)
    if response.status_code == 200:
        print(response.text)
        data = ctx.call('decryptData', response.text, decodeKey, decodeIv)
        print(data)
    else:
        print('反爬了', response)


if __name__ == '__main__':
    node = execjs.get()
    with open('./websitTranslate.js', 'r', encoding='utf-8') as f:
        js_code = f.read()
    ctx = node.compile(js_code)
    secretKey, aesKey, aesIv = fetch_key(ctx)
    translate("heal", ctx, secretKey, aesKey, aesIv)
