/**
 * 🎨 日志格式化配置
 */
const LOG_CONFIG = {
    colors: {
        reset: "\x1b[0m",
        dim: "\x1b[2m",
        red: "\x1b[31m",
        green: "\x1b[32m",
        yellow: "\x1b[33m",
        blue: "\x1b[34m",
        magenta: "\x1b[35m",
        cyan: "\x1b[36m",
    },
    maxValueLen: 50,
    colWidth: {
        type: 12,
        obj: 20,
        prop: 30
    }
};

/**
 * 日志格式化
 */
function formatValue(value) {
    const { colors } = LOG_CONFIG;
    if (value === undefined) return `${colors.red}undefined${colors.reset}`;
    if (value === null) return `${colors.red}null${colors.reset}`;
    if (typeof value === 'function') {
        return `${colors.cyan}[Function: ${value.name || 'anonymous'}]${colors.reset}`;
    }
    let str = String(value);
    if (str.length > LOG_CONFIG.maxValueLen) str = str.substring(0, LOG_CONFIG.maxValueLen) + '...';
    if (typeof value === 'string') return `"${str}"`;
    return str;
}

/**
 * hook脚本
 */
function watch(obj, name, visited = new WeakSet()) {
    const { colors, colWidth } = LOG_CONFIG;

    if (obj === null || typeof obj !== 'object' || visited.has(obj)) {
        return obj;
    }
    visited.add(obj);

    // ⬇️ 核心打印函数
    const log = (color, type, prop, extra = "") => {
        const typeStr = `${color}${type}${colors.reset}`.padEnd(colWidth.type + 10, ' ');
        const objStr = `对象: ${name}`.padEnd(colWidth.obj, ' ');
        const propStr = `属性: ${String(prop)}`.padEnd(colWidth.prop, ' ');
        console.log(`${typeStr}${objStr}${propStr} ${colors.dim}|${colors.reset} ${extra}`);
    };

    // 检查原型链访问
    const checkPrototypeChain = (target, property) => {
        let current = target;
        while (current) {
            // 如果属性直接在当前层找到，说明不是原型链查找（至少不是向上查找）
            if (Object.prototype.hasOwnProperty.call(current, property)) {
                return false;
            }
            // 向上爬一层
            current = Object.getPrototypeOf(current);

            // 如果爬到了非 Object.prototype 的原型，说明触发了原型链检测
            if (current && current !== Object.prototype && current !== null) {
                // 🌟 修改：去掉了具体的来源打印，只提示发现了原型链属性
                console.log(`${colors.red}[PROTO_CHK]`.padEnd(colWidth.type, ' ') + `🚨 发现原型链属性! (对象: ${name}, 属性: ${String(property)})${colors.reset}`);
                return true;
            }
        }
        return false;
    };

    return new Proxy(obj, {
        get: function (target, property, receiver) {
            try {
                if (typeof property === 'symbol' || property === 'constructor' || property === '__proto__') {
                    return Reflect.get(target, property, receiver);
                }

                const value = Reflect.get(target, property, receiver);

                if (typeof value === 'object' && value !== null) {
                    const nestedName = `${name}.${String(property)}`;
                    return watch(value, nestedName, visited);
                }

                // [GET]
                log(colors.green, "[GET]", property, `属性值: ${formatValue(value)} | 类型: ${typeof value}`);

                if (!Object.prototype.hasOwnProperty.call(target, property)) {
                    checkPrototypeChain(target, property);
                }

                const descriptor = Object.getOwnPropertyDescriptor(target, property);
                if (descriptor) {
                    if (descriptor.get || descriptor.set) {
                        console.log(`${colors.magenta}[HOOK_CHK]`.padEnd(colWidth.type, ' ') + `⚠️  特殊检测 Getter/Setter (对象: ${name}, 属性: ${String(property)})${colors.reset}`);
                    }
                    if (!descriptor.writable && !descriptor.get) {
                        console.log(`${colors.magenta}[HOOK_CHK]`.padEnd(colWidth.type, ' ') + `🔒 特殊检测 只读属性 (对象: ${name}, 属性: ${String(property)})${colors.reset}`);
                    }
                    if (!descriptor.configurable) {
                        console.log(`${colors.magenta}[HOOK_CHK]`.padEnd(colWidth.type, ' ') + `🔒 特殊检测 不可配置 (对象: ${name}, 属性: ${String(property)})${colors.reset}`);
                    }
                }
            } catch (e) {
                console.error(`${colors.red}[ERROR]`.padEnd(colWidth.type, ' ') + `Error in get trap:`, e);
            }
            return Reflect.get(target, property, receiver);
        },
        set: (target, property, newValue, receiver) => {
            try {
                // [SET]
                log(colors.yellow, "[SET]", property, `新值: ${formatValue(newValue)} | 类型: ${typeof newValue}`);
            } catch (e) {
                console.error(`${colors.red}[ERROR]`.padEnd(colWidth.type, ' ') + `Error in set trap:`, e);
            }
            return Reflect.set(target, property, newValue, receiver);
        },
        has: function (target, property) {
            log(colors.blue, "[HAS]", property, "检查是否存在 (in 操作符)");
            return Reflect.has(target, property);
        },
        deleteProperty: function (target, property) {
            console.log(`${colors.red}[DEL]`.padEnd(colWidth.type, ' ') + `❌ 删除操作 (对象: ${name}, 属性: ${String(property)})${colors.reset}`);
            return Reflect.deleteProperty(target, property);
        },
        ownKeys: function (target) {
            console.log(`${colors.dim}[KEYS]`.padEnd(colWidth.type, ' ') + `🗝️  获取所有键 (对象: ${name})${colors.reset}`);
            return Reflect.ownKeys(target);
        },
        defineProperty: function (target, property, descriptor) {
            console.log(`${colors.magenta}[DEF]`.padEnd(colWidth.type, ' ') + `🛠️  定义属性 (对象: ${name}, 属性: ${String(property)})${colors.reset}`);
            return Reflect.defineProperty(target, property, descriptor);
        },
        setPrototypeOf: function (target, prototype) {
            console.log(`${colors.red}[PROTO_SET]`.padEnd(colWidth.type, ' ') + `🚨 修改原型 (对象: ${name})${colors.reset}`);
            return Reflect.setPrototypeOf(target, prototype);
        },
        getPrototypeOf: function (target) {
            console.log(`${colors.blue}[PROTO_GET]`.padEnd(colWidth.type, ' ') + `🧬 获取原型 (对象: ${name})${colors.reset}`);
            return Reflect.getPrototypeOf(target);
        },
        getOwnPropertyDescriptor: function (target, property) {
            console.log(`${colors.magenta}[DESC]`.padEnd(colWidth.type, ' ') + `📜 获取描述符 (对象: ${name}, 属性: ${String(property)})${colors.reset}`);
            return Reflect.getOwnPropertyDescriptor(target, property);
        },
        toString: function (target) {
            console.log(`${colors.magenta}[TO_STRING]`.padEnd(colWidth.type, ' ') + `⚠️  调用toString (对象: ${name})${colors.reset}`);
            return Reflect.toString(target);
        }
    });
}



