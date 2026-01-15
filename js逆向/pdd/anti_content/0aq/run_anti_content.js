// main.js

// 1. 先引入环境补全 (必须在最前面，确保 global.window 等对象已建立)
require('./anti_content_env');




// ==========================================
// 3. 主执行逻辑 (包裹在 async 函数中)
// ==========================================
(async () => {
    try {
        console.log("正在执行加密脚本...");
        require('./anti_content');
        let t = {
            "serverTime": new Date().getTime()
        }
        let Be = global.jzq(4)(t)
        let ant_content = await Be.messagePackSync()
        console.log(ant_content)
        console.log(ant_content.length)
    } catch (e) {
        console.error("执行出错:", e);
    }
})();