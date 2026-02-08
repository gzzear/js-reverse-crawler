import requests
import json


headers = {
    "Accept": "application/json, text/plain, */*",
    "Accept-Language": "zh-CN,zh;q=0.9",
    "Authorization": "Basic YXBwOnpjanktYXBw",
    "Cache-Control": "no-cache",
    "Connection": "keep-alive",
    "Content-Type": "application/json",
    "Origin": "https://www.bestvetschool.com",
    "Pragma": "no-cache",
    "Referer": "https://www.bestvetschool.com/",
    "Sec-Fetch-Dest": "empty",
    "Sec-Fetch-Mode": "cors",
    "Sec-Fetch-Site": "same-site",
    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36",
    "X-Request-Id": "45fb4f9fa9f3aa4ccea8e5faf3d5116f",
    "accessId": "362b5727739343b9b5e29217fa4888a3",
    "clientData": "%7B%22clientInfo%22%3A%22Chrome+144%22%2C%22systemVersion%22%3A%22macOS+10.15.7%22%2C%22appVersion%22%3A%22%2Fcourse.html%22%2C%22onlyId%22%3A%22e32d5675c28292ed531093efdd0baffb%22%7D",
    "nonce": "fe9a72a9959140e39dec6ec31049f218",
    "sec-ch-ua": "\"Not(A:Brand\";v=\"8\", \"Chromium\";v=\"144\", \"Google Chrome\";v=\"144\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"macOS\"",
    "sign": "5F3917A38F85023334244AC0B93C376BC7FC67E2CE3E7BE94F7027FEFF984108",
    "signMethod": "HMAC-SHA256",
    "signatureHeaders": "clientData",
    "t": "1770283923902"
}
url = "https://api.bestvetschool.com/authentication/form"
data = {
    "username": "19113189219",
    "password": "Gej9ZFn0ja+dit6KvyalLModsrYcALX3AfoEAPTsRa8x0YFCVD1zmVW8FPTRN8QfvOg4deTxNsnSSwXDJm0AhQ=="
}
data = json.dumps(data, separators=(',', ':'))
response = requests.post(url, headers=headers, data=data)

print(response.text)
print(response)