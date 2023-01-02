import httpClient from "@/clients/httpClient";
import { LoginCustomerCommandResponse } from "@/models/command-responses/loginCustomerCommandResponse";
import { LoginCustomerCommand } from "@/models/commands/loginModel";
import { RegisterCustomerCommand } from "@/models/commands/registerModel";
import router from "@/router";
import RouteNames from "@/router/routeNames";
import { injectable } from "inversify";
import { IUserService } from "../interfaces/iuser-service";
import { UserDTO, UserListQueryResponse } from "../models/query-responses/userListQueryResponse";
import { UserStore } from "../store/userStore";

@injectable()
export default class UserService implements IUserService {
  async loginUser(loginModel: LoginCustomerCommand): Promise<LoginCustomerCommandResponse> {
    const result = await httpClient.post("/Account/login", loginModel);
    return result.data;
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
    const result = await httpClient.get(`/Account/users/${pageNumber}/${pageSize}`);
    return result.data;
  }

  async getUser(userId: string): Promise<UserDTO> {
    const result = await httpClient.get(`/Account/user/${userId}`);
    return result.data;
  }
}
