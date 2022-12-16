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
          @updateProductList="getProductList"
        ></AddEditProduct>
        <ConfirmationDialog ref="confirmationDialog" />
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
            <v-icon small @click="deleteProduct(item.id)"> mdi-delete </v-icon>
          </template></v-data-table
        >
      </v-card-text>
    </v-card>
  </div>
</template>
<script lang="ts">
import { getService, Types } from "@/di-container";
import { IProductService } from "@/interfaces/iproduct-service";
import { defineComponent, getCurrentInstance, onMounted, reactive, ref, watch } from "vue";
import { ProductDTO } from "@/models/query-responses/product-list-query-response";
import AddEditProduct from "@/components/dialogs/AddEditProduct.vue";
import { AppStateStore } from "@/store/app-state-store";
import ConfirmationDialog from "@/components/dialogs/ConfirmationDialog.vue";

export default defineComponent({
  components: {
    AddEditProduct,
    ConfirmationDialog
  },
  setup() {
    const appStateStore = AppStateStore();
    const productService = getService<IProductService>(Types.ProductService);
    const confirmationDialog = ref();
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

    async function deleteProduct(productId: number) {
      let confirmation = await confirmationDialog.value.createConfirmDialog("Are you sure?");
      if (confirmation) {
        let deletionStatus = await productService.deleteProduct(productId);
        if (deletionStatus) {
          await getProductList();
        }
      }
    }

    onMounted(async () => {
      getProductList();
    });

    return { appStateStore, headers, state, confirmationDialog, getProductList, deleteProduct };
  }
});
</script>
