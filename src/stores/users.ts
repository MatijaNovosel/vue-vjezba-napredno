import { defineStore } from "pinia";
import { ref } from "vue";
import { useCookies } from "vue3-cookies";
import {
  IEditUserDetails,
  INewUser,
  IUser,
  IUserDetails
} from "../models/userModels";
import router from "../router";
import { UserService } from "../services/userService";
import { ROUTE_NAMES, tokenKey } from "../utils/constants";
const { cookies } = useCookies();

const service = new UserService();

const USER_DETAILS = "currentUser";
const USERS = "users";
export const useUsersStore = defineStore(
  "user",
  () => {
    const currentUser = ref<IUserDetails | null>(null);
    const isLoggedIn = ref(false);
    const users = ref<IUserDetails[]>([]);
    const login = async (user: IUser) => {
      const token = await service.LoginAsync(user);
      if (token) {
        cookies.set(tokenKey, token.token);
        currentUser.value = await getUserDetails(user.email);
        isLoggedIn.value = true;
      }
    };

    const getUserDetails = async (email: string) => {
      return await service.GetUserDetailsAsync(email);
    };

    const getAllUsers = async () => {
      users.value = await service.GetAllUsersAsync();
    };
    const getUserById = (id: string) => {
      const user = users.value.find((u) => u.id.toString() == id);
      return user;
    };

    const register = async (newUser: INewUser) => {
      const token = await service.RegisterAsync(newUser);
      if (token) {
        cookies.set(tokenKey, token.token);
        currentUser.value = await getUserDetails(newUser.email);
        router.push(ROUTE_NAMES.PRODUCTS);
        isLoggedIn.value = true;
      }
    };

    const logout = () => {
      cookies.remove(tokenKey);
      currentUser.value = null;
      router.push(ROUTE_NAMES.LOGIN);
      localStorage.removeItem(USER_DETAILS);
      isLoggedIn.value = false;
    };

    const editUser = async () => {
      if (currentUser.value) {
        const editUser: IEditUserDetails = {
          id: currentUser.value.id,
          email: currentUser.value.email,
          firstName: currentUser.value.firstName,
          lastName: currentUser.value.lastName
        };
        await service.EditUserDetailsAsync(editUser);
        router.push(ROUTE_NAMES.PRODUCTS);
      }
    };

    return {
      login,
      register,
      logout,
      isLoggedIn,
      users,
      editUser,
      getAllUsers,
      getUserById,
      currentUser
    };
  },
  {
    persist: true
  }
);
