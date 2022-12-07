<template>
  <div>
    <div class="d-flex flex-shrink-1 flex-wrap justify-center p-a-3 flex-gap-10">
      <ProductCard v-for="(product, p) in state.products" :key="product.id" :product="product" />
    </div>
    <v-pagination v-model="state.pagination.page" :length="pages"></v-pagination>
  </div>
</template>

<script lang="ts">
import ProductCard from "@/components/product/product-card.vue";
import { ProductQueryResponse } from "@/models/query-responses/product-query-response";
import ProductService from "@/services/productService";
import { EKupiStore } from "@/store";
import { computed, defineComponent, onMounted, reactive, ref } from "vue";

export default defineComponent({
  components: { ProductCard },
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
