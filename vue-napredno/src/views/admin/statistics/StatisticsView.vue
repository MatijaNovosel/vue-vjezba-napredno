<template>
  <div class="d-flex justify-center pa-6">
    <apexchart width="500" type="bar" :options="state.options" :series="state.series"></apexchart>
  </div>
</template>
<script lang="ts">
import { getService, Types } from "@/di-container";
import { IProductService } from "@/interfaces/productService";
import { defineComponent, reactive } from "vue";

export default defineComponent({
  setup() {
    //const productService = getService<IProductService>(Types.ProductService);

    const state = reactive({
      options: {
        chart: {
          id: "vuechart-example"
        },
        xaxis: {
          categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998]
        }
      },
      series: [
        {
          name: "series-1",
          data: [30, 40, 45, 50, 49, 60, 70, 91]
        }
      ]
    });

    return { state };
  }
});
</script>
