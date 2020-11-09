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
/* WEBPACK VAR INJECTION */(function(global) {/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils */ "./components/utils.js");
/* harmony import */ var _ViewModel__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ViewModel */ "./components/ViewModel.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


const g = global;
let Calendar = class Calendar extends _ViewModel__WEBPACK_IMPORTED_MODULE_1__["default"] {
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
    _init() {
        let { service_dtm, min_dtm, server_dtm, update_dtm } = this.model.time, [prev, next, today] = ['.prev', '.next', '.today'].map(t => document.querySelector(`.btnTravel${t}`));
        const timeLog = document.querySelector('.timeLog');
        try {
            timeLog.innerText = `${g.moment(update_dtm).format('YYYY.MM.DD HH:mm')} ${_utils__WEBPACK_IMPORTED_MODULE_0__["krStr"][0]}`;
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
            timeLog.setAttribute('class', 'timeLog active');
        }
        else if (service_dtm <= min_dtm) {
            prev.setAttribute('disabled', 'true');
        }
        else {
            next.removeAttribute('disabled');
            prev.removeAttribute('disabled');
            today.style.display = 'inline-block';
            timeLog.setAttribute('class', 'timeLog');
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
        let { service_dtm, min_dtm, server_dtm } = this.model.time, date = (service_dtm).split(' ');
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
        // 캘린더 리렌더
        this._init();
        this.updateProcess.forEach((callback) => callback());
    }
    _removeEvent(p) {
    }
    _addEvent(p) {
        if (Array.isArray(p)) {
            p.forEach((i) => {
                this.eventListner.set(`.btnTravel.${i}`, this[i]);
            });
        }
    }
};
Calendar = __decorate([
    _utils__WEBPACK_IMPORTED_MODULE_0__["autobind"]
], Calendar);
/* harmony default export */ __webpack_exports__["default"] = (Calendar);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../node_modules/webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./components/History.ts":
/*!*******************************!*\
  !*** ./components/History.ts ***!
  \*******************************/
/*! exports provided: History */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "History", function() { return History; });
let History = (() => {
    const s = Symbol();
    const o = Symbol();
    return class {
        constructor(t, v) {
            this[s] = v;
            this[o] = t;
            this.data = new Map();
            this._init();
        }
        _init() {
            if (this[o].length > 0) {
                this[o].split(this[s]).forEach(v => {
                    const t = v.split('=');
                    this.data.set(t[0], t[1]);
                });
            }
            else {
                this.data = null;
            }
        }
    };
})();



/***/ }),

/***/ "./components/KeywordList.ts":
/*!***********************************!*\
  !*** ./components/KeywordList.ts ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(global) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return KeywordList; });
/* harmony import */ var _ViewModel__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ViewModel */ "./components/ViewModel.ts");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils */ "./components/utils.js");


