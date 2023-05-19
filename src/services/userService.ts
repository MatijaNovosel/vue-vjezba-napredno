import { IUserService } from "../interfaces/IUserService";
import {
  IEditUserDetails,
  INewUser,
  IToken,
  IUser,
  IUserDetails
} from "../models/userModels";
import { axios } from "../services/axios";
import { USER_URL } from "../utils/constants";

export class UserService implements IUserService {
  async GetAllUsersAsync(): Promise<IUserDetails[]> {
    const response = await axios.get(USER_URL.ALL_USERS);
    return response.data;
  }

  async EditUserDetailsAsync(
    editedUser: IEditUserDetails
  ): Promise<IEditUserDetails> {
    const response = await axios.put(USER_URL.BASE, editedUser);
    return response.data;
  }

  async GetUserDetailsAsync(email: string): Promise<IUserDetails> {
    const encodedEmail = encodeURIComponent(email);
    const url = USER_URL.DETAILS + `${encodedEmail}`;

    const response = await axios.get<IUserDetails>(url);
    return response.data;
  }

  async LoginAsync(user: IUser): Promise<IToken> {
    const response = await axios.post<IToken>(USER_URL.LOGIN, user);
    return response.data;
  }

  async RegisterAsync(newUser: INewUser): Promise<IToken> {
    const response = await axios.post<IToken>(USER_URL.REGISTER, newUser);
    return response.data;
  }
}
