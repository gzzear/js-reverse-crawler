import requests
import json


headers = {
    "accept": "*/*",
    "accept-language": "zh-CN,zh;q=0.9",
    "anti-content": "0arAfxidphQyy9Eut994u6p6nStrZpaRNUwCWQ9qmzohqT7VNekfbLiHuWImYk3f9vtTdsf_dsxGwPv2ktUK1tUw6pN4JtPBUyxSisNR5_kzSjVDVYShjKtkDFbaMBEw4ZQ8TyHUZqAGCUrPeVG4fUh8fpZcnFWBkfK7emn7O23av9vNdsPE2ezgyI1bigf7a8z3YnHGZOjl4cBMd0Otp_JSxvofHbaoaYmbDFMIoSUBWFhCiAXfh38-PWWMscQIRLNoOz3GqZ_fBh_ko0rsLShQwEypews7Fwsdv0iJuWDakOQXxshylDZ3MIKU4JtmNCKG9Nl6pV22_zGi2Vy4xIMEBN9IaN4PQ4VSPpkgp0GXSi6muw0FsXU5evdmn5I02YrgmVwsCXIM-pU40ppZh4Eg8_f3kN2RM9Btcpoe6mEF6VA7laDFHULdtD5aCV53ppD0UoQysAnD7lua7MCYn3mfcv9Bka0JKco-w_0yBHvH73z-_6H3lH2lwlwRhGUrmscvJVJvjXF7enFT3dF7I-Ljy_7GpItdJnZY_8YlzheGjXY1umcj0r7JMcmc-3NAeK98JEJBR1rgsOwBjBrp_QmKVbF7zxDxPSNzV97wxZuEOoJ1dHVTIesDE1RXYREMaYY2NbyHoYYOCYJc",
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