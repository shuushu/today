import ViewModel from "../../../components/ViewModel";
import {krStr, utils} from "../../../components/utils";

const g:any = global;
/**
 * * Moment 글로벌 설정
 */
g.moment.locale('ko');
g.moment.updateLocale('ko', {relativeTime : { h: `${krStr[12]}` } });

interface items {
    artc_sq: string;
    artc_title: string;
    cp_cd: string;
    cp_nm: string;
    img_url: string;
    insert_dtm: string;
    keyword_sq: number;
    link_url: string;
    service_st: number;
    update_dtm: string;
    write_dtm: string;
}

export default class Article<S> extends ViewModel<S>{
    constructor(d: S) {
        super(d);
    }

    protected _init(params?: any) {
        const wrap = document.querySelector('.todayListWrap');
        const temp = document.createDocumentFragment();
        const todayList = document.createElement('div');

        const btn = todayList.appendChild(document.createElement('button'));
        const tit = todayList.appendChild(document.createElement('h3'));
        const todayListItem = todayList.appendChild(document.createElement('div'));
        const ul = todayListItem.appendChild(document.createElement('ul'));
        btn.className = 'btnScrollTop';
        tit.className = 'todayListTitle';
        todayListItem.className = 'todayListItem';
        todayList.className = 'todayList';
        ul.className = 'listItemWrap';
        tit.innerText = this.model.title.split('q=').pop();
        temp.appendChild(todayList);
        wrap.appendChild(temp);
    }

    protected _update(): void {
        const todayListWrap = document.querySelector('.todayListWrap');
        const todayList = document.querySelector('.todayList');
        const { server_dtm } = this.model.time;
        if(todayList) {
            todayListWrap.removeChild(document.querySelector('.todayList'));
        }
        this._init();

        let createNode = this.model.article.reduce((n: string, d:items, i:number) => {
            let { artc_title, cp_nm, img_url, link_url, insert_dtm } = d;
            let ttt = utils.isToday(server_dtm, insert_dtm) ? g.moment(insert_dtm).startOf('min').fromNow() : insert_dtm;

            n +=  `
                <li class="item" role="link" data-link="${link_url}" onclick="ndrclick('TOR0${i+1}')">
                    <h5 class="subject">${artc_title}</h5>
                    <div class="info">
                        <div class="state"><span class="provider">${cp_nm}</span><span class="time">${ttt}</span></div>
                        <div class="thumb-nail"><img src="${img_url}" alt=""></div>
                    </div>
                </li>
            `;
            return n
        },'');
        createNode += `
            <li class="more" role="link" onclick="ndrclick('TOM00');">
                <div class="face frontFace">
                    <div class="innerWrap">${krStr[4]}<div>
                    <span class="size">${utils.withCommas(this.model.cnt)}</span>
                    <span>${krStr[5]}</span>
                </div>
                ${krStr[6]}
                </div>
            </li>
        `;

        const ul = document.querySelector('.listItemWrap');
        ul.innerHTML = createNode;
        /**
         * 더보기 검색 쿼리 더블 쿼터 오류로 인해 setAttibute로 변경한다
         * */
        ul.querySelector('.more').setAttribute('data-link', String(this.model.title));

        const duration = .3;
        g.gsap.fromTo('.todayListTitle', duration * 2, { autoAlpha: 0, y: 30 }, { autoAlpha: 1 ,y: 0 });
        g.gsap.delayedCall(duration, function() {
            g.gsap.set('.todayListItem', { autoAlpha: 1 });
            document.querySelectorAll('.todayListItem li').forEach(function(n,i) {
                g.gsap.fromTo(n, duration * 2, { autoAlpha: 0,  y: 30, }, { autoAlpha: 1, y: 0, delay: .1 * (i + 1) })
            });
        });
    }

    protected _addEvent<V>(p:V) {
        const n = document.querySelector('.todayListWrap');
        const duration = .3;
        n.addEventListener('mouseover', (e) => {
            const t = (<HTMLElement> e.target).closest('li');
            if (t) {
                if (t.className !== 'more') {
                    g.gsap.to(t, duration / 1.5, { y: -6, boxShadow: '0 10px 26px 0 rgba(0, 0, 0, 0.15)', ease: 'none' });
                } else {
                    g.gsap.to(t, duration, { boxShadow: '0 10px 26px 0 rgba(0, 0, 0, 0.15)'});
                }
            }
        });

        n.addEventListener('mouseout', (e) => {
            const t = (<HTMLElement> e.target).closest('li');
            if (t) {
                if (t.className !== 'more') {
                    g.gsap.to(t, duration / 1.5, { y: 0, boxShadow: '0 10px 26px 0 rgba(0, 0, 0, 0)', ease: 'none' });
                } else {
                    g.gsap.to(t, duration, { boxShadow: '0 10px 26px 0 rgba(0, 0, 0, 0)'});
                }
            }
        });

        n.addEventListener('click', (e) => {
            const t = (<HTMLElement> e.target).closest('button');
            if(t && t.className === 'btnScrollTop') {
                g.gsap.to(window, duration * 2, { scrollTo: 0 });
            }
        })
    }
    protected _removeEvent() {}
}