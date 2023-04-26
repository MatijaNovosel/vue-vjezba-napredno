import { ROUTE_NAMES } from "@/utils/constants";
import { defineStore } from "pinia";
import { reactive, ref } from "vue";
import {
  NavigationGuard,
  NavigationGuardNext,
  RouteLocationNormalized
} from "vue-router";
import { INewUser, IUser } from "../models/userModels";
import router from "../router/routes";
import { UserService } from "../services/userService";

const service = new UserService();

export const isAuthenticated = ref(false);
export const useUsersStore = defineStore("user", () => {
  const state = reactive({
    users: JSON.parse(localStorage.getItem("users") || "[]"),
    currentUser: null as IUser | null
  });

  const login = async (user: IUser) => {
    const token = await service.LoginAsync(user);
    if (token) {
      localStorage.setItem("token", JSON.stringify(token));
      router.push(ROUTE_NAMES.PRODUCTS);
      state.currentUser = user;
    }
  };

  const register = async (newUser: INewUser) => {
    const token = await service.RegisterAsync(newUser);
    if (token) {
      localStorage.setItem("token", JSON.stringify(token));
      router.push(ROUTE_NAMES.PRODUCTS);
      state.currentUser = newUser;
    }
  };
  const logout = () => {
    localStorage.removeItem("token");
    state.currentUser = null;
    router.push(ROUTE_NAMES.LOGIN); // redirect to the home page or any other appropriate page
  };
  const requireAuth: NavigationGuard = (
    to: RouteLocationNormalized,
    from: RouteLocationNormalized,
    next: NavigationGuardNext
  ) => {
    const isAuthenticated = useUsersStore().state.currentUser !== null;
    if (isAuthenticated) {
      next();
    } else {
      next({ name: "Login" }); // redirect to the login route if not authenticated
    }
  };
  return {
    state,
    login,
    register,
    logout,
    requireAuth,
    isAuthenticated
  };
});
