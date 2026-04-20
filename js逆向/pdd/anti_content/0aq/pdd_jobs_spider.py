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
    "anti_content": "0aqAfaOZrjlaU99CnHbXQCl3CE6_G_iSrJASEHn9r7Ty9ZBSCl83k4skLioBXGgbl9GB2Xpgam77N0MXGL00Rg-flDDhMYWC_xfHULQSLItq5nv0W84HkfdHcFyYU7CNLVTTKBS4xBdyCj3RDjblJqSzdmPgytVVZ-2dXunASSPXpTnn7z1UekrhWncJb7UKJBkjiEIw8xZYMyvtx0d6pRXyy1dyp-bp4hBadL9oC2b9XgfaVQ_9BkzmpeZTpAcvtawwpn9hzHnMubfbQB_CTbGFLP28FgVg1EZ7vQC650aeJbwoqoDcKmFZYwQDfL3ATIMnViljcrtXkmTuqCjI2gqiveCfborU1DEqrJX67QS57uFh56kJu-jyROugDJhzuZXrFmWN1WNRhpNoWXFoTs06zfcrm-zs9o"
}
data = json.dumps(data, separators=(',', ':'))
response = requests.post(url, headers=headers, data=data)

print(response.text)
print(response)