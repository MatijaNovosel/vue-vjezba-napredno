<template>
  <v-container class="mt-5 mx-auto elevation-3">
    <v-data-table
      v-model:items-per-page="state.itemsPerPage"
      :headers="tableHeaders as any"
      :items-length="state.totalItems"
      :items="store.products"
      :loading="state.loading"
      :no-data-text="noDataText"
      return-object
      multi-sort
      item-value="name"
      @update:options="loadData"
    >
      <template #item.actions="{ item }">
        <v-btn class="mr-5" icon @click="openEditModal(item.value)">
          <v-icon color="blue">mdi-pencil</v-icon>
        </v-btn>
        <v-btn icon @click="openConfirmModal(item.value)">
          <v-icon color="error">mdi-delete</v-icon>
        </v-btn>
      </template>
    </v-data-table>
  </v-container>
  <product-edit-modal
    :open="state.editModal"
    @dialog-confirm="editProduct"
    @dialog-close="closeEditModal()"
    :product="state.selectedProduct as IProductsResponse"
  />
  <confirm-modal
    :open="state.confirmModal"
    @dialog-confirm="deleteProduct()"
    @dialog-close="closeConfirmModal()"
  />
</template>

<script lang="ts" setup>
import { reactive, ref } from "vue";
import { VDataTable } from "vuetify/labs/VDataTable";
import ConfirmModal from "../components/ConfirmModal.vue";
import ProductEditModal from "../components/ProductEditModal.vue";
import { IProductsResponse } from "../models/productModels";
import { useProductStore } from "../stores/products";

interface State {
  itemsPerPage: number;
  totalItems: number;
  loading: boolean;
  page: number;
  items: IProductsResponse[];
  editModal: boolean;
  selectedProduct: IProductsResponse | null;
  confirmModal: boolean;
  editedProduct: IProductsResponse | null;
}

const store = useProductStore();

const tableHeaders = [
  { title: "ID", key: "id", sortable: true, align: "start" },
  { title: "Name", key: "name", sortable: true },
  { title: "Unit Price", key: "unitPrice", sortable: true },
  { title: "Units In Stock", key: "unitsInStock", sortable: true },
  { title: "Category Name", key: "category.name", sortable: true },
  { title: "Total Quantity Sold", key: "totalQuantitySold", sortable: true },
  { title: "Actions", key: "actions", sortable: false }
];

const state: State = reactive({
  itemsPerPage: 7,
  totalItems: 10,
  loading: false,
  page: 1,
  items: [],
  editModal: false,
  confirmModal: false,
  selectedProduct: null,
  editedProduct: null
});
const noDataText = ref("No products found");

const loadData = async ({ page, itemsPerPage }: any) => {
  state.loading = true;
  await store.loadProducts(itemsPerPage, page, true);
  state.loading = false;
};
const editProduct = async (editProduct: IProductsResponse) => {
  if (editProduct) {
    await store.updateProduct({
      id: editProduct.id,
      name: editProduct.name,
      categoryID: editProduct.category.id,
      unitPrice: editProduct.unitPrice,
      unitsInStock: editProduct.unitsInStock
    });
    await store.loadProducts(state.itemsPerPage, state.page, true);
    closeEditModal();
  }
};
const deleteProduct = async () => {
  if (state.selectedProduct) {
    await store.deleteProduct(state.selectedProduct?.id);
    await store.loadProducts(state.itemsPerPage, state.page, true);
    closeConfirmModal();
  }
};

const openConfirmModal = (product: IProductsResponse) => {
  state.selectedProduct = product;
  state.confirmModal = true;
};
const openEditModal = (product: IProductsResponse) => {
  state.selectedProduct = product;
  state.editModal = true;
};

const closeConfirmModal = () => {
  state.confirmModal = false;
  state.selectedProduct = null;
};

const closeEditModal = () => {
  state.editModal = false;
  state.selectedProduct = null;
};
</script>
