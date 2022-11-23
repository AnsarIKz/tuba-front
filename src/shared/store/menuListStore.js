import { makeAutoObservable, action } from "mobx";
import API from "../API";

class MenuListStore {
  category_types = {
    dishes: 0,
    drinks: 1,
  };
  menuListDict = {};
  state = "pending";
  constructor() {
    makeAutoObservable(this);
  }
  fetchMenuList({ id, setState }) {
    this.menuListDict = {};
    this.state = "pending";
    API.get(`menu/list/${id}`).then(
      action("fetchSuccess", (response) => {
        console.log("GET MENULIST");
        this.menuListDict.dishes = response.data.filter(
          (elem) => elem.category.types === this.category_types.dishes
        );
        this.menuListDict.drinks = response.data.filter(
          (elem) => elem.category.types === this.category_types.drinks
        );

        setState("done");
      }),
      action("fetchError", (error) => {
        this.state = "error";
      })
    );
  }
}

export default new MenuListStore();
