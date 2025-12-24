from DrissionPage import Chromium
from DrissionPage import ChromiumPage

if __name__ == '__main__':
    web = Chromium(9334)
    web.latest_tab.get("http://www.baidu.com")