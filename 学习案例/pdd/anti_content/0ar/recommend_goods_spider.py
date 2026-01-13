import requests
import json


headers = {
    "accept": "*/*",
    "accept-language": "zh-CN,zh;q=0.9",
    "anti-content": "0arAfxidDhlyy99ut99NAVK0H-4M9p8R-y0gpZRq6Ub5UifGCLne_uRDGYHip-D7fP4Kk4CKg_ZhekzbUwfVyws_EMbgOtfBUyYBOjSnfKk5zsh6lMrzUeKh7YBN3VggX7mnZY_QfLo40m5-gNf-_R35BGyNKSBmnrTeTXPlV9XvwgW2_pXC8KB_zXLLEfIc0KGOG-IjQBZ-GeickuT3gwHEtDiXDHaJW6easaQ_pHxJ4DT09cJ8OY5r1JWHqrooHJvWZVtlc2UvwTgTa_Lf5avnsd7uAvTtk-_c1iL8J1Ylw60GuqAJiqOR-T6gTK3VTnOow1lEg6fXMoluCSkP1ECOPXVLrX449TFyP3eOqxwQP-56I_NP--mKGGj7Modu3La4lExkNAYM2qYvFEw6Ql4G66CGiVV-PTv12Wej1y_GbHYaNPqJW5tWsSETkqm3Hcxlp0yu7nMDWfabWApuiul2GxhdvKpvPLLoVggFdLD-JFjFCe9rfMfX2iH3Wh51rrabDL-_HS-qbEI_y43WB02ZxXLTeU3OxA8k_dM3hoXp2hnprzH8OAHAi1hW6-wVSr5DHWdmynOwqjPMwknmPOltlFCxqe8nt9sm7Bgb_F8QPRLnPpTOkF0bT1-f1lGEWb928hqxQl80Qm1",
    "cache-control": "no-cache",
    "content-type": "application/json",
    "origin": "https://pifa.pinduoduo.com",
    "pragma": "no-cache",
    "priority": "u=1, i",
    "referer": "https://pifa.pinduoduo.com/",
    "sec-ch-ua": "\"Google Chrome\";v=\"143\", \"Chromium\";v=\"143\", \"Not A(Brand\";v=\"24\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"macOS\"",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-origin",
    "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36"
}

url = "https://pifa.pinduoduo.com/pifa/recommend/queryRecommendGoods"
data = {
    "page": 1,
    "pageSize": 20,
    "queryApi": ""
}
data = json.dumps(data, separators=(',', ':'))
response = requests.post(url, headers=headers, data=data)

print(response.text)
print(response)