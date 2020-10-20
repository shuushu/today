interface time {
    min_dtm: string;
    progress_dtm: string;
    server_dtm: string;
    service_dtm: string;
    update_dtm: string;
}
interface items {
    [key: string]: {
        count: number;
        create_dtm: string;
        ctgr_cd: string;
        keyword_dtm: string;
        keyword_name: string;
        keyword_service: string;
        keyword_sq: number;
        mod_dtm: string;
        score: number;
    }
}
class Data {
    time: time;
    keywordList?: items;

    constructor() {
        this.time = {
            min_dtm: '2020-08-20 09:00:00', // 20200820오픈 기준, 데이터 이전이 없으므로
            progress_dtm: '',
            server_dtm: '',
            service_dtm: '',
            update_dtm: ''
        };
    }


    update(path: string) {
        return fetch(path).then(response => response.json()).catch(error => console.log('[tfech]',error)).then(res => {
            const { server_dtm, service_dtm, update_dtm, data } = res;

            this.keywordList = data;
            this.time.progress_dtm = this.time.progress_dtm || server_dtm;
            this.time.server_dtm = server_dtm;
            this.time.service_dtm = service_dtm;
            this.time.update_dtm = update_dtm;
        });
    }
}
export {
    Data,
    time,
    items
}