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
    "anti_content": "0asWfxivdcoyj9eAmIygMfSKQZQIfE9rquy9cWlS24GI5pla8fAfb3iejiClr3fFaaK9anp4qnppjkBB29UTbB_F_R9xsNVznquOxaASvRCUO32V8gQUozcPLQyI1ia64extZf80uOydqeXaKbf3-f4fU7mvzaNh3v_MU_j8W9sS_unz_gC_VdMyExnpEnyCn6TRbhHtdeEuJvatyCcvQyIc605f7RMrI4b4mJ2-7NhWqwA2cb3HxF7rHpkcYo1NTShYho0iVl_-0zAF9xz3vzlgIE6VImIKI0hENKI68qG6e7oTFishgmHLLTza5vmz2pwvjVWSXZaUg1tLha1Lfwytu0W96bTZg0VPyBfcslVz-7_0fQb5q5Sp2KHIW4F8RLrY5lwK0a2AUXQqpMaOUS24pCPgOoGfWU2tkqUCqCmFr04OGfLJr2tzLgqBkzB-45ER7kwReDRTlieIxYQwSCL3UkkN9gOs7cvztjz8PGno-dhgWkQ2MAh7KGNh-WGQGro4hGoDIIFDrfOIXXgtrcrsHI3Knn5nNC8Y0DcLeE3nUTdkolUbyoUaLCCoR3GTvhZbJUHlwyN5Q8bZDUdKUshvkRp0SkOeOuRXeM6ebahO_ngjtnwPuWM0FECM_Gndbm393D6ONM7lLdaG"

}
response = requests.get(url, headers=headers, cookies=cookies, params=params)

print(response.text)
print(response)