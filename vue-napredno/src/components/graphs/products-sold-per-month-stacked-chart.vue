<template>
  <v-card min-width="400">
    <v-card-title>
      <span class="headline font-weight-bold">Products Sold Per Month</span>
    </v-card-title>
    <v-card-text class="font-weight-light">
      <div class="d-flex justify-center pa-6">
        <apexchart
          width="500"
          type="bar"
          stacked
          :options="state.mostSoldProductsOptions"
          :series="state.mostSoldProductsSeries"
        ></apexchart>
      </div>
    </v-card-text>
  </v-card>
</template>
<script lang="ts">
import { getService, Types } from "@/di-container";
import { IProductService } from "@/interfaces/productService";
import { defineComponent, onMounted, reactive } from "vue";

export default defineComponent({
  setup() {
    const productService = getService<IProductService>(Types.ProductService);

    const state = reactive({
      mostSoldProductsOptions: {
        xaxis: {
          categories: [] as string[]
        }
      },
      mostSoldProductsSeries: [
        {
          name: "Products sold",
          data: [] as number[]
        }
      ]
    });

    onMounted(async () => {
      let mostSoldProductsResponse = await productService.getProductsSoldPerMonth();
      state.mostSoldProductsOptions = {
        ...state.mostSoldProductsOptions,
        ...{
          xaxis: {
            categories: mostSoldProductsResponse.map((x) => x.month)
          }
        }
      };
      
      //state.mostSoldProductsSeries[0].data = mostSoldProductsResponse.map((x) => x.quantity);
    });
    return { state };
  }
});
</script>
