window = global;
document = {
    cookie: 'Hm_lvt_7a4ab2ee50a646469020effc76d070dc=1770192698; HMACCOUNT=DA5A6E10A4984465; Hm_lpvt_7a4ab2ee50a646469020effc76d070dc=1770193042'
}

function i(e, t) {
    var n = (65535 & e) + (65535 & t);
    return (e >> 16) + (t >> 16) + (n >> 16) << 16 | 65535 & n
}

function r(e, t) {
    return e << t | e >>> 32 - t
}

function a(e, t, n, a, o, s) {
    return i(r(i(i(t, e), i(a, s)), o), n)
}

function o(e, t, n, i, r, o, s) {
    return a(t & n | ~t & i, e, t, r, o, s)
}

function s(e, t, n, i, r, o, s) {
    return a(t & i | n & ~i, e, t, r, o, s)
}

function A(e, t, n, i, r, o, s) {
    return a(t ^ n ^ i, e, t, r, o, s)
}

function c(e, t, n, i, r, o, s) {
    return a(n ^ (t | ~i), e, t, r, o, s)
}

function l(e) {
    for (var t = 1732584193, n = -271733879, r = -1732584194, a = 271733878, l = 0; l < e.length; l += 16) {
        var d = t
            , u = n
            , h = r
            , m = a;
        t = o(t, n, r, a, e[l + 0], 7, -680876936),
            a = o(a, t, n, r, e[l + 1], 12, -389564586),
            r = o(r, a, t, n, e[l + 2], 17, 606105819),
            n = o(n, r, a, t, e[l + 3], 22, -1044525330),
            t = o(t, n, r, a, e[l + 4], 7, -176418897),
            a = o(a, t, n, r, e[l + 5], 12, 1200080426),
            r = o(r, a, t, n, e[l + 6], 17, -1473231341),
            n = o(n, r, a, t, e[l + 7], 22, -45705983),
            t = o(t, n, r, a, e[l + 8], 7, 1770035416),
            a = o(a, t, n, r, e[l + 9], 12, -1958414417),
            r = o(r, a, t, n, e[l + 10], 17, -42063),
            n = o(n, r, a, t, e[l + 11], 22, -1990404162),
            t = o(t, n, r, a, e[l + 12], 7, 1804603682),
            a = o(a, t, n, r, e[l + 13], 12, -40341101),
            r = o(r, a, t, n, e[l + 14], 17, -1502002290),
            n = o(n, r, a, t, e[l + 15], 22, 1236535329),
            t = s(t, n, r, a, e[l + 1], 5, -165796510),
            a = s(a, t, n, r, e[l + 6], 9, -1069501632),
            r = s(r, a, t, n, e[l + 11], 14, 643717713),
            n = s(n, r, a, t, e[l + 0], 20, -373897302),
            t = s(t, n, r, a, e[l + 5], 5, -701558691),
            a = s(a, t, n, r, e[l + 10], 9, 38016083),
            r = s(r, a, t, n, e[l + 15], 14, -660478335),
            n = s(n, r, a, t, e[l + 4], 20, -405537848),
            t = s(t, n, r, a, e[l + 9], 5, 568446438),
            a = s(a, t, n, r, e[l + 14], 9, -1019803690),
            r = s(r, a, t, n, e[l + 3], 14, -187363961),
            n = s(n, r, a, t, e[l + 8], 20, 1163531501),
            t = s(t, n, r, a, e[l + 13], 5, -1444681467),
            a = s(a, t, n, r, e[l + 2], 9, -51403784),
            r = s(r, a, t, n, e[l + 7], 14, 1735328473),
            n = s(n, r, a, t, e[l + 12], 20, -1926607734),
            t = A(t, n, r, a, e[l + 5], 4, -378558),
            a = A(a, t, n, r, e[l + 8], 11, -2022574463),
            r = A(r, a, t, n, e[l + 11], 16, 1839030562),
            n = A(n, r, a, t, e[l + 14], 23, -35309556),
            t = A(t, n, r, a, e[l + 1], 4, -1530992060),
            a = A(a, t, n, r, e[l + 4], 11, 1272893353),
            r = A(r, a, t, n, e[l + 7], 16, -155497632),
            n = A(n, r, a, t, e[l + 10], 23, -1094730640),
            t = A(t, n, r, a, e[l + 13], 4, 681279174),
            a = A(a, t, n, r, e[l + 0], 11, -358537222),
            r = A(r, a, t, n, e[l + 3], 16, -722521979),
            n = A(n, r, a, t, e[l + 6], 23, 76029189),
            t = A(t, n, r, a, e[l + 9], 4, -640364487),
            a = A(a, t, n, r, e[l + 12], 11, -421815835),
            r = A(r, a, t, n, e[l + 15], 16, 530742520),
            n = A(n, r, a, t, e[l + 2], 23, -995338651),
            t = c(t, n, r, a, e[l + 0], 6, -198630844),
            a = c(a, t, n, r, e[l + 7], 10, 1126891415),
            r = c(r, a, t, n, e[l + 14], 15, -1416354905),
            n = c(n, r, a, t, e[l + 5], 21, -57434055),
            t = c(t, n, r, a, e[l + 12], 6, 1700485571),
            a = c(a, t, n, r, e[l + 3], 10, -1894986606),
            r = c(r, a, t, n, e[l + 10], 15, -1051523),
            n = c(n, r, a, t, e[l + 1], 21, -2054922799),
            t = c(t, n, r, a, e[l + 8], 6, 1873313359),
            a = c(a, t, n, r, e[l + 15], 10, -30611744),
            r = c(r, a, t, n, e[l + 6], 15, -1560198380),
            n = c(n, r, a, t, e[l + 13], 21, 1309151649),
            t = c(t, n, r, a, e[l + 4], 6, -145523070),
            a = c(a, t, n, r, e[l + 11], 10, -1120210379),
            r = c(r, a, t, n, e[l + 2], 15, 718787259),
            n = c(n, r, a, t, e[l + 9], 21, -343485551),
            t = i(t, d),
            n = i(n, u),
            r = i(r, h),
            a = i(a, m)
    }
    return [t, n, r, a]
}

