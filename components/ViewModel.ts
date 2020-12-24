import { UA } from "./utils";

declare type cb = () => any;

const g:any = global;
export default abstract class ViewModel <D>{
    public model: any;
    public eventListner: Map<string , any>; // 이벤트 핸들러 프로세스
    public updateProcess: Map<string , cb>; // 업데이트가 일어날때 프로세스

    constructor(data: D) {
        this.model = data;
        this.eventListner = new Map();
        this.updateProcess = new Map();
    }


    get color() {
        if(UA.isEdge || UA.isIE) {
            return ['rgba(19, 73, 253, .7)', 'rgba(39, 137, 252, .7)', 'rgba(24, 174, 219, .7)', 'rgba(75, 49, 230, .7)', 'rgba(73, 178, 25, .7)', 'rgba(226, 226, 226, .7)', 'rgba(226, 226, 226, .7)', 'rgba(226, 226, 226, .7)', 'rgba(226, 226, 226, .7)', 'rgba(226, 226, 226, .7)']
        } else {
            return ['#6284F7', '#69B4F6', '#63C8E6', '#7C6AE2', '#76C453', '#E8E8E8', '#E8E8E8', '#E8E8E8', '#E8E8E8', '#E8E8E8']
        }
    }

    update(path: string): void {
        this.model.update(path, this._update.bind(this));
    }

    addEvent<V>(f?: V): void {
        this._addEvent<V>(f);
        this.eventListner.forEach((f,n) => {
            const dom = document.querySelector(n);
            if(dom) {
                dom.addEventListener('click', f);
            }
        })
    }

    removeEvent<V>(f?: V): void {
        this.eventListner.forEach((f,n) => {
            const dom = document.querySelector(n);
            if(dom) {
                dom.removeEventListener('click', f);
            }
        });
        this._removeEvent<V>(f);
    }

    init<T>(v?: T): void {
        this._init<T>(v);
    }

    protected abstract _addEvent<V>(f?: V): void;
    protected abstract _removeEvent<V>(f?: V): void;
    protected abstract _init<T>(v?:T): void;
    protected abstract _update(): void;
}