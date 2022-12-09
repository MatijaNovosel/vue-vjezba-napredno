<template>
  <div class="d-flex justify-center pa-6">
    <MostSoldProductsBarChart />
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive } from "vue";
import MostSoldProductsBarChart from "@/components/graphs/most-sold-products-bar-chart.vue";

export default defineComponent({
  components: { MostSoldProductsBarChart },

  setup() {
    return {};
  }
});
</script>
