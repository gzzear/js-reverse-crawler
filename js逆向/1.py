import requests


headers = {
    "accept": "application/json, text/plain, */*",
    "accept-language": "zh-CN,zh;q=0.9",
    "content-type": "application/json;charset=UTF-8",
    "origin": "https://mobile.yangkeduo.com",
    "referer": "https://mobile.yangkeduo.com/mtab_pdv_sem.html",
    "sec-ch-ua": "\"Not(A:Brand\";v=\"8\", \"Chromium\";v=\"144\", \"Google Chrome\";v=\"144\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"Windows\"",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-origin",
    "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36",
    "verifyauthtoken": "LTQntO5xB69g-Y1ZE-UBjQ5aec3cac4e2ca0871",
    "who": "an_nuo_tai_shan_0"
}
cookies = {
    "api_uid": "CiqaUmmJeMyp8ACCCWnBAg==",
    "_nano_fp": "Xpm8X0Eanq9qn0TanT_N~15xr72cAFtl6nC8Snvg",
    "webp": "1",
    "njrpl": "YYaS6Weu5hYaZQi2fXPgaQwwycbQpZrP",
    "jrpl": "YYaS6Weu5hYaZQi2fXPgaQwwycbQpZrP",
    "dilx": "~VurHaF88~SZhQKTtEKbT",
    "PDDAccessToken": "3KXAVAOCBKMGCCFO3NTYXXCKQKNFUCYZAV7YPHLG4ZKOCWO7TTDQ1210872",
    "pdd_user_id": "6846627679496",
    "pdd_user_uin": "DK6BSI7322Q44MKA7XEPGM3MPY_GEXDA",
    "pdd_vds": "gaAdjbMlFEjIzEAIpIkIKsJdpOqdpxKySyMtFlKGpxAwWmMwMEpGjtqtHIKx"
}
url = "https://mobile.yangkeduo.com/proxy/api/api/jade/lizard/new_tarot/ds"
params = {
    "pdduid": "6846627679496"
}
data = '{\n    "goods_id":"817297054609",\n    "keyword":"{search_key}",\n    "cmm_ds_id":"g001",\n    "nt_request_id":"7ff3a016d01b4940badc00a147336223",\n    "sn":"nt_54b74b17",\n    "anti_content":"0asAfxiF0ioyy9Ex1lP4kFD9aX_cY_FgoVQDnN3c2sxS0TvuWLChF1d4vF7RRxmbUQe51Jk04ZPVDg59aXH6a0gqOY4qXV6b2hdcswZTRUqQ5NiYUtHv_hv8FnidjjFzDxLtKIXY8-PV2f6aefblwumYF_zbDFpA8cSweZaqs5bDQObzwMpnIXs_AOHC-nJb_xf8u3sJ7i1sU7IphqglPR8bBk9oWdjacrIDa3xTklLdJS3WWl8OrSJRRrw9qTJeTZDB-tCHO9SXFP_-ssGkk1tmrG3j1-uuILhmgSG1sHaP7isax4GMZ42x1wB6HiECegnegMTiOgzT6dWss0u9yEmV8wt3OmygYds4TKg5AX5A8Ci2Zsug59Cr1Go97lwmFegzvdsLWH94Wex_MNSMNEOeo1XLhXKk_zwelQPuFkoekjPduXj0HXTwIeRgI80urWnZp3GpOhee1R6GkAoEMnRbW5RlFz6mlMm28lO7prLHU8T2Y_LyW3R2RHIjCq4Itz8bXWrfFJatzQQqD4XumXyYzSdnEf8RiluGidQxOLDYjNQ91xEe8zQhwQDqZS1iYZeSY6rwpGlhdo78XiXtxU3CLLvyGpyAmLN9wMDv5B8REUtYRIozhyQq3lbq8dMNcbU",\n    "tarot_sn":"nt_54b74b17",\n    "nt_session_uid":"ba20f6735b3f444e9e2a9eee5b09fc34_1770617360638",\n    "nt_source_scene":"add_sem_req",\n    "nt_activity_type":"sem_inner_lp",\n    "nt_activity_id":55006,\n    "nt_activity_sub_type":"main",\n    "nt_tid":"167d214f503e496b8d1eefd7b84c13ae",\n    "page_sn":"123853",\n    "nt_trace_id":"sem_e0af17e72af34824bfc23f4f0865c562",\n    "nt_trace_step":"0",\n    "ads_channel":"baidu_seo",\n    "nt_token":"19979d342595470f2_1770617360595",\n    "screen_width":2560,\n    "screen_height":1440,\n    "network":4,\n    "nt_trace_page_type":"ACTIVITY_SUB_UID",\n    "nt_trace_page_value":"sem_inner_lp_55006_main"\n  }'.encode('unicode_escape')
response = requests.post(url, headers=headers, cookies=cookies, params=params, data=data)

print(response.text)
print(response)