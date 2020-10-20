export default abstract class Controller <D>{
    data: any;
    constructor(data: D) {
        this.data = data;
    }

    update(path: string) {
        this.data.update(path).then(() => {
            this._update();
        })
    }

    addEvent<V>(f: V) {
        this._addEvent(f);
    }

    removeEvent() {
        this._removeEvent();
    }

    _addEvent(p: any) {
        throw 'overwrite method'
    }

    _removeEvent() {
        throw 'overwrite method'
    }
    _update() {
        throw 'overwrite method'
    }
    _render() {
        throw 'overwrite method'
    }
}