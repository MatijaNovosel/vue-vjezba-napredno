<template>
  <div class="pa-6">
    <div class="d-flex flex-shrink-1 flex-wrap justify-center flex-gap-10">
      <product-card v-for="product in paginatedProducts" :key="product.id" :product="product" />
    </div>
    <v-pagination v-model="state.pagination.page" :length="pageNumber"></v-pagination>
  </div>
</template>

<script lang="ts">
import ProductCard from "@/components/product/ProductCard.vue";
import { getService, Types } from "@/di-container";
import { IProductService } from "@/interfaces/iproduct-service";
import { ProductStore } from "@/store/productStore";
import { computed, defineComponent, onMounted, reactive } from "vue";

export default defineComponent({
  components: { ProductCard },
  setup() {
    const productService = getService<IProductService>(Types.ProductService);
    const productStore = ProductStore();

    const itemsPerPage = 5;
    const state = reactive({
      pagination: {
        page: 1
      }
    });

    const pageNumber = computed(() => Math.ceil(productStore.allProducts.length / itemsPerPage));
    const paginatedProducts = computed(() =>
      productStore.allProducts.slice(
        (state.pagination.page - 1) * itemsPerPage,
        state.pagination.page * itemsPerPage
      )
    );

    onMounted(async () => {
      productStore.allProducts = await productService.getProducts();
    });
    return { state, pageNumber, paginatedProducts };
  }
});
</script>
