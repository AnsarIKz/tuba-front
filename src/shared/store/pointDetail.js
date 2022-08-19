import { makeAutoObservable, action } from "mobx";
import API from "../API";

class PointDetailStore {
  pointDetailDict = [];
  state = "pending";
  constructor() {
    makeAutoObservable(this);
  }
  fetchPointDetail(id) {
    this.pointDetailDict = {};
    this.state = "pending";
    API.get(`cafe/detail/${id}`).then(
      action("fetchSuccess", (response) => {
        console.log("GET POINTDETAIL");

        this.pointDetailDict = response.data;

        this.state = "done";
      }),
      action("fetchError", (error) => {
        this.state = "error";
      })
    );
  }
}

export default new PointDetailStore();
