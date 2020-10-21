import { Data } from "../../../components/Data";
import Binder from "../../../components/Binder";
import Calendar from "../../../components/Calendar";
import Controller from "../../../components/Controller";
import Progress from "../../../components/Progress";
const g:any = global;
const DATA = new Binder<Data>(new Data());

const calendar = createInstance(Calendar);
const progress = createInstance(Progress);

g.dd = DATA;
g.cc = calendar;
g.pp = progress;
function createInstance<T extends Controller<Binder<Data>>>(c: new <S extends Binder<Data>>(d: S) => T): T {
    const inst = new c(DATA);
    DATA.addProcess(c.name, inst);
    return inst;
}
/**
* calendar 이벤트 바인딩
* */
(() => {
    const prev = <HTMLElement> document.querySelector('.btnTravel.prev'),
        next = <HTMLElement> document.querySelector('.btnTravel.next'),
        today = <HTMLElement> document.querySelector('.btnTravel.today');

    calendar.addEvent({ prev, next, today });
})();

document.addEventListener('DOMContentLoaded', () => {
    // 초기화
    DATA.update(g.KEYWORD_URL).then(() => {
        calendar.render();
        progress.render();
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