import { Model } from "../../../components/Model";
import Calendar from "../../../components/Calendar";
import ViewModel from "../../../components/ViewModel";
import Progress from "../../../components/Progress";
import KeywordList from "../../../components/KeywordList";
import { krStr, CARD_LINK } from "../../../components/utils";

const g:any = global;
const DATA = new Model();
let KEYWORD_URL = `//m.news.nate.com/api/today/keywordList`;
g.KEYWORD_URL = KEYWORD_URL;
function mndr(v: string) {
    if(g.MM_GLOBAL && typeof g.MM_GLOBAL.ndrclick === 'function') {
        g.MM_GLOBAL.ndrclick(v);
    }
}
g.stage.addEvent('newsToday' , _todayInit);
g.stage.addEvent('newsTodayStop', ()=>{
    if(g.bubbles) {
        reset();
        g.bubbles.hideEff();
    }
});

function reset() {
    const newsEdgeBubbles = document.querySelector('#newsEdgeBubbles');
    const todayLoader = document.querySelector('.today-loader');
    const bubblesWrap = document.querySelector('.bubblesWrap');
    const clickArea = document.getElementById('a-trigger');
    if(todayLoader && bubblesWrap) {
        bubblesWrap.removeChild(todayLoader);
    }
    // 링크 영역 삭제
    if(clickArea) {
        document.body.removeChild(clickArea);
    }
    if (newsEdgeBubbles) {
        newsEdgeBubbles.innerHTML = ''
    }
}

