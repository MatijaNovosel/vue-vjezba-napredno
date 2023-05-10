<template>
  <v-data-table
    v-model:items-per-page="itemsPerPage"
    :headers="tableHeaders as any"
    :items-length="totalItems"
    :items="items"
    :loading="loading"
    class="elevation-1"
    item-value="name"
    @update:options="loadData"
  />
  <!-- <template v-slot:item.actions="{ item }">
      <v-btn icon @click="editProduct(item.id)">
        <v-icon color="primary">mdi-pencil</v-icon>
      </v-btn>
      <v-btn icon @click="deleteProduct(item.id)">
        <v-icon color="error">mdi-delete</v-icon>
      </v-btn>
    </template> -->
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { VDataTable } from "vuetify/labs/VDataTable";
import { useProductStore } from "../stores/products";

const store = useProductStore();

const tableHeaders = [
  { text: "ID", value: "id", sortable: false, align: "start" },
  { text: "Name", value: "name", sortable: false },
  { text: "Unit Price", value: "unitPrice", sortable: false },
  { text: "Units In Stock", value: "unitsInStock", sortable: false },
  { text: "Category Name", value: "categoryName", sortable: false },
  { text: "Total Quantity Sold", value: "totalQuantitySold", sortable: false },
  { text: "Actions", value: "actions", sortable: false }
];

const items = store.state.products;
const totalItems = ref(10);
const loading = ref(true);
const page = ref(1);
const itemsPerPage = ref(10);
const noDataText = ref("No products found");

const loadData = async ({ page, itemsPerPage }: any) => {
  loading.value = true;
  const result = await store.getAllProducts(itemsPerPage, page);
  loading.value = false;
};

const editProduct = (id: number) => {
  // Implement your logic for editing a product here
};

const deleteProduct = (id: number) => {
  store.deleteProduct(id.toString());
};
</script>