const g = global;
let updateTimer;
let creatTimer;
/* 정지 모션 관련 변수 */
let endtimer;
let resizeTime;
let flag = false;
let nodeList = []; // d3 bubble nodeList
let forceList = []; // d3.forceSimulation List
let timeLine; // 버블 클릭 시 타임라인 이벤트
let ww; // 리사이징 width 메모리
class KeywordList extends _ViewModel__WEBPACK_IMPORTED_MODULE_0__["default"] {
    constructor(d) {
        super(d);
        this.options = {
            app: '#newsEdgeBubbles',
            pp: [48, 32, 28.8, 26.6, 24, 20, 20, 20, 20, 20].map((self, i) => i < 4 ? (self / 1.1) : self),
            sizes: [6.66, 5.06, 4.26, 4, 3.73, 3.2, 3.2, 3.2, 3.2, 3.2].map((self, i) => i < 4 ? (self / 1.1) : self),
            color: ['#6284F7', '#69B4F6', '#63C8E6', '#7C6AE2', '#76C453', '#E8E8E8', '#E8E8E8', '#E8E8E8', '#E8E8E8', '#E8E8E8'],
            forceXY: [
                // Portrait Percent
                [
                    { x: .12, y: .026 },
                    { x: .357, y: .357 },
                    { x: .053, y: .453 },
                    { x: .56, y: .213 },
                    { x: .653, y: .693 },
                    { x: .546, y: .001 },
                    { x: .23, y: .80 },
                    { x: .48, y: .80 },
                    { x: .753, y: .46 },
                    { x: .7467, y: .0667 }
                ],
                // Landscape Percent
                [
                    { x: 1.3013, y: .040 },
                    { x: -0.2507, y: 0.5600 },
                    { x: 1.1333, y: 0.1333 },
                    { x: 1.3200, y: 0.0373 },
                    { x: 1.3067, y: 0.3733 },
                    { x: 0.1187, y: 0.1280 },
                    { x: 1.4520, y: 0.3707 },
                    { x: 0.0560, y: 0.0320 },
                    { x: 2.2987, y: 0.2880 },
                    { x: 1.0600, y: 0.4907 }
                ]
            ],
            fColor: ['#ffffff', '#333333'],
            fontY: ['.3em', '-.3em', '-.9em']
        };
        this._resize = this._resize.bind(this);
    }
    // true일때 모바일 가로모드
    get isLandScape() {
        const c2 = window.devicePixelRatio;
        return !g.window.matchMedia('(orientation: portrait)').matches && c2 >= 2;
    }
    get checkLimit() {
        if (this.isLandScape) {
            return [g.window.innerWidth, 375];
        }
        else {
            return g.window.innerWidth >= 800 ? [800, 800] : [g.window.innerWidth, g.window.innerWidth];
        }
    }
    stop() {
        forceList.forEach((v) => {
            v.stop();
        });
    }
    hideEff() {
        let size = nodeList.length, cnt = 0;
        for (let i = 0; i < size; i++) {
            if (i !== size) {
                nodeList[i].attr('class', 'group-wrap remove');
            }
        }
        if (forceList.length > 0) {
            let f = forceList.pop();
            f.stop().alpha(3)
                .force('collide', g.d3.forceCollide().radius((d) => d.radius + 20))
                .alphaDecay(0.01)
                .restart();
            if (endtimer)
                clearTimeout(endtimer);
            endtimer = setTimeout(() => {
                f.stop();
            }, 1000);
        }
    }
    updateBubble() {
        const data = this._updatePosition();
        const svg = document.getElementById('newsEdgeBubbles');
        ww = window.innerWidth;
        svg.setAttribute('width', this.checkLimit[0]);
        svg.setAttribute('height', this.checkLimit[1]);
        svg.setAttribute('viewBox', `0 0 ${this.checkLimit[0]} ${this.checkLimit[1]}`);
        this._createNodes(data);
        this._setForce(data);
        if (updateTimer)
            clearTimeout(updateTimer);
        updateTimer = setTimeout(() => {
            console.log('clear');
            this._removeNodes();
        }, 1000);
    }
    clickEff(i) {
        g.gsap.killTweensOf(timeLine);
        const svg = document.querySelectorAll('.group-wrap .item');
        svg[i].setAttribute('class', 'item active');
        document.getElementById('wrap').setAttribute('class', 'clicked');
        timeLine = g.gsap.timeline({
            onComplete: () => {
                console.log('click stop');
                this.stop();
            }
        });
        timeLine
            .to(svg[i].querySelector('circle'), 0.3, { scale: 0.8, transformOrigin: '50% 50%', ease: 'power3.inOut', duration: 0.4 })
            .to(svg[i].querySelector('circle'), 0.3, { scale: 20, transformOrigin: '50% 50%', ease: 'power3.inOut' });
    }
    _setForce(data) {
        const nodes = g.d3.selectAll('.group-wrap:first-child > svg');
        const tick = function () {
            nodes.attr('x', (d) => d.x - 1)
                .attr('y', (d) => d.y - 1);
        };
        const smf = g.d3.forceSimulation()
            .force('x', g.d3.forceX(this.checkLimit[0] / 2))
            .force('y', g.d3.forceY(this.checkLimit[1] / 2))
            .force("collide", g.d3.forceCollide((d) => d.radius + 4).iterations(2))
            .force("charge", g.d3.forceManyBody())
            .nodes(data)
            .alphaTarget(0)
            .velocityDecay(0.8) // static value
            .on('tick', tick);
        const f = () => {
            //console.log('play')
            return smf.stop()
                .velocityDecay(0.35)
                .force('chargeEffect', g.d3.forceManyBody().strength(0.003))
                .alphaDecay(0.01)
                .alpha(4).on('tick', () => {
                nodes
                    .transition()
                    .duration(100)
                    .attr('x', (d) => d.x - 1)
                    .attr('y', (d) => d.y - 1);
            }).restart();
        };
        /*if(flag === false) {
            smf.on('end', f);
             flag = true;
        } else {
            if(endtimer) clearTimeout(endtimer);
            endtimer = setTimeout(() => {
                const v = f().on('end', f);
                forceList[0] = v;
            }, 6000);
        }*/
        forceList.push(smf);
    }
    _removeNodes() {
        let size = nodeList.length;
        while (size > 1) {
            nodeList.shift().remove();
            size--;
        }
    }
    // d3 attr 메소드 factory
    _attr(t, styles) {
        Object.entries(styles).forEach(([prop, val]) => {
            if (typeof t === 'string') {
                g.d3.select(t).attr(prop, val);
            }
            else {
                t.attr(prop, val);
            }
        });
    }
    // circle 생성
    _createNodes(cdata) {
        const { fColor, color, sizes, fontY } = this.options;
        // svg 그룹추가
        let svg = g.d3.select('#newsEdgeBubbles')
            .insert('g', ':first-child').attr('class', 'group-wrap');
        //  노드
        const group = svg
            .selectAll('.item')
            .data(cdata)
            .enter()
            .append('svg')
            .attr('class', 'item')
            .attr('role', 'list')
            .attr('aria-label', (d, i) => `${i + 1}${_utils__WEBPACK_IMPORTED_MODULE_1__["krStr"][3]}`)
            .attr('x', (d) => d.x)
            .attr('y', (d) => d.y)
            .append('g')
            .attr('class', (d, i) => `n${i}`)
            .on('click', (d) => {
            for (let [key, f] of this.eventListner) {
                f.call(this, d);
            }
            // 타임라인
            //g.gsap.timeline({ defaults: { overwrite: 'auto', ease: 'none' }, paused: true });
            //console.log(this.model.items[d.index])
        });
        group.append('circle')
            .attr('r', (d) => d.radius)
            .attr('cx', 0)
            .attr('cy', 0)
            .attr('fill', (d, i) => color[i]);
        group.append('text')
            .attr('class', 'bubbleText')
            .attr('fill', (d, i) => (i < 5) ? fColor[0] : fColor[1])
            .attr('font-size', (d, i) => {
            let v = (this.isLandScape && g.window.innerWidth > 600 && i < 5) ? sizes[i] + (sizes[i] / 6) : sizes[i];
            return g.d3.scaleLinear().domain([0, 100]).range([0, this.checkLimit[1]])(v) + 'px';
        })
            .selectAll('.lineBreak')
            .data((d, i) => this.model.items[i].keyword_service.split('<br />').map((self) => self).slice(0, 3))
            .enter()
            .append('tspan')
            .attr('class', 'lineBreak')
            .attr('x', 0)
            .attr('y', function () {
            switch (this.parentNode.childElementCount) {
                case 1:
                    return fontY[0];
                case 2:
                    return fontY[1];
                case 3:
                    return fontY[2];
                default:
                    return 0;
            }
        })
            .attr('dy', function (d, i) {
            return i === 0 ? 0 : (i * 1.3) + 'em';
        })
            .text(function (title) {
            return title;
        });
        if (creatTimer)
            clearTimeout(creatTimer);
        creatTimer = setTimeout(() => {
            svg.attr('class', 'group-wrap active');
        }, 100);
        nodeList.push(svg);
    }
    // 초기 svg 요소 생성 - 업데이트와 관련 없음
    _drawSvg() {
        let targetNode = g.d3.select(this.options.app);
        this._attr('#newsEdgeBubbles', {
            width: this.checkLimit[0],
            height: this.checkLimit[1],
            viewBox: [0, 0, this.checkLimit[0], this.checkLimit[1]],
            role: 'group',
            'aria-labelledby': 'title desc',
        });
        // 타이틀 추가
        targetNode.append('title').attr('id', 'title').text(_utils__WEBPACK_IMPORTED_MODULE_1__["krStr"][1]);
        // desc추가
        targetNode.append('desc').attr('id', 'desc').text(_utils__WEBPACK_IMPORTED_MODULE_1__["krStr"][2]);
    }
    // 위치계산
    _updatePosition() {
        const { forceXY, pp } = this.options;
        // var viewBox = 650;
        // var options = bubbles.options;
        let positions, temp = pp;
        if (this.isLandScape) {
            // 모바일 & 가로 모드 일때
            // 버블 크기 조정
            temp = [...pp.map((i) => {
                    return g.window.innerWidth >= 850 ? i / (this.checkLimit[1] / 150) : i - (i / 2.5);
                })];
            const svg = document.getElementById('newsEdgeBubbles');
            svg.setAttribute('height', `${this.checkLimit[1]}`);
            svg.setAttribute('viewBox', `0 0 ${this.checkLimit[0]} ${this.checkLimit[1]}`);
            positions = _utils__WEBPACK_IMPORTED_MODULE_1__["utils"].shuffleArray(forceXY[1]);
        }
        else {
            positions = _utils__WEBPACK_IMPORTED_MODULE_1__["utils"].shuffleArray(forceXY[0]);
        }
        const radiusScale = g.d3.scaleLinear().domain([0, 100]).range([0, this.checkLimit[0]]);
        const xy = pp.map((percent, i) => {
            let r = parseInt(radiusScale(temp[i] / 2));
            return {
                x: Math.floor(this.checkLimit[1] * positions[i].x) + r,
                y: Math.floor(this.checkLimit[1] * positions[i].y) + r,
            };
        });
        return this.model.items.map((d, i) => {
            return {
                radius: parseInt(radiusScale(temp[i] / 2)),
                x: xy[i].x,
                y: xy[i].y
            };
        });
    }
    _resize() {
        // 가로값이 변화가 없다면 실행하지 않음;
        if (window.innerWidth === ww)
            return;
        // 팝업이 열려있지 않은 상태에서만
        if (document.getElementById('wrap').className.indexOf('clicked') < 0) {
            if (resizeTime)
                clearTimeout(resizeTime);
            this.hideEff();
            resizeTime = setTimeout(this.updateBubble.bind(this), 300);
        }
        else {
            document.querySelector('body').setAttribute('data-popupState', 'true');
        }
    }
    _init(options) {
        this.options = Object.assign(this.options, options);
        const data = this._updatePosition();
        this._drawSvg();
        this._createNodes(data);
        this._setForce(data);
        window.addEventListener('resize', this._resize);
    }
    _addEvent(f) {
        console.log(f);
    }
    _removeEvent() { }
    _update() {
        this.updateBubble();
    }
}

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../node_modules/webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./components/Model.ts":
/*!*****************************!*\
  !*** ./components/Model.ts ***!
  \*****************************/
