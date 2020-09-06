import Controller from "./Controller";
const renderListner = Symbol();

export default class Calendar extends Controller {
  constructor(props) {
    super(props);
    this[renderListner] = null;
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
  }

  prev() {
    this.update(this._getDate('subtract'));
  }

  next() {
    this.update(this._getDate('add'));
  }

  current() {
    let currentDate = this.time.server_dtm.split(' ');
    this.update(currentDate.join('%20'));
  }
  
  _update() {
    // update DOM
    this.render();
  }

  _render(f) {
    if (this[renderListner] === null) {
      if(!f) {
        throw 'undefined callback function';
      }
      this[renderListner] = f;
    }
    this[renderListner].call(this)
  }
}