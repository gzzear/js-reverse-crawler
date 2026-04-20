#!/usr/bin/env node
/* 验证 module 1351（mdkd 的 RiskControlCrawler 类工厂）能否在 jsdom 环境里加载并产 token。 */
'use strict';
const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');

const WIN_UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36';
const MAC_UA = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/147.0.0.0 Safari/537.36';

function buildDom(ua, platform) {
  const dom = new JSDOM('<!DOCTYPE html><html><head></head><body></body></html>', {
    url: 'https://mdkd.pinduoduo.com/login',
    referrer: 'https://mdkd.pinduoduo.com/',
    pretendToBeVisual: true,
    userAgent: ua,
    runScripts: 'dangerously',
  });
  const W = dom.window;
  Object.defineProperty(W.navigator, 'platform', { get: () => platform, configurable: true });
  return dom;
}

function loadRcModule(dom) {
  const W = dom.window;
  const src = fs.readFileSync(path.join(__dirname, 'module_1351_factory.js'), 'utf8');

  // 用 jsdom 的 window.eval 在 jsdom 内部 VM 上下文里跑工厂函数。
  // dom 必须是 runScripts: 'dangerously'；但 eval 字符串在 'outside-only' 下也工作。
  // factory 签名：function(t,e,n){ ... }
  // n(104) 是 webpack 的全局 polyfill：返回 globalThis/self/window
  const loader = `
    (function(factorySrc) {
      var factory = eval('(' + factorySrc + ')');
      var mod = { exports: {} };
      var outerN = function(id) {
        if (id === 104) return (typeof globalThis !== 'undefined' ? globalThis : (typeof self !== 'undefined' ? self : window));
        throw new Error('outer n(' + id + ') not available');
      };
      factory.call(globalThis, mod, mod.exports, outerN);
      return mod.exports;
    })
  `;
  const run = W.eval(loader);
  return run(src);
}

async function main() {
  const ua = process.argv[2] || MAC_UA;
  const platform = process.argv[3] || (/Windows/.test(ua) ? 'Win32' : 'MacIntel');

  console.log(`UA=${ua}`);
  console.log(`platform=${platform}`);

  const dom = buildDom(ua, platform);
  const RC = loadRcModule(dom);
  console.log('RC typeof:', typeof RC);
  console.log('RC preview:', RC.toString ? RC.toString().slice(0, 200) : '(no toString)');

  const proto = RC && RC.prototype;
  console.log('proto methods:', proto ? Object.getOwnPropertyNames(proto) : null);

  const now = Date.now();
  const inst = new RC({ serverTime: now });

  inst.init({ touchmove: true, focus: true, input: true, click: true });

  // 注入一串假事件模拟用户交互，让 behavior buffer 不为空
  const W = dom.window;
  const doc = W.document;
  const body = doc.body;
  // 聚焦 + 键入（input 类）：直接在 body 上 dispatch
  for (let i = 0; i < 5; i++) {
    body.dispatchEvent(new W.MouseEvent('mousemove', { clientX: 100+i*7, clientY: 200+i*3, bubbles: true }));
  }
  for (let i = 0; i < 2; i++) {
    body.dispatchEvent(new W.MouseEvent('click', { clientX: 100+i*30, clientY: 300, bubbles: true }));
  }
  for (let i = 0; i < 3; i++) {
    body.dispatchEvent(new W.FocusEvent('focus', { bubbles: true }));
  }
  for (let i = 0; i < 5; i++) {
    body.dispatchEvent(new W.InputEvent('input', { data: String(i), bubbles: true }));
  }

  const token = inst.messagePack();
  console.log(`\ntoken type: ${typeof token}`);
  if (typeof token === 'string') {
    console.log(`token len: ${token.length}`);
    console.log(`token prefix: ${token.slice(0, 30)}`);
    console.log(`token full: ${token}`);
  } else {
    console.log('token object keys:', Object.keys(token || {}).slice(0, 20));
  }
}

main().catch(e => { console.error(e); process.exit(1); });
