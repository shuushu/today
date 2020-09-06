import {tfech} from "./utils";
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
    const result = tfech(`${KEYWORD_URL}?service_dtm=${date}`);
    result.then(res => {
      if (res.result === 200) {
        this.data.update(res)
        this._update()
      }
    });
  }

  render(f) {
    this.data.state.then(_ => {
      this._render(f)
    })
  }

  _update() { throw 'overwrite method' }
  _render() { throw 'overwrite method' }
}