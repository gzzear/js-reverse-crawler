// const {watch} = require('../../../../工具/补环境/hook原型链/env_hook');

if (typeof __dirname != 'undefined'){ __dirname = undefined }
if (typeof __filename != 'undefined'){ __filename = undefined }
if (typeof require != 'undefined'){ require = undefined }
if (typeof exports != 'undefined'){ exports = undefined }
if (typeof module != 'undefined'){ module = undefined }
if (typeof Buffer != 'undefined'){ Buffer = undefined }

/***********************
 * EventTarget
 ***********************/
function EventTarget() {
}

/***********************
 * Window
 ***********************/
function Window() {
}

Object.defineProperties(Window.prototype, {
    outerWidth: {
        configurable: true,
        enumerable: true,
        get() {
            return 1440;
        }
    },
    outerHeight: {
        configurable: true,
        enumerable: true,
        get() {
            return 900;
        }
    }
});

Object.setPrototypeOf(Window.prototype, EventTarget.prototype);

/***********************
 * window 实例
 ***********************/
window = global;
window.DeviceOrientationEvent = {}
window.DeviceMotionEvent = function () {
}
window.chrome = {};
// 常用方法 stub
window.chrome.csi = function () {
    return {};
};
window.chrome.loadTimes = function () {
    return {};
};
// chrome.app 对象
window.chrome.app = {
    InstallState: {
        DISABLED: 'disabled',
        INSTALLED: 'installed',
        NOT_INSTALLED: 'not_installed'
    },
    RunningState: {
        CANNOT_RUN: 'cannot_run',
        READY_TO_RUN: 'ready_to_run',
        RUNNING: 'running'
    },
    getDetails: function () {
        return null;
    },
    getIsInstalled: function () {
        return false;
    },
    installState: function () {
        return 'not_installed';
    },
    runningState: function () {
        return 'cannot_run';
    },
    isInstalled: false
};

Object.setPrototypeOf(window, Window.prototype);

/***********************
 * Navigator
 ***********************/
function Navigator() {
}

Object.defineProperties(Navigator.prototype, {
    webdriver: {
        configurable: true,
        enumerable: true,
        get() {
            return false;
        }
    },
    languages: {
        configurable: true,
        get() {
            return ["zh-CN", "zh"];
        }
    },
    userAgent: {
        configurable: true,
        enumerable: true,
        get() {
            return "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36"
        }
    }
});

navigator = {};
Object.setPrototypeOf(navigator, Navigator.prototype);

const plugins = {}

function PluginArray() {
}

Object.defineProperties(PluginArray.prototype, {
    length: {
        configurable: true,
        enumerable: true,
        get() {
            return 5
        }
    }
})
Object.setPrototypeOf(plugins, PluginArray.prototype)
navigator.plugins = plugins
window.navigator = navigator;


/***********************
 * Document / Node
 ***********************/
function Element() {
}

Object.setPrototypeOf(Element.prototype, Node.prototype)
window.Element = Element;

function HTMLElement() {
}

Object.setPrototypeOf(HTMLElement.prototype, Element.prototype)
window.HTMLElement = HTMLElement

function Node() {
}

function Document() {
}

Document.prototype.getElementById = function (e) {
    console.log("Document::getElementById::", e)
}
Document.prototype.createElement = function (tagName) {
    console.log("Document::createElement::", tagName)
}
Document.prototype.addEventListener = function (event) {
    console.log("Document::addEventListener::", event)
}
Object.defineProperties(Document.prototype, {
    cookie: {
        configurable: true,
        enumerable: true,
        get() {
            return 'api_uid=CiwDtWlhAcGjGACfDAZhAg==; _nano_fp=XpmjnqUjnpgxX5dYn9_e5QkzUpO98vBzCxkajXMf; webp=1; njrpl=4Fg0HwS77fUcql42jwpIfXpA9L4B5fDp; dilx=zO9eKs9Iw~cJOljFJIr3F; chat_config=%7B%22host_whitelist%22%3A%5B%22.yangkeduo.com%22%2C%22.pinduoduo.com%22%2C%22.10010.com%2Fqueen%2Ftencent%2Fpinduoduo-fill.html%22%2C%22.ha.10086.cn%2Fpay%2Fcard-sale!toforward.action%22%2C%22wap.ha.10086.cn%22%2C%22m.10010.com%22%5D%7D; pdd_user_id=7638744964305; pdd_user_uin=LV3EGMI4DW25A5FXQW5UDQARXI_GEXDA; rec_list_personal=rec_list_personal_44y360; pdd_vds=gaLLNyytPNamGbEitLEtbmEtOtoImLGoGbOtnoNmbmiQmLPPtNtaiiLGtLti'
        },
        set(cookie) {
            _cookie = cookie
        }
    },
    referrer: {
        configurable: true,
        enumerable: true,
        get() {
            return 'https://mobile.yangkeduo.com/?page_id=10002_1768197284768_szih3e7hi3&bsch_is_search_mall=&bsch_show_active_page=&item_index=8&count=8&sp=2630&mlist_id=iwzp3bglac&last_goods_id=849018019652&is_back=1&list_id=h5lz1pzko9'
        }
    },
    body: {
        configurable: true,
        enumerable: true,
        get(){
            return  ""
        },
        set(body){
            _body = body
        }
    },
    visibilityState: {
        configurable: true,
        enumerable: true,
        get(){
            return 'hidden'
        }
    }
})

