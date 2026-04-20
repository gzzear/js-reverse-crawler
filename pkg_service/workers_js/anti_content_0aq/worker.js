#!/usr/bin/env node
/* Long-lived worker for PDD anti_content v0aq.
 *
 * Protocol:
 *   stdin  : one JSON request per line { id, payload: { serverTime? } }
 *   stdout : one JSON response per line { id, ok, result|error }
 *   stderr : logs; prints a single READY line when ready.
 */
'use strict';

const path = require('path');
const readline = require('readline');

// 把算法脚本里的 console.* 打到 stderr，保持 stdout 只走 NDJSON 协议
const origLog = console.log;
console.log = (...a) => process.stderr.write('[js] ' + a.join(' ') + '\n');
console.info = console.log;
console.warn = console.log;
console.debug = console.log;

const HERE = __dirname;
require(path.join(HERE, 'anti_content_env'));
require(path.join(HERE, 'anti_content'));

// 恢复 console.log（也保持指向 stderr，防止算法后续再打扰 stdout）
// —— 不恢复。stderr 是唯一正确的日志通道。

function _platformFromUA(ua) {
  if (/Windows/i.test(ua)) return 'Win32';
  if (/Macintosh|Mac OS X/i.test(ua)) return 'MacIntel';
  if (/Linux/i.test(ua)) return 'Linux x86_64';
  if (/iPhone|iPad/i.test(ua)) return 'iPhone';
  if (/Android/i.test(ua)) return 'Linux armv8l';
  return 'MacIntel';
}

function _applyNavigatorOverride(ua, platform, appVersion) {
  // Navigator.prototype 里 configurable: true，每次请求前可重新定义 getter。
  // 同一 worker 串行处理，无并发污染。
  const proto = Navigator.prototype;
  Object.defineProperty(proto, 'userAgent', {
    get() { return ua; }, set() { return true; }, configurable: true, enumerable: true,
  });
  Object.defineProperty(proto, 'appVersion', {
    get() { return appVersion; }, set() { return true; }, configurable: true, enumerable: true,
  });
  Object.defineProperty(proto, 'platform', {
    get() { return platform; }, set() { return true; }, configurable: true, enumerable: true,
  });
}

async function generate(payload) {
  const serverTime = Number(payload && payload.serverTime) || Date.now();
  // UA / navigator 指纹会被编码进 anti-content，必须和最终请求头里的 UA 对齐。
  // 未传则保持 env.js 里内置的 Mac Chrome 默认。
  if (payload && payload.userAgent) {
    const ua = String(payload.userAgent);
    const platform = String(payload.platform || _platformFromUA(ua));
    const appVersion = String(payload.appVersion || ua.replace(/^Mozilla\//, ''));
    _applyNavigatorOverride(ua, platform, appVersion);
  }
  const enc = global.jzq(4)({ serverTime });
  const token = await enc.messagePackSync();
  return { anti_content: token, server_time: serverTime };
}

process.stderr.write('READY\n');

const rl = readline.createInterface({ input: process.stdin });
rl.on('line', async (line) => {
  line = line.trim();
  if (!line) return;
  let req;
  try {
    req = JSON.parse(line);
  } catch (e) {
    process.stdout.write(JSON.stringify({ ok: false, error: 'bad json: ' + e.message }) + '\n');
    return;
  }
  try {
    const result = await generate(req.payload || {});
    process.stdout.write(JSON.stringify({ id: req.id, ok: true, result }) + '\n');
  } catch (e) {
    process.stdout.write(JSON.stringify({ id: req.id, ok: false, error: String((e && e.message) || e) }) + '\n');
  }
});
rl.on('close', () => process.exit(0));