/*! exports provided: Model */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Model", function() { return Model; });
class Model {
    constructor() {
        this.d = {
            min_dtm: '2020-08-20 09:00:00',
            progress_dtm: '',
            server_dtm: '',
            service_dtm: '',
            update_dtm: ''
        };
        this.k = {};
        this.a = {};
        this.rank = 0;
        this.title = '';
    }
    get items() {
        return this.k;
    }
    get time() {
        return this.d;
    }
    get article() {
        return this.a;
    }
    // 프로그래스 날짜가 서버시간보다 지났는지 판단
    get isOverflow() {
        const { server_dtm, progress_dtm } = this.d;
        const s = server_dtm.split(' ').pop();
        const p = progress_dtm.split(' ').pop();
        return this.isToday && p >= s;
    }
    get isToday() {
        const { server_dtm, service_dtm } = this.d;
        return server_dtm.split(' ').shift() === service_dtm.split(' ').shift();
    }
    update(path) {
        try {
            const isToday = path.indexOf('?'); // 키워드 요청: 쿼리스트링이 없으면 달력의 오늘로 간주
            const isAticle = path.indexOf('articleList'); //  카드리스트 요청;
            const t = `${'https://cors-anywhere.herokuapp.com/'}${path}`;
            return fetch(t).then(response => response.json()).catch(error => console.log('[tfech]', error)).then(res => {
                if (isAticle < 0) {
                    const random = res[Math.floor(Math.random() * 3)];
                    // const { server_dtm, service_dtm, update_dtm, data } = random;
                    const { server_dtm, service_dtm, update_dtm, data } = res;
                    let p = this.d.progress_dtm || server_dtm;
                    this.k = Object.entries(data).map(([k, v]) => v);
                    this.d.server_dtm = server_dtm;
                    this.d.service_dtm = service_dtm;
                    this.d.update_dtm = update_dtm;
                    this.d.progress_dtm = `${service_dtm.split(' ').shift()} ${p.split(' ').pop()}`;
                    if (this.isToday && this.isOverflow || isToday < 0) {
                        this.d.progress_dtm = server_dtm;
                    }
                }
                else {
                    this.a = Object.entries(res.data).map(([k, v]) => v);
                    this.title = res.search_link;
                }
            });
        }
        catch (e) {
            console.log(e);
        }
    }
    updateProgress(v) {
        this.d.progress_dtm = v || this.d.server_dtm;
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
/* harmony import */ var _ViewModel__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ViewModel */ "./components/ViewModel.ts");
/* harmony import */ var _tmp_TMP_PROGRESS__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../tmp/TMP_PROGRESS */ "./tmp/TMP_PROGRESS.js");


