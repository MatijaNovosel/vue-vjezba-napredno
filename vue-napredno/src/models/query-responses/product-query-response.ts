export interface ProductQueryResponse {
  id: number;
  name: string;
  categoryName: string;
  unitsInStock: number;
  unitPrice: number;
  SubProducts: string[];
}
