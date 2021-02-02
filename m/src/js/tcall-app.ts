import { Model } from "../../../components/Model";
import Calendar from "../../../components/Calendar";
import ViewModel from "../../../components/ViewModel";
import Progress from "../../../components/Progress";
import KeywordList from "../../../components/KeywordList";
import {getURIparams, krStr, replaceHistory, MAIN_LINK} from "../../../components/utils";
import Article from "./Article";

const g:any = global;
g.tcall = true;
const params  = getURIparams(window.location.hash, '$') || {
    MM: '',
    index: '',
    keyword_dtm: '',
    keyword_sq: '',
    keyword_idx: '',
    progress_dtm: '',
    target: '',
    v: '',
};
const DATA = new Model();
// 로딩바 만들기
DATA.attachHandleError = (() => {
    const obj = {
        name: 'loading',
        parent: '.bubblesWrap',
        target: '.today-loader',
        f: () => {
            const bubblesWrap = document.querySelector(obj.parent);
            const todayLoading = document.createElement('div');
            todayLoading.className = 'today-loader';
            todayLoading.innerHTML = `
                    <!-- 로딩 -->
                <div class="logoimg">
                    <div class="circle step1"></div>
                    <div class="circle step2"></div>
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
                <a href="//${g.window.location.host}" onclick="MM_GLOBAL.resetTab(); return MM_GLOBAL.ndrclick('ERR01');" class="restart">${krStr[11]}</a>
            </div>
        `;
            document.querySelector(obj.parent).appendChild(error);
            document.querySelector('#newsEdgeBubbles').removeChild(document.querySelector('.group-wrap'));
            keyword.removeEvent();
        }
    }
    return obj;
})();
const article = createInstance(Article);

function createInstance<T extends ViewModel<Model>>(c: new <S extends Model>(d: S) => T): T {
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
if(g.navigator.platform.indexOf('Win') < 0 && g.navigator.userAgent.indexOf('iPhone') > 0 && sessionStorage.getItem('cardshow') === 'true' && sessionStorage.getItem('pageshow') === 'true') {
    sessionStorage.setItem('cardshow', 'false');
    sessionStorage.setItem('pageshow', 'false');
    window.location.reload();
}

/*
** 메인에서 유입 할 때 카드리스트를 바로 보여준다.
 */
if (params && params.target === 'MAIN') {
    const {keyword_dtm, keyword_sq, index: rank} = params;
    article.webview = (params.v === 'nate_app') ? params.v : true; // 웹뷰모드
    let startSlide = (() => {
        if (history.state && history.state !== '') {
            return history.state.startSlide;
        } else {
            return 0;
        }
    })();

    history.pushState({
        keyword_dtm,
        keyword_sq,
        rank,
        startSlide,
        title: ''
    }, 'home');
    if (sessionStorage.getItem('pageshow') !== 'true' && sessionStorage.getItem('cardshow') !== 'true') {
        replaceHistory();
    }
}

if(history.state && history.state !== '') {
    document.body.style.cssText = `background-color:${article.color[Number(history.state.rank)]}`;
    document.body.className = 'session';
    document.querySelector('#todayListWrap').setAttribute('style', `
        display: block;
        background-color:${article.color[Number(history.state.rank)]}
    `)
}

//article.init();


const calendar = createInstance(Calendar);
const progress = createInstance(Progress);
const keyword = createInstance(KeywordList);
const triggerBubblClick = function (i: number) {
    // 팝업이 완전히 닫히지 않은 상태면 버블 클릭안됨
    if (article.isClose === false) { return }
    keyword.clickEff(i);
    const sq = DATA.items[i].keyword_sq;
    const t = DATA.time.service_dtm;
    const historyData = {
        keyword_dtm: t,
        keyword_sq: sq,
        rank: i,
        startSlide: 0,
        title: '',
        progress_dtm: DATA.time.progress_dtm,
        x: progress.axisX
    }
    DATA.rank = i;


    if(history.state && history.state !== '') {
        setTimeout(()=>{
            history.replaceState(historyData,`${krStr[2]}-${DATA.items[i].keyword_service.split('<br />').join(' ')}`);
        },0)
    } else {
        setTimeout(()=>{
            history.pushState(historyData,`${krStr[2]}-${DATA.items[i].keyword_service.split('<br />').join(' ')}`);
        },0);
    }

    article.update(`${g.ARTICLE_URL}?keyword_dtm=${t}&keyword_sq=${sq}`);

    // 버블 클릭 통계 프로세스 바인딩
    const N = i+5;

    if (typeof g.draw_ndr === 'function') {
        var sRef2 = '';
        g.draw_mndr('m_ndr.nate.com/news/today/tcall//keyword'+(i+1), g.gUserJS_sAppFrom, '', g.gUserJS_sAppSkai, g.gUserJS_sAppNdruk, sRef2);
    }
    if (typeof g.olapclick === 'function') {
        // 키워드0 TTC05
        g.olapclick(N < 10 ? `TTC0${N}` : `TTC${N}`);
    }

    // 세션체크: 앱 종료 후 다시 앱을 실행할 경우 대응
    //replaceHistory();
}
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
});
/* Progress process */
progress.updateProcess.set('dragEnd', function() {
    keyword.hideEff();
    keyword.update(`${g.KEYWORD_URL}?service_dtm=${this.model.time.progress_dtm}`);

    if('olapclick' in window) {
        g.olapclick('TTC04');
    }
});
// 버블 클릭 후 실행되는 프로세스
keyword.eventListner.set('b-click', triggerBubblClick);
// 버블 업데이트 된 후 실행
keyword.eventListner.set('b-update', () => {
    // 타임로그
    /*const timeLog = document.querySelector('.timeLog');
    if (timeLog) {
        (<HTMLElement> timeLog).innerText = `${g.moment(DATA.time.update_dtm).format('YYYY.MM.DD HH:mm')} ${krStr[0]}`;
    }*/
});

