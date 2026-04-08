#!/usr/bin/env node
/* Long-lived anti_content signer worker.

   Protocol:
     - stdin: NDJSON requests, one JSON object per line.
       { "id": <any>, "goodsId": "...", "ua": "...", "cookie": "..." }
     - stdout: NDJSON responses.
       { "id": <same>, "ok": true,  "antiContent": "0a..." }
       { "id": <same>, "ok": false, "error": "..." }
     - stderr: logs + a single READY line at startup.
*/

'use strict';

const fs = require('fs');
const path = require('path');
const readline = require('readline');

const HERE = __dirname;

function loadJs(name) {
  return fs.readFileSync(path.join(HERE, name), 'utf8');
}

// Load browser stubs into the current global.
// (We run the whole worker in one V8 context — one "tab" per Node process.)
eval(loadJs('browser_stubs.js'));
eval(loadJs('anti_co.js'));

// Build a minimal webpack runtime around the chunk we just loaded.
const chunk = globalThis.__LOADABLE_LOADED_CHUNKS__[0];
if (!chunk) {
  console.error('[sign_worker] FATAL: no loadable chunk after anti_co.js eval');
  process.exit(2);
}
const modules = chunk[1];
const cache = {};
function webpackRequire(id) {
  if (cache[id]) return cache[id].exports;
  const mod = (cache[id] = { id, exports: {} });
  modules[id].call(mod.exports, mod, mod.exports, webpackRequire);
  return mod.exports;
}
webpackRequire.r = function (exports) {
  Object.defineProperty(exports, '__esModule', { value: true });
};
webpackRequire.d = function (exports, name, getter) {
  Object.defineProperty(exports, name, { enumerable: true, get: getter });
};
webpackRequire.n = function (module) {
  const getter = module && module.__esModule ? () => module.default : () => module;
  return getter;
};

// The entry module. 47927 → 32455 reads cookies/uid at MODULE TOP LEVEL (during
// webpackRequire), and bakes them into the factory closure. So we must defer
// the require until the request's cookie has been written.
let factory = null;
let api = null;

function parseCookie(str) {
  const out = {};
  if (!str) return out;
  for (const part of String(str).split(';')) {
    const i = part.indexOf('=');
    if (i < 0) continue;
    out[part.slice(0, i).trim()] = part.slice(i + 1).trim();
  }
  return out;
}

function sign(req) {
  if (req.ua && typeof globalThis.setUserAgent === 'function') {
    globalThis.setUserAgent(req.ua);
  }
  if (req.goodsId && typeof globalThis.setLocation === 'function') {
    globalThis.setLocation(req.goodsId);
  }
  if (typeof req.cookie === 'string') {
    try { globalThis.document.cookie = req.cookie; } catch (_) {}
    // Populate common user-id sources the bundle may read from.
    const parsed = parseCookie(req.cookie);
    const uid = parsed.pdd_user_id || '';
    try {
      globalThis.localStorage.setItem('pdd_user_id', uid);
      globalThis.localStorage.setItem('_pdd_user_id', uid);
      globalThis.localStorage.setItem('_a', uid);
      if (parsed.PDDAccessToken) {
        globalThis.localStorage.setItem('PDDAccessToken', parsed.PDDAccessToken);
        globalThis.localStorage.setItem('accessToken', parsed.PDDAccessToken);
      }
    } catch (_) {}
    try {
      globalThis.rawData = { uid, pdd_user_id: uid, store: { pdd_user_id: uid } };
      globalThis._rawData = globalThis.rawData;
    } catch (_) {}
  }
  // First sign(): require 47927/32455 NOW so the inner runtime modules see the
  // freshly written cookie. Cached for subsequent calls (same worker = same cookie).
  if (!factory) {
    factory = webpackRequire('47927').default;
  }
  api = factory({});
  if (!api || typeof api.messagePack !== 'function') {
    throw new Error('api.messagePack missing after factory');
  }
  try { api.init && api.init(); } catch (_) {}
  // Populate event buffers (moveData/clickData/touchData) with synthetic activity
  // BEFORE each pack, since the bundle drains them on every messagePack() call.
  try { globalThis.dispatchSyntheticActivity && globalThis.dispatchSyntheticActivity(); } catch (_) {}
  return api.messagePack();
}

process.stderr.write('[sign_worker] api ready (init deferred to first sign call)\n');

process.stderr.write('READY\n');

const rl = readline.createInterface({ input: process.stdin });
rl.on('line', (line) => {
  line = line.trim();
  if (!line) return;
  let req;
  try { req = JSON.parse(line); }
  catch (e) {
    process.stdout.write(JSON.stringify({ ok: false, error: 'bad json: ' + e.message }) + '\n');
    return;
  }
  try {
    const ac = sign(req);
    process.stdout.write(JSON.stringify({ id: req.id, ok: true, antiContent: ac }) + '\n');
  } catch (e) {
    process.stdout.write(JSON.stringify({ id: req.id, ok: false, error: String(e && e.message || e) }) + '\n');
  }
});
rl.on('close', () => process.exit(0));
