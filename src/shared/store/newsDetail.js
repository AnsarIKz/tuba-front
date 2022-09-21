import { makeAutoObservable, action } from "mobx";
import API from "../API";

class NewsDetailStore {
  newsDetailDict = {};
  state = "pending";
  constructor() {
    makeAutoObservable(this);
  }
  fetchNewsDetail(id, callback) {
    this.newsDetailDict = {};
    this.state = "pending";
    API.get(`news/detail/${id}/`).then(
      action("fetchSuccess", (response) => {
        console.log("ss", response);
        this.newsDetailDict = response.data;
        this.state = "done";
        callback("done");
        console.log(this.state);
      }),
      action("fetchError", (error) => {
        this.state = "error";
        console.log(error);
      })
    );
  }
}

export default new NewsDetailStore();
