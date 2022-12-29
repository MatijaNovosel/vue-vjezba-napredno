<template>
  <v-card min-width="400">
    <v-card-title>
      <span class="headline font-weight-bold">Total Income Per Month</span>
    </v-card-title>
    <v-card-text class="font-weight-light">
      <div class="d-flex justify-center pa-6">
        <apexchart
          width="500"
          type="line"
          :options="state.mostSoldProductsOptions"
          :series="state.mostSoldProductsSeries"
        ></apexchart>
      </div>
    </v-card-text>
  </v-card>
</template>
<script lang="ts">
import { getService, Types } from "@/di-container";
import { IProductService } from "@/interfaces/iproduct-service";
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
          name: "Total Income",
          data: [] as number[]
        }
      ]
    });

    onMounted(async () => {
      const mostSoldProductsResponse = await productService.getProductsSoldPerMonth();
      const totals: number[] = [];
      mostSoldProductsResponse.forEach((element) => {
        const total = element.productSales
          .map((item) => item.total)
          .reduce((prev, next) => prev + next);
        totals.push(total);
      });
      state.mostSoldProductsOptions = {
        ...state.mostSoldProductsOptions,
        ...{
          xaxis: {
            categories: mostSoldProductsResponse.map((x) => x.month)
          }
        }
      };

      state.mostSoldProductsSeries[0].data = totals;
    });
    return { state };
  }
});
</script>
