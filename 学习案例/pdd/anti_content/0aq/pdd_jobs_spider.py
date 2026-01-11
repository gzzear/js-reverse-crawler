import requests
import json


headers = {
    "accept": "*/*",
    "accept-language": "zh-CN,zh;q=0.9",
    "cache-control": "no-cache",
    "content-type": "application/json",
    "origin": "https://careers.pddglobalhr.com",
    "pragma": "no-cache",
    "priority": "u=1, i",
    "referer": "https://careers.pddglobalhr.com/jobs",
    "sec-ch-ua": "\"Google Chrome\";v=\"143\", \"Chromium\";v=\"143\", \"Not A(Brand\";v=\"24\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"macOS\"",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-origin",
    "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36"
}
url = "https://careers.pddglobalhr.com/api/recruit/position/list"
data = {
    "job": "",
    "page": 1,
    "pageSize": 10,
    "name": "",
    "workLocationList": [],
    "anti_content": '0aqAfoOZqOloq99T2XTEc9lx9n0tYsZfrJQsZ1BKZYws_y1C4gJZzFmM0CWvj1el52o2FCEz29p4Lu9J5KHWPpANhpAc1SStMe8XZMGeFR7gyfpz5uk-kepG-G4HyKGwtLQwnoSsrL0yi6pyOj-hJYXjR9XoJGPoaV4korbOScT3z60VzZJcCShMJv44FedBJObPBJebY_8n9Vk9dFEPdzp6E2AP_U6Qotm5g9PgPxTspFOY4FGpZmY654Kz3k5-peS0WaamGoGlGcVSgcpBNgBwyUOm1S5DBIosq9Zy3w-Rrc1seDbIt5xQZi6vTBMWp3lsHnbYg-Vy7vujbiC0hDZWMLRv8PJfzsyuVbkJx78PCXqzrSrStuvbtAlXAOsxiwsWvmW7qRAy53vDqlQEZ7OxeEdR'
}
data = json.dumps(data, separators=(',', ':'))
response = requests.post(url, headers=headers, data=data)

print(response.text)
print(response)