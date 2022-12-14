import { EditProductCommand } from './../models/commands/edit-product-command';
import { AddProductCommand } from "@/models/commands/add-product-command";
import { Dialog } from "@/models/idialog";
import { defineStore } from "pinia";
import { reactive, ref } from "vue";

export const AppStateStore = defineStore("AppStateStore", () => {
  const drawerState = ref(false);

  const addEditProductDialog: Dialog = reactive({
    showDialog: false,
    isEditMode: false,
    item: undefined
  });

  function OpenAddEditDialog(isEditMode: boolean, product?: AddProductCommand | EditProductCommand) {
    addEditProductDialog.showDialog = true;
    addEditProductDialog.isEditMode = isEditMode;
    addEditProductDialog.item = product ?? undefined;
  }

  function CloseAddEditDialog() {
    addEditProductDialog.showDialog = false;
    addEditProductDialog.isEditMode = false;
    addEditProductDialog.item = undefined;
  }
  return { drawerState, addEditProductDialog, OpenAddEditDialog, CloseAddEditDialog };
}); 
