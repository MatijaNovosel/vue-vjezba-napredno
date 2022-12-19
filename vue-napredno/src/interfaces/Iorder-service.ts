import { CreateOrderCommand } from "@/models/commands/create-order-command";
import { UserOrdersQueryResponse } from "@/models/query-responses/user-orders-query-response";

export interface IOrderService {
  getUserOrders(userId: string): Promise<UserOrdersQueryResponse[]>;
  createOrder(command: CreateOrderCommand): Promise<boolean>;
}
