import { items } from "./Model";
import ViewModel from "./ViewModel";
import {utils, krStr, UA} from "./utils";

const g:any = global;

let updateTimer:ReturnType<typeof setTimeout>;
let creatTimer:ReturnType<typeof setTimeout>;
/* 정지 모션 관련 변수 */
let endtimer:ReturnType<typeof setTimeout>;
let resizeTime:ReturnType<typeof setTimeout>;
//let flag:boolean = false;

let nodeList: any = []; // d3 bubble nodeList
let forceList: any = []; // d3.forceSimulation List
let timeLine: any; // 버블 클릭 시 타임라인 이벤트

let ww: number = g.window.innerWidth; // 리사이징 width 메모리
interface circleData extends items {
    radius: number;
    x: number;
    y: number;
    index: number;
}

interface options {
    app: string;
    pp: number[]; // 버블 xy 위치값
    sizes: number[]; // 가로값에 대한 폰트 사이즈 비율
    color: string[]; // 버블 BG컬러
    forceXY: {x: number; y: number}[][]; // 시뮬레이터 XY
    fColor: string[]; // 키워드 컬러
    fontY: string[] // 키워드 텍스트 y축
}
// 임의지정: 아이폰5 가로 최소 사이즈
const IPHONE5 = 568;
export default class KeywordList<S> extends ViewModel<S>{
    public options: any;
    constructor(d: S) {
        super(d);
        this.options = {
            app: '#newsEdgeBubbles',
            pp: [48, 32, 28.8, 26.6, 24, 20, 20, 20, 20, 20].map((self, i) => i < 4 ? (self / 1.1) : self),
            sizes: [6.66, 5.06, 4.26, 4, 3.73, 3.2, 3.2, 3.2, 3.2, 3.2].map((self, i) => i < 4 ? (self / 1.1) : self),
            color: this.color,
            forceXY: [
                // Portrait Percent
                [
                    { x: 0.402, y: 0.357},
                    { x: 0.386, y: 0.427},
                    { x: 0.431, y: 0.364},
                    { x: 0.413, y: 0.356},
                    { x: 0.428, y: 0.421},
                    { x: 0.432, y: 0.451}, // 기준 0.4
                    { x: 0.391, y: 0.432},
                    { x: 0.416, y: 0.324},
                    { x: 0.371, y: 0.412},
                    { x: 0.457, y: 0.318}
                ],
                // Landscape Percent
                [
                    { x: 1.5, y: 0.34 },
                    { x: 0.4, y: 0.34 },
                    { x: 0.8, y: 0.34},
                    { x: 0.5, y: 0.34 },
                    { x: 1.32, y: 0.3 },
                    { x: 1.17, y: 0.3 },
                    { x: 0.63, y: 0.31 },
                    { x: 1.17, y: 0.32 },
                    { x: 1.02, y: 0.31 },
                    { x: 0.21, y: 0.3 },
                ]
            ],
            fColor: ['#ffffff', '#333333'],
            fontY: ['.3em', '-.3em', '-.9em']
        };
        this._resize = this._resize.bind(this);
    }

    // true일때 모바일 가로모드
    get isLandScape(): boolean {
        if (g.window.navigator.userAgent.indexOf('Macintosh') > 0) {
            return false;
        } else {
            //return g.screen.orientation.type.match(/\w+/)[0] === 'landscape' && g.window.innerWidth > g.window.innerHeight  && g.window.devicePixelRatio > 1;
            return g.window.innerWidth > g.window.innerHeight  && g.window.devicePixelRatio > 1;
        }
    }
    get checkLimit(){
        if (this.isLandScape) {
            return g.window.innerWidth > IPHONE5 ? [640, 320] : [g.window.innerWidth, 320]
        } else {
            return g.window.innerWidth >= 640 ? [640, 640] : [g.window.innerWidth, g.window.innerWidth];
        }
    }
    public stop(): void {
        forceList.forEach((v: any) => {
            v.stop();
        })
    }

    public hideEff(): void {
        let size = nodeList.length, cnt = 0;

        for(let i=0;i<size;i++) {
            if(i !== size) {
                nodeList[i].attr('class','group-wrap remove');
            }
        }

        if(forceList.length > 0) {
            let f = forceList.pop();
            f.stop().alpha(3)
                .force('collide', g.d3.forceCollide().radius((d:any) => d.radius + 20))
                .alphaDecay(0.01)
                .restart();

            if (endtimer) clearTimeout(endtimer);

            endtimer = setTimeout(()=>{
                f.stop();
            }, 1000)
        }
    }

