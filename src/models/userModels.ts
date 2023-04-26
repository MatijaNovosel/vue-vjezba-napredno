export interface IUser {
  email: string;
  password: string;
}
// export interface ICustomer {
//   id: string;
//   firstName: string;
//   familyName: string;
//   totalSpending: string;
// }
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