const g = global, ss = (1000 * 60 * 60 * 24); // 24시간 > ms 변환
let drag; // gsap dragable plugin
let resizeTime;
let flag = false; // 리사이징와 타임라인 관련
class Progress extends _ViewModel__WEBPACK_IMPORTED_MODULE_0__["default"] {
    constructor(d) {
        super(d);
        this.axisX = 0;
        this._resize = this._resize.bind(this);
    }
    get options() {
        return {
            width: Math.min(window.innerWidth, 375) * (254 / 375),
            height: Math.min(window.innerWidth, 375) * (48 / 375),
            r: (Math.min(window.innerWidth, 375) * (24 / 375)) / 2
        };
    }
    get isOverflow() {
        return this.model.isOverflow;
    }
    get isToday() {
        return this.model.isToday;
    }
    // pathBack 리밋트
    get limit() {
        if (this.isToday) {
            return Number(this.options.width) * (g.moment(this.model.time.server_dtm).valueOf() - g.moment(this.model.time.server_dtm).startOf('day').valueOf()) / ss;
        }
        else {
            return Number(this.options.width);
        }
    }
    toggleClass(e) {
        const { _add: _a, _t } = this;
        const { target, currentTarget } = e;
        if (target.classList.contains(_t)) {
            currentTarget.classList.toggle(_a);
        }
    }
    _update() {
    }
    _init(opt) {
        this._drawPath(opt);
        this._updateTooltip();
        window.addEventListener('resize', this._resize);
    }
    _resize() {
        console.log(this.axisX, this.options.width);
        if (resizeTime)
            clearTimeout(resizeTime);
        this._removeEvent();
        resizeTime = setTimeout(() => {
            document.getElementById('newsEdgeProgress').innerHTML = '';
            this._drawPath();
            this._updateTooltip();
            this._addEvent(['.progressWrap']);
            // 드래그 위치 재 설정
            if (flag) {
                document.querySelector('.timeGroup').setAttribute('transform', `matrix(1,0,0,1,${this.limit}, ${this.options.height / 2})`);
                document.querySelector('.pathFront').setAttribute('d', `M0 ${this.options.height / 2} l ${this.limit} .001`);
                g.TweenMax.set(".timeGroup", { x: this.limit });
            }
        }, 300);
    }
    // 프로그레스 바 그리기
    _drawPath(opt) {
        const { width, height, r } = opt || this.options;
        const target = document.querySelector('#newsEdgeProgress');
        //초기화
        if (target.innerHTML.length === 0) {
            target.innerHTML = _tmp_TMP_PROGRESS__WEBPACK_IMPORTED_MODULE_1__["default"];
        }
        const cx = this.axisX = this.isToday && this.isOverflow ? this.limit : this.axisX;
        const now = g.moment(this.model.time.progress_dtm).valueOf();
        const start = g.moment(this.model.time.progress_dtm).startOf('day').valueOf();
        const percent = (now - start) / 86400000;
        const data = {
            front: `M0 ${height / 2} l ${cx} .001`,
            back: `M0 ${height / 2} l ${this.limit} .001`,
            backboard: (function () {
                const time = width / (height * 0.08333333333333333);
                let pathResult = '';
                for (let i = 0; i < time; i++) {
                    pathResult += 'M ' + (height * 0.08333333333333333) * i + ' ' + (height * 0.4166666666666667) + ' H ' + (height * 0.08333333333333333) * i + ' V ' + ((height * 0.4166666666666667) + (height * 0.16666666666666666));
                }
                return pathResult;
            })()
        };
        /* 프로퍼티 설정 */
        target.setAttribute('width', width);
        target.setAttribute('height', height);
        target.setAttribute('viewBox', `0,0,${width},${height}`);
        let [pathBackboard, pathBack, pathFront, timeGroup] = ['.pathBackboard', '.pathBack', '.pathFront', '.timeGroup'].map(i => document.querySelector(i));
        pathBackboard.setAttribute('d', data.backboard);
        pathBack.setAttribute('d', data.back);
        pathFront.setAttribute('d', data.front);
        pathBack.setAttribute('stroke-width', height * 0.20833333333333334);
        pathFront.setAttribute('stroke-width', height * 0.2916666666666667);
        timeGroup.setAttribute('transform', `matrix(1,0,0,1,${cx}, ${height / 2})`);
        document.querySelector('.timeKnob').setAttribute('r', r);
        const timeTooltip = document.querySelector('.timeTooltip');
        timeTooltip.setAttribute('width', `${width * 0.36}`);
        timeTooltip.setAttribute('height', `${height * 0.8333333333333334}`);
        timeTooltip.setAttribute('viebox', `0, 0, ${width * 0.36}, ${height * 0.8333333333333334}`);
        const tooltipRect = g.d3.select('.timeTooltip rect');
        tooltipRect.attr('width', `${width * 0.36}`);
        tooltipRect.attr('height', `${height * 0.8333333333333334}`);
        tooltipRect.attr('x', `${(percent * 100 > 84) ? -(((width * .36) / 2) - (84 - percent * 100)) : -((width * .36) / 2)}`);
        tooltipRect.attr('y', `${-(height + r + 4)}`);
        tooltipRect.attr('rx', ` ${r * 2}`);
        timeTooltip.querySelector('#filter2Path').setAttribute('transform', `translate(-${r + 2} -${r * 2})`);
        const timeText = timeTooltip.querySelector('.timeText');
        timeText.setAttribute('x', `${(84 < percent * 100) ? (84 - percent * 100) : 0}`);
        timeText.setAttribute('y', `${-((r * 3) + 2)}`);
        timeText.setAttribute('font-size', `${width * 0.088}px`);
    }
    /* 이벤트리스너 바인딩 */
    _addEvent(p) {
        const _this = this;
        const end = this.updateProcess.get('dragEnd').bind(this) || function () { };
        let d = document.querySelector('.pathFront').getAttribute('d').split(' ');
        drag = g.Draggable.create('.timeGroup', {
            type: 'x',
            bounds: {
                minX: 0,
                maxX: _this.isToday ? this.limit : Number(this.options.width) - 1
            },
            onDrag: function () {
                const gmt = 32340000; // GMT기준 9시간 차 (1000*60*60*h)
                const dt = Math.abs(ss / Number(_this.options.width)); // this.x 이동 값 > 시간(타임스탬프) 변환값
                const yyymmdd = new Date((_this.model.time.service_dtm).split(' ')[0]).valueOf(); // YYYY-MM-DD;
                let X = _this.axisX = this.x;
                d[3] = String(X);
                _this.model.updateProgress(g.moment((yyymmdd + dt * X) - gmt).format(`YYYY-MM-DD HH:mm:ss`));
                document.querySelector('.newsEdgeProgress').setAttribute('class', 'newsEdgeProgress');
                document.querySelector('.pathFront').setAttribute('d', `${d.join(' ')}`);
                _this._updateTooltip();
            },
            onDragEnd: function () {
                // 마지막 지점에 도달할대
                flag = Math.floor(_this.limit) - Math.floor(this.x) <= 1;
                if (_this.axisX !== this.startX) {
                    end();
                }
            }
        });
        // 접기
        if (Array.isArray(p)) {
            p.forEach((i) => {
                this.eventListner.set(`${i}`, this.toggleClass.bind({ _add: 'active', _t: 'btnProgress' }));
            });
        }
    }
    /* 이벤트 해제 */
    _removeEvent() {
        if (drag) {
            drag[0].kill();
        }
    }
    /* 툴팁업데이트 */
    _updateTooltip() {
        const { progress_dtm } = this.model.time;
        let hm = new Map(['.hh', '.mm'].map(i => [i, document.querySelector(`.timeText ${i}`)]));
        // 툴팁 시간 표시
        hm.get('.hh').textContent = g.moment(progress_dtm).format('HH');
        hm.get('.mm').textContent = this._mm(progress_dtm);
    }
    /* n분 단위 표시 */
    _mm(d) {
        const n = 10;
        let [a1, a2] = g.moment(d).format('mm');
        if (a2 <= n) {
            return `${a1}0`;
        }
        else {
            return `${a1}${n}`;
        }
    }
}

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../node_modules/webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./components/ViewModel.ts":
/*!*********************************!*\
  !*** ./components/ViewModel.ts ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(global) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return ViewModel; });
const g = global;
const s = Symbol();
class ViewModel {
    constructor(data) {
        this[s] = data;
        this.eventListner = new Map();
        this.updateProcess = new Map();
    }
    get model() {
        return this[s];
    }
    update(path) {
        this.model.update(path).then(() => {
            this._update();
        });
    }
    addEvent(f) {
        this._addEvent(f);
        for (let [t, v] of this.eventListner) {
            document.querySelector(t).addEventListener('click', v);
        }
    }
    removeEvent(f) {
        for (let [t, v] of this.eventListner) {
            document.querySelector(t).removeEventListener('click', v);
        }
        this._removeEvent(f);
    }
    init() {
        this._init();
    }
}

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../node_modules/webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./components/utils.js":
/*!*****************************!*\
  !*** ./components/utils.js ***!
  \*****************************/
