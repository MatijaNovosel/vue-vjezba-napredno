export interface AddProductCommand {
  name: string;
  categoryId: number;
  unitsInStock: number;
  unitPrice: number;
  subProducts: number[];
}
