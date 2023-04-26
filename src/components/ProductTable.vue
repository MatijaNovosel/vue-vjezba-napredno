<template>
  <v-data-table
    :headers="headers"
    :items="items"
    :server-items-length="totalItems"
    :loading="loading"
    :items-per-page="itemsPerPage"
    :page="page"
    :server-data="loadData"
    :no-data-text="noDataText"
    class="elevation-1"
  >
    <!-- <template v-slot:item.actions="{ item }">
      <v-btn icon @click="editProduct(item.id)">
        <v-icon color="primary">mdi-pencil</v-icon>
      </v-btn>
      <v-btn icon @click="deleteProduct(item.id)">
        <v-icon color="error">mdi-delete</v-icon>
      </v-btn>
    </template> -->
  </v-data-table>
</template>

<script lang="ts" setup>
import { IProductsResponse } from "@/models/productModels";
import { ref } from "vue";
import { useProductStore } from "../stores/products";

const store = useProductStore();

const headers = [
  { text: "ID", value: "id" },
  { text: "Name", value: "name" },
  { text: "Unit Price", value: "unitPrice" },
  { text: "Units In Stock", value: "unitsInStock" },
  { text: "Category Name", value: "categoryName" },
  { text: "Total Quantity Sold", value: "totalQuantitySold" },
  { text: "Actions", value: "actions", sortable: false }
];

const items = ref<IProductsResponse[]>([]);
const totalItems = ref(0);
const loading = ref(false);
const page = ref(1);
const itemsPerPage = ref(10);
const noDataText = ref("No products found");

const loadData = async ({ page, itemsPerPage }: any) => {
  loading.value = true;
  const result = await store.getAllProducts(itemsPerPage, page);
  items.value = result!;
  totalItems.value = result!.length;
  loading.value = false;
};
console.log(totalItems);

const editProduct = (id: number) => {
  // Implement your logic for editing a product here
};

const deleteProduct = (id: number) => {
  // Implement your logic for deleting a product here
};
</script>