/*! exports provided: boundMethod, boundClass, utils, krStr, autobind */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "boundMethod", function() { return boundMethod; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "boundClass", function() { return boundClass; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "utils", function() { return utils; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "krStr", function() { return krStr; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "autobind", function() { return autobind; });
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var utils = {
  _ownKeys: function _ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);

    if (Object.getOwnPropertySymbols) {
      var symbols = Object.getOwnPropertySymbols(object);
      if (enumerableOnly) symbols = symbols.filter(function (sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      });
      keys.push.apply(keys, symbols);
    }

    return keys;
  },
  _objectSpread: function _objectSpread(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i] != null ? arguments[i] : {};

      if (i % 2) {
        utils._ownKeys(Object(source), true).forEach(function (key) {
          utils._defineProperty(target, key, source[key]);
        });
      } else if (Object.getOwnPropertyDescriptors) {
        Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
      } else {
        utils._ownKeys(Object(source)).forEach(function (key) {
          Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
      }
    }

    return target;
  },
  _defineProperty: function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  },
  debounce: function debounce(func, wait, immediate) {
    var timeout;
    return function () {
      var context = this,
          args = arguments;

      var later = function later() {
        timeout = null;
        if (!immediate) func.apply(context, args);
      };

      var callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func.apply(context, args);
    };
  },
  getRandomIntInclusive: function getRandomIntInclusive(min, max, dec) {
    min = Math.ceil(min);
    max = Math.floor(max);
    if (!dec) return Math.floor(Math.random() * (max - min + 1)) + min;else return Math.random() * 1;
  },
  shuffleArray: function shuffleArray(array) {
    var result = [].concat(array);

    for (var i = result.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = result[i];
      result[i] = result[j];
      result[j] = temp;
    }

    return result;
  },
  dateFormat: function dateFormat(convertTime, locale) {
    locale = locale || 'Asia/Seoul';
    return moment(convertTime).tz(locale).format();
  },
  isToday: function isToday(time1, time2) {
    return time1.split('T')[0] === time2.split('T')[0];
  },
  convertTime: function convertTime(_convertTime, format) {
    var time = new Date(_convertTime);
    var year = time.getFullYear();
    var month = time.getMonth() + 1;
    var date = time.getDate();
    var hours = time.getHours();
    var minutes = time.getMinutes();
    if (date <= 9) date = '0' + date;
    if (month <= 9) month = '0' + month;
    if (hours <= 9) hours = '0' + hours;
    if (minutes <= 9) minutes = '0' + minutes;

    switch (format) {
      case 'HM':
        return hours + ' : ' + minutes;

      case 'YMD':
        return year + '-' + month + '-' + date;

      case 'YMDH':
        return year + '-' + month + '-' + date + ' ' + hours + ':00:00';

      case 'YMDHM':
        return year + '-' + month + '-' + date + ' ' + hours + ':' + minutes + ':00';

      case 'STANDARD':
        return year + '.' + month + '.' + date + ' ' + hours + ':' + minutes + ' 기준';
    }
  },
  varOperator: function varOperator(operator, param1, param2) {
    switch (operator) {
      case 'prev':
        return param1 - param2;

      case 'next':
        return param1 + param2;
    }
  },
  RGBAToRGB: function RGBAToRGB(rgba) {
    rgba = rgba.substr(5).split(')')[0].split(',');
    var r = Math.round((1 - rgba[3]) * 255 + rgba[3] * rgba[0]);
    var g = Math.round((1 - rgba[3]) * 255 + rgba[3] * rgba[1]);
    var b = Math.round((1 - rgba[3]) * 255 + rgba[3] * rgba[2]);
    return 'rgb(' + r + ',' + g + ',' + b + ')';
  },
  withCommas: function withCommas(v) {
    return v.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  },
  CopyUrlToClipboard: function CopyUrlToClipboard(target) {
    var shareLinkUrl = document.querySelector(target);
    var isIOS = navigator.userAgent.match(/i(Phone|Pod)/i) !== null ? true : false;
    var textArea;

    function createTextArea(text) {
      textArea = document.createElement('textArea');
      textArea.readOnly = true;
      textArea.contentEditable = true;
      textArea.value = text;
      document.body.appendChild(textArea);
    }

    function selectText() {
      var range, selection;

      if (isIOS) {
        range = document.createRange();
        range.selectNodeContents(textArea);
        selection = window.getSelection();
        selection.removeAllRanges();
        selection.addRange(range);
        textArea.setSelectionRange(0, 9999);
      } else {
        textArea.select();
      }
    }

    function copyTo() {
      document.execCommand('copy');
      document.body.removeChild(textArea);
    }

    function copyAlert() {
      var alertEl = document.createElement('div');
      alertEl.setAttribute('class', 'share-alert');
      var alertInner = document.createElement('div');
      alertInner.setAttribute('class', 'inner');
      var alertText = document.createElement('p');
      alertText.textContent = '링크를 클립보드에 복사하였습니다.';
      var alertClose = document.createElement('button');
      alertClose.setAttribute('type', 'button');
      alertClose.textContent = '닫기';
      var alertDimm = document.createElement('div');
      alertDimm.setAttribute('class', 'dimm');
      alertInner.appendChild(alertText);
      alertInner.appendChild(alertClose);
      alertEl.appendChild(alertDimm);
      alertEl.appendChild(alertInner);
      document.body.appendChild(alertEl);
      alertClose.addEventListener('click', function () {
        document.body.removeChild(alertEl);
      });
    }

    createTextArea(shareLinkUrl.value);
    selectText();
    copyTo();
    copyAlert();
  }
};
/**
 * Return a descriptor removing the value and returning a getter
 * The getter will return a .bind version of the function
 * and memoize the result against a symbol on the instance
 */

function boundMethod(target, key, descriptor) {
  var fn = descriptor.value;

  if (typeof fn !== 'function') {
    throw new TypeError("@boundMethod decorator can only be applied to methods not: ".concat(_typeof(fn)));
  } // In IE11 calling Object.defineProperty has a side-effect of evaluating the
  // getter for the property which is being replaced. This causes infinite
  // recursion and an "Out of stack space" error.


  var definingProperty = false;
  return {
    configurable: true,
    get: function get() {
      // eslint-disable-next-line no-prototype-builtins
      if (definingProperty || this === target.prototype || this.hasOwnProperty(key) || typeof fn !== 'function') {
        return fn;
      }

      var boundFn = fn.bind(this);
      definingProperty = true;
      Object.defineProperty(this, key, {
        configurable: true,
        get: function get() {
          return boundFn;
        },
        set: function set(value) {
          fn = value;
          delete this[key];
        }
      });
      definingProperty = false;
      return boundFn;
    },
    set: function set(value) {
      fn = value;
    }
  };
}
/**
 * Use boundMethod to bind all methods on the target.prototype
 */

