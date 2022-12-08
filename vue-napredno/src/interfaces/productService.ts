import { ProductListQueryResponse } from './../models/query-responses/product-list-query-response';
import { ProductQueryResponse } from "./../models/query-responses/product-query-response";
export interface IProductService {
  getProducts(): Promise<ProductQueryResponse[]>;
  getProductList(pageNumber: number, pageSize: number): Promise<ProductListQueryResponse>;
}
