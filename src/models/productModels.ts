export interface IProductsResponse {
  id: number;
  name: string;
  unitPrice: number;
  unitsInStock: number;
  categoryName: string;
  totalQuantitySold: number;
  subProducts: string[];
}
export interface IProduct {
  id: number | 0;
  name: string;
  unitPrice: number;
  unitsInStock: number;
  categoryID: number;
}
export interface IProductGroupedByCategory {
  catgoryId: number;
  categoryName: string;
  products: string[];
}
