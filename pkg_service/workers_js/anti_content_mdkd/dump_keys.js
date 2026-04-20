#!/usr/bin/env node
'use strict';
const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');

const dom = new JSDOM('<!DOCTYPE html><html><body></body></html>', {
  url: 'https://mdkd.pinduoduo.com/login',
  referrer: 'https://mdkd.pinduoduo.com/',
  pretendToBeVisual: true,
  userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/147.0.0.0 Safari/537.36',
  runScripts: 'dangerously',
});
const W = dom.window;

const Storage = W.Storage;
const logged = [];
const origSet = Storage.prototype.setItem;
const origGet = Storage.prototype.getItem;
const origRm = Storage.prototype.removeItem;
Storage.prototype.setItem = function (k, v) {
  logged.push(`setItem key=${JSON.stringify(k)} value=${JSON.stringify(String(v).slice(0, 80))}`);
  return origSet.call(this, k, v);
};
Storage.prototype.getItem = function (k) {
  const v = origGet.call(this, k);
  logged.push(`getItem key=${JSON.stringify(k)} → ${v == null ? 'null' : JSON.stringify(String(v).slice(0, 80))}`);
  return v;
};
Storage.prototype.removeItem = function (k) {
  logged.push(`removeItem key=${JSON.stringify(k)}`);
  return origRm.call(this, k);
};

const FACTORY_SRC = fs.readFileSync(path.join(__dirname, 'module_1351_factory.js'), 'utf8');
const loader = `
  (function(factorySrc) {
    var factory = eval('(' + factorySrc + ')');
    var mod = { exports: {} };
    var outerN = function(id) {
      if (id === 104) return globalThis;
      throw new Error('outer n(' + id + ') not available');
    };
    factory.call(globalThis, mod, mod.exports, outerN);
    return mod.exports;
  })
`;
const RC = W.eval(loader)(FACTORY_SRC);
const inst = new RC({ serverTime: Date.now() });
inst.init({ touchmove: true, focus: true, input: true, click: true });
for (let i = 0; i < 5; i++) {
  W.document.body.dispatchEvent(new W.FocusEvent('focus', { bubbles: true }));
  W.document.body.dispatchEvent(new W.InputEvent('input', { data: String(i), bubbles: true }));
}
const token = inst.messagePack();
console.log('--- access log (all keys touched) ---');
for (const l of logged) console.log(l);
console.log('--- final localStorage keys ---');
for (let i = 0; i < W.localStorage.length; i++) {
  const k = W.localStorage.key(i);
  console.log(`ls key=${JSON.stringify(k)} value=${JSON.stringify(W.localStorage.getItem(k))}`);
}
console.log('--- final sessionStorage keys ---');
for (let i = 0; i < W.sessionStorage.length; i++) {
  const k = W.sessionStorage.key(i);
  console.log(`ss key=${JSON.stringify(k)} value=${JSON.stringify(W.sessionStorage.getItem(k))}`);
}
console.log('--- token ---');
console.log(token.slice(0, 60));
