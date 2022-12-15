import { Dialog } from "@/models/idialog";
import { defineStore } from "pinia";
import { reactive, ref } from "vue";
import { ProductQueryResponse } from "@/models/query-responses/product-query-response";

export const AppStateStore = defineStore("AppStateStore", () => {
  const drawerState = ref(false);

  const addEditProductDialog: Dialog = reactive({
    showDialog: false,
    isEditMode: false,
    item: undefined
  });

  const showConfirmationDialog = ref(false);

  function OpenAddEditDialog(isEditMode: boolean, product?: ProductQueryResponse | undefined) {
    addEditProductDialog.showDialog = true;
    addEditProductDialog.isEditMode = isEditMode;
    addEditProductDialog.item = product ?? undefined;
  }

  function CloseAddEditDialog() {
    addEditProductDialog.showDialog = false;
    addEditProductDialog.isEditMode = false;
    addEditProductDialog.item = undefined;
  }
  return { drawerState, addEditProductDialog, showConfirmationDialog, OpenAddEditDialog, CloseAddEditDialog };
});
