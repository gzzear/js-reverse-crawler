require_ = require;
// process_ = process;
const v8 = require_('v8');
const vm=require_('vm');
// delete global;
// delete Buffer;
// delete process;
delete require;
delete module;
delete exports;
delete __filename;
delete __dirname;
// delete setImmediate;
// delete clearImmediate;


v8.setFlagsFromString('--allow-natives-syntax');
let undetectable = vm.runInThisContext("%GetUndetectable()");
v8.setFlagsFromString('--no-allow-natives-syntax');

Object.defineProperties(globalThis, {
    [Symbol.toStringTag]: {
        configurable: true,
        value: 'Window'
    }
});

dtavm = {
    // log : console.log,
    log: function () { },
    _log : console.log
}

function setProxyArr(proxyObjArr) {
    for (let i = 0; i < proxyObjArr.length; i++) {
        const handler = `{
      get: function(target, property, receiver) {
      if(property === 'window'){
            return target[property];
        }
        if(property === 'globalThis'){
            return target[property];
        }
        dtavm.log("方法:", "get  ", "对象:", "${proxyObjArr[i]}", "  属性:", property, "  属性类型：", typeof property, ", 属性值：", target[property], ", 属性值类型：", typeof target[property]);
        return target[property];
      },
      set: function(target, property, value, receiver) {
        dtavm.log("方法:", "set  ", "对象:", "${proxyObjArr[i]}", "  属性:", property, "  属性类型：", typeof property, ", 属性值：", value, ", 属性值类型：", typeof target[property]);
        return Reflect.set(...arguments);
      }
    }`;
        eval(`try {
            ${proxyObjArr[i]};
            ${proxyObjArr[i]} = new Proxy(${proxyObjArr[i]}, ${handler});
        } catch (e) {
            ${proxyObjArr[i]} = {};
            ${proxyObjArr[i]} = new Proxy(${proxyObjArr[i]}, ${handler});
        }`);
    }
}

!(function () {
    "use strict";
    const $toString = Function.toString;
    const myFunction_toString_symbol = Symbol('('.concat('', ')_', (Math.random() + '').toString(36)));
    const mytoString = function () {
        return typeof this == 'function' && this[myFunction_toString_symbol] || $toString.call(this);
    };

    function set_native(func, key, value) {
        Object.defineProperty(func, key, {
            "enumerable": false,
            "configurable": true,
            "writable": true,
            "value": value
        })
    };
    delete Function.prototype['toString'];
    set_native(Function.prototype, "toString", mytoString);
    set_native(Function.prototype.toString, myFunction_toString_symbol, "function toString() { [native code] }");
    this.func_set_native = function (func) {
        set_native(func, myFunction_toString_symbol, `function ${myFunction_toString_symbol, func.name || ''}() { [native code] }`)
    }
}).call(globalThis);

// 重写全局对象原型链
function setTostringAndstringTag(obj, dictValue) {
    Object.defineProperties(obj.prototype, {
        [Symbol.toStringTag]: {
            configurable: true,
            value: obj.name
        }
    });
    globalThis.func_set_native(obj);
};
// 创建标签原型
function createTagProto(propObj,portotypeObj) {
    let res = propObj + ' = ' + 'function ' + propObj + '() { throw new TypeError("Illegal constructor"); };\n';
    res += 'setTostringAndstringTag(' + propObj + ',null);\n';
    if (portotypeObj) {
        for (let key in portotypeObj) {
            res += propObj + '.prototype.' + portotypeObj[key] + '= function ' + portotypeObj[key] + '() {};\n';
            res += 'globalThis.func_set_native(' + propObj + '.prototype.' + portotypeObj[key] + ');\n';
        }
    }
    eval(res);
}

createTagProto('EventTarget');
createTagProto('Window');
createTagProto('HTMLDocument',['createElement','createEvent','addEventListener']);
createTagProto('Document',['createElement','createEvent','addEventListener']);
createTagProto('Node');
createTagProto('Navigator');
createTagProto('HTMLHtmlElement');
createTagProto('Element');

window = globalThis;
window.__proto__ = Window.prototype;

self = window.self = window;
top = window.top = window;
parent = window.parent = window;
frames = window.frames = window;

innerWidth = 1536
innerHeight = 715
outerWidth = 1536
outerHeight = 824
screenX = 0
screenY = 0
pageYOffset = 0
pageXOffset = 0
devicePixelRatio = 1.25
isSecureContext = true

window.requestAnimationFrame = function requestAnimationFrame() { }
window.func_set_native(requestAnimationFrame);
window._sdkGlueVersionMap = { sdkGlueVersion: '1.0.0.64-fix.01', bdmsVersion: '1.0.1.19-fix.01', captchaVersion: '4.0.10' };

window.XMLHttpRequest = require_('xhr2');
Image = require_("node-js-image");

window.onwheelx = { _Ax: '0X21' };

EventSource = function EventSource() { };
window.func_set_native(EventSource);

createTagProto('MutationObserver');
createTagProto('PromiseRejectionEvent');

dispatchEvent = function dispatchEvent() { };
window.func_set_native(dispatchEvent);
dispatchEvent.prototype = null;

createTagProto('CSSRuleList');
createTagProto('DOMRectList');
createTagProto('DOMStringList');
createTagProto('DataTransferItemList');
createTagProto('FileList');
createTagProto('HTMLCollection');
createTagProto('HTMLFormElement');
createTagProto('HTMLSelectElement');
createTagProto('MediaList');
createTagProto('MimeTypeArray');
createTagProto('NamedNodeMap');
createTagProto('NodeList');
createTagProto('SVGLengthList');
createTagProto('SVGNumberList');
createTagProto('SVGPointList');
createTagProto('SVGStringList');
createTagProto('SVGTransformList');
createTagProto('SourceBufferList');
createTagProto('StyleSheetList');
createTagProto('TextTrackCueList');
createTagProto('TextTrackList');
createTagProto('TouchList');

addEventListener = function addEventListener() {
    dtavm.log("window.addEventListener::", arguments);
};
window.func_set_native(addEventListener);
addEventListener.prototype = null;

ActiveXObject = undefined;
createTagProto('BluetoothUUID');

createTagProto('External');
external = {};
external.__proto__ = External.prototype;

createTagProto('BarProp');
locationbar = { visible: true };
locationbar.__proto__ = BarProp.prototype;
toolbar = { visible: true };
toolbar.__proto__ = BarProp.prototype;

postMessage = function postMessage() { };
window.func_set_native(postMessage);
postMessage.prototype = null;

webkitRequestAnimationFrame = function webkitRequestAnimationFrame() { };
window.func_set_native(webkitRequestAnimationFrame);
webkitRequestAnimationFrame.prototype = null;

alert = function alert() { };
window.func_set_native(alert);
alert.prototype = null;

createTagProto('IDBFactory');
indexedDB = {};
indexedDB.__proto__ = IDBFactory.prototype;

createTagProto('AudioContext');

createTagProto('HTMLAudioElement');
Audio = function Audio() {
    dtavm.log("Audio", arguments);
}
window.func_set_native(Audio);
Audio.__proto__ = HTMLAudioElement.prototype;

// setTimeout = function setTimeout() {
//     dtavm.log("setTimeout", arguments);
//     // arguments[0]();
// };
// window.func_set_native(setTimeout);

// setInterval = function setInterval() {
//     dtavm.log("setInterval", arguments);
// };
// window.func_set_native(setInterval);

// clearTimeout = function clearTimeout() {
//     dtavm.log("clearTimeout", arguments);
// };
// window.func_set_native(clearTimeout);

// clearInterval = function clearInterval() {
//     dtavm.log("clearInterval", arguments);
// };
// window.func_set_native(clearInterval);


// 创建电池管理器对象原型 
const BatteryManager = {
    level: 1,
    charging: true,
    chargingTime: 0,
    dischargingTime: Infinity,
    onchargingchange: null,
    onlevelchange: null,
    toString: function toString() {
      return `BatteryManager {
        charging: ${this.charging}, 
        level: ${this.level}, 
        chargingTime: ${this.chargingTime}, 
        dischargingTime: ${this.dischargingTime} 
      }`
    }
}

createTagProto('Bluetooth');
createTagProto('StorageManager',['estimate']);
createTagProto('NavigatorUAData');
createTagProto('NetworkInformation',['onchange']);

Promise2 = {
    then: function () {
        return this;
    },
    catch: function (){},
};
storage = {
    estimate: function estimate() {
        // dtavm._log("estimate:", arguments);
        return Promise2
    },
};
storage.__proto__ = StorageManager.prototype;
window.func_set_native(storage.estimate);

connection = {
    effectiveType: '4g', rtt: 100, downlink: 10, saveData: false,
    onchange: function onchange() {
        dtavm.log("onchange:", arguments);
    },
};
connection.__proto__ = NetworkInformation.prototype;
window.func_set_native(connection.onchange);

createTagProto('Plugin');
createTagProto('PluginArray');
plugins = [{}, {}, {}, {}, {}];
plugins.__proto__ = PluginArray.prototype;

userAgentData = {
    brands: [
        { brand: 'Not=A?Brand', version: '99' },
        {brand: 'Chromium', version: '118'}
    ],
    mobile: false, platform: 'Windows'
};
userAgentData.__proto__ = NavigatorUAData.prototype;
Navigator.prototype = Object.assign(Navigator.prototype, {
    product: 'Gecko',
    productSub: '20030107',
    requestMediaKeySystemAccess: function requestMediaKeySystemAccess() {
        dtavm.log("requestMediaKeySystemAccess:", arguments);
    },
    storage: storage,
    vendorSub: '',
    vendorSubs:{ink: 1746713179238},
    vibrate: function vibrate() {
        dtavm.log("vibrate:", arguments);
    },
    webdriver: false,
    credentials: function credentials() {
        dtavm.log("credentials:", arguments);
    },
    connection: connection,
    userAgentData: userAgentData,
    appVersion: '5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.88 Safari/537.36'
});
window.func_set_native(Navigator.prototype.requestMediaKeySystemAccess);
window.func_set_native(Navigator.prototype.vibrate);
Navigator.prototype.platform = 'Win32';
Navigator.prototype.maxTouchPoints = 0;
Navigator.prototype.language = 'zh-CN';
Navigator.prototype.languages = ['zh-CN'];
Navigator.prototype.doNotTrack = null;
Navigator.prototype.deviceMemory = 8;
bluetooth = {};
bluetooth.__proto__ = Bluetooth.prototype;
Navigator.prototype.bluetooth = bluetooth;
Navigator.prototype.appName = 'Netscape';
Navigator.prototype.appCodeName = 'Mozilla';
Navigator.prototype.getBattery = function getBattery() {
    dtavm.log("getBattery", arguments);
    return Promise.resolve({
        __proto__: BatteryManager,
        // 动态参数配置（示例值）
        level: 0.99,
        charging: true,
        dischargingTime: 'Infinity' // 2小时放电时间 
    })
};
window.func_set_native(Navigator.prototype.getBattery);
Navigator.prototype.hardwareConcurrency = 8;
Navigator.prototype.plugins = plugins;
Navigator.prototype.cookieEnabled = true;
Navigator.prototype.vendor = 'Google Inc.';
// Navigator.prototype.userAgent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.88 Safari/537.36';
Navigator.prototype.userAgent = "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/132.0.0.0 Safari/537.36";

navigator = {};
navigator.__proto__ = Navigator.prototype;

createTagProto('HTMLAllCollection');
all = undetectable;
all.__proto__ = HTMLAllCollection.prototype;
all.length = 2747;

documentElement = {};
documentElement.__proto__ = HTMLHtmlElement.prototype;

createTagProto('HTMLSpanElement');
createTagProto('DOMTokenList');
DOMTokenList.prototype.values = function values() {
    dtavm.log("values:", arguments);
}
DOMTokenList.prototype.keys = function keys() {
    dtavm.log("keys:", arguments);
}
DOMTokenList.prototype.entries = function entries() {
    dtavm.log("entries:", arguments);
}
window.func_set_native(DOMTokenList.prototype.values);
window.func_set_native(DOMTokenList.prototype.keys);
window.func_set_native(DOMTokenList.prototype.entries);
span_classList = [];
span_classList.__proto__ = DOMTokenList.prototype;
span = {
    classList:span_classList
};
span.__proto__ = HTMLSpanElement.prototype;

createTagProto('HTMLBodyElement');
body = {
    clientWidth: 580,
    clientHeight: 710,
};
body.__proto__ = HTMLBodyElement.prototype;


createTagProto('CanvasRenderingContext2D',['rect', 'fillRect', 'fillText', 'beginPath', 'arc', 'closePath', 'fill', 'isPointInPath']);
two2d = {
    rect: function rect() { },
    fillRect: function fillRect() { },
    fillText: function fillText() { },
    beginPath: function beginPath() { },
    arc: function arc() { },
    closePath: function closePath() { },
    fill: function fill() { },
    isPointInPath:function isPointInPath(){},
};
two2d.__proto__ = CanvasRenderingContext2D.prototype;
window.func_set_native(two2d.rect);
window.func_set_native(two2d.fillRect);
window.func_set_native(two2d.fillText);
window.func_set_native(two2d.beginPath);
window.func_set_native(two2d.arc);
window.func_set_native(two2d.closePath);
window.func_set_native(two2d.fill);
window.func_set_native(two2d.isPointInPath);

createTagProto('WebGLRenderingContext',['getParameter', 'getExtension']);
webgl = {
    drawingBufferColorSpace: "srgb",
    drawingBufferHeight: 150,
    drawingBufferWidth: 300,
    unpackColorSpace: "srgb",
    MAX_TEXTURE_SIZE: 3379,
    MAX_TEXTURE_IMAGE_UNITS: 34930,
    MAX_VERTEX_TEXTURE_IMAGE_UNITS: 35660,
    MAX_VERTEX_UNIFORM_VECTORS: 36347,
    ARRAY_BUFFER: 34962,
    STATIC_DRAW: 35044,
    VERTEX_SHADER: 35633,
    FLOAT: 5126,
    TRIANGLE_STRIP: 5,
    RGBA: 6408,
    UNSIGNED_BYTE: 5121,
    VENDOR: 7936,
    RENDERER: 7937,
    VERSION: 7938,
    BLUE_BITS: 3412,
    DEPTH_BITS: 3414,
    GREEN_BITS: 3411,
    MAX_COMBINED_TEXTURE_IMAGE_UNITS: 35661,
    MAX_CUBE_MAP_TEXTURE_SIZE: 34076,
    MAX_FRAGMENT_UNIFORM_VECTORS: 36349,
    MAX_RENDERBUFFER_SIZE: 34024,
    MAX_TEXTURE_IMAGE_UNITS: 34930,
    MAX_TEXTURE_SIZE: 3379,
    MAX_VARYING_VECTORS: 36348,
    MAX_VERTEX_ATTRIBS: 34921,
    MAX_VERTEX_TEXTURE_IMAGE_UNITS: 35660,
    MAX_VERTEX_UNIFORM_VECTORS: 36347,
    MAX_VIEWPORT_DIMS: 3386,
    RED_BITS: 3410,
    RENDERER: 7937,
    SHADING_LANGUAGE_VERSION: 35724,
    STENCIL_BITS: 3415,
    VENDOR: 7936,
    VERSION: 7938,
    HIGH_FLOAT: 36338,
    MEDIUM_FLOAT: 36337,
    LOW_FLOAT: 36336,
    MEDIUM_INT: 36340,
    LOW_INT: 36339,
    HIGH_INT: 36341,
    getContextAttributes: function () {
        return {
            "alpha": true,
            "antialias": true,
            "depth": true,
            "desynchronized": false,
            "failIfMajorPerformanceCaveat": false,
            "powerPreference": "default",
            "premultipliedAlpha": true,
            "preserveDrawingBuffer": false,
            "stencil": false,
            "xrCompatible": false
        }
    },
    getExtension: function getExtension() {
        dtavm.log('getExtension:', arguments[0])
        if (arguments[0] === 'WEBGL_debug_renderer_info') {
            return {
                UNMASKED_RENDERER_WEBGL : 37446,
                UNMASKED_VENDOR_WEBGL : 37445
            }
        }
        if (arguments[0] === 'WEBGL_lose_context') {
            return {
                loseContext: function loseContext() { }
            }
        }
        if (arguments[0] === 'EXT_texture_filter_anisotropic') {
            return {
                MAX_TEXTURE_MAX_ANISOTROPY_EXT: 34047,
                TEXTURE_MAX_ANISOTROPY_EXT: 34046
            }
        }
    },
    getParameter: function getParameter() {
        dtavm.log('getParameter:', arguments[0])
        if (arguments[0] + '' === '37445') {
            return 'Google Inc. (Intel)'
        }
        if (arguments[0] + '' === '37446') {
            return 'ANGLE (Intel, Intel(R) UHD Graphics (0x00008A56) Direct3D11 vs_5_0 ps_5_0, D3D11)'
        }
        if (arguments[0] + '' === '3379') {
            return 16384
        }
        if (arguments[0] + '' === '34930') {
            return 16
        }
        if (arguments[0] + '' === '36347') {
            return 4096
        }
        if (arguments[0] + '' === '35660') {
            return 16
        }
        if (arguments[0] + '' === '33902') {
            return Float32Array.from([1, 1])
        }
        if (arguments[0] + '' === '33901') {
            return Float32Array.from([1, 1024])
        }
        if (arguments[0] + '' === '3413') {
            return 8
        }
        if (arguments[0] + '' === '3412') {
            return 8
        }
        if (arguments[0] + '' === '3414') {
            return 24
        }
        if (arguments[0] + '' === '3411') {
            return 8
        }
        if (arguments[0] + '' === '34047') {
            return 16
        }
        if (arguments[0] + '' === '35661') {
            return 32
        }
        if (arguments[0] + '' === '34076') {
            return 16384
        }
        if (arguments[0] + '' === '36349') {
            return 1024
        }
        if (arguments[0] + '' === '34024') {
            return 16384
        }
        if (arguments[0] + '' === '36348') {
            return 30
        }
        if (arguments[0] + '' === '34921') {
            return 16
        }
        if (arguments[0] + '' === '3410') {
            return 8
        }
        if (arguments[0] + '' === '7937') {
            return 'WebKit WebGL'
        }
        if (arguments[0] + '' === '35724') {
            return 'WebGL GLSL ES 1.0 (OpenGL ES GLSL ES 1.0 Chromium)'
        }
        if (arguments[0] + '' === '3415') {
            return 0
        }
        if (arguments[0] + '' === '7936') {
            return 'WebKit'
        }
        if (arguments[0] + '' === '7938') {
            return 'WebGL 1.0 (OpenGL ES 2.0 Chromium)'
        }
        if (arguments[0] + '' === '3386') {
            return Int32Array.from([32767, 32767])
        }
    },
};
webgl.__proto__ = WebGLRenderingContext.prototype;
window.func_set_native(webgl.getExtension);
window.func_set_native(webgl.getParameter);

