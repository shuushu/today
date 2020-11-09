declare type cb = () => any;

const g:any = global;
const s = Symbol();
export default abstract class ViewModel <D>{
    private [s]: any;
    public eventListner: Map<string , any>; // 이벤트 핸들러 프로세스
    public updateProcess: Map<string , cb>; // 업데이트가 일어날때 프로세스

    constructor(data: D) {
        this[s] = data;
        this.eventListner = new Map();
        this.updateProcess = new Map();
    }
    get model() {
        return this[s];
    }

    update(path: string): void {
        this.model.update(path).then(() => {
            this._update();
        })
    }

    addEvent<V>(f?: V): void {
        this._addEvent<V>(f);
        for(let [t,v] of this.eventListner) {
            document.querySelector(t).addEventListener('click', v);
        }
    }

    removeEvent<V>(f?: V): void {
        for(let [t,v] of this.eventListner) {
            document.querySelector(t).removeEventListener('click', v);
        }
        this._removeEvent<V>(f);
    }

    init(): void {
        this._init();
    }

    protected abstract _addEvent<V>(f?: V): void;
    protected abstract _removeEvent<V>(f?: V): void;
    protected abstract _init(): void;
    protected abstract _update(): void;
}