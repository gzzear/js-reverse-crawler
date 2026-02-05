import requests
import json


headers = {
    "accept": "application/json, text/javascript, */*; q=0.01",
    "accept-language": "zh-CN,zh;q=0.9",
    "cache-control": "no-cache",
    "content-type": "application/json",
    "origin": "https://www.mosoteach.cn",
    "pragma": "no-cache",
    "priority": "u=1, i",
    "referer": "https://www.mosoteach.cn/",
    "sec-ch-ua": "\"Not(A:Brand\";v=\"8\", \"Chromium\";v=\"144\", \"Google Chrome\";v=\"144\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"macOS\"",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-site",
    "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36"
}
url = "https://coreapi-proxy.mosoteach.cn/index.php/passports/account-login"
data = {
    "account": "19981364357",
    "ciphertext": "11RmNMQjNiOVpMZU9RQkxwazU1MTg5YzJlNWExOTQ1OTNiMzdhOTIwZDU4ZTllYmNis+fAtAo13falEFxF6Ffd/Q==",
    "captcha_verify_param": ""
}
data = json.dumps(data, separators=(',', ':'))
response = requests.post(url, headers=headers, data=data)

print(response.text)
print(response)