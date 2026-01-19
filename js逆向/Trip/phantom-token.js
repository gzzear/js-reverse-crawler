window = (function(){
  var v_saf;!function(){var n=Function.toString,t=[],i=[],o=[].indexOf.bind(t),e=[].push.bind(t),r=[].push.bind(i);function u(n,t){return-1==o(n)&&(e(n),r(`function ${t||n.name||""}() { [native code] }`)),n}Object.defineProperty(Function.prototype,"toString",{enumerable:!1,configurable:!0,writable:!0,value:function(){return"function"==typeof this&&i[o(this)]||n.call(this)}}),u(Function.prototype.toString,"toString"),v_saf=u}();


  function _inherits(t, e) {
    t.prototype = Object.create(e.prototype, {
      constructor: { value: t, writable: !0, configurable: !0 }
    }), e && Object.setPrototypeOf(t, e) }
  Object.defineProperty(Object.prototype, Symbol.toStringTag, {
    get() { return Object.getPrototypeOf(this).constructor.name }, configurable:true,
  });
  var v_new_toggle = true
  var v_console_logger = console.log
  var v_allow_types = ["string", "number", "boolean"]
  console.log=v_saf(function(a){if (v_allow_types.indexOf(typeof a)!=-1){v_console_logger.apply(this, arguments)}}, "log")
  console.debug=v_saf(function(a){if (v_allow_types.indexOf(typeof a)!=-1){v_console_logger.apply(this, arguments)}}, "debug")
  console.warn=v_saf(function(a){if (v_allow_types.indexOf(typeof a)!=-1){v_console_logger.apply(this, arguments)}}, "warn")
  console.info=v_saf(function(a){if (v_allow_types.indexOf(typeof a)!=-1){v_console_logger.apply(this, arguments)}}, "info")
  var v_console_log = function(){if (!v_new_toggle){ v_console_logger.apply(this, arguments) }}
  var v_random = (function() { var seed = 276951438; return function random() { return seed = (seed * 9301 + 49297) % 233280, (seed / 233280)} })()
  var v_new = function(v){var temp=v_new_toggle; v_new_toggle = true; var r = new v; v_new_toggle = temp; return r}


  Navigator = v_saf(function Navigator(){if (!v_new_toggle){ throw TypeError("Illegal constructor") };this._plugins = typeof PluginArray=='undefined'?[]:v_new(PluginArray); this._mimeTypes = typeof MimeTypeArray=='undefined'?[]:v_new(MimeTypeArray)})
  Storage = v_saf(function Storage(){if (!v_new_toggle){ throw TypeError("Illegal constructor") };})
  EventTarget = v_saf(function EventTarget(){;})
  NodeList = v_saf(function NodeList(){if (!v_new_toggle){ throw TypeError("Illegal constructor") };})
  HTMLCollection = v_saf(function HTMLCollection(){if (!v_new_toggle){ throw TypeError("Illegal constructor") };})
  DOMTokenList = v_saf(function DOMTokenList(){if (!v_new_toggle){ throw TypeError("Illegal constructor") };})
  HTMLAllCollection = v_saf(function HTMLAllCollection(){if (!v_new_toggle){ throw TypeError("Illegal constructor") };})
  CSSStyleDeclaration = v_saf(function CSSStyleDeclaration(){if (!v_new_toggle){ throw TypeError("Illegal constructor") };})
  MessageChannel = v_saf(function MessageChannel(){;})
  Event = v_saf(function Event(){if (!v_new_toggle){ throw TypeError("Illegal constructor") };})
  TextEncoder = v_saf(function TextEncoder(){;})
  ReadableStreamDefaultController = v_saf(function ReadableStreamDefaultController(){if (!v_new_toggle){ throw TypeError("Illegal constructor") };})
  ReadableStream = v_saf(function ReadableStream(){;})
  ReadableStreamDefaultReader = v_saf(function ReadableStreamDefaultReader(){if (!v_new_toggle){ throw TypeError("Illegal constructor") };})
  TextDecoder = v_saf(function TextDecoder(){;})
  History = v_saf(function History(){if (!v_new_toggle){ throw TypeError("Illegal constructor") };})
  PerformanceEntry = v_saf(function PerformanceEntry(){if (!v_new_toggle){ throw TypeError("Illegal constructor") };})
  Response = v_saf(function Response(){;})
  Headers = v_saf(function Headers(){;})
  PerformanceTiming = v_saf(function PerformanceTiming(){if (!v_new_toggle){ throw TypeError("Illegal constructor") };})
  DOMRectReadOnly = v_saf(function DOMRectReadOnly(){;})
  IntersectionObserver = v_saf(function IntersectionObserver(){if (!v_new_toggle){ throw TypeError("Illegal constructor") };})
  URLSearchParams = v_saf(function URLSearchParams(){;})
  IntersectionObserverEntry = v_saf(function IntersectionObserverEntry(){if (!v_new_toggle){ throw TypeError("Illegal constructor") };})
  ResizeObserver = v_saf(function ResizeObserver(){if (!v_new_toggle){ throw TypeError("Illegal constructor") };})
  CanvasRenderingContext2D = v_saf(function CanvasRenderingContext2D(){if (!v_new_toggle){ throw TypeError("Illegal constructor") };})
  webkitURL = v_saf(function webkitURL(){if (!v_new_toggle){ throw TypeError("Illegal constructor") };})
  TrustedTypePolicyFactory = v_saf(function TrustedTypePolicyFactory(){if (!v_new_toggle){ throw TypeError("Illegal constructor") };})
  TrustedTypePolicy = v_saf(function TrustedTypePolicy(){if (!v_new_toggle){ throw TypeError("Illegal constructor") };})
  PerformanceObserver = v_saf(function PerformanceObserver(){if (!v_new_toggle){ throw TypeError("Illegal constructor") };})
  PerformanceObserverEntryList = v_saf(function PerformanceObserverEntryList(){if (!v_new_toggle){ throw TypeError("Illegal constructor") };})
  WebGLRenderingContext = v_saf(function WebGLRenderingContext(){if (!v_new_toggle){ throw TypeError("Illegal constructor") };
    function WebGLBuffer(){}
    function WebGLProgram(){}
    function WebGLShader(){}
    this._toggle = {}
    this.createBuffer = function(){ v_console_log('  [*] WebGLRenderingContext -> createBuffer[func]'); return v_new(WebGLBuffer) }
    this.createProgram = function(){ v_console_log('  [*] WebGLRenderingContext -> createProgram[func]'); return v_new(WebGLProgram) }
    this.createShader = function(){ v_console_log('  [*] WebGLRenderingContext -> createShader[func]'); return v_new(WebGLShader) }
    this.getSupportedExtensions = function(){
      v_console_log('  [*] WebGLRenderingContext -> getSupportedExtensions[func]')
      return [
        "ANGLE_instanced_arrays", "EXT_blend_minmax", "EXT_color_buffer_half_float", "EXT_disjoint_timer_query", "EXT_float_blend", "EXT_frag_depth",
        "EXT_shader_texture_lod", "EXT_texture_compression_bptc", "EXT_texture_compression_rgtc", "EXT_texture_filter_anisotropic", "WEBKIT_EXT_texture_filter_anisotropic", "EXT_sRGB",
        "KHR_parallel_shader_compile", "OES_element_index_uint", "OES_fbo_render_mipmap", "OES_standard_derivatives", "OES_texture_float", "OES_texture_float_linear",
        "OES_texture_half_float", "OES_texture_half_float_linear", "OES_vertex_array_object", "WEBGL_color_buffer_float", "WEBGL_compressed_texture_s3tc",
        "WEBKIT_WEBGL_compressed_texture_s3tc", "WEBGL_compressed_texture_s3tc_srgb", "WEBGL_debug_renderer_info", "WEBGL_debug_shaders",
        "WEBGL_depth_texture","WEBKIT_WEBGL_depth_texture","WEBGL_draw_buffers","WEBGL_lose_context","WEBKIT_WEBGL_lose_context","WEBGL_multi_draw",
      ]
    }
    var self = this
    this.getExtension = function(key){
      v_console_log('  [*] WebGLRenderingContext -> getExtension[func]:', key)
      class WebGLDebugRendererInfo{
        get UNMASKED_VENDOR_WEBGL(){self._toggle[37445]=1;return 37445}
        get UNMASKED_RENDERER_WEBGL(){self._toggle[37446]=1;return 37446}
      }
      class EXTTextureFilterAnisotropic{}
      class WebGLLoseContext{
        loseContext(){}
        restoreContext(){}
      }
      if (key == 'WEBGL_debug_renderer_info'){ var r = new WebGLDebugRendererInfo }
      if (key == 'EXT_texture_filter_anisotropic'){ var r = new EXTTextureFilterAnisotropic }
      if (key == 'WEBGL_lose_context'){ var r = new WebGLLoseContext }
      else{ var r = new WebGLDebugRendererInfo }
      return r
    }
    this.getParameter = function(key){
      v_console_log('  [*] WebGLRenderingContext -> getParameter[func]:', key)
      if (this._toggle[key]){
        if (key == 37445){ return "Google Inc. (NVIDIA)" }
        if (key == 37446){ return "ANGLE (NVIDIA, NVIDIA GeForce GTX 1050 Ti Direct3D11 vs_5_0 ps_5_0, D3D11-27.21.14.5671)" }
      }else{
        if (key == 33902){ return new Float32Array([1,1]) }
        if (key == 33901){ return new Float32Array([1,1024]) }
        if (key == 35661){ return 32 }
        if (key == 34047){ return 16 }
        if (key == 34076){ return 16384 }
        if (key == 36349){ return 1024 }
        if (key == 34024){ return 16384 }
        if (key == 34930){ return 16 }
        if (key == 3379){ return 16384 }
        if (key == 36348){ return 30 }
        if (key == 34921){ return 16 }
        if (key == 35660){ return 16 }
        if (key == 36347){ return 4095 }
        if (key == 3386){ return new Int32Array([32767, 32767]) }
        if (key == 3410){ return 8 }
        if (key == 7937){ return "WebKit WebGL" }
        if (key == 35724){ return "WebGL GLSL ES 1.0 (OpenGL ES GLSL ES 1.0 Chromium)" }
        if (key == 3415){ return 0 }
        if (key == 7936){ return "WebKit" }
        if (key == 7938){ return "WebGL 1.0 (OpenGL ES 2.0 Chromium)" }
        if (key == 3411){ return 8 }
        if (key == 3412){ return 8 }
        if (key == 3413){ return 8 }
        if (key == 3414){ return 24 }
        return null
      }
    }
    this.getContextAttributes = function(){
      v_console_log('  [*] WebGLRenderingContext -> getContextAttributes[func]')
      return {
        alpha: true,
        antialias: true,
        depth: true,
        desynchronized: false,
        failIfMajorPerformanceCaveat: false,
        powerPreference: "default",
        premultipliedAlpha: true,
        preserveDrawingBuffer: false,
        stencil: false,
        xrCompatible: false,
      }
    }
    this.getShaderPrecisionFormat = function(a,b){
      v_console_log('  [*] WebGLRenderingContext -> getShaderPrecisionFormat[func]')
      function WebGLShaderPrecisionFormat(){}
      var r1 = v_new(WebGLShaderPrecisionFormat)
      r1.rangeMin = 127
      r1.rangeMax = 127
      r1.precision = 23
      var r2 = v_new(WebGLShaderPrecisionFormat)
      r2.rangeMin = 31
      r2.rangeMax = 30
      r2.precision = 0
      if (a == 35633 && b == 36338){ return r1 } if (a == 35633 && b == 36337){ return r1 } if (a == 35633 && b == 36336){ return r1 }
      if (a == 35633 && b == 36341){ return r2 } if (a == 35633 && b == 36340){ return r2 } if (a == 35633 && b == 36339){ return r2 }
      if (a == 35632 && b == 36338){ return r1 } if (a == 35632 && b == 36337){ return r1 } if (a == 35632 && b == 36336){ return r1 }
      if (a == 35632 && b == 36341){ return r2 } if (a == 35632 && b == 36340){ return r2 } if (a == 35632 && b == 36339){ return r2 }
      throw Error('getShaderPrecisionFormat')
    }
    v_saf(this.createBuffer, 'createBuffer')
    v_saf(this.createProgram, 'createProgram')
    v_saf(this.createShader, 'createShader')
    v_saf(this.getSupportedExtensions, 'getSupportedExtensions')
    v_saf(this.getExtension, 'getExtension')
    v_saf(this.getParameter, 'getParameter')
    v_saf(this.getContextAttributes, 'getContextAttributes')
    v_saf(this.getShaderPrecisionFormat, 'getShaderPrecisionFormat')})
  WebGLShaderPrecisionFormat = v_saf(function WebGLShaderPrecisionFormat(){if (!v_new_toggle){ throw TypeError("Illegal constructor") };})
  AbortController = v_saf(function AbortController(){;})
  MutationObserver = v_saf(function MutationObserver(){if (!v_new_toggle){ throw TypeError("Illegal constructor") };})
  MutationRecord = v_saf(function MutationRecord(){if (!v_new_toggle){ throw TypeError("Illegal constructor") };})
  PluginArray = v_saf(function PluginArray(){if (!v_new_toggle){ throw TypeError("Illegal constructor") };
    this[0]=v_new(Plugin);this[0].description="Portable Document Format";this[0].filename="internal-pdf-viewer";this[0].length=2;this[0].name="PDF Viewer";
    this[1]=v_new(Plugin);this[1].description="Portable Document Format";this[1].filename="internal-pdf-viewer";this[1].length=2;this[1].name="Chrome PDF Viewer";
    this[2]=v_new(Plugin);this[2].description="Portable Document Format";this[2].filename="internal-pdf-viewer";this[2].length=2;this[2].name="Chromium PDF Viewer";
    this[3]=v_new(Plugin);this[3].description="Portable Document Format";this[3].filename="internal-pdf-viewer";this[3].length=2;this[3].name="Microsoft Edge PDF Viewer";
    this[4]=v_new(Plugin);this[4].description="Portable Document Format";this[4].filename="internal-pdf-viewer";this[4].length=2;this[4].name="WebKit built-in PDF";})
  Plugin = v_saf(function Plugin(){if (!v_new_toggle){ throw TypeError("Illegal constructor") };})
  Image = v_saf(function Image(){;return v_new(HTMLImageElement)})
  MimeTypeArray = v_saf(function MimeTypeArray(){if (!v_new_toggle){ throw TypeError("Illegal constructor") };
    this[0]=v_new(Plugin);this[0].description="Portable Document Format";this[0].enabledPlugin={"0":{},"1":{}};this[0].suffixes="pdf";this[0].type="application/pdf";
    this[1]=v_new(Plugin);this[1].description="Portable Document Format";this[1].enabledPlugin={"0":{},"1":{}};this[1].suffixes="pdf";this[1].type="text/pdf";})
  WebKitMutationObserver = v_saf(function WebKitMutationObserver(){if (!v_new_toggle){ throw TypeError("Illegal constructor") };})
  Crypto = v_saf(function Crypto(){if (!v_new_toggle){ throw TypeError("Illegal constructor") };
    this.getRandomValues = function(){
      v_console_log('  [*] Crypto -> getRandomValues[func]')
      var e=arguments[0]; return e.map(function(x, i){return e[i]=v_random()*1073741824});}
    this.randomUUID = function(){
      v_console_log('  [*] Crypto -> randomUUID[func]')
      function get2(){return (v_random()*255^0).toString(16).padStart(2,'0')}
      function rpt(func,num){var r=[];for(var i=0;i<num;i++){r.push(func())};return r.join('')}
      return [rpt(get2,4),rpt(get2,2),rpt(get2,2),rpt(get2,2),rpt(get2,6)].join('-')}})
  IdleDeadline = v_saf(function IdleDeadline(){if (!v_new_toggle){ throw TypeError("Illegal constructor") };})
  FormData = v_saf(function FormData(){;})
  RTCSessionDescription = v_saf(function RTCSessionDescription(){;})
  RTCIceCandidate = v_saf(function RTCIceCandidate(){if (!v_new_toggle){ throw TypeError("Illegal constructor") };})
  MimeType = v_saf(function MimeType(){if (!v_new_toggle){ throw TypeError("Illegal constructor") };})
  TrustedScriptURL = v_saf(function TrustedScriptURL(){if (!v_new_toggle){ throw TypeError("Illegal constructor") };})
  DOMStringList = v_saf(function DOMStringList(){if (!v_new_toggle){ throw TypeError("Illegal constructor") };})
  NavigatorUAData = v_saf(function NavigatorUAData(){if (!v_new_toggle){ throw TypeError("Illegal constructor") };})
  FeaturePolicy = v_saf(function FeaturePolicy(){if (!v_new_toggle){ throw TypeError("Illegal constructor") };})
  Node = v_saf(function Node(){if (!v_new_toggle){ throw TypeError("Illegal constructor") };}); _inherits(Node, EventTarget)
  MessagePort = v_saf(function MessagePort(){if (!v_new_toggle){ throw TypeError("Illegal constructor") };}); _inherits(MessagePort, EventTarget)
  Performance = v_saf(function Performance(){if (!v_new_toggle){ throw TypeError("Illegal constructor") };}); _inherits(Performance, EventTarget)
  UIEvent = v_saf(function UIEvent(){if (!v_new_toggle){ throw TypeError("Illegal constructor") };}); _inherits(UIEvent, Event)
  PerformanceResourceTiming = v_saf(function PerformanceResourceTiming(){if (!v_new_toggle){ throw TypeError("Illegal constructor") };}); _inherits(PerformanceResourceTiming, PerformanceEntry)
  XMLHttpRequestEventTarget = v_saf(function XMLHttpRequestEventTarget(){if (!v_new_toggle){ throw TypeError("Illegal constructor") };}); _inherits(XMLHttpRequestEventTarget, EventTarget)
  DOMRect = v_saf(function DOMRect(){;}); _inherits(DOMRect, DOMRectReadOnly)
  Worker = v_saf(function Worker(){if (!v_new_toggle){ throw TypeError("Illegal constructor") };}); _inherits(Worker, EventTarget)
  Screen = v_saf(function Screen(){if (!v_new_toggle){ throw TypeError("Illegal constructor") };}); _inherits(Screen, EventTarget)
  MessageEvent = v_saf(function MessageEvent(){if (!v_new_toggle){ throw TypeError("Illegal constructor") };}); _inherits(MessageEvent, Event)
  MediaQueryList = v_saf(function MediaQueryList(){if (!v_new_toggle){ throw TypeError("Illegal constructor") };}); _inherits(MediaQueryList, EventTarget)
  NetworkInformation = v_saf(function NetworkInformation(){if (!v_new_toggle){ throw TypeError("Illegal constructor") };}); _inherits(NetworkInformation, EventTarget)
  RTCPeerConnection = v_saf(function RTCPeerConnection(){;}); _inherits(RTCPeerConnection, EventTarget)
  RTCPeerConnectionIceEvent = v_saf(function RTCPeerConnectionIceEvent(){if (!v_new_toggle){ throw TypeError("Illegal constructor") };}); _inherits(RTCPeerConnectionIceEvent, Event)
  BatteryManager = v_saf(function BatteryManager(){if (!v_new_toggle){ throw TypeError("Illegal constructor") };}); _inherits(BatteryManager, EventTarget)
  webkitRTCPeerConnection = v_saf(function webkitRTCPeerConnection(){;}); _inherits(webkitRTCPeerConnection, EventTarget)
  Document = v_saf(function Document(){;}); _inherits(Document, Node)
  Element = v_saf(function Element(){if (!v_new_toggle){ throw TypeError("Illegal constructor") };}); _inherits(Element, Node)
  MouseEvent = v_saf(function MouseEvent(){if (!v_new_toggle){ throw TypeError("Illegal constructor") };}); _inherits(MouseEvent, UIEvent)
  CharacterData = v_saf(function CharacterData(){if (!v_new_toggle){ throw TypeError("Illegal constructor") };}); _inherits(CharacterData, Node)
  XMLHttpRequest = v_saf(function XMLHttpRequest(){;}); _inherits(XMLHttpRequest, XMLHttpRequestEventTarget)
  PerformanceNavigationTiming = v_saf(function PerformanceNavigationTiming(){if (!v_new_toggle){ throw TypeError("Illegal constructor") };}); _inherits(PerformanceNavigationTiming, PerformanceResourceTiming)
  HTMLElement = v_saf(function HTMLElement(){if (!v_new_toggle){ throw TypeError("Illegal constructor") };}); _inherits(HTMLElement, Element)
  PointerEvent = v_saf(function PointerEvent(){if (!v_new_toggle){ throw TypeError("Illegal constructor") };}); _inherits(PointerEvent, MouseEvent)
  SVGElement = v_saf(function SVGElement(){if (!v_new_toggle){ throw TypeError("Illegal constructor") };}); _inherits(SVGElement, Element)
  HTMLCanvasElement = v_saf(function HTMLCanvasElement(){if (!v_new_toggle){ throw TypeError("Illegal constructor") };}); _inherits(HTMLCanvasElement, HTMLElement)
  HTMLScriptElement = v_saf(function HTMLScriptElement(){if (!v_new_toggle){ throw TypeError("Illegal constructor") };}); _inherits(HTMLScriptElement, HTMLElement)
  HTMLLinkElement = v_saf(function HTMLLinkElement(){if (!v_new_toggle){ throw TypeError("Illegal constructor") };}); _inherits(HTMLLinkElement, HTMLElement)
  HTMLInputElement = v_saf(function HTMLInputElement(){if (!v_new_toggle){ throw TypeError("Illegal constructor") };}); _inherits(HTMLInputElement, HTMLElement)
  HTMLTextAreaElement = v_saf(function HTMLTextAreaElement(){if (!v_new_toggle){ throw TypeError("Illegal constructor") };}); _inherits(HTMLTextAreaElement, HTMLElement)
  HTMLIFrameElement = v_saf(function HTMLIFrameElement(){if (!v_new_toggle){ throw TypeError("Illegal constructor") };}); _inherits(HTMLIFrameElement, HTMLElement)
  HTMLImageElement = v_saf(function HTMLImageElement(){if (!v_new_toggle){ throw TypeError("Illegal constructor") };}); _inherits(HTMLImageElement, HTMLElement)
  HTMLStyleElement = v_saf(function HTMLStyleElement(){if (!v_new_toggle){ throw TypeError("Illegal constructor") };}); _inherits(HTMLStyleElement, HTMLElement)
  HTMLAnchorElement = v_saf(function HTMLAnchorElement(){if (!v_new_toggle){ throw TypeError("Illegal constructor") };v_hook_href(this, 'HTMLAnchorElement', location.href)}); _inherits(HTMLAnchorElement, HTMLElement)
  HTMLMetaElement = v_saf(function HTMLMetaElement(){if (!v_new_toggle){ throw TypeError("Illegal constructor") };}); _inherits(HTMLMetaElement, HTMLElement)
  Window = v_saf(function Window(){if (!v_new_toggle){ throw TypeError("Illegal constructor") };}); _inherits(Window, EventTarget)
  HTMLDocument = v_saf(function HTMLDocument(){if (!v_new_toggle){ throw TypeError("Illegal constructor") };Object.defineProperty(this, 'location', {get(){return location}})}); _inherits(HTMLDocument, Document)
  HTMLHtmlElement = v_saf(function HTMLHtmlElement(){if (!v_new_toggle){ throw TypeError("Illegal constructor") };}); _inherits(HTMLHtmlElement, HTMLElement)
  HTMLHeadElement = v_saf(function HTMLHeadElement(){if (!v_new_toggle){ throw TypeError("Illegal constructor") };}); _inherits(HTMLHeadElement, HTMLElement)
  HTMLBodyElement = v_saf(function HTMLBodyElement(){if (!v_new_toggle){ throw TypeError("Illegal constructor") };}); _inherits(HTMLBodyElement, HTMLElement)
  Location = v_saf(function Location(){if (!v_new_toggle){ throw TypeError("Illegal constructor") };})
  PerformanceElementTiming = v_saf(function PerformanceElementTiming(){if (!v_new_toggle){ throw TypeError("Illegal constructor") };}); _inherits(PerformanceElementTiming, PerformanceEntry)
  PerformanceEventTiming = v_saf(function PerformanceEventTiming(){if (!v_new_toggle){ throw TypeError("Illegal constructor") };}); _inherits(PerformanceEventTiming, PerformanceEntry)
  PerformanceLongTaskTiming = v_saf(function PerformanceLongTaskTiming(){if (!v_new_toggle){ throw TypeError("Illegal constructor") };}); _inherits(PerformanceLongTaskTiming, PerformanceEntry)
  PerformanceMark = v_saf(function PerformanceMark(){if (!v_new_toggle){ throw TypeError("Illegal constructor") };}); _inherits(PerformanceMark, PerformanceEntry)
  PerformanceMeasure = v_saf(function PerformanceMeasure(){if (!v_new_toggle){ throw TypeError("Illegal constructor") };}); _inherits(PerformanceMeasure, PerformanceEntry)
  PerformanceNavigation = v_saf(function PerformanceNavigation(){if (!v_new_toggle){ throw TypeError("Illegal constructor") };})
  PerformancePaintTiming = v_saf(function PerformancePaintTiming(){if (!v_new_toggle){ throw TypeError("Illegal constructor") };}); _inherits(PerformancePaintTiming, PerformanceEntry)
  PerformanceServerTiming = v_saf(function PerformanceServerTiming(){if (!v_new_toggle){ throw TypeError("Illegal constructor") };})
  HTMLMediaElement = v_saf(function HTMLMediaElement(){if (!v_new_toggle){ throw TypeError("Illegal constructor") };}); _inherits(HTMLMediaElement, HTMLElement)
  HTMLUnknownElement = v_saf(function HTMLUnknownElement(){if (!v_new_toggle){ throw TypeError("Illegal constructor") };}); _inherits(HTMLUnknownElement, HTMLElement)
  Touch = v_saf(function Touch(){if (!v_new_toggle){ throw TypeError("Illegal constructor") };})
  TouchEvent = v_saf(function TouchEvent(){if (!v_new_toggle){ throw TypeError("Illegal constructor") };}); _inherits(TouchEvent, UIEvent)
  HTMLDivElement = v_saf(function HTMLDivElement(){if (!v_new_toggle){ throw TypeError("Illegal constructor") };}); _inherits(HTMLDivElement, HTMLElement)
  HTMLTitleElement = v_saf(function HTMLTitleElement(){if (!v_new_toggle){ throw TypeError("Illegal constructor") };}); _inherits(HTMLTitleElement, HTMLElement)
  HTMLLIElement = v_saf(function HTMLLIElement(){if (!v_new_toggle){ throw TypeError("Illegal constructor") };}); _inherits(HTMLLIElement, HTMLElement)
  Object.defineProperties(Navigator.prototype, {
    userAgent: {get(){ v_console_log("  [*] Navigator -> userAgent[get]", "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36");return "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36" }},
    geolocation: {get(){ v_console_log("  [*] Navigator -> geolocation[get]", {});return {} }},
    languages: {get(){ v_console_log("  [*] Navigator -> languages[get]", {});return {} }},
    webdriver: {get(){ v_console_log("  [*] Navigator -> webdriver[get]", false);return false }},
    maxTouchPoints: {get(){ v_console_log("  [*] Navigator -> maxTouchPoints[get]", 0);return 0 }},
    language: {get(){ v_console_log("  [*] Navigator -> language[get]", "zh-CN");return "zh-CN" }},
    javaEnabled: {value: v_saf(function javaEnabled(){v_console_log("  [*] Navigator -> javaEnabled[func]", [].slice.call(arguments));return true})},
    sendBeacon: {value: v_saf(function sendBeacon(){v_console_log("  [*] Navigator -> sendBeacon[func]", [].slice.call(arguments));})},
    platform: {get(){ v_console_log("  [*] Navigator -> platform[get]", "MacIntel");return "MacIntel" }},
    plugins: {get(){ v_console_log("  [*] Navigator -> plugins[get]", this._plugins || []);return this._plugins || [] }},
    hardwareConcurrency: {get(){ v_console_log("  [*] Navigator -> hardwareConcurrency[get]", 8);return 8 }},
    cookieEnabled: {get(){ v_console_log("  [*] Navigator -> cookieEnabled[get]", true);return true }},
    appName: {get(){ v_console_log("  [*] Navigator -> appName[get]", "Netscape");return "Netscape" }},
    mimeTypes: {get(){ v_console_log("  [*] Navigator -> mimeTypes[get]", this._mimeTypes || []);return this._mimeTypes || [] }},
    connection: {get(){ v_console_log("  [*] Navigator -> connection[get]", {});return {} }},
    onLine: {get(){ v_console_log("  [*] Navigator -> onLine[get]", true);return true }},
    vendor: {get(){ v_console_log("  [*] Navigator -> vendor[get]", "Google Inc.");return "Google Inc." }},
    appVersion: {get(){ v_console_log("  [*] Navigator -> appVersion[get]", "5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36");return "5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36" }},
    appCodeName: {get(){ v_console_log("  [*] Navigator -> appCodeName[get]", "Mozilla");return "Mozilla" }},
    doNotTrack: {get(){ v_console_log("  [*] Navigator -> doNotTrack[get]", {});return {} }},
    product: {get(){ v_console_log("  [*] Navigator -> product[get]", "Gecko");return "Gecko" }},
    productSub: {get(){ v_console_log("  [*] Navigator -> productSub[get]", "20030107");return "20030107" }},
    vendorSub: {get(){ v_console_log("  [*] Navigator -> vendorSub[get]", "");return "" }},
    getBattery: {value: v_saf(function getBattery(){v_console_log("  [*] Navigator -> getBattery[func]", [].slice.call(arguments));})},
    vendorSub: {"enumerable":true,"configurable":true,"get":function(){return ""},"set":function(){return true}},
    productSub: {"enumerable":true,"configurable":true,"get":function(){return "20030107"},"set":function(){return true}},
    vendor: {"enumerable":true,"configurable":true,"get":function(){return "Google Inc."},"set":function(){return true}},
    maxTouchPoints: {"enumerable":true,"configurable":true,"get":function(){return 0},"set":function(){return true}},
    pdfViewerEnabled: {"enumerable":true,"configurable":true,"get":function(){return true},"set":function(){return true}},
    hardwareConcurrency: {"enumerable":true,"configurable":true,"get":function(){return 8},"set":function(){return true}},
    cookieEnabled: {"enumerable":true,"configurable":true,"get":function(){return true},"set":function(){return true}},
    appCodeName: {"enumerable":true,"configurable":true,"get":function(){return "Mozilla"},"set":function(){return true}},
    appName: {"enumerable":true,"configurable":true,"get":function(){return "Netscape"},"set":function(){return true}},
    appVersion: {"enumerable":true,"configurable":true,"get":function(){return "5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36"},"set":function(){return true}},
    platform: {"enumerable":true,"configurable":true,"get":function(){return "MacIntel"},"set":function(){return true}},
    product: {"enumerable":true,"configurable":true,"get":function(){return "Gecko"},"set":function(){return true}},
    userAgent: {"enumerable":true,"configurable":true,"get":function(){return "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36"},"set":function(){return true}},
    language: {"enumerable":true,"configurable":true,"get":function(){return "zh-CN"},"set":function(){return true}},
    languages: {"enumerable":true,"configurable":true,"get":function(){return ["zh-CN","zh"]},"set":function(){return true}},
    onLine: {"enumerable":true,"configurable":true,"get":function(){return true},"set":function(){return true}},
    webdriver: {"enumerable":true,"configurable":true,"get":function(){return false},"set":function(){return true}},
    deprecatedRunAdAuctionEnforcesKAnonymity: {"enumerable":true,"configurable":true,"get":function(){return false},"set":function(){return true}},
    deviceMemory: {"enumerable":true,"configurable":true,"get":function(){return 8},"set":function(){return true}},
    [Symbol.toStringTag]: {value:"Navigator",writable:false,enumerable:false,configurable:true},
  })
  Object.defineProperties(Storage.prototype, {
    [Symbol.toStringTag]: {value:"Storage",writable:false,enumerable:false,configurable:true},
  })
  Object.defineProperties(EventTarget.prototype, {
    removeEventListener: {value: v_saf(function removeEventListener(){v_console_log("  [*] EventTarget -> removeEventListener[func]", [].slice.call(arguments));})},
    dispatchEvent: {value: v_saf(function dispatchEvent(){v_console_log("  [*] EventTarget -> dispatchEvent[func]", [].slice.call(arguments));})},
    [Symbol.toStringTag]: {value:"EventTarget",writable:false,enumerable:false,configurable:true},
  })
  Object.defineProperties(NodeList.prototype, {
    length: {get(){ v_console_log("  [*] NodeList -> length[get]", 28);return 28 }},
    [Symbol.toStringTag]: {value:"NodeList",writable:false,enumerable:false,configurable:true},
  })
  Object.defineProperties(HTMLCollection.prototype, {
    length: {get(){ v_console_log("  [*] HTMLCollection -> length[get]", 25);return 25 }},
    item: {value: v_saf(function item(){v_console_log("  [*] HTMLCollection -> item[func]", [].slice.call(arguments));})},
    [Symbol.toStringTag]: {value:"HTMLCollection",writable:false,enumerable:false,configurable:true},
  })
  Object.defineProperties(DOMTokenList.prototype, {
    length: {get(){ v_console_log("  [*] DOMTokenList -> length[get]", 0);return 0 }},
    supports: {value: v_saf(function supports(){v_console_log("  [*] DOMTokenList -> supports[func]", [].slice.call(arguments));})},
    add: {value: v_saf(function add(){v_console_log("  [*] DOMTokenList -> add[func]", [].slice.call(arguments));})},
    contains: {value: v_saf(function contains(){v_console_log("  [*] DOMTokenList -> contains[func]", [].slice.call(arguments));})},
    [Symbol.toStringTag]: {value:"DOMTokenList",writable:false,enumerable:false,configurable:true},
  })
  Object.defineProperties(HTMLAllCollection.prototype, {
    length: {get(){ v_console_log("  [*] HTMLAllCollection -> length[get]", 2572);return 2572 }},
    [Symbol.toStringTag]: {value:"HTMLAllCollection",writable:false,enumerable:false,configurable:true},
  })
  Object.defineProperties(CSSStyleDeclaration.prototype, {
    length: {get(){ v_console_log("  [*] CSSStyleDeclaration -> length[get]", 911);return 911 }},
    cssText: {get(){ v_console_log("  [*] CSSStyleDeclaration -> cssText[get]", "");return "" },set(){ v_console_log("  [*] CSSStyleDeclaration -> cssText[set]", [].slice.call(arguments));return "" }},
    setProperty: {value: v_saf(function setProperty(){v_console_log("  [*] CSSStyleDeclaration -> setProperty[func]", [].slice.call(arguments));})},
    [Symbol.toStringTag]: {value:"CSSStyleDeclaration",writable:false,enumerable:false,configurable:true},
  })
  Object.defineProperties(MessageChannel.prototype, {
    port2: {get(){ v_console_log("  [*] MessageChannel -> port2[get]", {});return {} }},
    port1: {get(){ v_console_log("  [*] MessageChannel -> port1[get]", {});return {} }},
    [Symbol.toStringTag]: {value:"MessageChannel",writable:false,enumerable:false,configurable:true},
  })
  Object.defineProperties(Event.prototype, {
    target: {get(){ v_console_log("  [*] Event -> target[get]", {});return {} }},
    stopPropagation: {value: v_saf(function stopPropagation(){v_console_log("  [*] Event -> stopPropagation[func]", [].slice.call(arguments));})},
    type: {get(){ v_console_log("  [*] Event -> type[get]", "load");return "load" }},
    eventPhase: {get(){ v_console_log("  [*] Event -> eventPhase[get]", 3);return 3 }},
    bubbles: {get(){ v_console_log("  [*] Event -> bubbles[get]", true);return true }},
    cancelable: {get(){ v_console_log("  [*] Event -> cancelable[get]", true);return true }},
    timeStamp: {get(){ v_console_log("  [*] Event -> timeStamp[get]", 20560.900000035763);return 20560.900000035763 }},
    defaultPrevented: {get(){ v_console_log("  [*] Event -> defaultPrevented[get]", false);return false }},
    CAPTURING_PHASE: {"value":1,"writable":false,"enumerable":true,"configurable":false},
    AT_TARGET: {"value":2,"writable":false,"enumerable":true,"configurable":false},
    BUBBLING_PHASE: {"value":3,"writable":false,"enumerable":true,"configurable":false},
    [Symbol.toStringTag]: {value:"Event",writable:false,enumerable:false,configurable:true},
  })
  Object.defineProperties(TextEncoder.prototype, {
    encode: {value: v_saf(function encode(){v_console_log("  [*] TextEncoder -> encode[func]", [].slice.call(arguments));})},
    [Symbol.toStringTag]: {value:"TextEncoder",writable:false,enumerable:false,configurable:true},
  })
  Object.defineProperties(ReadableStreamDefaultController.prototype, {
    enqueue: {value: v_saf(function enqueue(){v_console_log("  [*] ReadableStreamDefaultController -> enqueue[func]", [].slice.call(arguments));})},
    close: {value: v_saf(function close(){v_console_log("  [*] ReadableStreamDefaultController -> close[func]", [].slice.call(arguments));})},
    [Symbol.toStringTag]: {value:"ReadableStreamDefaultController",writable:false,enumerable:false,configurable:true},
  })
  Object.defineProperties(ReadableStream.prototype, {
    getReader: {value: v_saf(function getReader(){v_console_log("  [*] ReadableStream -> getReader[func]", [].slice.call(arguments));})},
    [Symbol.toStringTag]: {value:"ReadableStream",writable:false,enumerable:false,configurable:true},
  })
  Object.defineProperties(ReadableStreamDefaultReader.prototype, {
    read: {value: v_saf(function read(){v_console_log("  [*] ReadableStreamDefaultReader -> read[func]", [].slice.call(arguments));})},
    [Symbol.toStringTag]: {value:"ReadableStreamDefaultReader",writable:false,enumerable:false,configurable:true},
  })
  Object.defineProperties(TextDecoder.prototype, {
    decode: {value: v_saf(function decode(){v_console_log("  [*] TextDecoder -> decode[func]", [].slice.call(arguments));})},
    [Symbol.toStringTag]: {value:"TextDecoder",writable:false,enumerable:false,configurable:true},
  })
  Object.defineProperties(History.prototype, {
    replaceState: {value: v_saf(function replaceState(){v_console_log("  [*] History -> replaceState[func]", [].slice.call(arguments));})},
    scrollRestoration: {get(){ v_console_log("  [*] History -> scrollRestoration[get]", "manual");return "manual" },set(){ v_console_log("  [*] History -> scrollRestoration[set]", [].slice.call(arguments));return "manual" }},
    length: {get(){ v_console_log("  [*] History -> length[get]", 2);return 2 }},
    state: {get(){ v_console_log("  [*] History -> state[get]", {});return {} }},
    length: {"enumerable":true,"configurable":true,"get":function(){return 2},"set":function(){return true}},
    scrollRestoration: {"enumerable":true,"configurable":true,"get":function(){return "manual"},"set":function(){return true}},
    [Symbol.toStringTag]: {value:"History",writable:false,enumerable:false,configurable:true},
  })
  Object.defineProperties(PerformanceEntry.prototype, {
    entryType: {get(){ v_console_log("  [*] PerformanceEntry -> entryType[get]", "resource");return "resource" }},
    name: {get(){ v_console_log("  [*] PerformanceEntry -> name[get]", "https://aw-s.tripcdn.com/NFES/trip-online-search/1768381969121/_next/static/css/aa638c28372717c8.css");return "https://aw-s.tripcdn.com/NFES/trip-online-search/1768381969121/_next/static/css/aa638c28372717c8.css" }},
    duration: {get(){ v_console_log("  [*] PerformanceEntry -> duration[get]", 115.80000001192093);return 115.80000001192093 }},
    startTime: {get(){ v_console_log("  [*] PerformanceEntry -> startTime[get]", 2160.600000023842);return 2160.600000023842 }},
    [Symbol.toStringTag]: {value:"PerformanceEntry",writable:false,enumerable:false,configurable:true},
  })
  Object.defineProperties(Response.prototype, {
    status: {get(){ v_console_log("  [*] Response -> status[get]", 0);return 0 }},
    headers: {get(){ v_console_log("  [*] Response -> headers[get]", {});return {} }},
    json: {value: v_saf(function json(){v_console_log("  [*] Response -> json[func]", [].slice.call(arguments));})},
    blob: {value: v_saf(function blob(){v_console_log("  [*] Response -> blob[func]", [].slice.call(arguments));})},
    ok: {get(){ v_console_log("  [*] Response -> ok[get]", false);return false }},
    [Symbol.toStringTag]: {value:"Response",writable:false,enumerable:false,configurable:true},
  })
  Object.defineProperties(Headers.prototype, {
    get: {value: v_saf(function get(){v_console_log("  [*] Headers -> get[func]", [].slice.call(arguments));})},
    [Symbol.toStringTag]: {value:"Headers",writable:false,enumerable:false,configurable:true},
  })
  Object.defineProperties(PerformanceTiming.prototype, {
    navigationStart: {get(){ v_console_log("  [*] PerformanceTiming -> navigationStart[get]", 1768802781005);return 1768802781005 }},
    fetchStart: {get(){ v_console_log("  [*] PerformanceTiming -> fetchStart[get]", 1768802781013);return 1768802781013 }},
    unloadEventStart: {get(){ v_console_log("  [*] PerformanceTiming -> unloadEventStart[get]", 1768802782527);return 1768802782527 }},
    unloadEventEnd: {get(){ v_console_log("  [*] PerformanceTiming -> unloadEventEnd[get]", 1768802782527);return 1768802782527 }},
    redirectStart: {get(){ v_console_log("  [*] PerformanceTiming -> redirectStart[get]", 0);return 0 }},
    redirectEnd: {get(){ v_console_log("  [*] PerformanceTiming -> redirectEnd[get]", 0);return 0 }},
    domainLookupStart: {get(){ v_console_log("  [*] PerformanceTiming -> domainLookupStart[get]", 1768802781013);return 1768802781013 }},
    domainLookupEnd: {get(){ v_console_log("  [*] PerformanceTiming -> domainLookupEnd[get]", 1768802781013);return 1768802781013 }},
    connectStart: {get(){ v_console_log("  [*] PerformanceTiming -> connectStart[get]", 1768802781013);return 1768802781013 }},
    connectEnd: {get(){ v_console_log("  [*] PerformanceTiming -> connectEnd[get]", 1768802781013);return 1768802781013 }},
    secureConnectionStart: {get(){ v_console_log("  [*] PerformanceTiming -> secureConnectionStart[get]", 0);return 0 }},
    requestStart: {get(){ v_console_log("  [*] PerformanceTiming -> requestStart[get]", 1768802781020);return 1768802781020 }},
    responseStart: {get(){ v_console_log("  [*] PerformanceTiming -> responseStart[get]", 1768802782505);return 1768802782505 }},
    responseEnd: {get(){ v_console_log("  [*] PerformanceTiming -> responseEnd[get]", 1768802783578);return 1768802783578 }},
    domLoading: {get(){ v_console_log("  [*] PerformanceTiming -> domLoading[get]", 1768802782544);return 1768802782544 }},
    domInteractive: {get(){ v_console_log("  [*] PerformanceTiming -> domInteractive[get]", 1768802783587);return 1768802783587 }},
    domContentLoadedEventStart: {get(){ v_console_log("  [*] PerformanceTiming -> domContentLoadedEventStart[get]", 1768802783587);return 1768802783587 }},
    domContentLoadedEventEnd: {get(){ v_console_log("  [*] PerformanceTiming -> domContentLoadedEventEnd[get]", 1768802783588);return 1768802783588 }},
    domComplete: {get(){ v_console_log("  [*] PerformanceTiming -> domComplete[get]", 1768802784489);return 1768802784489 }},
    loadEventStart: {get(){ v_console_log("  [*] PerformanceTiming -> loadEventStart[get]", 1768802784489);return 1768802784489 }},
    loadEventEnd: {get(){ v_console_log("  [*] PerformanceTiming -> loadEventEnd[get]", 1768802784508);return 1768802784508 }},
    [Symbol.toStringTag]: {value:"PerformanceTiming",writable:false,enumerable:false,configurable:true},
  })
  Object.defineProperties(DOMRectReadOnly.prototype, {
    left: {get(){ v_console_log("  [*] DOMRectReadOnly -> left[get]", 140);return 140 }},
    top: {get(){ v_console_log("  [*] DOMRectReadOnly -> top[get]", 697);return 697 }},
    right: {get(){ v_console_log("  [*] DOMRectReadOnly -> right[get]", 1440);return 1440 }},
    bottom: {get(){ v_console_log("  [*] DOMRectReadOnly -> bottom[get]", 3533.421875);return 3533.421875 }},
    [Symbol.toStringTag]: {value:"DOMRectReadOnly",writable:false,enumerable:false,configurable:true},
  })
  Object.defineProperties(IntersectionObserver.prototype, {
    observe: {value: v_saf(function observe(){v_console_log("  [*] IntersectionObserver -> observe[func]", [].slice.call(arguments));})},
    disconnect: {value: v_saf(function disconnect(){v_console_log("  [*] IntersectionObserver -> disconnect[func]", [].slice.call(arguments));})},
    [Symbol.toStringTag]: {value:"IntersectionObserver",writable:false,enumerable:false,configurable:true},
  })
  Object.defineProperties(URLSearchParams.prototype, {
    get: {value: v_saf(function get(){v_console_log("  [*] URLSearchParams -> get[func]", [].slice.call(arguments));})},
    has: {value: v_saf(function has(){v_console_log("  [*] URLSearchParams -> has[func]", [].slice.call(arguments));})},
    set: {value: v_saf(function set(){v_console_log("  [*] URLSearchParams -> set[func]", [].slice.call(arguments));})},
    toString: {value: v_saf(function toString(){v_console_log("  [*] URLSearchParams -> toString[func]", [].slice.call(arguments));})},
    forEach: {value: v_saf(function forEach(){v_console_log("  [*] URLSearchParams -> forEach[func]", [].slice.call(arguments));})},
    [Symbol.toStringTag]: {value:"URLSearchParams",writable:false,enumerable:false,configurable:true},
  })
  Object.defineProperties(IntersectionObserverEntry.prototype, {
    intersectionRatio: {get(){ v_console_log("  [*] IntersectionObserverEntry -> intersectionRatio[get]", 0);return 0 }},
    target: {get(){ v_console_log("  [*] IntersectionObserverEntry -> target[get]", {});return {} }},
    isIntersecting: {get(){ v_console_log("  [*] IntersectionObserverEntry -> isIntersecting[get]", false);return false }},
    [Symbol.toStringTag]: {value:"IntersectionObserverEntry",writable:false,enumerable:false,configurable:true},
  })
  Object.defineProperties(ResizeObserver.prototype, {
    observe: {value: v_saf(function observe(){v_console_log("  [*] ResizeObserver -> observe[func]", [].slice.call(arguments));})},
    [Symbol.toStringTag]: {value:"ResizeObserver",writable:false,enumerable:false,configurable:true},
  })
  Object.defineProperties(CanvasRenderingContext2D.prototype, {
    createImageData: {value: v_saf(function createImageData(){v_console_log("  [*] CanvasRenderingContext2D -> createImageData[func]", [].slice.call(arguments));})},
    clearRect: {value: v_saf(function clearRect(){v_console_log("  [*] CanvasRenderingContext2D -> clearRect[func]", [].slice.call(arguments));})},
    putImageData: {value: v_saf(function putImageData(){v_console_log("  [*] CanvasRenderingContext2D -> putImageData[func]", [].slice.call(arguments));})},
    textBaseline: {set(){ v_console_log("  [*] CanvasRenderingContext2D -> textBaseline[set]", [].slice.call(arguments)); }},
    font: {set(){ v_console_log("  [*] CanvasRenderingContext2D -> font[set]", [].slice.call(arguments)); }},
    fillStyle: {set(){ v_console_log("  [*] CanvasRenderingContext2D -> fillStyle[set]", [].slice.call(arguments)); }},
    fillRect: {value: v_saf(function fillRect(){v_console_log("  [*] CanvasRenderingContext2D -> fillRect[func]", [].slice.call(arguments));})},
    fillText: {value: v_saf(function fillText(){v_console_log("  [*] CanvasRenderingContext2D -> fillText[func]", [].slice.call(arguments));})},
    [Symbol.toStringTag]: {value:"CanvasRenderingContext2D",writable:false,enumerable:false,configurable:true},
  })
  Object.defineProperties(webkitURL.prototype, {
    search: {get(){ v_console_log("  [*] webkitURL -> search[get]", "?locale=zh-hk");return "?locale=zh-hk" },set(){ v_console_log("  [*] webkitURL -> search[set]", [].slice.call(arguments));return "?locale=zh-hk" }},
    searchParams: {get(){ v_console_log("  [*] webkitURL -> searchParams[get]", {});return {} }},
    pathname: {get(){ v_console_log("  [*] webkitURL -> pathname[get]", "/static/service_worker/6150/");return "/static/service_worker/6150/" },set(){ v_console_log("  [*] webkitURL -> pathname[set]", [].slice.call(arguments));return "/static/service_worker/6150/" }},
    hostname: {get(){ v_console_log("  [*] webkitURL -> hostname[get]", "hk.trip.com");return "hk.trip.com" }},
    protocol: {get(){ v_console_log("  [*] webkitURL -> protocol[get]", "https:");return "https:" }},
    origin: {get(){ v_console_log("  [*] webkitURL -> origin[get]", "https://www.googletagmanager.com");return "https://www.googletagmanager.com" }},
    toString: {value: v_saf(function toString(){v_console_log("  [*] webkitURL -> toString[func]", [].slice.call(arguments));})},
    href: {get(){ v_console_log("  [*] webkitURL -> href[get]", "http://a/c%20d?a=1&c=3");return "http://a/c%20d?a=1&c=3" }},
    username: {get(){ v_console_log("  [*] webkitURL -> username[get]", "a");return "a" }},
    host: {get(){ v_console_log("  [*] webkitURL -> host[get]", "x");return "x" }},
    hash: {get(){ v_console_log("  [*] webkitURL -> hash[get]", "#%D0%B1");return "#%D0%B1" }},
    [Symbol.toStringTag]: {value:"webkitURL",writable:false,enumerable:false,configurable:true},
  })
  Object.defineProperties(TrustedTypePolicyFactory.prototype, {
    createPolicy: {value: v_saf(function createPolicy(){v_console_log("  [*] TrustedTypePolicyFactory -> createPolicy[func]", [].slice.call(arguments));})},
    [Symbol.toStringTag]: {value:"TrustedTypePolicyFactory",writable:false,enumerable:false,configurable:true},
  })
  Object.defineProperties(TrustedTypePolicy.prototype, {
    createScriptURL: {value: v_saf(function createScriptURL(){v_console_log("  [*] TrustedTypePolicy -> createScriptURL[func]", [].slice.call(arguments));})},
    createHTML: {value: v_saf(function createHTML(){v_console_log("  [*] TrustedTypePolicy -> createHTML[func]", [].slice.call(arguments));})},
    [Symbol.toStringTag]: {value:"TrustedTypePolicy",writable:false,enumerable:false,configurable:true},
  })
  Object.defineProperties(PerformanceObserver.prototype, {
    observe: {value: v_saf(function observe(){v_console_log("  [*] PerformanceObserver -> observe[func]", [].slice.call(arguments));})},
    disconnect: {value: v_saf(function disconnect(){v_console_log("  [*] PerformanceObserver -> disconnect[func]", [].slice.call(arguments));})},
    takeRecords: {value: v_saf(function takeRecords(){v_console_log("  [*] PerformanceObserver -> takeRecords[func]", [].slice.call(arguments));})},
    [Symbol.toStringTag]: {value:"PerformanceObserver",writable:false,enumerable:false,configurable:true},
  })
  Object.defineProperties(PerformanceObserverEntryList.prototype, {
    getEntries: {value: v_saf(function getEntries(){v_console_log("  [*] PerformanceObserverEntryList -> getEntries[func]", [].slice.call(arguments));})},
    [Symbol.toStringTag]: {value:"PerformanceObserverEntryList",writable:false,enumerable:false,configurable:true},
  })
  Object.defineProperties(WebGLRenderingContext.prototype, {
    DEPTH_BUFFER_BIT: {"value":256,"writable":false,"enumerable":true,"configurable":false},
    STENCIL_BUFFER_BIT: {"value":1024,"writable":false,"enumerable":true,"configurable":false},
    COLOR_BUFFER_BIT: {"value":16384,"writable":false,"enumerable":true,"configurable":false},
    LINES: {"value":1,"writable":false,"enumerable":true,"configurable":false},
    LINE_LOOP: {"value":2,"writable":false,"enumerable":true,"configurable":false},
    LINE_STRIP: {"value":3,"writable":false,"enumerable":true,"configurable":false},
    TRIANGLES: {"value":4,"writable":false,"enumerable":true,"configurable":false},
    TRIANGLE_STRIP: {"value":5,"writable":false,"enumerable":true,"configurable":false},
    TRIANGLE_FAN: {"value":6,"writable":false,"enumerable":true,"configurable":false},
    ONE: {"value":1,"writable":false,"enumerable":true,"configurable":false},
    SRC_COLOR: {"value":768,"writable":false,"enumerable":true,"configurable":false},
    ONE_MINUS_SRC_COLOR: {"value":769,"writable":false,"enumerable":true,"configurable":false},
    SRC_ALPHA: {"value":770,"writable":false,"enumerable":true,"configurable":false},
    ONE_MINUS_SRC_ALPHA: {"value":771,"writable":false,"enumerable":true,"configurable":false},
    DST_ALPHA: {"value":772,"writable":false,"enumerable":true,"configurable":false},
    ONE_MINUS_DST_ALPHA: {"value":773,"writable":false,"enumerable":true,"configurable":false},
    DST_COLOR: {"value":774,"writable":false,"enumerable":true,"configurable":false},
    ONE_MINUS_DST_COLOR: {"value":775,"writable":false,"enumerable":true,"configurable":false},
    SRC_ALPHA_SATURATE: {"value":776,"writable":false,"enumerable":true,"configurable":false},
    FUNC_ADD: {"value":32774,"writable":false,"enumerable":true,"configurable":false},
    BLEND_EQUATION: {"value":32777,"writable":false,"enumerable":true,"configurable":false},
    BLEND_EQUATION_RGB: {"value":32777,"writable":false,"enumerable":true,"configurable":false},
    BLEND_EQUATION_ALPHA: {"value":34877,"writable":false,"enumerable":true,"configurable":false},
    FUNC_SUBTRACT: {"value":32778,"writable":false,"enumerable":true,"configurable":false},
    FUNC_REVERSE_SUBTRACT: {"value":32779,"writable":false,"enumerable":true,"configurable":false},
    BLEND_DST_RGB: {"value":32968,"writable":false,"enumerable":true,"configurable":false},
    BLEND_SRC_RGB: {"value":32969,"writable":false,"enumerable":true,"configurable":false},
    BLEND_DST_ALPHA: {"value":32970,"writable":false,"enumerable":true,"configurable":false},
    BLEND_SRC_ALPHA: {"value":32971,"writable":false,"enumerable":true,"configurable":false},
    CONSTANT_COLOR: {"value":32769,"writable":false,"enumerable":true,"configurable":false},
    ONE_MINUS_CONSTANT_COLOR: {"value":32770,"writable":false,"enumerable":true,"configurable":false},
    CONSTANT_ALPHA: {"value":32771,"writable":false,"enumerable":true,"configurable":false},
    ONE_MINUS_CONSTANT_ALPHA: {"value":32772,"writable":false,"enumerable":true,"configurable":false},
    BLEND_COLOR: {"value":32773,"writable":false,"enumerable":true,"configurable":false},
    ARRAY_BUFFER: {"value":34962,"writable":false,"enumerable":true,"configurable":false},
    ELEMENT_ARRAY_BUFFER: {"value":34963,"writable":false,"enumerable":true,"configurable":false},
    ARRAY_BUFFER_BINDING: {"value":34964,"writable":false,"enumerable":true,"configurable":false},
    ELEMENT_ARRAY_BUFFER_BINDING: {"value":34965,"writable":false,"enumerable":true,"configurable":false},
    STREAM_DRAW: {"value":35040,"writable":false,"enumerable":true,"configurable":false},
    STATIC_DRAW: {"value":35044,"writable":false,"enumerable":true,"configurable":false},
    DYNAMIC_DRAW: {"value":35048,"writable":false,"enumerable":true,"configurable":false},
    BUFFER_SIZE: {"value":34660,"writable":false,"enumerable":true,"configurable":false},
    BUFFER_USAGE: {"value":34661,"writable":false,"enumerable":true,"configurable":false},
    CURRENT_VERTEX_ATTRIB: {"value":34342,"writable":false,"enumerable":true,"configurable":false},
    FRONT: {"value":1028,"writable":false,"enumerable":true,"configurable":false},
    BACK: {"value":1029,"writable":false,"enumerable":true,"configurable":false},
    FRONT_AND_BACK: {"value":1032,"writable":false,"enumerable":true,"configurable":false},
    TEXTURE_2D: {"value":3553,"writable":false,"enumerable":true,"configurable":false},
    CULL_FACE: {"value":2884,"writable":false,"enumerable":true,"configurable":false},
    BLEND: {"value":3042,"writable":false,"enumerable":true,"configurable":false},
    DITHER: {"value":3024,"writable":false,"enumerable":true,"configurable":false},
    STENCIL_TEST: {"value":2960,"writable":false,"enumerable":true,"configurable":false},
    DEPTH_TEST: {"value":2929,"writable":false,"enumerable":true,"configurable":false},
    SCISSOR_TEST: {"value":3089,"writable":false,"enumerable":true,"configurable":false},
    POLYGON_OFFSET_FILL: {"value":32823,"writable":false,"enumerable":true,"configurable":false},
    SAMPLE_ALPHA_TO_COVERAGE: {"value":32926,"writable":false,"enumerable":true,"configurable":false},
    SAMPLE_COVERAGE: {"value":32928,"writable":false,"enumerable":true,"configurable":false},
    INVALID_ENUM: {"value":1280,"writable":false,"enumerable":true,"configurable":false},
    INVALID_VALUE: {"value":1281,"writable":false,"enumerable":true,"configurable":false},
    INVALID_OPERATION: {"value":1282,"writable":false,"enumerable":true,"configurable":false},
    OUT_OF_MEMORY: {"value":1285,"writable":false,"enumerable":true,"configurable":false},
    CW: {"value":2304,"writable":false,"enumerable":true,"configurable":false},
    CCW: {"value":2305,"writable":false,"enumerable":true,"configurable":false},
    LINE_WIDTH: {"value":2849,"writable":false,"enumerable":true,"configurable":false},
    ALIASED_POINT_SIZE_RANGE: {"value":33901,"writable":false,"enumerable":true,"configurable":false},
    ALIASED_LINE_WIDTH_RANGE: {"value":33902,"writable":false,"enumerable":true,"configurable":false},
    CULL_FACE_MODE: {"value":2885,"writable":false,"enumerable":true,"configurable":false},
    FRONT_FACE: {"value":2886,"writable":false,"enumerable":true,"configurable":false},
    DEPTH_RANGE: {"value":2928,"writable":false,"enumerable":true,"configurable":false},
    DEPTH_WRITEMASK: {"value":2930,"writable":false,"enumerable":true,"configurable":false},
    DEPTH_CLEAR_VALUE: {"value":2931,"writable":false,"enumerable":true,"configurable":false},
    DEPTH_FUNC: {"value":2932,"writable":false,"enumerable":true,"configurable":false},
    STENCIL_CLEAR_VALUE: {"value":2961,"writable":false,"enumerable":true,"configurable":false},
    STENCIL_FUNC: {"value":2962,"writable":false,"enumerable":true,"configurable":false},
    STENCIL_FAIL: {"value":2964,"writable":false,"enumerable":true,"configurable":false},
    STENCIL_PASS_DEPTH_FAIL: {"value":2965,"writable":false,"enumerable":true,"configurable":false},
    STENCIL_PASS_DEPTH_PASS: {"value":2966,"writable":false,"enumerable":true,"configurable":false},
    STENCIL_REF: {"value":2967,"writable":false,"enumerable":true,"configurable":false},
    STENCIL_VALUE_MASK: {"value":2963,"writable":false,"enumerable":true,"configurable":false},
    STENCIL_WRITEMASK: {"value":2968,"writable":false,"enumerable":true,"configurable":false},
    STENCIL_BACK_FUNC: {"value":34816,"writable":false,"enumerable":true,"configurable":false},
    STENCIL_BACK_FAIL: {"value":34817,"writable":false,"enumerable":true,"configurable":false},
    STENCIL_BACK_PASS_DEPTH_FAIL: {"value":34818,"writable":false,"enumerable":true,"configurable":false},
    STENCIL_BACK_PASS_DEPTH_PASS: {"value":34819,"writable":false,"enumerable":true,"configurable":false},
    STENCIL_BACK_REF: {"value":36003,"writable":false,"enumerable":true,"configurable":false},
    STENCIL_BACK_VALUE_MASK: {"value":36004,"writable":false,"enumerable":true,"configurable":false},
    STENCIL_BACK_WRITEMASK: {"value":36005,"writable":false,"enumerable":true,"configurable":false},
    VIEWPORT: {"value":2978,"writable":false,"enumerable":true,"configurable":false},
    SCISSOR_BOX: {"value":3088,"writable":false,"enumerable":true,"configurable":false},
    COLOR_CLEAR_VALUE: {"value":3106,"writable":false,"enumerable":true,"configurable":false},
    COLOR_WRITEMASK: {"value":3107,"writable":false,"enumerable":true,"configurable":false},
    UNPACK_ALIGNMENT: {"value":3317,"writable":false,"enumerable":true,"configurable":false},
    PACK_ALIGNMENT: {"value":3333,"writable":false,"enumerable":true,"configurable":false},
    MAX_TEXTURE_SIZE: {"value":3379,"writable":false,"enumerable":true,"configurable":false},
    MAX_VIEWPORT_DIMS: {"value":3386,"writable":false,"enumerable":true,"configurable":false},
    SUBPIXEL_BITS: {"value":3408,"writable":false,"enumerable":true,"configurable":false},
    RED_BITS: {"value":3410,"writable":false,"enumerable":true,"configurable":false},
    GREEN_BITS: {"value":3411,"writable":false,"enumerable":true,"configurable":false},
    BLUE_BITS: {"value":3412,"writable":false,"enumerable":true,"configurable":false},
    ALPHA_BITS: {"value":3413,"writable":false,"enumerable":true,"configurable":false},
    DEPTH_BITS: {"value":3414,"writable":false,"enumerable":true,"configurable":false},
    STENCIL_BITS: {"value":3415,"writable":false,"enumerable":true,"configurable":false},
    POLYGON_OFFSET_UNITS: {"value":10752,"writable":false,"enumerable":true,"configurable":false},
    POLYGON_OFFSET_FACTOR: {"value":32824,"writable":false,"enumerable":true,"configurable":false},
    TEXTURE_BINDING_2D: {"value":32873,"writable":false,"enumerable":true,"configurable":false},
    SAMPLE_BUFFERS: {"value":32936,"writable":false,"enumerable":true,"configurable":false},
    SAMPLES: {"value":32937,"writable":false,"enumerable":true,"configurable":false},
    SAMPLE_COVERAGE_VALUE: {"value":32938,"writable":false,"enumerable":true,"configurable":false},
    SAMPLE_COVERAGE_INVERT: {"value":32939,"writable":false,"enumerable":true,"configurable":false},
    COMPRESSED_TEXTURE_FORMATS: {"value":34467,"writable":false,"enumerable":true,"configurable":false},
    DONT_CARE: {"value":4352,"writable":false,"enumerable":true,"configurable":false},
    FASTEST: {"value":4353,"writable":false,"enumerable":true,"configurable":false},
    NICEST: {"value":4354,"writable":false,"enumerable":true,"configurable":false},
    GENERATE_MIPMAP_HINT: {"value":33170,"writable":false,"enumerable":true,"configurable":false},
    BYTE: {"value":5120,"writable":false,"enumerable":true,"configurable":false},
    UNSIGNED_BYTE: {"value":5121,"writable":false,"enumerable":true,"configurable":false},
    SHORT: {"value":5122,"writable":false,"enumerable":true,"configurable":false},
    UNSIGNED_SHORT: {"value":5123,"writable":false,"enumerable":true,"configurable":false},
    INT: {"value":5124,"writable":false,"enumerable":true,"configurable":false},
    UNSIGNED_INT: {"value":5125,"writable":false,"enumerable":true,"configurable":false},
    FLOAT: {"value":5126,"writable":false,"enumerable":true,"configurable":false},
    DEPTH_COMPONENT: {"value":6402,"writable":false,"enumerable":true,"configurable":false},
    ALPHA: {"value":6406,"writable":false,"enumerable":true,"configurable":false},
    RGB: {"value":6407,"writable":false,"enumerable":true,"configurable":false},
    RGBA: {"value":6408,"writable":false,"enumerable":true,"configurable":false},
    LUMINANCE: {"value":6409,"writable":false,"enumerable":true,"configurable":false},
    LUMINANCE_ALPHA: {"value":6410,"writable":false,"enumerable":true,"configurable":false},
    UNSIGNED_SHORT_4_4_4_4: {"value":32819,"writable":false,"enumerable":true,"configurable":false},
    UNSIGNED_SHORT_5_5_5_1: {"value":32820,"writable":false,"enumerable":true,"configurable":false},
    UNSIGNED_SHORT_5_6_5: {"value":33635,"writable":false,"enumerable":true,"configurable":false},
    FRAGMENT_SHADER: {"value":35632,"writable":false,"enumerable":true,"configurable":false},
    VERTEX_SHADER: {"value":35633,"writable":false,"enumerable":true,"configurable":false},
    MAX_VERTEX_ATTRIBS: {"value":34921,"writable":false,"enumerable":true,"configurable":false},
    MAX_VERTEX_UNIFORM_VECTORS: {"value":36347,"writable":false,"enumerable":true,"configurable":false},
    MAX_VARYING_VECTORS: {"value":36348,"writable":false,"enumerable":true,"configurable":false},
    MAX_COMBINED_TEXTURE_IMAGE_UNITS: {"value":35661,"writable":false,"enumerable":true,"configurable":false},
    MAX_VERTEX_TEXTURE_IMAGE_UNITS: {"value":35660,"writable":false,"enumerable":true,"configurable":false},
    MAX_TEXTURE_IMAGE_UNITS: {"value":34930,"writable":false,"enumerable":true,"configurable":false},
    MAX_FRAGMENT_UNIFORM_VECTORS: {"value":36349,"writable":false,"enumerable":true,"configurable":false},
    SHADER_TYPE: {"value":35663,"writable":false,"enumerable":true,"configurable":false},
    DELETE_STATUS: {"value":35712,"writable":false,"enumerable":true,"configurable":false},
    LINK_STATUS: {"value":35714,"writable":false,"enumerable":true,"configurable":false},
    VALIDATE_STATUS: {"value":35715,"writable":false,"enumerable":true,"configurable":false},
    ATTACHED_SHADERS: {"value":35717,"writable":false,"enumerable":true,"configurable":false},
    ACTIVE_UNIFORMS: {"value":35718,"writable":false,"enumerable":true,"configurable":false},
    ACTIVE_ATTRIBUTES: {"value":35721,"writable":false,"enumerable":true,"configurable":false},
    SHADING_LANGUAGE_VERSION: {"value":35724,"writable":false,"enumerable":true,"configurable":false},
    CURRENT_PROGRAM: {"value":35725,"writable":false,"enumerable":true,"configurable":false},
    NEVER: {"value":512,"writable":false,"enumerable":true,"configurable":false},
    LESS: {"value":513,"writable":false,"enumerable":true,"configurable":false},
    EQUAL: {"value":514,"writable":false,"enumerable":true,"configurable":false},
    LEQUAL: {"value":515,"writable":false,"enumerable":true,"configurable":false},
    GREATER: {"value":516,"writable":false,"enumerable":true,"configurable":false},
    NOTEQUAL: {"value":517,"writable":false,"enumerable":true,"configurable":false},
    GEQUAL: {"value":518,"writable":false,"enumerable":true,"configurable":false},
    ALWAYS: {"value":519,"writable":false,"enumerable":true,"configurable":false},
    KEEP: {"value":7680,"writable":false,"enumerable":true,"configurable":false},
    REPLACE: {"value":7681,"writable":false,"enumerable":true,"configurable":false},
    INCR: {"value":7682,"writable":false,"enumerable":true,"configurable":false},
    DECR: {"value":7683,"writable":false,"enumerable":true,"configurable":false},
    INVERT: {"value":5386,"writable":false,"enumerable":true,"configurable":false},
    INCR_WRAP: {"value":34055,"writable":false,"enumerable":true,"configurable":false},
    DECR_WRAP: {"value":34056,"writable":false,"enumerable":true,"configurable":false},
    VENDOR: {"value":7936,"writable":false,"enumerable":true,"configurable":false},
    RENDERER: {"value":7937,"writable":false,"enumerable":true,"configurable":false},
    VERSION: {"value":7938,"writable":false,"enumerable":true,"configurable":false},
    NEAREST: {"value":9728,"writable":false,"enumerable":true,"configurable":false},
    LINEAR: {"value":9729,"writable":false,"enumerable":true,"configurable":false},
    NEAREST_MIPMAP_NEAREST: {"value":9984,"writable":false,"enumerable":true,"configurable":false},
    LINEAR_MIPMAP_NEAREST: {"value":9985,"writable":false,"enumerable":true,"configurable":false},
    NEAREST_MIPMAP_LINEAR: {"value":9986,"writable":false,"enumerable":true,"configurable":false},
    LINEAR_MIPMAP_LINEAR: {"value":9987,"writable":false,"enumerable":true,"configurable":false},
    TEXTURE_MAG_FILTER: {"value":10240,"writable":false,"enumerable":true,"configurable":false},
    TEXTURE_MIN_FILTER: {"value":10241,"writable":false,"enumerable":true,"configurable":false},
    TEXTURE_WRAP_S: {"value":10242,"writable":false,"enumerable":true,"configurable":false},
    TEXTURE_WRAP_T: {"value":10243,"writable":false,"enumerable":true,"configurable":false},
    TEXTURE: {"value":5890,"writable":false,"enumerable":true,"configurable":false},
    TEXTURE_CUBE_MAP: {"value":34067,"writable":false,"enumerable":true,"configurable":false},
    TEXTURE_BINDING_CUBE_MAP: {"value":34068,"writable":false,"enumerable":true,"configurable":false},
    TEXTURE_CUBE_MAP_POSITIVE_X: {"value":34069,"writable":false,"enumerable":true,"configurable":false},
    TEXTURE_CUBE_MAP_NEGATIVE_X: {"value":34070,"writable":false,"enumerable":true,"configurable":false},
    TEXTURE_CUBE_MAP_POSITIVE_Y: {"value":34071,"writable":false,"enumerable":true,"configurable":false},
    TEXTURE_CUBE_MAP_NEGATIVE_Y: {"value":34072,"writable":false,"enumerable":true,"configurable":false},
    TEXTURE_CUBE_MAP_POSITIVE_Z: {"value":34073,"writable":false,"enumerable":true,"configurable":false},
    TEXTURE_CUBE_MAP_NEGATIVE_Z: {"value":34074,"writable":false,"enumerable":true,"configurable":false},
    MAX_CUBE_MAP_TEXTURE_SIZE: {"value":34076,"writable":false,"enumerable":true,"configurable":false},
    TEXTURE0: {"value":33984,"writable":false,"enumerable":true,"configurable":false},
    TEXTURE1: {"value":33985,"writable":false,"enumerable":true,"configurable":false},
    TEXTURE2: {"value":33986,"writable":false,"enumerable":true,"configurable":false},
    TEXTURE3: {"value":33987,"writable":false,"enumerable":true,"configurable":false},
    TEXTURE4: {"value":33988,"writable":false,"enumerable":true,"configurable":false},
    TEXTURE5: {"value":33989,"writable":false,"enumerable":true,"configurable":false},
    TEXTURE6: {"value":33990,"writable":false,"enumerable":true,"configurable":false},
    TEXTURE7: {"value":33991,"writable":false,"enumerable":true,"configurable":false},
    TEXTURE8: {"value":33992,"writable":false,"enumerable":true,"configurable":false},
    TEXTURE9: {"value":33993,"writable":false,"enumerable":true,"configurable":false},
    TEXTURE10: {"value":33994,"writable":false,"enumerable":true,"configurable":false},
    TEXTURE11: {"value":33995,"writable":false,"enumerable":true,"configurable":false},
    TEXTURE12: {"value":33996,"writable":false,"enumerable":true,"configurable":false},
    TEXTURE13: {"value":33997,"writable":false,"enumerable":true,"configurable":false},
    TEXTURE14: {"value":33998,"writable":false,"enumerable":true,"configurable":false},
    TEXTURE15: {"value":33999,"writable":false,"enumerable":true,"configurable":false},
    TEXTURE16: {"value":34000,"writable":false,"enumerable":true,"configurable":false},
    TEXTURE17: {"value":34001,"writable":false,"enumerable":true,"configurable":false},
    TEXTURE18: {"value":34002,"writable":false,"enumerable":true,"configurable":false},
    TEXTURE19: {"value":34003,"writable":false,"enumerable":true,"configurable":false},
    TEXTURE20: {"value":34004,"writable":false,"enumerable":true,"configurable":false},
    TEXTURE21: {"value":34005,"writable":false,"enumerable":true,"configurable":false},
    TEXTURE22: {"value":34006,"writable":false,"enumerable":true,"configurable":false},
    TEXTURE23: {"value":34007,"writable":false,"enumerable":true,"configurable":false},
    TEXTURE24: {"value":34008,"writable":false,"enumerable":true,"configurable":false},
    TEXTURE25: {"value":34009,"writable":false,"enumerable":true,"configurable":false},
    TEXTURE26: {"value":34010,"writable":false,"enumerable":true,"configurable":false},
    TEXTURE27: {"value":34011,"writable":false,"enumerable":true,"configurable":false},
    TEXTURE28: {"value":34012,"writable":false,"enumerable":true,"configurable":false},
    TEXTURE29: {"value":34013,"writable":false,"enumerable":true,"configurable":false},
    TEXTURE30: {"value":34014,"writable":false,"enumerable":true,"configurable":false},
    TEXTURE31: {"value":34015,"writable":false,"enumerable":true,"configurable":false},
    ACTIVE_TEXTURE: {"value":34016,"writable":false,"enumerable":true,"configurable":false},
    REPEAT: {"value":10497,"writable":false,"enumerable":true,"configurable":false},
    CLAMP_TO_EDGE: {"value":33071,"writable":false,"enumerable":true,"configurable":false},
    MIRRORED_REPEAT: {"value":33648,"writable":false,"enumerable":true,"configurable":false},
    FLOAT_VEC2: {"value":35664,"writable":false,"enumerable":true,"configurable":false},
    FLOAT_VEC3: {"value":35665,"writable":false,"enumerable":true,"configurable":false},
    FLOAT_VEC4: {"value":35666,"writable":false,"enumerable":true,"configurable":false},
    INT_VEC2: {"value":35667,"writable":false,"enumerable":true,"configurable":false},
    INT_VEC3: {"value":35668,"writable":false,"enumerable":true,"configurable":false},
    INT_VEC4: {"value":35669,"writable":false,"enumerable":true,"configurable":false},
    BOOL: {"value":35670,"writable":false,"enumerable":true,"configurable":false},
    BOOL_VEC2: {"value":35671,"writable":false,"enumerable":true,"configurable":false},
    BOOL_VEC3: {"value":35672,"writable":false,"enumerable":true,"configurable":false},
    BOOL_VEC4: {"value":35673,"writable":false,"enumerable":true,"configurable":false},
    FLOAT_MAT2: {"value":35674,"writable":false,"enumerable":true,"configurable":false},
    FLOAT_MAT3: {"value":35675,"writable":false,"enumerable":true,"configurable":false},
    FLOAT_MAT4: {"value":35676,"writable":false,"enumerable":true,"configurable":false},
    SAMPLER_2D: {"value":35678,"writable":false,"enumerable":true,"configurable":false},
    SAMPLER_CUBE: {"value":35680,"writable":false,"enumerable":true,"configurable":false},
    VERTEX_ATTRIB_ARRAY_ENABLED: {"value":34338,"writable":false,"enumerable":true,"configurable":false},
    VERTEX_ATTRIB_ARRAY_SIZE: {"value":34339,"writable":false,"enumerable":true,"configurable":false},
    VERTEX_ATTRIB_ARRAY_STRIDE: {"value":34340,"writable":false,"enumerable":true,"configurable":false},
    VERTEX_ATTRIB_ARRAY_TYPE: {"value":34341,"writable":false,"enumerable":true,"configurable":false},
    VERTEX_ATTRIB_ARRAY_NORMALIZED: {"value":34922,"writable":false,"enumerable":true,"configurable":false},
    VERTEX_ATTRIB_ARRAY_POINTER: {"value":34373,"writable":false,"enumerable":true,"configurable":false},
    VERTEX_ATTRIB_ARRAY_BUFFER_BINDING: {"value":34975,"writable":false,"enumerable":true,"configurable":false},
    IMPLEMENTATION_COLOR_READ_TYPE: {"value":35738,"writable":false,"enumerable":true,"configurable":false},
    IMPLEMENTATION_COLOR_READ_FORMAT: {"value":35739,"writable":false,"enumerable":true,"configurable":false},
    COMPILE_STATUS: {"value":35713,"writable":false,"enumerable":true,"configurable":false},
    LOW_FLOAT: {"value":36336,"writable":false,"enumerable":true,"configurable":false},
    MEDIUM_FLOAT: {"value":36337,"writable":false,"enumerable":true,"configurable":false},
    HIGH_FLOAT: {"value":36338,"writable":false,"enumerable":true,"configurable":false},
    LOW_INT: {"value":36339,"writable":false,"enumerable":true,"configurable":false},
    MEDIUM_INT: {"value":36340,"writable":false,"enumerable":true,"configurable":false},
    HIGH_INT: {"value":36341,"writable":false,"enumerable":true,"configurable":false},
    FRAMEBUFFER: {"value":36160,"writable":false,"enumerable":true,"configurable":false},
    RENDERBUFFER: {"value":36161,"writable":false,"enumerable":true,"configurable":false},
    RGBA4: {"value":32854,"writable":false,"enumerable":true,"configurable":false},
    RGB5_A1: {"value":32855,"writable":false,"enumerable":true,"configurable":false},
    RGB565: {"value":36194,"writable":false,"enumerable":true,"configurable":false},
    DEPTH_COMPONENT16: {"value":33189,"writable":false,"enumerable":true,"configurable":false},
    STENCIL_INDEX8: {"value":36168,"writable":false,"enumerable":true,"configurable":false},
    DEPTH_STENCIL: {"value":34041,"writable":false,"enumerable":true,"configurable":false},
    RENDERBUFFER_WIDTH: {"value":36162,"writable":false,"enumerable":true,"configurable":false},
    RENDERBUFFER_HEIGHT: {"value":36163,"writable":false,"enumerable":true,"configurable":false},
    RENDERBUFFER_INTERNAL_FORMAT: {"value":36164,"writable":false,"enumerable":true,"configurable":false},
    RENDERBUFFER_RED_SIZE: {"value":36176,"writable":false,"enumerable":true,"configurable":false},
    RENDERBUFFER_GREEN_SIZE: {"value":36177,"writable":false,"enumerable":true,"configurable":false},
    RENDERBUFFER_BLUE_SIZE: {"value":36178,"writable":false,"enumerable":true,"configurable":false},
    RENDERBUFFER_ALPHA_SIZE: {"value":36179,"writable":false,"enumerable":true,"configurable":false},
    RENDERBUFFER_DEPTH_SIZE: {"value":36180,"writable":false,"enumerable":true,"configurable":false},
    RENDERBUFFER_STENCIL_SIZE: {"value":36181,"writable":false,"enumerable":true,"configurable":false},
    FRAMEBUFFER_ATTACHMENT_OBJECT_TYPE: {"value":36048,"writable":false,"enumerable":true,"configurable":false},
    FRAMEBUFFER_ATTACHMENT_OBJECT_NAME: {"value":36049,"writable":false,"enumerable":true,"configurable":false},
    FRAMEBUFFER_ATTACHMENT_TEXTURE_LEVEL: {"value":36050,"writable":false,"enumerable":true,"configurable":false},
    FRAMEBUFFER_ATTACHMENT_TEXTURE_CUBE_MAP_FACE: {"value":36051,"writable":false,"enumerable":true,"configurable":false},
    COLOR_ATTACHMENT0: {"value":36064,"writable":false,"enumerable":true,"configurable":false},
    DEPTH_ATTACHMENT: {"value":36096,"writable":false,"enumerable":true,"configurable":false},
    STENCIL_ATTACHMENT: {"value":36128,"writable":false,"enumerable":true,"configurable":false},
    DEPTH_STENCIL_ATTACHMENT: {"value":33306,"writable":false,"enumerable":true,"configurable":false},
    FRAMEBUFFER_COMPLETE: {"value":36053,"writable":false,"enumerable":true,"configurable":false},
    FRAMEBUFFER_INCOMPLETE_ATTACHMENT: {"value":36054,"writable":false,"enumerable":true,"configurable":false},
    FRAMEBUFFER_INCOMPLETE_MISSING_ATTACHMENT: {"value":36055,"writable":false,"enumerable":true,"configurable":false},
    FRAMEBUFFER_INCOMPLETE_DIMENSIONS: {"value":36057,"writable":false,"enumerable":true,"configurable":false},
    FRAMEBUFFER_UNSUPPORTED: {"value":36061,"writable":false,"enumerable":true,"configurable":false},
    FRAMEBUFFER_BINDING: {"value":36006,"writable":false,"enumerable":true,"configurable":false},
    RENDERBUFFER_BINDING: {"value":36007,"writable":false,"enumerable":true,"configurable":false},
    MAX_RENDERBUFFER_SIZE: {"value":34024,"writable":false,"enumerable":true,"configurable":false},
    INVALID_FRAMEBUFFER_OPERATION: {"value":1286,"writable":false,"enumerable":true,"configurable":false},
    UNPACK_FLIP_Y_WEBGL: {"value":37440,"writable":false,"enumerable":true,"configurable":false},
    UNPACK_PREMULTIPLY_ALPHA_WEBGL: {"value":37441,"writable":false,"enumerable":true,"configurable":false},
    CONTEXT_LOST_WEBGL: {"value":37442,"writable":false,"enumerable":true,"configurable":false},
    UNPACK_COLORSPACE_CONVERSION_WEBGL: {"value":37443,"writable":false,"enumerable":true,"configurable":false},
    BROWSER_DEFAULT_WEBGL: {"value":37444,"writable":false,"enumerable":true,"configurable":false},
    RGB8: {"value":32849,"writable":false,"enumerable":true,"configurable":false},
    RGBA8: {"value":32856,"writable":false,"enumerable":true,"configurable":false},
    [Symbol.toStringTag]: {value:"WebGLRenderingContext",writable:false,enumerable:false,configurable:true},
  })
  Object.defineProperties(WebGLShaderPrecisionFormat.prototype, {
    precision: {get(){ v_console_log("  [*] WebGLShaderPrecisionFormat -> precision[get]", 23);return 23 }},
    rangeMin: {get(){ v_console_log("  [*] WebGLShaderPrecisionFormat -> rangeMin[get]", 127);return 127 }},
    rangeMax: {get(){ v_console_log("  [*] WebGLShaderPrecisionFormat -> rangeMax[get]", 127);return 127 }},
    [Symbol.toStringTag]: {value:"WebGLShaderPrecisionFormat",writable:false,enumerable:false,configurable:true},
  })
  Object.defineProperties(AbortController.prototype, {
    signal: {get(){ v_console_log("  [*] AbortController -> signal[get]", {});return {} }},
    abort: {value: v_saf(function abort(){v_console_log("  [*] AbortController -> abort[func]", [].slice.call(arguments));})},
    [Symbol.toStringTag]: {value:"AbortController",writable:false,enumerable:false,configurable:true},
  })
  Object.defineProperties(MutationObserver.prototype, {
    observe: {value: v_saf(function observe(){v_console_log("  [*] MutationObserver -> observe[func]", [].slice.call(arguments));})},
    [Symbol.toStringTag]: {value:"MutationObserver",writable:false,enumerable:false,configurable:true},
  })
  Object.defineProperties(MutationRecord.prototype, {
    type: {get(){ v_console_log("  [*] MutationRecord -> type[get]", "attributes");return "attributes" }},
    attributeName: {get(){ v_console_log("  [*] MutationRecord -> attributeName[get]", "tabindex");return "tabindex" }},
    target: {get(){ v_console_log("  [*] MutationRecord -> target[get]", {});return {} }},
    [Symbol.toStringTag]: {value:"MutationRecord",writable:false,enumerable:false,configurable:true},
  })
  Object.defineProperties(PluginArray.prototype, {
    item: {value: v_saf(function item(){v_console_log("  [*] PluginArray -> item[func]", [].slice.call(arguments));})},
    length: {get(){ v_console_log("  [*] PluginArray -> length[get]", 5);return 5 }},
    [Symbol.toStringTag]: {value:"PluginArray",writable:false,enumerable:false,configurable:true},
  })
  Object.defineProperties(Plugin.prototype, {
    [Symbol.toStringTag]: {value:"Plugin",writable:false,enumerable:false,configurable:true},
  })
  Object.defineProperties(Image.prototype, {
    src: {set(){ v_console_log("  [*] Image -> src[set]", [].slice.call(arguments)); }},
    width: {get(){ v_console_log("  [*] Image -> width[get]", 600);return 600 }},
    height: {get(){ v_console_log("  [*] Image -> height[get]", 600);return 600 }},
    naturalWidth: {get(){ v_console_log("  [*] Image -> naturalWidth[get]", 600);return 600 }},
    naturalHeight: {get(){ v_console_log("  [*] Image -> naturalHeight[get]", 600);return 600 }},
    referrerPolicy: {set(){ v_console_log("  [*] Image -> referrerPolicy[set]", [].slice.call(arguments));return 600 }},
    [Symbol.toStringTag]: {value:"Image",writable:false,enumerable:false,configurable:true},
  })
  Object.defineProperties(MimeTypeArray.prototype, {
    length: {get(){ v_console_log("  [*] MimeTypeArray -> length[get]", 2);return 2 }},
    [Symbol.toStringTag]: {value:"MimeTypeArray",writable:false,enumerable:false,configurable:true},
  })
  Object.defineProperties(WebKitMutationObserver.prototype, {
    observe: {value: v_saf(function observe(){v_console_log("  [*] WebKitMutationObserver -> observe[func]", [].slice.call(arguments));})},
    [Symbol.toStringTag]: {value:"WebKitMutationObserver",writable:false,enumerable:false,configurable:true},
  })
  Object.defineProperties(Crypto.prototype, {
    [Symbol.toStringTag]: {value:"Crypto",writable:false,enumerable:false,configurable:true},
  })
  Object.defineProperties(IdleDeadline.prototype, {
    timeRemaining: {value: v_saf(function timeRemaining(){v_console_log("  [*] IdleDeadline -> timeRemaining[func]", [].slice.call(arguments));})},
    didTimeout: {get(){ v_console_log("  [*] IdleDeadline -> didTimeout[get]", true);return true }},
    [Symbol.toStringTag]: {value:"IdleDeadline",writable:false,enumerable:false,configurable:true},
  })
  Object.defineProperties(FormData.prototype, {
    append: {value: v_saf(function append(){v_console_log("  [*] FormData -> append[func]", [].slice.call(arguments));})},
    [Symbol.toStringTag]: {value:"FormData",writable:false,enumerable:false,configurable:true},
  })
  Object.defineProperties(RTCSessionDescription.prototype, {
    sdp: {get(){ v_console_log("  [*] RTCSessionDescription -> sdp[get]", "v=0\r\no=- 1968929589560568253 2 IN IP4 127.0.0.1\r\ns=-\r\nt=0 0\r\na=group:BUNDLE 0\r\na=extmap-allow-mixed\r\na=msid-semantic: WMS\r\nm=application 9 UDP/DTLS/SCTP webrtc-datachannel\r\nc=IN IP4 0.0.0.0\r\na=ice-ufrag:3chg\r\na=ice-pwd:hCs4Jt0atRhff5pvuKKmalqJ\r\na=ice-options:trickle\r\na=fingerprint:sha-256 0A:96:9D:53:AA:BD:BE:F7:F9:28:E1:AA:46:E9:91:99:34:E0:41:10:32:AD:4B:64:6A:51:AB:25:FF:9E:DD:CF\r\na=setup:actpass\r\na=mid:0\r\na=sctp-port:5000\r\na=max-message-size:262144\r\n");return "v=0\r\no=- 1968929589560568253 2 IN IP4 127.0.0.1\r\ns=-\r\nt=0 0\r\na=group:BUNDLE 0\r\na=extmap-allow-mixed\r\na=msid-semantic: WMS\r\nm=application 9 UDP/DTLS/SCTP webrtc-datachannel\r\nc=IN IP4 0.0.0.0\r\na=ice-ufrag:3chg\r\na=ice-pwd:hCs4Jt0atRhff5pvuKKmalqJ\r\na=ice-options:trickle\r\na=fingerprint:sha-256 0A:96:9D:53:AA:BD:BE:F7:F9:28:E1:AA:46:E9:91:99:34:E0:41:10:32:AD:4B:64:6A:51:AB:25:FF:9E:DD:CF\r\na=setup:actpass\r\na=mid:0\r\na=sctp-port:5000\r\na=max-message-size:262144\r\n" }},
    [Symbol.toStringTag]: {value:"RTCSessionDescription",writable:false,enumerable:false,configurable:true},
  })
  Object.defineProperties(RTCIceCandidate.prototype, {
    candidate: {get(){ v_console_log("  [*] RTCIceCandidate -> candidate[get]", "candidate:186231839 1 udp 2113937151 686924f2-0a33-4217-af74-d1425a776bd1.local 63319 typ host generation 0 ufrag 3chg network-cost 999");return "candidate:186231839 1 udp 2113937151 686924f2-0a33-4217-af74-d1425a776bd1.local 63319 typ host generation 0 ufrag 3chg network-cost 999" }},
    [Symbol.toStringTag]: {value:"RTCIceCandidate",writable:false,enumerable:false,configurable:true},
  })
  Object.defineProperties(MimeType.prototype, {
    [Symbol.toStringTag]: {value:"MimeType",writable:false,enumerable:false,configurable:true},
  })
  Object.defineProperties(TrustedScriptURL.prototype, {
    toString: {value: v_saf(function toString(){v_console_log("  [*] TrustedScriptURL -> toString[func]", [].slice.call(arguments));})},
    [Symbol.toStringTag]: {value:"TrustedScriptURL",writable:false,enumerable:false,configurable:true},
  })
  Object.defineProperties(DOMStringList.prototype, {
    length: {get(){ v_console_log("  [*] DOMStringList -> length[get]", 0);return 0 }},
    [Symbol.toStringTag]: {value:"DOMStringList",writable:false,enumerable:false,configurable:true},
  })
  Object.defineProperties(NavigatorUAData.prototype, {
    getHighEntropyValues: {value: v_saf(function getHighEntropyValues(){v_console_log("  [*] NavigatorUAData -> getHighEntropyValues[func]", [].slice.call(arguments));})},
    brands: {get(){ v_console_log("  [*] NavigatorUAData -> brands[get]", {});return {} }},
    platform: {get(){ v_console_log("  [*] NavigatorUAData -> platform[get]", "macOS");return "macOS" }},
    [Symbol.toStringTag]: {value:"NavigatorUAData",writable:false,enumerable:false,configurable:true},
  })
  Object.defineProperties(FeaturePolicy.prototype, {
    allowsFeature: {value: v_saf(function allowsFeature(){v_console_log("  [*] FeaturePolicy -> allowsFeature[func]", [].slice.call(arguments));})},
    [Symbol.toStringTag]: {value:"FeaturePolicy",writable:false,enumerable:false,configurable:true},
  })
  Object.defineProperties(Node.prototype, {
    appendChild: {value: v_saf(function appendChild(){v_console_log("  [*] Node -> appendChild[func]", [].slice.call(arguments));})},
    parentNode: {get(){ v_console_log("  [*] Node -> parentNode[get]", {});return {} }},
    insertBefore: {value: v_saf(function insertBefore(){v_console_log("  [*] Node -> insertBefore[func]", [].slice.call(arguments));})},
    nodeType: {get(){ v_console_log("  [*] Node -> nodeType[get]", 1);return 1 }},
    ownerDocument: {get(){ v_console_log("  [*] Node -> ownerDocument[get]", {});return {} }},
    getRootNode: {value: v_saf(function getRootNode(){v_console_log("  [*] Node -> getRootNode[func]", [].slice.call(arguments));})},
    firstChild: {get(){ v_console_log("  [*] Node -> firstChild[get]", {});return {} }},
    nextSibling: {get(){ v_console_log("  [*] Node -> nextSibling[get]", {});return {} }},
    previousSibling: {get(){ v_console_log("  [*] Node -> previousSibling[get]", {});return {} }},
    nodeName: {get(){ v_console_log("  [*] Node -> nodeName[get]", "DIV");return "DIV" }},
    nodeValue: {get(){ v_console_log("  [*] Node -> nodeValue[get]", "無障礙設施");return "無障礙設施" }},
    textContent: {get(){ v_console_log("  [*] Node -> textContent[get]", "{\"rootMessageId\":\"100051355-0a98c273-491334-12653\",\"abtest_250818_IBU_commlist_1768793853618.fceaJNj1Qktf\":{\"expCode\":\"250818_IBU_commlist\",\"divisionID\":\"1768793853618.fceaJNj1Qktf\",\"version\":\"A\",\"mod\":\"31\",\"domain\":\"D\",\"layer\":\"L136495\",\"attrs\":null,\"effectTime\":\"2025-08-18 15:23:43\"},\"abtest_250902_IBU_listcoupon_1768793853618.fceaJNj1Qktf\":{\"expCode\":\"250902_IBU_listcoupon\",\"divisionID\":\"1768793853618.fceaJNj1Qktf\",\"version\":\"B\",\"mod\":\"51\",\"domain\":\"D\",\"layer\":\"L135655\",\"attrs\":null,\"effectTime\":\"2025-10-28 15:48:16\"},\"abtest_250701_IBU_NewOlT_1768793853618.fceaJNj1Qktf\":{\"expCode\":\"250701_IBU_NewOlT\",\"divisionID\":\"1768793853618.fceaJNj1Qktf\",\"version\":\"B\",\"mod\":\"26\",\"domain\":\"D\",\"layer\":\"L124070\",\"attrs\":null,\"effectTime\":\"2025-12-03 13:25:18\"},\"abtest_251017_IBU_sxhx_1768793853618.fceaJNj1Qktf\":{\"expCode\":\"251017_IBU_sxhx\",\"divisionID\":\"1768793853618.fceaJNj1Qktf\",\"version\":\"B\",\"mod\":\"55\",\"domain\":\"D\",\"layer\":\"L142956\",\"attrs\":null,\"effectTime\":\"2025-10-28 15:48:03\"},\"abtest_250904_IBU_lbybd_1768793853618.fceaJNj1Qktf\":{\"expCode\":\"250904_IBU_lbybd\",\"divisionID\":\"1768793853618.fceaJNj1Qktf\",\"version\":\"A\",\"mod\":\"49\",\"domain\":\"D\",\"layer\":\"L135998\",\"attrs\":null,\"effectTime\":\"2025-12-24 19:18:05\"},\"abtest_250807_IBU_TFLONLINE_1768793853618.fceaJNj1Qktf\":{\"expCode\":\"250807_IBU_TFLONLINE\",\"divisionID\":\"1768793853618.fceaJNj1Qktf\",\"version\":\"A\",\"mod\":\"49\",\"domain\":\"D\",\"layer\":\"L135998\",\"attrs\":null,\"effectTime\":\"2025-11-18 17:09:53\"},\"abtest_251124_IBU_nearbymap_1768793853618.fceaJNj1Qktf\":{\"expCode\":\"251124_IBU_nearbymap\",\"divisionID\":\"1768793853618.fceaJNj1Qktf\",\"version\":\"C\",\"mod\":\"67\",\"domain\":\"D\",\"layer\":\"L160337\",\"attrs\":null,\"effectTime\":\"2025-12-31 10:30:05\"},\"abtest_260106_IBU_OLM2_1768793853618.fceaJNj1Qktf\":{\"expCode\":\"260106_IBU_OLM2\",\"divisionID\":\"1768793853618.fceaJNj1Qktf\",\"version\":\"A\",\"mod\":\"38\",\"domain\":\"D\",\"layer\":\"L161485\",\"attrs\":null,\"effectTime\":\"2026-01-07 13:51:57\"},\"fetchPerf\":[{\"runningType\":\"nfes-server\",\"duration\":11,\"success\":true,\"url\":\"/restapi/soa2/34951/sdsdk\",\"serviceCode\":\"34951\",\"operation\":\"sdsdk\",\"RootMessageId\":\"100051355-0a98c273-491334-12657\",\"CLOGGING_TRACE_ID\":\"\",\"gatewayRegion\":\"\",\"statusCode\":200,\"isSOA\":true,\"requestUrl\":\"/restapi/soa2/34951/sdsdk\",\"method\":\"\",\"errorReason\":\"\",\"timeout\":30000,\"isSoaAgent\":true},{\"runningType\":\"nfes-server\",\"duration\":16,\"success\":true,\"url\":\"/restapi/soa2/34951/fetchHotelListSeo\",\"serviceCode\":\"34951\",\"operation\":\"fetchHotelListSeo\",\"RootMessageId\":\"100051355-0a98c273-491334-12658\",\"CLOGGING_TRACE_ID\":\"\",\"gatewayRegion\":\"\",\"statusCode\":200,\"isSOA\":true,\"requestUrl\":\"/restapi/soa2/34951/fetchHotelListSeo\",\"method\":\"\",\"errorReason\":\"\",\"timeout\":2000,\"isSoaAgent\":true},{\"runningType\":\"nfes-server\",\"duration\":39,\"success\":true,\"url\":\"/restapi/soa2/34951/fetchHotelListInit\",\"serviceCode\":\"34951\",\"operation\":\"fetchHotelListInit\",\"RootMessageId\":\"100051355-0a98c273-491334-12656\",\"CLOGGING_TRACE_ID\":\"\",\"gatewayRegion\":\"\",\"statusCode\":200,\"isSOA\":true,\"requestUrl\":\"/restapi/soa2/34951/fetchHotelListInit\",\"method\":\"\",\"errorReason\":\"\",\"timeout\":30000,\"isSoaAgent\":true},{\"runningType\":\"nfes-server\",\"duration\":225,\"success\":true,\"url\":\"/restapi/soa2/34951/getHotelCommonFilter\",\"serviceCode\":\"34951\",\"operation\":\"getHotelCommonFilter\",\"RootMessageId\":\"100051355-0a98c273-491334-12655\",\"CLOGGING_TRACE_ID\":\"\",\"gatewayRegion\":\"\",\"statusCode\":200,\"isSOA\":true,\"requestUrl\":\"/restapi/soa2/34951/getHotelCommonFilter\",\"method\":\"\",\"errorReason\":\"\",\"timeout\":30000,\"isSoaAgent\":true},{\"runningType\":\"nfes-server\",\"duration\":18,\"success\":true,\"url\":\"/restapi/soa2/34951/getEmergencyInfo\",\"serviceCode\":\"34951\",\"operation\":\"getEmergencyInfo\",\"RootMessageId\":\"100051355-0a98c273-491334-12661\",\"CLOGGING_TRACE_ID\":\"\",\"gatewayRegion\":\"\",\"statusCode\":200,\"isSOA\":true,\"requestUrl\":\"/restapi/soa2/34951/getEmergencyInfo\",\"method\":\"\",\"errorReason\":\"\",\"timeout\":30000,\"isSoaAgent\":true},{\"runningType\":\"nfes-server\",\"duration\":78,\"success\":true,\"url\":\"/restapi/soa2/34951/fetchMarketInfo\",\"serviceCode\":\"34951\",\"operation\":\"fetchMarketInfo\",\"RootMessageId\":\"100051355-0a98c273-491334-12662\",\"CLOGGING_TRACE_ID\":\"\",\"gatewayRegion\":\"\",\"statusCode\":200,\"isSOA\":true,\"requestUrl\":\"/restapi/soa2/34951/fetchMarketInfo\",\"method\":\"\",\"errorReason\":\"\",\"timeout\":30000,\"isSoaAgent\":true},{\"runningType\":\"nfes-server\",\"duration\":686,\"success\":true,\"url\":\"/restapi/soa2/34951/fetchHotelList\",\"serviceCode\":\"34951\",\"operation\":\"fetchHotelList\",\"RootMessageId\":\"100051355-0a98c273-491334-12660\",\"CLOGGING_TRACE_ID\":\"\",\"gatewayRegion\":\"\",\"statusCode\":200,\"isSOA\":true,\"requestUrl\":\"/restapi/soa2/34951/fetchHotelList\",\"method\":\"\",\"errorReason\":\"\",\"timeout\":30000,\"isSoaAgent\":true}]}");return "{\"rootMessageId\":\"100051355-0a98c273-491334-12653\",\"abtest_250818_IBU_commlist_1768793853618.fceaJNj1Qktf\":{\"expCode\":\"250818_IBU_commlist\",\"divisionID\":\"1768793853618.fceaJNj1Qktf\",\"version\":\"A\",\"mod\":\"31\",\"domain\":\"D\",\"layer\":\"L136495\",\"attrs\":null,\"effectTime\":\"2025-08-18 15:23:43\"},\"abtest_250902_IBU_listcoupon_1768793853618.fceaJNj1Qktf\":{\"expCode\":\"250902_IBU_listcoupon\",\"divisionID\":\"1768793853618.fceaJNj1Qktf\",\"version\":\"B\",\"mod\":\"51\",\"domain\":\"D\",\"layer\":\"L135655\",\"attrs\":null,\"effectTime\":\"2025-10-28 15:48:16\"},\"abtest_250701_IBU_NewOlT_1768793853618.fceaJNj1Qktf\":{\"expCode\":\"250701_IBU_NewOlT\",\"divisionID\":\"1768793853618.fceaJNj1Qktf\",\"version\":\"B\",\"mod\":\"26\",\"domain\":\"D\",\"layer\":\"L124070\",\"attrs\":null,\"effectTime\":\"2025-12-03 13:25:18\"},\"abtest_251017_IBU_sxhx_1768793853618.fceaJNj1Qktf\":{\"expCode\":\"251017_IBU_sxhx\",\"divisionID\":\"1768793853618.fceaJNj1Qktf\",\"version\":\"B\",\"mod\":\"55\",\"domain\":\"D\",\"layer\":\"L142956\",\"attrs\":null,\"effectTime\":\"2025-10-28 15:48:03\"},\"abtest_250904_IBU_lbybd_1768793853618.fceaJNj1Qktf\":{\"expCode\":\"250904_IBU_lbybd\",\"divisionID\":\"1768793853618.fceaJNj1Qktf\",\"version\":\"A\",\"mod\":\"49\",\"domain\":\"D\",\"layer\":\"L135998\",\"attrs\":null,\"effectTime\":\"2025-12-24 19:18:05\"},\"abtest_250807_IBU_TFLONLINE_1768793853618.fceaJNj1Qktf\":{\"expCode\":\"250807_IBU_TFLONLINE\",\"divisionID\":\"1768793853618.fceaJNj1Qktf\",\"version\":\"A\",\"mod\":\"49\",\"domain\":\"D\",\"layer\":\"L135998\",\"attrs\":null,\"effectTime\":\"2025-11-18 17:09:53\"},\"abtest_251124_IBU_nearbymap_1768793853618.fceaJNj1Qktf\":{\"expCode\":\"251124_IBU_nearbymap\",\"divisionID\":\"1768793853618.fceaJNj1Qktf\",\"version\":\"C\",\"mod\":\"67\",\"domain\":\"D\",\"layer\":\"L160337\",\"attrs\":null,\"effectTime\":\"2025-12-31 10:30:05\"},\"abtest_260106_IBU_OLM2_1768793853618.fceaJNj1Qktf\":{\"expCode\":\"260106_IBU_OLM2\",\"divisionID\":\"1768793853618.fceaJNj1Qktf\",\"version\":\"A\",\"mod\":\"38\",\"domain\":\"D\",\"layer\":\"L161485\",\"attrs\":null,\"effectTime\":\"2026-01-07 13:51:57\"},\"fetchPerf\":[{\"runningType\":\"nfes-server\",\"duration\":11,\"success\":true,\"url\":\"/restapi/soa2/34951/sdsdk\",\"serviceCode\":\"34951\",\"operation\":\"sdsdk\",\"RootMessageId\":\"100051355-0a98c273-491334-12657\",\"CLOGGING_TRACE_ID\":\"\",\"gatewayRegion\":\"\",\"statusCode\":200,\"isSOA\":true,\"requestUrl\":\"/restapi/soa2/34951/sdsdk\",\"method\":\"\",\"errorReason\":\"\",\"timeout\":30000,\"isSoaAgent\":true},{\"runningType\":\"nfes-server\",\"duration\":16,\"success\":true,\"url\":\"/restapi/soa2/34951/fetchHotelListSeo\",\"serviceCode\":\"34951\",\"operation\":\"fetchHotelListSeo\",\"RootMessageId\":\"100051355-0a98c273-491334-12658\",\"CLOGGING_TRACE_ID\":\"\",\"gatewayRegion\":\"\",\"statusCode\":200,\"isSOA\":true,\"requestUrl\":\"/restapi/soa2/34951/fetchHotelListSeo\",\"method\":\"\",\"errorReason\":\"\",\"timeout\":2000,\"isSoaAgent\":true},{\"runningType\":\"nfes-server\",\"duration\":39,\"success\":true,\"url\":\"/restapi/soa2/34951/fetchHotelListInit\",\"serviceCode\":\"34951\",\"operation\":\"fetchHotelListInit\",\"RootMessageId\":\"100051355-0a98c273-491334-12656\",\"CLOGGING_TRACE_ID\":\"\",\"gatewayRegion\":\"\",\"statusCode\":200,\"isSOA\":true,\"requestUrl\":\"/restapi/soa2/34951/fetchHotelListInit\",\"method\":\"\",\"errorReason\":\"\",\"timeout\":30000,\"isSoaAgent\":true},{\"runningType\":\"nfes-server\",\"duration\":225,\"success\":true,\"url\":\"/restapi/soa2/34951/getHotelCommonFilter\",\"serviceCode\":\"34951\",\"operation\":\"getHotelCommonFilter\",\"RootMessageId\":\"100051355-0a98c273-491334-12655\",\"CLOGGING_TRACE_ID\":\"\",\"gatewayRegion\":\"\",\"statusCode\":200,\"isSOA\":true,\"requestUrl\":\"/restapi/soa2/34951/getHotelCommonFilter\",\"method\":\"\",\"errorReason\":\"\",\"timeout\":30000,\"isSoaAgent\":true},{\"runningType\":\"nfes-server\",\"duration\":18,\"success\":true,\"url\":\"/restapi/soa2/34951/getEmergencyInfo\",\"serviceCode\":\"34951\",\"operation\":\"getEmergencyInfo\",\"RootMessageId\":\"100051355-0a98c273-491334-12661\",\"CLOGGING_TRACE_ID\":\"\",\"gatewayRegion\":\"\",\"statusCode\":200,\"isSOA\":true,\"requestUrl\":\"/restapi/soa2/34951/getEmergencyInfo\",\"method\":\"\",\"errorReason\":\"\",\"timeout\":30000,\"isSoaAgent\":true},{\"runningType\":\"nfes-server\",\"duration\":78,\"success\":true,\"url\":\"/restapi/soa2/34951/fetchMarketInfo\",\"serviceCode\":\"34951\",\"operation\":\"fetchMarketInfo\",\"RootMessageId\":\"100051355-0a98c273-491334-12662\",\"CLOGGING_TRACE_ID\":\"\",\"gatewayRegion\":\"\",\"statusCode\":200,\"isSOA\":true,\"requestUrl\":\"/restapi/soa2/34951/fetchMarketInfo\",\"method\":\"\",\"errorReason\":\"\",\"timeout\":30000,\"isSoaAgent\":true},{\"runningType\":\"nfes-server\",\"duration\":686,\"success\":true,\"url\":\"/restapi/soa2/34951/fetchHotelList\",\"serviceCode\":\"34951\",\"operation\":\"fetchHotelList\",\"RootMessageId\":\"100051355-0a98c273-491334-12660\",\"CLOGGING_TRACE_ID\":\"\",\"gatewayRegion\":\"\",\"statusCode\":200,\"isSOA\":true,\"requestUrl\":\"/restapi/soa2/34951/fetchHotelList\",\"method\":\"\",\"errorReason\":\"\",\"timeout\":30000,\"isSoaAgent\":true}]}" }},
    removeChild: {value: v_saf(function removeChild(){v_console_log("  [*] Node -> removeChild[func]", [].slice.call(arguments));})},
    parentElement: {get(){ v_console_log("  [*] Node -> parentElement[get]", {});return {} }},
    contains: {value: v_saf(function contains(){v_console_log("  [*] Node -> contains[func]", [].slice.call(arguments));})},
    isConnected: {get(){ v_console_log("  [*] Node -> isConnected[get]", true);return true }},
    childNodes: {get(){ v_console_log("  [*] Node -> childNodes[get]", {});return {} }},
    lastChild: {get(){ v_console_log("  [*] Node -> lastChild[get]", {});return {} }},
    replaceChild: {value: v_saf(function replaceChild(){v_console_log("  [*] Node -> replaceChild[func]", [].slice.call(arguments));})},
    nodeType: {"enumerable":true,"configurable":true,"get":function(){return 9},"set":function(){return true}},
    nodeName: {"enumerable":true,"configurable":true,"get":function(){return "#document"},"set":function(){return true}},
    baseURI: {"enumerable":true,"configurable":true,"get":function(){return "https://hk.trip.com/hotels/list?city=58&provinceId=0&countryId=1&checkIn=2026-01-19&checkOut=2026-01-20&lat=0&lon=0&districtId=0&barCurr=HKD&searchType=CT&searchValue=undefined&crn=1&adult=2&children=0&searchBoxArg=t&ctm_ref=ix_sb_dl&travelPurpose=0&domestic=true"},"set":function(){return true}},
    isConnected: {"enumerable":true,"configurable":true,"get":function(){return true},"set":function(){return true}},
    ELEMENT_NODE: {"value":1,"writable":false,"enumerable":true,"configurable":false},
    ATTRIBUTE_NODE: {"value":2,"writable":false,"enumerable":true,"configurable":false},
    TEXT_NODE: {"value":3,"writable":false,"enumerable":true,"configurable":false},
    CDATA_SECTION_NODE: {"value":4,"writable":false,"enumerable":true,"configurable":false},
    ENTITY_REFERENCE_NODE: {"value":5,"writable":false,"enumerable":true,"configurable":false},
    ENTITY_NODE: {"value":6,"writable":false,"enumerable":true,"configurable":false},
    PROCESSING_INSTRUCTION_NODE: {"value":7,"writable":false,"enumerable":true,"configurable":false},
    COMMENT_NODE: {"value":8,"writable":false,"enumerable":true,"configurable":false},
    DOCUMENT_NODE: {"value":9,"writable":false,"enumerable":true,"configurable":false},
    DOCUMENT_TYPE_NODE: {"value":10,"writable":false,"enumerable":true,"configurable":false},
    DOCUMENT_FRAGMENT_NODE: {"value":11,"writable":false,"enumerable":true,"configurable":false},
    NOTATION_NODE: {"value":12,"writable":false,"enumerable":true,"configurable":false},
    DOCUMENT_POSITION_DISCONNECTED: {"value":1,"writable":false,"enumerable":true,"configurable":false},
    DOCUMENT_POSITION_PRECEDING: {"value":2,"writable":false,"enumerable":true,"configurable":false},
    DOCUMENT_POSITION_FOLLOWING: {"value":4,"writable":false,"enumerable":true,"configurable":false},
    DOCUMENT_POSITION_CONTAINS: {"value":8,"writable":false,"enumerable":true,"configurable":false},
    DOCUMENT_POSITION_CONTAINED_BY: {"value":16,"writable":false,"enumerable":true,"configurable":false},
    DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC: {"value":32,"writable":false,"enumerable":true,"configurable":false},
    [Symbol.toStringTag]: {value:"Node",writable:false,enumerable:false,configurable:true},
  })
  Object.defineProperties(MessagePort.prototype, {
    onmessage: {set(){ v_console_log("  [*] MessagePort -> onmessage[set]", [].slice.call(arguments)); }},
    postMessage: {value: v_saf(function postMessage(){v_console_log("  [*] MessagePort -> postMessage[func]", [].slice.call(arguments));})},
    [Symbol.toStringTag]: {value:"MessagePort",writable:false,enumerable:false,configurable:true},
  })
  Object.defineProperties(Performance.prototype, {
    now: {value: v_saf(function now(){v_console_log("  [*] Performance -> now[func]", [].slice.call(arguments));})},
    getEntriesByName: {value: v_saf(function getEntriesByName(){v_console_log("  [*] Performance -> getEntriesByName[func]", [].slice.call(arguments));})},
    timing: {get(){ v_console_log("  [*] Performance -> timing[get]", v_new(PerformanceTiming));return v_new(PerformanceTiming) }},
    getEntriesByType: {value: v_saf(function getEntriesByType(){v_console_log("  [*] Performance -> getEntriesByType[func]", [].slice.call(arguments));if (arguments[0]=='resource'){return v_new(PerformanceResourceTiming)}})},
    clearResourceTimings: {value: v_saf(function clearResourceTimings(){v_console_log("  [*] Performance -> clearResourceTimings[func]", [].slice.call(arguments));})},
    getEntries: {value: v_saf(function getEntries(){v_console_log("  [*] Performance -> getEntries[func]", [].slice.call(arguments));})},
    timeOrigin: {get(){ v_console_log("  [*] Performance -> timeOrigin[get]", 1768802781005.6);return 1768802781005.6 }},
    timeOrigin: {"enumerable":true,"configurable":true,"get":function(){return 1768802781005.6},"set":function(){return true}},
    [Symbol.toStringTag]: {value:"Performance",writable:false,enumerable:false,configurable:true},
  })
  Object.defineProperties(UIEvent.prototype, {
    view: {get(){ v_console_log("  [*] UIEvent -> view[get]", {});return {} }},
    detail: {get(){ v_console_log("  [*] UIEvent -> detail[get]", 0);return 0 }},
    [Symbol.toStringTag]: {value:"UIEvent",writable:false,enumerable:false,configurable:true},
  })
  Object.defineProperties(PerformanceResourceTiming.prototype, {
    secureConnectionStart: {get(){ v_console_log("  [*] PerformanceResourceTiming -> secureConnectionStart[get]", 2507.7000000476837);return 2507.7000000476837 }},
    requestStart: {get(){ v_console_log("  [*] PerformanceResourceTiming -> requestStart[get]", 2511.800000011921);return 2511.800000011921 }},
    nextHopProtocol: {get(){ v_console_log("  [*] PerformanceResourceTiming -> nextHopProtocol[get]", "h2");return "h2" }},
    workerStart: {get(){ v_console_log("  [*] PerformanceResourceTiming -> workerStart[get]", 7.800000011920929);return 7.800000011920929 }},
    fetchStart: {get(){ v_console_log("  [*] PerformanceResourceTiming -> fetchStart[get]", 2636.100000023842);return 2636.100000023842 }},
    initiatorType: {get(){ v_console_log("  [*] PerformanceResourceTiming -> initiatorType[get]", "img");return "img" }},
    transferSize: {get(){ v_console_log("  [*] PerformanceResourceTiming -> transferSize[get]", 31584);return 31584 }},
    responseStart: {get(){ v_console_log("  [*] PerformanceResourceTiming -> responseStart[get]", 2275);return 2275 }},
    responseEnd: {get(){ v_console_log("  [*] PerformanceResourceTiming -> responseEnd[get]", 2596);return 2596 }},
    domainLookupEnd: {get(){ v_console_log("  [*] PerformanceResourceTiming -> domainLookupEnd[get]", 2549.7000000476837);return 2549.7000000476837 }},
    domainLookupStart: {get(){ v_console_log("  [*] PerformanceResourceTiming -> domainLookupStart[get]", 2549.7000000476837);return 2549.7000000476837 }},
    connectEnd: {get(){ v_console_log("  [*] PerformanceResourceTiming -> connectEnd[get]", 2549.7000000476837);return 2549.7000000476837 }},
    connectStart: {get(){ v_console_log("  [*] PerformanceResourceTiming -> connectStart[get]", 2549.7000000476837);return 2549.7000000476837 }},
    redirectEnd: {get(){ v_console_log("  [*] PerformanceResourceTiming -> redirectEnd[get]", 0);return 0 }},
    redirectStart: {get(){ v_console_log("  [*] PerformanceResourceTiming -> redirectStart[get]", 0);return 0 }},
    encodedBodySize: {get(){ v_console_log("  [*] PerformanceResourceTiming -> encodedBodySize[get]", 51844);return 51844 }},
    decodedBodySize: {get(){ v_console_log("  [*] PerformanceResourceTiming -> decodedBodySize[get]", 51844);return 51844 }},
    [Symbol.toStringTag]: {value:"PerformanceResourceTiming",writable:false,enumerable:false,configurable:true},
  })
  Object.defineProperties(XMLHttpRequestEventTarget.prototype, {
    onerror: {set(){ v_console_log("  [*] XMLHttpRequestEventTarget -> onerror[set]", [].slice.call(arguments)); }},
    onload: {set(){ v_console_log("  [*] XMLHttpRequestEventTarget -> onload[set]", [].slice.call(arguments)); }},
    ontimeout: {set(){ v_console_log("  [*] XMLHttpRequestEventTarget -> ontimeout[set]", [].slice.call(arguments)); }},
    onabort: {set(){ v_console_log("  [*] XMLHttpRequestEventTarget -> onabort[set]", [].slice.call(arguments)); }},
    [Symbol.toStringTag]: {value:"XMLHttpRequestEventTarget",writable:false,enumerable:false,configurable:true},
  })
  Object.defineProperties(DOMRect.prototype, {
    width: {get(){ v_console_log("  [*] DOMRect -> width[get]", 60);return 60 }},
    height: {get(){ v_console_log("  [*] DOMRect -> height[get]", 139);return 139 }},
    [Symbol.toStringTag]: {value:"DOMRect",writable:false,enumerable:false,configurable:true},
  })
  Object.defineProperties(Worker.prototype, {
    postMessage: {value: v_saf(function postMessage(){v_console_log("  [*] Worker -> postMessage[func]", [].slice.call(arguments));})},
    [Symbol.toStringTag]: {value:"Worker",writable:false,enumerable:false,configurable:true},
  })
  Object.defineProperties(Screen.prototype, {
    width: {get(){ v_console_log("  [*] Screen -> width[get]", 1440);return 1440 }},
    height: {get(){ v_console_log("  [*] Screen -> height[get]", 900);return 900 }},
    colorDepth: {get(){ v_console_log("  [*] Screen -> colorDepth[get]", 30);return 30 }},
    pixelDepth: {get(){ v_console_log("  [*] Screen -> pixelDepth[get]", 30);return 30 }},
    availWidth: {get(){ v_console_log("  [*] Screen -> availWidth[get]", 1440);return 1440 }},
    availHeight: {get(){ v_console_log("  [*] Screen -> availHeight[get]", 900);return 900 }},
    availWidth: {"enumerable":true,"configurable":true,"get":function(){return 1440},"set":function(){return true}},
    availHeight: {"enumerable":true,"configurable":true,"get":function(){return 900},"set":function(){return true}},
    width: {"enumerable":true,"configurable":true,"get":function(){return 1440},"set":function(){return true}},
    height: {"enumerable":true,"configurable":true,"get":function(){return 900},"set":function(){return true}},
    colorDepth: {"enumerable":true,"configurable":true,"get":function(){return 30},"set":function(){return true}},
    pixelDepth: {"enumerable":true,"configurable":true,"get":function(){return 30},"set":function(){return true}},
    availLeft: {"enumerable":true,"configurable":true,"get":function(){return 0},"set":function(){return true}},
    availTop: {"enumerable":true,"configurable":true,"get":function(){return 0},"set":function(){return true}},
    isExtended: {"enumerable":true,"configurable":true,"get":function(){return true},"set":function(){return true}},
    [Symbol.toStringTag]: {value:"Screen",writable:false,enumerable:false,configurable:true},
  })
  Object.defineProperties(MessageEvent.prototype, {
    data: {get(){ v_console_log("  [*] MessageEvent -> data[get]", {});return {} }},
    origin: {get(){ v_console_log("  [*] MessageEvent -> origin[get]", "https://hk.trip.com");return "https://hk.trip.com" }},
    source: {get(){ v_console_log("  [*] MessageEvent -> source[get]", {});return {} }},
    [Symbol.toStringTag]: {value:"MessageEvent",writable:false,enumerable:false,configurable:true},
  })
  Object.defineProperties(MediaQueryList.prototype, {
    matches: {get(){ v_console_log("  [*] MediaQueryList -> matches[get]", false);return false }},
    [Symbol.toStringTag]: {value:"MediaQueryList",writable:false,enumerable:false,configurable:true},
  })
  Object.defineProperties(NetworkInformation.prototype, {
    rtt: {get(){ v_console_log("  [*] NetworkInformation -> rtt[get]", 50);return 50 }},
    [Symbol.toStringTag]: {value:"NetworkInformation",writable:false,enumerable:false,configurable:true},
  })
  Object.defineProperties(RTCPeerConnection.prototype, {
    onicecandidate: {set(){ v_console_log("  [*] RTCPeerConnection -> onicecandidate[set]", [].slice.call(arguments)); }},
    createDataChannel: {value: v_saf(function createDataChannel(){v_console_log("  [*] RTCPeerConnection -> createDataChannel[func]", [].slice.call(arguments));})},
    createOffer: {value: v_saf(function createOffer(){v_console_log("  [*] RTCPeerConnection -> createOffer[func]", [].slice.call(arguments));})},
    setLocalDescription: {value: v_saf(function setLocalDescription(){v_console_log("  [*] RTCPeerConnection -> setLocalDescription[func]", [].slice.call(arguments));})},
    localDescription: {get(){ v_console_log("  [*] RTCPeerConnection -> localDescription[get]", {});return {} }},
    [Symbol.toStringTag]: {value:"RTCPeerConnection",writable:false,enumerable:false,configurable:true},
  })
  Object.defineProperties(RTCPeerConnectionIceEvent.prototype, {
    candidate: {get(){ v_console_log("  [*] RTCPeerConnectionIceEvent -> candidate[get]", {});return {} }},
    [Symbol.toStringTag]: {value:"RTCPeerConnectionIceEvent",writable:false,enumerable:false,configurable:true},
  })
  Object.defineProperties(BatteryManager.prototype, {
    charging: {get(){ v_console_log("  [*] BatteryManager -> charging[get]", true);return true }},
    level: {get(){ v_console_log("  [*] BatteryManager -> level[get]", 1);return 1 }},
    dischargingTime: {get(){ v_console_log("  [*] BatteryManager -> dischargingTime[get]", null);return null }},
    [Symbol.toStringTag]: {value:"BatteryManager",writable:false,enumerable:false,configurable:true},
  })
  Object.defineProperties(webkitRTCPeerConnection.prototype, {
    onicecandidate: {set(){ v_console_log("  [*] webkitRTCPeerConnection -> onicecandidate[set]", [].slice.call(arguments)); }},
    createDataChannel: {value: v_saf(function createDataChannel(){v_console_log("  [*] webkitRTCPeerConnection -> createDataChannel[func]", [].slice.call(arguments));})},
    createOffer: {value: v_saf(function createOffer(){v_console_log("  [*] webkitRTCPeerConnection -> createOffer[func]", [].slice.call(arguments));})},
    setLocalDescription: {value: v_saf(function setLocalDescription(){v_console_log("  [*] webkitRTCPeerConnection -> setLocalDescription[func]", [].slice.call(arguments));})},
    localDescription: {get(){ v_console_log("  [*] webkitRTCPeerConnection -> localDescription[get]", {});return {} }},
    [Symbol.toStringTag]: {value:"webkitRTCPeerConnection",writable:false,enumerable:false,configurable:true},
  })
  Object.defineProperties(Document.prototype, {
    readyState: {get(){ v_console_log("  [*] Document -> readyState[get]", "complete");return "complete" }},
    defaultView: {get(){ v_console_log("  [*] Document -> defaultView[get]", {});return {} }},
    activeElement: {get(){ v_console_log("  [*] Document -> activeElement[get]", {});return {} }},
    referrer: {get(){ v_console_log("  [*] Document -> referrer[get]", "https://hk.trip.com/?locale=zh-hk");return "https://hk.trip.com/?locale=zh-hk" }},
    createElementNS: {value: v_saf(function createElementNS(){v_console_log("  [*] Document -> createElementNS[func]", [].slice.call(arguments));})},
    createTextNode: {value: v_saf(function createTextNode(){v_console_log("  [*] Document -> createTextNode[func]", [].slice.call(arguments));})},
    visibilityState: {get(){ v_console_log("  [*] Document -> visibilityState[get]", "visible");return "visible" }},
    elementsFromPoint: {value: v_saf(function elementsFromPoint(){v_console_log("  [*] Document -> elementsFromPoint[func]", [].slice.call(arguments));})},
    wasDiscarded: {get(){ v_console_log("  [*] Document -> wasDiscarded[get]", false);return false }},
    scrollingElement: {get(){ v_console_log("  [*] Document -> scrollingElement[get]", {});return {} }},
    createEvent: {value: v_saf(function createEvent(){v_console_log("  [*] Document -> createEvent[func]", [].slice.call(arguments));})},
    charset: {get(){ v_console_log("  [*] Document -> charset[get]", "UTF-8");return "UTF-8" }},
    currentScript: {get(){ v_console_log("  [*] Document -> currentScript[get]", {});return {} }},
    hidden: {get(){ v_console_log("  [*] Document -> hidden[get]", true);return true }},
    scripts: {get(){ v_console_log("  [*] Document -> scripts[get]", {});return {} }},
    title: {get(){ v_console_log("  [*] Document -> title[get]", "香港酒店推介 - 最新香港人氣住宿預訂 - Trip.com");return "香港酒店推介 - 最新香港人氣住宿預訂 - Trip.com" }},
    all: {get(){ v_console_log("  [*] Document -> all[get]", {});return {} }},
    featurePolicy: {get(){ v_console_log("  [*] Document -> featurePolicy[get]", {});return {} }},
    characterSet: {get(){ v_console_log("  [*] Document -> characterSet[get]", "UTF-8");return "UTF-8" }},
    compatMode: {get(){ v_console_log("  [*] Document -> compatMode[get]", "CSS1Compat");return "CSS1Compat" }},
    URL: {"enumerable":true,"configurable":true,"get":function(){return "https://hk.trip.com/hotels/list?city=58&provinceId=0&countryId=1&checkIn=2026-01-19&checkOut=2026-01-20&lat=0&lon=0&districtId=0&barCurr=HKD&searchType=CT&searchValue=undefined&crn=1&adult=2&children=0&searchBoxArg=t&ctm_ref=ix_sb_dl&travelPurpose=0&domestic=true"},"set":function(){return true}},
    documentURI: {"enumerable":true,"configurable":true,"get":function(){return "https://hk.trip.com/hotels/list?city=58&provinceId=0&countryId=1&checkIn=2026-01-19&checkOut=2026-01-20&lat=0&lon=0&districtId=0&barCurr=HKD&searchType=CT&searchValue=undefined&crn=1&adult=2&children=0&searchBoxArg=t&ctm_ref=ix_sb_dl&travelPurpose=0&domestic=true"},"set":function(){return true}},
    compatMode: {"enumerable":true,"configurable":true,"get":function(){return "CSS1Compat"},"set":function(){return true}},
    characterSet: {"enumerable":true,"configurable":true,"get":function(){return "UTF-8"},"set":function(){return true}},
    charset: {"enumerable":true,"configurable":true,"get":function(){return "UTF-8"},"set":function(){return true}},
    inputEncoding: {"enumerable":true,"configurable":true,"get":function(){return "UTF-8"},"set":function(){return true}},
    contentType: {"enumerable":true,"configurable":true,"get":function(){return "text/html"},"set":function(){return true}},
    xmlStandalone: {"enumerable":true,"configurable":true,"get":function(){return false},"set":function(){return true}},
    domain: {"enumerable":true,"configurable":true,"get":function(){return "hk.trip.com"},"set":function(){return true}},
    referrer: {"enumerable":true,"configurable":true,"get":function(){return "https://hk.trip.com/?locale=zh-hk"},"set":function(){return true}},
    lastModified: {"enumerable":true,"configurable":true,"get":function(){return "01/19/2026 14:06:44"},"set":function(){return true}},
    readyState: {"enumerable":true,"configurable":true,"get":function(){return "complete"},"set":function(){return true}},
    title: {"enumerable":true,"configurable":true,"get":function(){return "香港酒店推介 - 最新香港人氣住宿預訂 - Trip.com"},"set":function(){return true}},
    dir: {"enumerable":true,"configurable":true,"get":function(){return "ltr"},"set":function(){return true}},
    designMode: {"enumerable":true,"configurable":true,"get":function(){return "off"},"set":function(){return true}},
    fgColor: {"enumerable":true,"configurable":true,"get":function(){return ""},"set":function(){return true}},
    linkColor: {"enumerable":true,"configurable":true,"get":function(){return ""},"set":function(){return true}},
    vlinkColor: {"enumerable":true,"configurable":true,"get":function(){return ""},"set":function(){return true}},
    alinkColor: {"enumerable":true,"configurable":true,"get":function(){return ""},"set":function(){return true}},
    bgColor: {"enumerable":true,"configurable":true,"get":function(){return ""},"set":function(){return true}},
    hidden: {"enumerable":true,"configurable":true,"get":function(){return true},"set":function(){return true}},
    visibilityState: {"enumerable":true,"configurable":true,"get":function(){return "hidden"},"set":function(){return true}},
    wasDiscarded: {"enumerable":true,"configurable":true,"get":function(){return false},"set":function(){return true}},
    prerendering: {"enumerable":true,"configurable":true,"get":function(){return false},"set":function(){return true}},
    webkitVisibilityState: {"enumerable":true,"configurable":true,"get":function(){return "hidden"},"set":function(){return true}},
    webkitHidden: {"enumerable":true,"configurable":true,"get":function(){return true},"set":function(){return true}},
    fullscreenEnabled: {"enumerable":true,"configurable":true,"get":function(){return true},"set":function(){return true}},
    fullscreen: {"enumerable":true,"configurable":true,"get":function(){return false},"set":function(){return true}},
    webkitIsFullScreen: {"enumerable":true,"configurable":true,"get":function(){return false},"set":function(){return true}},
    webkitFullscreenEnabled: {"enumerable":true,"configurable":true,"get":function(){return true},"set":function(){return true}},
    pictureInPictureEnabled: {"enumerable":true,"configurable":true,"get":function(){return true},"set":function(){return true}},
    childElementCount: {"enumerable":true,"configurable":true,"get":function(){return 1},"set":function(){return true}},
    [Symbol.toStringTag]: {value:"Document",writable:false,enumerable:false,configurable:true},
  })
  Object.defineProperties(Element.prototype, {
    setAttribute: {value: v_saf(function setAttribute(){v_console_log("  [*] Element -> setAttribute[func]", [].slice.call(arguments));})},
    id: {get(){ v_console_log("  [*] Element -> id[get]", "");return "" },set(){ v_console_log("  [*] Element -> id[set]", [].slice.call(arguments));return "" }},
    namespaceURI: {get(){ v_console_log("  [*] Element -> namespaceURI[get]", "http://www.w3.org/1999/xhtml");return "http://www.w3.org/1999/xhtml" }},
    tagName: {get(){ v_console_log("  [*] Element -> tagName[get]", this.v_tagName);return this.v_tagName }},
    hasAttribute: {value: v_saf(function hasAttribute(){v_console_log("  [*] Element -> hasAttribute[func]", [].slice.call(arguments));})},
    removeAttribute: {value: v_saf(function removeAttribute(){v_console_log("  [*] Element -> removeAttribute[func]", [].slice.call(arguments));})},
    querySelectorAll: {value: v_saf(function querySelectorAll(){v_console_log("  [*] Element -> querySelectorAll[func]", [].slice.call(arguments));})},
    getBoundingClientRect: {value: v_saf(function getBoundingClientRect(){v_console_log("  [*] Element -> getBoundingClientRect[func]", [].slice.call(arguments));})},
    clientWidth: {get(){ v_console_log("  [*] Element -> clientWidth[get]", 1440);return 1440 }},
    querySelector: {value: v_saf(function querySelector(){v_console_log("  [*] Element -> querySelector[func]", [].slice.call(arguments));})},
    classList: {get(){ v_console_log("  [*] Element -> classList[get]", {});return {} }},
    getAttribute: {value: v_saf(function getAttribute(){v_console_log("  [*] Element -> getAttribute[func]", [].slice.call(arguments));})},
    clientHeight: {get(){ v_console_log("  [*] Element -> clientHeight[get]", 360);return 360 }},
    className: {get(){ v_console_log("  [*] Element -> className[get]", "");return "" },set(){ v_console_log("  [*] Element -> className[set]", [].slice.call(arguments));return "" }},
    children: {get(){ v_console_log("  [*] Element -> children[get]", {});return {} }},
    scrollLeft: {get(){ v_console_log("  [*] Element -> scrollLeft[get]", 0);return 0 }},
    scrollTop: {get(){ v_console_log("  [*] Element -> scrollTop[get]", 0);return 0 }},
    remove: {value: v_saf(function remove(){v_console_log("  [*] Element -> remove[func]", [].slice.call(arguments));})},
    shadowRoot: {get(){ v_console_log("  [*] Element -> shadowRoot[get]", {});return {} }},
    scrollHeight: {get(){ v_console_log("  [*] Element -> scrollHeight[get]", 3575);return 3575 }},
    setAttributeNS: {value: v_saf(function setAttributeNS(){v_console_log("  [*] Element -> setAttributeNS[func]", [].slice.call(arguments));})},
    append: {value: v_saf(function append(){v_console_log("  [*] Element -> append[func]", [].slice.call(arguments));})},
    getElementsByTagName: {value: v_saf(function getElementsByTagName(){v_console_log("  [*] Element -> getElementsByTagName[func]", [].slice.call(arguments));})},
    scrollWidth: {get(){ v_console_log("  [*] Element -> scrollWidth[get]", 1440);return 1440 }},
    [Symbol.toStringTag]: {value:"Element",writable:false,enumerable:false,configurable:true},
  })
  Object.defineProperties(MouseEvent.prototype, {
    toElement: {get(){ v_console_log("  [*] MouseEvent -> toElement[get]", {});return {} }},
    fromElement: {get(){ v_console_log("  [*] MouseEvent -> fromElement[get]", {});return {} }},
    buttons: {get(){ v_console_log("  [*] MouseEvent -> buttons[get]", 0);return 0 }},
    [Symbol.toStringTag]: {value:"MouseEvent",writable:false,enumerable:false,configurable:true},
  })
  Object.defineProperties(CharacterData.prototype, {
    data: {get(){ v_console_log("  [*] CharacterData -> data[get]", "/$");return "/$" }},
    [Symbol.toStringTag]: {value:"CharacterData",writable:false,enumerable:false,configurable:true},
  })
  Object.defineProperties(XMLHttpRequest.prototype, {
    OPENED: {"value":1,"writable":false,"enumerable":true,"configurable":false},
    HEADERS_RECEIVED: {"value":2,"writable":false,"enumerable":true,"configurable":false},
    LOADING: {"value":3,"writable":false,"enumerable":true,"configurable":false},
    DONE: {"value":4,"writable":false,"enumerable":true,"configurable":false},
    [Symbol.toStringTag]: {value:"XMLHttpRequest",writable:false,enumerable:false,configurable:true},
  })
  Object.defineProperties(PerformanceNavigationTiming.prototype, {
    unloadEventStart: {get(){ v_console_log("  [*] PerformanceNavigationTiming -> unloadEventStart[get]", 1521.9000000357628);return 1521.9000000357628 }},
    unloadEventEnd: {get(){ v_console_log("  [*] PerformanceNavigationTiming -> unloadEventEnd[get]", 1521.9000000357628);return 1521.9000000357628 }},
    domInteractive: {get(){ v_console_log("  [*] PerformanceNavigationTiming -> domInteractive[get]", 2582.100000023842);return 2582.100000023842 }},
    domContentLoadedEventStart: {get(){ v_console_log("  [*] PerformanceNavigationTiming -> domContentLoadedEventStart[get]", 2582.100000023842);return 2582.100000023842 }},
    domContentLoadedEventEnd: {get(){ v_console_log("  [*] PerformanceNavigationTiming -> domContentLoadedEventEnd[get]", 2582.7000000476837);return 2582.7000000476837 }},
    domComplete: {get(){ v_console_log("  [*] PerformanceNavigationTiming -> domComplete[get]", 3484);return 3484 }},
    loadEventStart: {get(){ v_console_log("  [*] PerformanceNavigationTiming -> loadEventStart[get]", 3484);return 3484 }},
    loadEventEnd: {get(){ v_console_log("  [*] PerformanceNavigationTiming -> loadEventEnd[get]", 0);return 0 }},
    type: {get(){ v_console_log("  [*] PerformanceNavigationTiming -> type[get]", "reload");return "reload" }},
    [Symbol.toStringTag]: {value:"PerformanceNavigationTiming",writable:false,enumerable:false,configurable:true},
  })
  Object.defineProperties(HTMLElement.prototype, {
    onload: {get(){ v_console_log("  [*] HTMLElement -> onload[get]", {});return {} },set(){ v_console_log("  [*] HTMLElement -> onload[set]", [].slice.call(arguments));return {} }},
    onerror: {get(){ v_console_log("  [*] HTMLElement -> onerror[get]", {});return {} },set(){ v_console_log("  [*] HTMLElement -> onerror[set]", [].slice.call(arguments));return {} }},
    onclick: {set(){ v_console_log("  [*] HTMLElement -> onclick[set]", [].slice.call(arguments));return {} }},
    contentEditable: {get(){ v_console_log("  [*] HTMLElement -> contentEditable[get]", "inherit");return "inherit" }},
    dataset: {get(){ v_console_log("  [*] HTMLElement -> dataset[get]", {});return {} }},
    onabort: {set(){ v_console_log("  [*] HTMLElement -> onabort[set]", [].slice.call(arguments));return {} }},
    innerText: {get(){ v_console_log("  [*] HTMLElement -> innerText[get]", "香港悦品度假酒店（屯門）\n8.6/10\n很好10,218則評價\n\"交通便利\"\n\"近地鐵站\"\n鄰近屯門地鐵站查看地圖\n高級客房（隨機房型）\n/\n此價格只剩3間\n特別優惠\n-5%\nHK$433\nHK$409\n\n總額（連稅及附加費）：HK$462\n\n查看房間供應\n香港麗豪酒店\n8.0/10\n很好11,637則評價\n\"泳池乾淨\"\n\"泳池一流\"\n鄰近新城市廣場（沙田）沙田查看地圖\n標準客房(雙人大床)\n賺取 HK$9.19 Trip Coins\n最新訂單：27分鐘前\nHK$810\n\n總額（連稅及附加費）：HK$915\n\n查看房間供應\n登入以查看會員價格\n歡迎！預訂住宿即享10%優惠！\n\n獲取優惠代碼，節省高達 10%\n\n下載 App，獲取另一個優惠代碼，節省5%（最多 HK$50）\n\n使用您的優惠代碼\n\n領取優惠\n香港帝都酒店\n9.3/10\n非常好6,220則評價\n\"交通便利\"\n\"購物方便\"\n鄰近沙田沙田查看地圖\n標準客房\n/\n最新訂單：22分鐘前\n限時優惠\n-24%\nHK$1,290\nHK$945\n\n總額（連稅及附加費）：HK$1,067\n\n查看房間供應\n荃灣西如心酒店\n8.8/10\n很好15,056則評價\n\"交通便利\"\n\"房間很大\"\n鄰近荃灣西地鐵站荃灣查看地圖\n豪華城景特大床客房 - 高座\n最新訂單：1分鐘前\nHK$1,008\n\n總額（連稅及附加費）：HK$1,139\n\n查看房間供應\n香港悦品海景酒店\n8.0/10\n很好7,577則評價\n\"無敵海景\"\n\"交通便利\"\n鄰近牛頭角地鐵站觀塘查看地圖\n高級悦品雙床房\n此價格只剩3間\n特別優惠\n-13%\nHK$560\nHK$479\n\n總額（連稅及附加費）：HK$541\n\n查看房間供應\n香港麗思卡爾頓酒店\n廣告\n9.5/10\n優秀1,653則評價\n\"無敵海景\"\n\"早餐一流\"\n鄰近香港西九龍站西九龍查看地圖\n2026 Asia 100 – 靚景酒店\n豪華雙床房\n賺取 HK$41.86 Trip Coins\n最新訂單：28分鐘前\nHK$3,700\n\n總額（連稅及附加費）：HK$4,181\n\n查看房間供應\n香港嘉湖海逸酒店\n8.4/10\n很好10,438則評價\n\"交通便利\"\n\"房間很大\"\n鄰近天水圍查看地圖\n標準大床房\n最新訂單：11分鐘前\n特別優惠\n-5%\nHK$526\nHK$499\n\n總額（連稅及附加費）：HK$564\n\n查看房間供應\n香港港島海逸君綽酒店\n8.8/10\n很好4,506則評價\n\"無敵海景\"\n\"交通便利\"\n鄰近北角北角/鰂魚涌查看地圖\n香港島豪華酒店第18名\n高級海景客房\n/\n此價格只剩1間\nHK$977\n\n總額（連稅及附加費）：HK$1,104\n\n查看房間供應\nYX 酒店-荔枝角\n8.3/10\n很好1,905則評價\n\"交通便利\"\n\"近地鐵站\"\n鄰近荔枝角地鐵站荃灣查看地圖\n標準客房\n/\n最新訂單：17分鐘前\nHK$514\n\n總額（連稅及附加費）：HK$580\n\n查看房間供應\n香港皇家太平洋酒店\n8.8/10\n很好9,694則評價\n\"交通便利\"\n\"購物方便\"\n鄰近海港城（港威商場）尖沙咀查看地圖\n香港精選4星級酒店第6名\n雅尚客房\n/\n最新訂單：2分鐘前\nHK$992\n\n總額（連稅及附加費）：HK$1,121\n\n查看房間供應\n香港W酒店\n廣告\n9.3/10\n非常好2,060則評價\n\"交通便利\"\n\"無敵海景\"\n鄰近香港西九龍站西九龍查看地圖\n2026 China 100 – 奢華酒店\n奇妙大床房\n賺取 HK$28.29 Trip Coins\n最新訂單：15分鐘前\nHK$2,500\n\n總額（連稅及附加費）：HK$2,825\n\n查看房間供應\n饒宗頤文化館 - 翠雅山房\n8.3/10\n很好763則評價\n\"環境優雅\"\n\"安靜舒適\"\n鄰近饒宗頤文化館荃灣查看地圖\n標準大床房\n最新訂單：12小時前\n限時優惠\n-8%\nHK$454\nHK$414\n\n總額（連稅及附加費）：HK$456\n\n查看房間供應");return "香港悦品度假酒店（屯門）\n8.6/10\n很好10,218則評價\n\"交通便利\"\n\"近地鐵站\"\n鄰近屯門地鐵站查看地圖\n高級客房（隨機房型）\n/\n此價格只剩3間\n特別優惠\n-5%\nHK$433\nHK$409\n\n總額（連稅及附加費）：HK$462\n\n查看房間供應\n香港麗豪酒店\n8.0/10\n很好11,637則評價\n\"泳池乾淨\"\n\"泳池一流\"\n鄰近新城市廣場（沙田）沙田查看地圖\n標準客房(雙人大床)\n賺取 HK$9.19 Trip Coins\n最新訂單：27分鐘前\nHK$810\n\n總額（連稅及附加費）：HK$915\n\n查看房間供應\n登入以查看會員價格\n歡迎！預訂住宿即享10%優惠！\n\n獲取優惠代碼，節省高達 10%\n\n下載 App，獲取另一個優惠代碼，節省5%（最多 HK$50）\n\n使用您的優惠代碼\n\n領取優惠\n香港帝都酒店\n9.3/10\n非常好6,220則評價\n\"交通便利\"\n\"購物方便\"\n鄰近沙田沙田查看地圖\n標準客房\n/\n最新訂單：22分鐘前\n限時優惠\n-24%\nHK$1,290\nHK$945\n\n總額（連稅及附加費）：HK$1,067\n\n查看房間供應\n荃灣西如心酒店\n8.8/10\n很好15,056則評價\n\"交通便利\"\n\"房間很大\"\n鄰近荃灣西地鐵站荃灣查看地圖\n豪華城景特大床客房 - 高座\n最新訂單：1分鐘前\nHK$1,008\n\n總額（連稅及附加費）：HK$1,139\n\n查看房間供應\n香港悦品海景酒店\n8.0/10\n很好7,577則評價\n\"無敵海景\"\n\"交通便利\"\n鄰近牛頭角地鐵站觀塘查看地圖\n高級悦品雙床房\n此價格只剩3間\n特別優惠\n-13%\nHK$560\nHK$479\n\n總額（連稅及附加費）：HK$541\n\n查看房間供應\n香港麗思卡爾頓酒店\n廣告\n9.5/10\n優秀1,653則評價\n\"無敵海景\"\n\"早餐一流\"\n鄰近香港西九龍站西九龍查看地圖\n2026 Asia 100 – 靚景酒店\n豪華雙床房\n賺取 HK$41.86 Trip Coins\n最新訂單：28分鐘前\nHK$3,700\n\n總額（連稅及附加費）：HK$4,181\n\n查看房間供應\n香港嘉湖海逸酒店\n8.4/10\n很好10,438則評價\n\"交通便利\"\n\"房間很大\"\n鄰近天水圍查看地圖\n標準大床房\n最新訂單：11分鐘前\n特別優惠\n-5%\nHK$526\nHK$499\n\n總額（連稅及附加費）：HK$564\n\n查看房間供應\n香港港島海逸君綽酒店\n8.8/10\n很好4,506則評價\n\"無敵海景\"\n\"交通便利\"\n鄰近北角北角/鰂魚涌查看地圖\n香港島豪華酒店第18名\n高級海景客房\n/\n此價格只剩1間\nHK$977\n\n總額（連稅及附加費）：HK$1,104\n\n查看房間供應\nYX 酒店-荔枝角\n8.3/10\n很好1,905則評價\n\"交通便利\"\n\"近地鐵站\"\n鄰近荔枝角地鐵站荃灣查看地圖\n標準客房\n/\n最新訂單：17分鐘前\nHK$514\n\n總額（連稅及附加費）：HK$580\n\n查看房間供應\n香港皇家太平洋酒店\n8.8/10\n很好9,694則評價\n\"交通便利\"\n\"購物方便\"\n鄰近海港城（港威商場）尖沙咀查看地圖\n香港精選4星級酒店第6名\n雅尚客房\n/\n最新訂單：2分鐘前\nHK$992\n\n總額（連稅及附加費）：HK$1,121\n\n查看房間供應\n香港W酒店\n廣告\n9.3/10\n非常好2,060則評價\n\"交通便利\"\n\"無敵海景\"\n鄰近香港西九龍站西九龍查看地圖\n2026 China 100 – 奢華酒店\n奇妙大床房\n賺取 HK$28.29 Trip Coins\n最新訂單：15分鐘前\nHK$2,500\n\n總額（連稅及附加費）：HK$2,825\n\n查看房間供應\n饒宗頤文化館 - 翠雅山房\n8.3/10\n很好763則評價\n\"環境優雅\"\n\"安靜舒適\"\n鄰近饒宗頤文化館荃灣查看地圖\n標準大床房\n最新訂單：12小時前\n限時優惠\n-8%\nHK$454\nHK$414\n\n總額（連稅及附加費）：HK$456\n\n查看房間供應" }},
    tabIndex: {set(){ v_console_log("  [*] HTMLElement -> tabIndex[set]", [].slice.call(arguments));return "香港悦品度假酒店（屯門）\n8.6/10\n很好10,218則評價\n\"交通便利\"\n\"近地鐵站\"\n鄰近屯門地鐵站查看地圖\n高級客房（隨機房型）\n/\n此價格只剩3間\n特別優惠\n-5%\nHK$433\nHK$409\n\n總額（連稅及附加費）：HK$462\n\n查看房間供應\n香港麗豪酒店\n8.0/10\n很好11,637則評價\n\"泳池乾淨\"\n\"泳池一流\"\n鄰近新城市廣場（沙田）沙田查看地圖\n標準客房(雙人大床)\n賺取 HK$9.19 Trip Coins\n最新訂單：27分鐘前\nHK$810\n\n總額（連稅及附加費）：HK$915\n\n查看房間供應\n登入以查看會員價格\n歡迎！預訂住宿即享10%優惠！\n\n獲取優惠代碼，節省高達 10%\n\n下載 App，獲取另一個優惠代碼，節省5%（最多 HK$50）\n\n使用您的優惠代碼\n\n領取優惠\n香港帝都酒店\n9.3/10\n非常好6,220則評價\n\"交通便利\"\n\"購物方便\"\n鄰近沙田沙田查看地圖\n標準客房\n/\n最新訂單：22分鐘前\n限時優惠\n-24%\nHK$1,290\nHK$945\n\n總額（連稅及附加費）：HK$1,067\n\n查看房間供應\n荃灣西如心酒店\n8.8/10\n很好15,056則評價\n\"交通便利\"\n\"房間很大\"\n鄰近荃灣西地鐵站荃灣查看地圖\n豪華城景特大床客房 - 高座\n最新訂單：1分鐘前\nHK$1,008\n\n總額（連稅及附加費）：HK$1,139\n\n查看房間供應\n香港悦品海景酒店\n8.0/10\n很好7,577則評價\n\"無敵海景\"\n\"交通便利\"\n鄰近牛頭角地鐵站觀塘查看地圖\n高級悦品雙床房\n此價格只剩3間\n特別優惠\n-13%\nHK$560\nHK$479\n\n總額（連稅及附加費）：HK$541\n\n查看房間供應\n香港麗思卡爾頓酒店\n廣告\n9.5/10\n優秀1,653則評價\n\"無敵海景\"\n\"早餐一流\"\n鄰近香港西九龍站西九龍查看地圖\n2026 Asia 100 – 靚景酒店\n豪華雙床房\n賺取 HK$41.86 Trip Coins\n最新訂單：28分鐘前\nHK$3,700\n\n總額（連稅及附加費）：HK$4,181\n\n查看房間供應\n香港嘉湖海逸酒店\n8.4/10\n很好10,438則評價\n\"交通便利\"\n\"房間很大\"\n鄰近天水圍查看地圖\n標準大床房\n最新訂單：11分鐘前\n特別優惠\n-5%\nHK$526\nHK$499\n\n總額（連稅及附加費）：HK$564\n\n查看房間供應\n香港港島海逸君綽酒店\n8.8/10\n很好4,506則評價\n\"無敵海景\"\n\"交通便利\"\n鄰近北角北角/鰂魚涌查看地圖\n香港島豪華酒店第18名\n高級海景客房\n/\n此價格只剩1間\nHK$977\n\n總額（連稅及附加費）：HK$1,104\n\n查看房間供應\nYX 酒店-荔枝角\n8.3/10\n很好1,905則評價\n\"交通便利\"\n\"近地鐵站\"\n鄰近荔枝角地鐵站荃灣查看地圖\n標準客房\n/\n最新訂單：17分鐘前\nHK$514\n\n總額（連稅及附加費）：HK$580\n\n查看房間供應\n香港皇家太平洋酒店\n8.8/10\n很好9,694則評價\n\"交通便利\"\n\"購物方便\"\n鄰近海港城（港威商場）尖沙咀查看地圖\n香港精選4星級酒店第6名\n雅尚客房\n/\n最新訂單：2分鐘前\nHK$992\n\n總額（連稅及附加費）：HK$1,121\n\n查看房間供應\n香港W酒店\n廣告\n9.3/10\n非常好2,060則評價\n\"交通便利\"\n\"無敵海景\"\n鄰近香港西九龍站西九龍查看地圖\n2026 China 100 – 奢華酒店\n奇妙大床房\n賺取 HK$28.29 Trip Coins\n最新訂單：15分鐘前\nHK$2,500\n\n總額（連稅及附加費）：HK$2,825\n\n查看房間供應\n饒宗頤文化館 - 翠雅山房\n8.3/10\n很好763則評價\n\"環境優雅\"\n\"安靜舒適\"\n鄰近饒宗頤文化館荃灣查看地圖\n標準大床房\n最新訂單：12小時前\n限時優惠\n-8%\nHK$454\nHK$414\n\n總額（連稅及附加費）：HK$456\n\n查看房間供應" }},
    offsetHeight: {get(){ v_console_log("  [*] HTMLElement -> offsetHeight[get]", 24);return 24 }},
    nonce: {get(){ v_console_log("  [*] HTMLElement -> nonce[get]", "");return "" }},
    title: {set(){ v_console_log("  [*] HTMLElement -> title[set]", [].slice.call(arguments));return "" }},
    [Symbol.toStringTag]: {value:"HTMLElement",writable:false,enumerable:false,configurable:true},
  })
  Object.defineProperties(PointerEvent.prototype, {
    pointerId: {get(){ v_console_log("  [*] PointerEvent -> pointerId[get]", 1);return 1 }},
    width: {get(){ v_console_log("  [*] PointerEvent -> width[get]", 1);return 1 }},
    height: {get(){ v_console_log("  [*] PointerEvent -> height[get]", 1);return 1 }},
    pressure: {get(){ v_console_log("  [*] PointerEvent -> pressure[get]", 0);return 0 }},
    tangentialPressure: {get(){ v_console_log("  [*] PointerEvent -> tangentialPressure[get]", 0);return 0 }},
    tiltX: {get(){ v_console_log("  [*] PointerEvent -> tiltX[get]", 0);return 0 }},
    tiltY: {get(){ v_console_log("  [*] PointerEvent -> tiltY[get]", 0);return 0 }},
    twist: {get(){ v_console_log("  [*] PointerEvent -> twist[get]", 0);return 0 }},
    pointerType: {get(){ v_console_log("  [*] PointerEvent -> pointerType[get]", "mouse");return "mouse" }},
    isPrimary: {get(){ v_console_log("  [*] PointerEvent -> isPrimary[get]", true);return true }},
    [Symbol.toStringTag]: {value:"PointerEvent",writable:false,enumerable:false,configurable:true},
  })
  Object.defineProperties(SVGElement.prototype, {
    style: {get(){ v_console_log("  [*] SVGElement -> style[get]", ); }},
    [Symbol.toStringTag]: {value:"SVGElement",writable:false,enumerable:false,configurable:true},
  })
  Object.defineProperties(HTMLCanvasElement.prototype, {
    getContext: {value: v_saf(function getContext(){v_console_log("  [*] HTMLCanvasElement -> getContext[func]", [].slice.call(arguments));if (arguments[0]=='2d'){var r = v_new(CanvasRenderingContext2D); return r}; if (arguments[0]=='webgl' || arguments[0]=='experimental-webgl'){var r = v_new(WebGLRenderingContext); r._canvas = this; return r}; return null})},
    width: {get(){ v_console_log("  [*] HTMLCanvasElement -> width[get]", 300);return 300 },set(){ v_console_log("  [*] HTMLCanvasElement -> width[set]", [].slice.call(arguments));return 300 }},
    height: {get(){ v_console_log("  [*] HTMLCanvasElement -> height[get]", 150);return 150 },set(){ v_console_log("  [*] HTMLCanvasElement -> height[set]", [].slice.call(arguments));return 150 }},
    [Symbol.toStringTag]: {value:"HTMLCanvasElement",writable:false,enumerable:false,configurable:true},
  })
  Object.defineProperties(HTMLScriptElement.prototype, {
    src: {get(){ v_console_log("  [*] HTMLScriptElement -> src[get]", "https://aw-s.tripcdn.com/NFES/trip-online-search/1768381969121/_next/static/chunks/app/list/page-98ed0f63b11f7aff.js");return "https://aw-s.tripcdn.com/NFES/trip-online-search/1768381969121/_next/static/chunks/app/list/page-98ed0f63b11f7aff.js" },set(){ v_console_log("  [*] HTMLScriptElement -> src[set]", [].slice.call(arguments));return "https://aw-s.tripcdn.com/NFES/trip-online-search/1768381969121/_next/static/chunks/app/list/page-98ed0f63b11f7aff.js" }},
    type: {get(){ v_console_log("  [*] HTMLScriptElement -> type[get]", "text/gtmscript");return "text/gtmscript" },set(){ v_console_log("  [*] HTMLScriptElement -> type[set]", [].slice.call(arguments));return "text/gtmscript" }},
    async: {set(){ v_console_log("  [*] HTMLScriptElement -> async[set]", [].slice.call(arguments));return "text/gtmscript" }},
    crossOrigin: {set(){ v_console_log("  [*] HTMLScriptElement -> crossOrigin[set]", [].slice.call(arguments));return "text/gtmscript" }},
    charset: {get(){ v_console_log("  [*] HTMLScriptElement -> charset[get]", "");return "" },set(){ v_console_log("  [*] HTMLScriptElement -> charset[set]", [].slice.call(arguments));return "" }},
    defer: {set(){ v_console_log("  [*] HTMLScriptElement -> defer[set]", [].slice.call(arguments));return "" }},
    text: {get(){ v_console_log("  [*] HTMLScriptElement -> text[get]", "if(!wcs_add)var wcs_add={};wcs_add.wa=\"s_33fb334966e9\";if(!_nasa)var _nasa={};window.wcs&&(wcs.inflow(\"trip.com\"),wcs_do(_nasa));");return "if(!wcs_add)var wcs_add={};wcs_add.wa=\"s_33fb334966e9\";if(!_nasa)var _nasa={};window.wcs&&(wcs.inflow(\"trip.com\"),wcs_do(_nasa));" },set(){ v_console_log("  [*] HTMLScriptElement -> text[set]", [].slice.call(arguments));return "if(!wcs_add)var wcs_add={};wcs_add.wa=\"s_33fb334966e9\";if(!_nasa)var _nasa={};window.wcs&&(wcs.inflow(\"trip.com\"),wcs_do(_nasa));" }},
    [Symbol.toStringTag]: {value:"HTMLScriptElement",writable:false,enumerable:false,configurable:true},
  })
  Object.defineProperties(HTMLLinkElement.prototype, {
    relList: {get(){ v_console_log("  [*] HTMLLinkElement -> relList[get]", {});return {} }},
    rel: {get(){ v_console_log("  [*] HTMLLinkElement -> rel[get]", "alternate");return "alternate" }},
    type: {set(){ v_console_log("  [*] HTMLLinkElement -> type[set]", [].slice.call(arguments));return "alternate" }},
    href: {get(){ v_console_log("  [*] HTMLLinkElement -> href[get]", "https://aw-s.tripcdn.com/NFES/trip-online-search/1768381969121/_next/static/css/c7df37b0157b95e3.css");return "https://aw-s.tripcdn.com/NFES/trip-online-search/1768381969121/_next/static/css/c7df37b0157b95e3.css" },set(){ v_console_log("  [*] HTMLLinkElement -> href[set]", [].slice.call(arguments));return "https://aw-s.tripcdn.com/NFES/trip-online-search/1768381969121/_next/static/css/c7df37b0157b95e3.css" }},
    crossOrigin: {set(){ v_console_log("  [*] HTMLLinkElement -> crossOrigin[set]", [].slice.call(arguments));return "https://aw-s.tripcdn.com/NFES/trip-online-search/1768381969121/_next/static/css/c7df37b0157b95e3.css" }},
    media: {set(){ v_console_log("  [*] HTMLLinkElement -> media[set]", [].slice.call(arguments));return "https://aw-s.tripcdn.com/NFES/trip-online-search/1768381969121/_next/static/css/c7df37b0157b95e3.css" }},
    [Symbol.toStringTag]: {value:"HTMLLinkElement",writable:false,enumerable:false,configurable:true},
  })
  Object.defineProperties(HTMLInputElement.prototype, {
    type: {get(){ v_console_log("  [*] HTMLInputElement -> type[get]", "hidden");return "hidden" }},
    value: {get(){ v_console_log("  [*] HTMLInputElement -> value[get]", "M:31,250818_IBU_commlist:A;M:51,250902_IBU_listcoupon:B;M:26,250701_IBU_NewOlT:B;M:55,251017_IBU_sxhx:B;M:49,250904_IBU_lbybd:A;M:49,250807_IBU_TFLONLINE:A;M:67,251124_IBU_nearbymap:C;M:38,260106_IBU_OLM2:A;M:65,250805_IBU_OLrestruct:E");return "M:31,250818_IBU_commlist:A;M:51,250902_IBU_listcoupon:B;M:26,250701_IBU_NewOlT:B;M:55,251017_IBU_sxhx:B;M:49,250904_IBU_lbybd:A;M:49,250807_IBU_TFLONLINE:A;M:67,251124_IBU_nearbymap:C;M:38,260106_IBU_OLM2:A;M:65,250805_IBU_OLrestruct:E" }},
    defaultValue: {get(){ v_console_log("  [*] HTMLInputElement -> defaultValue[get]", "香港");return "香港" },set(){ v_console_log("  [*] HTMLInputElement -> defaultValue[set]", [].slice.call(arguments));return "香港" }},
    name: {get(){ v_console_log("  [*] HTMLInputElement -> name[get]", "");return "" }},
    defaultChecked: {set(){ v_console_log("  [*] HTMLInputElement -> defaultChecked[set]", [].slice.call(arguments));return "" }},
    [Symbol.toStringTag]: {value:"HTMLInputElement",writable:false,enumerable:false,configurable:true},
  })
  Object.defineProperties(HTMLTextAreaElement.prototype, {
    type: {get(){ v_console_log("  [*] HTMLTextAreaElement -> type[get]", "textarea");return "textarea" }},
    value: {get(){ v_console_log("  [*] HTMLTextAreaElement -> value[get]", "");return "" }},
    defaultValue: {get(){ v_console_log("  [*] HTMLTextAreaElement -> defaultValue[get]", "");return "" }},
    [Symbol.toStringTag]: {value:"HTMLTextAreaElement",writable:false,enumerable:false,configurable:true},
  })
  Object.defineProperties(HTMLIFrameElement.prototype, {
    contentWindow: {get(){ v_console_log("  [*] HTMLIFrameElement -> contentWindow[get]", {});return {} }},
    src: {set(){ v_console_log("  [*] HTMLIFrameElement -> src[set]", [].slice.call(arguments));return {} }},
    frameBorder: {set(){ v_console_log("  [*] HTMLIFrameElement -> frameBorder[set]", [].slice.call(arguments));return {} }},
    contentDocument: {get(){ v_console_log("  [*] HTMLIFrameElement -> contentDocument[get]", {});return {} }},
    height: {set(){ v_console_log("  [*] HTMLIFrameElement -> height[set]", [].slice.call(arguments));return {} }},
    width: {set(){ v_console_log("  [*] HTMLIFrameElement -> width[set]", [].slice.call(arguments));return {} }},
    [Symbol.toStringTag]: {value:"HTMLIFrameElement",writable:false,enumerable:false,configurable:true},
  })
  Object.defineProperties(HTMLImageElement.prototype, {
    src: {set(){ v_console_log("  [*] HTMLImageElement -> src[set]", [].slice.call(arguments)); }},
    width: {get(){ v_console_log("  [*] HTMLImageElement -> width[get]", 600);return 600 }},
    height: {get(){ v_console_log("  [*] HTMLImageElement -> height[get]", 600);return 600 }},
    naturalWidth: {get(){ v_console_log("  [*] HTMLImageElement -> naturalWidth[get]", 600);return 600 }},
    naturalHeight: {get(){ v_console_log("  [*] HTMLImageElement -> naturalHeight[get]", 600);return 600 }},
    referrerPolicy: {set(){ v_console_log("  [*] HTMLImageElement -> referrerPolicy[set]", [].slice.call(arguments));return 600 }},
    [Symbol.toStringTag]: {value:"HTMLImageElement",writable:false,enumerable:false,configurable:true},
  })
  Object.defineProperties(HTMLStyleElement.prototype, {
    type: {set(){ v_console_log("  [*] HTMLStyleElement -> type[set]", [].slice.call(arguments)); }},
    [Symbol.toStringTag]: {value:"HTMLStyleElement",writable:false,enumerable:false,configurable:true},
  })
  Object.defineProperties(HTMLAnchorElement.prototype, {
    [Symbol.toStringTag]: {value:"HTMLAnchorElement",writable:false,enumerable:false,configurable:true},
  })
  Object.defineProperties(HTMLMetaElement.prototype, {
    content: {get(){ v_console_log("  [*] HTMLMetaElement -> content[get]", "香港飯店, 香港, 預訂飯店, 住宿, 平價飯店, 飯店, Trip.com");return "香港飯店, 香港, 預訂飯店, 住宿, 平價飯店, 飯店, Trip.com" }},
    [Symbol.toStringTag]: {value:"HTMLMetaElement",writable:false,enumerable:false,configurable:true},
  })
  Object.defineProperties(Window.prototype, {
    PERSISTENT: {"value":1,"writable":false,"enumerable":true,"configurable":false},
    [Symbol.toStringTag]: {value:"Window",writable:false,enumerable:false,configurable:true},
  })
  Object.defineProperties(HTMLDocument.prototype, {
    [Symbol.toStringTag]: {value:"HTMLDocument",writable:false,enumerable:false,configurable:true},
  })
  Object.defineProperties(HTMLHtmlElement.prototype, {
    [Symbol.toStringTag]: {value:"HTMLHtmlElement",writable:false,enumerable:false,configurable:true},
  })
  Object.defineProperties(HTMLHeadElement.prototype, {
    [Symbol.toStringTag]: {value:"HTMLHeadElement",writable:false,enumerable:false,configurable:true},
  })
  Object.defineProperties(HTMLBodyElement.prototype, {
    [Symbol.toStringTag]: {value:"HTMLBodyElement",writable:false,enumerable:false,configurable:true},
  })
  Object.defineProperties(Location.prototype, {
    [Symbol.toStringTag]: {value:"Location",writable:false,enumerable:false,configurable:true},
  })
  Object.defineProperties(PerformanceElementTiming.prototype, {
    [Symbol.toStringTag]: {value:"PerformanceElementTiming",writable:false,enumerable:false,configurable:true},
  })
  Object.defineProperties(PerformanceEventTiming.prototype, {
    [Symbol.toStringTag]: {value:"PerformanceEventTiming",writable:false,enumerable:false,configurable:true},
  })
  Object.defineProperties(PerformanceLongTaskTiming.prototype, {
    [Symbol.toStringTag]: {value:"PerformanceLongTaskTiming",writable:false,enumerable:false,configurable:true},
  })
  Object.defineProperties(PerformanceMark.prototype, {
    [Symbol.toStringTag]: {value:"PerformanceMark",writable:false,enumerable:false,configurable:true},
  })
  Object.defineProperties(PerformanceMeasure.prototype, {
    [Symbol.toStringTag]: {value:"PerformanceMeasure",writable:false,enumerable:false,configurable:true},
  })
  Object.defineProperties(PerformanceNavigation.prototype, {
    TYPE_RELOAD: {"value":1,"writable":false,"enumerable":true,"configurable":false},
    TYPE_BACK_FORWARD: {"value":2,"writable":false,"enumerable":true,"configurable":false},
    TYPE_RESERVED: {"value":255,"writable":false,"enumerable":true,"configurable":false},
    [Symbol.toStringTag]: {value:"PerformanceNavigation",writable:false,enumerable:false,configurable:true},
  })
  Object.defineProperties(PerformancePaintTiming.prototype, {
    [Symbol.toStringTag]: {value:"PerformancePaintTiming",writable:false,enumerable:false,configurable:true},
  })
  Object.defineProperties(PerformanceServerTiming.prototype, {
    [Symbol.toStringTag]: {value:"PerformanceServerTiming",writable:false,enumerable:false,configurable:true},
  })
  Object.defineProperties(HTMLMediaElement.prototype, {
    NETWORK_IDLE: {"value":1,"writable":false,"enumerable":true,"configurable":false},
    NETWORK_LOADING: {"value":2,"writable":false,"enumerable":true,"configurable":false},
    NETWORK_NO_SOURCE: {"value":3,"writable":false,"enumerable":true,"configurable":false},
    HAVE_METADATA: {"value":1,"writable":false,"enumerable":true,"configurable":false},
    HAVE_CURRENT_DATA: {"value":2,"writable":false,"enumerable":true,"configurable":false},
    HAVE_FUTURE_DATA: {"value":3,"writable":false,"enumerable":true,"configurable":false},
    HAVE_ENOUGH_DATA: {"value":4,"writable":false,"enumerable":true,"configurable":false},
    [Symbol.toStringTag]: {value:"HTMLMediaElement",writable:false,enumerable:false,configurable:true},
  })
  Object.defineProperties(HTMLUnknownElement.prototype, {
    [Symbol.toStringTag]: {value:"HTMLUnknownElement",writable:false,enumerable:false,configurable:true},
  })
  Object.defineProperties(Touch.prototype, {
    [Symbol.toStringTag]: {value:"Touch",writable:false,enumerable:false,configurable:true},
  })
  Object.defineProperties(TouchEvent.prototype, {
    [Symbol.toStringTag]: {value:"TouchEvent",writable:false,enumerable:false,configurable:true},
  })
  Object.defineProperties(HTMLDivElement.prototype, {
    [Symbol.toStringTag]: {value:"HTMLDivElement",writable:false,enumerable:false,configurable:true},
  })
  Object.defineProperties(HTMLTitleElement.prototype, {
    [Symbol.toStringTag]: {value:"HTMLTitleElement",writable:false,enumerable:false,configurable:true},
  })
  Object.defineProperties(HTMLLIElement.prototype, {
    [Symbol.toStringTag]: {value:"HTMLLIElement",writable:false,enumerable:false,configurable:true},
  })




  if (typeof __dirname != 'undefined'){ __dirname = undefined }
  if (typeof __filename != 'undefined'){ __filename = undefined }
  if (typeof require != 'undefined'){ require = undefined }
  if (typeof exports != 'undefined'){ exports = undefined }
  if (typeof module != 'undefined'){ module = undefined }
  if (typeof Buffer != 'undefined'){ Buffer = undefined }
  var avoid_log = ['Symbol','Object','Number','RegExp','Boolean','String','constructor']
  var __globalThis__ = typeof global != 'undefined' ? global : this
  var window = new Proxy(v_new(Window), {
    get(a,b){ if(b=='global'){return}
      var r = a[b] || __globalThis__[b]
      if (typeof b !== 'symbol' && avoid_log.indexOf(b) == -1){
        v_console_log('  [*] [window get '+b+'] ==>', r)
      }
      return r
    },
    set(a,b,c){
      if (b == 'onclick' && typeof c == 'function') { window.addEventListener('click', c) }
      if (b == 'onmousedown' && typeof c == 'function') { window.addEventListener('mousedown', c) }
      if (b == 'onmouseup' && typeof c == 'function') { window.addEventListener('mouseup', c) }
      __globalThis__[b] = a[b] = c
      return true
    },
  })
  function v_proxy(obj, name, func){
    return new Proxy(obj, {
      get(a,b){ if(b=='global'){return}
        var r = a[b]
        if (typeof b !== 'symbol' && avoid_log.indexOf(b) == -1){
          v_console_log('  [*] ['+name+' get '+b+'] ==>', r)
        }
        if (func && typeof r == 'undefined'){
          r = func(name)
        }
        return r
      },
      set(a,b,c){
        if (typeof b !== 'symbol' && avoid_log.indexOf(b) == -1){
          v_console_log('  [*] ['+name+' set '+b+'] <--', c)
        }
        a[b] = c
        return true
      },
    })
  }
  var v_hasOwnProperty = Object.prototype.hasOwnProperty
  Object.prototype.hasOwnProperty = v_saf(function hasOwnProperty(){
    var r;
    if (this === window){ r = v_hasOwnProperty.apply(__globalThis__, arguments) }
    else{ r = v_hasOwnProperty.apply(this, arguments) }
    v_console_log('  [*] [hasOwnProperty]', this===window?window:this, [].slice.call(arguments), r)
    return r
  })
  Object.defineProperties(__globalThis__, {[Symbol.toStringTag]:{value:'Window'}})
  Object.defineProperties(__globalThis__, Object.getOwnPropertyDescriptors(window))
  Object.setPrototypeOf(__globalThis__, Object.getPrototypeOf(window))
  window.parent = window
  window.top = window
  window.frames = window
  window.self = window
  window["1"] = v_proxy(v_new(Window), "1")
  window.document = v_proxy(v_new(HTMLDocument), "document")
  window.location = v_proxy(v_new(Location), "location")
  window.history = v_proxy(v_new(History), "history")
  window.navigator = v_proxy(v_new(Navigator), "navigator")
  window.screen = v_proxy(v_new(Screen), "screen")
  window.clientInformation = navigator
  window.crypto = v_proxy(v_new(Crypto), "crypto")
  window.performance = v_proxy(v_new(Performance), "performance")
  window.trustedTypes = v_proxy(v_new(TrustedTypePolicyFactory), "trustedTypes")
  window.localStorage = v_proxy(v_new(Storage), "localStorage")
  window.sessionStorage = v_proxy(v_new(Storage), "sessionStorage")

  var win = {
    window: window,
    frames: window,
    parent: window,
    self: window,
    top: window,
  }
  function v_repair_this(){
    win = {
      window: __globalThis__,
      frames: __globalThis__,
      parent: __globalThis__,
      self: __globalThis__,
      top: __globalThis__,
    }
  }
  Object.defineProperties(window, {
    window: {get:function(){return win.window},set:function(e){return true}},
    frames: {get:function(){return win.frames},set:function(e){return true}},
    parent: {get:function(){return win.parent},set:function(e){return true}},
    self:   {get:function(){return win.self},  set:function(e){return true}},
    top:    {get:function(){return win.top},   set:function(e){return true}},
  })

  function _createElement(name){
    var htmlmap = {"HTMLElement":["abbr","address","article","aside","b","bdi","bdo","cite","code","dd","dfn","dt","em","figcaption","figure","footer","header","hgroup","i","kbd","main","mark","nav","noscript","rp","rt","ruby","s","samp","section","small","strong","sub","summary","sup","u","var","wbr"],"HTMLAnchorElement":["a"],"HTMLImageElement":["img"],"HTMLFontElement":["font"],"HTMLOutputElement":["output"],"HTMLAreaElement":["area"],"HTMLInputElement":["input"],"HTMLFormElement":["form"],"HTMLParagraphElement":["p"],"HTMLAudioElement":["audio"],"HTMLLabelElement":["label"],"HTMLFrameElement":["frame"],"HTMLParamElement":["param"],"HTMLBaseElement":["base"],"HTMLLegendElement":["legend"],"HTMLFrameSetElement":["frameset"],"HTMLPictureElement":["picture"],"HTMLBodyElement":["body"],"HTMLLIElement":["li"],"HTMLHeadingElement":["h1","h2","h3","h4","h5","h6"],"HTMLPreElement":["listing","pre","xmp"],"HTMLBRElement":["br"],"HTMLLinkElement":["link"],"HTMLHeadElement":["head"],"HTMLProgressElement":["progress"],"HTMLButtonElement":["button"],"HTMLMapElement":["map"],"HTMLHRElement":["hr"],"HTMLQuoteElement":["blockquote","q"],"HTMLCanvasElement":["canvas"],"HTMLMarqueeElement":["marquee"],"HTMLHtmlElement":["html"],"HTMLScriptElement":["script"],"HTMLDataElement":["data"],"HTMLMediaElement":[],"HTMLIFrameElement":["iframe"],"HTMLTimeElement":["time"],"HTMLDataListElement":["datalist"],"HTMLMenuElement":["menu"],"HTMLSelectElement":["select"],"HTMLTitleElement":["title"],"HTMLDetailsElement":["details"],"HTMLMetaElement":["meta"],"HTMLSlotElement":["slot"],"HTMLTableRowElement":["tr"],"HTMLDialogElement":["dialog"],"HTMLMeterElement":["meter"],"HTMLSourceElement":["source"],"HTMLTableSectionElement":["thead","tbody","tfoot"],"HTMLDirectoryElement":["dir"],"HTMLModElement":["del","ins"],"HTMLSpanElement":["span"],"HTMLTemplateElement":["template"],"HTMLDivElement":["div"],"HTMLObjectElement":["object"],"HTMLStyleElement":["style"],"HTMLTextAreaElement":["textarea"],"HTMLDListElement":["dl"],"HTMLOListElement":["ol"],"HTMLTableCaptionElement":["caption"],"HTMLTrackElement":["track"],"HTMLEmbedElement":["embed"],"HTMLOptGroupElement":["optgroup"],"HTMLTableCellElement":["th","td"],"HTMLUListElement":["ul"],"HTMLFieldSetElement":["fieldset"],"HTMLOptionElement":["option"],"HTMLTableColElement":["col","colgroup"],"HTMLUnknownElement":[],"HTMLTableElement":["table"],"HTMLVideoElement":["video"]}
    var ret, htmlmapkeys = Object.keys(htmlmap)
    name = name.toLocaleLowerCase()
    for (var i = 0; i < htmlmapkeys.length; i++) {
      if (htmlmap[htmlmapkeys[i]].indexOf(name) != -1){
        if (!window[htmlmapkeys[i]]){
          break
        }
        ret = v_new(window[htmlmapkeys[i]])
        break
      }
    }
    if (!ret){ ret = v_proxy(v_new(HTMLUnknownElement), 'HTMLUnknownElement', function(a){return function(){v_console_log(a,...arguments)}}) }
    if (typeof CSSStyleDeclaration != 'undefined') { ret.v_style = v_proxy(v_new(CSSStyleDeclaration), 'style') }
    ret.v_tagName = name.toUpperCase()
    return ret
  }
  function init_cookie(cookie){
    var cache = (cookie || "").trim();
    if (!cache){
      cache = ''
    }else if (cache.charAt(cache.length-1) != ';'){
      cache += '; '
    }else{
      cache += ' '
    }
    Object.defineProperty(Document.prototype, 'cookie', {
      get: function() {
        var r = cache.slice(0,cache.length-2);
        v_console_log('  [*] document -> cookie[get]', r)
        return r
      },
      set: function(c) {
        v_console_log('  [*] document -> cookie[set]', c)
        var ncookie = c.split(";")[0].split("=");
        if (!ncookie.slice(1).join('')){
          return c
        }
        var key = ncookie[0].trim()
        var val = ncookie.slice(1).join('').trim()
        var newc = key+'='+val
        var flag = false;
        var temp = cache.split("; ").map(function(a) {
          if (a.split("=")[0] === key) {
            flag = true;
            return newc;
          }
          return a;
        })
        cache = temp.join("; ");
        if (!flag) {
          cache += newc + "; ";
        }
        return cache;
      }
    });
  }
  function v_hook_href(obj, name, initurl){
    var r = Object.defineProperty(obj, 'href', {
      get: function(){
        if (!(this.protocol) && !(this.hostname)){
          r = ''
        }else{
          r = this.protocol + "//" + this.hostname + (this.port ? ":" + this.port : "") + this.pathname + this.search + this.hash;
        }
        v_console_log(`  [*] ${name||obj.constructor.name} -> href[get]:`, JSON.stringify(r))
        return r
      },
      set: function(href){
        href = href.trim()
        v_console_log(`  [*] ${name||obj.constructor.name} -> href[set]:`, JSON.stringify(href))
        if (href.startsWith("http://") || href.startsWith("https://")){/*ok*/}
        else if(href.startsWith("//")){ href = (this.protocol?this.protocol:'http:') + href}
        else{ href = this.protocol+"//"+this.hostname + (this.port?":"+this.port:"") + '/' + ((href[0]=='/')?href.slice(1):href) }
        var a = href.match(/([^:]+:)\/\/([^/:?#]+):?(\d+)?([^?#]*)?(\?[^#]*)?(#.*)?/);
        this.protocol = a[1] ? a[1] : "";
        this.hostname = a[2] ? a[2] : "";
        this.port     = a[3] ? a[3] : "";
        this.pathname = a[4] ? a[4] : "";
        this.search   = a[5] ? a[5] : "";
        this.hash     = a[6] ? a[6] : "";
        this.host     = this.hostname + (this.port?":"+this.port:"") ;
        this.origin   = this.protocol + "//" + this.hostname + (this.port ? ":" + this.port : "");
      }
    });
    if (initurl && initurl.trim()){ var temp=v_new_toggle; v_new_toggle = true; r.href = initurl; v_new_toggle = temp; }
    return r
  }
  function v_hook_storage(){
    Storage.prototype.clear      = v_saf(function(){          v_console_log(`  [*] Storage -> clear[func]:`); var self=this;Object.keys(self).forEach(function (key) { delete self[key]; }); }, 'clear')
    Storage.prototype.getItem    = v_saf(function(key){       v_console_log(`  [*] Storage -> getItem[func]:`, key); var r = (this.hasOwnProperty(key)?String(this[key]):null); return r}, 'getItem')
    Storage.prototype.setItem    = v_saf(function(key, val){  v_console_log(`  [*] Storage -> setItem[func]:`, key, val); this[key] = (val === undefined)?null:String(val) }, 'setItem')
    Storage.prototype.key        = v_saf(function(key){       v_console_log(`  [*] Storage -> key[func]:`, key); return Object.keys(this)[key||0];} , 'key')
    Storage.prototype.removeItem = v_saf(function(key){       v_console_log(`  [*] Storage -> removeItem[func]:`, key); delete this[key];}, 'removeItem')
    Object.defineProperty(Storage.prototype, 'length', {get: function(){
      if(this===Storage.prototype){ throw TypeError('Illegal invocation') }return Object.keys(this).length
    }})
    window.sessionStorage = new Proxy(sessionStorage,{ set:function(a,b,c){ v_console_log(`  [*] Storage -> [set]:`, b, c); return a[b]=String(c)}, get:function(a,b){ v_console_log(`  [*] Storage -> [get]:`, b, a[b]); return a[b]},})
    window.localStorage = new Proxy(localStorage,{ set:function(a,b,c){ v_console_log(`  [*] Storage -> [set]:`, b, c); return a[b]=String(c)}, get:function(a,b){ v_console_log(`  [*] Storage -> [get]:`, b, a[b]); return a[b]},})
  }
  function v_init_document(){
    Document.prototype.documentElement = v_proxy(_createElement('html'), 'documentElement')
    Document.prototype.createElement = v_saf(function createElement(){ return v_proxy(_createElement(arguments[0]), 'createElement '+arguments[0]) })
    Document.prototype.getElementById = v_saf(function getElementById(name){ var r = v_getele(name, 'getElementById'); v_console_log('  [*] Document -> getElementById', name, r); return r })
    Document.prototype.querySelector = v_saf(function querySelector(name){ var r = v_getele(name, 'querySelector'); v_console_log('  [*] Document -> querySelector', name, r); return r })
    Document.prototype.getElementsByClassName = v_saf(function getElementsByClassName(name){ var r = v_geteles(name, 'getElementsByClassName'); v_console_log('  [*] Document -> getElementsByClassName', name, r); return r })
    Document.prototype.getElementsByName = v_saf(function getElementsByName(name){ var r = v_geteles(name, 'getElementsByName'); v_console_log('  [*] Document -> getElementsByName', name, r); return r })
    Document.prototype.getElementsByTagName = v_saf(function getElementsByTagName(name){ var r = v_geteles(name, 'getElementsByTagName'); v_console_log('  [*] Document -> getElementsByTagName', name, r); return r })
    Document.prototype.getElementsByTagNameNS = v_saf(function getElementsByTagNameNS(name){ var r = v_geteles(name, 'getElementsByTagNameNS'); v_console_log('  [*] Document -> getElementsByTagNameNS', name, r); return r })
    Document.prototype.querySelectorAll = v_saf(function querySelectorAll(name){ var r = v_geteles(name, 'querySelectorAll'); v_console_log('  [*] Document -> querySelectorAll', name, r); return r })
    var v_head = v_new(HTMLHeadElement)
    var v_body = v_new(HTMLBodyElement)
    Object.defineProperties(Document.prototype, {
      head: {get(){ v_console_log("  [*] Document -> head[get]", v_head);return v_proxy(v_head, 'document.head') }},
      body: {get(){ v_console_log("  [*] Document -> body[get]", v_body);return v_proxy(v_body, 'document.body') }},
    })
  }
  function v_init_canvas(){
    HTMLCanvasElement.prototype.getContext = function(){
      if (arguments[0]=='2d'){var r = v_proxy(v_new(CanvasRenderingContext2D), 'canvas2d', function(a){return function(){v_console_log(a,...arguments)}}); return r};
      if (arguments[0]=='webgl' || arguments[0]=='experimental-webgl'){var r = v_proxy(v_new(WebGLRenderingContext), 'webgl', function(a){return function(){v_console_log(a,...arguments)}}); r._canvas = this; return r};
      return null
    }
    HTMLCanvasElement.prototype.toDataURL = function(){return "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASwAAACWCAYAAABkW7XSAAAEYklEQVR4Xu3UAQkAAAwCwdm/9HI83BLIOdw5AgQIRAQWySkmAQIEzmB5AgIEMgIGK1OVoAQIGCw/QIBARsBgZaoSlAABg+UHCBDICBisTFWCEiBgsPwAAQIZAYOVqUpQAgQMlh8gQCAjYLAyVQlKgIDB8gMECGQEDFamKkEJEDBYfoAAgYyAwcpUJSgBAgbLDxAgkBEwWJmqBCVAwGD5AQIEMgIGK1OVoAQIGCw/QIBARsBgZaoSlAABg+UHCBDICBisTFWCEiBgsPwAAQIZAYOVqUpQAgQMlh8gQCAjYLAyVQlKgIDB8gMECGQEDFamKkEJEDBYfoAAgYyAwcpUJSgBAgbLDxAgkBEwWJmqBCVAwGD5AQIEMgIGK1OVoAQIGCw/QIBARsBgZaoSlAABg+UHCBDICBisTFWCEiBgsPwAAQIZAYOVqUpQAgQMlh8gQCAjYLAyVQlKgIDB8gMECGQEDFamKkEJEDBYfoAAgYyAwcpUJSgBAgbLDxAgkBEwWJmqBCVAwGD5AQIEMgIGK1OVoAQIGCw/QIBARsBgZaoSlAABg+UHCBDICBisTFWCEiBgsPwAAQIZAYOVqUpQAgQMlh8gQCAjYLAyVQlKgIDB8gMECGQEDFamKkEJEDBYfoAAgYyAwcpUJSgBAgbLDxAgkBEwWJmqBCVAwGD5AQIEMgIGK1OVoAQIGCw/QIBARsBgZaoSlAABg+UHCBDICBisTFWCEiBgsPwAAQIZAYOVqUpQAgQMlh8gQCAjYLAyVQlKgIDB8gMECGQEDFamKkEJEDBYfoAAgYyAwcpUJSgBAgbLDxAgkBEwWJmqBCVAwGD5AQIEMgIGK1OVoAQIGCw/QIBARsBgZaoSlAABg+UHCBDICBisTFWCEiBgsPwAAQIZAYOVqUpQAgQMlh8gQCAjYLAyVQlKgIDB8gMECGQEDFamKkEJEDBYfoAAgYyAwcpUJSgBAgbLDxAgkBEwWJmqBCVAwGD5AQIEMgIGK1OVoAQIGCw/QIBARsBgZaoSlAABg+UHCBDICBisTFWCEiBgsPwAAQIZAYOVqUpQAgQMlh8gQCAjYLAyVQlKgIDB8gMECGQEDFamKkEJEDBYfoAAgYyAwcpUJSgBAgbLDxAgkBEwWJmqBCVAwGD5AQIEMgIGK1OVoAQIGCw/QIBARsBgZaoSlAABg+UHCBDICBisTFWCEiBgsPwAAQIZAYOVqUpQAgQMlh8gQCAjYLAyVQlKgIDB8gMECGQEDFamKkEJEDBYfoAAgYyAwcpUJSgBAgbLDxAgkBEwWJmqBCVAwGD5AQIEMgIGK1OVoAQIGCw/QIBARsBgZaoSlAABg+UHCBDICBisTFWCEiBgsPwAAQIZAYOVqUpQAgQMlh8gQCAjYLAyVQlKgIDB8gMECGQEDFamKkEJEDBYfoAAgYyAwcpUJSgBAgbLDxAgkBEwWJmqBCVAwGD5AQIEMgIGK1OVoAQIGCw/QIBARsBgZaoSlACBB1YxAJfjJb2jAAAAAElFTkSuQmCC"}
  }
  var v_start_stamp = +new Date
  var v_fake_stamp = +new Date
  function v_init_event_target(){
    v_events = {}
    function add_event(_this, x){
      if (!v_events[x[0]]){
        v_events[x[0]] = []
      }
      v_events[x[0]].push([_this, x[1].bind(_this)])
    }
    function _mk_mouse_event(type, canBubble, cancelable, view, detail, screenX, screenY, clientX, clientY, ctrlKey, altKey, shiftKey, metaKey, button, relatedTarget){
      if (type == 'click'){
        var m = new v_saf(function PointerEvent(){})
        m.pointerType = "mouse"
      }else{
        var m = new v_saf(function MouseEvent(){})
      }
      m.isTrusted = true
      m.type = type
      m.canBubble = canBubble
      m.cancelable = cancelable
      m.view = view
      m.detail = detail
      m.screenX = screenX; m.movementX = screenX
      m.screenY = screenY; m.movementY = screenY
      m.clientX = clientX; m.layerX = clientX; m.offsetX = clientX; m.pageX = clientX; m.x = clientX;
      m.clientY = clientY; m.layerY = clientY; m.offsetY = clientY; m.pageY = clientY; m.y = clientY;
      m.ctrlKey = ctrlKey
      m.altKey = altKey
      m.shiftKey = shiftKey
      m.metaKey = metaKey
      m.button = button
      m.relatedTarget = relatedTarget
      return m
    }
    function make_mouse(type, x, y){
      return _mk_mouse_event(type, true, true, window, 0, 0, 0, x, y, false, false, false, false, 0, null)
    }
    function mouse_click(x, y){
      for (var i = 0; i < (v_events['click'] || []).length; i++) { v_events['click'][i][1](make_mouse('click', x, y)) }
      for (var i = 0; i < (v_events['mousedown'] || []).length; i++) { v_events['mousedown'][i][1](make_mouse('mousedown', x, y)) }
      for (var i = 0; i < (v_events['mouseup'] || []).length; i++) { v_events['mouseup'][i][1](make_mouse('mouseup', x, y)) }
    }
    var offr = Math.random()
    function make_touch(_this, type, x, y, timeStamp){
      var offx = Math.random()
      var offy = Math.random()
      var t = v_new(new v_saf(function Touch(){}))
      t = clientX = offx + x
      t = clientY = offy + y
      t = force = 1
      t = identifier = 0
      t = pageX = offx + x
      t = pageY = offy + y
      t = radiusX = 28 + offr
      t = radiusY = 28 + offr
      t = rotationAngle = 0
      t = screenX = 0
      t = screenY = 0
      var e = v_new(new v_saf(function TouchEvent(){}))
      e.isTrusted = true
      e.altKey = false
      e.bubbles = true
      e.cancelBubble = false
      e.cancelable = false
      e.changedTouches = e.targetTouches = e.touches = [t]
      e.composed = true
      e.ctrlKey = false
      e.currentTarget = null
      e.defaultPrevented = false
      e.detail = 0
      e.eventPhase = 0
      e.metaKey = false
      e.path = _this == window ? [window] : [_this, window]
      e.returnValue = true
      e.shiftKey = false
      e.sourceCapabilities = new v_saf(function InputDeviceCapabilities(){this.firesTouchEvents = true})
      e.srcElement = _this
      e.target = _this
      e.type = type
      e.timeStamp = timeStamp == undefined ? (new Date - v_start_stamp) : ((v_fake_stamp += Math.random()*20) - v_start_stamp)
      e.view = window
      e.which = 0
      return e
    }
    function make_trace(x1, y1, x2, y2){
      // 贝塞尔曲线
      function step_len(x1, y1, x2, y2){
        var ln = ((x2 - x1) ** 2 + (y2 - y1) ** 2) ** 0.5
        return (ln / 10) ^ 0
      }
      var slen = step_len(x1, y1, x2, y2)
      if (slen < 3){
        return []
      }
      function factorial(x){
        for(var y = 1; x > 1;  x--) {
          y *= x
        }
        return y;
      }
      var lp = Math.random()
      var rp = Math.random()
      var xx1 = (x1 + (x2 - x1) / 12 * (4-lp*4)) ^ 0
      var yy1 = (y1 + (y2 - y1) / 12 * (8+lp*4)) ^ 0
      var xx2 = (x1 + (x2 - x1) / 12 * (8+rp*4)) ^ 0
      var yy2 = (y1 + (y2 - y1) / 12 * (4-rp*4)) ^ 0
      var points = [[x1, y1], [xx1, yy1], [xx2, yy2], [x2, y2]]
      var N = points.length
      var n = N - 1
      var traces = []
      var step = slen
      for (var T = 0; T < step+1; T++) {
        var t = T*(1/step)
        var x = 0
        var y = 0
        for (var i = 0; i < N; i++) {
          var B = factorial(n)*t**i*(1-t)**(n-i)/(factorial(i)*factorial(n-i))
          x += points[i][0]*B
          y += points[i][1]*B
        }
        traces.push([x^0, y^0])
      }
      return traces
    }
    function touch(x1, y1, x2, y2){
      if (x2 == undefined && y2 == undefined){
        x2 = x1
        y2 = y1
      }
      var traces = make_trace(x1, y1, x2, y2)
      v_console_log('traces:', traces)
      for (var i = 0; i < (v_events['touchstart'] || []).length; i++) { v_events['touchstart'][i][1](make_touch(v_events['touchstart'][i][0], 'touchstart', x1, y1)) }
      for (var j = 0; j < traces.length; j++) {
        var x = traces[j][0]
        var y = traces[j][0]
        for (var i = 0; i < (v_events['touchmove'] || []).length; i++) { v_events['touchmove'][i][1](make_touch(v_events['touchmove'][i][0], 'touchmove', x, y)) }
      }
      for (var i = 0; i < (v_events['touchend'] || []).length; i++) { v_events['touchend'][i][1](make_touch(v_events['touchend'][i][0], 'touchend', x2, y2)) }
    }
    function mouse_move(x1, y1, x2, y2){
      if (x2 == undefined && y2 == undefined){
        x2 = x1
        y2 = y1
      }
      var traces = make_trace(x1, y1, x2, y2)
      v_console_log('traces:', traces)
      for (var j = 0; j < traces.length; j++) {
        var x = traces[j][0]
        var y = traces[j][0]
        for (var i = 0; i < (v_events['mousemove'] || []).length; i++) { v_events['mousemove'][i][1](make_touch(v_events['mousemove'][i][0], 'mousemove', x, y)) }
      }
    }
    window.make_mouse = make_mouse
    window.mouse_click = mouse_click
    window.mouse_move = mouse_move
    window.touch = touch
    EventTarget.prototype.addEventListener = function(){v_console_log('  [*] EventTarget -> addEventListener[func]', this===window?'[Window]':this===document?'[Document]':this, [].slice.call(arguments)); add_event(this, [].slice.call(arguments)); return null}
    EventTarget.prototype.dispatchEvent = function(){v_console_log('  [*] EventTarget -> dispatchEvent[func]', this===window?'[Window]':this===document?'[Document]':this, [].slice.call(arguments)); add_event(this, [].slice.call(arguments)); return null}
    EventTarget.prototype.removeEventListener = function(){v_console_log('  [*] EventTarget -> removeEventListener[func]', this===window?'[Window]':this===document?'[Document]':this, [].slice.call(arguments)); add_event(this, [].slice.call(arguments)); return null}
  }
  function v_init_Element_prototype(){
    Element.prototype.appendChild            = Element.prototype.appendChild            || v_saf(function appendChild(){v_console_log("  [*] Element -> appendChild[func]", [].slice.call(arguments));})
    Element.prototype.removeChild            = Element.prototype.removeChild            || v_saf(function removeChild(){v_console_log("  [*] Element -> removeChild[func]", [].slice.call(arguments));})
    Element.prototype.getAnimations          = Element.prototype.getAnimations          || v_saf(function getAnimations(){v_console_log("  [*] Element -> getAnimations[func]", [].slice.call(arguments));})
    Element.prototype.getAttribute           = Element.prototype.getAttribute           || v_saf(function getAttribute(){v_console_log("  [*] Element -> getAttribute[func]", [].slice.call(arguments));})
    Element.prototype.getAttributeNS         = Element.prototype.getAttributeNS         || v_saf(function getAttributeNS(){v_console_log("  [*] Element -> getAttributeNS[func]", [].slice.call(arguments));})
    Element.prototype.getAttributeNames      = Element.prototype.getAttributeNames      || v_saf(function getAttributeNames(){v_console_log("  [*] Element -> getAttributeNames[func]", [].slice.call(arguments));})
    Element.prototype.getAttributeNode       = Element.prototype.getAttributeNode       || v_saf(function getAttributeNode(){v_console_log("  [*] Element -> getAttributeNode[func]", [].slice.call(arguments));})
    Element.prototype.getAttributeNodeNS     = Element.prototype.getAttributeNodeNS     || v_saf(function getAttributeNodeNS(){v_console_log("  [*] Element -> getAttributeNodeNS[func]", [].slice.call(arguments));})
    Element.prototype.getBoundingClientRect  = Element.prototype.getBoundingClientRect  || v_saf(function getBoundingClientRect(){v_console_log("  [*] Element -> getBoundingClientRect[func]", [].slice.call(arguments));})
    Element.prototype.getClientRects         = Element.prototype.getClientRects         || v_saf(function getClientRects(){v_console_log("  [*] Element -> getClientRects[func]", [].slice.call(arguments));})
    Element.prototype.getElementsByClassName = Element.prototype.getElementsByClassName || v_saf(function getElementsByClassName(){v_console_log("  [*] Element -> getElementsByClassName[func]", [].slice.call(arguments));})
    Element.prototype.getElementsByTagName   = Element.prototype.getElementsByTagName   || v_saf(function getElementsByTagName(){v_console_log("  [*] Element -> getElementsByTagName[func]", [].slice.call(arguments));})
    Element.prototype.getElementsByTagNameNS = Element.prototype.getElementsByTagNameNS || v_saf(function getElementsByTagNameNS(){v_console_log("  [*] Element -> getElementsByTagNameNS[func]", [].slice.call(arguments));})
    Element.prototype.getInnerHTML           = Element.prototype.getInnerHTML           || v_saf(function getInnerHTML(){v_console_log("  [*] Element -> getInnerHTML[func]", [].slice.call(arguments));})
    Element.prototype.hasAttribute           = Element.prototype.hasAttribute           || v_saf(function hasAttribute(){v_console_log("  [*] Element -> hasAttribute[func]", [].slice.call(arguments));})
    Element.prototype.hasAttributeNS         = Element.prototype.hasAttributeNS         || v_saf(function hasAttributeNS(){v_console_log("  [*] Element -> hasAttributeNS[func]", [].slice.call(arguments));})
    Element.prototype.hasAttributes          = Element.prototype.hasAttributes          || v_saf(function hasAttributes(){v_console_log("  [*] Element -> hasAttributes[func]", [].slice.call(arguments));})
    Element.prototype.hasPointerCapture      = Element.prototype.hasPointerCapture      || v_saf(function hasPointerCapture(){v_console_log("  [*] Element -> hasPointerCapture[func]", [].slice.call(arguments));})
    Element.prototype.webkitMatchesSelector  = Element.prototype.webkitMatchesSelector  || v_saf(function webkitMatchesSelector(){v_console_log("  [*] Element -> webkitMatchesSelector[func]", [].slice.call(arguments));})
  }
  function v_init_HTMLElement(){
    try{
      Object.defineProperties(HTMLElement.prototype, {
        style: {set: undefined, enumerable: true, configurable: true, get: v_saf(function style(){v_console_log("  [*] HTMLElement -> style[get]", [].slice.call(arguments)); return this.v_style })},
      })
    }catch(e){
      v_console_log(e)
    }
  }
  function v_init_DOMTokenList_prototype(){
    DOMTokenList.prototype.add = DOMTokenList.prototype.add || v_saf(function add(){v_console_log("  [*] DOMTokenList -> add[func]", [].slice.call(arguments));})
    DOMTokenList.prototype.contains = DOMTokenList.prototype.contains || v_saf(function contains(){v_console_log("  [*] DOMTokenList -> contains[func]", [].slice.call(arguments));})
    DOMTokenList.prototype.entries = DOMTokenList.prototype.entries || v_saf(function entries(){v_console_log("  [*] DOMTokenList -> entries[func]", [].slice.call(arguments));})
    DOMTokenList.prototype.forEach = DOMTokenList.prototype.forEach || v_saf(function forEach(){v_console_log("  [*] DOMTokenList -> forEach[func]", [].slice.call(arguments));})
    DOMTokenList.prototype.item = DOMTokenList.prototype.item || v_saf(function item(){v_console_log("  [*] DOMTokenList -> item[func]", [].slice.call(arguments));})
    DOMTokenList.prototype.keys = DOMTokenList.prototype.keys || v_saf(function keys(){v_console_log("  [*] DOMTokenList -> keys[func]", [].slice.call(arguments));})
    DOMTokenList.prototype.length = DOMTokenList.prototype.length || v_saf(function length(){v_console_log("  [*] DOMTokenList -> length[func]", [].slice.call(arguments));})
    DOMTokenList.prototype.remove = DOMTokenList.prototype.remove || v_saf(function remove(){v_console_log("  [*] DOMTokenList -> remove[func]", [].slice.call(arguments));})
    DOMTokenList.prototype.replace = DOMTokenList.prototype.replace || v_saf(function replace(){v_console_log("  [*] DOMTokenList -> replace[func]", [].slice.call(arguments));})
    DOMTokenList.prototype.supports = DOMTokenList.prototype.supports || v_saf(function supports(){v_console_log("  [*] DOMTokenList -> supports[func]", [].slice.call(arguments));})
    DOMTokenList.prototype.toggle = DOMTokenList.prototype.toggle || v_saf(function toggle(){v_console_log("  [*] DOMTokenList -> toggle[func]", [].slice.call(arguments));})
  }
  function v_init_CSSStyleDeclaration_prototype(){
    CSSStyleDeclaration.prototype["zoom"] = ''
    CSSStyleDeclaration.prototype["resize"] = ''
    CSSStyleDeclaration.prototype["text-rendering"] = ''
    CSSStyleDeclaration.prototype["text-align-last"] = ''
  }
  function v_init_PointerEvent_prototype(){
    PointerEvent.prototype.getCoalescedEvents = v_saf(function getCoalescedEvents(){v_console_log("  [*] PointerEvent -> getCoalescedEvents[func]", [].slice.call(arguments));})
    PointerEvent.prototype.getPredictedEvents = v_saf(function getPredictedEvents(){v_console_log("  [*] PointerEvent -> getPredictedEvents[func]", [].slice.call(arguments));})
  }
  function v_init_PerformanceTiming_prototype(){
    try{
      Object.defineProperties(PerformanceTiming.prototype, {
        connectEnd: {set: undefined, enumerable: true, configurable: true, get: v_saf(function connectEnd(){v_console_log("  [*] PerformanceTiming -> connectEnd[get]", [].slice.call(arguments));})},
        connectStart: {set: undefined, enumerable: true, configurable: true, get: v_saf(function connectStart(){v_console_log("  [*] PerformanceTiming -> connectStart[get]", [].slice.call(arguments));})},
        domComplete: {set: undefined, enumerable: true, configurable: true, get: v_saf(function domComplete(){v_console_log("  [*] PerformanceTiming -> domComplete[get]", [].slice.call(arguments));})},
        domContentLoadedEventEnd: {set: undefined, enumerable: true, configurable: true, get: v_saf(function domContentLoadedEventEnd(){v_console_log("  [*] PerformanceTiming -> domContentLoadedEventEnd[get]", [].slice.call(arguments));})},
        domContentLoadedEventStart: {set: undefined, enumerable: true, configurable: true, get: v_saf(function domContentLoadedEventStart(){v_console_log("  [*] PerformanceTiming -> domContentLoadedEventStart[get]", [].slice.call(arguments));})},
        domInteractive: {set: undefined, enumerable: true, configurable: true, get: v_saf(function domInteractive(){v_console_log("  [*] PerformanceTiming -> domInteractive[get]", [].slice.call(arguments));})},
        domLoading: {set: undefined, enumerable: true, configurable: true, get: v_saf(function domLoading(){v_console_log("  [*] PerformanceTiming -> domLoading[get]", [].slice.call(arguments));})},
        domainLookupEnd: {set: undefined, enumerable: true, configurable: true, get: v_saf(function domainLookupEnd(){v_console_log("  [*] PerformanceTiming -> domainLookupEnd[get]", [].slice.call(arguments));})},
        domainLookupStart: {set: undefined, enumerable: true, configurable: true, get: v_saf(function domainLookupStart(){v_console_log("  [*] PerformanceTiming -> domainLookupStart[get]", [].slice.call(arguments));})},
        fetchStart: {set: undefined, enumerable: true, configurable: true, get: v_saf(function fetchStart(){v_console_log("  [*] PerformanceTiming -> fetchStart[get]", [].slice.call(arguments));})},
        loadEventEnd: {set: undefined, enumerable: true, configurable: true, get: v_saf(function loadEventEnd(){v_console_log("  [*] PerformanceTiming -> loadEventEnd[get]", [].slice.call(arguments));})},
        loadEventStart: {set: undefined, enumerable: true, configurable: true, get: v_saf(function loadEventStart(){v_console_log("  [*] PerformanceTiming -> loadEventStart[get]", [].slice.call(arguments));})},
        navigationStart: {set: undefined, enumerable: true, configurable: true, get: v_saf(function navigationStart(){v_console_log("  [*] PerformanceTiming -> navigationStart[get]", [].slice.call(arguments));})},
        redirectEnd: {set: undefined, enumerable: true, configurable: true, get: v_saf(function redirectEnd(){v_console_log("  [*] PerformanceTiming -> redirectEnd[get]", [].slice.call(arguments));})},
        redirectStart: {set: undefined, enumerable: true, configurable: true, get: v_saf(function redirectStart(){v_console_log("  [*] PerformanceTiming -> redirectStart[get]", [].slice.call(arguments));})},
        requestStart: {set: undefined, enumerable: true, configurable: true, get: v_saf(function requestStart(){v_console_log("  [*] PerformanceTiming -> requestStart[get]", [].slice.call(arguments));})},
        responseEnd: {set: undefined, enumerable: true, configurable: true, get: v_saf(function responseEnd(){v_console_log("  [*] PerformanceTiming -> responseEnd[get]", [].slice.call(arguments));})},
        responseStart: {set: undefined, enumerable: true, configurable: true, get: v_saf(function responseStart(){v_console_log("  [*] PerformanceTiming -> responseStart[get]", [].slice.call(arguments));})},
        secureConnectionStart: {set: undefined, enumerable: true, configurable: true, get: v_saf(function secureConnectionStart(){v_console_log("  [*] PerformanceTiming -> secureConnectionStart[get]", [].slice.call(arguments));})},
        unloadEventEnd: {set: undefined, enumerable: true, configurable: true, get: v_saf(function unloadEventEnd(){v_console_log("  [*] PerformanceTiming -> unloadEventEnd[get]", [].slice.call(arguments));})},
        unloadEventStart: {set: undefined, enumerable: true, configurable: true, get: v_saf(function unloadEventStart(){v_console_log("  [*] PerformanceTiming -> unloadEventStart[get]", [].slice.call(arguments));})},
      })
    }catch(e){}
  }
  function mk_atob_btoa(r){var a="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",t=new Array(-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,62,-1,-1,-1,63,52,53,54,55,56,57,58,59,60,61,-1,-1,-1,-1,-1,-1,-1,0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,-1,-1,-1,-1,-1,-1,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,-1,-1,-1,-1,-1);return{atob:function(r){var a,e,o,h,c,i,n;for(i=r.length,c=0,n="";c<i;){do{a=t[255&r.charCodeAt(c++)]}while(c<i&&-1==a);if(-1==a)break;do{e=t[255&r.charCodeAt(c++)]}while(c<i&&-1==e);if(-1==e)break;n+=String.fromCharCode(a<<2|(48&e)>>4);do{if(61==(o=255&r.charCodeAt(c++)))return n;o=t[o]}while(c<i&&-1==o);if(-1==o)break;n+=String.fromCharCode((15&e)<<4|(60&o)>>2);do{if(61==(h=255&r.charCodeAt(c++)))return n;h=t[h]}while(c<i&&-1==h);if(-1==h)break;n+=String.fromCharCode((3&o)<<6|h)}return n},btoa:function(r){var t,e,o,h,c,i;for(o=r.length,e=0,t="";e<o;){if(h=255&r.charCodeAt(e++),e==o){t+=a.charAt(h>>2),t+=a.charAt((3&h)<<4),t+="==";break}if(c=r.charCodeAt(e++),e==o){t+=a.charAt(h>>2),t+=a.charAt((3&h)<<4|(240&c)>>4),t+=a.charAt((15&c)<<2),t+="=";break}i=r.charCodeAt(e++),t+=a.charAt(h>>2),t+=a.charAt((3&h)<<4|(240&c)>>4),t+=a.charAt((15&c)<<2|(192&i)>>6),t+=a.charAt(63&i)}return t}}}
  var atob_btoa = mk_atob_btoa()
  window.btoa = window.btoa || v_saf(atob_btoa.btoa, 'btoa')
  window.atob = window.atob || v_saf(atob_btoa.atob, 'atob')
  window.postMessage = v_saf(function(){v_console_log('  [*] [postMessage]', arguments)}, 'postMessage')
  window.matchMedia = v_saf(function(){v_console_log('  [*] [matchMedia]', arguments); return v_proxy({}, 'matchMedia{}')}, 'matchMedia')

  init_cookie("GUID=09034157318795754126; GUID.sig=k7OHiyStSvH5szBm9anfsp1fmQQigT-xwjMkj6wX3LI; UBT_VID=1768793853618.fceaJNj1Qktf; ibu_online_jump_site_result={\"isShowSuggestion\":false}; ibulanguage=HK; ibulocale=zh_hk; cookiePricesDisplayed=HKD; ibu_country=HK; ibu_cookie_strict=0; ubtc_trip_pwa=0; _tp_search_latest_channel_name=hotels; _fwb=113CAp11y3N0UWTuaucWpuZ.1768793856132; _RGUID=d5fcd0ac-f411-49da-892e-2b7620a9d3a3; _gcl_au=1.1.986159362.1768793857; _abtest_userid=0cf7a69f-4219-4519-893a-89a70a42593e; websec_lid=01696dc2286820b7377c; websec_tuid=01696dc2286820b7377c; x-ctx-user-recognize=NON_EU; IBU_TRANCE_LOG_P=86283093935; GUID=09034157318795754126; nfes_isSupportWebP=1; _ga=GA1.1.526543656.1768800826; ibu_hotel_search_date=%7B%22checkIn%22%3A%222026-01-19%22%2C%22checkOut%22%3A%222026-01-20%22%2C%22isChoseFlexible%22%3Afalse%2C%22flexibleDate%22%3A%7B%22selectNight%22%3A0%7D%2C%22dayFlexibility%22%3A0%7D; ibu_hotel_search_target=%7B%22countryId%22%3A1%2C%22provinceId%22%3A-1%2C%22searchWord%22%3A%22%22%2C%22cityId%22%3A58%2C%22searchType%22%3A%22%22%2C%22searchValue%22%3A%22%22%7D; ibu_hotel_search_crn_guest=%7B%22adult%22%3A2%2C%22children%22%3A0%2C%22ages%22%3A%22%22%2C%22crn%22%3A1%7D; oldCurrency=HKD; _fbp=fb.1.1768800842491.405833121966301818; ibu_online_permission_cls_ct=1; ibu_online_permission_cls_gap=1768800858221; ibusite=HK; ibugroup=trip; _ga_X437DZ73MR=GS2.1.s1768802782$o2$g0$t1768802782$j60$l0$h0; _bfa=1.1768793853618.fceaJNj1Qktf.1.1768800828288.1768802783871.3.1.10320668148; g_state={\"i_l\":0,\"i_ll\":1768802794369,\"i_b\":\"xdIXeYIE5Zw84Cijd6urHLDAn4yVYkX0HFAK7OZ9LD8\",\"i_e\":{\"enable_itp_optimization\":3}}; wcs_bt=s_33fb334966e9:1768802802; _uetsid=76da8bf0f4f811f0ac28f79decc886f4; _uetvid=76daba00f4f811f0b5b3230ebed63d69")
  v_hook_href(window.location, 'location', "https://hk.trip.com/hotels/list?city=58&provinceId=0&countryId=1&checkIn=2026-01-19&checkOut=2026-01-20&lat=0&lon=0&districtId=0&barCurr=HKD&searchType=CT&searchValue=undefined&crn=1&adult=2&children=0&searchBoxArg=t&ctm_ref=ix_sb_dl&travelPurpose=0&domestic=true")
  Location.prototype.toString = v_saf(function toString(){ return "https://hk.trip.com/hotels/list?city=58&provinceId=0&countryId=1&checkIn=2026-01-19&checkOut=2026-01-20&lat=0&lon=0&districtId=0&barCurr=HKD&searchType=CT&searchValue=undefined&crn=1&adult=2&children=0&searchBoxArg=t&ctm_ref=ix_sb_dl&travelPurpose=0&domestic=true" })
  window.alert = v_saf(function alert(){})
  v_hook_storage()
  v_init_HTMLElement()
  v_init_document()
  v_init_canvas()
  v_init_event_target()
  v_init_Element_prototype()
  v_init_DOMTokenList_prototype()
  v_init_CSSStyleDeclaration_prototype()
  v_init_PointerEvent_prototype()
  v_init_PerformanceTiming_prototype()
  window.innerWidth = 1440
  window.innerHeight = 900
  window.outerHeight = 900
  window.outerWidth = 1440
  window.isSecureContext = true
  window.origin = location.origin
  function v_getele(name, func){
    if(name.toLocaleLowerCase() == "344926" && func == "getElementById"){ return v_new(HTMLDivElement) }
    if(name.toLocaleLowerCase() == "344950" && func == "getElementById"){ return v_new(HTMLDivElement) }
    if(name.toLocaleLowerCase() == "344961" && func == "getElementById"){ return v_new(HTMLDivElement) }
    if(name.toLocaleLowerCase() == "426542" && func == "getElementById"){ return v_new(HTMLDivElement) }
    if(name.toLocaleLowerCase() == "433361" && func == "getElementById"){ return v_new(HTMLDivElement) }
    if(name.toLocaleLowerCase() == "436824" && func == "getElementById"){ return v_new(HTMLDivElement) }
    if(name.toLocaleLowerCase() == "436832" && func == "getElementById"){ return v_new(HTMLDivElement) }
    if(name.toLocaleLowerCase() == "436835" && func == "getElementById"){ return v_new(HTMLDivElement) }
    if(name.toLocaleLowerCase() == "436847" && func == "getElementById"){ return v_new(HTMLDivElement) }
    if(name.toLocaleLowerCase() == "717575" && func == "getElementById"){ return v_new(HTMLDivElement) }
    if(name.toLocaleLowerCase() == "30936520" && func == "getElementById"){ return v_new(HTMLDivElement) }
    if(name.toLocaleLowerCase() == "107205064" && func == "getElementById"){ return v_new(HTMLDivElement) }
    if(name.toLocaleLowerCase() == "page_id" && func == "getElementById"){ return v_new(HTMLInputElement) }
    if(name.toLocaleLowerCase() == "ab_testing_tracker" && func == "getElementById"){ return v_new(HTMLInputElement) }
    if(name.toLocaleLowerCase() == "[trigger='yes']" && func == "querySelector"){ return v_new(HTMLDivElement) }
    if(name.toLocaleLowerCase() == "[trigger='no']" && func == "querySelector"){ return v_new(HTMLDivElement) }
    if(name.toLocaleLowerCase() == "akmohfpnfodolpdgmlhabifeflcbokfb" && func == "getElementById"){ return v_new(HTMLDivElement) }
    if(name.toLocaleLowerCase() == "aafffodlodelkolbgmdgnlffbcjiecgm" && func == "getElementById"){ return v_new(HTMLDivElement) }
    if(name.toLocaleLowerCase() == "link[rel=\"preload\"][href=\"https://aw-s.tripcdn.com/modules/ibu/online-assets/tripgeom-regular.ba9c64b894f5e19551d23b37a07ba0a4.woff2\"]" && func == "querySelector"){ return v_new(HTMLLinkElement) }
    if(name.toLocaleLowerCase() == "webcore_internal" && func == "getElementById"){ return v_new(HTMLScriptElement) }
    if(name.toLocaleLowerCase() == "link[rel=\"preload\"][href=\"https://aw-s.tripcdn.com/modules/ibu/online-assets/tripgeom-medium.c01bb95e18e1b0d0137ff80b79b97a38.woff2\"]" && func == "querySelector"){ return v_new(HTMLLinkElement) }
    if(name.toLocaleLowerCase() == "link[rel=\"preload\"][href=\"https://aw-s.tripcdn.com/modules/ibu/online-assets/tripgeom-bold.9e9e0eb59209311df954413ff4957cbb.woff2\"]" && func == "querySelector"){ return v_new(HTMLLinkElement) }
    if(name.toLocaleLowerCase() == "script[async][src=\"//bd-s.tripcdn.cn/modules/hotel/hotel-spider-defence-new/sdt.1004-common.min.1589d4c8f1f0c32bbeb180195d34e6b4.js\"]" && func == "querySelector"){ return v_new(HTMLScriptElement) }
    if(name.toLocaleLowerCase() == "link[rel=\"preload\"][href=\"https://aw-s.tripcdn.com/nfes/trip-online-search/1768381969121/_next/static/chunks/app/list/page-98ed0f63b11f7aff.js\"]" && func == "querySelector"){ return v_new(HTMLLinkElement) }
    if(name.toLocaleLowerCase() == "link[rel=\"stylesheet\"][href=\"https://aw-s.tripcdn.com/nfes/trip-online-search/1768381969121/_next/static/css/6f61353a8196f41c.css\"]" && func == "querySelector"){ return v_new(HTMLLinkElement) }
    if(name.toLocaleLowerCase() == "link[rel=\"stylesheet\"][href=\"https://aw-s.tripcdn.com/nfes/trip-online-search/1768381969121/_next/static/css/aa638c28372717c8.css\"]" && func == "querySelector"){ return v_new(HTMLLinkElement) }
    if(name.toLocaleLowerCase() == "hotel_footer" && func == "getElementById"){ return v_new(HTMLDivElement) }
    if(name.toLocaleLowerCase() == "meta[charset]" && func == "querySelector"){ return v_new(HTMLMetaElement) }
    if(name.toLocaleLowerCase() == "meta[name=\"viewport\"][content=\"width=device-width, initial-scale=1\"]" && func == "querySelector"){ return v_new(HTMLMetaElement) }
    if(name.toLocaleLowerCase() == "link[rel=\"preconnect\"][href=\"https://ak-d.tripcdn.com/\"]" && func == "querySelector"){ return v_new(HTMLLinkElement) }
    if(name.toLocaleLowerCase() == "link[rel=\"preconnect\"][href=\"https://aw-d.tripcdn.com/\"]" && func == "querySelector"){ return v_new(HTMLLinkElement) }
    if(name.toLocaleLowerCase() == "link[rel=\"dns-prefetch\"][href=\"//webresource.tripcdn.com\"]" && func == "querySelector"){ return v_new(HTMLLinkElement) }
    if(name.toLocaleLowerCase() == "link[rel=\"dns-prefetch\"][href=\"//pic.tripcdn.com\"]" && func == "querySelector"){ return v_new(HTMLLinkElement) }
    if(name.toLocaleLowerCase() == "link[rel=\"dns-prefetch\"][href=\"//www.trip.com\"]" && func == "querySelector"){ return v_new(HTMLLinkElement) }
    if(name.toLocaleLowerCase() == "link[rel=\"dns-prefetch\"][href=\"//static.tripcdn.com\"]" && func == "querySelector"){ return v_new(HTMLLinkElement) }
    if(name.toLocaleLowerCase() == "meta[name=\"keywords\"][content=\"香港飯店, 香港, 預訂飯店, 住宿, 平價飯店, 飯店, trip.com\"]" && func == "querySelector"){ return v_new(HTMLMetaElement) }
    if(name.toLocaleLowerCase() == "meta[name=\"description\"][content=\"香港酒店預訂 - 透過trip.com，您可以找到最新香港平價住宿推薦，以優惠價格預訂交通方便及鄰近著名景點的高性價比酒店。立即查看客戶評論，揀選心水酒店及旅館!\"]" && func == "querySelector"){ return v_new(HTMLMetaElement) }
    if(name.toLocaleLowerCase() == "meta[property=\"og:type\"][content=\"website\"]" && func == "querySelector"){ return v_new(HTMLMetaElement) }
    if(name.toLocaleLowerCase() == "meta[http-equiv=\"x-ua-compatible\"][content=\"ie=edge,chrome=1\"]" && func == "querySelector"){ return v_new(HTMLMetaElement) }
    if(name.toLocaleLowerCase() == "meta[name=\"app\"][content=\"x5-page-mode\"]" && func == "querySelector"){ return v_new(HTMLMetaElement) }
    if(name.toLocaleLowerCase() == "meta[name=\"viewport\"][content=\"width=device-width, height=device-height, initial-scale=1.0, user-scalable=0, viewport-fit=cover\"]" && func == "querySelector"){ return v_new(HTMLMetaElement) }
    if(name.toLocaleLowerCase() == "meta[name=\"apple-mobile-web-app-capable\"][content=\"yes\"]" && func == "querySelector"){ return v_new(HTMLMetaElement) }
    if(name.toLocaleLowerCase() == "meta[name=\"apple-mobile-web-app-status-bar-style\"][content=\"black\"]" && func == "querySelector"){ return v_new(HTMLMetaElement) }
    if(name.toLocaleLowerCase() == "meta[name=\"format-detection\"][content=\"telephone=no\"]" && func == "querySelector"){ return v_new(HTMLMetaElement) }
    if(name.toLocaleLowerCase() == "meta[http-equiv=\"x-dns-prefetch-control\"][content=\"on\"]" && func == "querySelector"){ return v_new(HTMLMetaElement) }
    if(name.toLocaleLowerCase() == "meta[property=\"fb:app_id\"][content=\"891889767495675\"]" && func == "querySelector"){ return v_new(HTMLMetaElement) }
    if(name.toLocaleLowerCase() == "meta[property=\"og:title\"][content=\"cheap hotels & hotel booking | trip.com\"]" && func == "querySelector"){ return v_new(HTMLMetaElement) }
    if(name.toLocaleLowerCase() == "#ibuheadermenu" && func == "querySelector"){ return v_new(HTMLDivElement) }
    if(name.toLocaleLowerCase() == "tripgenie-content" && func == "getElementById"){ return v_new(HTMLDivElement) }
    return null
  }
  function v_geteles(name, func){
    if(name == "script" && func == "getElementsByTagName"){ return [v_new(HTMLScriptElement),v_new(HTMLScriptElement),v_new(HTMLScriptElement),v_new(HTMLScriptElement),v_new(HTMLScriptElement),v_new(HTMLScriptElement),v_new(HTMLScriptElement),v_new(HTMLScriptElement),v_new(HTMLScriptElement),v_new(HTMLScriptElement),v_new(HTMLScriptElement),v_new(HTMLScriptElement),v_new(HTMLScriptElement),v_new(HTMLScriptElement),v_new(HTMLScriptElement),v_new(HTMLScriptElement),v_new(HTMLScriptElement),v_new(HTMLScriptElement),v_new(HTMLScriptElement),v_new(HTMLScriptElement),v_new(HTMLScriptElement),v_new(HTMLScriptElement),v_new(HTMLScriptElement),v_new(HTMLScriptElement),v_new(HTMLScriptElement),v_new(HTMLScriptElement),v_new(HTMLScriptElement),v_new(HTMLScriptElement),v_new(HTMLScriptElement),v_new(HTMLScriptElement),v_new(HTMLScriptElement),v_new(HTMLScriptElement),v_new(HTMLScriptElement),v_new(HTMLScriptElement),v_new(HTMLScriptElement),v_new(HTMLScriptElement),v_new(HTMLScriptElement),v_new(HTMLScriptElement),v_new(HTMLScriptElement),v_new(HTMLScriptElement),v_new(HTMLScriptElement),v_new(HTMLScriptElement),v_new(HTMLScriptElement),v_new(HTMLScriptElement),v_new(HTMLScriptElement),v_new(HTMLScriptElement),v_new(HTMLScriptElement),v_new(HTMLScriptElement),v_new(HTMLScriptElement),v_new(HTMLScriptElement),v_new(HTMLScriptElement),v_new(HTMLScriptElement),v_new(HTMLScriptElement),v_new(HTMLScriptElement),v_new(HTMLScriptElement),v_new(HTMLScriptElement),v_new(HTMLScriptElement),v_new(HTMLScriptElement),v_new(HTMLScriptElement),v_new(HTMLScriptElement),v_new(HTMLScriptElement),v_new(HTMLScriptElement)] }
    if(name == "body" && func == "getElementsByTagName"){ return [v_new(HTMLBodyElement)] }
    if(name == "html" && func == "getElementsByTagName"){ return [v_new(HTMLHtmlElement)] }
    if(name == "trigger" && func == "getElementsByClassName"){ return [] }
    if(name == "title" && func == "querySelectorAll"){ return [v_new(HTMLTitleElement)] }
    if(name == ".mc-hd__nav-item" && func == "querySelectorAll"){ return [v_new(HTMLLIElement),v_new(HTMLLIElement),v_new(HTMLLIElement),v_new(HTMLLIElement),v_new(HTMLLIElement),v_new(HTMLLIElement),v_new(HTMLLIElement),v_new(HTMLLIElement),v_new(HTMLLIElement),v_new(HTMLLIElement),v_new(HTMLLIElement),v_new(HTMLLIElement),v_new(HTMLLIElement),v_new(HTMLLIElement),v_new(HTMLLIElement)] }
    if(name == "[data-exposure]" && func == "querySelectorAll"){ return [v_new(HTMLDivElement),v_new(HTMLDivElement),v_new(HTMLDivElement),v_new(HTMLDivElement),v_new(HTMLDivElement),v_new(HTMLDivElement),v_new(HTMLDivElement),v_new(HTMLDivElement),v_new(HTMLDivElement),v_new(HTMLDivElement),v_new(HTMLDivElement),v_new(HTMLDivElement),v_new(HTMLDivElement),v_new(HTMLDivElement),v_new(HTMLDivElement),v_new(HTMLDivElement),v_new(HTMLDivElement),v_new(HTMLDivElement),v_new(HTMLDivElement),v_new(HTMLDivElement),v_new(HTMLDivElement),v_new(HTMLDivElement),v_new(HTMLDivElement),v_new(HTMLDivElement),v_new(HTMLDivElement),v_new(HTMLDivElement),v_new(HTMLDivElement),v_new(HTMLDivElement)] }
    if(name == "mod-back-top-side-bar" && func == "getElementsByClassName"){ return [v_new(HTMLDivElement)] }
    if(name == "mod-back-top" && func == "getElementsByClassName"){ return [v_new(HTMLDivElement)] }
    if(name == "adsbox" && func == "getElementsByClassName"){ return [] }
    if(name == "iframe:not([data-vue-devtools-ignore])" && func == "querySelectorAll"){ return [v_new(HTMLIFrameElement)] }
    if(name == "button:enabled,select:enabled,textarea:enabled,input:enabled,a[href],area[href],summary,iframe,object,embed,audio[controls],video[controls],[tabindex],[contenteditable],[autofocus]" && func == "querySelectorAll"){ return [v_new(HTMLDivElement),v_new(HTMLDivElement)] }
    if(name == "iframe" && func == "getElementsByTagName"){ return [v_new(HTMLIFrameElement)] }
    if(name == ":root" && func == "querySelectorAll"){ return [v_new(HTMLHtmlElement)] }
    if(name == "meta[name]" && func == "querySelectorAll"){ return [v_new(HTMLMetaElement),v_new(HTMLMetaElement),v_new(HTMLMetaElement),v_new(HTMLMetaElement),v_new(HTMLMetaElement),v_new(HTMLMetaElement),v_new(HTMLMetaElement),v_new(HTMLMetaElement)] }
    if(name == "meta[property]" && func == "querySelectorAll"){ return [v_new(HTMLMetaElement),v_new(HTMLMetaElement),v_new(HTMLMetaElement),v_new(HTMLMetaElement),v_new(HTMLMetaElement),v_new(HTMLMetaElement)] }
    if(name == "meta" && func == "getElementsByTagName"){ return [v_new(HTMLMetaElement),v_new(HTMLMetaElement),v_new(HTMLMetaElement),v_new(HTMLMetaElement),v_new(HTMLMetaElement),v_new(HTMLMetaElement),v_new(HTMLMetaElement),v_new(HTMLMetaElement),v_new(HTMLMetaElement),v_new(HTMLMetaElement),v_new(HTMLMetaElement),v_new(HTMLMetaElement),v_new(HTMLMetaElement),v_new(HTMLMetaElement),v_new(HTMLMetaElement),v_new(HTMLMetaElement),v_new(HTMLMetaElement)] }
    return null
  }
  var v_Date = Date;
  var v_base_time = +new Date;
  (function(){
    function ftime(){
      return new v_Date() - v_base_time + v_to_time
    }
    Date = function(_Date) {
      var bind = Function.bind;
      var unbind = bind.bind(bind);
      function instantiate(constructor, args) {
        return new (unbind(constructor, null).apply(null, args));
      }
      var names = Object.getOwnPropertyNames(_Date);
      for (var i = 0; i < names.length; i++) {
        if (names[i]in Date)
          continue;
        var desc = Object.getOwnPropertyDescriptor(_Date, names[i]);
        Object.defineProperty(Date, names[i], desc);
      }
      function Date() {
        var date = instantiate(_Date, [ftime()]);
        return date;
      }
      Date.prototype = _Date.prototype
      return v_saf(Date);
    }(Date);
    Date.now = v_saf(function now(){ return ftime() })
  })();
  var v_to_time = +new v_Date
  // var v_to_time = +new v_Date('Sat Sep 03 2022 11:11:58 GMT+0800') // 自定义起始时间

  v_repair_this() // 修复 window 指向global
  v_new_toggle = false




  // v_console_log = function(){} // 关闭日志输出
  // setTimeout = function(){} // 关闭定时器
  // setInterval = function(){} // 关闭定时器
  return window
})();

(function() {
    function AuroraExecution() {
        var _unknown_72827 = 2147483647
          , _unknown_2a584 = 1
          , _unknown_a0eb5 = 0
          , _unknown_57357 = !!_unknown_2a584
          , _unknown_dcda4 = !!_unknown_a0eb5;
        return function(_unknown_72ac3, _unknown_e5df0, _unknown_05736) {
            var _unknown_52a49 = []
              , _unknown_118c5 = []
              , _unknown_384b5 = {}
              , _unknown_79209 = []
              , _unknown_ccbfb = {
                _unknown_2342d: _unknown_72ac3
            }
              , _unknown_fab11 = {}
              , _unknown_5e3d4 = _unknown_a0eb5
              , _unknown_acc70 = [];
            var decode = function(j) {
                if (!j) {
                    return ""
                }
                var n = function(e) {
                    var f = []
                      , t = e.length;
                    var u = 0;
                    for (var u = 0; u < t; u++) {
                        var w = e.charCodeAt(u);
                        if (((w >> 7) & 255) == 0) {
                            f.push(e.charAt(u))
                        } else {
                            if (((w >> 5) & 255) == 6) {
                                var b = e.charCodeAt(++u);
                                var a = (w & 31) << 6;
                                var c = b & 63;
                                var v = a | c;
                                f.push(String.fromCharCode(v))
                            } else {
                                if (((w >> 4) & 255) == 14) {
                                    var b = e.charCodeAt(++u);
                                    var d = e.charCodeAt(++u);
                                    var a = (w << 4) | ((b >> 2) & 15);
                                    var c = ((b & 3) << 6) | (d & 63);
                                    var v = ((a & 255) << 8) | c;
                                    f.push(String.fromCharCode(v))
                                }
                            }
                        }
                    }
                    return f.join("")
                };
                var k = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".split("");
                var p = j.length;
                var l = 0;
                var m = [];
                while (l < p) {
                    var s = k.indexOf(j.charAt(l++));
                    var r = k.indexOf(j.charAt(l++));
                    var q = k.indexOf(j.charAt(l++));
                    var o = k.indexOf(j.charAt(l++));
                    var i = (s << 2) | (r >> 4);
                    var h = ((r & 15) << 4) | (q >> 2);
                    var g = ((q & 3) << 6) | o;
                    m.push(String.fromCharCode(i));
                    if (q != 64) {
                        m.push(String.fromCharCode(h))
                    }
                    if (o != 64) {
                        m.push(String.fromCharCode(g))
                    }
                }
                return n(m.join(""))
            };
            var _unknown_35e5a = function(_unknown_b2b2e, _unknown_895a5, _unknown_a49b5, _unknown_931c6) {
                return {
                    _unknown_f1e19: _unknown_b2b2e,
                    _unknown_92d66: _unknown_895a5,
                    _unknown_0ffef: _unknown_a49b5,
                    _unknown_66511: _unknown_931c6
                };
            };
            var _unknown_079d2 = function(_unknown_931c6) {
                return _unknown_931c6._unknown_66511 ? _unknown_931c6._unknown_92d66[_unknown_931c6._unknown_0ffef] : _unknown_931c6._unknown_f1e19;
            };
            var _unknown_7bb463 = function(_unknown_b64ad, _unknown_2bc42) {
                return _unknown_2bc42.hasOwnProperty(_unknown_b64ad) ? _unknown_57357 : _unknown_dcda4;
            };
            var _unknown_7bb462 = function(_unknown_b64ad, _unknown_2bc42) {
                if (_unknown_7bb463(_unknown_b64ad, _unknown_2bc42)) {
                    return _unknown_35e5a(_unknown_a0eb5, _unknown_2bc42, _unknown_b64ad, _unknown_2a584);
                }
                var _unknown_960e6;
                if (_unknown_2bc42._unknown_37b9f) {
                    _unknown_960e6 = _unknown_7bb462(_unknown_b64ad, _unknown_2bc42._unknown_37b9f);
                    if (_unknown_960e6) {
                        return _unknown_960e6;
                    }
                }
                if (_unknown_2bc42._unknown_d3c64) {
                    _unknown_960e6 = _unknown_7bb462(_unknown_b64ad, _unknown_2bc42._unknown_d3c64);
                    if (_unknown_960e6) {
                        return _unknown_960e6;
                    }
                }
                return _unknown_dcda4;
            };
            var _unknown_7bb46 = function(_unknown_b64ad) {
                var _unknown_960e6 = _unknown_7bb462(_unknown_b64ad, _unknown_384b5);
                if (_unknown_960e6) {
                    return _unknown_960e6;
                }
                return _unknown_35e5a(_unknown_a0eb5, _unknown_384b5, _unknown_b64ad, _unknown_2a584);
            };
            var _unknown_ba241 = function() {
                _unknown_52a49 = (_unknown_384b5._unknown_ae06a) ? _unknown_384b5._unknown_ae06a : _unknown_79209;
                _unknown_384b5 = (_unknown_384b5._unknown_d3c64) ? _unknown_384b5._unknown_d3c64 : _unknown_384b5;
                _unknown_5e3d4--
            };
            var _unknown_4e6a7 = function(_unknown_32c10) {
                _unknown_384b5 = {
                    _unknown_d3c64: _unknown_384b5,
                    _unknown_37b9f: _unknown_32c10,
                    _unknown_ae06a: _unknown_52a49
                };
                _unknown_52a49 = [];
                _unknown_5e3d4++
            };
            var _unknown_b2ebe = function() {
                _unknown_acc70.push(_unknown_35e5a(_unknown_5e3d4, _unknown_a0eb5, _unknown_a0eb5, _unknown_a0eb5))
            };
            var _unknown_f836a = function() {
                return _unknown_079d2(_unknown_acc70.pop())
            };
            var _unknown_8415f = function(_unknown_650d3, _unknown_8abb4) {
                return _unknown_fab11[_unknown_650d3] = _unknown_8abb4;
            };
            var _unknown_bfbab = function(_unknown_650d3) {
                return _unknown_fab11[_unknown_650d3];
            };
            var _unknown_39d0a = [_unknown_35e5a(_unknown_a0eb5, _unknown_a0eb5, _unknown_a0eb5, _unknown_a0eb5), _unknown_35e5a(_unknown_a0eb5, _unknown_a0eb5, _unknown_a0eb5, _unknown_a0eb5), _unknown_35e5a(_unknown_a0eb5, _unknown_a0eb5, _unknown_a0eb5, _unknown_a0eb5), _unknown_35e5a(_unknown_a0eb5, _unknown_a0eb5, _unknown_a0eb5, _unknown_a0eb5), _unknown_35e5a(_unknown_a0eb5, _unknown_a0eb5, _unknown_a0eb5, _unknown_a0eb5)];
            var _unknown_744f0 = [_unknown_05736, function _unknown_56ec3(_unknown_a49b5) {
                return _unknown_39d0a[_unknown_a49b5];
            }
            , function(_unknown_a49b5) {
                return _unknown_35e5a(_unknown_a0eb5, _unknown_ccbfb._unknown_64ff6, _unknown_a49b5, _unknown_2a584);
            }
            , function(_unknown_a49b5) {
                return _unknown_7bb46(_unknown_a49b5);
            }
            , function(_unknown_a49b5) {
                return _unknown_35e5a(_unknown_a0eb5, _unknown_72ac3, _unknown_e5df0.d[_unknown_a49b5], _unknown_2a584);
            }
            , function(_unknown_a49b5) {
                return _unknown_35e5a(_unknown_ccbfb._unknown_2342d, _unknown_a0eb5, _unknown_a0eb5, _unknown_a0eb5);
            }
            , function(_unknown_a49b5) {
                return _unknown_35e5a(_unknown_a0eb5, _unknown_e5df0.d, _unknown_a49b5, _unknown_2a584);
            }
            , function(_unknown_a49b5) {
                return _unknown_35e5a(_unknown_ccbfb._unknown_64ff6, _unknown_05736, _unknown_05736, _unknown_a0eb5);
            }
            , function(_unknown_a49b5) {
                return _unknown_35e5a(_unknown_a0eb5, _unknown_fab11, _unknown_a49b5, _unknown_a0eb5)
            }
            ];
            var _unknown_f9312 = function(_unknown_a6d05, _unknown_a49b5) {
                return _unknown_744f0[_unknown_a6d05] ? _unknown_744f0[_unknown_a6d05](_unknown_a49b5) : _unknown_35e5a(_unknown_a0eb5, _unknown_a0eb5, _unknown_a0eb5, _unknown_a0eb5);
            };
            var _unknown_a3cd0 = function(_unknown_a6d05, _unknown_a49b5) {
                return _unknown_079d2(_unknown_f9312(_unknown_a6d05, _unknown_a49b5));
            };
            var _unknown_d2e76 = function(_unknown_b2b2e, _unknown_895a5, _unknown_a49b5, _unknown_931c6) {
                _unknown_39d0a[_unknown_a0eb5] = _unknown_35e5a(_unknown_b2b2e, _unknown_895a5, _unknown_a49b5, _unknown_931c6)
            };
            var _unknown_cec65 = function(_unknown_43ca9) {
                var _unknown_cf78c = _unknown_a0eb5;
                while (_unknown_cf78c < _unknown_43ca9.length) {
                    var _unknown_cc75e = _unknown_43ca9[_unknown_cf78c];
                    var _unknown_8b54e = _unknown_4f16b[_unknown_cc75e[_unknown_a0eb5]];
                    _unknown_cf78c = _unknown_8b54e(_unknown_cc75e[1], _unknown_cc75e[2], _unknown_cc75e[3], _unknown_cc75e[4], _unknown_cf78c, _unknown_0741c, _unknown_43ca9);
                }
            };
            var _unknown_6aa44 = function(_unknown_0d30b, _unknown_7d653, _unknown_cc75e, _unknown_43ca9) {
                var _unknown_b21c7 = _unknown_079d2(_unknown_0d30b);
                var _unknown_f8d85 = _unknown_079d2(_unknown_7d653);
                if (_unknown_b21c7 == 2147483647) {
                    return _unknown_cc75e;
                }
                while (_unknown_b21c7 < _unknown_f8d85) {
                    var x = _unknown_43ca9[_unknown_b21c7];
                    var _unknown_8b54e = _unknown_4f16b[x[_unknown_a0eb5]];
                    _unknown_b21c7 = _unknown_8b54e(x[1], x[2], x[3], x[4], _unknown_b21c7, _unknown_0741c, _unknown_43ca9);
                }
                return _unknown_b21c7;
            };
            var _unknown_18413 = function(_unknown_b575d, _unknown_43ca9) {
                var _unknown_2976a = _unknown_52a49.splice(_unknown_52a49.length - 6, 6);
                var _unknown_48e2b = _unknown_2976a[4]._unknown_f1e19 != 2147483647;
                try {
                    _unknown_b575d = _unknown_6aa44(_unknown_2976a[0], _unknown_2976a[1], _unknown_b575d, _unknown_43ca9);
                } catch (e) {
                    _unknown_39d0a[2] = _unknown_35e5a(e, _unknown_a0eb5, _unknown_a0eb5, _unknown_a0eb5);
                    _unknown_b575d = _unknown_6aa44(_unknown_2976a[2], _unknown_2976a[3], _unknown_b575d, _unknown_43ca9);
                    _unknown_39d0a[2] = _unknown_35e5a(_unknown_a0eb5, _unknown_a0eb5, _unknown_a0eb5, _unknown_a0eb5);
                } finally {
                    _unknown_b575d = _unknown_6aa44(_unknown_2976a[4], _unknown_2976a[5], _unknown_b575d, _unknown_43ca9);
                }
                return _unknown_2976a[5]._unknown_f1e19 > _unknown_b575d ? _unknown_2976a[5]._unknown_f1e19 : _unknown_b575d;
            };
            var _unknown_0741c = decode(_unknown_e5df0.b).split('').reduce(function(_unknown_1dba9, _unknown_cc75e) {
                if ((!_unknown_1dba9.length) || _unknown_1dba9[_unknown_1dba9.length - _unknown_2a584].length == 5) {
                    _unknown_1dba9.push([]);
                }
                _unknown_1dba9[_unknown_1dba9.length - _unknown_2a584].push(-_unknown_2a584 * 1 + _unknown_cc75e.charCodeAt());
                return _unknown_1dba9;
            }, []);
            var _unknown_4f16b = [function _unknown_14fd8(a, b, c, d, e) {
                var f = _unknown_a3cd0(a, b);
                return _unknown_d2e76(_unknown_52a49.splice(_unknown_52a49.length - f, f).map(_unknown_079d2), _unknown_05736, _unknown_05736, 0),
                ++e
            }
            , function _unknown_51505(a, b, c, d, e) {
                return _unknown_ba241(),
                ++e
            }
            , function _unknown_ebcf3(a, b, c, d, e) {
                return _unknown_39d0a[0] = _unknown_52a49[_unknown_52a49.length - 1],
                ++e
            }
            , function _unknown_e5974(a, b, c, d, e) {
                var f = _unknown_a3cd0(a, b);
                if (_unknown_52a49.length < f)
                    return ++e;
                var g = _unknown_52a49.splice(_unknown_52a49.length - f, f).map(_unknown_079d2)
                  , h = _unknown_52a49.pop()
                  , i = _unknown_079d2(h);
                return g.unshift(null),
                _unknown_d2e76(new (Function.prototype.bind.apply(i, g)), _unknown_05736, _unknown_05736, 0),
                ++e
            }
            , function _unknown_0c8da(a, b, c, d, e) {
                return _unknown_4e6a7(null),
                ++e
            }
            , function _unknown_188a8(a, b, c, d, e) {
                return _unknown_d2e76(_unknown_a3cd0(a, b) ^ _unknown_a3cd0(c, d), _unknown_05736, _unknown_05736, 0),
                ++e
            }
            , function _unknown_d517e(a, b, c, d, e) {
                return _unknown_d2e76(_unknown_a3cd0(a, b) - _unknown_a3cd0(c, d), _unknown_05736, _unknown_05736, 0),
                ++e
            }
            , function _unknown_36254(a, b, c, d, e) {
                var f = _unknown_f9312(a, b)
                  , g = _unknown_a3cd0(a, b) - 1;
                return f._unknown_92d66[f._unknown_0ffef] = g,
                _unknown_d2e76(g, _unknown_05736, _unknown_05736, 0),
                ++e
            }
            , function _unknown_ede68(a, b, c, d, e) {
                debugger ;return ++e
            }
            , function _unknown_13ded(a, b, c, d, e) {
                return _unknown_d2e76(_unknown_a3cd0(a, b) >> _unknown_a3cd0(c, d), _unknown_05736, _unknown_05736, 0),
                ++e
            }
            , function _unknown_3fdc5(a, b, c, d, e) {
                return _unknown_d2e76(_unknown_a3cd0(a, b) >>> _unknown_a3cd0(c, d), _unknown_05736, _unknown_05736, 0),
                ++e
            }
            , function _unknown_3d608(a, b, c, d, e) {
                var f = _unknown_f9312(a, b);
                return _unknown_d2e76(delete f._unknown_92d66[f._unknown_0ffef], _unknown_05736, _unknown_05736, 0),
                ++e
            }
            , function _unknown_3cded(a, b, c, d, e) {
                var f = _unknown_f9312(a, b)
                  , g = _unknown_a3cd0(a, b) + 1;
                return f._unknown_92d66[f._unknown_0ffef] = g,
                _unknown_d2e76(g, _unknown_05736, _unknown_05736, 0),
                ++e
            }
            , function _unknown_32dfc() {
                return _unknown_72827
            }
            , function _unknown_20bbd(a, b, c, d, e) {
                return _unknown_d2e76(_unknown_a3cd0(a, b), _unknown_05736, _unknown_05736, 0),
                ++e
            }
            , function _unknown_695c3(a, b, c, d, e) {
                return _unknown_d2e76(_unknown_a3cd0(a, b) & _unknown_a3cd0(c, d), _unknown_05736, _unknown_05736, 0),
                ++e
            }
            , function _unknown_c41ef(a, b, c, d, e) {
                var f = _unknown_a3cd0(a, b);
                if (_unknown_52a49.length < f)
                    return ++e;
                var g = _unknown_52a49.splice(_unknown_52a49.length - f, f).map(_unknown_079d2)
                  , h = _unknown_52a49.pop()
                  , i = _unknown_079d2(h);
                return _unknown_d2e76(i.apply("undefined" == typeof h._unknown_92d66 ? _unknown_72ac3 : h._unknown_92d66, g), _unknown_05736, _unknown_05736, 0),
                ++e
            }
            , function _unknown_72257(a, b, c, d, e) {
                return _unknown_b2ebe(),
                _unknown_4e6a7(_unknown_ccbfb._unknown_37b9f),
                ++e
            }
            , function _unknown_7ae5f(e, f, g, h, i) {
                var j = _unknown_a3cd0(e, f)
                  , a = _unknown_a3cd0(g, h)
                  , b = _unknown_0741c.slice(j, a + 1)
                  , c = _unknown_384b5;
                return _unknown_d2e76(function() {
                    return _unknown_ccbfb = {
                        _unknown_2342d: this || _unknown_72ac3,
                        _unknown_e7948: _unknown_ccbfb,
                        _unknown_64ff6: arguments,
                        _unknown_37b9f: c
                    },
                    _unknown_cec65(b),
                    _unknown_ccbfb = _unknown_ccbfb._unknown_e7948,
                    _unknown_079d2(_unknown_39d0a[0])
                }, _unknown_05736, _unknown_05736, 0),
                ++i
            }
            , function _unknown_9e962() {
                return _unknown_d2e76(_unknown_05736, _unknown_05736, _unknown_05736, 0, 0),
                _unknown_ba241(),
                _unknown_f836a(),
                1 / 0
            }
            , function _unknown_3415a(a, b, c, d, e) {
                return _unknown_d2e76(_unknown_a3cd0(a, b) == _unknown_a3cd0(c, d), _unknown_05736, _unknown_05736, 0),
                ++e
            }
            , function _unknown_ca564(a, b, c, d, e) {
                return _unknown_079d2(_unknown_39d0a[0]) ? ++e : _unknown_a3cd0(a, b)
            }
            , function _unknown_103a3(a, b, c, d, e) {
                return _unknown_d2e76(_unknown_a3cd0(a, b) !== _unknown_a3cd0(c, d), _unknown_05736, _unknown_05736, 0),
                ++e
            }
            , function _unknown_75562(a, b, c, d, e) {
                return _unknown_d2e76(_unknown_a3cd0(a, b) != _unknown_a3cd0(c, d), _unknown_05736, _unknown_05736, 0),
                ++e
            }
            , function _unknown_3e2bc(a, b, c, d, e) {
                return _unknown_d2e76(_unknown_a3cd0(a, b)instanceof _unknown_a3cd0(c, d), _unknown_05736, _unknown_05736, 0),
                ++e
            }
            , function _unknown_8ca45(a, b, c, d, e) {
                var f = _unknown_a3cd0(a, b);
                return _unknown_d2e76(_unknown_8415f(f, {}), _unknown_05736, _unknown_05736, 0),
                ++e
            }
            , function _unknown_09088(a, b, c, d, e) {
                return _unknown_d2e76(+_unknown_a3cd0(a, b), _unknown_05736, _unknown_05736, 0),
                ++e
            }
            , function _unknown_c0eba(a, b, c, d, e) {
                return _unknown_d2e76(_unknown_a3cd0(a, b) * _unknown_a3cd0(c, d), _unknown_05736, _unknown_05736, 0),
                ++e
            }
            , function _unknown_0bbd8(a, b, c, d, e) {
                return _unknown_d2e76(_unknown_a3cd0(a, b) < _unknown_a3cd0(c, d), _unknown_05736, _unknown_05736, 0),
                ++e
            }
            , function _unknown_81ed8(a, b, c, d, e) {
                return ++e
            }
            , function _unknown_c5b64(a, b, c, d, e) {
                return _unknown_d2e76(!_unknown_a3cd0(a, b), _unknown_05736, _unknown_05736, 0),
                ++e
            }
            , function _unknown_c5d0e(a, b, c, d, e) {
                return _unknown_39d0a[4] = _unknown_118c5[_unknown_118c5.length - 1],
                ++e
            }
            , function _unknown_f65b3(a, b, c, d, e) {
                return _unknown_d2e76(typeof _unknown_a3cd0(a, b), _unknown_05736, _unknown_05736, 0),
                ++e
            }
            , function _unknown_565b5(a, b, c, d, e) {
                return _unknown_d2e76(_unknown_a3cd0(a, b) << _unknown_a3cd0(c, d), _unknown_05736, _unknown_05736, 0),
                ++e
            }
            , function _unknown_a8814(a, b, c, d, e) {
                return _unknown_39d0a[3] = _unknown_35e5a(_unknown_52a49.length, 0, 0, 0),
                ++e
            }
            , function _unknown_37c79(a, b, c, d, e) {
                return _unknown_d2e76({}, _unknown_05736, _unknown_05736, 0),
                ++e
            }
            , function _unknown_3660e(a, b, c, d, e) {
                return _unknown_39d0a[1] = _unknown_52a49.pop(),
                ++e
            }
            , function _unknown_38367(a, b, c, d, e) {
                return _unknown_52a49.push(_unknown_39d0a[0]),
                ++e
            }
            , function _unknown_6d159(a, b, c, d, e) {
                return ++e
            }
            , function _unknown_6ee09(a, b, c, d, e) {
                var f = _unknown_f9312(a, b)
                  , g = _unknown_a3cd0(c, d);
                return _unknown_d2e76(f._unknown_92d66[f._unknown_0ffef] = g, _unknown_05736, _unknown_05736, 0),
                ++e
            }
            , function _unknown_c2c86(a, b) {
                return _unknown_a3cd0(a, b)
            }
            , function _unknown_41c95(a, b, c, d, e) {
                return _unknown_d2e76(_unknown_a3cd0(a, b) <= _unknown_a3cd0(c, d), _unknown_05736, _unknown_05736, 0),
                ++e
            }
            , function _unknown_bcea3(a, b, c, d, e, f, g) {
                return _unknown_18413(e, g)
            }
            , function _unknown_6c205(a, b, c, d, e) {
                return _unknown_d2e76(_unknown_a3cd0(a, b) | _unknown_a3cd0(c, d), _unknown_05736, _unknown_05736, 0),
                ++e
            }
            , function _unknown_d596f(a, b, c, d, e) {
                return _unknown_d2e76(_unknown_a3cd0(a, b) === _unknown_a3cd0(c, d), _unknown_05736, _unknown_05736, 0),
                ++e
            }
            , function _unknown_aeec5(a, b, c, d, e) {
                return _unknown_079d2(_unknown_39d0a[0]) ? _unknown_a3cd0(a, b) : ++e
            }
            , function _unknown_9ea93(a, b, c, d, e) {
                return _unknown_d2e76(~_unknown_a3cd0(a, b), _unknown_05736, _unknown_05736, 0),
                ++e
            }
            , function _unknown_7629d(a, b, c, d, e) {
                return _unknown_384b5[b] = void 0,
                ++e
            }
            , function _unknown_f9b41(a, b, c, d, e) {
                var f = _unknown_f9312(a, b)
                  , g = _unknown_a3cd0(a, b);
                return _unknown_d2e76(g++, _unknown_05736, _unknown_05736, 0),
                f._unknown_92d66[f._unknown_0ffef] = g,
                ++e
            }
            , function _unknown_b11c1(a, b, c, d, e) {
                return _unknown_d2e76(_unknown_a3cd0(a, b) && _unknown_a3cd0(c, d), _unknown_05736, _unknown_05736, 0),
                ++e
            }
            , function _unknown_d5b9c(a, b, c, d, e) {
                return _unknown_d2e76(-_unknown_a3cd0(a, b), _unknown_05736, _unknown_05736, 0),
                ++e
            }
            , function _unknown_4566f(a, b, c, d, e) {
                return _unknown_d2e76(0, _unknown_079d2(_unknown_f9312(a, b)), _unknown_a3cd0(c, d), 1),
                ++e
            }
            , function _unknown_4e27a(a, b, c, d, e) {
                return _unknown_d2e76(_unknown_a3cd0(a, b) + _unknown_a3cd0(c, d), _unknown_05736, _unknown_05736, 0),
                ++e
            }
            , function _unknown_9d841(a, b) {
                _unknown_d2e76(_unknown_a3cd0(a, b), _unknown_05736, _unknown_05736, 0);
                for (var c = _unknown_f836a(); c < _unknown_5e3d4; )
                    _unknown_ba241();
                return 1 / 0
            }
            , function _unknown_ce899(a, b, c, d, e) {
                return _unknown_d2e76(_unknown_a3cd0(a, b) || _unknown_a3cd0(c, d), _unknown_05736, _unknown_05736, 0),
                ++e
            }
            , function _unknown_01b6c(a, b, c, d, e) {
                return _unknown_d2e76(_unknown_a3cd0(a, b) % _unknown_a3cd0(c, d), _unknown_05736, _unknown_05736, 0),
                ++e
            }
            , function _unknown_179a8(a, b, c, d, e) {
                return _unknown_d2e76(_unknown_a3cd0(a, b) >= _unknown_a3cd0(c, d), _unknown_05736, _unknown_05736, 0),
                ++e
            }
            , , function _unknown_a7ca7(a, b, c, d, e) {
                return _unknown_d2e76(_unknown_a3cd0(a, b) / _unknown_a3cd0(c, d), _unknown_05736, _unknown_05736, 0),
                ++e
            }
            , function _unknown_0502d(a, b, c, d, e) {
                return _unknown_118c5.push(_unknown_39d0a[0]),
                ++e
            }
            , function _unknown_6e679() {
                throw _unknown_52a49.pop()
            }
            , function _unknown_9b62c(a, b, c, d, e) {
                return _unknown_39d0a[4] = _unknown_118c5.pop(),
                ++e
            }
            , function _unknown_72dd0(a, b, c, d, e) {
                return ++e
            }
            , function _unknown_15573(a, b, c, d, e) {
                var f = _unknown_a3cd0(a, b);
                return _unknown_d2e76(_unknown_bfbab(f), _unknown_05736, _unknown_05736, 0),
                ++e
            }
            , function _unknown_4ceb2(a, b, c, d, e) {
                return _unknown_d2e76(_unknown_a3cd0(a, b) > _unknown_a3cd0(c, d), _unknown_05736, _unknown_05736, 0),
                ++e
            }
            , function _unknown_a5236(a, b, c, d, e) {
                var f = _unknown_f9312(a, b)
                  , g = _unknown_a3cd0(a, b);
                return _unknown_d2e76(g--, _unknown_05736, _unknown_05736, 0),
                f._unknown_92d66[f._unknown_0ffef] = g,
                ++e
            }
            ];
            return _unknown_cec65(_unknown_0741c);
        }
        ;
    }
    ;AuroraExecution()(window, {
        "b": "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JTUCAQcyNQIBByA1AgEHAzUCAQfClDUCAQctNQIBByA1AgEHMzUCAQcpNQIBBwM1AgEHKjUCAQfCljUCAQfCnzUCAQfCljUCAQc1NQIBB8KgNQIBB8KWNQIBBzE1AgEHwpY1AgEHwp01AgEHwpY1AgEHPjUCAQfCoDUCAQfCljUCAQckNQIBB8KWNQIBB8KdNQIBB8KWNQIBBz41AgEHwqA1AgEHwpY1AgEHKzUCAQfCljUCAQfCnTUCAQfCljUCAQc+NQIBB8KXNQIBB8KWNQIBByM1AgEHwpY1AgEHwqE1AgEHwpY1AgEHPjUCAQfClzUCAQfCljUCAQcjNQIBB8KfNQIBB8KfNQIBB8KaNQIBB8KWNQIBB8KbNQIBB8KWNQIBBzE1AgEHwpY1AgEHwp01AgEHwpY1AgEHMTUCAQfCljUCAQfCojUCAQfCljUCAQcmNQIBByU1AgEHLTUCAQcDNQIBB8KUNQIBBy01AgEHIDUCAQczNQIBByk1AgEHAzUCAQcqNQIBB8KXNQIBB8KWNQIBByM1AgEHMzUCAQcDNQIBByA1AgEHKTUCAQcgNQIBBwE1AgEHwpY1AgEHwp01AgEHwpY1AgEHJjUCAQclNQIBBy01AgEHAzUCAQfClDUCAQcwNQIBByo1AgEHJTUCAQcBNQIBBxk1AgEHAjUCAQcnNQIBByA1AgEHDjUCAQcDNQIBB8KYNQIBBzE1AgEHwpo1AgEHwpc1AgEHwpY1AgEHJDUCAQfCljUCAQfCnTUCAQfCljUCAQckNQIBB8KWNQIBB8KjNQIBB8KWNQIBByM1AgEHMzUCAQcDNQIBByA1AgEHKTUCAQcgNQIBBwE1AgEHwpc1AgEHwpY1AgEHKzUCAQfCljUCAQfCnTUCAQfCljUCAQfCmDUCAQcjNQIBBzM1AgEHAzUCAQcgNQIBByk1AgEHIDUCAQcBNQIBB8KWNQIBB8KjNQIBB8KWNQIBBzE1AgEHwpY1AgEHwqM1AgEHwpY1AgEHJDUCAQfCmjUCAQfCljUCAQfCojUCAQfCljUCAQcjNQIBB8KXNQIBB8KWNQIBBzE1AgEHJTUCAQcBNQIBB8KWNQIBBwM1AgEHNDUCAQckNQIBB8KWNQIBB8KdNQIBB8KWNQIBByU1AgEHLTUCAQckNQIBByo1AgEHJTUCAQcyNQIBByA1AgEHAzUCAQfCpDUCAQcrNQIBB8KlNQIBB8KXNQIBB8KWNQIBByU1AgEHLTUCAQckNQIBByo1AgEHJTUCAQcyNQIBByA1AgEHAzUCAQfCpDUCAQcrNQIBB8KlNQIBB8KWNQIBB8KdNQIBB8KWNQIBByU1AgEHLTUCAQckNQIBByo1AgEHJTUCAQcyNQIBByA1AgEHAzUCAQfCpDUCAQcjNQIBB8KlNQIBB8KXNQIBB8KWNQIBByU1AgEHLTUCAQckNQIBByo1AgEHJTUCAQcyNQIBByA1AgEHAzUCAQfCpDUCAQcjNQIBB8KlNQIBB8KWNQIBB8KdNQIBB8KWNQIBBwM1AgEHNDUCAQckNQIBB8KXNQIBB8KWNQIBBzE1AgEHwqM1AgEHwqM1AgEHwpc1AgEHwpY1AgEHwpw1AgEHwpY1AgEHJTUCAQctNQIBByQ1AgEHKjUCAQclNQIBBzI1AgEHIDUCAQcDNQIBB8KWNQIBB8KdNQIBB8KWNQIBByU1AgEHLTUCAQckNQIBByo1AgEHJTUCAQcyNQIBByA1AgEHAzUCAQfClDUCAQcrNQIBBwI1AgEHIzUCAQczNQIBB8KYNQIBB8KeNQIBB8KeNQIBB8KaNQIBB8KXNQIBB8KWNQIBBwE1AgEHIDUCAQcDNQIBByI1AgEHATUCAQczNQIBB8KWNQIBByU1AgEHLTUCAQckNQIBByo1AgEHJTUCAQcyNQIBByA1AgEHAzUCAQfClzUCAQfCliYBBAEFBAfCpgEFKARPAgEjAQkBAzAEUAEHDwQoAQMmAQQBBTUHIwczNQIBByQ1AgEHIjUCAQcDJgEEAQg1ByUHLTUCAQckNQIBByo1AgEHJTUCAQcyNQIBByA1AgEHAyYBAgEBNQcxByU1AgEHATUCAQfCljUCAQcjNQIBByc1AgEHwpY1AgEHwp01AgEHwpY1AgEHwp41AgEHwp41AgEHwpc1AgEHwpY1AgEHJzUCAQcCNQIBB8KWNQIBB8KbNQIBB8KWNQIBByM1AgEHJzUCAQfCljUCAQfCnTUCAQfCljUCAQclNQIBBy01AgEHJDUCAQcqNQIBByU1AgEHMjUCAQcgNQIBBwM1AgEHwpQ1AgEHMDUCAQcqNQIBByU1AgEHATUCAQcONQIBBwM1AgEHwpg1AgEHIzUCAQczNQIBByQ1AgEHIjUCAQcDNQIBB8KW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",
        "d": ["r", "o", "t", "Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P", "A", "S", "D", "F", "G", "H", "J", "K", "L", "Z", "X", "C", "V", "B", "N", "M", "q", "w", "e", "y", "u", "i", "p", "a", "s", "d", "f", "g", "h", "j", "k", "l", "z", "x", "c", "v", "b", "n", "m", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "$", "_", 80, 1420, 0, 1421, 1458, 1459, 1496, 1509, 1659, 1660, 1728, 1729, 1776, 1777, 1824, 1825, 2202, 2203, 2240, 2241, 2516, 2517, 2580, 2581, 2604, 2605, 2660, 2673, 2690, 2691, 2728, 2790, 2953, 2954, 2969, 2970, 3015, 3016, 3420, 3421, 3443, 3444, 3476, 3477, 3884, 3885, 4290, 4291, 4651, 4652, 4934, 5075, 6600, 7396, 7436, 7437, 7479, 7480, 7622, 7623, 7775, 7776, 7816, 7817, 7999, 8000, 8051, 8062, 8700, "window", 1, "", 2, 100001, 8701, 8712, 100002, 8713, 8811, 8812, 8841, 8842, 8877, ".", 16, " ", ";", "(", "!", ")", "{", "}", "=", "\"", "-", ",", ">", "%", "+", "[", "]", 3, "/", 2147483647, 1497, 1508, 9, "\n", 86, 148, 17, false, 44, 255, 12, 46, 33, 24, 85, 10, "Math", 100, 45, 90, 201, 197, 112, 212, 289, 288, 374, 372, 305, 34, 13, 35, 4, 47, 76, 154, 18, 6, 8, 168, 220, 258, 259, "undefined", null, 52, "getClientKeys", 2661, 2672, "#", 31, 2729, 2789, 57, 56, 59, 42, 37, 153, 156, 61, ":", 140, 116, 26, 41, 3432918353, 461845907, 166, 65535, 4294967295, 15, 19, 5, 27492, 58964, 48, 243, 356, 306, 2246822507, 3266489909, 392, 391, 406, 14, true, 376, "ArrayValid", 340, 379, 381, 383, 385, 387, 389, "console", 398, 397, 404, 30, 161, 170, 214, 269, 309, 0.5, 364, 395, 21, 29, 353, 352, 359, "<", "'", 125, 62, 20, 262, 261, 281, "crypto", 157, 66, 104, "Uint8Array", 4935, 4993, 10000000, 1000, 4000, 100000000000, "RegExp", "performance", 191, 198, 200, 4994, 5074, "Number", 38, 64, 6601, 6615, 6616, 6688, 6689, 6705, 6706, 6722, 6723, 6735, 6736, 6749, 6750, 6810, 6811, 6871, 6872, 6932, 6933, 6993, 6994, 7115, 7116, 7189, 7190, 7395, 7, 22, 11, 23, 1732584201, 4023233415, 2562383102, 271733878, 1478, 3614090360, 3905402710, 606105819, 3250441966, 4118548399, 1200080426, 2821735955, 4249261313, 1770035416, 2336552879, 4294925233, 2304563134, 1804603682, 4254626195, 2792965006, 1236535329, 4129170786, 3225465664, 643717713, 3921069994, 3593408605, 38016083, 3634488961, 3889429448, 568446438, 3275163606, 4107603335, 1163531501, 2850285829, 4243563512, 1735328473, 2368359562, 4294588738, 2272392833, 1839030562, 4259657740, 2763975236, 1272893353, 4139469664, 3200236656, 681279174, 3936430074, 3572445317, 76029189, 3654602809, 3873151461, 530742520, 3299628645, 4096336452, 1126891415, 2878612391, 4237533241, 1700485571, 2399980690, 4293915773, 2240044497, 1873313359, 4264355552, 2734768916, 1309151649, 4149444226, 3174756917, 718787259, 3951481745, 139, 32, 2147483648, 1073741824, 1073741823, 58, 3221225472, 71, 128, 70, "\\", 202, 87, 127, 2048, 135, 192, 63, 224, 39, 134, 141, "PluginArray", 79, "Plugin", 133, 145, 144, 151, "MimeTypeArray", 83, "MimeType", 138, 143, 175, 174, 181, 89, 43, 50, "__bfi", 8052, 8061, 142, 121, 91, 107, 113, 160, 180, 179, 182, 223, 273, 278, 591, 587, 557, 94, 36]
    });
}
)();

var sign = window.signature({
    "date": {
        "dateType": 1,
        "dateInfo": {
            "checkInDate": "20260119",
            "checkOutDate": "20260120"
        }
    },
    "destination": {
        "type": 1,
        "geo": {
            "cityId": 58,
            "countryId": 1
        },
        "keyword": {
            "word": ""
        }
    },
    "extraFilter": {
        "childInfoItems": [],
        "ctripMainLandBDCoordinate": true,
        "sessionId": "53f9bc3bfb0043a4b392c9af26026d24",
        "extendableParams": {
            "tripWalkDriveSwitch": "T",
            "isUgcSentenceB": "",
            "multiLangHotelNameVersion": "A"
        }
    },
    "filters": [
        {
            "type": "17",
            "title": "Trip.com 推薦",
            "value": "1",
            "filterId": "17|1"
        },
        {
            "type": "",
            "title": "",
            "value": "",
            "filterId": "undefined"
        },
        {
            "type": "80",
            "title": "每房每晚價格（未連稅及附加費）",
            "value": "0",
            "filterId": "80|0|1"
        },
        {
            "filterId": "29|1",
            "type": "29",
            "value": "1|2"
        }
    ],
    "roomQuantity": 1,
    "marketInfo": {
        "received": false,
        "isRechargeSuccessful": false,
        "guideBannerInfo": {
            "title": "歡迎！預訂住宿即享{0}10%{/0}優惠！",
            "subItems": [
                "獲取優惠代碼，節省高達 10%",
                "下載 App，獲取另一個優惠代碼，節省5%（最多 HK$50）"
            ],
            "bannerSubItems": [
                {
                    "text": "獲取優惠代碼，節省高達 10%",
                    "iconType": "yes"
                },
                {
                    "text": "下載 App，獲取另一個優惠代碼，節省5%（最多 HK$50）",
                    "iconType": "yes"
                },
                {
                    "text": "使用您的優惠代碼",
                    "iconType": "plus"
                }
            ]
        },
        "unclaimedActivityInfos": [
            {
                "strategyId": 0,
                "activityId": 349,
                "property": 5,
                "couponShowType": ""
            }
        ],
        "authInfo": {
            "isLogin": false
        },
        "extraInfo": {
            "SpecialActivityId": "T"
        }
    },
    "paging": {
        "pageIndex": 1,
        "pageSize": 10,
        "pageCode": "10320668148"
    },
    "dynamicRefresh": {
        "tokenList": [
            "eJw9yrEOgyAUBdB/ubPD4ykUmDvUOLS/YPAlkqo1iINp/HcZmq4n54vxk2VqB/iaXG00U4UcZ9lyP6/w6masJbLcaKUrhFHCu13gwcSGlHL44XPPf2UqOsRtnfrjlWIQ+IZciXtKsoSjxEd3x3kBlxojSg==",
            "eJyrVsrIL0nN8UxRsjIxNrMwMddRKsnMTS0uScwtULIyNDezsDAwsLQwNjA20FFKzkhNzvbMU7JSMjIwMjMwNLRUggr6l5bARY0MgKIpmcUFOYmVAUWZyalKVhaGIN2lRUWpecmVQIUe3i5KtQBltyLo",
            "eJw9yjkOgzAQBdC7/JpivMSxXVMEpSBXQGYkLJYgYwqEuDsuorRP78TwzTw1PbzS2hlRIceZt9zNK7x4GmuJnFWkqEIYOIzNAg9J0pAQDj9s9/xXSUX7uK1Td3xSDAzv9KPEPSVewlHi613jugFkTSLs",
            "eJyrVsrIL0nN8UxRsjIxNrMwMtFRKsnMTS0uScwtULIyNDezsDAwsLQwNjA20FFKzkhNzvbMU7JSMjIwMjMwNLRUggr6l5bARY0MgKIpmcUFOYmVAUWZyalAcwwMLIAqS4uKUvOSK4EqPbxdlGoBhE0jEw==",
            "eJyrVsrIL0nN8UxRsjIxNjY2M9RRKsnMTS0uScwtULIyNDezsDAwsDAyMTU01VFKzkhNzvbMU7JSMjIwMjMwNLRUggr6l5bARY0MgKIpmcUFOYmVAUWZyalAo80tgQpLi4pS85IrgQo9vF2UagFiASLp",
            "eJyrVsrIL0nN8UxRsjI2MbE0MtNRKsnMTS0uScwtULIyNDezsDAwsDAyMTU01VFKzkhNzvbMU7JSMjIwMjMwNLRUggr6l5bARY0MgKIpmcUFOYmVAUWZyalAo80NDIAqS4uKUvOSK4EqPbxdlGoBhW0jFw==",
            "eJw9y7EOgjAYReF3uTPDbZFSOjtIHOQVSPkTGgFJKQMxvjs1Ma5fznljfCWZ2gFOsdasaC4FUphlS/28Zq2NtWRjS5Ys4Efxz3aBg6Y2VKrBDx97+qtm1iFs69QfXQxe4Cp+7z1GWfyRw9v9is8JresjbQ==",
            "eJyrVsrIL0nN8UxRsjIxNrMwNtVRKsnMTS0uScwtULIyNDezsDAwsLQwNjA20FFKzkhNzvbMU7JSMjIwMjMwNLRUggr6l5bARY0MgKIpmcUFOYmVAUWZyalAoy0tgQpLi4pS85IrgQo9vF2UagFlbCLy",
            "eJw9yr0OgyAUBtB3+WaHCygF5g4aB30FgzeR1L8gDsb03ctgup6cG9OWeG5GuFLpStgCKSx8pGHZ4cRLG0NkjSJFBfzE/tOscJAkNQlh8WB3pr9KyjqGY5+Hq4/BM5ytyhzPGHn1V451+8b3B2SzIu0=",
            "eJw9yrEOgyAUBdB/ubPDAwwCc4eaDu0vEHiJpGoN4mCM/14G43pyDgy/wmMf4VqljWoblDTxWvy0wIlOG0NkjSJFDcLA4dvPcJAkNQlhceF7K7dKqhrTuox+/+QUGK4jW+OWM89hr/H5euD8A2SMIus=",
            "eJw9y7EKgzAURuF3+WeHm6umMXOHBgd9BYkXDFUrMQ4ivrsWStePcw4MnySj62EL1mXBGVKYZE3dtMCqhzaGqDI55ZTBD+LfboYFE2tSqsIPmy39lenWPqzL2O1tDF5guaTvvsUos9/v8lU/cV6CfCMN",
            "eJyrVsrIL0nN8UxRsjIxNrMwNtJRKsnMTS0uScwtULIyNDezsDAwsDAyMTU01VFKzkhNzvbMU7JSMjIwMjMwNLRUggr6l5bARY0MgKIpmcUFOYmVAUWZyalKVpaWQHOTS4uKUvOSK4EKPbxdlGoBZJ8i7w=="
        ]
    },
    "head": {
        "platform": "PC",
        "cver": "0",
        "cid": "1768793853618.fceaJNj1Qktf",
        "bu": "IBU",
        "group": "trip",
        "aid": "",
        "sid": "",
        "ouid": "",
        "locale": "zh-HK",
        "timezone": "8",
        "currency": "HKD",
        "pageId": "10320668148",
        "vid": "1768793853618.fceaJNj1Qktf",
        "guid": "",
        "isSSR": false,
        "extension": [
            {
                "name": "cityId",
                "value": "58"
            },
            {
                "name": "checkIn",
                "value": "2026-01-19"
            },
            {
                "name": "checkOut",
                "value": "2026-01-20"
            },
            {
                "name": "region",
                "value": "HK"
            }
        ]
    }
})

console.log("sign:", sign)