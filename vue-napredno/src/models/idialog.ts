import { EditProductCommand } from './commands/edit-product-command';
import { AddProductCommand } from '@/models/commands/add-product-command';
export interface Dialog {
  showDialog: boolean,
  isEditMode: boolean,
  item: AddProductCommand | EditProductCommand | undefined
}