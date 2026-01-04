const CryptoJS = require("crypto-js");

/**
 * 生成 nonce（与前端一致）
 */
function generateNonce() {
  const chars = "0123456789abcdefghijklmnopqrstuvwxyz";
  const arr = new Array(36);

  for (let i = 0; i < 36; i++) {
    arr[i] = chars.substr(Math.floor(Math.random() * 16), 1);
  }

  arr[14] = "4";
  arr[19] = chars.substr((parseInt(arr[19], 16) & 3) | 8, 1);
  arr[8] = arr[13] = arr[18] = arr[23] = "_";

  return arr.join("");
}

/**
 * SHA1(JSON.stringify(data))
 */
function bodySha1(data) {
  return CryptoJS.SHA1(JSON.stringify(data || {})).toString();
}

/**
 * s_h：拼签名原文（\n）
 */
function buildSignPlain(method, url, timestamp, nonce, bodySha1) {
  return [
    method.toUpperCase(),
    url,
    timestamp,
    nonce,
    bodySha1
  ].join("\n");
}

/**
 * 生成 headers（核心函数）
 */
function genHeaders({ method, url, data, token = "" }) {
  const nonce = generateNonce();
  const timestamp = Math.floor(Date.now() / 1000).toString();

  const bodyHash = bodySha1(data);
  const signPlain = buildSignPlain(
    method,
    url,
    timestamp,
    nonce,
    bodyHash
  );

  const signKey = token || timestamp;
  const xSign = CryptoJS.HmacSHA1(signPlain, signKey).toString();

  return {
    "x-sign": xSign,
    "x-sign-nonce": nonce,
    "x-sign-timestamp": timestamp,
    "x-sign-version": "2.0",
    "x-sign-algorithm": "HMAC_SHA_1",
    "token": token
  };
}

/* ============ 示例 ============ */

const headers = genHeaders({
    "url": "/v58/Product/List",
    "method": "post",
    "data": {
        "currentPage": 4,
        "data": {
            "searchKey": "可口可乐",
            "searchModes": [
                2
            ],
            "sort": 0,
            "currentPage": 4,
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
        "UUID": "edb1e97abd6140eb8355bf4243d27167",
        "token": "",
        "x-sign": "b31edc04190d2310064e236787f48939e595865b"
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
});

console.log(headers);
