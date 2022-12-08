<template>
  <div class="d-flex justify-center pa-6">
    <v-card width="100%">
      <v-card-title>
        <span class="headline font-weight-bold">Product List</span>
      </v-card-title>
      <v-card-text class="font-weight-light">
        <v-data-table
          class="elevation-1"
          :options.sync="state.options"
          :headers="headers"
          :items="state.items"
          :server-items-length="state.totalItems"
          v-on:pagination="getProductList"
        >
          <template v-slot:item.actions="{ item }">
            <v-icon small class="mr-2"> mdi-pencil </v-icon>
            <v-icon small> mdi-delete </v-icon>
          </template></v-data-table
        >
      </v-card-text>
    </v-card>
  </div>
</template>
<script lang="ts">
import { getService, Types } from "@/di-container";
import { IProductService } from "@/interfaces/productService";
import { defineComponent, onMounted, reactive } from "vue";
import { ProductDTO } from "@/models/query-responses/product-list-query-response";

export default defineComponent({
  setup() {
    const productService = getService<IProductService>(Types.ProductService);
    const headers = [
      { text: "Name", value: "name" },
      { text: "Category", value: "categoryName" },
      { text: "Units In Stock", value: "unitsInStock" },
      { text: "Unit Price", value: "unitPrice" },
      { text: "Subproducts", value: "subProducts" },
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
    return { headers, state, getProductList };
  }
});
</script>
