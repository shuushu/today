import Controller from "./Controller";
const renderListner = Symbol();

export default class Bubble extends Controller {
  constructor(props) {
    super(props);
    this[renderListner] = null;
  }

  _update() {
    console.log('키워드 업데이트')
    // 렌더 > 날짜 업데이트
    //this._render();
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
}