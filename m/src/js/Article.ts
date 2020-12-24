import ViewModel from "../../../components/ViewModel";
import { utils, krStr, replaceHistory } from "../../../components/utils";
import { mobile } from "../../../tmp/TMP_ARTICLE";

const g:any = global;
/**
 * * Moment 글로벌 설정
 */
g.moment.locale('ko');
g.moment.updateLocale('ko', {relativeTime : { h: `${krStr[12]}` } });


let timeLine: any;
interface items {
    [key: string] : {
        artc_sq: string;
        artc_title: string;
        cp_cd: string;
        cp_nm: string;
        img_url: string;
        insert_dtm: string;
        keyword_sq: number;
        link_url: string;
        service_st: number;
        update_dtm: string;
        write_dtm: string;
    }
}
export default class Article<S> extends ViewModel<S>{
    private cards: any;
    public webview: boolean | string;
    public isClose: boolean;
    constructor(d: S) {
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
            move: 335 / 2, // 카드 이동 가능 범위 (px)
            movePercent: 0, // 카드 이동 범위 (%)
            moveLimit: .10, // 카드 애니메이션 제한 거리 (%)
            minScale: .92 // 카드 스케일 최소값
        };
        // 아티클 상태 저장 객체
        this.webview = false;// 웹뷰 인가? 애니메이션 없이 바로 보여줄건지
        this.isClose = true; // 카드뷰가 완전히 닫혔는지 체크
        this.out = this.out.bind(this);
    }


    public out(): void {
        const listItemWrap = document.querySelector('.listItemWrap');
        const svg = document.querySelectorAll('.group-wrap .item');

        g.gsap.killTweensOf(timeLine);
        // enable scroll
        document.querySelector('body').removeAttribute('style');
        document.querySelector('html').removeAttribute('style');

        timeLine = g.gsap.timeline({
            onComplete: () => {
                document.getElementById('wrap').setAttribute('class', '');
                const v = (history.state && history.state !== '') ? history.state.rank : this.model.rank;
                svg[v].setAttribute('class', 'item');
                this.isClose = true;
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

        timeLine.set('body', { clearProps: 'all' , duration: 0, className: '' })
            .to(['.btnTodayClose', '.todayListTitle', '.todayListItem'], { autoAlpha: 0, ease: 'power3.inOut', duration: 0})
            .to(['.todayListItem', listItemWrap], { clearProps: 'all', duration: 0.1})
            .to('.group-wrap .item.active circle', { scale: 0.8, ease: 'power3.inOut'})
            .to('#wrap', { className: '' , duration: 0})
            .to('.group-wrap .item.active circle', { scale: 1, duration: 0.5});
    }
    // 카드를 바로 보여줄때
    public quickShow(): void {
        const { rank, keyword_dtm, keyword_sq } = history.state;
        document.getElementById('wrap').setAttribute('class', 'clicked');

        //(<HTMLElement> document.querySelector('#todayListWrap')).style.cssText = `overflow: hidden;background-color:${this.color[rank]};`;
        this.update(`${g.ARTICLE_URL}?keyword_dtm=${keyword_dtm}&keyword_sq=${keyword_sq}`);

        if(this.webview === false) {
            setTimeout(() => {
                let c = document.querySelectorAll('.group-wrap .item')[rank];
                c.setAttribute('class','item active');
                g.gsap.timeline().to(c.querySelector('circle'), 0, { scale: 20, transformOrigin: '50% 50%'});
            }, 400);
        }
        //window.addEventListener('popstate', this.out)
    }

    protected _init() {
        // 템플릿 추가
        const todayListWrap = document.getElementById('todayListWrap');
        if(todayListWrap.innerHTML.length === 0) {
            todayListWrap.innerHTML = mobile;
        }

        if (history.state && history.state !== '') {
            this.quickShow();
        }
    }


    protected _update(): void {
        this.isClose = false;
        let r = this.model.rank;
        if (history.state && history.state !== '') {
            this.cards.activeIndex = history.state.startSlide;
            r = history.state.rank;
        }
        (<HTMLElement> document.querySelector('html')).setAttribute('style', `background-color:${this.color[r]}`);
        document.body.className = 'body-show-cardview';
        document.body.style.cssText = `background-color:${this.color[r]}`;

        (<HTMLElement> document.querySelector('.todayListTitle')).innerText = this.model.title.split('?q=').pop();
        (<HTMLElement> document.getElementById('todayListWrap')).setAttribute('class', (r < 5) ? 'highScore' : 'lowScore');
        // offset
        let cards = this.cards;

        // 카드 포지션 설정
        for (var i = 0; i < cards.leng; i ++) {
            cards.offsets.push(-((cards.width + cards.margin) * i));
        }

        this._createList();
        this._createNav();

        //window.scrollTo(0, (document.querySelector('.btnTodayClose').getBoundingClientRect()).y-15);

        let t = 0.3;
        timeLine = g.gsap.timeline({
            onComplete: this._bindDrag.bind(this)
        });
        g.gsap.set('.todayListItem', { clearProps: 'all' , duration: 0});

        timeLine
            .to('.btnTodayClose', t, { autoAlpha: 1, delay: 0.5})
            .fromTo('.todayListTitle', t, { autoAlpha: 0, x: -100, }, { autoAlpha: 1, x: 0 })
            .to('.todayListItem', (()=>{
                if (history.state && history.state !== '') {
                    return 0;
                } else {
                    return t;
                }
            })(),{ autoAlpha: 1, x: 0, delay: 0});
    }

    protected _addEvent<V>(p:V) {
        // 팝업 닫기
        if(Array.isArray(p)) {
            p.forEach((i: string) => {
                this.eventListner.set(`${i}`, this.out)
            })
        }
    }
    protected _removeEvent() {}

    private  _createNav(){
        const nav = document.querySelector('.todayListItemCounts');
        const size = this.model.article.length;
        const temp = document.createDocumentFragment();

        for(let i=0;i < size+1;i++) {
            const span = temp.appendChild(document.createElement('span'));

            if(i === size) {
                span.setAttribute('class', `count-more`);
            } else {
                span.setAttribute('class', `nav-item`);
            }
        }
        nav.appendChild(temp);
        nav.querySelectorAll('span')[this.cards.activeIndex].setAttribute('class', `nav-item active`);
    }

    private _createList(){
        const listItemWrap = document.querySelector('.listItemWrap');
        const empty = document.createDocumentFragment();
        const { server_dtm } = this.model.time;

        this.model.a.forEach((d: items, i:number) => {
            let {link_url,artc_title, cp_nm, img_url, insert_dtm} = d;
            const li = empty.appendChild(document.createElement('li'));
            li.setAttribute('class', 'item');
            li.setAttribute('role', 'link');
            li.setAttribute('data-link', String(link_url));
            li.setAttribute('data-idx', `${i+1}`);
            let ttt = utils.isToday(server_dtm, insert_dtm) ? g.moment(insert_dtm).startOf('min').fromNow() : insert_dtm;

            let temp = `
                <div class="face frontFace">
                    <h5 class="subject">${artc_title}</h5>
                    <div class="info">
                        <div class="state"><span class="provider">${cp_nm}</span><span class="time">${ttt}</span></div>
                        <div class="thumb-nail"><img src="${img_url}" alt=""></div>
                    </div>
                </div>
                <div class="face backFace"></div>                
            `;

            li.innerHTML = temp;
        });
        listItemWrap.appendChild(empty);

        const more = document.createElement('li');
        more.setAttribute('class', 'more');
        more.setAttribute('role', 'link');
        more.setAttribute('data-link', this.model.title);
        more.setAttribute('data-idx', `0`);

        more.innerHTML = `
            <div class="face frontFace">
                <div class="innerWrap">${krStr[4]}<div>
                    <span class="size">${utils.withCommas(this.model.cnt)}</span>
                    <span>${krStr[5]}</span>
                </div>${krStr[6]}
            </div>
            <div class="face backFace"></div>
        `;
        listItemWrap.appendChild(more);

    }

    private _bindDrag() {
        const { cards } = this;
        const items = document.querySelectorAll('.listItemWrap .item');
        let btimer: ReturnType<typeof setTimeout>
        let ASP: boolean, LP: number, RP: number, _this = this;

        items.forEach(function(self:Element, j: number) {
            if (j < cards.activeIndex && j < 4) g.gsap.set(self, { autoAlpha: 0, x: cards.width / 2, scale: .92 });
        });

        g.gsap.to('.listItemWrap', cards.duration, { x: cards.offsets[cards.activeIndex]});

        g.Draggable.create('.listItemWrap', {
            type: 'x',
            throwProps: false,
            edgeResistance: .85,
            onDrag,
            onDragStart,
            onDragEnd,
            onClick
        });

        function onClick(e: MouseEvent){
            const t = (<HTMLElement> e.target).closest('li');
            const duration = 0.3;
            t.className = `${t.getAttribute('class')} active`;
            // 통계
            if(g.olapclick) {
                let v = `TOR0${t.getAttribute('data-idx')}`
                if (t.getAttribute('data-idx') === '0') {
                  v = 'TOM00';
                }
                g.olapclick(`${v}`);
            }

            if (btimer) clearTimeout(btimer);

            btimer = setTimeout(() => {
                g.gsap.set('.todayListEffect', {
                    x: t.getBoundingClientRect().left,
                    y: t.getBoundingClientRect().top,
                    width: t.clientWidth,
                    height: t.clientHeight,
                    autoAlpha : 1,
                    className: 'todayListEffect',
                    borderRadius: (t.className.indexOf('more') < 0) ? 20 : '100%',
                })
            }, 200);

            // 뒷판
            const ani = g.gsap.timeline({
                onComplete: () => {
                    if (_this.eventListner.has('cardClick')) {
                        _this.eventListner.get('cardClick')(t)
                    }
                }
            });
            ani.delay(0.3).set('.todayListEffect', { className: 'todayListEffect active' })
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
                        x: ASP ? 0 : ((LP * 200) <= cards.move) ? (LP * 200) : cards.move, // 200 = 2배
                        scale: ASP ? 1 : (1 - LP) >= cards.minScale ? (1 - LP) : cards.minScale
                    });
                }
            } else {
                ASP = cards.movePercent >= (cards.moveLimit / 2); // 모션 시작 지점
                RP = cards.movePercent - cards.moveLimit; // 오른쪽 이동 범위
                if (cards.activeIndex >= 0 && cards.activeIndex !== 5 && cards.activeIndex - 1 !== -1) {
                    g.gsap.set(items[cards.activeIndex - 1], {
                        autoAlpha: ASP ? (RP + cards.moveLimit * 1.1) : 0,
                        x: ASP ? (cards.move - (RP * 200) >= 0 ? (cards.move - (RP * 200)) : 0) : cards.move, // 200 = 2배
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
            } else {
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
            nav.forEach((e:Element) => {
                const getClassName = e.getAttribute('class');
                if(getClassName.indexOf('active') > 0) {
                    e.setAttribute('class', getClassName.split('active').shift())
                }
            });
            nav[cards.activeIndex].setAttribute('class', `${nav[cards.activeIndex].getAttribute('class')} active`);

            if (cards.activeIndex >= 0 && cards.activeIndex !== 5 && cards.activeIndex - 1 !== -1) {
                g.gsap.to(items[cards.activeIndex - 1], cards.duration, { autoAlpha: 0 });
            }

            g.gsap.to('.listItemWrap', cards.duration, { x: cards.offsets[cards.activeIndex]});

            history.state.startSlide = cards.activeIndex;
            history.state.title = _this.model.title.split('?q=').pop();
            history.replaceState(history.state, history.state.title);
            // 세션체크: 앱 종료 후 다시 앱을 실행할 경우 대응
            replaceHistory();
        }

    }
}