import { makeAutoObservable, action } from "mobx";
import API from "../API";

class NewsDetailStore {
  newsDetailDict = [];
  state = "pending";
  constructor() {
    makeAutoObservable(this);
  }
  fetchNewsDetail(id) {
    this.newsDetailDict = {};
    this.state = "pending";
    API.get(`news/detail/${id}`).then(
      action("fetchSuccess", (response) => {
        console.log("GET POINTDETAIL");

        this.newsDetailDict = response.data;

        this.state = "done";
      }),
      action("fetchError", (error) => {
        this.state = "error";
      })
    );
  }
}

export default new NewsDetailStore();
