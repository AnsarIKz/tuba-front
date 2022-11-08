import { makeAutoObservable } from "mobx";
import pointDetail from "./pointDetail";

class CartListStore {
  servicePercent = pointDetail.pointDetailDict.service_percent;
  deliveryPrice = 750;
  // Нужно брать из настроек КАФЕ
  cartListDict = {};
  currentCartId = NaN;
  constructor() {
    makeAutoObservable(this);
  }

  getString(cartId, data) {
    if (this.cartListDict[`${cartId}`] === undefined) {
      return "Ошибка";
    } else {
      let str = "";
      this.cartListDict[`${cartId}`].forEach((elem, elemIndex, elemArr) => {
        str += `${elem.data.title}: ${elem.count} порций(-я) - ${
          elem.data.price * elem.count
        }₸ \n`;
        if (elemArr.length - 1 === elemIndex) {
          if (data.orderType === "here") {
            str += `\nОбслуживание ${this.servicePercent}% - ${
              this.getCartSum(cartId) / this.servicePercent //Тут нужно вместо 10 вывести данные из кафе
            }₸`;

            str += `\nЦена - ${this.getCartSum(cartId)}₸ \nИтого - ${
              this.getCartSum(cartId) +
              this.getCartSum(cartId) / this.servicePercent
            }₸\n`;
            str += `\n\nНомер стола - ${data.tableNumber}`;
          } else {
            str += `\nДоставка - ${this.deliveryPrice}₸`;
            str += `\nЦена - ${this.getCartSum(cartId)}₸ \nИтого - ${
              this.getCartSum(cartId) + this.deliveryPrice
            }₸\n`;

            str += `\n\nАдрес - ${data.address}`;
          }
          str += `\nИмя заказчика - ${data.name}\nНомер - ${data.phone}`;
        }
      });
      return str;
    }
  }

  // if (this.currentCartId !== id) {
  //   this.cartListArr = [];
  //   this.currentCartId = id;
  // }

  findElement(id, cartId) {
    if (this.cartListDict[`${cartId}`] === undefined) {
      this.cartListDict[`${cartId}`] = [];
    }
    //
    let index = this.cartListDict[`${cartId}`].findIndex(
      (item) => item.id === id
    );
    return this.cartListDict[`${cartId}`][index];
  }
  addToCart({ id, data, cartId }) {
    if (this.cartListDict[`${cartId}`] === undefined) {
      this.cartListDict[`${cartId}`] = [];
    }
    //
    if (this.findElement(id, cartId)) {
      return false;
    } else {
      console.log(this.cartListDict[`${cartId}`]);
      this.cartListDict[`${cartId}`].push({
        id: id,
        count: 1,
        data: { ...data },
      });
    }
  }
  removeFromCart(id, cartId) {
    let index = this.cartListDict[`${cartId}`].findIndex(
      (item) => item.id === id
    );
    // this.cartListDict[`${cartId}`][index] = null;
    this.cartListDict[`${cartId}`].splice(index, 1);
  }
  increaseCount(id, cartId) {
    if (this.cartListDict[`${cartId}`] === undefined) {
      this.cartListDict[`${cartId}`] = [];
    }
    //
    let index = this.cartListDict[`${cartId}`].findIndex(
      (item) => item.id === id
    );
    this.cartListDict[`${cartId}`][index].count += 1;
  }
  decreaseCount(id, cartId) {
    if (this.cartListDict[`${cartId}`] === undefined) {
      this.cartListDict[`${cartId}`] = [];
    }
    //
    let index = this.cartListDict[`${cartId}`].findIndex(
      (item) => item.id === id
    );
    if (this.cartListDict[`${cartId}`][index].count >= 2) {
      this.cartListDict[`${cartId}`][index].count -= 1;
    } else return "error";
  }

  clearCart(cartId) {
    this.cartListDict[cartId] = [];
  }
  getCartSum(cartId) {
    if (this.cartListDict[`${cartId}`] === undefined) {
      this.cartListDict[`${cartId}`] = [];
    }
    if (this.cartListDict[`${cartId}`].length === 0) {
      return 0;
    } else {
      let sum = 0;
      this.cartListDict[`${cartId}`].forEach((elem) => {
        sum += elem.data.price * elem.count;
      });

      return sum;
    }
  }
}

export default new CartListStore();
