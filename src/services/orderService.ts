import { IOrderService } from "../interfaces/IOrderService";
import { ICustomerOrders, IOrder } from "../models/orderModels";
import { axios } from "../services/axios";
import { ORDER_URL } from "../utils/constants";

export class OrderService implements IOrderService {
  async getUserOrdersAsync(customerId: number): Promise<ICustomerOrders[]> {
    const result = await axios.get(ORDER_URL.ORDERS + "/details/" + customerId);
    return result.data;
  }

  async createOrderAsync(newOrder: IOrder): Promise<void> {
    await axios.post(ORDER_URL.ORDERS, newOrder);
  }

  async updateOrderAsync(order: IOrder): Promise<void> {
    await axios.post(ORDER_URL.ORDERS, order);
  }

  async deleteOrderAsync(orderId: number): Promise<void> {
    await axios.delete(ORDER_URL.ORDERS + "/" + orderId);
  }
}
