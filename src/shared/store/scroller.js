import { makeAutoObservable } from "mobx";

class Scroller {
  scroll = 0;
  constructor() {
    makeAutoObservable(this);
  }
  setScroll(value) {
    this.scroll = value;
  }
}

export default new Scroller();
