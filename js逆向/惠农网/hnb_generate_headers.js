/**
 * 惠农网https://www.cnhnb.com/gongying/6630768/ 算法模拟评论获取
 */
window = global;
const CryptoJS = require('crypto-js')
const Utils = {
    randomInt: function (e, t) {
        return Math.floor(Math.random() * (t - e + 1) + e)
    },
    toBase36: function (e) {
        var r = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        for (var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 9, b = e, n = ""; 0 != b;) {
            var o = b % 36
                , l = b / 36;
            n = r.charAt(o) + n,
                b = Math.round(Math.floor(l))
        }
        return ("0000000000000000" + n).substr(-t)
    },
    newUUID: function (e) {
        var t = (new Date).getTime();
        return (e ? "xxxxxxxxxxxxxyxxxxyxxxxxxxxxxxxx" : "xxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxx").replace(/[xy]/g, (function (e) {
                var n = (t + 16 * Math.random()) % 16 | 0;
                return t = Math.floor(t / 16),
                    ("x" == e ? n : 3 & n | 8).toString(16)
            }
        ))
    },
};
let jzq;

function generateBaseHeaders(pagePath) {
    const now = new Date();
    const timestamp = now.getTime();
    // X-CLIENT-ID
    const x_client_id = Utils.newUUID();

    // X-B3-TRACEID (逻辑见 521-523 行)
    const traceId = Utils.toBase36(timestamp, 9) + Utils.toBase36(Utils.randomInt(0, 78364164095), 7);

    // X-CLIENT-SID (逻辑见 471-486 行)
    const d = Utils.toBase36(timestamp, 9);
    const h = Utils.toBase36(Utils.randomInt(0, 78364164095), 7);
    const sessionId = "S_" + d + h;

    // X-CLIENT-NONCE (通常是一个 UUID)
    const nonce = Utils.newUUID(!0);

    return {
        "X-CLIENT-APPID": "4",
        "X-B3-TRACEID": traceId,
        "X-CLIENT-TIME": timestamp,
        "X-CLIENT-PAGE": pagePath,
        "X-HN-JOB": "If you see these message, I hope you dont hack us, I hope you can join us! Please visit https://www.cnhnkj.com/job.html",
        "X-CLIENT-NONCE": nonce,
        "X-CLIENT-ENVIRONMENT": "pro",
        "X-CLIENT-ID": x_client_id,
        "X-CLIENT-SID": sessionId,
    };
}

const l = {
    default: function (e) {
        return CryptoJS.SHA256(e);
    }
};
const c = {
    default: function (e) {
        return CryptoJS.SHA384(e);
    }
};
const r = {
    default: function (e) {
        return CryptoJS.MD5(e);
    }
};
const o = {
    default: function (e) {
        return CryptoJS.SHA1(e);
    }
};

