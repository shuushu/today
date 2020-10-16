import Controller from "./Controller";
export default class Calendar extends Controller {
  constructor(data) {
    super(data);
  }

  prev() {
    this.data.load(this._getDate('subtract'))
  }

  next() {
    this.data.load(this._getDate('add'))
  }

  today() {
    let currentDate = this.data.time.server_dtm.split(' ');
    this.data.load(currentDate.join('%20'));
  }

  _getDate(type) {
    let { service_dtm, min_dtm, server_dtm } = this.data.time,
        date = (service_dtm).split(' ');

    date[0] = moment(this.data.time.service_dtm)[type](1, 'days').format('YYYY-MM-DD');
    /**
     * 제약 사항: 최소, 최대 날짜에 해당 할 경우 핸들링 불가 설정
     */
    if (date[0] <= server_dtm.split(' ')[0] && date[0] >= min_dtm.split(' ')[0]) {
      date = date.join('%20');
      return date;
    }
    return server_dtm
  }

  _addEvent(p) {
    Object.entries(p).forEach(([key,el]) => {
      el.addEventListener('click', () => {
        this[key]()
      });
    })
  }



}