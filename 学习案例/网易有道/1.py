import requests


headers = {
    "Accept": "application/json, text/plain, */*",
    "Accept-Language": "zh-CN,zh;q=0.9",
    "Cache-Control": "no-cache",
    "Connection": "keep-alive",
    "Content-Type": "multipart/form-data; boundary=----WebKitFormBoundary4KBnmCKHg3TUC3eB",
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
cookies = {
    "OUTFOX_SEARCH_USER_ID": "-210103413@222.209.34.79",
    "OUTFOX_SEARCH_USER_ID_NCOO": "1680592794.6086864",
    "_ga": "GA1.2.1447303843.1752548193",
    "DICT_DOCTRANS_SESSION_ID": "ZWE4YzExOTktNzE2OS00NDQ5LTkzYjgtYzkwODIwNzY0N2Rh",
    "_uetsid": "b8af6ac08c8311f0a0835fd4c24d68c0",
    "_uetvid": "9ccda220f5b311efb7e7611f6b0a02aa",
    "_uetmsclkid": "_uet76c4ee629b921748e9c286dc19256adf"
}
url = "https://dict.youdao.com/keyword/key"
data = {
    "------WebKitFormBoundary4KBnmCKHg3TUC3eB\\r\nContent-Disposition: form-data; name": "\"text\"\\r\n\\r\nhello\\r\n------WebKitFormBoundary4KBnmCKHg3TUC3eB--\\r\n"
}
response = requests.post(url, headers=headers, cookies=cookies, data=data)

print(response.text)
print(response)