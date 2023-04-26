<template>
  <v-container>
    <v-row>
      <v-col
        v-for="(product, index) in paginatedProducts"
        :key="index"
        cols="12"
        sm="6"
        md="4"
      >
        <product-card :product="product" />
      </v-col>
    </v-row>
    <v-pagination
      v-model="state.page"
      :length="numberOfPages"
      @input="loadProducts"
    />
  </v-container>
</template>

<script lang="ts" setup>
import ProductCard from "@/components/ProductCard.vue";
import { computed, onMounted, reactive } from "vue";
import { useProductStore } from "../stores/products";

const store = useProductStore();

const state = reactive({
  page: 1,
  itemsPerPage: 3
});

const numberOfPages = computed(() => {
  return Math.ceil(store.state.products.length / state.itemsPerPage);
});

const paginatedProducts = computed(() => {
  const startIndex = (state.page - 1) * state.itemsPerPage;
  const endIndex = startIndex + state.itemsPerPage;
  return store.state.products.slice(startIndex, endIndex);
});

const loadProducts = async () => {
  const page = state.page;
  const pageSize = state.itemsPerPage;
  await store.getAllProducts(pageSize, page);
};

onMounted(async () => {
  await loadProducts();
});
</script>
