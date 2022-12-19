import { CreateOrderCommand } from "./../models/commands/create-order-command";
import httpClient from "@/clients/httpClient";
import { IOrderService } from "@/interfaces/Iorder-service";
import { UserOrdersQueryResponse } from "@/models/query-responses/user-orders-query-response";
import { injectable } from "inversify";

@injectable()
export default class OrderService implements IOrderService {
  async getUserOrders(userId: string): Promise<UserOrdersQueryResponse[]> {
    const result = await httpClient.get("/Orders/" + userId);
    return result.data;
  }

  async createOrder(command: CreateOrderCommand): Promise<boolean> {
    const result = await httpClient.post("/Orders", command);
    return result.data;
  }
}
