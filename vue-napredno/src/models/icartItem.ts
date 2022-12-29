import { ProductQueryResponse } from "./query-responses/productQueryResponse";

export interface cartItem {
  product: ProductQueryResponse;
  amount: number;
}
