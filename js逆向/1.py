import requests


headers = {
    "accept": "application/json, text/plain, */*",
    "accept-language": "zh-CN,zh;q=0.9",
    "anti-content": "0asAfxn5rjcyj99VAyPjtsZw8t3gySFHti57jNDZt5aG7eSGzZpaSbeGXuam-q5WYcBX0goPGg5s1_HDgYNh9PpEykEthgd2XT0SGXm67JWm0SNaqBqhM8NNKe7cAJvYqaFVil-OB-tRSbSKh-dfDBo0IQsXKLOmZ6tdJBw3rnkSg8kJQiD9YDIkjVputYKXcrKnjmHL3RX3_QGB_5gr_g0QWwl77wlpSyYDa2Ewabac0mDAAioHqi1YrrwL8-1C5_HEBJM1q48V0s4-CwjRBwYLQB77rWV-1yIqcMYFelqEgU_ZUZ9SlcggmckhteJo_2IbCpH2h2b40oCod249pb9wFgUHwOQ5jU5PVUGHC1LaqDPlDUsgIkXCwv6xqo9-GptyjZdssz9WotBbpxH80qFeumIdZyIeVme_UHQ5HPH0RSkfcugkKCLOGao9syrzbjWqYW3rVKz3ujMwvmvBkGnueXiPb8Dd4lxGZY0M2Q0KNkZJqq9WRGWy3iMRjqcGdfr7nVYKLVBIuFl_KO_-b36uOTRm4eOvff6K-Rza4NMKBjOhx7dK8dDc8d31D3Yzq36KqXDDZtW7eEJKQ9q",
    "priority": "u=1, i",
    "referer": "https://mobile.yangkeduo.com/goods.html?goods_id=878497893729&uin=LV3EGMI4DW25A5FXQW5UDQARXI_GEXDA",
    "sec-ch-ua": "\"Chromium\";v=\"146\", \"Not-A.Brand\";v=\"24\", \"Google Chrome\";v=\"146\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"macOS\"",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-origin",
    "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36"
}
cookies = {
    "_nano_fp": "XpmjnqUjnpgxX5dYn9_e5QkzUpO98vBzCxkajXMf",
    "webp": "1",
    "dilx": "ggCtro0JLBtAzWoHuKyli",
    "jrpl": "aQnl0EgoCRoc9Tap2wW7qGPqRxrVgSQN",
    "njrpl": "aQnl0EgoCRoc9Tap2wW7qGPqRxrVgSQN",
    "api_uid": "CiwDtWlhAcGjGACfDAZhAg==",
    "PDDAccessToken": "F2ZEMLYIZIBNWIZ25TTJOPX7C3ACWRDYOJHEUZM3CCR4HKZHLOJA120d1bf",
    "pdd_user_id": "7638744964305",
    "pdd_user_uin": "LV3EGMI4DW25A5FXQW5UDQARXI_GEXDA",
    "rec_list_personal": "rec_list_personal_3ic9au",
    "pdd_vds": "gaZZvDBYhvTDrhYfvcTCTrCrYufYDrrBeelZhdDYeDfxvhxCBThuDxDBhxfD"
}
url = "https://mobile.yangkeduo.com/proxy/api/api/caterham/query/goods_detail_with_tags"
params = {
    "pdduid": "7638744964305",
    "page_sn": "10014",
    "list_id": "goods_detail_3oams8",
    "app_name": "goods_detail",
    "page": "1",
    "goods_id": "878497893729",
    "show_tags": "4",
    "anti_content": "0asWfxidDhlyy99uPr5F2451pSF4cyfN6oi94GaR7GlaJsN3fabnfkulQDB7IAUD23lVvfTPnsTy54-1kv9-6a4f_dnAygldkX1eU_ktdeYvtlKKxnjvyOPtweQzwDZgBEwdav3SgkpfzDBBGgxx1XsFx4doCVHCp51I3GBN_H6kYPT6oKb_Qjqp62inBxY3CvqXg7LO1puzp3IWSP6FXatv3aWuijOruShKtWoRUVWloE318VBkUz1iJoxRl7RYcoU3Vn2byw2gpdVteKO4l9fHqV9IGaK9-s_SnJJ8iLDGjXZIB9jorveuogze-S99KkUpro2BlEgG3fSu4OSddEC0GH71Y8k3JaWRXKeHwussV8UO9Xf4y_sgz7LcnlNr-IQLTqMgzjBbx_Cyde_EZ_xo4TqJ9JKCU9n_o5oOUoj4UpG3bWswDYxaB_dkJbgHctczATyu7zRnpe1XQlLyJmJ_pdofM8oNlE6HUYOoqInuU6aSBHMEVjChSlyoMxilQSo4xAotHtKt1tFqeGPVCji9Lboq02GiGg3XJvUWIBApo_b7oimRjHr-QqRiRUDNY5aGGhI5BX6q9aDFsVngIPBLw6mT1kfYD26mMqUgXgHe0FlOdF9Kzd_5N9CjgAIsy7i9efPOahznLpaA"
}
response = requests.get(url, headers=headers, cookies=cookies, params=params)

print(response.text)
print(response)