<template>
  <v-card min-width="400">
    <v-card-title>
      <span class="headline font-weight-bold">Customer Expenditure</span>
    </v-card-title>
    <v-card-text class="font-weight-light">
      <div class="d-flex justify-center pa-6">
        <apexchart
          width="500"
          type="donut"
          :options="state.options"
          :series="state.series"
        ></apexchart>
      </div>
    </v-card-text>
  </v-card>
</template>
<script lang="ts">
import { getService, Types } from "@/di-container";
import { IProductService } from "@/interfaces/iproduct-service";
import { defineComponent, onMounted, reactive } from "vue";

interface State {
  series: number[];
  options: {
    labels: string[];
  };
}

export default defineComponent({
  setup() {
    const productService = getService<IProductService>(Types.ProductService);

    const state: State = reactive({
      series: [],
      options: {
        labels: []
      }
    });

    onMounted(async () => {
      const customerEqpenditureResponse = await productService.getCustomerExpenditure();

      state.series = customerEqpenditureResponse.map((x) => x.total);
      state.options = {
        ...state.options,
        ...{
          labels: customerEqpenditureResponse.map((x) => x.fullName)
        }
      };
    });
    return { state };
  }
});
</script>
