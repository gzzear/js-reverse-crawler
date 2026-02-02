require('./anti_content_env');
require('./react_anti_co');

const serverTime = process.argv[2] ? parseInt(process.argv[2]) : new Date().getTime();

try {
    const AntiContent = window.loader.c[4].exports;
    const params = { serverTime: serverTime };
    const instance = new AntiContent(params);
    const anti_content = instance.messagePack();
    
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