function boundClass(target) {
  // (Using reflect to get all keys including symbols)
  var keys; // Use Reflect if exists

  if (typeof Reflect !== 'undefined' && typeof Reflect.ownKeys === 'function') {
    keys = Reflect.ownKeys(target.prototype);
  } else {
    keys = Object.getOwnPropertyNames(target.prototype); // Use symbols if support is provided

    if (typeof Object.getOwnPropertySymbols === 'function') {
      keys = keys.concat(Object.getOwnPropertySymbols(target.prototype));
    }
  }

  keys.forEach(function (key) {
    // Ignore special case target method
    if (key === 'constructor') {
      return;
    }

    var descriptor = Object.getOwnPropertyDescriptor(target.prototype, key); // Only methods need binding

    if (typeof descriptor.value === 'function') {
      Object.defineProperty(target.prototype, key, boundMethod(target, key, descriptor));
    }
  });
  return target;
}

function autobind() {
  if (arguments.length === 1) {
    return boundClass.apply(void 0, arguments);
  }

  return boundMethod.apply(void 0, arguments);
} // 웹팩 빌드시 euc-kr(news서버가 euc-kr)로 변환 후 빌드시


var krStr = [decodeURI('%EA%B8%B0%EC%A4%80'), // 기준
// svg 타이틀 > 한눈에보는 오늘
decodeURI('%ED%95%9C%EB%88%88%EC%97%90 %EB%B3%B4%EB%8A%94 %EC%98%A4%EB%8A%98'), // svg desc > 현재시간 실시간 이슈를 키워드 형태로 제공
decodeURI('%ED%98%84%EC%9E%AC%EC%8B%9C%EA%B0%84 %EC%8B%A4%EC%8B%9C%EA%B0%84 %EC%9D%B4%EC%8A%88%EB%A5%BC %ED%82%A4%EC%9B%8C%EB%93%9C %ED%98%95%ED%83%9C%EB%A1%9C %EC%A0%9C%EA%B3%B5'), decodeURI('%EC%88%9C%EC%9C%84 %ED%82%A4%EC%9B%8C%EB%93%9C'), // n 순위 키워드
decodeURI('%EB%B9%84%EC%8A%B7%ED%95%9C %EA%B8%B0%EC%82%AC'), // 비슷한 기사
decodeURI('%EA%B0%9C'), // 개
decodeURI('%EB%8D%94 %EB%B3%B4%EA%B8%B0%0D%0A') // 더 보기
];


/***/ }),

/***/ "./m/src/js/Article.ts":
/*!*****************************!*\
  !*** ./m/src/js/Article.ts ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(global) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Article; });
/* harmony import */ var _components_ViewModel__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../components/ViewModel */ "./components/ViewModel.ts");
/* harmony import */ var _components_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../components/utils */ "./components/utils.js");
/* harmony import */ var _tmp_TMP_ARTICLE__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../tmp/TMP_ARTICLE */ "./tmp/TMP_ARTICLE.js");



