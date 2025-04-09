import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:7777/api",
  withCredentials: true,
});

export default apiClient;