delete __dirname
delete __filename
// window
window = global;
delete window.navigator
const Window = {}
const WindowProperties = {}
const EventTarget = {}

Object.setPrototypeOf(window, Window);
Object.setPrototypeOf(Window, WindowProperties);
Object.setPrototypeOf(WindowProperties, EventTarget);

// navigator
navigator = {}
const Navigator = {}

Object.setPrototypeOf(navigator, Navigator);

// document
document = {}
const HTMLDocumentProto = {};
const DocumentProto = {};
const Node = {}

Object.setPrototypeOf(document, HTMLDocumentProto);
Object.setPrototypeOf(HTMLDocumentProto, DocumentProto);
Object.setPrototypeOf(DocumentProto, Node);
Object.setPrototypeOf(Node, EventTarget);

// location
location = {}
const Location = {}
Object.setPrototypeOf(location, Location);

// screen
screen = {}

window = watch(window, "window")
document = watch(document, "document")
navigator = watch(navigator, "navigator")
location = watch(location, "location")
screen = watch(screen, "screen")





// ==========================================
// ↓↓↓↓ 请将以下测试代码粘贴到文件末尾 ↓↓↓↓
// ==========================================

console.log("\n---------- 开始测试环境监控 ----------\n");

// 1. 测试基础属性的 GET 和 SET
console.log(">>> [1] 测试普通读写：");
window.name = "MyFakeWindow"; // 触发 SET
console.log("读取 window.name:", window.name); // 触发 GET

// 2. 测试多级对象（深度监听）
console.log("\n>>> [2] 测试嵌套对象访问：");
location.href = "https://www.google.com/search?q=test";
// 这里应该会递归触发 watch，输出 location.href 的访问日志
console.log("读取 location.href:", location.href);

// 3. 测试原型链检测 (关键测试)
// 说明：很多反爬会检查属性是在实例上还是原型上。
// 我们先在 Navigator 原型上挂个属性，看你的脚本能不能识别出"属性来自原型"
console.log("\n>>> [3] 测试原型链检测逻辑：");
// 模拟：给 Navigator 原型添加 userAgent (正常浏览器 userAgent 是在原型上的)
Navigator.userAgent = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)";
// 访问实例，你的 checkPrototypeChain 应该会触发并打印 "True (属性...发现于原型...)"
console.log("访问 navigator.userAgent:", navigator.userAgent);

// 4. 测试 'in' 操作符检测
console.log("\n>>> [4] 测试 'in' 操作符：");
// 很多检测脚本会用 'webdriver' in navigator 来判断是否是自动化工具
if ('webdriver' in navigator) {
    console.log("检测到 webdriver 属性检查");
}

// 5. 测试特殊属性描述符 (Descriptor)
console.log("\n>>> [5] 测试属性描述符检测：");
// 模拟获取 navigator 的属性描述符
try {
    let desc = Object.getOwnPropertyDescriptor(navigator, 'userAgent');
} catch(e) {}

// 6. 测试 toString 检测
console.log("\n>>> [6] 测试 toString 保护检测：");
// 很多网站会检测 window.toString() 来看是不是被篡改过
window.toString();

// 7. 模拟一次常见的指纹收集流程
console.log("\n>>> [7] 模拟常见指纹读取：");
const tempCheck = {
    width: screen.width,
    height: screen.height,
    docTitle: document.title,
    navPlatform: navigator.platform
};


console.log("\n---------- 测试结束 ----------");