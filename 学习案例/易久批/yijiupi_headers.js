const CryptJS = require('crypto-js');

const e = {
    'b_r': function (e, n, t, a, i) {
        var o, u;
        try {
            var _ = l(e, r.__wbindgen_malloc, r.__wbindgen_realloc)
                , s = c
                , f = l(n, r.__wbindgen_malloc, r.__wbindgen_realloc)
                , d = c
                , b = l(t, r.__wbindgen_malloc, r.__wbindgen_realloc)
                , w = c
                , y = l(a, r.__wbindgen_malloc, r.__wbindgen_realloc)
                , v = c
                , h = p(i) ? 0 : l(i, r.__wbindgen_malloc, r.__wbindgen_realloc)
                , m = c
                , x = r.b_r(_, s, f, d, b, w, y, v, h, m);
            return o = x[0],
                u = x[1],
                g(x[0], x[1])
        } finally {
            r.__wbindgen_free(o, u, 1)
        }
    }

};

function ja(t, e) {
    function n(t, e) {
        var r = C();
        return n = function (t, e) {
            t -= 378;
            var n = r[t];
            return n
        }
            ,
            n(t, e)
    }

    var r = n;
    (function (t, e) {
            var r = n
                , o = t();
            while (1)
                try {
                    var a = parseInt(r(412)) / 1 * (-parseInt(r(415)) / 2) + parseInt(r(413)) / 3 * (-parseInt(r(402)) / 4) + -parseInt(r(380)) / 5 + -parseInt(r(381)) / 6 * (parseInt(r(405)) / 7) + parseInt(r(382)) / 8 * (parseInt(r(393)) / 9) + parseInt(r(387)) / 10 * (parseInt(r(407)) / 11) + parseInt(r(384)) / 12 * (parseInt(r(406)) / 13);
                    if (a === e)
                        break;
                    o["push"](o["shift"]())
                } catch (c) {
                    o["push"](o["shift"]())
                }
        }
    )(C, 167685);
    var o = !1;
    if (("undefined" === typeof window ? "undefined" : 'object') !== r(391) && (o = !0),
    void 0 !== ("undefined" === typeof navigator ? "undefined" : 'object') && 'string' === r(392) && (o = !0),
        !o)
        return !1;
    for (var c = [], i = "0123456789abcdefghijklmnopqrstuvwxyz", u = 0; u < 36; u++)
        c[u] = i[r(416)](Math["floor"](16 * Math[r(378)]()), 1);
    c[14] = "4",
        c[19] = i[r(416)](3 & c[19] | 8, 1),
        c[8] = c[13] = c[18] = c[23] = "_";
    var s = c[r(410)]("")
        , d = (new Date)[r(386)]() / 1e3
        , l = parseFloat('1767496631.368' || d)
        , f = parseFloat('1767496631' || d)
        , p = f + (d - l);
    p = (p + "")[r(389)](".")[0],
        t[r(401)] = t[r(401)] || {};
    var h = JSON["stringify"](t["data"])
        , m = CryptJS.SHA1(h).toString()
        , v = t["method"] == r(400) ? "POST" : r(390)
        , g = e[r(411)](v, t["url"], p, s, m)
        , b = localStorage[r(395)](r(383)) || ""
        , y = b || p;
    t[r(408)]["token"] = b || "",
    (t[r(404)] || t[r(397)][r(398)]("/himalaya-ApiService-UA2")) && (y = p,
        t[r(408)]["token"] = "");
    var k = e["a_h"](y, g)
        , W = k[r(379)]();

    function C() {
        var t = ["userAgent", "url", "startsWith", "x-sign-nonce", "post", "data", "221512NuwFCj", "x-sign-algorithm", "noRequireToken", "231BuPobs", "26fFBZBA", "11cEYjsy", "headers", "x-sign-version", "join", "b_r", "2715uEnxmD", "3MdZxcw", "s_h", "18CGPAoh", "substr", "x-sign", "random", "toString", "310105hOyCUt", "14952ZUVKbT", "41288KYnVGH", "TOKEN", "75432PNmrTA", "2.0", "getTime", "2243530XVnAJQ", "x-sign-timestamp", "split", "GET", "undefined", "string", "270GNWmOw", "HMAC_SHA_1", "getItem"];
        return C = function () {
            return t
        }
            ,
            C()
    }

    t["headers"][r(417)] = W,
        t[r(408)][r(399)] = s,
        t["headers"][r(409)] = r(385),
        t[r(408)][r(388)] = p,
        t[r(408)][r(403)] = r(394)
}

ja({
    "url": "/v58/Product/List",
    "method": "post",
    "data": {
        "currentPage": 3,
        "data": {
            "brandIds": [
                "3688"
            ],
            "searchModes": [
                2
            ],
            "sort": 0,
            "currentPage": 3,
            "pageSize": 25,
            "filterSpecialArea": false,
            "searchSource": 1,
            "searchKeyNotCorrect": false,
            "brandId": ""
        },
        "pageSize": 25,
        "cityId": 402,
        "countyRegionId": "320116",
        "userClassId": 1,
        "userDisplayClass": 0,
        "addressId": "",
        "deviceType": 3
    },
    "headers": {
        "common": {
            "Accept": "application/json, text/plain, */*"
        },
        "delete": {},
        "get": {},
        "head": {},
        "post": {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        "put": {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        "patch": {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        "appCode": "ShoppingMallPC",
        "UUID": "edb1e97abd6140eb8355bf4243d27167"
    },
    "transformRequest": [
        null
    ],
    "transformResponse": [
        null
    ],
    "timeout": 0,
    "xsrfCookieName": "XSRF-TOKEN",
    "xsrfHeaderName": "X-XSRF-TOKEN",
    "maxContentLength": -1,
    "maxBodyLength": -1,
    "transitional": {
        "silentJSONParsing": true,
        "forcedJSONParsing": true,
        "clarifyTimeoutError": false
    }
}, undefined);