//webpack
!function (e) {
    function r(data) {
        for (var r, n, o = data[0], f = data[1], l = data[2], i = 0, v = []; i < o.length; i++)
            n = o[i],
            Object.prototype.hasOwnProperty.call(d, n) && d[n] && v.push(d[n][0]),
                d[n] = 0;
        for (r in f)
            Object.prototype.hasOwnProperty.call(f, r) && (e[r] = f[r]);
        for (h && h(data); v.length;)
            v.shift()();
        return c.push.apply(c, l || []),
            t()
    }

    function t() {
        for (var e, i = 0; i < c.length; i++) {
            for (var r = c[i], t = !0, n = 1; n < r.length; n++) {
                var o = r[n];
                0 !== d[o] && (t = !1)
            }
            t && (c.splice(i--, 1),
                e = f(f.s = r[0]))
        }
        return e
    }

    var n = {}
        , o = {
        11: 0
    }
        , d = {
        11: 0
    }
        , c = [];

    function f(r) {
        if (n[r])
            return n[r].exports;
        var t = n[r] = {
            i: r,
            l: !1,
            exports: {}
        };
        console.log("calling: ", r)
        return e[r].call(t.exports, t, t.exports, f),
            t.l = !0,
            t.exports
    }

    jzq = f;
    f.e = function (e) {
        var r = [];
        o[e] ? r.push(o[e]) : 0 !== o[e] && {
            0: 1,
            3: 1,
            4: 1,
            5: 1
        }[e] && r.push(o[e] = new Promise((function (r, t) {
                for (var n = ({
                    0: "index-vue/index",
                    1: "vendors.index-vue/index.ssr/gongying/_id",
                    3: "errorPages-errorPage404-vue/index",
                    4: "errorPages-errorPage500-vue/index",
                    5: "errorPages-shopShelves-vue/index",
                    12: "ssr/gongying/_id"
                }[e] || e) + "." + {
                    0: "c8b546768672a3eea42b",
                    1: "31d6cfe0d16ae931b73c",
                    3: "49c5c6724ec4bd2e8adf",
                    4: "4e4e836b08bd4a58e376",
                    5: "899dfdfa1fabd48b8dee",
                    12: "31d6cfe0d16ae931b73c"
                }[e] + ".css", d = f.p + n, c = document.getElementsByTagName("link"), i = 0; i < c.length; i++) {
                    var l = (h = c[i]).getAttribute("data-href") || h.getAttribute("href");
                    if ("stylesheet" === h.rel && (l === n || l === d))
                        return r()
                }
                var v = document.getElementsByTagName("style");
                for (i = 0; i < v.length; i++) {
                    var h;
                    if ((l = (h = v[i]).getAttribute("data-href")) === n || l === d)
                        return r()
                }
                var m = document.createElement("link");
                m.rel = "stylesheet",
                    m.type = "text/css",
                    m.onload = r,
                    m.onerror = function (r) {
                        var n = r && r.target && r.target.src || d
                            , c = new Error("Loading CSS chunk " + e + " failed.\n(" + n + ")");
                        c.code = "CSS_CHUNK_LOAD_FAILED",
                            c.request = n,
                            delete o[e],
                            m.parentNode.removeChild(m),
                            t(c)
                    }
                    ,
                    m.href = d,
                    document.getElementsByTagName("head")[0].appendChild(m)
            }
        )).then((function () {
                o[e] = 0
            }
        )));
        var t = d[e];
        if (0 !== t)
            if (t)
                r.push(t[2]);
            else {
                var n = new Promise((function (r, n) {
                        t = d[e] = [r, n]
                    }
                ));
                r.push(t[2] = n);
                var c, script = document.createElement("script");
                script.charset = "utf-8",
                    script.timeout = 120,
                f.nc && script.setAttribute("nonce", f.nc),
                    script.src = function (e) {
                        return f.p + "" + ({
                            0: "index-vue/index",
                            1: "vendors.index-vue/index.ssr/gongying/_id",
                            3: "errorPages-errorPage404-vue/index",
                            4: "errorPages-errorPage500-vue/index",
                            5: "errorPages-shopShelves-vue/index",
                            12: "ssr/gongying/_id"
                        }[e] || e) + "." + {
                            0: "f0dbdd8d7099e736e361",
                            1: "6c828182e937a3d945ac",
                            3: "cc27a8b6d34be4b8af14",
                            4: "e2d84cf87cd79582ee30",
                            5: "d519e07d807cef4fa330",
                            12: "020be94e38224aef68fb"
                        }[e] + ".js"
                    }(e);
                var l = new Error;
                c = function (r) {
                    script.onerror = script.onload = null,
                        clearTimeout(v);
                    var t = d[e];
                    if (0 !== t) {
                        if (t) {
                            var n = r && ("load" === r.type ? "missing" : r.type)
                                , o = r && r.target && r.target.src;
                            l.message = "Loading chunk " + e + " failed.\n(" + n + ": " + o + ")",
                                l.name = "ChunkLoadError",
                                l.type = n,
                                l.request = o,
                                t[1](l)
                        }
                        d[e] = void 0
                    }
                }
                ;
                var v = setTimeout((function () {
                        c({
                            type: "timeout",
                            target: script
                        })
                    }
                ), 12e4);
                script.onerror = script.onload = c,
                    document.head.appendChild(script)
            }
        return Promise.all(r)
    }
        ,
        f.m = e,
        f.c = n,
        f.d = function (e, r, t) {
            f.o(e, r) || Object.defineProperty(e, r, {
                enumerable: !0,
                get: t
            })
        }
        ,
        f.r = function (e) {
            "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
                value: "Module"
            }),
                Object.defineProperty(e, "__esModule", {
                    value: !0
                })
        }
        ,
        f.t = function (e, r) {
            if (1 & r && (e = f(e)),
            8 & r)
                return e;
            if (4 & r && "object" == typeof e && e && e.__esModule)
                return e;
            var t = Object.create(null);
            if (f.r(t),
                Object.defineProperty(t, "default", {
                    enumerable: !0,
                    value: e
                }),
            2 & r && "string" != typeof e)
                for (var n in e)
                    f.d(t, n, function (r) {
                        return e[r]
                    }
                        .bind(null, n));
            return t
        }
        ,
        f.n = function (e) {
            var r = e && e.__esModule ? function () {
                        return e.default
                    }
                    : function () {
                        return e
                    }
            ;
            return f.d(r, "a", r),
                r
        }
        ,
        f.o = function (object, e) {
            return Object.prototype.hasOwnProperty.call(object, e)
        }
        ,
        f.p = "//files.cnhnb.com/master-ssr/supplydetails/",
        f.oe = function (e) {
            throw console.error(e),
                e
        }
    ;
    var l = window.webpackJsonp = window.webpackJsonp || []
        , v = l.push.bind(l);
    l.push = r,
        l = l.slice();
    for (var i = 0; i < l.length; i++)
        r(l[i]);
    var h = v;
    t()
}({
    'func': function(t, e) {
    t.exports = r;
    var n = null;
    try {
        n = new WebAssembly.Instance(new WebAssembly.Module(new Uint8Array([0, 97, 115, 109, 1, 0, 0, 0, 1, 13, 2, 96, 0, 1, 127, 96, 4, 127, 127, 127, 127, 1, 127, 3, 7, 6, 0, 1, 1, 1, 1, 1, 6, 6, 1, 127, 1, 65, 0, 11, 7, 50, 6, 3, 109, 117, 108, 0, 1, 5, 100, 105, 118, 95, 115, 0, 2, 5, 100, 105, 118, 95, 117, 0, 3, 5, 114, 101, 109, 95, 115, 0, 4, 5, 114, 101, 109, 95, 117, 0, 5, 8, 103, 101, 116, 95, 104, 105, 103, 104, 0, 0, 10, 191, 1, 6, 4, 0, 35, 0, 11, 36, 1, 1, 126, 32, 0, 173, 32, 1, 173, 66, 32, 134, 132, 32, 2, 173, 32, 3, 173, 66, 32, 134, 132, 126, 34, 4, 66, 32, 135, 167, 36, 0, 32, 4, 167, 11, 36, 1, 1, 126, 32, 0, 173, 32, 1, 173, 66, 32, 134, 132, 32, 2, 173, 32, 3, 173, 66, 32, 134, 132, 127, 34, 4, 66, 32, 135, 167, 36, 0, 32, 4, 167, 11, 36, 1, 1, 126, 32, 0, 173, 32, 1, 173, 66, 32, 134, 132, 32, 2, 173, 32, 3, 173, 66, 32, 134, 132, 128, 34, 4, 66, 32, 135, 167, 36, 0, 32, 4, 167, 11, 36, 1, 1, 126, 32, 0, 173, 32, 1, 173, 66, 32, 134, 132, 32, 2, 173, 32, 3, 173, 66, 32, 134, 132, 129, 34, 4, 66, 32, 135, 167, 36, 0, 32, 4, 167, 11, 36, 1, 1, 126, 32, 0, 173, 32, 1, 173, 66, 32, 134, 132, 32, 2, 173, 32, 3, 173, 66, 32, 134, 132, 130, 34, 4, 66, 32, 135, 167, 36, 0, 32, 4, 167, 11])),{}).exports
    } catch (t) {}
    function r(t, e, n) {
        this.low = 0 | t,
        this.high = 0 | e,
        this.unsigned = !!n
    }
    function o(t) {
        return !0 === (t && t.__isLong__)
    }
    r.prototype.__isLong__,
    Object.defineProperty(r.prototype, "__isLong__", {
        value: !0
    }),
    r.isLong = o;
    var h = {}
      , l = {};
    function f(t, e) {
        var n, r, o;
        return e ? (o = 0 <= (t >>>= 0) && t < 256) && (r = l[t]) ? r : (n = d(t, (0 | t) < 0 ? -1 : 0, !0),
        o && (l[t] = n),
        n) : (o = -128 <= (t |= 0) && t < 128) && (r = h[t]) ? r : (n = d(t, t < 0 ? -1 : 0, !1),
        o && (h[t] = n),
        n)
    }
    function c(t, e) {
        if (isNaN(t))
            return e ? E : x;
        if (e) {
            if (t < 0)
                return E;
            if (t >= _)
                return O
        } else {
            if (t <= -M)
                return P;
            if (t + 1 >= M)
                return A
        }
        return t < 0 ? c(-t, e).neg() : d(t % w | 0, t / w | 0, e)
    }
    function d(t, e, n) {
        return new r(t,e,n)
    }
    r.fromInt = f,
    r.fromNumber = c,
    r.fromBits = d;
    var m = Math.pow;
    function v(t, e, n) {
        if (0 === t.length)
            throw Error("empty string");
        if ("NaN" === t || "Infinity" === t || "+Infinity" === t || "-Infinity" === t)
            return x;
        if ("number" == typeof e ? (n = e,
        e = !1) : e = !!e,
        (n = n || 10) < 2 || 36 < n)
            throw RangeError("radix");
        var p;
        if ((p = t.indexOf("-")) > 0)
            throw Error("interior hyphen");
        if (0 === p)
            return v(t.substring(1), e, n).neg();
        for (var r = c(m(n, 8)), o = x, i = 0; i < t.length; i += 8) {
            var h = Math.min(8, t.length - i)
              , l = parseInt(t.substring(i, i + h), n);
            if (h < 8) {
                var f = c(m(n, h));
                o = o.mul(f).add(c(l))
            } else
                o = (o = o.mul(r)).add(c(l))
        }
        return o.unsigned = e,
        o
    }
    jzq.d = v;
    function y(t, e) {
        return "number" == typeof t ? c(t, e) : "string" == typeof t ? v(t, e) : d(t.low, t.high, "boolean" == typeof e ? e : t.unsigned)
    }
    r.fromString = v,
    r.fromValue = y;
    var w = 4294967296
      , _ = w * w
      , M = _ / 2
      , S = f(1 << 24)
      , x = f(0);
    r.ZERO = x;
    var E = f(0, !0);
    r.UZERO = E;
    var k = f(1);
    r.ONE = k;
    var C = f(1, !0);
    r.UONE = C;
    var T = f(-1);
    r.NEG_ONE = T;
    var A = d(-1, 2147483647, !1);
    r.MAX_VALUE = A;
    var O = d(-1, -1, !0);
    r.MAX_UNSIGNED_VALUE = O;
    var P = d(0, -2147483648, !1);
    r.MIN_VALUE = P;
    var R = r.prototype;
    R.toInt = function() {
        return this.unsigned ? this.low >>> 0 : this.low
    }
    ,
    R.toNumber = function() {
        return this.unsigned ? (this.high >>> 0) * w + (this.low >>> 0) : this.high * w + (this.low >>> 0)
    }
    ,
    R.toString = function(t) {
        if ((t = t || 10) < 2 || 36 < t)
            throw RangeError("radix");
        if (this.isZero())
            return "0";
        if (this.isNegative()) {
            if (this.eq(P)) {
                var e = c(t)
                  , div = this.div(e)
                  , n = div.mul(e).sub(this);
                return div.toString(t) + n.toInt().toString(t)
            }
            return "-" + this.neg().toString(t)
        }
        for (var r = c(m(t, 6), this.unsigned), o = this, h = ""; ; ) {
            var l = o.div(r)
              , f = (o.sub(l.mul(r)).toInt() >>> 0).toString(t);
            if ((o = l).isZero())
                return f + h;
            for (; f.length < 6; )
                f = "0" + f;
            h = "" + f + h
        }
    }
    ,
    R.getHighBits = function() {
        return this.high
    }
    ,
    R.getHighBitsUnsigned = function() {
        return this.high >>> 0
    }
    ,
    R.getLowBits = function() {
        return this.low
    }
    ,
    R.getLowBitsUnsigned = function() {
        return this.low >>> 0
    }
    ,
    R.getNumBitsAbs = function() {
        if (this.isNegative())
            return this.eq(P) ? 64 : this.neg().getNumBitsAbs();
        for (var t = 0 != this.high ? this.high : this.low, e = 31; e > 0 && 0 == (t & 1 << e); e--)
            ;
        return 0 != this.high ? e + 33 : e + 1
    }
    ,
    R.isZero = function() {
        return 0 === this.high && 0 === this.low
    }
    ,
    R.eqz = R.isZero,
    R.isNegative = function() {
        return !this.unsigned && this.high < 0
    }
    ,
    R.isPositive = function() {
        return this.unsigned || this.high >= 0
    }
    ,
    R.isOdd = function() {
        return 1 == (1 & this.low)
    }
    ,
    R.isEven = function() {
        return 0 == (1 & this.low)
    }
    ,
    R.equals = function(t) {
        return o(t) || (t = y(t)),
        (this.unsigned === t.unsigned || this.high >>> 31 != 1 || t.high >>> 31 != 1) && (this.high === t.high && this.low === t.low)
    }
    ,
    R.eq = R.equals,
    R.notEquals = function(t) {
        return !this.eq(t)
    }
    ,
    R.neq = R.notEquals,
    R.ne = R.notEquals,
    R.lessThan = function(t) {
        return this.comp(t) < 0
    }
    ,
    R.lt = R.lessThan,
    R.lessThanOrEqual = function(t) {
        return this.comp(t) <= 0
    }
    ,
    R.lte = R.lessThanOrEqual,
    R.le = R.lessThanOrEqual,
    R.greaterThan = function(t) {
        return this.comp(t) > 0
    }
    ,
    R.gt = R.greaterThan,
    R.greaterThanOrEqual = function(t) {
        return this.comp(t) >= 0
    }
    ,
    R.gte = R.greaterThanOrEqual,
    R.ge = R.greaterThanOrEqual,
    R.compare = function(t) {
        if (o(t) || (t = y(t)),
        this.eq(t))
            return 0;
        var e = this.isNegative()
          , n = t.isNegative();
        return e && !n ? -1 : !e && n ? 1 : this.unsigned ? t.high >>> 0 > this.high >>> 0 || t.high === this.high && t.low >>> 0 > this.low >>> 0 ? -1 : 1 : this.sub(t).isNegative() ? -1 : 1
    }
    ,
    R.comp = R.compare,
    R.negate = function() {
        return !this.unsigned && this.eq(P) ? P : this.not().add(k)
    }
    ,
    R.neg = R.negate,
    R.add = function(t) {
        o(t) || (t = y(t));
        var e = this.high >>> 16
          , n = 65535 & this.high
          , r = this.low >>> 16
          , h = 65535 & this.low
          , l = t.high >>> 16
          , f = 65535 & t.high
          , c = t.low >>> 16
          , m = 0
          , v = 0
          , w = 0
          , _ = 0;
        return w += (_ += h + (65535 & t.low)) >>> 16,
        v += (w += r + c) >>> 16,
        m += (v += n + f) >>> 16,
        m += e + l,
        d((w &= 65535) << 16 | (_ &= 65535), (m &= 65535) << 16 | (v &= 65535), this.unsigned)
    }
    ,
    R.subtract = function(t) {
        return o(t) || (t = y(t)),
        this.add(t.neg())
    }
    ,
    R.sub = R.subtract,
    R.multiply = function(t) {
        if (this.isZero())
            return x;
        if (o(t) || (t = y(t)),
        n)
            return d(n.mul(this.low, this.high, t.low, t.high), n.get_high(), this.unsigned);
        if (t.isZero())
            return x;
        if (this.eq(P))
            return t.isOdd() ? P : x;
        if (t.eq(P))
            return this.isOdd() ? P : x;
        if (this.isNegative())
            return t.isNegative() ? this.neg().mul(t.neg()) : this.neg().mul(t).neg();
        if (t.isNegative())
            return this.mul(t.neg()).neg();
        if (this.lt(S) && t.lt(S))
            return c(this.toNumber() * t.toNumber(), this.unsigned);
        var e = this.high >>> 16
          , r = 65535 & this.high
          , h = this.low >>> 16
          , l = 65535 & this.low
          , f = t.high >>> 16
          , m = 65535 & t.high
          , v = t.low >>> 16
          , w = 65535 & t.low
          , _ = 0
          , M = 0
          , E = 0
          , k = 0;
        return E += (k += l * w) >>> 16,
        M += (E += h * w) >>> 16,
        E &= 65535,
        M += (E += l * v) >>> 16,
        _ += (M += r * w) >>> 16,
        M &= 65535,
        _ += (M += h * v) >>> 16,
        M &= 65535,
        _ += (M += l * m) >>> 16,
        _ += e * w + r * v + h * m + l * f,
        d((E &= 65535) << 16 | (k &= 65535), (_ &= 65535) << 16 | (M &= 65535), this.unsigned)
    }
    ,
    R.mul = R.multiply,
    R.divide = function(t) {
        if (o(t) || (t = y(t)),
        t.isZero())
            throw Error("division by zero");
        var e, r, h;
        if (n)
            return this.unsigned || -2147483648 !== this.high || -1 !== t.low || -1 !== t.high ? d((this.unsigned ? n.div_u : n.div_s)(this.low, this.high, t.low, t.high), n.get_high(), this.unsigned) : this;
        if (this.isZero())
            return this.unsigned ? E : x;
        if (this.unsigned) {
            if (t.unsigned || (t = t.toUnsigned()),
            t.gt(this))
                return E;
            if (t.gt(this.shru(1)))
                return C;
            h = E
        } else {
            if (this.eq(P))
                return t.eq(k) || t.eq(T) ? P : t.eq(P) ? k : (e = this.shr(1).div(t).shl(1)).eq(x) ? t.isNegative() ? k : T : (r = this.sub(t.mul(e)),
                h = e.add(r.div(t)));
            if (t.eq(P))
                return this.unsigned ? E : x;
            if (this.isNegative())
                return t.isNegative() ? this.neg().div(t.neg()) : this.neg().div(t).neg();
            if (t.isNegative())
                return this.div(t.neg()).neg();
            h = x
        }
        for (r = this; r.gte(t); ) {
            e = Math.max(1, Math.floor(r.toNumber() / t.toNumber()));
            for (var l = Math.ceil(Math.log(e) / Math.LN2), f = l <= 48 ? 1 : m(2, l - 48), v = c(e), w = v.mul(t); w.isNegative() || w.gt(r); )
                w = (v = c(e -= f, this.unsigned)).mul(t);
            v.isZero() && (v = k),
            h = h.add(v),
            r = r.sub(w)
        }
        return h
    }
    ,
    R.div = R.divide,
    R.modulo = function(t) {
        return o(t) || (t = y(t)),
        n ? d((this.unsigned ? n.rem_u : n.rem_s)(this.low, this.high, t.low, t.high), n.get_high(), this.unsigned) : this.sub(this.div(t).mul(t))
    }
    ,
    R.mod = R.modulo,
    R.rem = R.modulo,
    R.not = function() {
        return d(~this.low, ~this.high, this.unsigned)
    }
    ,
    R.and = function(t) {
        return o(t) || (t = y(t)),
        d(this.low & t.low, this.high & t.high, this.unsigned)
    }
    ,
    R.or = function(t) {
        return o(t) || (t = y(t)),
        d(this.low | t.low, this.high | t.high, this.unsigned)
    }
    ,
    R.xor = function(t) {
        return o(t) || (t = y(t)),
        d(this.low ^ t.low, this.high ^ t.high, this.unsigned)
    }
    ,
    R.shiftLeft = function(t) {
        return o(t) && (t = t.toInt()),
        0 == (t &= 63) ? this : t < 32 ? d(this.low << t, this.high << t | this.low >>> 32 - t, this.unsigned) : d(0, this.low << t - 32, this.unsigned)
    }
    ,
    R.shl = R.shiftLeft,
    R.shiftRight = function(t) {
        return o(t) && (t = t.toInt()),
        0 == (t &= 63) ? this : t < 32 ? d(this.low >>> t | this.high << 32 - t, this.high >> t, this.unsigned) : d(this.high >> t - 32, this.high >= 0 ? 0 : -1, this.unsigned)
    }
    ,
    R.shr = R.shiftRight,
    R.shiftRightUnsigned = function(t) {
        if (o(t) && (t = t.toInt()),
        0 === (t &= 63))
            return this;
        var e = this.high;
        return t < 32 ? d(this.low >>> t | e << 32 - t, e >>> t, this.unsigned) : d(32 === t ? e : e >>> t - 32, 0, this.unsigned)
    }
    ,
    R.shru = R.shiftRightUnsigned,
    R.shr_u = R.shiftRightUnsigned,
    R.toSigned = function() {
        return this.unsigned ? d(this.low, this.high, !1) : this
    }
    ,
    R.toUnsigned = function() {
        return this.unsigned ? this : d(this.low, this.high, !0)
    }
    ,
    R.toBytes = function(t) {
        return t ? this.toBytesLE() : this.toBytesBE()
    }
    ,
    R.toBytesLE = function() {
        var t = this.high
          , e = this.low;
        return [255 & e, e >>> 8 & 255, e >>> 16 & 255, e >>> 24, 255 & t, t >>> 8 & 255, t >>> 16 & 255, t >>> 24]
    }
    ,
    R.toBytesBE = function() {
        var t = this.high
          , e = this.low;
        return [t >>> 24, t >>> 16 & 255, t >>> 8 & 255, 255 & t, e >>> 24, e >>> 16 & 255, e >>> 8 & 255, 255 & e]
    }
    ,
    r.fromBytes = function(t, e, n) {
        return n ? r.fromBytesLE(t, e) : r.fromBytesBE(t, e)
    }
    ,
    r.fromBytesLE = function(t, e) {
        return new r(t[0] | t[1] << 8 | t[2] << 16 | t[3] << 24,t[4] | t[5] << 8 | t[6] << 16 | t[7] << 24,e)
    }
    ,
    r.fromBytesBE = function(t, e) {
        return new r(t[4] << 24 | t[5] << 16 | t[6] << 8 | t[7],t[0] << 24 | t[1] << 16 | t[2] << 8 | t[3],e)
    }
}
});

