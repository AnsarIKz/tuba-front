import axios from "axios";

export default axios.create({
  baseURL: `https://tubagroup.kz/api/`,

  // baseURL: `http://127.0.0.1:8000/api/`,
});
