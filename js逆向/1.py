import requests


headers = {
    "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
    "accept-language": "zh-CN,zh;q=0.9",
    "cache-control": "no-cache",
    "pragma": "no-cache",
    "priority": "u=0, i",
    "referer": "https://mobile.yangkeduo.com/transac_share_goods.html?__rp_name=pxqx_share_goods&share_scene=1&share_id=94fd7efe1b29c12cc8b3d30f5ff52fc9-8254851848846-532&refer_page_name=login&refer_page_id=10169_1769651997325_6ebut3vado&refer_page_sn=10169&page_id=135277_1769652041458_i7sb0ysbhn&is_back=1",
    "sec-ch-ua": "\"Google Chrome\";v=\"143\", \"Chromium\";v=\"143\", \"Not A(Brand\";v=\"24\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"macOS\"",
    "sec-fetch-dest": "document",
    "sec-fetch-mode": "navigate",
    "sec-fetch-site": "same-origin",
    "sec-fetch-user": "?1",
    "upgrade-insecure-requests": "1",
    "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36"
}
cookies = {
    "api_uid": "CiwDtWlhAcGjGACfDAZhAg==",
    "_nano_fp": "XpmjnqUjnpgxX5dYn9_e5QkzUpO98vBzCxkajXMf",
    "webp": "1",
    "jrpl": "4Fg0HwS77fUcql42jwpIfXpA9L4B5fDp",
    "njrpl": "4Fg0HwS77fUcql42jwpIfXpA9L4B5fDp",
    "dilx": "zO9eKs9Iw~cJOljFJIr3F",
    "PDDAccessToken": "DNMKNY2XCBJ7UHNLHVJ37TYOQIMKMGPQ54MAZAPQ5L7GIQKDTRMQ12034ba",
    "pdd_user_id": "1143387274292",
    "pdd_user_uin": "UTGMSTLMXPPZEU552QTMVCLG5Q_GEXDA",
    "pdd_vds": "gaLpNcydNqmCQrnradETOftqapoZGYOePcGuLuGdGpIdyZtDycLeIYOdGvnv"
}
url = "https://mobile.yangkeduo.com/goods.html"
params = {
    "goods_id": "633654042190",
    "_oc_trace_mark": "199",
    "_oak_gallery_token": "8b330ea5e546e88ae9e09f1aa61d3cb3",
    "_oak_gallery": "https://img.pddpic.com/mms-material-img/2024-07-19/b7a88b9d-8de8-4a69-8c79-7f522c4ee00d.jpeg",
    "_oc_refer_ad": "1",
    "refer_page_name": "transac_share_goods",
    "refer_page_id": "135277_1769652041458_i7sb0ysbhn",
    "refer_page_sn": "135277"
}
response = requests.get(url, headers=headers, cookies=cookies, params=params)

print(response.text)
print(response)