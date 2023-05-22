<template>
  <v-dialog v-model="state.showEditModal" max-width="800px" persistent>
    <v-card v-if="state.editedProduct !== null">
      <v-toolbar color="blue">
        <v-toolbar-title>Edit Product</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon @click="emit('dialog-close')">
          <v-icon size="large" color="red">mdi-close-circle</v-icon>
        </v-btn>
      </v-toolbar>
      <v-card-text>
        <v-form ref="form">
          <v-text-field v-model="state.editedProduct.name" label="Name" />
          <v-text-field
            v-model="state.editedProduct.unitPrice"
            label="Unit Price"
          />
          <v-text-field
            v-model="state.editedProduct.unitsInStock"
            label="Units In Stock"
          />
          <v-select
            v-model="state.editedProduct.category"
            :items="store.categories"
            item-title="name"
            label="Category"
            return-object
          />
          <v-text-field
            v-model="state.editedProduct.totalQuantitySold"
            label="Total Quantity Sold"
          />
        </v-form>
      </v-card-text>
      <v-btn color="green" @click="emit('dialog-confirm', state.editedProduct)">
        Save
      </v-btn>
    </v-card>
  </v-dialog>
</template>

<script lang="ts" setup>
import { Category, IProductsResponse } from "../models/productModels";
import { useProductStore } from "../stores/products";

import {
  PropType,
  defineEmits,
  defineProps,
  onMounted,
  reactive,
  watch
} from "vue";

interface State {
  showEditModal: boolean;
  editedProduct: IProductsResponse;
  categories: Category[];
}
const store = useProductStore();
const state: State = reactive({
  showEditModal: false,
  editedProduct: {} as IProductsResponse,
  categories: store.categories
});
const props = defineProps({
  product: {
    type: Object as PropType<IProductsResponse>,
    required: true,
    default: null
  },
  open: {
    required: true,
    type: Boolean,
    default: false
  }
});
const emit = defineEmits(["dialog-confirm", "dialog-close"]);

watch(
  () => props.open,
  (val) => {
    state.showEditModal = val;
  }
);
watch(
  () => props.product,
  (val) => {
    state.editedProduct = { ...val };
  }
);
onMounted(async () => {
  await store.getAllCategories();
});
</script>
