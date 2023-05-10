import { IProductService } from "@/interfaces/IProductService";
import {
  IProduct,
  IProductGroupedByCategory,
  IProductsResponse
} from "@/models/productModels";
import { PRODUCTS_URL } from "@/utils/constants";
// import axios from "axios";
import { axios } from "../services/axios";

export class ProductService implements IProductService {
  async getProductsGroupedByCategory(): Promise<IProductGroupedByCategory[]> {
    const result = await axios.get(PRODUCTS_URL.PRODUCTS_BY_CATEGORY);
    return result.data;
  }

  async getProductAvailability(
    productId: number,
    quantity: number
  ): Promise<boolean> {
    const result = await axios.get(
      "https://localhost:44365/api/Products/available?ProductId=" +
        productId +
        "&Quantity=" +
        quantity
    );
    return result.data;
  }
  async getBestSellingByCategoryAsync(): Promise<IProductsResponse[]> {
    const result = await axios.get(PRODUCTS_URL.BESTSELLING_PRODUCTS);
    return result.data;
  }

  async deleteProductAsync(id: string): Promise<void> {
    try {
      await axios.get<IProductsResponse>(PRODUCTS_URL.PRODUCTS + id);
    } catch (error) {
      console.error(error);
      throw new Error(`Failed to delete products`);
    }
  }

  async updateProductAsync(product: IProduct): Promise<void> {
    try {
      await axios.put<IProduct>(PRODUCTS_URL.PRODUCTS, product);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async createProductAsync(product: IProduct): Promise<void> {
    try {
      await axios.post<IProduct>(PRODUCTS_URL.PRODUCTS, product);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async getAllProductsAsync(
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
    try {
      const response = await axios.get<IProductsResponse>(
        PRODUCTS_URL.PRODUCTS + id
      );
      const product = await response.data;
      return product;
    } catch (error) {
      console.error(error);
      throw new Error(`Failed to fetch product`);
    }
  }
}
