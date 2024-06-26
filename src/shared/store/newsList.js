import { makeAutoObservable, action } from "mobx";
import API from "../API";

class NewsListStore {
  newsListArr = [];
  state = "pending";
  constructor() {
    makeAutoObservable(this);
  }
  fetchNewsList(setState) {
    this.newsListArr = [];
    this.state = "pending";
    API.get("news/list/").then(
      action("fetchSuccess", (response) => {
        console.log("GET NEWSLIST");
        this.newsListArr = response.data;

        this.state = "done";
        setState("done");
      }),
      action("fetchError", (error) => {
        this.state = "error";
      })
    );
  }
}

export default new NewsListStore();
