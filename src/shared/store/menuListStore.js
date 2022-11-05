import { makeAutoObservable, action } from "mobx";
import API from "../API";

class MenuListStore {
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
        this.menuListDict.dishes = response.data;

        this.state = "done";
        setState("done");
      }),
      action("fetchError", (error) => {
        this.state = "error";
      })
    );
  }
}

export default new MenuListStore();
