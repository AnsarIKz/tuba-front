import { makeAutoObservable, action } from "mobx";
import API from "../API";

class PointListStore {
  pointList = [];
  state = "pending";
  constructor() {
    makeAutoObservable(this);
  }
  fetchPointList() {
    this.pointList = [];
    this.state = "pending";
    API.get("cafe/list/").then(
      action("fetchSuccess", (response) => {
        console.log("GET POINTLIST");
        this.pointList = response.data;

        this.state = "done";
      }),
      action("fetchError", (error) => {
        this.state = "error";
      })
    );
  }
}

export default new PointListStore();
