import { ICustomerOrders, IOrder } from "@/models/orderModels";

export interface IOrderService {
  createOrderAsync(newOrder: IOrder): Promise<void>;
  updateOrderAsync(order: IOrder): Promise<void>;
  deleteOrderAsync(orderId: number): Promise<void>;
  getUserOrdersAsync(customerId: number): Promise<ICustomerOrders[]>;
}
