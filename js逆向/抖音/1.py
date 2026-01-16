import requests


headers = {
    "accept": "application/json, text/plain, */*",
    "accept-language": "zh-CN,zh;q=0.9",
    "cache-control": "no-cache",
    "pragma": "no-cache",
    "priority": "u=1, i",
    "referer": "https://www.douyin.com/user/MS4wLjABAAAAORQDJTgle8ylXo70P_iuCFY_qKWAq20XO3955FOSPQw?from_tab_name=main&vid=7595194006935214710",
    "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36"
}
cookies = {
    "enter_pc_once": "1",
    "UIFID_TEMP": "37c879f32637ebc5496b02d59029bbf7616da5849e10d44e1e2ee2dac28cdd6b327e282adb5cd9bac207c95939bf3052ca9b047298fc5cfc572b23caa5173bbc1c82b81c1c872b65507cfb1ef4106a30",
    "hevc_supported": "true",
    "fpk1": "U2FsdGVkX19G7QWlXqUxHUZZknWgaGVWi2kZZroyXLXumJRS0LXJBy+XUmwtVGMpQ4eiozHEvqFFVeO/lH71hg==",
    "fpk2": "b977e10d1cb26107909e97d51a688323",
    "xgplayer_user_id": "633925706208",
    "bd_ticket_guard_client_web_domain": "2",
    "UIFID": "37c879f32637ebc5496b02d59029bbf7616da5849e10d44e1e2ee2dac28cdd6b327e282adb5cd9bac207c95939bf3052cab62eda037a630502004e631390f13f2f5ded707835fdd7a3699ed72e002ae7333b0446e3ef82c30cd948dfe1f24822f61dd79ef1462061c3a42c279b0d54cc69e75577237d80f52557f58fdbc482ba0c643fef5927aed930dc1f71d8ed07db2d40b5ec6f7c0c9db25228f75c53c366",
    "passport_assist_user": "Cj0qung0Zd4wYpHIfnez_7wlRB9dgTpFhGnQzXdfxm2H_A0iHKXyH-BO0xXYxOWruh4rQXHJSG_ZEngu0SDAGkoKPAAAAAAAAAAAAABPIIRXF47UBnrezRFB9GFRDiWAUMuCb60jfUG8_9MYnGNkPqNM-jXw-wmEFIMg-soDMxCjqfQNGImv1lQgASIBA4u_ZUc%3D",
    "uid_tt": "8cc736a13deb5567bd34305582e91aab",
    "uid_tt_ss": "8cc736a13deb5567bd34305582e91aab",
    "sid_tt": "eef6e6ac138947aba69646a5d2e10498",
    "sessionid": "eef6e6ac138947aba69646a5d2e10498",
    "sessionid_ss": "eef6e6ac138947aba69646a5d2e10498",
    "is_staff_user": "false",
    "login_time": "1750129157599",
    "SelfTabRedDotControl": "%5B%5D",
    "_bd_ticket_crypt_cookie": "3a546bc3855468c173cf71bdd9b2a1ab",
    "my_rd": "2",
    "SEARCH_RESULT_LIST_TYPE": "%22single%22",
    "session_tlb_tag_bk": "sttt%7C16%7C7vbmrBOJR6umlkal0uEEmP_________VRwiiWqAVLX0pe8nRHKAyU3qBo3nVQXWNE5oeOxrU4pQ%3D",
    "volume_info": "%7B%22isUserMute%22%3Afalse%2C%22isMute%22%3Afalse%2C%22volume%22%3A0.5%7D",
    "__live_version__": "%221.1.4.5023%22",
    "live_use_vvc": "%22false%22",
    "__security_mc_1_s_sdk_crypt_sdk": "da96591f-4c4a-b7a9",
    "__security_mc_1_s_sdk_cert_key": "f7cf43a6-4401-9e5f",
    "__security_mc_1_s_sdk_sign_data_key_web_protect": "f7179fdc-48a3-980e",
    "passport_csrf_token": "00e17623b55709fae66329609dfe66f7",
    "passport_csrf_token_default": "00e17623b55709fae66329609dfe66f7",
    "s_v_web_id": "verify_mjjfl029_sKZMQByr_WPRl_4zr6_8nbV_qeMOLMG9SePK",
    "__ac_nonce": "0696900dd005aac3333cc",
    "__ac_signature": "_02B4Z6wo00f01GTlqOgAAIDCV3BeqDdP1dBkxaxAAHBXc8",
    "douyin.com": "",
    "xg_device_score": "7.705142997892976",
    "device_web_cpu_core": "8",
    "device_web_memory_size": "8",
    "dy_swidth": "1440",
    "dy_sheight": "900",
    "FOLLOW_LIVE_POINT_INFO": "%22MS4wLjABAAAAwRNmNwPWhRHtYXGG4arD0jA3GNWEnUwdZVIOoz0YzBs%2F1768492800000%2F0%2F1768489289893%2F0%22",
    "publish_badge_show_info": "%220%2C0%2C0%2C1768489290107%22",
    "strategyABtestKey": "%221768489291.243%22",
    "ttwid": "1%7CbBStX3j56WmUwMPBMDriXamMc3O_UED4uTEn1po8lT8%7C1768489292%7C057d0f0a66d694a1cd44715b9e5720f7d4a49608e3a552c78bff9807c2400ae5",
    "odin_tt": "a3cab0a3222e90ef9029c184b63e5d1fcd2b51563810b0bd3893a3846ab55c80e1b4e352f968bbeebdd85414e4b39c406887b120bced5c146cd03cc62ef58ed97b9950bf5ea53e0783a68232a6dd9ac1",
    "biz_trace_id": "09289de2",
    "sdk_source_info": "7e276470716a68645a606960273f276364697660272927676c715a6d6069756077273f276364697660272927666d776a68605a607d71606b766c6a6b5a7666776c7571273f275e58272927666a6b766a69605a696c6061273f27636469766027292762696a6764695a7364776c6467696076273f275e582729277672715a646971273f2763646976602729277f6b5a666475273f2763646976602729276d6a6e5a6b6a716c273f2763646976602729276c6b6f5a7f6367273f27636469766027292771273f27353631323c373c3d313d333234272927676c715a75776a716a666a69273f2763646976602778",
    "bit_env": "ggpy5ZU6AJUZ_dd3pXTQMmyJQvhdKtSOwJSU30223WbmXhpgDTJtyMSLwoUKXVs1WmmYPnwIl0ss_vTbsAq0anYZ86UVaD09gwj5pBdOYycyPk_rEcUbIVhodTHhSy2GZDn4V9U2owFusbT2n9zB9RdwfRX1Vuweo6meVOrhaH1dl2LL04xgBmio5Q_N0EsKWK1hFWpMXCHY-bLp8HUk6zZfnk7Oqdgdu0c6TgvVHE6DATJG3w7luvi2A5ufl2aELADa4YXy87xVj-s7NEdbXczJg-gA9m3yqnqyFpQYmTo5tWRykTBEkM6wsMhhspBuZ99d2RzaK4zyrjrZePaQ68Ge6I6D3fMWoJbnVbKWQAp7nMz7ENWBwnwRyOCovtorn3zSH4Le2UNIjCX6QoG-Nn-D2MscTrJ84tsirj9qn7KZFgJreHXdXoUG8wojxlutk1phUQJsg5JQH7xFOR23d1rgGjN-xCbm_3u7RqUZJn-LYxQpjY_G2LrT5iWnxEa-t0C95-ilLZRotSTsWm6QxaYhYx2vEH5Fp2hPjB1UOCQ%3D",
    "gulu_source_res": "eyJwX2luIjoiNGQyZWY5YTQ5ZWRjMWRkODFjNjhhNDYzMTkwZDk5YzJlMTJhY2U4OTdjODg1Yzc5M2YzYTE0ODE0ZDQ1NGJkNSJ9",
    "passport_auth_mix_state": "eb90a2wa0twvv401t914ntebywirvjt4zmbo0z1rci6deu8h",
    "sid_guard": "eef6e6ac138947aba69646a5d2e10498%7C1768489297%7C5184000%7CMon%2C+16-Mar-2026+15%3A01%3A37+GMT",
    "session_tlb_tag": "sttt%7C12%7C7vbmrBOJR6umlkal0uEEmP_________UNbTjCAV_Eon3656I2CZenaUI6qXusDEUQiXhIBl7nkg%3D",
    "sid_ucp_v1": "1.0.0-KDkwMzdhODdiZWQ3MWU0YzdlN2ZjMjBjN2NjZWEyNDE0OGE5Y2Q0OTIKHwiqwbii9wIQ0YKkywYY7zEgDDDQhL_ZBTgHQPQHSAQaAmhsIiBlZWY2ZTZhYzEzODk0N2FiYTY5NjQ2YTVkMmUxMDQ5OA",
    "ssid_ucp_v1": "1.0.0-KDkwMzdhODdiZWQ3MWU0YzdlN2ZjMjBjN2NjZWEyNDE0OGE5Y2Q0OTIKHwiqwbii9wIQ0YKkywYY7zEgDDDQhL_ZBTgHQPQHSAQaAmhsIiBlZWY2ZTZhYzEzODk0N2FiYTY5NjQ2YTVkMmUxMDQ5OA",
    "is_dash_user": "1",
    "PhoneResumeUidCacheV1": "%7B%22100735525034%22%3A%7B%22time%22%3A1768489290123%2C%22noClick%22%3A2%7D%7D",
    "IsDouyinActive": "false",
    "bd_ticket_guard_client_data": "eyJiZC10aWNrZXQtZ3VhcmQtdmVyc2lvbiI6MiwiYmQtdGlja2V0LWd1YXJkLWl0ZXJhdGlvbi12ZXJzaW9uIjoxLCJiZC10aWNrZXQtZ3VhcmQtcmVlLXB1YmxpYy1rZXkiOiJCQ3NDTzArUE1lMFJ3TWRYM3dlZmVEeE1Hbk45RlZkRHNSU2hhaHZadU5ZMjhJUnpOR0QrMElEZ09ZQ2xPL2xTRHRlSGs0eVNzeFZsQTJsQzBmSDYvSGc9IiwiYmQtdGlja2V0LWd1YXJkLXdlYi12ZXJzaW9uIjoyfQ%3D%3D",
    "bd_ticket_guard_client_data_v2": "eyJyZWVfcHVibGljX2tleSI6IkJDc0NPMCtQTWUwUndNZFgzd2VmZUR4TUduTjlGVmREc1JTaGFodlp1TlkyOElSek5HRCswSURnT1lDbE8vbFNEdGVIazR5U3N4VmxBMmxDMGZINi9IZz0iLCJ0c19zaWduIjoidHMuMi5mNjhmZDBlODY1MjYwN2I1NTM0OTNiODkyODZlYmY1YWU3MjNkOTI3NmM4NTA2NDUxMDQ3ZDI2NmVmOTdiY2JiYzRmYmU4N2QyMzE5Y2YwNTMxODYyNGNlZGExNDkxMWNhNDA2ZGVkYmViZWRkYjJlMzBmY2U4ZDRmYTAyNTc1ZCIsInJlcV9jb250ZW50Ijoic2VjX3RzIiwicmVxX3NpZ24iOiJiZzV5MlZ1SkhHTHloQlorWmUvTy9Hb3gyYkFTZnd4SWN1N0l4WDd3dy80PSIsInNlY190cyI6IiMzdkUwa0pGajk5MkxCdVJXb1Ntdm1CQ2o2bGs1a2JPcENMQVZQaElrcnpqWDFrbUR1MjZuaUhNWS9oVHcifQ%3D%3D",
    "home_can_add_dy_2_desktop": "%220%22",
    "stream_recommend_feed_params": "%22%7B%5C%22cookie_enabled%5C%22%3Atrue%2C%5C%22screen_width%5C%22%3A1440%2C%5C%22screen_height%5C%22%3A900%2C%5C%22browser_online%5C%22%3Atrue%2C%5C%22cpu_core_num%5C%22%3A8%2C%5C%22device_memory%5C%22%3A8%2C%5C%22downlink%5C%22%3A10%2C%5C%22effective_type%5C%22%3A%5C%224g%5C%22%2C%5C%22round_trip_time%5C%22%3A100%7D%22"
}
url = "https://www.douyin.com/aweme/v1/web/aweme/post/"
params = {
    "aid": "6383",
    "sec_user_id": "MS4wLjABAAAAORQDJTgle8ylXo70P_iuCFY_qKWAq20XO3955FOSPQw",
}
response = requests.get(url, headers=headers, cookies=cookies, params=params)

print(response.text)
print(response)