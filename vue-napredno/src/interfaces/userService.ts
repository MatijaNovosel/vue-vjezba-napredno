import { LoginCustomerCommand } from "./../models/login-model";
export interface IUserService {
  loginUser(loginModel: LoginCustomerCommand): Promise<void>;
  logoutUser(): Promise<void>;
}
