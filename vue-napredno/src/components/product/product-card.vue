<template>
  <v-card min-width="250">
    <v-card-title>
      <span class="headline font-weight-bold">{{ product?.name }}</span>
    </v-card-title>
    <v-card-text class="font-weight-light">
      <div v-if="itemsInCart > 0" class="d-flex flex-gap-10">
        <span>Quantity: {{ itemsInCart }}</span>
        <span>Total: {{ total }}</span>
        <v-btn
          v-if="itemsInCart > 0"
          outlined
          x-small
          class="ml-auto"
          @click="productStore.removeFromCart(product)"
          ><v-icon>mdi-minus</v-icon></v-btn
        >
      </div>
    </v-card-text>
    <v-card-actions class="justify-end">
      <v-btn color="primary">Details</v-btn>
      <v-btn color="primary" v-if="userStore.isLoggedIn" @click="productStore.addToCart(product)"
        ><v-icon>mdi-cart</v-icon></v-btn
      >
    </v-card-actions>
  </v-card>
</template>
<script lang="ts">
import { ProductQueryResponse } from "@/models/query-responses/product-query-response";
import { ProductStore } from "@/store/product-store";
import { UserStore } from "@/store/user-store";
import { computed, defineComponent, PropType } from "vue";

export default defineComponent({
  props: {
    product: {
      type: Object as PropType<ProductQueryResponse>,
      required: true
    }
  },
  setup(props) {
    const productStore = ProductStore();
    const userStore = UserStore();
    const itemsInCart = computed(
      () =>
        productStore.cart.items.filter((x) => {
          return x.id === props.product?.id;
        }).length
    );

    const total = computed(() => {
      return itemsInCart.value * props.product.unitPrice;
    });

    return { itemsInCart, total, productStore, userStore };
  }
});
</script>
