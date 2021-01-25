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
/******/ 	return __webpack_require__(__webpack_require__.s = "./m/src/js/tcall-app.ts");
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
/*! exports provided: boundMethod, boundClass, utils, krStr, autobind, getURIparams, UA, replaceHistory, MAIN_LINK, CARD_LINK */
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
  12: decodeURI('1%EC%8B%9C%EA%B0%84')
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
};

var CARD_LINK = '//m.news.nate.com';
var MAIN_LINK = '//m.nate.com'; // DEV

if (true) {
  CARD_LINK = '//test-m.news.nate.com';
  MAIN_LINK = '//ndev.nate.com';
}



/***/ }),

/***/ "./m/src/js/Article.ts":
/*!*****************************!*\
  !*** ./m/src/js/Article.ts ***!
  \*****************************/
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
var ViewModel_1 = __webpack_require__(/*! ../../../components/ViewModel */ "./components/ViewModel.ts");
var utils_1 = __webpack_require__(/*! ../../../components/utils */ "./components/utils.js");
var TMP_ARTICLE_1 = __webpack_require__(/*! ../../../tmp/TMP_ARTICLE */ "./tmp/TMP_ARTICLE.js");
var g = global;
/**
 * * Moment 글로벌 설정
 */
g.moment.locale('ko');
g.moment.updateLocale('ko', { relativeTime: { h: "" + utils_1.krStr[12] } });
var timeLine;
var Article = /** @class */ (function (_super) {
    __extends(Article, _super);
    function Article(d) {
        var _this_1 = _super.call(this, d) || this;
        // 카드 옵션
        _this_1.cards = {
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
        // 아티클 상태 저장 객체
        _this_1.webview = false; // 웹뷰 인가? 애니메이션 없이 바로 보여줄건지
        _this_1.isClose = true; // 카드뷰가 완전히 닫혔는지 체크
        _this_1.out = _this_1.out.bind(_this_1);
        return _this_1;
    }
    Article.prototype.out = function () {
        var _this_1 = this;
        var listItemWrap = document.querySelector('.listItemWrap');
        var svg = document.querySelectorAll('.group-wrap .item');
        g.gsap.killTweensOf(timeLine);
        // enable scroll
        document.querySelector('body').removeAttribute('style');
        document.querySelector('html').removeAttribute('style');
        timeLine = g.gsap.timeline({
            onComplete: function () {
                document.getElementById('wrap').setAttribute('class', '');
                var v = (history.state && history.state !== '') ? history.state.rank : _this_1.model.rank;
                svg[v].setAttribute('class', 'item');
                _this_1.isClose = true;
            }
        });
        // highScore, lowScore 삭제
        document.getElementById('todayListWrap').removeAttribute('class');
        document.getElementById('todayListWrap').removeAttribute('style');
        // delete navi
        document.querySelector('.todayListItemCounts').innerHTML = '';
        // delete article list
        listItemWrap.innerHTML = '';
        // 카드 위치 비우기
        this.cards.offsets = [];
        // 카드 위치 초기화
        this.cards.activeIndex = 0;
        timeLine.set('body', { clearProps: 'all', duration: 0, className: '' })
            .to(['.btnTodayClose', '.todayListTitle', '.todayListItem'], { autoAlpha: 0, ease: 'power3.inOut', duration: 0 })
            .to(['.todayListItem', listItemWrap], { clearProps: 'all', duration: 0.1 })
            .to('.group-wrap .item.active circle', { scale: 0.8, ease: 'power3.inOut' })
            .to('#wrap', { className: '', duration: 0 })
            .to('.group-wrap .item.active circle', { scale: 1, duration: 0.5 });
    };
    // 카드를 바로 보여줄때
    Article.prototype.quickShow = function () {
        var _a = history.state, rank = _a.rank, keyword_dtm = _a.keyword_dtm, keyword_sq = _a.keyword_sq;
        document.getElementById('wrap').setAttribute('class', 'clicked');
        //(<HTMLElement> document.querySelector('#todayListWrap')).style.cssText = `overflow: hidden;background-color:${this.color[rank]};`;
        this.update(g.ARTICLE_URL + "?keyword_dtm=" + keyword_dtm + "&keyword_sq=" + keyword_sq);
        if (this.webview === false) {
            setTimeout(function () {
                var c = document.querySelectorAll('.group-wrap .item')[rank];
                c.setAttribute('class', 'item active');
                g.gsap.timeline().to(c.querySelector('circle'), 0, { scale: 20, transformOrigin: '50% 50%' });
            }, 400);
        }
        //window.addEventListener('popstate', this.out)
    };
    Article.prototype._init = function () {
        // 템플릿 추가
        var todayListWrap = document.getElementById('todayListWrap');
        if (todayListWrap.innerHTML.length === 0) {
            todayListWrap.innerHTML = TMP_ARTICLE_1.mobile;
        }
        if (history.state && history.state !== '') {
            this.quickShow();
        }
    };
    Article.prototype._update = function () {
        this.isClose = false;
        var r = this.model.rank;
        if (history.state && history.state !== '') {
            this.cards.activeIndex = history.state.startSlide;
            r = history.state.rank;
        }
        document.querySelector('html').setAttribute('style', "background-color:" + this.color[r]);
        document.body.className = 'body-show-cardview';
        document.body.style.cssText = "background-color:" + this.color[r];
        document.querySelector('.todayListTitle').innerText = this.model.title.split('?q=').pop();
        document.getElementById('todayListWrap').setAttribute('class', (r < 5) ? 'highScore' : 'lowScore');
        // offset
        var cards = this.cards;
        // 카드 포지션 설정
        for (var i = 0; i < cards.leng; i++) {
            cards.offsets.push(-((cards.width + cards.margin) * i));
        }
        this._createList();
        this._createNav();
        //window.scrollTo(0, (document.querySelector('.btnTodayClose').getBoundingClientRect()).y-15);
        var t = 0.3;
        timeLine = g.gsap.timeline({
            onComplete: this._bindDrag.bind(this)
        });
        g.gsap.set('.todayListItem', { clearProps: 'all', duration: 0 });
        timeLine
            .to('.btnTodayClose', t, { autoAlpha: 1, delay: 0.5 })
            .fromTo('.todayListTitle', t, { autoAlpha: 0, x: -100, }, { autoAlpha: 1, x: 0 })
            .to('.todayListItem', (function () {
            if (history.state && history.state !== '') {
                return 0;
            }
            else {
                return t;
            }
        })(), { autoAlpha: 1, x: 0, delay: 0 });
    };
    Article.prototype._addEvent = function (p) {
        var _this_1 = this;
        // 팝업 닫기
        if (Array.isArray(p)) {
            p.forEach(function (i) {
                _this_1.eventListner.set("" + i, _this_1.out);
            });
        }
    };
    Article.prototype._removeEvent = function () { };
    Article.prototype._createNav = function () {
        var nav = document.querySelector('.todayListItemCounts');
        var size = this.model.article.length;
        var temp = document.createDocumentFragment();
        for (var i = 0; i < size + 1; i++) {
            var span = temp.appendChild(document.createElement('span'));
            if (i === size) {
                span.setAttribute('class', "count-more");
            }
            else {
                span.setAttribute('class', "nav-item");
            }
        }
        nav.appendChild(temp);
        nav.querySelectorAll('span')[this.cards.activeIndex].setAttribute('class', "nav-item active");
    };
    Article.prototype._createList = function () {
        var listItemWrap = document.querySelector('.listItemWrap');
        var empty = document.createDocumentFragment();
        var server_dtm = this.model.time.server_dtm;
        this.model.a.forEach(function (d, i) {
            var link_url = d.link_url, artc_title = d.artc_title, cp_nm = d.cp_nm, img_url = d.img_url, insert_dtm = d.insert_dtm;
            var li = empty.appendChild(document.createElement('li'));
            li.setAttribute('class', 'item');
            li.setAttribute('role', 'link');
            li.setAttribute('data-link', String(link_url));
            li.setAttribute('data-idx', "" + (i + 1));
            var ttt = utils_1.utils.isToday(server_dtm, insert_dtm) ? g.moment(insert_dtm).startOf('min').fromNow() : insert_dtm;
            var temp = "\n                <div class=\"face frontFace\">\n                    <h5 class=\"subject\">" + artc_title + "</h5>\n                    <div class=\"info\">\n                        <div class=\"state\"><span class=\"provider\">" + cp_nm + "</span><span class=\"time\">" + ttt + "</span></div>\n                        <div class=\"thumb-nail\"><img src=\"" + img_url + "\" alt=\"\"></div>\n                    </div>\n                </div>\n                <div class=\"face backFace\"></div>                \n            ";
            li.innerHTML = temp;
        });
        listItemWrap.appendChild(empty);
        var more = document.createElement('li');
        more.setAttribute('class', 'more');
        more.setAttribute('role', 'link');
        more.setAttribute('data-link', this.model.title);
        more.setAttribute('data-idx', "0");
        more.innerHTML = "\n            <div class=\"face frontFace\">\n                <div class=\"innerWrap\">" + utils_1.krStr[4] + "<div>\n                    <span class=\"size\">" + utils_1.utils.withCommas(this.model.cnt) + "</span>\n                    <span>" + utils_1.krStr[5] + "</span>\n                </div>" + utils_1.krStr[6] + "\n            </div>\n            <div class=\"face backFace\"></div>\n        ";
        listItemWrap.appendChild(more);
    };
    Article.prototype._bindDrag = function () {
        var cards = this.cards;
        var items = document.querySelectorAll('.listItemWrap .item');
        var btimer;
        var ASP, LP, RP, _this = this;
        items.forEach(function (self, j) {
            if (j < cards.activeIndex && j < 4)
                g.gsap.set(self, { autoAlpha: 0, x: cards.width / 2, scale: .92 });
        });
        g.gsap.to('.listItemWrap', cards.duration, { x: cards.offsets[cards.activeIndex] });
        g.Draggable.create('.listItemWrap', {
            type: 'x',
            throwProps: false,
            edgeResistance: .85,
            onDrag: onDrag,
            onDragStart: onDragStart,
            onDragEnd: onDragEnd,
            onClick: onClick
        });
        function onClick(e) {
            var t = e.target.closest('li');
            var duration = 0.3;
            t.className = t.getAttribute('class') + " active";
            // 통계
            if (g.olapclick) {
                var v = "TOR0" + t.getAttribute('data-idx');
                if ('tcall' in g) {
                    // 티전화용 통계
                    v = "TTC" + (15 + Number(t.getAttribute('data-idx')));
                    if (t.getAttribute('data-idx') === '0') {
                        v = 'TTC15';
                    }
                }
                else {
                    if (t.getAttribute('data-idx') === '0') {
                        v = 'TOM00';
                    }
                }
                g.olapclick("" + v);
            }
            if (btimer)
                clearTimeout(btimer);
            btimer = setTimeout(function () {
                g.gsap.set('.todayListEffect', {
                    x: t.getBoundingClientRect().left,
                    y: t.getBoundingClientRect().top,
                    width: t.clientWidth,
                    height: t.clientHeight,
                    autoAlpha: 1,
                    className: 'todayListEffect',
                    borderRadius: (t.className.indexOf('more') < 0) ? 20 : '100%',
                });
            }, 200);
            // 뒷판
            var ani = g.gsap.timeline({
                onComplete: function () {
                    if (_this.eventListner.has('cardClick')) {
                        _this.eventListner.get('cardClick')(t);
                    }
                }
            });
            ani.delay(0.3).set('.todayListEffect', { className: 'todayListEffect active' });
        }
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
            var nav = document.querySelectorAll('.todayListItemCounts span');
            nav.forEach(function (e) {
                var getClassName = e.getAttribute('class');
                if (getClassName.indexOf('active') > 0) {
                    e.setAttribute('class', getClassName.split('active').shift());
                }
            });
            nav[cards.activeIndex].setAttribute('class', nav[cards.activeIndex].getAttribute('class') + " active");
            if (cards.activeIndex >= 0 && cards.activeIndex !== 5 && cards.activeIndex - 1 !== -1) {
                g.gsap.to(items[cards.activeIndex - 1], cards.duration, { autoAlpha: 0 });
            }
            g.gsap.to('.listItemWrap', cards.duration, { x: cards.offsets[cards.activeIndex] });
            history.state.startSlide = cards.activeIndex;
            history.state.title = _this.model.title.split('?q=').pop();
            history.replaceState(history.state, history.state.title);
            // 세션체크: 앱 종료 후 다시 앱을 실행할 경우 대응
            utils_1.replaceHistory();
        }
    };
    return Article;
}(ViewModel_1.default));
exports.default = Article;

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../node_modules/webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./m/src/js/tcall-app.ts":
/*!*******************************!*\
  !*** ./m/src/js/tcall-app.ts ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {
Object.defineProperty(exports, "__esModule", { value: true });
var Model_1 = __webpack_require__(/*! ../../../components/Model */ "./components/Model.ts");
var Calendar_1 = __webpack_require__(/*! ../../../components/Calendar */ "./components/Calendar.ts");
var Progress_1 = __webpack_require__(/*! ../../../components/Progress */ "./components/Progress.ts");
var KeywordList_1 = __webpack_require__(/*! ../../../components/KeywordList */ "./components/KeywordList.ts");
var utils_1 = __webpack_require__(/*! ../../../components/utils */ "./components/utils.js");
var Article_1 = __webpack_require__(/*! ./Article */ "./m/src/js/Article.ts");
var g = global;
g.tcall = true;
var params = utils_1.getURIparams(window.location.hash, '$') || {
    MM: '',
    index: '',
    keyword_dtm: '',
    keyword_sq: '',
    keyword_idx: '',
    progress_dtm: '',
    target: '',
    v: '',
};
var DATA = new Model_1.Model();
// 로딩바 만들기
DATA.attachHandleError = (function () {
    var obj = {
        name: 'loading',
        parent: '.bubblesWrap',
        target: '.today-loader',
        f: function () {
            var bubblesWrap = document.querySelector(obj.parent);
            var todayLoading = document.createElement('div');
            todayLoading.className = 'today-loader';
            todayLoading.innerHTML = "\n                    <!-- \uB85C\uB529 -->\n                <div class=\"logoimg\">\n                    <div class=\"circle step1\"></div>\n                    <div class=\"circle step2\"></div>\n                </div>\n            ";
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
            error.innerHTML = "\n            <div class=\"eBox\">\n                <p>" + utils_1.krStr[8] + "<br>" + utils_1.krStr[9] + "</p>\n                <p>" + utils_1.krStr[10] + "</p>\n                <a href=\"//" + g.window.location.host + "\" onclick=\"MM_GLOBAL.resetTab(); return MM_GLOBAL.ndrclick('ERR01');\" class=\"restart\">" + utils_1.krStr[11] + "</a>\n            </div>\n        ";
            document.querySelector(obj.parent).appendChild(error);
            document.querySelector('#newsEdgeBubbles').removeChild(document.querySelector('.group-wrap'));
            keyword.removeEvent();
        }
    };
    return obj;
})();
var article = createInstance(Article_1.default);
function createInstance(c) {
    return new c(DATA);
}
/**
 * ios캐쉬 예상하지 못한 예외 처리
 * 카드리스트가 좀느리게 뜨는감이 없지 않아 있다. 카드리스트 모듈을 호출루틴을 빠르게 당길경우
 * ios에서 bf캐쉬의 영향으로 여러 이슈가 발생하는것을 확인할수 있다 자세한건 QA항목 참조
 * http://its.skcomms.co.kr/browse/KSTEST-1665
 * http://its.skcomms.co.kr/browse/KSTEST-1666
**/
//alert(`init/ cardshow:${sessionStorage.getItem('cardshow')}, pageshow: ${sessionStorage.getItem('pageshow')}`)
if (g.navigator.platform.indexOf('Win') < 0 && g.navigator.userAgent.indexOf('iPhone') > 0 && sessionStorage.getItem('cardshow') === 'true' && sessionStorage.getItem('pageshow') === 'true') {
    sessionStorage.setItem('cardshow', 'false');
    sessionStorage.setItem('pageshow', 'false');
    window.location.reload();
}
/*
** 메인에서 유입 할 때 카드리스트를 바로 보여준다.
 */
