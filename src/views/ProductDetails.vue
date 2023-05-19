<template>
  <v-card class="mx-auto" max-width="1000">
    <v-card-title class="text-h5">{{ state.detail.name }} </v-card-title>
    <v-card-subtitle class="text h6">
      <v-icon left>mdi-currency-eur</v-icon>
      <span class="text-h6">{{ state.detail.unitPrice }}</span>
    </v-card-subtitle>
    <v-card-text>
      <v-row class="mb-2">
        <v-col cols="4" tag="p" class="text-bold">unitsInStock:</v-col>
        <v-col cols="8" tag="p">{{ state.detail.unitsInStock }}</v-col>
      </v-row>
      <v-row class="mb-2">
        <v-col cols="4" tag="p" class="text-bold">Subcategories:</v-col>
        <v-col cols="8">
          <v-chip-group>
            <v-chip
              label
              v-for="subproduct in state.detail.subProducts"
              :key="subproduct"
              >{{ subproduct }}</v-chip
            >
          </v-chip-group>
        </v-col>
      </v-row>
    </v-card-text>
    <v-card-actions>
      <v-btn color="orange" to="/allproducts">Back to Products</v-btn>
    </v-card-actions>
  </v-card>
</template>
<script lang="ts" setup>
import { onMounted, reactive } from "vue";
import { useRoute } from "vue-router";
import { IProductsResponse } from "../models/productModels";
import { useProductStore } from "../stores/products";

const route = useRoute();
const store = useProductStore();
const state = reactive<{ detail: IProductsResponse }>({
  detail: {} as IProductsResponse
});

onMounted(async () => {
  const detail = (await store.getProductById(
    route.params.id as string
  )) as IProductsResponse;
  state.detail = detail;
});
</script>
