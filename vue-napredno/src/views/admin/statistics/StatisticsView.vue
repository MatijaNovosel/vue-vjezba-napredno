<template>
  <div class="d-flex justify-center pa-6 flex-gap-20 flex-wrap">
    <MostSoldProductsBarChart />
    <TotalIncomePerMonthLineChart />
    <CustomersPieChart />
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive } from "vue";
import MostSoldProductsBarChart from "@/components/graphs/most-sold-products-bar-chart.vue";
import TotalIncomePerMonthLineChart from "@/components/graphs/total-income-per-month-line-chart.vue";
import CustomersPieChart from "@/components/graphs/customers-pie-chart.vue";

export default defineComponent({
  components: { MostSoldProductsBarChart, TotalIncomePerMonthLineChart, CustomersPieChart },

  setup() {
    return {};
  }
});
</script>
