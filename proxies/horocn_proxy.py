class horocn_proxy():

    def __init__(self):
        self.proxy_host = 'dyn.horocn.com'
        self.proxy_port = 50000
        self.proxy_username = 'BEAP1838519720337561'
        self.proxy_pwd = "farCZ560bWTd1BY0"

    def get_proxies(self):
        proxyMeta = "http://%(user)s:%(pass)s@%(host)s:%(port)s" % {
            "host": self.proxy_host,
            "port": self.proxy_port,
            "user": self.proxy_username,
            "pass": self.proxy_pwd,
        }
        proxies = {
            'http': proxyMeta,
            'https': proxyMeta,
        }
        return proxies
