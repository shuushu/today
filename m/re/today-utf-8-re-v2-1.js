'use strict';

/** 
 * * Moment Locale
 */
moment.locale('ko');

/**
 * * Gsap RegisterPlugin
 */
gsap.registerPlugin(Draggable, DrawSVGPlugin, MotionPathPlugin, ScrollToPlugin, InertiaPlugin);


var setProgressWidth = (254 / 375);
var setProgressHeight = (48 / 375);
let resizeCircleTimer,
  circle,
  progressUI,
  article,
  DATA;

// getter, setter 정의
const defineProps = (arr, inst) => {
  arr.map(key => {
    Object.defineProperty(inst, key, {
      get: () => {
        return inst[`_${key}`]
      },
      set: (v) => {
        inst[`_${key}`] = v;
      }
    });
  })
}

/* 데이터 통신 */
const myData = (() => {
  const keyword = Symbol('KEYWORD'),
    article = Symbol('ARTICLE');

  class myData {

    static init(data) {
      if (!data) {
        console.log('data error');
        return false;
      } else {
        return new myData(data);
      }
    }

    constructor(v) {
      if (!v) throw console.log('data error');
      this[keyword] = [];
      this[article] = [];
      this._serviceDTM;
      this._serverDTM;
      this._updateDTM;
      this._progressDTM;
      this._timestamp = {
        server: null,
        now: null,
        start: null,
        end: null,
        limit: null,
        percent: null
      };
      defineProps(['serverDTM', 'updateDTM', 'serviceDTM', 'progressDTM', 'timestamp'], this);
      this.updateData(v, true)
    }
    get keyword() {
      return this[keyword];
    }
    set keyword(v) {
      this[keyword].push(v);
    }
    get article() {
      return this[article];
    }
    set article(v) {
      this[article].push(v);
    }
    // 밀리세컨드 = 23시59분
    get oneDateMilli() {
      return (1000 * 60 * 60 * 24) - (1000 * 60);
    }
    // method
    resetKeyword() {
      this[keyword] = [];
    }

    resetArticle() {
      this[article] = [];
    }
    // 시간 string 을 timestamp로 변경
    convertToTimeStamp() {
      this.timestamp.server = moment(this.serverDTM).valueOf();
      this.timestamp.now = moment(this.progressDTM).valueOf();
      this.timestamp.start = moment(this.progressDTM).startOf('day').valueOf();
      this.timestamp.end = moment(this.progressDTM).endOf('day').valueOf();
      this.timestamp.percent = (this.timestamp.now - this.timestamp.start) / this.oneDateMilli;
      this.timestamp.limit = (utils.convertTime(this.serverDTM, 'YMD') === utils.convertTime(this.progressDTM, 'YMD')) ? ((this.timestamp.server - this.timestamp.start) / this.oneDateMilli) : 1;
    }
    updateData(res, init) {
      if (!!init) {
        this.updateDTM = utils.dateFormat(res.update_dtm);
        this.serviceDTM = utils.dateFormat(res.service_dtm);
        this.progressDTM = utils.dateFormat(res.server_dtm);
      }

      this.serverDTM = utils.dateFormat(res.server_dtm);

      // 키워드 설정
      for (let key in res.data) this.keyword = res.data[key];
      // string 시간 변환 > timestamp
      this.convertToTimeStamp();
    }
    updateArticle(res) {
      // 기사 설정
      for (let key in res.data) this.article = res.data[key];
    }
    static dataLoadEvent(path) {
      var type;
      if (path.indexOf('keyword_sq') !== -1) {
        type = 'articleList';
      } else {
        type = path.split('=')[1] || '2020-08-21 12:00:00';
      }

      return new Promise(resolve => {
        $.ajax({
            type: 'GET',
            url: '../src/data/fake.json',
            //url: path,
            dataType: 'json',
            processData: false
          })
          .done((data) => {
            /*
            if(data.result === 204) {
              alert('데이터 없음')
              return false;
            }
            resolve(data);
            */
            resolve(data[type]);
          })
          .fail(function () {
            console.log('fail');
            resolve(false)
          })
      })

      // plast.$dataloader.AJAX(plast.$dataloader.ARG.url(path).onComplete((res) => {
      //   if (res.status === 200) {
      //     try {
      //       callback(plast.$dataloader.parseJson(res.responseText));
      //     } catch(e) {
      //       console.log(e);
      //     }
      //   } else {
      //     console.log('data error');
      //   }
      // }));
    }
  }

  return myData;
})();

/* 도화지 */
const WhiteBoard = (() => {
  class WhiteBoard {
    constructor(target, options) {
      if (!d3 || !target) return;

      this._target = d3.select(target);
      this._name = target;
      this._data = null;
      this._timer = null;
      this._options = Object.assign({
        width: window.innerWidth,
        height: window.innerHeight
      }, options || {});

      defineProps(['data', 'timer'], this)
    }

    get orientation() {
      return window.matchMedia('(orientation: portrait)').matches;
    }

    setCanvasSize(w = this._options.width, h = this._options.height) {
      if (typeof w !== 'number' || typeof h !== 'number') return;
      this._target.attr('width', w).attr('height', h).attr('viewBox', [0, 0, w, h]);
    }
    move() {
      this._move();
    }
    paint() {
      this._paint();
    }
    rePaint() {
      this._rePaint();
    }
    _paint() {
      throw 'error'
    }
    _move() {
      throw 'error'
    }
    _rePaint() {
      throw 'error'
    }
  }

  return WhiteBoard;
})();

