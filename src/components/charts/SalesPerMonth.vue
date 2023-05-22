<template>
  <Line :data="chartData" :options="chartOptions" />
</template>

<script lang="ts" setup>
import { ISales } from "@/models/productModels";
import { useProductStore } from "@/stores/products";
import { chartOptions } from "@/utils/constants";
import { getMonthName } from "@/utils/helpers";
import { computed, onMounted, reactive } from "vue";
import { Line } from "vue-chartjs";

interface State {
  sales: ISales[];
  month: string[];
  amountSold: number[];
}
const state: State = reactive({
  sales: [],
  month: [],
  amountSold: []
});

const store = useProductStore();

const chartData = computed(() => {
  return {
    labels: state.month,
    datasets: [
      {
        label: "Amount Spent Per Month",
        borderColor: "rgb(54, 162, 235)",
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        data: state.amountSold
      }
    ]
  };
});

onMounted(async () => {
  state.sales = await store.getSales();
  state.amountSold = state.sales.map((sales) => sales.total);
  state.month = state.sales.map((sales) => getMonthName(sales.month));
  chartData.value.datasets[0].data = state.amountSold;
});
</script>
