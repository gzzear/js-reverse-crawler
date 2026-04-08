/* Browser environment polyfill for anti_co.js running under Node.

   Goal: make anti_co.js evaluate + execute without crashing, and emit a pfb/a4
   payload that looks like a real mobile Safari session. All detection-related
   fields are hardcoded to "clean" values from a known-good browser capture.

   This file is eval'd BEFORE anti_co.js in the Node worker.
*/

'use strict';

// ---- window / self / globalThis unification ----
globalThis.self = globalThis;
globalThis.window = globalThis;
globalThis.top = globalThis;
globalThis.parent = globalThis;
globalThis.frames = globalThis;

// ---- webpack chunk bucket ----
globalThis.__LOADABLE_LOADED_CHUNKS__ = globalThis.__LOADABLE_LOADED_CHUNKS__ || [];

// ---- location (overridden per-sign via setLocation()) ----
const _location = {
  href: 'https://mobile.yangkeduo.com/goods.html?goods_id=0',
  protocol: 'https:',
  host: 'mobile.yangkeduo.com',
  hostname: 'mobile.yangkeduo.com',
  port: '',
  pathname: '/goods.html',
  search: '?goods_id=0',
  hash: '',
  origin: 'https://mobile.yangkeduo.com',
};
globalThis.location = _location;
globalThis.setLocation = function (goodsId) {
  _location.search = '?goods_id=' + goodsId;
  _location.href = 'https://mobile.yangkeduo.com/goods.html?goods_id=' + goodsId;
};

// Node 20+ defines navigator/performance/fetch as read-only getters on globalThis.
// Replace them via defineProperty so downstream assignments work uniformly.
function _forceGlobal(name, value) {
  try {
    Object.defineProperty(globalThis, name, {
      value, writable: true, configurable: true, enumerable: true,
    });
  } catch (e) {
    globalThis[name] = value;
  }
}

// ---- navigator (Mac Chrome 146 — must match the captured pfb/a4 session profile) ----
const UA_DEFAULT =
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) ' +
  'AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36';

const _pdfMimeType = { type: 'application/pdf', suffixes: 'pdf', description: 'Portable Document Format' };
const _textPdfMimeType = { type: 'text/pdf', suffixes: 'pdf', description: 'Portable Document Format' };
function _mkPlugin(name) {
  const p = { name, filename: 'internal-pdf-viewer', description: 'Portable Document Format', length: 2, 0: _pdfMimeType, 1: _textPdfMimeType, item: (i) => [_pdfMimeType, _textPdfMimeType][i] };
  return p;
}
const _plugins = [_mkPlugin('PDF Viewer'), _mkPlugin('Chrome PDF Viewer'), _mkPlugin('Chromium PDF Viewer'), _mkPlugin('Microsoft Edge PDF Viewer'), _mkPlugin('WebKit built-in PDF')];
_plugins.length = 5;
_plugins.item = (i) => _plugins[i];
_plugins.namedItem = (n) => _plugins.find(p => p.name === n) || null;
_plugins.refresh = () => {};

