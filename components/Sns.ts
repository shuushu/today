import { SNS } from '../tmp/TMP_SNS';
import { krStr, utils } from "./utils";

class ShareSNS {
    private target: HTMLElement;
    public name: string;
    constructor (t:string = '.layerPopup.share') {
        this.name = t;
    }
    drawLayer(t: HTMLElement) {
        const wrap = document.createElement('div');        
        wrap.className = 'layerPopup share'; 
        wrap.innerHTML = SNS;
        this.target = wrap;
        t.appendChild(wrap);
        const btnCopyURL = document.querySelector('.layerPopup .btnCopyURL');
        btnCopyURL.addEventListener('click', this.urlCopy.bind(this));
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
}

export {
    ShareSNS
}