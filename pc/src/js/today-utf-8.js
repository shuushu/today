/** 
 * * Polyfill 
 */
if (!Element.prototype.matches) {
  Element.prototype.matches = Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector;
}

if (!Element.prototype.closest) {
  Element.prototype.closest = function(s) {
    var el = this;

    do {
      if (Element.prototype.matches.call(el, s)) return el;
      el = el.parentElement || el.parentNode;
    } while (el !== null && el.nodeType === 1);
    return null;
  };
}


/** 
 * * Moment 글로벌 설정
 */
moment.locale('ko');
moment.updateLocale('ko', {relativeTime : { h: `${decodeURI('1%EC%8B%9C%EA%B0%84')}`} });


/**
 * * Gsap 플러그인 등록 (필수)
 */
gsap.registerPlugin(Draggable, DrawSVGPlugin, MotionPathPlugin, ScrollToPlugin);


/**
 * * newsEdge
 */
var newsEdge = (function() {
  var bubblesID = '#newsEdgeBubbles';
  var progressID = '#newsEdgeProgress';
  var articleID = '.todayListWrap';
  var bubblesController;
  var progressBarController;
  var articlesController;
  var timeTravelController;

  // 최초 화면 방향 체크 (가로모드/세로모드)
  var orientation = window.matchMedia('(orientation: portrait)').matches;

  // xhrData Reference 할당
  var caller;

  /** 
   * * 상태 제어
   */
  const State = (function controlState() {
    return {
      // 버블 클릭 후 버블이 커진 상태 체크
      isPopPop: false,
      // 버블 커진 상태에서 리스트가 DOM에 반영됨 체크
      isRender: false
    }
  })();
  
  /**
   * * 기사 목록 제어
   */
  articlesController = (function controlArticle() {
    // 기사 목록에 사용되는 데이터 할당
    var _data;
    var todayListWrap = $(articleID);
    var todayList;
    var todayListTitle;
    var todayListItem;
    var todayListItemWrap;
    var todayListItemMore;
    var btnScrollTop;
    
    /** 
     * * 메인 버블 => 기사 목록 애니메이션
     */
    function popUp(immediate) {
      var duration = !!immediate ? 0 : .3;
      
      gsap.set([todayListTitle, todayListItem, todayListItemWrap.children()], { clearProps: 'all' });
      gsap.fromTo(todayListTitle, duration * 2, { autoAlpha: 0, y: 30 }, { autoAlpha: 1 ,y: 0 });
      gsap.delayedCall(duration, function() {
        gsap.set(todayListItem, { autoAlpha: 1 });

        todayListItemWrap.children().each(function(i) {
          gsap.fromTo(this, duration * 2, { autoAlpha: 0,  y: 30, }, { autoAlpha: 1, y: 0, delay: .1 * (i + 1) })
        });
      });
    }

    /** 
     * * 기사 목록 => 버블 애니메이션 (미사용)
     */
    function popOut(immediate) {}

    /** 
     * * 리스트 생성
     */
    function listRender(callBack) {
      btnScrollTop = $(`<button type="button" class="btnScrollTop">${decodeURI('%EC%B5%9C%EC%83%81%EB%8B%A8%EC%9C%BC%EB%A1%9C %EC%9D%B4%EB%8F%99')}</button>`);

      todayList = $('<div class="todayList" />');
      todayListTitle = $('<h3 class="todayListTitle" />');
      todayListItem = $('<div class="todayListItem" />');
      todayListItemWrap = $('<ul class="listItemWrap" />');
      
      todayList.append(btnScrollTop);
      todayList.append(todayListTitle.html(_data.keyword_service.split('<br />').map((self, i) => i !== 0 && i % 2 === 1 ? self + '<br />' : self + ' ')));

      _data.article.forEach((self, i) => {
        var insertDTM = utils.isToday(_data.serverDTM, utils.dateFormat(self.insert_dtm)) ? moment(utils.dateFormat(self.insert_dtm)).startOf('min').fromNow() : self.insert_dtm;

        var item = $('<li class="item" role="link" data-link="'+ self.link_url +'" onclick="ndrclick(\'TOR0'+ (i + 1) +'\')" />')
        var subject = $('<h5 class="subject" />').html(self.artc_title);
        var info = $('<div class="info" />');
        var state = $('<div class="state" />');
        var provider = $('<span class="provider" />').text(self.cp_nm);
        var time = $('<span class="time" />').text(insertDTM);
        var thumbNail; 

        if (!!self.img_url) {
          thumbNail = $('<div class="thumb-nail" />').append('<img src="'+ self.img_url +'" alt="">');
        } else {
          thumbNail = $('<div class="thumb-nail empty" />').append('<img src="'+ self.img_url +'" alt="">');
        }

        item.append(subject);
        item.append(info);
        info.append(state);
        state.append(provider);
        state.append(time);
        info.append(thumbNail);

        /** 
         * * Subject Ellipsis (line-clamp: 3)
         */
        utils.ellipsisText(subject[0]);          

        todayListItemWrap.append(item);
      });
      todayListItemMore = $(`<li class="more" role="link" data-link="${_data.refs.link}" onclick="ndrclick('TOM00');"><div class="face frontFace"><div class="innerWrap">${decodeURI('%EB%B9%84%EC%8A%B7%ED%95%9C %EA%B8%B0%EC%82%AC')}<div><span class="size">${utils.withCommas(_data.refs.cnt)}</span><span>${decodeURI('%EA%B0%9C')}</span></div>${decodeURI('%EB%8D%94 %EB%B3%B4%EA%B8%B0%0D%0A')}</div></div><div class="face backFace"></div></li>`);
      todayListItemWrap.append(todayListItemMore);
      todayListItem.append(todayListItemWrap);
      todayList.append(todayListItem);
      todayListWrap.append(todayList);

      return callBack(todayListWrap);
    }

    /** 
     * * 리스트 업데이트
     */
    function listUpdate(callBack) {
      var item = todayListItemWrap.children();
      
      todayListTitle.html(_data.keyword_service.split('<br />').map((self, i) => i !== 0 && i % 2 === 1 ? self + '<br />' : self + ' '));
      
      _data.article.forEach((self, i) => {     
        var insertDTM = utils.isToday(_data.serverDTM, utils.dateFormat(self.insert_dtm)) ? moment(utils.dateFormat(self.insert_dtm)).startOf('min').fromNow() : self.insert_dtm;         

        item.eq(i).attr('data-link', self.link_url);
        item.eq(i).find('.subject').html(self.artc_title);
        item.eq(i).find('.provider').text(self.cp_nm);
        item.eq(i).find('.time').text(insertDTM);

        /** 
         * * Subject Ellipsis (line-clamp: 3)
         */
        utils.ellipsisText(item.eq(i).find('.subject')[0]);
        
        if (!!self.img_url) {
          item.eq(i).find('.thumb-nail').removeClass('empty');
          item.eq(i).find('.thumb-nail img').attr('src', self.img_url);
        } else {
          item.eq(i).find('.thumb-nail').addClass('empty');
          item.eq(i).find('.thumb-nail img').attr('src', '');
        }
      });

      todayListItemMore.attr('data-link', _data.refs.link);
      todayListItemMore.find('.size').text(utils.withCommas(_data.refs.cnt));

      return callBack(todayListWrap);
    }

    /** 
     * * 기사 목록 관련 이벤트 묶음
     */
    function listRefEvent() {
      var duration = .3;

      todayListWrap.on('mouseover mouseout click.PopPop', '.listItemWrap', function(e) {
        e.preventDefault();

        if (gsap.isTweening(window)) return;
        
        var targetLI = e.target.closest('li');

        switch(e.type) {
          case 'click':
            /** 
             * * SessionStorage
             */
            sessionStorage.setItem('Article', JSON.stringify(_data));

            return location.href = targetLI.getAttribute('data-link');
          case 'mouseover':
            if (targetLI.className !== 'more') {
              gsap.to(targetLI, duration / 1.5, { y: -6, boxShadow: '0 10px 26px 0 rgba(0, 0, 0, 0.15)', ease: 'none' });
            } else {
              gsap.to(targetLI, duration, { boxShadow: '0 10px 26px 0 rgba(0, 0, 0, 0.15)'});
            }
            return;
          case 'mouseout':
            if (targetLI.className !== 'more') {
              gsap.to(targetLI, duration / 1.5, { y: 0, boxShadow: '0 10px 26px 0 rgba(0, 0, 0, 0)', ease: 'none' });
            } else {
              gsap.to(targetLI, duration, { boxShadow: '0 10px 26px 0 rgba(0, 0, 0, 0)'});
            }
            return;
          default : 
            return;
        }
      });

      todayListWrap.find('.btnScrollTop').on('click.PopPop', function() {
        gsap.to(window, duration * 2, { scrollTo: 0 });
      });

      window.addEventListener('scroll', function() {
        var scrollTop = window.scrollY || window.pageYOffset;

        if (scrollTop > 750) {
          gsap.to(todayListWrap.find('.btnScrollTop'), duration, { autoAlpha: 1 });
        } else {
          gsap.to(todayListWrap.find('.btnScrollTop'), duration, { autoAlpha: 0 }); 
        }
      });
    }

    return {
      listSetData: function (data) {
        _data = data;
        if(_data.refs && _data.refs.link) {
          _data.refs.link = encodeURI(_data.refs.link);
        }
      },
      listRender: function(callBack) {
        listRender(callBack);
      },
      listUpdate: function(callBack) {
        listUpdate(callBack);
      },
      listRefEvent: function() {
        listRefEvent();
      },
      popUp: function(immediate) {
        popUp(immediate);
      },
      popOut: function(immediate) {
        popOut(immediate);
      }
    }
  })();


  /**
   * * 버블 제어
   */
  bubblesController = (function controlBubbles() {
    // 버블 옵션
    var viewBox = (650 / 100);
    var bubbles = {
      selection: d3.select(bubblesID),
      options: {
        width: 650,
        height: 650,
        gap: 4,
        duration: 600,
        velocityDecay: .35,
        forceStrength: .003,
        percent: [(300 / viewBox), (200 / viewBox), (170 / viewBox), (140 / viewBox), (110 / viewBox), (100 / viewBox), (100 / viewBox), (100 / viewBox), (100 / viewBox), (100 / viewBox)],
        sizes: [(34 / viewBox), (30 / viewBox), (26 / viewBox), (24 / viewBox), (20 / viewBox), (16 / viewBox), (16 / viewBox), (16 / viewBox), (16 / viewBox), (16 / viewBox)],
        color: ['rgba(21, 45, 255, .7)', 'rgba(47, 134, 255, .7)', 'rgba(20, 187, 190, .7)', 'rgba(86, 55, 255, .7)', 'rgba(141, 201, 29, .7)', 'rgba(212, 216, 220, .7)', 'rgba(212, 216, 220, .7)', 'rgba(212, 216, 220, .7)', 'rgba(212, 216, 220, .7)', 'rgba(212, 216, 220, .7)'],
        ease: [d3.easeBackOut.overshoot(1.5), d3.easeQuadOut],
        isPopPop: false
      },
      prevSq: null,
      prevPos: [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
      data: null
    }

    /** 
     * * 버블 위치 계산
     */
    var calcBubblesPoints = (function() {
      var viewBox = 650;
      var options = bubbles.options;
      var forceXY = [
        {
          x: (182 / viewBox).toFixed(4),
          y: (150 / viewBox).toFixed(4)
        },
        {
          x: (-6 / viewBox).toFixed(4),
          y: (110 / viewBox).toFixed(4)
        },
        {
          x: (494 / viewBox).toFixed(4),
          y: (130 / viewBox).toFixed(4)
        },
        {
          x: (472 / viewBox).toFixed(4),
          y: (330 / viewBox).toFixed(4)
        },
        {
          x: (285 / viewBox).toFixed(4),
          y: (470 / viewBox).toFixed(4)
        },
        {
          x: (105 / viewBox).toFixed(4),
          y: (300 / viewBox).toFixed(4)
        },
        {
          x: (-6 / viewBox).toFixed(4),
          y: (400 / viewBox).toFixed(4)
        },
        {
          x: (161 / viewBox).toFixed(4),
          y: (420 / viewBox).toFixed(4)
        },
        {
          x: (428 / viewBox).toFixed(4),
          y: (450 / viewBox).toFixed(4)
        },
        {
          x: (410 / viewBox).toFixed(4),
          y: (90 / viewBox).toFixed(4)
        }
      ]
      
      return function(data) {
        var positions = utils.shuffleArray(forceXY);
        var radiusScale = d3.scaleLinear().domain([0, 100]).range([0, options.width]);
        var r;
        var checkPos = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
        
        if (bubbles.prevSq !== null) {
          bubbles.prevPos = data.map((self, i) => {
            var prevPos = bubbles.prevSq.indexOf(self.keyword_sq) !== -1 ? bubbles.prevPos[bubbles.prevSq.indexOf(self.keyword_sq)] : -1;

            if (prevPos !== -1) checkPos.splice(checkPos.indexOf(prevPos), 1);

            return prevPos;
          });
        }

        bubbles.prevPos = bubbles.prevPos.map(self => (self !== -1) ? self : checkPos.shift());
        bubbles.prevSq = data.map(self => self.keyword_sq);

        return options.percent.map(function(percent, i) {
          r = radiusScale(options.percent[i] / 2);
          
          return {
            x: (options.width * (bubbles.prevPos[i] !== undefined ? positions[bubbles.prevPos[i]].x : positions[i].x)) + r,
            y: (options.height * (bubbles.prevPos[i] !== undefined ? positions[bubbles.prevPos[i]].y : positions[i].y)) + r,
          }
        });
      }
    })();

    /** 
     * * 버블 데이터 계산
     */
    function calcBubblesData(data) {
      var options = bubbles.options;
      var positions = calcBubblesPoints(data);
      var radiusScale = d3.scaleLinear().domain([0, 100]).range([0, options.width]);

      return data.map(function(d, i) {
        var result = utils._objectSpread(utils._objectSpread({}, d), {}, {
          radius: radiusScale(options.percent[i] / 2),
          x: positions[i].x,
          y: positions[i].y
        });

        return result;
      });
    }
    
    /** 
     * * 버블 접근성 태그 삽입
     */
    function bubbleAccessibility() {
      var selection = bubbles.selection;

      selection
        .attr('role', 'group')
        .attr('aria-labelledby', 'title desc')

      selection
        .append('title')
        .attr('id', 'title')
        .text(decodeURI('%ED%95%9C%EB%88%88%EC%97%90 %EB%B3%B4%EB%8A%94 %EC%98%A4%EB%8A%98'));

      selection
        .append('desc')
        .attr('id', 'desc')
        .text(decodeURI('%ED%98%84%EC%9E%AC%EC%8B%9C%EA%B0%84 %EC%8B%A4%EC%8B%9C%EA%B0%84 %EC%9D%B4%EC%8A%88%EB%A5%BC %ED%82%A4%EC%9B%8C%EB%93%9C %ED%98%95%ED%83%9C%EB%A1%9C %EC%A0%9C%EA%B3%B5'));

      selection
        .append('g')
        .attr('id', 'bubbleGroupWrap');
    }

    /** 
     * * 버블 생성
     */
    function bubblesRender(data) {
      var selection = bubbles.selection;
      var options = bubbles.options;
      
      selection
        .attr('width', options.width)
        .attr('height', options.height)
        .attr('viewBox', [0, 0, options.width, options.height]);

      var fillColor = d3.scaleOrdinal()
        .domain([0, 1, 2, 3, 4, 5, 6, 7, 8, 9])
        .range(options.color);

      var fontScale = d3.scaleLinear()
        .domain([0, 100])
        .range([0, options.width]);

      var bubbleGroupWrap = d3.select('#bubbleGroupWrap');

      var bubbleGroup = bubbleGroupWrap
        .selectAll('.bubbleGroup')
        .data(data, function(d) { return d.keyword_sq; })
        .join(
          function (enter) {
            var group = enter = enter
              .append('g')
                .attr('class', 'bubbleGroup')
                .attr('role', 'list')
                .attr('aria-label', 'bubble UI');

            var wrap = group
              .append('svg')
                .attr('class', 'bubbleWrap')

            var wrapGroup = wrap
              .append('g')
                .attr('class', 'bubble')
                .attr('role', 'listitem');

            wrapGroup
              .append('circle')
                .attr('class', 'bubbleCircle');

            wrapGroup
              .append('text')
              .attr('class', 'bubbleText');

            enterT(enter);
            return enter;
          },
          function (update) {
            updateT(update);
            return update;
          },
          function (exit) {
            exitT(exit);
            return exit;
          }
        )
        .attr('transform', function(d) {
          return 'translate('+ d.x + ', '+ d.y +')';
        })
        .on('click', function(d) {
          /** 
           * * SesstionStorage Remove
           */
          if (sessionStorage.getItem('Article') !== null) sessionStorage.removeItem('Article');

          /**
           * * Statistics (click)
           */
          if (typeof window.ndrclick === 'function') {
            ndrclick(`TOK${((d.index + 1) < 10) ? '0' + (d.index + 1) : (d.index + 1)}`);
          }


          callArticle({
            selection : this,
            keyword_service: d.keyword_service,
            keyword_dtm: d.keyword_dtm,
            keyword_sq: d.keyword_sq,
            index: d.index
          }, false);
          // 카드 노출시 url표시
          // let { origin, pathname } = window.location;
          // window.location.replace(`${origin}${pathname}#$keyword_dtm=${d.keyword_dtm}$keyword_sq=${d.keyword_sq}$index=${d.index}`);
        })
        .on('mouseover', function() {
          var selection = d3.select(this).select('.bubble');
            
            selection
              .transition()
                .duration(options.duration)
                .ease(options.ease[0])
              .attr('transform', 'scale(1.05, 1.05)');
        })
        .on('mouseout', function() {
          var selection = d3.select(this).select('.bubble');

            selection
              .transition()
                .duration(options.duration)
                .ease(options.ease[0])
              .attr('transform', 'scale(1, 1)');
        });

      function enterT(selection) {
        var wrap = selection.select('.bubbleWrap');
        var bubble = selection.select('.bubble');
        var circle = selection.select('.bubbleCircle');
        var text = selection.select('.bubbleText');

        selection.attr('data-importance', function(d, i) { return i });

        wrap
          .attr('width', function(d) { return d.radius * 2; })
          .attr('height', function(d) { return d.radius * 2; })
          .attr('viewBox', function(d) {
            return [0, 0, d.radius * 2, d.radius * 2];
          });

        bubble
          .attr('transform', 'scale(0)')
          .transition()
            .delay(function(d, i) {
              return i * 30;
            })
            .ease(options.ease[0])
            .duration(options.duration)
          .attr('transform', 'scale(1)');

        circle
          .transition()
          .delay(function(d, i) {
            return i * 30;
          })
          .ease(options.ease[0])
          .duration(options.duration)
          .attr('r', function(d) { return d.radius; })
          .attr('cx', 0)
          .attr('cy', 0)
          .attr('fill', function(d, i) {
            return fillColor(i);
          });

        text
          .attr('stroke', function (d, i) {
            return (i < 5) ? '#fff' : '#333';
          })
          .attr('stroke-width', 0)
          .attr('fill', function (d, i) {
            return (i < 5) ? '#fff' : '#333';
          })
          .attr('font-size', function (d, i) {
            return fontScale(options.sizes[i]) + 'px';
          })
          .style('text-anchor', 'middle');

        var lineBreak = text
          .selectAll('.lineBreak')
          .data(function(d) {
            return d.keyword_service.split('<br />').map(self => self).slice(0, 3)
          });

        lineBreak
          .enter()
            .append('tspan')
            .attr('class', 'lineBreak')
            .attr('x', 0)
            .attr('y', function () {
              switch(this.parentNode.childElementCount) {
                case 1: 
                  return '.3em'
                case 2: 
                  return '-.4em';
                case 3: 
                  return '-1.15em';
                default: 
                  return 0;
              }
            })
            .attr('dy', function (d, i) {
              return i === 0 ? 0 : (i * 1.45) + 'em';
            })
            .text(function (title) {
              return title;
            });
      }

      function updateT(selection) {
        var wrap = selection.select('.bubbleWrap');
        var circle = selection.select('.bubbleCircle');
        var text = selection.select('.bubbleText');

        selection.attr('data-importance', function(d, i) { return i; });

        wrap
          .attr('width', function(d) { return d.radius * 2; })
          .attr('height', function(d) { return d.radius * 2; })
          .attr('viewBox', function(d) {
            return [0, 0, d.radius * 2, d.radius * 2];
          });

        circle
          .transition()
          .delay(function(d, i) { return i; })
          .ease(options.ease[0])
          .duration(options.duration)
          .attr('r', function(d) { return d.radius; })
          .attr('cx', 0)
          .attr('cy', 0)
          .attr('fill', function(d, i) {
            return fillColor(i);
          })
        
          text
          .attr('stroke', function (d, i) {
            return (i < 5) ? '#fff' : '#333';
          })
          .attr('stroke-width', 0)
          .attr('fill', function (d, i) {
            return (i < 5) ? '#fff' : '#333';
          })
          .attr('font-size', function (d, i) {
            return fontScale(options.sizes[i]) + 'px';
          })
          .style('text-anchor', 'middle');

          var lineBreak = text
          .selectAll('.lineBreak')
          .data(function(d) {
            return d.keyword_service.split('<br />').map(self => self.trim()).slice(0, 3);
          });

        lineBreak
          .enter()
            .append('tspan')
            .attr('class', 'lineBreak')
            .attr('x', 0)
            .attr('y', function () {
              switch(this.parentNode.childElementCount) {
                case 1: 
                  return '.3em'
                case 2: 
                  return '-.4em';
                case 3: 
                  return '-1.1em';
                default: 
                  return 0;
              }
            })
            .attr('dy', function (d, i) {
              return i === 0 ? 0 : (i * 1.45) + 'em';
            })
            .text(function (title) {
              return title;
            });
      }

      function exitT(selection) {
        selection
          .transition()
          .duration(options.duration * 3)
          .style('opacity', 0);

        selection.remove();
      }

      return bubbleGroup;
    }

    /** 
     * * 버블 애니메이션 시뮬레이터
     */
    function bubblesSimulation(bubbleGroup, data, types) {
      var options = bubbles.options;
      var simulator = bubbles.simulator;
      var simulation = {
        init: function(selection) {
          var simulator = d3.forceSimulation()
            .alphaTarget(0)
            .velocityDecay(options.velocityDecay)
            .force('x', d3.forceX(options.width / 2).strength((orientation) ? options.forceStrength * 4 : options.forceStrength * 10))
            .force('y', d3.forceY(options.height / 2).strength((orientation) ? options.forceStrength * 4 : options.forceStrength * 10))
            .force('charge', d3.forceManyBody().strength(options.forceStrength))
            .force('collide', d3.forceCollide().radius(function(d) { return d.radius + options.gap; }))
            .on('tick', function(d, i) {
              selection
                .transition()
                .duration(options.duration / 10)
                .attr('transform', function(d) {
                  return 'translate(' + (d.x - 1) +', '+ (d.y - 1) +')';
                });

              return selection;
            })
            .on('end', function () {
              
            })
            .nodes(data);

          return simulator;
        },
        dragStart: function (selection) {
          var simulator = d3.forceSimulation()
            .alphaTarget(1)
            .velocityDecay(options.velocityDecay)
            .force('x', d3.forceX((options.width / 2)).strength(options.forceStrength * 10))
            .force('y', d3.forceY((options.height / 2)).strength(options.forceStrength * 10))
            .force('charge', d3.forceManyBody().strength(options.forceStrength * 10))
            .force('collide', d3.forceCollide().radius(function(d) { return d.radius - ((options.gap + 146) * utils.getRandomIntInclusive(0, 0, true)); }).strength(options.forceStrength * 60))
            .on('tick', function () {
              selection
                .transition()
                .duration(options.duration / 10)
                .attr('transform', function(d) {
                  return 'translate(' + (d.x - 1) +', '+ (d.y - 1) +') scale(.8)';
                });

              return selection;
            })
            .on('end', function () {

            })
            .nodes(data);

          return simulator;
        },
        dragEnd: function (selection) {
          var simulator = d3.forceSimulation()
            .alphaTarget(0)
            .velocityDecay(options.velocityDecay)
            .force('x', d3.forceX(options.width / 2).strength(options.forceStrength * 10))
            .force('y', d3.forceY(options.height / 2).strength(options.forceStrength * 10))
            .force('charge', d3.forceManyBody().strength(options.forceStrength))
            .force('collide', d3.forceCollide().radius(function(d) { return d.radius + options.gap; }))
            .on('tick', function() {
              selection
                .transition()
                .duration(options.duration / 10)
                .attr('transform', function(d) {
                  return 'translate(' + (d.x - 1) +', '+ (d.y - 1) +') scale(1)';
                });

              return selection;
            })
            .on('end', function () {
            })
            .nodes(data);
          return simulator;
        }
      }

      switch (types) {
        case 'onInit':
          if (!!simulator) simulator.stop();
          return simulator = simulation.init(bubbleGroup);
          break;
        case 'onDragStart':
          if (!!simulator) simulator.stop();
          return simulator = simulation.dragStart(bubbleGroup);
          break;
        case 'onDragEnd':
          if (!!simulator) simulator.stop();
          return simulator = simulation.dragEnd(bubbleGroup);
          break;
      }
    }

    return {
      init: function() {
        bubbleAccessibility();

        bubbles.data = calcBubblesData(caller.keyword);
        bubbles.group = bubblesRender(bubbles.data);
        bubbles.simulator = bubblesSimulation(bubbles.group, bubbles.data, 'onInit');
      },
      update: function() {
        bubbles.data = calcBubblesData(caller.keyword);
        bubbles.group = bubblesRender(bubbles.data);
        bubbles.simulator = bubblesSimulation(bubbles.group, bubbles.data, 'onInit');
      },
      dragStart: function () {
        bubbles.simulator = bubblesSimulation(bubbles.group, bubbles.data, 'onDragStart');
      },
      dragEnd: function() {
        caller.resetKeyword();
        caller.dataLoadEvent(`${KEYWORD_URL}?service_dtm=${utils.convertTime(caller.serviceDTM, 'YMDH')}`, (res) => {
          caller.serverDTM = utils.dateFormat(res.server_dtm);

          for (let key in res.data) caller.keyword = res.data[key];

          bubbles.data = calcBubblesData(caller.keyword);
          bubbles.group = bubblesRender(bubbles.data);
          bubbles.simulator = bubblesSimulation(bubbles.group, bubbles.data, 'onDragEnd');
          
          /** 
           * * SesstionStorage Remove
           */
          if (sessionStorage.getItem('Article') !== null) sessionStorage.removeItem('Article');
          history.pushState(null, null, window.location.pathname);

          callArticle({
            selection : $('.bubbleGroup[data-importance='+ 0 +']')[0],
            keyword_service: caller.keyword[0].keyword_service,
            keyword_dtm: caller.keyword[0].keyword_dtm,
            keyword_sq: caller.keyword[0].keyword_sq,
            index: 0
          }, true);
        });
      }
    }
  })();


  /**
   * * 프로그레스 컨트롤러 제어
   */
  var setProgressWidth = (531 / 650);
  var setProgressHeight = (48 / 650);
  var setKnobRadius = (24 / 650);

  progressBarController = (function controlProgressBar() {
    // 프로그레스 바 옵션
    var progressBar = {
      selection: d3.select(progressID),
      options: {
        width: calcPresume(setProgressWidth),
        height: calcPresume(setProgressHeight),
        bar: {
          width: calcPresume(setProgressWidth),
          height: calcPresume(setProgressHeight)
        },
        knob: {
          r:  calcPresume(setKnobRadius) / 2
        }
      },
      TL: null,
      drag: null,
      minLimit: null,
      maxLimit: null,
      timestamp: null,
      percent: null,
      data: null
    };

    /** 
     * * 옵션값 선 계산
     */
    function calcPresume(percent) {
      return 650 * percent;
    }

    /** 
     * * 프로그레스 바 시간대 계산
     */
    function calcProgressBarTimestamp() {
      /** 
       * * 컨트롤러 조절 범위 (분 => 시간) 변경 
       * ! (산출물 적용 O / 테스트/라이브 X)
       * 
       * 변경된 내용 :
       * @variable onDateMille
       * @variable timestamp.server
       * @variable timestamp.now 
       */
      var oneDateMilli = (((1000 * 60) * 60) * 24); // (((1000 * 60) * 60) * 24) - (1000 * 60) // 23시간 59분 => 23시간으로 변경
      var timestamp = {};
      
      timestamp.min = moment(caller.minDTM).valueOf();
      timestamp.server = moment(caller.serverDTM).valueOf(); // minutes() / seconds() 추가
      timestamp.now = moment(caller.progressDTM).valueOf(); // minutes() / seconds() 추가
      timestamp.start = moment(caller.progressDTM).startOf('day').valueOf();
      timestamp.end = moment(caller.progressDTM).endOf('day').valueOf();
      timestamp.percent = (timestamp.now - timestamp.start) / oneDateMilli;
      timestamp.minLimit = (utils.convertTime(caller.minDTM, 'YMD') === utils.convertTime(caller.progressDTM, 'YMD')) ? (timestamp.min - timestamp.start) / oneDateMilli : 0;
      timestamp.maxLimit = (utils.convertTime(caller.serverDTM, 'YMD') === utils.convertTime(caller.progressDTM, 'YMD')) ? (timestamp.server - timestamp.start) / oneDateMilli : 1;
      timestamp.perToTime = function(milli, toFixed) {
        return utils.convertTime((milli * oneDateMilli) + this.start, toFixed);
      }

      return timestamp;
    }

    /** 
     * * 프로그레스 바 데이터 계산
     */
    function calcProgressBarData(options, timestamp) {
      return [options].map(function(d, i) {
        return utils._objectSpread(utils._objectSpread({}, d, timestamp), {}, {
          HM: timestamp.perToTime(timestamp.percent, 'HM'),
          YMDH: timestamp.perToTime(timestamp.percent, 'YMDH'),
          YMDHM: timestamp.perToTime(timestamp.percent, 'YMDHM'),
          path: {
            front: 'M0 '+ (d.bar.height / 2) +' l '+ d.bar.width +' '+ .01,
            back: 'M0 '+ (d.bar.height / 2) +' l '+ ((d.bar.width * timestamp.maxLimit)) +' '+ .01,
            backboard : (function() {
              var time = d.bar.width / 5;
              var pathResult = '';

              for (var i = 0; i < time; i++) {
                pathResult += 'M '+ 5 * i +' '+ 20 +' H '+ (5 * i) +' V '+ 28;
              }
              
              return pathResult;
            })()
          },
        });
      })[0];
    }

    /** 
     * * 프로그레스 바 생성
     */
    function progressBarRender(data) {
      var selection = progressBar.selection;
      var options = progressBar.options

      selection
        .attr('width', options.width)
        .attr('height', options.height)
        .attr('viewBox', [0, 0, options.width, options.height]);

      var progress = selection
        .selectAll('.progress')
        .data([data])
        .join(
          function (enter) {
            enter = enter
              .append('g')
                .attr('class', 'progress');

            var linearGradient = enter
              .append('defs')
              .append('linearGradient')
                .attr('id', 'pathLinear')

            linearGradient
              .append('stop')
                .attr('offset', '0%')
                .attr('stop-color', '#639eff');
            
            linearGradient
              .append('stop')
                .attr('offset', '100%')
                .attr('stop-color', 'rgba(91, 108, 255, .98)');

            enter
              .append('path')
              .attr('class', 'pathBackboard');

            enter
              .append('path')
              .attr('class', 'pathBack');

            enter
              .append('path')
                .attr('class', 'pathFront');
            
            var group = enter
              .append('g')
                .attr('class', 'timeGroup');

            group
              .append('circle')
                .attr('class', 'timeKnob');

            group
              .append('rect')
                .attr('class', 'timeKnobEmpty')
                .attr('x', function(d) {
                  return -(d.knob.r * 2);
                })
                .attr('y', function(d) {
                  return -(d.knob.r * 2);
                })
                .attr('width', function(d) {
                  return d.knob.r * 4
                })
                .attr('height', function(d) {
                  return d.knob.r * 4
                })
                .attr('fill', 'transparent');
            
            var timeTooltip = group
              .append('svg')
                .attr('class', 'timeTooltip')
                .attr('xmlns', 'http://www.w3.org/2000/svg')
                .attr('xmlns:xlink', 'http://www.w3.org/1999/xlink');

            var filterDefs = timeTooltip
              .append('defs');
            
            var filter1 = filterDefs
              .append('filter')
                .attr('id', 'filter1Back')
                .attr('width', '128.9%')
                .attr('height', '167.4%')
                .attr('x', '-14.4%')
                .attr('y', '-28.5%')
                .attr('filterUnits', 'objectBoundingBox');

            filter1
              .append('feOffset')
                .attr('result', 'shadowOffsetOuter1')
                .attr('in', 'SourceAlpha')
                .attr('dy', 2)
            
            filter1
              .append('feGaussianBlur')
                .attr('result', 'shadowBlurOuter1')
                .attr('in', 'shadowOffsetOuter1')
                .attr('stdDeviation', 4)

            filter1
              .append('feColorMatrix')
              .attr('in', 'shadowBlurOuter1')
              .attr('values' , '0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.12 0');

            filter1
              .append('rect')
              .attr('id', 'filter1Rect');

            var filter2 = filterDefs
              .append('filter')
                .attr('id', 'filter2Back')
                .attr('width', '356.7%')
                .attr('height', '367.1%')
                .attr('x', '-128.3%')
                .attr('y', '-85%')
                .attr('filterUnits', 'objectBoundingBox');

            filter2
              .append('feOffset')
                .attr('result', 'shadowOffsetOuter1')
                .attr('in', 'SourceAlpha')
                .attr('dy', 4)
            
            filter2
              .append('feGaussianBlur')
                .attr('result', 'shadowBlurOuter1')
                .attr('in', 'shadowOffsetOuter1')
                .attr('stdDeviation', 3)

            filter2
              .append('feColorMatrix')
              .attr('in', 'shadowBlurOuter1')
              .attr('values' , '0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.0754206731 0');

            filter2
              .append('path')
              .attr('id', 'filter2Path')
              .attr('d', 'M19.285 0L15 8.235 10.714 0h8.571z');

              var timeTooltipGroup = timeTooltip
              .append('g');

            timeTooltipGroup
              .append('use')
                .attr('fill' ,'#000')
                .attr('filter', 'url(#filter1Back)')
                .attr('xlink:xlink:href', '#filter1Rect');
                

            timeTooltipGroup
              .append('use')
                .attr('fill' ,'#fff')
                .attr('xlink:xlink:href', '#filter1Rect')

            timeTooltipGroup
              .append('use')
                .attr('fill' ,'#000')
                .attr('filter', 'url(#filter2Back)')
                .attr('xlink:xlink:href', '#filter2Path');

            timeTooltipGroup
              .append('use')
                .attr('fill' ,'#fff')
                .attr('xlink:xlink:href', '#filter2Path');

            timeTooltipGroup
              .append('text')
                .attr('class', 'timeText');
              
            enterT(enter);
            return enter;
          },
          function (update) {
            updateT(update);
            return update;
          },
          function (exit) {
            exitT(exit);
            return exit;
          }
        );

      function enterT(selection) {
        var pathBackboard = selection.select('.pathBackboard');
        var pathBack = selection.select('.pathBack');
        var pathFront = selection.select('.pathFront');
        var knob = selection.select('.timeKnob');
        var tooltip = selection.select('.timeTooltip');
        var tooltipRect = tooltip.select('rect');
        var tooltipPath = tooltip.select('path');
        var tooltipText = tooltip.select('text');
        
        pathBackboard
          .attr('d', function(d) { return d.path.backboard; })
          .attr('stroke-width', 1)
          .attr('stroke', '#c7ccd1')
          .attr('fill', 'none')
          .attr('shape-rendering', 'crispEdges');

        pathBack
          .attr('d', function(d) { return d.path.back; })
          .attr('stroke-width', function(d) {
            return d.height * (8 / d.height);
          })
          .attr('stroke', '#e6e8ea');

        pathFront
          .attr('d', function(d) { return d.path.front; })
          .attr('stroke-width', function(d) {
            return d.height * (14 / d.height);
          })
          .attr('stroke', 'url(#pathLinear)')
          .attr('stroke-linecap', 'round')
          .attr('fill', '#5b6cff');

        knob
          .attr('r', function(d) { return d.knob.r; })
          .attr('stroke', '#5b6cff')
          .attr('stroke-width', 1)
          .attr('fill', '#fff');

        tooltip
          .attr('width', function(d) {
            return d.width * (134 / d.width);
          })
          .attr('height', function(d) {
            return d.height * (58 / d.height);
          })
          .attr('viebox',function(d){
            return [0, 0, d.width * (134 / d.width), d.height * (58 / d.height)]
          });
        
        tooltipRect
          .attr('width', function(d) {
            return d.width * (134 / d.width);
          })
          .attr('height', function(d) {
            return d.height * (58 / d.height);
          })
          .attr('x', function(d) {
            return (d.percent * 100 > 84) ? -(((d.width * (134 / d.width)) / 2) - (84 - d.percent * 100)) : -((d.width * (134 / d.width)) / 2);
          })
          .attr('y', function(d) {
            return -(d.height + (d.knob.r * 4 - 4));
          })
          .attr('rx', function(d) {
            return d.knob.r * 2.5;
          });
        
        tooltipPath
          .attr('transform', function(d) {
            return 'translate('+ 0 +' '+ -(d.knob.r * 3 - 2) +')';
          })
          .attr('d', function(d) {
            return 'M '+ '-9 0 l 9 18 l 9 -18 h -18z';
          });
      
        tooltipText
          .attr('alignment-baseline', 'middle')
          .attr('text-anchor', 'middle')
          .attr('x', function (d) {
            return (84 < d.percent * 100) ? (84 - d.percent * 100) : 0;
          })
          .attr('y', function(d) {
            return -(d.height + (d.knob.r / 2));
          })
          .attr('font-size', function(d){
            return d.width * (33 / d.width) +'px';
          })

        var lineBreak = tooltipText
          .selectAll('tspan')
            .data(function(d) {
              // 서버시간 > 2020-08-20 09:23:00 이면 현재 10분단위 정책이므로 09:20으로 변환
              let t = d.HM.split(' '), c = parseInt( t.pop() / 10) * 10;
              t.push(c === 0 ? '00':c)
              return t
            });

        lineBreak
          .enter()
          .append('tspan')
            .attr('class', 'break')
            .attr('dx', function(d, i) {
              return i === 1 ? i * 4 : i * 2.5; 
            })
            .attr('dy', function(d, i) {
              return i === 1 ? '-.1em' : '.1em'; 
            })
            .attr('fill', function(d, i) {
              return i === 1 ? '#7c8aff' : '#000'
            })
            .text(function(time) { 
              return time; 
            });
      }

      function updateT(selection) {
        var pathBackboard = selection.select('.pathBackboard');
        var pathBack = selection.select('.pathBack');
        var pathFront = selection.select('.pathFront');
        var knob = selection.select('.timeKnob');
        var tooltip = selection.select('.timeTooltip');
        var tooltipRect = tooltip.select('rect');
        var tooltipPath = tooltip.select('path');
        var tooltipText = tooltip.select('text');
        
        pathBackboard
          .attr('d', function(d) { return d.path.backboard; })
          .attr('stroke-width', 1);

        pathBack
          .attr('d', function(d) { return d.path.back; })
          .attr('stroke-width', function(d) {
            return d.height * 0.16666666666666666;
          });

        pathFront
          .attr('d', function(d) { return d.path.front; })
          .attr('stroke-width', function(d) { 
            return d.height * (14 / d.height);
          });

        knob
          .attr('r', function(d) { return d.knob.r; });
        
        tooltip
          .attr('width', function(d) {
            return d.width * (134 / d.width);
          })
          .attr('height', function(d) {
            return d.height * (58 / d.height);
          })
          .attr('viebox',function(d){
            return [0, 0, d.width * (134 / d.width), d.height * (58 / d.height)]
          });
        
        tooltipRect
          .attr('width', function(d) {
            return d.width * (134 / d.width);
          })
          .attr('height', function(d) {
            return d.height * (58 / d.height);
          })
          .attr('x', function(d) {
            return (d.percent * 100 > 84) ? -(((d.width * (134 / d.width)) / 2) - (84 - d.percent * 100)) : -((d.width * (134 / d.width)) / 2);
          })
          .attr('y', function(d) {
            return -(d.height + (d.knob.r * 4 - 4));
          })
          .attr('rx', function(d) {
            return d.knob.r * 2.5;
          });
        
        tooltipPath
          .attr('transform', function(d) {
            return 'translate('+ 0 +' '+ -(d.knob.r * 3 -2) +')';
          })
          .attr('d', function(d) {
            return 'M '+ '-9 0 l 9 18 l 9 -18 h -18z';
          });
      
        tooltipText
          .attr('x', function (d) {
            return (84 < d.percent * 100) ? (84 - d.percent * 100) : 0;
          })
          .attr('y', function(d) {
            return -(d.height + (d.knob.r / 2));
          })
          .attr('font-size', function(d){
            return d.width * (33 / d.width) +'px';
          })

        var lineBreak = tooltipText
          .selectAll('tspan')
            .data(function(d) {
              // 서버시간 > 2020-08-20 09:23:00 이면 현재 10분단위 정책이므로 09:20으로 변환
              let t = d.HM.split(' '), c = parseInt( t.pop() / 10) * 10;
              t.push(c === 0 ? '00':c)
              return t
            });

        lineBreak
          .text(function(time) { 
            return time; 
          });
      }

      function exitT(selection) {
        selection
          .transition()
          .duration(options.duration * 3)
          .style('opacity', 0);

        selection.remove();
      }

      return progress;
    }

    /** 
     * * 프로그레스 바 이벤트 정의
     */
    function progressBarEvent(data) {
      /** 
       * * 컨트롤러 조절 범위 (분 => 시간) 변경 
       * ! 산출물 적용 [O] / 테스트&라이브 적용 [X]
       * 
       * 변경된 내용:
       * @variable progressBar.percent
       * @options bounds.minX, bounds.maxX
       * @options liveSnap
       * @options snap
       */
      progressBar.TL = gsap.timeline({ defaults: { overwrite: 'auto', ease: 'none' }, paused: true });
      progressBar.minLimit = progressBar.timestamp.minLimit;
      progressBar.maxLimit = progressBar.timestamp.maxLimit;
      progressBar.percent = progressBar.percent >= 1 ? 0 : progressBar.percent;
      progressBar.percent = progressBar.percent || (progressBar.timestamp.percent !== 0) ? progressBar.timestamp.percent : .0001; // * .0001 단위 필수

      if (progressBar.drag !== null) progressBar.drag[0].kill();

      progressBar.drag = Draggable.create(`${progressID} .timeGroup`, {
        trigger: `${progressID} .timeGroup`,
        type: 'x, y',
        bounds: {
          minX: progressBar.minLimit ? data.bar.width * (progressBar.minLimit + .0001) : 0, // * .0001 단위 필수
          maxX: progressBar.maxLimit ? data.bar.width * (progressBar.maxLimit + .0001) : 1, // * .0001 단위 필수
          minY: data.knob.r * 2,
          maxY: data.knob.r * 2,
        },
        throwProps: false,
        liveSnap: true,
        snap: {
          x: function (x) {
            let cc = (data.bar.width / (24 - .0001))/6;
            return Math.floor(x / (cc)) * cc; // * .0001 단위 필수
          },
          y: function(y) {
            return Math.floor(y);
          }
        },
        onThrowUpdate: onDragAndThrowUpdate,
        onDrag: onDragAndThrowUpdate,
        onDragStart: onDragStart,
        onDragEnd: onDragEnd
      });

      gsap.set(`${progressID} .pathFront`, { clearProps: 'all' });

      progressBar.TL
        .from(`${progressID} .pathFront`, 1, {
          drawSVG: '0%'
        })
        .to(`${progressID} .timeGroup`, 1, {
          motionPath: {
            path: `${progressID} .pathFront`
          }
        }, 0)
        .progress(progressBar.percent);

      function onDragAndThrowUpdate() {
        gsap.to(`${progressID} .timeKnob`, .3, { scale: 1.3, transformOrigin: '50% 50%' });

        progressBar.timestamp.percent = progressBar.percent = Math.abs(this.x / data.bar.width);
        progressBar.TL.progress(Math.abs(this.x / data.bar.width));
        progressBar.data = calcProgressBarData(progressBar.options, progressBar.timestamp);
        progressBarRender(progressBar.data);
      }

      function onDragStart() {
        /** 
         * * Statistics (click)
         */
        if(typeof ndrclick === 'function') {
          ndrclick('TOT00');
        }

        return bubblesController.dragStart();
      }

      function onDragEnd() {
        gsap.to(`${progressID} .timeKnob`, .3, { scale: 1, transformOrigin: '50% 50%' });

        caller.serviceDTM = utils.dateFormat(progressBar.data.YMDH);
        caller.progressDTM = utils.dateFormat(progressBar.data.YMDHM);
        
        return bubblesController.dragEnd();
      }
    }

    return {
      init: function() {
        progressBar.timestamp = calcProgressBarTimestamp();
        progressBar.data = calcProgressBarData(progressBar.options, progressBar.timestamp);

        progressBarRender(progressBar.data);
        progressBarEvent(progressBar.data);
      },
      update: function() {
        progressBar.timestamp = calcProgressBarTimestamp();
        progressBar.data = calcProgressBarData(progressBar.options, progressBar.timestamp);

        progressBarRender(progressBar.data);
        progressBarEvent(progressBar.data);
      },
      resize: function () {
        progressBar.options.width = calcPresume(setProgressWidth);
        progressBar.options.height = calcPresume(setProgressHeight);
        progressBar.options.bar.width = calcPresume(setProgressWidth);
        progressBar.options.bar.height = calcPresume(setProgressHeight);
        progressBar.options.knob.r = calcPresume(setKnobRadius) / 2;

        progressBar.data = calcProgressBarData(progressBar.options, progressBar.timestamp);

        progressBarRender(progressBar.data);
        progressBarEvent(progressBar.data);
      }
    }
  })();


  /**
   * * 날짜 (prev, today, next) / 업데이트 로그 제어
   */
  timeTravelController = (function controlTimeTravel() {
    var timeTravel = document.querySelector('.timeTravel');
    var timeTravelTriggers = [document.querySelector('.btnTravel.prev'), document.querySelector('.btnTravel.next'), document.querySelector('.btnTravel.today')];
    var timeTravelDisplayTargets = [timeTravel.querySelector('.year'), timeTravel.querySelector('.month'), timeTravel.querySelector('.date')];
    var timeLog = document.querySelector('.timeLog');

    var btnShare = document.querySelector('.btnShare');

    /** 
     * * 키워드 최신 업데이트 시간 표기 (당일 서버시간 기준)
     */
    function setDisplayLogTime(time) {
      timeLog.innerText = utils.convertTime(time, 'STANDARD');
    }

    /** 
     * * 시간대 표기
     */
    function setDisplayTragetTime(time) {
      var displayTime = utils.convertTime(time, 'YMD');

      displayTime.split('-').forEach(function(time, i) {
        timeTravelDisplayTargets[i].innerText = time;
      });
    }

    /** 
     * * 시간대 제한 범위 적용
     */
    function setDisabledTirgger() {
      var minDate = utils.convertTime(moment(caller.minDTM), 'YMD');
      var maxDate = utils.convertTime(moment(caller.serverDTM).valueOf(), 'YMD');
      var progressDate = utils.convertTime(moment(caller.progressDTM).valueOf(), 'YMD');

      if (minDate === maxDate) {
        timeTravelTriggers[0].disabled = true;
        timeTravelTriggers[1].disabled = true;
        timeTravelTriggers[2].disabled = true;

      } else if (progressDate === minDate) {
        timeTravelTriggers[0].disabled = true;
        timeTravelTriggers[1].disabled = false;
        timeTravelTriggers[2].disabled = false;

        timeLog.innerText = '';
        
        btnShare.disabled = true;
      } else if (progressDate === maxDate) {
        timeTravelTriggers[0].disabled = false;
        timeTravelTriggers[1].disabled = true;
        timeTravelTriggers[2].disabled = true;

        btnShare.disabled = false;
      } else {
        timeTravelTriggers[0].disabled = false;
        timeTravelTriggers[1].disabled = false;
        timeTravelTriggers[2].disabled = false;
        
        timeLog.innerText = '';
        
        btnShare.disabled = true;
      }
    }

    /** 
     * * 시간대 별(이전/다음/오늘) 변경 범위 계산 
     */
    function confirmTimeTravle(timeline, callBack) {
      var minDateMilli = moment(caller.minDTM).valueOf();
      var maxDateMilli = moment(caller.serverDTM).valueOf();

      var serviceMilli = moment(timeline.serviceDTM).valueOf();
      var progressMilli = moment(timeline.progressDTM).valueOf();

      if (timeline.dateType === 'prev' || timeline.dateType === 'next') {
        serviceMilli = utils.varOperator(timeline.dateType, serviceMilli, (((1000 * 60) * 60) * 24));
        progressMilli = utils.varOperator(timeline.dateType, progressMilli, (((1000 * 60) * 60) * 24));
      }

      switch(timeline.dateType) {
        case 'prev':
          if (serviceMilli >= minDateMilli) {
            return callBack({
              path: `${KEYWORD_URL}?service_dtm=${utils.convertTime(serviceMilli, 'YMDH')}`,
              serviceDTM: utils.convertTime(serviceMilli, 'YMDH'),
              progressDTM: utils.convertTime(progressMilli, 'YMDHM')
            });
          } else {
            return callBack({
              path: `${KEYWORD_URL}?service_dtm=${utils.convertTime(minDateMilli, 'YMDH')}`,
              serviceDTM: utils.convertTime(minDateMilli, 'YMDH'),
              progressDTM: utils.convertTime(minDateMilli, 'YMDHM')
            });
          }
        case 'next':
          if (serviceMilli <= maxDateMilli) {
            return callBack({
              path: `${KEYWORD_URL}?service_dtm=${utils.convertTime(serviceMilli, 'YMDH')}`,
              serviceDTM: utils.convertTime(serviceMilli, 'YMDH'),
              progressDTM: utils.convertTime(progressMilli, 'YMDHM')
            });
          } else {
            return callBack({
              path: KEYWORD_URL,
              serviceDTM: null,
              progressDTM: null,
              limitType: 'maxLimit'
            });
          }
        case 'today':
          history.pushState(null, null, window.location.pathname);
          return callBack({
            path: KEYWORD_URL,
            serviceDTM: null,
            progressDTM: null,
            limitType:'maxLimit'
          });
      }
    }

    return {
      setDisplayLogTime: setDisplayLogTime,
      setDisplayTragetTime: setDisplayTragetTime,
      setDisabledTirgger: setDisabledTirgger,
      confirmTimeTravle: confirmTimeTravle,
      init: function() {
        timeTravelTriggers.forEach(function(target) {
          target.addEventListener('click', function() {
            return update(target.getAttribute('data-travel'));
          });
        });
        
        setDisplayLogTime(caller.updateDTM);
        setDisplayTragetTime(caller.progressDTM);
        setDisabledTirgger();
      }
    }
  })();


  /**
   * * Sesstion & Query 제어
   */
  function controlSeQs() {
    // 메인/속보/공유하기 관련 쿼리 존재 유/무 체크
    /*const qs = ((searches, reservedQuery) => {
      var isReserved = reservedQuery.every((query) => searches.indexOf(query) !== -1);

      if (!isReserved) return null;
      else return searches.substr(1).split('$').reduce((pv, cv) => Object.assign(pv, { [cv.split('=')[0]]: decodeURIComponent(cv.split('=')[1])}), {});
    })(window.location.hash, ['keyword_dtm', 'keyword_sq', 'index']);*/

    let qs = ((searches, reservedQuery) => {
      var isReserved = reservedQuery.every((query) => searches.indexOf(query) !== -1);

      if (!isReserved) return null;
      else return searches.substr(1).split('&').reduce((pv, cv) => Object.assign(pv, { [cv.split('=')[0]]: decodeURIComponent(cv.split('=')[1])}), {});
    })(window.location.search, ['keyword_dtm', 'keyword_sq', 'index']);


    const session = ((session) => session !== null ? JSON.parse(sessionStorage.getItem('Article')) : null)(sessionStorage.getItem('Article'));
    const Datum = session || qs;
    const isScroll = !('qs' in window && qs && qs.preview === 'true');

    callArticle({
      selection : document.querySelector('.bubbleGroup[data-importance="'+ ((Datum !== null) ? parseInt(Datum.index, 10) : 0) +'"]'),
      keyword_service: Datum !== null ? caller.keyword[parseInt(Datum.index, 10)].keyword_service : caller.keyword[0].keyword_service,
      keyword_dtm: Datum !== null ? Datum.keyword_dtm : caller.keyword[0].keyword_dtm,
      keyword_sq: Datum !== null ? Datum.keyword_sq : caller.keyword[0].keyword_sq,
      index: Datum !== null ? parseInt(Datum.index, 10) : 0
    },  isScroll);
  }


  /** 
   * * 기사 목록 (세션 / 쿼리)
   * 
   * @param {object} d - 히스토리/쿼리 데이터
   * @param {boolean} immediate - 애니메이션 없이 즉시실행 
   * 
   */
  function callArticle(d, immediate) {
    caller.resetArticle();
    caller.dataLoadEvent(`${ARTICLE_URL}?keyword_dtm=${d.keyword_dtm}&keyword_sq=${d.keyword_sq}`, (res) => {
      for (let key in res.data) caller.article = res.data[key];

      const Datum = {
        name: 'Article',
        serverDTM: caller.serverDTM,
        progressDTM: caller.progressDTM,
        article: caller.article,
        keyword_service : res.search_link.split('q=').pop(),
        keyword_dtm : d.keyword_dtm,
        keyword_sq: d.keyword_sq,
        index: d.index,
        refs: {
          link: res.search_link,
          cnt: res.search_cnt
        }
      };
      articlesController.listSetData(Datum);

      if (!immediate) gsap.to(window, .6, { scrollTo: $('.todayListWrap').offset().top });
      
      if (!State.isRender) {
        State.isRender = true;

        articlesController.listRender(() => {
          State.isPopPop = true;
          articlesController.popUp();
        });
      } else {
        articlesController.listUpdate(() => {
          State.isPopPop = true;
          articlesController.popUp();
        });
      }

      articlesController.listRefEvent();
    });
  }

    
  /**
   * * Public Controls
   */
  function init(xhrData) {
    caller = xhrData;

    bubblesController.init();
    progressBarController.init();
    timeTravelController.init();
    
    controlSeQs();
  }

  function update(dateType) {
    if (typeof dateType !== 'string' && dateType.length >= 0) return;
    
    if (document.querySelector('.layerPopup.share').classList.contains('active')) document.querySelector('.layerPopup.share').classList.remove('active');

    var timeline = {
      serverDTM: utils.dateFormat(caller.serverDTM),
      serviceDTM: utils.dateFormat(caller.serviceDTM),
      progressDTM: utils.dateFormat(caller.progressDTM),
      dateType: dateType
    };

    timeTravelController.confirmTimeTravle(timeline, function(newTimeline) {
      caller.resetKeyword();
      caller.dataLoadEvent(newTimeline.path, (res) => {
        /** 
         * * Statistics (PV)
         */
        var sNdrPath = 'news.ndr.nate.com/date', _ndr_br = '', sRef1 = '', sRef2 = '';
        if (typeof draw_ndr === 'function') {
          draw_ndr(sNdrPath, _ndr_br, sRef1, sRef2);
        }

        caller.serverDTM = utils.dateFormat(res.server_dtm);
        caller.updateDTM = utils.dateFormat(res.update_dtm);
        caller.serviceDTM = (newTimeline.serviceDTM !== null) ? utils.dateFormat(newTimeline.serviceDTM) : utils.dateFormat(res.service_dtm);
        caller.progressDTM = (newTimeline.progressDTM !== null) ? utils.dateFormat(newTimeline.progressDTM) : utils.dateFormat(res.server_dtm);

        for (let key in res.data) caller.keyword = res.data[key];
        
        bubblesController.update();
        progressBarController.update();
        
        timeTravelController.setDisplayLogTime(caller.updateDTM);
        timeTravelController.setDisplayTragetTime(caller.progressDTM);
        timeTravelController.setDisabledTirgger();

        callArticle({
          selection : $('.bubbleGroup[data-importance='+ 0 +']')[0],
          keyword_service: caller.keyword[0].keyword_service,
          keyword_dtm: caller.keyword[0].keyword_dtm,
          keyword_sq: caller.keyword[0].keyword_sq,
          index: 0
        }, true);
      });
    });
  }

  return {
    init: function (xhrData) {
      return init(xhrData);
    }
  }
})();


/**
 * * newsEdge Init
 */
document.addEventListener('DOMContentLoaded', function() {
  const myData = (() => {
    const keyword = Symbol('KEYWORD'),
          article = Symbol('ARTICLE'),
          serviceDTM = Symbol('SERVICE_DTM'),
          minDTM = Symbol('MIN_DTM'),
          serverDTM = Symbol('SERVER_DTM'),
          updateDTM = Symbol('UPDATE_DTM'),
          progressDTM = Symbol('PROGRESS_DTM');

    class myData {
      constructor() {
        this[keyword] = [];
        this[article] = [];
        this[serviceDTM];
        this[minDTM];
        this[serverDTM];
        this[updateDTM];
        this[progressDTM];
      }

      get keyword() {
        return this[keyword];
      }

      set keyword(v) {
        return this[keyword].push(v);
      }

      get article() {
        return this[article];
      }

      set article(v) {
        return this[article].push(v);
      }

      get serviceDTM() {
        return this[serviceDTM]
      }

      set serviceDTM(t){
        this[serviceDTM] = t;
      }

      get minDTM() {
        return this[minDTM];
      }

      set minDTM(t) {
        this[minDTM] = t;
      }

      get serverDTM() {
        return this[serverDTM];
      }

      set serverDTM(t) {
        this[serverDTM] = t;
      }

      get updateDTM() {
        return this[updateDTM];
      }

      set updateDTM(t) {
        this[updateDTM] = t;
      }

      get progressDTM() {
        return this[progressDTM];
      }

      set progressDTM(t) {
        this[progressDTM] = t;
      }

      resetKeyword() {
        this[keyword] = [];
      }

      resetArticle() {
        this[article] = [];
      }

      dataLoadEvent(path, callback) {
        /*var type;

        if (path.indexOf('keyword_sq') !== -1) {
          type = 'articleList';
        } else {
          type = path.split('=')[1] || '2020-08-21 12:00:00';
        }*/

        $.ajax({
          type: 'GET',
          url: path,
          dataType: 'json',
          processData: false
        })
        // .then(function(data) {
        //   return data[type];
        // })
        .done(function(data) {
          callback(data);
        })
        .fail(function() {
          console.log('fail');
        });

        /*plast.$dataloader.AJAX(plast.$dataloader.ARG.url(path).onComplete((res) => {
          if (res.status === 200) {
            try {
              callback(plast.$dataloader.parseJson(res.responseText));
            } catch(e) {
              console.log(e);
            }
          } else {
            console.log('data error');
          }
        }));*/
      }
    }

    return myData;
  })();

  const xhrData = new myData();

  /** 
   * * Chceck initial 
   */
  (function(caller) {
    /** 
     * * 페이지 진입 방식 체크
     * 
     * * Performance Types (window.performance.navigation.type)
     * @TYPE_NAVIGATE = 0
     * @TYPE_RELOAD = 1
     * @TYPE_BACK_FORWARD = 2
     * @TYPE_RESERVED = 255
     */

    window.qs = ((searches, reservedQuery) => {
      var isReserved = reservedQuery.every((query) => searches.indexOf(query) !== -1);

      if (!isReserved) return null;
      else return searches.substr(1).split('&').reduce((pv, cv) => Object.assign(pv, { [cv.split('=')[0]]: decodeURIComponent(cv.split('=')[1])}), {});
    })(window.location.search, ['keyword_dtm', 'keyword_sq', 'index']);

    let initPath = KEYWORD_URL;
    if (history.state !== null && history.state.name === 'Article') {
      initPath = KEYWORD_URL + '?service_dtm='+ history.state.keyword_dtm;
    } else if(qs && qs.hasOwnProperty('keyword_dtm')) {
      initPath = KEYWORD_URL + '?service_dtm='+ qs.keyword_dtm;
    }

    caller.dataLoadEvent((initPath), (res) => {
      caller.minDTM = utils.dateFormat('2020-08-20 09:00:00');
      caller.serverDTM = utils.dateFormat(res.server_dtm);
      caller.updateDTM = utils.dateFormat(res.update_dtm);
      caller.serviceDTM = utils.dateFormat(res.service_dtm);
      caller.progressDTM = utils.dateFormat(qs !== null ? qs.keyword_dtm : res.server_dtm);

      for (let key in res.data) caller.keyword = res.data[key];
      if(qs){
        xhrData.progressDTM = utils.dateFormat(res.service_dtm);
      }
      newsEdge.init(caller);
    });
  })(xhrData);


  /**
   * * 공유하기
   */
  function toggleParentActive(e) {
    return e.target.parentNode.classList.toggle('active');
  }

  document.querySelector('.btnProgress').addEventListener('click', toggleParentActive);

  function toggleTragetActive(target) {
    return document.querySelector(target).classList.toggle('active');
  }

  [document.querySelector('.btnShare'), document.querySelector('.btnClosePopup')].forEach(function(target) {
    target.addEventListener('click', function() {
      var target = '.layerPopup.share';

      return toggleTragetActive(target);
    });
  });
});
