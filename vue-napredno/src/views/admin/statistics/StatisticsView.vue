<template>
  <div class="d-flex justify-center pa-6 flex-gap-20 flex-wrap">
    <most-sold-products-bar-chart />
    <total-income-per-month-line-chart />
    <customers-pie-chart />
  </div>
</template>

<script lang="ts">
import CustomersPieChart from "@/components/graphs/CustomersPieChart.vue";
import MostSoldProductsBarChart from "@/components/graphs/MostSoldProductsBarChart.vue";
import TotalIncomePerMonthLineChart from "@/components/graphs/TotalIncomePerMonthLineChart.vue";
import { defineComponent } from "vue";

export default defineComponent({
  components: { MostSoldProductsBarChart, TotalIncomePerMonthLineChart, CustomersPieChart },

  setup() {
    return {};
  }
});
</script>
