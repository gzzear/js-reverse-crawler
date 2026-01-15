import requests
import json


headers = {
    "accept": "application/json, text/plain, */*",
    "accept-language": "zh-CN,zh;q=0.9",
    "appcode": "ShoppingMallPC",
    "cache-control": "no-cache",
    "content-type": "application/json",
    "origin": "https://www.yijiupi.com",
    "pragma": "no-cache",
    "priority": "u=1, i",
    "referer": "https://www.yijiupi.com/",
    "sec-ch-ua": "\"Google Chrome\";v=\"143\", \"Chromium\";v=\"143\", \"Not A(Brand\";v=\"24\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"macOS\"",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-origin",
    "token;": "",
    "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36",
    "uuid": "edb1e97abd6140eb8355bf4243d27167",
    "x-sign": "7a1948c80975e3330df0bdab9db18b0ab33878e3",
    "x-sign-algorithm": "HMAC_SHA_1",
    "x-sign-nonce": "01f9c653_21fa_4181_87e3_39cc3dc750d9",
    "x-sign-timestamp": "1767500260",
    "x-sign-version": "2.0"
}
url = "https://www.yijiupi.com/v58/Product/List"
data = {
    "currentPage": 2,
    "data": {
        "brandIds": [
            "3688"
        ],
        "searchModes": [
            2
        ],
        "sort": 0,
        "currentPage": 2,
        "pageSize": 25,
        "filterSpecialArea": False,
        "searchSource": 1,
        "searchKeyNotCorrect": False,
        "brandId": ""
    },
    "pageSize": 25,
    "cityId": 402,
    "countyRegionId": "320116",
    "userClassId": 1,
    "userDisplayClass": 0,
    "addressId": "",
    "deviceType": 3
}
data = json.dumps(data, separators=(',', ':'))
response = requests.post(url, headers=headers, data=data)

print(response.text)
print(response)