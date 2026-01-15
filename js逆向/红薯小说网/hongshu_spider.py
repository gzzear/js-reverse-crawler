import requests


headers = {
    "Accept": "application/json, text/javascript, */*; q=0.01",
    "Accept-Language": "zh-CN,zh;q=0.9",
    "Cache-Control": "no-cache",
    "Connection": "keep-alive",
    "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
    "Origin": "https://www.hongshu.com",
    "Pragma": "no-cache",
    "Referer": "https://www.hongshu.com/content/82284/137944-12152994.html",
    "Sec-Fetch-Dest": "empty",
    "Sec-Fetch-Mode": "cors",
    "Sec-Fetch-Site": "same-origin",
    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36",
    "X-Requested-With": "XMLHttpRequest",
    "sec-ch-ua": "\"Google Chrome\";v=\"143\", \"Chromium\";v=\"143\", \"Not A(Brand\";v=\"24\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"macOS\""
}
cookies = {
    "_ga": "GA1.1.943369750.1767593673",
    "__uuid__": "2ede2929-2323-04ef-a1d2-a55be792e63b",
    "PHPSESSID": "d7ph43f5sjqqb7sl6sabcudhc3",
    "Hm_lvt_5268a54e187670ee0953ba36efee746a": "1767593675",
    "HMACCOUNT": "DA5A6E10A4984465",
    "Hm_lpvt_5268a54e187670ee0953ba36efee746a": "1767599944",
    "hsclastchapter82284": "%7B%22title%22%3A%22%E7%AC%AC8%E7%AB%A0%20%E5%8F%88%E4%B8%80%E4%B8%AA%E7%BE%8E%E5%A5%B3%E5%A7%90%E5%A7%90%22%2C%20%22bid%22%3A%2282284%22%2C%22jid%22%3A%22137944%22%2C%22cid%22%3A%2212152994%22%2C%22curpos%22%3A%228%22%2C%22total%22%3A%224306%22%2C%20%22addtime%22%3A%221767606179%22%7D",
    "_ga_0YS75Q4BJM": "GS2.1.s1767622377$o4$g0$t1767622377$j60$l0$h0"
}
url = "https://www.hongshu.com/bookajax.do"
data = {
    "method": "getchpcontent",
    "bid": "82284",
    "jid": "137944",
    "cid": "12186402"
}
response = requests.post(url, headers=headers, cookies=cookies, data=data)

print(response.text)
print(response)