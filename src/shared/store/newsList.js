import { makeAutoObservable, action } from "mobx";
import API from "../API";

class NewsListStore {
  newsList = [];
  state = "pending";
  constructor() {
    makeAutoObservable(this);
  }
  fetchPointList() {
    this.newsList = [];
    this.state = "pending";
    API.get("cafe/list/").then(
      action("fetchSuccess", (response) => {
        console.log("GET NEWSLIST");
        this.pointList = response.data;

        this.state = "done";
      }),
      action("fetchError", (error) => {
        this.state = "error";
      })
    );
  }
}

export default new NewsListStore();
