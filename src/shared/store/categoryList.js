import { makeAutoObservable, action } from "mobx";
import API from "../API";

class CategoryListStore {
  categoryListArr = [];
  constructor() {
    makeAutoObservable(this);
  }
  fetchCategoryList() {
    this.categoryListArr = [];

    API.get("category/list/").then(
      action("fetchSuccess", (response) => {
        this.categoryListArr = response.data;
      }),
      action("fetchError", (error) => {
        this.state = "error";
      })
    );
  }
}

export default new CategoryListStore();
