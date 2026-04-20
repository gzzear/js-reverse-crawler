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
try { Object.defineProperty(W.navigator, 'platform', { get: () => 'MacIntel', configurable: true }); } catch(e) {}
try { Object.defineProperty(Object.getPrototypeOf(W.navigator), 'userAgent', { get: () => UA, configurable: true }); } catch(e) {}

const FACTORY_SRC = fs.readFileSync(path.join(__dirname, 'module_1351_factory.js'), 'utf8');
const loader = `
  (function(f){
    var fn = eval('(' + f + ')');
    var m = { exports: {} };
    fn.call(globalThis, m, m.exports, function(id){ if(id===104) return globalThis; throw new Error('n('+id+')'); });
    return m.exports;
  })
`;
const RC = W.eval(loader)(FACTORY_SRC);

const inst = new RC({ serverTime: Date.now(), _2827c887a48a351a: false });
inst.init(null);

const body = W.document.body;
for (let i = 0; i < 12; i++) body.dispatchEvent(new W.MouseEvent('mousemove', { clientX: 100+i*7, clientY: 200+i*3, bubbles: true }));
for (let i = 0; i < 6; i++) body.dispatchEvent(new W.MouseEvent('click', { clientX: 150+i*10, clientY: 220+i*5, bubbles: true }));
for (let i = 0; i < 5; i++) { body.dispatchEvent(new W.FocusEvent('focus', { bubbles: true })); body.dispatchEvent(new W.FocusEvent('blur', { bubbles: true })); }
for (let i = 0; i < 8; i++) { body.dispatchEvent(new W.InputEvent('input', { data: String(i), bubbles: true })); body.dispatchEvent(new W.Event('change', { bubbles: true })); }
for (let i = 0; i < 4; i++) { body.dispatchEvent(new W.Event('touchstart', { bubbles: true })); body.dispatchEvent(new W.Event('touchmove', { bubbles: true })); body.dispatchEvent(new W.Event('touchend', { bubbles: true })); }

const flags = {
  touchEventData: true, clickEventData: true, focusblurEventData: true, changeEventData: true,
  locationInfo: true, referrer: true, browserSize: true, browserInfo: true,
  token: true, fingerprint: true,
};
const tok = inst.messagePack(flags);
process.stderr.write(`token_len=${tok.length} prefix=${tok.slice(0,30)}\n`);
process.stdout.write(tok);
