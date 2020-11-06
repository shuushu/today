export default class Binder<T> {
    private data: any;
    public rank: number;
    constructor(v: T) {
        this.data = v;
        this.rank = 0;
    }
    get items() {
        return this.data.keywordList
    }
    get time() {
        return this.data.time
    }
    // 프로그래스 날짜가 서버시간보다 지났는지 판단
    get isOverflow(): boolean {
        const {server_dtm, progress_dtm} = this.data.time;
        const s = server_dtm.split(' ').pop();
        const p = progress_dtm.split(' ').pop();
        return this.isToday && p >= s
    }
    get isToday(): boolean {
        const { server_dtm, service_dtm } = this.data.time;
        return server_dtm.split(' ').shift() === service_dtm.split(' ').shift()
    }

    update(path: string) {
        try {
            const isToday = path.indexOf('?'); // 키워드 요청: 쿼리스트링이 없으면 달력의 오늘로 간주
            const isAticle = path.indexOf('articleList'); //  카드리스트 요청;

            return fetch(path).then(response => response.json()).catch(error => console.log('[tfech]',error)).then(res => {
                if (isAticle < 0) {
                    const random = res[Math.floor(Math.random()*3)]
                    // const { server_dtm, service_dtm, update_dtm, data } = random;
                    const { server_dtm, service_dtm, update_dtm, data } = res;
                    let p = this.data.time.progress_dtm || server_dtm;

                    this.data.keywordList = Object.entries(data).map(([k,v]: [string, any]) => v);
                    this.data.time.server_dtm = server_dtm;
                    this.data.time.service_dtm = service_dtm;
                    this.data.time.update_dtm = update_dtm;

                    this.data.time.progress_dtm = `${service_dtm.split(' ').shift()} ${p.split(' ').pop()}`;

                    if(this.isToday && this.isOverflow || isToday < 0) {
                        this.data.time.progress_dtm = server_dtm;
                    }
                } else {
                    this.data.article = Object.entries(res.data).map(([k,v]: [string, any]) => v);
                    this.data.title = res.search_link;
                }

            });
        } catch (e) {
            console.log(e)
        }
    }

    updateProgress(v?: string) {
        this.data.time.progress_dtm =  v || this.data.time.server_dtm;
    }
}