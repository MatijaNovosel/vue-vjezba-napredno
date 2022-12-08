<template>
  <div class="pa-6">
    <v-card min-width="100%">
      <v-card-title>
        <h1 class="headline font-weight-bold">{{ product.name }}</h1>
      </v-card-title>
      <v-card-text class="font-weight-light"> </v-card-text>
      <v-card-actions>
        <v-btn color="primary" type="submit"><v-icon>mdi-cart</v-icon></v-btn>
      </v-card-actions>
    </v-card>
  </div>
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
