import {
  IProduct,
  IProductGroupedByCategory,
  IProductsResponse
} from "../models/productModels";

export interface IProductService {
  getAllProductsAsync(
    pageSize: number,
    pageNumber: number
  ): Promise<IProductsResponse[]>;
  getProductByIdAsync(id: string): Promise<IProductsResponse>;
  createProductAsync(product: IProduct): Promise<void>;
  updateProductAsync(product: IProduct): Promise<void>;
  deleteProductAsync(id: string): Promise<void>;
  getBestSellingByCategoryAsync(): Promise<IProductsResponse[]>;
  getProductAvailability(productId: number, quantity: number): Promise<boolean>;
  getProductsGroupedByCategory(): Promise<IProductGroupedByCategory[]>;
}
