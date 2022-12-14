export interface EditProductCommand {
  id: number;
  name: string;
  categoryId: number;
  unitsInStock: number;
  unitPrice: number;
  subProducts: number[];
}
