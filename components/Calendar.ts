import { krStr } from "./Util";
import Controller from "./Controller";
interface sizzle {
    [key: string]: HTMLElement
}

const g:any = global;
const selector: sizzle = {};

export default class Calendar<S> extends Controller<S>{
    [index: string]: any;

    constructor(d: S) {
        super(d);
    }

    prev() {
        this.update(this._getDate('subtract'))
    }

    next() {
        this.update(this._getDate('add'))
    }

    today() {
        this.update(g.KEYWORD_URL);
    }

    render() {
        let { service_dtm, min_dtm, server_dtm, update_dtm } = this.binder.data.time,
            { prev, next, today } = selector;
        const timeLog = <HTMLElement> document.querySelector('.timeLog');

        try {
            timeLog.innerText = `${g.moment(update_dtm).format('YYYY.MM.DD HH:mm')} ${krStr[0]}`;
        } catch (e) {
            console.log('.timeLog not found', e)
        }

        service_dtm = service_dtm.split(' ')[0];
        min_dtm = min_dtm.split(' ')[0];
        server_dtm = server_dtm.split(' ')[0];

        // 최신 날짜 일때
        if (service_dtm >= server_dtm) {
            next.setAttribute('disabled', 'true');
            today.style.display = 'none';
            // 안내문구 노출
            timeLog.style.display = 'block';
        } else if(service_dtm <= min_dtm) {
            prev.setAttribute('disabled', 'true');
        } else {
            next.removeAttribute('disabled');
            prev.removeAttribute('disabled');
            today.style.display = 'inline-block';
            timeLog.style.display = 'none';
        }

        // 날짜 변경
        const t = service_dtm.split('-');
        (<HTMLElement> document.querySelector('.timeline .year')).innerText = t[0];
        (<HTMLElement> document.querySelector('.timeline .month')).innerText = t[1];
        (<HTMLElement> document.querySelector('.timeline .date')).innerText = t[2];
    }

    _getDate(type: string) {
        if (!type) {
            throw Error('_getDate: empty parameter');
        }
        if (!g.KEYWORD_URL || !g.moment) {
            throw Error('KEYWORD_URL undefined or moment undefined');
        }
        let { service_dtm, min_dtm, server_dtm } = this.binder.data.time,
            date = (service_dtm).split(' ');

        date[0] = g.moment(service_dtm)[type](1, 'days').format('YYYY-MM-DD');
        /**
         * 제약 사항: 최소, 최대 날짜에 해당 할 경우 핸들링 불가 설정
         */
        if (date[0] <= server_dtm.split(' ')[0] && date[0] >= min_dtm.split(' ')[0]) {
            return `${g.KEYWORD_URL}?service_dtm=${date.join('%20')}`;
        }
        return g.KEYWORD_URL
    }
    _update() {
        this.render()
        this.binder.items.get('Progress').render();
    }


    _addEvent(p: sizzle) {
        Object.entries(p).forEach(([key,el]: [string, HTMLElement]) => {
            selector[key] = el;
            el.addEventListener('click', this[key].bind(this));
        })
    }
}