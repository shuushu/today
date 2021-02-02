import { weather, items } from "../tmp/TMP_WEATHER"

// 메인 날씨 api데이터 
// https://ndev.nate.com/include4/jsonData.php
interface WEATHER_DATA {
    alt: string;
    img: string;
    link: string;
    name: string;
    ndr: string;
    rain: string;
    temp: number;
}
const g:any = global;
class Weather {
    private data: WEATHER_DATA[];
    constructor(arr: WEATHER_DATA[]) {
        this.data = arr;    
    }

    get getClass() {
        return this.data.map(v => {
            // 이미지명에서 className 추출하기
            return (v.img.split('96x96_').pop()).split('.png').shift();
        })
    }

    draw(target: Element) {
        if (target) {
            const [ div, ul, a ] = ['div', 'ul', 'a'].map((n: string) => document.createElement(n));
            div.className = 'weather-widget';
            ul.innerHTML = this.data.reduce((p, n, i) => p += items(this.getClass[i], n.temp, n.name), '');            
            a.setAttribute('href', '#');
            a.innerHTML = '날씨설정';
            div.appendChild(ul);
            div.appendChild(a);
            target.appendChild(div);
            if (this.data.length > 1) this.play(ul)
        }
    }
    remove(target: Element) {
        const weatherWidget = document.querySelector('.weather-widget');
        if (target && weatherWidget) {
            target.removeChild(weatherWidget);
        }
    }
    play(target: Element) {
        let cnt = 0, _this = this;
        g.TODAY.weatherTimer = setInterval(() => {
            target.setAttribute('style', `transform: translateY(-${cnt*32}px)`)
            cnt++;
            if (cnt >= _this.data.length) {
                cnt = 0;            
            }
        }, 5000)
    }
}
export {
    Weather
}