<template>
  <div class="d-flex justify-center pa-6">
    <v-card width="100%">
      <v-card-title>
        <span class="headline font-weight-bold">Product List</span>
        <v-spacer />
        <v-btn color="primary" @click="appStateStore.OpenAddEditDialog(false)">Add</v-btn>
      </v-card-title>
      <v-card-text class="font-weight-light">
        <add-edit-product
          :showDialog="appStateStore.addEditProductDialog.showDialog"
          @close="appStateStore.CloseAddEditDialog"
          @update-product-list="getProductList"
        ></add-edit-product>
        <confirmation-dialog ref="confirmationDialog" />
        <v-data-table
          class="elevation-1"
          :options.sync="state.options"
          :headers="headers"
          :items="state.items"
          :server-items-length="state.totalItems"
          @pagination="getProductList"
        >
          <template #item.actions="{ item }">
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
import AddEditProduct from "@/components/dialogs/AddEditProduct.vue";
import ConfirmationDialog from "@/components/dialogs/ConfirmationDialog.vue";
import { getService, Types } from "@/di-container";
import { IProductService } from "@/interfaces/iproduct-service";
import { ProductDTO } from "@/models/query-responses/productListQueryResponse";
import { AppStateStore } from "@/store/appStateStore";
import { defineComponent, onMounted, reactive, ref } from "vue";

interface State {
  options: {
    page: number;
    itemsPerPage: number;
  };
  items: ProductDTO[];
  totalItems: number;
}

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

    const state: State = reactive({
      options: {
        page: 1,
        itemsPerPage: 5
      },
      items: [],
      totalItems: 0
    });

    async function getProductList() {
      const { products, totalItems } = await productService.getProductList(
        state.options.page,
        state.options.itemsPerPage
      );
      state.items = products;
      state.totalItems = totalItems;
    }

    async function deleteProduct(productId: number) {
      const confirmation = await confirmationDialog.value.createConfirmDialog("Are you sure?");
      if (confirmation) {
        const deletionStatus = await productService.deleteProduct(productId);
        if (deletionStatus) {
          await getProductList();
        }
      }
    }

    onMounted(async () => {
      await getProductList();
    });

    return { appStateStore, headers, state, confirmationDialog, getProductList, deleteProduct };
  }
});
</script>
