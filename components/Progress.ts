import ViewModel from "./ViewModel";
import TMP_PROGRESS from "../tmp/TMP_PROGRESS";

interface dy {
    [key: string]: string | number;
}
const g:any = global, ss = (1000 * 60 * 60 * 24); // 24시간 > ms 변환
let drag: any; // gsap dragable plugin
let resizeTime:ReturnType<typeof setTimeout>;
let flag = false; // 리사이징와 타임라인 관련
export default class Progress<S> extends ViewModel<S> {
    public axisX: number;

    constructor(d: S) {
        super(d);

        this.axisX = 0;
        this._resize = this._resize.bind(this)
    }
    get options() {
        return {
            width:  Math.min(window.innerWidth, 375) * (254 / 375),
            height: Math.min(window.innerWidth, 375) * (48 / 375),
            r: (Math.min(window.innerWidth, 375) * (24 / 375)) / 2
        }
    }

    get isOverflow(): boolean {
        return this.model.isOverflow;
    }

    get isToday(): boolean {
        return this.model.isToday;
    }
    // pathBack 리밋트
    get limit(): number {
        if (this.isToday) {
            return Number(this.options.width) * (g.moment(this.model.time.server_dtm).valueOf()- g.moment(this.model.time.server_dtm).startOf('day').valueOf())/ ss;
        } else {
            return Number(this.options.width);
        }
    }

    public toggleClass(this: {_add: string, _t: string}, e:any): void {
        const { _add: _a, _t } = this;
        const { target, currentTarget } = e as MouseEvent & {target: HTMLElement, currentTarget: HTMLElement};

        if (target.classList.contains(_t)) {
            currentTarget.classList.toggle(_a);
        }
    }
    protected _update(): void {
    }

    protected _init(opt?: any): void {
        this._drawPath(opt);
        this._updateTooltip();
        window.addEventListener('resize', this._resize)
    }

    private _resize(): void {
        console.log(this.axisX, this.options.width)
        if(resizeTime) clearTimeout(resizeTime);
        this._removeEvent();
        resizeTime = setTimeout(() => {
            document.getElementById('newsEdgeProgress').innerHTML = '';

            this._drawPath();
            this._updateTooltip();
            this._addEvent(['.progressWrap']);
            // 드래그 위치 재 설정
            if(flag) {
                document.querySelector('.timeGroup').setAttribute('transform', `matrix(1,0,0,1,${this.limit}, ${this.options.height / 2})`);
                document.querySelector('.pathFront').setAttribute('d', `M0 ${this.options.height / 2} l ${this.limit} .001`);
                g.TweenMax.set(".timeGroup", {x: this.limit});
            }

        }, 300)
    }

