/**
 * * BFCache(webkit - Page Cache) Issue (page reload)
 */
window.addEventListener('pageshow', function(e) {
  if (e.persisted && history.state !== null && history.state.name === 'Article') window.location.reload();
});


/**
 * * Moment �۷ι� ����
 */
moment.locale('ko');
moment.updateLocale('ko', {relativeTime : { h: `${decodeURI('1%EC%8B%9C%EA%B0%84')}` } });


/**
 * * Gsap �÷����� ��� (�ʼ�)
 */
gsap.registerPlugin(Draggable, DrawSVGPlugin, MotionPathPlugin, ScrollToPlugin, InertiaPlugin);


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

  // ���� ȭ�� ���� üũ (���θ��/���θ��)
  var orientation = window.matchMedia('(orientation: portrait)').matches;

  // xhrData Reference �Ҵ�
  var caller;

  /**
   * * ���� ����
   */
  const State = (function controlState() {
    return {
      // ���� Ŭ�� ���� üũ
      isClick: false,
      // ���� Ŭ�� �� ������ Ŀ�� ���� üũ
      isPopPop: false,
      // ���� Ŀ�� ���¿��� ����Ʈ�� DOM�� �ݿ��� üũ
      isRender: false
    }
  })();


  /**
   * * ��� ��� ����
   */
  articlesController = (function controlArticle() {
    // ��� ��Ͽ� ���Ǵ� ������ �Ҵ�
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

    // Ŭ���� ����
    var bubbleGroup;
    // Ŭ���� ���� �̿� ����
    var bubbleGroupSiblings;
    //Ŭ���� ���� ���� circle
    var bubbleGroupCircle;
    //Ŭ���� ���� ���� circle
    var bubbleGroupText;

    /**
     * * �������� ���ͷ��� ����
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
     * * ���� ���� => ��� ��� �ִϸ��̼�
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
     * * ��� ��� => ���� ���� �ִϸ��̼�
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
              history.pushState(null, null, window.location.pathname);
            }
          });

          gsap.to(header, duration * 2, { autoAlpha: 1, ease: 'power3.inOut' });
        }
      });
    }

    /**
     * * ����Ʈ ����
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
     * * ����Ʈ ������Ʈ
     */
    function listUpdate(callBack) {
      var item = todayListItemWrap.children();

      todayListTitle.html(_data.keyword_service.split('<br />').map((self, i) => i !== 0 && i % 2 === 1 ? self + '<br />' : self + ' '));

      _data.article.forEach((self, i) => {
        var insertDTM = utils.isToday(_data.serverDTM, utils.dateFormat(self.insert_dtm)) ? moment(utils.dateFormat(self.insert_dtm)).startOf('min').fromNow() : self.insert_dtm;

        item.eq(i).attr('data-link', self.link_url);
        item.eq(i).find('.subject').text(self.artc_title);
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
     * * ��� ��� ���� �̺�Ʈ ����
     */
    function listRefEvent() {
      // ī�� �ɼ�
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
        move: 335 / 2, // ī�� �̵� ���� ���� (px)
        movePercent: 0, // ī�� �̵� ���� (%)
        moveLimit: .10, // ī�� �ִϸ��̼� ���� �Ÿ� (%)
        minScale: .92 // ī�� ������ �ּҰ�
      };

      /**
       * * ī�� ������ ���� �� �����丮 ���¿� ���� ��ġ ����
       */
      (function() {
        // ī�� ������ ����
        for (var i = 0; i < cards.leng; i ++) {
          cards.offsets.push(-((cards.width + cards.margin) * i));
        }

        if (history.state.listIndex !== undefined) {
          cards.prevIndex = cards.activeIndex = history.state.listIndex;

          todayListItemWrap.children('.item').each(function(j, self) {
            if (j < cards.activeIndex && j < 4) gsap.set(self, { autoAlpha: 0, x: cards.width / 2, scale: .92 });
          });

          gsap.to(todayListItemWrap, cards.duration, { x: cards.offsets[cards.activeIndex]});
        }

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
        cards.direction = cards.distance > -1 ? 'right' : 'left'; // ��ġ ����
        cards.movePercent = Math.abs(cards.distance / cards.width); // �̵��� ���� (%)

        switch(cards.direction) {
          case 'left' :
            var ASP = cards.movePercent <= cards.moveLimit; // ��� ���� ����
            var LP = cards.movePercent - cards.moveLimit; // ���� �̵� ����

            if (cards.activeIndex < cards.leng - 2) {
              gsap.set(todayListItemWrap.children('.item').eq(cards.activeIndex), {
                autoAlpha: ASP ? 1 : 1 - (LP + cards.moveLimit * 1.1),
                x: ASP ? 0 : (0 + (LP * 200) <= cards.move) ? (0 + LP * 200) : cards.move, // 200 = 2��
                scale: ASP ? 1 : (1 - LP) >= cards.minScale ? (1 - LP) : cards.minScale
              });
            }
            break;
          case 'right':
            var ASP = cards.movePercent >= (cards.moveLimit / 2); // ��� ���� ����
            var RP = cards.movePercent - cards.moveLimit; // ������ �̵� ����

            if (cards.activeIndex >= 0 && cards.activeIndex !== 5 && cards.activeIndex - 1 !== -1) {
              gsap.set(todayListItemWrap.children('.item').eq(cards.activeIndex - 1), {
                autoAlpha: ASP ? 0 + (RP + cards.moveLimit * 1.1) : 0,
                x: ASP ? ( cards.move - (RP * 200) >= 0 ? (cards.move - (RP * 200)) : 0 ): cards.move, // 200 = 2��
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

              history.replaceState({...history.state, listIndex : cards.activeIndex}, '����Ʈ����');

              if (cards.activeIndex < cards.leng - 1 && cards.activeIndex !== cards.leng - 1) {
                gsap.to(todayListItemWrap.children('.item').eq(cards.activeIndex - 1), cards.duration, { autoAlpha: 0, x: cards.move, scale: cards.minScale });
              }
            }
            break;
          case 'right':
            if (Math.abs(cards.distance) > (cards.minDistance * (cards.width / 100))) {
              cards.prevIndex = cards.activeIndex;
              cards.activeIndex = Math.max(0, cards.activeIndex - 1);

              history.replaceState({...history.state, listIndex : cards.activeIndex}, '����Ʈ����');

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

                    return window.location = $this.attr('data-link');
                  }
                });
              });
            }
          });
        });
      });

      todayListWrap.find('.btnTodayClose').on('click.PopPop', function() {
        if (gsap.isTweening(todayListItem)) return;

        articlesController.popOut();
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
   * * ���� ����
   */
  bubblesController = (function controlBubbles() {
    // ���� �ɼ�
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
     * * �ɼǰ� �� ���
     */
    function calcPresume() {
      var headerHeight = header.getBoundingClientRect().height;
      var gap = 58; // 375 �̸� ���������� ���� �����̳� viewbox ����� ��ġ (0 => 58�� �����)
      var areaHeight = headerHeight + gap + window.innerWidth;

      if (orientation) { // ���θ��
        return (areaHeight > window.innerHeight) ? window.innerHeight - (headerHeight + gap) : Math.min(Math.min(window.innerWidth, window.innerHeight), 650);
      } else { // ���θ��
        return Math.min(Math.min(window.innerWidth, window.innerHeight), 650);
      }
    }

    /**
     * * ���� ��ġ ���
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
     * * ���� ������ ���
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
     * * ���� ���ټ� �±� ����
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
     * * ���� ����
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
            var sRef2 = '';

            try {
              draw_mndr('m_ndr.nate.com/news/today/keyword'+(d.index + 1), gUserJS_sAppFrom, '', gUserJS_sAppSkai, gUserJS_sAppNdruk, sRef2);
            } catch(e) {
              draw_mndr('m_ndr.nate.com/news/today/keyword'(d.index + 1), '', '', '', '', sRef2);
            }

            /**
             * * Statistics (Click)
             */
            olapclick(`TOK${(d.index + 1 < 10) ? '0' + (d.index + 1) : (d.index + 1)}`);

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
            .text(function (title) {
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
     * * ���� �ִϸ��̼� �ùķ�����
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
   * * ���α׷��� ��Ʈ�ѷ� ����
   */
  var setProgressWidth = (254 / 375);
  var setProgressHeight = (48 / 375);
  var setKnobRadius = (24 / 375);

  progressBarController = (function controlProgressBar() {
    // ���α׷��� ��Ʈ�ѷ� �ɼ�
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
     * * �ɼǰ� �� ���
     */
    function calcPresume(percent) {
      return Math.min(window.innerWidth, 375) * percent;
    }

    /**
     * * ���α׷��� �� �ð��� ���
     */
    function calcProgressBarTimestamp() {
      /**
       * * ��Ʈ�ѷ� ���� ���� (�� => �ð�) ����
       * ! (���⹰ ���� O / �׽�Ʈ/���̺� X)
       *
       * ����� ���� :
       * @variable onDateMille
       * @variable timestamp.server
       * @variable timestamp.now
       */
      var oneDateMilli = (((1000 * 60) * 60) * 23); // (((1000 * 60) * 60) * 24) - (1000 * 60) // 23�ð� 59�� => 23�ð����� ����
      var timestamp = {};

      timestamp.min = moment(caller.minDTM).valueOf();
      timestamp.server = moment(caller.serverDTM).minutes(0).seconds(0).valueOf(); // minutes() / seconds() �߰�
      timestamp.now = moment(caller.progressDTM).minutes(0).seconds(0).valueOf();  // minutes() / seconds() �߰�
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
     * * ���α׷��� �� ������ ���
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
     * * ���α׷��� �� ����
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
              return d.HM.split(' ');
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
              return d.HM.split(' ');
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
     * * ���α׷��� �� �̺�Ʈ ����
     */
    function progressBarEvent(data) {
      /**
       * * ��Ʈ�ѷ� ���� ���� (�� => �ð�) ����
       * ! ���⹰ ���� [O] / �׽�Ʈ&���̺� ���� [X]
       *
       * ����� ����:
       * @variable progressBar.percent
       * @options bounds.minX, bounds.maxX
       * @options liveSnap
       * @options snap
       */
      progressBar.TL = gsap.timeline({ defaults: { overwrite: 'auto', ease: 'none' }, paused: true });
      progressBar.minLimit = progressBar.timestamp.minLimit;
      progressBar.maxLimit = progressBar.timestamp.maxLimit;
      progressBar.percent = progressBar.percent || (progressBar.timestamp.percent !== 0) ? progressBar.timestamp.percent : .0001; // * .0001 ���� �ʼ�

      if (progressBar.drag !== null) progressBar.drag[0].kill();

      progressBar.drag = Draggable.create(`${progressID} .timeGroup`, {
        trigger: `${progressID} .timeGroup`,
        type: 'x, y',
        bounds: {
          minX: progressBar.minLimit ? data.bar.width * (progressBar.minLimit + .0001) : 0, // * .0001 ���� �ʼ�
          maxX: progressBar.maxLimit ? data.bar.width * (progressBar.maxLimit + .0001) : 1, // * .0001 ���� �ʼ�
          minY: data.knob.r * 2,
          maxY: data.knob.r * 2,
        },
        throwProps: false,
        liveSnap: true,
        snap: {
          x: function (x) {
            return Math.floor(x / (data.bar.width / (23 - .0001))) * (data.bar.width / (23 - .0001)); // * .0001 ���� �ʼ�
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
        olapclick('TOT00');

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
   * * ��¥ (prev, today, next) / ������Ʈ �α� ����
   */
  timeTravelController = (function controlTimeTravel() {
    var timeTravel = document.querySelector('.timeTravel');
    var timeTravelTriggers = [document.querySelector('.btnTravel.prev'), document.querySelector('.btnTravel.next'), document.querySelector('.btnTravel.today')];
    var timeTravelDisplayTargets = [timeTravel.querySelector('.year'), timeTravel.querySelector('.month'), timeTravel.querySelector('.date')];
    var timeLog = document.querySelector('.timeLog');
    var btnShare = document.querySelector('.btnShare');

    /**
     * * Ű���� �ֽ� ������Ʈ �ð� ǥ�� (���� �����ð� ����)
     */
    function setDisplayLogTime(time) {
      timeLog.innerText = utils.convertTime(time, 'STANDARD');
    }

    /**
     * * �ð��� ǥ��
     */
    function setDisplayTragetTime(time) {
      var displayTime = utils.convertTime(time, 'YMD');

      displayTime.split('-').forEach(function(time, i) {
        timeTravelDisplayTargets[i].innerText = time;
      });
    }

    /**
     * * �ð��� ���� ���� ����
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
     * * �ð��� ��(����/����/����) ���� ���� ���
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
   * * �������� ����
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
   * * �����丮 ���� ����
   */
  function controlHistory() {
    // ����/�Ӻ�/�����ϱ� ���� ���� ���� ��/�� üũ
    let qs = ((searches, reservedQuery) => {
      var isReserved = reservedQuery.every((query) => searches.indexOf(query) !== -1);

      if (!isReserved) return null;
      else return searches.substr(1).split('#').reduce((pv, cv) => Object.assign(pv, { [cv.split('=')[0]]: decodeURIComponent(cv.split('=')[1])}), {});
    })(window.location.hash, ['keyword_dtm', 'keyword_sq', 'index']);

    // ���� (init) üũ
    if (history.state === null && qs !== null) {
      callArticle({
        selection : document.querySelector('.bubbleGroup[data-importance="'+ qs.index +'"]'),
        keyword_service: caller.keyword[parseInt(qs.index, 10)].keyword_service,
        keyword_dtm: qs.keyword_dtm,
        keyword_sq: qs.keyword_sq,
        index: parseInt(qs.index, 10)
      }, true);
    }

    // �����丮 (init/reload) üũ
    if (history.state !== null && history.state.name === 'LayerShare') layerSharePopUp(true);
    if (history.state !== null && history.state.name === 'Article') callArticle(history.state, true);

    // �����丮 (Back/Forward) üũ
    window.addEventListener('popstate', function() {
      (history.state !== null && history.state.name === 'LayerShare') ? layerSharePopUp(true) : layerSharePopUp(false);
      // (history.state !== null && history.state.name === 'Article') ? callArticle(history.state, true) : (State.isPopPop) ? articlesController.popOut(true) : null;
      (history.state !== null && history.state.name === 'Article') ? null : (State.isPopPop) ? (_ => {
        articlesController.popOut(true);
        history.pushState(null, null, window.location.pathname);
      })() : null;



    });
  }

  /**
   * * �����ϱ� (�����丮)
   */
  function layerSharePopUp(state) {
    var layerShare = document.querySelector('.layerPopup.share');
    return state ? layerShare.classList.add('active') : layerShare.classList.remove('active');
  }

  /**
   * * ��� ��� (�����丮 / ����)
   *
   * @param {object} d - �����丮/���� ������
   * @param {boolean} immediate - �ִϸ��̼� ���� ��ý���
   *
   */
  function callArticle(d, immediate) {
    const selection = document.querySelector('.bubbleGroup[data-importance="'+ d.index +'"]');
    const fillColor = ['rgba(21, 45, 255, .7)', 'rgba(47, 134, 255, .7)', 'rgba(20, 187, 190, .7)', 'rgba(86, 55, 255, .7)', 'rgba(141, 201, 29, .7)', 'rgba(212, 216, 220, .7)', 'rgba(212, 216, 220, .7)', 'rgba(212, 216, 220, .7)', 'rgba(212, 216, 220, .7)', 'rgba(212, 216, 220, .7)'];

    if (!State.isPopPop) {
      caller.resetArticle();
      caller.dataLoadEvent(`${ARTICLE_URL}?keyword_dtm=${d.keyword_dtm}&keyword_sq=${d.keyword_sq}`, (res) => {
        for (let key in res.data) caller.article = res.data[key];

        // �����丮 ����
        const Datum = {
          name: 'Article',
          serverDTM: caller.serverDTM,
          progressDTM: caller.progressDTM,
          article: caller.article,
          keyword_service: (_ => {
            let searchString = res.search_link;
            if(searchString && searchString.indexOf('q=') >= 0) {
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

        // ī�� ����� urlǥ��
        let { origin, pathname } = window.location;
        window.location.replace(`${origin}${pathname}#keyword_dtm=${d.keyword_dtm}#keyword_sq=${d.keyword_sq}#index=${d.index}`);
        history.pushState(Datum, 'natenews');
        // �����丮 ����
        /*if (history.state !== null && history.state.name === 'Article') history.replaceState(Datum, '����Ʈ����');
        else history.pushState(Datum, '����Ʈ����');*/

        articlesController.setClickedBubble.call(selection);
        articlesController.setListRefData(Datum);

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


  /**
   * * Public Controls
   */
  function init(xhrData) {
    caller = xhrData;

    bubblesController.init();
    progressBarController.init();
    timeTravelController.init();

    controlHistory();
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
        var sRef2 = '';

        try {
          draw_mndr('m_ndr.nate.com/news/date', gUserJS_sAppFrom, '', gUserJS_sAppSkai, gUserJS_sAppNdruk, sRef2);
        } catch(e) {
          draw_mndr('m_ndr.nate.com/news/date', '', '', '', '', sRef2);
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
        }
        $.ajax({
          type: 'GET',
          url: './src/data/fake.json',
          dataType: 'json',
          processData: false
        })
        .then(function(data) {
          return data[type];
        })
        .done(function(data) {
          callback(data);
        })
        .fail(function() {
          console.log('fail');
        });*/

        plast.$dataloader.AJAX(plast.$dataloader.ARG.url(path).onComplete((res) => {
          if (res.status === 200) {
            try {
              callback(plast.$dataloader.parseJson(res.responseText));
            } catch(e) {
              console.log(e);
            }
          } else {
            console.log('data error');
          }
        }));
      }
    }

    return myData;
  })();

  const xhrData = new myData();

  xhrData.dataLoadEvent(history.state !== null && history.state.name === 'Article' ? KEYWORD_URL + '?service_dtm='+ history.state.keyword_dtm : KEYWORD_URL, (res) => {
    xhrData.minDTM = utils.dateFormat('2020-08-20 09:00:00');
    xhrData.serverDTM = utils.dateFormat(res.server_dtm);
    xhrData.updateDTM = utils.dateFormat(res.update_dtm);
    xhrData.serviceDTM = utils.dateFormat(res.service_dtm);
    xhrData.progressDTM = utils.dateFormat(history.state !== null && history.state.name === 'Article' ? history.state.progressDTM : res.server_dtm);

    for (let key in res.data) xhrData.keyword = res.data[key];

    newsEdge.init(xhrData);
  });


  /**
   * * �����ϱ�
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

      return (leyerPopup.classList.contains('active')) ? history.pushState({name: 'LayerShare'}, 'share') : history.pushState(null, null);
    });
  });
});
