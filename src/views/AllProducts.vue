<template>
  <v-container>
    <v-row>
      <v-col
        v-for="(product, index) in paginatedProducts"
        :key="index"
        cols="12"
        sm="8"
        md="4"
      >
        <product-card class="mb-10" :product="product" />
      </v-col>
    </v-row>
    <v-pagination
      v-model="state.page"
      :length="numberOfPages"
      @input="loadProducts"
    />
  </v-container>
  <v-btn v-if="userStore.isLoggedIn" @click="navigateToEdit">
    <v-icon>mdi-account-tag</v-icon>
  </v-btn>
</template>

<script lang="ts" setup>
import { computed, onMounted, reactive } from "vue";
import ProductCard from "../components/ProductCard.vue";
import router from "../router";
import { useProductStore } from "../stores/products";
import { useUsersStore } from "../stores/users";
import { ROUTE_NAMES } from "../utils/constants";

const userStore = useUsersStore();
const store = useProductStore();
const state = reactive({
  page: 1,
  itemsPerPage: 5
});
const numberOfPages = computed(() => {
  return Math.ceil(store.products.length / state.itemsPerPage);
});

const paginatedProducts = computed(() => {
  const startIndex = (state.page - 1) * state.itemsPerPage;
  const endIndex = startIndex + state.itemsPerPage;
  return store.products.slice(startIndex, endIndex);
});

const loadProducts = async () => {
  await store.loadProducts(10, 1);
};

const navigateToEdit = () => {
  const userId = userStore.currentUser?.customerID;
  if (userId) {
    router.push({
      name: ROUTE_NAMES.USER_EDIT,
      params: { id: userId }
    });
  }
};

onMounted(async () => {
  await store.loadProducts(10, 1, true);
});
</script>
