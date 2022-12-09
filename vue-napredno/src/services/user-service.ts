import { UserStore } from "./../store/user-store";
import { injectable } from "inversify";
import { IUserService } from "../interfaces/userService";
import httpClient from "@/clients/httpClient";
import { LoginCustomerCommand } from "@/models/commands/login-model";
import { RegisterCustomerCommand } from "@/models/commands/register-model";
import router from '@/router'
import RouteNames from "@/router/route-names";

@injectable()
export default class UserService implements IUserService {
  userStore = UserStore();

  async loginUser(loginModel: LoginCustomerCommand): Promise<void> {
    const result = await httpClient.post("/Account/login", loginModel);
    if (result.status === 200) {
      this.userStore.isLoggedIn = true;
      router.push(RouteNames.Products)
    }
    return result.data;
  }

  async logoutUser(): Promise<void> {
    const result = await httpClient.post("/Account/logout");
    if (result.status === 200) {
      this.userStore.isLoggedIn = false;
      router.push(RouteNames.Login)
    }
    return result.data;
  }

  async registerUser(registerModel: RegisterCustomerCommand): Promise<void> {
    const result = await httpClient.post("/Account/register", registerModel);
    if (result.status === 200) {
      router.push(RouteNames.Products)
    }
    return result.data;
  }
}
