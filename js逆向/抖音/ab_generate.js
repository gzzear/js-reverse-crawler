var cr, ar, fr, lr, pr, vr, hr, gr = function () {
    function t() {
        if (function (t, r) {
            if (!(t instanceof r))
                throw new TypeError("Cannot call a class as a function")
        }(this, t),
            !(this instanceof t))
            return new t;
        this.reg = new Array(8),
            this.chunk = [],
            this.size = 0,
            this.reset()
    }

    return function (t, r, e) {
        r && ur(t.prototype, r),
        e && ur(t, e),
            Object.defineProperty(t, "prototype", {
                writable: !1
            })
    }(t, [{
        key: "reset",
        value: function () {
            this.reg[0] = 1937774191,
                this.reg[1] = 1226093241,
                this.reg[2] = 388252375,
                this.reg[3] = 3666478592,
                this.reg[4] = 2842636476,
                this.reg[5] = 372324522,
                this.reg[6] = 3817729613,
                this.reg[7] = 2969243214,
                this.chunk = [],
                this.size = 0
        }
    }, {
        key: "write",
        value: function (t) {
            var r = "string" == typeof t ? function (t) {
                var r = encodeURIComponent(t).replace(/%([0-9A-F]{2})/g, (function (t, r) {
                        return String.fromCharCode("0x" + r)
                    }
                ))
                    , e = new Array(r.length);
                return Array.prototype.forEach.call(r, (function (t, r) {
                        e[r] = t.charCodeAt(0)
                    }
                )),
                    e
            }(t) : t;
            this.size += r.length;
            var e = 64 - this.chunk.length;
            if (r.length < e)
                this.chunk = this.chunk.concat(r);
            else
                for (this.chunk = this.chunk.concat(r.slice(0, e)); this.chunk.length >= 64;)
                    this._compress(this.chunk),
                        e < r.length ? this.chunk = r.slice(e, Math.min(e + 64, r.length)) : this.chunk = [],
                        e += 64
        }
    }, {
        key: "sum",
        value: function (t, r) {
            t && (this.reset(),
                this.write(t)),
                this._fill();
            for (var e = 0; e < this.chunk.length; e += 64)
                this._compress(this.chunk.slice(e, e + 64));
            var n, o, i, u = null;
            if ("hex" == r) {
                u = "";
                for (e = 0; e < 8; e++)
                    u += (n = this.reg[e].toString(16),
                        o = 8,
                        i = "0",
                        n.length >= o ? n : i.repeat(o - n.length) + n)
            } else
                for (u = new Array(32),
                         e = 0; e < 8; e++) {
                    var s = this.reg[e];
                    u[4 * e + 3] = (255 & s) >>> 0,
                        s >>>= 8,
                        u[4 * e + 2] = (255 & s) >>> 0,
                        s >>>= 8,
                        u[4 * e + 1] = (255 & s) >>> 0,
                        s >>>= 8,
                        u[4 * e] = (255 & s) >>> 0
                }
            return this.reset(),
                u
        }
    }, {
        key: "_compress",
        value: function (t) {
            if (t < 64)
                console.error("compress error: not enough data");
            else {
                for (var r = function (t) {
                    for (var r = new Array(132), e = 0; e < 16; e++)
                        r[e] = t[4 * e] << 24,
                            r[e] |= t[4 * e + 1] << 16,
                            r[e] |= t[4 * e + 2] << 8,
                            r[e] |= t[4 * e + 3],
                            r[e] >>>= 0;
                    for (var n = 16; n < 68; n++) {
                        var o = r[n - 16] ^ r[n - 9] ^ dr(r[n - 3], 15);
                        o = o ^ dr(o, 15) ^ dr(o, 23),
                            r[n] = (o ^ dr(r[n - 13], 7) ^ r[n - 6]) >>> 0
                    }
                    for (n = 0; n < 64; n++)
                        r[n + 68] = (r[n] ^ r[n + 4]) >>> 0;
                    return r
                }(t), e = this.reg.slice(0), n = 0; n < 64; n++) {
                    var o = dr(e[0], 12) + e[4] + dr(yr(n), n)
                        , i = ((o = dr(o = (4294967295 & o) >>> 0, 7)) ^ dr(e[0], 12)) >>> 0
                        , u = br(n, e[0], e[1], e[2]);
                    u = (4294967295 & (u = u + e[3] + i + r[n + 68])) >>> 0;
                    var s = mr(n, e[4], e[5], e[6]);
                    s = (4294967295 & (s = s + e[7] + o + r[n])) >>> 0,
                        e[3] = e[2],
                        e[2] = dr(e[1], 9),
                        e[1] = e[0],
                        e[0] = u,
                        e[7] = e[6],
                        e[6] = dr(e[5], 19),
                        e[5] = e[4],
                        e[4] = (s ^ dr(s, 9) ^ dr(s, 17)) >>> 0
                }
                for (var c = 0; c < 8; c++)
                    this.reg[c] = (this.reg[c] ^ e[c]) >>> 0
            }
        }
    }, {
        key: "_fill",
        value: function () {
            var t = 8 * this.size
                , r = this.chunk.push(128) % 64;
            for (64 - r < 8 && (r -= 64); r < 56; r++)
                this.chunk.push(0);
            for (var e = 0; e < 4; e++) {
                var n = Math.floor(t / 4294967296);
                this.chunk.push(n >>> 8 * (3 - e) & 255)
            }
            for (e = 0; e < 4; e++)
                this.chunk.push(t >>> 8 * (3 - e) & 255)
        }
    }]),
        t
}();

