import requests
from scrapy import Selector


def fetch_goods_infos(goods_id):

    headers = {
        "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
        "accept-language": "zh-CN,zh;q=0.9",
        "cache-control": "no-cache",
        "pragma": "no-cache",
        "priority": "u=0, i",
        "referer": "https://www.jd.com/",
        "sec-ch-ua": "\"Google Chrome\";v=\"137\", \"Chromium\";v=\"137\", \"Not/A)Brand\";v=\"24\"",
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": "\"macOS\"",
        "sec-fetch-dest": "document",
        "sec-fetch-mode": "navigate",
        "sec-fetch-site": "same-site",
        "sec-fetch-user": "?1",
        "upgrade-insecure-requests": "1",
        "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36"
    }
    cookies = {
        "unpl": "JF8EAPxnNSttC0wDARIFHRREHAldW1UNS0cBbG8HUVVbH10GHwFJFBN7XlVdWRRKER9uZxRUW1NLXQ4fAisSFXtdVV9dDE4UAGlmNWQYGxsGUQcCExESTl9VXFgATxYAZ2cFXV5eV1cHGgcaFRNJXFFfWxRMFwtnZAFSVV1XVBkaMhgSIEptVFhZCEkQA2tlBVZVX0tWBRkHExcTTFtkX20IQxMzb2YEVVhdTFIGHQocIhBKXFVeWglLEQQBZmtUVVhOUgUcCx4XIEtUVFxVCUoXBGxXBGRcaB06BRoDGhAZTl9dWxAITRMDbWAFUF9YSVwCGwAbEBVDWFdZWzhKJwA",
        "shshshfpa": "5b4335f2-72bd-44db-f99b-c16e84211b03-1751361532",
        "shshshfpx": "5b4335f2-72bd-44db-f99b-c16e84211b03-1751361532",
        "__jdu": "17513615313961313494267",
        "__jdv": "181111935|lianmeng__10__kong|t_1001542270_1000160176_0_1914716844|tuiguang|b6f58677efe84941a3293492e8252c72|1751361882488",
        "TrackID": "15oT5xOKBY5CqM-3c1l_uOV3WGgjaiLodYF3_YQkukYAUrb0LqUdOMQ9WHnD3ahH4Bl5qjeeDPu9HU7bWpI2Fcal0CoV1uowyFvQhRHNzWfhRAy1_BnZvhocvwJg8PR53",
        "thor": "69C2FC866A1B21F51FFA2404A1C1A30C6C4990D0AE144D817361F7AE3013CCAC963BB107180F49F3C9E1970B747F58C8441F5CFC81EA4D299E05415032AB8F1F0BE7D1F1C15EDF0829BB13E762DCCDB70BE866B48312AC0CC10758CB0A68C2C1CD0FEA1392A41345F3FD61BD2C9D188334C726533628A14C2DB16D5DEC502EFADA7AB574A648C7D17F42487F4567AB07CF0E06AB860906D39EECED79416994ED",
        "light_key": "AASBKE7rOxgWQziEhC_QY6yayzCHkk6v7rgQx8XKsqSAN4ISnQRxgNJvbNieNm0Z398ijxw6",
        "pinId": "kMB4eluZ5PoGJpWHPfj8Lw",
        "pin": "jd_UCnbZWntJmrG",
        "unick": "jd_8v884w6hl5evwz",
        "ceshi3.com": "000",
        "_tp": "IMFc8H23YJfREbiVcY82EA%3D%3D",
        "_pst": "jd_UCnbZWntJmrG",
        "areaId": "22",
        "3AB9D23F7A4B3C9B": "VWA7INVDM7HAHTJ6RDXCKD4WQ4NEL7EPUTM25ERVZRHP6QRHL6CKLBIHX26AYVSOUA3QD5H4R32YJHTAO3IGWVG4FE",
        "PCSYCityID": "CN_510000_510100_0",
        "umc_count": "1",
        "o2State": "",
        "mt_xid": "V2_52007VwMUVl1aVVobSxleDWADEFJfXVpfHE4fbFFlABEBClEHRh8ZGQsZYlZHUkEIBQhNVRgJAmVXFVsND1oJFnkaXQZjHxNUQVhQSx9PEl0CbAMSYl9oUmobSRhdAmQAEVtbWGJfHkAf",
        "ipLoc-djd": "22-1930-50948-71603",
        "3AB9D23F7A4B3CSS": "jdd03VWA7INVDM7HAHTJ6RDXCKD4WQ4NEL7EPUTM25ERVZRHP6QRHL6CKLBIHX26AYVSOUA3QD5H4R32YJHTAO3IGWVG4FEAAAAMYANFDOHIAAAAAC3J6JKZMQMNGQQX",
        "jsavif": "1",
        "shshshfpb": "BApXSXKxCAP1AtZvigPqqb0tSqBk_56rZBhN3Eh1o9xJ1MkKcfo62",
        "token": "f6dc46829ff01cc58528d9367d18c77a,3,973557",
        "__jda": "181111935.17513615313961313494267.1751361531.1752397429.1752401742.3",
        "__jdc": "181111935",
        "flash": "3_r7sBNg107YOHUYeTY0HhnMBu74LFbArkeoUIPSQ5DdnHKumk71LYYwXRpO6D4UutGHrw0wFicbkSEaDU5TPdYs_7rH__otiv-yWGbF4dPGWxnC8WjdmIG-ZK6ZIANaGpwanY9xRQqebMyS3b5nFuYvyZNN6MBqK425alnGBNOldBKp_CS5U2",
        "__jdb": "181111935.63.17513615313961313494267|3.1752401742"
    }
    url = f"https://item.jd.com/{goods_id}.html"
    response = requests.get(url, headers=headers, cookies=cookies)
    sel = Selector(text=response.text)
    name = sel.xpath("//span[@class='sku-name-title']/text()")
    name = name.extract()[-1].strip()
    print(name)
    pass


if __name__ == '__main__':
    fetch_goods_infos(1000958438952)