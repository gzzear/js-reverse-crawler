# WASM

### 一. 简介

​     WebAssembly（简称Wasm）是一种现代的低级编程语言，设计用于在网页上运行高性能的代码。它可以被看作是一个编译目标，开发者可以将C、C++、Rust等语言编写的代码编译成WebAssembly格式，然后在浏览器中运行。

WebAssembly的主要特点包括：

1. **高性能**：接近原生性能，能够比JavaScript更快地执行计算密集型任务。
2. **安全性**：在沙箱环境中运行，保证了代码的安全性。
3. **跨平台**：可以在各种浏览器和操作系统上运行，支持多种硬件架构。
4. **与JavaScript互操作**：可以与JavaScript无缝协作，调用JavaScript函数，或者从JavaScript调用Wasm模块。

它广泛应用于游戏、图像处理、科学计算等领域，尤其是需要高性能的Web应用。



#### 1. 浏览器执行wasm原理

1. **浏览器支持**：现代浏览器（如Chrome、Firefox、Safari等）都原生支持Wasm，能够解析和执行Wasm二进制格式。
2. **安全沙箱**：Wasm在一个安全的沙箱环境中运行，确保了代码的安全性，避免了对主机系统的直接访问。
3. **高效编译**：Wasm代码在加载时可以快速编译为机器代码，确保高性能执行。
4. **与JavaScript互操作**：Wasm能够与JavaScript进行交互，可以通过JavaScript调用Wasm模块中的函数，增强了Web应用的功能。

**wasm语法:** https://www.zhihu.com/column/c_1603119162976595968





### 二. wasm调用方法

#### 1. 网页加载过程

##### 1.创建Wasm模块

- 用C/C++、Rust等语言编写代码，并编译成Wasm文件。

##### 2.加载Wasm模块

- 使用JavaScript的`fetch` API获取Wasm文件，并用`WebAssembly.instantiate`或`WebAssembly.instantiateStreaming`进行加载。

##### 3.调用Wasm导出函数

- 通过实例化的Wasm模块，可以调用导出的函数并与JavaScript进行交互。



#### 2.fetch模块 

- `fetch` 模块用于在浏览器中进行网络请求，主要作用是获取资源，如文本、JSON、图片或Wasm模块。它返回一个 `Promise`，方便处理异步操作。 
- 简洁版的ajax

##### 1.语法与使用 

**fetch**：

- 基于 `Promise`，语法更简洁，使用链式调用处理响应。
- 示例：

```js
fetch('https://api.example.com/data')
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error));

```

**AJAX (XMLHttpRequest)**：

- 使用回调函数，代码通常更复杂，特别是处理异步操作时。
- 示例：

```js
var xhr = new XMLHttpRequest();
xhr.open('GET', 'https://api.example.com/data', true);
xhr.onload = function () {
  if (xhr.status >= 200 && xhr.status < 300) {
    console.log(JSON.parse(xhr.responseText));
  } else {
    console.error('Error:', xhr.statusText);
  }
};
xhr.onerror = function () {
  console.error('Network Error');
};
xhr.send();

```

##### 2. 支持的功能

- **fetch**：
  - 默认不发送 cookies，需要额外配置。
  - 支持更丰富的请求和响应处理（如流、读取响应体的多种格式）。
- **AJAX**：
  - 自动处理 cookies，适合需要认证的请求。
  - 支持较老的浏览器。

##### 3. 错误处理

- **fetch**：
  - 只会在网络错误时拒绝 `Promise`，HTTP错误状态（如404、500）不会导致拒绝。
  - 需要手动检查响应的 `ok` 属性。
- **AJAX**：
  - 通过状态码判断成功与否，可以在 `onload` 回调中处理。

##### 4. 更现代的 API

- **fetch** 是现代浏览器中推荐使用的方式，具有更好的灵活性和功能性。







#### 3. WebAssembly模块

​          `WebAssembly.instantiate` 是一个用于加载和实例化 WebAssembly 模块的函数。它可以接受一个字节数组（Wasm 二进制数据）和可选的导入对象。 

```js
WebAssembly.instantiate(bytes, importObject)
```

##### 1. `bytes` 和 `importObject`  

###### 1. `bytes`

- **类型**：`ArrayBuffer` 或 `TypedArray`，通常由 `fetch` 请求得到的二进制数据。
- **作用**：包含了编译好的 WebAssembly 模块的二进制表示。Wasm 模块必须先编译成这种格式，才能被实例化。

###### 2. `importObject`

- **类型**：对象，用于提供模块所需的外部依赖。
- **作用**：包含了 WabAssembly 模块需要调用的外部函数或全局变量。这个对象的结构通常与模块中定义的导入相对应。例如，如果模块需要一个外部函数，你需要在这个对象中定义它(类似于创建类的初始化参数)。

```js
const importObject = {
    env: {
        importedFunc: function() {
            console.log('Hello from JavaScript!');
        }
    }
};

// 假设 bytes 是从网络请求中获取的 ArrayBuffer
WebAssembly.instantiate(bytes, importObject)
    .then(results => {
        const instance = results.instance;
        instance.exports.yourFunction();
    });

```

##### 2. WebAssembly返回值

  `WebAssembly.instantiate` 的返回值是一个 `Promise`，该 `Promise` 解析为一个对象，包含以下属性： 

###### 1. `instance`

- **类型**：`WebAssembly.Instance` 对象。
- **作用**：表示实例化后的 WebAssembly 模块，包含模块的导出（即可以被调用的函数和变量）。

###### 2. `module`

- **类型**：`WebAssembly.Module` 对象。
- **作用**：表示编译后的 WebAssembly 模块，可以用于进一步的实例化。

```js
fetch('module.wasm')
    .then(response => response.arrayBuffer())
    .then(bytes => WebAssembly.instantiate(bytes))
    .then(results => {
        const instance = results.instance;
        console.log('Exports:', instance.exports); // 访问导出函数
    })
    .catch(err => {
        console.error('Error:', err);
    });

```

#### 4. node调用

- node有提供WebAssembly库可以直接使用

```js
const fs = require('fs');
const wasmCode = fs.readFileSync('Wasm.wasm');
console.log(wasmCode)
WebAssembly.instantiate(wasmCode, {
    "env": {},
    "wasi_snapshot_preview1": {}
}).then(result => {
    const instance = result.instance;
    const exportedFunc = instance.exports
    console.log(exportedFunc); // 调用 wasm 模块中的函数
    console.log(exportedFunc.encrypt(50, 1727186733)); // 调用 wasm 模块中的函数
})

```



#### 5.py调用

- py需要使用pywasm库进行调用

```python
import pywasm
import time

t = int(time.time())
vm = pywasm.load("./Wasm.wasm", {
    "env": {},
    "wasi_snapshot_preview1": {}
})
print(vm)
sign = vm.exec("encrypt", [40, t])
print(sign)
```





#### 6.补环境脚本

```js
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

```



> 使用方法

```js
global = WASMProxy(global,'global')
// 加载wasm之前代理
go.run(result.instance)
```



 如果代理window就

```js
window = WASMProxy(window,'window')
```















