function d(e) {
    for (var t = "0123456789abcdef", n = "", i = 0; i < 4 * e.length; i++)
        n += t.charAt(e[i >> 2] >> i % 4 * 8 + 4 & 15) + t.charAt(e[i >> 2] >> i % 4 * 8 & 15);
    return n
}

function u(e) {
    for (var t = 1 + (e.length + 8 >> 6), n = new Array(16 * t), i = 0; i < 16 * t; i++)
        n[i] = 0;
    for (var i = 0; i < e.length; i++)
        n[i >> 2] |= (255 & e.charCodeAt(i)) << i % 4 * 8;
    return n[i >> 2] |= 128 << i % 4 * 8,
        n[16 * t - 2] = 8 * e.length,
        n
}

const _i = {
    default: {
        "clientKey": "B3AA12B0145E1982F282BEDD8A3305B89A9811280C0B8CC3A6A60D81022E4903",
        "saleSubjectCode": "Wanda",
        "cCode": "1_3",
        "mxAPIVer": "1.0.0",
        "appId": "3",
        "httpsImg": "https://picagent-prd-mx.wandafilm.com/picture/cut_picture?uri=",
        "miscBaseUrl": "https://misc-api-prd-mx.wandafilm.com",
        "cinemaBaseUrl": "https://cinema-api-prd-mx.wandafilm.com",
        "userBaseUrl": "https://user-api-prd-mx.wandafilm.com",
        "ticketBaseUrl": "https://ticket-api-prd-mx.wandafilm.com",
        "paymentBaseUrl": "https://payment-api-prd-mx.wandafilm.com",
        "activityBaseUrl": "https://mkt-activity-api-prd-mx.wandafilm.com",
        "cmsActivityBaseUrl": "https://cms-activity-api-prd-mx.wandafilm.com",
        "cardBaseUrl": "https://card-api-prd-mx.wandafilm.com",
        "couponBaseUrl": "https://coupon-api-prd-mx.wandafilm.com",
        "snackBaseUrl": "https://snack-api-prd-mx.wandafilm.com",
        "cdspBaseUrl": "https://cdsp-api-prd-mx.wandafilm.com",
        "commonURI": "https://misc-api-prd-mx.wandafilm.com",
        "mallUrl": "https://m.wandacinemas.com",
        "gatewayUrl": "https://front-gateway-c.wandafilm.com"

    }
}
const _r = {
    default: {
        hexMD5: function (e) {
            return d(l(u(e)))
        }
    }
}
const clientKey = _i.default.clientKey;
const saleSubjectCode = _i.default.saleSubjectCode;
const cCode = _i.default.cCode;
const mxAPIVer = _i.default.mxAPIVer;
const method = "POST";
const appId = _i.default.appId;

function generate_check(time, phone, vcode, cinemaId) {
    const e = time;
    const t = "/user/login.api";
    const n = `phone=${phone}&requestId=&vcode=${vcode}&json=true&cinemaId=${cinemaId}`;
    var i = "";
    return i += saleSubjectCode,
        i += cCode,
        i += clientKey,
        i += e,
        (i += t, i += n),
        _r.default.hexMD5(i)
}

function get_mi(e) {
    var t = "";
    if (document.cookie.length > 0)
        for (var n = document.cookie.split("; "), i = 0, r = n.length; i < r; i++) {
            var a = n[i].split("=");
            a[0] === e && (t = decodeURIComponent(a[1]))
        }
    return t
}

function generate_mx_header() {
    var m = new Date().getTime();
    var p = generate_check(m, "19113189219", "122312", "5911");
    var g = get_mi('mi');
    var i = {
        ver: "7.0.0",
        sCode: saleSubjectCode,
        _mi_: g,
        width: 1280,
        json: !0,
        cCode: cCode,
        check: p,
        ts: m,
        heigth: 720,
        appId: appId
    };
    return JSON.stringify(i)
}


console.log(generate_mx_header())
