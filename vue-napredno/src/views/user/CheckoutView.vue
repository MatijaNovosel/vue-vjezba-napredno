<template>
  <div class="pa-6 d-flex flex-column">
    <h1>Checkout</h1>
    <div v-for="(item, i) in productStore.cartItems" v:key="i" class="d-flex flex-gap-10">
      <span>{{ item.product.name }}</span>
      <span>Quantity: {{ item.amount }}</span>
      <span>Total: {{ item.amount * item.product.unitPrice }}</span>
    </div>
    <v-divider />
    <span>Total: {{ total }}</span>
    <v-btn color="primary" @click="createOrder">Order</v-btn>
  </div>
</template>

<script lang="ts">
import { getService, Types } from "@/di-container";
import { IOrderService } from "@/interfaces/Iorder-service";
import router from "@/router";
import RouteNames from "@/router/routeNames";
import { ProductStore } from "@/store/productStore";
import { computed, defineComponent } from "vue";

export default defineComponent({
  setup() {
    const productStore = ProductStore();
    const orderService = getService<IOrderService>(Types.OrderService);

    const total = computed(() => {
      return productStore.cartItems.reduce(
        (accumulator, currentValue) => accumulator + currentValue.amount,
        0
      );
    });

    async function createOrder() {
      const result = await orderService.createOrder({
        orderDetails: productStore.cartItems.map(({ product, amount }) => ({
          productId: product.id,
          quantity: amount,
          price: product.unitPrice
        }))
      });
      if (result) {
        productStore.cart.items = [];
        router.push(RouteNames.Products);
      }
    }

    return { total, productStore, createOrder };
  }
});
</script>
