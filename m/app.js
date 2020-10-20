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

/***/ "./components/Calendar.ts":
/*!********************************!*\
  !*** ./components/Calendar.ts ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(global) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Calendar; });
/* harmony import */ var _Controller__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Controller */ "./components/Controller.ts");

const g = global;
class Calendar extends _Controller__WEBPACK_IMPORTED_MODULE_0__["default"] {
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
    _getDate(type) {
        if (!type) {
            throw Error('_getDate: empty parameter');
        }
        if (!g.KEYWORD_URL || !g.moment) {
            throw Error('KEYWORD_URL undefined or moment undefined');
        }
        let { service_dtm, min_dtm, server_dtm } = this.data.time, date = (service_dtm).split(' ');
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
    }
    _addEvent(p) {
        Object.entries(p).forEach(([key, el]) => {
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
        this.data = data;
    }
    update(path) {
        this.data.update(path).then(() => {
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
    }
    update(path) {
        return fetch(path).then(response => response.json()).catch(error => console.log('[tfech]', error)).then(res => {
            const { server_dtm, service_dtm, update_dtm, data } = res;
            this.keywordList = data;
            this.time.progress_dtm = this.time.progress_dtm || server_dtm;
            this.time.server_dtm = server_dtm;
            this.time.service_dtm = service_dtm;
            this.time.update_dtm = update_dtm;
        });
    }
}



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
/* harmony import */ var _components_Calendar__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../components/Calendar */ "./components/Calendar.ts");


const g = global;
const DATA = new _components_Data__WEBPACK_IMPORTED_MODULE_0__["Data"]();
const calendar = createInstance(_components_Calendar__WEBPACK_IMPORTED_MODULE_1__["default"]);
// const progress = createInstance(Progress);
g.dd = DATA;
g.cc = calendar;
function createInstance(c) {
    return new c(DATA);
}
(() => {
    const N_PREV = document.querySelector('.btnTravel.prev'), N_NEXT = document.querySelector('.btnTravel.next'), N_TODAY = document.querySelector('.btnTravel.today');
    calendar.render = function () {
        let { service_dtm, min_dtm, server_dtm, update_dtm } = this.data.time;
        const timeLog = document.querySelector('.timeLog');
        try {
            timeLog.innerText = `${g.moment(update_dtm).format('YYYY.MM.DD HH:mm')}기준`;
        }
        catch (e) {
            console.log('.timeLog not found');
        }
        service_dtm = service_dtm.split(' ')[0];
        min_dtm = min_dtm.split(' ')[0];
        server_dtm = server_dtm.split(' ')[0];
        // 최신 날짜 일때
        if (service_dtm >= server_dtm) {
            N_NEXT.setAttribute('disabled', 'true');
            N_TODAY.style.display = 'none';
            // 안내문구 노출
            timeLog.style.display = 'block';
        }
        else if (service_dtm <= min_dtm) {
            N_PREV.setAttribute('disabled', 'true');
        }
        else {
            N_NEXT.removeAttribute('disabled');
            N_PREV.removeAttribute('disabled');
            N_TODAY.style.display = 'inline-block';
            timeLog.style.display = 'none';
        }
        // 날짜 변경
        const t = service_dtm.split('-');
        document.querySelector('.timeline .year').innerText = t[0];
        document.querySelector('.timeline .month').innerText = t[1];
        document.querySelector('.timeline .date').innerText = t[2];
    };
    calendar.addEvent({
        prev: N_PREV,
        next: N_NEXT,
        today: N_TODAY
    });
})();
document.addEventListener('DOMContentLoaded', () => {
    // 초기화
    DATA.update(g.KEYWORD_URL).then(() => {
        calendar.render();
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


/***/ })

/******/ });
//# sourceMappingURL=app.js.map