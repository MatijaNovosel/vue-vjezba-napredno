import { IUserDetails } from "./userModels";

export interface CartItem {
  productID: number;
  productName: string;
  productPrice: number;
  quantity: number;
  maxQuantity: number;
}

export interface CheckoutDetails {
  user: IUserDetails;
  totalAmount: number;
}
