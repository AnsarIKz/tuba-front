import { makeAutoObservable, action } from "mobx";

class CartListStore {
  cartListArr = [];
  constructor() {
    makeAutoObservable(this);
  }

  findElement(id) {
    let index = this.cartListArr.findIndex((item) => item.id == id);
    return this.cartListArr[index];
  }
  addToCart({ id, data }) {
    if (this.findElement(id)) {
      return false;
    } else {
      this.cartListArr.push({ id: id, count: 1, data: { ...data } });
    }
  }
  removeFromCart(id) {
    let index = this.cartListArr.findIndex((item) => item.id === id);
    this.cartListArr.splice(index, index + 1);
  }
  increaseCount(id) {
    let index = this.cartListArr.findIndex((item) => item.id === id);
    this.cartListArr[index].count += 1;
  }
  decreaseCount(id) {
    let index = this.cartListArr.findIndex((item) => item.id == id);
    if (this.cartListArr[index].count >= 2) {
      this.cartListArr[index].count -= 1;
    } else return "error";
  }

  clearCart() {
    this.cartListArr = [];
  }
  getCartSum() {
    if (this.cartListArr.length === 0) {
      return 0;
    } else {
      let sum = 0;
      this.cartListArr.forEach((elem) => {
        sum += elem.data.price * elem.count;
      });

      return sum;
    }
  }
}

export default new CartListStore();
