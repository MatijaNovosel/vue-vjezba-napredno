import { ProductQueryResponse } from "./query-responses/productQueryResponse";
export interface Dialog {
  showDialog: boolean;
  isEditMode: boolean;
  item: ProductQueryResponse | undefined;
}
