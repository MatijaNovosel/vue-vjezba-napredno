// export interface IProductsResponse {
//   id: number;
//   name: string;
//   unitPrice: number;
//   unitsInStock: number;
//   categoryName: string;
//   categoryId: number;
//   totalQuantitySold: number;
//   subProducts: string[];
// }
export interface IProductsResponse {
  id: number;
  name: string;
  unitPrice: number;
  unitsInStock: number;
  category: Category;
  totalQuantitySold: number;
  subProducts: string[];
}
export interface Category {
  id: number;
  name: string;
}
export interface ISales {
  month: number;
  total: number;
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
