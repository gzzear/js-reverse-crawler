import requests
from loguru import logger
from urllib.parse import quote_plus

from js逆向.抖音.纯算版.a_b纯算 import get_ab

url = "https://www.douyin.com/aweme/v1/web/follow/feed/?device_platform=webapp&aid=6383&channel=channel_pc_web&cursor=0&level=1&count=20&pull_type=0&aweme_ids=&room_ids=&pc_client_type=1&pc_libra_divert=Windows&support_h265=0&support_dash=0&webcast_sdk_version=170400&webcast_version_code=170400&version_code=170400&version_name=17.4.0&cookie_enabled=true&screen_width=2134&screen_height=1200&browser_language=zh-CN&browser_platform=Win32&browser_name=Edge&browser_version=142.0.0.0&browser_online=true&engine_name=Blink&engine_version=142.0.0.0&os_name=Windows&os_version=10&cpu_core_num=20&device_memory=8&platform=PC&downlink=10&effective_type=4g&round_trip_time=0&webid=7614497065755166254&verifyFp=verify_mmgbwfyu_oRGm5qAK_FUzN_4q47_AWKT_YGrEfQTegkk8&fp=verify_mmgbwfyu_oRGm5qAK_FUzN_4q47_AWKT_YGrEfQTegkk8&msToken="
parms = url.split("?")[1]
print("parms",parms)
UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36 Edg/142.0.0.0"
a_bogus = get_ab(parms,UA)
logger.success(f"a_bogus 长度{len(a_bogus)} {a_bogus}")
url = url + "&a_bogus="+ quote_plus(a_bogus)
print("url",url)
headers = {
    "accept": "*/*",
    "accept-language": "zh-CN,zh;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6",
    "cache-control": "no-cache",
    "pragma": "no-cache",
    "priority": "u=1, i",
    "referer": "https://www.douyin.com/follow",
    "user-agent": UA
}
cookies = {} # 填自己的
response = requests.get(url, headers=headers, cookies=cookies)

print(response.text)
print(response)