/* 버블그리기 */
const Circle = (() => {
  class Node {
    constructor() {
      this._item = null;
      this._box = null;
      this._simulation = null;
      this._circle = null
      this._text = null;
      defineProps(['simulation'], this)
    }
    add(key, v) {
      this[key] = v;
    }
  }
  class Circle extends WhiteBoard {
    constructor(name, options) {
      super(name);
      this._options = Object.assign(this._options, options || {});
      this._arr = [];
      this._excTimer;
      this._clickFlag = true; // 클릭 플래그, 노드 호출이 끝나면 true로 변경, 이벤트 실행 가능
      // 용지 설정
      this.setCanvasSize();
      defineProps(['options', 'click', 'clickFlag'], this)
    }
    get targetNode() {
      return this._arr[this._arr.length - 1]
    }
    _paint() {
      const fTouch = (d, i) => {
        const c = this.targetNode._circle.nodes(),
          {
            type
          } = event;
        d3.select(c[i]).attr('style', `transform: scale(${ type === 'touchstart' ? 0.8 : 1 })`);
        document.body.style.overflow = `${ type === 'touchstart' ? 'hidden' : 'visible' }`;
      }
      this._arr.push(new Node())

      this.targetNode.add('_box', this._target.append('g').attr('class', 'itemList'));
      this.targetNode._box.selectAll('.itemList').data(this._data)
        .join(
          // 노드 생성
          (rv) => {
            this.targetNode.add('_item', 
              rv.append('g')
                .attr('class', (d, i) => `bubbleGroup-${i}`)
              )
            this.targetNode._item.select('.bubbleWrap').attr('width', d => parseInt(d.radius * 2)).attr('height', d => parseInt(d.radius * 2)).attr('viewBox', d => [0, 0, parseInt(d.radius * 2), parseInt(d.radius * 2)])
            this.targetNode.add('_circle', this.targetNode._item.append('circle').attr('class', 'bubbleCircle').attr('style', 'transform: scale(0)'))
            this.targetNode.add('_text', this.targetNode._item.append('text').attr('class', 'bubbleText').attr('style', 'opacity: 0').attr('font-size', (d, i) => `${parseInt(d3.scaleLinear().domain([0, 100]).range([0, this.options.width])(this.options.sizes[i]))}px`));
            this.targetNode._text.html(d => (d.keyword_service.split('<br />').map(self => self.trim()).slice(0, 3).map((n, s, size) => {
              let v = '1.2em';
              if (s === 0) {
                switch (size.length) {
                  case 4:
                    v = '-1.5em';
                    break;
                  case 3:
                    v = '-1em';
                    break;
                  case 2:
                    v = '-0.5em';
                    break;
                  case 1:
                    v = '0.1em';
                    break;
                  default:
                    v = '-2em';
                    break;
                }
              }

              return `<tspan x="0" dy="${v}" dominant-baseline="middle" text-anchor="middle">${n}</tspan>`
            })).join(''));
            return this.targetNode._item
          },
          (update) => {
            this.showElement();
            return update;
          },
          _ => {
            // 교차 될때 - 이전노드
            if (this._arr.length > 1) {
              if (this._timer) clearTimeout(this._timer);
              this._timer = setTimeout(() => {
                while (this._arr.length > 1) {
                  this._arr.shift()._simulation.stop();
                }
                this._target.selectAll('.itemList.old').remove();
              }, 1500)
            }
          }
        )
        .attr('transform', d => `translate(${parseInt(d.x)},${parseInt(d.y)})`)
        .on('touchstart', fTouch)
        .on('touchend', fTouch)
        .on('click', (e, a, b) => {
          this.click(e, a, b)
        });
    }
    _move(data) {
      this.initEffect();
      this.targetNode._simulation.restart().on('tick', _ => {
        // 교차 될때 - 이전노드
        if (this._arr.length > 1) {
          this._arr[this._arr.length - 2]._item.transition().duration(this._options.duration).attr('transform', d => `translate(${d.x - 1}, ${d.y - 1})`)
        }
        this.targetNode._item.transition().duration(this._options.duration).attr('transform', d => `translate(${d.x - 1}, ${d.y - 1})`)
      }).nodes(data || this._data)
      this.targetNode._simulation.on('end', _ => {
        if (this._timer) clearTimeout(this._timer);
        this._timer = setTimeout(() => {
          this.targetNode._simulation.stop();
          this.stopEffect()
        }, 400);
      })
    }
    // 새로 그리기
    _rePaint() {
      this.paint();
      this.move();
    }
    // 캔버스 사이즈 변경
    resizeCanvas() {
      this._options.width = window.innerWidth;
      this._options.height = window.innerWidth;
      this.setCanvasSize();
    }
    // 요소 사라질 때
    hideElement() {
      this.targetNode._circle.transition()
        .delay((d, i) => i * 100)
        .attr('style', 'transform: scale(0)')
      this.targetNode._text.transition()
        .delay((d, i) => i * 100)
        .attr('style', 'opacity:0')
    }
    // 요소 나타날 때
    showElement() {
      this.targetNode._circle.transition()
        .delay((d, i) => i * 100)
        .duration(this._options.duration)
        .attr('r', d => parseInt(d.radius)).attr('cx', 0).attr('cy', 0).attr('fill', (d, i) => this._options.color[i])
        .attr('style', 'transform: scale(1)')

      this.targetNode._text.transition()
        .delay((d, i) => i * 100)
        .duration(this._options.duration)
        .attr('style', 'opacity:1')
    }
    // 초기 움직임
    initEffect() {
      this.targetNode._simulation = d3.forceSimulation()
        .velocityDecay(this._options.velocityDecay)
        .force('x', d3.forceX(this._options.width / 2))
        .force('y', d3.forceY(this._options.height / 2))
        .force('chargeEffect', d3.forceManyBody().strength(this._options.forceStrength))
        .force('collide', d3.forceCollide().radius(d => d.radius + this._options.gap))
    }
    //
    stop() {
      this._arr.forEach(v => v._simulation.stop())
      //this.targetNode._simulation.stop();
    }
    // 드래그 스타트 > 모으기
    chargeEffect() {
      this.targetNode._simulation.stop();
      this.targetNode._simulation
        //.alphaTarget(0.1)
        .force('x', d3.forceX(this._options.width / 2).strength(1.4))
        .force('y', d3.forceY(this._options.height / 2).strength(1.4))
        .force('collide', d3.forceCollide().radius(d => d.radius - 20))
        .restart().tick()

    }
    // 정지 효과(회전)
    stopEffect() {
      this.targetNode._simulation.stop();
      this.targetNode._simulation
        .alphaTarget(0.1)
        .force('x', d3.forceX(this._options.width / 2).strength(1))
        .force('y', d3.forceY(this._options.height / 2).strength(1))
        .force('collide', d3.forceCollide().radius(d => d.radius + 7))
        .restart()
    }
    // 데이터 갱신 시 이펙트(날리기 후 신규그리기)
    endEffect() {
      if (this._timer) clearTimeout(this._timer)
      this._timer = setTimeout(this.update.bind(this), 300)
      this.hideElement()

      this.targetNode._simulation.stop();
      this.targetNode._simulation
        .alphaTarget(0)
        .force('x', d3.forceX(this._options.width / 2))
        .force('y', d3.forceY(this._options.height / 2))
        .force('collide', d3.forceCollide().radius(d => d.radius + 20))
        .alphaDecay(0.02)
        .restart()
      // this.update();  기존 이펙트

      this.targetNode._box.attr('class', 'itemList old')


      // [예외테스트] 불규칙하게 업데이트가 되지 않을때
      const _this = this;
      if (this._excTimer) clearTimeout(this._excTimer)
      this._excTimer = setTimeout(_ => {
        if (document.querySelector('.itemList.old')) {
          _this.update()
        }
      }, 2000)
      //setTimeout(this.update.bind(this), 500)
      //this.targetNode._simulation.on('end', this.update.bind(this))
    }
    // 기존버블은 사라지고 새로운 버블 갱신
    update() {
      this.targetNode._simulation.stop();
      this.calcSetData(this._data);
      this.rePaint();
    }
    calcBubblesPositions() {
      const forceXY = [
        // Portrait Percent
        [{
            x: .12,
            y: .026
          },
          {
            x: .357,
            y: .357
          },
          {
            x: .053,
            y: .453
          },
          {
            x: .56,
            y: .213
          },
          {
            x: .653,
            y: .693
          },
          {
            x: .546,
            y: .001
          },
          {
            x: .23,
            y: .80
          },
          {
            x: .48,
            y: .80
          },
          {
            x: .753,
            y: .46
          },
          {
            x: .7467,
            y: .0667
          }
        ],
        // Landscape Percent
        [{
            x: -0.3013,
            y: .040
          },
          {
            x: -0.2507,
            y: 0.5600
          },
          {
            x: -0.1333,
            y: 0.1333
          },
          {
            x: 0.3200,
            y: 0.0373
          },
          {
            x: 0.3067,
            y: 0.3733
          },
          {
            x: 0.6187,
            y: 0.1280
          },
          {
            x: 0.7520,
            y: 0.3707
          },
          {
            x: 1.0560,
            y: 0.0320
          },
          {
            x: 1.0987,
            y: 0.2880
          },
          {
            x: 0.9600,
            y: 0.4907
          }
        ]
      ];
      const positions = this.orientation ? utils.shuffleArray(forceXY[0]) : utils.shuffleArray(forceXY[1]);
      const radiusScale = d3.scaleLinear().domain([0, 100]).range([0, this._options.width]);

      return this._options.percent.map((percent, i) => {
        var r = parseInt(radiusScale(this._options.percent[i] / 2));

        return {
          x: parseInt(this._options.width * positions[i].x) + r,
          y: parseInt(this._options.height * positions[i].y) + r,
        }
      });
    }
    calcSetData(data) {
      if (data && data.length > 0 && Array.isArray(data)) {
        const positions = this.calcBubblesPositions();
        const radiusScale = d3.scaleLinear().domain([0, 100]).range([0, this._options.width]);
        this._data = data.map((d, i) => {
          return utils._objectSpread(utils._objectSpread({}, d), {}, {
            radius: parseInt(radiusScale(this._options.percent[i] / 2)),
            x: parseInt(positions[i].x),
            y: parseInt(positions[i].y)
          });
        })
      }
    }
  }
  return {
    init: (name, options) => {
      return new Circle(name, options)
    }
  }
})();

