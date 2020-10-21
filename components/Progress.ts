import Controller from "./Controller";
import TMP_PROGRESS from "../tmp/TMP_PROGRESS";

interface dy {
    [key: string]: string
}

let init: boolean = false;
const g:any = global, ss = (1000 * 60 * 60 * 24); // (((1000 * 60) * 60) * 24) - (1000 * 60) // 23시간 59분 => 23시간으로 변경

export default class Progress<S> extends Controller<S> {
    private options: dy;
    constructor(d: S) {
        super(d);
        this.options = {
            target: '#newsEdgeProgress',
            viewBox: '0,0,254,48',
            width: '254',
            height: '48',
        }
    }
    get limit() {
        return Number(this.options.width) * (g.moment(this.binder.data.time.server_dtm).valueOf()- g.moment(this.binder.data.time.server_dtm).startOf('day').valueOf())/ ss;
    }

    render<T extends dy>(opt?: T) {
        const props = opt || this.options;
        const target = document.querySelector(props.target);

        //초기화
        target.innerHTML = TMP_PROGRESS;
        let t = new Map(['.pathBack','.pathFront','.timeGroup'].map( i => [i, document.querySelector(i)]));
        let hm = new Map(['.hh', '.mm'].map( i => [i, document.querySelector(`.timeText ${i}`)]));
        /* 프로퍼티 설정 */
        Object.entries(props).forEach(([k, v]: [string, string]): void => {
            if(k !== 'target') target.setAttribute(k, v);
        });

        // 드래드에 속한 자식요소들 위치 지정
        for(let [k,v] of t) {
            if (k === '.timeGroup') {
                v.setAttribute('transform', `matrix(1,0,0,1,${this.limit},24)`)
            } else {
                v.setAttribute('d', `M0 24 l ${this.limit} 0.001`)
            }
        }
        // 툴팁 시간 표시
        hm.get('.hh').textContent = g.moment(this.binder.data.server_dtm).format('HH')
        hm.get('.mm').textContent = this._mm(10);




    }
    /* n분 단위 표시 */
    _mm(n: number) {
        let [a1, a2] = g.moment(this.binder.data.server_dtm).format('mm');
        if (a2 < n) {
            return `${a1}0`;
        } else {
            return `${a1}${n}`;
        }
    }
}