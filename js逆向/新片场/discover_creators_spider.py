import requests


headers = {
    "accept": "*/*",
    "accept-language": "zh-CN,zh;q=0.9",
    "cache-control": "no-cache",
    "pragma": "no-cache",
    "priority": "u=1, i",
    "referer": "https://www.xinpianchang.com/discover/creators",
    "sec-ch-ua": "\"Google Chrome\";v=\"143\", \"Chromium\";v=\"143\", \"Not A(Brand\";v=\"24\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"macOS\"",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-origin",
    "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36"
}
cookies = {
    "lastHomeTab": "editor_recommend",
    "sajssdk_2015_cross_new_user": "1",
    "sensorsdata2015jssdkcross": "%7B%22distinct_id%22%3A%2219bb6107a082440-05128aa3ec9d9a8-1c525631-1296000-19bb6107a092290%22%2C%22first_id%22%3A%22%22%2C%22props%22%3A%7B%22%24latest_traffic_source_type%22%3A%22%E7%9B%B4%E6%8E%A5%E6%B5%81%E9%87%8F%22%2C%22%24latest_search_keyword%22%3A%22%E6%9C%AA%E5%8F%96%E5%88%B0%E5%80%BC_%E7%9B%B4%E6%8E%A5%E6%89%93%E5%BC%80%22%2C%22%24latest_referrer%22%3A%22%22%7D%2C%22%24device_id%22%3A%2219bb6107a082440-05128aa3ec9d9a8-1c525631-1296000-19bb6107a092290%22%7D",
    "Device_ID": "21f5da82-c332-44b8-8c80-936d4d270bf3",
    "Authorization": "8f34a945-fd1b-4f23-8483-6b41725dca9c",
    "FECWS": "3e4dbbe1f2632dc0cbad3e05bf0863d44cde6934d68447caa4601f85612547f96d466e223c0ec7658c10e67ab631d4aa1e650fb08b2de5880397ca05b596524adb13315a11fddd73ef886b7f2e6007e21e",
    "PHPSESSID": "vos37e33na97i5esrhqs0inm4u",
    "FECAS": "4de14y7QD1/6hUFmkr7RbKXhg6n9NruvVHMd705qDstb93Rs4DtxfXWiqvbG0/sXI8FfndZtuX8ZJjcQUVGxBNLK5yCVjR5VCdDmYdjaNd2wa/HDl2AOYxA0wvnAvX/InNtuz56eCa5gP9gtK4rNQsynZaAcBHwuFUT7Z2CouYHD7dDPsAerWpJODTgFa62ehb"
}
url = "https://www.xinpianchang.com/api/xpc/v2/discovery/creators"
params = {
    "age": "0",
    "category_id": "0",
    "creator_type": "creators",
    "gender": "0",
    "occupation_id": "1",
    "order": "surge_popularity",
    "page": "2",
    "per_page": "24",
    "region_id": "0",
    "year_type": "0",
    "FECU": "4de14y7QD1/6hUFmkr7RbKXhg6n9NruvVHMd705qDstb93Rs4DtxfXWiqvbG0/sXI8FfndZtuX8ZJjcQUVGxBNLK5yCVjR5VCdDmYdjaNd2wa/HDl2AOYxA0wvnAvX/InNtuz56eCa5gP9gtK4rNQs/+oM4So02G2VqbsfIXG5y/Vc2TM7NkB2/OWHUmE7iGjb"
}
response = requests.get(url, headers=headers, cookies=cookies, params=params)

print(response.text)
print(response)