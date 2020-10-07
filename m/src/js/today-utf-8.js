/**
 * * BFCache(webkit - Page Cache) Issue (page reload)
 */
window.addEventListener('pageshow', function(e) {
  //if (e.persisted && history.state !== null && history.state.name === 'Article') window.location.reload();
  if(getUrlQuery && getUrlQuery.target === 'MAIN' && getUrlQuery.v === 'nate_app') {
    if(sessionStorage.getItem('TODAY_CARD') === 'true') {
      sessionStorage.setItem('TODAY_CARD', 'false');
      window.location.reload();
    }


    /*let data = JSON.parse(sessionStorage.getItem('TD')),
        { keyword_dtm, keyword_sq, target } = getUrlQuery;
    data['target'] = target;
    data['keyword_dtm'] = keyword_dtm;
    data['keyword_sq'] = keyword_sq;*/
    //loadToday();
  }

});


/**
 * * Moment 글로벌 설정
 */
moment.locale('ko');
moment.updateLocale('ko', {relativeTime : { h: `${decodeURI('1%EC%8B%9C%EA%B0%84')}` } });


/**
 * * Gsap 플러그인 등록 (필수)
 */
gsap.registerPlugin(Draggable, DrawSVGPlugin, MotionPathPlugin, ScrollToPlugin, InertiaPlugin);


//
let getUrlQuery = ((searches, reservedQuery) => {
  var isReserved = reservedQuery.every((query) => searches.indexOf(query) !== -1);

  if (!isReserved) return null;
  else return searches.substr(1).split('$').reduce((pv, cv) => Object.assign(pv, { [cv.split('=')[0]]: decodeURIComponent(cv.split('=')[1])}), {});
})(window.location.hash, ['keyword_dtm', 'keyword_sq', 'index', 'target','v']);
if(getUrlQuery && getUrlQuery.target === 'MAIN') {
  getUrlQuery['redirect'] = '//ndev.nate.com'
}


/**
 * * newsEdge
 */