    public updateBubble(): void {
        const data = this._updatePosition();
        const svg = document.getElementById('newsEdgeBubbles');
        ww = document.body.clientWidth;
        svg.setAttribute('width', this.checkLimit[0]);
        svg.setAttribute('height', this.checkLimit[1]);
        svg.setAttribute('viewBox', `0 0 ${this.checkLimit[0]} ${this.checkLimit[1]}`);

        this._createNodes(data);
        this._setForce(data);

        if(updateTimer) clearTimeout(updateTimer);
        updateTimer = setTimeout(() => {
            this._removeNodes();
        }, 1000)

        // 업데이트 콜백
        if (this.eventListner.has('b-update')) {
            this.eventListner.get('b-update')();
        }
    }

    public clickEff(i:number) {
        g.gsap.killTweensOf(timeLine);
        const svg = document.querySelectorAll('.group-wrap .item');
        const wrap = document.getElementById('wrap');
        const t =  0.3;

        svg.forEach(v => v.setAttribute('class', 'item'));
        svg[i].setAttribute('class', 'item active');
        wrap.setAttribute('class', 'clicked');

        timeLine = g.gsap.timeline({
            onComplete: () => {
            }
        });

        timeLine
            .to(svg[i].querySelector('circle'), t, { scale: 0.8, transformOrigin: '50% 50%', ease: 'power3.inOut', duration: t})
            .to(svg[i].querySelector('circle'), t, { scale: 20, transformOrigin: '50% 50%', ease: 'power3.inOut'})

    }

    private _setForce<T extends circleData>(data: T): void {
        const nodes = g.d3.selectAll('.group-wrap:first-child .node');
        const www = document.querySelector(this.options.app).clientWidth;
        const hhh = document.querySelector(this.options.app).clientHeight;
        const tick = function() {
            try {
                nodes
                    .transition()
                    .duration(1 / 20)
                    .attr('transform', (d:T) => {
                        let xx = Math.max(d.radius - 60, Math.min(www - d.radius, d.x));
                        let yy = Math.max(d.radius, Math.min(hhh - d.radius, d.y));
                        return `translate(${d.x-10}, ${d.y-10})`
                        //return `translate(${xx+5}, ${d.y-5})`
                    })
            } catch (e) {
                smf.stop().restart();
            }
        };
        let check = 0;
        const smf = g.d3.forceSimulation()
            .force('x', g.d3.forceX(this.checkLimit[0] / 2))
            .force('y', g.d3.forceY(this.checkLimit[1] / 2))
            .force("collide",g.d3.forceCollide( (d: circleData, z:number) => {
                let i = 4;
                const random = Math.floor(Math.random() * 10);

                if(check < 2 && random%2 === 1) {
                    //console.log(`z: `,z);
                    check ++;
                    if(z < 5) {
                        check = 5;
                    }
                    i = -8
                }
                /*let i = 4;
                const random = Math.floor(Math.random() * 10);
                if(d.index === random) {
                    i = -random*2 < 0 ? -4 : -random*2;
                    chceck = true;
                } else if(random > 5) {
                    i = (i + random) > 10 ? 4 : 4;
                }


                // 마지막 효과 더 주자
                if(!chceck && z === 9) {
                    i = -4
                }*/
                //console.log(`i: `,i)
                return d.radius + i
            }))
            .force("charge", g.d3.forceManyBody())
            .nodes(data)
            .alphaTarget(0)
            .velocityDecay(0.9) // static value
            .on('tick', tick);

        const f = () => {
            //console.log('play')
            return smf.stop()
                .velocityDecay(0.35)
                .force('chargeEffect', g.d3.forceManyBody().strength(0.003))
                .alphaDecay(0.01)
                .alpha(4).on('tick', ()=>{
                    nodes
                        .transition()
                        .duration(100)
                        .attr('x', (d: any) => d.x - 1)
                        .attr('y', (d: any) => d.y - 1);
                }).restart();
        };

        /*if(flag === false) {
            smf.on('end', f);
             flag = true;
        } else {
            if(endtimer) clearTimeout(endtimer);
            endtimer = setTimeout(() => {
                const v = f().on('end', f);
                forceList[0] = v;
            }, 6000);
        }*/
        forceList.push(smf)
    }

