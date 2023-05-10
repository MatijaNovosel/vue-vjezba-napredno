export interface IOrderDetail {
  productId: number;
  quantity: number;
}

export interface IOrder {
  customerId: number;
  orderDetails: IOrderDetail[];
}

export interface ICustomerOrders {
  orderDate: string;
  orderNumber: number;
  totalPrice: number;
}
