import execjs
import requests

headers = {
    "Accept": "*/*",
    "Accept-Language": "zh-CN,zh;q=0.9",
    "Cache-Control": "no-cache",
    "Connection": "keep-alive",
    "Pragma": "no-cache",
    "Referer": "https://www.ximalaya.com/sound/138296025",
    "Sec-Fetch-Dest": "empty",
    "Sec-Fetch-Mode": "cors",
    "Sec-Fetch-Site": "same-origin",
    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36",
    "sec-ch-ua": "\"Not)A;Brand\";v=\"8\", \"Chromium\";v=\"138\", \"Google Chrome\";v=\"138\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"macOS\"",
    "xm-sign": "D2M+y1WhCAYBjZchX6IPVluIa1NoQmqaFD93gJg6dY2S8X2b&&5icOaWRfvzQQ2DZRN5szd6-R_4eF5xih18IjTodFx7I_1"
}
cookies = {
    "HWWAFSESID": "9797618dfd1b87a7e8e",
    "HWWAFSESTIME": "1754558386852",
    "_xmLog": "h5&e53d6e4d-cedb-41f4-b142-df8e0307e1d0&process.env.sdkVersion",
    "xm-page-viewid": "ximalaya-web",
    "DATE": "1754558390302",
    "wfp": "ACM2N2MwNDBhY2FhNzE3MTIySJB2uJGFBIV4bXdlYl93d3c",
    "crystal": "U2FsdGVkX1+mLSOUWOrPWH1Hr1lLPTyyioiPuwJyzSveglg4DE2ff2B9QVEEPPvF6+eu59ZoCaPvvQGu2EULasS5DdIt6YN+iyJhvNI/f52BD+UsMHljjdCEu+644nQlt3fBhokqTEFqgmsqEd/WhmbJCBC4hfhqXJteF1plifLZR6zZDBhADKPm6hBM0GiU9tpRaUxyjWAmNkiug4i2MO7+FbJ3bGmVlrm7vFJmljw+LEIx3gE/hyn5ExmGd6JT",
    "impl": "www.ximalaya.com.login",
    "Hm_lvt_4a7d8ec50cfd6af753c4f8aee3425070": "1754558395",
    "HMACCOUNT": "DA5A6E10A4984465",
    "Hm_lpvt_4a7d8ec50cfd6af753c4f8aee3425070": "1754638125",
    "cmci9xde": "U2FsdGVkX1+qGINpxdQPOAGDrWufg658JlFTk4lQIDYM5M0BvTaXxFOCQ0+U0QrStqM/CoF21Bq3XnpLXOBKrA==",
    "pmck9xge": "U2FsdGVkX1/UwzRLQ/nq23k5mCXANxMQqN2tln023lE=",
    "assva6": "U2FsdGVkX188cwqWj92l0M9iSe7+uiwr21IjR5Wuhxw=",
    "assva5": "U2FsdGVkX18+e8nanZkT0ytxzYtfA/Uhmi9iq8jaRXb5+5P5WF5rp/kXTZ/veWHa/4Zk2e8no6h0i5cRPdZ1wQ==",
    "vmce9xdq": "U2FsdGVkX1+/khhxu5fy7hdPXXpkIqzegW75ZYG2OYMSx0cn+NKYv4ATJg2S3Px5UrsqFqVz7xQjCvWzpeoiz8VESnIPPeqLEVAL8GT6tPETloSFlsJOG2ryHyM5yvS5z+bLYlSCCRn347tNkntcvJuc5sTsSTAOmp4tHivpEg0="
}
url = "https://www.ximalaya.com/mobile-playpage/track/v3/baseInfo/1754640298106"
params = {
    "device": "www2",
    "trackId": "140668723",
    "trackQualityLevel": "1"
}
response = requests.get(url, headers=headers, cookies=cookies, params=params)


response_json = response.json()
print(response_json)
url = response_json['trackInfo']['playUrlList'][0]['url']
node = execjs.get()
with open('decrypt.js', 'r', encoding='utf-8') as f:
    js_code = f.read()
ctx = node.compile(js_code)
url = ctx.call('decrypt_url', url)
print(url)
music_res = requests.get(url)
with open('1.mp3', 'wb') as f:
    f.write(music_res.content)