const g = global;
let timeLine;
class Article extends _components_ViewModel__WEBPACK_IMPORTED_MODULE_0__["default"] {
    constructor(d) {
        super(d);
        // 카드 옵션
        this.cards = {
            width: 335,
            x: 0,
            initX: 0,
            prevIndex: 0,
            activeIndex: 0,
            distance: 0,
            minDistance: 10,
            gap: 20,
            margin: 10,
            duration: .3,
            offsets: [],
            leng: 6,
            direction: null,
            move: 335 / 2,
            movePercent: 0,
            moveLimit: .10,
            minScale: .92 // 카드 스케일 최소값
        };
        this.out = this.out.bind(this);
        this._moveNewsView = this._moveNewsView.bind(this);
    }
    out() {
        const listItemWrap = document.querySelector('.listItemWrap');
        const svg = document.querySelectorAll('.group-wrap .item');
        const t = 0.3;
        g.gsap.killTweensOf(timeLine);
        // enable scroll
        document.querySelector('body').removeAttribute('style');
        timeLine = g.gsap.timeline({
            onComplete: () => {
                document.getElementById('wrap').setAttribute('class', '');
                svg[this.model.rank].setAttribute('class', 'item');
            }
        });
        // highScore, lowScore 삭제
        document.getElementById('todayListWrap').removeAttribute('class');
        // delete navi
        document.querySelector('.todayListItemCounts').innerHTML = '';
        // delete article list
        listItemWrap.innerHTML = '';
        // 카드 위치 비우기
        this.cards.offsets = [];
        // 카드 위치 초기화
        this.cards.activeIndex = 0;
        timeLine.set('body', { clearProps: 'all', duration: 0 })
            .to(['.btnTodayClose', '.todayListTitle', '.todayListItem'], { autoAlpha: 0, ease: 'power3.inOut', duration: 0 })
            .to(['.todayListItem', '#todayListWrap', listItemWrap], { clearProps: 'all', duration: 0.1 })
            .to('.group-wrap .item.active circle', { scale: 0.8, ease: 'power3.inOut' })
            .to('#wrap', { className: '', duration: 0 })
            .to('.group-wrap .item.active circle', { scale: 1, duration: 0.5 });
    }
    _init() {
        // 템플릿 추가
        const wrap = document.getElementById('todayListWrap');
        if (wrap.innerHTML.length === 0) {
            wrap.innerHTML = _tmp_TMP_ARTICLE__WEBPACK_IMPORTED_MODULE_2__["mobile"];
        }
    }
    _update() {
        document.querySelector('.todayListTitle').innerText = this.model.title.split('?q=').pop();
        document.getElementById('todayListWrap').setAttribute('class', (this.model.rank < 5) ? 'highScore' : 'lowScore');
        // disable scroll
        document.body.style.overflow = 'hidden';
        this._createList();
        this._createNav();
        let t = 0.3;
        timeLine = g.gsap.timeline({
            onComplete: this._bindDrag.bind(this)
        });
        g.gsap.set('.todayListItem', { clearProps: 'all', duration: 0 });
        timeLine
            .to('.btnTodayClose', t, { autoAlpha: 1, delay: 0.5 })
            .fromTo('.todayListTitle', t, { autoAlpha: 0, x: -100, }, { autoAlpha: 1, x: 0 })
            .to('.todayListItem', { autoAlpha: 1, x: 0, delay: 0 });
    }
    _addEvent(p) {
        // 팝업 닫기
        if (Array.isArray(p)) {
            p.forEach((i) => {
                this.eventListner.set(`${i}`, this.out);
            });
        }
    }
    _removeEvent() { }
    _moveNewsView(e) {
        const t = e.target.closest('li');
        const { width, duration } = this.cards;
        t.className = `${t.getAttribute('class')} active`;
        // 뒷판
        g.gsap.delayedCall(duration / 2, function () {
            g.gsap.set('.todayListEffect', {
                x: t.offsetLeft,
                y: t.getBoundingClientRect().top,
                width,
                height: 375,
                borderRadius: (t.className.indexOf('more') < 0) ? width * 0.05970149253731343 : '100%',
                autoAlpha: 1,
                ease: 'power4.inOut',
                onComplete: function () {
                    g.gsap.delayedCall(duration / 2, function () {
                        g.gsap.to('.todayListEffect', duration, {
                            scale: (t.className.indexOf('more') < 0) ? 25 : 50,
                            ease: 'power4.inOut',
                            onComplete: function () {
                                g.gsap.set('body', { clearProps: 'background' });
                                //State.isPopPop = false;
                                //sessionStorage.setItem('TODAY_CARD', 'true');
                                //sessionStorage.setItem('TODAY_CARD_CLICK', 'true');
                                /*if(getUrlQuery && getUrlQuery.target === 'MAIN' && getUrlQuery.v === 'nate_app' && navigator.userAgent.indexOf('iPhone') > 0){
                                    setTimeout(() => {
                                        $('.todayListEffect').removeAttr('style');
                                        $('.listItemWrap .item, .listItemWrap .more').removeClass('active');
                                    }, 500)
                                }*/
                                //g.window.location = t.getAttribute('data-link');
                            }
                        });
                    });
                }
            });
        });
    }
    _createNav() {
        const nav = document.querySelector('.todayListItemCounts');
        const size = this.model.article.length;
        for (let i = 0; i < size + 1; i++) {
            const span = document.createElement('span');
            if (i === size) {
                span.setAttribute('class', `count-more`);
            }
            else if (i === 0) {
                span.setAttribute('class', `count-${i} active`);
            }
            else {
                span.setAttribute('class', `count-${i}`);
            }
            nav.appendChild(span);
        }
    }
    _createList() {
        const listItemWrap = document.querySelector('.listItemWrap');
        this.model.a.forEach((d, i) => {
            let { link_url, artc_title, cp_nm, img_url, insert_dtm } = d;
            const li = document.createElement('li');
            li.setAttribute('class', 'item');
            li.setAttribute('role', 'link');
            li.setAttribute('data-link', String(link_url));
            li.setAttribute('onClick', `olapclick(TOR0${i + 1})`);
            let temp = `
                    <div class="face frontFace">
                        <h5 class="subject">${artc_title}</h5>
                        <div class="info">
                            <div class="state"><span class="provider">${cp_nm}</span><span class="time">${insert_dtm}</span></div>
                            <div class="thumb-nail"><img src="${img_url}" alt=""></div>
                        </div>
                    </div>
                    <div class="face backFace"></div>                
            `;
            li.innerHTML = temp;
            listItemWrap.appendChild(li);
            listItemWrap.addEventListener('click', this._moveNewsView);
        });
        const more = document.createElement('li');
        more.setAttribute('class', 'more');
        more.setAttribute('role', 'link');
        more.setAttribute('data-link', this.model.title);
        more.setAttribute('onClick', `olapclick('TOM00')`);
        more.innerHTML = `
            <div class="face frontFace">
                <div class="innerWrap">${_components_utils__WEBPACK_IMPORTED_MODULE_1__["krStr"][4]}<div>
                    <span class="size">485</span>
                    <span>${_components_utils__WEBPACK_IMPORTED_MODULE_1__["krStr"][5]}</span>
                </div>${_components_utils__WEBPACK_IMPORTED_MODULE_1__["krStr"][6]}
            </div>
            <div class="face backFace"></div>
        `;
        listItemWrap.appendChild(more);
    }
    _bindDrag() {
        const { cards } = this;
        const items = document.querySelectorAll('.listItemWrap .item');
        let ASP, LP, RP;
        // 카드 포지션 설정
        for (var i = 0; i < cards.leng; i++) {
            cards.offsets.push(-((cards.width + cards.margin) * i));
        }
        items.forEach(function (self, j) {
            if (j < cards.activeIndex && j < 4)
                g.gsap.set(self, { autoAlpha: 0, x: cards.width / 2, scale: .92 });
        });
        g.gsap.to('.listItemWrap', cards.duration, { x: cards.offsets[cards.activeIndex] });
        g.Draggable.create('.listItemWrap', {
            type: 'x',
            throwProps: false,
            edgeResistance: .85,
            onDrag,
            onDragStart,
            onDragEnd,
        });
        function onDragStart() {
            cards.initX = this.x;
        }
        function onDrag() {
            cards.distance = this.x - cards.initX;
            cards.x = cards.initX + cards.distance;
            cards.direction = cards.distance > -1 ? 'right' : 'left'; // 터치 방향
            cards.movePercent = Math.abs(cards.distance / cards.width); // 이동한 범위 (%)
            if (cards.direction === 'left') {
                ASP = cards.movePercent <= cards.moveLimit; // 모션 시작 지점
                LP = cards.movePercent - cards.moveLimit; // 왼쪽 이동 범위
                console.log(LP);
                if (cards.activeIndex < cards.leng - 2) {
                    g.gsap.set(items[cards.activeIndex], {
                        autoAlpha: ASP ? 1 : 1 - (LP + cards.moveLimit * 1.1),
                        x: ASP ? 0 : ((LP * 200) <= cards.move) ? (LP * 200) : cards.move,
                        scale: ASP ? 1 : (1 - LP) >= cards.minScale ? (1 - LP) : cards.minScale
                    });
                }
            }
            else {
                ASP = cards.movePercent >= (cards.moveLimit / 2); // 모션 시작 지점
                RP = cards.movePercent - cards.moveLimit; // 오른쪽 이동 범위
                console.log(RP);
                if (cards.activeIndex >= 0 && cards.activeIndex !== 5 && cards.activeIndex - 1 !== -1) {
                    g.gsap.set(items[cards.activeIndex - 1], {
                        autoAlpha: ASP ? (RP + cards.moveLimit * 1.1) : 0,
                        x: ASP ? (cards.move - (RP * 200) >= 0 ? (cards.move - (RP * 200)) : 0) : cards.move,
                        scale: ASP ? ((RP + cards.moveLimit * 2) <= cards.minScale ? cards.minScale : (RP + cards.moveLimit * 2) <= 1 ? (0 + RP + cards.moveLimit * 2) : 1) : cards.minScale
                    });
                }
            }
        }
        function onDragEnd() {
            if (cards.direction === 'left') {
                if (Math.abs(cards.distance) > (cards.minDistance * (cards.width / 100))) {
                    cards.prevIndex = cards.activeIndex;
                    cards.activeIndex = Math.min(cards.activeIndex + 1, cards.leng - 1);
                    if (cards.activeIndex < cards.leng - 1 && cards.activeIndex !== cards.leng - 1) {
                        g.gsap.to(items[cards.activeIndex - 1], cards.duration, {
                            autoAlpha: 0,
                            x: cards.move,
                            scale: cards.minScale
                        });
                    }
                }
            }
            else {
                if (Math.abs(cards.distance) > (cards.minDistance * (cards.width / 100))) {
                    cards.prevIndex = cards.activeIndex;
                    cards.activeIndex = Math.max(0, cards.activeIndex - 1);
                    if (cards.activeIndex >= 0 && cards.activeIndex !== 5) {
                        g.gsap.to(items[cards.activeIndex], cards.duration, {
                            autoAlpha: 1,
                            x: 0,
                            scale: 1
                        });
                    }
                }
            }
            const nav = document.querySelectorAll('.todayListItemCounts span');
            nav.forEach((e) => {
                const getClassName = e.getAttribute('class');
                if (getClassName.indexOf('active') > 0) {
                    e.setAttribute('class', getClassName.split('active').shift());
                }
            });
            nav[cards.activeIndex].setAttribute('class', `${nav[cards.activeIndex].getAttribute('class')} active`);
            if (cards.activeIndex >= 0 && cards.activeIndex !== 5 && cards.activeIndex - 1 !== -1) {
                g.gsap.to(items[cards.activeIndex - 1], cards.duration, { autoAlpha: 0 });
            }
            g.gsap.to('.listItemWrap', cards.duration, { x: cards.offsets[cards.activeIndex] });
        }
    }
}

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../node_modules/webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./m/src/js/app.ts":
/*!*************************!*\
  !*** ./m/src/js/app.ts ***!
  \*************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(global) {/* harmony import */ var _components_Model__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../components/Model */ "./components/Model.ts");
