const express = require('express');
const { execSync } = require('child_process');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// 中间件（可选，仅用于未来扩展）
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

// 允许跨域
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    if (req.method === 'OPTIONS') {
        return res.sendStatus(200);
    }
    next();
});

/**
 * 使用子进程生成 anti_content
 */
function generateAntiContent(serverTime) {
    try {
        const workerPath = path.join(__dirname, 'generate_worker.js');
        const command = `node "${workerPath}" ${serverTime}`;
        
        // 执行子进程并获取输出
        const output = execSync(command, {
            encoding: 'utf-8',
            timeout: 10000, // 10秒超时
            stdio: ['pipe', 'pipe', 'pipe']
        });
        
        // 解析输出（只取最后一行JSON）
        const lines = output.trim().split('\n');
        const lastLine = lines[lines.length - 1];
        const result = JSON.parse(lastLine);
        
        if (result.success) {
            return result.anti_content;
        } else {
            throw new Error(result.error);
        }
        
    } catch (error) {
        throw new Error(`Failed to generate anti_content: ${error.message}`);
    }
}

/**
 * 健康检查接口
 * GET /health
 */
app.get('/health', (req, res) => {
    res.json({
        status: 'ok',
        message: 'PDD Anti-Content Service is running',
        timestamp: new Date().toISOString()
    });
});

/**
 * 生成 anti_content 接口
 * GET /api/anti_content
 */
app.get('/api/anti_content', (req, res) => {
    try {
        // 使用当前时间
        const serverTime = new Date().getTime();
        
        // 生成 anti_content
        const anti_content = generateAntiContent(serverTime);
        
        res.json({
            code: 200,
            message: 'success',
            data: {
                anti_content: anti_content
            },
            timestamp: new Date().toISOString()
        });
        
        console.log(`[${new Date().toISOString()}] Generated anti_content successfully`);
        
    } catch (error) {
        console.error('Error generating anti_content:', error);
        res.status(500).json({
            code: 500,
            message: 'Internal server error',
            error: error.message,
            timestamp: new Date().toISOString()
        });
    }
});

// 404 处理
app.use((req, res) => {
    res.status(404).json({
        code: 404,
        message: 'API endpoint not found',
        path: req.path,
        timestamp: new Date().toISOString()
    });
});

// 启动服务器
app.listen(PORT, () => {
    console.log('='.repeat(50));
    console.log(`🚀 PDD Anti-Content Service Started`);
    console.log(`📡 Server running on: http://localhost:${PORT}`);
    console.log(`🏥 Health check: http://localhost:${PORT}/health`);
    console.log(`🌐 API 接口: http://localhost:${PORT}/api/anti_content`);
    console.log('='.repeat(50));
});

module.exports = app;
