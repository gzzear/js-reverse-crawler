#!/usr/bin/env node
'use strict';
const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');

const UA = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/147.0.0.0 Safari/537.36';
const dom = new JSDOM('<!DOCTYPE html><html><body></body></html>', {
  url: 'https://mdkd.pinduoduo.com/packageList',
  referrer: 'https://mdkd.pinduoduo.com/',
  pretendToBeVisual: true,
  userAgent: UA,
  runScripts: 'dangerously',
});
const W = dom.window;

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
// Try passing the second param _2827c887a48a351a:false as seen in chunk 19
const inst = new RC({ serverTime: Date.now(), _2827c887a48a351a: false });
console.log('own props after construct:', Object.getOwnPropertyNames(inst));
console.log('proto props:', Object.getOwnPropertyNames(Object.getPrototypeOf(inst)));
console.log('keys:', Object.keys(inst));

// Call init(null) as live page does, not with flag object
try {
  const rv = inst.init(null);
  console.log('init(null) returned:', typeof rv, rv && rv === inst ? 'self' : '');
} catch(e) { console.log('init(null) err:', e.message); }

// Dispatch some fake events AFTER init
for (let i = 0; i < 5; i++) {
  W.document.body.dispatchEvent(new W.MouseEvent('click', { clientX: 100+i*5, clientY: 200, bubbles: true }));
  W.document.body.dispatchEvent(new W.FocusEvent('focus', { bubbles: true }));
  W.document.body.dispatchEvent(new W.InputEvent('input', { data: String(i), bubbles: true }));
}

const liveFlags = {
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
};

for (const method of ['messagePack', 'messagePackSync']) {
  if (typeof inst[method] !== 'function') { console.log(method, 'not a function'); continue; }
  try {
    const r = inst[method](liveFlags);
    if (r && typeof r.then === 'function') {
      r.then(v => console.log(method, 'resolved:', typeof v, String(v).slice(0, 80)))
       .catch(e => console.log(method, 'rejected:', e.message));
    } else {
      console.log(method, 'returned:', typeof r, String(r).slice(0, 80));
    }
  } catch(e) { console.log(method, 'threw:', e.message); }
}
