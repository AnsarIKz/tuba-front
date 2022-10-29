import { makeAutoObservable, action } from "mobx";
import API from "../API";

class PointDetailStore {
  pointDetailDict = [];
  pointAverageRating = 0;
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
  fetchPointAverageRating(id) {
    this.pointAverageRating = 0;
    this.state = "pending";
    API.get(`review/average-rating/${id}`).then(
      action("fetchSuccess", (response) => {
        console.log("GET POINTDETAIL");

        this.pointAverageRating = response.data.rating__avg;

        this.state = "done";
      }),
      action("fetchError", (error) => {
        this.state = "error";
      })
    );
  }
}

export default new PointDetailStore();