/* 프로그래스바 그리기 */
const Progress = (() => {
  class Progress extends WhiteBoard {
    constructor(name) {
      super(name);
      this._dragFlag = false;
      this._drag = null;
      this._node = {};
      this._options = Object.assign(this._options, {
        width: this.calcPresume(setProgressWidth),
        height: this.calcPresume(setProgressHeight),
        bar: {
          width: this.calcPresume(setProgressWidth),
          height: this.calcPresume(setProgressHeight)
        },
        knob: {
          r: this.calcPresume(.064) / 2
        }
      });
      // 프로그레스
      this._data = {
        TL: null,
        limit: null,
      };
      defineProps(['dragFlag', 'drag', 'options'], this)
      this.setCanvasSize();
    }

    // 컨트롤러 앞/뒤 패스
    get path() {
      return {
        front: 'M0 ' + (this._options.bar.height / 2) + ' l ' + this._options.bar.width + ' ' + .01,
        back: 'M0 ' + (this._options.bar.height / 2) + ' l ' + (this._options.bar.width * this._data.limit) + ' ' + .01,
        backboard: (() => {
          var time = this._options.bar.width / (this._options.height * 0.08333333333333333);
          var pathResult = '';

          for (var i = 0; i < time; i++) {
            pathResult += 'M ' + (this._options.bar.height * 0.08333333333333333) * i + ' ' + (this._options.bar.height * 0.4166666666666667) + ' H ' + (this._options.bar.height * 0.08333333333333333) * i + ' V ' + ((this._options.bar.height * 0.4166666666666667) + (this._options.bar.height * 0.16666666666666666));
          }
          return pathResult;
        })()
      }
    }
    // 밀리세컨드 = 23시59분
    get oneDateMilli() {
      return (1000 * 60 * 60 * 24) - (1000 * 60);
    }
    // 창크기에 반응하여 가로,세로 비율 변경
    calcPresume(v) {
      return Math.min(window.innerWidth, 375) * v;
    }
    // 패스/시간 업데이트
    calcSetData(data) {
      this._data = Object.assign(data, {
        HM: utils.convertTime((data.percent * this.oneDateMilli) + data.start, 'HM'),
        YMDH: utils.convertTime((data.percent * this.oneDateMilli) + data.start, 'YMDH'),
        YMDHM: utils.convertTime((data.percent * this.oneDateMilli) + data.start, 'YMDHM'),
      })
    }
    _paint() {
      this._target.selectAll('.progress').data(this._data)
        .join(
          _ => {
            this._node.group = this._target.append('g').attr('class', 'progress');
            // 바 (백그라운드 필터)
            this._node.linearDefs = this._node.group.append('defs')
            this._node.linear = this._node.linearDefs.append('linearGradient').attr('id', `${this._name.slice(1)}-pathLinear`);
            this._node.linear.append('stop').attr('offset', '0%').attr('stop-color', '#639eff');
            this._node.linear.append('stop').attr('offset', '100%').attr('stop-color', 'rgba(91, 108, 255, .98)');

            // 바 (백보드)
            this._node.pathBackboard = this._node.group.append('path').attr('class', 'pathBackboard');
            // 바 (바코드)
            this._node.pathBack = this._node.group.append('path').attr('class', 'pathBack');
            // 바 (직선)
            this._node.pathFront = this._node.group.append('path').attr('class', 'pathFront');
            // 컨트롤러
            this._node.timeGroup = this._node.group.append('g').attr('class', 'timeGroup');
            // 컨트롤러 (핀)
            this._node.knob = this._node.timeGroup.append('circle').attr('class', 'timeKnob');
            // 컨트롤러 (시간 툴팁)
            this._node.timeTooltip = this._node.timeGroup.append('svg').attr('class', 'timeTooltip').attr('xmlns', 'http://www.w3.org/2000/svg').attr('xmlns:xlink', 'http://www.w3.org/1999/xlink')
            // 컨트롤러 (쉐도우 효과)
            this._node.filterDefs = this._node.timeTooltip.append('defs');
            // 컨트롤러 (쉐도우 효과 배경)
            this._node.filter1 = this._node.filterDefs.append('filter').attr('id', `${this._name.slice(1)}-filter1Back`).attr('filterUnits', 'objectBoundingBox').attr('width', '128.9%').attr('height', '167.4%').attr('x', '-14.4%').attr('y', '-28.5%');
            this._node.filter1.append('feOffset').attr('result', 'shadowOffsetOuter1').attr('in', 'SourceAlpha').attr('dy', 2);
            this._node.filter1.append('feGaussianBlur').attr('result', 'shadowBlurOuter1').attr('in', 'shadowOffsetOuter1').attr('stdDeviation', 4)
            this._node.filter1.append('feColorMatrix').attr('in', 'shadowBlurOuter1').attr('values', '0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.12 0');
            this._node.filterRect = this._node.filter1.append('rect').attr('id', `${this._name.slice(1)}-filter1Rect`);
            // 컨트롤러 (쉐도우 효과 하단 삼각형)
            this._node.filter2 = this._node.filterDefs.append('filter').attr('id', `${this._name.slice(1)}-filter2Back`).attr('filterUnits', 'objectBoundingBox').attr('width', '356.7%').attr('height', '367.1%').attr('x', '-128.3%').attr('y', '-85%');
            this._node.filter2.append('feOffset').attr('result', 'shadowOffsetOuter1').attr('in', 'SourceAlpha').attr('dy', 4)
            this._node.filter2.append('feGaussianBlur').attr('result', 'shadowBlurOuter1').attr('in', 'shadowOffsetOuter1').attr('stdDeviation', 3)
            this._node.filter2.append('feColorMatrix').attr('in', 'shadowBlurOuter1').attr('values', '0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.0754206731 0');
            this._node.filterPath = this._node.filter2.append('path').attr('id', `${this._name.slice(1)}-filter2Path`);
            // 컨트롤러 툴팁 그룹
            this._node.timeTooltipGroup = this._node.timeTooltip.append('g');
            this._node.timeTooltipGroup.append('use').attr('fill', '#000').attr('filter', `url(#${this._name.slice(1)}-filter1Back)`).attr('xlink:xlink:href', `#${this._name.slice(1)}-filter1Rect`);
            this._node.timeTooltipGroup.append('use').attr('fill', '#fff').attr('xlink:xlink:href', `#${this._name.slice(1)}-filter1Rect`);
            this._node.timeTooltipGroup.append('use').attr('fill', '#000').attr('filter', `url(#${this._name.slice(1)}-filter2Back)`).attr('xlink:xlink:href', `#${this._name.slice(1)}-filter2Path`);
            this._node.timeTooltipGroup.append('use').attr('fill', '#fff').attr('xlink:xlink:href', `#${this._name.slice(1)}-filter2Path`);
            // 컨트롤러 툴팁 시간
            this._node.timeText = this._node.timeTooltipGroup.append('text').attr('class', 'timeText').attr('alignment-baseline', 'middle').attr('text-anchor', 'middle').style('font-weight', 'bold');
            // 컨트롤로 영역 넓히는 엘리먼트
            this._node.timeGroup.append('rect').attr('class', 'empty').attr('x', -70).attr('y', -70).attr('height', 100).attr('width', 140).attr('fill', 'transparent')
          },
          (update) => {
            this.drawStyle();
            return update;
          });
    }
    drawStyle() {
      this._target
        .attr('width', this._options.width)
        .attr('height', this._options.height)
        .attr('viewBox', [0, 0, this._options.width, this._options.height]);

      this._node.pathBackboard
        .attr('d', this.path.backboard)
        .attr('stroke-width', 1)
        .attr('stroke', '#c7ccd1')
        .attr('fill', 'none')
        .attr('shape-rendering', 'crispEdges');

      this._node.pathBack
        .attr('d', this.path.back)
        .attr('stroke-width', this._options.height * 0.20833333333333334)
        .attr('stroke', '#e6e8ea');

      this._node.pathFront
        .attr('d', this.path.front)
        .attr('stroke-width', d => this._options.height * 0.2916666666666667)
        .attr('stroke', `url(#${this._name.slice(1)}-pathLinear)`)
        .attr('stroke-linecap', 'round')
        .attr('fill', '#5b6cff');

      this._node.knob
        .attr('r', this._options.knob.r)
        .attr('stroke', '#5b6cff')
        .attr('stroke-width', 1)
        .attr('fill', '#fff');

      this._node.timeTooltip
        .attr('width', this._options.width * 0.36)
        .attr('height', this._options.height * 0.8333333333333334)
        .attr('viebox', [0, 0, this._options.width * 0.36, this._options.height * 0.8333333333333334]);

      this._node.filterRect
        .attr('width', this._options.width * 0.36)
        .attr('height', this._options.height * 0.8333333333333334)
        .attr('x', (this._data.percent * 100 > 84) ? -(((this._options.width * .36) / 2) - (84 - this._data.percent * 100)) : -((this._options.width * .36) / 2))
        .attr('y', -(this._options.height + this._options.knob.r + 4))
        .attr('rx', this._options.knob.r * 2);

      this._node.filterPath
        .attr('transform', 'translate(' + -(this._options.knob.r + 2) + ' ' + -(this._options.knob.r * 2) + ')')
        .attr('d', 'M 19.285 0 L 15 8.235 10.714 0 h 8.571z');

      this._node.timeText
        .attr('x', (84 < this._data.percent * 100) ? (84 - this._data.percent * 100) : 0)
        .attr('y', -((this._options.knob.r * 3) + 2))
        .attr('font-size', this._options.width * 0.088 + 'px')
        .style('font-style', 'bold');

      this.drawTimeUpdate();
    }
    drawTimeUpdate() {
      this._node.timeText.html(_ => this._data.HM.split(' ').map((time, i, size) => {
        let dx = 0;
        let dy = 0;
        let fill = '';

        if (size.length > 1) {
          dx = (i === 1) ? i * 4 : i * 2.5;
          dy = (i === 1) ? '-.1em' : '.1em';
          fill = (i === 1) ? '#7c8aff' : '#000';
        }

        return `<tspan dx="${dx} "dy="${dy}" fill="${fill}">${time}</tspan>`;
      }).join(''));
    }
    contollerEvent(event) {
      const options = Object.assign({
        trigger: `${this._name} .timeGroup`,
        type: 'x, y',
        bounds: {
          minX: 0,
          maxX: this._options.bar.width * this._data.limit,
          minY: this._options.knob.r * 2,
          maxY: this._options.knob.r * 2,
        },
        allowEventDefault: true,
        throwProps: false,
      }, event || {})


      this._data.TL = gsap.timeline({
        defaults: {
          overwrite: 'auto',
          ease: 'none'
        },
        paused: true
      });

      this._data.percent = this._data.percent || (this._data.percent !== 0) ? this._data.percent : .00001;

      if (this._drag !== null) this.drag.kill();

      this.drag = Draggable.create(`${this._name} .timeGroup`, options)[0];

      gsap.set(`${this._name} .pathFront`, {
        clearProps: 'all'
      });

      this._data.TL.from(`${this._name} .pathFront`, 1, {
        drawSVG: '0%'
      }).to(`${this._name} .timeGroup`, 1, {
        motionPath: {
          path: `${this._name} .pathFront`
        }
      }, 0).progress(this._data.percent);
    }
  }
  return {
    init: (name, options) => {
      return new Progress(name, options)
    }
  }
})();



