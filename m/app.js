/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./m/src/js/app.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./components/Binder.ts":
/*!******************************!*\
  !*** ./components/Binder.ts ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Binder; });
class Binder {
    constructor(v) {
        this.data = v;
        this.items = new Map();
    }
    update(path) {
        return fetch(path).then(response => response.json()).catch(error => console.log('[tfech]', error)).then(res => {
            const { server_dtm, service_dtm, update_dtm, data } = res;
            this.data.keywordList = data;
            this.data.time.progress_dtm = this.data.time.progress_dtm || server_dtm;
            this.data.time.server_dtm = server_dtm;
            this.data.time.service_dtm = service_dtm;
            this.data.time.update_dtm = update_dtm;
        });
    }
    addProcess(key, inst) {
        this.items.set(key, inst);
    }
}


/***/ }),

/***/ "./components/Calendar.ts":
/*!********************************!*\
  !*** ./components/Calendar.ts ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(global) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Calendar; });
/* harmony import */ var _Util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Util */ "./components/Util.ts");
/* harmony import */ var _Controller__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Controller */ "./components/Controller.ts");


const g = global;
const selector = {};
class Calendar extends _Controller__WEBPACK_IMPORTED_MODULE_1__["default"] {
    constructor(d) {
        super(d);
    }
    prev() {
        this.update(this._getDate('subtract'));
    }
    next() {
        this.update(this._getDate('add'));
    }
    today() {
        this.update(g.KEYWORD_URL);
    }
    render() {
        let { service_dtm, min_dtm, server_dtm, update_dtm } = this.binder.data.time, { prev, next, today } = selector;
        const timeLog = document.querySelector('.timeLog');
        try {
            timeLog.innerText = `${g.moment(update_dtm).format('YYYY.MM.DD HH:mm')} ${_Util__WEBPACK_IMPORTED_MODULE_0__["krStr"][0]}`;
        }
        catch (e) {
            console.log('.timeLog not found', e);
        }
        service_dtm = service_dtm.split(' ')[0];
        min_dtm = min_dtm.split(' ')[0];
        server_dtm = server_dtm.split(' ')[0];
        // 최신 날짜 일때
        if (service_dtm >= server_dtm) {
            next.setAttribute('disabled', 'true');
            today.style.display = 'none';
            // 안내문구 노출
            timeLog.style.display = 'block';
        }
        else if (service_dtm <= min_dtm) {
            prev.setAttribute('disabled', 'true');
        }
        else {
            next.removeAttribute('disabled');
            prev.removeAttribute('disabled');
            today.style.display = 'inline-block';
            timeLog.style.display = 'none';
        }
        // 날짜 변경
        const t = service_dtm.split('-');
        document.querySelector('.timeline .year').innerText = t[0];
        document.querySelector('.timeline .month').innerText = t[1];
        document.querySelector('.timeline .date').innerText = t[2];
    }
    _getDate(type) {
        if (!type) {
            throw Error('_getDate: empty parameter');
        }
        if (!g.KEYWORD_URL || !g.moment) {
            throw Error('KEYWORD_URL undefined or moment undefined');
        }
        let { service_dtm, min_dtm, server_dtm } = this.binder.data.time, date = (service_dtm).split(' ');
        date[0] = g.moment(service_dtm)[type](1, 'days').format('YYYY-MM-DD');
        /**
         * 제약 사항: 최소, 최대 날짜에 해당 할 경우 핸들링 불가 설정
         */
        if (date[0] <= server_dtm.split(' ')[0] && date[0] >= min_dtm.split(' ')[0]) {
            return `${g.KEYWORD_URL}?service_dtm=${date.join('%20')}`;
        }
        return g.KEYWORD_URL;
    }
    _update() {
        this.render();
        this.binder.items.get('Progress').render();
    }
    _addEvent(p) {
        Object.entries(p).forEach(([key, el]) => {
            selector[key] = el;
            el.addEventListener('click', this[key].bind(this));
        });
    }
}

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../node_modules/webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./components/Controller.ts":
/*!**********************************!*\
  !*** ./components/Controller.ts ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Controller; });
class Controller {
    constructor(data) {
        this.binder = data;
    }
    update(path) {
        this.binder.update(path).then(() => {
            this._update();
        });
    }
    addEvent(f) {
        this._addEvent(f);
    }
    removeEvent() {
        this._removeEvent();
    }
    _addEvent(p) {
        throw 'overwrite method';
    }
    _removeEvent() {
        throw 'overwrite method';
    }
    _update() {
        throw 'overwrite method';
    }
    _render() {
        throw 'overwrite method';
    }
}


/***/ }),

