interface time {
    min_dtm: string;
    progress_dtm: string;
    server_dtm: string;
    service_dtm: string;
    update_dtm: string;
}
interface items {
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
interface article {
    artc_sq: string;
    artc_title: string;
    cp_cd: string;
    cp_nm: string;
    img_url: string;
    insert_dtm: string;
    keyword_sq: number;
    link_url: string;
    service_st: number
    update_dtm: string;
    write_dtm: string;
}
interface err {
    name: string; parent: string; target: string; f: () => void
}
let timer: ReturnType<typeof setTimeout>;
let listner = new Map();
class Model {
    public rank: number;
    private cnt: number;
    private d: time;
    private k: {
        [key: number]: items
    };
    private a: {
        [key: number]: article
    };
    protected title: string;

    constructor() {
        this.d = {
            min_dtm: '2020-08-20 09:00:00', // 20200820오픈 기준, 데이터 이전이 없으므로
            progress_dtm: '',
            server_dtm: '',
            service_dtm: '',
            update_dtm: ''
        };
        this.k = {};
        this.a = {};
        this.rank = 0;
        this.title = '';
        this.cnt = 0;

    }
    get items() {
        return this.k
    }
    get time() {
        return this.d
    }
    get article() {
        return this.a
    }

    set attachHandleError(v: err) {
        if (!listner.has(v.name)) {
            listner.set(v.name, v)
        }
    }

    // 프로그래스 날짜가 서버시간보다 지났는지 판단
    get isOverflow(): boolean {
        const {server_dtm, progress_dtm} = this.d;
        const s = server_dtm.split(' ').pop();
        const p = progress_dtm.split(' ').pop();
        return this.isToday && p >= s
    }
    get isToday(): boolean {
        const { server_dtm, service_dtm } = this.d;
        return server_dtm.split(' ').shift() === service_dtm.split(' ').shift()
    }

    private removeError() {
        clearTimeout(timer);
        listner.forEach(i => {
            const isNode = document.querySelector(i.target);
            const parent = document.querySelector(i.parent);
            if (parent && isNode) {
                parent.removeChild(isNode);
            }
        });
    }

    update(path: string, f: any) {
        try {
            const isToday = path.indexOf('?'); // 키워드 요청: 쿼리스트링이 없으면 달력의 오늘로 간주
            const isAticle = path.indexOf('rticle'); //  카드리스트 요청;
            const t = `${'https://cors-anywhere.herokuapp.com/'}${path}`;
            this.removeError();
            listner.forEach(i => {
                if(i.name === 'loading') {
                    timer = setTimeout(i.f, 800);
                }
            });

            let xhr = new XMLHttpRequest();
            xhr.onreadystatechange = () => { // 요청에 대한 콜백
                if (xhr.readyState === xhr.DONE) { // 요청이 완료되면
                    this.removeError();
                    if (xhr.status === 200 || xhr.status === 201) {
                        if (isAticle < 0) {
                            let { server_dtm, service_dtm, update_dtm, data } = JSON.parse(xhr.responseText);
                            let p = this.d.progress_dtm || server_dtm;

                            this.k = Object.keys(data).map((v) => data[v]);
                            this.d.server_dtm = server_dtm;
                            this.d.service_dtm = service_dtm;
                            this.d.update_dtm = update_dtm;
                            this.d.progress_dtm = `${service_dtm.split(' ').shift()} ${p.split(' ').pop()}`;

                            if(this.isToday && this.isOverflow || isToday < 0) {
                                this.d.progress_dtm = server_dtm;
                            }
                        } else {
                            const { data, search_cnt, search_link } = JSON.parse(xhr.responseText);
                            this.a = Object.keys(data).map((v) => data[v]);
                            this.cnt = search_cnt;
                            this.title = search_link;
                        }

                        f.call(this);
                    } else {
                        // 네트워크 에러
                        listner.forEach(i => {
                            if(i.name === 'error') {
                                i.f();
                            }
                        });
                    }
                    // END
                }
            };
            xhr.open('GET', path); // 메소드와 주소 설정
            xhr.send(); // 요청 전송



            /*return fetch(path).then(response => response.json()).catch(error => console.log('[tfech]',error)).then(res => {
                if (isAticle < 0) {
                    const random = res[Math.floor(Math.random()*3)]
                    // const { server_dtm, service_dtm, update_dtm, data } = random;
                    const { server_dtm, service_dtm, update_dtm, data } = res;
                    let p = this.d.progress_dtm || server_dtm;

                    this.k = Object.entries(data).map(([k,v]: [string, any]) => v);
                    this.d.server_dtm = server_dtm;
                    this.d.service_dtm = service_dtm;
                    this.d.update_dtm = update_dtm;

                    this.d.progress_dtm = `${service_dtm.split(' ').shift()} ${p.split(' ').pop()}`;

                    if(this.isToday && this.isOverflow || isToday < 0) {
                        this.d.progress_dtm = server_dtm;
                    }
                } else {
                    this.a = Object.entries(res.data).map(([k,v]: [string, any]) => v);
                    this.cnt = res.search_cnt;
                    this.title = res.search_link;
                }

            });*/
        } catch (e) {
            console.log(e)
        }
    }

    updateProgress(v?: string) {
        this.d.progress_dtm =  v || this.d.server_dtm;
    }
}
export {
    Model,
    items
}