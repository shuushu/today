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
/******/ 	return __webpack_require__(__webpack_require__.s = "./m/src/js/main.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./components/Calendar.ts":
/*!********************************!*\
  !*** ./components/Calendar.ts ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = __webpack_require__(/*! ./utils */ "./components/utils.js");
var ViewModel_1 = __webpack_require__(/*! ./ViewModel */ "./components/ViewModel.ts");
var g = global;
var Calendar = /** @class */ (function (_super) {
    __extends(Calendar, _super);
    function Calendar(d) {
        return _super.call(this, d) || this;
    }
    Calendar.prototype.prev = function () {
        this.update(this._getDate('subtract'));
    };
    Calendar.prototype.next = function () {
        this.update(this._getDate('add'));
    };
    Calendar.prototype.today = function () {
        this.update(g.KEYWORD_URL);
    };
    Calendar.prototype._init = function () {
        var _a = this.model.time, service_dtm = _a.service_dtm, min_dtm = _a.min_dtm, server_dtm = _a.server_dtm, update_dtm = _a.update_dtm, _b = ['.prev', '.next', '.today', '.btnShare', '.timeLog'].map(function (t) { return document.querySelector(t); }), prev = _b[0], next = _b[1], today = _b[2], btnShare = _b[3], timeLog = _b[4];
        if (timeLog) {
            timeLog.innerText = g.moment(update_dtm).format('YYYY.MM.DD HH:mm') + " " + utils_1.krStr[0];
        }
        service_dtm = service_dtm.split(' ')[0];
        min_dtm = min_dtm.split(' ')[0];
        server_dtm = server_dtm.split(' ')[0];
        // 최신 날짜 일때
        if (service_dtm >= server_dtm) {
            next.setAttribute('disabled', 'true');
            prev.removeAttribute('disabled');
            // 안내문구 노출
            timeLog.setAttribute('class', 'timeLog active');
            today.style.display = 'none';
            if (btnShare) {
                btnShare.style.display = 'block';
            }
        }
        else if (service_dtm <= min_dtm) {
            prev.setAttribute('disabled', 'true');
        }
        else {
            next.removeAttribute('disabled');
            prev.removeAttribute('disabled');
            today.style.display = 'inline-block';
            timeLog.setAttribute('class', 'timeLog');
            if (btnShare) {
                btnShare.style.display = 'none';
            }
        }
        // 날짜 변경
        var t = service_dtm.split('-');
        document.querySelector('.timeline .year').innerText = t[0];
        document.querySelector('.timeline .month').innerText = t[1];
        document.querySelector('.timeline .date').innerText = t[2];
    };
    Calendar.prototype._getDate = function (type) {
        if (!type) {
            throw Error('_getDate: empty parameter');
        }
        if (!g.KEYWORD_URL || !g.moment) {
            throw Error('KEYWORD_URL undefined or moment undefined');
        }
        var _a = this.model.time, service_dtm = _a.service_dtm, min_dtm = _a.min_dtm, server_dtm = _a.server_dtm, date = (service_dtm).split(' ');
        date[0] = g.moment(service_dtm)[type](1, 'days').format('YYYY-MM-DD');
        /**
         * 제약 사항: 최소, 최대 날짜에 해당 할 경우 핸들링 불가 설정
         */
        if (date[0] <= server_dtm.split(' ')[0] && date[0] >= min_dtm.split(' ')[0]) {
            return g.KEYWORD_URL + "?service_dtm=" + date.join('%20');
        }
        return g.KEYWORD_URL;
    };
    Calendar.prototype._update = function () {
        // 캘린더 리렌더
        this._init();
        this.updateProcess.forEach(function (callback) { return callback(); });
    };
    Calendar.prototype._removeEvent = function (p) {
    };
    Calendar.prototype._addEvent = function (p) {
        var _this = this;
        if (Array.isArray(p)) {
            p.forEach(function (i) {
                _this.eventListner.set(".btnTravel." + i, _this[i]);
            });
        }
    };
    Calendar = __decorate([
        utils_1.autobind
    ], Calendar);
    return Calendar;
}(ViewModel_1.default));
exports.default = Calendar;

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../node_modules/webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./components/KeywordList.ts":
/*!***********************************!*\
  !*** ./components/KeywordList.ts ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var ViewModel_1 = __webpack_require__(/*! ./ViewModel */ "./components/ViewModel.ts");
