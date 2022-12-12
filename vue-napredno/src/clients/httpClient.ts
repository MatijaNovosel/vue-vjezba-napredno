import { UserStore } from "./../store/user-store";
import axios, { AxiosInstance } from "axios";

const httpClient: AxiosInstance = axios.create({
  baseURL: "https://localhost:44351/api",
  headers: {
    "Content-type": "application/json"
  },
  withCredentials: true
});

httpClient.interceptors.request.use(
  (config) => {
    const userStore = UserStore();
    let token = userStore.token;
    if (token !== "") {
      config.headers = {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`
      };
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default httpClient;
