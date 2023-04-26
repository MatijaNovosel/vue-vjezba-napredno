import { IProductService } from "@/interfaces/IProductService";
import {
  IProduct,
  IProductGroupedByCategory,
  IProductsResponse
} from "@/models/productModels";
import { IToken } from "@/models/userModels";
import { API_URL } from "@/utils/constants";
import axios, { AxiosInstance } from "axios";

export class ProductService implements IProductService {
  private axiosInstance: AxiosInstance;

  constructor(token: IToken) {
    this.axiosInstance = axios.create({
      baseURL: API_URL.BASE_URL,
      headers: {
        Authorization: `Bearer ${token.token}`
      }
    });
  }

  async getProductsGroupedByCategory(): Promise<IProductGroupedByCategory[]> {
    const result = await this.axiosInstance.get(API_URL.PRODUCTS_BY_CATEGORY);
    return result.data;
  }

  async getProductAvailability(
    productId: number,
    quantity: number
  ): Promise<boolean> {
    const result = await this.axiosInstance.get(
      "https://localhost:44365/api/Products/available?ProductId=" +
        productId +
        "&Quantity=" +
        quantity
    );
    return result.data;
  }
  async getBestSellingByCategoryAsync(): Promise<IProductsResponse[]> {
    const result = await this.axiosInstance.get(API_URL.BESTSELLING_PRODUCTS);
    return result.data;
  }

  async deleteProductAsync(id: string): Promise<void> {
    try {
      await this.axiosInstance.get<IProductsResponse>(API_URL.BASE_URL + id);
    } catch (error) {
      console.error(error);
      throw new Error(`Failed to delete products`);
    }
  }

  async updateProductAsync(product: IProduct): Promise<void> {
    try {
      await this.axiosInstance.put<IProduct>(API_URL.BASE_URL, product);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async createProductAsync(product: IProduct): Promise<void> {
    try {
      await this.axiosInstance.post<IProduct>(API_URL.BASE_URL, product);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async getAllProductsAsync(
    pageNumber: number,
    pageSize: number
  ): Promise<IProductsResponse[]> {
    const result = await this.axiosInstance.get(
      API_URL.BASE_URL + "?pageSize=" + pageSize + "&pageNumber=" + pageNumber
    );
    return result.data;
  }

  async getProductByIdAsync(id: string): Promise<IProductsResponse> {
    try {
      const response = await this.axiosInstance.get<IProductsResponse>(
        API_URL.GET_PRODUCT + id
      );
      const product = await response.data;
      return product;
    } catch (error) {
      console.error(error);
      throw new Error(`Failed to fetch product`);
    }
  }
}
