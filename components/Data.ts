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
    public time: time;
    public keywordList?: items;

    constructor() {
        this.time = {
            min_dtm: '2020-08-20 09:00:00', // 20200820오픈 기준, 데이터 이전이 없으므로
            progress_dtm: '',
            server_dtm: '',
            service_dtm: '',
            update_dtm: ''
        };
        this.keywordList = {};
    }
}
export {
    Data,
    time,
    items
}