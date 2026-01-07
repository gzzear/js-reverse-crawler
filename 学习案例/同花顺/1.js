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


  Window = v_saf(function Window(){if (!v_new_toggle){ throw TypeError("Illegal constructor") };}); _inherits(Window, EventTarget)
  Screen = v_saf(function Screen(){if (!v_new_toggle){ throw TypeError("Illegal constructor") };}); _inherits(Screen, EventTarget)
  Node = v_saf(function Node(){if (!v_new_toggle){ throw TypeError("Illegal constructor") };}); _inherits(Node, EventTarget)
  Document = v_saf(function Document(){;}); _inherits(Document, Node)
  HTMLDocument = v_saf(function HTMLDocument(){if (!v_new_toggle){ throw TypeError("Illegal constructor") };Object.defineProperty(this, 'location', {get(){return location}})}); _inherits(HTMLDocument, Document)
  Element = v_saf(function Element(){if (!v_new_toggle){ throw TypeError("Illegal constructor") };}); _inherits(Element, Node)
  HTMLElement = v_saf(function HTMLElement(){if (!v_new_toggle){ throw TypeError("Illegal constructor") };}); _inherits(HTMLElement, Element)
  HTMLHtmlElement = v_saf(function HTMLHtmlElement(){if (!v_new_toggle){ throw TypeError("Illegal constructor") };}); _inherits(HTMLHtmlElement, HTMLElement)
  HTMLHeadElement = v_saf(function HTMLHeadElement(){if (!v_new_toggle){ throw TypeError("Illegal constructor") };}); _inherits(HTMLHeadElement, HTMLElement)
  HTMLBodyElement = v_saf(function HTMLBodyElement(){if (!v_new_toggle){ throw TypeError("Illegal constructor") };}); _inherits(HTMLBodyElement, HTMLElement)
  Navigator = v_saf(function Navigator(){if (!v_new_toggle){ throw TypeError("Illegal constructor") };this._plugins = typeof PluginArray=='undefined'?[]:v_new(PluginArray); this._mimeTypes = typeof MimeTypeArray=='undefined'?[]:v_new(MimeTypeArray)})
  PluginArray = v_saf(function PluginArray(){if (!v_new_toggle){ throw TypeError("Illegal constructor") };
    this[0]=v_new(Plugin);this[0].description="Portable Document Format";this[0].filename="internal-pdf-viewer";this[0].length=2;this[0].name="PDF Viewer";
    this[1]=v_new(Plugin);this[1].description="Portable Document Format";this[1].filename="internal-pdf-viewer";this[1].length=2;this[1].name="Chrome PDF Viewer";
    this[2]=v_new(Plugin);this[2].description="Portable Document Format";this[2].filename="internal-pdf-viewer";this[2].length=2;this[2].name="Chromium PDF Viewer";
    this[3]=v_new(Plugin);this[3].description="Portable Document Format";this[3].filename="internal-pdf-viewer";this[3].length=2;this[3].name="Microsoft Edge PDF Viewer";
    this[4]=v_new(Plugin);this[4].description="Portable Document Format";this[4].filename="internal-pdf-viewer";this[4].length=2;this[4].name="WebKit built-in PDF";})
  Plugin = v_saf(function Plugin(){if (!v_new_toggle){ throw TypeError("Illegal constructor") };})
  MimeTypeArray = v_saf(function MimeTypeArray(){if (!v_new_toggle){ throw TypeError("Illegal constructor") };
    this[0]=v_new(Plugin);this[0].description="Portable Document Format";this[0].enabledPlugin={"0":{},"1":{}};this[0].suffixes="pdf";this[0].type="application/pdf";
    this[1]=v_new(Plugin);this[1].description="Portable Document Format";this[1].enabledPlugin={"0":{},"1":{}};this[1].suffixes="pdf";this[1].type="text/pdf";})
  MimeType = v_saf(function MimeType(){if (!v_new_toggle){ throw TypeError("Illegal constructor") };})
  CSSStyleDeclaration = v_saf(function CSSStyleDeclaration(){if (!v_new_toggle){ throw TypeError("Illegal constructor") };})
  Location = v_saf(function Location(){if (!v_new_toggle){ throw TypeError("Illegal constructor") };})
  HTMLCanvasElement = v_saf(function HTMLCanvasElement(){if (!v_new_toggle){ throw TypeError("Illegal constructor") };}); _inherits(HTMLCanvasElement, HTMLElement)
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
  CanvasRenderingContext2D = v_saf(function CanvasRenderingContext2D(){if (!v_new_toggle){ throw TypeError("Illegal constructor") };})
  Performance = v_saf(function Performance(){if (!v_new_toggle){ throw TypeError("Illegal constructor") };}); _inherits(Performance, EventTarget)
  PerformanceEntry = v_saf(function PerformanceEntry(){if (!v_new_toggle){ throw TypeError("Illegal constructor") };})
  PerformanceElementTiming = v_saf(function PerformanceElementTiming(){if (!v_new_toggle){ throw TypeError("Illegal constructor") };}); _inherits(PerformanceElementTiming, PerformanceEntry)
  PerformanceEventTiming = v_saf(function PerformanceEventTiming(){if (!v_new_toggle){ throw TypeError("Illegal constructor") };}); _inherits(PerformanceEventTiming, PerformanceEntry)
  PerformanceLongTaskTiming = v_saf(function PerformanceLongTaskTiming(){if (!v_new_toggle){ throw TypeError("Illegal constructor") };}); _inherits(PerformanceLongTaskTiming, PerformanceEntry)
  PerformanceMark = v_saf(function PerformanceMark(){if (!v_new_toggle){ throw TypeError("Illegal constructor") };}); _inherits(PerformanceMark, PerformanceEntry)
  PerformanceMeasure = v_saf(function PerformanceMeasure(){if (!v_new_toggle){ throw TypeError("Illegal constructor") };}); _inherits(PerformanceMeasure, PerformanceEntry)
  PerformanceNavigation = v_saf(function PerformanceNavigation(){if (!v_new_toggle){ throw TypeError("Illegal constructor") };})
  PerformanceResourceTiming = v_saf(function PerformanceResourceTiming(){if (!v_new_toggle){ throw TypeError("Illegal constructor") };}); _inherits(PerformanceResourceTiming, PerformanceEntry)
  PerformanceNavigationTiming = v_saf(function PerformanceNavigationTiming(){if (!v_new_toggle){ throw TypeError("Illegal constructor") };}); _inherits(PerformanceNavigationTiming, PerformanceResourceTiming)
  PerformanceObserver = v_saf(function PerformanceObserver(){if (!v_new_toggle){ throw TypeError("Illegal constructor") };})
  PerformanceObserverEntryList = v_saf(function PerformanceObserverEntryList(){if (!v_new_toggle){ throw TypeError("Illegal constructor") };})
  PerformancePaintTiming = v_saf(function PerformancePaintTiming(){if (!v_new_toggle){ throw TypeError("Illegal constructor") };}); _inherits(PerformancePaintTiming, PerformanceEntry)
  PerformanceServerTiming = v_saf(function PerformanceServerTiming(){if (!v_new_toggle){ throw TypeError("Illegal constructor") };})
  PerformanceTiming = v_saf(function PerformanceTiming(){if (!v_new_toggle){ throw TypeError("Illegal constructor") };})
  Image = v_saf(function Image(){;return v_new(HTMLImageElement)})
  HTMLImageElement = v_saf(function HTMLImageElement(){if (!v_new_toggle){ throw TypeError("Illegal constructor") };}); _inherits(HTMLImageElement, HTMLElement)
  HTMLMediaElement = v_saf(function HTMLMediaElement(){if (!v_new_toggle){ throw TypeError("Illegal constructor") };}); _inherits(HTMLMediaElement, HTMLElement)
  HTMLUnknownElement = v_saf(function HTMLUnknownElement(){if (!v_new_toggle){ throw TypeError("Illegal constructor") };}); _inherits(HTMLUnknownElement, HTMLElement)
  XMLHttpRequestEventTarget = v_saf(function XMLHttpRequestEventTarget(){if (!v_new_toggle){ throw TypeError("Illegal constructor") };}); _inherits(XMLHttpRequestEventTarget, EventTarget)
  XMLHttpRequest = v_saf(function XMLHttpRequest(){;}); _inherits(XMLHttpRequest, XMLHttpRequestEventTarget)
  Storage = v_saf(function Storage(){if (!v_new_toggle){ throw TypeError("Illegal constructor") };})
  DOMTokenList = v_saf(function DOMTokenList(){if (!v_new_toggle){ throw TypeError("Illegal constructor") };})
  Touch = v_saf(function Touch(){if (!v_new_toggle){ throw TypeError("Illegal constructor") };})
  UIEvent = v_saf(function UIEvent(){if (!v_new_toggle){ throw TypeError("Illegal constructor") };}); _inherits(UIEvent, Event)
  TouchEvent = v_saf(function TouchEvent(){if (!v_new_toggle){ throw TypeError("Illegal constructor") };}); _inherits(TouchEvent, UIEvent)
  Event = v_saf(function Event(){if (!v_new_toggle){ throw TypeError("Illegal constructor") };})
  MouseEvent = v_saf(function MouseEvent(){if (!v_new_toggle){ throw TypeError("Illegal constructor") };}); _inherits(MouseEvent, UIEvent)
  PointerEvent = v_saf(function PointerEvent(){if (!v_new_toggle){ throw TypeError("Illegal constructor") };}); _inherits(PointerEvent, MouseEvent)
  Object.defineProperties(Window.prototype, {
    PERSISTENT: {"value":1,"writable":false,"enumerable":true,"configurable":false},
    [Symbol.toStringTag]: {value:"Window",writable:false,enumerable:false,configurable:true},
  })
  Object.defineProperties(Screen.prototype, {
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
  Object.defineProperties(Node.prototype, {
    nodeType: {"enumerable":true,"configurable":true,"get":function(){return 9},"set":function(){return true}},
    nodeName: {"enumerable":true,"configurable":true,"get":function(){return "#document"},"set":function(){return true}},
    baseURI: {"enumerable":true,"configurable":true,"get":function(){return "https://q.10jqka.com.cn/"},"set":function(){return true}},
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
  Object.defineProperties(Document.prototype, {
    URL: {"enumerable":true,"configurable":true,"get":function(){return "https://q.10jqka.com.cn/"},"set":function(){return true}},
    documentURI: {"enumerable":true,"configurable":true,"get":function(){return "https://q.10jqka.com.cn/"},"set":function(){return true}},
    compatMode: {"enumerable":true,"configurable":true,"get":function(){return "CSS1Compat"},"set":function(){return true}},
    characterSet: {"enumerable":true,"configurable":true,"get":function(){return "GBK"},"set":function(){return true}},
    charset: {"enumerable":true,"configurable":true,"get":function(){return "GBK"},"set":function(){return true}},
    inputEncoding: {"enumerable":true,"configurable":true,"get":function(){return "GBK"},"set":function(){return true}},
    contentType: {"enumerable":true,"configurable":true,"get":function(){return "text/html"},"set":function(){return true}},
    xmlStandalone: {"enumerable":true,"configurable":true,"get":function(){return false},"set":function(){return true}},
    domain: {"enumerable":true,"configurable":true,"get":function(){return "q.10jqka.com.cn"},"set":function(){return true}},
    referrer: {"enumerable":true,"configurable":true,"get":function(){return ""},"set":function(){return true}},
    lastModified: {"enumerable":true,"configurable":true,"get":function(){return "01/07/2026 14:53:08"},"set":function(){return true}},
    readyState: {"enumerable":true,"configurable":true,"get":function(){return "complete"},"set":function(){return true}},
    title: {"enumerable":true,"configurable":true,"get":function(){return "A股市场_同花顺行情中心_同花顺财经网"},"set":function(){return true}},
    dir: {"enumerable":true,"configurable":true,"get":function(){return ""},"set":function(){return true}},
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
  Object.defineProperties(HTMLDocument.prototype, {
    [Symbol.toStringTag]: {value:"HTMLDocument",writable:false,enumerable:false,configurable:true},
  })
  Object.defineProperties(Element.prototype, {
    [Symbol.toStringTag]: {value:"Element",writable:false,enumerable:false,configurable:true},
  })
  Object.defineProperties(HTMLElement.prototype, {
    [Symbol.toStringTag]: {value:"HTMLElement",writable:false,enumerable:false,configurable:true},
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
  Object.defineProperties(Navigator.prototype, {
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
  Object.defineProperties(PluginArray.prototype, {
    [Symbol.toStringTag]: {value:"PluginArray",writable:false,enumerable:false,configurable:true},
  })
  Object.defineProperties(Plugin.prototype, {
    [Symbol.toStringTag]: {value:"Plugin",writable:false,enumerable:false,configurable:true},
  })
  Object.defineProperties(MimeTypeArray.prototype, {
    [Symbol.toStringTag]: {value:"MimeTypeArray",writable:false,enumerable:false,configurable:true},
  })
  Object.defineProperties(MimeType.prototype, {
    [Symbol.toStringTag]: {value:"MimeType",writable:false,enumerable:false,configurable:true},
  })
  Object.defineProperties(CSSStyleDeclaration.prototype, {
    [Symbol.toStringTag]: {value:"CSSStyleDeclaration",writable:false,enumerable:false,configurable:true},
  })
  Object.defineProperties(Location.prototype, {
    [Symbol.toStringTag]: {value:"Location",writable:false,enumerable:false,configurable:true},
  })
  Object.defineProperties(HTMLCanvasElement.prototype, {
    [Symbol.toStringTag]: {value:"HTMLCanvasElement",writable:false,enumerable:false,configurable:true},
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
  Object.defineProperties(CanvasRenderingContext2D.prototype, {
    [Symbol.toStringTag]: {value:"CanvasRenderingContext2D",writable:false,enumerable:false,configurable:true},
  })
  Object.defineProperties(Performance.prototype, {
    timeOrigin: {"enumerable":true,"configurable":true,"get":function(){return 1767768755233.8},"set":function(){return true}},
    [Symbol.toStringTag]: {value:"Performance",writable:false,enumerable:false,configurable:true},
  })
  Object.defineProperties(PerformanceEntry.prototype, {
    [Symbol.toStringTag]: {value:"PerformanceEntry",writable:false,enumerable:false,configurable:true},
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
  Object.defineProperties(PerformanceResourceTiming.prototype, {
    [Symbol.toStringTag]: {value:"PerformanceResourceTiming",writable:false,enumerable:false,configurable:true},
  })
  Object.defineProperties(PerformanceNavigationTiming.prototype, {
    [Symbol.toStringTag]: {value:"PerformanceNavigationTiming",writable:false,enumerable:false,configurable:true},
  })
  Object.defineProperties(PerformanceObserver.prototype, {
    [Symbol.toStringTag]: {value:"PerformanceObserver",writable:false,enumerable:false,configurable:true},
  })
  Object.defineProperties(PerformanceObserverEntryList.prototype, {
    [Symbol.toStringTag]: {value:"PerformanceObserverEntryList",writable:false,enumerable:false,configurable:true},
  })
  Object.defineProperties(PerformancePaintTiming.prototype, {
    [Symbol.toStringTag]: {value:"PerformancePaintTiming",writable:false,enumerable:false,configurable:true},
  })
  Object.defineProperties(PerformanceServerTiming.prototype, {
    [Symbol.toStringTag]: {value:"PerformanceServerTiming",writable:false,enumerable:false,configurable:true},
  })
  Object.defineProperties(PerformanceTiming.prototype, {
    [Symbol.toStringTag]: {value:"PerformanceTiming",writable:false,enumerable:false,configurable:true},
  })
  Object.defineProperties(Image.prototype, {
    [Symbol.toStringTag]: {value:"Image",writable:false,enumerable:false,configurable:true},
  })
  Object.defineProperties(HTMLImageElement.prototype, {
    [Symbol.toStringTag]: {value:"HTMLImageElement",writable:false,enumerable:false,configurable:true},
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
  Object.defineProperties(XMLHttpRequestEventTarget.prototype, {
    [Symbol.toStringTag]: {value:"XMLHttpRequestEventTarget",writable:false,enumerable:false,configurable:true},
  })
  Object.defineProperties(XMLHttpRequest.prototype, {
    OPENED: {"value":1,"writable":false,"enumerable":true,"configurable":false},
    HEADERS_RECEIVED: {"value":2,"writable":false,"enumerable":true,"configurable":false},
    LOADING: {"value":3,"writable":false,"enumerable":true,"configurable":false},
    DONE: {"value":4,"writable":false,"enumerable":true,"configurable":false},
    [Symbol.toStringTag]: {value:"XMLHttpRequest",writable:false,enumerable:false,configurable:true},
  })
  Object.defineProperties(Storage.prototype, {
    [Symbol.toStringTag]: {value:"Storage",writable:false,enumerable:false,configurable:true},
  })
  Object.defineProperties(DOMTokenList.prototype, {
    [Symbol.toStringTag]: {value:"DOMTokenList",writable:false,enumerable:false,configurable:true},
  })
  Object.defineProperties(Touch.prototype, {
    [Symbol.toStringTag]: {value:"Touch",writable:false,enumerable:false,configurable:true},
  })
  Object.defineProperties(UIEvent.prototype, {
    [Symbol.toStringTag]: {value:"UIEvent",writable:false,enumerable:false,configurable:true},
  })
  Object.defineProperties(TouchEvent.prototype, {
    [Symbol.toStringTag]: {value:"TouchEvent",writable:false,enumerable:false,configurable:true},
  })
  Object.defineProperties(Event.prototype, {
    CAPTURING_PHASE: {"value":1,"writable":false,"enumerable":true,"configurable":false},
    AT_TARGET: {"value":2,"writable":false,"enumerable":true,"configurable":false},
    BUBBLING_PHASE: {"value":3,"writable":false,"enumerable":true,"configurable":false},
    [Symbol.toStringTag]: {value:"Event",writable:false,enumerable:false,configurable:true},
  })
  Object.defineProperties(MouseEvent.prototype, {
    [Symbol.toStringTag]: {value:"MouseEvent",writable:false,enumerable:false,configurable:true},
  })
  Object.defineProperties(PointerEvent.prototype, {
    [Symbol.toStringTag]: {value:"PointerEvent",writable:false,enumerable:false,configurable:true},
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
  window.document = v_proxy(v_new(HTMLDocument), "document")
  window.location = v_proxy(v_new(Location), "location")
  window.navigator = v_proxy(v_new(Navigator), "navigator")
  window.screen = v_proxy(v_new(Screen), "screen")
  window.clientInformation = navigator
  window.performance = v_proxy(v_new(Performance), "performance")
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

  init_cookie("v=A0O5OJ16Lvf-TeKAZ4NcfAkn1AzouNfUEUwbLnUgn6IZNG3y_YhnSiEcq3CG")
  v_hook_href(window.location, 'location', "https://q.10jqka.com.cn/")
  Location.prototype.toString = v_saf(function toString(){ return "https://q.10jqka.com.cn/" })
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
    return null
  }
  function v_geteles(name, func){
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

var TOKEN_SERVER_TIME = 1767765500.985;
!function(n, t, r, e) {
    !function() {
        var a = r[0]
          , u = n[0]
          , c = n[1]
          , s = n[2]
          , f = e[0]
          , v = n[3]
          , l = t[0]
          , p = n[4]
          , d = r[1]
          , h = n[5]
          , g = n[6]
          , m = r[2]
          , w = n[7]
          , I = t[1]
          , _ = t[2]
          , y = Kn(t[3], e[1], n[8])
          , A = t[4]
          , E = e[2]
          , T = t[5]
          , C = e[3]
          , b = e[4]
          , R = Xn(e[5], e[6])
          , B = n[9]
          , k = t[6]
          , O = Vn(n[10], t[7])
          , S = t[8]
          , P = r[3]
          , M = e[7]
          , L = r[4]
          , x = t[9]
          , D = e[8]
          , N = Kn(t[10], r[5], r[6])
          , j = n[11]
          , X = e[9]
          , F = Hn(t[11], e[10], e[11])
          , W = t[12]
          , H = e[12]
          , V = n[12]
          , $ = t[13]
          , K = Hn(t[14], n[13])
          , U = e[13]
          , Q = r[7]
          , G = Vn(n[14])
          , J = t[15]
          , Y = n[15]
          , q = Xn(r[8], t[16])
          , z = Xn(n[16], e[14], r[9])
          , Z = Kn(t[17], e[15], r[10])
          , nn = t[18]
          , tn = r[11]
          , rn = r[12]
          , en = r[13]
          , an = t[19]
          , on = e[16]
          , un = n[17]
          , cn = Xn(r[14], r[15], r[16])
          , sn = t[20]
          , fn = t[21]
          , vn = r[17]
          , ln = r[18]
          , pn = r[19]
          , dn = e[17]
          , hn = Vn(e[18], n[18])
          , gn = e[19]
          , mn = e[20]
          , wn = t[22]
          , In = r[20]
          , _n = r[21]
          , yn = r[22]
          , An = t[23]
          , En = e[21]
          , Tn = Kn(n[19], e[6], t[24])
          , Cn = n[20]
          , bn = Vn(e[22])
          , Rn = n[21]
          , Bn = Xn(t[25], e[23], r[23])
          , kn = t[26]
          , On = t[27]
          , Sn = a + u + c + s
          , Pn = Kn(n[22], e[24], n[23])
          , Mn = e[25]
          , Ln = t[28]
          , xn = parseInt(t[29], e[26])
          , Dn = e[27]
          , Nn = [new r[24](r[25]), new e[28](f + v + l + p)]
          , jn = [new r[24](t[30]), new r[24](Xn(n[18], e[29]))];
        function Xn() {
            var a = arguments[t[31]];
            if (!a)
                return n[24];
            for (var o = r[26], i = n[25], u = e[27]; u < a.length; u++) {
                var c = a.charCodeAt(u)
                  , s = c ^ i;
                i = i * u % n[26] + r[27],
                o += n[27].fromCharCode(s)
            }
            return o
        }
        var Fn = t[32][n[28]] || r[28].getElementsByTagName(e[30])[n[29]], Wn;
        function Hn() {
            var r = arguments[e[31]];
            if (!r)
                return t[33];
            for (var a = e[32], o = e[33], i = t[34], u = t[35]; u < r.length; u++) {
                var c = r.charCodeAt(u);
                i = (i + n[30]) % o.length,
                c ^= o.charCodeAt(i),
                a += t[36].fromCharCode(c)
            }
            return a
        }
        !function(a) {
            var o = n[31]
              , i = r[29]
              , u = r[30]
              , c = e[34]
              , s = n[32]
              , f = t[37];
            a[o + d + i] = r[31];
            function v() {
                var t = Xn(n[33], e[35], sn);
                this.setCookie(t, r[31]),
                this.getCookie(t) || (a[Xn(n[34], e[36])] = n[35]),
                this.delCookie(t)
            }
            a[u + c] = v;
            function l(r, e, a) {
                var o = an;
                o = Q,
                this.setCookie(r, n[24], t[38], e, a)
            }
            a[h + s + g] = A;
            function p(a, o, i, u, c) {
                var s = r[32]
                  , v = r[33]
                  , l = e[37]
                  , p = n[36][e[38]][r[34]]
                  , d = e[39][t[39]][t[40]]
                  , h = d === Vn(r[35])
                  , g = p.indexOf(f + s + v + m) !== -e[31] || p.indexOf(r[36]) !== -r[37]
                  , _ = a + e[40] + o;
                u && (_ += w + I + l + u),
                c && (_ += r[38] + c),
                i && (_ += e[41] + i),
                h && g && (_ += Vn(t[41]),
                _ += t[42]),
                r[28][Hn(t[43], n[37])] = _
            }
            a[e[42]] = p;
            function A(a) {
                var o, i, u;
                o = i = u = e;
                var c, s, f;
                c = s = f = r;
                var v, l, p;
                v = l = p = n;
                var d, h, g;
                d = h = g = t;
                var m = d[44]
                  , w = d[45]
                  , I = Hn(Bn, p[38])
                  , A = (O,
                k,
                f[28][m + w + _])
                  , E = Kn(u[43], p[39], d[46]) + a + g[47]
                  , T = A.indexOf(E);
                if (T == -d[31]) {
                    if (E = a + c[39],
                    A.substr(o[27], E.length) != E)
                        return;
                    T = f[40]
                }
                var C = T + E[I + y]
                  , b = A.indexOf(i[44], C);
                return b == -d[31] && (b = A[s[41]]),
                A.substring(C, b)
            }
            a[t[48]] = l
        }(Wn || (Wn = {}));
        function Vn() {
            return arguments[r[40]].split(n[24]).reverse().join(t[33])
        }
        var $n;
        !function(a) {
            var o = t[49], i = n[40], u = r[31], s, f = e[39][r[42]], v, l;
            function p() {
                try {
                    return !!(i in r[43] && t[50][i])
                } catch (n) {
                    return void e[27]
                }
            }
            function d(n) {
                try {
                    return s.getItem(n)
                } catch (r) {
                    return t[51]
                }
            }
            function h(n) {
                return function() {
                    l.appendChild(s),
                    s.addBehavior(e[45]),
                    s.load(i);
                    var t = n();
                    return l.removeChild(s),
                    t
                }
            }
            function g(r) {
                var a = n[41]
                  , i = new t[3](Xn(t[52], t[53]),t[54]);
                return r.replace(new t[3](o + a), e[46]).replace(i, n[42])
            }
            a[Hn(c, e[47])] = w;
            function m(n, t) {
                if (void 0 === t)
                    return T(n);
                if (u)
                    I(n, t);
                else {
                    if (!s)
                        return void r[40];
                    A(n, t)
                }
            }
            a[Hn(Tn, t[55])] = m;
            function w() {
                if (u = p(),
                u)
                    s = t[50][i];
                else if (f[n[43]][n[44]])
                    try {
                        v = new ActiveXObject(t[56]),
                        v.open(),
                        v.write(n[45]),
                        v.close(),
                        l = v.w[n[46]][e[27]][t[57]],
                        s = l.createElement(e[48])
                    } catch (r) {
                        s = f.createElement(i),
                        l = f[e[49]] || f.getElementsByTagName(e[30])[t[35]] || f[e[50]]
                    }
            }
            function I(n, t) {
                try {
                    s.setItem(n, t)
                } catch (r) {}
            }
            function _(n) {
                try {
                    s.removeItem(n)
                } catch (t) {}
            }
            a[Kn(e[51], e[52])] = E;
            function y(n) {
                h(function() {
                    n = g(n),
                    s.removeAttribute(n),
                    s.save(i)
                })()
            }
            function A(n, t) {
                h(function() {
                    n = g(n),
                    s.setAttribute(n, t),
                    s.save(i)
                })()
            }
            function E(t) {
                return u ? d(t) : s ? C(t) : void n[29]
            }
            a[Vn(t[58], _n)] = T;
            function T(n) {
                if (u)
                    _(n);
                else {
                    if (!s)
                        return void e[27];
                    y(n)
                }
            }
            function C(n) {
                var t = An;
                t = W,
                h(function() {
                    return n = g(n),
                    s.getAttribute(n)
                })()
            }
        }($n || ($n = {}));
        function Kn() {
            var r = arguments[t[31]];
            if (!r)
                return t[33];
            for (var a = e[32], o = n[25], i = n[29]; i < r.length; i++) {
                var u = r.charCodeAt(i)
                  , c = u ^ o;
                o = u,
                a += n[27].fromCharCode(c)
            }
            return a
        }
        var Un = function() {
            var a = r[44]
              , o = r[45];
            function i(a) {
                this[e[53]] = a;
                for (var o = r[40], i = a[t[59]]; o < i; o++)
                    this[o] = n[29]
            }
            return i[r[46]][r[47]] = function() {
                for (var o = t[60], i = this[n[47]], u = [], c = -n[30], s = n[29], f = i[Kn(r[48], t[61])]; s < f; s++)
                    for (var v = this[s], l = i[s], p = c += l; u[p] = v & parseInt(a + o, t[62]),
                    --l != e[27]; )
                        --p,
                        v >>= t[62];
                return u
            }
            ,
            i[A + E][Xn(e[54], r[49], x)] = function(a) {
                for (var i = t[63], u = this[T + o + i], c = t[35], s = n[29], f = u[Xn(n[48], r[50])]; s < f; s++) {
                    var v = u[s]
                      , l = r[40];
                    do {
                        l = (l << r[51]) + a[c++]
                    } while (--v > n[29]);
                    this[s] = l >>> e[27]
                }
            }
            ,
            i
        }(), Qn;
        !function(a) {
            var o = e[55]
              , i = n[49]
              , u = n[50]
              , c = r[52];
            function s(a) {
                var o, i, u;
                o = i = u = t;
                var c, s, f;
                c = s = f = r;
                var v, p, d;
                v = p = d = e;
                var h, g, m;
                h = g = m = n;
                for (var w = g[29], I = (en,
                on,
                a[d[56]]), _ = []; w < I; ) {
                    var y = l[a.charAt(w++)] << parseInt(p[57], v[58]) | l[a.charAt(w++)] << d[59] | l[a.charAt(w++)] << v[60] | l[a.charAt(w++)];
                    _.push(y >> parseInt(Vn(f[53], Tn), d[61]), y >> c[51] & parseInt(Xn(X, p[62]), g[51]), y & parseInt(u[64], h[52]))
                }
                return _
            }
            function f(n, t, a, i, u) {
                for (var c = n[o + C]; t < c; )
                    a[i++] = n[t++] ^ u & parseInt(r[54], e[61]),
                    u = ~(u * parseInt(e[63], r[55]))
            }
            for (var v = e[64], l = {}, p = n[29]; p < parseInt(Vn(t[65], r[56]), r[51]); p++)
                l[v.charAt(p)] = p;
            function d(n) {
                for (var a = r[40], o = t[35], i = n[t[59]]; o < i; o++)
                    a = (a << r[57]) - a + n[o];
                return a & parseInt(Xn(q, t[66], In), e[61])
            }
            function h(r) {
                var e = d(r)
                  , a = [c, e];
                return f(r, +n[29], a, +t[67], e),
                g(a)
            }
            function g(a) {
                for (var o = r[40], u = (G,
                i,
                a[e[56]]), c = []; o < u; ) {
                    var s = a[o++] << parseInt(b + R, r[51]) | a[o++] << r[51] | a[o++];
                    c.push(v.charAt(s >> parseInt(e[65], n[53])), v.charAt(s >> parseInt(n[54], t[62]) & parseInt(Xn(e[66], r[58], S), e[61])), v.charAt(s >> r[59] & parseInt(B + i, t[46])), v.charAt(s & parseInt(n[55], r[55])))
                }
                return c.join(Vn(r[26], n[56]))
            }
            function m(n) {
                var t, a, o;
                t = a = o = r;
                var i, u, v;
                i = u = v = e;
                var l = s(n);
                if (l[u[27]] != c)
                    return error = i[67],
                    void 0;
                var p = l[t[37]]
                  , h = [];
                return f(l, +a[60], h, +i[27], p),
                d(h) == p ? h : void 0
            }
            a[Vn(r[61])] = g,
            a[Hn($n, n[57], t[68])] = s,
            a[k + u] = h,
            a[O + S] = m
        }(Qn || (Qn = {}));
        var Gn;
        !function(a) {
            var o, i, c;
            o = i = c = t;
            var f, v, l;
            f = v = l = n;
            var p, d, h;
            p = d = h = r;
            var g, I, _;
            g = I = _ = e;
            var y = b
              , A = Xn(g[68], d[62], Mn)
              , T = Kn(h[63], h[64])
              , C = v[58]
              , R = p[65]
              , B = c[69]
              , k = f[59]
              , S = f[60]
              , J = d[66]
              , Y = o[70]
              , q = _[69]
              , z = d[67]
              , Z = i[71]
              , nn = d[68]
              , tn = Kn(f[61], _[70], f[62]);
            function rn() {
                var n = sn;
                return n = G,
                Math.random() * parseInt(I[71], v[51]) >>> v[29]
            }
            function en(n) {
                var t, r, e;
                t = r = e = c;
                var a, o, i;
                a = o = i = g;
                var u, s, f;
                u = s = f = d;
                var v, p, h;
                v = p = h = l;
                var m = v[63]
                  , w = u[69]
                  , I = Kn(k, p[64], Ln)
                  , _ = v[65]
                  , y = s[70]
                  , A = {}
                  , E = function(n, c) {
                    var f = h[66], l = p[63], d = v[66], g, _, y, A;
                    for (c = c.replace(h[67], h[24]),
                    c = c.substring(p[30], c[o[56]] - i[31]),
                    g = c.split(Hn(t[72], i[72], s[71])),
                    y = h[29]; y < g[m + w + f]; y++)
                        if (_ = g[y].split(a[73]),
                        _ && !(_[o[56]] < parseInt(h[68], t[67]))) {
                            for (A = e[67]; A < _[l + I + d]; A++)
                                _[h[30]] = _[a[31]] + s[72] + _[A];
                            _[u[40]] = new h[69](p[70]).test(_[e[35]]) ? _[u[40]].substring(t[31], _[a[27]][r[59]] - r[31]) : _[i[27]],
                            _[r[31]] = new r[3](p[70]).test(_[p[30]]) ? _[u[37]].substring(r[31], _[e[31]][o[56]] - s[37]) : _[o[31]],
                            n[_[t[35]]] = _[t[31]]
                        }
                    return n
                };
                return new a[28](_ + P + y).test(n) && (A = E(A, n)),
                A
            }
            function an(n) {
                var t = f[60]
                  , r = Xn(h[73], l[71], w)
                  , e = v[72];
                if (!(n > I[74])) {
                    n = n || l[29];
                    var a = parseInt(f[73], I[58])
                      , u = (zn,
                    T,
                    c[32].createElement(f[74]));
                    u[f[75]] = location[d[74]] + c[73] + parseInt((new h[75]).getTime() / a) + Vn(v[76]),
                    u[c[74]] = function() {
                        Dn = _[31],
                        setTimeout(function() {
                            an(++n)
                        }, n * parseInt(Hn(_[60], d[76]), i[46]))
                    }
                    ,
                    u[I[75]] = u[d[77]] = function() {
                        var n = Hn(_[76], c[75], v[77])
                          , a = Hn(N, g[77], o[76])
                          , s = l[78];
                        this[l[79]] && this[M + n + a + t] !== r + s + A && this[Xn(f[80], l[81], v[82])] !== h[78] && this[e + L] !== Kn(m, i[77]) || (Dn = o[35],
                        u[c[78]] = u[p[77]] = h[79])
                    }
                    ,
                    v[83][I[49]].appendChild(u)
                }
            }
            y = X;
            function on() {
                var n = new l[84];
                try {
                    return time = d[75].now(),
                    time / parseInt(g[78], I[79]) >>> i[35]
                } catch (t) {
                    return time = n.getTime(),
                    time / parseInt(c[79], d[80]) >>> v[29]
                }
            }
            function un(n) {
                var t = new o[3](o[80]);
                if (dn(n))
                    return n;
                var r = t.test(n) ? -c[81] : -parseInt(o[82], p[60]);
                return n.split(d[81]).slice(r).join(l[4])
            }
            function cn() {
                var n = (s,
                u,
                new v[84]);
                return typeof TOKEN_SERVER_TIME == x + T + C ? I[27] : (time = parseInt(TOKEN_SERVER_TIME),
                time)
            }
            function sn(n) {
                var t, r, e;
                t = r = e = f;
                var a, i, u;
                a = i = u = o;
                var c, s, v;
                c = s = v = h;
                var l = s[82]
                  , p = i[83]
                  , d = new t[69](l + R + p + D,r[85]);
                if (n) {
                    return n.match(d)
                }
            }
            function fn(n, t) {
                var r = l[86]
                  , e = new p[24](Hn(f[87], c[84]),f[85])
                  , a = new p[24](r + B);
                if (n) {
                    var i = n.match(e);
                    if (i) {
                        var u = i[c[31]];
                        return t && a.test(u) && (u = u.split(v[88]).pop().split(o[85])[g[27]]),
                        u
                    }
                }
            }
            function vn(n) {
                var t, r, e;
                t = r = e = l;
                var a, o, u;
                a = o = u = _;
                var c, s, f;
                c = s = f = i;
                var v, p, h;
                v = p = h = d;
                var g = h[83]
                  , m = c[86]
                  , w = u[80];
                if (typeof n === r[89] && n[Vn(v[84], a[81])])
                    try {
                        switch (parseInt(n[e[90]])) {
                        case parseInt(h[85], h[55]):
                            break;
                        case parseInt(h[86], r[52]):
                            top[r[91]][f[87]] = n[f[88]];
                            break;
                        case parseInt(v[87], p[60]):
                            top[Hn(v[88], e[92], E)][g + k + S + J] = n[m + N + w];
                            break;
                        default:
                            break
                        }
                    } catch (I) {}
            }
            function ln(n) {
                var t, r, e;
                t = r = e = v;
                var a, o, i;
                a = o = i = h;
                var u, s, f;
                u = s = f = c;
                for (var l = s[35], p = a[40], d = n[r[93]]; p < d; p++)
                    l = (l << t[94]) - l + n.charCodeAt(p),
                    l >>>= s[35];
                return l
            }
            function pn(n, t, r) {
                gn ? n.addEventListener(t, r) : n.attachEvent(c[89] + t, r)
            }
            function dn(n) {
                var t = pn;
                return t = $,
                new f[69](h[89]).test(n)
            }
            function hn(n) {
                var t, r, e;
                t = r = e = d;
                var a, o, i;
                a = o = i = I;
                for (var u = i[27], c = n[r[41]] - i[31]; c >= e[40]; c--)
                    u = u << o[31] | +n[c];
                return u
            }
            a[c[90]] = en,
            a[o[91]] = an,
            a[Kn(i[92], i[93], p[90])] = vn,
            a[j + X + Y] = mn,
            a[Kn(l[95], l[96], O)] = ln,
            a[v[97]] = rn,
            a[i[94]] = dn,
            a[F + W] = un,
            a[_[82]] = fn,
            a[H + V + q + $] = sn,
            a[z + K + Z + U] = hn,
            a[Hn(p[91], l[98])] = on,
            a[nn + Q + tn + G] = cn;
            var gn = !!g[39][v[99]];
            function mn(n) {
                for (var t = [], r = f[29]; r < n[h[41]]; r++)
                    t.push(n.charCodeAt(r));
                return t
            }
            a[i[95]] = pn
        }(Gn || (Gn = {}));
        var Jn;
        !function(a) {
            var o = t[96]
              , i = Vn(t[97])
              , u = r[92]
              , c = Kn(t[98], t[99], z)
              , s = t[100]
              , f = Xn(r[93], e[83])
              , v = e[84]
              , l = t[101]
              , p = r[40]
              , d = r[40]
              , g = n[29]
              , m = e[27]
              , w = n[29]
              , I = t[35]
              , _ = n[100]
              , y = n[101]in e[85].createElement(r[94]) ? Hn(r[95], n[102]) : o + i + u in n[83] ? c + s + J + Y : q + z;
            Gn.eventBind(e[85], y, E),
            Gn.eventBind(t[32], r[96], B),
            Gn.eventBind(t[32], e[86], B),
            Gn.eventBind(e[85], e[87], A),
            Gn.eventBind(e[85], Kn(Ln, r[97]), b);
            function A(a) {
                g++,
                _ = void 0 == a[Hn(n[103], r[98], an)] || a[t[102]],
                w = a[t[103]],
                I = a[e[88]]
            }
            function E(n) {
                d++
            }
            function T() {
                return m
            }
            function C() {
                return {
                    x: w,
                    y: I,
                    trusted: _
                }
            }
            function b(n) {
                m++
            }
            function R() {
                return d
            }
            function B(n) {
                p++
            }
            function k() {
                return p
            }
            function O() {
                return g
            }
            a[t[104]] = k,
            a[f + v + l] = R,
            a[Hn(h, t[105])] = O,
            a[r[99]] = T,
            a[r[100]] = C
        }(Jn || (Jn = {}));
        var Yn;
        !function(a) {
            var u, c, s;
            u = c = s = t;
            var f, v, l;
            f = v = l = r;
            var d, h, g;
            d = h = g = e;
            var w, I, _;
            w = I = _ = n;
            var A = I[104]
              , E = d[89]
              , T = l[101]
              , C = u[106]
              , b = Vn(d[90], _[105])
              , R = g[91]
              , B = Kn(U, w[106])
              , k = Vn(h[92], l[102])
              , O = c[19]
              , S = w[63]
              , P = h[93]
              , M = s[107]
              , L = f[103]
              , x = I[107]
              , D = Xn(c[108], w[108], _[109])
              , N = c[109]
              , j = v[104]
              , X = w[110]
              , F = w[41]
              , H = Vn(f[105])
              , V = g[94]
              , $ = Kn(h[95], u[110], _[111]);
            BROWSER_LIST = {
                _1: function() {
                    return u[111]in I[36]
                },
                _2: function() {
                    return Xn(_[112], f[106], _[113])in s[50]
                },
                _3: function() {
                    return Hn(_[114], _[115], d[96]) + Z + nn in I[36]
                },
                _4: function() {
                    var n = Z;
                    return n = kn,
                    s[112]in f[43] && !(_[116]in c[32].getElementsByTagName(_[28])[h[27]])
                },
                _5: function() {
                    return u[20] + h[97] + d[98] + tn in u[50] && !(h[99]in g[39])
                },
                _6: function() {
                    return s[112]in w[36] && !i
                },
                _7: function() {
                    var n = l[107]
                      , t = (m,
                    bn,
                    h[100]);
                    return v[108]in c[50] && !_[36][n + t + A + E]
                },
                _8: function() {
                    return Hn(v[109], v[110]) + rn + en + an in u[50] && !d[39][on + un]
                },
                _9: function() {
                    return Kn(W, w[117], _[118])in u[50] && _[36][l[111]]
                },
                _10: function() {
                    return f[112] === navigator[s[113]]
                },
                _11: function() {
                    return l[113] === navigator[Xn(Y, h[101], y)]
                },
                _12: function() {
                    var n = w[119];
                    return T + n in I[36]
                },
                _13: function() {
                    return d[102]in f[43]
                },
                _14: function() {
                    return new l[24](f[114],s[114]).test(navigator.appVersion)
                },
                _15: function() {
                    return l[115]in navigator
                },
                _16: function() {
                    return new u[3](s[115],l[116]).test(navigator.vendor)
                },
                _17: function() {
                    return _[120]in c[50]
                },
                _18: function() {
                    var n, t, r;
                    n = t = r = g;
                    var e, a, i;
                    return e = a = i = s,
                    i[116]in a[50] && new a[3](t[103],a[114]).test(o)
                },
                _19: function() {
                    return h[102]in s[50] && new w[69](d[104],Hn(c[117], v[117], g[105])).test(o)
                },
                _20: function() {
                    return d[102]in l[43] && new w[69](w[121]).test(o)
                },
                _21: function() {
                    return Xn(p, g[106], qn)in l[43] && new I[69](Kn(u[118], c[119], I[122]),Hn(v[118], g[107], v[119])).test(o)
                },
                _22: function() {
                    return d[102]in u[50] && new _[69](f[120]).test(o)
                },
                _23: function() {
                    return Xn(d[108], _[123], c[120])in s[50] && new s[3](h[109]).test(o)
                },
                _24: function() {
                    return l[121]in h[39] && l[122]in s[50]
                },
                _25: function() {
                    var n = v[123]
                      , t = w[49];
                    return C + n + t in _[36]
                }
            };
            function K() {
                return f[124] == (navigator[s[121]] || navigator[v[125]])
            }
            function Q() {
                for (var n = [], t = s[35]; t < parseInt(s[122], h[79]); t++)
                    n[t] = Ln[t]();
                return Gn.booleanToDecimal(n)
            }
            var G = navigator[h[110]];
            function J() {
                var n = h[111], t = c[123], r;
                try {
                    r = w[83].createElement(n + cn + t).getContext(s[124])
                } catch (e) {}
                return !!r
            }
            function Y() {
                var n = ln;
                return n = rn,
                f[126]
            }
            function q() {
                var n, t, r;
                return n = t = r = s,
                t[51]
            }
            function z(n) {
                var t, r, e;
                t = r = e = d;
                var a, o, i;
                a = o = i = c;
                for (var u = o[35]; u < G[b + R + B]; u++) {
                    var s = G[u][i[125]];
                    if (n.test(s))
                        return !t[27]
                }
                return !r[31]
            }
            function In() {
                return h[112]in l[28]
            }
            function _n() {
                for (var n in BROWSER_LIST)
                    if (BROWSER_LIST.hasOwnProperty(n)) {
                        var t = BROWSER_LIST[n];
                        if (t())
                            return +n.substr(g[31])
                    }
                return u[35]
            }
            function yn() {
                return u[50][g[113]][Hn(sn, h[114], v[127])]
            }
            function An() {
                return w[124] === h[85][_[125]]
            }
            function En(n) {
                var t = c[126];
                if (!s[50][Xn(_[126], s[127])])
                    return !c[31];
                var r;
                try {
                    r = new d[39][sn + k + t + O](n)
                } catch (e) {
                    return !d[31]
                }
                return !!r
            }
            function Tn() {
                var n = w[127]
                  , t = navigator[l[128]];
                return t && t[S + n + fn] > d[27]
            }
            function Cn() {
                return new u[3](_[128],l[116]).test(navigator[_[129]] || navigator[Hn(wn, h[115], L)])
            }
            function bn() {
                for (var n = navigator[Vn(s[128])], t = u[35]; t < Dn[Hn(s[129], v[129])]; t++)
                    if (Dn[t].test(n))
                        return t + s[31];
                return l[40]
            }
            function Rn() {
                var n, t, r;
                n = t = r = v;
                var e, a, o;
                e = a = o = c;
                var i = Q;
                return i = K,
                z(new e[3](r[130],Vn(o[114])))
            }
            function Bn() {
                return navigator.javaEnabled()
            }
            function On() {
                return g[116]
            }
            function Sn() {
                return -parseInt(u[130], u[67]) === (new c[131]).getTimezoneOffset()
            }
            function Pn() {
                return z(new c[3](_[130]))
            }
            function Mn() {
                var n, t, r;
                n = t = r = f;
                var e, a, o;
                e = a = o = g;
                var i, u, c;
                return i = u = c = I,
                z(new u[69](vn + P,o[117])) || En(t[131])
            }
            var Ln = [Bn, Mn, Rn, Pn, yn, xn, K, Cn, In, Sn, J, Tn, An, On, q, Y];
            function xn() {
                try {
                    return g[118]in s[50]
                } catch (n) {
                    return l[126]
                }
            }
            var Dn = [new s[3](ln + pn + M), new u[3](Kn(an, c[132])), new f[24](L + x + D + dn), new u[3](I[131]), new w[69](Hn(s[133], s[134])), new u[3](N + j), new f[24](v[132]), new f[24](v[133]), new g[28](h[119]), new s[3](hn + X + F), new d[28](h[120])];
            function Nn() {
                return plugin_num = w[29],
                navigator[gn + mn] && (plugin_num = navigator[_[132]][I[93]]),
                plugin_num
            }
            a[Vn(I[133])] = bn,
            a[f[134]] = _n,
            a[H + V + wn + $] = Nn,
            a[v[135]] = Q
        }(Yn || (Yn = {}));
        var qn;
        !function(a) {
            var o = r[40], i = r[37], u = e[26], c = e[121], s = parseInt(Kn(n[80], e[122], t[135]), t[67]), f = n[94], v = r[59], l = e[74], p = n[53], d = parseInt(t[29], t[62]), h = parseInt(n[68], n[134]), g = n[135], m = parseInt(e[123], n[51]), w = parseInt(n[136], e[58]), I = parseInt(e[124], t[136]), _ = parseInt(e[125], e[79]), y = parseInt(n[137], n[134]), A = parseInt(e[126], t[67]), E;
            function C() {
                var r = Wn.getCookie(On) || $n.get(Pn);
                if (r && r[t[59]] == parseInt(n[138], t[62])) {
                    var e = Qn.decode(r);
                    if (e && (E.decodeBuffer(e),
                    E[o] != n[29]))
                        return
                }
                E[o] = Gn.random()
            }
            function b() {
                var t = e[31]
                  , a = parseInt(e[127], e[26])
                  , o = r[52]
                  , u = parseInt(e[128], e[26]);
                E = new Un([u, u, u, u, t, t, t, o, a, a, a, a, a, a, a, u, a, t]),
                E[i] = Gn.serverTimeNow(),
                C(),
                E[_] = Dn,
                E[A] = xn,
                E[y] = n[29],
                E[c] = Gn.strhash(navigator.userAgent),
                E[w] = Yn.getBrowserFeature(),
                E[s] = Yn.getPlatform(),
                E[f] = Yn.getBrowserIndex(),
                E[v] = Yn.getPluginNum()
            }
            function R() {
                var n = Y;
                E[y]++,
                E[i] = Gn.serverTimeNow(),
                E[u] = Gn.timeNow(),
                E[_] = Dn,
                E[l] = Jn.getMouseMove(),
                n = q,
                E[p] = Jn.getMouseClick(),
                E[d] = Jn.getMouseWhell(),
                E[h] = Jn.getKeyDown(),
                E[g] = Jn.getClickPos().x,
                E[m] = Jn.getClickPos().y;
                var t = E.toBuffer();
                return Qn.encode(t)
            }
            a[r[136]] = b;
            function B() {
                return R()
            }
            a[Hn(T, r[137])] = B
        }(qn || (qn = {}));
        var zn;
        !function(a) {
            var o = r[138], i = n[139], u = n[140], c = Kn(cn, n[141], L), s = Kn(r[139], r[140]), v = r[141], p = t[137], d = e[129], h = t[138], g = e[130], m = n[142], w = Hn(e[131], t[139], S), I = !!n[36][Vn(e[132])], _, A, E, T, C, b;
            function R(a) {
                var c;
                U(a, t[140], function(a) {
                    return function() {
                        var o = Hn(e[133], t[141]);
                        try {
                            K(arguments[r[37]]) && !$(arguments[r[37]]) ? arguments[n[30]] = x(arguments[n[30]]) : c = W(),
                            a.apply(this, arguments),
                            K(arguments[n[30]]) || (Wn[o + In] || (c = qn.update()),
                            this.setRequestHeader(Pn, c))
                        } catch (i) {
                            return n[143]
                        }
                    }
                }),
                U(a, t[142], function(e) {
                    var a, c, s;
                    a = c = s = n;
                    var f, v, l;
                    f = v = l = t;
                    var p, d, h;
                    p = d = h = r;
                    var m = g;
                    return m = Sn,
                    function() {
                        var n = d[142];
                        try {
                            if (parseInt(this.status) === parseInt(Vn(p[143]), f[136])) {
                                for (var t = e.apply(this, arguments), r = new d[24](n + o + i + u,p[144]), a, c, v = {}; a = r.exec(t); )
                                    v[a[s[30]].toLowerCase()] = a[f[67]];
                                Gn.analysisRst(Gn.parse(v[Ln.toLowerCase()]))
                            }
                        } catch (h) {
                            return l[143]
                        }
                        return e.apply(this, arguments)
                    }
                })
            }
            function B(t) {
                var a = Nn
                  , o = r[43][e[134]];
                o && (a = a.concat(o));
                for (var i = n[29]; i < a[r[41]]; i++)
                    if (a[i].test(t))
                        return n[100];
                return r[126]
            }
            function k() {
                var a = Vn(r[145]);
                X(t[144], function(o) {
                    var i = t[145];
                    return function(u, s) {
                        e[135][a + i][t[146]].call(u) === n[144] && (u = u[r[146]] || Hn(n[145], t[33]));
                        var v = (c,
                        f,
                        W());
                        return s = s || {},
                        Wn[n[146]] ? K(u) ? $ || (u = x(u)) : s[e[136]] ? s[r[147]][Pn] = v : (s[Vn(n[147], r[148])] = new Headers,
                        s[e[136]].append(Pn, v)) : (v = qn.update(),
                        s[t[147]] ? s[e[136]][Pn] = v : (s[r[147]] = new Headers,
                        s[n[148]].append(Pn, v))),
                        o.call(this, u, s)
                    }
                })
            }
            function P() {
                var a, o, i;
                a = o = i = e;
                var u, f, l;
                u = f = l = r;
                var p, d, h;
                p = d = h = n;
                var g, m, w;
                g = m = w = t;
                var y = Yn
                  , A = w[148]
                  , E = h[149]
                  , T = l[28].getElementsByTagName(a[137]);
                function C(n) {
                    var t = a[138]
                      , r = m[149];
                    if (!new h[69](Kn(Gn, w[150])).test(n.protocol))
                        return h[35];
                    var e = n[Kn(d[150], g[151], l[149])];
                    if (!e) {
                        var o = T[i[27]];
                        o && (e = o[a[139]])
                    }
                    if ((!e || new u[24](t + r + c + _n,p[85]).test(e)) && (n[Vn(a[140])].split(m[152])[a[27]] == _ && n[Hn(d[151], i[141], V)]))
                        return h[35];
                    return u[31]
                }
                y = I,
                Gn.eventBind(i[85], l[150], function(n) {
                    n = n || event;
                    var t = n[m[153]] || n[s + A];
                    do {
                        if (t[u[152]] == u[153]) {
                            C(t) && W();
                            break
                        }
                    } while (t = t[l[151]])
                }),
                Gn.eventBind(i[85], yn + v + E, W),
                kn || Gn.eventBind(i[39], o[142], W)
            }
            function M(t) {
                var e = Gn.getHostFromUrl(t, r[31]);
                return e ? b.test(e) : n[100]
            }
            function x(a) {
                var o = g
                  , i = qn.update()
                  , u = jn;
                o = l;
                for (var c = n[29]; c < u[Xn(t[92], t[154], jn)]; c++)
                    if (u[c].test(a))
                        return a;
                return a + (new r[24](r[154]).test(a) ? r[155] : r[156]) + Sn + e[40] + n[152](i)
            }
            function D() {
                function t(n) {
                    return function(t) {
                        try {
                            o(t)
                        } catch (r) {
                            return r
                        }
                        return j(this, n, arguments)
                    }
                }
                function a(n) {
                    I ? U(Element.prototype, n, t) : (U(Fn, n, t),
                    U(r[28].body, n, t))
                }
                function o(t) {
                    if (t && t[e[143]] == e[144]) {
                        var a = t[n[75]];
                        B(a) || ($(a) ? W() : t[r[157]] = x(t.src))
                    }
                }
                n[36][Mn] = Gn[r[158]],
                a(r[159]),
                a(Vn(e[145], n[153]))
            }
            function N() {
                var a = e[146]
                  , o = e[147];
                _ = location[Hn(r[160], n[154], y)].split(n[155])[r[40]],
                A = location[p + a + d],
                T = location[n[156]],
                C = location[Hn(n[157], t[155])],
                E = Gn.getRootDomain(A),
                b = new t[3](An + o + E.replace(new r[24](e[148],n[158]), e[148]) + Vn(e[149], z),n[85]),
                P(),
                F(),
                k(),
                D(),
                W()
            }
            function j(a, o, i) {
                var u = D;
                if (u = O,
                t[156]in o)
                    return o.apply(a, i);
                switch (i[n[93]]) {
                case e[27]:
                    return o();
                case t[31]:
                    return o(i[n[29]]);
                case parseInt(En + Tn, n[51]):
                    return o(i[r[40]], i[n[30]]);
                default:
                    return o(i[t[35]], i[t[67]], i[parseInt(e[150], n[51])])
                }
            }
            function X(r, a) {
                var o = n[159]
                  , i = e[151];
                if (r in t[50]) {
                    t[50].hasOwnProperty(r) && U(t[50], r, a);
                    var u = e[39][o + i + h];
                    if (u) {
                        var c = u[n[160]];
                        c.hasOwnProperty(r) && U(c, r, a)
                    }
                }
            }
            function F() {
                var t = r[161]
                  , e = n[36][t + Cn + g + bn];
                e && R(e.prototype),
                r[43][r[108]] && H()
            }
            function W() {
                var t = n[161]
                  , r = qn.update();
                return Wn.setCookie(On, r, m + Rn + w + t, E, n[162]),
                $n.set(Pn, r),
                r
            }
            window.createV = W;
            function H() {
                var a, o, u;
                a = o = u = n;
                var c, s, f;
                c = s = f = t;
                var v, l, p;
                v = l = p = e;
                var d, h, g;
                d = h = g = r,
                U(h[43], Vn(l[152]), function(n) {
                    var t = (jn,
                    i,
                    s[157]);
                    return function(r) {
                        if (r && new a[69](Hn(c[158], u[163], o[164]),u[85]).test(r))
                            try {
                                W()
                            } catch (e) {
                                return Bn + t
                            }
                        return new n(r)
                    }
                })
            }
            function $(t) {
                var r, e, a;
                return r = e = a = n,
                M(t) && Wn[e[146]]
            }
            function K(t) {
                var a = Gn.getOriginFromUrl(t);
                return a ? !new n[69](n[165] + T).test(a[r[60]]) || !new n[69](C).test(a[e[31]]) : e[116]
            }
            function U(e, a, o) {
                if (!e)
                    return t[51];
                var i = e[a];
                if (!i)
                    return t[51];
                var u = o(i);
                return I || (u[r[162]] = i + n[24]),
                u[n[166]] = i,
                e[a] = u,
                r[31]
            }
            a[e[153]] = N
        }(zn || (zn = {}));
        var Zn;
        !function(r) {
            function a() {
                var n = parseInt(t[159], e[61]);
                setInterval(function() {
                    Gn.getServerTime()
                }, n)
            }
            function o() {
                Wn.Init(),
                $n.Init(),
                qn.Init(),
                zn.Init(),
                a()
            }
            function i() {
                var n = g;
                n = r;
                try {
                    o()
                } catch (t) {
                    return t
                }
            }
            n[36][n[167]] || (i(),
            n[36][t[160]] = t[26])
        }(Zn || (Zn = {}))
    }()
}(["xi", "n-", "v", "ai", ".", "get", "kie", "; d", "\x1c)Aw\x1b", "3", "ced", "strT", "rigi", "]V8a", "w", "l", Array, "Map", Function, 58, "ttpR", "Feb 2050", "fZ,\x19", "\x15\x18;", "", 9527, 256, String, "head", 0, 1, "al", "Coo", 92, 81, !1, window, "[X9^QR", "TR8", "\u250c\u252c", "localStorage", "d", "___", "documentElement", "addBehavior", '<script>document.w=window<\/script><iframe src="/favicon.icon"></iframe>', "frames", "base_fileds", "ZK\x1f", "f", "ode", 2, 16, 8, "14", "3f", 30, "ZV%P\x0e\x03\x12P[X2P", "ned", "r", "e", ")^]a", 86, "le", "\u2559\u253e", "^{", "th", / /g, "10", RegExp, '^".*"$', "\u255b\u0972", "ready", "1200000", "script", "src", "sj.", 56, "ad", "readyState", 14, "\u2545\u0978\u095b\u09f5\u09a9\u090e\u099a\u09d0\u0980\u09d8", "n*.z", document, Date, "i", "[@", 85, "@", "object", "status_code", "location", "TX5TL^9[", "length", 5, 32, "\u2544\u2530\u2542\u252a\u254b\u2538\u2550", "random", "L^;PvX!", "addEventListener", !0, "onwheel", "O_3PT", "*6?v", "rra", " gs\x19?", "\u2543\u252b", "x arm", "\u2541\u0961\u097b\u09ff\u09b4", "\x15t", "Po", "\x1a+FrJ", 22, 12, 34, "KV", "maxHeight", "\u2576\u2515\u2561\u2508\u257e\u251b\u2543\u250c\u256e\u2504\u2561\u2502\u2576", 7, "Object", "opr", "QQBrowser", "%TuD4", "\u2554\u0975\u0948\u09fe\u09bd\u0938", "iso-8859-1", "defaultCharset", 23, "ng", "zh-cn", "language", "Native Client", "^Android", "plugins", "mroftalPteg", 10, 11, "13", "16", "74", "[^\\r\\n]", "*)\\r?$", "\u255b\u253d", "Fri, 01 ", "error", "[object Request]", "^\x16FyT", "allow", "sredaeh", "headers", "it", 95, 60, encodeURIComponent, 46, "PE3S", "#", "host", "0\x1a)_", "g", "Wi", "prototype", "0 GMT", "/", "`z\x1a}lc\x06", 15, "^", "_raw", "CHAMELEON_LOADED"], ["du", "oma", "ie", RegExp, "proto", "base", "enc", 79, "ode", "und", 4, 28, "Domain", "mUrl", 40, "hee", "\u2573\u0952\u0977\u09dc\u09bf\u0928\u099d", 57, "ri", "t", "Acti", "th", "gin", "\\.", "\x18B", Array, !0, "v", "X-Antispider-Message", "11", "s.thsi.cn", 1, document, "", 2333, 0, String, "003", "Thu, 01 Jan 1970 00:00:00 GMT", "location", "protocol", "enon=etisemas ;", "; secure=true", "fH-&", "co", "ok", 16, "=", "delCookie", "^", window, !1, 94, "\u256c\u093c\u0918\u09b2\u09f4\u0978\u09c8\u0996\u09dc\u0994\u09e8\u099a\u0994\u0992\u09ea\u0a4d\u0a26\u09e6\u09f6\u096c\u091e\u09a2\u09be\u09aa\u0998\u0920\u090c\u0911\u0a73\u0981\u09bb\u092f\u09b1", "g", 'KR"', "htmlfile", "ducument", "led", "length", "7", "\u255b\u253e\u2550\u2537\u2543\u252b", 8, "eds", "ff", "001", "\u2551\u097b", 2, "|AX", ":]", "es", "oDec", 13, "//s.thsi.cn/js/chameleon/time.1", "onerror", "\\N\x05", "uy\x1et", "\u255e\u2530\u2544\u2521\u2553\u2532\u2551\u2525\u254c\u253a\u255f", "onload", "1000", "\\.com\\.cn$|\\.com\\.hk$", 3, "10", "{2,}([^\\/\\", "fk%\x1f\x10\bl]LC&F\x07\r\x7f\nd\x18-\x07\x14J~nfkyi\x07kuidj}\x1c", ":", "redi", "href", "redirect_url", "on", "parse", "getServerTime", 59, "\u2556\u2538\u2559\u2535\u254c\u253f\u2556\u2525\u2577\u2504\u2570", "isIPAddr", "eventBind", "onmo", "wesu", "IA`\\", "\u255a\u2535\u2540", "sew", "ell", "isTrusted", "clientX", "getMouseMove", '_R"xWB%P{[?VS', "a", "32", "4gCD", "^iP", "\u2579\u250c\u2561", "callPhantom", "ActiveXObject", "vendor", "i", "Maxthon", "chrome", "\x1f2}e", "}\x1a", "\u2562\u2520\u2552\u253d\u254a\u2539\u255c\u252e", "P\\erk", "msDoNotTrack", "20", "as", "webgl2", "name", "bjec", "\u2576\u097e\u094e\u09f8\u09a6\u0938\u09b6\u09fe\u0996\u09d7\u09a7\u09d2\u09cc", "mroftalp", "$8", "111100000", Date, "\u2569\u253e\u2557\u2539\u250f\u253b", "x\x17r]v", "f^\x06]WY3", 95, 10, "hos", "ow", "\x18\x07f\x0f\b\x07l\x05", "open", "Y[:", "getAllResponseHeaders", "error", "fetch", "type", "toString", "headers", "ement", "se", "\u2569\u2501\u2575\u2501\u2571\u2502\u253d\u2561\u255b", "\u2543\u2522\u2550\u2537\u2552\u2526", "#", "target", "\u255b\u0978\u0954\u09f6\u09a4\u0935", "HE9AWT9Y", "apply", "or", "JbD}p", "124f80", "CHAMELEON_LOADED"], ["he", "lo", "om", ".*", "State", "\u2545\u2520\u2543\u2537", "la;\x19!", "erTi", 65, Array, 19, "t", "veXO", "bjec", 73, "\u2559\u096b", String, "Shock", "^W", "in", "ow", "$", "su", Function, RegExp, "thsi.cn", "", 2333, document, "w", "In", !0, "3ca", "s.c", "hostname", ":sptth", "0033cas.cn", 1, "; path=", "=", 0, "length", "document", window, "37", "_fil", "prototype", "toBuffer", "l%\x16}", "\u2553\u0978\u0959\u09fe\u09b4\u0938\u09ac\u09c4\u0992\u09db\u09a7\u09c3", "\u255b\u0978\u0954\u09f6\u09a4\u0935", 8, 3, "01", "ff", 16, "<A`", 5, "\u2504\u097b", 6, 2, "edocnE46esab", "\u2552\u0979", "A=!", "\u2552\u2534\u255d", "tps?:))?\\/", "f", "bool", "serv", "ng", "}$", "d&", ":", "9~", "protocol", Date, "\x0fSf", "onreadystatechange", "complete", null, 10, ".", "^\\s*(?:(ht", "h", "edoc_sutats", "3e8", "3e9", "1111101010", "iFy\x16", "^(\\d+\\.)+\\d+$", "(c7'^", 72, "heel", 31, "div", "hM", "mousemove", "\u255c\u2539\u2540\u2524\u254b\u253c\u2552", 'QD\x02GMD"P\\', "getKeyDown", "getClickPos", "ActiveX", "3'ha", "^Linu", "ad", "teg", "\u257a\u0972\u0940\u09c2\u09b5\u0929\u099a\u09d8\u099a\u09da\u09b1\u09f4\u09ce\u09d8\u09d8\u0a65", "Uin", "ActiveXObject", "31", 'yT"\\', "WeakMap", "Google Inc.", "Apple Computer, Inc.", "python", "sgAppName", "i", "Q", "y8.", "mT%\x1e", "2345Explorer", "chrome", "MSGesture", "e", "1", "doNotTrack", !1, "8t\x1a>", "languages", "TR8RL_", "PDF|Acrobat", "ShockwaveFlash.ShockwaveFlash", "^MacIntel", "^Linux [ix]\\d+", "getBrowserIndex", "getBrowserFeature", "Init", "MG2TLR", "[ \\t]*(", 62, "\u2544\u2536\u2555\u2510\u257c", "bm", "^(.*?):", "304", "gm", "otorp", "url", "headers", 42, "6p\x15i", "click", "parentNode", "tagName", "A", "\\?", "&", "?", "src", "analysisRst", "insertBefore", 76, "XMLH", "_str"], [".b", "\u2550\u2524\u254c", "type", "gth", "2", Date, "\u2507", "rea", "?\\#\\\\]+)", "oByt", '_R"gWX"', 95, "getO", "imal", "\u2552\u094e\u0959\u09e3\u09bf\u0931\u0982", "\u2551\u2530", "Weak", "roid", "i^", "plug", "ins", "1", "ts", "\u2552\u096f\u0948", "\u255f\u253a\u2542\u252b\u2545\u2568\u251e", "CHAMELEON_CALLBACK", 2, 0, RegExp, "\u2544\u0972\u0914\u09e5\u09b8\u092e\u0987\u099f\u0997\u09d3", "head", 1, "", "V587", "it", "\u2554\u0975\u095f\u09f2\u09bb\u093e\u0981\u09de\u099f\u09d4\u09a7", "\u2556\u0971\u0956\u09fe\u09a7", "in=", "location", window, "=", "; expires=", "setCookie", 9, "; ", "#default#userData", "___$&", "qY?A", "div", "body", "documentElement", "0mU", "\u2550\u2535\u2541", "base_fileds", 44, "len", "length", "18", 10, 12, 6, 16, "\u2506\u092c\u090b\u09a0\u09e1\u096c\u09df\u0980", "83", "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_", "22", 94, "error", "o\x1f", "nFro", "\u255a\u253f\u2571\u251e", "11111111111111111111111111111111", "\x14", ":", 7, "onload", "5\x1e${T", 'LV"', "1750", 8, "_url", "ex\x19=", "getHostFromUrl", "\u2550\u0978\u094e\u09dc\u09bf", "useWh", document, "touchmove", "click", "clientY", "y", "el", "ng", "OXev", "wave", "Plu", "~)l!", 26, "veXO", "bjec", "postMessage", "t8A", "\u2541\u0978\u0954\u09f5\u09bf\u092f", "chrome", "BIDUBrowser", "LBBROWSER", "mMR", "\u2554\u0975\u0948\u09fe\u09bd\u0938", "Q", "2X", "TheWorld", "plugins", "ca", "ontouchstart", "navigator", "OR4QJ^ PJ", "KN%A]Z\x1aTVP#T_R", !1, "i", "localStorage", "^ARM", "^BlackBerry", 3, "\u2506\u2536\u2506", "1100", "14", "17", "10001", "10", "100", "me", "eque", " l", "renetsiLtnevEdda", "^@tuh", "jsonp_ignore", Object, "headers", "base", "^_", "target", "ferh", "PV%]", "unload", "tagName", "SCRIPT", "dlihCdneppa", "tna", "?", "\\.", "$", "11", "nd", "tcejbOXevitcA", "Init"]);

console.log(window.createV())