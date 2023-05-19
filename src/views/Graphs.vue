<template>
  <v-container class="mx-auto">
    <v-window v-model="activeWindow" color="primary" show-arrows>
      <v-window-item value="best-selling-products">
        <BestSellingProductsChart />
      </v-window-item>
      <v-window-item value="customer-spending">
        <CustomerSpendingChart />
      </v-window-item>
      <v-window-item value="sales">
        <SalesPerMonth />
      </v-window-item>
    </v-window>
  </v-container>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import BestSellingProductsChart from "../components/charts/BestSellingProductsChart.vue";
import CustomerSpendingChart from "../components/charts/CustomerSpendingChart.vue";
import SalesPerMonth from "../components/charts/SalesPerMonth.vue";

const activeWindow = ref("best-selling-products");
</script>
