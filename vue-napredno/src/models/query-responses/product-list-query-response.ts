import { SubproductDTO } from "./product-query-response";

export interface ProductListQueryResponse{
  totalItems: number,
  products: ProductDTO[]
}

export interface ProductDTO {
  id: number;
  name: string;
  categoryName: string;
  unitsInStock: number;
  unitPrice: number;
  subProducts: SubproductDTO[];
}