<template>
  <div class="text-center">
    <v-dialog width="500" v-model="appStateStore.showCartDialog" @click:outside="closeDialog">
      <v-card>
        <v-card-title>Shopping Cart</v-card-title>

        <v-card-text>
          <div v-for="(item, i) in productStore.cartItems" v:key="i" class="d-flex flex-gap-10">
            <span>{{ item.product.name }}</span>
            <span>Quantity: {{ item.amount }}</span>
            <span>Total: {{ item.amount * item.product.unitPrice }}</span>
            <div class="ml-auto d-flex flex-gap-10">
              <v-btn outlined x-small @click="productStore.addToCart(item.product)"
                ><v-icon>mdi-plus</v-icon></v-btn
              >
              <v-btn outlined x-small @click="productStore.removeFromCart(item.product)"
                ><v-icon>mdi-minus</v-icon></v-btn
              >
            </div>
          </div>
        </v-card-text>
        <v-divider />
        <v-card-actions>
          <v-spacer />
          <v-btn color="primary" text @click="appStateStore.showCartDialog = false">Close</v-btn>
          <v-btn color="primary" text @click="openCheckout">Checkout</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script lang="ts">
import { getService, Types } from "@/di-container";
import { IProductService } from "@/interfaces/iproduct-service";
import router from "@/router";
import RouteNames from "@/router/routeNames";
import { AppStateStore } from "@/store/appStateStore";
import { ProductStore } from "@/store/productStore";
import { defineComponent } from "vue";

export default defineComponent({
  setup(props, context) {
    const appStateStore = AppStateStore();
    const productStore = ProductStore();
    const productService = getService<IProductService>(Types.ProductService);

    function closeDialog() {
      appStateStore.showCartDialog = false;
      context.emit("close");
    }

    function openCheckout() {
      closeDialog();
      router.push(RouteNames.Checkout);
    }

    return { appStateStore, productStore, productService, RouteNames, closeDialog, openCheckout };
  }
});
</script>
