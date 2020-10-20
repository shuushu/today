import { Data } from "../../../components/Data";
import Calendar from "../../../components/Calendar";
import Controller from "../../../components/Controller";
const g:any = global;
const DATA = new Data();

const calendar = createInstance(Calendar);
// const progress = createInstance(Progress);

g.dd = DATA;
g.cc = calendar;

function createInstance<T extends Controller<Data>>(c: new <S extends Data>(d: S) => T): T {
    return new c(DATA);
}

(() => {
    const N_PREV = <HTMLElement> document.querySelector('.btnTravel.prev'),
        N_NEXT = <HTMLElement> document.querySelector('.btnTravel.next'),
        N_TODAY = <HTMLElement> document.querySelector('.btnTravel.today');

    calendar.render = function() {
        let { service_dtm, min_dtm, server_dtm, update_dtm } = this.data.time;
        const timeLog = <HTMLElement> document.querySelector('.timeLog');
        try {
            timeLog.innerText = `${g.moment(update_dtm).format('YYYY.MM.DD HH:mm')}기준`;
        } catch (e) {
            console.log('.timeLog not found')
        }

        service_dtm = service_dtm.split(' ')[0];
        min_dtm = min_dtm.split(' ')[0];
        server_dtm = server_dtm.split(' ')[0];

        // 최신 날짜 일때
        if (service_dtm >= server_dtm) {
            N_NEXT.setAttribute('disabled', 'true');
            N_TODAY.style.display = 'none';
            // 안내문구 노출
            timeLog.style.display = 'block';
        } else if(service_dtm <= min_dtm) {
            N_PREV.setAttribute('disabled', 'true');
        } else {
            N_NEXT.removeAttribute('disabled');
            N_PREV.removeAttribute('disabled');
            N_TODAY.style.display = 'inline-block';
            timeLog.style.display = 'none';
        }

        // 날짜 변경
        const t = service_dtm.split('-');
        (<HTMLElement> document.querySelector('.timeline .year')).innerText = t[0];
        (<HTMLElement> document.querySelector('.timeline .month')).innerText = t[1];
        (<HTMLElement> document.querySelector('.timeline .date')).innerText = t[2];
    };


    calendar.addEvent({
        prev: N_PREV,
        next: N_NEXT,
        today: N_TODAY
    });
})();

document.addEventListener('DOMContentLoaded', () => {
    // 초기화
    DATA.update(g.KEYWORD_URL).then(() => {
        calendar.render();
    });
});


/*
* 인터페이스.update(path).then(res=> {
*   데이터 업데이트
*   달력업데이트
*   버블업데이트
*   프로그래스 업데이트;
* })
*
*
* */