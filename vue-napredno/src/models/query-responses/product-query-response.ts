export interface ProductQueryResponse {
  id: number;
  name: string;
  categoryName: string;
  unitsInStock: number;
  unitPrice: number;
  subProducts: SubproductDTO[];
}

export interface SubproductDTO {
  id: number;
  name: string;
  categoryName: string;
  unitsInStock: number;
  unitPrice: number;
}
