import { tfech } from "./utils";


export default class Data {
    constructor() {
        this.keywordList;
        this.time = {
            min_dtm: '2020-08-20 09:00:00', // 20200820오픈 기준, 데이터 이전이 없으므로
            progress_dtm: null,
            server_dtm: null,
            service_dtm: null,
            update_dtm: null
        };
        this.items = new Map();
    }
    load(v) {
        const path =  v ? `${KEYWORD_URL}?service_dtm=${v}` : KEYWORD_URL;
        tfech(path).then(res => {
            this.update(res)
        })
    }
    /**
     * @parms 서버 응답 값 {object}
     */
    update(v) {
        if (!v || typeof v !== 'object') {
            throw 'response parameter error'
        }
        let { server_dtm, service_dtm, update_dtm, data } = v;

        this.keywordList = data;
        this.time.progress_dtm = this.time.progress_dtm || server_dtm;
        this.time.server_dtm = server_dtm;
        this.time.service_dtm = service_dtm;
        this.time.update_dtm = update_dtm;

        for(let [name, inst] of this.items) {
            if('render' in inst) inst.render();
        }

    }
}