import { krStr, autobind } from "./utils";
import ViewModel from "./ViewModel";

const g:any = global;

@autobind
export default class Calendar<S> extends ViewModel<S>{
    [index: string]: any;

    constructor(d: S) {
        super(d);
    }

    protected prev(): void {
        this.update(this._getDate('subtract'))
    }

    protected next(): void {
        this.update(this._getDate('add'))
    }

    protected today(): void {
        this.update(g.KEYWORD_URL);
    }

    protected _init(): void {
        let { service_dtm, min_dtm, server_dtm, update_dtm } = this.model.time,
            [prev, next, today, btnShare, timeLog] = ['.prev', '.next', '.today', '.btnShare', '.timeLog'].map(t => document.querySelector(t));

        if(timeLog) {
            timeLog.innerText = `${g.moment(update_dtm).format('YYYY.MM.DD HH:mm')} ${krStr[0]}`;
        }

        service_dtm = service_dtm.split(' ')[0];
        min_dtm = min_dtm.split(' ')[0];
        server_dtm = server_dtm.split(' ')[0];

        // 최신 날짜 일때
        if (service_dtm >= server_dtm) {
            next.setAttribute('disabled', 'true');
            prev.removeAttribute('disabled');
            // 안내문구 노출
            timeLog.setAttribute('class','timeLog active');
            today.style.display = 'none';
            if(btnShare) {
                btnShare.style.display = 'block';
            }
        } else if(service_dtm <= min_dtm) {
            prev.setAttribute('disabled', 'true');
        } else {
            next.removeAttribute('disabled');
            prev.removeAttribute('disabled');
            today.style.display = 'inline-block';
            timeLog.setAttribute('class','timeLog');
            if(btnShare) {
                btnShare.style.display = 'none';
            }
        }

        // 날짜 변경
        const t = service_dtm.split('-');
        (<HTMLElement> document.querySelector('.timeline .year')).innerText = t[0];
        (<HTMLElement> document.querySelector('.timeline .month')).innerText = t[1];
        (<HTMLElement> document.querySelector('.timeline .date')).innerText = t[2];
    }

    private _getDate(type: string): string {
        if (!type) {
            throw Error('_getDate: empty parameter');
        }
        if (!g.KEYWORD_URL || !g.moment) {
            throw Error('KEYWORD_URL undefined or moment undefined');
        }
        let { service_dtm, min_dtm, server_dtm } = this.model.time,
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

    protected _update(): void {
        // 캘린더 리렌더
        this._init();
        this.updateProcess.forEach((callback) => callback());
    }

    protected _removeEvent<V>(p: V): void {
    }

    protected _addEvent<V>(p: V): void {
        if(Array.isArray(p)) {
            p.forEach((i: string) => {
                this.eventListner.set(`.btnTravel.${i}`, this[i])
            })
        }
    }
}