var utils_1 = __webpack_require__(/*! ./utils */ "./components/utils.js");
var g = global;
var updateTimer;
var creatTimer;
/* 정지 모션 관련 변수 */
var endtimer;
var resizeTime;
//let flag:boolean = false;
var nodeList = []; // d3 bubble nodeList
var forceList = []; // d3.forceSimulation List
var timeLine; // 버블 클릭 시 타임라인 이벤트
var ww = g.window.innerWidth; // 리사이징 width 메모리
// 임의지정: 아이폰5 가로 최소 사이즈
var IPHONE5 = 568;
var KeywordList = /** @class */ (function (_super) {
    __extends(KeywordList, _super);
    function KeywordList(d) {
        var _this_1 = _super.call(this, d) || this;
        _this_1.options = {
            app: '#newsEdgeBubbles',
            pp: [48, 32, 28.8, 26.6, 24, 20, 20, 20, 20, 20].map(function (self, i) { return i < 4 ? (self / 1.1) : self; }),
            sizes: [6.66, 5.06, 4.26, 4, 3.73, 3.2, 3.2, 3.2, 3.2, 3.2].map(function (self, i) { return i < 4 ? (self / 1.1) : self; }),
            color: _this_1.color,
            forceXY: [
                // Portrait Percent
                [
                    { x: 0.402, y: 0.357 },
                    { x: 0.386, y: 0.427 },
                    { x: 0.431, y: 0.364 },
                    { x: 0.413, y: 0.356 },
                    { x: 0.428, y: 0.421 },
                    { x: 0.432, y: 0.451 },
                    { x: 0.391, y: 0.432 },
                    { x: 0.416, y: 0.324 },
                    { x: 0.371, y: 0.412 },
                    { x: 0.457, y: 0.318 }
                ],
                // Landscape Percent
                [
                    { x: 1.5, y: 0.34 },
                    { x: 0.4, y: 0.34 },
                    { x: 0.8, y: 0.34 },
                    { x: 0.5, y: 0.34 },
                    { x: 1.32, y: 0.3 },
                    { x: 1.17, y: 0.3 },
                    { x: 0.63, y: 0.31 },
                    { x: 1.17, y: 0.32 },
                    { x: 1.02, y: 0.31 },
                    { x: 0.21, y: 0.3 },
                ]
            ],
            fColor: ['#ffffff', '#333333'],
            fontY: ['.3em', '-.3em', '-.9em']
        };
        _this_1._resize = _this_1._resize.bind(_this_1);
        return _this_1;
    }
    Object.defineProperty(KeywordList.prototype, "isLandScape", {
        // true일때 모바일 가로모드
        get: function () {
            if (g.window.navigator.userAgent.indexOf('Macintosh') > 0) {
                return false;
            }
            else {
                //return g.screen.orientation.type.match(/\w+/)[0] === 'landscape' && g.window.innerWidth > g.window.innerHeight  && g.window.devicePixelRatio > 1;
                return g.window.innerWidth > g.window.innerHeight && g.window.devicePixelRatio > 1;
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(KeywordList.prototype, "checkLimit", {
        get: function () {
            if (this.isLandScape) {
                return g.window.innerWidth > IPHONE5 ? [640, 320] : [g.window.innerWidth, 320];
            }
            else {
                return g.window.innerWidth >= 640 ? [640, 640] : [g.window.innerWidth, g.window.innerWidth];
            }
        },
        enumerable: false,
        configurable: true
    });
    KeywordList.prototype.stop = function () {
        forceList.forEach(function (v) {
            v.stop();
        });
    };
    KeywordList.prototype.hideEff = function () {
        var size = nodeList.length, cnt = 0;
        for (var i = 0; i < size; i++) {
            if (i !== size) {
                nodeList[i].attr('class', 'group-wrap remove');
            }
        }
        if (forceList.length > 0) {
            var f_1 = forceList.pop();
            f_1.stop().alpha(3)
                .force('collide', g.d3.forceCollide().radius(function (d) { return d.radius + 20; }))
                .alphaDecay(0.01)
                .restart();
            if (endtimer)
                clearTimeout(endtimer);
            endtimer = setTimeout(function () {
                f_1.stop();
            }, 1000);
        }
    };
    KeywordList.prototype.updateBubble = function () {
        var _this_1 = this;
        var data = this._updatePosition();
        var svg = document.getElementById('newsEdgeBubbles');
        ww = document.body.clientWidth;
        svg.setAttribute('width', this.checkLimit[0]);
        svg.setAttribute('height', this.checkLimit[1]);
        svg.setAttribute('viewBox', "0 0 " + this.checkLimit[0] + " " + this.checkLimit[1]);
        this._createNodes(data);
        this._setForce(data);
        if (updateTimer)
            clearTimeout(updateTimer);
        updateTimer = setTimeout(function () {
            _this_1._removeNodes();
        }, 1000);
        // 업데이트 콜백
        if (this.eventListner.has('b-update')) {
            this.eventListner.get('b-update')();
        }
    };
    KeywordList.prototype.clickEff = function (i) {
        g.gsap.killTweensOf(timeLine);
        var svg = document.querySelectorAll('.group-wrap .item');
        var wrap = document.getElementById('wrap');
        var t = 0.3;
        svg.forEach(function (v) { return v.setAttribute('class', 'item'); });
        svg[i].setAttribute('class', 'item active');
        wrap.setAttribute('class', 'clicked');
        timeLine = g.gsap.timeline({
            onComplete: function () {
            }
        });
        timeLine
            .to(svg[i].querySelector('circle'), t, { scale: 0.8, transformOrigin: '50% 50%', ease: 'power3.inOut', duration: t })
            .to(svg[i].querySelector('circle'), t, { scale: 20, transformOrigin: '50% 50%', ease: 'power3.inOut' });
    };
    KeywordList.prototype._setForce = function (data) {
        var nodes = g.d3.selectAll('.group-wrap:first-child .node');
        var www = document.querySelector(this.options.app).clientWidth;
        var hhh = document.querySelector(this.options.app).clientHeight;
        var tick = function () {
            try {
                nodes
                    .transition()
                    .duration(1 / 20)
                    .attr('transform', function (d) {
                    var xx = Math.max(d.radius - 60, Math.min(www - d.radius, d.x));
                    var yy = Math.max(d.radius, Math.min(hhh - d.radius, d.y));
                    return "translate(" + (d.x - 10) + ", " + (d.y - 10) + ")";
                    //return `translate(${xx+5}, ${d.y-5})`
                });
            }
            catch (e) {
                smf.stop().restart();
            }
        };
        var check = 0;
        var smf = g.d3.forceSimulation()
            .force('x', g.d3.forceX(this.checkLimit[0] / 2))
            .force('y', g.d3.forceY(this.checkLimit[1] / 2))
            .force("collide", g.d3.forceCollide(function (d, z) {
            var i = 4;
            var random = Math.floor(Math.random() * 10);
            if (check < 2 && random % 2 === 1) {
                //console.log(`z: `,z);
                check++;
                if (z < 5) {
                    check = 5;
                }
                i = -8;
            }
            /*let i = 4;
            const random = Math.floor(Math.random() * 10);
            if(d.index === random) {
                i = -random*2 < 0 ? -4 : -random*2;
                chceck = true;
            } else if(random > 5) {
                i = (i + random) > 10 ? 4 : 4;
            }


            // 마지막 효과 더 주자
            if(!chceck && z === 9) {
                i = -4
            }*/
            //console.log(`i: `,i)
            return d.radius + i;
        }))
            .force("charge", g.d3.forceManyBody())
            .nodes(data)
            .alphaTarget(0)
            .velocityDecay(0.9) // static value
            .on('tick', tick);
        var f = function () {
            //console.log('play')
            return smf.stop()
                .velocityDecay(0.35)
                .force('chargeEffect', g.d3.forceManyBody().strength(0.003))
                .alphaDecay(0.01)
                .alpha(4).on('tick', function () {
                nodes
                    .transition()
                    .duration(100)
                    .attr('x', function (d) { return d.x - 1; })
                    .attr('y', function (d) { return d.y - 1; });
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
    };
    KeywordList.prototype._removeNodes = function () {
        var size = nodeList.length;
        while (size > 1) {
            nodeList.shift().remove();
            size--;
        }
    };
    // d3 attr 메소드 factory
    KeywordList.prototype._attr = function (t, styles) {
        Object.keys(styles).map(function (a) {
            if (typeof t === 'string') {
                g.d3.select(t).attr(a, styles[a]);
            }
            else {
                t.attr(a, styles[a]);
            }
        });
    };
    // circle 생성
    KeywordList.prototype._createNodes = function (cdata) {
        var _this_1 = this;
        var _a = this.options, fColor = _a.fColor, color = _a.color, sizes = _a.sizes, fontY = _a.fontY;
        var _this = this;
        // svg 그룹추가
        var svg = g.d3.select('#newsEdgeBubbles')
            .insert('g', ':first-child').attr('class', 'group-wrap');
        //  노드
        var group = svg
            .selectAll('.item')
            .data(cdata)
            .enter()
            .append('g')
            .attr('class', 'node')
            .attr('transform', function (d) { return "translate(" + d.x + ", " + d.y + ")"; })
            .append('svg')
            .attr('class', 'item')
            .attr('role', 'list')
            .attr('aria-label', function (d, i) { return "" + (i + 1) + utils_1.krStr[3]; });
        var gg = group
            .on('click', function (d) {
            _this.model.rank = d.index;
            if (_this.eventListner.has('b-click')) {
                _this.eventListner.get('b-click').call(_this, d.index, this);
            }
            // 타임라인
            //g.gsap.timeline({ defaults: { overwrite: 'auto', ease: 'none' }, paused: true });
            //console.log(this.model.items[d.index])
        })
            .append('g');
        if (utils_1.UA.isIE) {
            gg.attr('transform', 'scale(0.00001)');
        }
        gg.attr('class', function (d, i) { return "n" + i; })
            .on('mouseover', function (d) {
            if (_this.eventListner.has('b-over')) {
                _this.eventListner.get('b-over').call(this);
            }
        })
            .on('mouseout', function (d) {
            if (_this.eventListner.has('b-out')) {
                _this.eventListner.get('b-out').call(this);
            }
        });
        gg.append('circle')
            .attr('r', function (d) { return d.radius; })
            .attr('cx', 0)
            .attr('cy', 0)
            .attr('fill', function (d, i) { return color[i]; });
        gg.append('g').attr('class', 't-group').append('text')
            .attr('class', 'bubbleText')
            .attr('fill', function (d, i) { return (i < 5) ? fColor[0] : fColor[1]; })
            .attr('font-size', function (d, i) {
            var s = (_this_1.isLandScape && sizes[i] <= 4) ? 4 : sizes[i];
            var v = (_this_1.isLandScape && g.window.innerWidth > IPHONE5 && i < 5) ? s * 1.3 : s;
            // iphone5 가로모드
            if (g.window.innerWidth === IPHONE5) {
                v = (i < 5) ? s * 1.1 : 3.6;
            }
            return g.d3.scaleLinear().domain([0, 100]).range([0, _this_1.checkLimit[1]])(v) + 'px';
        })
            .selectAll('.lineBreak')
            .data(function (d, i) { return _this_1.model.items[i].keyword_service.split('<br />').map(function (self) { return self; }).slice(0, 3); })
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
        creatTimer = setTimeout(function () {
            // svg > g요소 중앙 정렬 하기
            // let groupWrap = document.querySelector('.group-wrap');
            // console.log(groupWrap.getBoundingClientRect())
            // groupWrap.setAttribute('transform','translate(0,0)')
            svg.attr('class', 'group-wrap active');
            if (utils_1.UA.isIE) {
                gg.transition()
                    .delay(function (d, i) {
                    return i < 8 ? i * 100 : 300;
                })
                    .duration(600)
                    .attr('transform', 'scale(1)');
            }
        }, 100);
        nodeList.push(svg);
    };
    // 초기 svg 요소 생성 - 업데이트와 관련 없음
    KeywordList.prototype._drawSvg = function () {
        var targetNode = g.d3.select(this.options.app);
        this._attr('#newsEdgeBubbles', {
            width: this.checkLimit[0],
            height: this.checkLimit[1],
            viewBox: [0, 0, this.checkLimit[0], this.checkLimit[1]],
            role: 'group',
            'aria-labelledby': 'title desc',
        });
        // 타이틀 추가
        targetNode.append('title').attr('id', 'title').text(utils_1.krStr[1]);
        // desc추가
        targetNode.append('desc').attr('id', 'desc').text(utils_1.krStr[2]);
    };
    // 위치계산
    KeywordList.prototype._updatePosition = function () {
        var _this_1 = this;
        var _a = this.options, forceXY = _a.forceXY, pp = _a.pp;
        // var viewBox = 650;
        // var options = bubbles.options;
        var positions, temp = pp;
        if (this.isLandScape) {
            // 모바일 & 가로 모드 일때
            // 버블 크기 조정
            temp = __spreadArrays(pp.map(function (i) {
                if (!utils_1.UA.isEdge) {
                    if (g.window.innerWidth >= 640) {
                        return i / (_this_1.checkLimit[1] / 200);
                    }
                    else {
                        return i - (i / 2.5);
                    }
                }
                else {
                }
            }));
            var svg = document.getElementById('newsEdgeBubbles');
            svg.setAttribute('height', "" + this.checkLimit[1]);
            svg.setAttribute('viewBox', "0 0 " + this.checkLimit[0] + " " + this.checkLimit[1]);
            // console.clear();
            // console.table(forceXY[1])
            positions = utils_1.utils.shuffleArray(forceXY[1]);
        }
        else {
            positions = utils_1.utils.shuffleArray(forceXY[0]);
        }
        //console.clear()
        /* if(this.isLandScape) {
             positions[0].x = 1.32;
             positions[0].y = 0.3
             console.table(positions)
         }*/
        var radiusScale = g.d3.scaleLinear().domain([0, 100]).range([0, this.checkLimit[0]]);
        var xy = pp.map(function (percent, i) {
            var r = parseInt(radiusScale(temp[i] / 2));
            var c = {
                x: Math.floor(_this_1.checkLimit[1] * positions[i].x) + r,
                y: Math.floor(_this_1.checkLimit[1] * positions[i].y) + r,
            };
            /*if(i===0) {
                c.x =  Math.floor(Math.random()*(280-80+1)) + 80;
                c.y = Math.floor(Math.random()*(300-120+1)) + 120;
            }*/
            return c;
        });
        var tt = xy[0];
        var random = Math.floor(Math.random() * 10);
        xy[0] = xy[random];
        xy[random] = tt;
        return this.model.items.map(function (d, i) {
            var radius = parseInt(radiusScale(temp[i] / 2));
            //const radius = ww >= 500 ? parseInt(radiusScale(temp[i] / 2.5)) : parseInt(radiusScale(temp[i] / 2))
            if (_this_1.isLandScape && i === 0) {
                // 랜덤 true/false 만들기
                var k = Boolean(Math.floor(Math.random() * 2));
                xy[i].x = window.innerWidth / 2 + (k ? -(Math.floor(Math.random() * 20)) : Math.floor(Math.random() * 20));
                xy[i].y = 160 + (k ? Math.floor(Math.random() * 20) : -(Math.floor(Math.random() * 20)));
            }
            return {
                radius: radius,
                x: xy[i].x,
                y: xy[i].y
            };
        });
    };
    KeywordList.prototype._resize = function () {
        var _this_1 = this;
        if (document.body.clientWidth === ww || !document.getElementById('newsEdgeBubbles'))
            return;
        var wrap = document.getElementById('wrap');
        var mainWrap = document.querySelector('.mainContainer');
        var f = function () {
            if (resizeTime)
                clearTimeout(resizeTime);
            _this_1.hideEff();
            resizeTime = setTimeout(_this_1.updateBubble.bind(_this_1), 200);
        };
        // 모바일일때만
        if (wrap) {
            // 팝업이 열려있지 않은 상태에서만
            if (wrap.className.indexOf('clicked') < 0) {
                f();
            }
            else {
                document.querySelector('body').setAttribute('data-popupState', 'true');
                sessionStorage.setItem('resize', 'true');
            }
        }
        else if (mainWrap) {
            f();
        }
    };
    KeywordList.prototype._init = function (options) {
        this.options = Object.assign(this.options, options);
        var data = this._updatePosition();
        var _this = this;
        this._drawSvg();
        this._createNodes(data);
        this._setForce(data);
        window.addEventListener('resize', function () {
            if (resizeTime)
                clearTimeout(resizeTime);
            resizeTime = setTimeout(_this._resize, 300);
        });
    };
    KeywordList.prototype._addEvent = function (f) { };
    KeywordList.prototype._removeEvent = function () {
        window.removeEventListener('resize', this._resize);
    };
    KeywordList.prototype._update = function () {
        this.updateBubble();
    };
    return KeywordList;
}(ViewModel_1.default));
exports.default = KeywordList;

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../node_modules/webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./components/Model.ts":
/*!*****************************!*\
  !*** ./components/Model.ts ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.Model = void 0;
var timer;
var listner = new Map();
var Model = /** @class */ (function () {
    function Model() {
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
        this.cnt = 0;
    }
    Object.defineProperty(Model.prototype, "items", {
        get: function () {
            return this.k;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Model.prototype, "time", {
        get: function () {
            return this.d;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Model.prototype, "article", {
        get: function () {
            return this.a;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Model.prototype, "attachHandleError", {
        set: function (v) {
            if (!listner.has(v.name)) {
                listner.set(v.name, v);
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Model.prototype, "isOverflow", {
        // 프로그래스 날짜가 서버시간보다 지났는지 판단
        get: function () {
            var _a = this.d, server_dtm = _a.server_dtm, progress_dtm = _a.progress_dtm;
            var s = server_dtm.split(' ').pop();
            var p = progress_dtm.split(' ').pop();
            return this.isToday && p >= s;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Model.prototype, "isToday", {
        get: function () {
            var _a = this.d, server_dtm = _a.server_dtm, service_dtm = _a.service_dtm;
            return server_dtm.split(' ').shift() === service_dtm.split(' ').shift();
        },
        enumerable: false,
        configurable: true
    });
    Model.prototype.removeError = function () {
        clearTimeout(timer);
        listner.forEach(function (i) {
            var isNode = document.querySelector(i.target);
            var parent = document.querySelector(i.parent);
            if (parent && isNode) {
                parent.removeChild(isNode);
            }
        });
    };
    Model.prototype.update = function (path, f) {
        var _this = this;
        try {
            var isToday_1 = path.indexOf('?'); // 키워드 요청: 쿼리스트링이 없으면 달력의 오늘로 간주
            var isAticle_1 = path.indexOf('rticle'); //  카드리스트 요청;
            var t = "" + 'https://cors-anywhere.herokuapp.com/' + path;
            this.removeError();
            listner.forEach(function (i) {
                if (i.name === 'loading') {
                    timer = setTimeout(i.f, 800);
                }
            });
            var xhr_1 = new XMLHttpRequest();
            xhr_1.onreadystatechange = function () {
                if (xhr_1.readyState === xhr_1.DONE) { // 요청이 완료되면
                    _this.removeError();
                    if (xhr_1.status === 200 || xhr_1.status === 201) {
                        if (isAticle_1 < 0) {
                            var _a = JSON.parse(xhr_1.responseText), server_dtm = _a.server_dtm, service_dtm = _a.service_dtm, update_dtm = _a.update_dtm, data_1 = _a.data;
                            var p = _this.d.progress_dtm || server_dtm;
                            _this.k = Object.keys(data_1).map(function (v) { return data_1[v]; });
                            _this.d.server_dtm = server_dtm;
                            _this.d.service_dtm = service_dtm;
                            _this.d.update_dtm = update_dtm;
                            _this.d.progress_dtm = service_dtm.split(' ').shift() + " " + p.split(' ').pop();
                            if (_this.isToday && _this.isOverflow || isToday_1 < 0) {
                                _this.d.progress_dtm = server_dtm;
                            }
                        }
                        else {
                            var _b = JSON.parse(xhr_1.responseText), data_2 = _b.data, search_cnt = _b.search_cnt, search_link = _b.search_link;
                            _this.a = Object.keys(data_2).map(function (v) { return data_2[v]; });
                            _this.cnt = search_cnt;
                            _this.title = search_link;
                        }
                        f.call(_this);
                    }
                    else {
                        // 네트워크 에러
                        listner.forEach(function (i) {
                            if (i.name === 'error') {
                                i.f();
                            }
                        });
                    }
                    // END
                }
            };
            xhr_1.open('GET', path); // 메소드와 주소 설정
            xhr_1.send(); // 요청 전송
            /*return fetch(path).then(response => response.json()).catch(error => console.log('[tfech]',error)).then(res => {
                if (isAticle < 0) {
                    const random = res[Math.floor(Math.random()*3)]
                    // const { server_dtm, service_dtm, update_dtm, data } = random;
                    const { server_dtm, service_dtm, update_dtm, data } = res;
                    let p = this.d.progress_dtm || server_dtm;

                    this.k = Object.entries(data).map(([k,v]: [string, any]) => v);
                    this.d.server_dtm = server_dtm;
                    this.d.service_dtm = service_dtm;
                    this.d.update_dtm = update_dtm;

                    this.d.progress_dtm = `${service_dtm.split(' ').shift()} ${p.split(' ').pop()}`;

                    if(this.isToday && this.isOverflow || isToday < 0) {
                        this.d.progress_dtm = server_dtm;
                    }
                } else {
                    this.a = Object.entries(res.data).map(([k,v]: [string, any]) => v);
                    this.cnt = res.search_cnt;
                    this.title = res.search_link;
                }

            });*/
        }
        catch (e) {
            console.log(e);
        }
    };
    Model.prototype.updateProgress = function (v) {
        this.d.progress_dtm = v || this.d.server_dtm;
    };
    return Model;
}());
exports.Model = Model;


/***/ }),

/***/ "./components/Progress.ts":
/*!********************************!*\
  !*** ./components/Progress.ts ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var ViewModel_1 = __webpack_require__(/*! ./ViewModel */ "./components/ViewModel.ts");
var TMP_PROGRESS_1 = __webpack_require__(/*! ../tmp/TMP_PROGRESS */ "./tmp/TMP_PROGRESS.js");
var utils_1 = __webpack_require__(/*! ./utils */ "./components/utils.js");
;
var g = global, ss = (1000 * 60 * 60 * 24); // 24시간 > ms 변환
var drag; // gsap dragable plugin
var resizeTime;
var flag = false; // 리사이징와 타임라인 관련
var opt = {
    width: Math.min(window.innerWidth, 375) * (254 / 375),
    height: Math.min(window.innerWidth, 375) * (48 / 375),
    r: (Math.min(window.innerWidth, 375) * (24 / 375)) / 2
};
var ww = 0; // 리사이징 컨텐츠 영역 가로값 저장
var Progress = /** @class */ (function (_super) {
    __extends(Progress, _super);
    function Progress(d) {
        var _this_1 = _super.call(this, d) || this;
        _this_1.axisX = 0;
        _this_1._resize = _this_1._resize.bind(_this_1);
        return _this_1;
    }
    Object.defineProperty(Progress.prototype, "options", {
        get: function () {
            return opt;
        },
        set: function (v) {
            opt = v;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Progress.prototype, "isOverflow", {
        get: function () {
            return this.model.isOverflow;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Progress.prototype, "isToday", {
        get: function () {
            return this.model.isToday;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Progress.prototype, "limit", {
        // pathBack 리밋트
        get: function () {
            if (this.isToday) {
                return Number(this.options.width) * (g.moment(this.model.time.server_dtm).valueOf() - g.moment(this.model.time.server_dtm).startOf('day').valueOf()) / ss;
            }
            else {
                return Number(this.options.width);
            }
        },
        enumerable: false,
        configurable: true
    });
    Progress.prototype.toggleClass = function (e) {
        var _b = this, _a = _b._add, _t = _b._t;
        var _c = e, target = _c.target, currentTarget = _c.currentTarget;
        if (target.classList.contains(_t)) {
            currentTarget.classList.toggle(_a);
        }
    };
    Progress.prototype._update = function () {
    };
    Progress.prototype._init = function () {
        this._drawPath();
        this._updateTooltip();
        if (!utils_1.UA.isPC) {
            window.addEventListener('resize', this._resize);
        }
    };
    Progress.prototype._resize = function () {
        var _this_1 = this;
        if (resizeTime)
            clearTimeout(resizeTime);
        this._removeEvent();
        resizeTime = setTimeout(function () {
            if (!document.getElementById('newsEdgeProgress'))
                return;
            var bw = document.body.clientWidth;
            document.getElementById('newsEdgeProgress').innerHTML = '';
            _this_1.options = {
                width: Math.min(bw, 375) * (254 / 375),
                height: Math.min(bw, 375) * (48 / 375),
                r: (Math.min(bw, 375) * (24 / 375)) / 2
            };
            _this_1._drawPath();
            _this_1._updateTooltip();
            _this_1._addEvent(['.progressWrap']);
            // 드래그 위치 재 설정
            if (flag) {
                document.querySelector('.timeGroup').setAttribute('transform', "matrix(1,0,0,1," + _this_1.limit + ", " + _this_1.options.height / 2 + ")");
                document.querySelector('.pathFront').setAttribute('d', "M0 " + _this_1.options.height / 2 + " l " + _this_1.limit + " .001");
                g.TweenMax.set(".timeGroup", { x: _this_1.limit });
            }
        }, 300);
    };
    // 프로그레스 바 그리기
    Progress.prototype._drawPath = function () {
        var _b = this.options, width = _b.width, height = _b.height, r = _b.r;
        var wrapping = document.querySelector('.progressWrap');
        wrapping.removeChild(document.getElementById('newsEdgeProgress'));
        var temp = document.createElement('div');
        temp.id = 'newsEdgeProgress';
        temp.innerHTML = TMP_PROGRESS_1.TMP_PROGRESS;
        document.querySelector('.progressWrap').appendChild(temp);
        var target = g.d3.select('#newsEdgeProgress svg');
        //target.innerHTML = TMP_PROGRESS_IE11;
        //초기화
        //if (target.textContent === ''|| target.innerHTML === '') {
        //}
        var cx = this.axisX = this.isToday && this.isOverflow ? this.limit : this.axisX;
        var now = g.moment(this.model.time.progress_dtm).valueOf();
        var start = g.moment(this.model.time.progress_dtm).startOf('day').valueOf();
        var percent = (now - start) / 86400000;
        var data = {
            front: "M0 " + height / 2 + " l " + cx + " .001",
            back: "M0 " + height / 2 + " l " + this.limit + " .001",
            backboard: (function () {
                var time = width / (height * 0.08333333333333333);
                var pathResult = '';
                for (var i = 0; i < time; i++) {
                    pathResult += 'M ' + (height * 0.08333333333333333) * i + ' ' + (height * 0.4166666666666667) + ' H ' + (height * 0.08333333333333333) * i + ' V ' + ((height * 0.4166666666666667) + (height * 0.16666666666666666));
                }
                return pathResult;
            })()
        };
        /* 프로퍼티 설정 */
        target.attr('width', "" + width);
        target.attr('height', "" + height);
        target.attr('viewBox', "0,0," + width + "," + height);
        var _c = ['.pathBackboard', '.pathBack', '.pathFront', '.timeGroup'].map(function (i) { return g.d3.select(i); }), pathBackboard = _c[0], pathBack = _c[1], pathFront = _c[2], timeGroup = _c[3];
        pathBackboard.attr('d', data.backboard);
        pathBack.attr('d', data.back);
        pathFront.attr('d', data.front);
        pathBack.attr('stroke-width', height * 0.20833333333333334);
        pathFront.attr('stroke-width', height * 0.2916666666666667);
        timeGroup.attr('transform', "matrix(1,0,0,1, " + cx + ", " + height / 2 + ")");
        g.d3.select('.timeKnob').attr('r', "" + r);
        var timeTooltip = g.d3.select('.timeTooltip');
        var isPC = utils_1.UA.isPC && document.body.clientHeight > 1200;
        var HH = isPC ? 58 : height * 0.8333333333333334;
        var WW = isPC ? 134 : width * 0.36;
        var RR = isPC ? 15 : r;
        timeTooltip.attr('width', "" + WW);
        timeTooltip.attr('height', "" + HH);
        timeTooltip.attr('viebox', "0, 0, " + WW + ", " + HH);
        var tooltipRect = timeTooltip.select('rect');
        tooltipRect.attr('width', "" + WW);
        tooltipRect.attr('height', "" + HH);
        //-WW/2 - (84 - percent * 100)
        tooltipRect.attr('x', "" + -WW / 2);
        tooltipRect.attr('y', "" + -((isPC ? 92 : height + r + 4)));
        tooltipRect.attr('rx', "" + RR * 2);
        tooltipRect.attr('ry', "" + RR * 2);
        var arrow = timeTooltip.select('#filter2Path');
        if (isPC) {
            arrow.attr('d', 'M -9 0 l 9 18 l 9 -18 h -18z');
            arrow.attr('transform', 'translate(0 -34)');
        }
        else {
            arrow.attr('transform', "translate(-" + (r + 2) + " -" + r * 2 + ")");
        }
        var timeText = timeTooltip.select('.timeText');
        //`${(84 < percent * 100) ? (84 - percent * 100) : 0}`
        timeText.attr('x', '0');
        timeText.attr('y', "" + (isPC ? -54 : -(r * 3 + 2)));
        timeText.attr('font-size', width * 0.088 + "px");
        ww = document.body.clientWidth;
    };
    /* 이벤트리스너 바인딩 */
    Progress.prototype._addEvent = function (p) {
        var _this_1 = this;
        var _this = this;
        var end = this.updateProcess.get('dragEnd').bind(this) || function () { };
        //let d = document.querySelector('.pathFront').getAttribute('d').split(' ');
        var body = document.body;
        drag = g.Draggable.create('.timeGroup', {
            type: 'x, y',
            bounds: {
                minX: 0,
                maxX: _this.isToday ? this.limit : Number(this.options.width) - 1,
                minY: _this.options.r * 2,
                maxY: _this.options.r * 2
            },
            snap: {
                y: function (y) {
                    console.log(y);
                    return Math.round(y);
                }
            },
            onDragStart: function () {
                if (body.className.indexOf('scroll-block') < 0) {
                    body.className = 'scroll-block';
                }
                if (_this.eventListner.has('dragStart')) {
                    _this.eventListner.get('dragStart').call(this);
                }
            },
            onDrag: function () {
                var gmt = 32340000; // GMT기준 9시간 차 (1000*60*60*h)
                var dt = Math.abs(ss / Number(_this.options.width)); // this.x 이동 값 > 시간(타임스탬프) 변환값
                var yyymmdd = new Date((_this.model.time.service_dtm).split(' ')[0]).valueOf(); // YYYY-MM-DD;
                _this.axisX = this.x;
                var value = "M 0 " + _this.options.height / 2 + " l " + this.x + " 0.001";
                _this.model.updateProgress(g.moment((yyymmdd + dt * this.x) - gmt).format('YYYY-MM-DD HH:mm:ss'));
                document.querySelector('.newsEdgeProgress').setAttribute('class', 'newsEdgeProgress');
                document.querySelector('.pathFront').setAttribute('d', value);
                _this._updateTooltip();
            },
            onDragEnd: function () {
                // 마지막 지점에 도달할대
                flag = Math.floor(_this.limit) - Math.floor(this.x) <= 1;
                if (_this.axisX !== this.startX) {
                    end();
                }
                body.removeAttribute('class');
            }
        });
        // 접기
        if (Array.isArray(p)) {
            p.forEach(function (i) {
                if (_this_1.eventListner.has(i) === false) {
                    _this_1.eventListner.set("" + i, _this_1.toggleClass.bind({ _add: 'active', _t: 'btnProgress' }));
                }
            });
        }
    };
    Progress.prototype.detachDrag = function () {
        if (drag) {
            drag[0].kill();
        }
    };
    /* 이벤트 해제 */
    Progress.prototype._removeEvent = function () {
        this.detachDrag();
    };
    /* 툴팁업데이트 */
    Progress.prototype._updateTooltip = function () {
        var progress_dtm = this.model.time.progress_dtm;
        var _b = ['.hh', '.mm'].map(function (i) { return g.d3.select(".timeText " + i); }), hh = _b[0], mm = _b[1];
        // 툴팁 시간 표시
        hh.text(g.moment(progress_dtm).format('HH'));
        mm.text(this._mm(progress_dtm));
    };
    /* n분 단위 표시 */
    Progress.prototype._mm = function (d) {
        var n = 10;
        var _b = g.moment(d).format('mm'), a1 = _b[0], a2 = _b[1];
        if (a2 <= n) {
            return a1 + "0";
        }
        else {
            return "" + a1 + n;
        }
    };
    return Progress;
}(ViewModel_1.default));
exports.default = Progress;
;

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../node_modules/webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./components/Sns.ts":
/*!***************************!*\
  !*** ./components/Sns.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShareSNS = void 0;
var TMP_SNS_1 = __webpack_require__(/*! ../tmp/TMP_SNS */ "./tmp/TMP_SNS.js");
var utils_1 = __webpack_require__(/*! ./utils */ "./components/utils.js");
var g = global;
var ShareSNS = /** @class */ (function () {
    function ShareSNS() {
        this.DATA = {
            img: 'https://nimg.nate.com/ui/etc/today/m/src/images/og_nate_today.png',
            title: '한눈에 보는 오늘 - 네이트뉴스',
            desc: '',
            href: 'https://m.news.nate.com',
            time: ''
        };
    }
    ShareSNS.prototype.drawLayer = function (t) {
        var wrap = document.createElement('div');
        wrap.className = 'layerPopup share';
        wrap.innerHTML = TMP_SNS_1.SNS;
        this.target = wrap;
        t.appendChild(wrap);
        document.querySelector('.shareLinkUrl').setAttribute('value', 'https://m.news.nate.com/');
        var btnCopyURL = document.querySelector('.layerPopup .btnCopyURL');
        btnCopyURL.addEventListener('click', this.urlCopy.bind(this));
        document.querySelector('.shareList').addEventListener('click', this.providerShare.bind(this));
    };
    ShareSNS.prototype.drawBtn = function (t) {
        var _this = this;
        var div = document.createElement('div');
        var btn = document.createElement('button');
        if (document.querySelector('.socialShare')) {
            t.removeChild(document.querySelector('.socialShare'));
        }
        div.className = 'socialShare';
        btn.className = 'btnShare';
        btn.innerHTML = utils_1.krStr[13];
        btn.onclick = function (e) { return _this.showLayer(e); };
        div.appendChild(btn);
        t.appendChild(div);
        document.querySelector('.layerPopup .dimm').addEventListener('click', this.hideLayer.bind(this));
    };
    ShareSNS.prototype.clear = function (t) {
        var tt = document.querySelector('.layerPopup.share');
        if (tt) {
            t.removeChild(tt);
        }
    };
    ShareSNS.prototype.showLayer = function (e) {
        e.preventDefault();
        if (this.target) {
            this.target.className = 'layerPopup share active';
        }
    };
    ShareSNS.prototype.hideLayer = function (e) {
        e.preventDefault();
        if (this.target) {
            this.target.className = 'layerPopup share';
        }
    };
    ShareSNS.prototype.urlCopy = function (e) {
        e.preventDefault();
        utils_1.utils.CopyUrlToClipboard('.shareLinkUrl');
    };
    ShareSNS.prototype.providerShare = function (e) {
        e.preventDefault();
        var target = e.target.closest('a');
        if (target) {
            var provider = target.getAttribute('id');
            switch (provider) {
                case 'twitter':
                    window.open("https://twitter.com/intent/tweet?via=" + this.DATA.title + "&text=" + encodeURIComponent(this.DATA.desc) + "&url=" + encodeURIComponent(this.DATA.href));
                    break;
                case 'facebook':
                    var link = this.DATA.href + "?service_dtm=" + this.DATA.time;
                    window.open("https://m.facebook.com/sharer.php?u=" + encodeURIComponent(link));
                    break;
                default:
                    var _a = this.DATA, img = _a.img, title = _a.title, desc = _a.desc, href = _a.href, time = _a.time;
                    var nateon = new g.com.nateon.talk.NateonShare(title, desc, img, href, href, 'memo', 'ver', 'applist', 'appname');
                    nateon.execute();
                    break;
            }
        }
    };
    return ShareSNS;
}());
exports.ShareSNS = ShareSNS;

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../node_modules/webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./components/ViewModel.ts":
/*!*********************************!*\
  !*** ./components/ViewModel.ts ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = __webpack_require__(/*! ./utils */ "./components/utils.js");
var g = global;
var ViewModel = /** @class */ (function () {
    function ViewModel(data) {
        this.model = data;
        this.eventListner = new Map();
        this.updateProcess = new Map();
    }
    Object.defineProperty(ViewModel.prototype, "color", {
        get: function () {
            if (utils_1.UA.isEdge || utils_1.UA.isIE) {
                return ['rgba(19, 73, 253, .7)', 'rgba(39, 137, 252, .7)', 'rgba(24, 174, 219, .7)', 'rgba(75, 49, 230, .7)', 'rgba(73, 178, 25, .7)', 'rgba(226, 226, 226, .7)', 'rgba(226, 226, 226, .7)', 'rgba(226, 226, 226, .7)', 'rgba(226, 226, 226, .7)', 'rgba(226, 226, 226, .7)'];
            }
            else {
                return ['#6284F7', '#69B4F6', '#63C8E6', '#7C6AE2', '#76C453', '#E8E8E8', '#E8E8E8', '#E8E8E8', '#E8E8E8', '#E8E8E8'];
            }
        },
        enumerable: false,
        configurable: true
    });
    ViewModel.prototype.update = function (path) {
        this.model.update(path, this._update.bind(this));
    };
    ViewModel.prototype.addEvent = function (f) {
        this._addEvent(f);
        this.eventListner.forEach(function (f, n) {
            var dom = document.querySelector(n);
            if (dom) {
                dom.addEventListener('click', f);
            }
        });
    };
    ViewModel.prototype.removeEvent = function (f) {
        this.eventListner.forEach(function (f, n) {
            var dom = document.querySelector(n);
            if (dom) {
                dom.removeEventListener('click', f);
            }
        });
        this._removeEvent(f);
    };
    ViewModel.prototype.init = function (v) {
        this._init(v);
    };
    return ViewModel;
}());
exports.default = ViewModel;

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../node_modules/webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./components/utils.js":
/*!*****************************!*\
  !*** ./components/utils.js ***!
  \*****************************/
/*! exports provided: boundMethod, boundClass, utils, krStr, autobind, getURIparams, UA, replaceHistory, MAIN_LINK, CARD_LINK, refineSnsShareUrl */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "boundMethod", function() { return boundMethod; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "boundClass", function() { return boundClass; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "utils", function() { return utils; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "krStr", function() { return krStr; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "autobind", function() { return autobind; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getURIparams", function() { return getURIparams; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UA", function() { return UA; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "replaceHistory", function() { return replaceHistory; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MAIN_LINK", function() { return MAIN_LINK; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CARD_LINK", function() { return CARD_LINK; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "refineSnsShareUrl", function() { return refineSnsShareUrl; });
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

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
    return time1.split(' ')[0] === time2.split(' ')[0];
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


var krStr = {
  0: decodeURI('%EA%B8%B0%EC%A4%80'),
  // 기준
  // svg 타이틀 > 한눈에보는 오늘
  1: decodeURI('%ED%95%9C%EB%88%88%EC%97%90 %EB%B3%B4%EB%8A%94 %EC%98%A4%EB%8A%98'),
  // svg desc > 현재시간 실시간 이슈를 키워드 형태로 제공
  2: decodeURI('%ED%98%84%EC%9E%AC%EC%8B%9C%EA%B0%84 %EC%8B%A4%EC%8B%9C%EA%B0%84 %EC%9D%B4%EC%8A%88%EB%A5%BC %ED%82%A4%EC%9B%8C%EB%93%9C %ED%98%95%ED%83%9C%EB%A1%9C %EC%A0%9C%EA%B3%B5'),
  3: decodeURI('%EC%88%9C%EC%9C%84 %ED%82%A4%EC%9B%8C%EB%93%9C'),
  // n 순위 키워드
  4: decodeURI('%EB%B9%84%EC%8A%B7%ED%95%9C %EA%B8%B0%EC%82%AC'),
  // 비슷한 기사
  5: decodeURI('%EA%B0%9C'),
  // 개
  6: decodeURI('%EB%8D%94 %EB%B3%B4%EA%B8%B0%0D%0A'),
  // 더 보기
  // 링크를 클립보드에 복사하였습니다.
  7: decodeURI('%EB%A7%81%ED%81%AC%EB%A5%BC %ED%81%B4%EB%A6%BD%EB%B3%B4%EB%93%9C%EC%97%90 %EB%B3%B5%EC%82%AC%ED%95%98%EC%98%80%EC%8A%B5%EB%8B%88%EB%8B%A4.'),
  // 일시적인 오류가 발생하여
  8: decodeURI('%EC%9D%BC%EC%8B%9C%EC%A0%81%EC%9D%B8 %EC%98%A4%EB%A5%98%EA%B0%80 %EB%B0%9C%EC%83%9D%ED%95%98%EC%97%AC'),
  // 페이지를 표시할 수 없습니다.
  9: decodeURI('%ED%8E%98%EC%9D%B4%EC%A7%80%EB%A5%BC %ED%91%9C%EC%8B%9C%ED%95%A0 %EC%88%98 %EC%97%86%EC%8A%B5%EB%8B%88%EB%8B%A4.'),
  // 잠시 후 다시 이용해주세요.
  10: decodeURI('%EC%9E%A0%EC%8B%9C %ED%9B%84 %EB%8B%A4%EC%8B%9C %EC%9D%B4%EC%9A%A9%ED%95%B4%EC%A3%BC%EC%84%B8%EC%9A%94.'),
  // 다시시도
  11: decodeURI('%EB%8B%A4%EC%8B%9C%EC%8B%9C%EB%8F%84'),
  // 시간 전
  12: decodeURI('1%EC%8B%9C%EA%B0%84'),
  // 공유하기
  13: decodeURI('%EA%B3%B5%EC%9C%A0%ED%95%98%EA%B8%B0')
};

var getURIparams = function getURIparams(v, type) {
  if (typeof v === 'string' && v.length > 0) {
    // # 표시는 현재는 개발 되지 않으나 변화율에 대응하기 위해 미리 설정해둠
    var data = {
      MM: '',
      // #프로그래스 시간 설정
      index: '',
      // 버블 랭킹(배경 색상 설정)
      keyword_dtm: '',
      keyword_sq: '',
      target: '',
      // 어디서 넘어온건지
      v: '',
      // 세션체크 플래그
      keyword_idx: '' // #몇번째 카드를 처음으로 보여줄것인지

    };
    v.substring(1).split(type).forEach(function (v) {
      var _v$split = v.split('='),
          _v$split2 = _slicedToArray(_v$split, 2),
          key = _v$split2[0],
          value = _v$split2[1];

      data[key] = value;
      delete data['#'];
      delete data['?'];
    });
    return data;
  } else {
    return undefined;
  }
};

var UA = function () {
  // Opera 8.0+
  var isOpera = !!window.opr && !!opr.addons || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0; // Firefox 1.0+

  var isFirefox = typeof InstallTrigger !== 'undefined'; // Safari 3.0+ "[object HTMLElementConstructor]"

  var isSafari = /constructor/i.test(window.HTMLElement) || function (p) {
    return p.toString() === "[object SafariRemoteNotification]";
  }(!window['safari'] || typeof safari !== 'undefined' && safari.pushNotification); // Internet Explorer 6-11


  var isIE =
  /*@cc_on!@*/
   false || !!document.documentMode; // Edge 20+

  var isEdge = !isIE && !!window.StyleMedia; // Chrome 1 - 79

  var isChrome = !!window.chrome && (!!window.chrome.webstore || !!window.chrome.runtime); // Edge (based on chromium) detection

  var isEdgeChromium = isChrome && navigator.userAgent.indexOf("Edg") != -1; // Blink engine detection

  var isBlink = (isChrome || isOpera) && !!window.CSS;
  var isPC = window.navigator.userAgent.indexOf('Win') > 0 || window.navigator.userAgent.indexOf('Macintosh') > 0;
  return {
    isOpera: isOpera,
    isFirefox: isFirefox,
    isSafari: isSafari,
    isIE: isIE,
    isEdge: isEdge,
    isChrome: isChrome,
    isEdgeChromium: isEdgeChromium,
    isBlink: isBlink,
    isPC: isPC
  };
}();
/*
** IE11 polyfill
**/
// object.assign


if (typeof Object.assign != 'function') {
  // Must be writable: true, enumerable: false, configurable: true
  Object.defineProperty(Object, "assign", {
    value: function assign(target, varArgs) {
      // .length of function is 2
      'use strict';

      if (target == null) {
        // TypeError if undefined or null
        throw new TypeError('Cannot convert undefined or null to object');
      }

      var to = Object(target);

      for (var index = 1; index < arguments.length; index++) {
        var nextSource = arguments[index];

        if (nextSource != null) {
          // Skip over if undefined or null
          for (var nextKey in nextSource) {
            // Avoid bugs when hasOwnProperty is shadowed
            if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
              to[nextKey] = nextSource[nextKey];
            }
          }
        }
      }

      return to;
    },
    writable: true,
    configurable: true
  });
} // forEach


if (window.NodeList && !NodeList.prototype.forEach) {
  NodeList.prototype.forEach = function (callback, thisArg) {
    thisArg = thisArg || window;

    for (var i = 0; i < this.length; i++) {
      callback.call(thisArg, this[i], i, this);
    }
  };
} // closest


if (!Element.prototype.matches) {
  Element.prototype.matches = Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector;
}

if (!Element.prototype.closest) {
  Element.prototype.closest = function (s) {
    var el = this;

    do {
      if (el.matches(s)) return el;
      el = el.parentElement || el.parentNode;
    } while (el !== null && el.nodeType === 1);

    return null;
  };
}

var replaceHistory = function replaceHistory() {
  var hash = window.location.hash;

  if (hash.length === 0) {
    hash = "#time=".concat(new Date().valueOf());
  } else if (hash.indexOf('time=') < 0) {
    hash = "".concat(hash, "#time=").concat(new Date().valueOf());
  } else {
    var oldHash = window.location.hash.split('time=')[1];
    hash = hash.replace("time=".concat(oldHash), "time=".concat(new Date().valueOf()));
  }

  history.replaceState(history.state, '', hash);
}; //SNS 공유용 url 을 정제한다. 


function refineSnsShareUrl(url) {
  // 테스트용 url 일 경우, 라이브용 url로 변경 처리
  // ex) https://test_news.nate.com/ -> https://news.nate.com/
  url = url.replace(/\/\/[^\.]+_/gi, "//"); // 프로토콜 없이 // 만 있을경우 https: 추가

  if (url.indexOf("//") === 0) {
    url = location.protocol + url;
  }

  return url;
} // 네이트온 공유하기


(function () {
  function createFrame() {
    var iframe = document.createElement('iframe');
    iframe.id = '__nateonshare';
    iframe.style.display = 'none';
    document.body.appendChild(iframe);
  }

  var com = new Object();
  com.nateon = new Object();
  com.nateon.talk = new Object();
  com.nateon = {};
  com.nateon.talk = {};

  com.nateon.talk.NateonShare = function (title, desc, thimg, href, srclink, memo, ver, applist, appname, appid, appver) {
    var t = document.getElementById('__nateonshare');

    if (!t) {
      createFrame();
    }

    this.title = encodeURIComponent(title); // required

    this.desc = encodeURIComponent(desc);
    this.thimg = encodeURIComponent(thimg);
    this.href = encodeURIComponent(href);
    this.srclink = encodeURIComponent(srclink); // required

    this.memo = encodeURIComponent(memo);
    this.ver = encodeURIComponent(ver);
    this.appid = encodeURIComponent(appid);
    this.appver = encodeURIComponent(appver);
    this.appname = encodeURIComponent(appname);
    this.applist = encodeURIComponent(JSON.NateOnStringify(applist)); //check required params.

    try {
      if (isEmptyString(this.title) || isEmptyString(this.srclink)) {
        throw 'IllegalArgumentException';
      }
    } catch (e) {
      if (e == 'IllegalArgumentException') {//implement.
      }
    }
  };

  com.nateon.talk.NateonShare.prototype.execute = function (callback) {
    var userAgent = navigator.userAgent.toLocaleLowerCase();
    var msgParam = new com.nateon.talk.StringBuilder('link');
    msgParam.append('?thimg=').append(this.thimg).append('&title=').append(this.title).append('&desc=').append(this.desc).append('&href=').append(this.href).append('&srclink=').append(this.srclink).append('&memo=').append(this.memo).append('&ver=').append(this.ver).append('&appver=').append(this.appver).append('&appid=').append(this.appid).append('&appname=').append(this.appname);

    if (userAgent.search('android') > -1) {
      if (userAgent.search('chrome') > -1) {
        var callAppURL = 'intent://' + msgParam.toString() + '/#Intent;scheme=nateonuc;package=Uxpp.UC;end;';
        window.location = callAppURL;
      } else {
        var t = document.getElementById('__nateonshare');
        t.src = 'nateonuc://' + msgParam.toString();

        t.onload = function () {
          window.location = '//br.nate.com/index.php?code=A092';
        };
      }
    } else if (userAgent.search('iphone') > -1) {
      var clickedAt = +new Date();
      setTimeout(function () {
        if (+new Date() - clickedAt < 2000) {
          if (typeof callback == 'function') {
            callback.call(this);
          } else if (userAgent.search('iphone') > -1) {
            var t = document.getElementById('__nateonshare');
            t.src = '//br.nate.com/index.php?code=A089';
          }
        }
      }, 500);
      var callAppURL = 'nateonuc://' + msgParam.toString();
      window.location = callAppURL; //$("#__nateonshare").attr("src", callAppURL);
    }
  };

  com.nateon.talk.NateonShareTiny = function (title, href, srclink, ver, applist, appid, appver, appname) {
    createFrame();
    this.title = encodeURIComponent(title); // require

    this.href = encodeURIComponent(href);
    this.srclink = encodeURIComponent(srclink); // require

    this.ver = encodeURIComponent(ver);
    this.appid = encodeURIComponent(appid);
    this.appver = encodeURIComponent(appver);
    this.appname = encodeURIComponent(appname);
    this.applist = encodeURIComponent(JSON.NateOnStringify(applist));

    try {
      // 필수 파라메터 체크
      if (isEmptyString(this.title) || isEmptyString(this.srclink)) {
        throw 'IllegalArgumentException';
      }
    } catch (e) {
      if (e == 'IllegalArgumentException') {// implement.
      }
    }
  };

  com.nateon.talk.NateonShareTiny.prototype.execute = function (callback) {
    var userAgent = navigator.userAgent.toLocaleLowerCase();
    var msgParam = new com.nateon.talk.StringBuilder('link');
    msgParam.append('?title=').append(this.title).append('&href=').append(this.href).append('&srclink=').append(this.srclink).append('&ver=').append(this.ver).append('&appid=').append(this.appid).append('&appver=').append(this.appver).append('&appname=').append(this.appname);

    if (userAgent.search('android') > -1) {
      if (userAgent.search('chrome') > -1) {
        var callAppURL = 'intent://' + msgParam.toString() + '/#Intent;scheme=nateonuc;package=Uxpp.UC;end;';
        window.location = callAppURL;
      } else {
        var t = document.getElementById('__nateonshare');
        t.src = 'nateonuc://' + msgParam.toString();

        t.onload = function () {
          window.location = '//br.nate.com/index.php?code=A092';
        };
      }
    } else if (userAgent.search('iphone') > -1) {
      var clickedAt = +new Date();
      setTimeout(function () {
        if (+new Date() - clickedAt < 2000) {
          if (typeof callback == 'function') {
            callback.call(this);
          } else if (userAgent.search('iphone') > -1) {
            var t = document.getElementById('__nateonshare');
            t.src = '//br.nate.com/index.php?code=A089';
          }
        }
      }, 500);
      var callAppURL = 'nateonuc://' + msgParam.toString();
      window.location = callAppURL;
    }
  };
  /*
   * utility functions.
   * */


  com.nateon.talk.NateonShare.prototype.isEmptyString = function (str) {
    if (str.replace(/^\s*/, '').replace(/\s*$/, '').length == 0) return true;
    return false;
  };

  com.nateon.talk.StringBuilder = function (value) {
    this.strings = new Array('');
    this.append(value);
  };

  com.nateon.talk.StringBuilder.prototype.append = function (value) {
    if (value) {
      this.strings.push(value);
    }

    return this;
  };

  com.nateon.talk.StringBuilder.prototype.toString = function () {
    return this.strings.join('');
  };

  JSON.NateOnStringify = JSON.NateOnStringify || function (obj) {
    var t = _typeof(obj);

    if (t != 'object' || obj === null) {
      if (t == 'string') obj = '"' + obj + '"';
      return String(obj);
    } else {
      var n,
          v,
          json = [],
          arr = obj && obj.constructor == Array;

      for (n in obj) {
        v = obj[n];
        t = _typeof(v);
        if (t == 'string') v = '"' + v + '"';else if (t == 'object' && v !== null) v = JSON.NateOnStringify(v);
        json.push((arr ? '' : '"' + n + '":') + String(v));
      }

      return (arr ? '[' : '{') + String(json) + (arr ? ']' : '}');
    }
  };

  window.com = com;
})();

var CARD_LINK = '//m.news.nate.com';
var MAIN_LINK = '//m.nate.com'; // DEV

if (true) {
  CARD_LINK = '//test-m.news.nate.com';
  MAIN_LINK = '//ndev.nate.com';
}



/***/ }),

/***/ "./m/src/js/main.ts":
/*!**************************!*\
  !*** ./m/src/js/main.ts ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {
Object.defineProperty(exports, "__esModule", { value: true });
var Model_1 = __webpack_require__(/*! ../../../components/Model */ "./components/Model.ts");
var Calendar_1 = __webpack_require__(/*! ../../../components/Calendar */ "./components/Calendar.ts");
/* 리뉴얼 버젼
import Progress from "../../../components/ProgressV2";*/
var Progress_1 = __webpack_require__(/*! ../../../components/Progress */ "./components/Progress.ts");
var KeywordList_1 = __webpack_require__(/*! ../../../components/KeywordList */ "./components/KeywordList.ts");
var utils_1 = __webpack_require__(/*! ../../../components/utils */ "./components/utils.js");
var Sns_1 = __webpack_require__(/*! ../../../components/Sns */ "./components/Sns.ts");
var g = global;
var DATA = new Model_1.Model();
var KEYWORD_URL = "//m.news.nate.com/api/today/keywordList";
g.KEYWORD_URL = KEYWORD_URL;
function mndr(v) {
    if (g.MM_GLOBAL && typeof g.MM_GLOBAL.ndrclick === 'function') {
        g.MM_GLOBAL.ndrclick(v);
    }
}
g.stage.addEvent('newsToday', _todayInit);
g.stage.addEvent('newsTodayStop', function () {
    if (g.bubbles) {
        reset();
        g.bubbles.hideEff();
    }
});
function reset() {
    var newsEdgeBubbles = document.querySelector('#newsEdgeBubbles');
    var todayLoader = document.querySelector('.today-loader');
    var bubblesWrap = document.querySelector('.bubblesWrap');
    var clickArea = document.getElementById('a-trigger');
    if (todayLoader && bubblesWrap) {
        bubblesWrap.removeChild(todayLoader);
    }
    // 링크 영역 삭제
    if (clickArea) {
        document.body.removeChild(clickArea);
    }
    if (newsEdgeBubbles) {
        newsEdgeBubbles.innerHTML = '';
    }
}
function _todayInit() {
    // 초기화
    reset();
    // [날씨] 위젯
    // const weather = new Weather(g.TODAY.weather);
    // const newsEdge = document.querySelector('.newsEdge');
    // weather.remove(newsEdge);
    // weather.draw(newsEdge);       
    // SNS 공유하기
    var SNS = new Sns_1.ShareSNS();
    SNS.clear(document.body);
    SNS.drawLayer(document.body);
    SNS.drawBtn(document.querySelector('.newsEdge'));
    document.querySelector('.layerPopup .btnClosePopup').addEventListener('click', SNS.hideLayer.bind(SNS));
    /**
     ** Moment 글로벌 설정
     */
    g.moment.locale('ko');
    g.moment.updateLocale('ko', { relativeTime: { h: "" + decodeURI('1%EC%8B%9C%EA%B0%84') } });
    /**
     ** Gsap 플러그인 등록 (필수)
     */
    g.gsap.registerPlugin(g.Draggable, g.DrawSVGPlugin, g.MotionPathPlugin, g.ScrollToPlugin, g.InertiaPlugin);
    // 로딩바 만들기
    DATA.attachHandleError = (function () {
        var obj = {
            name: 'loading',
            parent: '.bubblesWrap',
            target: '.today-loader',
            f: function () {
                console.log('attachHandleError');
                var bubblesWrap = document.querySelector(obj.parent);
                var todayLoading = document.createElement('div');
                todayLoading.className = 'today-loader';
                todayLoading.innerHTML = "\n                    <!-- \uB85C\uB529 -->\n                    <div class=\"logoimg\">\n                        <div class=\"circle step1\"></div>\n                        <div class=\"circle step2\"></div>\n                    </div>\n                </div>\n            ";
                bubblesWrap.appendChild(todayLoading);
            }
        };
        return obj;
    })();
    DATA.attachHandleError = (function () {
        var obj = {
            name: 'error',
            parent: '.bubblesWrap',
            target: '.error',
            f: function () {
                var error = document.createElement('div');
                error.className = 'error';
                error.innerHTML = "\n                    <div class=\"eBox\">\n                        <p>" + utils_1.krStr[8] + "<br>" + utils_1.krStr[9] + "</p>\n                        <p>" + utils_1.krStr[10] + "</p>\n                        <a href=\"" + g.window.location.origin + "\" onclick=\"MM_GLOBAL.resetTab(); return MM_GLOBAL.ndrclick('ERR01');\" class=\"restart\">" + utils_1.krStr[11] + "</a>\n                    </div>\n                ";
                document.querySelector(obj.parent).appendChild(error);
                document.querySelector('#newsEdgeBubbles').removeChild(document.querySelector('.group-wrap'));
                keyword.removeEvent();
            }
        };
        return obj;
    })();
    function createInstance(c) {
        return new c(DATA);
    }
    var calendar = createInstance(Calendar_1.default);
    var progress = createInstance(Progress_1.default);
    var keyword = createInstance(KeywordList_1.default);
    var triggerBubblClick = function (i) {
        var _a = this.model.items[i], keyword_dtm = _a.keyword_dtm, keyword_sq = _a.keyword_sq;
        var progress_dtm = this.model.time.progress_dtm;
        mndr("NNT2" + (function (n) { return (n < 10) ? "0" + n : n; })(i + 1));
        var t = document.getElementById('a-trigger');
        t.setAttribute('href', utils_1.CARD_LINK + "/#$keyword_dtm=" + keyword_dtm + "$keyword_sq=" + keyword_sq + "$index=" + i + "$MM=" + g.moment(progress_dtm).format('mm') + "$target=MAIN$v=" + g.MM_PARAMS.ref);
        if (t) {
            t.click();
        }
    };
    // 세션
    var ss = sessionStorage.getItem('ss');
    var ss_x = sessionStorage.getItem('ss-x');
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
        var axisX = (progress.isOverflow && progress.isToday) ? progress.limit : progress.axisX;
        g.TweenMax.set(".timeGroup", { x: axisX });
        keyword.updateBubble();
        // 세션저장
        sessionStorage.setItem('ss', JSON.stringify(progress.model.time));
        sessionStorage.setItem('ss-x', "" + progress.axisX);
    });
    // 이전/내일/오늘
    calendar.addEvent(['prev', 'next', 'today']);
    /* Progress process */
    progress.updateProcess.set('dragEnd', function () {
        keyword.hideEff();
        keyword.update(KEYWORD_URL + "?service_dtm=" + this.model.time.progress_dtm);
        mndr('NNT104');
        // 세션저장
        sessionStorage.setItem('ss', JSON.stringify(this.model.time));
        sessionStorage.setItem('ss-x', "" + progress.axisX);
    });
    // 버블 클릭 후 실행되는 프로세스
    keyword.eventListner.set('b-click', triggerBubblClick);
    // 버블 업데이트 된 후 실행
    keyword.eventListner.set('b-update', function () {
        // 타임로그
        /*const timeLog = document.querySelector('.timeLog');
        if (timeLog) {
            (<HTMLElement> timeLog).innerText = `${g.moment(DATA.time.service_dtm).format('YYYY.MM.DD HH:mm')} ${krStr[0]}`;
        }*/
    });
    var INIT_PATH = ss ? KEYWORD_URL + "?service_dtm=" + (JSON.parse(sessionStorage.getItem('ss'))).progress_dtm : KEYWORD_URL;
    DATA.update(INIT_PATH, function () {
        var todayLoader = document.querySelector('.today-loader');
        var bubblesWrap = document.querySelector('.bubblesWrap');
        if (todayLoader) {
            bubblesWrap.removeChild(todayLoader);
        }
        if (ss_x && typeof Number(ss_x) === 'number') {
            progress.axisX = Number(ss_x);
        }
        if (ss) {
            var _a = JSON.parse(ss), progress_dtm = _a.progress_dtm, server_dtm = _a.server_dtm;
            if (typeof progress_dtm === 'string' && typeof server_dtm === 'string' && progress_dtm.split(' ')[0] !== server_dtm.split(' ')[0]) {
                DATA.time.progress_dtm = (JSON.parse(ss)).progress_dtm;
            }
        }
        // 공유 데이터 셋팅
        if (Array.isArray(DATA.items) && DATA.items.length > 0) {
            var keyword_1 = DATA.items.reduce(function (p, n, i) {
                if (i < 3) {
                    return p += "\u25CF" + n.keyword_service.split('<br />').join(' ') + " ";
                }
                return p;
            }, '');
            SNS.DATA.desc = keyword_1;
            SNS.DATA.time = DATA.time.service_dtm;
        }
        ;
        calendar.init();
        progress.init();
        keyword.init();
        // 타임라인 접기
        progress.addEvent(['.progressWrap']);
        // 세션생성
        if (!ss && !ss_x) {
            sessionStorage.setItem('ss', JSON.stringify(DATA.time));
            sessionStorage.setItem('ss-x', "" + progress.axisX);
        }
        // 페이지 진입 통계
        if (typeof g.draw_ndr === 'function') {
            var sRef2 = '';
            g.draw_mndr('m_ndr.nate.com/news/today', g.gUserJS_sAppFrom, '', g.gUserJS_sAppSkai, g.gUserJS_sAppNdruk, sRef2);
        }
        // 링크 트리거(앱에서 window.open 메소드 제한 걸어둠, 임시 트리거로 페이지 이동 시킨다)
        (function () {
            var aa = document.createElement('a');
            aa.id = "a-trigger";
            aa.target = '_blank';
            aa.style.cssText = 'position: absolute;left: -999em;top: -999em;';
            aa.href = '#';
            document.body.appendChild(aa);
        })();
    });
    var blockevent = function () { g.stage.trigger('BLOCK_ON'); };
    document.querySelector('.progressWrap').removeEventListener('touchstart', blockevent);
    document.querySelector('.progressWrap').addEventListener('touchstart', blockevent, { passive: false, capture: false });
    if (true) {
        g.dd = DATA;
        g.cc = calendar;
        g.pp = progress;
        // [날씨] g.weather = weather;
    }
    g.bubbles = keyword;
}

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
/*! exports provided: TMP_PROGRESS, TMP_PROGRESS_THIN */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TMP_PROGRESS", function() { return TMP_PROGRESS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TMP_PROGRESS_THIN", function() { return TMP_PROGRESS_THIN; });
var TMP_PROGRESS = "\n<svg id=\"newsEdgeProgress\" class=\"newsEdgeProgress\">\n    <g class=\"progress\">\n        <defs><linearGradient id=\"pathLinear\"><stop offset=\"0%\" stop-color=\"#639eff\"></stop><stop offset=\"100%\" stop-color=\"rgba(91, 108, 255, .98)\"></stop></linearGradient></defs>\n        <path class=\"pathBackboard\" d=\"M 0 20 H 0 V 28M 4 20 H 4 V 28M 8 20 H 8 V 28M 12 20 H 12 V 28M 16 20 H 16 V 28M 20 20 H 20 V 28M 24 20 H 24 V 28M 28 20 H 28 V 28M 32 20 H 32 V 28M 36 20 H 36 V 28M 40 20 H 40 V 28M 44 20 H 44 V 28M 48 20 H 48 V 28M 52 20 H 52 V 28M 56 20 H 56 V 28M 60 20 H 60 V 28M 64 20 H 64 V 28M 68 20 H 68 V 28M 72 20 H 72 V 28M 76 20 H 76 V 28M 80 20 H 80 V 28M 84 20 H 84 V 28M 88 20 H 88 V 28M 92 20 H 92 V 28M 96 20 H 96 V 28M 100 20 H 100 V 28M 104 20 H 104 V 28M 108 20 H 108 V 28M 112 20 H 112 V 28M 116 20 H 116 V 28M 120 20 H 120 V 28M 124 20 H 124 V 28M 128 20 H 128 V 28M 132 20 H 132 V 28M 136 20 H 136 V 28M 140 20 H 140 V 28M 144 20 H 144 V 28M 148 20 H 148 V 28M 152 20 H 152 V 28M 156 20 H 156 V 28M 160 20 H 160 V 28M 164 20 H 164 V 28M 168 20 H 168 V 28M 172 20 H 172 V 28M 176 20 H 176 V 28M 180 20 H 180 V 28M 184 20 H 184 V 28M 188 20 H 188 V 28M 192 20 H 192 V 28M 196 20 H 196 V 28M 200 20 H 200 V 28M 204 20 H 204 V 28M 208 20 H 208 V 28M 212 20 H 212 V 28M 216 20 H 216 V 28M 220 20 H 220 V 28M 224 20 H 224 V 28M 228 20 H 228 V 28M 232 20 H 232 V 28M 236 20 H 236 V 28M 240 20 H 240 V 28M 244 20 H 244 V 28M 248 20 H 248 V 28M 252 20 H 252 V 28\" stroke-width=\"1\" stroke=\"#c7ccd1\" fill=\"none\" shape-rendering=\"crispEdges\"></path>\n        <path class=\"pathBack\" d=\"M0 24 l 0 0\" stroke-linecap=\"round\" stroke-width=\"10\" stroke=\"#e6e8ea\"></path>\n        <path class=\"pathFront\" stroke=\"url(#pathLinear)\" d=\"M0 24 l 254 0.01\" stroke-width=\"14\" stroke-linecap=\"round\" fill=\"#5b6cff\"></path>\n        <g class=\"timeGroup\" transform=\"matrix(1,0,0,1,0,24)\">\n            <circle class=\"timeKnob\" r=\"12\" stroke=\"#5b6cff\" stroke-width=\"1\" fill=\"#fff\"></circle>\n            <rect class=\"timeKnobEmpty\" x=\"-24\" y=\"-24\" width=\"48\" height=\"48\" fill=\"transparent\"></rect>\n            <svg class=\"timeTooltip\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" width=\"91.44\" height=\"40\" viebox=\"0,0,91.44,40\" style=\"overflow: visible\">\n              <defs>\n                <filter id=\"filter1Back\" width=\"128.9%\" height=\"167.4%\" x=\"-14.4%\" y=\"-28.5%\" filterUnits=\"objectBoundingBox\">\n                    <feOffset result=\"shadowOffsetOuter1\" in=\"SourceAlpha\" dy=\"2\"></feOffset>\n                    <feGaussianBlur result=\"shadowBlurOuter1\" in=\"shadowOffsetOuter1\" stdDeviation=\"4\"></feGaussianBlur>\n                    <feColorMatrix in=\"shadowBlurOuter1\" values=\"0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.12 0\"></feColorMatrix>\n                    <rect id=\"filter1Rect\" width=\"91.44\" height=\"40\" x=\"-45.72\" y=\"-64\"></rect>\n                </filter>\n                <filter id=\"filter2Back\" width=\"356.7%\" height=\"367.1%\" x=\"-128.3%\" y=\"-85%\" filterUnits=\"objectBoundingBox\">\n                    <feOffset result=\"shadowOffsetOuter1\" in=\"SourceAlpha\" dy=\"4\"></feOffset>\n                    <feGaussianBlur result=\"shadowBlurOuter1\" in=\"shadowOffsetOuter1\" stdDeviation=\"3\"></feGaussianBlur>\n                    <feColorMatrix in=\"shadowBlurOuter1\" values=\"0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.0754206731 0\"></feColorMatrix>\n                    <path id=\"filter2Path\" transform=\"translate(-14 -24)\" d=\"M 19.285 0 L 15 8.235 10.714 0 h 8.571z\"></path>\n                </filter>\n              </defs>\n              <g>\n                  <use fill=\"#000\" filter=\"url(#filter1Back)\" xlink:href=\"#filter1Rect\"></use>\n                  <use fill=\"#fff\" xlink:href=\"#filter1Rect\"></use>\n                  <use fill=\"#000\" filter=\"url(#filter2Back)\" xlink:href=\"#filter2Path\"></use>\n                  <use fill=\"#fff\" xlink:href=\"#filter2Path\"></use>\n                  <text class=\"timeText\" alignment-baseline=\"middle\" text-anchor=\"middle\" x=\"0\" y=\"-38\" font-size=\"22.352px\">\n                      <tspan class=\"hh\" dx=\"0\" dy=\".1em\" fill=\"#000\">00</tspan><tspan class=\"dtm-div\" dx=\"4\" dy=\"-.1em\" fill=\"#7c8aff\">:</tspan><tspan class=\"mm\" dx=\"5\" dy=\".1em\" fill=\"#000\">00</tspan>\n                  </text>\n              </g>\n          </svg>\n        </g>\n    </g>\n</svg>\n";
var TMP_PROGRESS_THIN = "\n<svg id=\"newsEdgeProgress\" class=\"newsEdgeProgress\" height=\"48\">\n    <g class=\"progress\">\n        <defs><linearGradient id=\"pathLinear\"><stop offset=\"0%\" stop-color=\"#639eff\"></stop><stop offset=\"100%\" stop-color=\"rgba(91, 108, 255, .98)\"></stop></linearGradient></defs>        \n        <rect class=\"pathBackboard\" x=\"0\" y=\"20\" width=\"100%\" height=\"8\" fill=\"#f2f2f2\" rx=\"4\" ry=\"4\" />\n        <rect class=\"pathBack\" x=\"0\" y=\"20\" width=\"60%\" height=\"8\" fill=\"#c8c8c8\" rx=\"4\" ry=\"4\" />\n        <rect class=\"pathFront\" x=\"0\" y=\"20\" width=\"60%\" height=\"8\" fill=\"url(#pathLinear)\" rx=\"4\" ry=\"4\" />                \n        <g class=\"timeGroup\" transform=\"matrix(1,0,0,1,0,24)\">\n            <svg class=\"timeTooltip\" height=\"48\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" width=\"73\" y=\"25\" viebox=\"0,0,73,32\">\n              <defs>\n                <filter id=\"filter1Back\" width=\"128.9%\" height=\"167.4%\" x=\"-14.4%\" y=\"-28.5%\" filterUnits=\"objectBoundingBox\">\n                    <feOffset result=\"shadowOffsetOuter1\" in=\"SourceAlpha\" dy=\"2\"></feOffset>\n                    <feGaussianBlur result=\"shadowBlurOuter1\" in=\"shadowOffsetOuter1\" stdDeviation=\"4\"></feGaussianBlur>\n                    <feColorMatrix in=\"shadowBlurOuter1\" values=\"0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.12 0\"></feColorMatrix>\n                    <rect id=\"filter1Rect\" width=\"91.44\" height=\"40\" x=\"-45.72\" y=\"-62\"></rect>\n                    <rect id=\"filter2Rect\" width=\"91.44\" height=\"40\" x=\"-45.72\" y=\"-62\"></rect>\n                </filter>\n                <filter id=\"filter2Back\" width=\"356.7%\" height=\"367.1%\" x=\"-128.3%\" y=\"-85%\" filterUnits=\"objectBoundingBox\">\n                    <feOffset result=\"shadowOffsetOuter1\" in=\"SourceAlpha\" dy=\"4\"></feOffset>\n                    <feGaussianBlur result=\"shadowBlurOuter1\" in=\"shadowOffsetOuter1\" stdDeviation=\"3\"></feGaussianBlur>\n                    <feColorMatrix in=\"shadowBlurOuter1\" values=\"0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.0754206731 0\"></feColorMatrix>\n                    <path id=\"filter2Path\" transform=\"translate(-14 -24)\" d=\"M 19.285 0 L 15 8.235 10.714 0 h 8.571z\"></path>\n                </filter>\n              </defs>\n              <g class=\"origin\">\n                  <use class=\"shadow\" fill=\"#000\" filter=\"url(#filter1Back)\" xlink:href=\"#filter1Rect\"></use>\n                  <use class=\"rec\" fill=\"#fff\" xlink:href=\"#filter1Rect\"></use>    \n                  <text class=\"timeText\" alignment-baseline=\"middle\" text-anchor=\"middle\" x=\"0\" y=\"0\">\n                      <tspan class=\"hh\" dx=\"0\" dy=\".1em\" fill=\"#000\">00</tspan><tspan class=\"dtm-div\" dx=\"4\" dy=\"-.1em\" fill=\"#7c8aff\">:</tspan><tspan class=\"mm\" dx=\"5\" dy=\".1em\" fill=\"#000\">00</tspan>\n                  </text>\n              </g>\n              <g class=\"copy\" transform=\"matrix(1,0,0,1, -2, -36)\">\n                  <use fill=\"#000\" filter=\"url(#filter1Back)\" xlink:href=\"#filter2Rect\"></use>\n                  <use fill=\"#fff\" xlink:href=\"#filter2Rect\"></use>\n                  <use fill=\"#000\" class=\"arr\" transform=\"matrix(1,0,0,1,-5, 14)\" filter=\"url(#filter2Back)\" xlink:href=\"#filter2Path\"></use>\n                  <use fill=\"#fff\" class=\"arr\" transform=\"matrix(1,0,0,1,-5, 14)\" xlink:href=\"#filter2Path\"></use>\n                  <text class=\"timeText\" alignment-baseline=\"middle\" text-anchor=\"middle\" x=\"0\" y=\"-8\">\n                      <tspan class=\"hh2\" dx=\"0\" dy=\".1em\" fill=\"#000\">00</tspan><tspan class=\"dtm-div\" dx=\"4\" dy=\"-.1em\" fill=\"#7c8aff\">:</tspan><tspan class=\"mm2\" dx=\"5\" dy=\".1em\" fill=\"#000\">00</tspan>\n                  </text>\n              </g>\n          </svg>\n        </g>\n\n\n\n    </g>\n</svg>\n";


/***/ }),

/***/ "./tmp/TMP_SNS.js":
/*!************************!*\
  !*** ./tmp/TMP_SNS.js ***!
  \************************/
/*! exports provided: SNS */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SNS", function() { return SNS; });
var SNS = "\n    <div class=\"inner\">\n        <button type=\"button\" class=\"btnClosePopup\">\uB2EB\uAE30</button>\n        <div class=\"content\">\n        <strong class=\"title\">\uACF5\uC720\uD558\uAE30</strong>\n        <ul class=\"shareList\">\n            <li>\n            <a href=\"#\" class=\"shareNateon\" id=\"nateon\">\uB124\uC774\uD2B8\uC628</a>\n            </li>\n            <li>\n            <a href=\"#\" class=\"shareFacebook\" id=\"facebook\">\uD398\uC774\uC2A4\uBD81</a>\n            </li>\n            <li>\n            <a href=\"#\" class=\"shareTwetter\" id=\"twitter\">\uD2B8\uC704\uD130</a>\n            </li>\n        </ul>\n        <div class=\"shareInput\">\n            <input type=\"text\" class=\"shareLinkUrl\" readonly=\"readonly\">\n        </div>\n        </div>\n        <button type=\"button\" class=\"btnCopyURL\" onclick=\"ndrclick('TOS04'); utils.CopyUrlToClipboard('.shareLinkUrl')\">URL \uBCF5\uC0AC</button>\n    </div>\n    <div class=\"dimm\"></div>\n";


/***/ })

/******/ });