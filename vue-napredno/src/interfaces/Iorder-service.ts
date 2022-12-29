import { CreateOrderCommand } from "@/models/commands/createOrderCommand";
import { UserOrdersQueryResponse } from "@/models/query-responses/userOrdersQueryResponse";

export interface IOrderService {
  getUserOrders(userId: string): Promise<UserOrdersQueryResponse[]>;
  createOrder(command: CreateOrderCommand): Promise<boolean>;
}
