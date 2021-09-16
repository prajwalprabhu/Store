import axios from "axios";
// import { CancelToken } from "axios";
const token =axios.CancelToken.source();

export default axios.create({
  baseURL: "http://localhost:8000",
  cancelToken: token.token,
});
