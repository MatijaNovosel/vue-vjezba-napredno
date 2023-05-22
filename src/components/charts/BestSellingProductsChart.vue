<template>
  <Bar :data="chartData" />
</template>

<script lang="ts" setup>
import { IProductsResponse } from "@/models/productModels";
import { useProductStore } from "@/stores/products";
import { colorArray } from "@/utils/constants";
import { computed, onMounted, reactive } from "vue";
import { Bar } from "vue-chartjs";

interface State {
  products: IProductsResponse[];
  productNames: string[];
  quantitySold: number[];
}

const state: State = reactive({
  products: [],
  productNames: [],
  quantitySold: []
});

const store = useProductStore();

const chartData = computed(() => {
  return {
    labels: state.productNames,
    datasets: [
      {
        label: "Quantity Sold",
        backgroundColor: colorArray[2],
        data: state.quantitySold
      }
    ]
  };
});

onMounted(async () => {
  await store.getBestsellingProducts();
  state.products = store.products;
  state.productNames = state.products.map((product) => product.name);
  state.quantitySold = state.products.map(
    (product) => product.totalQuantitySold
  );
  if (state.productNames !== null) {
    chartData.value.labels = state.productNames;
  }
  chartData.value.datasets[0].data = state.quantitySold;
});
</script>
