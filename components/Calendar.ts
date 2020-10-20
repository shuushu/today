import Controller from "./Controller";
const g:any = global;

export default class Calendar<S> extends Controller<S>{
    [index: string]: any;
    public render: any;
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

    _getDate(type: string) {
        if (!type) {
            throw Error('_getDate: empty parameter');
        }
        if (!g.KEYWORD_URL || !g.moment) {
            throw Error('KEYWORD_URL undefined or moment undefined');
        }
        let { service_dtm, min_dtm, server_dtm } = this.data.time,
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
    }

    _addEvent(p: {[key: string]: HTMLElement}) {
        Object.entries(p).forEach(([key,el]: [string, HTMLElement]) => {
            el.addEventListener('click', this[key].bind(this));
        })
    }
}