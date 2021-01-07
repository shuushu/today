import { Model } from "../../../components/Model";
import Calendar from "../../../components/Calendar";
import ViewModel from "../../../components/ViewModel";
import Progress from "../../../components/ProgressV2";
import KeywordList from "../../../components/KeywordList";
import {getURIparams, krStr, UA} from "../../../components/utils";
import Article from "./Article";
const g:any = global;
const params  = getURIparams(window.location.search, '&');

g.params = params;

const DATA = new Model();
const article = createInstance(Article);
function createInstance<T extends ViewModel<Model>>(c: new <S extends Model>(d: S) => T): T {
    return new c(DATA);
}

// share SNS
function shareSNS(e:MouseEvent) {
    e.preventDefault();
    const t = document.querySelector('.layerPopup');
    t.classList.toggle("active");
}
// ie 클래스
if(UA.isEdge || UA.isIE) {
    document.querySelector('html').setAttribute('class','ie');
}

const calendar = createInstance(Calendar);
const progress = createInstance(Progress);
const keyword = createInstance(KeywordList);
const triggerBubblClick = function (i: number) {
    const sq = DATA.items[i].keyword_sq;
    const t = DATA.time.service_dtm;
    g.gsap.to(window, 0.6, { scrollTo:  921});
    article.update(`${g.ARTICLE_URL}?keyword_dtm=${t}&keyword_sq=${sq}`);

    history.replaceState({
        keyword_dtm: this.model.items[i].keyword_dtm,
        keyword_sq: sq,
        service_dtm: this.model.time.progress_dtm,
        progress_dtm: this.model.time.progress_dtm,
        x: progress.axisX,
        rank: i
    },'NATE-TODAY');

    // 버블 클릭 통계 프로세스 바인딩
    const N = i+1;
    if (typeof g.ndrclick === 'function') {
        g.ndrclick(`TOK${(N < 10) ? '0' + (N) : N }`);
    }
};
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
                    <a href="//${g.window.location.host}" class="restart">${krStr[11]}</a>
                </div>
            `;
            document.querySelector(obj.parent).appendChild(error);
        }
    }
    return obj;
})();
// 로딩바 만들기
DATA.attachHandleError = (() => {
    const obj = {
        name: 'loading',
        parent: '.bubblesWrap',
        target: '.today-loader',
        f: () => {
            if(document.querySelector('.group-wrap.active')) return;
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
    calendar.model.rank = 0;
    keyword.updateBubble();
    // 공유레이어 닫기
    document.querySelector('.layerPopup').setAttribute('class', 'layerPopup share');
});
// 이전/내일/오늘
calendar.addEvent(['prev','next','today']);
// 프로그래스 크기 조정
progress.options = {
    width:  650,
    height: 10,
    r: (Math.min(document.body.clientWidth, 650) * (24 / 650)) / 2
};
/* Progress process */
progress.updateProcess.set('dragEnd', function() {
    DATA.rank = 0;
    keyword.hideEff();
    keyword.update(`${g.KEYWORD_URL}?service_dtm=${this.model.time.progress_dtm}`);

    if('ndrclick' in window) {
        g.ndrclick('TOT00');
    }
});

// 버블 클릭 트리거
keyword.eventListner.set('b-click', triggerBubblClick);
// 버블 마우스 오버트리거
keyword.eventListner.set('b-over', function() {
    g.d3.select(this)
        .transition()
        .duration(600)
        .ease(g.d3.easeBackOut.overshoot(1.5))
        .attr('transform', 'scale(1.05, 1.05)');
});
// 버블 마우스 오버트리거
keyword.eventListner.set('b-out', function() {
    g.d3.select(this)
        .transition()
        .duration(600)
        .attr('transform', 'scale(1, 1)');
});
// 버블 업데이트 된 후 실행
keyword.eventListner.set('b-update', () => {
    const { keyword_dtm, keyword_sq } = article.model.items[article.model.rank];
    article.update(`${g.ARTICLE_URL}?keyword_dtm=${keyword_dtm}&keyword_sq=${keyword_sq}`);
    /*// 타임로그
    const timeLog = document.querySelector('.timeLog');
    if (timeLog) {
        (<HTMLElement> timeLog).innerText = `${g.moment(DATA.time.service_dtm).format('YYYY.MM.DD HH:mm')} ${krStr[0]}`;
    }*/
    history.replaceState(null,null);
});

document.addEventListener('DOMContentLoaded', () => {
    const path  = (history.state && history.state !== '') ? `${g.KEYWORD_URL}?service_dtm=${history.state.progress_dtm}` : g.KEYWORD_URL;

    // 초기화
    DATA.update(path, () => {
        let { keyword_dtm, keyword_sq } =  DATA.items[DATA.rank];

        if(params && params.keyword_sq !== '' && params.keyword_dtm !== '') {
            keyword_dtm = params.keyword_dtm;
            keyword_sq = Number(params.keyword_sq);

            if('preview' in params){
                window.scrollTo(0, 921)
            }
        }

        if(!params && history.state && history.state !== ''){
            DATA.time.progress_dtm = history.state.progress_dtm;
            keyword_dtm = history.state.keyword_dtm;
            keyword_sq = history.state.keyword_sq;
            progress.axisX = history.state.x;
        }


        calendar.init();
        progress.init();
        keyword.init({
            pp: [46.15,30.76,26.15,21.53,16.92,15.38,15.38,15.38,15.38,15.38],
            sizes: [5.23, 4.61, 4, 3.69, 3.07, 2.46, 2.46, 2.46, 2.46, 2.46]
        });

        // 타임라인 접기
        progress.addEvent(['.progressWrap']);
        article.update(`${g.ARTICLE_URL}?keyword_dtm=${keyword_dtm}&keyword_sq=${keyword_sq}`);
        article.addEvent(['.todayListWrap']);

        document.querySelector('.todayListWrap').addEventListener('click', (e) => {
            e.preventDefault();
            const t = (<HTMLElement> e.target).closest('li');
            if(t) {
                location.href = t.getAttribute('data-link');;
            }
        });
    });

    // SNS
    document.querySelector('.btnShare ').addEventListener('click', shareSNS);
    document.querySelector('.btnClosePopup ').addEventListener('click', shareSNS);

    // scroll
    window.addEventListener('scroll', function() {
        let scrollTop = window.scrollY || window.pageYOffset;
        let n = document.querySelector('.btnScrollTop');
        if (!n) return;
        if (scrollTop > 750) {
            g.gsap.to('.btnScrollTop', 0.3, { autoAlpha: 1 });
        } else {
            g.gsap.to('.btnScrollTop', 0.3, { autoAlpha: 0 });
        }
    });
});

if (process.env.NODE_ENV === 'development') {
    g.dd = DATA;
    g.cc = calendar;
    g.pp = progress;
    g.kk = keyword;
    g.a = article;
}


