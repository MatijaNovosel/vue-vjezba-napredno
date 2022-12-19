<template>
  <div class="pa-6 d-flex flex-column">
    <h1>Checkout</h1>
    <div v-for="(item, i) in cartItems" v:key="i" class="d-flex flex-gap-10">
      <span>{{ item.product.name }}</span>
      <span>Quantity: {{ item.amount }}</span>
      <span>Total: {{ item.amount * item.product.unitPrice }}</span>
    </div>
    <v-divider />
    <span>Total: {{ total }}</span>
    <v-btn color="primary" @click="createOrder">Update</v-btn>
  </div>
</template>

<script lang="ts">
import { getService, Types } from "@/di-container";
import { IOrderService } from "@/interfaces/Iorder-service";
import { IProductService } from "@/interfaces/iproduct-service";
import { CreateOrderCommand, OrderDetailDto } from "@/models/commands/create-order-command";
import { cartItem } from "@/models/icartItem";
import { ProductStore } from "@/store/product-store";
import { computed, defineComponent } from "vue";
import { VBtn, VIcon } from "vuetify/lib";

export default defineComponent({
  setup() {
    const productStore = ProductStore();
    const orderService = getService<IOrderService>(Types.OrderService);

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

    const total = computed(() => {
      let sum = 0;
      cartItems.value.forEach((x) => {
        sum = sum + x.amount * x.product.unitPrice;
      });
      return sum;
    });

    async function createOrder() {
      let order: CreateOrderCommand = {
        orderDetails: []
      };
      cartItems.value.forEach((product) => {
        let orderDetail: OrderDetailDto = {
          productId: product.product.id,
          quantity: product.amount,
          price: product.product.unitPrice
        };
        order.orderDetails.push(orderDetail);
      });
      let result = await orderService.createOrder(order);
      if (result) {
        productStore.cart.items = [];
      }
    }

    return { cartItems, total, createOrder };
  }
});
</script>
