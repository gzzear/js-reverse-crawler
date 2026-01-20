/**
 * Worker 进程：生成 anti_content
 * 接收命令行参数并输出结果
 */

// 加载环境和算法
require('./anti_content_env');
require('./react_anti_co');

// 获取命令行参数
const serverTime = process.argv[2] ? parseInt(process.argv[2]) : new Date().getTime();

try {
    // 从 webpack 模块缓存中获取 AntiContent 构造函数
    const AntiContent = window.loader.c[4].exports;
    
    // 准备参数
    const params = {
        serverTime: serverTime
    };
    
    // 实例化并生成 anti_content
    const instance = new AntiContent(params);
    const anti_content = instance.messagePack();
    
    // 输出结果（只输出结果，方便父进程读取）
    console.log(JSON.stringify({
        success: true,
        anti_content: anti_content,
        serverTime: serverTime
    }));
    
} catch (error) {
    console.log(JSON.stringify({
        success: false,
        error: error.message
    }));
    process.exit(1);
}
