import { makeAutoObservable, action } from "mobx";
import API from "../API";

class MainInfoStore {
  mainInfoDict = {};
  constructor() {
    makeAutoObservable(this);
  }
  fetchMainInfo(setState = (e) => e) {
    this.mainInfoDict = {};
    this.state = "pending";
    API.get(`main/info/`).then(
      action("fetchSuccess", (response) => {
        console.log("GET POINTDETAIL");
        setState("done");
        this.mainInfoDict = response.data[0];

        this.state = "done";
      }),
      action("fetchError", (error) => {
        this.state = "error";
      })
    );
  }
}

export default new MainInfoStore();