    private _removeNodes(): void {
        let size = nodeList.length;

        while (size > 1) {
            nodeList.shift().remove();
            size--;
        }
    }
    // d3 attr 메소드 factory
    private _attr(t: string | any, styles: any): void {
        Object.keys(styles).map((a) => {
            if(typeof t === 'string') {
                g.d3.select(t).attr(a,styles[a])
            } else {
                t.attr(a,styles[a])
            }
        });
    }
    // circle 생성
    private _createNodes<T extends circleData>(cdata: T): void {
        const { fColor, color, sizes, fontY } = this.options;
        const _this = this;
        // svg 그룹추가
        let svg = g.d3.select('#newsEdgeBubbles')
            .insert('g',':first-child').attr('class', 'group-wrap');

        //  노드
        const group = svg
            .selectAll('.item')
            .data(cdata)
            .enter()
            .append('g')
            .attr('class', 'node')
            .attr('transform', (d:T) => `translate(${d.x}, ${d.y})`)
            .append('svg')
            .attr('class','item')
            .attr('role', 'list')
            .attr('aria-label', (d:T, i: number)=> `${i+1}${krStr[3]}`);

        const gg = group
            .on('click', function (d: T) {
                _this.model.rank = d.index;
                if (_this.eventListner.has('b-click')) {
                    _this.eventListner.get('b-click').call(_this, d.index, this);
                }
                // 타임라인
                //g.gsap.timeline({ defaults: { overwrite: 'auto', ease: 'none' }, paused: true });
                //console.log(this.model.items[d.index])
            })
            .append('g');
            if(UA.isIE) {
                gg.attr('transform', 'scale(0.00001)')
            }

            gg.attr('class',(d:T, i:number)=>`n${i}`)
            .on('mouseover', function(d: T) {
                if (_this.eventListner.has('b-over')) {
                    _this.eventListner.get('b-over').call(this);
                }
            })
            .on('mouseout', function(d: T) {
                if (_this.eventListner.has('b-out')) {
                    _this.eventListner.get('b-out').call(this);
                }
            })




        gg.append('circle')
            .attr('r', (d: T) => d.radius)
            .attr('cx', 0)
            .attr('cy', 0)
            .attr('fill', (d:T, i:number) => color[i]);

        gg.append('g').attr('class','t-group').append('text')
            .attr('class', 'bubbleText')
            .attr('fill', (d: T, i: number) => (i < 5) ? fColor[0] : fColor[1])
            .attr('font-size', (d:T,i:number) => {
                let s = (this.isLandScape && sizes[i] <= 4) ? 4 : sizes[i];
                let v = (this.isLandScape && g.window.innerWidth > IPHONE5 && i < 5) ? s*1.3 : s;
                // iphone5 가로모드
                if (g.window.innerWidth === IPHONE5) {
                    v = (i < 5) ? s *1.1 : 3.6;
                }
                return g.d3.scaleLinear().domain([0, 100]).range([0, this.checkLimit[1]])(v) + 'px'
            })
            .selectAll('.lineBreak')
            .data((d:T, i: number) => this.model.items[i].keyword_service.split('<br />').map((self:string) => self).slice(0, 3))
            .enter()
            .append('tspan')
            .attr('class', 'lineBreak')
            .attr('x', 0)
            .attr('y', function () {
                switch (this.parentNode.childElementCount) {
                    case 1:
                        return fontY[0]
                    case 2:
                        return fontY[1]
                    case 3:
                        return fontY[2]
                    default:
                        return 0;
                }
            })
            .attr('dy', function (d:T, i:number) {
                return i === 0 ? 0 : (i * 1.3) + 'em';
            })
            .text(function (title: string) {
                return title;
            });


        if(creatTimer) clearTimeout(creatTimer);
        creatTimer = setTimeout(() => {
            // svg > g요소 중앙 정렬 하기
            // let groupWrap = document.querySelector('.group-wrap');
            // console.log(groupWrap.getBoundingClientRect())
            // groupWrap.setAttribute('transform','translate(0,0)')
            svg.attr('class', 'group-wrap active');
            if(UA.isIE) {
                gg.transition()
                    .delay((d:T, i:number) => {
                        return i < 8 ? i*100 : 300
                    })
                    .duration(600)
                    .attr('transform','scale(1)')
            }
        },100);
        nodeList.push(svg);
    }
    // 초기 svg 요소 생성 - 업데이트와 관련 없음
    private _drawSvg(): void {
        let targetNode = g.d3.select(this.options.app);

        this._attr('#newsEdgeBubbles', {
            width: this.checkLimit[0],
            height: this.checkLimit[1],
            viewBox: [0, 0, this.checkLimit[0], this.checkLimit[1]],
            role: 'group',
            'aria-labelledby': 'title desc',
        });
        // 타이틀 추가
        targetNode.append('title').attr('id', 'title').text(krStr[1]);
        // desc추가
        targetNode.append('desc').attr('id', 'desc').text(krStr[2]);
    }
    // 위치계산
    private _updatePosition(): circleData {
        const { forceXY, pp } = this.options;
        // var viewBox = 650;
        // var options = bubbles.options;
        let positions: {x:number; y:number}[], temp = pp;

        if (this.isLandScape) {
            // 모바일 & 가로 모드 일때
            // 버블 크기 조정
            temp = [...pp.map((i:number) => {
                if (!UA.isEdge) {
                    if(g.window.innerWidth >= 640) {
                        return i/(this.checkLimit[1]/200)
                    } else {
                        return i-(i/2.5);
                    }
                } else {

                }
            })];
            const svg = document.getElementById('newsEdgeBubbles');
            svg.setAttribute('height', `${this.checkLimit[1]}`)
            svg.setAttribute('viewBox', `0 0 ${this.checkLimit[0]} ${this.checkLimit[1]}`);
            // console.clear();
            // console.table(forceXY[1])

            positions = utils.shuffleArray(forceXY[1])
        } else {
            positions = utils.shuffleArray(forceXY[0]);
        }
        //console.clear()

       /* if(this.isLandScape) {
            positions[0].x = 1.32;
            positions[0].y = 0.3
            console.table(positions)
        }*/
        const radiusScale = g.d3.scaleLinear().domain([0, 100]).range([0, this.checkLimit[0]]);


        const xy =  pp.map((percent: number[], i: number) => {
            let r = parseInt(radiusScale(temp[i] / 2));
            let c = {
                x: Math.floor(this.checkLimit[1] * positions[i].x) + r,
                y: Math.floor(this.checkLimit[1] * positions[i].y) + r,
            }
            /*if(i===0) {
                c.x =  Math.floor(Math.random()*(280-80+1)) + 80;
                c.y = Math.floor(Math.random()*(300-120+1)) + 120;
            }*/
            return c
        });

        const tt = xy[0];
        const random = Math.floor(Math.random() * 10);
        xy[0] = xy[random];
        xy[random] = tt;


        return this.model.items.map((d:any, i:number) => {
            const radius = parseInt(radiusScale(temp[i] / 2))
            //const radius = ww >= 500 ? parseInt(radiusScale(temp[i] / 2.5)) : parseInt(radiusScale(temp[i] / 2))
            if(this.isLandScape && i===0) {
                // 랜덤 true/false 만들기
                const k = Boolean(Math.floor(Math.random() * 2));
                xy[i].x = window.innerWidth/2 + (k ? -(Math.floor(Math.random() * 20)) : Math.floor(Math.random() * 20));
                xy[i].y = 160 + (k ? Math.floor(Math.random() * 20) : -(Math.floor(Math.random() * 20)));
            }

            return {
                radius,
                x: xy[i].x,
                y: xy[i].y
            }
        });
    }

