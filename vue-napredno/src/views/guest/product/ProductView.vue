<template>
  <div>
    <v-pagination v-model="state.pagination.page" :length="pages"></v-pagination>
  </div>
</template>

<script lang="ts">
import { ProductQueryResponse } from "@/models/query-responses/product-query-response";
import ProductService from "@/services/productService";
import { EKupiStore } from "@/store";
import { computed, defineComponent, onMounted, reactive, ref } from "vue";

export default defineComponent({
  setup() {
    const state = reactive({
      pagination: {
        page: 1
      },
      products: [] as ProductQueryResponse[]
    });

    const pages = computed(() => Math.ceil(state.products.length / 10));

    onMounted(async () => {
      let service = new ProductService();
      state.products = await service.getProducts();
    });
    return { state, pages };
  }
});
</script>
