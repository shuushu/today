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

    // 현재 프로그래스 이동 값
    this.current = null
  }
  get covert() {
    // 프로그래스 수치 > 타임스탬프 값으로 포멧 변환
    return this.current * 86400000 + this.timestamp.start;
  }
  get width() {
    return d3.select(`${this.target} .progress`).attr('width')
  }
  get timestamp() {
    let { min_dtm, progress_dtm, server_dtm, service_dtm } = this.data.time,
        min = moment(min_dtm).valueOf(),
        start = moment(progress_dtm).startOf('day').valueOf(),
        now = moment(progress_dtm).minutes(0).seconds(0).valueOf(),
        server = moment(server_dtm).minutes(0).seconds(0).valueOf(),
        SS = 86400000; // 하루를 밀리세컨으로 변환 값(((1000 * 60) * 60) * 24) - (1000 * 60) // 23시간 59분 => 23시간으로 변경

    const limit_max = (_ => moment(server_dtm).format('YYYY-MM-DD')  === moment(service_dtm).format('YYYY-MM-DD') ? (server-start) / SS : 1)();

    return {
      start,
      percent: (_=>{
        let t = this.current === null ? (now - start) / SS : this.current;
        return t > limit_max ? (server-start) / SS : t;
      })(),
      limit_min: moment(min_dtm).format('YYYY-MM-DD') === moment(service_dtm).format('YYYY-MM-DD') ? (min-start) / SS : 0,
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
    let { service_dtm } = this.data.time,
        isDrag = this.current !== null;
    d3.select('.timeText .hh').text(moment(isDrag ? this.covert : service_dtm).format('HH'));
    d3.select('.timeText .mm').text(moment(isDrag ? this.covert : service_dtm).format('mm'));
  }
}