    private _resize(): void {
        if(document.body.clientWidth === ww) return;
        const wrap = document.getElementById('wrap');
        const mainWrap = document.querySelector('.mainContainer');
        const f = () => {
            if(resizeTime) clearTimeout(resizeTime)
            this.hideEff();
            resizeTime = setTimeout(this.updateBubble.bind(this), 200)
        };

        // 모바일일때만
        if(wrap) {
            // 팝업이 열려있지 않은 상태에서만
            if(wrap.className.indexOf('clicked') < 0) {
                f();
            } else {
                document.querySelector('body').setAttribute('data-popupState', 'true');
                sessionStorage.setItem('resize', 'true');
            }
        } else if (mainWrap){
            f();
        }
    }

    protected _init<T>(options?: T): void {
        this.options = Object.assign(this.options, options);
        const data = this._updatePosition();
        const _this = this;

        this._drawSvg();
        this._createNodes(data);
        this._setForce(data);
        window.addEventListener('resize', () => {
            if(resizeTime) clearTimeout(resizeTime);
            resizeTime = setTimeout(_this._resize, 300)
        })
    }

    protected _addEvent<V>(f: V) {}
    protected _removeEvent() {
        window.removeEventListener('resize', this._resize)
    }
    protected _update(): void {
        this.updateBubble();
    }
}