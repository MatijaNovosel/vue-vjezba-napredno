import { IUserService } from "@/interfaces/IUserService";
import { INewUser, IToken, IUser } from "@/models/userModels";
import { API_URL } from "@/utils/constants";
import axios from "axios";

export class UserService implements IUserService {
  async LoginAsync(user: IUser): Promise<IToken> {
    try {
      const response = await axios.post<IToken>(API_URL.LOGIN, user);
      return response.data;
    } catch (error) {
      throw new Error("User login failed");
    }
  }
  async RegisterAsync(newUser: INewUser): Promise<IToken> {
    try {
      const response = await axios.post<IToken>(API_URL.REGISTER, newUser);
      return response.data;
    } catch (error) {
      throw new Error("User registration failed");
    }
  }
}
