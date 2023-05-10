<template>
  <div>
    <v-table class="mx-3" fixed-header height="400px">
      <thead>
        <tr>
          <th class="text-center font-weight-bold">Name</th>
          <th class="text-center font-weight-bold">Price</th>
          <th class="text-center font-weight-bold">Quantity</th>
          <th class="text-center font-weight-bold">Actions</th>
          <th class="text-center font-weight-bold">Total</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item of cartItems" :key="item.productID">
          <td class="text-center">{{ item.productName }}</td>
          <td class="text-center">${{ item.productPrice }}</td>
          <td class="text-center">
            <v-btn size="x-small" @click.stop="decrementItemQuantity(item)">
              <v-icon> mdi-chevron-left </v-icon>
            </v-btn>
            <v-label
              class="mx-3"
              variant="solo"
              :text="item.quantity.toString()"
              readonly
            >
            </v-label>
            <v-btn size="x-small" @click.stop="incrementItemQuantity(item)">
              <v-icon> mdi-chevron-right </v-icon>
            </v-btn>
          </td>
          <td>
            <v-btn color="red" @click.stop="removeItemFromCart(item)"
              >Remove</v-btn
            >
          </td>
          <td class="text-center font-weight-bold">
            ${{ (item.productPrice * item.quantity).toFixed(2) }}
          </td>
        </tr>
      </tbody>
    </v-table>
  </div>
</template>
<script lang="ts" setup>
import { PropType, defineProps } from "vue";
import { CartItem } from "../models/cartModels";
import { useOrderStore } from "../stores/orders";
const store = useOrderStore();

defineProps({
  cartItems: {
    required: true,
    type: Object as PropType<CartItem[]>
  }
});

const incrementItemQuantity = (item: CartItem) => {
  if (item.quantity < item.maxQuantity) {
    item.quantity++;
  }
};

const removeItemFromCart = (item: CartItem) => {
  store.removeFromCart(item);
};

const decrementItemQuantity = (item: CartItem) => {
  if (item.quantity > 1) {
    item.quantity--;
  }
};
</script>
