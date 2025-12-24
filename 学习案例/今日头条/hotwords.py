import requests


headers = {
    "accept": "application/json, text/plain, */*",
    "accept-language": "zh-CN,zh;q=0.9",
    "cache-control": "no-cache",
    "pragma": "no-cache",
    "priority": "u=1, i",
    "referer": "https://www.toutiao.com/?wid=1757409566728",
    "sec-ch-ua": "\"Not;A=Brand\";v=\"99\", \"Google Chrome\";v=\"139\", \"Chromium\";v=\"139\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"macOS\"",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-origin",
    "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/139.0.0.0 Safari/537.36"
}
cookies = {
    "tt_webid": "7542093532812330515",
    "gfkadpd": "24,6457",
    "ttcid": "e92a8ef7ac2843a3814fe8932f7c817c20",
    "local_city_cache": "%E6%88%90%E9%83%BD",
    "x-web-secsdk-uid": "e61d80bd-0c0b-40f3-94cd-2184f719118c",
    "csrftoken": "3ca2939db4f8310b6d655cc2c2827888",
    "_ga": "GA1.1.1958185836.1757409569",
    "s_v_web_id": "verify_mfcca64t_qcfLOX9M_nNJb_4n8m_BJOO_0getwUj0zc2e",
    "tt_scid": "5IeeJ3W0hj1ZIuIOLKg2SBQ4-UvwhyDarmTw.C0h9LDs8KKm3fHQnMguMLbzTzs1855d",
    "_ga_QEHZPBE5HH": "GS2.1.s1757409568$o1$g0$t1757409591$j37$l0$h0",
    "ttwid": "1%7CPbPCDbQB6oTJ_hvFaE0NVRvhXvq4IRwR4LhltCh8M2M%7C1757409592%7C0c4ed027ed03a63ea0a729589d3749ff816d0cc5e0b6a5cbb4941facbb5dd197"
}
url = "https://www.toutiao.com/search/suggest/hot_words/"
params = {
    "_signature": "_02B4Z6wo00f01wYHl8AAAIDBNZJhg44wZZMGI5NAAKlInChkmBUDZdzzCVLh-oFj1RqLHA0S79o7dp4GMDOyamcrQsH00rSSXoAYjJbPmd6aGZN2EYQYFNtzpbbzQLdefmt9yjxF7E2fRVJrb5"
}
response = requests.get(url, cookies=cookies, params=params)

print(response.text)
print(response)