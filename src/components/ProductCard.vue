<template>
  <v-card :product="product" width="400">
    <v-card-title class="text-center" primary-title>{{
      product.name
    }}</v-card-title>
    <v-card-text>Unit Price: {{ product.unitPrice }}</v-card-text>
    <v-card-text>Units in Stock: {{ product.unitsInStock }}</v-card-text>
    <v-card-text>Category: {{ product.categoryName }}</v-card-text>
    <v-card-actions>
      <v-btn
        v-if="isLoggedIn()"
        :disabled="store.isItemInCart(product)"
        :color="store.isItemInCart(product) ? 'blue' : ''"
        @click.stop="addToCart(product)"
      >
        {{ store.isItemInCart(product) ? "Item In Cart" : "Add To Cart" }}
      </v-btn>
      <v-btn
        :to="{ name: ROUTE_NAMES.DETAILS, params: { id: props.product.id } }"
      >
        More Info
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts" setup>
import { defineProps } from "vue";
import { IProductsResponse } from "../models/productModels";
import { useOrderStore } from "../stores/orders";
import { useUsersStore } from "../stores/users";
import { ROUTE_NAMES } from "../utils/constants";
const { isLoggedIn } = useUsersStore();
const store = useOrderStore();

const props = defineProps({
  product: {
    type: Object as () => IProductsResponse,
    required: true
  }
});

const addToCart = (product: IProductsResponse) => {
  store.addToCart({
    productID: product.id,
    productName: product.name,
    productPrice: product.unitPrice,
    quantity: 1,
    maxQuantity: product.unitsInStock
  });
};
</script>
