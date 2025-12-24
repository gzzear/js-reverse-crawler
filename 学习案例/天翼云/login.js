var CryptoJS = require('crypto-js');

function encryptPassword(userName, e) {
    var n =  userName + '000000'
        , t = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {}
        , r = t.enc
        , a = void 0 === r ? "Utf8" : r
        , o = t.mode
        , i = void 0 === o ? "ECB" : o
        , c = t.padding
        , u = void 0 === c ? "Pkcs7" : c
        , d = CryptoJS.enc[a].parse(n)
        , s = {
        mode: CryptoJS.mode[i],
        padding: CryptoJS.pad[u]
    }
        , l = CryptoJS.TripleDES.encrypt(e, d, s);
    return l.toString()
}

let encryptPasswd = encryptPassword('1213232123@163.com', '1111111');
console.log(encryptPasswd);