/* harmony import */ var _components_Calendar__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../components/Calendar */ "./components/Calendar.ts");
/* harmony import */ var _components_Progress__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../components/Progress */ "./components/Progress.ts");
/* harmony import */ var _components_KeywordList__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../components/KeywordList */ "./components/KeywordList.ts");
/* harmony import */ var _components_History__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../components/History */ "./components/History.ts");
/* harmony import */ var _Article__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Article */ "./m/src/js/Article.ts");






const g = global;
const DATA = new _components_Model__WEBPACK_IMPORTED_MODULE_0__["Model"]();
const query = new _components_History__WEBPACK_IMPORTED_MODULE_4__["History"](window.location.hash, '$');
const calendar = createInstance(_components_Calendar__WEBPACK_IMPORTED_MODULE_1__["default"]);
const progress = createInstance(_components_Progress__WEBPACK_IMPORTED_MODULE_2__["default"]);
const keyword = createInstance(_components_KeywordList__WEBPACK_IMPORTED_MODULE_3__["default"]);
const article = createInstance(_Article__WEBPACK_IMPORTED_MODULE_5__["default"]);
function createInstance(c) {
    return new c(DATA);
}
// 통계 도메인
g.pvName = 'm_ndr.nate.com/news/today/keyword';
g.dd = DATA;
g.cc = calendar;
g.pp = progress;
g.kk = keyword;
g.a = article;
g.q = query;
/* update process */
calendar.updateProcess.set('progress', function () {
    // 드래그 업데이트
    // css animation 시간 갭차로 인해 update 메소드 안이아니라 밖에서 실헹
    keyword.hideEff();
    // 프로그래스
    progress.removeEvent();
    progress.init();
    progress.addEvent(['.progressWrap']);
    // 드래그 위치 재 설정
    let axisX = (progress.isOverflow && progress.isToday) ? progress.limit : progress.axisX;
    g.TweenMax.set(".timeGroup", { x: axisX });
    keyword.updateBubble();
});
// 이전/내일/오늘
calendar.addEvent(['prev', 'next', 'today']);
/* Progress process */
progress.updateProcess.set('dragEnd', function () {
    keyword.hideEff();
    keyword.update(`${g.KEYWORD_URL}?service_dtm=${this.model.time.progress_dtm}`);
});
// 버블 클릭 통계 프로세스 바인딩
keyword.eventListner.set('ndr', function (d) {
    // Statistics (PV)
    if (typeof g.draw_ndr === 'function') {
        let sRef2 = '';
        try {
            g.draw_mndr('m_ndr.nate.com/news/today/keyword' + (d.index + 1), g.gUserJS_sAppFrom, '', g.gUserJS_sAppSkai, g.gUserJS_sAppNdruk, sRef2);
        }
        catch (e) {
            g.draw_mndr('m_ndr.nate.com/news/today/keyword' + (d.index + 1), '', '', '', '', sRef2);
        }
    }
    // Statistics (Click)
    if (typeof g.olapclick === 'function') {
        g.olapclick(`TOK${(d.index + 1 < 10) ? '0' + (d.index + 1) : (d.index + 1)}`);
    }
});
// 버블 클릭 후 실행되는 프로세스
keyword.eventListner.set('openArticle', function (d) {
    keyword.clickEff(d.index);
    const sq = DATA.items[d.index].keyword_sq;
    const t = DATA.time.service_dtm;
    DATA.rank = d.index;
    article.update(`${g.ARTICLE_URL}?keyword_dtm=${t}&keyword_sq=${sq}`);
});
article.init();
// 카드리스트 팝업닫기
article.addEvent(['.btnTodayClose']);
const l = window.location.hash;
document.addEventListener('DOMContentLoaded', () => {
    // 초기화
    DATA.update(g.KEYWORD_URL).then(() => {
        calendar.init();
        progress.init();
        keyword.init();
        // 타임라인 접기
        progress.addEvent(['.progressWrap']);
    });
    // 카드리스트 팝업닫기 - 추가 이벤트 등록
    // 요소가 나타났다 사라지는 효과이기 때문에 팝업이 완전히 닫힌후 버블을 재업데이트 한다.
    document.querySelector('.btnTodayClose').addEventListener('click', function () {
        const t = document.querySelector('body');
        if (t.getAttribute('data-popupState')) {
            article.out();
            setTimeout(() => {
                keyword.hideEff();
                setTimeout(keyword.updateBubble.bind(keyword), 600);
            }, 300);
            t.removeAttribute('data-popupState');
        }
    });
});

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

/***/ "./tmp/TMP_ARTICLE.js":
/*!****************************!*\
  !*** ./tmp/TMP_ARTICLE.js ***!
  \****************************/
/*! exports provided: mobile */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mobile", function() { return mobile; });
var mobile = "\n    <div class=\"todayList\"><button type=\"button\" class=\"btnTodayClose\">close</button>\n        <h3 class=\"todayListTitle\"></h3>\n        <div class=\"todayListItem\">\n            <ul class=\"listItemWrap\">\n            </ul>\n            <div class=\"todayListItemCounts\"></div>\n        </div>\n    </div>\n    <div class=\"todayListEffect\"></div>\n";


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