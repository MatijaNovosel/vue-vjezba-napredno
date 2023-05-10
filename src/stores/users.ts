import { defineStore } from "pinia";
import { ref } from "vue";
import { useCookies } from "vue3-cookies";
import { INewUser, IUser, IUserDetails } from "../models/userModels";
import router from "../router";
import { UserService } from "../services/userService";
import { ROUTE_NAMES, tokenKey } from "../utils/constants";
const { cookies } = useCookies();

const service = new UserService();

const USER_DETAILS = "currentUser";
export const useUsersStore = defineStore("user", () => {
  const state = ref({
    users: JSON.parse(localStorage.getItem("users") || "[]"),
    currentUser: null as IUserDetails | null
  });

  const login = async (user: IUser) => {
    const token = await service.LoginAsync(user);
    if (token) {
      cookies.set(tokenKey, token.token);
      router.push(ROUTE_NAMES.PRODUCTS);

      state.value.currentUser = await getUserDetails(user.email);
      // saveUserToLocalStorage();
    }
  };

  const isLoggedIn = () => {
    if (getToken()) {
      return true;
    }
    return false;
  };

  const getUserDetails = async (email: string) => {
    return await service.GetUserDetailsAsync(email);
  };

  const register = async (newUser: INewUser) => {
    const token = await service.RegisterAsync(newUser);
    if (token) {
      cookies.set(tokenKey, token.token);
      state.value.currentUser = await getUserDetails(newUser.email);
      router.push(ROUTE_NAMES.PRODUCTS);
      // saveUserToLocalStorage();
    }
  };

  // const saveUserToLocalStorage = () => {
  //   localStorage.setItem(
  //     "currentUser",
  //     JSON.stringify(state.value.currentUser)
  //   );
  // };

  const logout = () => {
    cookies.remove(tokenKey);
    state.value.currentUser = null;
    router.push(ROUTE_NAMES.LOGIN);
    localStorage.removeItem(USER_DETAILS);
  };

  const getToken = () => {
    return cookies.get(tokenKey);
  };

  const loadUserFromStorage = () => {
    const cartDetails = localStorage.getItem(USER_DETAILS);
    if (cartDetails === null) {
      return {};
    }
    return JSON.parse(cartDetails);
  };

  return {
    state,
    login,
    register,
    logout,
    getToken,
    isLoggedIn
  };
});
