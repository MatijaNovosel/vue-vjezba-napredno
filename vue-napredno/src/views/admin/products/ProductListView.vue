<template>
  <div class="d-flex justify-center pa-6">
    <v-card width="100%">
      <v-card-title>
        <span class="headline font-weight-bold">Product List</span>
        <v-spacer />
        <v-btn color="primary" @click="appStateStore.OpenAddEditDialog(false)">Add</v-btn>
      </v-card-title>
      <v-card-text class="font-weight-light">
        <AddEditProduct
          :showDialog="appStateStore.addEditProductDialog.showDialog"
          @close="appStateStore.CloseAddEditDialog"
        ></AddEditProduct>
        <v-data-table
          class="elevation-1"
          :options.sync="state.options"
          :headers="headers"
          :items="state.items"
          :server-items-length="state.totalItems"
          @pagination="getProductList"
        >
          <template v-slot:item.actions="{ item }">
            <v-icon small class="mr-2" @click="appStateStore.OpenAddEditDialog(true, item)">
              mdi-pencil
            </v-icon>
            <v-icon small> mdi-delete </v-icon>
          </template></v-data-table
        >
      </v-card-text>
    </v-card>
  </div>
</template>
<script lang="ts">
import { getService, Types } from "@/di-container";
import { IProductService } from "@/interfaces/iproduct-service";
import { defineComponent, onMounted, reactive, watch } from "vue";
import { ProductDTO } from "@/models/query-responses/product-list-query-response";
import AddEditProduct from "@/components/dialogs/AddEditProduct.vue";
import { AppStateStore } from "@/store/app-state-store";

export default defineComponent({
  components: {
    AddEditProduct
  },
  setup() {
    const appStateStore = AppStateStore();
    const productService = getService<IProductService>(Types.ProductService);
    const headers = [
      { text: "Name", value: "name" },
      { text: "Category", value: "categoryName" },
      { text: "Units In Stock", value: "unitsInStock" },
      { text: "Unit Price", value: "unitPrice" },
      { text: "Actions", value: "actions" }
    ];

    const state = reactive({
      options: {
        page: 1,
        itemsPerPage: 5
      },
      items: [] as ProductDTO[],
      totalItems: 0
    });

    async function getProductList() {
      let data = await productService.getProductList(
        state.options.page,
        state.options.itemsPerPage
      );
      state.items = data.products;
      state.totalItems = data.totalItems;
    }

    onMounted(async () => {
      getProductList();
    });

    return { appStateStore, headers, state, getProductList };
  }
});
</script>
