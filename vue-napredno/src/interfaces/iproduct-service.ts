import { AddEditProductCommand } from '../models/commands/addProductCommand';
import { ProductsSoldPerMonthQueryResponse } from "../models/query-responses/productsSoldPerMonthQueryResponse";
import { MostSoldProductsQueryResponse } from "@/models/query-responses/mostSoldProductsQueryResponse";
import { ProductListQueryResponse } from "../models/query-responses/productListQueryResponse";
import { ProductQueryResponse } from "../models/query-responses/productQueryResponse";
import { CustomerExpenditureQueryResponse } from "@/models/query-responses/customerExpenditureQuery";
export interface IProductService {
  getProducts(): Promise<ProductQueryResponse[]>;
  getProduct(productId: number): Promise<ProductQueryResponse>
  getProductList(pageNumber: number, pageSize: number): Promise<ProductListQueryResponse>;
  getMostSoldProducts(): Promise<MostSoldProductsQueryResponse[]>;
  getProductsSoldPerMonth(): Promise<ProductsSoldPerMonthQueryResponse[]>;
  getCustomerExpenditure(): Promise<CustomerExpenditureQueryResponse[]>;
  addProduct(product: AddEditProductCommand): Promise<boolean>;
  editProduct(product: AddEditProductCommand): Promise<boolean>;
  deleteProduct(productId: number): Promise<boolean>;
}