_forceGlobal('navigator', {
  userAgent: UA_DEFAULT,
  appVersion: '5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36',
  appName: 'Netscape',
  appCodeName: 'Mozilla',
  platform: 'MacIntel',
  product: 'Gecko',
  productSub: '20030107',
  vendor: 'Google Inc.',
  vendorSub: '',
  language: 'zh-CN',
  languages: ['zh-CN', 'zh'],
  hardwareConcurrency: 8,
  deviceMemory: 8,
  maxTouchPoints: 0,
  cookieEnabled: true,
  onLine: true,
  doNotTrack: null,
  plugins: _plugins,
  mimeTypes: { length: 2, 0: _pdfMimeType, 1: _textPdfMimeType, item: (i) => [_pdfMimeType, _textPdfMimeType][i], namedItem: (n) => null },
  // Mac Chrome session: webdriver flag is not exposed (we don't define it at all)
  permissions: { query: () => Promise.resolve({ state: 'granted' }) },
  geolocation: {},
  mediaDevices: { enumerateDevices: () => Promise.resolve([]) },
  connection: { effectiveType: '4g', downlink: 10, rtt: 50, saveData: false },
  javaEnabled: () => false,
  sendBeacon: () => true,
  // UA-CH (Client Hints) — Mac Chrome 146 profile from captured pfb/a4
  userAgentData: {
    brands: [
      { brand: 'Chromium', version: '146' },
      { brand: 'Not-A.Brand', version: '24' },
      { brand: 'Google Chrome', version: '146' },
    ],
    mobile: false,
    platform: 'macOS',
    getHighEntropyValues: () => Promise.resolve({
      architecture: 'arm',
      bitness: '64',
      brands: [
        { brand: 'Chromium', version: '146' },
        { brand: 'Not-A.Brand', version: '24' },
        { brand: 'Google Chrome', version: '146' },
      ],
      mobile: false,
      model: '',
      platform: 'macOS',
      platformVersion: '14.4.1',
      uaFullVersion: '146.0.7680.178',
      fullVersionList: [
        { brand: 'Chromium', version: '146.0.7680.178' },
        { brand: 'Not-A.Brand', version: '24.0.0.0' },
        { brand: 'Google Chrome', version: '146.0.7680.178' },
      ],
    }),
    toJSON: function () { return { brands: this.brands, mobile: this.mobile, platform: this.platform }; },
  },
});
globalThis.setUserAgent = function (ua) {
  globalThis.navigator.userAgent = ua;
  globalThis.navigator.appVersion = ua.replace(/^Mozilla\//, '');
};

// ---- history ----
_forceGlobal('history', {
  length: 1,
  state: null,
  scrollRestoration: 'auto',
  back() {}, forward() {}, go() {},
  pushState() {}, replaceState() {},
});

// ---- screen (Mac, matching captured pfb/a4: 1440x900, 30bit) ----
globalThis.screen = {
  width: 1440,
  height: 900,
  availWidth: 1440,
  availHeight: 823,
  colorDepth: 30,
  pixelDepth: 30,
  orientation: { angle: 0, type: 'landscape-primary' },
};
globalThis.innerWidth = 1440;
globalThis.innerHeight = 823;
globalThis.outerWidth = 1440;
globalThis.outerHeight = 900;
globalThis.devicePixelRatio = 2;

// ---- minimal real EventTarget so addEventListener actually fires our synthetic events ----
function makeEventTarget() {
  const listeners = Object.create(null);
  return {
    addEventListener(type, fn) {
      // DOM EventListener: function OR object with handleEvent()
      if (!fn) return;
      if (typeof fn !== 'function' && typeof fn.handleEvent !== 'function') return;
      (listeners[type] = listeners[type] || []).push(fn);
    },
    removeEventListener(type, fn) {
      const a = listeners[type];
      if (!a) return;
      const i = a.indexOf(fn);
      if (i >= 0) a.splice(i, 1);
    },
    dispatchEvent(ev) {
      const a = listeners[ev && ev.type];
      if (!a) return true;
      for (const fn of a.slice()) {
        try {
          if (typeof fn === 'function') fn.call(this, ev);
          else if (typeof fn.handleEvent === 'function') fn.handleEvent(ev);
        } catch (_) {}
      }
      return true;
    },
  };
}

// ---- document / element stubs ----
function makeStyle() {
  return new Proxy(
    { cssText: '' },
    { get: (t, k) => t[k] || '', set: (t, k, v) => ((t[k] = v), true) }
  );
}

function makeElement(tag) {
  const et = makeEventTarget();
  const el = {
    tagName: (tag || 'div').toUpperCase(),
    nodeName: (tag || 'div').toUpperCase(),
    nodeType: 1,
    children: [],
    childNodes: [],
    style: makeStyle(),
    attributes: {},
    dataset: {},
    classList: {
      add() {}, remove() {}, contains() { return false; }, toggle() {},
    },
    addEventListener: et.addEventListener,
    removeEventListener: et.removeEventListener,
    dispatchEvent: et.dispatchEvent,
    appendChild(c) { this.children.push(c); return c; },
    removeChild(c) { return c; },
    insertBefore(c) { this.children.push(c); return c; },
    setAttribute(k, v) { this.attributes[k] = v; },
    getAttribute(k) { return this.attributes[k] || null; },
    hasAttribute(k) { return k in this.attributes; },
    removeAttribute(k) { delete this.attributes[k]; },
    getBoundingClientRect() {
      return { x: 0, y: 0, top: 0, left: 0, right: 0, bottom: 0, width: 0, height: 0 };
    },
    querySelector() { return null; },
    querySelectorAll() { return []; },
    getElementsByTagName() { return []; },
    getContext(type) {
      if (type === '2d') return make2DContext();
      if (type && /webgl/i.test(type)) return makeWebGLContext();
      return null;
    },
    toDataURL() {
      // Hardcoded from a real mobile Safari capture — any stable value is fine.
      return 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAusB9Zy3n1wAAAAASUVORK5CYII=';
    },
    innerHTML: '',
    innerText: '',
    textContent: '',
    offsetWidth: 0, offsetHeight: 0, clientWidth: 0, clientHeight: 0,
    scrollTop: 0, scrollLeft: 0, scrollWidth: 0, scrollHeight: 0,
  };
  return el;
}

function make2DContext() {
  return {
    fillStyle: '',
    strokeStyle: '',
    font: '10px sans-serif',
    textBaseline: 'alphabetic',
    globalAlpha: 1,
    globalCompositeOperation: 'source-over',
    save() {}, restore() {},
    beginPath() {}, closePath() {},
    moveTo() {}, lineTo() {}, arc() {}, rect() {},
    fill() {}, stroke() {}, clip() {},
    fillText() {}, strokeText() {},
    fillRect() {}, strokeRect() {}, clearRect() {},
    drawImage() {},
    getImageData(x, y, w, h) {
      const len = (w || 1) * (h || 1) * 4;
      return { data: new Uint8ClampedArray(len), width: w, height: h };
    },
    putImageData() {},
    measureText(t) { return { width: (t || '').length * 6 }; },
    createLinearGradient() { return { addColorStop() {} }; },
    createRadialGradient() { return { addColorStop() {} }; },
    setTransform() {}, transform() {}, translate() {}, scale() {}, rotate() {},
  };
}

function makeWebGLContext() {
  const GL_EXTENSIONS = [
    'ANGLE_instanced_arrays', 'EXT_blend_minmax', 'EXT_color_buffer_half_float',
    'EXT_disjoint_timer_query', 'EXT_float_blend', 'EXT_frag_depth',
    'EXT_shader_texture_lod', 'EXT_texture_compression_rgtc', 'EXT_texture_filter_anisotropic',
    'WEBKIT_EXT_texture_filter_anisotropic', 'EXT_sRGB', 'OES_element_index_uint',
    'OES_fbo_render_mipmap', 'OES_standard_derivatives', 'OES_texture_float',
    'OES_texture_float_linear', 'OES_texture_half_float', 'OES_texture_half_float_linear',
    'OES_vertex_array_object', 'WEBGL_color_buffer_float', 'WEBGL_compressed_texture_s3tc',
    'WEBKIT_WEBGL_compressed_texture_s3tc', 'WEBGL_compressed_texture_s3tc_srgb',
    'WEBGL_debug_renderer_info', 'WEBGL_debug_shaders', 'WEBGL_depth_texture',
    'WEBKIT_WEBGL_depth_texture', 'WEBGL_draw_buffers', 'WEBGL_lose_context',
    'WEBKIT_WEBGL_lose_context',
  ];
  return {
    VENDOR: 0x1F00,
    RENDERER: 0x1F01,
    VERSION: 0x1F02,
    SHADING_LANGUAGE_VERSION: 0x8B8C,
    UNMASKED_VENDOR_WEBGL: 0x9245,
    UNMASKED_RENDERER_WEBGL: 0x9246,
    getParameter(p) {
      if (p === 0x9245 || p === 0x1F00) return 'Apple Inc.';
      if (p === 0x9246 || p === 0x1F01) return 'Apple GPU';
      if (p === 0x1F02) return 'WebGL 1.0';
      if (p === 0x8B8C) return 'WebGL GLSL ES 1.0';
      return 0;
    },
    getExtension(name) { return GL_EXTENSIONS.includes(name) ? {} : null; },
    getSupportedExtensions() { return GL_EXTENSIONS.slice(); },
    getContextAttributes() {
      return {
        alpha: true, antialias: true, depth: true, failIfMajorPerformanceCaveat: false,
        powerPreference: 'default', premultipliedAlpha: true, preserveDrawingBuffer: false,
        stencil: false, desynchronized: false, xrCompatible: false,
      };
    },
    createShader() { return {}; }, shaderSource() {}, compileShader() {},
    createProgram() { return {}; }, attachShader() {}, linkProgram() {},
    useProgram() {}, getAttribLocation() { return 0; }, getUniformLocation() { return {}; },
    createBuffer() { return {}; }, bindBuffer() {}, bufferData() {},
    enableVertexAttribArray() {}, vertexAttribPointer() {},
    clearColor() {}, clear() {}, drawArrays() {},
    readPixels() {},
    getShaderPrecisionFormat() {
      return { rangeMin: 127, rangeMax: 127, precision: 23 };
    },
  };
}

const documentElement = makeElement('html');
documentElement.lang = 'zh-cmn-Hans';
const body = makeElement('body');
documentElement.appendChild(body);

const _docET = makeEventTarget();
globalThis.document = {
  documentElement,
  body,
  head: makeElement('head'),
  title: '',
  readyState: 'complete',
  visibilityState: 'visible',
  hidden: false,
  cookie: '',
  referrer: '',
  URL: _location.href,
  domain: 'mobile.yangkeduo.com',
  characterSet: 'UTF-8',
  contentType: 'text/html',
  createElement(tag) { return makeElement(tag); },
  createElementNS(ns, tag) { return makeElement(tag); },
  createTextNode(t) { return { nodeType: 3, nodeValue: t, textContent: t }; },
  createDocumentFragment() { return makeElement('#document-fragment'); },
  getElementById() { return null; },
  getElementsByTagName() { return []; },
  getElementsByClassName() { return []; },
  querySelector() { return null; },
  querySelectorAll() { return []; },
  addEventListener: _docET.addEventListener,
  removeEventListener: _docET.removeEventListener,
  dispatchEvent: _docET.dispatchEvent,
};

// Window-level event target (anti_co listens on window for some events too)
const _winET = makeEventTarget();
globalThis.addEventListener = _winET.addEventListener;
globalThis.removeEventListener = _winET.removeEventListener;
globalThis.dispatchEvent = _winET.dispatchEvent;

// ---- Synthetic activity injector ----
// Fan an event to document, body, html, AND window so whichever target the
// bundle attached to gets triggered.
function _fan(ev) {
  try { globalThis.document.dispatchEvent(ev); } catch (_) {}
  try { body.dispatchEvent(ev); } catch (_) {}
  try { documentElement.dispatchEvent(ev); } catch (_) {}
  try { globalThis.dispatchEvent(ev); } catch (_) {}
}
globalThis.dispatchSyntheticActivity = function () {
  const t0 = Date.now();
  // Bezier-ish mouse trail
  const points = [];
  for (let i = 0; i < 40; i++) {
    const t = i / 39;
    const x = Math.round(50 + 300 * t + 30 * Math.sin(t * 6));
    const y = Math.round(120 + 480 * t * (1 - t) * 4 + 20 * Math.cos(t * 4));
    points.push([x, y]);
  }
  for (let i = 0; i < points.length; i++) {
    const [x, y] = points[i];
    const ev = new globalThis.MouseEvent('mousemove', {
      type: 'mousemove', clientX: x, clientY: y, screenX: x, screenY: y,
      pageX: x, pageY: y, button: 0, buttons: 0, isTrusted: true,
      timeStamp: (Date.now() - t0) + i * 12,
    });
    _fan(ev);
  }
  // A couple of clicks
  for (let i = 0; i < 3; i++) {
    const ev = new globalThis.MouseEvent('click', {
      type: 'click', clientX: 200 + i * 30, clientY: 400, button: 0, buttons: 0,
      isTrusted: true, timeStamp: (Date.now() - t0) + 600 + i * 80,
    });
    _fan(ev);
    const ev2 = new globalThis.MouseEvent('mousedown', {
      type: 'mousedown', clientX: 200 + i * 30, clientY: 400, button: 0, isTrusted: true,
      timeStamp: (Date.now() - t0) + 590 + i * 80,
    });
    _fan(ev2);
    const ev3 = new globalThis.MouseEvent('mouseup', {
      type: 'mouseup', clientX: 200 + i * 30, clientY: 400, button: 0, isTrusted: true,
      timeStamp: (Date.now() - t0) + 600 + i * 80,
    });
    _fan(ev3);
  }
  // Touch events for mobile
  for (let i = 0; i < 8; i++) {
    const evs = new globalThis.TouchEvent('touchstart', {
      type: 'touchstart', isTrusted: true, timeStamp: (Date.now() - t0) + 1000 + i * 50,
      touches: [{ clientX: 180 + i * 5, clientY: 300 + i * 8, identifier: i }],
      changedTouches: [{ clientX: 180 + i * 5, clientY: 300 + i * 8, identifier: i }],
    });
    _fan(evs);
    const eve = new globalThis.TouchEvent('touchend', {
      type: 'touchend', isTrusted: true, timeStamp: (Date.now() - t0) + 1050 + i * 50,
      touches: [], changedTouches: [{ clientX: 180 + i * 5, clientY: 300 + i * 8, identifier: i }],
    });
    _fan(eve);
  }
};

// Ensure `'ontouchstart' in document.documentElement` returns true (mobile Safari)
documentElement.ontouchstart = null;
body.ontouchstart = null;
globalThis.ontouchstart = null;

// ---- DOM constructor stubs (detection code does `instanceof Element` etc.) ----
class _Node {}
class _Element extends _Node {}
class _HTMLElement extends _Element {}
class _HTMLCanvasElement extends _HTMLElement {}
class _HTMLImageElement extends _HTMLElement {}
class _HTMLScriptElement extends _HTMLElement {}
_forceGlobal('Node', _Node);
_forceGlobal('Element', _Element);
_forceGlobal('HTMLElement', _HTMLElement);
_forceGlobal('HTMLCanvasElement', _HTMLCanvasElement);
_forceGlobal('HTMLImageElement', _HTMLImageElement);
_forceGlobal('HTMLScriptElement', _HTMLScriptElement);
_forceGlobal('Document', class {});
_forceGlobal('Window', class {});

// ---- event constructors (rich enough that listener code reading common props won't crash) ----
class _Event {
  constructor(type, init) {
    this.type = type;
    this.bubbles = true;
    this.cancelable = true;
    this.composed = true;
    this.defaultPrevented = false;
    this.eventPhase = 2; // AT_TARGET
    this.isTrusted = true;
    this.timeStamp = Date.now();
    this.target = globalThis.document && globalThis.document.body || null;
    this.currentTarget = this.target;
    this.srcElement = this.target;
    Object.assign(this, init || {});
  }
  preventDefault() { this.defaultPrevented = true; }
  stopPropagation() {}
  stopImmediatePropagation() {}
  composedPath() { return [this.target, globalThis.document, globalThis]; }
}
class _MouseEvent extends _Event {
  constructor(type, init) {
    super(type, init);
    this.button = (init && init.button) || 0;
    this.buttons = (init && init.buttons) || 0;
    this.clientX = (init && init.clientX) || 0;
    this.clientY = (init && init.clientY) || 0;
    this.screenX = (init && init.screenX) || this.clientX;
    this.screenY = (init && init.screenY) || this.clientY;
    this.pageX = (init && init.pageX) || this.clientX;
    this.pageY = (init && init.pageY) || this.clientY;
    this.movementX = (init && init.movementX) || 0;
    this.movementY = (init && init.movementY) || 0;
    this.offsetX = this.clientX;
    this.offsetY = this.clientY;
    this.altKey = false;
    this.ctrlKey = false;
    this.shiftKey = false;
    this.metaKey = false;
    this.relatedTarget = null;
  }
}
class _TouchEvent extends _Event {
  constructor(type, init) {
    super(type, init);
    this.touches = (init && init.touches) || [];
    this.targetTouches = (init && init.targetTouches) || this.touches;
    this.changedTouches = (init && init.changedTouches) || this.touches;
    this.altKey = false;
    this.ctrlKey = false;
    this.shiftKey = false;
    this.metaKey = false;
  }
}
globalThis.Event = _Event;
globalThis.CustomEvent = class extends _Event {};
globalThis.MouseEvent = _MouseEvent;
globalThis.TouchEvent = _TouchEvent;
globalThis.PointerEvent = _MouseEvent;
globalThis.KeyboardEvent = class extends _Event {};
globalThis.WheelEvent = _MouseEvent;

// ---- storage ----
function makeStorage() {
  const data = {};
  return {
    get length() { return Object.keys(data).length; },
    key(i) { return Object.keys(data)[i] || null; },
    getItem(k) { return k in data ? data[k] : null; },
    setItem(k, v) { data[k] = String(v); },
    removeItem(k) { delete data[k]; },
    clear() { for (const k of Object.keys(data)) delete data[k]; },
  };
}
globalThis.localStorage = makeStorage();
globalThis.sessionStorage = makeStorage();

// ---- performance ----
const _perfStart = Date.now();
_forceGlobal('performance', {
  now() { return Date.now() - _perfStart; },
  timeOrigin: _perfStart,
  timing: {
    navigationStart: _perfStart,
    domLoading: _perfStart + 50,
    domComplete: _perfStart + 800,
    loadEventEnd: _perfStart + 900,
  },
  getEntriesByType() { return []; },
  getEntriesByName() { return []; },
  mark() {}, measure() {},
});

// ---- timers: passthrough to node's ----
globalThis.requestAnimationFrame = (cb) => setTimeout(() => cb(Date.now()), 16);
globalThis.cancelAnimationFrame = (id) => clearTimeout(id);
globalThis.requestIdleCallback = (cb) => setTimeout(() => cb({ didTimeout: false, timeRemaining: () => 50 }), 1);
globalThis.cancelIdleCallback = (id) => clearTimeout(id);

// ---- misc APIs touched by anti_co ----
globalThis.matchMedia = (q) => ({
  matches: false, media: q, onchange: null,
  addListener() {}, removeListener() {},
  addEventListener() {}, removeEventListener() {}, dispatchEvent() { return true; },
});
globalThis.getComputedStyle = () => makeStyle();
globalThis.XMLHttpRequest = class {
  constructor() { this.readyState = 0; }
  open() { this.readyState = 1; }
  setRequestHeader() {}
  send() { this.readyState = 4; this.status = 200; this.responseText = ''; if (this.onreadystatechange) this.onreadystatechange(); if (this.onload) this.onload(); }
  abort() {}
  getAllResponseHeaders() { return ''; }
  getResponseHeader() { return null; }
};
_forceGlobal('fetch', () => Promise.resolve({ ok: true, status: 200, text: () => Promise.resolve(''), json: () => Promise.resolve({}) }));

// ---- AudioContext / OfflineAudioContext (audioConfig fingerprint) ----
class _AudioParam { constructor(v) { this.value = v||0; } setValueAtTime(){return this} linearRampToValueAtTime(){return this} exponentialRampToValueAtTime(){return this} }
class _AudioNode {
  constructor(ctx){this.context=ctx;this.numberOfInputs=1;this.numberOfOutputs=1;this.channelCount=2;}
  connect(n){return n}
  disconnect(){}
}
class _OscillatorNode extends _AudioNode {
  constructor(ctx){super(ctx);this.type='triangle';this.frequency=new _AudioParam(10000);this.detune=new _AudioParam(0);}
  start(){}stop(){}
}
class _DynamicsCompressorNode extends _AudioNode {
  constructor(ctx){super(ctx);this.threshold=new _AudioParam(-50);this.knee=new _AudioParam(40);this.ratio=new _AudioParam(12);this.attack=new _AudioParam(0);this.release=new _AudioParam(0.25);this.reduction=0;}
}
class _AnalyserNode extends _AudioNode {
  constructor(ctx){super(ctx);this.fftSize=2048;this.frequencyBinCount=1024;}
  getFloatFrequencyData(a){for(let i=0;i<a.length;i++)a[i]=-100;}
  getByteFrequencyData(a){for(let i=0;i<a.length;i++)a[i]=0;}
}
class _AudioBuffer {
  constructor(opt){this.length=(opt&&opt.length)||44100;this.numberOfChannels=(opt&&opt.numberOfChannels)||1;this.sampleRate=(opt&&opt.sampleRate)||44100;this.duration=this.length/this.sampleRate;this._data=new Float32Array(this.length);}
  getChannelData(){return this._data}
}
class _AudioContextBase {
  constructor(){this.sampleRate=44100;this.currentTime=0;this.state='running';this.destination=new _AudioNode(this);this.listener={};}
  createOscillator(){return new _OscillatorNode(this)}
  createDynamicsCompressor(){return new _DynamicsCompressorNode(this)}
  createAnalyser(){return new _AnalyserNode(this)}
  createGain(){const n=new _AudioNode(this);n.gain=new _AudioParam(1);return n}
  createBiquadFilter(){const n=new _AudioNode(this);n.frequency=new _AudioParam(350);n.Q=new _AudioParam(1);n.gain=new _AudioParam(0);n.detune=new _AudioParam(0);n.type='lowpass';return n}
  createBuffer(ch,len,rate){return new _AudioBuffer({numberOfChannels:ch,length:len,sampleRate:rate})}
  createBufferSource(){const n=new _AudioNode(this);n.buffer=null;n.start=()=>{};n.stop=()=>{};return n}
  createScriptProcessor(){const n=new _AudioNode(this);n.onaudioprocess=null;return n}
  decodeAudioData(){return Promise.resolve(new _AudioBuffer())}
  resume(){return Promise.resolve()}
  suspend(){return Promise.resolve()}
  close(){return Promise.resolve()}
}
class _OfflineAudioContext extends _AudioContextBase {
  constructor(ch,len,rate){super();this.length=len||44100;this.numberOfChannels=ch||1;this.sampleRate=rate||44100;}
  startRendering(){
    // Return a deterministic-looking buffer; the bundle hashes a slice of getChannelData().
    const buf=new _AudioBuffer({numberOfChannels:this.numberOfChannels,length:this.length,sampleRate:this.sampleRate});
    const d=buf.getChannelData(0);
    // Fill with a stable pseudo-random pattern
    for(let i=0;i<d.length;i++)d[i]=Math.sin(i*0.0001)*0.5;
    if(typeof this.oncomplete==='function')this.oncomplete({renderedBuffer:buf});
    return Promise.resolve(buf);
  }
}
globalThis.AudioContext = _AudioContextBase;
globalThis.webkitAudioContext = _AudioContextBase;
globalThis.OfflineAudioContext = _OfflineAudioContext;
globalThis.webkitOfflineAudioContext = _OfflineAudioContext;

// ---- Blob / FileReader / URL ----
class _Blob { constructor(parts,opts){this.size=0;this.type=(opts&&opts.type)||'';if(parts)for(const p of parts)this.size+=(p&&p.length)||0;} slice(){return new _Blob()} text(){return Promise.resolve('')} arrayBuffer(){return Promise.resolve(new ArrayBuffer(0))} }
globalThis.Blob = _Blob;
globalThis.File = class extends _Blob { constructor(p,n,o){super(p,o);this.name=n;this.lastModified=Date.now();} };
globalThis.FileReader = class { constructor(){this.result=null;this.onload=null;this.onloadend=null;} readAsDataURL(){this.result='data:;base64,';if(this.onload)this.onload();if(this.onloadend)this.onloadend();} readAsText(){this.result='';if(this.onload)this.onload();} readAsArrayBuffer(){this.result=new ArrayBuffer(0);if(this.onload)this.onload();} };
if(!globalThis.URL){
  globalThis.URL = class { constructor(u){this.href=u;} };
}
globalThis.URL.createObjectURL = () => 'blob:https://mobile.yangkeduo.com/00000000-0000-0000-0000-000000000000';
globalThis.URL.revokeObjectURL = () => {};

// ---- Observers ----
globalThis.MutationObserver = class { observe(){} disconnect(){} takeRecords(){return []} };
globalThis.IntersectionObserver = class { observe(){} unobserve(){} disconnect(){} takeRecords(){return []} };
globalThis.ResizeObserver = class { observe(){} unobserve(){} disconnect(){} };
globalThis.PerformanceObserver = class { observe(){} disconnect(){} takeRecords(){return []} };

// ---- indexedDB ----
globalThis.indexedDB = { open: () => ({ onsuccess: null, onerror: null, result: null }), deleteDatabase: () => ({}) };

// ---- Notification ----
globalThis.Notification = function(){}; globalThis.Notification.permission = 'default'; globalThis.Notification.requestPermission = () => Promise.resolve('default');

// ---- chrome (UA hint) — keep undefined on iPhone profile ----
// (intentionally not defining globalThis.chrome — mobile Safari has none)

// ---- document.scripts / images / forms / links ----
try {
  Object.defineProperty(globalThis.document, 'scripts', { configurable: true, get: () => { const arr = []; arr.length = 0; arr.item = (i) => arr[i] || null; return arr; } });
  Object.defineProperty(globalThis.document, 'images',  { configurable: true, get: () => { const arr = []; arr.item = (i) => arr[i] || null; return arr; } });
  Object.defineProperty(globalThis.document, 'forms',   { configurable: true, get: () => { const arr = []; arr.item = (i) => arr[i] || null; return arr; } });
  Object.defineProperty(globalThis.document, 'links',   { configurable: true, get: () => { const arr = []; arr.item = (i) => arr[i] || null; return arr; } });
  Object.defineProperty(globalThis.document, 'all',     { configurable: true, get: () => { const arr = []; arr.item = (i) => arr[i] || null; return arr; } });
  Object.defineProperty(globalThis.document, 'styleSheets', { configurable: true, get: () => [] });
  Object.defineProperty(globalThis.document, 'readyState', { configurable: true, get: () => 'complete' });
  Object.defineProperty(globalThis.document, 'visibilityState', { configurable: true, get: () => 'visible' });
  Object.defineProperty(globalThis.document, 'hidden', { configurable: true, get: () => false });
  Object.defineProperty(globalThis.document, 'hasFocus', { configurable: true, value: () => true });
  Object.defineProperty(globalThis.document, 'referrer', { configurable: true, get: () => 'https://mobile.yangkeduo.com/' });
  Object.defineProperty(globalThis.document, 'title', { configurable: true, get: () => '拼多多', set: () => {} });
  Object.defineProperty(globalThis.document, 'URL', { configurable: true, get: () => globalThis.location.href });
  Object.defineProperty(globalThis.document, 'documentURI', { configurable: true, get: () => globalThis.location.href });
  Object.defineProperty(globalThis.document, 'domain', { configurable: true, get: () => 'mobile.yangkeduo.com' });
  Object.defineProperty(globalThis.document, 'characterSet', { configurable: true, get: () => 'UTF-8' });
  Object.defineProperty(globalThis.document, 'compatMode', { configurable: true, get: () => 'CSS1Compat' });
} catch (_) {}

// ---- toDataURL: return a deterministic non-trivial PNG so canvasHd hash differs from "all white" ----
try {
  // Replace canvas factory's toDataURL with a longer fixed payload
  const _origCreate = globalThis.document.createElement;
  globalThis.document.createElement = function(tag) {
    const el = _origCreate.call(this, tag);
    if (typeof tag === 'string' && tag.toLowerCase() === 'canvas') {
      el.width = 300; el.height = 150;
      el.toDataURL = function() {
        // Long, fixed base64 payload — bundle hashes the string, just needs to be non-trivial.
        return 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASwAAACWCAYAAABkW7XSAAAAAXNSR0IArs4c6QAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAACXBIWXMAAA7DAAAOwwHHb6hkAAAJDklEQVR4Xu3csW0CMBSF4XQpUmYAswS5GkpCJ0tQZAIWoMgEbECRCdiBLrkM5ymXIyGu7xY2Vx+SkiJ+fnp6T8KQAAAAAAAAAAAAAAAAAAAA/L2maUYj7dN3M6ZZB9ZGqVdFqVeqoaFjlHr9iVGqUaGOKkpvjX0fpVqlGpV6dQzcGqVeb5R6vVHqVTHwbZRqVRulXr0CHEepVy0sVOR6tVTk6oalIldNh3EalXrFwsAi16ulIlfN0lI6kvWqGFhGqVcsLKwhci9aKnLVdBjrNYpcr5aKXN0wcKMiV1CQq1tD5J60VOSq6TC2VOQiQS4S5OqGgVuS9aqlIldXh4FrkvWqlYUiVw0DK5L1ag2RG5L1ag0BLBW5amWhyNUNAyt3fl6tIXIzhIE7CnLVdBhbXljkqklYWFXkBmZhocjVDQM3JOtVKwtFrm4YuCNbr9YQuSFbr9YQwFKRq1YWilzdMLByiFy1stCKZL1aQ+SGbL1aQwBLRa5aKnLVtITIDcl6tYbIDdl6tYYAlopctbLQimS9agdarFehkRuS9WoNARgquUxQUMlDQQUVdyrIKFRwVZARTi4TFFTyUFBBJVQqyCgcKcgoHCnIuCgIKcgoHCnIKKgUKsgoHCnIKKgKMgpHCjIKKr8oyChccFKQUVBxp4KMcLJOQQUVdwoyCkcK6lQGUuQGdyqoIyNcKqio4nKnoIKKO0WdypGCijsFFVQ8KciYUDhSUFFFUUFGoYKLgowJhSMFFXcKMqp5KKjmoaCiTkVBQUYhT0FFRUFGRSFFQUZFQUFFRUFGoYKLgooqLgoqGqigoooLBRUVdwoqKKiooKKKioKKioo7BRWNFNwpqKjioqCigYI7BRWNFFRUUFFFRUFFRUVBRcVBQUUVjxRUVKjgoqCiiouCigojBRUVdwoqKqi4U1BRUUFFFRUVFRWNFFRUUFFFRUFFRUVFFRUFFY0UVDRSUFFRUVFFRUVFRUVFRUVFRUVFRUUjBQ==';
      };
    }
    return el;
  };
} catch (_) {}

// Ensure Function.prototype.toString for stubs looks "native" — hookFuncs detection
// walks prototype methods and checks for `[native code]`. We blanket-patch it.
const _origFnToString = Function.prototype.toString;
const _nativeMark = 'function () { [native code] }';
Function.prototype.toString = function () {
  try {
    const s = _origFnToString.call(this);
    // Crude heuristic: if the source looks like one of our stubs, return a native-looking string.
    if (this.name && /^(addEventListener|removeEventListener|toDataURL|getContext|getParameter|getExtension|getImageData|measureText|requestAnimationFrame|setTimeout|fetch|XMLHttpRequest|open|send|setRequestHeader)$/.test(this.name)) {
      return 'function ' + this.name + '() { [native code] }';
    }
    return s;
  } catch (e) {
    return _nativeMark;
  }
};
