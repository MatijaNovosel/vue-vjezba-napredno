<template>
  <div class="d-flex justify-center pa-6 flex-gap-20 flex-wrap">
    <MostSoldProductsBarChart />
    <ProductsSoldPerMonthStackedChart />
    <CustomersPieChart />
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive } from "vue";
import MostSoldProductsBarChart from "@/components/graphs/most-sold-products-bar-chart.vue";
import ProductsSoldPerMonthStackedChart from "@/components/graphs/products-sold-per-month-stacked-chart.vue";
import CustomersPieChart from "@/components/graphs/customers-pie-chart.vue";

export default defineComponent({
  components: { MostSoldProductsBarChart, ProductsSoldPerMonthStackedChart, CustomersPieChart },

  setup() {
    return {};
  }
});
</script>
