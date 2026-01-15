import requests



def login(username, password):

    headers = {
        "accept": "application/json, text/plain, */*",
        "accept-language": "zh-CN,zh;q=0.9",
        "cache-control": "no-cache",
        "content-type": "application/x-www-form-urlencoded",
        "csm": "d73ad18cfceb304d059f2599ac5599bdc828fb426979f7f6363cbfc4d8c2c874",
        "cst": "1757420994466",
        "origin": "https://m.ctyun.cn",
        "pragma": "no-cache",
        "priority": "u=1, i",
        "referer": "https://m.ctyun.cn/wap/main/auth/login",
        "sec-ch-ua": "\"Not;A=Brand\";v=\"99\", \"Google Chrome\";v=\"139\", \"Chromium\";v=\"139\"",
        "sec-ch-ua-mobile": "?1",
        "sec-ch-ua-platform": "\"Android\"",
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-origin",
        "user-agent": "Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/139.0.0.0 Mobile Safari/537.36",
        "x-riskdevicesign": "edb1e97abd6140eb8355bf4243d27167"
    }
    cookies = {
        "Hm_lvt_4b4ce93f1c92033213556e55cb65769f": "1757420963",
        "Hm_lpvt_4b4ce93f1c92033213556e55cb65769f": "1757420963",
        "HMACCOUNT": "DA5A6E10A4984465",
        "sid1": "1757420963761-186B447A4227C3ED55A371F85D365F19",
        "sid2": "1757420963761-186B447A4227C3ED55A371F85D365F19",
        "pvid": "1"
    }
    url = "https://m.ctyun.cn/account/login"
    params = {
        "referrer": "wap",
        "mainVersion": "300031500",
        "comParam_curTime": "1757420994529",
        "comParam_seqCode": "E47B2E76A996858FAB972E0C03CD6928",
        "comParam_signature": "0ad06ae882c7610d230091fe967bc53b",
        "isCheck": "true",
        "locale": "zh-cn"
    }
    data = {
        "userName": f"{username}",
        "password": f"{password}",
    }
    response = requests.post(url, headers=headers, cookies=cookies, params=params, data=data)

    print(response.text)
    print(response)