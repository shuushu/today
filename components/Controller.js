export default class Controller {
  constructor(data) {
    this.data = data;
    this.render = null;
  }


  addEvent(f) {
    this._addEvent(f);
  }

  removeEvent() {
    this._removeEvent();
  }

  _addEvent() {
    throw 'overwrite method'
  }

  _removeEvent() {
    throw 'overwrite method'
  }
}