function sm3(t, r) {
    t && (this.reset(),
        this.write(t)),
        this._fill();
    for (var e = 0; e < this.chunk.length; e += 64)
        this._compress(this.chunk.slice(e, e + 64));
    var n, o, i, u = null;
    if ("hex" == r) {
        u = "";
        for (e = 0; e < 8; e++)
            u += (n = this.reg[e].toString(16),
                o = 8,
                i = "0",
                n.length >= o ? n : i.repeat(o - n.length) + n)
    } else
        for (u = new Array(32),
                 e = 0; e < 8; e++) {
            var s = this.reg[e];
            u[4 * e + 3] = (255 & s) >>> 0,
                s >>>= 8,
                u[4 * e + 2] = (255 & s) >>> 0,
                s >>>= 8,
                u[4 * e + 1] = (255 & s) >>> 0,
                s >>>= 8,
                u[4 * e] = (255 & s) >>> 0
        }
    return this.reset(),
        u
}

sm3({
    "reg": [
        1937774191,
        1226093241,
        388252375,
        3666478592,
        2842636476,
        372324522,
        3817729613,
        2969243214
    ],
    "chunk": [],
    "size": 0
}, [
    "device_platform=webapp&aid=6383&channel=channel_pc_web&item_id=7601045526687042857&comment_id=7602100809547989795&cut_version=1&cursor=0&count=3&item_type=0&update_version_code=170400&pc_client_type=1&pc_libra_divert=Mac&support_h265=1&support_dash=1&cpu_core_num=8&version_code=170400&version_name=17.4.0&cookie_enabled=true&screen_width=1440&screen_height=900&browser_language=zh-CN&browser_platform=MacIntel&browser_name=Chrome&browser_version=144.0.0.0&browser_online=true&engine_name=Blink&engine_version=144.0.0.0&os_name=Mac+OS&os_version=10.15.7&device_memory=8&platform=PC&downlink=10&effective_type=4g&round_trip_time=50&webid=7605443157111522851&uifid=e4c262a6b5e3b5badbd561631828ceb96cf9bda1502c8aff5f66458d92ccf6f38d2762055da7262b93ed261b3fe2e483179a2303cbb6922aadc6c7313ea226f56cc1edd0ec4cc20f43606347427a145f93850998a679f2d82b1b9c30fdb9f285994bd79cf3d6c49d7c687108f6c0f33489fe55d411decc9c3335aa5125353b25dfac3ce194bbf513ef7ffbb513416953eb2aff7bdbff4fec4f1681699ffd2d02&msToken=ye4XSaHrRYwvnR4kYlAjorFAuYfSQC81uuIn7z_MdLzO2Myj3LIqJV0S5b-McbVe_ciURbS8hlHm7YWn-ilfPRm_To8L5pncBi0Gl6oe1fmDXudyMogk2bBHu48ThfdIL32u7s-D66PTzgI9ifGM12aBypvmns8YamEGtaPW0iuJiA%3D%3Ddhzx"
])