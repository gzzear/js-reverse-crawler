const CryptoJs = require('crypto-js')
XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

const {watch} = require('../../工具/补环境/hook原型链/env_hook')
// 隐藏所有 Node.js 全局变量
if (typeof __dirname != 'undefined') {
    __dirname = undefined
}
if (typeof __filename != 'undefined') {
    __filename = undefined
}
if (typeof require != 'undefined') {
    require = undefined
}
if (typeof exports != 'undefined') {
    exports = undefined
}
if (typeof module != 'undefined') {
    module = undefined
}
if (typeof Buffer != 'undefined') {
    Buffer = undefined
}


/***********************
 * EventTarget
 ***********************/
function EventTarget() {
}

EventTarget.prototype.addEventListener = function (event) {
    console.log("EventTarget::addEventListener::", event)
}

/***********************
 * Window
 ***********************/
function Window() {
}


Object.setPrototypeOf(Window.prototype, EventTarget.prototype);

/***********************
 * window 实例
 ***********************/
window = global;
window.WS = CryptoJs
// window.fecBaseConfig_wsyzwdbq = 'TK1Jni5vKAqmmFhD1QR9Vf2zaiOwcLsg,dG0Xa8bA8F45cP8EaYaw79bydTbWaX8U,N0o25u1QUcjpfBpcuH4Py6WU7O51qF1q,PRiMQsKRZ0OhGIRgWM5wKokZvTKtFaMH,1JfEGKFC5mp6Y6JCJJPPuwjLQY2N9fs0,GRyN1l1w1Eo85LtFs9fu89RT7HruFyfR,CIV6bYn7vE5y3H6Kd6AXC8lEMWRs44Cr,4nHvgEDp9Wlms8Nv52HFSf6q4bdVBBb7,Hhw20f2Du12fidd2bh2QsGitenA0r5Ai,vofyWT9svDNBymrqK2sNNb10NpKdnSRd,'
Object.setPrototypeOf(window, Window.prototype);

/***********************
 * Navigator
 ***********************/
function Navigator() {
}
Object.defineProperties(Navigator.prototype, {
    userAgent: {
        configurable: true,
        enumerable: true,
        get(){
            return 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36'
        }
    }
})
navigator = {};
Object.setPrototypeOf(navigator, Navigator.prototype);
window.navigator = navigator;

/***********************
 * Document / Node
 ***********************/
function Node() {
}

function Document() {
}

Document.prototype.addEventListener = function (event) {
    console.log("Document::addEventListener::", event)
}
Document.prototype.getElementById = function (e) {
    console.log("Document::getElementById::", e)
}
Object.defineProperties(Document.prototype, {
    cookie: {
        get(){
            // return 'lastHomeTab=editor_recommend; sensorsdata2015jssdkcross=%7B%22distinct_id%22%3A%2219bb6107a082440-05128aa3ec9d9a8-1c525631-1296000-19bb6107a092290%22%2C%22first_id%22%3A%22%22%2C%22props%22%3A%7B%22%24latest_traffic_source_type%22%3A%22%E7%9B%B4%E6%8E%A5%E6%B5%81%E9%87%8F%22%2C%22%24latest_search_keyword%22%3A%22%E6%9C%AA%E5%8F%96%E5%88%B0%E5%80%BC_%E7%9B%B4%E6%8E%A5%E6%89%93%E5%BC%80%22%2C%22%24latest_referrer%22%3A%22%22%7D%2C%22%24device_id%22%3A%2219bb6107a082440-05128aa3ec9d9a8-1c525631-1296000-19bb6107a092290%22%7D; Device_ID=21f5da82-c332-44b8-8c80-936d4d270bf3; FECWS=3e4dbbe1f2632dc0cbad3e05bf0863d44cde6934d68447caa4601f85612547f96d466e223c0ec7658c10e67ab631d4aa1e650fb08b2de5880397ca05b596524adb13315a11fddd73ef886b7f2e6007e21e; PHPSESSID=vos37e33na97i5esrhqs0inm4u; Authorization=C7E5A075D1A6DB42AD1A6D4D09D1A6D93B0D1A6D034D542B75B2; FECAS=4de14y7QD1/6hUFmkr7RbKXhg6n9NruvVHMd705qDstYThR7ZF6NVkgy/M6waY5+4CByZ7lru3Gv/PxBwjNnonIGSg1nZcqFLle6DxgOzpZ/Yts/nHKzyr+fq40vfd098SLeXYEXdeKS9Kz2tKrnoAcT53O4s+uelTgFuCBYS6e86PGo5o24MMGfxpa1kDeIRb'
            return '';
        },
        set(ck){
            this._cookie = ck
        }
    }
})
Object.setPrototypeOf(Document.prototype, Node.prototype);

document = {};

function mockForm(className) {
    return {
        tagName: "FORM",
        className: className,
        getAttribute(name) {
            if (name === "class") return this.className;
            return null;
        },
        elements: [],
        submit() {
        }
    };
}

Object.defineProperties(document, {
    forms: {
        get() {
            return {
                0: mockForm("flex justify-start items-center pl-8 pr-2.5 py-1.5 transition-colors"),
                1: mockForm("w-full h-full flex items-center bg-gray-100 rounded px-3 py-2.5 space-x-2"),
                2: mockForm("flex items-center w-[514px] h-12 group"),
                length: 3,
                item(index) {
                    return this[index] || null;
                }
            };
        }
    }
})
Object.setPrototypeOf(document, Document.prototype);
window.document = document;

/***********************
 * Location（空壳）
 ***********************/
function Location() {
}

location = {};
Object.setPrototypeOf(location, Location.prototype);
window.location = location;

/***********************
 * Screen
 ***********************/
function Screen() {
}

screen = {};
Object.setPrototypeOf(screen, Screen.prototype);
window.screen = screen;

/***********************
 * History
 ***********************/
function History() {
}

history = {};
Object.setPrototypeOf(history, History.prototype);
window.history = history;

function HTMLFormElement() {
}

HTMLFormElement.prototype.submit = function () {

};
HTMLFormElement.prototype.reset = function () {
};

HTMLFormElement.prototype.constructor = HTMLFormElement;

Object.defineProperty(window, "HTMLFormElement", {
    value: HTMLFormElement,
    writable: true,
    configurable: true
});

function Image() {
    this.onload = null;
    this.onerror = null;
    this.width = 0;
    this.height = 0;
}

Object.defineProperty(Image.prototype, "src", {
    set(v) {
        this._src = v;
        // 模拟加载完成
        if (typeof this.onload === "function") {
            this.onload();
        }
    },
    get() {
        return this._src;
    }
});

window.Image = Image;


/***********************
 * hook
 ***********************/
window = watch(window, "window");
document = watch(document, "document");
navigator = watch(navigator, "navigator");
location = watch(location, "location");
screen = watch(screen, "screen");
history = watch(history, "history");
XMLHttpRequest = watch(XMLHttpRequest, "XMLHttpRequest")
HTMLFormElement = watch(HTMLFormElement, "HTMLFormElement")