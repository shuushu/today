export default class Binder<T> {
    data: any;
    items: {[key: string]: any};
    constructor(v: T) {
        this.data = v;
        this.items = new Map();
    }

    update(path: string) {
        return fetch(path).then(response => response.json()).catch(error => console.log('[tfech]',error)).then(res => {
            const { server_dtm, service_dtm, update_dtm, data } = res;

            this.data.keywordList = data;
            this.data.time.progress_dtm = this.data.time.progress_dtm || server_dtm;
            this.data.time.server_dtm = server_dtm;
            this.data.time.service_dtm = service_dtm;
            this.data.time.update_dtm = update_dtm;
        });
    }
    addProcess<V>(key: string, inst: V) {
        this.items.set(key, inst);
    }
}