import axios from "axios";
import { useCookies } from "vue3-cookies";
import router from "../router";
import { ROUTE_NAMES } from "./../utils/constants";
const { cookies } = useCookies();
const axiosInstance = axios.create();

axiosInstance.interceptors.request.use((request) => {
  const token = cookies.get("token");
  if (token != null) {
    request.headers.authorization = `Bearer ${token}`;
  } else {
    router.push(ROUTE_NAMES.LOGIN);
  }
  return request;
});
export { axiosInstance as axios };