document.addEventListener('DOMContentLoaded', () => {
    // 초기화
    let path = g.KEYWORD_URL;
    if (history.state && history.state !== '') {
        path = `${path}?service_dtm=${history.state.keyword_dtm}`
    }

    DATA.update(path, () => {
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
        calendar.addEvent(['prev','next','today']);
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
                g.draw_mndr('m_ndr.nate.com/news/today/keyword'+(Number(params.index) + 1), g.gUserJS_sAppFrom, '', g.gUserJS_sAppSkai, g.gUserJS_sAppNdruk, '');
            }
        } else {
            // 카드리스트 팝업닫기
            article.addEvent(['.btnTodayClose']);
            // 요소가 나타났다 사라지는 효과이기 때문에 팝업이 완전히 닫힌후 버블을 재업데이트 한다.
            document.querySelector('.btnTodayClose').addEventListener('click', function() {
                closeCardView();
                history.pushState(null,null,'');
            });
            // 페이지 진입 통계
            if (typeof g.draw_ndr === 'function') {
                let sRef2 = '';
                g.draw_mndr('m_ndr.nate.com/news/today/tcall/', g.gUserJS_sAppFrom, '', g.gUserJS_sAppSkai, g.gUserJS_sAppNdruk, sRef2);
            }
        }
    });

    // 세션체크: 앱 종료 후 다시 앱을 실행할 경우 대응
    if (!params && params.target !== 'MAIN' && sessionStorage.getItem('cardshow') !== 'true') {
        replaceHistory();
    }

    // SNS
    //document.querySelector('.btnShare ').addEventListener('click', shareSNS);
    //document.querySelector('.btnClosePopup ').addEventListener('click', closeSNS);
});




// ios에서 히스토리백: 1) pageshow 호출 이후 2)popstate 호출
window.addEventListener('pageshow', ff2);
window.addEventListener('popstate', ff);

function clearCardEff(): void {
    const todayListEffect = document.querySelector('.todayListEffect');
    const check = todayListEffect.getAttribute('style');
    const li = document.querySelectorAll('.listItemWrap li');

    if (check !== null) {
        todayListEffect.className = 'todayListEffect';
        todayListEffect.removeAttribute('style');
        li.forEach(n => {
            n.className = n.className.indexOf('more') >= 0 ? 'more' : 'item';
        })
    }
}

function ff2(e: PageTransitionEvent): void {
    if(g.navigator.platform.indexOf('Win') < 0 && g.navigator.userAgent.indexOf('iPhone') > 0) {
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

function ff():void {
    clearCardEff();
    //alert(`ff/ cardshow:${sessionStorage.getItem('cardshow')}, pageshow: ${sessionStorage.getItem('pageshow')}`)
    if (params && params.target === 'MAIN') {
        closeCardMain();
    } else {
        const wrap = document.querySelector('#wrap');
        const pageshow = sessionStorage.getItem('pageshow');

        if(g.navigator.userAgent.indexOf('iPhone') < 0) {
            if(wrap.className === 'clicked') {
                closeCardView();
            }
        } else {
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
function closeCardMain (): void {
    if (article.webview === 'nate_app') {
        const pageshow = sessionStorage.getItem('pageshow');
        if (pageshow === 'true') {
            sessionStorage.setItem('pageshow', 'false');
        } else {
            g.window.location.href = MAIN_LINK;
        }
    } else if(article.webview) {
        window.close();
        setTimeout(() => {
            g.window.location.href = MAIN_LINK;
        }, 300);
    }
}
// 5개의 주요뉴스 클릭함수
function cardClick(e: Element): void {
    if(sessionStorage.getItem('pageshow') === 'true') {
        sessionStorage.setItem('pageshow', 'error');
    }
    sessionStorage.setItem('pageshow', 'true');
    sessionStorage.setItem('cardshow', 'true');
    window.location.href = `skt-marketing-api://outerbrowser?url=https:${e.getAttribute('data-link')}`;
}

// share SNS
function shareSNS(e:MouseEvent): void {
    e.preventDefault();
    const t = document.querySelector('.layerPopup');
    t.className = 'layerPopup share active';
    document.body.className = 'scroll-block';
    document.querySelector('html').setAttribute('class','app');
}
// closeSNS
function closeSNS(e:MouseEvent): void {
    e.preventDefault();
    const t = document.querySelector('.layerPopup');
    t.className = 'layerPopup share';
    document.body.className = '';
    document.querySelector('html').removeAttribute('class');
}
function closeCardView(): void {
    // 카드뷰가 열린 상태에서 리사이징이 일어날때 true
    if(sessionStorage.getItem('resize') === 'true') {
        sessionStorage.setItem('cardshow', 'null');
        article.out();
        setTimeout(() => {
            keyword.hideEff();
            setTimeout(keyword.updateBubble.bind(keyword), 400);
            sessionStorage.setItem('resize', null);
        }, 200)
    } else {
        article.out();
    }
}











// DEV
if (process.env.NODE_ENV === 'development') {
    g.dd = DATA;
    g.a = article;
    g.params = params;
    g.cc = calendar;
    g.pp = progress;
    g.kk = keyword;
}