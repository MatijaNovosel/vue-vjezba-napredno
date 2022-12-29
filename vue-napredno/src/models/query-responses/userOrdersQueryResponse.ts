export interface UserOrdersQueryResponse {
  customerName: string;
  orderNumber: string;
  orderDate: Date | string;
  orderDetails: OrderDetailsDto[];
}

export interface OrderDetailsDto {
  product: string;
  price: number;
  quantity: number;
  total: number;
}
