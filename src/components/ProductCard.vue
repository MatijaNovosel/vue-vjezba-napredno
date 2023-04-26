<template>
  <v-card
    :product="product"
    width="400"
    @click="$router.push(`/details/${product.id}`)"
  >
    <v-card-title primary-title>{{ product.name }}</v-card-title>
    <v-card-text>Unit Price: {{ product.unitPrice }}</v-card-text>
    <v-card-text>Units in Stock: {{ product.unitsInStock }}</v-card-text>
    <v-card-text>Category: {{ product.categoryName }}</v-card-text>
    <v-card-text
      >Total Quantity Sold: {{ product.totalQuantitySold }}</v-card-text
    >
  </v-card>
</template>

<script lang="ts" setup>
import { IProductsResponse } from "@/models/productModels";
import { defineProps } from "vue";

const props = defineProps({
  product: {
    type: Object as () => IProductsResponse,
    required: true
  }
});
</script>
