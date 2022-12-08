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
  subProducts: string[];
}