createTagProto('HTMLCanvasElement',['getContext', 'toDataURL']);
createTagProto('CSSStyleDeclaration');
canvas_style = {};
canvas_style.__proto__ = CSSStyleDeclaration.prototype;
canvas = {
    tagName: 'CANVAS',
    style: canvas_style,
    getContext: function getContext() {
        dtavm.log('canvas.getContext:', arguments);
        if (arguments[0] === '2d') {
            return two2d
        }
        if (arguments[0] === 'webgl') {
            return webgl
        }
    },
    toDataURL: function toDataURL() {
        debugger;
        return  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASwAAACWCAYAAABkW7XSAAAAAXNSR0IArs4c6QAAC3lJREFUeF7tnUuoJdUZhZcBFXRiQITugRhQsFt8DAz2RAUF4wMTdGRAxYkPjCFBFAUH4kBQFFGM4mMiKuhIUfERQUGdtOjAB3YLCgkOukEazEQhCib1S53O4ebee6pOVe36a9V3p12197++dXpxqs7e/z5C+f92SDpd0i5JJ0s6UdJOScdLOk7SMZKOrGX8JOkHSf+SdEjSAUnfSPpa0n5Jn0s6mF8yFUIAApsROCIhllMlXSDpXEl7JJ3Uc43/lLRX0geS3pX0Zc/jMxwEIDAQgSyBdY6kKyRdLmn3QFq3GnafpNckvSzpw8JzMx0EINCCwJiBFY9011WPa1dXYXFmi5qHvPTT6rHz+epb3TP1I+WQczE2BCDQksAYgRXvo/5UvV+6QdIY8zdB9J/qPdlTkh6r33s1uYdrIACBgQmUDIwIqtslXTOwpr6Hf07SAwRX31gZDwLtCZQIrHj0u7t6xLqlfXmp7vhb9Y3wHh4VU3lCMTMjMHRg3VwtObi3Xn7ggDaWS9wl6XEHMWiAwNQIDBVYsTThoepXt0umBqRhvW9KupUlEQ1pcRkEeiIwRGBdXy3qjMeno3qqMeswP9aPuU9nLZC6IOBGoO/AeqJaSX6jG6QVep6UdNPMNCMXAqMQ6CuwYrtM/Jp23igqxp/0/frXz9gGxB8EIDAQgT4CK1apvzjAFpqBJA82bGz5uYrV8oPxZWAIdF64eZGkl6p1SsfC8hcC30u6UtLb8IAABPon0OUb1mX1HrwuY/SvaPwRY5V87Il8ffxSqAACXgTWDZv4ZvVW4q01Y7sUoXUx37TGtoH53QisE1jxzuodHgNXfhTi8fBC3mmt5MQFEGhMoG1gxa+B7/GCvTHfeBF/ft1EsPFNXAgBCGxOoG1gRVjNdenCup+hWPIQocUfBCDQkUCbwJrjotCOeA/fzuLSvkgyzqwJNA2s2G4T/aH4W59A9P9iG8/6/LgTAo3WYcVG5ujE6b43cOiPQ+w9jM6q9JAfmjTj2xJo8g3rDeOuC6WNjS4Pl5aelPkg4EJgVWBFP6toE8xffwSiPTT9tPrjyUgzIrBdYEWn0K+Mmu9lsTWaAJ5C59IsdlDHlAhsF1iPGrQ1zupF9Av7c9biqAsCWQlsFVhxYMRnWYs2qesMDrYwcRIZxQhsFVjPTvB0m2LQepoo+odd29NYDAOBWRDYLLD4dlXOer5llWPNTAYENgssVrSXM5YV8OVYM5MBgY2BFb8MfkvbmGLORhuaE/jFsBhvJpo4gY2BdVt9yvHEZU2q/DgN+8FJVUyxEBiJwMbA+qTePjJSObOcNrY9nTVL5YiGQEsCy4EVjfn2tryfy/shsIdGf/2AZBRvAsuBdZ+kO7zlplV3v6Q701ZHYRBIQmA5sL6QtDtJXXMrY5+k0+YmGr0QaEtgEVjRQmZ/25u5vlcCu2g90ytPBjMksAgsujKMby5dHMb3gAqSE1gE1gv1qcXJy7UuL07P/qO1QsRBoCOBRWD9g5NwOpLsfnucsPOb7sMwAgR8CURg7ZB0wFfipJTtlHRwUhVTLAQKEojAilOc/15wTqbamsDvOC2ajwcEtiYQgfWXqqvow0BKQeCvkh5JUQlFQCAhgQgsOovmMYZOpHm8oJKEBCKwXpH0+4S1zbGkVyX9YY7C0QyBJgQisD6SdHaTi7lmcAIfS/rt4LMwAQQmSiACiyUNecxjaUMeL6gkIYEIrO84yiuNM3EE2K/TVEMhEEhGIALr3xxDn8aVOM7+6DTVUAgEkhGIwPqZlshpXImWyb9KUw2FQCAZAQIrlyEEVi4/qCYZAR4JcxnCI2EuP6gmGQFeuucyhJfuufygmmQEWNaQyxCWNeTyg2qSEWDhaC5DWDiayw+qSUaArTm5DGFrTi4/qCYZATY/5zKEzc+5/KCaZARoL5PLENrL5PKDapIRoIFfLkNo4JfLD6pJRoAWybkMoUVyLj+oJhkBDqHIYwhLGvJ4QSVJCXDMVx5jOOYrjxdUkpQAB6nmMYaDVPN4QSVJCXBUfR5jOKo+jxdUkpTAIrCivC8k7U5ap3tZ+ySd5i4SfRDoSmA5sO6TdEfXAbl/LQL3S7pzrTu5CQIzIrAcWOdI2jsj7Zmk7pH0YaaCqAUCGQksB1bU94mkMzMWalzTp5LOMtaHNAj0RmBjYN0m6YHeRmegJgRul/Rgkwu5BgJzJ7AxsI6X9C093ot9LKIl8gmSDhWbkYkgMGECGwMrpDwh6cYJa5pS6U9KumlKBVMrBMYksFlgnS7pszGLmtHcZ0j6fEZ6kQqBTgQ2C6wY8FlJ13QamZtXEXhO0rWrLuLfIQCB/xHYKrD4ljX8p4RvV8MzZgYzAlsFVsh8tHoZfIuZ3ixy6CyaxQnqmBSB7QIrfjH8StJxk1KUv9g4yusUfhnMbxQV5iOwXWBFtTdLeixf2ZOuiK4Mk7aP4scksCqworY3qm0jl4xZpNHcb0q61EgPUiBQlECTwDpVUmwfOapoZX6TxTH0se3pSz9pKIJAGQJNAisquV7SU2VKsp3lBklP26pDGAQKEGgaWFEKK+DXN4QV7euz404IHCbQJrDipvcknQe/VgTel3R+qzu4GAIQ2JRA28A6sQ6tk+DZiECchBNh9U2jq7kIAhDYlkDbwIrBotHfO1UbmmNhuy2B7yVdSGM+PiUQ6I/AOoEVs18k6S3a0GxpRLSNuVjS2/1ZxUgQgMC6gRXkLpP0GqH1fx+iCKvLJb3OxwsCEOiXQJfAWnzTeonHw8OmxGPglXyz6vdDymgQWBDoGliLd1pxavHcX8THC/areGfFfy4IDEegj8CK6uLXw+jvNNclD7F0IfqH8WvgcJ9VRoaA+gqsBco5Li5lUSj/kSBQiEDfgRVlxzae6Pfkvvcw9gZGvzC22xT6sDINBIYIrKAaG6YfMu7yEF0XbmUjM/+BIFCWwFCBtVAR/bTuNWoCGM337qqO5nq8rE3MBgEIBIGhAyvmiM6ldxu0W47H3HvoFMp/HAiMR6BEYC3UxcEWccrx1E7jiV8/4zRsjuMa73PKzBD4hUDJwFoOrmgTHP2hxpi/ifWxWj36f0V7aIKqCTGugUABAmMGRjwqXifp6roTZwG5K6eIzqrPV4tgn+HRbyUrLoBAcQJjBtay2OgAcUW9B293YQr76j2RL7NKvTB5poNASwJZAmu57FgScUHVwubcqiPEngG2/MQWmr1V65cPqpX577I0oeUnhsshMCKBjIG1EccOSfHCflf1uHZyvQ1oZ/3rY5yZeEy1dOLI+qafJP0gKZYfHKrekx2ot8t8LWl//T7q4Ii8mRoCEOhAYAqB1UEet0IAAk4ECCwnN9ECAXMCBJa5wciDgBMBAsvJTbRAwJwAgWVuMPIg4ESAwHJyEy0QMCdAYJkbjDwIOBEgsJzcRAsEzAkQWOYGIw8CTgQILCc30QIBcwIElrnByIOAEwECy8lNtEDAnACBZW4w8iDgRIDAcnITLRAwJ0BgmRuMPAg4ESCwnNxECwTMCRBY5gYjDwJOBAgsJzfRAgFzAgSWucHIg4ATAQLLyU20QMCcAIFlbjDyIOBEgMBychMtEDAnQGCZG4w8CDgRILCc3EQLBMwJEFjmBiMPAk4ECCwnN9ECAXMCBJa5wciDgBMBAsvJTbRAwJwAgWVuMPIg4ESAwHJyEy0QMCdAYJkbjDwIOBEgsJzcRAsEzAkQWOYGIw8CTgQILCc30QIBcwIElrnByIOAEwECy8lNtEDAnACBZW4w8iDgRIDAcnITLRAwJ0BgmRuMPAg4ESCwnNxECwTMCRBY5gYjDwJOBAgsJzfRAgFzAgSWucHIg4ATAQLLyU20QMCcAIFlbjDyIOBEgMBychMtEDAnQGCZG4w8CDgRILCc3EQLBMwJEFjmBiMPAk4ECCwnN9ECAXMC/wXnhQimK8ldWwAAAABJRU5ErkJggg=='
    }
};
canvas.__proto__ = HTMLCanvasElement.prototype;
window.func_set_native(canvas.getContext);
window.func_set_native(canvas.toDataURL);

createTagProto('HTMLVideoElement',['canPlayType']);
video = {
    canPlayType: function canPlayType() {
        dtavm.log('video.canPlayType:', arguments);
        if (arguments[0] === 'video/mp4; codecs="flac"') {
            return 'probably'
        }
        if (arguments[0] === 'video/mp4; codecs="H.264, mp3"') {
            return ''
        }
        if (arguments[0] === 'video/mp4; codecs="H.264, aac"') {
            return ''
        }
        if (arguments[0] === 'video/mpeg; codec="H.264"') {
            return ''
        }
        if (arguments[0] === 'video/ogg; codecs="theora"') {
            return 'probably'
        }
        if (arguments[0] === 'video/ogg; codecs="opus"') {
            return 'probably'
        }
        if (arguments[0] === 'video/webm; codecs="vp9, opus"') {
            return 'probably'
        }
        if (arguments[0] === 'video/webm; codecs="vp8, vorbis"') {
            return 'probably'
        }
    },
};
video.__proto__ = HTMLVideoElement.prototype;
window.func_set_native(video.canPlayType);

createTagProto('FontFaceSet',['check']);
fonts = {
    check: function check() {
        if (arguments[0] === '72px MYRIAD PRO') {
            return false
        }
        if (arguments[0] === '72px Savoye LET') {
            return false
        }
        if (arguments[0] === '72px Arial Hebrew') {
            return false
        }
        if (arguments[0] === '72px AVENIR') {
            return false
        }
        if (arguments[0] === '72px Futura') {
            return false
        }
        if (arguments[0] === '72px OPTIMA') {
            return false
        }
        if (arguments[0] === '72px Palatino') {
            return false
        }
        if (arguments[0] === '72px IrisUPC') {
            return false
        }
        if (arguments[0] === '72px Aparajita') {
            return false
        }
        if (arguments[0] === '72px CordiaUPC') {
            return false
        }
        if (arguments[0] === '72px Vrinda') {
            return false
        }
        if (arguments[0] === '72px Gulim') {
            return false
        }
        if (arguments[0] === '72px Tunga') {
            return false
        }
        if (arguments[0] === '72px Meiryo') {
            return false
        }
        return true
    },
};
fonts.__proto__ = FontFaceSet.prototype;
window.func_set_native(fonts.check);

createTagProto('MouseEvent');
mousemoveX = {
    isTrusted: true,
    clientX: 1149,
    clientY: 4
};
mousemoveX.__proto__ = MouseEvent.prototype;

document = {
    fonts:fonts,
    body:body,
    all: all,
    createElement: function createElement() {
        dtavm.log("createElement", arguments);
        if (arguments[0] === 'span') {
            return span
        }
        if (arguments[0] === 'canvas') {
            return canvas
        }
        if (arguments[0] === 'video') {
            return video
        }
    },
    documentElement: documentElement,
    createEvent:function createEvent() {
        dtavm.log("createEvent", arguments);
    },
    addEventListener: function addEventListener() {
        if (arguments[0] === 'mousemove') {
            window.mousemoveXEvent = arguments[1];
            // dtavm.log("addEventListener::", arguments[1]+'');
        }
    },
    characterSet: "UTF-8",
    compatMode: 'CSS1Compat',
    images: [{}, {}, {}, {}, {}]
};
document.__proto__ = HTMLDocument.prototype;
window.func_set_native(document.createElement);
window.func_set_native(document.createEvent);
window.func_set_native(document.addEventListener);

createTagProto('Location');
location = {
    "ancestorOrigins": {},
    "href": "https://www.douyin.com/?recommend=1",
    "origin": "https://www.douyin.com",
    "protocol": "https:",
    "host": "www.douyin.com",
    "hostname": "www.douyin.com",
    "port": "",
    "pathname": "/",
    "search": "?recommend=1",
    "hash": ""
};
location.__proto__ = Location.prototype;

document.location = location;
document.cookie = '__ac_nonce=0681ca36300cc65605b0; __ac_signature=_02B4Z6wo00f01w31XzgAAIDDjfelecEMhBMN1VuAAKts17; UIFID_TEMP=e35d48d50542e069836dcfd6c1b7719d3f3cf385c1bd9d7d6a168d32a6a94fd1a02e7becb55b756deb8caeb2a02bd97a37df40447755c7893687bef24926c04d4bc3a8556db2727078316d1277a5faff3e60a533cc9e426d5317dc27904540268dbd45ba97f76a5c49e6b897779c88ae; x-web-secsdk-uid=a18ae3db-19ea-4455-9730-67858e625897; s_v_web_id=verify_mafcfetp_hvOIURQG_bQt4_4Ufk_9vJc_OiWhFlHwMs1b; douyin.com; device_web_cpu_core=8; device_web_memory_size=8; hevc_supported=true; IsDouyinActive=true; home_can_add_dy_2_desktop=%220%22; dy_swidth=1536; dy_sheight=864; stream_recommend_feed_params=%22%7B%5C%22cookie_enabled%5C%22%3Atrue%2C%5C%22screen_width%5C%22%3A1536%2C%5C%22screen_height%5C%22%3A864%2C%5C%22browser_online%5C%22%3Atrue%2C%5C%22cpu_core_num%5C%22%3A8%2C%5C%22device_memory%5C%22%3A8%2C%5C%22downlink%5C%22%3A1.35%2C%5C%22effective_type%5C%22%3A%5C%223g%5C%22%2C%5C%22round_trip_time%5C%22%3A300%7D%22; strategyABtestKey=%221746707303.131%22; volume_info=%7B%22isUserMute%22%3Afalse%2C%22isMute%22%3Afalse%2C%22volume%22%3A0.5%7D; stream_player_status_params=%22%7B%5C%22is_auto_play%5C%22%3A0%2C%5C%22is_full_screen%5C%22%3A0%2C%5C%22is_full_webscreen%5C%22%3A0%2C%5C%22is_mute%5C%22%3A0%2C%5C%22is_speed%5C%22%3A1%2C%5C%22is_visible%5C%22%3A1%7D%22; passport_csrf_token=404c33c9f715ab8ec9ec3656da640637; passport_csrf_token_default=404c33c9f715ab8ec9ec3656da640637; xgplayer_user_id=530555340005; FORCE_LOGIN=%7B%22videoConsumedRemainSeconds%22%3A180%7D; fpk1=U2FsdGVkX18tgO1vrp6ZfYGQVLmh4BZS5ZzW+t3ReO93C0XgyWAG8aXjBD3kaOUGPCvKC9PZSZInTKMtm+6eTQ==; fpk2=b75db699cce29d174140fd884d454724; __security_mc_1_s_sdk_cert_key=1ab097c3-4a24-bcf2; __security_mc_1_s_sdk_sign_data_key_web_protect=9bbf430a-4b29-b931; __security_mc_1_s_sdk_crypt_sdk=17331e20-4eca-88a6; bd_ticket_guard_client_data=eyJiZC10aWNrZXQtZ3VhcmQtdmVyc2lvbiI6MiwiYmQtdGlja2V0LWd1YXJkLWl0ZXJhdGlvbi12ZXJzaW9uIjoxLCJiZC10aWNrZXQtZ3VhcmQtcmVlLXB1YmxpYy1rZXkiOiJCUGxIc2phMjZ1VnMrcWJKMmYyRXI4L2kyYlRzcmtJVyt6SzNoVm1uV21ZQnZOV2s4d3U1aVBENW5pcHNtRHhQQlRGbG9QWVI3aGZuazk0YmFNaDBHVU09IiwiYmQtdGlja2V0LWd1YXJkLXdlYi12ZXJzaW9uIjoyfQ%3D%3D; bd_ticket_guard_client_web_domain=2; __security_mc_1_s_sdk_sign_data_key_sso=07234e32-49a8-a65a; biz_trace_id=53947801; is_dash_user=1; download_guide=%221%2F20250508%2F0%22'

createTagProto('Screen');
createTagProto('ScreenOrientation');
orientation = {
    angle: 0,
    type: "landscape-primary",
    onchange: null
};
orientation.__proto__ = ScreenOrientation.prototype;
screen = {
    availHeight: 824,
    availLeft: 0,
    availTop: 0,
    availWidth: 1536,
    colorDepth: 24,
    height: 864,
    isExtended: true,
    onchange: null,
    pixelDepth: 24,
    width: 1536,
    orientation: orientation
};
screen.__proto__ = Screen.prototype;

createTagProto('History');
history = {};
history.__proto__ = History.prototype;

chrome = {
    app: {
        InstallState: { DISABLED: 'disabled', INSTALLED: 'installed', NOT_INSTALLED: 'not_installed' },
        RunningState: { CANNOT_RUN: 'cannot_run', READY_TO_RUN: 'ready_to_run', RUNNING: 'running' },
        getDetails:function(){},
        getIsInstalled:function(){},
        installState:function(){},
        isInstalled: false,
        runningState: function(){}
    },
    csi: function () { },
    loadTimes: function () { },
}

