import { IProductService } from "../interfaces/IProductService";
import {
  Category,
  IProduct,
  IProductGroupedByCategory,
  IProductsResponse,
  ISales
} from "../models/productModels";
import { axios } from "../services/axios";
import { PRODUCTS_URL } from "../utils/constants";

export class ProductService implements IProductService {
  async GetAllProductCategories(): Promise<Category[]> {
    const categories = await axios.get(PRODUCTS_URL.ALL_CATEGORIES);
    return categories.data;
  }
  async getBestsellingProductsAsync(): Promise<IProductsResponse[]> {
    const result = await axios.get(PRODUCTS_URL.BESTSELLING_PRODUCTS);
    return result.data as IProductsResponse[];
  }
  async getAllProductsAsync(): Promise<IProductsResponse[]> {
    const result = await axios.get(PRODUCTS_URL.PRODUCTS + "all");
    return result.data as IProductsResponse[];
  }
  async getProductsGroupedByCategory(): Promise<IProductGroupedByCategory[]> {
    const result = await axios.get(PRODUCTS_URL.PRODUCTS_BY_CATEGORY);
    return result.data;
  }

  async getProductAvailability(
    productId: number,
    quantity: number
  ): Promise<boolean> {
    const result = await axios.get(
      PRODUCTS_URL.PRODUCTS +
        "available?ProductId=" +
        productId +
        "&Quantity=" +
        quantity
    );
    return result.data;
  }
  async getSalesByMonth(): Promise<ISales[]> {
    const result = await axios.get(PRODUCTS_URL.SALES);
    return result.data;
  }

  async deleteProductAsync(id: number): Promise<void> {
    await axios.delete<IProductsResponse>(
      PRODUCTS_URL.PRODUCTS + id.toString()
    );
  }

  async updateProductAsync(product: IProduct): Promise<void> {
    await axios.put<IProduct>(PRODUCTS_URL.PRODUCTS, product);
  }

  async createProductAsync(product: IProduct): Promise<void> {
    await axios.post<IProduct>(PRODUCTS_URL.PRODUCTS, product);
  }

  async getPaginatedProductsAsync(
    pageSize: number,
    pageNumber: number
  ): Promise<IProductsResponse[]> {
    const result = await axios.get(
      PRODUCTS_URL.PRODUCTS +
        "?pageSize=" +
        pageSize +
        "&pageNumber=" +
        pageNumber
    );
    return result.data;
  }

  async getProductByIdAsync(id: string): Promise<IProductsResponse> {
    const response = await axios.get<IProductsResponse>(
      PRODUCTS_URL.PRODUCTS + id
    );
    return response.data;
  }
}
