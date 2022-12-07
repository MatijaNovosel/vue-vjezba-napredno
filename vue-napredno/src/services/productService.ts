import { ProductQueryResponse } from "./../models/query-responses/product-query-response";
import httpClient from "@/clients/httpClient";

export default class ProductService {
  async getProducts(): Promise<ProductQueryResponse[]> {
    const result = await httpClient.get("/Products/true");
    return result.data;
  }
}
