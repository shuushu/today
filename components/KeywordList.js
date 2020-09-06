import { utils } from "./utils";

export default class KeywordList {
  constructor(DATA) {
    this.origin = null;
    this.update(DATA);
  }
  update(v) {
    let {data} = v;
    this.origin = data;
  }
}