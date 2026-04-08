import requests


headers = {
    "uifid": "e4c262a6b5e3b5badbd561631828ceb96cf9bda1502c8aff5f66458d92ccf6f38d2762055da7262b93ed261b3fe2e483179a2303cbb6922aadc6c7313ea226f56cc1edd0ec4cc20f43606347427a145f93850998a679f2d82b1b9c30fdb9f285994bd79cf3d6c49d7c687108f6c0f33489fe55d411decc9c3335aa5125353b25dfac3ce194bbf513ef7ffbb513416953eb2aff7bdbff4fec4f1681699ffd2d02",
    "sec-ch-ua-platform": "\"macOS\"",
    "Referer": "https://www.douyin.com/jingxuan/search/%E6%AD%8C%E8%AF%8D%E5%85%A5%E5%BF%83%E7%9A%84%E6%96%87%E6%A1%88?aid=dd695665-a06b-4fe3-b449-a069d311bb3b&type=general",
    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36",
    "sec-ch-ua": "\"Chromium\";v=\"146\", \"Not-A.Brand\";v=\"24\", \"Google Chrome\";v=\"146\"",
    "sec-ch-ua-mobile": "?0"
}
url = "https://www.douyin.com/aweme/v1/web/general/search/stream/"
params = {
    "aid": "6383",
    "browser_language": "zh-CN",
    "browser_name": "Chrome",
    "browser_online": "true",
    "browser_platform": "MacIntel",
    "browser_version": "146.0.0.0",
    "channel": "channel_pc_web",
    "cookie_enabled": "true",
    "count": "10",
    "cpu_core_num": "8",
    "device_memory": "8",
    "device_platform": "webapp",
    "disable_rs": "0",
    "downlink": "10",
    "effective_type": "4g",
    "enable_history": "1",
    "engine_name": "Blink",
    "engine_version": "146.0.0.0",
    "from_group_id": "",
    "is_filter_search": "0",
    "keyword": "歌词入心的文案",
    "list_type": "single",
    "need_filter_settings": "1",
    "offset": "0",
    "os_name": "Mac OS",
    "os_version": "10.15.7",
    "pc_client_type": "1",
    "pc_libra_divert": "Mac",
    "pc_search_top_1_params": "{\"enable_ai_search_top_1\":1}",
    "platform": "PC",
    "query_correct_type": "1",
    "round_trip_time": "50",
    "screen_height": "900",
    "screen_width": "1440",
    "search_channel": "aweme_general",
    "search_source": "normal_search",
    "support_dash": "1",
    "support_h265": "1",
    "uifid": "e4c262a6b5e3b5badbd561631828ceb96cf9bda1502c8aff5f66458d92ccf6f38d2762055da7262b93ed261b3fe2e483179a2303cbb6922aadc6c7313ea226f56cc1edd0ec4cc20f43606347427a145f93850998a679f2d82b1b9c30fdb9f285994bd79cf3d6c49d7c687108f6c0f33489fe55d411decc9c3335aa5125353b25dfac3ce194bbf513ef7ffbb513416953eb2aff7bdbff4fec4f1681699ffd2d02",
    "update_version_code": "0",
    "version_code": "190600",
    "version_name": "19.6.0",
    "webid": "7605443157111522851",
    "msToken": "-BNEfTg99uCDRbPnq7yOS0czYAddGK9iMRQ5XQrhNzh20R6lT_Az0uNgxxNq5ece8Exz_70tIUGj5FqehtIXU2YvX1KyfpSfrf_MZT-6GTEcpajGxAH-KAgbXePLxOCi1SPzF6w92HoCTOTLhElRr1sCHXkODAvCKnqxcqAKKhehaA==",
    "a_bogus": "Yy0VkF6EDoWfKVKbYKpz9-eltAyArPWycaT2SxPP9NFlP7tY2SNNsxt6rxwHxqp4BWphwo/7EDeAGEdbYsXkZqKpKmkvu2zjsUVAIX6o/qNgYMJsgNSYCuhFzwsC854L-ACfilW5WsBr1d5lINAhAdAat5zq-mYpbNMWdZu9yEWhDWukwn3kOHhDE6Tqcj=="
}
response = requests.get(url, headers=headers, params=params)

print(response.text)
print(response)