function _todayInit() {
    // 초기화
    reset();

    /**
     ** Moment 글로벌 설정
     */
    g.moment.locale('ko');
    g.moment.updateLocale('ko', {relativeTime: {h: `${decodeURI('1%EC%8B%9C%EA%B0%84')}`}});
    /**
     ** Gsap 플러그인 등록 (필수)
     */
    g.gsap.registerPlugin(g.Draggable, g.DrawSVGPlugin, g.MotionPathPlugin, g.ScrollToPlugin, g.InertiaPlugin);

    // 로딩바 만들기
    DATA.attachHandleError = (() => {
        const obj = {
            name: 'loading',
            parent: '.bubblesWrap',
            target: '.today-loader',
            f: () => {
                console.log('attachHandleError')
                const bubblesWrap = document.querySelector(obj.parent);
                const todayLoading = document.createElement('div');
                todayLoading.className = 'today-loader';
                todayLoading.innerHTML = `
                    <!-- 로딩 -->
                    <div class="logoimg">
                        <div class="circle step1"></div>
                        <div class="circle step2"></div>
                    </div>
                </div>
            `;
                bubblesWrap.appendChild(todayLoading);
            }
        }
        return obj;
    })();
    DATA.attachHandleError = (() => {
        const obj = {
            name: 'error',
            parent: '.bubblesWrap',
            target: '.error',
            f: () => {
                let error = document.createElement('div');
                error.className = 'error';
                error.innerHTML = `
                    <div class="eBox">
                        <p>${krStr[8]}<br>${krStr[9]}</p>
                        <p>${krStr[10]}</p>
                        <a href="${g.window.location.origin}" onclick="MM_GLOBAL.resetTab(); return MM_GLOBAL.ndrclick('ERR01');" class="restart">${krStr[11]}</a>
                    </div>
                `;
                document.querySelector(obj.parent).appendChild(error);
                document.querySelector('#newsEdgeBubbles').removeChild(document.querySelector('.group-wrap'));
                keyword.removeEvent();
            }
        }
        return obj;
    })();
    function createInstance<T extends ViewModel<Model>>(c: new <S extends Model>(d: S) => T): T {
        return new c(DATA);
    }


    const calendar = createInstance(Calendar);
    const progress = createInstance(Progress);
    const keyword = createInstance(KeywordList);
    const triggerBubblClick = function (i: number) {
        const {keyword_dtm, keyword_sq} = this.model.items[i];
        const { progress_dtm } = this.model.time;
        mndr(`NNT2${((n)=> (n < 10) ? `0${n}` : n)(i+1)}`);
        const t = document.getElementById('a-trigger');
        t.setAttribute('href',`${CARD_LINK}/#$keyword_dtm=${keyword_dtm}$keyword_sq=${keyword_sq}$index=${i}$MM=${g.moment(progress_dtm).format('mm')}$target=MAIN$v=${g.MM_PARAMS.ref}`);
        if(t) {
            t.click();
        }
    }

    // 세션
    const ss = sessionStorage.getItem('ss');
    const ss_x = sessionStorage.getItem('ss-x');



    /* update process */
    calendar.updateProcess.set('progress', function() {
        // 드래그 업데이트
        // css animation 시간 갭차로 인해 update 메소드 안이아니라 밖에서 실헹
        keyword.hideEff();
        // 프로그래스
        progress.removeEvent();
        progress.init();
        progress.addEvent(['.progressWrap']);
        // 드래그 위치 재 설정
        let axisX = (progress.isOverflow && progress.isToday) ? progress.limit : progress.axisX;
        g.TweenMax.set(".timeGroup", {x: axisX});
        keyword.updateBubble();
        // 세션저장
        sessionStorage.setItem('ss', JSON.stringify(progress.model.time))
        sessionStorage.setItem('ss-x', `${progress.axisX}`)
    });
    // 이전/내일/오늘
    calendar.addEvent(['prev','next','today']);
    /* Progress process */
    progress.updateProcess.set('dragEnd', function() {
        keyword.hideEff();
        keyword.update(`${KEYWORD_URL}?service_dtm=${this.model.time.progress_dtm}`);

        mndr('NNT104');
        // 세션저장
        sessionStorage.setItem('ss', JSON.stringify(this.model.time));
        sessionStorage.setItem('ss-x', `${progress.axisX}`)
    });

    // 버블 클릭 후 실행되는 프로세스
    keyword.eventListner.set('b-click', triggerBubblClick);
    // 버블 업데이트 된 후 실행
    keyword.eventListner.set('b-update', () => {
        // 타임로그
        /*const timeLog = document.querySelector('.timeLog');
        if (timeLog) {
            (<HTMLElement> timeLog).innerText = `${g.moment(DATA.time.service_dtm).format('YYYY.MM.DD HH:mm')} ${krStr[0]}`;
        }*/
    });

    const INIT_PATH = ss ? `${KEYWORD_URL}?service_dtm=${(JSON.parse(sessionStorage.getItem('ss'))).progress_dtm}` : KEYWORD_URL;

    DATA.update(INIT_PATH, () => {
        const todayLoader = document.querySelector('.today-loader');
        const bubblesWrap = document.querySelector('.bubblesWrap');
        if(todayLoader) {
            bubblesWrap.removeChild(todayLoader);
        }
        if(ss_x && typeof Number(ss_x) === 'number') {
          progress.axisX = Number(ss_x);
        }
        if(ss) {
            let { progress_dtm, server_dtm } = JSON.parse(ss);
            if(typeof progress_dtm === 'string' && typeof server_dtm === 'string' && progress_dtm.split(' ')[0] !== server_dtm.split(' ')[0] ) {
                DATA.time.progress_dtm = (JSON.parse(ss)).progress_dtm;
            }
        }

        calendar.init();
        progress.init();
        keyword.init();
        // 타임라인 접기
        progress.addEvent(['.progressWrap']);
        // 세션생성
        if (!ss && !ss_x) {
            sessionStorage.setItem('ss', JSON.stringify(DATA.time))
            sessionStorage.setItem('ss-x', `${progress.axisX}`)
        }

        // 페이지 진입 통계
        if (typeof g.draw_ndr === 'function') {
            let sRef2 = '';
            g.draw_mndr('m_ndr.nate.com/news/today', g.gUserJS_sAppFrom, '', g.gUserJS_sAppSkai, g.gUserJS_sAppNdruk, sRef2);
        }
        // 링크 트리거(앱에서 window.open 메소드 제한 걸어둠, 임시 트리거로 페이지 이동 시킨다)
        (()=>{
            let aa = document.createElement('a');
            aa.id="a-trigger";
            aa.target='_blank';
            aa.style.cssText = 'position: absolute;left: -999em;top: -999em;';
            aa.href = '#';
            document.body.appendChild(aa);
        })();
    });

    const blockevent = () => { g.stage.trigger('BLOCK_ON') };
    document.querySelector('.progressWrap').removeEventListener('touchstart', blockevent);
    document.querySelector('.progressWrap').addEventListener('touchstart', blockevent);


    if (process.env.NODE_ENV === 'development') {
        g.dd = DATA;
        g.cc = calendar;
        g.pp = progress;
    }
    g.bubbles = keyword;
}
