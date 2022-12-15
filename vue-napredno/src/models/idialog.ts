import { ProductQueryResponse } from "./query-responses/product-query-response";
export interface Dialog {
  showDialog: boolean;
  isEditMode: boolean;
  item: ProductQueryResponse | undefined;
}
