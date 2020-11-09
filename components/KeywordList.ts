import { items } from "./Model";
import ViewModel from "./ViewModel";
import {utils, krStr} from "./utils";
const g:any = global;

let updateTimer:ReturnType<typeof setTimeout>;
let creatTimer:ReturnType<typeof setTimeout>;
/* 정지 모션 관련 변수 */
let endtimer:ReturnType<typeof setTimeout>;
let resizeTime:ReturnType<typeof setTimeout>;
let flag:boolean = false;

let nodeList: any = []; // d3 bubble nodeList
let forceList: any = []; // d3.forceSimulation List
let timeLine: any; // 버블 클릭 시 타임라인 이벤트


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

export default class KeywordList<S> extends ViewModel<S>{
    public options: any;
    constructor(d: S) {
        super(d);
        this.options = {
            app: '#newsEdgeBubbles',
            pp: [48, 32, 28.8, 26.6, 24, 20, 20, 20, 20, 20].map((self, i) => i < 4 ? (self / 1.1) : self),
            sizes: [6.66, 5.06, 4.26, 4, 3.73, 3.2, 3.2, 3.2, 3.2, 3.2].map((self, i) => i < 4 ? (self / 1.1) : self),
            color: ['#6284F7', '#69B4F6', '#63C8E6', '#7C6AE2', '#76C453', '#E8E8E8', '#E8E8E8', '#E8E8E8', '#E8E8E8', '#E8E8E8'],
            forceXY: [
                // Portrait Percent
                [
                    { x: .12, y: .026 },
                    { x: .357, y: .357 },
                    { x: .053, y: .453 },
                    { x: .56, y: .213 },
                    { x: .653, y: .693 },
                    { x: .546, y: .001 },
                    { x: .23, y: .80 },
                    { x: .48, y: .80 },
                    { x: .753, y: .46 },
                    { x: .7467, y: .0667 }
                ],
                // Landscape Percent
                [
                    { x: 1.3013, y: .040 },
                    { x: -0.2507, y: 0.5600 },
                    { x: 1.1333, y: 0.1333 },
                    { x: 1.3200, y: 0.0373 },
                    { x: 1.3067, y: 0.3733 },
                    { x: 0.1187, y: 0.1280 },
                    { x: 1.4520, y: 0.3707 },
                    { x: 0.0560, y: 0.0320 },
                    { x: 2.2987, y: 0.2880 },
                    { x: 1.0600, y: 0.4907 }
                ]
            ],
            fColor: ['#ffffff', '#333333'],
            fontY: ['.3em', '-.3em', '-.9em']
        };
        this._resize = this._resize.bind(this);
    }
    // true일때 모바일 가로모드
    get isLandScape(): boolean {
        const c2 = window.devicePixelRatio;
        return !g.window.matchMedia('(orientation: portrait)').matches && c2 >=2;
    }
    get checkLimit(){
        if (this.isLandScape) {
            return [g.window.innerWidth, 375]
        } else {
            return g.window.innerWidth >= 800 ? [800, 800] : [g.window.innerWidth, g.window.innerWidth];
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
        svg.setAttribute('width', this.checkLimit[0]);
        svg.setAttribute('height', this.checkLimit[1]);
        svg.setAttribute('viewBox', `0 0 ${this.checkLimit[0]} ${this.checkLimit[1]}`);

        this._createNodes(data);
        this._setForce(data);

        if(updateTimer) clearTimeout(updateTimer);
        updateTimer = setTimeout(() => {
            console.log('clear')
            this._removeNodes();
        }, 1000)
    }

    public clickEff(i:number) {
        g.gsap.killTweensOf(timeLine);
        const svg = document.querySelectorAll('.group-wrap .item');
        svg[i].setAttribute('class', 'item active');
        document.getElementById('wrap').setAttribute('class', 'clicked');

        timeLine = g.gsap.timeline({
            onComplete: () => {
                console.log('click stop')
                this.stop();
            }
        });

        timeLine
            .to(svg[i].querySelector('circle'), 0.3, { scale: 0.8, transformOrigin: '50% 50%', ease: 'power3.inOut', duration: 0.4})
            .to(svg[i].querySelector('circle'), 0.3, { scale: 20, transformOrigin: '50% 50%', ease: 'power3.inOut'})
    }

    private _setForce<T extends circleData>(data: T): void {
        const nodes = g.d3.selectAll('.group-wrap:first-child > svg');
        const tick = function() {
            nodes.attr('x', (d: T) => d.x - 1)
                .attr('y', (d: T) => d.y - 1);
        };
        const smf = g.d3.forceSimulation()
            .force('x', g.d3.forceX(this.checkLimit[0] / 2))
            .force('y', g.d3.forceY(this.checkLimit[1] / 2))
            .force("collide",g.d3.forceCollide( (d: circleData) => d.radius + 4).iterations(2))
            .force("charge", g.d3.forceManyBody())
            .nodes(data)
            .alphaTarget(0)
            .velocityDecay(0.8) // static value
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
        Object.entries(styles).forEach(([prop,val]) => {
            if(typeof t === 'string') {
                g.d3.select(t).attr(prop,val)
            } else {
                t.attr(prop,val)
            }
        });
    }
    // circle 생성
    private _createNodes<T extends circleData>(cdata: T): void {
        const { fColor, color, sizes, fontY } = this.options;
        // svg 그룹추가
        let svg = g.d3.select('#newsEdgeBubbles')
            .insert('g',':first-child').attr('class', 'group-wrap');
        //  노드
        const group = svg
            .selectAll('.item')
            .data(cdata)
            .enter()
            .append('svg')
            .attr('class','item')
            .attr('role', 'list')
            .attr('aria-label', (d:T, i: number)=> `${i+1}${krStr[3]}`)
            .attr('x', (d: T) => d.x)
            .attr('y', (d: T) => d.y)
            .append('g')
            .attr('class',(d:T, i:number)=>`n${i}`)
            .on('click', (d: T) => {
                for(let [key,f] of this.eventListner) {
                    f.call(this, d)
                }
                // 타임라인
                //g.gsap.timeline({ defaults: { overwrite: 'auto', ease: 'none' }, paused: true });

                //console.log(this.model.items[d.index])
            })



        group.append('circle')
            .attr('r', (d: T) => d.radius)
            .attr('cx', 0)
            .attr('cy', 0)
            .attr('fill', (d:T, i:number) => color[i]);

        group.append('text')
            .attr('class', 'bubbleText')
            .attr('fill', (d: T, i: number) => (i < 5) ? fColor[0] : fColor[1])
            .attr('font-size', (d:T,i:number) => {
                let v = (this.isLandScape && g.window.innerWidth > 600 && i < 5) ? sizes[i]+(sizes[i]/6) : sizes[i];
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
            svg.attr('class', 'group-wrap active')
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
                return  g.window.innerWidth >= 850 ? i/(this.checkLimit[1]/150): i-(i/2.5);
            })];
            const svg = document.getElementById('newsEdgeBubbles');
            svg.setAttribute('height', `${this.checkLimit[1]}`)
            svg.setAttribute('viewBox', `0 0 ${this.checkLimit[0]} ${this.checkLimit[1]}`);
            positions = utils.shuffleArray(forceXY[1])
        } else {
            positions =utils.shuffleArray(forceXY[0]);
        }

