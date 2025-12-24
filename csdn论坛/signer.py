import hashlib
import hmac
from base64 import b64encode
from urllib.parse import urlparse

import execjs
import requests


class Signer(object):
    def __init__(self):
        self.none_func = execjs.compile('''
            f = function(e) {
                var t = e || null;
                return null == t && (t = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (function(e) {
                var t = 16 * Math.random() | 0;
                return ("x" === e ? t : 3 & t | 8).toString(16)
                }
                ))),
                t
            }
            ''')

    def get_path(self, url):
        parse_result = urlparse(url)
        path = f"{parse_result.path}?{parse_result.query}"
        return path

    def generate_signature(self, url, accept, nonce_str, cakey, appSecret):
        data = ""
        data += "GET"
        data += "\n"
        data += f"{accept}"
        data += "\n\n\n\n"
        data += f"x-ca-key:{cakey}"
        data += "\n"
        data += f"x-ca-nonce:{nonce_str}"
        data += "\n"
        data += self.get_path(url)
        data = data.encode('utf-8')
        signature = b64encode(hmac.new(appSecret.encode("utf-8"), data, hashlib.sha256).digest()).decode('utf-8')
        return signature

    def get_html(self, url):
        none_str = self.none_func.call("f")
        accept = "application/json, text/plain, */*"
        cakey = "203899271"
        app_secret = "bK9jk5dBEtjauy6gXL7vZCPJ1fOy076H"
        headers = {
            "accept": f"{accept}",
            "accept-language": "zh-CN,zh;q=0.9",
            "cache-control": "no-cache",
            "origin": "https://bbs.csdn.net",
            "pragma": "no-cache",
            "referer": "https://bbs.csdn.net/forums/thjs?category=0",
            "sec-ch-ua": "\"Google Chrome\";v=\"137\", \"Chromium\";v=\"137\", \"Not/A)Brand\";v=\"24\"",
            "sec-ch-ua-mobile": "?0",
            "sec-ch-ua-platform": "\"macOS\"",
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "same-site",
            "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36",
            "x-ca-key": f"{cakey}",
            "x-ca-nonce": none_str,
            "x-ca-signature": self.generate_signature(url, accept, none_str, cakey, app_secret),
            "x-ca-signature-headers": "x-ca-key,x-ca-nonce"
        }
        resp = requests.get(url, headers=headers)
        return resp.status_code, resp.json()
