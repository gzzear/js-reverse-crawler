const CryptoJs = require('crypto');
const decodeKey = 'ydsecret://query/key/B*RGygVywfNBwpmBaZg*WT7SIOUP2T0C9WHMZN39j^DAdaZhAnxvGcCY6VYFwnHl';
const decodeIv = 'ydsecret://query/iv/C@lZe2YzHtZ2CYgaXKSVfsb7Y4QWHjITPPZ0nQp87fBeJ!Iv6v^6fvi2WN@bYpJ4';

function T(e) {
    return CryptoJs.createHash("md5").update(e).digest()
}

function decryptData(e, decodeKey, decodeIv) {
    if (!e)
        return null;
    const t = decodeKey;
    const a = decodeIv;
    const o = T(t)
        , n = T(a)
        , r = CryptoJs.createDecipheriv("aes-128-cbc", o, n);
    let s = r.update(e, "base64", "utf-8");
    return s += r.final("utf-8"),
        s
}

function _(e) {
    return CryptoJs.createHash("md5").update(e.toString()).digest("hex")
}

function generateSign(mysticTime, secretKey) {
    return  _(`client=fanyideskweb&mysticTime=${mysticTime}&product=webfanyi&key=${secretKey}`);
}

