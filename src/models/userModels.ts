export interface IUser {
  email: string;
  password: string;
}

export interface IToken {
  token: string;
  expirationDate: string;
}

export interface INewUser {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface IUserDetails {
  id: number;
  firstName: string;
  lastName: string;
  customerID: number;
  email: string;
}
