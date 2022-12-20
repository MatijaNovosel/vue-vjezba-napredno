import { AppStateStore } from "./../store/app-state-store";
import { UserStore } from "./../store/user-store";
import axios, { AxiosError, AxiosInstance } from "axios";

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
    const appStateStore = AppStateStore();
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
    debugger;
    const appStateStore = AppStateStore();
    appStateStore.snackbar.show = true;
    appStateStore.snackbar.message = error.response?.data.Message;
    return Promise.reject(error);
  }
);

export default httpClient;
