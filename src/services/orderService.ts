import { IOrderService } from "@/interfaces/IOrderService";
import { ICustomerOrders, IOrder } from "@/models/orderModels";
import { ORDER_URL } from "@/utils/constants";
import { axios } from "../services/axios";

export class OrderService implements IOrderService {
  async getUserOrdersAsync(customerId: number): Promise<ICustomerOrders[]> {
    try {
      const result = await axios.get(
        "https://localhost:44365/api/Orders/details/13"
      );
      return result.data;
    } catch (error) {
      throw new Error("Failed to get user orders");
    }
  }

  async createOrderAsync(newOrder: IOrder): Promise<void> {
    try {
      await axios.post(ORDER_URL.ORDERS, newOrder);
    } catch (error) {
      throw new Error("Failed to create Order");
    }
  }

  async updateOrderAsync(order: IOrder): Promise<void> {
    try {
      await axios.post(ORDER_URL.ORDERS, order);
    } catch (error) {
      throw new Error("Failed to update Order");
    }
  }

  async deleteOrderAsync(orderId: number): Promise<void> {
    try {
      await axios.delete(ORDER_URL.ORDERS + "/" + orderId);
    } catch (error) {
      throw new Error("Failed to delete Order");
    }
  }
}
