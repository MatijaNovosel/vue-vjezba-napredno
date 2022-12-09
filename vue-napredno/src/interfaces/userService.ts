import { RegisterCustomerCommand } from "./../models/commands/register-model";
import { LoginCustomerCommand } from "../models/commands/login-model";
export interface IUserService {
  loginUser(loginModel: LoginCustomerCommand): Promise<void>;
  registerUser(registerModel: RegisterCustomerCommand): Promise<void>;
  logoutUser(): Promise<void>;
}
