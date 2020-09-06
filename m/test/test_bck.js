/* 테스트 전역변수 */
const TEST_KEYWORD_URL = '//test-m.news.nate.com/today/keywordList';
const TEST_ARTICLE_URL = '//test-m.news.nate.com/today/articleList';
var setProgressWidth = (254 / 375);
var setProgressHeight = (48 / 375);
let resizeCircleTimer,
    circle,
    progress,
    xhrData;

/* 데이터 통신 */
const myData = (() => {
  const keyword = Symbol('KEYWORD'),
    article = Symbol('ARTICLE'),
    serviceDTM = Symbol('SERVICE_DTM'),
    serverDTM = Symbol('SERVER_DTM'),
    progressDTM = Symbol('PROGRESS_DTM');

  class myData {
    constructor() {
      this[keyword] = [];
      this[article] = [];
      this[serviceDTM];
      this[serverDTM];
      this[progressDTM];
      this.timestamp = {
        server: null,
        now: null,
        start: null,
        end: null,
        limit: null,
        percent: null
      };
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

    get serviceDTM() {
      return this[serviceDTM]
    }

    set serviceDTM(t) {
      this[serviceDTM] = t;
    }

    get serverDTM() {
      return this[serverDTM];
    }

    set serverDTM(t) {
      this[serverDTM] = t;
    }

    get progressDTM() {
      return this[progressDTM];
    }

    set progressDTM(t) {
      this[progressDTM] = t;
    }
    // 밀리세컨드 = 23시59분
    get oneDateMilli() {
      return (1000 * 60 * 60 * 24) - (1000 * 60);
    }

    resetKeyword() {
      this[keyword] = [];
    }

    resetArticle() {
      this[article] = [];
    }
    // 시간 string 을 timestamp로 변경
    convertToTimeStamp() {
      this.timestamp.server = moment(this[serverDTM]).valueOf();
      this.timestamp.now = moment(this[progressDTM]).valueOf();
      this.timestamp.start = moment(this[progressDTM]).startOf('day').valueOf();
      this.timestamp.end = moment(this[progressDTM]).endOf('day').valueOf();
      this.timestamp.percent = (this.timestamp.now - this.timestamp.start) / this.oneDateMilli;

      (utils.convertTime(this.serverDTM, 'YMD') === utils.convertTime(xhrData.progressDTM, 'YMD')) ? this.timestamp.limit = ((this.timestamp.server - this.timestamp.start) / this.oneDateMilli) : this.timestamp.limit = 1;
    }
    updateData(res) {
      // 날짜 형식 변경
      xhrData.serverDTM = utils.dateFormat(res.server_dtm);
      xhrData.serviceDTM = utils.dateFormat(res.service_dtm);
      xhrData.progressDTM = utils.dateFormat(res.server_dtm);
      // 키워드 설정
      for (let key in res.data) xhrData.keyword = res.data[key];
      // string 시간 변환 > timestamp
      xhrData.convertToTimeStamp();
    }
    dataLoadEvent(path, callback) {
      var type;

      if (path.indexOf('keyword_sq') !== -1) {
        type = 'articleList';
      } else {
        type = path.split('=')[1] || '2020-07-10 12:00:00';
      }

      $.ajax({
          type: 'GET',
          url: '../src/data/fake.json',
          dataType: 'json',
          processData: false
        })
        .then(function (data) {
          return data[type];
        })
        .done(function (data) {
          callback(data);
        })
        .fail(function () {
          document.body.removeChild(document.querySelector('#todayContainerWrap'))
          console.log('fail');
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

/* SVG코어 추상화 */
const WhiteBoard = (() => {
  class WhiteBoard {
    constructor(target, options) {
      if (!d3 || !target) return;

      this.target = d3.select(target);
      this.name = target;
      this.data = null;
      this.options = Object.assign({
        width: window.innerWidth,
        height: window.innerHeight
      }, options || {});
    }
    set setData(data) {
      // if (!data || typeof data !== 'object') return;
      this.data = data;
    }
    get orientation() {
      return window.matchMedia('(orientation: portrait)').matches;
    }
    setCanvasSize(w = this.options.width, h = this.options.height) {
      if (typeof w !== 'number' || typeof h !== 'number') return;
      this.target.attr('width', w).attr('height', h).attr('viewBox', [0, 0, w, h]);
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
      this.item = null;
      this.box = null;
      this.simulation = null;
      this.circle = null
      this.text = null;
    }
    add(key, v) {
      this[key] = v;
    }
  }
  class Circle extends WhiteBoard {
    constructor(props, options) {
      super(props);
      this.options = Object.assign(this.options, options || {});
      this.arr = [];
      this.timer = null;
      // 용지 설정
      this.setCanvasSize();
    }
    get targetNode() {
      return this.arr[this.arr.length-1]
    }
    _paint() {
      this.arr.push(new Node())

      this.targetNode.add('box', this.target.append('g').attr('class', 'itemList'));
      this.targetNode.box.selectAll('.itemList').data(this.data)
        .join(
          // 노드 생성
          (rv) => {
            this.targetNode.add('item', rv.append('g').attr('class', (d, i) => `bubbleGroup-${i + 1}`).attr('data-importance', (d, i) => i).attr('data-sq', (d) => d.keyword_sq).attr('data-keyword', (d) => d.keyword_name))
            this.targetNode.item.select('.bubbleWrap').attr('width', d => parseInt(d.radius * 2)).attr('height', d => parseInt(d.radius * 2)).attr('viewBox', d => [0, 0, parseInt(d.radius * 2), parseInt(d.radius * 2)])
            this.targetNode.add('circle', this.targetNode.item.append('circle').attr('class', 'bubbleCircle').attr('style', 'transform: scale(0)'))
            this.targetNode.add('text', this.targetNode.item.append('text').attr('class', 'bubbleText').attr('style', 'opacity: 0'));
            this.targetNode.text.html(d => (d.keyword_name.split(' ').map((n, s, size) => {
              let v = 0;
              if (size.length > 1) {
                v = (s === 0) ? '-0.5em' : '1.2em';
              }
              return `<tspan x="0" dy="${v}" dominant-baseline="middle" text-anchor="middle">${n}</tspan>`
            })).join(''));
            return this.targetNode.item
          },
          (update) => {
            this.showElement();
            return update;
          },
          _ => {
            // 교차 될때 - 이전노드
            if (this.arr.length > 1) {
              if (this.timer) clearTimeout(this.timer);
              this.timer = setTimeout(() => {
                while(this.arr.length > 1) {
                  this.arr.shift().simulation.stop();
                }

                this.target.selectAll('.itemList.old').remove();
              }, 1500)
            }
          }
        )
        .attr('transform', d => `translate(${parseInt(d.x)},${parseInt(d.y)})`)
        .on('click', function () {});
    }
    _move(data) {
      this.initMotion();
      this.targetNode.simulation.restart().on('tick', _ => {
        // 교차 될때 - 이전노드
        if(this.arr.length > 1) {
          this.arr[this.arr.length-2].item.transition().duration(this.options.duration).attr('transform', d => `translate(${d.x - 1}, ${d.y - 1})`)
        }
        this.targetNode.item.transition().duration(this.options.duration).attr('transform', d => `translate(${d.x - 1}, ${d.y - 1})`)
      }).nodes(data || this.data)
      this.targetNode.simulation.on('end', _ => {

        if (this.timer) clearTimeout(this.timer);
        this.timer = setTimeout(() => {
          this.targetNode.simulation.stop();
          this.stopMotion()
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
      this.options.width = window.innerWidth;
      this.options.height = window.innerWidth;
      this.setCanvasSize();
    }
    // 요소 사라질 때
    hideElement() {
      this.targetNode.circle.transition()
          .delay((d, i) => i * 100)
          .attr('style', 'transform: scale(0)')
      this.targetNode.text.transition()
          .delay((d, i) => i * 100)
          .attr('style', 'opacity:0')
    }
    // 요소 나타날 때
    showElement() {
      this.targetNode.circle.transition()
          .delay((d, i) => i * 100)
          .duration(this.options.duration)
          .attr('r', d => parseInt(d.radius)).attr('cx', 0).attr('cy', 0).attr('fill', (d, i) => this.options.color[i])
          .attr('style', 'transform: scale(1)')

      this.targetNode.text.transition()
          .delay((d, i) => i * 100)
          .duration(this.options.duration)
          .attr('style', 'opacity:1')
    }
    // 초기 움직임
    initMotion() {
      this.targetNode.simulation = d3.forceSimulation()
          .velocityDecay(this.options.velocityDecay)
          .force('x', d3.forceX(this.options.width / 2))
          .force('y', d3.forceY(this.options.height / 2))
          .force('charge', d3.forceManyBody().strength(this.options.forceStrength))
          .force('collide', d3.forceCollide().radius(d => d.radius + this.options.gap))

    }
    // 드래그 스타트 > 모으기
    charge() {
      this.targetNode.simulation.stop();
      this.targetNode.simulation
        .alphaTarget(0.01)
        .force('x', d3.forceX(this.options.width / 2).strength(2))
        .force('y', d3.forceY(this.options.height / 2).strength(2))
        .force('collide', d3.forceCollide().radius(d => d.radius - 20))
        .restart().tick()

    }
    // 정지 효과(회전)
    stopMotion() {
      this.targetNode.simulation.stop();
      this.targetNode.simulation.alphaTarget(1)
        .force('charge', d3.forceManyBody())
        .force('collide', d3.forceCollide().radius(d => d.radius + 10))
        .restart().tick();
    }
    // 데이터 갱신 시 이펙트(날리기 후 신규그리기)
    endMotion() {
      this.hideElement()

      this.targetNode.simulation.stop();
      this.targetNode.simulation
        .alphaTarget(0)
        .force('x', d3.forceX(this.options.width / 2))
        .force('y', d3.forceY(this.options.height / 2))
        .force('collide', d3.forceCollide().radius(d => d.radius + 20))
        .alphaDecay(0.02)
        .restart().tick(100);
      // this.update();  기존 이펙트

      this.targetNode.box.attr('class', 'itemList old')
      if (this.timer) clearTimeout(this.timer)
      this.timer = setTimeout(this.update.bind(this), 500)
      //setTimeout(this.update.bind(this), 500)
      //this.targetNode.simulation.on('end', this.update.bind(this))
    }
    // 기존버블은 사라지고 새로운 버블 갱신
    update() {
      this.targetNode.simulation.stop();
      this.calcSetData(xhrData.keyword);
      this.rePaint();
      if (progress.dragFlag) {
        progress.dragFlag = false;
      }
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
      const radiusScale = d3.scaleLinear().domain([0, 100]).range([0, this.options.width]);

      return this.options.percent.map((percent, i) => {
        var r = parseInt(radiusScale(this.options.percent[i] / 2));

        return {
          x: parseInt(this.options.width * positions[i].x) + r,
          y: parseInt(this.options.height * positions[i].y) + r,
        }
      });
    }
    calcSetData() {
      const positions = this.calcBubblesPositions();
      const radiusScale = d3.scaleLinear().domain([0, 100]).range([0, this.options.width]);

      this.setData = xhrData.keyword.map((d, i) => {
        return utils._objectSpread(utils._objectSpread({}, d), {}, {
          radius: parseInt(radiusScale(this.options.percent[i] / 2)),
          x: parseInt(positions[i].x),
          y: parseInt(positions[i].y)
        });
      })
    }
  }
  return Circle
})();

/* 프로그래스바 그리기 */
const Progress = (() => {
  const dragFlag = Symbol();
  class Progress extends WhiteBoard {
    constructor(props, options) {
      super(props);
      this.node = {};
      this[dragFlag] = false;
      this.options = Object.assign(this.options, options || {
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
      this.progress = {
        TL: null,
        drag: null,
        limit: null,
        percent: null
      };

      this.setCanvasSize();
    }
    // 컨트롤러 앞/뒤 패스
    get path() {
      return {
        front: 'M0 ' + (this.options.bar.height / 2) + ' l ' + this.options.bar.width + ' ' + .01,
        back: (() => {
          var time = this.options.bar.width / (this.options.height * 0.08333333333333333);
          var pathResult = '';

          for (var i = 0; i < time; i++) {
            pathResult += 'M ' + (this.options.bar.height * 0.08333333333333333) * i + ' ' + (this.options.bar.height * 0.4166666666666667) + ' H ' + (this.options.bar.height * 0.08333333333333333) * i + ' V ' + ((this.options.bar.height * 0.4166666666666667) + (this.options.bar.height * 0.16666666666666666));
          }
          return pathResult;
        })()
      }
    }
    get dragFlag() {
      return this[dragFlag]
    }
    set dragFlag(v) {
      this[dragFlag] = v
    }
    // 창크기에 반응하여 가로,세로 비율 변경
    calcPresume(v) {
      return Math.min(window.innerWidth, 375) * v;
    }
    // 패스/시간 업데이트
    calcSetData() {
      this.setData = [this.options].map((d, i) => {
        return utils._objectSpread(utils._objectSpread({}, d, xhrData.timestamp), {}, {
          HM: utils.convertTime((xhrData.timestamp.percent * xhrData.oneDateMilli) + xhrData.timestamp.start, 'HM'),
          YMDH: utils.convertTime((xhrData.timestamp.percent * xhrData.oneDateMilli) + xhrData.timestamp.start, 'YMDH'),
          YMDHM: utils.convertTime((xhrData.timestamp.percent * xhrData.oneDateMilli) + xhrData.timestamp.start, 'YMDHM'),
          path: this.path
        });
      })[0];
    }
    _paint() {
      this.target.selectAll('.progress').data([this.data])
        .join(
          (enter) => {
            this.node.group = enter.append('g').attr('class', 'progress');
            // 바 (백그라운드 필터)
            this.node.linearDefs = this.node.group.append('defs')
            this.node.linear = this.node.linearDefs.append('linearGradient').attr('id', `${progress.name.slice(1)}-pathLinear`);
            this.node.linear.append('stop').attr('offset', '0%').attr('stop-color', '#639eff');
            this.node.linear.append('stop').attr('offset', '100%').attr('stop-color', 'rgba(91, 108, 255, .98)');
            // 바 (바코드)
            this.node.pathBack = this.node.group.append('path').attr('class', 'pathBack');
            // 바 (직선)
            this.node.pathFront = this.node.group.append('path').attr('class', 'pathFront');
            // 컨트롤러
            this.node.timeGroup = this.node.group.append('g').attr('class', 'timeGroup');
            // 컨트롤로 영역 넓히는 엘리먼트
            this.node.timeGroup.append('rect').attr('class','empty').attr('x', -20).attr('y', -10).attr('height', 40).attr('width',40).attr('fill','transparent')
            // 컨트롤러 (핀)
            this.node.knob = this.node.timeGroup.append('circle').attr('class', 'timeKnob');
            // 컨트롤러 (시간 툴팁)
            this.node.timeTooltip = this.node.timeGroup.append('svg').attr('class', 'timeTooltip').attr('xmlns', 'http://www.w3.org/2000/svg').attr('xmlns:xlink', 'http://www.w3.org/1999/xlink')
            // 컨트롤러 (쉐도우 효과)
            this.node.filterDefs = this.node.timeTooltip.append('defs');
            // 컨트롤러 (쉐도우 효과 배경)
            this.node.filter1 = this.node.filterDefs.append('filter').attr('id', `${progress.name.slice(1)}-filter1Back`).attr('filterUnits', 'objectBoundingBox').attr('width', '128.9%').attr('height', '165%').attr('x', '-14.4%').attr('y', '-27.5%');
            this.node.filter1.append('feOffset').attr('result', 'shadowOffsetOuter1').attr('in', 'SourceAlpha').attr('dy', 4);
            this.node.filter1.append('feGaussianBlur').attr('result', 'shadowBlurOuter1').attr('in', 'shadowOffsetOuter1').attr('stdDeviation', 3)
            this.node.filter1.append('feColorMatrix').attr('in', 'shadowBlurOuter1').attr('values', '0 0 0 0 0.496009164 0 0 0 0 0.525687047 0 0 0 0 0.766077899 0 0 0 0.232271635 0');
            this.node.filterRect = this.node.filter1.append('rect').attr('id', `${progress.name.slice(1)}-filter1Rect`);
            // 컨트롤러 (쉐도우 효과 하단 삼각형)
            this.node.filter2 = this.node.filterDefs.append('filter').attr('id', `${progress.name.slice(1)}-filter2Back`).attr('filterUnits', 'objectBoundingBox').attr('width', '320%').attr('height', '320%').attr('x', '-110%').attr('y', '-70%');
            this.node.filter2.append('feOffset').attr('result', 'shadowOffsetOuter1').attr('in', 'SourceAlpha').attr('dy', 4)
            this.node.filter2.append('feGaussianBlur').attr('result', 'shadowBlurOuter1').attr('in', 'shadowOffsetOuter1').attr('stdDeviation', 3)
            this.node.filter2.append('feColorMatrix').attr('in', 'shadowBlurOuter1').attr('values' , '0 0 0 0 0.496009164 0 0 0 0 0.525687047 0 0 0 0 0.766077899 0 0 0 0.232271635 0');
            this.node.filterPath = this.node.filter2.append('path').attr('id', `${progress.name.slice(1)}-filter2Path`);
            // 컨트롤러 툴팁 그룹
            this.node.timeTooltipGroup = this.node.timeTooltip.append('g');
            this.node.timeTooltipGroup.append('use').attr('fill' ,'#000').attr('filter', `url(#${progress.name.slice(1)}-filter1Back)`).attr('xlink:xlink:href', `#${progress.name.slice(1)}-filter1Rect`);
            this.node.timeTooltipGroup .append('use').attr('fill' ,'#fff').attr('xlink:xlink:href', `#${progress.name.slice(1)}-filter1Rect`);
            this.node.timeTooltipGroup .append('use').attr('fill' ,'#000').attr('filter', `url(#${progress.name.slice(1)}-filter2Back)`).attr('xlink:xlink:href', `#${progress.name.slice(1)}-filter2Path`);
            this.node.timeTooltipGroup .append('use').attr('fill' ,'#fff').attr('xlink:xlink:href', `#${progress.name.slice(1)}-filter2Path`);
            // 컨트롤러 툴팁 시간
            this.node.timeText = this.node.timeTooltipGroup.append('text').attr('class', 'timeText').attr('alignment-baseline', 'middle').attr('text-anchor', 'middle').style('font-weight' , 'bold');

            return enter;
          },
          (update) => {
            this.drawStyle();
            return update;
          });
    }
    drawStyle() {
      this.target
          .attr('width', this.options.width)
          .attr('height', this.options.height)
          .attr('viewBox', [0, 0, this.options.width, this.options.height]);

      this.node.pathBack
        .attr('d', d=> d.path.back)
        .attr('stroke-width', 1)
        .attr('stroke', '#5b6cff')
        .attr('stroke-linecap', 'round')
        .attr('fill', 'none');

      this.node.pathFront
        .attr('d', d  => d.path.front)
        .attr('stroke-width', d => d.height * 0.2916666666666667)
        .attr('stroke', `url(#${this.name.slice(1)}-pathLinear)`)
        .attr('stroke-linecap', 'round')
        .attr('fill', 'blue');

      this.node.knob
        .attr('r', d => d.knob.r)
        .attr('stroke', '#5b6cff')
        .attr('stroke-width', 1)
        .attr('fill', '#fff');

      this.node.timeTooltip
        .attr('width', d => d.width * 0.36)
        .attr('height', d => d.height * 0.8333333333333334)
        .attr('viebox', d => [0, 0, d.width * 0.36, d.height * 0.8333333333333334]);
      
      this.node.filterRect
        .attr('width', d => d.width * 0.36)
        .attr('height', d => d.height * 0.8333333333333334)
        .attr('x', d => (d.percent * 100 > 84) ? -(((d.width * .36) / 2) - (84 - d.percent * 100)) : -((d.width * .36) / 2))
        .attr('y', d => -(d.height + d.knob.r + 4))
        .attr('rx', d => d.knob.r * 2);
      
      this.node.filterPath
        .attr('transform', d => 'translate('+ 0 +' '+ -(d.knob.r * 2 + 2) +')')
        .attr('d', d => 'M '+ (d.knob.r / 2) +' 0 l '+ -(d.knob.r / 2) + ' '+ d.knob.r + ' '+ -(d.knob.r / 2) + ' '+ -(d.knob.r) + ' h '+ d.knob.r +'z');

      this.node.timeText
        .attr('x', d => (84 < d.percent * 100) ? (84 - d.percent * 100) : 0)
        .attr('y', d => -((d.knob.r * 3) + 2))
        .attr('font-size', d => d.width * 0.088 +'px')
        .style('font-style', 'bold');
      this.drawTimeUpdate();
    }
    drawTimeUpdate() {
      this.node.timeText.html(_ => this.data.HM.split(' ').map((time, i, size) => {
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
    contollerEvent() {
      const onDragAndThrowUpdate = ()  => {
        // 시간 데이터 > UI로 업데이트
        xhrData.timestamp.percent = this.progress.percent = Math.abs(this.progress.drag[0].x / this.data.bar.width);
        this.progress.TL.progress(Math.abs(this.progress.drag[0].x / this.data.bar.width));
        this.calcSetData();
        this.drawTimeUpdate();
      },
      onDragStart = () => {
        circle.targetNode.simulation.stop();
        if(this.dragFlag === false) {
          this.dragFlag = true;
          circle.charge();
        }
      },
      onDragEnd = () => {
        xhrData.serviceDTM = utils.dateFormat(this.data.YMDH);
        xhrData.progressDTM = utils.dateFormat(this.data.YMDHM);

        circle.endMotion();

        // 데이터 업데이트
        xhrData.dataLoadEvent(`${TEST_KEYWORD_URL}?service_dtm=${utils.convertTime(xhrData.serviceDTM, 'YMDH')}`, (res) => {
          xhrData.resetKeyword();
          xhrData.updateData(res);
        })
      }



      this.progress.TL = gsap.timeline({ defaults: { overwrite: 'auto', ease: 'none' }, paused: true });
      this.progress.limit = xhrData.timestamp.limit;
      this.progress.percent = this.progress.percent || (xhrData.timestamp.percent !== 0) ? xhrData.timestamp.percent : .00001;

      if (this.progress.drag !== null) this.progress.drag[0].kill();

      this.progress.drag = Draggable.create(`${this.name} .timeGroup`, {
        trigger: `${this.name} .timeGroup`,
        type: 'x',
        bounds: {
          minX: 0,
          maxX: this.data.bar.width * this.progress.limit
        },
        throwProps: true,
        onThrowUpdate: onDragAndThrowUpdate,
        onDrag: onDragAndThrowUpdate,
        onDragStart,
        onDragEnd
      });

      gsap.set(`${this.name} .pathFront`, { clearProps: 'all' });

      this.progress.TL.from(`${this.name} .pathFront`, 1, {
        drawSVG: '0%'
      })
      .to(`${this.name} .timeGroup`, 1, {
        motionPath: {
          path: `${this.name} .pathFront`
        }
      }, 0)
      .progress(this.progress.percent);
    }

    init() {
      this._paint();
      this.contollerEvent();
    }
  }
  return Progress
})();

/* url히스토리  */
const UrlHistory = (() => {
  class UrlHistory {

  }
  return UrlHistory
})();

document.addEventListener('DOMContentLoaded', () => {
  xhrData = new myData();
  circle = new Circle('#test2', {
    gap: 4,
    height: window.innerWidth,
    duration: 100,
    velocityDecay: .35,
    forceStrength: .003,
    percent: [48, 32, 28.8, 26.6, 24, 18.6, 18.6, 18.6, 18.6, 18.6].map((self) => self / 1.1),
    sizes: [7.46, 5.8, 5, 4.8, 4.5, 3.4, 3.4, 3.4, 3.4, 3.4].map((self) => self / 1.1),
    color: ['#5c6efc', '#6fabfc', '#5fd0d0', '#8875fc', '#b0d967', '#e0e3e6', '#e0e3e6', '#e0e3e6', '#e0e3e6', '#e0e3e6'],
    ease: [d3.easeBackOut.overshoot(1.5), d3.easeQuadOut]
  });
  progress = new Progress('#newsEdgeProgress2');

  xhrData.dataLoadEvent(TEST_KEYWORD_URL, (res) => {
    // 데이터 설정
    xhrData.updateData(res)
    // [버블] circle 데이터 설정
    circle.calcSetData();
    circle.paint();
    setTimeout(circle.move.bind(circle), 300);
    // [타임라인] progress 데이터 설정
    progress.calcSetData();
    progress.init();
  });
});

window.addEventListener('resize', () => {
  if (circle.options.width !== window.innerWidth) {
    if (resizeCircleTimer) clearTimeout(resizeCircleTimer);
    resizeCircleTimer = setTimeout(_ => {
      circle.resizeCanvas();
      circle.endMotion();
    }, 300)
  }
});
