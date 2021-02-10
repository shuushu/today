import { SNS } from '../tmp/TMP_SNS';
import { krStr, utils, refineSnsShareUrl } from "./utils";

const g:any = global;
interface shaerData {
    img: string;
    title: string;
    desc: string;
    href: string;
    time: string;
}
class ShareSNS {
    private target: HTMLElement;
    public DATA: shaerData;
    constructor() {
        this.DATA = {
            img: 'https://nimg.nate.com/ui/etc/today/m/src/images/og_nate_today.png',
            title: '한눈에 보는 오늘 - 네이트뉴스',
            desc: '',
            href: 'https://m.news.nate.com',
            time: ''
        }        
    }

    drawLayer(t: HTMLElement) {
        const wrap = document.createElement('div');        
        wrap.className = 'layerPopup share'; 
        wrap.innerHTML = SNS;
        this.target = wrap;
        t.appendChild(wrap);
        document.querySelector('.shareLinkUrl').setAttribute('value', 'https://m.news.nate.com/')

        const btnCopyURL = document.querySelector('.layerPopup .btnCopyURL');
        btnCopyURL.addEventListener('click', this.urlCopy.bind(this));

        (<HTMLElement> document.querySelector('.shareList')).addEventListener('click', this.providerShare.bind(this));
    }
    drawBtn(t: HTMLElement) {
        const div = document.createElement('div');
        const btn = document.createElement('button');
        
        if (document.querySelector('.socialShare')) {
            t.removeChild(document.querySelector('.socialShare'));
        }
        
        div.className = 'socialShare';
        btn.className = 'btnShare';
        btn.innerHTML = krStr[13];
        btn.onclick = (e) => this.showLayer(e);
        div.appendChild(btn);
        t.appendChild(div);

        (<HTMLElement> document.querySelector('.layerPopup .dimm')).addEventListener('click', this.hideLayer.bind(this))
    }
    clear(t: HTMLElement) {
        const tt = document.querySelector('.layerPopup.share');
        if (tt) {            
            t.removeChild(tt)
        }
    }
    showLayer(e: MouseEvent) {
        e.preventDefault();
        if (this.target) {
            this.target.className = 'layerPopup share active'
        }
    }
    hideLayer(e: MouseEvent) {
        e.preventDefault();
        if (this.target) {
            this.target.className = 'layerPopup share'
        }
    }
    urlCopy(e: MouseEvent) {
        e.preventDefault();
        utils.CopyUrlToClipboard('.shareLinkUrl');
    }
    providerShare(e: MouseEvent) {
        e.preventDefault();
        const target = (<HTMLElement> e.target).closest('a');

        if (target) {            
            const provider = target.getAttribute('id');
            switch (provider) {
                case 'twitter':
                    window.open(`https://twitter.com/intent/tweet?via=${this.DATA.title}&text=${encodeURIComponent(this.DATA.desc)}&url=${encodeURIComponent(this.DATA.href)}`);
                    break;
                case 'facebook':
                    const link = `${this.DATA.href}?service_dtm=${this.DATA.time}`;
		            window.open(`https://m.facebook.com/sharer.php?u=${encodeURIComponent(link)}`);                    
                    break;
                default:
                    const { img, title, desc, href, time } = this.DATA;
                    const nateon = new g.com.nateon.talk.NateonShare(title, desc, img, href, href, 'memo', 'ver', 'applist', 'appname');
                    nateon.execute();
                    break;
            }
        }        
    }
}

export {
    ShareSNS
}