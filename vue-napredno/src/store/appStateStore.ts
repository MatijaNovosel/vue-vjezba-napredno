import { Dialog } from "@/models/idialog";
import { ProductQueryResponse } from "@/models/query-responses/productQueryResponse";
import { defineStore } from "pinia";
import { reactive, ref } from "vue";

export const AppStateStore = defineStore("AppStateStore", () => {
  const snackbar = reactive({
    show: false,
    color: "red",
    message: ""
  });

  const addEditProductDialog: Dialog = reactive({
    showDialog: false,
    isEditMode: false,
    item: undefined
  });

  const showConfirmationDialog = ref(false);
  const showCartDialog = ref(false);

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
  return {
    addEditProductDialog,
    showConfirmationDialog,
    showCartDialog,
    snackbar,
    OpenAddEditDialog,
    CloseAddEditDialog
  };
});
