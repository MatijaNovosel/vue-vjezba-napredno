import axios, { AxiosInstance } from "axios";
import { AppStateStore } from "../store/appStateStore";
import { UserStore } from "../store/userStore";

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
    const token = userStore.currentUser?.token;
    if (token !== "") {
      config.headers = {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`
      };
    }
    return config;
  },
  (error) => {
    const appStateStore = AppStateStore();
    appStateStore.snackbar.color = "red";
    appStateStore.snackbar.show = true;
    appStateStore.snackbar.message = error;
    return Promise.reject(error);
  }
);

httpClient.interceptors.response.use(
  (config) => {
    return config;
  },
  (error) => {
    const appStateStore = AppStateStore();
    appStateStore.snackbar.color = "red";
    appStateStore.snackbar.show = true;
    appStateStore.snackbar.message = error.response?.data.Message;
    return Promise.reject(error);
  }
);

export default httpClient;
