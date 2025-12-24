import json

import execjs
import requests


music_id = "145223"
params = {
    "ids": f"[{music_id}]",
    "level": "exhigh",
    "encodeType": "aac",
    "csrf_token": ""
}

js = execjs.compile(open('signature.js', mode='r', encoding='utf-8').read(), cwd='/opt/homebrew/lib/node_modules')
enc_dic = js.call('encrypt', json.dumps(params, separators=(',', ':')))
print(enc_dic)
resp = requests.post('https://music.163.com/weapi/song/enhance/player/url/v1', headers={
    "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36"
}, params={
    "csrf_token": ""
}, data={
    "params": enc_dic['encText'],
    "encSecKey": enc_dic['encSecKey']
})

print(resp.text)
