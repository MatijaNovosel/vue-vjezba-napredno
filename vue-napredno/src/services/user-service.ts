import {
  UserDTO,
  UserListQueryResponse
} from "./../models/query-responses/user-list-query-response";
import { UserStore } from "./../store/user-store";
import { injectable } from "inversify";
import { IUserService } from "../interfaces/iuser-service";
import httpClient from "@/clients/httpClient";
import { LoginCustomerCommand } from "@/models/commands/login-model";
import { RegisterCustomerCommand } from "@/models/commands/register-model";
import router from "@/router";
import RouteNames from "@/router/route-names";

@injectable()
export default class UserService implements IUserService {
  async loginUser(loginModel: LoginCustomerCommand): Promise<void> {
    const result = await httpClient.post("/Account/login", loginModel);

    if (result.status === 200) {
      const userStore = UserStore();
      userStore.isLoggedIn = true;
      userStore.token = result.data;

      const user = await httpClient.get("/Account/current");
      if (user.status === 200) {
        userStore.currentUser = user.data;
        router.push(RouteNames.Products);
      }
    }
  }

  async logoutUser(): Promise<void> {
    const result = await httpClient.post("/Account/logout");
    if (result.status === 200) {
      const userStore = UserStore();
      userStore.isLoggedIn = false;
      userStore.token = "";
      userStore.currentUser = null;
      router.push(RouteNames.Login);
    }
  }

  async registerUser(registerModel: RegisterCustomerCommand): Promise<void> {
    const result = await httpClient.post("/Account/register", registerModel);
    if (result.status === 200) {
      router.push(RouteNames.Products);
    }
    return result.data;
  }

  async getUsers(pageNumber: number, pageSize: number): Promise<UserListQueryResponse> {
    const result = await httpClient.get("/Account/users/" + pageNumber + "/" + pageSize);
    return result.data;
  }

  async getUser(userId: string): Promise<UserDTO> {
    const result = await httpClient.get("/Account/user/" + userId);
    return result.data;
  }
}
