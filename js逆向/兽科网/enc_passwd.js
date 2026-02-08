window = global;

Window = function () {
}
window.__proto__ = Window.prototype;

location = {
    "ancestorOrigins": {},
    "href": "https://www.bestvetschool.com/course.html",
    "origin": "https://www.bestvetschool.com",
    "protocol": "https:",
    "host": "www.bestvetschool.com",
    "hostname": "www.bestvetschool.com",
    "port": "",
    "pathname": "/course.html",
    "search": "",
    "hash": ""
};


function SetProxy(proxyObjs) {
    for (let i = 0; i < proxyObjs.length; i++) {
        const handler = `{
      get: function(target, property, receiver) {
        console.log("方法:", "get  ", "对象:", "${proxyObjs[i]}", "  属性:", property, "  属性类型：", typeof property, ", 属性值：", target[property], ", 属性值类型：", typeof target[property]);
        return target[property];
      },
      set: function(target, property, value, receiver) {
        console.log("方法:", "set  ", "对象:", "${proxyObjs[i]}", "  属性:", property, "  属性类型：", typeof property, ", 属性值：", value, ", 属性值类型：", typeof target[property]);
        return Reflect.set(...arguments);
      }
    }`;
        eval(`try {
            ${proxyObjs[i]};
            ${proxyObjs[i]} = new Proxy(${proxyObjs[i]}, ${handler});
        } catch (e) {
            ${proxyObjs[i]} = {};
            ${proxyObjs[i]} = new Proxy(${proxyObjs[i]}, ${handler});
        }`);
    }
}

proxyObjs = ['window', 'document', 'location', 'navigator', 'history', 'screen']
SetProxy(proxyObjs)


const fs = require('fs');
const path = require("path");
const wasmPath = path.join(__dirname, 'wasm_bg-19f48c42.wasm');


let _;

function WASMProxy(obj, name) {
    return new Proxy(obj, {
        get(target, propKey, receiver) {
            let temp = Reflect.get(target, propKey, receiver);
            let propType = typeof temp;
            console.log(`方法: get 对象: ${name} 属性: ${propKey.toString()} 属性类型: ${propType} 属性值类型: ${typeof temp}`);
            if (typeof temp === 'object' && temp !== null) {
                temp = WASMProxy(temp, `${name}->${propKey.toString()}`);
            }
            return temp;
        },
        set(target, propKey, value, receiver) {
            let valueType = typeof value;
            let temp = Reflect.set(target, propKey, value);
            console.log(`方法: set 对象: ${name} 属性: ${propKey.toString()} 属性类型: ${typeof target[propKey]} 属性值类型: ${valueType}`);
            return temp;
        }
    });
}

function ho() {
    const e = {};
    e.wbg = {},
        e.wbg.__wbindgen_object_drop_ref = function (n) {
            io(n)
        }
        ,
        e.wbg.__wbindgen_object_clone_ref = function (n) {
            const r = $(n);
            return X(r)
        }
        ,
        e.wbg.__wbg_instanceof_Window_0e6c0f1096d66c3c = function (n) {
            return $(n) instanceof Window
        }
        ,
        e.wbg.__wbindgen_string_new = function (n, r) {
            const o = se(n, r);
            return X(o)
        }
        ,
        e.wbg.__wbg_hasOwnProperty_d55ad5a0f2c12500 = function (n, r) {
            return $(n).hasOwnProperty($(r))
        }
        ,
        e.wbg.__wbg_location_fa9019d2eb2195e8 = function (n) {
            const r = $(n).location;
            return X(r)
        }
        ,
        e.wbg.__wbg_host_5a60711dad652364 = function () {
            return he(function (n, r) {
                const o = $(r).host
                    , i = Ae(o, _.__wbindgen_malloc, _.__wbindgen_realloc)
                    , s = ue;
                J()[n / 4 + 1] = s,
                    J()[n / 4 + 0] = i
            }, arguments)
        }
        ,
        e.wbg.__wbg_self_99737b4dcdf6f0d8 = function () {
            return he(function () {
                const n = self.self;
                return X(n)
            }, arguments)
        }
        ,
        e.wbg.__wbg_window_9b61fbbf3564c4fb = function () {
            return he(function () {
                const n = window.window;
                return X(n)
            }, arguments)
        }
        ,
        e.wbg.__wbg_globalThis_8e275ef40caea3a3 = function () {
            return he(function () {
                const n = globalThis.globalThis;
                return X(n)
            }, arguments)
        }
        ,
        e.wbg.__wbg_global_5de1e0f82bddcd27 = function () {
            return he(function () {
                const n = global.global;
                return X(n)
            }, arguments)
        }
        ,
        e.wbg.__wbindgen_is_undefined = function (n) {
            return $(n) === void 0
        }
        ,
        e.wbg.__wbg_newnoargs_e23b458e372830de = function (n, r) {
            const o = new Function(se(n, r));
            return X(o)
        }
        ,
        e.wbg.__wbg_call_ae78342adc33730a = function () {
            return he(function (n, r) {
                const o = $(n).call($(r));
                return X(o)
            }, arguments)
        }
        ,
        e.wbg.__wbindgen_throw = function (n, r) {
            throw new Error(se(n, r))
        }
    return e
}

const Q = new Array(32).fill(void 0);
Q.push(void 0, null, !0, !1);

