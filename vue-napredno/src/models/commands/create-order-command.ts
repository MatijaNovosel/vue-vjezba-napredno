export interface CreateOrderCommand {
  orderDetails: OrderDetailDto[];
}

export interface OrderDetailDto {
  productId: number;
  price: number;
  quantity: number;
}
