#!/usr/bin/env node
/* Long-lived worker for PDD anti_content used on https://mdkd.pinduoduo.com/* pages.
 *
 * 与 anti_content_0aq 的区别：那份是从别的 PDD 页面逆出来的 jzq(4) 算法，与 mdkd 不同步。
 * 本 worker 直接装载 mdkd 前端用的 webpack 模块 1351（原始 JS 文件 /mdkd/<hash>.js），
 * 构造 RiskControlCrawler 实例，走 init(null) + messagePack(flags) 链路。
 *
 * 重要：每次 generate() 都重建 jsdom。长期常驻的 jsdom 会让 RC 内部缓存状态（localStorage
 * 里的 _nano_fp、事件缓冲、fingerprint 结果等）跨请求串，导致第 N 次的 token 被风控识别。
 * gen_and_test.js 每次新建 jsdom 产出 410 字符 token（PDD 200 OK），而旧版常驻 jsdom
 * 稳定产 359-363 字符 token（40002）。模块工厂字符串复用（7KB + 其它 ~70KB），jsdom
 * 本身每次 new 成本 ~50-150ms，整体延迟可接受。
 *
 * Protocol:
 *   stdin  : { id, payload: { serverTime?, userAgent?, platform?, appVersion? } }
 *   stdout : { id, ok, result: { anti_content, server_time } | error }
 *   stderr : logs; 一行 READY 标记就绪
 */
'use strict';

const fs = require('fs');
const path = require('path');
const readline = require('readline');
const { JSDOM } = require('jsdom');

const origLog = console.log;
console.log = (...a) => process.stderr.write('[js-mdkd] ' + a.join(' ') + '\n');
console.info = console.log;
console.warn = console.log;
console.debug = console.log;

const FACTORY_SRC = fs.readFileSync(path.join(__dirname, 'module_1351_factory.js'), 'utf8');

const DEFAULT_UA = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/147.0.0.0 Safari/537.36';

function platformFromUA(ua) {
  if (/Windows/i.test(ua)) return 'Win32';
  if (/Macintosh|Mac OS X/i.test(ua)) return 'MacIntel';
  if (/Linux/i.test(ua)) return 'Linux x86_64';
  if (/iPhone|iPad/i.test(ua)) return 'iPhone';
  if (/Android/i.test(ua)) return 'Linux armv8l';
  return 'MacIntel';
}

const LOADER_SRC = `
  (function(factorySrc) {
    var factory = eval('(' + factorySrc + ')');
    var mod = { exports: {} };
    var outerN = function(id) {
      if (id === 104) return (typeof globalThis !== 'undefined' ? globalThis : (typeof self !== 'undefined' ? self : window));
      throw new Error('outer n(' + id + ') not available for mdkd anti-content');
    };
    factory.call(globalThis, mod, mod.exports, outerN);
    return mod.exports;
  })
`;

// mdkd 查件页真实调用链（19.78906d0a.chunk.js）：
//   w = new Dt({serverTime, _2827c887a48a351a:false})
//   w.init(null)
//   await w.messagePackSync(FLAGS)        ← messagePack/messagePackSync 等价同步返 string
//   w.clearCache()
const MESSAGE_PACK_FLAGS = Object.freeze({
  touchEventData: true,
  clickEventData: true,
  focusblurEventData: true,
  changeEventData: true,
  locationInfo: true,
  referrer: true,
  browserSize: true,
  browserInfo: true,
  token: true,
  fingerprint: true,
});

function simulateUserEvents(W) {
  const body = W.document.body;
  for (let i = 0; i < 12; i++) body.dispatchEvent(new W.MouseEvent('mousemove', { clientX: 100 + i * 7, clientY: 200 + i * 3, bubbles: true }));
  for (let i = 0; i < 6; i++) body.dispatchEvent(new W.MouseEvent('click', { clientX: 150 + i * 10, clientY: 220 + i * 5, bubbles: true }));
  for (let i = 0; i < 5; i++) {
    body.dispatchEvent(new W.FocusEvent('focus', { bubbles: true }));
    body.dispatchEvent(new W.FocusEvent('blur', { bubbles: true }));
  }
  for (let i = 0; i < 8; i++) {
    body.dispatchEvent(new W.InputEvent('input', { data: String(i), bubbles: true }));
    body.dispatchEvent(new W.Event('change', { bubbles: true }));
  }
  for (let i = 0; i < 4; i++) {
    body.dispatchEvent(new W.Event('touchstart', { bubbles: true }));
    body.dispatchEvent(new W.Event('touchmove', { bubbles: true }));
    body.dispatchEvent(new W.Event('touchend', { bubbles: true }));
  }
}

function applyNavigatorOverride(W, ua, platform, appVersion) {
  const nav = W.navigator;
  const proto = Object.getPrototypeOf(nav);
  for (const target of [nav, proto]) {
    try { Object.defineProperty(target, 'userAgent', { get: () => ua, set: () => {}, configurable: true, enumerable: true }); } catch (e) {}
    try { Object.defineProperty(target, 'platform', { get: () => platform, set: () => {}, configurable: true, enumerable: true }); } catch (e) {}
    try { Object.defineProperty(target, 'appVersion', { get: () => appVersion, set: () => {}, configurable: true, enumerable: true }); } catch (e) {}
  }
}

function generate(payload) {
  const serverTime = Number(payload && payload.serverTime) || Date.now();
  const ua = String((payload && payload.userAgent) || DEFAULT_UA);
  const platform = String((payload && payload.platform) || platformFromUA(ua));
  const appVersion = String((payload && payload.appVersion) || ua.replace(/^Mozilla\//, ''));

  // 每次重建 jsdom：关键决策，避免常驻状态引发 token 漂移。
  const dom = new JSDOM('<!DOCTYPE html><html><head></head><body></body></html>', {
    url: 'https://mdkd.pinduoduo.com/packageList',
    referrer: 'https://mdkd.pinduoduo.com/',
    pretendToBeVisual: true,
    userAgent: ua,
    runScripts: 'dangerously',
  });
  const W = dom.window;

  try {
    applyNavigatorOverride(W, ua, platform, appVersion);

    const RC = W.eval(LOADER_SRC)(FACTORY_SRC);
    if (typeof RC !== 'function') {
      throw new Error('module 1351 did not export a function');
    }

    const inst = new RC({ serverTime, _2827c887a48a351a: false });
    inst.init(null);
    simulateUserEvents(W);

    const token = inst.messagePack(MESSAGE_PACK_FLAGS);
    if (typeof inst.clearCache === 'function') {
      try { inst.clearCache(); } catch (e) {}
    }
    if (typeof token !== 'string' || !token.startsWith('0aq')) {
      throw new Error('bad token from crawler: ' + (typeof token === 'string' ? token.slice(0, 40) : typeof token));
    }
    return { anti_content: token, server_time: serverTime };
  } finally {
    try { dom.window.close(); } catch (e) {}
  }
}

process.stderr.write('READY\n');

const rl = readline.createInterface({ input: process.stdin });
rl.on('line', (line) => {
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
    const result = generate(req.payload || {});
    process.stderr.write('[js-mdkd] token_len=' + result.anti_content.length + ' prefix=' + result.anti_content.slice(0, 20) + '\n');
    process.stdout.write(JSON.stringify({ id: req.id, ok: true, result }) + '\n');
  } catch (e) {
    process.stdout.write(JSON.stringify({ id: req.id, ok: false, error: String((e && e.message) || e) }) + '\n');
  }
});
rl.on('close', () => process.exit(0));
