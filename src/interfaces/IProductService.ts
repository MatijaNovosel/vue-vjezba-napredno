import {
  Category,
  IProduct,
  IProductGroupedByCategory,
  IProductsResponse,
  ISales
} from "../models/productModels";

export interface IProductService {
  getAllProductsAsync(): Promise<IProductsResponse[]>;
  getBestsellingProductsAsync(): Promise<IProductsResponse[]>;
  getPaginatedProductsAsync(
    pageSize: number,
    pageNumber: number
  ): Promise<IProductsResponse[]>;
  getProductByIdAsync(id: string): Promise<IProductsResponse>;
  createProductAsync(product: IProduct): Promise<void>;
  updateProductAsync(product: IProduct): Promise<void>;
  deleteProductAsync(id: number): Promise<void>;
  getSalesByMonth(): Promise<ISales[]>;
  getProductAvailability(productId: number, quantity: number): Promise<boolean>;
  getProductsGroupedByCategory(): Promise<IProductGroupedByCategory[]>;
  GetAllProductCategories(): Promise<Category[]>;
}