createTagProto('Storage',['getItem','setItem','removeItem','clear']);
local = {
    "FeedBackFlag": "1",
    "__tea_cache_tokens_2018": "{\"web_id\":\"7502050669407995403\",\"user_unique_id\":\"verify_mafcfetp_hvOIURQG_bQt4_4Ufk_9vJc_OiWhFlHwMs1b\",\"timestamp\":1746707301021,\"_type_\":\"default\"}",
    "__tea_cache_first_7497": "1",
    "SysInfo": "{\"hash\":\"90748894c2dc619ca7aff33cb4541158\",\"webid\":\"7502050661513971211\"}",
    "dtrait-sdk/s_sdk_server_cert_key": "eyJjZW50cmFsUnNhUHViIjoiTFMwdExTMUNSVWRKVGlCU1UwRWdVRlZDVEVsRElFdEZXUzB0TFMwdENrMUpTVUpEWjB0RFFWRkZRWEEyZDJrMFJYSnpNWE5wZDJaS1oxRXhaRzB2VWtkVVNVWm1hMHN4U3pOcU4zaE1VVkpIWnl0bU5tNHlaVFJUV1dsb2FHMEthR1J4VVZkWFQxUnZXVzluY2tFd1YyNUphWGRHYVdkUGVIaEdiRzFRUWtsR2VraFVLMnhGZEZBMk1WWlpNMlY1U3pSd2MxWlVRV2hMZDNaR1Z6WldaQXBSUVhsWlFXTTBPWGxpVDNsRVNHbEljRXB6Um1NeFJGaEZVR0o1Y3psSmFtcHhaRTV2YTBOSVZtNXVSekZrVDFCaFREY3JWM05YUVVWRlprSlRUMWc0Q2xKRGVXeG5UbEZEWldSS1FuWnhjVWxVZDBoTWJsTmlVMUJtY1V3NVpHNXNVMUE1Y0M5YWNYTklTV3RXZUhKeFZtNXJLM0ZLU2pJdksyZ3JZM0ZpWkdJS1NrMTJiM2huU21Kc2IyRnlOMnMwTW1kRGN6TjNNMDlQVVc1c1MyVjBhMllyZWlzNGVXaEJVVlI0VEVGS05VbFlNazkwYTNBcmFEUlZTbkIyV21zMVlncHFOVFZCVW1seFJuWk5kR3hWWlVaT0wzQlZiRXBYTWtsSWFIUXpaVFI2Y21GUlNVUkJVVUZDQ2kwdExTMHRSVTVFSUZKVFFTQlFWVUpNU1VNZ1MwVlpMUzB0TFMwSyIsImNlbnRyYWxWZXJzaW9uIjoiZDEiLCJ1cmxWZXJzaW9uIjoiMS4wLjI2IiwiZFRyYWl0VmVyc2lvbiI6MCwiY3JlYXRlZFRpbWUiOjE3NDY3MDczMDY3OTd9",
    "SLARDARdouyin_login_sdk": "JTdCJTIydXNlcklkJTIyOiUyMjc1MDIwNTA2NjE1MTM5NzEyMTElMjIsJTIyZGV2aWNlSWQlMjI6JTIyMmUzZjRhZDctZmIwMC00YmIxLWFjMDktZGVkMGE0Y2IzMmIzJTIyLCUyMmV4cGlyZXMlMjI6MTc1NDQ4MzMxMjMyOCU3RA==",
    "__tea_cache_tokens_7497": "{\"web_id\":\"7502050687507170857\",\"user_unique_id\":\"7502050661513971211\",\"timestamp\":1746707306151,\"_type_\":\"default\"}",
    "video_can_play_type": "\"maybe\"",
    "shortcutKeyTopicInfo": "{\"isUse\":false,\"expireTime\":1746966511487,\"useHistory\":{\"3\":true}}",
    "xmst": "lKUcu-6wV2KwpVZvKWZf-CQtIkaSbn7cgmtOxFZV0gokhoQjoZVQkJhVJEPcrGsAwOxSUQnfw00ngOJooE89AyMHN1TA61XqlcwvBeRAc6HMPw2lTCjLuLRgWwciGe2GdB11x7vPxzLfbrg2ypeKw4RCf3RsH6gf4gqJNQ0b0-k=",
    "__tea_cache_tokens_3722": "{\"web_id\":\"7502050674055104041\",\"user_unique_id\":\"7502050661513971211\",\"timestamp\":1746707302056,\"_type_\":\"default\"}",
    "web_secsdk_runtime_cache": "{\"csrfWebToken\":[\"POST: www.douyin.com//service/2/abtest_config/compute\",\"POST: www.douyin.com//service/2/abtest_config/execute\",\"POST: www.douyin.com//aweme/v2/web/aweme/stats/compute\",\"POST: www.douyin.com//aweme/v2/web/aweme/stats/execute\",\"POST: www.douyin.com//passport/ticket_guard/get_client_cert/compute\",\"POST: www.douyin.com//passport/ticket_guard/get_client_cert/execute\",\"GET: www.douyin.com//aweme/v1/web/danmaku/conf/get/compute\",\"GET: www.douyin.com//aweme/v1/web/danmaku/conf/get/execute\",\"GET: www.douyin.com//aweme/v1/web/danmaku/get_v2/compute\",\"GET: www.douyin.com//aweme/v1/web/danmaku/get_v2/execute\"]}",
    "__tea_cache_tokens_6383": "{\"web_id\":\"7502050666153100819\",\"user_unique_id\":\"7502050661513971211\",\"timestamp\":1746707311893,\"_type_\":\"default\"}",
    "player_volume": "0.5",
    "__msuuid__": "52b20c6d-9b2f-4b9b-a9c5-2b5a54fc728d",
    "__tea_cache_first_1300": "1",
    "__tea_cache_first_496513": "1",
    "__tea_cache_first_6383": "1",
    "__tea_cache_tokens_496513": "{\"web_id\":\"7502050685094807076\",\"user_unique_id\":\"7502050685094807076\",\"timestamp\":1746707304508,\"_type_\":\"default\"}",
    "IS_SUPPORT_HEVC_TEST_1": "{\"has_detect\":true,\"is_support\":false,\"pure_support\":true}",
    "__PRE_CACHE__KEYS": "",
    "websocketkey20230220": "[{\"param_name\":\"live_id\",\"param_type\":\"string\"},{\"param_name\":\"aid\",\"param_type\":\"string\"},{\"param_name\":\"version_code\",\"param_type\":\"string\"},{\"param_name\":\"webcast_sdk_version\",\"param_type\":\"string\"},{\"param_name\":\"room_id\",\"param_type\":\"string\"},{\"param_name\":\"sub_room_id\",\"param_type\":\"string\"},{\"param_name\":\"sub_channel_id\",\"param_type\":\"string\"},{\"param_name\":\"did_rule\",\"param_type\":\"string\"},{\"param_name\":\"user_unique_id\",\"param_type\":\"string\"},{\"param_name\":\"device_platform\",\"param_type\":\"string\"},{\"param_name\":\"device_type\",\"param_type\":\"string\"},{\"param_name\":\"ac\",\"param_type\":\"string\"},{\"param_name\":\"identity\",\"param_type\":\"string\"}]",
    "SLARDARdouyin_web": "JTdCJTIydXNlcklkJTIyOiUyMmJhYzk5ZGRjLTVmZjYtNGQwNi05OGI5LTI2MzYzNzQwMzgyYiUyMiwlMjJkZXZpY2VJZCUyMjolMjIwZjk5ZjY5YS0xN2Q1LTQxM2EtOTBjZi1kNzI4YWYzYzYyNDUlMjIsJTIyZXhwaXJlcyUyMjoxNzU0NDgzMzAwNDM5JTdE",
    "SLARDARuc_secure_sdk": "JTdCJTIydXNlcklkJTIyOiUyMjZmMmQ5ZjBjLTE5OWUtNDJmNS05MTQyLWFhZjE4YWNmMTZjMSUyMiwlMjJkZXZpY2VJZCUyMjolMjIzZGVkNDhhZS0zNTJkLTRkZjUtOGY3MS01YWZjMDY4OGM5OWYlMjIsJTIyZXhwaXJlcyUyMjoxNzU0NDgzMzA0OTQ1JTdE",
    "__LAST_LOGIN_GUIDE_RECORD": "{\"scene\":\"related_video\",\"time\":1746707311.762}",
    "SEARCH_HISTORY_guest": "U2FsdGVkX1/RW/OHgzhj5r24A61uUigNZH/yfcm7GJ4=",
    "__tea_cache_first_3722": "1",
    "LoginGuidingStrategyCounter": "{\"full_login_panel\":{\"cold_start\":{\"counts\":1,\"first_time\":1746707305.018,\"last_time\":1746707305.018}},\"login_guide_panel\":{\"comment_detail\":{\"counts\":0,\"first_time\":0,\"last_time\":0},\"comment_feed\":{\"counts\":1,\"first_time\":1746707311.768,\"last_time\":1746707311.768}}}",
    "a11y_device_id": "i74pxw66wlp",
    "powerEfficient": "1",
    "__tea_sdk_ab_version_6383": "{\"data\":{\"account_sdk_js_ch_enable_v1\":{\"val\":1,\"vid\":\"10519649\"},\"activity_push\":{\"val\":1,\"vid\":\"90087666\"},\"ad_comment_ai_preload_status\":{\"val\":1,\"vid\":\"90108835\"},\"add_page_view_log\":{\"val\":true,\"vid\":\"90120742\"},\"after_lcp_execute\":{\"val\":1,\"vid\":\"6071955\"},\"ai_search_global\":{\"val\":0,\"vid\":\"12218010\"},\"allow_low_danmaku\":{\"val\":1,\"vid\":\"12006415\"},\"android_32_bit\":{\"val\":1,\"vid\":\"90093629\"},\"audio_grouping_strategy\":{\"val\":1,\"vid\":\"90122460\"},\"author_card_slide_optimize\":{\"val\":0,\"vid\":\"12417308\"},\"author_optimize\":{\"val\":{\"fetch\":0,\"render\":0},\"vid\":\"12417308\"},\"auto_show_download_guide_in_fifa\":{\"val\":1,\"vid\":\"90092748\"},\"avatar_live_mode\":{\"val\":1,\"vid\":\"90081882\"},\"backpack_entry\":{\"val\":1,\"vid\":\"90090776\"},\"black_screen_opt\":{\"val\":1,\"vid\":\"8011838\"},\"blank_screen_optimize\":{\"val\":1,\"vid\":\"90093266\"},\"browser_plugin_guide\":{\"val\":1,\"vid\":\"90098844\"},\"chapter_detail_page\":{\"val\":1,\"vid\":\"12210886\"},\"chapter_entry_type\":{\"val\":2,\"vid\":\"90611444\"},\"check_safe\":{\"val\":1,\"vid\":\"90110445\"},\"check_task\":{\"val\":1,\"vid\":\"90117191\"},\"cientPush\":{\"val\":1,\"vid\":\"90083635\"},\"click_to_download\":{\"val\":1,\"vid\":\"90093785\"},\"client_db_consistency\":{\"val\":{\"get_follow_status_err\":false,\"get_is_block\":true},\"vid\":\"10452738\"},\"client_download_style\":{\"val\":1,\"vid\":\"90092973\"},\"client_home_style\":{\"val\":1,\"vid\":\"91000435\"},\"codec_mix\":{\"val\":0,\"vid\":\"12194868\"},\"cold_start_download_modal_new\":{\"val\":2,\"vid\":\"90123289\"},\"cold_start_login_guide_close_mode\":{\"val\":3,\"vid\":\"90081783\"},\"collect_mix\":{\"val\":3,\"vid\":\"90093578\"},\"collection_guide\":{\"val\":2,\"vid\":\"90093082\"},\"collection_reverse\":{\"val\":{\"collection_layout\":2,\"collection_route\":2},\"vid\":\"90108924\"},\"comment_ai_preload_status\":{\"val\":1,\"vid\":\"90097344\"},\"comment_experience\":{\"val\":1,\"vid\":\"90120888\"},\"comment_img\":{\"val\":1,\"vid\":\"90097678\"},\"comment_opt\":{\"val\":1,\"vid\":\"90093532\"},\"comment_render_optimize\":{\"val\":2,\"vid\":\"12066344\"},\"dash_config\":{\"val\":{\"canplayTimeout\":5000,\"downgrade\":1,\"fixPreplay\":1,\"usePlayAbortRetry\":true,\"videoDuration\":60000},\"vid\":\"12563962\"},\"defer_network\":{\"val\":1,\"vid\":\"90126295\"},\"detail_search\":{\"val\":1,\"vid\":\"90127231\"},\"detect_gpu\":{\"val\":1,\"vid\":\"90095473\"},\"device_downgrade\":{\"val\":4,\"vid\":\"90108557\"},\"disable_h265_1080\":{\"val\":0,\"vid\":\"8919418\"},\"disable_timeupdate_volume_balance\":{\"val\":1,\"vid\":\"10095948\"},\"discover_cache\":{\"val\":2,\"vid\":\"90324429\"},\"discover_data_prefetch\":{\"val\":1,\"vid\":\"90106932\"},\"discover_dislike\":{\"val\":1,\"vid\":\"90108281\"},\"discover_enable_webp\":{\"val\":1,\"vid\":\"12489666\"},\"discover_feed_caching\":{\"val\":1,\"vid\":\"90176124\"},\"discover_feed_lite\":{\"val\":1,\"vid\":\"90178352\"},\"discover_feed_max_age\":{\"val\":30,\"vid\":\"90176122\"},\"discover_render_opt\":{\"val\":10,\"vid\":\"8804639\"},\"discover_scroll_perf\":{\"val\":1,\"vid\":\"90107374\"},\"discover_size\":{\"val\":2,\"vid\":\"90111130\"},\"discover_slide_optimize\":{\"val\":1,\"vid\":\"12158982\"},\"discover_use_cache\":{\"val\":1,\"vid\":\"12525872\"},\"discover_video_card_optimize_v1\":{\"val\":1,\"vid\":\"90970690\"},\"discover_video_card_optimize_v3\":{\"val\":1,\"vid\":\"90970119\"},\"discover_video_card_optimize_v4\":{\"val\":1,\"vid\":\"90970149\"},\"download_guide\":{\"val\":1,\"vid\":\"90095121\"},\"download_guide_stage2\":{\"val\":3,\"vid\":\"90083791\"},\"enable_abnormal_mse\":{\"val\":1,\"vid\":\"11198332\"},\"enable_first_mse\":{\"val\":1,\"vid\":\"11198332\"},\"enable_hover_to_display\":{\"val\":1,\"vid\":\"90094277\"},\"enable_next_slide\":{\"val\":1,\"vid\":\"90107982\"},\"entry_optimization\":{\"val\":1,\"vid\":\"90116308\"},\"entry_settings\":{\"val\":2,\"vid\":\"90117713\"},\"error_boundary_opt\":{\"val\":1,\"vid\":\"6012408\"},\"excellent_bitrate_selector\":{\"val\":{},\"vid\":\"12101510\"},\"exposure_defination\":{\"val\":1,\"vid\":\"11550766\"},\"extra_bitrate_whitelist\":{\"val\":{\"cpu_high\":[\"low_1080_0\",\"low_720_0\",\"low_540_0\"],\"cpu_low\":[\"low_720_0\",\"low_540_0\",\"adapt_low_540_0\"],\"cpu_mid\":[\"low_1080_0\",\"low_720_0\",\"low_540_0\"]},\"vid\":\"90110492\"},\"extra_clarity_map\":{\"val\":{\"2\":[\"adapt_low_540_0\",\"low_480_0\",\"low_360_0\"],\"3\":[\"low_540_0\"],\"4\":[\"low_720_0\"],\"5\":[\"low_1080_0\"]},\"vid\":\"90110491\"},\"extra_quality_filter\":{\"val\":{\"cpu_high\":{\"low_1080_0\":{\"lower\":0,\"upper\":1700000},\"low_720_0\":{\"lower\":0,\"upper\":1800000}},\"cpu_low\":{\"low_720_0\":{\"lower\":0,\"upper\":1800000}},\"cpu_mid\":{\"low_1080_0\":{\"lower\":0,\"upper\":1700000},\"low_720_0\":{\"lower\":0,\"upper\":1800000}}},\"vid\":\"90110493\"},\"faster_cpu_lazy\":{\"val\":{\"afterVideoInit\":{\"detail.chatroom\":750,\"detail.relativeVideo\":1000,\"header\":150,\"home.categoryList\":750},\"afterVideoPlayed\":{}},\"vid\":\"90096470\"},\"feedList_virtual\":{\"val\":0,\"vid\":\"12499546\"},\"feedback_height\":{\"val\":1,\"vid\":\"90114849\"},\"fifa_entry_pos\":{\"val\":3,\"vid\":\"90092615\"},\"fingerprint_enable\":{\"val\":1,\"vid\":\"90122113\"},\"first_frame_opt_v1\":{\"val\":1,\"vid\":\"11198332\"},\"first_frame_opt_v2\":{\"val\":1,\"vid\":\"90126865\"},\"first_frame_opt_v3\":{\"val\":1,\"vid\":\"11198332\"},\"firstframe_opt\":{\"val\":1,\"vid\":\"7979186\"},\"fix_edge_double_video\":{\"val\":{\"blackList\":[\"general_search\",\"search_result\"],\"open\":true,\"version\":[\"127.0.0.0\"]},\"vid\":\"12419704\"},\"fix_trust_ztsdk\":{\"val\":1,\"vid\":\"9422787\"},\"fold_follow_author\":{\"val\":3,\"vid\":\"90119429\"},\"follow_and_friend_cache\":{\"val\":2,\"vid\":\"90359909\"},\"follow_author_list\":{\"val\":1,\"vid\":\"90111591\"},\"follow_sidelist_refresh\":{\"val\":1,\"vid\":\"90129031\"},\"force_mse\":{\"val\":1,\"vid\":\"10357214\"},\"force_mse_config\":{\"val\":{\"noPreloadAddBufferLen\":0,\"removeBufferAtSeek\":true},\"vid\":\"10357214\"},\"force_mse_page\":{\"val\":\"\",\"vid\":\"10357214\"},\"fu_fang_self_pannel\":{\"val\":1,\"vid\":\"90126174\"},\"full_screen_search\":{\"val\":1,\"vid\":\"90107071\"},\"general_search_modal_slide\":{\"val\":3,\"vid\":\"90116880\"},\"gift_bar_optimize\":{\"val\":1,\"vid\":\"90095120\"},\"gift_guide_test_type\":{\"val\":1,\"vid\":\"90119840\"},\"guess_groupid_crash_optimize\":{\"val\":1,\"vid\":\"90994164\"},\"guide_download_client\":{\"val\":2,\"vid\":\"90110681\"},\"guide_popup_optimize_others\":{\"val\":1,\"vid\":\"90350247\"},\"has_fans_club_9_task\":{\"val\":1,\"vid\":\"90112269\"},\"has_gift_action_tab\":{\"val\":1,\"vid\":\"90118533\"},\"has_horizontal_header\":{\"val\":1,\"vid\":\"90094069\"},\"has_over_gear\":{\"val\":2,\"vid\":\"90117142\"},\"has_over_rect_row\":{\"val\":1,\"vid\":\"90119364\"},\"has_user_edit\":{\"val\":1,\"vid\":\"90097485\"},\"header_icon_perf\":{\"val\":1,\"vid\":\"90127625\"},\"hide_channel_list\":{\"val\":[\"hot\",\"channel_300201\",\"channel_300207\",\"channel_300208\"],\"vid\":\"90116949\"},\"hide_user_count\":{\"val\":0,\"vid\":\"12572051\"},\"hide_vertical_wallpaper_in_guide\":{\"val\":1,\"vid\":\"90124756\"},\"hide_wallpaper_in_feed\":{\"val\":1,\"vid\":\"90125197\"},\"highlight_match_opt\":{\"val\":1,\"vid\":\"90120807\"},\"history_live_selector\":{\"val\":1,\"vid\":\"90173000\"},\"history_login_style\":{\"val\":4,\"vid\":\"90082422\"},\"history_user_selector\":{\"val\":3,\"vid\":\"90172997\"},\"home_fast_slow_slide\":{\"val\":{\"distanceMap\":{\"1\":50,\"2\":100,\"3\":200},\"isOpen\":false},\"vid\":\"12574573\"},\"homepage_reversion\":{\"val\":3,\"vid\":\"90108915\"},\"i18n_ab\":{\"val\":1,\"vid\":\"11525973\"},\"i18n_ab_mobile\":{\"val\":1,\"vid\":\"11529465\"},\"im_async_load_login_only\":{\"val\":1,\"vid\":\"90093286\"},\"im_db_user_sync_optimize\":{\"val\":true,\"vid\":\"10452738\"},\"im_image_text_message\":{\"val\":1,\"vid\":\"90084093\"},\"im_private_message_panel_optimization\":{\"val\":2,\"vid\":\"90090796\"},\"im_sdk_proto_minimize\":{\"val\":1,\"vid\":\"91002118\"},\"im_share_panel\":{\"val\":{\"double_follow_count\":-1,\"enable\":true,\"recent_share_count\":-1,\"signle_follow_count\":-1,\"sort_info_count\":-1},\"vid\":\"10452738\"},\"im_show_active_status\":{\"val\":1,\"vid\":\"90095132\"},\"immersive_player\":{\"val\":1,\"vid\":\"90083687\"},\"imsdk_aweme_mode\":{\"val\":1,\"vid\":\"90096604\"},\"imsdk_aweme_no_ws_interval\":{\"val\":1,\"vid\":\"90097295\"},\"in_stream_search\":{\"val\":1,\"vid\":\"90107072\"},\"inner_autoplay\":{\"val\":2,\"vid\":\"90109235\"},\"inner_feed\":{\"val\":1,\"vid\":\"90121612\"},\"interaction_display_update\":{\"val\":1,\"vid\":\"90093383\"},\"is_fifa_nav\":{\"val\":1,\"vid\":\"90092758\"},\"is_fifa_search\":{\"val\":1,\"vid\":\"90093056\"},\"is_first_trust\":{\"val\":0,\"vid\":\"8017414\"},\"is_gift_ux_improved\":{\"val\":1,\"vid\":\"90114966\"},\"is_lynx_exhibition\":{\"val\":1,\"vid\":\"12443954\"},\"is_new_exhibition\":{\"val\":1,\"vid\":\"90118492\"},\"landing_page_guide\":{\"val\":3,\"vid\":\"90119574\"},\"live_4kdownload_mode\":{\"val\":1,\"vid\":\"90126187\"},\"live_at_user\":{\"val\":1,\"vid\":\"90997917\"},\"live_audio_hd\":{\"val\":3,\"vid\":\"90084828\"},\"live_bitrate_down\":{\"val\":1,\"vid\":\"90112303\"},\"live_category_navigate\":{\"val\":1,\"vid\":\"6096100\"},\"live_detail_container_category\":{\"val\":3,\"vid\":\"90111569\"},\"live_fans_club_migrate\":{\"val\":1,\"vid\":\"12589718\"},\"live_flv_2s\":{\"val\":2,\"vid\":\"90096167\"},\"live_gaussian_blur\":{\"val\":2,\"vid\":\"90094963\"},\"live_header_progressive_hydration\":{\"val\":1,\"vid\":\"90107323\"},\"live_inline_player\":{\"val\":2,\"vid\":\"90969024\"},\"live_island\":{\"val\":1,\"vid\":\"90175629\"},\"live_island_opt\":{\"val\":1,\"vid\":\"90348225\"},\"live_lag_opt\":{\"val\":1,\"vid\":\"12534177\"},\"live_layout_opt\":{\"val\":1,\"vid\":\"90360740\"},\"live_link_prefetch\":{\"val\":1,\"vid\":\"90094333\"},\"live_linkmic_heart_detect\":{\"val\":1,\"vid\":\"90093241\"},\"live_list_type\":{\"val\":1,\"vid\":\"90110559\"},\"live_long_task_opt\":{\"val\":1,\"vid\":\"90333719\"},\"live_low_latency\":{\"val\":{\"abr_pts\":-1800,\"enabled\":true},\"vid\":\"90084096\"},\"live_new_pip\":{\"val\":1,\"vid\":\"90126049\"},\"live_new_profile\":{\"val\":1,\"vid\":\"90351007\"},\"live_new_skeleton\":{\"val\":1,\"vid\":\"12486348\"},\"live_newroom_interfance\":{\"val\":1,\"vid\":\"90093285\"},\"live_page_refresh_tea\":{\"val\":1,\"vid\":\"12377352\"},\"live_perf_opt\":{\"val\":1,\"vid\":\"90967642\"},\"live_pk_egg\":{\"val\":1,\"vid\":\"90176234\"},\"live_preview_preredirect\":{\"val\":1,\"vid\":\"90167175\"},\"live_redpacket_lottery_idle\":{\"val\":3,\"vid\":\"90118882\"},\"live_reserve_push\":{\"val\":1,\"vid\":\"90361733\"},\"live_spring_features\":{\"val\":{\"appointment\":1,\"metro\":1,\"programme\":1,\"theme\":1},\"vid\":\"5444151\"},\"live_sr_core4_pc\":{\"val\":1,\"vid\":\"90126397\"},\"live_sr_optimize_pc\":{\"val\":1,\"vid\":\"90122287\"},\"live_start_play\":{\"val\":3,\"vid\":\"90084097\"},\"live_top_audience\":{\"val\":1,\"vid\":\"90923700\"},\"live_web_other_scene_h265\":{\"val\":2,\"vid\":\"11788849\"},\"long_task_perf\":{\"val\":1,\"vid\":\"90083998\"},\"longtask\":{\"val\":1,\"vid\":\"90952597\"},\"longtask_opt\":{\"val\":1,\"vid\":\"6071955\"},\"look_enter\":{\"val\":1,\"vid\":\"90094491\"},\"look_inner\":{\"val\":1,\"vid\":\"90093492\"},\"look_relate_all_scene\":{\"val\":2,\"vid\":\"90094872\"},\"lv_auto_bitrate\":{\"val\":2,\"vid\":\"90116390\"},\"lv_buffer_v\":{\"val\":1,\"vid\":\"90116389\"},\"main_hover_preload_v1\":{\"val\":{\"action\":\"normal\",\"cache\":0,\"count\":8,\"expireTime\":0},\"vid\":\"9641673\"},\"manual_filter\":{\"val\":1,\"vid\":\"90332728\"},\"mix_entrance\":{\"val\":2,\"vid\":\"90096486\"},\"modal_search_bar\":{\"val\":1,\"vid\":\"90082705\"},\"modal_slide\":{\"val\":1,\"vid\":\"90105494\"},\"mse_memory_opt\":{\"val\":1,\"vid\":\"90127487\"},\"nav_tab_follow_type\":{\"val\":1,\"vid\":\"90081293\"},\"need_login_qualities\":{\"val\":[\"uhd\",\"uhd50p\"],\"vid\":\"90092718\"},\"new_control\":{\"val\":1,\"vid\":\"11790791\"},\"new_header\":{\"val\":2,\"vid\":\"90083516\"},\"new_home_swiper_navigation_type\":{\"val\":2,\"vid\":\"90082835\"},\"new_hover_preview\":{\"val\":1,\"vid\":\"90095082\"},\"new_interactive_adapter\":{\"val\":2,\"vid\":\"90093698\"},\"new_look_related\":{\"val\":1,\"vid\":\"90083625\"},\"new_look_ui_adapter\":{\"val\":1,\"vid\":\"90094342\"},\"new_player_config\":{\"val\":{},\"vid\":\"12422693\"},\"new_silent\":{\"val\":3,\"vid\":\"90114335\"},\"new_swiper\":{\"val\":1,\"vid\":\"90094821\"},\"new_theme_entry_show\":{\"val\":1,\"vid\":\"90085210\"},\"new_user_guide\":{\"val\":1,\"vid\":\"90167151\"},\"new_user_survey_20240729\":{\"val\":1,\"vid\":\"9902979\"},\"next_buffer_config\":{\"val\":{\"control\":true,\"nextBufferMin\":5,\"nextStartBuffer\":0,\"nextStartPos\":0,\"scale\":{\"L\":0.2,\"M\":0.4,\"S\":0.2,\"XL\":0.4}},\"vid\":\"7979186\"},\"no_quick_access\":{\"val\":1,\"vid\":\"90922375\"},\"no_started_downgrade\":{\"val\":1,\"vid\":\"6378994\"},\"not_found_optimize\":{\"val\":1,\"vid\":\"90094965\"},\"note_delete\":{\"val\":1,\"vid\":\"11198332\"},\"occupy_picture\":{\"val\":1,\"vid\":\"90095310\"},\"on_active_change_play\":{\"val\":2,\"vid\":\"10297906\"},\"oversea_landing_recommend\":{\"val\":1,\"vid\":\"11725234\"},\"page_speed_ads\":{\"val\":{\"speed\":300},\"vid\":\"12434494\"},\"passport_second_verify_new\":{\"val\":\"v1\",\"vid\":\"11548698\"},\"passport_shark_abtest_face_mobile_face\":{\"val\":{\"group\":\"v0\"},\"vid\":\"11905128\"},\"pause_dialog_optimize\":{\"val\":1,\"vid\":\"90131086\"},\"pc_popcard_playTime\":{\"val\":0.5,\"vid\":\"90114333\"},\"pc_popcard_weight\":{\"val\":0.1,\"vid\":\"90114332\"},\"pcdn_config\":{\"val\":{\"adaptPCDNConfig\":{\"PCDNBufferControl\":true,\"PCDNCntControl\":true,\"alpha\":0.2,\"estPTcontrol\":true,\"estPlayTime\":12,\"maxPCDNInBuffer\":7,\"maxPCDNOutBuffer\":3,\"minBandwidth\":1000000,\"minPCDNInBuffer\":5,\"minPCDNOutBuffer\":2,\"safePCDNInFactor\":0.9,\"safePCDNOutFactor\":1.3},\"enterMinBuffer\":10,\"minDuration\":5},\"vid\":\"10595748\"},\"play_progress_record\":{\"val\":2,\"vid\":\"90175676\"},\"player_fullscreen_show_interaction\":{\"val\":1,\"vid\":\"90081310\"},\"player_opt\":{\"val\":3,\"vid\":\"90124846\"},\"positionbox_opt\":{\"val\":1,\"vid\":\"9142860\"},\"preload_attach_delay\":{\"val\":0,\"vid\":\"11079922\"},\"preload_config\":{\"val\":{\"pageName\":\"recommend\",\"startPreloadControl\":true,\"startPreloadMinBuffer\":7,\"startPreloadMinPosTime\":0},\"vid\":\"11079922\"},\"preload_count\":{\"val\":{\"count\":2,\"open\":true},\"vid\":\"7855203\"},\"preview_opt\":{\"val\":1,\"vid\":\"90098928\"},\"prf_lvdetail\":{\"val\":1,\"vid\":\"90116388\"},\"progress_preview\":{\"val\":1,\"vid\":\"10096101\"},\"progress_preview_1min\":{\"val\":1,\"vid\":\"90356347\"},\"progress_preview_1min-\":{\"val\":\"1\",\"vid\":\"90621288\"},\"quick_access_douyin_type\":{\"val\":2,\"vid\":\"90100115\"},\"rec_remove_header\":{\"val\":1,\"vid\":\"90109228\"},\"recharge_autonext\":{\"val\":1,\"vid\":\"90118515\"},\"recharge_perf\":{\"val\":2,\"vid\":\"90120548\"},\"recommend_optimization_island_v3\":{\"val\":1,\"vid\":\"90123343\"},\"recommend_prerender\":{\"val\":2,\"vid\":\"90120350\"},\"recommend_video_background\":{\"val\":1,\"vid\":\"90110653\"},\"reduce_lottie\":{\"val\":1,\"vid\":\"90359851\"},\"reduce_render\":{\"val\":1,\"vid\":\"90359852\"},\"reforce_download_guide\":{\"val\":{\"enable_exclusive\":false,\"enable_new_style\":true},\"vid\":\"90119681\"},\"relate_video_login_guide\":{\"val\":{\"enabled\":1,\"interval\":0},\"vid\":\"5659123\"},\"related_duration\":{\"val\":30,\"vid\":\"90122160\"},\"related_enabled\":{\"val\":1,\"vid\":\"90122159\"},\"related_entrance\":{\"val\":1,\"vid\":\"90116186\"},\"related_icon\":{\"val\":2,\"vid\":\"90119420\"},\"related_mix\":{\"val\":1,\"vid\":\"90120738\"},\"related_order\":{\"val\":0,\"vid\":\"90122161\"},\"related_search_list\":{\"val\":2,\"vid\":\"90093668\"},\"related_smooth\":{\"val\":3,\"vid\":\"90601039\"},\"remove_slide_related_button\":{\"val\":1,\"vid\":\"91001252\"},\"report_counter\":{\"val\":1,\"vid\":\"90127635\"},\"resume_play\":{\"val\":15,\"vid\":\"90117895\"},\"resume_prf\":{\"val\":1,\"vid\":\"90121749\"},\"revert_over_rect\":{\"val\":2,\"vid\":\"90126863\"},\"right_card_opt\":{\"val\":1,\"vid\":\"8011838\"},\"rm_date\":{\"val\":1,\"vid\":\"90126069\"},\"rs_bar_opt\":{\"val\":1,\"vid\":\"90124847\"},\"rs_refresh_opt\":{\"val\":1,\"vid\":\"90120806\"},\"run_loadrange_type\":{\"val\":\"size\",\"vid\":\"11270054\"},\"safety_warning\":{\"val\":1,\"vid\":\"90112603\"},\"scan_login_text_type\":{\"val\":2,\"vid\":\"5459876\"},\"search_bar_style_opt\":{\"val\":3,\"vid\":\"90094276\"},\"search_bar_weak\":{\"val\":1,\"vid\":\"90942349\"},\"search_card_wrapper\":{\"val\":2,\"vid\":\"90113906\"},\"search_container_new_layout\":{\"val\":1,\"vid\":\"90114535\"},\"search_general_waterfall\":{\"val\":1,\"vid\":\"90116621\"},\"search_horizontal\":{\"val\":1,\"vid\":\"90092708\"},\"search_loadmore\":{\"val\":1,\"vid\":\"11357051\"},\"search_mix\":{\"val\":1,\"vid\":\"90092583\"},\"search_multi_column_cards_allowed_batch\":{\"val\":1,\"vid\":\"90604914\"},\"search_new_list_type_button\":{\"val\":1,\"vid\":\"90116623\"},\"search_optimize\":{\"val\":1,\"vid\":\"12089730\"},\"search_player_unify_new\":{\"val\":1,\"vid\":\"90121608\"},\"search_preload\":{\"val\":{\"checkAbTestDataIsLoaded\":true,\"preloadAttachDelay\":0,\"preloadConfig\":{\"startPreloadControl\":true,\"startPreloadMinBuffer\":7,\"startPreloadMinPosTime\":0},\"preloadCount\":{\"count\":2,\"open\":true},\"videoPreloadConfig\":{\"adaptRange\":{\"cacheSafeFactor\":4,\"estPTcontrol\":true,\"estPlayTime\":10,\"maxTargetCacheDur\":80,\"minBandwidth\":1000000,\"minDangerThreshold\":5,\"minTargetCacheDur\":40,\"rangeControl\":true,\"rangeMaxDuration\":20,\"rangeMinDuration\":5,\"rangeMinSize\":409600,\"safeFactor\":0.1,\"targetCacheControl\":true},\"segmentMinDuration\":5}},\"vid\":\"12276425\"},\"search_result_list_type\":{\"val\":1,\"vid\":\"90089488\"},\"search_scroll_autoplay\":{\"val\":1,\"vid\":\"90094691\"},\"search_slide_optimize\":{\"val\":0,\"vid\":\"12515283\"},\"search_small_toolbar\":{\"val\":1,\"vid\":\"90114536\"},\"search_spa\":{\"val\":1,\"vid\":\"90353369\"},\"search_spa_js_preload\":{\"val\":1,\"vid\":\"90624206\"},\"search_spa_navigation_hide\":{\"val\":1,\"vid\":\"90353370\"},\"search_spa_result_prefetch\":{\"val\":1,\"vid\":\"90610702\"},\"search_stream_predict\":{\"val\":1,\"vid\":\"90943028\"},\"search_video_fake_screen\":{\"val\":1,\"vid\":\"90082903\"},\"search_waterfall_vertical_crop\":{\"val\":1,\"vid\":\"90116622\"},\"secure_sdk_enable_dTrait\":{\"val\":{\"aid\":6383,\"consumerPathList\":[\"/aweme/v1/web/commit/item/digg\",\"/aweme/v1/web/commit/follow/user\",\"/aweme/v1/web/comment/publish\",\"/aweme/v1/web/commit/user\"]},\"vid\":\"12440080\"},\"secure_sdk_enable_ecdh\":{\"val\":1,\"vid\":\"11537513\"},\"secure_sdk_enable_store\":{\"val\":1,\"vid\":\"11537513\"},\"self_tab\":{\"val\":1,\"vid\":\"90093903\"},\"self_tab_red_dot\":{\"val\":1,\"vid\":\"90127971\"},\"self_use_spa\":{\"val\":1,\"vid\":\"90111973\"},\"seo_note_ugc\":{\"val\":0,\"vid\":\"90094206\"},\"seo_to_search\":{\"val\":1,\"vid\":\"90083115\"},\"series_hide_pay_tag\":{\"val\":1,\"vid\":\"90126880\"},\"series_pay\":{\"val\":1,\"vid\":\"90125394\"},\"series_tab_entrance_switch\":{\"val\":1,\"vid\":\"90125395\"},\"share_comment_to_im\":{\"val\":1,\"vid\":\"90093856\"},\"share_optimize\":{\"val\":2,\"vid\":\"90083861\"},\"shit_card_css\":{\"val\":2,\"vid\":\"90111801\"},\"short_touch_has_redpack_lottery\":{\"val\":1,\"vid\":\"90111410\"},\"show_buff_card\":{\"val\":1,\"vid\":\"90122340\"},\"show_capcut_link\":{\"val\":1,\"vid\":\"90109714\"},\"show_comment_search_highlight\":{\"val\":1,\"vid\":\"90082546\"},\"show_creator_guide\":{\"val\":1,\"vid\":\"90094802\"},\"show_custom_emoji\":{\"val\":1,\"vid\":\"90111869\"},\"show_im_new_meessage\":{\"val\":1,\"vid\":\"90125413\"},\"show_im_new_meessage2\":{\"val\":1,\"vid\":\"90126071\"},\"show_refresh_btn_v2\":{\"val\":1,\"vid\":\"90120786\"},\"show_self_music_collection\":{\"val\":1,\"vid\":\"90112432\"},\"show_theater\":{\"val\":1,\"vid\":\"90083655\"},\"show_vs_record\":{\"val\":1,\"vid\":\"90083182\"},\"sider_optimize\":{\"val\":2,\"vid\":\"90128686\"},\"slide_optimize\":{\"val\":1,\"vid\":\"12362486\"},\"smooth_switch_clarity\":{\"val\":1,\"vid\":\"10859832\"},\"sound_guide_tooltip\":{\"val\":1,\"vid\":\"90131085\"},\"sr\":{\"val\":{\"applyPage\":[\"recommend\",\"personal_homepage\"],\"improvePictureQuality\":true,\"isOpen\":true,\"pluginConfig\":{\"algType\":5,\"degradeFrameRate\":0.5,\"scaleType\":16},\"renderDeltaAccumulate\":5},\"vid\":\"10796268\"},\"stop_auto_play\":{\"val\":2,\"vid\":\"90095896\"},\"stop_modal_to_client\":{\"val\":1,\"vid\":\"90124438\"},\"stream_push\":{\"val\":3,\"vid\":\"90108560\"},\"strengthen_login_guide_scan_qrcode\":{\"val\":1,\"vid\":\"9475133\"},\"switch_clarity_timing\":{\"val\":1,\"vid\":\"11776610\"},\"switch_use_sr\":{\"val\":1,\"vid\":\"11550766\"},\"sync_volume\":{\"val\":2,\"vid\":\"90108830\"},\"text_hover_status\":{\"val\":1,\"vid\":\"90922188\"},\"ticket_guard_sign_type\":{\"val\":\"pubKey\",\"vid\":\"6857950\"},\"timestamp\":{\"val\":1,\"vid\":\"90328043\"},\"title_follow_btn\":{\"val\":0,\"vid\":\"5659123\"},\"title_notice\":{\"val\":1,\"vid\":\"90107474\"},\"together_creation\":{\"val\":2,\"vid\":\"90093452\"},\"trust_status_sync\":{\"val\":0,\"vid\":\"8017414\"},\"ui_option2\":{\"val\":1,\"vid\":\"90112490\"},\"update_header\":{\"val\":2,\"vid\":\"90107294\"},\"use_265_hard_parse\":{\"val\":1,\"vid\":\"8919418\"},\"use_analyser\":{\"val\":1,\"vid\":\"90094651\"},\"use_heaac\":{\"val\":1,\"vid\":\"90110490\"},\"use_honner_level\":{\"val\":2,\"vid\":\"90922361\"},\"use_music_mode\":{\"val\":1,\"vid\":\"90118576\"},\"use_nav_ui\":{\"val\":1,\"vid\":\"90922374\"},\"use_new_dy_video_player\":{\"val\":2,\"vid\":\"12422693\"},\"use_package_downloader\":{\"val\":1,\"vid\":\"90098794\"},\"use_slide_monitor\":{\"val\":0,\"vid\":\"12578998\"},\"user_act_report\":{\"val\":1,\"vid\":\"90972569\"},\"user_panel_guide\":{\"val\":1,\"vid\":\"90117617\"},\"user_self_cache\":{\"val\":3,\"vid\":\"90181015\"},\"user_ui_update2\":{\"val\":{\"lightness\":15,\"opacity\":0.4,\"type\":2},\"vid\":\"90116415\"},\"video_download_guide\":{\"val\":1,\"vid\":\"90116951\"},\"video_filter_type\":{\"val\":3,\"vid\":\"90083963\"},\"video_hover_thumbnail\":{\"val\":2,\"vid\":\"90093547\"},\"video_info_optimize\":{\"val\":2,\"vid\":\"90997903\"},\"video_nick_and_title_fontsize_test\":{\"val\":4,\"vid\":\"90083515\"},\"video_preload_config\":{\"val\":{\"adaptRange\":{\"cacheSafeFactor\":2,\"estPTcontrol\":true,\"estPlayTime\":12,\"maxTargetCacheDur\":30,\"minBandwidth\":1000000,\"minDangerThreshold\":5,\"minTargetCacheDur\":10,\"rangeControl\":true,\"rangeMaxDuration\":15,\"rangeMinDuration\":5,\"rangeMinSize\":409600,\"safeFactor\":0.1,\"targetCacheControl\":true},\"notDegradeErrorList\":[403,404],\"segmentMinDuration\":5},\"vid\":\"11270054\"},\"volume_balance\":{\"val\":1,\"vid\":\"90094332\"},\"volume_speed\":{\"val\":3,\"vid\":\"90118859\"},\"vs_1080_login\":{\"val\":1,\"vid\":\"90093983\"},\"vs_live_push\":{\"val\":1,\"vid\":\"90094575\"},\"vs_lv_source\":{\"val\":1,\"vid\":\"90093343\"},\"vsdetail_optimize\":{\"val\":1,\"vid\":\"90106943\"},\"wallpaper_feed_card_web\":{\"val\":{\"btn_change_time\":2,\"vv_count\":20},\"vid\":\"90092756\"},\"watch_later\":{\"val\":1,\"vid\":\"90119185\"},\"web_avatar_csr_enter_room\":{\"val\":1,\"vid\":\"90348066\"},\"web_enter_liveroom_spa\":{\"val\":1,\"vid\":\"9341989\"},\"web_recommend_cache\":{\"val\":1,\"vid\":\"90176635\"},\"web_wallpaper_guide\":{\"val\":1,\"vid\":\"90121076\"}},\"uuid\":\"7502050661513971211\",\"timestamp\":1746707305393,\"ab_version_multilink\":[],\"ab_ext_version\":[],\"ab_version\":[\"12194868\",\"12417308\",\"11725234\",\"12434494\",\"91000435\",\"12218010\",\"91001252\",\"12574573\",\"11776610\",\"90922374\",\"90922375\",\"10095948\",\"9641673\",\"10297906\",\"11198332\",\"90126295\",\"12534177\",\"90122460\",\"12276425\",\"90350247\",\"9902979\",\"12419704\",\"12489666\",\"12515283\",\"12089730\",\"11525973\",\"12422693\",\"11550766\",\"12066344\",\"12362486\",\"12158982\",\"12499546\",\"11788849\",\"12377352\",\"12486348\",\"12589718\",\"12443954\",\"90997903\",\"12525872\",\"12210886\",\"12578998\",\"90994164\",\"7979186\",\"10096101\",\"11079922\",\"10796268\",\"10357214\",\"6378994\",\"11270054\",\"12101510\",\"12563962\",\"90126863\",\"90094332\",\"8919418\",\"90359851\",\"91002118\",\"90923700\",\"12572051\",\"90332728\",\"90952597\",\"12440080\",\"90922361\",\"6071955\",\"90107982\",\"10595748\",\"90108835\",\"90097344\",\"90097485\",\"90111801\",\"7855203\",\"90116415\",\"90110681\",\"90109228\",\"90111973\",\"90122113\"]}",
    "_sds": "y",
    "xg-firstframe": "0/0,0/0,0/0,0/0,0/0,0/0,0/0,0/0,0/0,0/0,0/0,0/0,0/0,0/0,0/0,0/0,0/0,0/0,0/0,0/0,0/0,0/0,0/0,0/0,0/0,0/0,0/0,0/0,0/0,0/0,0/0,0/0,0/0,0/0,0/0,0/0,0/0,0/0,0/0,0/0,1/1,0/0,0/0,0/0,0/0,0/0,0/0,0/0",
    "SLARDARuc_dtrait_sdk": "JTdCJTIydXNlcklkJTIyOiUyMjc1MDIwNTA2NjE1MTM5NzEyMTElMjIsJTIyZGV2aWNlSWQlMjI6JTIyMWExMGUyNzUtMWU1OS00YWRlLWI3MjktNzE1MDk1ZTNmOTQ0JTIyLCUyMmV4cGlyZXMlMjI6MTc1NDQ4MzMwNjczNyU3RA==",
    "web_runtime_security_uid": "a18ae3db-19ea-4455-9730-67858e625897",
    "security-sdk/s_sdk_server_cert_key": "{\"cert\":\"-----BEGIN CERTIFICATE-----\\nMIIEfTCCBCKgAwIBAgIUXWdS2tzmSoewCWfKFyiWMrJqs/0wCgYIKoZIzj0EAwIw\\nMTELMAkGA1UEBhMCQ04xIjAgBgNVBAMMGXRpY2tldF9ndWFyZF9jYV9lY2RzYV8y\\nNTYwIBcNMjIxMTE4MDUyMDA2WhgPMjA2OTEyMzExNjAwMDBaMCQxCzAJBgNVBAYT\\nAkNOMRUwEwYDVQQDEwxlY2llcy1zZXJ2ZXIwWTATBgcqhkjOPQIBBggqhkjOPQMB\\nBwNCAASE2llDPlfc8Rq+5J5HXhg4edFjPnCF3Ua7JBoiE/foP9m7L5ELIcvxCgEx\\naRCHbQ8kCCK/ArZ4FX/qCobZAkToo4IDITCCAx0wDgYDVR0PAQH/BAQDAgWgMDEG\\nA1UdJQQqMCgGCCsGAQUFBwMBBggrBgEFBQcDAgYIKwYBBQUHAwMGCCsGAQUFBwME\\nMCkGA1UdDgQiBCABydxqGrVEHhtkCWTb/vicGpDZPFPDxv82wiuywUlkBDArBgNV\\nHSMEJDAigCAypWfqjmRIEo3MTk1Ae3MUm0dtU3qk0YDXeZSXeyJHgzCCAZQGCCsG\\nAQUFBwEBBIIBhjCCAYIwRgYIKwYBBQUHMAGGOmh0dHA6Ly9uZXh1cy1wcm9kdWN0\\naW9uLmJ5dGVkYW5jZS5jb20vYXBpL2NlcnRpZmljYXRlL29jc3AwRgYIKwYBBQUH\\nMAGGOmh0dHA6Ly9uZXh1cy1wcm9kdWN0aW9uLmJ5dGVkYW5jZS5uZXQvYXBpL2Nl\\ncnRpZmljYXRlL29jc3AwdwYIKwYBBQUHMAKGa2h0dHA6Ly9uZXh1cy1wcm9kdWN0\\naW9uLmJ5dGVkYW5jZS5jb20vYXBpL2NlcnRpZmljYXRlL2Rvd25sb2FkLzQ4RjlD\\nMEU3QjBDNUE3MDVCOTgyQkU1NTE3MDVGNjQ1QzhDODc4QTguY3J0MHcGCCsGAQUF\\nBzAChmtodHRwOi8vbmV4dXMtcHJvZHVjdGlvbi5ieXRlZGFuY2UubmV0L2FwaS9j\\nZXJ0aWZpY2F0ZS9kb3dubG9hZC80OEY5QzBFN0IwQzVBNzA1Qjk4MkJFNTUxNzA1\\nRjY0NUM4Qzg3OEE4LmNydDCB5wYDVR0fBIHfMIHcMGygaqBohmZodHRwOi8vbmV4\\ndXMtcHJvZHVjdGlvbi5ieXRlZGFuY2UuY29tL2FwaS9jZXJ0aWZpY2F0ZS9jcmwv\\nNDhGOUMwRTdCMEM1QTcwNUI5ODJCRTU1MTcwNUY2NDVDOEM4NzhBOC5jcmwwbKBq\\noGiGZmh0dHA6Ly9uZXh1cy1wcm9kdWN0aW9uLmJ5dGVkYW5jZS5uZXQvYXBpL2Nl\\ncnRpZmljYXRlL2NybC80OEY5QzBFN0IwQzVBNzA1Qjk4MkJFNTUxNzA1RjY0NUM4\\nQzg3OEE4LmNybDAKBggqhkjOPQQDAgNJADBGAiEAqMjT5ADMdGMeaImoJK4J9jzE\\nLqZ573rNjsT3k14pK50CIQCLpWHVKWi71qqqrMjiSDvUhpyO1DpTPRHlavPRuaNm\\nww==\\n-----END CERTIFICATE-----\",\"sn\":\"533240336124694022040808462028007165443034493949\",\"createdTime\":1746707309690}",
    "douyin_web_hide_guide": "1",
    "security-sdk/s_sdk_crypt_sdk": "{\"data\":\"{\\\"ec_privateKey\\\":\\\"-----BEGIN PRIVATE KEY-----\\\\r\\\\nMIGHAgEAMBMGByqGSM49AgEGCCqGSM49AwEHBG0wawIBAQQg9q+JzhsIUakLPpLk\\\\r\\\\nx0i5GLRn84hWwbsWjmyonHUnvDOhRANCAAT5R7I2turlbPqmydn9hK/P4tm07K5C\\\\r\\\\nFvsyt4VZp1pmAbzVpPMLuYjw+Z4qbJg8TwUxZaD2Ee4X55PeG2jIdBlD\\\\r\\\\n-----END PRIVATE KEY-----\\\\r\\\\n\\\",\\\"ec_publicKey\\\":\\\"-----BEGIN PUBLIC KEY-----\\\\r\\\\nMFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAE+UeyNrbq5Wz6psnZ/YSvz+LZtOyu\\\\r\\\\nQhb7MreFWadaZgG81aTzC7mI8PmeKmyYPE8FMWWg9hHuF+eT3htoyHQZQw==\\\\r\\\\n-----END PUBLIC KEY-----\\\\r\\\\n\\\",\\\"ec_csr\\\":\\\"-----BEGIN CERTIFICATE REQUEST-----\\\\r\\\\nMIIBDzCBtQIBADAnMQswCQYDVQQGEwJDTjEYMBYGA1UEAwwPYmRfdGlja2V0X2d1\\\\r\\\\nYXJkMFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAE+UeyNrbq5Wz6psnZ/YSvz+LZ\\\\r\\\\ntOyuQhb7MreFWadaZgG81aTzC7mI8PmeKmyYPE8FMWWg9hHuF+eT3htoyHQZQ6As\\\\r\\\\nMCoGCSqGSIb3DQEJDjEdMBswGQYDVR0RBBIwEIIOd3d3LmRvdXlpbi5jb20wCgYI\\\\r\\\\nKoZIzj0EAwIDSQAwRgIhANZDHI2sqBNokTbywkwN4A+VrlBXfPFkTHLPOkVhWGKa\\\\r\\\\nAiEA+lHJkmCSxh0NlPL8q9ZfI+yWc1UqCzFedrpu5WdExMk=\\\\r\\\\n-----END CERTIFICATE REQUEST-----\\\\r\\\\n\\\"}\"}",
    "useShortcut2": "{\"Thu May 08 2025\":false}",
    "player_is_mute": "0",
    "xg_device_score": "7.658235294117647",
    "__tea_cache_first_2018": "1",
    "=^_^=athena_web_id": "1bee520c-5dbc-406c-bdfa-69d58ba5c3b9",
    "__tea_cache_tokens_1300": "{\"web_id\":\"7502050661513971211\",\"user_unique_id\":\"7502050661513971211\",\"timestamp\":1746707303860,\"_type_\":\"default\"}",
    "web_store_TNC_STORE_V1_1_tnc_config_table_-1": "{\"aid\":\"-1\",\"tncSchema\":{\"tnc_update_interval\":180,\"md5_check\":0,\"send_tnc_host_arrays\":[\"tnc0-aliec2.zijieapi.com\",\"tnc0-bjlgy.zijieapi.com\"],\"ttnet_h2_enabled\":1,\"ttnet_dispatch_actions\":[{\"act_priority\":9000000,\"action\":\"dispatch\",\"param\":{\"host_group\":[\"*\"],\"prefixes_group\":[\"/aweme/v1/web/ad/report\",\"/aweme/v1/web/fancy/qrcode/info\",\"/aweme/v1/web/api/suggest_words/\",\"/aweme/v1/web/seo/\",\"/aweme/v1/web/series/detail/\",\"/aweme/v1/web/series/list/\",\"/aweme/v1/web/series/aweme/\",\"/aweme/v1/web/content_pay/order/submit\",\"/aweme/v1/web/series/watched/list/\",\"/aweme/v1/web/series/card/feed/\",\"/aweme/v1/web/series/watch/record/\",\"/aweme/v1/web/user/paid_content/get/\"],\"service_name\":\"jump_east_path\",\"dispatch_strategy\":0},\"rule_id\":350696,\"set_req_priority\":9000002,\"sign\":\"93fcfb3c45cac49e4612881eccb0601f\"}],\"ttnet_url_dispatcher_enabled\":1,\"chromium_open\":1,\"ttnet_http_dns_enabled\":1,\"ttnet_request_retry_max_attempts\":20,\"ttnet_dispatch_actions_epoch\":-745022358,\"ttnet_http_dns_timeout\":2,\"ttnet_h2_config\":{\"h2_session_check_interval\":65,\"ping_keepalive_hosts\":[],\"ping_keepalive_interval\":30,\"ping_probe_timeout\":5,\"session_check_hosts\":[],\"h2_session_check_enabled\":1},\"ttnet_request_retry_delay_interval_ms\":200,\"ttnet_request_retry_error_list\":[-21,-109,-126,-324,-101],\"ttnet_http_dns_google\":0,\"ttnet_local_dns_time_out\":120,\"ttnet_http_dns_prefer\":1,\"ttnet_enable_cronet_request_report\":1},\"tncSchemaInfo\":{\"aid\":\"-1\",\"isCustomDefaultSchema\":false,\"originalTncConfig\":{\"aid\":\"6383\",\"device_id\":\"7502050661513971211\",\"user_id\":\"2376464631080340\",\"region\":\"internal\"},\"requestQueryPayload\":{\"tnc_js_sdk_version\":\"2.3.9.0\",\"device_platform\":\"pc\",\"aid\":\"6383\",\"device_id\":\"7502050661513971211\",\"user_id\":\"2376464631080340\",\"web_service\":\"\"},\"requestHeaders\":{},\"responseHeaders\":{\"content-type\":\"application/json\"}}}",
    "g_ven": "ANGLE (Intel, Intel(R) UHD Graphics (0x00008A56) Direct3D11 vs_5_0 ps_5_0, D3D11)",
    "LoginGuidingStrategy": "{\"expire_time\":1746974886,\"login_methods\":{\"full_login_panel\":{\"scenes\":{\"cold_start\":{\"trigger\":{\"counts\":1,\"trigger_type\":1,\"progress\":{\"percent\":0,\"type\":\"\"}},\"frequency_control\":{\"range_interval\":1,\"range_type\":\"day\",\"max_count\":-1,\"max_time_in_range\":100},\"fail_remit_strategy\":{\"counts\":0,\"days\":0},\"extra\":{\"intensity\":\"guide_login\"},\"most_launch_time_list\":[],\"frequency_reset\":{\"cycle_type\":\"\",\"frequency_update_cycle\":0}}},\"frequency_control\":{\"range_interval\":1,\"range_type\":\"day\",\"max_count\":-1,\"max_time_in_range\":100},\"fail_remit_strategy\":{\"counts\":0,\"days\":0},\"extra\":{}},\"login_guide_panel\":{\"scenes\":{\"comment_detail\":{\"trigger\":{\"counts\":1,\"trigger_type\":1,\"progress\":{\"percent\":0,\"type\":\"\"}},\"frequency_control\":{\"range_interval\":1,\"range_type\":\"day\",\"max_count\":-1,\"max_time_in_range\":100},\"fail_remit_strategy\":{\"counts\":0,\"days\":0},\"extra\":{},\"most_launch_time_list\":[],\"frequency_reset\":{\"cycle_type\":\"\",\"frequency_update_cycle\":0}},\"comment_feed\":{\"trigger\":{\"counts\":1,\"trigger_type\":1,\"progress\":{\"percent\":0,\"type\":\"\"}},\"frequency_control\":{\"range_interval\":1,\"range_type\":\"day\",\"max_count\":-1,\"max_time_in_range\":100},\"fail_remit_strategy\":{\"counts\":0,\"days\":0},\"extra\":{},\"most_launch_time_list\":[],\"frequency_reset\":{\"cycle_type\":\"\",\"frequency_update_cycle\":0}}},\"frequency_control\":{\"range_interval\":1,\"range_type\":\"day\",\"max_count\":-1,\"max_time_in_range\":100},\"fail_remit_strategy\":{\"counts\":0,\"days\":0},\"extra\":{}}},\"strategy_str\":\"{\\\"Extra\\\":{\\\"login_methods\\\":{\\\"full_login_panel\\\":{\\\"scenes\\\":{\\\"cold_start\\\":{\\\"trigger\\\":{\\\"trigger_type\\\":1,\\\"counts\\\":1},\\\"frequency_control\\\":{\\\"range_type\\\":\\\"day\\\",\\\"range_interval\\\":1,\\\"max_count\\\":-1,\\\"max_time_in_range\\\":100},\\\"extra\\\":{\\\"intensity\\\":\\\"guide_login\\\"}}},\\\"frequency_control\\\":{\\\"max_count\\\":-1,\\\"max_time_in_range\\\":100,\\\"range_type\\\":\\\"day\\\",\\\"range_interval\\\":1},\\\"extra\\\":{}},\\\"login_guide_panel\\\":{\\\"scenes\\\":{\\\"comment_feed\\\":{\\\"trigger\\\":{\\\"trigger_type\\\":1,\\\"counts\\\":1},\\\"frequency_control\\\":{\\\"range_type\\\":\\\"day\\\",\\\"range_interval\\\":1,\\\"max_count\\\":-1,\\\"max_time_in_range\\\":100},\\\"extra\\\":{}},\\\"comment_detail\\\":{\\\"trigger\\\":{\\\"trigger_type\\\":1,\\\"counts\\\":1},\\\"frequency_control\\\":{\\\"max_time_in_range\\\":100,\\\"range_type\\\":\\\"day\\\",\\\"range_interval\\\":1,\\\"max_count\\\":-1},\\\"extra\\\":{}}},\\\"frequency_control\\\":{\\\"range_type\\\":\\\"day\\\",\\\"range_interval\\\":1,\\\"max_count\\\":-1,\\\"max_time_in_range\\\":100},\\\"extra\\\":{}}}}}\",\"log_id\":\"202505082028269475680499654609CE76\",\"rawData\":{\"data\":{\"data\":{\"expire_time\":1746974886,\"login_methods\":{\"full_login_panel\":{\"scenes\":{\"cold_start\":{\"trigger\":{\"counts\":1,\"trigger_type\":1,\"progress\":{\"percent\":0,\"type\":\"\"}},\"frequency_control\":{\"range_interval\":1,\"range_type\":\"day\",\"max_count\":-1,\"max_time_in_range\":100},\"fail_remit_strategy\":{\"counts\":0,\"days\":0},\"extra\":{\"intensity\":\"guide_login\"},\"most_launch_time_list\":[],\"frequency_reset\":{\"cycle_type\":\"\",\"frequency_update_cycle\":0}}},\"frequency_control\":{\"range_interval\":1,\"range_type\":\"day\",\"max_count\":-1,\"max_time_in_range\":100},\"fail_remit_strategy\":{\"counts\":0,\"days\":0},\"extra\":{}},\"login_guide_panel\":{\"scenes\":{\"comment_detail\":{\"trigger\":{\"counts\":1,\"trigger_type\":1,\"progress\":{\"percent\":0,\"type\":\"\"}},\"frequency_control\":{\"range_interval\":1,\"range_type\":\"day\",\"max_count\":-1,\"max_time_in_range\":100},\"fail_remit_strategy\":{\"counts\":0,\"days\":0},\"extra\":{},\"most_launch_time_list\":[],\"frequency_reset\":{\"cycle_type\":\"\",\"frequency_update_cycle\":0}},\"comment_feed\":{\"trigger\":{\"counts\":1,\"trigger_type\":1,\"progress\":{\"percent\":0,\"type\":\"\"}},\"frequency_control\":{\"range_interval\":1,\"range_type\":\"day\",\"max_count\":-1,\"max_time_in_range\":100},\"fail_remit_strategy\":{\"counts\":0,\"days\":0},\"extra\":{},\"most_launch_time_list\":[],\"frequency_reset\":{\"cycle_type\":\"\",\"frequency_update_cycle\":0}}},\"frequency_control\":{\"range_interval\":1,\"range_type\":\"day\",\"max_count\":-1,\"max_time_in_range\":100},\"fail_remit_strategy\":{\"counts\":0,\"days\":0},\"extra\":{}}},\"strategy_str\":\"{\\\"Extra\\\":{\\\"login_methods\\\":{\\\"full_login_panel\\\":{\\\"scenes\\\":{\\\"cold_start\\\":{\\\"trigger\\\":{\\\"trigger_type\\\":1,\\\"counts\\\":1},\\\"frequency_control\\\":{\\\"range_type\\\":\\\"day\\\",\\\"range_interval\\\":1,\\\"max_count\\\":-1,\\\"max_time_in_range\\\":100},\\\"extra\\\":{\\\"intensity\\\":\\\"guide_login\\\"}}},\\\"frequency_control\\\":{\\\"max_count\\\":-1,\\\"max_time_in_range\\\":100,\\\"range_type\\\":\\\"day\\\",\\\"range_interval\\\":1},\\\"extra\\\":{}},\\\"login_guide_panel\\\":{\\\"scenes\\\":{\\\"comment_feed\\\":{\\\"trigger\\\":{\\\"trigger_type\\\":1,\\\"counts\\\":1},\\\"frequency_control\\\":{\\\"range_type\\\":\\\"day\\\",\\\"range_interval\\\":1,\\\"max_count\\\":-1,\\\"max_time_in_range\\\":100},\\\"extra\\\":{}},\\\"comment_detail\\\":{\\\"trigger\\\":{\\\"trigger_type\\\":1,\\\"counts\\\":1},\\\"frequency_control\\\":{\\\"max_time_in_range\\\":100,\\\"range_type\\\":\\\"day\\\",\\\"range_interval\\\":1,\\\"max_count\\\":-1},\\\"extra\\\":{}}},\\\"frequency_control\\\":{\\\"range_type\\\":\\\"day\\\",\\\"range_interval\\\":1,\\\"max_count\\\":-1,\\\"max_time_in_range\\\":100},\\\"extra\\\":{}}}}}\"},\"message\":\"success\"},\"status\":200,\"statusText\":\"\",\"headers\":{\"access-control-allow-credentials\":\"true\",\"bd-tt-error-code\":\"0\",\"content-encoding\":\"gzip\",\"content-length\":\"466\",\"content-type\":\"application/json\",\"date\":\"Thu, 08 May 2025 12:28:26 GMT\",\"eagleid\":\"78f1ada417467073063506170e\",\"server\":\"Tengine\",\"server-timing\":\"inner; dur=35, cdn-cache;desc=MISS,edge;dur=0,origin;dur=86\",\"strict-transport-security\":\"max-age=31536000; includeSubDomains; preload\",\"timing-allow-origin\":\"*\",\"vary\":\"Accept-Encoding,Origin\",\"via\":\"live16.cn8046[86,0]\",\"x-ms-token\":\"jygeUuL1W04hXN4y-A4joeDQXndqPBoT4-t8_5KhuWxvXW347obdF3OxRr0zWgOMULwkXk7Xs71Qe6erZ0booYaZTlFZBzQvN-Fc9oym\",\"x-tt-logid\":\"202505082028269475680499654609CE76\",\"x-tt-trace-host\":\"0184d7307e5a12e2f85df5424eac69e78d5256b2fb798b510a91004f5ce97fa2d25661caeb9529aff0f5001857dfefff3509df760b852e6ba30ff399a56c58336a4a40bbaab99e51c6809458c7f4a1f6d56cd32e9b3e7cac6c619160999d540d1159b451ac07859c8cef963964ea1b1b37\",\"x-tt-trace-id\":\"00-2505082028269475680499654609CE76-703372F41CA4608F-00\",\"x-tt-trace-tag\":\"id=03;cdn-cache=miss;type=dyn\"},\"config\":{\"transitional\":{\"silentJSONParsing\":true,\"forcedJSONParsing\":true,\"clarifyTimeoutError\":false},\"transformRequest\":[null],\"transformResponse\":[null],\"timeout\":0,\"xsrfCookieName\":\"passport_csrf_token\",\"xsrfHeaderName\":\"x-tt-passport-csrf-token\",\"maxContentLength\":-1,\"maxBodyLength\":-1,\"headers\":{\"Accept\":\"application/json, text/javascript\",\"x-tt-passport-csrf-token\":\"\",\"x-tt-passport-trace-id\":\"68008c01\"},\"baseURL\":\"https://www.douyin.com\",\"withCredentials\":true,\"url\":\"/passport/general/login_guiding_strategy/\",\"method\":\"get\",\"params\":{\"passport_jssdk_version\":\"2.2.2\",\"passport_jssdk_type\":\"pro\",\"aid\":6383,\"language\":\"zh\",\"account_sdk_source\":\"web\",\"account_sdk_source_info\":\"7e276d64776172647760466a6b66707777606b667c273f3d292772606761776c736077273f63646976602927666d776a686061776c736077273f63646976602927766d60696961776c736077273f63646976602927756970626c6b76273f302927756077686c76766c6a6b76273f5e7e276b646860273f276b6a716c636c6664716c6a6b762729277671647160273f2775776a68757127785829276c6b6b60774d606c626d71273f32343029276c6b6b6077526c61716d273f3430363329276a707160774d606c626d71273f3d373129276a70716077526c61716d273f34303633292776716a64776260567164717076273f7e276c6b61607d60614147273f7e276c6167273f276a676f6066712729276a75606b273f2763706b66716c6a6b2729276c6b61607d60614147273f276a676f6066712729274c41474e607c57646b6260273f2763706b66716c6a6b2729276a75606b4164716467647660273f2763706b66716c6a6b2729276c7656646364776c273f636469766029276d6476436071666d273f6364697660782927696a66646956716a77646260273f7e276c76567075756a77714956716a77646260273f717770602927766c7f60273f3731323d36292772776c7160273f7177706078292776716a7764626054706a7164567164717076273f7e277076646260273f34313d3c3431292774706a7164273f313c3d3d373537333229276c7655776c73647160273f6364697660787829277260676269273f7e2773606b616a77273f27426a6a626960254c6b662b252d4c6b7160692c27292777606b6160776077273f27444b424940252d4c6b71606929254c6b7160692d572c25504d4125427764756d6c6676252d357d353535353d4430332c25416c77606671364134342573765a305a352575765a305a35292541364134342c277829276b6a716c636c6664716c6a6b556077686c76766c6a6b273f2761606364706971272927756077636a7768646b6660273f7e27716c68604a776c626c6b273f34323133323532373c3d3036322b3d2927707660614f564d606475566c7f60273f3c3137303732303329276b64736c6264716c6a6b516c686c6b62273f7e276160666a616061476a617c566c7f60273f3d30303534332927606b71777c517c7560273f276b64736c6264716c6a6b2729276c6b6c716c64716a77517c7560273f276b64736c6264716c6a6b2729276b646860273f276d717175763f2a2a7272722b616a707c6c6b2b666a682a27292777606b61607747696a666e6c6b62567164717076273f276b6a6b2867696a666e6c6b62272927766077736077516c686c6b62273f276c6b6b60772971715a6462722966616b286664666d602960616260296a776c626c6b272927627069605671647771273f343531312b363c3c3c3c3c3c323334303d3429276270696041707764716c6a6b273f37322b3335353535353537363d31343d303d78782927776074706076715a6d6a7671273f277272722b616a707c6c6b2b666a68272927776074706076715a7564716d6b646860273f272a27292767776a72766077273f7e7878\",\"passport_ztsdk\":\"3.1.15\",\"passport_verify\":\"1.0.27\",\"request_host\":\"https%3A%2F%2Fwww.douyin.com\",\"biz_trace_id\":\"68008c01\",\"device_platform\":\"web_app\"},\"startTime\":1746707304805},\"request\":{\"secureOpenArgs\":{\"0\":\"GET\",\"1\":\"https://www.douyin.com/passport/general/login_guiding_strategy/?passport_jssdk_version=2.2.2&passport_jssdk_type=pro&aid=6383&language=zh&account_sdk_source=web&account_sdk_source_info=7e276d64776172647760466a6b66707777606b667c273f3d292772606761776c736077273f63646976602927666d776a686061776c736077273f63646976602927766d60696961776c736077273f63646976602927756970626c6b76273f302927756077686c76766c6a6b76273f5e7e276b646860273f276b6a716c636c6664716c6a6b762729277671647160273f2775776a68757127785829276c6b6b60774d606c626d71273f32343029276c6b6b6077526c61716d273f3430363329276a707160774d606c626d71273f3d373129276a70716077526c61716d273f34303633292776716a64776260567164717076273f7e276c6b61607d60614147273f7e276c6167273f276a676f6066712729276a75606b273f2763706b66716c6a6b2729276c6b61607d60614147273f276a676f6066712729274c41474e607c57646b6260273f2763706b66716c6a6b2729276a75606b4164716467647660273f2763706b66716c6a6b2729276c7656646364776c273f636469766029276d6476436071666d273f6364697660782927696a66646956716a77646260273f7e276c76567075756a77714956716a77646260273f717770602927766c7f60273f3731323d36292772776c7160273f7177706078292776716a7764626054706a7164567164717076273f7e277076646260273f34313d3c3431292774706a7164273f313c3d3d373537333229276c7655776c73647160273f6364697660787829277260676269273f7e2773606b616a77273f27426a6a626960254c6b662b252d4c6b7160692c27292777606b6160776077273f27444b424940252d4c6b71606929254c6b7160692d572c25504d4125427764756d6c6676252d357d353535353d4430332c25416c77606671364134342573765a305a352575765a305a35292541364134342c277829276b6a716c636c6664716c6a6b556077686c76766c6a6b273f2761606364706971272927756077636a7768646b6660273f7e27716c68604a776c626c6b273f34323133323532373c3d3036322b3d2927707660614f564d606475566c7f60273f3c3137303732303329276b64736c6264716c6a6b516c686c6b62273f7e276160666a616061476a617c566c7f60273f3d30303534332927606b71777c517c7560273f276b64736c6264716c6a6b2729276c6b6c716c64716a77517c7560273f276b64736c6264716c6a6b2729276b646860273f276d717175763f2a2a7272722b616a707c6c6b2b666a682a27292777606b61607747696a666e6c6b62567164717076273f276b6a6b2867696a666e6c6b62272927766077736077516c686c6b62273f276c6b6b60772971715a6462722966616b286664666d602960616260296a776c626c6b272927627069605671647771273f343531312b363c3c3c3c3c3c323334303d3429276270696041707764716c6a6b273f37322b3335353535353537363d31343d303d78782927776074706076715a6d6a7671273f277272722b616a707c6c6b2b666a68272927776074706076715a7564716d6b646860273f272a27292767776a72766077273f7e7878&passport_ztsdk=3.1.15&passport_verify=1.0.27&request_host=https%253A%252F%252Fwww.douyin.com&biz_trace_id=68008c01&device_platform=web_app\",\"2\":true},\"_tnc_original_url\":\"https://www.douyin.com/passport/general/login_guiding_strategy/?passport_jssdk_version=2.2.2&passport_jssdk_type=pro&aid=6383&language=zh&account_sdk_source=web&account_sdk_source_info=7e276d64776172647760466a6b66707777606b667c273f3d292772606761776c736077273f63646976602927666d776a686061776c736077273f63646976602927766d60696961776c736077273f63646976602927756970626c6b76273f302927756077686c76766c6a6b76273f5e7e276b646860273f276b6a716c636c6664716c6a6b762729277671647160273f2775776a68757127785829276c6b6b60774d606c626d71273f32343029276c6b6b6077526c61716d273f3430363329276a707160774d606c626d71273f3d373129276a70716077526c61716d273f34303633292776716a64776260567164717076273f7e276c6b61607d60614147273f7e276c6167273f276a676f6066712729276a75606b273f2763706b66716c6a6b2729276c6b61607d60614147273f276a676f6066712729274c41474e607c57646b6260273f2763706b66716c6a6b2729276a75606b4164716467647660273f2763706b66716c6a6b2729276c7656646364776c273f636469766029276d6476436071666d273f6364697660782927696a66646956716a77646260273f7e276c76567075756a77714956716a77646260273f717770602927766c7f60273f3731323d36292772776c7160273f7177706078292776716a7764626054706a7164567164717076273f7e277076646260273f34313d3c3431292774706a7164273f313c3d3d373537333229276c7655776c73647160273f6364697660787829277260676269273f7e2773606b616a77273f27426a6a626960254c6b662b252d4c6b7160692c27292777606b6160776077273f27444b424940252d4c6b71606929254c6b7160692d572c25504d4125427764756d6c6676252d357d353535353d4430332c25416c77606671364134342573765a305a352575765a305a35292541364134342c277829276b6a716c636c6664716c6a6b556077686c76766c6a6b273f2761606364706971272927756077636a7768646b6660273f7e27716c68604a776c626c6b273f34323133323532373c3d3036322b3d2927707660614f564d606475566c7f60273f3c3137303732303329276b64736c6264716c6a6b516c686c6b62273f7e276160666a616061476a617c566c7f60273f3d30303534332927606b71777c517c7560273f276b64736c6264716c6a6b2729276c6b6c716c64716a77517c7560273f276b64736c6264716c6a6b2729276b646860273f276d717175763f2a2a7272722b616a707c6c6b2b666a682a27292777606b61607747696a666e6c6b62567164717076273f276b6a6b2867696a666e6c6b62272927766077736077516c686c6b62273f276c6b6b60772971715a6462722966616b286664666d602960616260296a776c626c6b272927627069605671647771273f343531312b363c3c3c3c3c3c323334303d3429276270696041707764716c6a6b273f37322b3335353535353537363d31343d303d78782927776074706076715a6d6a7671273f277272722b616a707c6c6b2b666a68272927776074706076715a7564716d6b646860273f272a27292767776a72766077273f7e7878&passport_ztsdk=3.1.15&passport_verify=1.0.27&request_host=https%253A%252F%252Fwww.douyin.com&biz_trace_id=68008c01&device_platform=web_app\",\"_tnc_tncSchema\":{\"chromium_open\":1,\"ttnet_request_retry_delay_interval_ms\":200,\"ttnet_enable_cronet_request_report\":1,\"ttnet_local_dns_time_out\":120,\"ttnet_h2_config\":{\"ping_probe_timeout\":5,\"session_check_hosts\":[],\"h2_session_check_enabled\":1,\"h2_session_check_interval\":65,\"ping_keepalive_hosts\":[],\"ping_keepalive_interval\":30},\"md5_check\":0,\"ttnet_http_dns_timeout\":2,\"ttnet_dispatch_actions\":[{\"set_req_priority\":9000002,\"sign\":\"93fcfb3c45cac49e4612881eccb0601f\",\"act_priority\":9000000,\"action\":\"dispatch\",\"param\":{\"dispatch_strategy\":0,\"host_group\":[\"*\"],\"prefixes_group\":[\"/aweme/v1/web/ad/report\",\"/aweme/v1/web/fancy/qrcode/info\",\"/aweme/v1/web/api/suggest_words/\",\"/aweme/v1/web/seo/\",\"/aweme/v1/web/series/detail/\",\"/aweme/v1/web/series/list/\",\"/aweme/v1/web/series/aweme/\",\"/aweme/v1/web/content_pay/order/submit\",\"/aweme/v1/web/series/watched/list/\",\"/aweme/v1/web/series/card/feed/\",\"/aweme/v1/web/series/watch/record/\",\"/aweme/v1/web/user/paid_content/get/\"],\"service_name\":\"jump_east_path\"},\"rule_id\":350696}],\"ttnet_http_dns_enabled\":1,\"ttnet_request_retry_error_list\":[-21,-109,-126,-324,-101],\"ttnet_request_retry_max_attempts\":20,\"send_tnc_host_arrays\":[\"tnc0-aliec2.zijieapi.com\",\"tnc0-bjlgy.zijieapi.com\"],\"ttnet_h2_enabled\":1,\"tnc_update_interval\":180,\"ttnet_url_dispatcher_enabled\":1,\"ttnet_http_dns_google\":0,\"ttnet_http_dns_prefer\":1,\"ttnet_dispatch_actions_epoch\":-745022358},\"_tnc_tncSchemaInfo\":{\"aid\":\"-1\",\"isCustomDefaultSchema\":false,\"originalTncConfig\":{\"aid\":\"6383\",\"device_id\":\"7502050661513971211\",\"user_id\":\"2376464631080340\",\"region\":\"internal\"},\"requestQueryPayload\":{\"tnc_js_sdk_version\":\"2.3.9.0\",\"device_platform\":\"pc\",\"aid\":\"6383\",\"device_id\":\"7502050661513971211\",\"user_id\":\"2376464631080340\",\"web_service\":\"\"},\"requestHeaders\":{},\"responseHeaders\":{\"content-type\":\"application/json\"}},\"_tnc_referrer_url\":\"https://www.douyin.com/?recommend=1\",\"_tnc_url_process_result\":[{\"newUrl\":\"https://www.douyin.com/passport/general/login_guiding_strategy/?passport_jssdk_version=2.2.2&passport_jssdk_type=pro&aid=6383&language=zh&account_sdk_source=web&account_sdk_source_info=7e276d64776172647760466a6b66707777606b667c273f3d292772606761776c736077273f63646976602927666d776a686061776c736077273f63646976602927766d60696961776c736077273f63646976602927756970626c6b76273f302927756077686c76766c6a6b76273f5e7e276b646860273f276b6a716c636c6664716c6a6b762729277671647160273f2775776a68757127785829276c6b6b60774d606c626d71273f32343029276c6b6b6077526c61716d273f3430363329276a707160774d606c626d71273f3d373129276a70716077526c61716d273f34303633292776716a64776260567164717076273f7e276c6b61607d60614147273f7e276c6167273f276a676f6066712729276a75606b273f2763706b66716c6a6b2729276c6b61607d60614147273f276a676f6066712729274c41474e607c57646b6260273f2763706b66716c6a6b2729276a75606b4164716467647660273f2763706b66716c6a6b2729276c7656646364776c273f636469766029276d6476436071666d273f6364697660782927696a66646956716a77646260273f7e276c76567075756a77714956716a77646260273f717770602927766c7f60273f3731323d36292772776c7160273f7177706078292776716a7764626054706a7164567164717076273f7e277076646260273f34313d3c3431292774706a7164273f313c3d3d373537333229276c7655776c73647160273f6364697660787829277260676269273f7e2773606b616a77273f27426a6a626960254c6b662b252d4c6b7160692c27292777606b6160776077273f27444b424940252d4c6b71606929254c6b7160692d572c25504d4125427764756d6c6676252d357d353535353d4430332c25416c77606671364134342573765a305a352575765a305a35292541364134342c277829276b6a716c636c6664716c6a6b556077686c76766c6a6b273f2761606364706971272927756077636a7768646b6660273f7e27716c68604a776c626c6b273f34323133323532373c3d3036322b3d2927707660614f564d606475566c7f60273f3c3137303732303329276b64736c6264716c6a6b516c686c6b62273f7e276160666a616061476a617c566c7f60273f3d30303534332927606b71777c517c7560273f276b64736c6264716c6a6b2729276c6b6c716c64716a77517c7560273f276b64736c6264716c6a6b2729276b646860273f276d717175763f2a2a7272722b616a707c6c6b2b666a682a27292777606b61607747696a666e6c6b62567164717076273f276b6a6b2867696a666e6c6b62272927766077736077516c686c6b62273f276c6b6b60772971715a6462722966616b286664666d602960616260296a776c626c6b272927627069605671647771273f343531312b363c3c3c3c3c3c323334303d3429276270696041707764716c6a6b273f37322b3335353535353537363d31343d303d78782927776074706076715a6d6a7671273f277272722b616a707c6c6b2b666a68272927776074706076715a7564716d6b646860273f272a27292767776a72766077273f7e7878&passport_ztsdk=3.1.15&passport_verify=1.0.27&request_host=https%253A%252F%252Fwww.douyin.com&biz_trace_id=68008c01&device_platform=web_app\",\"processResults\":[]}],\"_tnc_request_url\":\"https://www.douyin.com/passport/general/login_guiding_strategy/?passport_jssdk_version=2.2.2&passport_jssdk_type=pro&aid=6383&language=zh&account_sdk_source=web&account_sdk_source_info=7e276d64776172647760466a6b66707777606b667c273f3d292772606761776c736077273f63646976602927666d776a686061776c736077273f63646976602927766d60696961776c736077273f63646976602927756970626c6b76273f302927756077686c76766c6a6b76273f5e7e276b646860273f276b6a716c636c6664716c6a6b762729277671647160273f2775776a68757127785829276c6b6b60774d606c626d71273f32343029276c6b6b6077526c61716d273f3430363329276a707160774d606c626d71273f3d373129276a70716077526c61716d273f34303633292776716a64776260567164717076273f7e276c6b61607d60614147273f7e276c6167273f276a676f6066712729276a75606b273f2763706b66716c6a6b2729276c6b61607d60614147273f276a676f6066712729274c41474e607c57646b6260273f2763706b66716c6a6b2729276a75606b4164716467647660273f2763706b66716c6a6b2729276c7656646364776c273f636469766029276d6476436071666d273f6364697660782927696a66646956716a77646260273f7e276c76567075756a77714956716a77646260273f717770602927766c7f60273f3731323d36292772776c7160273f7177706078292776716a7764626054706a7164567164717076273f7e277076646260273f34313d3c3431292774706a7164273f313c3d3d373537333229276c7655776c73647160273f6364697660787829277260676269273f7e2773606b616a77273f27426a6a626960254c6b662b252d4c6b7160692c27292777606b6160776077273f27444b424940252d4c6b71606929254c6b7160692d572c25504d4125427764756d6c6676252d357d353535353d4430332c25416c77606671364134342573765a305a352575765a305a35292541364134342c277829276b6a716c636c6664716c6a6b556077686c76766c6a6b273f2761606364706971272927756077636a7768646b6660273f7e27716c68604a776c626c6b273f34323133323532373c3d3036322b3d2927707660614f564d606475566c7f60273f3c3137303732303329276b64736c6264716c6a6b516c686c6b62273f7e276160666a616061476a617c566c7f60273f3d30303534332927606b71777c517c7560273f276b64736c6264716c6a6b2729276c6b6c716c64716a77517c7560273f276b64736c6264716c6a6b2729276b646860273f276d717175763f2a2a7272722b616a707c6c6b2b666a682a27292777606b61607747696a666e6c6b62567164717076273f276b6a6b2867696a666e6c6b62272927766077736077516c686c6b62273f276c6b6b60772971715a6462722966616b286664666d602960616260296a776c626c6b272927627069605671647771273f343531312b363c3c3c3c3c3c323334303d3429276270696041707764716c6a6b273f37322b3335353535353537363d31343d303d78782927776074706076715a6d6a7671273f277272722b616a707c6c6b2b666a68272927776074706076715a7564716d6b646860273f272a27292767776a72766077273f7e7878&passport_ztsdk=3.1.15&passport_verify=1.0.27&request_host=https%253A%252F%252Fwww.douyin.com&biz_trace_id=68008c01&device_platform=web_app\",\"_method\":\"GET\",\"_url\":\"https://www.douyin.com/passport/general/login_guiding_strategy/?passport_jssdk_version=2.2.2&passport_jssdk_type=pro&aid=6383&language=zh&account_sdk_source=web&account_sdk_source_info=7e276d64776172647760466a6b66707777606b667c273f3d292772606761776c736077273f63646976602927666d776a686061776c736077273f63646976602927766d60696961776c736077273f63646976602927756970626c6b76273f302927756077686c76766c6a6b76273f5e7e276b646860273f276b6a716c636c6664716c6a6b762729277671647160273f2775776a68757127785829276c6b6b60774d606c626d71273f32343029276c6b6b6077526c61716d273f3430363329276a707160774d606c626d71273f3d373129276a70716077526c61716d273f34303633292776716a64776260567164717076273f7e276c6b61607d60614147273f7e276c6167273f276a676f6066712729276a75606b273f2763706b66716c6a6b2729276c6b61607d60614147273f276a676f6066712729274c41474e607c57646b6260273f2763706b66716c6a6b2729276a75606b4164716467647660273f2763706b66716c6a6b2729276c7656646364776c273f636469766029276d6476436071666d273f6364697660782927696a66646956716a77646260273f7e276c76567075756a77714956716a77646260273f717770602927766c7f60273f3731323d36292772776c7160273f7177706078292776716a7764626054706a7164567164717076273f7e277076646260273f34313d3c3431292774706a7164273f313c3d3d373537333229276c7655776c73647160273f6364697660787829277260676269273f7e2773606b616a77273f27426a6a626960254c6b662b252d4c6b7160692c27292777606b6160776077273f27444b424940252d4c6b71606929254c6b7160692d572c25504d4125427764756d6c6676252d357d353535353d4430332c25416c77606671364134342573765a305a352575765a305a35292541364134342c277829276b6a716c636c6664716c6a6b556077686c76766c6a6b273f2761606364706971272927756077636a7768646b6660273f7e27716c68604a776c626c6b273f34323133323532373c3d3036322b3d2927707660614f564d606475566c7f60273f3c3137303732303329276b64736c6264716c6a6b516c686c6b62273f7e276160666a616061476a617c566c7f60273f3d30303534332927606b71777c517c7560273f276b64736c6264716c6a6b2729276c6b6c716c64716a77517c7560273f276b64736c6264716c6a6b2729276b646860273f276d717175763f2a2a7272722b616a707c6c6b2b666a682a27292777606b61607747696a666e6c6b62567164717076273f276b6a6b2867696a666e6c6b62272927766077736077516c686c6b62273f276c6b6b60772971715a6462722966616b286664666d602960616260296a776c626c6b272927627069605671647771273f343531312b363c3c3c3c3c3c323334303d3429276270696041707764716c6a6b273f37322b3335353535353537363d31343d303d78782927776074706076715a6d6a7671273f277272722b616a707c6c6b2b666a68272927776074706076715a7564716d6b646860273f272a27292767776a72766077273f7e7878&passport_ztsdk=3.1.15&passport_verify=1.0.27&request_host=https%253A%252F%252Fwww.douyin.com&biz_trace_id=68008c01&device_platform=web_app&a_bogus=xXsRD7SyOpmbFVKS8KxpS4%2FlTgxlrB8ya4TdRPZPtNPvTwFcTbNWxaCeJxF6Ul8jXmp0hFV7dValbfncQGXsZC9kKmpfukv6302A9X8L8qwXGeG%2FgqDYCgUzLwMCUmiN-59-iADRAsMN2VxR9NVPAQMat5z95bjgSHBCpZSynDS8ps6TV92berzWiqf%3D\",\"loadingBlockType\":0,\"_xhr_open_args\":{\"method\":\"GET\",\"url\":\"https://www.douyin.com/passport/general/login_guiding_strategy/?passport_jssdk_version=2.2.2&passport_jssdk_type=pro&aid=6383&language=zh&account_sdk_source=web&account_sdk_source_info=7e276d64776172647760466a6b66707777606b667c273f3d292772606761776c736077273f63646976602927666d776a686061776c736077273f63646976602927766d60696961776c736077273f63646976602927756970626c6b76273f302927756077686c76766c6a6b76273f5e7e276b646860273f276b6a716c636c6664716c6a6b762729277671647160273f2775776a68757127785829276c6b6b60774d606c626d71273f32343029276c6b6b6077526c61716d273f3430363329276a707160774d606c626d71273f3d373129276a70716077526c61716d273f34303633292776716a64776260567164717076273f7e276c6b61607d60614147273f7e276c6167273f276a676f6066712729276a75606b273f2763706b66716c6a6b2729276c6b61607d60614147273f276a676f6066712729274c41474e607c57646b6260273f2763706b66716c6a6b2729276a75606b4164716467647660273f2763706b66716c6a6b2729276c7656646364776c273f636469766029276d6476436071666d273f6364697660782927696a66646956716a77646260273f7e276c76567075756a77714956716a77646260273f717770602927766c7f60273f3731323d36292772776c7160273f7177706078292776716a7764626054706a7164567164717076273f7e277076646260273f34313d3c3431292774706a7164273f313c3d3d373537333229276c7655776c73647160273f6364697660787829277260676269273f7e2773606b616a77273f27426a6a626960254c6b662b252d4c6b7160692c27292777606b6160776077273f27444b424940252d4c6b71606929254c6b7160692d572c25504d4125427764756d6c6676252d357d353535353d4430332c25416c77606671364134342573765a305a352575765a305a35292541364134342c277829276b6a716c636c6664716c6a6b556077686c76766c6a6b273f2761606364706971272927756077636a7768646b6660273f7e27716c68604a776c626c6b273f34323133323532373c3d3036322b3d2927707660614f564d606475566c7f60273f3c3137303732303329276b64736c6264716c6a6b516c686c6b62273f7e276160666a616061476a617c566c7f60273f3d30303534332927606b71777c517c7560273f276b64736c6264716c6a6b2729276c6b6c716c64716a77517c7560273f276b64736c6264716c6a6b2729276b646860273f276d717175763f2a2a7272722b616a707c6c6b2b666a682a27292777606b61607747696a666e6c6b62567164717076273f276b6a6b2867696a666e6c6b62272927766077736077516c686c6b62273f276c6b6b60772971715a6462722966616b286664666d602960616260296a776c626c6b272927627069605671647771273f343531312b363c3c3c3c3c3c323334303d3429276270696041707764716c6a6b273f37322b3335353535353537363d31343d303d78782927776074706076715a6d6a7671273f277272722b616a707c6c6b2b666a68272927776074706076715a7564716d6b646860273f272a27292767776a72766077273f7e7878&passport_ztsdk=3.1.15&passport_verify=1.0.27&request_host=https%253A%252F%252Fwww.douyin.com&biz_trace_id=68008c01&device_platform=web_app&a_bogus=xXsRD7SyOpmbFVKS8KxpS4%2FlTgxlrB8ya4TdRPZPtNPvTwFcTbNWxaCeJxF6Ul8jXmp0hFV7dValbfncQGXsZC9kKmpfukv6302A9X8L8qwXGeG%2FgqDYCgUzLwMCUmiN-59-iADRAsMN2VxR9NVPAQMat5z95bjgSHBCpZSynDS8ps6TV92berzWiqf%3D\",\"isAsync\":true},\"_reqHeaders\":{\"Accept\":\"application/json, text/javascript\",\"x-tt-passport-csrf-token\":\"\",\"x-tt-passport-trace-id\":\"68008c01\"},\"__secReqHeaders\":{\"Accept\":\"application/json, text/javascript\",\"x-tt-passport-trace-id\":\"68008c01\"},\"_xhr_headers\":{\"Accept\":\"application/json, text/javascript\",\"x-tt-passport-trace-id\":\"68008c01\"},\"_start\":1746707304816,\"_data\":null}},\"respHeader\":{\"access-control-allow-credentials\":\"true\",\"bd-tt-error-code\":\"0\",\"content-encoding\":\"gzip\",\"content-length\":\"466\",\"content-type\":\"application/json\",\"date\":\"Thu, 08 May 2025 12:28:26 GMT\",\"eagleid\":\"78f1ada417467073063506170e\",\"server\":\"Tengine\",\"server-timing\":\"inner; dur=35, cdn-cache;desc=MISS,edge;dur=0,origin;dur=86\",\"strict-transport-security\":\"max-age=31536000; includeSubDomains; preload\",\"timing-allow-origin\":\"*\",\"vary\":\"Accept-Encoding,Origin\",\"via\":\"live16.cn8046[86,0]\",\"x-ms-token\":\"jygeUuL1W04hXN4y-A4joeDQXndqPBoT4-t8_5KhuWxvXW347obdF3OxRr0zWgOMULwkXk7Xs71Qe6erZ0booYaZTlFZBzQvN-Fc9oym\",\"x-tt-logid\":\"202505082028269475680499654609CE76\",\"x-tt-trace-host\":\"0184d7307e5a12e2f85df5424eac69e78d5256b2fb798b510a91004f5ce97fa2d25661caeb9529aff0f5001857dfefff3509df760b852e6ba30ff399a56c58336a4a40bbaab99e51c6809458c7f4a1f6d56cd32e9b3e7cac6c619160999d540d1159b451ac07859c8cef963964ea1b1b37\",\"x-tt-trace-id\":\"00-2505082028269475680499654609CE76-703372F41CA4608F-00\",\"x-tt-trace-tag\":\"id=03;cdn-cache=miss;type=dyn\"},\"middlewareHandlerLog\":[{\"name\":\"request\",\"time\":211,\"endTime\":1746707305016,\"startTime\":1746707304805,\"errorCode\":0,\"logid\":\"202505082028269475680499654609CE76\"}]}",
    "HEADER_RECHARGE_GUIDE": "{\"count\":1,\"showTime\":1746707305774}"
};
localStorage = {
    getItem: function (key) {
        return local[key];
    },
    setItem: function (key, value) {
        local[key] = value;
    },
    clear: function () {
        local = {};
    },
    removeItem: function (key) {
        delete local[key];
    }
}
localStorage.__proto__ = Storage.prototype;
sessionStorage = {
    getItem: function (key) {
        return local[key];
    },
    setItem: function (key, value) {
        local[key] = value;
    },
    clear: function () {
        local = {};
    },
    removeItem: function (key) {
        delete local[key];
    }
}
sessionStorage.__proto__ = Storage.prototype;


