import { UserDTO } from "../models/query-responses/userListQueryResponse";
import { RegisterCustomerCommand } from "../models/commands/registerModel";
import { LoginCustomerCommand } from "../models/commands/loginModel";
import { UserListQueryResponse } from "@/models/query-responses/userListQueryResponse";
export interface IUserService {
  loginUser(loginModel: LoginCustomerCommand): Promise<void>;
  registerUser(registerModel: RegisterCustomerCommand): Promise<void>;
  logoutUser(): Promise<void>;
  getUsers(pageNumber: number, pageSize: number): Promise<UserListQueryResponse>;
  getUser(userId: string): Promise<UserDTO>;
}
