import Data from "./Data";

const DATA = new Data();

export default class Controller {
  constructor() {
    this.data = DATA;
  }

  update(date) {
    /**
     * KeywordList, Time, Calendar, Bubble, Progress.js 업데이트 인터페이스
     */
    if (!date || typeof date !== 'string') {
      throw 'parameter error'
    }
    // 데이터 업데이트
    this.data.getData(date).then(res => {
      this.data.update(res)
      this._update()
    });
  }

  render(f) {
    this.data.fetchState.then(() => {
      this._render(f)
    })
  }

  addEvent(f) {
    this._addEvent(f);
  }

  removeEvent() {
    this._removeEvent();
  }

  _update() {
    throw 'overwrite method'
  }

  _render() {
    throw 'overwrite method'
  }

  _addEvent() {
    throw 'overwrite method'
  }

  _removeEvent() {
    throw 'overwrite method'
  }
}