Object.key_ = Object.keys;
Object.keys = function keys(obj) {
    var keys = Object.key_(obj);
    if (obj + '' === '[object Screen]') {
        return []
    }
    // dtavm._log('Object.keys:', obj+'');
    return keys;
}
window.func_set_native(Object.keys);

Object.getOwnPropertyDescriptor_ = Object.getOwnPropertyDescriptor;
Object.getOwnPropertyDescriptor = function getOwnPropertyDescriptor(obj, prop) {
    var desc = Object.getOwnPropertyDescriptor_(obj, prop);
    if (prop+'' === 'Request') {
        return {
            configurable: true,
            enumerable: false,
            value: {Request(){}}.Request,
            writable:true
        };
    }
    if (prop+'' === 'Headers') {
        return {
            configurable: true,
            enumerable: false,
            value: {Headers(){}}.Headers,
            writable:true
        };
    }
    if (prop+'' === 'screen') {
        return {
            configurable: true,
            enumerable: true,
            get: {screen(){}}.screen,
            set: {screen(){}}.screen
        };
    }
    // dtavm._log('Object.getOwnPropertyDescriptor:', obj + '', prop + '', desc);
    return desc;
}
window.func_set_native(Object.getOwnPropertyDescriptor);

Object.getOwnPropertyNames_ = Object.getOwnPropertyNames;
Object.getOwnPropertyNames = function getOwnPropertyNames(obj) {
    var names = Object.getOwnPropertyNames_(obj);
    if (obj + '' === '[object Window]') {
        return [
            "0",
            "Object",
            "Function",
            "Array",
            "Number",
            "parseFloat",
            "parseInt",
            "Infinity",
            "NaN",
            "undefined",
            "Boolean",
            "String",
            "Symbol",
            "Date",
            "Promise",
            "RegExp",
            "Error",
            "AggregateError",
            "EvalError",
            "RangeError",
            "ReferenceError",
            "SyntaxError",
            "TypeError",
            "URIError",
            "globalThis",
            "JSON",
            "Math",
            "Intl",
            "ArrayBuffer",
            "Atomics",
            "Uint8Array",
            "Int8Array",
            "Uint16Array",
            "Int16Array",
            "Uint32Array",
            "Int32Array",
            "Float32Array",
            "Float64Array",
            "Uint8ClampedArray",
            "BigUint64Array",
            "BigInt64Array",
            "DataView",
            "Map",
            "BigInt",
            "Set",
            "WeakMap",
            "WeakSet",
            "Proxy",
            "Reflect",
            "FinalizationRegistry",
            "WeakRef",
            "decodeURI",
            "decodeURIComponent",
            "encodeURI",
            "encodeURIComponent",
            "escape",
            "unescape",
            "eval",
            "isFinite",
            "isNaN",
            "console",
            "Option",
            "Image",
            "Audio",
            "webkitURL",
            "webkitRTCPeerConnection",
            "webkitMediaStream",
            "WebKitMutationObserver",
            "WebKitCSSMatrix",
            "XSLTProcessor",
            "XPathResult",
            "XPathExpression",
            "XPathEvaluator",
            "XMLSerializer",
            "XMLHttpRequestUpload",
            "XMLHttpRequestEventTarget",
            "XMLHttpRequest",
            "XMLDocument",
            "WritableStreamDefaultWriter",
            "WritableStreamDefaultController",
            "WritableStream",
            "Worker",
            "Window",
            "WheelEvent",
            "WebSocket",
            "WebGLVertexArrayObject",
            "WebGLUniformLocation",
            "WebGLTransformFeedback",
            "WebGLTexture",
            "WebGLSync",
            "WebGLShaderPrecisionFormat",
            "WebGLShader",
            "WebGLSampler",
            "WebGLRenderingContext",
            "WebGLRenderbuffer",
            "WebGLQuery",
            "WebGLProgram",
            "WebGLFramebuffer",
            "WebGLContextEvent",
            "WebGLBuffer",
            "WebGLActiveInfo",
            "WebGL2RenderingContext",
            "WaveShaperNode",
            "VisualViewport",
            "VirtualKeyboardGeometryChangeEvent",
            "ValidityState",
            "VTTCue",
            "UserActivation",
            "URLSearchParams",
            "URLPattern",
            "URL",
            "UIEvent",
            "TrustedTypePolicyFactory",
            "TrustedTypePolicy",
            "TrustedScriptURL",
            "TrustedScript",
            "TrustedHTML",
            "TreeWalker",
            "TransitionEvent",
            "TransformStreamDefaultController",
            "TransformStream",
            "TrackEvent",
            "TouchList",
            "TouchEvent",
            "Touch",
            "ToggleEvent",
            "TimeRanges",
            "TextTrackList",
            "TextTrackCueList",
            "TextTrackCue",
            "TextTrack",
            "TextMetrics",
            "TextEvent",
            "TextEncoderStream",
            "TextEncoder",
            "TextDecoderStream",
            "TextDecoder",
            "Text",
            "TaskSignal",
            "TaskPriorityChangeEvent",
            "TaskController",
            "TaskAttributionTiming",
            "SyncManager",
            "SubmitEvent",
            "StyleSheetList",
            "StyleSheet",
            "StylePropertyMapReadOnly",
            "StylePropertyMap",
            "StorageEvent",
            "Storage",
            "StereoPannerNode",
            "StaticRange",
            "SourceBufferList",
            "SourceBuffer",
            "ShadowRoot",
            "Selection",
            "SecurityPolicyViolationEvent",
            "ScriptProcessorNode",
            "ScreenOrientation",
            "Screen",
            "Scheduling",
            "Scheduler",
            "SVGViewElement",
            "SVGUseElement",
            "SVGUnitTypes",
            "SVGTransformList",
            "SVGTransform",
            "SVGTitleElement",
            "SVGTextPositioningElement",
            "SVGTextPathElement",
            "SVGTextElement",
            "SVGTextContentElement",
            "SVGTSpanElement",
            "SVGSymbolElement",
            "SVGSwitchElement",
            "SVGStyleElement",
            "SVGStringList",
            "SVGStopElement",
            "SVGSetElement",
            "SVGScriptElement",
            "SVGSVGElement",
            "SVGRectElement",
            "SVGRect",
            "SVGRadialGradientElement",
            "SVGPreserveAspectRatio",
            "SVGPolylineElement",
            "SVGPolygonElement",
            "SVGPointList",
            "SVGPoint",
            "SVGPatternElement",
            "SVGPathElement",
            "SVGNumberList",
            "SVGNumber",
            "SVGMetadataElement",
            "SVGMatrix",
            "SVGMaskElement",
            "SVGMarkerElement",
            "SVGMPathElement",
            "SVGLinearGradientElement",
            "SVGLineElement",
            "SVGLengthList",
            "SVGLength",
            "SVGImageElement",
            "SVGGraphicsElement",
            "SVGGradientElement",
            "SVGGeometryElement",
            "SVGGElement",
            "SVGForeignObjectElement",
            "SVGFilterElement",
            "SVGFETurbulenceElement",
            "SVGFETileElement",
            "SVGFESpotLightElement",
            "SVGFESpecularLightingElement",
            "SVGFEPointLightElement",
            "SVGFEOffsetElement",
            "SVGFEMorphologyElement",
            "SVGFEMergeNodeElement",
            "SVGFEMergeElement",
            "SVGFEImageElement",
            "SVGFEGaussianBlurElement",
            "SVGFEFuncRElement",
            "SVGFEFuncGElement",
            "SVGFEFuncBElement",
            "SVGFEFuncAElement",
            "SVGFEFloodElement",
            "SVGFEDropShadowElement",
            "SVGFEDistantLightElement",
            "SVGFEDisplacementMapElement",
            "SVGFEDiffuseLightingElement",
            "SVGFEConvolveMatrixElement",
            "SVGFECompositeElement",
            "SVGFEComponentTransferElement",
            "SVGFEColorMatrixElement",
            "SVGFEBlendElement",
            "SVGEllipseElement",
            "SVGElement",
            "SVGDescElement",
            "SVGDefsElement",
            "SVGComponentTransferFunctionElement",
            "SVGClipPathElement",
            "SVGCircleElement",
            "SVGAnimationElement",
            "SVGAnimatedTransformList",
            "SVGAnimatedString",
            "SVGAnimatedRect",
            "SVGAnimatedPreserveAspectRatio",
            "SVGAnimatedNumberList",
            "SVGAnimatedNumber",
            "SVGAnimatedLengthList",
            "SVGAnimatedLength",
            "SVGAnimatedInteger",
            "SVGAnimatedEnumeration",
            "SVGAnimatedBoolean",
            "SVGAnimatedAngle",
            "SVGAnimateTransformElement",
            "SVGAnimateMotionElement",
            "SVGAnimateElement",
            "SVGAngle",
            "SVGAElement",
            "Response",
            "ResizeObserverSize",
            "ResizeObserverEntry",
            "ResizeObserver",
            "Request",
            "ReportingObserver",
            "ReadableStreamDefaultReader",
            "ReadableStreamDefaultController",
            "ReadableStreamBYOBRequest",
            "ReadableStreamBYOBReader",
            "ReadableStream",
            "ReadableByteStreamController",
            "Range",
            "RadioNodeList",
            "RTCTrackEvent",
            "RTCStatsReport",
            "RTCSessionDescription",
            "RTCSctpTransport",
            "RTCRtpTransceiver",
            "RTCRtpSender",
            "RTCRtpReceiver",
            "RTCPeerConnectionIceEvent",
            "RTCPeerConnectionIceErrorEvent",
            "RTCPeerConnection",
            "RTCIceTransport",
            "RTCIceCandidate",
            "RTCErrorEvent",
            "RTCError",
            "RTCEncodedVideoFrame",
            "RTCEncodedAudioFrame",
            "RTCDtlsTransport",
            "RTCDataChannelEvent",
            "RTCDataChannel",
            "RTCDTMFToneChangeEvent",
            "RTCDTMFSender",
            "RTCCertificate",
            "PromiseRejectionEvent",
            "ProgressEvent",
            "Profiler",
            "ProcessingInstruction",
            "PopStateEvent",
            "PointerEvent",
            "PluginArray",
            "Plugin",
            "PictureInPictureWindow",
            "PictureInPictureEvent",
            "PeriodicWave",
            "PerformanceTiming",
            "PerformanceServerTiming",
            "PerformanceResourceTiming",
            "PerformancePaintTiming",
            "PerformanceObserverEntryList",
            "PerformanceObserver",
            "PerformanceNavigationTiming",
            "PerformanceNavigation",
            "PerformanceMeasure",
            "PerformanceMark",
            "PerformanceLongTaskTiming",
            "PerformanceEventTiming",
            "PerformanceEntry",
            "PerformanceElementTiming",
            "Performance",
            "Path2D",
            "PannerNode",
            "PageTransitionEvent",
            "OverconstrainedError",
            "OscillatorNode",
            "OffscreenCanvasRenderingContext2D",
            "OffscreenCanvas",
            "OfflineAudioContext",
            "OfflineAudioCompletionEvent",
            "NodeList",
            "NodeIterator",
            "NodeFilter",
            "Node",
            "NetworkInformation",
            "Navigator",
            "NavigationTransition",
            "NavigationHistoryEntry",
            "NavigationDestination",
            "NavigationCurrentEntryChangeEvent",
            "Navigation",
            "NavigateEvent",
            "NamedNodeMap",
            "MutationRecord",
            "MutationObserver",
            "MouseEvent",
            "MimeTypeArray",
            "MimeType",
            "MessagePort",
            "MessageEvent",
            "MessageChannel",
            "MediaStreamTrackProcessor",
            "MediaStreamTrackGenerator",
            "MediaStreamTrackEvent",
            "MediaStreamTrack",
            "MediaStreamEvent",
            "MediaStreamAudioSourceNode",
            "MediaStreamAudioDestinationNode",
            "MediaStream",
            "MediaSourceHandle",
            "MediaSource",
            "MediaRecorder",
            "MediaQueryListEvent",
            "MediaQueryList",
            "MediaList",
            "MediaError",
            "MediaEncryptedEvent",
            "MediaElementAudioSourceNode",
            "MediaCapabilities",
            "MathMLElement",
            "Location",
            "LayoutShiftAttribution",
            "LayoutShift",
            "LargestContentfulPaint",
            "KeyframeEffect",
            "KeyboardEvent",
            "IntersectionObserverEntry",
            "IntersectionObserver",
            "InputEvent",
            "InputDeviceInfo",
            "InputDeviceCapabilities",
            "ImageData",
            "ImageCapture",
            "ImageBitmapRenderingContext",
            "ImageBitmap",
            "IdleDeadline",
            "IIRFilterNode",
            "IDBVersionChangeEvent",
            "IDBTransaction",
            "IDBRequest",
            "IDBOpenDBRequest",
            "IDBObjectStore",
            "IDBKeyRange",
            "IDBIndex",
            "IDBFactory",
            "IDBDatabase",
            "IDBCursorWithValue",
            "IDBCursor",
            "History",
            "Headers",
            "HashChangeEvent",
            "HTMLVideoElement",
            "HTMLUnknownElement",
            "HTMLUListElement",
            "HTMLTrackElement",
            "HTMLTitleElement",
            "HTMLTimeElement",
            "HTMLTextAreaElement",
            "HTMLTemplateElement",
            "HTMLTableSectionElement",
            "HTMLTableRowElement",
            "HTMLTableElement",
            "HTMLTableColElement",
            "HTMLTableCellElement",
            "HTMLTableCaptionElement",
            "HTMLStyleElement",
            "HTMLSpanElement",
            "HTMLSourceElement",
            "HTMLSlotElement",
            "HTMLSelectElement",
            "HTMLScriptElement",
            "HTMLQuoteElement",
            "HTMLProgressElement",
            "HTMLPreElement",
            "HTMLPictureElement",
            "HTMLParamElement",
            "HTMLParagraphElement",
            "HTMLOutputElement",
            "HTMLOptionsCollection",
            "HTMLOptionElement",
            "HTMLOptGroupElement",
            "HTMLObjectElement",
            "HTMLOListElement",
            "HTMLModElement",
            "HTMLMeterElement",
            "HTMLMetaElement",
            "HTMLMenuElement",
            "HTMLMediaElement",
            "HTMLMarqueeElement",
            "HTMLMapElement",
            "HTMLLinkElement",
            "HTMLLegendElement",
            "HTMLLabelElement",
            "HTMLLIElement",
            "HTMLInputElement",
            "HTMLImageElement",
            "HTMLIFrameElement",
            "HTMLHtmlElement",
            "HTMLHeadingElement",
            "HTMLHeadElement",
            "HTMLHRElement",
            "HTMLFrameSetElement",
            "HTMLFrameElement",
            "HTMLFormElement",
            "HTMLFormControlsCollection",
            "HTMLFontElement",
            "HTMLFieldSetElement",
            "HTMLEmbedElement",
            "HTMLElement",
            "HTMLDocument",
            "HTMLDivElement",
            "HTMLDirectoryElement",
            "HTMLDialogElement",
            "HTMLDetailsElement",
            "HTMLDataListElement",
            "HTMLDataElement",
            "HTMLDListElement",
            "HTMLCollection",
            "HTMLCanvasElement",
            "HTMLButtonElement",
            "HTMLBodyElement",
            "HTMLBaseElement",
            "HTMLBRElement",
            "HTMLAudioElement",
            "HTMLAreaElement",
            "HTMLAnchorElement",
            "HTMLAllCollection",
            "GeolocationPositionError",
            "GeolocationPosition",
            "GeolocationCoordinates",
            "Geolocation",
            "GamepadHapticActuator",
            "GamepadEvent",
            "GamepadButton",
            "Gamepad",
            "GainNode",
            "FormDataEvent",
            "FormData",
            "FontFaceSetLoadEvent",
            "FontFace",
            "FocusEvent",
            "FileReader",
            "FileList",
            "File",
            "FeaturePolicy",
            "External",
            "EventTarget",
            "EventSource",
            "EventCounts",
            "Event",
            "ErrorEvent",
            "ElementInternals",
            "Element",
            "DynamicsCompressorNode",
            "DragEvent",
            "DocumentType",
            "DocumentFragment",
            "Document",
            "DelayNode",
            "DecompressionStream",
            "DataTransferItemList",
            "DataTransferItem",
            "DataTransfer",
            "DOMTokenList",
            "DOMStringMap",
            "DOMStringList",
            "DOMRectReadOnly",
            "DOMRectList",
            "DOMRect",
            "DOMQuad",
            "DOMPointReadOnly",
            "DOMPoint",
            "DOMParser",
            "DOMMatrixReadOnly",
            "DOMMatrix",
            "DOMImplementation",
            "DOMException",
            "DOMError",
            "CustomStateSet",
            "CustomEvent",
            "CustomElementRegistry",
            "Crypto",
            "CountQueuingStrategy",
            "ConvolverNode",
            "ConstantSourceNode",
            "CompressionStream",
            "CompositionEvent",
            "Comment",
            "CloseEvent",
            "ClipboardEvent",
            "CharacterData",
            "ChannelSplitterNode",
            "ChannelMergerNode",
            "CanvasRenderingContext2D",
            "CanvasPattern",
            "CanvasGradient",
            "CanvasCaptureMediaStreamTrack",
            "CSSVariableReferenceValue",
            "CSSUnparsedValue",
            "CSSUnitValue",
            "CSSTranslate",
            "CSSTransformValue",
            "CSSTransformComponent",
            "CSSSupportsRule",
            "CSSStyleValue",
            "CSSStyleSheet",
            "CSSStyleRule",
            "CSSStyleDeclaration",
            "CSSSkewY",
            "CSSSkewX",
            "CSSSkew",
            "CSSScale",
            "CSSRuleList",
            "CSSRule",
            "CSSRotate",
            "CSSPropertyRule",
            "CSSPositionValue",
            "CSSPerspective",
            "CSSPageRule",
            "CSSNumericValue",
            "CSSNumericArray",
            "CSSNamespaceRule",
            "CSSMediaRule",
            "CSSMatrixComponent",
            "CSSMathValue",
            "CSSMathSum",
            "CSSMathProduct",
            "CSSMathNegate",
            "CSSMathMin",
            "CSSMathMax",
            "CSSMathInvert",
            "CSSMathClamp",
            "CSSLayerStatementRule",
            "CSSLayerBlockRule",
            "CSSKeywordValue",
            "CSSKeyframesRule",
            "CSSKeyframeRule",
            "CSSImportRule",
            "CSSImageValue",
            "CSSGroupingRule",
            "CSSFontPaletteValuesRule",
            "CSSFontFaceRule",
            "CSSCounterStyleRule",
            "CSSContainerRule",
            "CSSConditionRule",
            "CSS",
            "CDATASection",
            "ByteLengthQueuingStrategy",
            "BroadcastChannel",
            "BlobEvent",
            "Blob",
            "BiquadFilterNode",
            "BeforeUnloadEvent",
            "BeforeInstallPromptEvent",
            "BaseAudioContext",
            "BarProp",
            "AudioWorkletNode",
            "AudioSinkInfo",
            "AudioScheduledSourceNode",
            "AudioProcessingEvent",
            "AudioParamMap",
            "AudioParam",
            "AudioNode",
            "AudioListener",
            "AudioDestinationNode",
            "AudioContext",
            "AudioBufferSourceNode",
            "AudioBuffer",
            "Attr",
            "AnimationEvent",
            "AnimationEffect",
            "Animation",
            "AnalyserNode",
            "AbstractRange",
            "AbortSignal",
            "AbortController",
            "window",
            "self",
            "document",
            "name",
            "location",
            "customElements",
            "history",
            "navigation",
            "locationbar",
            "menubar",
            "personalbar",
            "scrollbars",
            "statusbar",
            "toolbar",
            "status",
            "closed",
            "frames",
            "length",
            "top",
            "opener",
            "parent",
            "frameElement",
            "navigator",
            "origin",
            "external",
            "screen",
            "innerWidth",
            "innerHeight",
            "scrollX",
            "pageXOffset",
            "scrollY",
            "pageYOffset",
            "visualViewport",
            "screenX",
            "screenY",
            "outerWidth",
            "outerHeight",
            "devicePixelRatio",
            "event",
            "clientInformation",
            "offscreenBuffering",
            "screenLeft",
            "screenTop",
            "styleMedia",
            "onsearch",
            "isSecureContext",
            "trustedTypes",
            "performance",
            "onappinstalled",
            "onbeforeinstallprompt",
            "crypto",
            "indexedDB",
            "sessionStorage",
            "localStorage",
            "onbeforexrselect",
            "onabort",
            "onbeforeinput",
            "onbeforetoggle",
            "onblur",
            "oncancel",
            "oncanplay",
            "oncanplaythrough",
            "onchange",
            "onclick",
            "onclose",
            "oncontextlost",
            "oncontextmenu",
            "oncontextrestored",
            "oncuechange",
            "ondblclick",
            "ondrag",
            "ondragend",
            "ondragenter",
            "ondragleave",
            "ondragover",
            "ondragstart",
            "ondrop",
            "ondurationchange",
            "onemptied",
            "onended",
            "onerror",
            "onfocus",
            "onformdata",
            "oninput",
            "oninvalid",
            "onkeydown",
            "onkeypress",
            "onkeyup",
            "onload",
            "onloadeddata",
            "onloadedmetadata",
            "onloadstart",
            "onmousedown",
            "onmouseenter",
            "onmouseleave",
            "onmousemove",
            "onmouseout",
            "onmouseover",
            "onmouseup",
            "onmousewheel",
            "onpause",
            "onplay",
            "onplaying",
            "onprogress",
            "onratechange",
            "onreset",
            "onresize",
            "onscroll",
            "onsecuritypolicyviolation",
            "onseeked",
            "onseeking",
            "onselect",
            "onslotchange",
            "onstalled",
            "onsubmit",
            "onsuspend",
            "ontimeupdate",
            "ontoggle",
            "onvolumechange",
            "onwaiting",
            "onwebkitanimationend",
            "onwebkitanimationiteration",
            "onwebkitanimationstart",
            "onwebkittransitionend",
            "onwheel",
            "onauxclick",
            "ongotpointercapture",
            "onlostpointercapture",
            "onpointerdown",
            "onpointermove",
            "onpointerrawupdate",
            "onpointerup",
            "onpointercancel",
            "onpointerover",
            "onpointerout",
            "onpointerenter",
            "onpointerleave",
            "onselectstart",
            "onselectionchange",
            "onanimationend",
            "onanimationiteration",
            "onanimationstart",
            "ontransitionrun",
            "ontransitionstart",
            "ontransitionend",
            "ontransitioncancel",
            "onafterprint",
            "onbeforeprint",
            "onbeforeunload",
            "onhashchange",
            "onlanguagechange",
            "onmessage",
            "onmessageerror",
            "onoffline",
            "ononline",
            "onpagehide",
            "onpageshow",
            "onpopstate",
            "onrejectionhandled",
            "onstorage",
            "onunhandledrejection",
            "onunload",
            "crossOriginIsolated",
            "scheduler",
            "alert",
            "atob",
            "blur",
            "btoa",
            "cancelAnimationFrame",
            "cancelIdleCallback",
            "captureEvents",
            "clearInterval",
            "clearTimeout",
            "close",
            "confirm",
            "createImageBitmap",
            "fetch",
            "find",
            "focus",
            "getComputedStyle",
            "getSelection",
            "matchMedia",
            "moveBy",
            "moveTo",
            "open",
            "postMessage",
            "print",
            "prompt",
            "queueMicrotask",
            "releaseEvents",
            "reportError",
            "requestAnimationFrame",
            "requestIdleCallback",
            "resizeBy",
            "resizeTo",
            "scroll",
            "scrollBy",
            "scrollTo",
            "setInterval",
            "setTimeout",
            "stop",
            "structuredClone",
            "webkitCancelAnimationFrame",
            "webkitRequestAnimationFrame",
            "Iterator",
            "chrome",
            "WebAssembly",
            "caches",
            "cookieStore",
            "ondevicemotion",
            "ondeviceorientation",
            "ondeviceorientationabsolute",
            "launchQueue",
            "documentPictureInPicture",
            "onbeforematch",
            "AbsoluteOrientationSensor",
            "Accelerometer",
            "AudioWorklet",
            "BatteryManager",
            "Cache",
            "CacheStorage",
            "Clipboard",
            "ClipboardItem",
            "CookieChangeEvent",
            "CookieStore",
            "CookieStoreManager",
            "Credential",
            "CredentialsContainer",
            "CryptoKey",
            "DeviceMotionEvent",
            "DeviceMotionEventAcceleration",
            "DeviceMotionEventRotationRate",
            "DeviceOrientationEvent",
            "FederatedCredential",
            "GPU",
            "GPUAdapter",
            "GPUAdapterInfo",
            "GPUBindGroup",
            "GPUBindGroupLayout",
            "GPUBuffer",
            "GPUBufferUsage",
            "GPUCanvasContext",
            "GPUColorWrite",
            "GPUCommandBuffer",
            "GPUCommandEncoder",
            "GPUCompilationInfo",
            "GPUCompilationMessage",
            "GPUComputePassEncoder",
            "GPUComputePipeline",
            "GPUDevice",
            "GPUDeviceLostInfo",
            "GPUError",
            "GPUExternalTexture",
            "GPUInternalError",
            "GPUMapMode",
            "GPUOutOfMemoryError",
            "GPUPipelineError",
            "GPUPipelineLayout",
            "GPUQuerySet",
            "GPUQueue",
            "GPURenderBundle",
            "GPURenderBundleEncoder",
            "GPURenderPassEncoder",
            "GPURenderPipeline",
            "GPUSampler",
            "GPUShaderModule",
            "GPUShaderStage",
            "GPUSupportedFeatures",
            "GPUSupportedLimits",
            "GPUTexture",
            "GPUTextureUsage",
            "GPUTextureView",
            "GPUUncapturedErrorEvent",
            "GPUValidationError",
            "GravitySensor",
            "Gyroscope",
            "Keyboard",
            "KeyboardLayoutMap",
            "LinearAccelerationSensor",
            "Lock",
            "LockManager",
            "MIDIAccess",
            "MIDIConnectionEvent",
            "MIDIInput",
            "MIDIInputMap",
            "MIDIMessageEvent",
            "MIDIOutput",
            "MIDIOutputMap",
            "MIDIPort",
            "MediaDeviceInfo",
            "MediaDevices",
            "MediaKeyMessageEvent",
            "MediaKeySession",
            "MediaKeyStatusMap",
            "MediaKeySystemAccess",
            "MediaKeys",
            "NavigationPreloadManager",
            "NavigatorManagedData",
            "OrientationSensor",
            "PasswordCredential",
            "RelativeOrientationSensor",
            "Sanitizer",
            "ScreenDetailed",
            "ScreenDetails",
            "Sensor",
            "SensorErrorEvent",
            "ServiceWorker",
            "ServiceWorkerContainer",
            "ServiceWorkerRegistration",
            "StorageManager",
            "SubtleCrypto",
            "VirtualKeyboard",
            "WGSLLanguageFeatures",
            "WebTransport",
            "WebTransportBidirectionalStream",
            "WebTransportDatagramDuplexStream",
            "WebTransportError",
            "Worklet",
            "XRDOMOverlayState",
            "XRLayer",
            "XRWebGLBinding",
            "AudioData",
            "EncodedAudioChunk",
            "EncodedVideoChunk",
            "ImageTrack",
            "ImageTrackList",
            "VideoColorSpace",
            "VideoFrame",
            "AudioDecoder",
            "AudioEncoder",
            "ImageDecoder",
            "VideoDecoder",
            "VideoEncoder",
            "AuthenticatorAssertionResponse",
            "AuthenticatorAttestationResponse",
            "AuthenticatorResponse",
            "PublicKeyCredential",
            "Bluetooth",
            "BluetoothCharacteristicProperties",
            "BluetoothDevice",
            "BluetoothRemoteGATTCharacteristic",
            "BluetoothRemoteGATTDescriptor",
            "BluetoothRemoteGATTServer",
            "BluetoothRemoteGATTService",
            "CaptureController",
            "DocumentPictureInPicture",
            "EyeDropper",
            "FileSystemDirectoryHandle",
            "FileSystemFileHandle",
            "FileSystemHandle",
            "FileSystemWritableFileStream",
            "FontData",
            "FragmentDirective",
            "HID",
            "HIDConnectionEvent",
            "HIDDevice",
            "HIDInputReportEvent",
            "IdentityCredential",
            "IdentityProvider",
            "IdleDetector",
            "LaunchParams",
            "LaunchQueue",
            "OTPCredential",
            "PaymentAddress",
            "PaymentRequest",
            "PaymentResponse",
            "PaymentMethodChangeEvent",
            "Presentation",
            "PresentationAvailability",
            "PresentationConnection",
            "PresentationConnectionAvailableEvent",
            "PresentationConnectionCloseEvent",
            "PresentationConnectionList",
            "PresentationReceiver",
            "PresentationRequest",
            "Serial",
            "SerialPort",
            "USB",
            "USBAlternateInterface",
            "USBConfiguration",
            "USBConnectionEvent",
            "USBDevice",
            "USBEndpoint",
            "USBInTransferResult",
            "USBInterface",
            "USBIsochronousInTransferPacket",
            "USBIsochronousInTransferResult",
            "USBIsochronousOutTransferPacket",
            "USBIsochronousOutTransferResult",
            "USBOutTransferResult",
            "WakeLock",
            "WakeLockSentinel",
            "WindowControlsOverlay",
            "WindowControlsOverlayGeometryChangeEvent",
            "XRAnchor",
            "XRAnchorSet",
            "XRBoundedReferenceSpace",
            "XRCPUDepthInformation",
            "XRCamera",
            "XRDepthInformation",
            "XRFrame",
            "XRHitTestResult",
            "XRHitTestSource",
            "XRInputSource",
            "XRInputSourceArray",
            "XRInputSourceEvent",
            "XRInputSourcesChangeEvent",
            "XRLightEstimate",
            "XRLightProbe",
            "XRPose",
            "XRRay",
            "XRReferenceSpace",
            "XRReferenceSpaceEvent",
            "XRRenderState",
            "XRRigidTransform",
            "XRSession",
            "XRSessionEvent",
            "XRSpace",
            "XRSystem",
            "XRTransientInputHitTestResult",
            "XRTransientInputHitTestSource",
            "XRView",
            "XRViewerPose",
            "XRViewport",
            "XRWebGLDepthInformation",
            "XRWebGLLayer",
            "getScreenDetails",
            "openDatabase",
            "queryLocalFonts",
            "showDirectoryPicker",
            "showOpenFilePicker",
            "showSaveFilePicker",
            "originAgentCluster",
            "credentialless",
            "speechSynthesis",
            "oncontentvisibilityautostatechange",
            "onscrollend",
            "AnimationPlaybackEvent",
            "AnimationTimeline",
            "CSSAnimation",
            "CSSTransition",
            "DocumentTimeline",
            "BackgroundFetchManager",
            "BackgroundFetchRecord",
            "BackgroundFetchRegistration",
            "BluetoothUUID",
            "BrowserCaptureMediaStreamTrack",
            "CropTarget",
            "CSSScopeRule",
            "CSSStartingStyleRule",
            "ContentVisibilityAutoStateChangeEvent",
            "DelegatedInkTrailPresenter",
            "Ink",
            "DocumentPictureInPictureEvent",
            "Highlight",
            "HighlightRegistry",
            "MediaMetadata",
            "MediaSession",
            "MutationEvent",
            "NavigatorUAData",
            "Notification",
            "PaymentManager",
            "PaymentRequestUpdateEvent",
            "PeriodicSyncManager",
            "PermissionStatus",
            "Permissions",
            "PushManager",
            "PushSubscription",
            "PushSubscriptionOptions",
            "RemotePlayback",
            "ScrollTimeline",
            "ViewTimeline",
            "SharedWorker",
            "SpeechSynthesisErrorEvent",
            "SpeechSynthesisEvent",
            "SpeechSynthesisUtterance",
            "VideoPlaybackQuality",
            "ViewTransition",
            "VisibilityStateEntry",
            "webkitSpeechGrammar",
            "webkitSpeechGrammarList",
            "webkitSpeechRecognition",
            "webkitSpeechRecognitionError",
            "webkitSpeechRecognitionEvent",
            "webkitRequestFileSystem",
            "webkitResolveLocalFileSystemURL",
            "mark",
            "edenAssetsRetryRuntime",
            "WEBPACK_ASYNC_SCRIPT_COMPLETE",
            "EDEN_ASYNC_WEBPACK_SCRIPT_NAMES",
            "MINI_CSS_EXTRACT_ASYNC_LINK_COMPLETE",
            "SDKRuntime",
            "registToGlobal",
            "registToModule",
            "use",
            "useWebSecsdkApi",
            "SDKNativeWebApi",
            "startHydration",
            "__pace_load_deferred_scripts",
            "bootstrapChunkIds",
            "TeaAnalyticsObject",
            "collectEvent",
            "LogPluginObject",
            "isLazyChildren",
            "collectEventInited",
            "_define_property",
            "_object_spread",
            "ownKeys",
            "_object_spread_props",
            "getLogPageName",
            "getUrlQuery",
            "getSessionStorage",
            "parseQueryString",
            "ThemeMode",
            "MultiWindowLogInfoEnum",
            "isInPWA",
            "isInClient",
            "isMobile",
            "isiPad",
            "getObjectType",
            "Slardar",
            "pageLog",
            "w0_0x3771f2",
            "_$webrt_1668687510",
            "byted_acrawler",
            "__ac_referer",
            "e",
            "U6I7dQDnPIbkh",
            "__core-js_shared__",
            "_sdkGlueVersionMap",
            "_SdkGlueInit",
            "xss",
            "filterCSS",
            "filterXSS",
            "getFilterXss",
            "isSafeUrl",
            "isSafeDomain",
            "isSafeProtocol",
            "_xssProject",
            "isoversea",
            "isMainland",
            "EXPOSE_DATA",
            "__pace_route_manifest_path",
            "__pace_f",
            "xssNamespace",
            "__RB_ASYNC_CHUNKS__",
            "webpackChunkdouyin_web",
            "isUseVVC",
            "$RC",
            "__SLARDAR_REGISTRY__",
            "TTGCaptcha",
            "__VC_LOG__REPORT__",
            "_vc_intercepted_pathList",
            "_vc_intercepted_fetch",
            "initialRscFlightDataEnd",
            "bdms",
            "onwheelx",
            "__CMP",
            "cmp",
            "a11yConfigs",
            "JSBridge",
            "Native2JSBridge",
            "ToutiaoJSBridge",
            "regeneratorRuntime",
            "__pace_rsc_cache",
            "__createFromFetch",
            "__pace_call_server",
            "douyinPanel",
            "version",
            "/*#__PACE_BEGIN_RENDER__*/",
            "verifyCenter",
            "getCaptchaWebId",
            "initVerifyOptions",
            "renderCaptcha",
            "autoRender",
            "renderSecondVerifyWeb",
            "SMS",
            "initVerifyCenter",
            "closeCaptcha",
            "verifySDK",
            "globalCtx",
            "hydrateIsland",
            "showAccount",
            "seekOpt",
            "startPlay",
            "playerusingActxs",
            "playerActxs",
            "smart_instance",
            "smart_instance::engine",
            "abTestData",
            "LCPTime",
            "LCPEle",
            "LCPEntry",
            "verifyCenterTea",
            "tce_cluster",
            "isProductionEnv",
            "updateUserInfo",
            "teaSubmitError",
            "roomPlayers",
            "featureCollectorCenter",
            "spec_user_follower_uid_list",
            "SSR_RENDER_DATA",
            "temptime",
            "__mobxInstanceCount",
            "__mobxGlobals",
            "updateFeedByLynxInfo",
            "cacheDebugVids",
            "clearDebugVids",
            "UIFID",
            "fpk1",
            "byte_fid",
            "_signfrommemory_",
            "__INLINE_PLAYER_DATA__",
            "__xgplayer_vod_log__",
            "player",
            "__pace_fetch_route_manifest",
            "__pace_route_manifest",
            "nextPlayer",
            "singleton-plyon:instance",
            "singleton-plyon:strategy_instance",
            "singleton-plyon:engine_instance",
            "markLCP",
            "DTraitUcAesEncrypt",
            "DTraitUcRsaEncrypt",
            "DTraitUcCryptoJSUtil",
            "ZTCollector",
            "ZTcreateBrowserClient",
            "ZTJssign",
            "ZTEC",
            "$SECURE_VERSION",
            "$$UCALL_APIMAP",
            "$$UC_CORE_ENV",
            "$$UC_ENV_PROMISE",
            "ucSecondVerifyReact",
            "ucSecondVerifyReactDom",
            "PassportCollector",
            "PassportBrowserClient",
            "@byted/uc-secure-monitor-base",
            "videoPlayQuality",
            "DTraitSDK",
            "nextBufferConfig",
            "__p_ch",
            "__p_bh",
            "dir",
            "dirxml",
            "profile",
            "profileEnd",
            "clear",
            "table",
            "keys",
            "values",
            "debug",
            "undebug",
            "monitor",
            "unmonitor",
            "inspect",
            "copy",
            "queryObjects",
            "$_",
            "$0",
            "$1",
            "$2",
            "$3",
            "$4",
            "getEventListeners",
            "getAccessibleName",
            "getAccessibleRole",
            "monitorEvents",
            "unmonitorEvents",
            "$",
            "$$",
            "$x"
        ]
    }
    // dtavm._log('Object.getOwnPropertyNames:', obj + '');
    return names;
}
window.func_set_native(Object.getOwnPropertyNames)