/***/ "./components/Data.ts":
/*!****************************!*\
  !*** ./components/Data.ts ***!
  \****************************/
/*! exports provided: Data */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Data", function() { return Data; });
class Data {
    constructor() {
        this.time = {
            min_dtm: '2020-08-20 09:00:00',
            progress_dtm: '',
            server_dtm: '',
            service_dtm: '',
            update_dtm: ''
        };
        this.keywordList = {};
    }
}



/***/ }),

/***/ "./components/Progress.ts":
/*!********************************!*\
  !*** ./components/Progress.ts ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(global) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Progress; });
/* harmony import */ var _Controller__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Controller */ "./components/Controller.ts");
/* harmony import */ var _tmp_TMP_PROGRESS__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../tmp/TMP_PROGRESS */ "./tmp/TMP_PROGRESS.js");


let init = false;
const g = global, ss = (1000 * 60 * 60 * 24); // (((1000 * 60) * 60) * 24) - (1000 * 60) // 23시간 59분 => 23시간으로 변경
class Progress extends _Controller__WEBPACK_IMPORTED_MODULE_0__["default"] {
    constructor(d) {
        super(d);
        this.options = {
            target: '#newsEdgeProgress',
            viewBox: '0,0,254,48',
            width: '254',
            height: '48',
        };
    }
    get limit() {
        return Number(this.options.width) * (g.moment(this.binder.data.time.server_dtm).valueOf() - g.moment(this.binder.data.time.server_dtm).startOf('day').valueOf()) / ss;
    }
    render(opt) {
        const props = opt || this.options;
        const target = document.querySelector(props.target);
        //초기화
        target.innerHTML = _tmp_TMP_PROGRESS__WEBPACK_IMPORTED_MODULE_1__["default"];
        let t = new Map(['.pathBack', '.pathFront', '.timeGroup'].map(i => [i, document.querySelector(i)]));
        let hm = new Map(['.hh', '.mm'].map(i => [i, document.querySelector(`.timeText ${i}`)]));
        /* 프로퍼티 설정 */
        Object.entries(props).forEach(([k, v]) => {
            if (k !== 'target')
                target.setAttribute(k, v);
        });
        // 드래드에 속한 자식요소들 위치 지정
        for (let [k, v] of t) {
            if (k === '.timeGroup') {
                v.setAttribute('transform', `matrix(1,0,0,1,${this.limit},24)`);
            }
            else {
                v.setAttribute('d', `M0 24 l ${this.limit} 0.001`);
            }
        }
        // 툴팁 시간 표시
        hm.get('.hh').textContent = g.moment(this.binder.data.server_dtm).format('HH');
        hm.get('.mm').textContent = this._mm(10);
    }
    /* n분 단위 표시 */
    _mm(n) {
        let [a1, a2] = g.moment(this.binder.data.server_dtm).format('mm');
        if (a2 < n) {
            return `${a1}0`;
        }
        else {
            return `${a1}${n}`;
        }
    }
}

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../node_modules/webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./components/Util.ts":
/*!****************************!*\
  !*** ./components/Util.ts ***!
  \****************************/
/*! exports provided: krStr */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "krStr", function() { return krStr; });
const krStr = [
    decodeURI('%EA%B8%B0%EC%A4%80'),
];



/***/ }),

/***/ "./m/src/js/app.ts":
/*!*************************!*\
  !*** ./m/src/js/app.ts ***!
  \*************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(global) {/* harmony import */ var _components_Data__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../components/Data */ "./components/Data.ts");
