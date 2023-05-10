import { IUserService } from "@/interfaces/IUserService";
import { INewUser, IToken, IUser, IUserDetails } from "@/models/userModels";
import { USER_URL } from "@/utils/constants";
import { axios } from "../services/axios";

export class UserService implements IUserService {
  async GetUserDetailsAsync(email: string): Promise<IUserDetails> {
    try {
      const encodedEmail = encodeURIComponent(email);
      const url = USER_URL.DETAILS + `${encodedEmail}`;

      const response = await axios.get<IUserDetails>(url);
      return response.data;
    } catch (error) {
      throw new Error("User details failed");
    }
  }
  async LoginAsync(user: IUser): Promise<IToken> {
    try {
      const response = await axios.post<IToken>(USER_URL.LOGIN, user);
      return response.data;
    } catch (error) {
      throw new Error("User login failed");
    }
  }
  async RegisterAsync(newUser: INewUser): Promise<IToken> {
    try {
      const response = await axios.post<IToken>(USER_URL.REGISTER, newUser);
      return response.data;
    } catch (error) {
      throw new Error("User registration failed");
    }
  }
}
