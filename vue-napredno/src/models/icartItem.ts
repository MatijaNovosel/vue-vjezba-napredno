import { ProductQueryResponse } from "./query-responses/product-query-response";

export interface cartItem {
  product: ProductQueryResponse;
  amount: number;
}
