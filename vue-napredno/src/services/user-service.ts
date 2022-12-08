import { UserStore } from "./../store/user-store";
import { injectable } from "inversify";
import { IUserService } from "../interfaces/userService";
import httpClient from "@/clients/httpClient";
import { LoginCustomerCommand } from "@/models/login-model";

@injectable()
export default class UserService implements IUserService {
  userStore = UserStore();

  async loginUser(loginModel: LoginCustomerCommand): Promise<void> {
    const result = await httpClient.post("/Account/login", loginModel);
    if (result.status === 200) {
      this.userStore.isLoggedIn = true;
    }
    return result.data;
  }

  async logoutUser(): Promise<void> {
    const result = await httpClient.post("/Account/logout");
    if (result.status === 200) {
      this.userStore.isLoggedIn = false;
    }
    return result.data;
  }
}
