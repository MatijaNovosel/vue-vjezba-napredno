import httpClient from "@/clients/httpClient";
import { CustomerExpenditureQueryResponse } from "@/models/query-responses/customerExpenditureQuery";
import { ProductListQueryResponse } from "@/models/query-responses/productListQueryResponse";
import { ProductsSoldPerMonthQueryResponse } from "@/models/query-responses/productsSoldPerMonthQueryResponse";
import { injectable } from "inversify";
import { IProductService } from "../interfaces/iproduct-service";
import { ProductQueryResponse } from "../models/query-responses/productQueryResponse";
import { AddEditProductCommand } from "../models/commands/addProductCommand";
import { MostSoldProductsQueryResponse } from "../models/query-responses/mostSoldProductsQueryResponse";

@injectable()
export default class ProductService implements IProductService {
  async addProduct(product: AddEditProductCommand): Promise<boolean> {
    const result = await httpClient.post("/Products", product);
    return result.status === 200;
  }

  async deleteProduct(productId: number): Promise<boolean> {
    const result = await httpClient.delete(`/Products/${productId}`);
    return result.status === 200;
  }

  async editProduct(product: AddEditProductCommand): Promise<boolean> {
    const result = await httpClient.put("/Products", product);
    return result.status === 200;
  }

  async getProduct(productId: number): Promise<ProductQueryResponse> {
    const result = await httpClient.get(`/Products/product/${productId}`);
    return result.data;
  }

  async getProducts(): Promise<ProductQueryResponse[]> {
    const result = await httpClient.get("/Products/true");
    return result.data;
  }

  async getProductList(pageNumber: number, pageSize: number): Promise<ProductListQueryResponse> {
    const result = await httpClient.get(`/Products/list/${pageNumber}/${pageSize}`);
    return result.data;
  }

  async getMostSoldProducts(): Promise<MostSoldProductsQueryResponse[]> {
    const result = await httpClient.get("/Orders/mostSoldProducts");
    return result.data;
  }

  async getProductsSoldPerMonth(): Promise<ProductsSoldPerMonthQueryResponse[]> {
    const result = await httpClient.get("/Orders/productSalesPerMonth");
    return result.data;
  }

  async getCustomerExpenditure(): Promise<CustomerExpenditureQueryResponse[]> {
    const result = await httpClient.get("/Orders/customerExpenditure");
    return result.data;
  }
}
