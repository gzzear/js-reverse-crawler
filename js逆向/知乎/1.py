import requests


headers = {
    "accept": "*/*",
    "accept-language": "zh-CN,zh;q=0.9",
    "cache-control": "no-cache",
    "pragma": "no-cache",
    "priority": "u=1, i",
    "referer": "https://www.zhihu.com/search?type=topic&q=%E8%A7%84%E5%88%92",
    "sec-ch-ua": "\"Google Chrome\";v=\"143\", \"Chromium\";v=\"143\", \"Not A(Brand\";v=\"24\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"macOS\"",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-origin",
    "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36",
    "x-api-version": "3.0.91",
    "x-app-za": "OS=Web",
    "x-requested-with": "fetch",
}
cookies = {
    "_xsrf": "qp8Ex1r8UYdUD4nRb9ijZuyMq4o9Q24O",
    "_zap": "bac3544b-9c74-45fe-95f8-15c1c61c259c",
    "d_c0": "ADBSAgGh2xmPTl7e1lAkEqaZfIboF9XVI_o=|1737015777",
    "Hm_lvt_98beee57fd2ef70ccdd5ca52b9740c49": "1766495063,1768027266",
    "HMACCOUNT": "DA5A6E10A4984465",
    "DATE": "1746164254327",
    "crystal": "U2FsdGVkX18zojjXNAZ5p2D2Mjt3R0l4+7/dS8KMyc8HSW4A5gS3TV3uYTTHh1lCaXLDRV70/QDZbIWIBh+5821F4u2DDqff8nrwvfyj48lwYgyhE8EvhThFVglAjE60lb6veQEljxGpymH/DQBJ2ZxYSc9M7LEJtnFS99B00ba2tlmwdLLUcvr+sdNPE+ZEnGIUcQ02G9TJB6Y4de9EgH2EV3n8zGdZ/9P9p7sz8uEc9ZzEMj6CaLuglpPEd9gx",
    "__snaker__id": "Qs8jCJ4hDUJsw6vp",
    "vmce9xdq": "U2FsdGVkX19WrYrrxLq/SnnJpGX/ZHI2hKBLyscp77Eflqd9qpaSLmk6+NAnoKHdXVOHWaThgMe2t6Wmvn3gDTxl4G1EXwNBN+u9tskGoIjy+wcVbLx1dMItjW29Tktjz6lDLsErabwk7fSOeZkPYx5WV8JbVuC51qK0Z4WEHN8=",
    "captcha_session_v2": "2|1:0|10:1768803043|18:captcha_session_v2|88:cGxiWXNaNE4zQlZ0ZGYrQTNoYU1ybVNmM2lwUWozN1cxSlJEYnZTU0cybVVDQVRoU1lPcTRvbVdSeUdLMnFHTg==|776804a4d5ef36b403366fff75a3c7925c43e64a33a1a3f8181b84718f551625",
    "cmci9xde": "U2FsdGVkX19t23QcqPPWMjghVytgNZW7BdgVP638MqSa9VImVsf/4WZt8v/YBq/WQGc8Bd+Del49s2rf4+RfWA==",
    "pmck9xge": "U2FsdGVkX19PgWIjoGdHUr1wa6z/nb+gtkRLuizZWO4=",
    "assva6": "U2FsdGVkX19Xv/+cxgEmJWqSdptHfJsauHxIJbZzbyw=",
    "assva5": "U2FsdGVkX19RRBQ1LGNLzprgG7ia4AdFVh8tqvMfvcQhzWjGs7wUWgBI0XdtfDv8EjOMKqPzWmX/hQ8WTi7kJQ==",
    "gdxidpyhxdE": "SBZvLRK9GnheqrN5wQKxpudNcDhKsQLZkRpb94yU%2FZujh2%2FBTVwWk%2BycsBoOId1%2Bjnlf%2Fya3zgvsEr8VlG%5CV%2Fjj%2F%5CogRcyU8%2Bt8okIW0E%2BSxY9g0%5CIVVxEuZUa0itiEsOw83prxxPyvHS8KXbzLQ%2FR0mfCQmZQ5T4HmcIhR5vE%2BVuDBq%3A1768803945473",
    "q_c1": "e04c94d835744201baf091d0994ceb86|1768803097000|1768803097000",
    "z_c0": "2|1:0|10:1768803100|4:z_c0|92:Mi4xZGE3UG53QUFBQUFBTUZJQ0FhSGJHU1lBQUFCZ0FsVk5HUmxiYWdBZ3NMalpKUEJfMktURGxDeEIwSEw3a2RnazJR|7d9c82c038d282a3bbc06ffdf52e24f2a38fa7c48fe276be6cb8f07d613aaab5",
    "__zse_ck": "005_b7fF0nFbk/=PivtTYUw1VsQd1B22XzPUFOj0aHzOzzeOXck1VSXr2cVgoMQlnaEkpGrbmr1tbKy0jzsWSj8ACyHQtKtN9R1eZpHH4tCgrzKMZkXRQGlHypJVeBBwqhhU-J+PQbbQuqhFe4np4nycC//uMl6KqH2+6wbme9IYxB48PgbuyPHM7F6+ysaklxkdkuicqjK/6EdbY1UfqxgyHtzPJa8ZCo5x1jsNopTFunTI6y4fZNTvDAu03iSpHdbhR",
    "SESSIONID": "LZEjVSGm3Clk8TW02tSTp3AliQhKbEJrPotyPESWKiQ",
    "JOID": "UFoVBEn3GgHZwwu4aPJ60avDr2Nzu0JDtpVY_QLEWW-1_l_vWqA0bLXDCb1qYyaG0bqH7FOnqMVRY4TMk7ll-zE=",
    "osd": "UF0RA0z3HQXexgu_bPV_0azHqGZzvEZEs5Vf-QXBWWix-VrvXaQzabXEDbpvYyGC1r-H61egrcVWZ4PJk75h_DQ=",
    "BEC": "1eb0fb512bb6053f407f0a7771f545e9",
    "Hm_lpvt_98beee57fd2ef70ccdd5ca52b9740c49": "1768894129"
}
url = "https://www.zhihu.com/api/v4/search_v3"
params = {
    "gk_version": "gz-gaokao",
    "t": "topic",
    "q": "规划",
    "correction": "1",
    "offset": "26",
    "limit": "20",
    "filter_fields": "",
    "lc_idx": "26",
    "show_all_topics": "1",
    "search_hash_id": "0f1bce3be797f09bfdcb9caea1805128",
    "search_source": "Normal"
}
response = requests.get(url, headers=headers, cookies=cookies, params=params)

print(response.text)
print(response)