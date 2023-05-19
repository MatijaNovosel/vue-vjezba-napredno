import {
  IEditUserDetails,
  INewUser,
  IToken,
  IUser,
  IUserDetails
} from "../models/userModels";

export interface IUserService {
  LoginAsync(user: IUser): Promise<IToken>;
  RegisterAsync(newUser: INewUser): Promise<IToken>;
  GetUserDetailsAsync(email: string): Promise<IUserDetails>;
  EditUserDetailsAsync(editedUser: IEditUserDetails): Promise<IEditUserDetails>;
  GetAllUsersAsync(): Promise<IUserDetails[]>;
}
