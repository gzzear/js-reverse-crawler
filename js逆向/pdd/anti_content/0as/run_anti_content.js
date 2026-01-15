require('./anti_content_env');

// require('../0aq/anti_content_env');
// 加载 webpack 打包的代码（会自执行）
require('./react_anti_co');

// 从 webpack 模块缓存中获取 exports（exports 本身就是构造函数）
const AntiContent = window.loader.c[4].exports;

const r = {
    serverTime: new Date().getTime()
};

// 实例化并生成 anti_content
const instance = new AntiContent(r);
const anti_content = instance.messagePack();

console.log('anti_content:', anti_content);

