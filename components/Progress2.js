import Controller from "./Controller";

const renderListner = Symbol();

export default class Progress extends Controller {
  constructor(name) {
    super();
    this[renderListner] = null;
    this.target = name;
    /**
     * gsap.timeline API 참조
     * drawSVG 프로퍼티: https://greensock.com/docs/v3/Plugins/DrawSVGPlugin 사용
     */
    this.timeline = null;
    this.drag = null;
    // 타임슬라이스 기준- 하루를 밀리세컨으로 변환 값(((1000 * 60) * 60) * 24) - (1000 * 60) // 23시간 59분 => 23시간으로 변경
    this.ts = 86400000;  
    // 현재 프로그래스 이동 값
    this.current = null
    // AM PM check
    this.AMPM = null;
  }
  get covert() {
    // 프로그래스 수치 > 타임스탬프 값으로 포멧 변환
    return this.current * this.ts + this.timestamp.start;
  }
  get width() {
    return d3.select(`${this.target} .progress`).attr('width')
  }
  get timestamp() {
    let { min_dtm, progress_dtm, server_dtm, service_dtm } = this.data.time;
    let st = `${server_dtm.split(' ')[0]} ${progress_dtm.split(' ').pop()}`;

    let min = moment(min_dtm).valueOf(),
        start = moment(st).startOf('day').valueOf(),
        now = moment(progress_dtm).minutes(0).seconds(0).valueOf(),
        server = moment(server_dtm).minutes(0).seconds(0).valueOf();

    const limit_max = (_ => moment(server_dtm).format('YYYY-MM-DD')  === moment(service_dtm).format('YYYY-MM-DD') ? (server-start) / this.ts : 1)();

    return {
      start,
      percent: (_=>{
        let t = this.current === null ? (now - start) / this.ts : this.current;
        return t > limit_max ? (server-start) / this.ts : t;
      })(),
      limit_min: moment(min_dtm).format('YYYY-MM-DD') === moment(service_dtm).format('YYYY-MM-DD') ? (min-start) / this.ts : 0,
      limit_max
    }
  }

  _update() {
    console.log('키워드 업데이트');

  }

  _render(f) {
    if (this[renderListner] === null) {
      if(!f) {
        throw 'undefined callback function';
      }
      this[renderListner] = f;
    } else {
      this[renderListner].call(this)
    }
  }

  _updateTooltipTime() {
    let { progress_dtm, service_dtm, server_dtm } = this.data.time,
        isDrag = this.current !== null;
    /* c = service_dtm >= server_dtm ? (_ => {
       this.data.time.service_dtm = server_dtm;
       return server_dtm
     })() : this.covert,
     r = isDrag ?  c : progress_dtm;*/
    // AM PM check
    if(moment(this.covert).format('HH:mm') !== '00:00') {
      this.AMPM = moment(this.covert).format('A')
    }

    let zz = `${moment(service_dtm).format('YYYY-MM-DD')} ${ moment(isDrag ? this.covert : server_dtm).format('HH:mm:ss')}`;
    /**
     * data > 프로그래스 업데이트
     * 프로그래스 범위가  00:00 ~ 다음날 00:00 까지 지정할 수 있으므로
     * 다음날  00:00 드래그 후 달력 > 다음 날짜 로 업데이트시 하루 더 지난 상태로 업데이트 된다
     * 만약 서버시간보다 초과하면 서버시간으로 변경한다.
     */
    if(zz.split(' ').pop() === '00:00:00' && this.AMPM === 'PM') {
      let zzz = moment(progress_dtm).add(1, 'days').format('YYYY-MM-DD 00:00:00');
      this.data.time.progress_dtm = zzz;
      console.log(zzz, this.data.time)
      this.AMPM = 'AM';
    } else {
      this.data.time.progress_dtm = zz;
    }


    d3.select('.timeText .hh').text(moment(zz).format('HH'));
    d3.select('.timeText .mm').text(moment(zz).format('mm'));
  }
}