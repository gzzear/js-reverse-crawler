from DrissionPage._base.chromium import Chromium

chrome = Chromium()
tab = chrome.latest_tab
tab.get("https://sx.10086.cn/rr/lnwd/h5view/index.html#/DetailsPage?id=d82b96b157fa434a8e5aad96aaeb0a18&linkId=0a459c84a6fa4953b8c67e54c7e8c6b8&type=1&application=1&_su_pass=_sunc_vl&fxstype=fxsedit")
tab.ele(".van-field__control").input("15203599992")
tab.ele(".van-icon van-icon-success").click()
tab.listen.start("/rr/lm/distributorGoodsDetail/sendYzm.do")
tab.ele(".getcode").click()
for p in tab.listen.steps(1):
    print(p.response.body)
tab.listen.stop()