let History = (() => {
    const s = Symbol();
    const o = Symbol();
    return class {
        private [s]?: string;
        private [o]?: string;
        private data: any;
        constructor(t: string, v: string) {
            this[s] = v;
            this[o] = t;
            this.data = new Map();
            this._init();
        }
        private _init() {
            if(this[o].length > 0) {
                this[o].split(this[s]).forEach(v => {
                    const t = v.split('=');
                    this.data.set(t[0],t[1]);
                })
            } else {
                this.data = null;
            }
        }
    }
})();

export {
    History,
}