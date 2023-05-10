<template>
  <v-card class="mx-auto mt-5 elevation-3" width="800">
    <v-card-title> Billing Information </v-card-title>
    <v-card-text
      >Name: {{ details.user.firstName }} {{ details.user.lastName }}
    </v-card-text>
    <v-card-text
      >Email:
      {{ details.user.email }}
    </v-card-text>
    <v-card-text
      >Total
      {{ details.totalAmount }}
    </v-card-text>
    <v-btn class="mb-5 ml-5" @click="confirmOrder" dark color="green"
      >Confirm Purchase</v-btn
    >
  </v-card>
</template>
<script lang="ts" setup>
import { CheckoutDetails } from "@/models/cartModels";
import router from "@/router";
import { useOrderStore } from "@/stores/orders";
import { ROUTE_NAMES } from "@/utils/constants";

const orderStore = useOrderStore();

const details: CheckoutDetails = orderStore.loadCartDetailsFromLocalStorage();

const confirmOrder = async () => {
  try {
    await orderStore.confirmPurchase(details.user);
    router.push(ROUTE_NAMES.PRODUCTS);
  } catch (error) {
    console.log(error);
  }
};
</script>