function $(e) {
    return Q[e]
}

let ye = Q.length;

function oo(e) {
    e < 36 || (Q[e] = ye,
        ye = e)
}

function io(e) {
    const t = $(e);
    return oo(e),
        t
}

function X(e) {
    ye === Q.length && Q.push(Q.length + 1);
    const t = ye;
    return ye = Q[t],
        Q[t] = e,
        t
}

const Tn = new TextDecoder("utf-8", {
    ignoreBOM: !0,
    fatal: !0
});
Tn.decode();
let Re = null;

function Ie() {
    return (Re === null || Re.buffer !== _.memory.buffer) && (Re = new Uint8Array(_.memory.buffer)),
        Re
}

function se(e, t) {
    return Tn.decode(Ie().subarray(e, e + t))
}

let ue = 0;
const Fe = new TextEncoder("utf-8")
    , so = typeof Fe.encodeInto == "function" ? function (e, t) {
            return Fe.encodeInto(e, t)
        }
        : function (e, t) {
            const n = Fe.encode(e);
            return t.set(n),
                {
                    read: e.length,
                    written: n.length
                }
        }
;

function Ae(e, t, n) {
    if (n === void 0) {
        const d = Fe.encode(e)
            , m = t(d.length);
        return Ie().subarray(m, m + d.length).set(d),
            ue = d.length,
            m
    }
    let r = e.length
        , o = t(r);
    const i = Ie();
    let s = 0;
    for (; s < r; s++) {
        const d = e.charCodeAt(s);
        if (d > 127)
            break;
        i[o + s] = d
    }
    if (s !== r) {
        s !== 0 && (e = e.slice(s)),
            o = n(o, r, r = s + e.length * 3);
        const d = Ie().subarray(o + s, o + r)
            , m = so(e, d);
        s += m.written
    }
    return ue = s,
        o
}

let Be = null;

function J() {
    return (Be === null || Be.buffer !== _.memory.buffer) && (Be = new Int32Array(_.memory.buffer)),
        Be
}

function co(e) {
    try {
        const r = _.__wbindgen_add_to_stack_pointer(-16)
            , o = Ae(e, _.__wbindgen_malloc, _.__wbindgen_realloc)
            , i = ue;
        _.sha256(r, o, i);
        var t = J()[r / 4 + 0]
            , n = J()[r / 4 + 1];
        return se(t, n)
    } finally {
        _.__wbindgen_add_to_stack_pointer(16),
            _.__wbindgen_free(t, n)
    }
}

function uo(e) {
    try {
        const r = _.__wbindgen_add_to_stack_pointer(-16)
            , o = Ae(e, _.__wbindgen_malloc, _.__wbindgen_realloc)
            , i = ue;
        _.hmac_sha256(r, o, i);
        var t = J()[r / 4 + 0]
            , n = J()[r / 4 + 1];
        return se(t, n)
    } finally {
        _.__wbindgen_add_to_stack_pointer(16),
            _.__wbindgen_free(t, n)
    }
}

function lo(e) {
    try {
        const r = _.__wbindgen_add_to_stack_pointer(-16)
            , o = Ae(e, _.__wbindgen_malloc, _.__wbindgen_realloc)
            , i = ue;
        _.aes_encrypt(r, o, i);
        var t = J()[r / 4 + 0]
            , n = J()[r / 4 + 1];
        return se(t, n)
    } finally {
        _.__wbindgen_add_to_stack_pointer(16),
            _.__wbindgen_free(t, n)
    }
}

function fo(e) {
    try {
        const r = _.__wbindgen_add_to_stack_pointer(-16)
            , o = Ae(e, _.__wbindgen_malloc, _.__wbindgen_realloc)
            , i = ue;
        _.aes_decrypt(r, o, i);
        var t = J()[r / 4 + 0]
            , n = J()[r / 4 + 1];
        return se(t, n)
    } finally {
        _.__wbindgen_add_to_stack_pointer(16),
            _.__wbindgen_free(t, n)
    }
}

function he(e, t) {
    try {
        return e.apply(this, t)
    } catch (n) {
        _.__wbindgen_exn_store(X(n))
    }
}


function lo(e, _) {
    try {
        const r = _.__wbindgen_add_to_stack_pointer(-16)
            , o = Ae(e, _.__wbindgen_malloc, _.__wbindgen_realloc)
            , i = ue;
        _.aes_encrypt(r, o, i);
        var t = J()[r / 4 + 0]
            , n = J()[r / 4 + 1];
        return se(t, n)
    } finally {
        _.__wbindgen_add_to_stack_pointer(16),
            _.__wbindgen_free(t, n)
    }
}


/// ================================
/// 新增 main 入口（关键）
/// ================================
async function main() {

    try {
        const wasmBuffer = fs.readFileSync(wasmPath);
        const modules = WASMProxy(ho(), 'modules');
        const wasm = await WebAssembly.instantiate(wasmBuffer, modules).then(result => {
            return result.instance;
        })
        _ = wasm.exports; // 保留原逻辑
    } catch (err) {
        console.error('WASM 初始化出错:', err);
    }
    const result = lo("1770562986355;f82a69bc6dbd425b8f8421f19184d5b9;1111111", _);


    console.log('encrypt result:', result);
}

main().catch(console.error);