/* 날짜 아카이빙  */
const timeArchive = (() => {
  class timeArchive {
    constructor(target, data) {
      this.target = document.querySelector(target)
      this.timeline = [
        this.target.querySelector('.year'),
        this.target.querySelector('.month'),
        this.target.querySelector('.date')
      ]
      this._data = data

      defineProps(['prev', 'next', 'today'], this)
    }

    setDisplayTime() {
      utils.convertTime(this._data.serviceDTM, 'YMD').split('-').forEach((time, i) => {
        this.timeline[i].innerText = time;
      });
    }

    setDisabledTirgger(tirggers, limitType) {
      switch (limitType) {
        case 'minLimit':
          tirggers[0].disabled = true;
          tirggers[1].disabled = false;
          tirggers[2].disabled = false;
          break;
        case 'maxLimit':
          tirggers[0].disabled = false;
          tirggers[1].disabled = true;
          tirggers[2].disabled = true;
          break;
        case 'noLimit':
          tirggers[0].disabled = false;
          tirggers[1].disabled = false;
          tirggers[2].disabled = false;
          break;
      }
    }

    _serviceMilli(to) {
      return utils.varOperator(to, moment(this._data.serviceDTM).valueOf(), this._data.oneDateMilli)
    }

    _progressMilli(to) {
      return utils.varOperator(to, moment(this._data.progressDTM).valueOf(), this._data.oneDateMilli)
    }

    _update(timeline, callBack) {
      myData.dataLoadEvent(timeline.path).then(res => {
        this._data.serviceDTM = (timeline.serviceDTM !== null) ? utils.dateFormat(timeline.serviceDTM) : utils.dateFormat(res.service_dtm);
        this._data.progressDTM = (timeline.progressDTM !== null) ? utils.dateFormat(timeline.progressDTM) : utils.dateFormat(res.server_dtm);

        this._data.resetKeyword();
        this._data.updateData(res);

        callBack(this._data, timeline);
      });
    }

    updatePrev(callBack) {
      // 이전 날짜 이동 가능 시간대
      const minDateMilli = moment(utils.dateFormat('2020-08-20 00:00:00')).valueOf();

      // 이전 날짜 계산
      const serviceMilli = this._serviceMilli('prev');
      const progressMilli = this._progressMilli('prev');

      if (serviceMilli >= minDateMilli) {
        return this._update({
          path: `${KEYWORD_URL}?service_dtm=${utils.convertTime(serviceMilli, 'YMDH')}`,
          serviceDTM: utils.convertTime(serviceMilli, 'YMDH'),
          progressDTM: utils.convertTime(progressMilli, 'YMDHM'),
          limitType: (utils.convertTime(serviceMilli, 'YMD') === utils.convertTime(minDateMilli, 'YMD')) ? 'minLimit' : 'noLimit'
        }, callBack);
      } else {
        throw new Error('It\'s not valid date.');
      }
    }

    updateNext(callBack) {
      // 다음 날짜 이동 가능 시간대
      const maxDateMilli = moment(this._data.serverDTM).valueOf();

      // 다음 날짜 계산
      const serviceMilli = this._serviceMilli('next');;
      const progressMilli = this._progressMilli('next');;

      if (serviceMilli <= maxDateMilli) {
        return this._update({
          path: `${KEYWORD_URL}?service_dtm=${utils.convertTime(serviceMilli, 'YMDH')}`,
          serviceDTM: utils.convertTime(serviceMilli, 'YMDH'),
          progressDTM: utils.convertTime(progressMilli, 'YMDHM'),
          limitType: (utils.convertTime(serviceMilli, 'YMD') === utils.convertTime(maxDateMilli, 'YMD')) ? 'maxLimit' : 'noLimit'
        }, callBack);
      } else {
        return callBack({
          path: KEYWORD_URL,
          serviceDTM: null,
          progressDTM: null,
          limitType: 'maxLimit'
        });
      }
    }

    updateToday(callBack) {
      return this._update({
        path: KEYWORD_URL,
        serviceDTM: null,
        progressDTM: null,
        limitType: 'maxLimit'
      }, callBack);
    }
  }

  return {
    init: (target, data) => {
      const inst = new timeArchive(target, data)

      inst.setDisplayTime();

      return inst;
    }
  }
})();

