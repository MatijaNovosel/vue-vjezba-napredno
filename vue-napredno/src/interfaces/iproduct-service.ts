import { AddEditProductCommand } from './../models/commands/add-product-command';
import { ProductsSoldPerMonthQueryResponse } from "../models/query-responses/products-sold-per-month-query-response";
import { MostSoldProductsQueryResponse } from "@/models/query-responses/most-sold-products-query-response";
import { ProductListQueryResponse } from "../models/query-responses/product-list-query-response";
import { ProductQueryResponse } from "../models/query-responses/product-query-response";
import { CustomerExpenditureQueryResponse } from "@/models/query-responses/customer-expenditure-query";
export interface IProductService {
  getProducts(): Promise<ProductQueryResponse[]>;
  getProductList(pageNumber: number, pageSize: number): Promise<ProductListQueryResponse>;
  getMostSoldProducts(): Promise<MostSoldProductsQueryResponse[]>;
  getProductsSoldPerMonth(): Promise<ProductsSoldPerMonthQueryResponse[]>;
  getCustomerExpenditure(): Promise<CustomerExpenditureQueryResponse[]>;
  addProduct(product: AddEditProductCommand): Promise<boolean>;
  editProduct(product: AddEditProductCommand): Promise<boolean>;
  deleteProduct(productId: number): Promise<boolean>;
}
