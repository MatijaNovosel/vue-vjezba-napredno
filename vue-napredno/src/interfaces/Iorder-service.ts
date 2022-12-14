import { UserOrdersQueryResponse } from "@/models/query-responses/user-orders-query-response";

export interface IOrderService {
  getUserOrders(userId: string): Promise<UserOrdersQueryResponse[]> 
}