/* 리스트 */
const Article = (() => {
  class Article {
    constructor(target) {
      this.todayListWrap = $(target);
      
      defineProps(['isRender', 'keyword', 'todayList', 'todayListTitle', 'todayListItem', 'todayListItemCounts', 'todayListItemWrap', 'todayListItemMore', 'todayListEffect', 'btnTodayClose'], this);
    }

    listShow(immediate = null) {
      var duration = (immediate === 0) ? 0 : .3;
      /** 
       * * Statistics (PV)
       */
      // var sRef2 = '';

      // try {
      //   draw_mndr('m_ndr.nate.com/news/today/keyword' + (historyDataset.importance) + '/', gUserJS_sAppFrom, '', gUserJS_sAppSkai, gUserJS_sAppNdruk, sRef2);
      // } catch(e) {
      //   draw_mndr('m_ndr.nate.com/news/today/keyword' + (historyDataset.importance) + '/', '', '', '', '', sRef2);
      // }

      this.todayListWrap.addClass((history.state.keyword.index < 5) ? 'highScore' : 'lowScore');

      gsap.to(this.todayListWrap, 0, { display: 'block' });
      gsap.to(this.btnTodayClose, duration, { autoAlpha: 1, delay: duration });
      gsap.fromTo(this.todayListTitle, duration, { autoAlpha: 0, x: -100}, { autoAlpha: 1, x: 0, delay: duration * 1.5 });
      gsap.to(this.todayListItem, duration * 2, { autoAlpha: 1, x: 0, delay: duration * 2 });
    }

    listHide(immediate = null) {
      var duration = (immediate === 0) ? 0 : .3;

      history.replaceState(null, null, null);
      sessionStorage.removeItem('ARTICLE_INDEX');

      this.todayListWrap.removeClass('lowScore highScore');

      gsap.set('body', { clearProps: 'all' });
      gsap.to(this.todayListItem, duration, { autoAlpha: 0, onComplete: () => gsap.set([this.todayListItem, this.todayListItemWrap, this.todayListItemWrap.children()], { clearProps: 'all'}) });
      gsap.to(this.todayListTitle, duration, { autoAlpha: 0 });
      gsap.to(this.btnTodayClose, duration, { autoAlpha: 0 });
      gsap.to(this.todayListWrap, duration, { display: 'none', delay: duration * 2 });
    }

    listRender() {
      const data = history.state;

      this.todayList.append(this.btnTodayClose);
      this.todayList.append(this.todayListTitle.html(data.keyword.service.split('<br />').map((self, i) => i !== 0 && i % 2 === 1 ? self + '<br />' : self + ' ')));

      this.todayListItemCounts.append(data.article.map((self, i, data) => {
        if (i < data.length - 1) return `<span class="count-${i}"></span>`;
        else return `<span class="count-${i}"></span><span class="count-more"></span>`;
      }));

      this.todayListItemWrap.append(data.article.map((self, i) => {
        var item = '';

        var writeDTM = utils.isToday(data.serverDTM, utils.dateFormat(self.write_dtm)) ? moment(utils.dateFormat(self.write_dtm)).startOf('hour').fromNow() : self.write_dtm;
        var emptyImgURL = (!!self.img_url) ? '' : ' empty';

        // item += '<li class="item" role="link" data-link="'+ self.link_url +'" onclick="olapclick(\'TOR0' + (i + 1) + '\')">';
        item += '<li class="item" role="link" data-link="' + self.link_url + '">';
        item += '<div class="face frontFace">';
        item += '<h5 class="subject">' + self.artc_title + '</h5>';
        item += '<div class="info">';
        item += '<div class="state"><span class="provider">'+ self.cp_nm +'</span><span class="time">'+ writeDTM +'</span></div>';
        item += '<div class="thumb-nail ' + emptyImgURL + '"><img src="' + self.img_url + '" alt=""></div>';
        item += '</div></div>';
        item += `<div class="face backFace"></div>`;
        item += '</li>';

        return item;
      }));

      // this.todayListItemMore = $(`<li class="more" role="link" data-link="${data.refs.link}" onclick="olapclick('TOM00');">
      this.todayListItemMore = $(`<li class="more" role="link" data-link="${data.refs.link}">
        <div class="face frontFace">
          <div class="innerWrap">
            비슷한 기사
          <div>
            <span class="size">${utils.withCommas(data.refs.cnt)}</span><span>개</span>
          </div>
            더보기
          </div>
        </div>
        <div class="face backFace"></div>
      </li>`);



      this.todayListItemWrap.append(this.todayListItemMore);
      this.todayListItem.append(this.todayListItemWrap);
      this.todayListItem.append(this.todayListItemCounts);

      this.todayList.append(this.todayListItem);
      this.todayListWrap.append(this.todayList);
      this.todayListWrap.append(this.todayListEffect);

      this.listShow();
    }

    listUpdate() {
      const data = history.state;
      const item = this.todayListItemWrap.children();

      this.todayListTitle.html(data.keyword.service.split('<br />').map((self, i) => i !== 0 && i % 2 === 1 ? self + '<br />' : self + ' '));

      data.article.forEach((self, i) => {
        var writeDTM = utils.isToday(data.serverDTM, utils.dateFormat(self.write_dtm)) ? moment(utils.dateFormat(self.write_dtm)).startOf('hour').fromNow() : self.write_dtm;

        item.eq(i).attr('data-link', self.link_url);
        item.eq(i).find('.subject').text(self.artc_title);
        item.eq(i).find('.provider').text(self.cp_nm);
        item.eq(i).find('.time').text(writeDTM);

        if (!!self.img_url) {
          item.eq(i).find('.thumb-nail').removeClass('empty');
          item.eq(i).find('.thumb-nail img').attr('src', self.img_url);
        } else {
          item.eq(i).find('.thumb-nail').addClass('empty');
          item.eq(i).find('.thumb-nail img').attr('src', '');
        }
      });

      this.todayListItemMore.attr('data-link', data.refs.link);
      this.todayListItemMore.find('.size').text(utils.withCommas(data.refs.cnt));

      this.listShow();
    }

    listRefEvent() {
      var cards = {
        width: 335,
        duration: .3,
        leng: 6,
        x: 0,
        initX: 0,
        initCardX: 0,
        prevIndex: 0,
        activeIndex: 0,
        distance: 0,
        minDistance: 10,
        offsets: [],
        gap: 20,
        margin: 10
      }

      var CD = cards.width / 2; // 카드 이동 거리 px
      var OD = .10; // 최소 이동 %
      var minScale = .92;

      var Drag = Draggable.create(this.todayListItemWrap, {
        type: 'x',
        throwProps: false,
        edgeResistance: .85,
        onDrag: onDragAndThrowUpdateEvent.bind(this),
        onDragAndThrowUpdate: onDragAndThrowUpdateEvent.bind(this),
        onDragStart: onDragStartEvent.bind(this),
        onDragEnd: onDragEndEvent.bind(this),
      });
      
      (function onInit() {
        for (var i = 0; i < cards.leng; i++) {
          cards.offsets.push(-((cards.width + cards.margin) * i));
        }

        if (sessionStorage.getItem('ARTICLE_INDEX') !== null) {
          cards.prevIndex = cards.activeIndex = parseInt(sessionStorage.getItem('ARTICLE_INDEX'), 10);

          this.todayListItemWrap.children('.item').each(function (j, self) {
            if (j < cards.activeIndex && j < 4) gsap.set(self, {
              autoAlpha: 0,
              x: cards.width / 2,
              scale: .92
            });
          });

          gsap.to(this.todayListItemWrap, cards.duration, { x: cards.offsets[cards.activeIndex] });
        }

        this.todayListItemCounts.children().removeClass('active');
        this.todayListItemCounts.children().eq(cards.activeIndex).addClass('active');

      }.bind(this)());

      function onDragStartEvent() {
        cards.initX = Drag[0].x;
        cards.initCardX = Drag[0].x;
      }

      function onDragAndThrowUpdateEvent() {
        cards.distance = Drag[0].x - cards.initX;
        cards.x = cards.initCardX + cards.distance;

        var direction = cards.distance > -1 ? 'right' : 'left'; // 터치 끝 점
        var percent = Math.abs(cards.distance / cards.width);

        switch (direction) {
          case 'left':
            var LC = percent <= OD;
            var LP = percent - OD;

            if (cards.activeIndex < cards.leng - 2) {
              gsap.set(this.todayListItemWrap.children('.item').eq(cards.activeIndex), {
                autoAlpha: LC ? 1 : 1 - (LP + OD * 1.1),
                x: LC ? 0 : (0 + (LP * 200) <= CD) ? (0 + LP * 200) : CD,
                scale: LC ? 1 : (1 - LP) >= minScale ? (1 - LP) : minScale
              });
            }
            break;
          case 'right':
            var RC = percent >= (OD / 2);
            var RP = percent - OD;

            if (cards.activeIndex >= 0 && cards.activeIndex !== 5 && cards.activeIndex - 1 !== -1) {
              gsap.set(this.todayListItemWrap.children('.item').eq(cards.activeIndex - 1), {
                autoAlpha: RC ? 0 + (RP + OD * 1.1) : 0,
                x: RC ? (CD - (RP * 200) >= 0 ? (CD - (RP * 200)) : 0) : CD,
                scale: RC ? ((0 + RP + OD * 2) <= minScale ? minScale : (0 + RP + OD * 2) <= 1 ? (0 + RP + OD * 2) : 1) : minScale
              });
            }
            break;
        }
      }

      function onDragEndEvent(e) {
        var direction = cards.distance > -1 ? 'right' : 'left'; // 터치 끝 점

        switch (direction) {
          case 'left':
            if (Math.abs(cards.distance) > (cards.minDistance * (cards.width / 100))) {
              cards.prevIndex = cards.activeIndex;
              cards.activeIndex = Math.min(cards.activeIndex + 1, cards.leng - 1);
              sessionStorage.setItem('ARTICLE_INDEX', cards.activeIndex);

              if (cards.activeIndex < cards.leng - 1 && cards.activeIndex !== cards.leng - 1) {
                gsap.to(this.todayListItemWrap.children('.item').eq(cards.activeIndex - 1), cards.duration, {
                  autoAlpha: 0,
                  x: CD,
                  scale: minScale
                });
              }
            }
            break;
          case 'right':
            if (Math.abs(cards.distance) > (cards.minDistance * (cards.width / 100))) {
              cards.prevIndex = cards.activeIndex;
              cards.activeIndex = Math.max(0, cards.activeIndex - 1);
              sessionStorage.setItem('ARTICLE_INDEX', cards.activeIndex);

              if (cards.activeIndex >= 0 && cards.activeIndex !== 5) {
                gsap.to(this.todayListItemWrap.children('.item').eq(cards.activeIndex), cards.duration, {
                  autoAlpha: 1,
                  x: 0,
                  scale: 1
                });
              }
            }
            break;
        }

        this.todayListItemCounts.children().removeClass('active');
        this.todayListItemCounts.children().eq(cards.activeIndex).addClass('active');

        if (cards.activeIndex >= 0 && cards.activeIndex !== 5 && cards.activeIndex - 1 !== -1) gsap.to(this.todayListItemWrap.children('.item').eq(cards.activeIndex - 1), cards.duration, { autoAlpha: 0 });
        gsap.to(this.todayListItemWrap.children('.item').eq(cards.activeIndex), cards.duration, { autoAlpha: 1, x: 0, scale: 1 });
        gsap.to(this.todayListItemWrap, cards.duration, { x: cards.offsets[cards.activeIndex] });
      }
    }
  }

  return {
    init: (target) => {
      return new Article(target);
    }
  }
})()

