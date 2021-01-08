import ViewModel from "./ViewModel";
import { TMP_PROGRESS_THIN } from "../tmp/TMP_PROGRESS";
import { UA } from "./utils";
interface options {
    width: number;
    height: number;
    r: number;
};
const g:any = global, ss = (1000 * 60 * 60 * 24); // 24시간 > ms 변환
let drag: any; // gsap dragable plugin
let resizeTime:ReturnType<typeof setTimeout>;
let flag = false; // 리사이징와 타임라인 관련
let opt = (): options => {
    return  {
        width:  Math.min(window.innerWidth-30, 450),
        height: 8,
        r: (Math.min(window.innerWidth, 375) * (15 / 375)) / 2
    };
}
let ww: number = 0; // 리사이징 컨텐츠 영역 가로값 저장
let timeLine: any;
export default class Progress<S> extends ViewModel<S> {
    public axisX: number; // 드래그 x축
    public options: options
    constructor(d: S) {
        super(d);

        this.axisX = 0;
        this._resize = this._resize.bind(this);
        this.options = opt();
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
    protected _update(): void {}
    protected _init(): void {
        this._drawPath();
        this._updateTooltip();
        if (!UA.isPC) {
            window.addEventListener('resize', this._resize)
        }        
    }    

    private _resize(): void {
        if(resizeTime) clearTimeout(resizeTime);
        this._removeEvent();
        resizeTime = setTimeout(() => {
            document.getElementById('newsEdgeProgress').innerHTML = '';
            this.options = opt();
            this._drawPath();
            this._updateTooltip();
            this._addEvent(['.progressWrap']);
            // 드래그 위치 재 설정
            if(flag) {
                document.querySelector('.timeGroup').setAttribute('transform', `matrix(1,0,0,1,${this.limit}, ${this.options.height / 2})`);
                document.querySelector('.pathFront').setAttribute('width', `${this.limit}`);
                g.TweenMax.set(".timeGroup", {x: this.limit});
            }
            timeLine.play();
        }, 300);

    }

    // 프로그레스 바 그리기
    private _drawPath() {
        const { width, height, r }  = this.options;
        const wrapping = document.querySelector('.progressWrap');
        wrapping.classList.add('thin')
        wrapping.removeChild(document.getElementById('newsEdgeProgress'));
        const temp = document.createElement('div');
        temp.id = 'newsEdgeProgress';
        temp.innerHTML = TMP_PROGRESS_THIN;

        document.querySelector('.progressWrap').appendChild(temp);
        const target = g.d3.select('#newsEdgeProgress svg');
        const cx = this.axisX = this.isToday && this.isOverflow ? this.limit : this.axisX;
     
        let [ pathBackboard, pathBack, pathFront, timeGroup ] = [ '.pathBackboard', '.pathBack', '.pathFront', '.timeGroup' ].map(i => g.d3.select(i));
        const timeTooltip = g.d3.select('.timeTooltip');
        const isPC = UA.isPC && document.body.clientHeight > 1200;
        const HH = isPC ? 58 : 32;
        const WW = isPC ? 134 : 73;
        const RR = isPC ? 27 : 15;
        const tooltipRect = timeTooltip.select('rect');

        /* 프로퍼티 설정 */
        target.attr('width', `${width}`)
        target.attr('height', `${height}`)
        target.attr('viewBox', `0,0,${width},${48}`);

        pathBackboard.attr('width', width);
        pathBack.attr('width', this.limit);      
        pathFront.attr('width', `${cx}`);

        pathBackboard.attr('height', `${height}`)
        pathBack.attr('height', `${height}`)
        pathFront.attr('height', `${height}`)

        if(isPC) {
            [pathBackboard, pathBack, pathFront].forEach(elements => {
                elements.attr('rx', 5);
                elements.attr('ry', 5);
            })
            timeTooltip.attr('y', 64)
        }        
        timeGroup.attr('transform', `matrix(1,0,0,1, ${cx}, ${height / 2})`);


        timeTooltip.attr('width', `${WW}`);
        timeTooltip.attr('height', `${HH}`);
        timeTooltip.attr('viebox', `0, 0, ${WW}, ${HH}`);        


        tooltipRect.attr('width', `${WW}`);
        tooltipRect.attr('height', `${HH}`);

        tooltipRect.attr('x', `${-WW/2}`);
        tooltipRect.attr('y', `${-((isPC ? 92 : 30))}`);
        tooltipRect.attr('rx', `${RR}`);
        tooltipRect.attr('ry', `${RR}`);

        const arrow = timeTooltip.select('#filter2Path');
        if(isPC) {
            arrow.attr('d', 'M -9 0 l 9 18 l 9 -18 h -18z');
            arrow.attr('transform', 'translate(0 -34)');
        } else {
            arrow.attr('transform', `translate(-${r+2} -${r*2})`);
        }


        const timeText = timeTooltip.select('.timeText');
        timeText.attr('x', '0');
        timeText.attr('y', `${isPC ? -54 : -10}`);
        timeText.attr('font-size', '19px');
        ww = document.body.clientWidth;

        // 시간 툴팁 사라지기
        timeLine = g.gsap.timeline({
            onComplete: () => {}
        });
        
        timeLine
            .to('.timeText', { opacity: 0, delay: 5 })
            .to('.timeTooltip rect', {
                width: (UA.isPC) ? '60px' : '34px',
                x: (UA.isPC) ? '30px' : '17px',
                duration: 0.2, 
                delay: -0.15
            })
            .to('.timeTooltip g', { scale: (UA.isPC) ? 0.4 : 0.6, transformOrigin: '50% 50%', ease: 'power3.inOut', duration: 0.1, delay: (UA.isPC) ? 0 : -0.1})
            .to('.timeTooltip rect', { stroke: '#cccccc' })
    }

    /* 이벤트리스너 바인딩 */
    protected _addEvent<V>(p: V): void {
        const _this = this;
        const end = this.updateProcess.get('dragEnd').bind(this) || function() {};
        //let d = document.querySelector('.pathFront').getAttribute('d').split(' ');
        const body = document.body;
        const cache: any = {
            win: 0,
            svg: 0,
            t: null
        }

        drag = g.Draggable.create('.timeGroup', {
            type: 'x, y',
            bounds: {
                minX: 0,
                maxX: _this.isToday ? this.limit : Number(this.options.width)-1,
                minY: _this.options.r * 2,
                maxY: _this.options.r * 2
            },
            snap: {
                y: function(y: number) {
                    console.log(y)
                    return Math.round(y);
                }
            },
            onDragStart: function() {
                if (body.className.indexOf('scroll-block') < 0) {
                    body.className = 'scroll-block';
                }
                if (_this.eventListner.has('dragStart')) {
                    _this.eventListner.get('dragStart').call(this);
                }
                timeLine.pause();
                timeLine.reverse();
                clearTimeout(timeLine.timer);
                // 캐쉬 기록
                cache.win = document.body.clientHeight;
                cache.svg = document.querySelector('.newsEdgeProgress').clientWidth;
                cache.t = g.d3.select('.timeTooltip');
            },
            onDrag: function () {
                const gmt = 32340000; // GMT기준 9시간 차 (1000*60*60*h)
                const dt = Math.abs(ss / Number(_this.options.width)); // this.x 이동 값 > 시간(타임스탬프) 변환값
                const yyymmdd = new Date((_this.model.time.service_dtm).split(' ')[0]).valueOf(); // YYYY-MM-DD;
                _this.axisX = this.x;
                _this.model.updateProgress(g.moment((yyymmdd+dt*this.x)-gmt).format('YYYY-MM-DD HH:mm:ss'));
                document.querySelector('.newsEdgeProgress').setAttribute('class','newsEdgeProgress');
                document.querySelector('.pathFront').setAttribute('width', this.x);
                _this._updateTooltip();
                // [portrait view] 시간표시 가려지는 영역에 도달 할 경우 위치 변경
                let margin = 20;
                /* if (!(UA.isPC && cache.win > 1200) && cache.svg < 450) {
                    // 가장 왼쪽
                    if (this.x < margin) {
                        cache.t.attr('x', 20-this.x)
                    } else if(this.x > cache.svg - margin) {
                        cache.t.attr('x', (cache.svg - margin) -this.x)
                    } else {
                        cache.t.attr('x', null)
                    }                    
                } */
                
            },
            onDragEnd: function() {
                // 마지막 지점에 도달할대
                flag = Math.floor(_this.limit) - Math.floor(this.x) <= 1;
                if (_this.axisX !== this.startX) {
                    end();
                }
                body.removeAttribute('class');
                timeLine.timer = setTimeout(() => {
                    timeLine.play();
                }, 2000)
            }
        });
        // 접기
        if(Array.isArray(p)) {
            p.forEach((i: string) => {
                if (this.eventListner.has(i) === false) {
                    this.eventListner.set(`${i}`, this.toggleClass.bind({_add: 'active', _t: 'btnProgress'}))
                }
            })
        }
    }
    public detachDrag() {
        if(drag) {
            drag[0].kill();
        }
    }
    /* 이벤트 해제 */
    protected _removeEvent(): void {
        this.detachDrag();
    }
    /* 툴팁업데이트 */
    private _updateTooltip(): void {
        const {progress_dtm} = this.model.time;

        let [ hh, mm ] = ['.hh', '.mm'].map( i => g.d3.select(`.timeText ${i}`));
        // 툴팁 시간 표시
        hh.text(g.moment(progress_dtm).format('HH'));
        mm.text(this._mm(progress_dtm));
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
};