        const radiusScale = g.d3.scaleLinear().domain([0, 100]).range([0, this.checkLimit[0]]);

        const xy =  pp.map((percent: number[], i: number) => {
            let r = parseInt(radiusScale(temp[i] / 2));
            return {
                x: Math.floor(this.checkLimit[1] * positions[i].x) + r,
                y: Math.floor(this.checkLimit[1] * positions[i].y) + r,
            }
        });

        return this.model.items.map((d:any, i:number) => {
            return {
                radius: parseInt(radiusScale(temp[i] / 2)),
                x: xy[i].x,
                y: xy[i].y
            }
        });
    }

    private _resize(): void {
        // 팝업이 열려있지 않은 상태에서만
        if(document.getElementById('wrap').className.indexOf('clicked') < 0) {
            if(resizeTime) clearTimeout(resizeTime)
            this.hideEff();
            resizeTime = setTimeout(this.updateBubble.bind(this), 300)
        } else {
            document.querySelector('body').setAttribute('data-popupState', 'true');
        }

    }

    protected _init(options?: any): void {
        this.options = Object.assign(this.options, options);
        const data = this._updatePosition();
        this._drawSvg();
        this._createNodes(data);
        this._setForce(data);

        window.addEventListener('resize', this._resize)
    }

    protected _addEvent<V>(f: V) {
        console.log(f)
    }
    protected _removeEvent() {}
    protected _update(): void {
        this.updateBubble();
    }
}