/* harmony import */ var _components_Binder__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../components/Binder */ "./components/Binder.ts");
/* harmony import */ var _components_Calendar__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../components/Calendar */ "./components/Calendar.ts");
/* harmony import */ var _components_Progress__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../components/Progress */ "./components/Progress.ts");




const g = global;
const DATA = new _components_Binder__WEBPACK_IMPORTED_MODULE_1__["default"](new _components_Data__WEBPACK_IMPORTED_MODULE_0__["Data"]());
const calendar = createInstance(_components_Calendar__WEBPACK_IMPORTED_MODULE_2__["default"]);
const progress = createInstance(_components_Progress__WEBPACK_IMPORTED_MODULE_3__["default"]);
g.dd = DATA;
g.cc = calendar;
g.pp = progress;
function createInstance(c) {
    const inst = new c(DATA);
    DATA.addProcess(c.name, inst);
    return inst;
}
/**
* calendar 이벤트 바인딩
* */
(() => {
    const prev = document.querySelector('.btnTravel.prev'), next = document.querySelector('.btnTravel.next'), today = document.querySelector('.btnTravel.today');
    calendar.addEvent({ prev, next, today });
})();
document.addEventListener('DOMContentLoaded', () => {
    // 초기화
    DATA.update(g.KEYWORD_URL).then(() => {
        calendar.render();
        progress.render();
    });
});
/*
* 인터페이스.update(path).then(res=> {
*   데이터 업데이트
*   달력업데이트
*   버블업데이트
*   프로그래스 업데이트;
* })
*
*
* */ 

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../node_modules/webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./node_modules/webpack/buildin/global.js":
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ "./tmp/TMP_PROGRESS.js":
/*!*****************************!*\
  !*** ./tmp/TMP_PROGRESS.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
var TMP_PROGRESS = "\n    <g class=\"progress\">\n        <defs><linearGradient id=\"pathLinear\"><stop offset=\"0%\" stop-color=\"#639eff\"></stop><stop offset=\"100%\" stop-color=\"rgba(91, 108, 255, .98)\"></stop></linearGradient></defs>\n        <path class=\"pathBackboard\" d=\"M 0 20 H 0 V 28M 4 20 H 4 V 28M 8 20 H 8 V 28M 12 20 H 12 V 28M 16 20 H 16 V 28M 20 20 H 20 V 28M 24 20 H 24 V 28M 28 20 H 28 V 28M 32 20 H 32 V 28M 36 20 H 36 V 28M 40 20 H 40 V 28M 44 20 H 44 V 28M 48 20 H 48 V 28M 52 20 H 52 V 28M 56 20 H 56 V 28M 60 20 H 60 V 28M 64 20 H 64 V 28M 68 20 H 68 V 28M 72 20 H 72 V 28M 76 20 H 76 V 28M 80 20 H 80 V 28M 84 20 H 84 V 28M 88 20 H 88 V 28M 92 20 H 92 V 28M 96 20 H 96 V 28M 100 20 H 100 V 28M 104 20 H 104 V 28M 108 20 H 108 V 28M 112 20 H 112 V 28M 116 20 H 116 V 28M 120 20 H 120 V 28M 124 20 H 124 V 28M 128 20 H 128 V 28M 132 20 H 132 V 28M 136 20 H 136 V 28M 140 20 H 140 V 28M 144 20 H 144 V 28M 148 20 H 148 V 28M 152 20 H 152 V 28M 156 20 H 156 V 28M 160 20 H 160 V 28M 164 20 H 164 V 28M 168 20 H 168 V 28M 172 20 H 172 V 28M 176 20 H 176 V 28M 180 20 H 180 V 28M 184 20 H 184 V 28M 188 20 H 188 V 28M 192 20 H 192 V 28M 196 20 H 196 V 28M 200 20 H 200 V 28M 204 20 H 204 V 28M 208 20 H 208 V 28M 212 20 H 212 V 28M 216 20 H 216 V 28M 220 20 H 220 V 28M 224 20 H 224 V 28M 228 20 H 228 V 28M 232 20 H 232 V 28M 236 20 H 236 V 28M 240 20 H 240 V 28M 244 20 H 244 V 28M 248 20 H 248 V 28M 252 20 H 252 V 28\" stroke-width=\"1\" stroke=\"#c7ccd1\" fill=\"none\" shape-rendering=\"crispEdges\"></path>\n        <path class=\"pathBack\" d=\"M0 24 l 0 0\" stroke-linecap=\"round\" stroke-width=\"10\" stroke=\"#e6e8ea\"></path>\n        <path class=\"pathFront\" stroke=\"url(#pathLinear)\" d=\"M0 24 l 254 0.01\" stroke-width=\"14\" stroke-linecap=\"round\" fill=\"#5b6cff\"></path>\n        <g class=\"timeGroup\" transform=\"matrix(1,0,0,1,0,24)\">\n            <circle class=\"timeKnob\" r=\"12\" stroke=\"#5b6cff\" stroke-width=\"1\" fill=\"#fff\"></circle>\n            <rect class=\"timeKnobEmpty\" x=\"-24\" y=\"-24\" width=\"48\" height=\"48\" fill=\"transparent\"></rect>\n            <svg class=\"timeTooltip\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" width=\"91.44\" height=\"40\" viebox=\"0,0,91.44,40\" style=\"overflow: visible\">\n              <defs>\n                <filter id=\"filter1Back\" width=\"128.9%\" height=\"167.4%\" x=\"-14.4%\" y=\"-28.5%\" filterUnits=\"objectBoundingBox\">\n                    <feOffset result=\"shadowOffsetOuter1\" in=\"SourceAlpha\" dy=\"2\"></feOffset>\n                    <feGaussianBlur result=\"shadowBlurOuter1\" in=\"shadowOffsetOuter1\" stdDeviation=\"4\"></feGaussianBlur>\n                    <feColorMatrix in=\"shadowBlurOuter1\" values=\"0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.12 0\"></feColorMatrix>\n                    <rect id=\"filter1Rect\" width=\"91.44\" height=\"40\" x=\"-45.72\" y=\"-64\" rx=\"24\"></rect>\n                </filter>\n                <filter id=\"filter2Back\" width=\"356.7%\" height=\"367.1%\" x=\"-128.3%\" y=\"-85%\" filterUnits=\"objectBoundingBox\">\n                    <feOffset result=\"shadowOffsetOuter1\" in=\"SourceAlpha\" dy=\"4\"></feOffset>\n                    <feGaussianBlur result=\"shadowBlurOuter1\" in=\"shadowOffsetOuter1\" stdDeviation=\"3\"></feGaussianBlur>\n                    <feColorMatrix in=\"shadowBlurOuter1\" values=\"0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.0754206731 0\"></feColorMatrix>\n                    <path id=\"filter2Path\" transform=\"translate(-14 -24)\" d=\"M 19.285 0 L 15 8.235 10.714 0 h 8.571z\"></path>\n                </filter>\n              </defs>\n              <g>\n                  <use fill=\"#000\" filter=\"url(#filter1Back)\" xlink:href=\"#filter1Rect\"></use>\n                  <use fill=\"#fff\" xlink:href=\"#filter1Rect\"></use>\n                  <use fill=\"#000\" filter=\"url(#filter2Back)\" xlink:href=\"#filter2Path\"></use>\n                  <use fill=\"#fff\" xlink:href=\"#filter2Path\"></use>\n                  <text class=\"timeText\" alignment-baseline=\"middle\" text-anchor=\"middle\" x=\"0\" y=\"-38\" font-size=\"22.352px\">\n                      <tspan class=\"hh\" dx=\"0\" dy=\".1em\" fill=\"#000\">00</tspan><tspan class=\"dtm-div\" dx=\"4\" dy=\"-.1em\" fill=\"#7c8aff\">:</tspan><tspan class=\"mm\" dx=\"5\" dy=\".1em\" fill=\"#000\">00</tspan>\n                  </text>\n              </g>\n          </svg>\n        </g>\n    </g>\n";
/* harmony default export */ __webpack_exports__["default"] = (TMP_PROGRESS);

/***/ })

/******/ });
//# sourceMappingURL=app.js.map