    // 프로그레스 바 그리기
    private _drawPath(opt?: any) {
        const { width, height, r }  = opt || this.options;
        const target = document.querySelector('#newsEdgeProgress');
        //초기화
        if (target.innerHTML.length === 0) {
            target.innerHTML = TMP_PROGRESS;
        }

        const cx = this.axisX = this.isToday && this.isOverflow ? this.limit : this.axisX;
        const now = g.moment(this.model.time.progress_dtm).valueOf();
        const start = g.moment(this.model.time.progress_dtm).startOf('day').valueOf();
        const percent = (now - start) / 86400000;
        const data = {
            front: `M0 ${height / 2} l ${cx} .001`,
            back: `M0 ${height / 2} l ${this.limit} .001`,
            backboard: (function () {
                const time = width / (height * 0.08333333333333333);
                let pathResult = '';

                for (let i = 0; i < time; i++) {
                    pathResult += 'M ' + (height * 0.08333333333333333) * i + ' ' + (height * 0.4166666666666667) + ' H ' + (height * 0.08333333333333333) * i + ' V ' + ((height * 0.4166666666666667) + (height * 0.16666666666666666));
                }
                return pathResult;
            })()
        };

        /* 프로퍼티 설정 */
        target.setAttribute('width', width);
        target.setAttribute('height', height);
        target.setAttribute('viewBox', `0,0,${width},${height}`);


        let [ pathBackboard, pathBack, pathFront, timeGroup ] = [ '.pathBackboard', '.pathBack', '.pathFront', '.timeGroup' ].map(i => document.querySelector(i));
        pathBackboard.setAttribute('d', data.backboard)
        pathBack.setAttribute('d', data.back);
        pathFront.setAttribute('d', data.front);

        pathBack.setAttribute('stroke-width', height * 0.20833333333333334);
        pathFront.setAttribute('stroke-width', height * 0.2916666666666667)
        timeGroup.setAttribute('transform', `matrix(1,0,0,1,${cx}, ${height / 2})`);

        document.querySelector('.timeKnob').setAttribute('r', r)


        const timeTooltip = document.querySelector('.timeTooltip');
        timeTooltip.setAttribute('width', `${width * 0.36}`);
        timeTooltip.setAttribute('height', `${height * 0.8333333333333334}`);
        timeTooltip.setAttribute('viebox', `0, 0, ${width * 0.36}, ${height * 0.8333333333333334}`)

        const tooltipRect = g.d3.select('.timeTooltip rect');
        tooltipRect.attr('width', `${width * 0.36}`);
        tooltipRect.attr('height', `${height * 0.8333333333333334}`);
        tooltipRect.attr('x', `${(percent * 100 > 84) ? -(((width * .36) / 2) - (84 - percent * 100)) : -((width * .36) / 2)}`);
        tooltipRect.attr('y', `${-(height + r + 4)}`);
        tooltipRect.attr('rx', ` ${r * 2}`);

        timeTooltip.querySelector('#filter2Path').setAttribute('transform', `translate(-${r+2} -${r*2})`)

        const timeText = timeTooltip.querySelector('.timeText')
        timeText.setAttribute('x', `${(84 < percent * 100) ? (84 - percent * 100) : 0}`);
        timeText.setAttribute('y', `${-((r * 3) + 2)}`);
        timeText.setAttribute('font-size', `${width * 0.088}px`);
    }

    /* 이벤트리스너 바인딩 */
    protected _addEvent<V>(p: V): void {
        const _this = this;
        const end = this.updateProcess.get('dragEnd').bind(this) || function() {};
        let d = document.querySelector('.pathFront').getAttribute('d').split(' ');

        drag = g.Draggable.create('.timeGroup', {
            type: 'x',
            bounds: {
                minX: 0,
                maxX: _this.isToday ? this.limit : Number(this.options.width)-1
            },
            onDrag: function () {
                const gmt = 32340000; // GMT기준 9시간 차 (1000*60*60*h)
                const dt = Math.abs(ss / Number(_this.options.width)); // this.x 이동 값 > 시간(타임스탬프) 변환값
                const yyymmdd = new Date((_this.model.time.service_dtm).split(' ')[0]).valueOf(); // YYYY-MM-DD;
                let X = _this.axisX = this.x;
                d[3] = String(X);

                _this.model.updateProgress(g.moment((yyymmdd+dt*X)-gmt).format(`YYYY-MM-DD HH:mm:ss`))
                document.querySelector('.newsEdgeProgress').setAttribute('class','newsEdgeProgress');
                document.querySelector('.pathFront').setAttribute('d', `${d.join(' ')}`);
                _this._updateTooltip();
            },
            onDragEnd: function() {
                // 마지막 지점에 도달할대
                flag = Math.floor(_this.limit) - Math.floor(this.x) <= 1;
                if (_this.axisX !== this.startX) {
                    end();
                }
            }
        });
        // 접기
        if(Array.isArray(p)) {
            p.forEach((i: string) => {
                this.eventListner.set(`${i}`, this.toggleClass.bind({_add: 'active', _t: 'btnProgress'}))
            })
        }
    }
    /* 이벤트 해제 */
    protected _removeEvent(): void {
        if(drag) {
            drag[0].kill();
        }
    }
    /* 툴팁업데이트 */
    private _updateTooltip(): void {
        const {progress_dtm} = this.model.time;

        let hm = new Map(['.hh', '.mm'].map( i => [i, document.querySelector(`.timeText ${i}`)]));
        // 툴팁 시간 표시
        hm.get('.hh').textContent = g.moment(progress_dtm).format('HH');
        hm.get('.mm').textContent = this._mm(progress_dtm);
    }
    /* n분 단위 표시 */
    private _mm(d?: string): string {
        const n = 10;
        let [a1, a2] = g.moment(d).format('mm');
        if (a2 <= n) {
            return `${a1}0`;
        } else {
            return `${a1}${n}`;
        }
    }


}