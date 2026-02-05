import requests


headers = {
    "Accept": "application/json, text/javascript, */*; q=0.01",
    "Accept-Language": "zh-CN,zh;q=0.9",
    "Cache-Control": "no-cache",
    "Connection": "keep-alive",
    "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
    "MX-API": "{\"ver\":\"7.0.0\",\"sCode\":\"Wanda\",\"_mi_\":\"\",\"width\":1280,\"json\":true,\"cCode\":\"1_3\",\"check\":\"fc47847cb55b2762d306db12ad2ee62b\",\"ts\":1770255453960,\"heigth\":720,\"appId\":\"3\"}",
    "Origin": "https://m.wandacinemas.com",
    "Pragma": "no-cache",
    "Referer": "https://m.wandacinemas.com/",
    "Sec-Fetch-Dest": "empty",
    "Sec-Fetch-Mode": "cors",
    "Sec-Fetch-Site": "cross-site",
    "Sec-Fetch-Storage-Access": "active",
    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36",
    "sec-ch-ua": "\"Not(A:Brand\";v=\"8\", \"Chromium\";v=\"144\", \"Google Chrome\";v=\"144\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"macOS\""
}
url = "https://user-api-prd-mx.wandafilm.com/user/login.api"
data = {
    "phone": "19113189219",
    "requestId": "",
    "vcode": "122312",
    "json": "true",
    "cinemaId": "5911"
}
response = requests.post(url, headers=headers, data=data)

print(response.text)
print(response)