import requests


headers = {
    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:146.0) Gecko/20100101 Firefox/146.0",
    "Accept": "application/json, text/plain, */*",
    "Accept-Language": "zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2",
    "Accept-Encoding": "gzip, deflate, br, zstd",
    "Connection": "keep-alive",
    "Referer": "https://xueqiu.com/",
    "Sec-Fetch-Dest": "empty",
    "Sec-Fetch-Mode": "cors",
    "Sec-Fetch-Site": "same-origin",
    "Priority": "u=0"
}
cookies = {
    "xq_a_token": "a5cd2fa0820cd6e296940c4fbb3857c63726317f",
    "xqat": "a5cd2fa0820cd6e296940c4fbb3857c63726317f",
    "xq_r_token": "59531b7fc232bc039426721287cfb3a5082dba46",
    "xq_id_token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJ1aWQiOi0xLCJpc3MiOiJ1YyIsImV4cCI6MTc2OTM5MDMzMywiY3RtIjoxNzY2OTcxOTc2MDU0LCJjaWQiOiJkOWQwbjRBWnVwIn0.jlE_HTD6qyU-VJhul1Q7Al9DJTX2V8trYWsLoGCy51n9ruRZHPwnvlFG8TbrRXsDgUNHeEDrS5PhNpRrr2C4ULoQOZlJGaH4Doxnl6O3APX3gtjNz8r5qEP0mwyd2lxbfRvnFfsRu7WSH5N0X_txIj7rkaJM0S_jVgmQ0WmVwmc_iOeOJsKLCZ6dpdUKx6t9Fm2KVc_Bd5zyZF5w8YbP9RIP9jsriuQehjBs9eiTjn-GVS11ZtGqfL5dZ3zyjS1vP56anks36-OfACzicQYETKKO9ugBMQgoRY_IJb2bdtS5PjIIJuPQ-ux_HFZLKMdrfc9RdmVSk_AREeBr60CpSA",
    "cookiesu": "371766972013331",
    "u": "371766972013331",
    "device_id": "60130eecc9620b6164c174b852eb0169",
    ".thumbcache_f24b8bbe5a5934237bbc0eda20c1b6e7": "TY2MKrNUVoV0rEGe658D3qaFYGG1gVBH1TXksHd/TlZIlPhlh2nyrKILTgo8UIx9bzEpvFvVueym8ZYoZEGgUQ%3D%3D",
    "smidV2": "20251229093334c890f643e07354ec2ca8ad2781e63eac003da7a913e1c5080",
    "_c_WBKFRo": "B8bIXAoi5OT6M9MBJQSnkPPHenmLsIdseoXgOZ2Y",
    "_nb_ioWEgULi": "",
    "ssxmod_itna": "1-QqUxc7itDQD=iQdi7XeiQG=edGjheiI5DXDUqAQdGgBDFqAPiDHKmsQBKsY00bD0h0q=VDc7WwsmQDGXkwDA5Dnzx7YDt=SaRPSQGgLxhtxrYxE5G/6GoxijsnAxk4=Y0m=CcG8V9EC97YNIeMhxK2GUDAooD7QDb4DyDGUTDG6r/OeD44DBSnRTDDePsDDFePGyDitraxGnDA6H6W_aORTiNOmx7LyrmjbdocrrxBoDIbWD0bnYj2GrSfoqsBveIkDQtbm1QAGeNWMKDgL5_T51z_mUDD3mDOeQb5_gundIl2EZMfDi07xsoYo7eeC5ZYxoDeqGCpOooCkU2D2LdfrDD",
    "ssxmod_itna2": "1-QqUxc7itDQD=iQdi7XeiQG=edGjheiI5DXDUqAQdGgBDFqAPiDHKmsQBKsY00bD0h0q=VDc7WwsmDDcYq=KQ4mYDLDSH4fN5DGXx7n/GSGUGQiPSBKCVO627iCs=iL8gXkTFtZjqFXG32nq05/xqDkAx=B3x4ASp5YkjU_j=YkAXcQDjH0etXtdIQgbeiARvjDxAz0iUu/htVmMhyY0rZ_xw7wQieFBoUilnBf0n7CQ_e87xbqCxSbmd2G7RZj4iC=a0UR8vKCWYQQDH2WpfeQYBDXxjv7/puSdUgtM9cGCGjzxg5zitw=5im9wIIVS5veRc7GV_hubBD3Rz0IEGBz35_b5mCe7maQAu/4WNW5GbiLDemA_iIpujuCtyviOjtbV4_bYrenRTtc=tq=oG=pI7i0k0DNE4jmKG9eBD248wY9euSvFni3k8kzD2W3KQPxI4FrHiE8HVSEY0YFDKWb4nx81dkyrNbi4DhsI_iCM4KrW_R4eD",
    "acw_tc": "ac11000117669912620153098e6240fe52ae1befeed2cb0e3a331a235c655e"
}
url = "https://xueqiu.com/statuses/hot/listV3.json"
params = {
    "page": "5",
    "last_id": "368106664",
    "md5__1038": "28178cb220-IYRgpqCcBszQTAEzIgRiRAfEwzxuohrIrtgAzQDs55AHNldbfCHfgKzmYAeAKgBYOPAOLQALgDUAkuT4A5AGIBHEQC8A9HXLiATgA0ArsoAyingAkAngGtEkgG4B7ACIBFAAo8PfB24C8jBzU8OTwHJB0AgDMmPDR0ewgrJBQkOSJOBwcqEA"
}
response = requests.get(url, headers=headers, cookies=cookies, params=params)

print(response.text)
print(response)