Object.setPrototypeOf(Document.prototype, Node.prototype);

document = {};
Object.setPrototypeOf(document, Document.prototype);

documentElement = {
    scrollTop: 0
};
Object.setPrototypeOf(documentElement, HTMLElement.prototype);
document.documentElement = documentElement;

window.document = document;

/***********************
 * Location
 ***********************/
function Location() {
}

Object.defineProperties(Location.prototype, {
    href: {
        configurable: true,
        enumerable: true,
        get() {
            return 'https://mobile.yangkeduo.com/goods.html?goods_id=849018019652&_oak_rcto=YWJ0rTuVfmAur6UjnYHX6K5tlLbv0AgMUlwXNUVOAvSogWPNB079CmIH&_oc_trace_mark=199&_oc_adinfo=eyJwYWdlX3NuIjoxMDAwMiwic2NlbmVfaWQiOjUwNn0%3D&_oak_gallery_token=d06fd0ebe514dbb8be7d2d4f60726510&_oak_gallery=https%3A%2F%2Fimg.pddpic.com%2Fmms-goods-image%2F2025-11-04%2Fccf45cb0-8d25-4ce6-a0bf-c67b22e0ffe3.jpeg.a.jpeg&_oc_refer_ad=1&page_from=35&thumb_url=https%3A%2F%2Fimg.pddpic.com%2Fmms-goods-image%2F2025-11-04%2Fccf45cb0-8d25-4ce6-a0bf-c67b22e0ffe3.jpeg.a.jpeg%3FimageMogr2%2Fthumbnail%2F400x%257CimageView2%2F2%2Fw%2F400%2Fq%2F80%2Fformat%2Fwebp&refer_page_name=index&refer_page_id=10002_1768197284768_szih3e7hi3&refer_page_sn=10002&uin=UTGMSTLMXPPZEU552QTMVCLG5Q_GEXDA'
        }
    },
    port: {
        configurable: true,
        enumerable: true,
        get() {
            return ''
        }
    }
})

location = {};
Object.setPrototypeOf(location, Location.prototype);
window.location = location;

/***********************
 * Screen
 ***********************/
function Screen() {
}

Object.defineProperties(Screen.prototype, {
    availWidth: {
        configurable: true,
        get() {
            return 1440;
        }
    },
    availHeight: {
        configurable: true,
        get() {
            return 900;
        }
    }
});

screen = {};
Object.setPrototypeOf(screen, Screen.prototype);
window.screen = screen;

/***********************
 * History
 ***********************/
function History() {
}

History.prototype.back = function () {
    console.log("History::back")
}

history = {};
Object.setPrototypeOf(history, History.prototype);
window.history = history;

/***********************
 * LocalStorage
 ***********************/
function Storage() {

}

Storage.prototype.getItem = function (key) {
    console.log("Storage::getItem::", key)
}
Storage.prototype.setItem = function (key, value) {
    console.log("Storage::setItem::", key, value)
}
localStorage = {};
Object.setPrototypeOf(localStorage, Storage.prototype)
window.localStorage = localStorage

/***********************
 * 最后再 hook（顺序很重要）
 ***********************/
// window = watch(window, "window");
// document = watch(document, "document");
// navigator = watch(navigator, "navigator");
// location = watch(location, "location");
// screen = watch(screen, "screen");
// history = watch(history, "history");
// localStorage = watch(localStorage, "localStorage")
// documentElement = watch(documentElement, "documentElement")