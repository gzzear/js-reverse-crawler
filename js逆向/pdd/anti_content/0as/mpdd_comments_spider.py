import requests


headers = {
    "accept": "application/json, text/plain, */*",
    "accept-language": "zh-CN,zh;q=0.9",
    "cache-control": "no-cache",
    "pragma": "no-cache",
    "priority": "u=1, i",
    "referer": "https://mobile.yangkeduo.com/mall_certificates.html?_t_rpn=mall_comment&mall_id=851555556&msn=pofblc4t3j4jcyjg5xmsbn3uam_axbuy&goods_id=887704706372&_x_link_id=a513ac0950be11d16f3afe60256db4e7&_x_goods_id=0&refer_page_name=goods_detail&refer_page_id=10014_1768210139285_j9gdqtjyf1&refer_page_sn=10014",
    "sec-ch-ua": "\"Google Chrome\";v=\"143\", \"Chromium\";v=\"143\", \"Not A(Brand\";v=\"24\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"macOS\"",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-origin",
    "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36"
}
cookies = {
    "$api_uid": "CiwDtWlhAcGjGACfDAZhAg==",
    "_nano_fp": "XpmjnqUjnpgxX5dYn9_e5QkzUpO98vBzCxkajXMf",
    "webp": "1",
    "jrpl": "4Fg0HwS77fUcql42jwpIfXpA9L4B5fDp",
    "njrpl": "4Fg0HwS77fUcql42jwpIfXpA9L4B5fDp",
    "dilx": "zO9eKs9Iw~cJOljFJIr3F",
    "chat_config": "%7B%22host_whitelist%22%3A%5B%22.yangkeduo.com%22%2C%22.pinduoduo.com%22%2C%22.10010.com%2Fqueen%2Ftencent%2Fpinduoduo-fill.html%22%2C%22.ha.10086.cn%2Fpay%2Fcard-sale\\u0021toforward.action%22%2C%22wap.ha.10086.cn%22%2C%22m.10010.com%22%5D%7D",
    "PDDAccessToken": "W5NXT2FMYR3QL7WMAP2FNO2H5ED2QWDSDFS236XJ2RFYLNAZ5VGA120d1bf",
    "pdd_user_id": "7638744964305",
    "pdd_user_uin": "LV3EGMI4DW25A5FXQW5UDQARXI_GEXDA",
    "rec_list_personal": "rec_list_personal_44y360",
    "pdd_vds": "gaLLNyytPNamGbEitLEtbmEtOtoImLGoGbOtnoNmbmiQmLPPtNtaiiLGtLti"
}
url = "https://mobile.yangkeduo.com/proxy/api/api/selene/mall/review/label/list"
params = {
    "pdduid": "7638744964305",
    "brand_id": "0",
    "mall_id": "851555556",
    "goods_id": "887704706372",
    "msn": "pofblc4t3j4jcyjg5xmsbn3uam_axbuy",
    "page": "3",
    "size": "40",
    "label_id": "0",
    "is_new_api": "false",
    "cursor": "",
    "list_id": "mall_comm_270i3fbkka55oim7",
    "refer_page_sn": "10014",
    "isMallCommentType5": "false",
    "anti_content": "0asWfxidDRGy899pTAZ26sJlmFFQu0FqRigH85kI8-cMHDy8IkJZ4wnFLAf-qinoAk_0cG2T72xgOB-ILh0lQKSh95lA5SzajSWNS5NxRQxpMKdu7tMrMOxPCSLtmO5rXXye4Ko53faoOsXV2gDEpxCXYs2LCnDLOf3TxdjatM9y8_fCRw5GJBGVl0BDQKtssWDqTG1MyPWGrne83BrgFFcCaoyI0ulDxxrQlSH8xBl1Vlr4wpnTfy8iWbVSGbbJ6cY8SrP4wIS4Ua62Pb6o4TRbwwevp-wFb3iAB0AAkrYROh4iq1EHWLdMxrWappjzPF2uGJS2p9UW2yAKYOe4vQLtn0igWJT6693qv7lkpJQyJ9kR-jPzg-TBgBMLiJ8vmiLptma4zFY02fNpZcxVv6PmIG9VGRVwir4tR4AqGrh3B5eHEbGNLZy1QFOyixTB5krmur7jBjYe3_fcJwL5rWJYZTE7VDBvT1k1kl3GLR0O5ZSYvJm-jD2hVI2FRooYArraOCr55qK55ZIO5V9LC09V0W7efHBWM9hpujE7lH7OwbjB1iH78hCCSLE0Giuwf3-8vvs2Hk6pGNs5ud5QMIwQOguefSEiQOFaYDqgwa5kY9VnogVcgx5gC50RF7i1IVA6mIq8fEJ1Q9A"

}
response = requests.get(url, headers=headers, cookies=cookies, params=params)

print(response.text)
print(response)