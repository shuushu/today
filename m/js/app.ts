import { Model } from "../../../components/Model";
import Calendar from "../../../components/Calendar";
import ViewModel from "../../../components/ViewModel";
import Progress from "../../../components/Progress";
import KeywordList from "../../../components/KeywordList";
import Article from "./Article";

const g:any = global;
const DATA = new Model();

const calendar = createInstance(Calendar);
const progress = createInstance(Progress);
const keyword = createInstance(KeywordList);
const article = createInstance(Article);
function createInstance<T extends ViewModel<Model>>(c: new <S extends Model>(d: S) => T): T {
    return new c(DATA);
}

// 통계 도메인
g.pvName = 'm_ndr.nate.com/news/today/keyword';


g.dd = DATA;
g.cc = calendar;
g.pp = progress;
g.kk = keyword;
g.a = article;


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
// 이전/내일/오늘
calendar.addEvent(['prev','next','today']);
/* Progress process */
progress.updateProcess.set('dragEnd', function() {
    keyword.hideEff();
    keyword.update(`${g.KEYWORD_URL}?service_dtm=${this.model.time.progress_dtm}`);
});

// 버블 클릭 통계 프로세스 바인딩
keyword.eventListner.set('ndr', function (d: any) {
    // Statistics (PV)
    if (typeof g.draw_ndr === 'function') {
        let sRef2 = '';
        try {
            g.draw_mndr('m_ndr.nate.com/news/today/keyword'+(d.index + 1), g.gUserJS_sAppFrom, '', g.gUserJS_sAppSkai, g.gUserJS_sAppNdruk, sRef2);
        } catch(e) {
            g.draw_mndr('m_ndr.nate.com/news/today/keyword'+(d.index + 1), '', '', '', '', sRef2);
        }
    }
    // Statistics (Click)
    if (typeof g.olapclick === 'function') {
        g.olapclick(`TOK${(d.index + 1 < 10) ? '0' + (d.index + 1) : (d.index + 1)}`);
    }
});
// 버블 클릭 후 실행되는 프로세스
keyword.eventListner.set('openArticle', function (d: any) {
    keyword.clickEff(d.index);
    const sq = DATA.items[d.index].keyword_sq;
    const t = DATA.time.service_dtm;
    DATA.rank = d.index;
    article.update(`${g.ARTICLE_URL}?keyword_dtm=${t}&keyword_sq=${sq}`)
});
article.init();
// 카드리스트 팝업닫기
article.addEvent(['.btnTodayClose']);


document.addEventListener('DOMContentLoaded', () => {
    // 초기화
    DATA.update(g.KEYWORD_URL).then(() => {
        calendar.init();
        progress.init();
        keyword.init();
        // 타임라인 접기
        progress.addEvent(['.progressWrap']);
    });
    // 카드리스트 팝업닫기 - 추가 이벤트 등록
    // 요소가 나타났다 사라지는 효과이기 때문에 팝업이 완전히 닫힌후 버블을 재업데이트 한다.
    document.querySelector('.btnTodayClose').addEventListener('click', function() {
        const t = document.querySelector('body');
        if(t.getAttribute('data-popupState')) {
            article.out();
            setTimeout(() => {
                keyword.hideEff();
                setTimeout(keyword.updateBubble.bind(keyword), 600);
            }, 300)
            t.removeAttribute('data-popupState')
        }
    });
});