import { MostSoldProductsQueryResponse } from "./../models/query-responses/most-sold-products-query-response";
import { injectable } from "inversify";
import { IProductService } from "../interfaces/productService";
import { ProductQueryResponse } from "../models/query-responses/product-query-response";
import httpClient from "@/clients/httpClient";
import { ProductListQueryResponse } from "@/models/query-responses/product-list-query-response";

@injectable()
export default class ProductService implements IProductService {
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
}
