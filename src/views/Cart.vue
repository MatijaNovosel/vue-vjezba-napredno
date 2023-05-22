<template>
  <v-card class="mx-auto mt-5 elevation-3" width="800">
    <v-card-title>Cart</v-card-title>
    <cart-table :cart-items="store.cart" />
    <v-card-actions>
      <v-card-text class="text-center font-weight-bold" style="font-size: 24px">
        {{ store.totalInCart().toFixed(1) }}
      </v-card-text>
      <v-btn
        v-if="store.totalInCart() > 0"
        variant="tonal"
        @click="goToCheckout()"
      >
        Proceed To Checkout
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts" setup>
import CartTable from "../components/CartTable.vue";
import { IUserDetails } from "../models/userModels";
import router from "../router";
import { useOrderStore } from "../stores/orders";
import { useUsersStore } from "../stores/users";
import { ROUTE_NAMES } from "../utils/constants";

const store = useOrderStore();
const userStore = useUsersStore();

const goToCheckout = () => {
  const user = userStore.currentUser as IUserDetails;
  store.saveCartDetailsToLocalStorage({
    user: user,
    totalAmount: store.totalInCart()
  });
  router.push(ROUTE_NAMES.CHECKOUT);
};
</script>
