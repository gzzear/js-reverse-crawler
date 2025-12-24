//https://www.hfax.com/login.html#/
var CryptoJS = require('crypto-js');
function encryptByDES (t) {
    return CryptoJS.MD5(t + "TuD00Iqz4ge7gzIe2rmjSAFFKtaIBmnr8S").toString();
}
console.log(encryptByDES("123456"));