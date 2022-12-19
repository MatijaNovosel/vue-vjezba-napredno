<template>
  <div class="text-center">
    <v-dialog width="500" v-model="appStateStore.showCartDialog" @click:outside="closeDialog">
      <v-card>
        <v-card-title>Shopping Cart</v-card-title>

        <v-card-text>
          <div v-for="(item, i) in cartItems" v:key="i" class="d-flex flex-gap-10">
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
          <v-btn color="primary" fill text :to="RouteNames.Checkout">Checkout</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script lang="ts">
import { getService, Types } from "@/di-container";
import { ProductCategoryEnum } from "@/enums/product-category-enum";
import { IForm } from "@/interfaces/iform";
import { IProductService } from "@/interfaces/iproduct-service";
import { AddEditProductCommand } from "@/models/commands/add-product-command";
import { cartItem } from "@/models/icartItem";
import { ProductQueryResponse } from "@/models/query-responses/product-query-response";
import { AppStateStore } from "@/store/app-state-store";
import { ProductStore } from "@/store/product-store";
import { computed, defineComponent, onMounted, reactive, ref, watch } from "vue";
import RouteNames from "@/router/route-names";

export default defineComponent({
  setup(props, context) {
    const appStateStore = AppStateStore();
    const productStore = ProductStore();
    const productService = getService<IProductService>(Types.ProductService);

    const cartItems = computed(() => {
      let uniqueItems = productStore.cart.items.filter(
        (value, index, self) => self.indexOf(value) === index
      );
      let cartItems: cartItem[] = [];
      uniqueItems.forEach((product) => {
        let cartItem: cartItem = {
          product: product,
          amount: productStore.cart.items.filter((x) => {
            return x.id === product.id;
          }).length
        };
        cartItems.push(cartItem);
      });
      return cartItems;
    });

    function closeDialog() {
      context.emit("close");
    }

    return { appStateStore, productStore, cartItems, RouteNames, closeDialog };
  }
});
</script>