// setProxyArr(['globalThis','window','navigator','document','documentElement','all','span','span_classList','screen','chrome','history','sessionStorage','localStorage','bluetooth','storage','body','canvas','webgl','two2d','video','mousemoveX','top','self','parent']);
require_('./douyin_bdms.js');

t = {
    "aid": 6383,
    "pageId": 6241,
    "paths": [
        "^/webcast/",
        "^/aweme/v1/",
        "^/aweme/v2/",
        "/v1/message/send",
        "^/live/",
        "^/captcha/",
        "^/ecom/"
    ],
    "boe": false,
    "ddrt": 8.5,
    "ic": 8.5
}
window.bdms.init(t);

window.mousemoveXEvent(mousemoveX);
mousemoveX['clientX'] = 1135;
mousemoveX['clientY'] = 38;
window.mousemoveXEvent(mousemoveX);
mousemoveX['clientX'] = 1126;
mousemoveX['clientY'] = 69;
window.mousemoveXEvent(mousemoveX);

get_a_bogus = function(url){
    xhr = new XMLHttpRequest;
    xhr.bdmsInvokeList = [
        {"args": ["GET", url, true], func: function(){}},
        { "args": ["Accept", "application/json, text/plain, */*"], func: function () { } },
        {"args": ["uifid", "e35d48d50542e069836dcfd6c1b7719d3f3cf385c1bd9d7d6a168d32a6a94fd1a02e7becb55b756deb8caeb2a02bd97a37df40447755c7893687bef24926c04d4bc3a8556db2727078316d1277a5faff3e60a533cc9e426d5317dc27904540268dbd45ba97f76a5c49e6b897779c88ae"], func: function(){}},
        // {"args": ["bd-ticket-guard-web-version", 2], func: function(){}},
        // {"args": ["bd-ticket-guard-version", 2], func: function(){} },
        // {"args": ["bd-ticket-guard-web-sign-type", 0], func: function(){}}
    ]
    xhr.send(null)
    return window.a_bogus
}
const param1 = process.argv[2];  // "value1"

url_param = "https://live.douyin.com/webcast/lottery/melon/lottery_info/?aid=6383&app_name=douyin_web&live_id=1&device_platform=web&language=zh-CN&enter_from=web_search&cookie_enabled=true&screen_width=1920&screen_height=1080&browser_language=zh-CN&browser_platform=Win32&browser_name=Chrome&browser_version=132.0.0.0&room_id="+param1+"&query_from=1&msToken="
a_b = get_a_bogus(url_param);

//  运行
//  node  .\env_douyin.js  "11111111111"  > vmp_log.txt 2>&1