jzq('func');

function generateAllHeaders(head) {
    var t, n, f = [
        "R8KzwpY=",
        "w5fDssKG",
        "fxpw",
        "wq8owrI=",
        "ZcKuwpw=",
        "wq4ewqo=",
        "wo5ow4E=",
        "Wmc/",
        "w7TDgCQ=",
        "woHDo8OY",
        "wo3DpcKT",
        "PnVd",
        "wqkcRw==",
        "w7PDm8KB",
        "wqtTXg==",
        "wpjDrSw=",
        "wokkPw==",
        "w550w6o=",
        "fDlM",
        "QMO7wrU=",
        "EmzDlA==",
        "PzrDkg==",
        "wpVzHA==",
        "w5UTwr4=",
        "wq4DwpA=",
        "woptdg==",
        "w7XDt8Km",
        "w7wHw5w=",
        "woMMw7w=",
        "wpoUGQ==",
        "AGNe",
        "AXfDrw==",
        "w6vDqi0=",
        "w7Rcw4U=",
        "SWA3",
        "wpzClTI=",
        "wrAoEw==",
        "w6XDkMKq",
        "wrEkJQ==",
        "wqLDnS8=",
        "w7I2w7o=",
        "BWzDqQ==",
        "w41ANg==",
        "w4JQw5I=",
        "wrPDglM=",
        "wofDscO/",
        "w5EZw60=",
        "wpxuwo8=",
        "c3Rl",
        "w4jCig0=",
        "wot8eg==",
        "wpjDu8Kw",
        "MUvDrw==",
        "MsKPIw==",
        "wow2BA==",
        "J8KawpA=",
        "X8O7wpo=",
        "LGlG",
        "LmVX",
        "wonCpcK9",
        "EsKaQA==",
        "woXDg8Oj",
        "FMKQdw==",
        "w55TRA==",
        "M8KYJw==",
        "dMKkw54=",
        "w6IJw6k=",
        "wpDCkmA=",
        "CsKQfQ==",
        "w7DDgxY=",
        "ZsKbQw==",
        "Cll6",
        "w55HQg==",
        "wrBLMg==",
        "wrB+MQ==",
        "wqtPw6M=",
        "w7nCtw0=",
        "w4pZGg==",
        "wpVwQg==",
        "HVRE",
        "wrzDtik=",
        "w6lOYQ==",
        "PGNj",
        "a3Rt",
        "wrgtw7o=",
        "VcOPHw==",
        "w4jDq38=",
        "ST7CoA==",
        "GGDChQ==",
        "YQ1u",
        "azJe",
        "w4jClzc=",
        "wqrDpCM=",
        "woUiw5E=",
        "w6jDlUc=",
        "wovDrgI=",
        "FMKcfQ==",
        "wonCuMKH",
        "w5NwHQ==",
        "w4jCiWY=",
        "wrcHMw==",
        "w7kLQA==",
        "Z8OiwqU=",
        "IsKcwpk=",
        "IcKYIQ==",
        "w7Vzw5c=",
        "wqAbw4Q=",
        "djYB"
    ]
    t = f,
        n = 130;
    var h, v, y, m, x, _, w, C, S, M, O, W, k, P, V, R, E, j, D, F, A, $, T, I, H = function e(t, n) {
            var r, o = f[t -= 0];
            if (void 0 === e.LXLBwO) {
                (r = function () {
                    var e = void 0;
                    try {
                        e = Function('return (function() {}.constructor("return this")( ));')()
                    } catch (t) {
                        e = window
                    }
                    return e
                }()).atob || (r.atob = function (e) {
                        for (var t, n, r = String(e).replace(/=+$/, ""), o = "", l = 0, c = 0; n = r.charAt(c++); ~n && (t = l % 4 ? 64 * t + n : n,
                        l++ % 4) ? o += String.fromCharCode(255 & t >> (-2 * l & 6)) : 0)
                            n = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".indexOf(n);
                        return o
                    }
                );
                e.wgSwSe = function (e, t) {
                    for (var n = [], r = 0, o = void 0, l = "", c = "", f = 0, d = (e = atob(e)).length; f < d; f++)
                        c += "%" + ("00" + e.charCodeAt(f).toString(16)).slice(-2);
                    e = decodeURIComponent(c);
                    var h = void 0;
                    for (h = 0; h < 256; h++)
                        n[h] = h;
                    for (h = 0; h < 256; h++)
                        r = (r + n[h] + t.charCodeAt(h % t.length)) % 256,
                            o = n[h],
                            n[h] = n[r],
                            n[r] = o;
                    h = 0,
                        r = 0;
                    for (var v = 0; v < e.length; v++)
                        r = (r + n[h = (h + 1) % 256]) % 256,
                            o = n[h],
                            n[h] = n[r],
                            n[r] = o,
                            l += String.fromCharCode(e.charCodeAt(v) ^ n[(n[h] + n[r]) % 256]);
                    return l
                }
                    ,
                    e.oiZDRX = {},
                    e.LXLBwO = !0
            }
            var l = e.oiZDRX[t];
            return void 0 === l ? (void 0 === e.pGfKGq && (e.pGfKGq = !0),
                o = e.wgSwSe(o, n),
                e.oiZDRX[t] = o) : o = l,
                o
        }, K = false,
        L = K ? "WYbq0N" + H("0x20", "up@!") + H("0x50", "GEhp") + H("0x66", "voet") + H("0x5e", "up@!") + H("0x6a", "&J@X") + H("0x51", "2w[1") + H("0x5d", "h2!t") + "NJtQC" : H("0x9", "xaTo") + H("0xb", "wXa9") + H("0x3d", "xaTo") + H("0x5c", "up@!") + H("0x4", "##Ru") + H("0x47", "wXa9") + "h5&" + H("0x33", "Ugh5") + H("0x23", "3HK4") + H("0x58", "gI!u") + "#V",
        G = K ? "xX1sgJ" + H("0x64", ")3bD") + "v9bQOe" + H("0x4d", "q1C$") + "0Ie3kK" + H("0x4f", "wXa9") + H("0x2", "Ph1Y") + "JT" : H("0x4c", "aq3T") + H("0x59", "9GkD") + H("0x2e", "h2!t") + H("0x34", "3MMx") + H("0x13", "voet") + H("0xd", "xaTo") + H("0x35", "%M3Q") + H("0x15", "3MMx") + H("0x21", "&J@X") + "gnAcr",
        N = K ? H("0x27", "Z$b]") + H("0x2c", "GEhp") + H("0x56", "CQ]W") + H("0x10", "8dp[") + H("0xe", "J7to") + "r5O1TL" + H("0x2f", "g0vo") + "ZpK" + H("0x2d", "UV[o") + "Kd" : H("0x1c", "J1wu") + H("0x3", "&J@X") + H("0x57", "&IEu") + "ljl" + H("0xa", "DlUD") + "WYk" + H("0x54", "Cbz8") + H("0x0", "##Ru") + "2Rn" + H("0x1", "eBRZ") + "hR",
        B = true,
        Q = {
            nonce: head[H("0x63", "CQ]W") + H("0x30", "9GkD") + H("0x49", "J7to") + "NONCE"],
            timestamp: String(head[H("0x28", "g0vo") + "LIE" + H("0x49", "J7to") + H("0x53", "9GkD") + "E"]),
            deviceId: head["X-C" + H("0x6", "@ycV") + "NT-ID"],
            secret: B ? N : G,
            secretType: B ? 3 : 2
        };
    return Q[H("0x62", "q1C$") + "ce"] && Q[H("0x7", "zwd1") + "est" + H("0x43", "!sAd")] && Q[H("0x36", "8dp[") + H("0x1e", "HtSW") + "Id"] && (head[H("0x4a", "8dp[") + "LIE" + H("0x49", "J7to") + H("0xf", "Z$b]") + "N"] = (V = (h = Q).nonce,
        R = h.timestamp,
        E = h.deviceId,
        j = h.secret,
        D = h.secretType,
        v = V,
        F = 1 === (y = D) ? (0,
            o.default)(v)["toS" + H("0x5", "7sY@") + "ng"]() : 2 === y ? (0,
            r.default)(v)[H("0x8", "up@!") + H("0x68", "%M3Q") + "ng"]() : 3 === y ? (0,
            l.default)(v)[H("0x11", "g0vo") + "tring"]() : void 0,
        m = R,
        A = 1 === (x = D) ? (0,
            r.default)(m)[H("0x3b", "Ugh5") + H("0x65", "2w[1") + "ng"]() : 2 === x ? (0,
            o.default)(m)[H("0x14", "3MMx") + "tring"]() : 3 === x ? (0,
            c.default)(m)[H("0x26", ")3bD") + H("0x19", "J7to") + "ng"]() : void 0,
        _ = E,
        w = V,
        $ = 1 === (C = D) ? (0,
            l.default)(_ + w)[H("0x3c", "oChJ") + H("0x31", "aq3T") + "ng"]() : 2 === C ? (0,
            r.default)(w + _)["toS" + H("0x38", "voet") + "ng"]() : 3 === C ? (0,
            r.default)(w + (H("0x16", "q1C$") + H("0x1d", ")3bD") + "l)") + _)[H("0x5b", "aq3T") + "tring"]() : void 0,
        S = j,
        M = R,
        W = "",
        1 === (O = D) ? W = (0,
            r.default)(M + S)[H("0x18", "7sY@") + H("0x31", "aq3T") + "ng"]() : 2 === O ? W = (0,
            o.default)(S + M)[H("0x6b", "EUSA") + H("0x61", "Ugh5") + "ng"]() : 3 === O && (W = (0,
            o.default)(M + (H("0x69", "g0vo") + H("0x17", "J1wu") + H("0x41", "voet") + H("0x46", "9Ynf") + H("0x2a", "J7to")) + S)[H("0x26", ")3bD") + H("0x48", "HJjC") + "ng"]()),
        W = W[H("0x5f", "GEhp") + "str" + H("0x4b", "@ycV")](W[H("0x44", "oChJ") + H("0x25", "azqg")] - 16, W[H("0x55", "9Ynf") + H("0x1f", "3MMx")] - 1),
        T = jzq.d(W, !0, 16)["toU" + H("0x1b", "Cbz8") + H("0x22", "zwd1") + "d"]()[H("0x52", "wXa9") + "tring"](10),
        P = [F, A, $, T],
        I = 1 === (k = D) ? P[H("0x12", "Ph1Y") + H("0x32", "J7to")]((function (e, t) {
                return e + "" + t
            }
        )) : 2 === k ? P[H("0x3e", "oChJ") + H("0x24", ")3bD")]((function (e, t) {
                return e + "!" + t
            }
        )) : 3 === k ? P.reduce((function (e, t) {
                return e + (H("0x4e", "q1C$") + "o)") + t
            }
        )) : void 0,
        (0, c.default)(I).toString())),
        head
}

/**
 * 主函数：生成惠农网完整 Headers
 * @param {string} pagePath - 页面路径，如 "/gongying/6630768/"
 * @returns {object} 完整的 Headers 对象（包含签名）
 */
function generateHeaders(pagePath) {
    return generateAllHeaders(generateBaseHeaders(pagePath));
}

// 导出
if (typeof module !== 'undefined' && module.exports) {
    module.exports = generateHeaders;
}

// 测试代码
if (require.main === module) {
    console.log("=".repeat(60));
    console.log("惠农网 Headers 生成测试");
    console.log("=".repeat(60));
    
    // 示例 1
    const headers1 = generateHeaders("/gongying/6630768/");
    console.log("\n示例 1：供应详情页");
    console.log(JSON.stringify(headers1, null, 2));
    
    // 示例 2
    const headers2 = generateHeaders("/api/comment/list");
    console.log("\n示例 2：评论接口");
    console.log(JSON.stringify(headers2, null, 2));
}