const todayNews = async () => {
  let errorTimer;

  // 데이터 구조 초기화 및 설정
  const DATA = myData.init(await myData.dataLoadEvent(KEYWORD_URL));

  const eveOff = (e) => {
    e.preventDefault()
    document.body.style.overflow = 'hidden';
  };

  const move = () => {
    if (progressUI.dragFlag === true) {
      return false;
    } else {
      // 시간 데이터 > UI로 업데이트
      progressUI.data.percent = Math.abs(progressUI.drag.x / progressUI.options.bar.width);
      progressUI.data.TL.progress(Math.abs(progressUI.drag.x / progressUI.options.bar.width));
      progressUI.calcSetData(progressUI.data);
      progressUI.drawTimeUpdate();
    }
  }

  // 효과 - 리스트 켜기
  const onpage = (data, i) => {
    if (!circle.clickFlag) return;
    circle.clickFlag = false;

    // 선택 버블 커짐 효과
    const c = circle.targetNode._circle.nodes();
    const t = circle.targetNode._text.nodes();
    const f = (e, idx) => {
      e.setAttribute('style', i === idx ? 'transform: scale(1)' : 'transform: scale(0)');
    };
    c.forEach(f);
    t.forEach(f);
    d3.select(c[i].parentNode).raise().attr('class', `bubbleGroup-${i} active`);
    document.querySelector(circle._name).setAttribute('class', 'active');

    console.log(circle);

    setTimeout(_ => {
      c[i].setAttribute('style', `transform: scale(${parseInt(window.innerHeight / c[i].r.baseVal.value)});fill: ${circle.options.coverColor[i >= 5 ? (circle.options.coverColor.length-1) : i]}`);
      t[i].setAttribute('style', 'opacity: 0');
    }, 200)

    // z-index
    setTimeout(_ => {
      document.querySelector(circle._name).setAttribute('style', 'z-index: 50');
      // 버블 회전 멈춤
      circle.targetNode.simulation.stop();
    }, 400)
  }

  // 효과 - 리스트 끄기
  const offpage = (data, i) => {
    if (circle.clickFlag) return;
    circle.clickFlag = true;

    const c = circle.targetNode._circle.nodes();
    const t = circle.targetNode._text.nodes();
    const f = (e, idx) => e.setAttribute('style', i !== idx ? 'transform: scale(1)' : 'transform: scale(0)');;

    c.forEach(f);
    t.forEach(f);

    document.querySelector(circle._name).removeAttribute('class');
    document.querySelector(`.bubbleGroup-${i}`).classList.remove('active');

    setTimeout(_ => {
      c[i].removeAttribute('style');
      t[i].removeAttribute('style');
    }, 200)

    // z-index
    setTimeout(_ => {
      document.querySelector(circle._name).removeAttribute('style');
      
      // 버블 회전 재시작
      circle.targetNode.simulation.restart();
    }, 400)
  }
  
  progressUI = Progress.init('#newsEdgeProgress');
  circle = Circle.init('#newsEdgeBubbles', {
    gap: 4,
    height: window.innerWidth,
    duration: 100,
    velocityDecay: .35,
    forceStrength: .003,
    percent: [48, 32, 28.8, 26.6, 24, 20, 20, 20, 20, 20].map((self, i) => i < 5 ? (self / 1.1) : self),
    sizes: [6.66, 5.06, 4.26, 4, 3.73, 3.5, 3.2, 3.2, 3.2, 3.2].map((self, i) => i < 5 ? (self / 1.1) : self),
    color: ['rgba(21, 45, 255, .7)', 'rgba(47, 134, 255, .7)', 'rgba(20, 187, 190, .7)', 'rgba(86, 55, 255, .7)', 'rgba(141, 201, 29, .7)', 'rgba(212, 216, 220, .7)', 'rgba(212, 216, 220, .7)', 'rgba(212, 216, 220, .7)', 'rgba(212, 216, 220, .7)', 'rgba(212, 216, 220, .7)'],
    coverColor: ['#5b6cff', '#6daaff', '#5acfd1', '#8873ff', '#afd960', '#e1e4e6'],
    ease: [d3.easeBackOut.overshoot(1.5), d3.easeQuadOut]
  });

  // [버블] circle 데이터 설정
  circle.calcSetData(DATA.keyword);

  circle.paint();
  
  // 리스트 화면 보기
  circle.click = (data, idx, arr) => {
    myData.dataLoadEvent(`${ARTICLE_URL}?keyword_dtm=${data.keyword_dtm}&keyword_sq=${data.keyword_sq}`).then(res => {
      onpage.apply(this, [data, idx, arr]);

      // 리스트 출력
      DATA.resetArticle();
      DATA.updateArticle(res);

      const Datum = {
        serverDTM: DATA.serverDTM,
        article: DATA.article,
        keyword: {
          service: data.keyword_service,
          dtm: data.keyword_dtm,
          sq: data.keyword_sq,
          index: data.index
        },
        refs: {
          link: res.search_cnt, 
          cnt: res.search_cnt
        }
      }

      /**
       * * History state
       */
      if (history.state !== null) history.replaceState(Datum, 'Datum');
      else history.pushState(Datum, 'Datum');

      if (!article.isRender) {
        article.isRender = true;
        article.listRender();
      } else {
        article.listUpdate();
      }

      article.listRefEvent();
    });
  }

  setTimeout(circle.move.bind(circle), 300);

  // [타임라인] progress 데이터 설정
  progressUI.calcSetData(DATA.timestamp);
  progressUI.paint();
  progressUI.contollerEvent({
    onDragStart: _ => {
      circle.clickFlag = false;
      document.body.style.overflow = 'hidden';
      document.querySelector('#newsEdgeProgress').addEventListener('touchmove', eveOff)
      if (progressUI.dragFlag === false) {
        circle.stop();
        //circle.chargeEffect();
      }
    },
    //onThrowUpdate: move,
    onDrag: move,
    onDragEnd: () => {
      if (progressUI.dragFlag === false) {
        document.body.removeAttribute('style');
        document.querySelector('#newsEdgeProgress').removeEventListener('touchmove', eveOff)
        // 데이터 업데이트
        myData.dataLoadEvent(`${KEYWORD_URL}?service_dtm=${progressUI.data.YMDH}`).then(res => {
          if (res) {
            // 프로시져 절차로 순서에 영향있음
            DATA.serviceDTM = utils.dateFormat(DATA.timestamp.YMDH);
            DATA.progressDTM = utils.dateFormat(DATA.timestamp.YMDHM);
            DATA.resetKeyword();
            DATA.updateData(res);
            circle.calcSetData(DATA.keyword);
            circle.endEffect();

            if (progressUI.timer) clearTimeout(progressUI.timer);
            progressUI.timer = setTimeout(_ => {
              progressUI.dragFlag = false;
              circle.clickFlag = true;
            }, 600)
          } else {
            const domError = document.querySelector('.notice-error')
            circle.endEffect();
            progressUI.dragFlag = false;
            circle.clickFlag = true;
            domError.className = 'notice-error active';

            if (errorTimer) clearTimeout(errorTimer)
            errorTimer = setTimeout(_ => {
              domError.className = 'notice-error';
            }, 3000);

          }
        })
      }
      progressUI.dragFlag = true;
    }
  });


  // 리스트
  article = Article.init('#todayListWrap');
  article.todayList = $('<div class="todayList" />');
  article.todayListTitle = $('<h3 class="todayListTitle" />');
  article.todayListItem = $('<div class="todayListItem" />');
  article.todayListItemCounts = $('<div class="todayListItemCounts">');
  article.todayListItemWrap = $('<ul class="listItemWrap" />');
  article.btnTodayClose = $('<button type="button" class="btnTodayClose">닫기</button>');
  article.todayListEffect = $('<div class="todayListEffect"></div>');

  article.todayListWrap.on('click', '.listItemWrap li', (e) => {
    e.preventDefault();
    
    var $self = $(e.currentTarget);

    $self.addClass('active');

    gsap.delayedCall(.15, () => {
      gsap.set(article.todayListEffect, {
        x: $self.offset().left,
        y: $self.offset().top,
        width: $self.width(),
        height: $self.height(),
        borderRadius: (!$self.hasClass('more')) ? $self.width() * 0.05970149253731343 : '100%',
        autoAlpha : 1,
        ease: 'power4.inOut',
        onComplete: () => {
          gsap.delayedCall(.15, () => {
            gsap.to(article.todayListEffect, .3, {                      
              scale: (!$self.hasClass('more')) ? 25 : 50,
              ease: 'power4.inOut',
              onComplete: () => {
                $self.removeClass('active');
                return location.href = $self.attr('data-link');
              }
            });
          });
        }                
      });
    });
  });

  article.btnTodayClose.on('click', () => {
    if (gsap.isTweening(article.todayListItem)) return;
    
    offpage.apply(null, [null, history.state.keyword.index, null]);

    article.listHide();
  });




  // 날짜 변경
  const newTimeArchive = timeArchive.init('.timeTravel', DATA);

  newTimeArchive.prev = () => newTimeArchive.updatePrev(commonF);
  newTimeArchive.next = () => newTimeArchive.updateNext(commonF);
  newTimeArchive.today = () => newTimeArchive.updateToday(commonF);

  const timeTravelTriggers = [document.querySelector('.btnTravel.prev'), document.querySelector('.btnTravel.next'), document.querySelector('.btnTravel.today')];

  timeTravelTriggers.forEach((self) => {
    self.addEventListener('click', newTimeArchive[self.getAttribute('data-travel')]);
  });

  const commonF = (data, timeline) => {
    circle.calcSetData(data.keyword);
    circle.endEffect();

    progressUI.calcSetData(data.timestamp);
    progressUI.drawStyle();

    newTimeArchive.setDisplayTime();
    newTimeArchive.setDisabledTirgger(timeTravelTriggers, timeline.limitType);
  }

  newTimeArchive.setDisplayTime();
  newTimeArchive.setDisabledTirgger(timeTravelTriggers, 'maxLimit');

  document.querySelector('.timeLog').innerText = utils.convertTime(DATA.updateDTM, 'STANDARD');


  /* url히스토리  */
  console.log(history.state);
  if (history.state !== null) historyPop();

  window.addEventListener('popstate', function(e) {
    console.log(e);
    historyPop();
  });

  function historyPop() {
    onpage.apply(null, [null, history.state.keyword.index, null]);

    article.isRender = true;
    article.listRender();
    article.listRefEvent();
  }

}

document.addEventListener('DOMContentLoaded', todayNews);

window.addEventListener('resize', () => {
  if (circle && circle.options.width !== window.innerWidth) {
    if (resizeCircleTimer) clearTimeout(resizeCircleTimer);
    resizeCircleTimer = setTimeout(_ => {
      circle.resizeCanvas();
      circle.endEffect();
    }, 300)
  }
});