async function get_wasm() {
    return fetch('https://spa14.scrape.center/js/Wasm.wasm', {
        credentials: "same-origin"
    }).then(res => res.arrayBuffer())
        .then((function (t) {
                return WebAssembly.instantiate(t, {
                    "env": {},
                    "wasi_snapshot_preview1": {}
                }).then(res => {
                    return res.instance.exports;
                })
            }
        ))
}

async function get_sign(page, limit = 10) {
    var n = (page - 1) * limit;
    let $wasm = await get_wasm()
    return $wasm.encrypt(n, parseInt(Math.round((new Date).getTime() / 1e3).toString()));
}

var sign = await get_sign(3)
console.log(sign);