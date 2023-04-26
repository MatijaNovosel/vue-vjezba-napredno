import { INewUser, IToken, IUser } from "@/models/userModels";

export interface IUserService {
  LoginAsync(user: IUser): Promise<IToken>;
  RegisterAsync(newUser: INewUser): Promise<IToken>;
}
