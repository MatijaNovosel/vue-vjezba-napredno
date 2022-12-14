import { UserDTO } from "../models/query-responses/user-list-query-response";
import { RegisterCustomerCommand } from "../models/commands/register-model";
import { LoginCustomerCommand } from "../models/commands/login-model";
import { UserListQueryResponse } from "@/models/query-responses/user-list-query-response";
export interface IUserService {
  loginUser(loginModel: LoginCustomerCommand): Promise<void>;
  registerUser(registerModel: RegisterCustomerCommand): Promise<void>;
  logoutUser(): Promise<void>;
  getUsers(pageNumber: number, pageSize: number): Promise<UserListQueryResponse>;
  getUser(userId: string): Promise<UserDTO>;
}
