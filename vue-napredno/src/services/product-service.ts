import { AddEditProductCommand } from "./../models/commands/add-product-command";
import { MostSoldProductsQueryResponse } from "./../models/query-responses/most-sold-products-query-response";
import { injectable } from "inversify";
import { IProductService } from "../interfaces/iproduct-service";
import { ProductQueryResponse } from "../models/query-responses/product-query-response";
import httpClient from "@/clients/httpClient";
import { ProductListQueryResponse } from "@/models/query-responses/product-list-query-response";
import { ProductsSoldPerMonthQueryResponse } from "@/models/query-responses/products-sold-per-month-query-response";
import { CustomerExpenditureQueryResponse } from "@/models/query-responses/customer-expenditure-query";

@injectable()
export default class ProductService implements IProductService {
  async addProduct(product: AddEditProductCommand): Promise<boolean> {
    const result = await httpClient.post("/Products", product);
    return result.status === 200;
  }

  async deleteProduct(productId: number): Promise<boolean> {
    const result = await httpClient.delete("/Products/" + productId, );
    return result.status === 200;
  }

  async editProduct(product: AddEditProductCommand): Promise<boolean> {
    const result = await httpClient.put("/Products", product);
    return result.status === 200;
  }

  async getProducts(): Promise<ProductQueryResponse[]> {
    const result = await httpClient.get("/Products/true");
    return result.data;
  }

  async getProductList(pageNumber: number, pageSize: number): Promise<ProductListQueryResponse> {
    const result = await httpClient.get("/Products/list/" + pageNumber + "/" + pageSize);
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