var newsEdge = (function() {
  var header = document.getElementById('header');
  var bubblesID = '#newsEdgeBubbles';
  var progressID = '#newsEdgeProgress';
  var articleID = '#todayListWrap';
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
      // 버블 클릭 상태 체크
      isClick: false,
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
    var bubblesSVG = $(bubblesID);
    var todayListWrap = $(articleID);
    var todayList;
    var todayListTitle;
    var todayListItem;
    var todayListItemCounts;
    var todayListItemWrap;
    var todayListItemMore;
    var todayListEffect;
    var todayListDrag;
    var btnTodayClose;

    // 클릭된 버블
    var bubbleGroup;
    // 클릭된 버블 이외 버블
    var bubbleGroupSiblings;
    //클릭된 버블 내부 circle
    var bubbleGroupCircle;
    //클릭된 버블 내부 circle
    var bubbleGroupText;

    /**
     * * 실행중인 인터렉션 삭제
     */
    function killTweens() {
      gsap.killTweensOf(header);
      gsap.killTweensOf(bubbleGroupSiblings);
      gsap.killTweensOf(bubbleGroupCircle);
      gsap.killTweensOf(bubbleGroupText);
      gsap.killTweensOf(btnTodayClose);
      gsap.killTweensOf(todayListTitle);
      gsap.killTweensOf(todayListItem);
    }

    /**
     * * 메인 버블 => 기사 목록 애니메이션
     */
    function popUp(immediate) {
      if (!!immediate) killTweens();
      var duration = !!immediate ? 0 : .3;

      gsap.to(window, duration, {
        scrollTo : 0,
        ease : 'none',
        onComplete: function () {
          gsap.set('body', { overflow: 'hidden', position: 'fixed', left: 0, top: 0, right: 0, bottom: 0, background: utils.RGBAToRGB(_data.fill) });
          gsap.set(bubblesSVG, { zIndex: 100 });

          todayListWrap.addClass((_data.index < 5) ? 'highScore' : 'lowScore');
        }
      });

      bubbleGroupSiblings.forEach(self => gsap.to(self.querySelector('.bubble'), duration / 2, { scale: .1, autoAlpha: 0, transformOrigin: '50% 50%', ease: 'power3.inOut' }));

      gsap.to(bubbleGroupText, duration, {
        autoAlpha : 0,
        ease: 'power3.inOut',
        onComplete: function() {
          gsap.to(bubbleGroupCircle, duration, {
            scale: !!immediate ? 1 : .8,
            transformOrigin: '50% 50%',
            fill: utils.RGBAToRGB(_data.fill),
            ease: 'power3.inOut',
            onComplete: function () {
              gsap.to(header, duration / 2, { autoAlpha: 0 });
              gsap.to(bubbleGroupCircle, duration, {
                scale: 20,
                ease: 'power3.inOut',
                onComplete: function() {
                  gsap.set(todayListWrap, { display: 'block' });

                  gsap.to(btnTodayClose, duration, { autoAlpha: 1, delay: duration });
                  gsap.fromTo(todayListTitle, duration, { autoAlpha: 0, x: -100, }, { autoAlpha: 1, x: 0, delay: duration * 1.5 });
                  gsap.to(todayListItem, duration * 2, { autoAlpha: 1, x: 0, delay: duration * 2 });
                }
              });
            }
          });
        }
      });
    }

    /**
     * * 기사 목록 => 메인 버블 애니메이션
     */
    function popOut(immediate) {
      if (!!immediate) killTweens();
      var duration = !!immediate ? 0 : .3;

      //if (!!history.state) history.pushState(null, null, window.location.pathname);

      gsap.set('body', { clearProps: 'all' });
      gsap.to([btnTodayClose, todayListTitle, todayListItem], duration, { autoAlpha: 0, ease: 'power3.inOut',
        onComplete: function() {
          gsap.set(todayListWrap, { display: 'none' });
          gsap.set([todayListItem, todayListItemWrap, todayListItemWrap.children()], { clearProps: 'all' });

          gsap.to(bubbleGroupCircle, duration * 2, {
            scale: 1,
            ease: 'power3.inOut',
            onComplete: function () {
              State.isPopPop = false;
              State.isClick = false;

              gsap.set(bubbleGroupText, { autoAlpha : 1 });
              gsap.set(bubbleGroupCircle, { clearProps: 'all' });
              gsap.set(bubblesSVG, { clearProps: 'all' });

              todayListWrap.removeClass('lowScore highScore');
              bubbleGroupSiblings.forEach(self => gsap.to(self.querySelector('.bubble'), duration / 2, { scale: 1, autoAlpha: 1, ease: 'power2.inOut' }));
              //history.pushState(null, null, window.location.pathname);
            }
          });

          gsap.to(header, duration * 2, { autoAlpha: 1, ease: 'power3.inOut' });
        }
      });
    }

    /**
     * * 리스트 생성
     */
    function listRender(callBack) {
      btnTodayClose = $('<button type="button" class="btnTodayClose">close</button>');

      todayList = $('<div class="todayList" />');
      todayListTitle = $('<h3 class="todayListTitle" />');
      todayListItem = $('<div class="todayListItem" />');
      todayListItemCounts = $('<div class="todayListItemCounts">');
      todayListItemWrap = $('<ul class="listItemWrap" />');

      todayList.append(btnTodayClose);
      todayList.append(todayListTitle.html(_data.keyword_service.split('<br />').map((self, i) => i !== 0 && i % 2 === 1 ? self + '<br />' : self + ' ' )));

      todayListItemCounts.append(_data.article.map((self, i, data) => {
        if (i < data.length - 1) return `<span class="count-${i}"></span>`;
        else return `<span class="count-${i}"></span><span class="count-more"></span>`;
      }));

      todayListItemWrap.append(_data.article.map((self, i) => {
        var item = '';

        var insertDTM = utils.isToday(_data.serverDTM, utils.dateFormat(self.insert_dtm)) ? moment(utils.dateFormat(self.insert_dtm)).startOf('min').fromNow() : self.insert_dtm;
        var emptyImgURL =  (!!self.img_url)  ? '' : ' empty';

        item += '<li class="item" role="link" data-link="'+ self.link_url +'" onclick="olapclick(\'TOR0' + (i + 1) + '\')">';
        item += '<div class="face frontFace">';
        item += '<h5 class="subject">'+ self.artc_title +'</h5>';
        item += '<div class="info">';
        item += '<div class="state"><span class="provider">'+ self.cp_nm +'</span><span class="time">'+ insertDTM +'</span></div>';
        item += '<div class="thumb-nail ' + emptyImgURL + '"><img src="'+ self.img_url +'" alt=""></div>';
        item += '</div></div>';
        item += `<div class="face backFace"></div>`;
        item += '</li>';

        return item;
      }));

      todayListItemMore = $(`<li class="more" role="link" data-link="${_data.refs.link}" onclick="olapclick('TOM00');"><div class="face frontFace"><div class="innerWrap">${decodeURI('%EB%B9%84%EC%8A%B7%ED%95%9C %EA%B8%B0%EC%82%AC')}<div><span class="size">${utils.withCommas(_data.refs.cnt)}</span><span>${decodeURI('%EA%B0%9C')}</span></div>${decodeURI('%EB%8D%94 %EB%B3%B4%EA%B8%B0%0D%0A')}</div></div><div class="face backFace"></div></li>`);
      todayListEffect = $('<div class="todayListEffect"></div>');
      todayListItemWrap.append(todayListItemMore);
      todayListItem.append(todayListItemWrap);
      todayListItem.append(todayListItemCounts);
      todayList.append(todayListItem);
      todayListWrap.append(todayList);
      todayListWrap.append(todayListEffect);

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
      // 카드 옵션
      var cards = {
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
        move: 335 / 2, // 카드 이동 가능 범위 (px)
        movePercent: 0, // 카드 이동 범위 (%)
        moveLimit: .10, // 카드 애니메이션 제한 거리 (%)
        minScale: .92 // 카드 스케일 최소값
      };

      /**
       * * 카드 포지션 설정 후 히스토리 상태에 따른 위치 변경
       */
      (function() {
        // 카드 포지션 설정
        for (var i = 0; i < cards.leng; i ++) {
          cards.offsets.push(-((cards.width + cards.margin) * i));
        }

        if(getUrlQuery && getUrlQuery.target === 'MAIN' && getUrlQuery.v === 'nate_app') {
          cards.prevIndex = cards.activeIndex = Number(sessionStorage.getItem('TODAY'))
        } else if (history.state && history.state.listIndex !== undefined) {
          cards.prevIndex = cards.activeIndex = history.state.listIndex;
        }

        todayListItemWrap.children('.item').each(function(j, self) {
          if (j < cards.activeIndex && j < 4) gsap.set(self, { autoAlpha: 0, x: cards.width / 2, scale: .92 });
        });

        gsap.to(todayListItemWrap, cards.duration, { x: cards.offsets[cards.activeIndex]});


        todayListItemCounts.children().removeClass('active');
        todayListItemCounts.children().eq(cards.activeIndex).addClass('active');
      })();

      todayListDrag = Draggable.create(todayListItemWrap, {
        type: 'x',
        throwProps: false,
        edgeResistance: .85,
        onDrag: onDragAndThrowUpdateEvent,
        onDragAndThrowUpdate: onDragAndThrowUpdateEvent,
        onDragStart: onDragStartEvent,
        onDragEnd: onDragEndEvent,
      });

      function onDragStartEvent() {
        cards.initX = this.x;
      }

      function onDragAndThrowUpdateEvent() {
        cards.distance = this.x - cards.initX;
        cards.x = cards.initX + cards.distance;
        cards.direction = cards.distance > -1 ? 'right' : 'left'; // 터치 방향
        cards.movePercent = Math.abs(cards.distance / cards.width); // 이동한 범위 (%)

        switch(cards.direction) {
          case 'left' :
            var ASP = cards.movePercent <= cards.moveLimit; // 모션 시작 지점
            var LP = cards.movePercent - cards.moveLimit; // 왼쪽 이동 범위

            if (cards.activeIndex < cards.leng - 2) {
              gsap.set(todayListItemWrap.children('.item').eq(cards.activeIndex), {
                autoAlpha: ASP ? 1 : 1 - (LP + cards.moveLimit * 1.1),
                x: ASP ? 0 : (0 + (LP * 200) <= cards.move) ? (0 + LP * 200) : cards.move, // 200 = 2배
                scale: ASP ? 1 : (1 - LP) >= cards.minScale ? (1 - LP) : cards.minScale
              });
            }
            break;
          case 'right':
            var ASP = cards.movePercent >= (cards.moveLimit / 2); // 모션 시작 지점
            var RP = cards.movePercent - cards.moveLimit; // 오른쪽 이동 범위

            if (cards.activeIndex >= 0 && cards.activeIndex !== 5 && cards.activeIndex - 1 !== -1) {
              gsap.set(todayListItemWrap.children('.item').eq(cards.activeIndex - 1), {
                autoAlpha: ASP ? 0 + (RP + cards.moveLimit * 1.1) : 0,
                x: ASP ? ( cards.move - (RP * 200) >= 0 ? (cards.move - (RP * 200)) : 0 ): cards.move, // 200 = 2배
                scale: ASP ? ((0 + RP + cards.moveLimit * 2) <= cards.minScale ? cards.minScale : (0 + RP + cards.moveLimit * 2) <= 1 ? (0 + RP + cards.moveLimit * 2) : 1) : cards.minScale
              });
            }
            break;
        }
      }

      function onDragEndEvent() {
        switch(cards.direction) {
          case 'left':
            if (Math.abs(cards.distance) > (cards.minDistance * (cards.width / 100))) {
              cards.prevIndex = cards.activeIndex;
              cards.activeIndex = Math.min(cards.activeIndex + 1, cards.leng - 1);

              if(getUrlQuery && getUrlQuery.target === 'MAIN' && getUrlQuery.v === 'nate_app') {
                sessionStorage.setItem('TODAY', cards.activeIndex)
              } else {
                history.replaceState({...history.state, listIndex : cards.activeIndex}, decodeURI('%EB%84%A4%EC%9D%B4%ED%8A%B8%EB%89%B4%EC%8A%A4%0D%0A'));
              }


              if (cards.activeIndex < cards.leng - 1 && cards.activeIndex !== cards.leng - 1) {
                gsap.to(todayListItemWrap.children('.item').eq(cards.activeIndex - 1), cards.duration, { autoAlpha: 0, x: cards.move, scale: cards.minScale });
              }
            }
            break;
          case 'right':
            if (Math.abs(cards.distance) > (cards.minDistance * (cards.width / 100))) {
              cards.prevIndex = cards.activeIndex;
              cards.activeIndex = Math.max(0, cards.activeIndex - 1);

              if(getUrlQuery && getUrlQuery.target === 'MAIN' && getUrlQuery.v === 'nate_app') {
                sessionStorage.setItem('TODAY', cards.activeIndex)
              } else {
                history.replaceState({...history.state, listIndex : cards.activeIndex}, decodeURI('%EB%84%A4%EC%9D%B4%ED%8A%B8%EB%89%B4%EC%8A%A4%0D%0A'));
              }

              if (cards.activeIndex >= 0 && cards.activeIndex !== 5) {
                gsap.to(todayListItemWrap.children('.item').eq(cards.activeIndex), cards.duration, { autoAlpha: 1, x: 0, scale: 1 });
              }
            }
            break;
        }

        todayListItemCounts.children().removeClass('active');
        todayListItemCounts.children().eq(cards.activeIndex).addClass('active');

        if (cards.activeIndex >= 0 && cards.activeIndex !== 5 && cards.activeIndex - 1 !== -1) {
          gsap.to(todayListItemWrap.children('.item').eq(cards.activeIndex - 1), cards.duration, { autoAlpha: 0 });
        }

        gsap.to(todayListItemWrap, cards.duration, { x: cards.offsets[cards.activeIndex]});
      }

      todayListWrap.on('click.PopPop', '.listItemWrap li', function() {
        var $this = $(this);

        $this.addClass('active');

        /**
         * * Whiteboard style
         */
        gsap.delayedCall(cards.duration / 2, function() {
          gsap.set(todayListEffect, {
            x: $this.offset().left,
            y: $this.offset().top,
            width: $this.width(),
            height: $this.height(),
            borderRadius: (!$this.hasClass('more')) ? $this.width() * 0.05970149253731343 : '100%',
            autoAlpha : 1,
            ease: 'power4.inOut',
            onComplete: function () {
              gsap.delayedCall(cards.duration / 2, function () {
                gsap.to(todayListEffect, cards.duration, {
                  scale: (!$this.hasClass('more')) ? 25 : 50,
                  ease: 'power4.inOut',
                  onComplete: function () {
                    gsap.set('body', { clearProps: 'background' });
                    State.isPopPop = false;
                    sessionStorage.setItem('TODAY_CARD', 'true');
                    return window.location = $this.attr('data-link');
                  }
                });
              });
            }
          });
        });
      });

      todayListWrap.find('.btnTodayClose').on('click.PopPop', function() {

        if(getUrlQuery && getUrlQuery.target === 'MAIN') {
          //window.location.href = getUrlQuery.redirect;
          history.back();
        } else {
          if (gsap.isTweening(todayListItem)) return;
          articlesController.popOut();
          history.pushState(null, null)
        }
      });
    }

    return {
      setClickedBubble: function() {
        bubbleGroup = this;
        bubbleGroupSiblings = (t => [...t.parentNode.childNodes].filter(s => s !== t))(this);
        bubbleGroupCircle = this.querySelector('circle');
        bubbleGroupText = this.querySelector('text');
      },
      setListRefData: function (data) {
        _data = data;
        return data
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
    var bubbles = {
      selection: d3.select(bubblesID),
      options: {
        width: calcPresume(),
        height: calcPresume(),
        gap: 4,
        duration: 600,
        velocityDecay: .35,
        forceStrength: .003,
        percent: [48, 32, 28.8, 26.6, 24, 20, 20, 20, 20, 20].map((self, i) => i < 4 ? (self / 1.1) : self),
        sizes: [6.66, 5.06, 4.26, 4, 3.73, 3.2, 3.2, 3.2, 3.2, 3.2].map((self, i) => i < 4 ? (self / 1.1) : self),
        color: ['rgba(21, 45, 255, .7)', 'rgba(47, 134, 255, .7)', 'rgba(20, 187, 190, .7)', 'rgba(86, 55, 255, .7)', 'rgba(141, 201, 29, .7)', 'rgba(212, 216, 220, .7)', 'rgba(212, 216, 220, .7)', 'rgba(212, 216, 220, .7)', 'rgba(212, 216, 220, .7)', 'rgba(212, 216, 220, .7)'],
        ease: [d3.easeBackOut.overshoot(1.5), d3.easeQuadOut],
      },
      prevSq: null,
      prevPos: [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
      data: null
    }

    /**
     * * 옵션값 선 계산
     */
    function calcPresume() {
      var headerHeight = header.getBoundingClientRect().height;
      var gap = 58; // 375 미만 브라우저에서 버블 컨테이너 viewbox 제어용 수치 (0 => 58로 변경됨)
      var areaHeight = headerHeight + gap + window.innerWidth;

      if (orientation) { // 세로모드
        return (areaHeight > window.innerHeight) ? window.innerHeight - (headerHeight + gap) : Math.min(Math.min(window.innerWidth, window.innerHeight), 650);
      } else { // 가로모드
        return Math.min(Math.min(window.innerWidth, window.innerHeight), 650);
      }
    }

    /**
     * * 버블 위치 계산
     */
    var calcBubblesPoints = (function() {
      var options = bubbles.options;
      var forceXY = [
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
          }],
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
          }]
      ];

      return function(data) {
        var positions = (orientation) ? utils.shuffleArray(forceXY[0]) : utils.shuffleArray(forceXY[1]);
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
            if (!State.isClick) State.isClick = true;
            else return;

            /**
             * * Statistics (PV)
             */
            if (typeof draw_ndr === 'function') {
              var sRef2 = '';

              try {
                draw_mndr('m_ndr.nate.com/news/today/keyword'+(d.index + 1), gUserJS_sAppFrom, '', gUserJS_sAppSkai, gUserJS_sAppNdruk, sRef2);
              } catch(e) {
                draw_mndr('m_ndr.nate.com/news/today/keyword'+(d.index + 1), '', '', '', '', sRef2);
              }
            }
            /**
             * * Statistics (Click)
             */
            if (typeof olapclick === 'function') {
              olapclick(`TOK${(d.index + 1 < 10) ? '0' + (d.index + 1) : (d.index + 1)}`);
            }


            callArticle({
              selection : this,
              keyword_service: d.keyword_service,
              keyword_dtm: d.keyword_dtm,
              keyword_sq: d.keyword_sq,
              index: d.index
            }, false);
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
                  return '-.3em';
                case 3:
                  return '-.9em';
                default:
                  return 0;
              }
            })
            .attr('dy', function (d, i) {
              return i === 0 ? 0 : (i * 1.3) + 'em';
            })
            .html(function (title) {
              return title;
            });
      }

      function updateT(selection) {
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
                  return '-.3em';
                case 3:
                  return '-.9em';
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
              .force('x', d3.forceX(options.width / 2).strength((orientation) ? options.forceStrength * 12 : options.forceStrength * 4))
              .force('y', d3.forceY(options.height / 2).strength((orientation) ? options.forceStrength * 12 : options.forceStrength * 4))
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
              .force('x', d3.forceX((options.width / 2)).strength(options.forceStrength * 12))
              .force('y', d3.forceY((options.height / 2)).strength(options.forceStrength * 12))
              .force('charge', d3.forceManyBody().strength(options.forceStrength))
              .force('collide', d3.forceCollide().radius(function(d) { return d.radius - ((options.gap + 150) * utils.getRandomIntInclusive(0, 0, true)); }).strength(options.forceStrength * 60))
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
              .force('x', d3.forceX(options.width / 2).strength(options.forceStrength * 12))
              .force('y', d3.forceY(options.height / 2).strength(options.forceStrength * 12))
              .force('charge', d3.forceManyBody())
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
      resize: function() {
        bubbles.options.width = calcPresume();
        bubbles.options.height = calcPresume();

        bubbles.data = calcBubblesData(bubbles.data);
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
        });
      }
    }
  })();


  /**
   * * 프로그레스 컨트롤러 제어
   */
  var setProgressWidth = (254 / 375);
  var setProgressHeight = (48 / 375);
  var setKnobRadius = (24 / 375);

  progressBarController = (function controlProgressBar() {
    // 프로그레스 컨트롤러 옵션
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
      return Math.min(window.innerWidth, 375) * percent;
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
            back: 'M0 '+ (d.bar.height / 2) +' l '+ (d.bar.width * timestamp.maxLimit) +' '+ .01,
            backboard : (function() {
              var time = d.bar.width / (d.height * 0.08333333333333333);
              var pathResult = '';

              for (var i = 0; i < time; i++) {
                pathResult += 'M '+ (d.bar.height * 0.08333333333333333) * i +' '+ (d.bar.height * 0.4166666666666667) +' H '+ (d.bar.height * 0.08333333333333333) * i +' V '+ ((d.bar.height * 0.4166666666666667) + (d.bar.height * 0.16666666666666666));
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
                    .attr('id', 'filter2Path');


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
        var group = selection.select('.timeGroup');
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
              return d.height * 0.20833333333333334;
            })
            .attr('stroke', '#e6e8ea');

        pathFront
            .attr('d', function(d) { return d.path.front; })
            .attr('stroke-width', function(d) {
              return d.height * 0.2916666666666667;
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
              return d.width * 0.36;
            })
            .attr('height', function(d) {
              return d.height * 0.8333333333333334;
            })
            .attr('viebox',function(d){
              return [0, 0, d.width * 0.36, d.height * 0.8333333333333334]
            });

        tooltipRect
            .attr('width', function(d) {
              return d.width * 0.36;
            })
            .attr('height', function(d) {
              return d.height * 0.8333333333333334;
            })
            .attr('x', function(d) {
              return (d.percent * 100 > 84) ? -(((d.width * .36) / 2) - (84 - d.percent * 100)) : -((d.width * .36) / 2);
            })
            .attr('y', function(d) {
              return -(d.height + d.knob.r + 4);
            })
            .attr('rx', function(d) {
              return d.knob.r * 2;
            });

        tooltipPath
            .attr('transform', function(d) {
              return 'translate('+ -(d.knob.r + 2) +' '+ -(d.knob.r * 2) +')';
            })
            .attr('d', function(d) {
              return 'M 19.285 0 L 15 8.235 10.714 0 h 8.571z';
            });

        tooltipText
            .attr('alignment-baseline', 'middle')
            .attr('text-anchor', 'middle')
            .attr('x', function (d) {
              return (84 < d.percent * 100) ? (84 - d.percent * 100) : 0;
            })
            .attr('y', function(d) {
              return -((d.knob.r * 3) + 2);
            })
            .attr('font-size', function(d){
              return d.width * 0.088 +'px';
            });

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
        var group = selection.select('.timeGroup');
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
              return d.height * 0.20833333333333334;
            });

        pathFront
            .attr('d', function(d) { return d.path.front; })
            .attr('stroke-width', function(d) {
              return d.height * .2916666666666667;
            });

        knob
            .attr('r', function(d) { return d.knob.r; });

        tooltip
            .attr('width', function(d) {
              return d.width * .36;
            })
            .attr('height', function(d) {
              return d.height * .8333333333333334;
            })
            .attr('viebox', function(d) {
              return [0, 0, d.width * .36, d.height * .8333333333333334];
            });

        tooltipRect
            .attr('width', function(d) {
              return d.width * .36;
            })
            .attr('height', function(d) {
              return d.height * .8333333333333334;
            })
            .attr('x', function(d) {
              return (d.percent * 100 > 84) ? -(((d.width * .36) / 2) - (84 - d.percent * 100)) : -((d.width * .36) / 2);
            })
            .attr('y', function(d) {
              return -(d.height + d.knob.r + 4);
            })
            .attr('rx', function(d) {
              return d.knob.r * 2;
            });


        tooltipPath
            .attr('transform', function(d) {
              return 'translate('+ 0 +' '+ -(d.knob.r * 2 + 2) +')';
            })
            .attr('d', function(d) {
              return 'M '+ (d.knob.r / 2) +' 0 l '+ -(d.knob.r / 2) + ' '+ d.knob.r + ' '+ -(d.knob.r / 2) + ' '+ -(d.knob.r) + ' h '+ d.knob.r +'z';
            });

        tooltipText
            .attr('x', function (d) {
              return (84 < d.percent * 100) ? (84 - d.percent * 100) : 0;
            })
            .attr('y', function(d) {
              return -((d.knob.r * 3) + 2);
            })
            .attr('font-size', function(d){
              return d.width * 0.088 +'px';
            });


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
            return Math.round(y);
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
            scale: 1,
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
         * * Statistics (Click)
         */
        if (typeof olapclick === 'function') {
          olapclick('TOT00');
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
      resize: function() {
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
      var minDateMilli = moment(timeline.minDTM).valueOf();
      var maxDateMilli = moment(timeline.serverDTM).valueOf();

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
          target.addEventListener('click', function(e) {
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
   * * 리사이즈 제어
   */
  function controlResize() {
    var currentWidth = window.innerWidth;
    var defaultRadio = window.devicePixelRatio;

    var newsEdgeResize = utils.debounce(function(e) {
      if (currentWidth !== window.innerWidth && defaultRadio === window.devicePixelRatio) {
        orientation = window.matchMedia('(orientation: portrait)').matches;
        currentWidth = window.innerWidth;

        bubblesController.resize();
        progressBarController.resize();
      }
    }, 30);

    window.addEventListener('resize', newsEdgeResize);
  }


  /**
   * * 히스토리 상태 제어
   */
  function controlHistory() {
    // 메인/속보/공유하기 관련 쿼리 존재 유/무 체크
    // 쿼리 (init) 체크
    if (history.state === null && getUrlQuery !== null) {
      callArticle({
        selection : document.querySelector('.bubbleGroup[data-importance="'+ getUrlQuery.index +'"]'),
        keyword_service: caller.keyword[parseInt(getUrlQuery.index, 10)].keyword_service,
        keyword_dtm: getUrlQuery.keyword_dtm,
        keyword_sq: getUrlQuery.keyword_sq,
        index: parseInt(getUrlQuery.index, 10)
      }, true);
    }

    if (history.state !== null && history.state.name === 'Article') {
      callArticle(history.state, true);
    }

    // 히스토리 (Back/Forward) 체크
    window.addEventListener('popstate', function() {
      // 카드 돌아가면서 커지는 흰판 제거(ios히스토리 백시 간헐적 버그 발생)
      $('.todayListEffect').removeAttr('style');
      $('.listItemWrap .item, .listItemWrap .more').removeClass('active');
      (history.state !== null && history.state.name === 'LayerShare') ? layerSharePopUp(true) : layerSharePopUp(false);
      (history.state !== null && history.state.name === 'Article') ? callArticle(history.state, true) : (State.isPopPop) ? (_=>{
        articlesController.popOut(true);
      })() : null;
    });
  }

  /**
   * * 공유하기 (히스토리)
   */
  function layerSharePopUp(state) {
    var layerShare = document.querySelector('.layerPopup.share');
    return state ? layerShare.classList.add('active') : layerShare.classList.remove('active');
  }

  /**
   * * 기사 목록 (히스토리 / 쿼리)
   *
   * @param {object} d - 히스토리/쿼리 데이터
   * @param {boolean} immediate - 애니메이션 없이 즉시실행
   *
   */
  function callArticle(d, immediate) {
    const fillColor = ['rgba(21, 45, 255, .7)', 'rgba(47, 134, 255, .7)', 'rgba(20, 187, 190, .7)', 'rgba(86, 55, 255, .7)', 'rgba(141, 201, 29, .7)', 'rgba(212, 216, 220, .7)', 'rgba(212, 216, 220, .7)', 'rgba(212, 216, 220, .7)', 'rgba(212, 216, 220, .7)', 'rgba(212, 216, 220, .7)'];
    const setVal = (d, res) => {
      // 히스토리 저장
      const Datum = {
        name: 'Article',
        serverDTM: d.keyword_dtm,
        article: caller.article,
        keyword_service: (_ => {
          let searchString = res.search_link;
          if (searchString && searchString.indexOf('q=') >= 0) {
            return searchString.split('q=').pop();
          } else {
            return d.keyword_service
          }
        })(),
        keyword_dtm: d.keyword_dtm,
        keyword_sq: d.keyword_sq,
        index: d.index,
        listIndex: (d.listIndex !== undefined) ? d.listIndex : 0,
        refs: {
          link: res.search_link,
          cnt: res.search_cnt
        },
        fill: fillColor[d.index]
      };

      if(getUrlQuery && getUrlQuery.target === 'MAIN' && getUrlQuery.v === 'nate_app') {
        // App일때 historyAPI사용하지 않음 - 웹뷰에서 관리됨
        Datum.listIndex = sessionStorage.getItem('TODAY');
        sessionStorage.setItem('TD', JSON.stringify(Datum));
      } else {
        if (history.state && history.state.name === 'Article') {
          history.replaceState(Datum, decodeURI('%EB%84%A4%EC%9D%B4%ED%8A%B8%EB%89%B4%EC%8A%A4%0D%0A'));
        } else {
          history.pushState(Datum, decodeURI('%EB%84%A4%EC%9D%B4%ED%8A%B8%EB%89%B4%EC%8A%A4%0D%0A'));
        }
      }

      return Datum;
    }

    if (d.target === 'MAIN' && !State.isPopPop) {
      caller = d.xhrData;
      $('#header').hide();
      $('body, #todayListWrap').css({
        display: 'block',
        overflow: 'hidden',
        background: utils.RGBAToRGB(fillColor[getUrlQuery.index])
      }).addClass(() => getUrlQuery.index > 4 ? 'lowScore' : 'highScore');

      /*
      * A > B페이지로 이동 후 백버튼 눌러 > A로 갈때
      * ios에서 popstate호출, pc호출 안됨
      * A>B>A로 온후 히스토리 백 눌렀을때 pc/ios 둘다 popstate호출
      * */


      window.addEventListener('popstate', function () {
        // 카드 돌아가면서 커지는 흰판 제거(ios히스토리 백시 간헐적 버그 발생)
        $('.todayListEffect').removeAttr('style');
        $('.listItemWrap .item, .listItemWrap .more').removeClass('active');

        if(getUrlQuery && getUrlQuery.target === 'MAIN' && getUrlQuery.v === 'nate_app') {
          console.log('app')
        } else {
          (history.state !== null && history.state.name === 'Article') ? callArticle(history.state, true) : window.close();
        }
      });
      caller.dataLoadEvent(`${ARTICLE_URL}?keyword_dtm=${d.keyword_dtm}&keyword_sq=${d.keyword_sq}`, (res) => {
        for (let key in res.data) caller.article = res.data[key];

        articlesController.setListRefData(setVal(d, res));
        articlesController.listRender(() => {
          $('.todayList .btnTodayClose, .todayListTitle, .todayListItem').css({
            opacity: 1,
            visibility: 'inherit',
            transform: 'translate(0px, 0px)'
          });
          articlesController.listRefEvent();
        });
      });
    } else {
      if (!State.isPopPop) {
        const selection = document.querySelector('.bubbleGroup[data-importance="' + d.index + '"]');
        caller.resetArticle();
        caller.dataLoadEvent(`${ARTICLE_URL}?keyword_dtm=${d.keyword_dtm}&keyword_sq=${d.keyword_sq}`, (res) => {
          for (let key in res.data) caller.article = res.data[key];
          // 히스토리 정보
          // if (history.state !== null && history.state.name === 'Article') {
          //   history.replaceState(Datum, decodeURI('%EB%84%A4%EC%9D%B4%ED%8A%B8%EB%89%B4%EC%8A%A4%0D%0A'));
          // } else {
          //   history.pushState(Datum, decodeURI('%EB%84%A4%EC%9D%B4%ED%8A%B8%EB%89%B4%EC%8A%A4%0D%0A'));
          // }

          // 카드 노출시 url표시
          //let { origin, pathname } = window.location;
          //window.location.replace(`${origin}${pathname}#$keyword_dtm=${d.keyword_dtm}$keyword_sq=${d.keyword_sq}$index=${d.index}$MM=${moment(caller.progressDTM).format('mm')}`);

          articlesController.setClickedBubble.call(selection);
          articlesController.setListRefData(setVal(d, res));

          if (!State.isRender) {
            State.isRender = true;

            articlesController.listRender(() => {
              State.isPopPop = true;
              State.isClick = false;

              articlesController.popUp(immediate);
            });
          } else {
            articlesController.listUpdate(() => {
              State.isPopPop = true;
              State.isClick = false;

              articlesController.popUp(immediate);
            });
          }
          articlesController.listRefEvent();
        });
      }
    }
  }


  /**
   * * Public Controls
   */
  function init(xhrData) {
    caller = xhrData;
    bubblesController.init();
    controlHistory();
    progressBarController.init();
    timeTravelController.init();
    controlResize();
  }

  function update(dateType) {
    if (typeof dateType !== 'string' && dateType.length >= 0) return;

    var timeline = {
      minDTM: utils.dateFormat(caller.minDTM),
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
        if (typeof draw_mndr === 'function') {
          var sRef2 = '';

          try {
            draw_mndr('m_ndr.nate.com/news/date', gUserJS_sAppFrom, '', gUserJS_sAppSkai, gUserJS_sAppNdruk, sRef2);
          } catch (e) {
            draw_mndr('m_ndr.nate.com/news/date', '', '', '', '', sRef2);
          }
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
      });
    });
  }

  return {
    init: function (xhrData) {
      return init(xhrData);
    },
    update: function(dateType) {
      return update(dateType);
    },
    callArticle
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
            /*.then(function(data) {
              return data[type];
            })*/
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
  let xhrData = new myData();
  // 메인에서 진입시 바로 카드뷰 보이게 하기위해
  if(getUrlQuery && getUrlQuery.target === 'MAIN'){
    let { keyword_dtm, keyword_sq, target } = getUrlQuery,
        temp = {
          keyword_dtm,
          keyword_sq,
          index: parseInt(getUrlQuery.index, 10),
          target,
          xhrData
        }

    if(getUrlQuery && getUrlQuery.target === 'MAIN' && getUrlQuery.v === 'nate_app') {
      // App일때 historyAPI사용하지 않음 - 웹뷰에서 관리됨
      temp['listIndex'] = sessionStorage.getItem('TODAY');
    } else {
      if (history.state && history.state.name === 'Article') {
        temp['listIndex'] = history.state.listIndex;
        temp = Object.assign(temp,history.state);
      }
    }


    newsEdge.callArticle(temp);

    /**
     * * Statistics (PV)
     */
    if (typeof draw_ndr === 'function') {
      var sRef2 = '';

      try {
        draw_mndr('m_ndr.nate.com/news/today/keyword'+(temp.index + 1), gUserJS_sAppFrom, '', gUserJS_sAppSkai, gUserJS_sAppNdruk, sRef2);
      } catch(e) {
        draw_mndr('m_ndr.nate.com/news/today/keyword'+(temp.index + 1), '', '', '', '', sRef2);
      }
    }
  } else {
    let initPath = KEYWORD_URL;

    if (history.state !== null && history.state.name === 'Article') {
      initPath = KEYWORD_URL + '?service_dtm='+ history.state.keyword_dtm;
    } else if(getUrlQuery && getUrlQuery.hasOwnProperty('keyword_dtm')) {
      initPath = KEYWORD_URL + '?service_dtm='+ getUrlQuery.keyword_dtm;
    }
    xhrData.dataLoadEvent(initPath, (res) => {
      xhrData.minDTM = utils.dateFormat('2020-08-20 09:00:00');
      xhrData.serverDTM = utils.dateFormat(res.server_dtm);
      xhrData.updateDTM = utils.dateFormat(res.update_dtm);
      xhrData.serviceDTM = utils.dateFormat(res.service_dtm);
      xhrData.progressDTM = utils.dateFormat(history.state !== null && history.state.name === 'Article' ? history.state.progressDTM : res.server_dtm);

      if(getUrlQuery){
        xhrData.progressDTM = utils.dateFormat(moment(res.service_dtm).minute(getUrlQuery.MM).format('YYYY-MM-DD HH:mm:ss'));
      }
      for (let key in res.data) xhrData.keyword = res.data[key];

      newsEdge.init(xhrData);

      if (typeof draw_ndr === 'function') {
        var sRef2 = '';
        try {
          draw_mndr('m_ndr.nate.com/news/today', gUserJS_sAppFrom, '', gUserJS_sAppSkai, gUserJS_sAppNdruk, sRef2);
        } catch (e) {
          draw_mndr('m_ndr.nate.com/news/today', '', '', '', '', sRef2);
        }
      }
    });
  }
  /**
   * * 공유하기
   */
  function toggleParentActive(e) {
    e.preventDefault();
    e.target.parentNode.classList.toggle('active');
  }

  document.querySelector('.btnProgress').addEventListener('click', toggleParentActive);

  [document.querySelector('.btnShare'), document.querySelector('.btnClosePopup')].forEach(function(self) {
    self.addEventListener('click', function() {
      var leyerPopup = document.querySelector('.layerPopup.share');

      leyerPopup.classList.toggle('active');
      leyerPopup.querySelector('.shareLinkUrl').disabled = true;

      //return (leyerPopup.classList.contains('active')) ? history.pushState({name: 'LayerShare'}, 'share') : history.pushState(null, null);
    });
  });
});