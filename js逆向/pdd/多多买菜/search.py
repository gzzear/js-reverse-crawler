import requests
import json


headers = {
    "accept": "application/json, text/plain, */*",
    "accept-language": "zh-CN,zh;q=0.9",
    "anti-content": "0aqWtac5NcGay99__nsECVTnVOEX7VWYvqpyej21Xvj765Zv_AxFKYlcTTfIjtuAWP4mx2sB8rsoA0Zm0VtrMx2rhKuYcJplv8P0SrWlsziktK1Ip5cDITfO5-E4WB3kD_GMgQzjlIji0xrNHmrhlTmuqYmZxZg5tyQVZJJyTeNB8XE7qT6aizcATQhl4GkXXWE5j9innLt5waXcsGpncMKQUN63rGZPGaBh2q24lZ7mGTeDbQVGg5Ay6d96Zn3Sh6bKgEKUuQX9NgkSffhdWWIgvrYpV-I8c9xHnJ95lq_5ojCzI8Ksglk5UboZI7y1SyRU1Cg__ZFBhHLochm89PspzNNmv1CKSs5FpVU-26Qb0OHnk8dIZ1skjJI2JedsgmLyX0y-iCM30lmRalCu6XfruM7B90",
    "content-type": "application/json",
    "etag": "nvG2CQEvW2JDlNojA8DTyZKavROUNVSz",
    "origin": "https://mdkd.pinduoduo.com",
    "p-appname": "DDStore-PC",
    "pdd-id": "nvG2CQEvW2JDlNojA8DTyZKavROUNVSz",
    "priority": "u=1, i",
    "referer": "https://mdkd.pinduoduo.com/",
    "sec-ch-ua": "\"Google Chrome\";v=\"147\", \"Not.A/Brand\";v=\"8\", \"Chromium\";v=\"147\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"macOS\"",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-site",
    "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/147.0.0.0 Safari/537.36",
}
cookies = {
    "SUB_PASS_ID": "x_eyJ0IjoiWTRqc0tyelNGSzVTUHZ6amRKL1BZVVplR2hkQTlxWmtmMWpZOWN2UWVtTzBYdUlMelMrWmNSU0NETkVMZk9WeSIsInYiOjEsInMiOjEwMDYsInUiOjU4MDgzMzE3MTM4fQ==",
}
url = "https://mdkd-api.pinduoduo.com/api/orion/op/package/search"
data = {
    "start_in_cabinet_date": 1773763200000,
    "end_in_cabinet_date": 1776355199999,
    "content": "9078",
    "stay_days_list": [
        -4
    ],
    "page_size": 10,
    "page_index": 1,
    "selected": False
}
data = json.dumps(data, separators=(',', ':'))
response = requests.post(url, headers=headers, cookies=cookies, data=data)

print(response.text)
print(response)