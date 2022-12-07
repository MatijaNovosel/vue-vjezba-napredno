<template>
  <v-card min-width="300">
    <v-card-title>
      <span class="headline font-weight-bold">{{ product?.name }}</span>
    </v-card-title>
    <v-card-text class="font-weight-light">
      <div class="d-flex flex-column">
        <span>Category: {{ product?.categoryName }}</span>
        <span>Price: {{ product?.unitPrice }}</span>
        <span>In stock: {{ product?.unitsInStock }}</span>
      </div>
    </v-card-text>
    <v-card-actions class="justify-end">
      <v-btn color="primary" type="submit">Add to cart</v-btn>
    </v-card-actions>
  </v-card>
</template>
<script lang="ts">
import { ProductQueryResponse } from "@/models/query-responses/product-query-response";
import { defineComponent, PropType } from "vue";

export default defineComponent({
  props: {
    product: Object as PropType<ProductQueryResponse>
  },
  setup() {
    return {};
  }
});
</script>