if (params && params.target === 'MAIN') {
    var keyword_dtm = params.keyword_dtm, keyword_sq = params.keyword_sq, rank = params.index;
    article.webview = (params.v === 'nate_app') ? params.v : true; // 웹뷰모드
    var startSlide = (function () {
        if (history.state && history.state !== '') {
            return history.state.startSlide;
        }
        else {
            return 0;
        }
    })();
    history.pushState({
        keyword_dtm: keyword_dtm,
        keyword_sq: keyword_sq,
        rank: rank,
        startSlide: startSlide,
        title: ''
    }, 'home');
    if (sessionStorage.getItem('pageshow') !== 'true' && sessionStorage.getItem('cardshow') !== 'true') {
        utils_1.replaceHistory();
    }
}
if (history.state && history.state !== '') {
    document.body.style.cssText = "background-color:" + article.color[Number(history.state.rank)];
    document.body.className = 'session';
    document.querySelector('#todayListWrap').setAttribute('style', "\n        display: block;\n        background-color:" + article.color[Number(history.state.rank)] + "\n    ");
}
//article.init();
var calendar = createInstance(Calendar_1.default);
var progress = createInstance(Progress_1.default);
var keyword = createInstance(KeywordList_1.default);
var triggerBubblClick = function (i) {
    // 팝업이 완전히 닫히지 않은 상태면 버블 클릭안됨
    if (article.isClose === false) {
        return;
    }
    keyword.clickEff(i);
    var sq = DATA.items[i].keyword_sq;
    var t = DATA.time.service_dtm;
    var historyData = {
        keyword_dtm: t,
        keyword_sq: sq,
        rank: i,
        startSlide: 0,
        title: '',
        progress_dtm: DATA.time.progress_dtm,
        x: progress.axisX
    };
    DATA.rank = i;
    if (history.state && history.state !== '') {
        setTimeout(function () {
            history.replaceState(historyData, utils_1.krStr[2] + "-" + DATA.items[i].keyword_service.split('<br />').join(' '));
        }, 0);
    }
    else {
        setTimeout(function () {
            history.pushState(historyData, utils_1.krStr[2] + "-" + DATA.items[i].keyword_service.split('<br />').join(' '));
        }, 0);
    }
    article.update(g.ARTICLE_URL + "?keyword_dtm=" + t + "&keyword_sq=" + sq);
    // 버블 클릭 통계 프로세스 바인딩
    var N = i + 5;
    if (typeof g.draw_ndr === 'function') {
        var sRef2 = '';
        g.draw_mndr('m_ndr.nate.com/news/today/tcall//keyword' + (i + 1), g.gUserJS_sAppFrom, '', g.gUserJS_sAppSkai, g.gUserJS_sAppNdruk, sRef2);
    }
    if (typeof g.olapclick === 'function') {
        // 키워드0 TTC05
        g.olapclick(N < 10 ? "TTC0" + N : "TTC" + N);
    }
    // 세션체크: 앱 종료 후 다시 앱을 실행할 경우 대응
    //replaceHistory();
};
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
});
/* Progress process */
progress.updateProcess.set('dragEnd', function () {
    keyword.hideEff();
    keyword.update(g.KEYWORD_URL + "?service_dtm=" + this.model.time.progress_dtm);
    if ('olapclick' in window) {
        g.olapclick('TTC04');
    }
});
// 버블 클릭 후 실행되는 프로세스
keyword.eventListner.set('b-click', triggerBubblClick);
// 버블 업데이트 된 후 실행
keyword.eventListner.set('b-update', function () {
    // 타임로그
    /*const timeLog = document.querySelector('.timeLog');
    if (timeLog) {
        (<HTMLElement> timeLog).innerText = `${g.moment(DATA.time.update_dtm).format('YYYY.MM.DD HH:mm')} ${krStr[0]}`;
    }*/
});
document.addEventListener('DOMContentLoaded', function () {
    // 초기화
    var path = g.KEYWORD_URL;
    if (history.state && history.state !== '') {
        path = path + "?service_dtm=" + history.state.keyword_dtm;
    }
    DATA.update(path, function () {
        if (params.target !== 'MAIN' && history.state && history.state !== '') {
            if (history.state.progress_dtm) {
                DATA.time.progress_dtm = history.state.progress_dtm;
            }
            // 세션데이터 x > 프로그래스바 x축 설정
            progress.axisX = history.state.x;
        }
        calendar.init();
        progress.init();
        keyword.init();
        article.init();
        // 이전/내일/오늘
        calendar.addEvent(['prev', 'next', 'today']);
        // 타임라인 접기
        progress.addEvent(['.progressWrap']);
        // 카드 바로 보여주기 트리거 바인딩
        article.eventListner.set('trigger', triggerBubblClick);
        // 카드 클릭
        article.eventListner.set('cardClick', cardClick);
        //setTimeout(article.init.bind(article), 4000);
        if (params && params.target === 'MAIN') {
            document.querySelector('.btnTodayClose').addEventListener('click', closeCardMain);
            // 페이지 진입 통계
            if (typeof g.draw_ndr === 'function') {
                g.draw_mndr('m_ndr.nate.com/news/today/keyword' + (Number(params.index) + 1), g.gUserJS_sAppFrom, '', g.gUserJS_sAppSkai, g.gUserJS_sAppNdruk, '');
            }
        }
        else {
            // 카드리스트 팝업닫기
            article.addEvent(['.btnTodayClose']);
            // 요소가 나타났다 사라지는 효과이기 때문에 팝업이 완전히 닫힌후 버블을 재업데이트 한다.
            document.querySelector('.btnTodayClose').addEventListener('click', function () {
                closeCardView();
                history.pushState(null, null, '');
            });
            // 페이지 진입 통계
            if (typeof g.draw_ndr === 'function') {
                var sRef2 = '';
                g.draw_mndr('m_ndr.nate.com/news/today/tcall/', g.gUserJS_sAppFrom, '', g.gUserJS_sAppSkai, g.gUserJS_sAppNdruk, sRef2);
            }
        }
    });
    // 세션체크: 앱 종료 후 다시 앱을 실행할 경우 대응
    if (!params && params.target !== 'MAIN' && sessionStorage.getItem('cardshow') !== 'true') {
        utils_1.replaceHistory();
    }
    // SNS
    //document.querySelector('.btnShare ').addEventListener('click', shareSNS);
    //document.querySelector('.btnClosePopup ').addEventListener('click', closeSNS);
});
// ios에서 히스토리백: 1) pageshow 호출 이후 2)popstate 호출
window.addEventListener('pageshow', ff2);
window.addEventListener('popstate', ff);
function clearCardEff() {
    var todayListEffect = document.querySelector('.todayListEffect');
    var check = todayListEffect.getAttribute('style');
    var li = document.querySelectorAll('.listItemWrap li');
    if (check !== null) {
        todayListEffect.className = 'todayListEffect';
        todayListEffect.removeAttribute('style');
        li.forEach(function (n) {
            n.className = n.className.indexOf('more') >= 0 ? 'more' : 'item';
        });
    }
}
function ff2(e) {
    if (g.navigator.platform.indexOf('Win') < 0 && g.navigator.userAgent.indexOf('iPhone') > 0) {
        clearCardEff();
        if (e.persisted) {
            sessionStorage.setItem('pageshow', 'true');
        }
        /**
         * 환경: ios인앱(사파리,크롬)
         * 재연스텝: 프라이빗모드에서 카드리스트 열린 상태에서 앱 강제종료 후 다시 실행할때 backfoard캐쉬로 인한 이슈
         * 이슈내용: 키워드가 커진 상태로 열려져 있음
         * */
        //alert(document.getElementById('wrap').className)
        /*if(document.getElementById('wrap').className !== 'clicked') {
            setTimeout(()=>{
                keyword.hideEff();
                keyword.updateBubble();
            }, 2000);
        }*/
        //alert(`ff2/ cardshow:${sessionStorage.getItem('cardshow')}, pageshow: ${sessionStorage.getItem('pageshow')}`)
    }
}
function ff() {
    clearCardEff();
    //alert(`ff/ cardshow:${sessionStorage.getItem('cardshow')}, pageshow: ${sessionStorage.getItem('pageshow')}`)
    if (params && params.target === 'MAIN') {
        closeCardMain();
    }
    else {
        var wrap = document.querySelector('#wrap');
        var pageshow = sessionStorage.getItem('pageshow');
        if (g.navigator.userAgent.indexOf('iPhone') < 0) {
            if (wrap.className === 'clicked') {
                closeCardView();
            }
        }
        else {
            if (pageshow !== 'true' && wrap.className === 'clicked') {
                closeCardView();
            }
            sessionStorage.setItem('cardshow', 'false');
        }
        //updateToResize();
        sessionStorage.setItem('pageshow', 'false');
    }
}
// 메인용 닫기&히스토리백
function closeCardMain() {
    if (article.webview === 'nate_app') {
        var pageshow = sessionStorage.getItem('pageshow');
        if (pageshow === 'true') {
            sessionStorage.setItem('pageshow', 'false');
        }
        else {
            g.window.location.href = utils_1.MAIN_LINK;
        }
    }
    else if (article.webview) {
        window.close();
        setTimeout(function () {
            g.window.location.href = utils_1.MAIN_LINK;
        }, 300);
    }
}
// 5개의 주요뉴스 클릭함수
function cardClick(e) {
    if (sessionStorage.getItem('pageshow') === 'true') {
        sessionStorage.setItem('pageshow', 'error');
    }
    sessionStorage.setItem('pageshow', 'true');
    sessionStorage.setItem('cardshow', 'true');
    window.location.href = "skt-marketing-api://outerbrowser?url=" + e.getAttribute('data-link');
}
// share SNS
function shareSNS(e) {
    e.preventDefault();
    var t = document.querySelector('.layerPopup');
    t.className = 'layerPopup share active';
    document.body.className = 'scroll-block';
    document.querySelector('html').setAttribute('class', 'app');
}
// closeSNS
function closeSNS(e) {
    e.preventDefault();
    var t = document.querySelector('.layerPopup');
    t.className = 'layerPopup share';
    document.body.className = '';
    document.querySelector('html').removeAttribute('class');
}
function closeCardView() {
    // 카드뷰가 열린 상태에서 리사이징이 일어날때 true
    if (sessionStorage.getItem('resize') === 'true') {
        sessionStorage.setItem('cardshow', 'null');
        article.out();
        setTimeout(function () {
            keyword.hideEff();
            setTimeout(keyword.updateBubble.bind(keyword), 400);
            sessionStorage.setItem('resize', null);
        }, 200);
    }
    else {
        article.out();
    }
}
// DEV
if (true) {
    g.dd = DATA;
    g.a = article;
    g.params = params;
    g.cc = calendar;
    g.pp = progress;
    g.kk = keyword;
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
/*! exports provided: TMP_PROGRESS */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TMP_PROGRESS", function() { return TMP_PROGRESS; });
var TMP_PROGRESS = "\n<svg id=\"newsEdgeProgress\" class=\"newsEdgeProgress\">\n    <g class=\"progress\">\n        <defs><linearGradient id=\"pathLinear\"><stop offset=\"0%\" stop-color=\"#639eff\"></stop><stop offset=\"100%\" stop-color=\"rgba(91, 108, 255, .98)\"></stop></linearGradient></defs>\n        <path class=\"pathBackboard\" d=\"M 0 20 H 0 V 28M 4 20 H 4 V 28M 8 20 H 8 V 28M 12 20 H 12 V 28M 16 20 H 16 V 28M 20 20 H 20 V 28M 24 20 H 24 V 28M 28 20 H 28 V 28M 32 20 H 32 V 28M 36 20 H 36 V 28M 40 20 H 40 V 28M 44 20 H 44 V 28M 48 20 H 48 V 28M 52 20 H 52 V 28M 56 20 H 56 V 28M 60 20 H 60 V 28M 64 20 H 64 V 28M 68 20 H 68 V 28M 72 20 H 72 V 28M 76 20 H 76 V 28M 80 20 H 80 V 28M 84 20 H 84 V 28M 88 20 H 88 V 28M 92 20 H 92 V 28M 96 20 H 96 V 28M 100 20 H 100 V 28M 104 20 H 104 V 28M 108 20 H 108 V 28M 112 20 H 112 V 28M 116 20 H 116 V 28M 120 20 H 120 V 28M 124 20 H 124 V 28M 128 20 H 128 V 28M 132 20 H 132 V 28M 136 20 H 136 V 28M 140 20 H 140 V 28M 144 20 H 144 V 28M 148 20 H 148 V 28M 152 20 H 152 V 28M 156 20 H 156 V 28M 160 20 H 160 V 28M 164 20 H 164 V 28M 168 20 H 168 V 28M 172 20 H 172 V 28M 176 20 H 176 V 28M 180 20 H 180 V 28M 184 20 H 184 V 28M 188 20 H 188 V 28M 192 20 H 192 V 28M 196 20 H 196 V 28M 200 20 H 200 V 28M 204 20 H 204 V 28M 208 20 H 208 V 28M 212 20 H 212 V 28M 216 20 H 216 V 28M 220 20 H 220 V 28M 224 20 H 224 V 28M 228 20 H 228 V 28M 232 20 H 232 V 28M 236 20 H 236 V 28M 240 20 H 240 V 28M 244 20 H 244 V 28M 248 20 H 248 V 28M 252 20 H 252 V 28\" stroke-width=\"1\" stroke=\"#c7ccd1\" fill=\"none\" shape-rendering=\"crispEdges\"></path>\n        <path class=\"pathBack\" d=\"M0 24 l 0 0\" stroke-linecap=\"round\" stroke-width=\"10\" stroke=\"#e6e8ea\"></path>\n        <path class=\"pathFront\" stroke=\"url(#pathLinear)\" d=\"M0 24 l 254 0.01\" stroke-width=\"14\" stroke-linecap=\"round\" fill=\"#5b6cff\"></path>\n        <g class=\"timeGroup\" transform=\"matrix(1,0,0,1,0,24)\">\n            <circle class=\"timeKnob\" r=\"12\" stroke=\"#5b6cff\" stroke-width=\"1\" fill=\"#fff\"></circle>\n            <rect class=\"timeKnobEmpty\" x=\"-24\" y=\"-24\" width=\"48\" height=\"48\" fill=\"transparent\"></rect>\n            <svg class=\"timeTooltip\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" width=\"91.44\" height=\"40\" viebox=\"0,0,91.44,40\" style=\"overflow: visible\">\n              <defs>\n                <filter id=\"filter1Back\" width=\"128.9%\" height=\"167.4%\" x=\"-14.4%\" y=\"-28.5%\" filterUnits=\"objectBoundingBox\">\n                    <feOffset result=\"shadowOffsetOuter1\" in=\"SourceAlpha\" dy=\"2\"></feOffset>\n                    <feGaussianBlur result=\"shadowBlurOuter1\" in=\"shadowOffsetOuter1\" stdDeviation=\"4\"></feGaussianBlur>\n                    <feColorMatrix in=\"shadowBlurOuter1\" values=\"0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.12 0\"></feColorMatrix>\n                    <rect id=\"filter1Rect\" width=\"91.44\" height=\"40\" x=\"-45.72\" y=\"-64\"></rect>\n                </filter>\n                <filter id=\"filter2Back\" width=\"356.7%\" height=\"367.1%\" x=\"-128.3%\" y=\"-85%\" filterUnits=\"objectBoundingBox\">\n                    <feOffset result=\"shadowOffsetOuter1\" in=\"SourceAlpha\" dy=\"4\"></feOffset>\n                    <feGaussianBlur result=\"shadowBlurOuter1\" in=\"shadowOffsetOuter1\" stdDeviation=\"3\"></feGaussianBlur>\n                    <feColorMatrix in=\"shadowBlurOuter1\" values=\"0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.0754206731 0\"></feColorMatrix>\n                    <path id=\"filter2Path\" transform=\"translate(-14 -24)\" d=\"M 19.285 0 L 15 8.235 10.714 0 h 8.571z\"></path>\n                </filter>\n              </defs>\n              <g>\n                  <use fill=\"#000\" filter=\"url(#filter1Back)\" xlink:href=\"#filter1Rect\"></use>\n                  <use fill=\"#fff\" xlink:href=\"#filter1Rect\"></use>\n                  <use fill=\"#000\" filter=\"url(#filter2Back)\" xlink:href=\"#filter2Path\"></use>\n                  <use fill=\"#fff\" xlink:href=\"#filter2Path\"></use>\n                  <text class=\"timeText\" alignment-baseline=\"middle\" text-anchor=\"middle\" x=\"0\" y=\"-38\" font-size=\"22.352px\">\n                      <tspan class=\"hh\" dx=\"0\" dy=\".1em\" fill=\"#000\">00</tspan><tspan class=\"dtm-div\" dx=\"4\" dy=\"-.1em\" fill=\"#7c8aff\">:</tspan><tspan class=\"mm\" dx=\"5\" dy=\".1em\" fill=\"#000\">00</tspan>\n                  </text>\n              </g>\n          </svg>\n        </g>\n    </g>\n</svg>\n";


/***/ })

/******/ });