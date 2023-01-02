import { LoginCustomerCommandResponse } from "@/models/command-responses/loginCustomerCommandResponse";
import { UserListQueryResponse } from "@/models/query-responses/userListQueryResponse";
import { LoginCustomerCommand } from "../models/commands/loginModel";
import { RegisterCustomerCommand } from "../models/commands/registerModel";
import { UserDTO } from "../models/query-responses/userListQueryResponse";
export interface IUserService {
  loginUser(loginModel: LoginCustomerCommand): Promise<LoginCustomerCommandResponse>;
  registerUser(registerModel: RegisterCustomerCommand): Promise<void>;
  logoutUser(): Promise<void>;
  getUsers(pageNumber: number, pageSize: number): Promise<UserListQueryResponse>;
  getUser(userId: string): Promise<UserDTO>;
}
