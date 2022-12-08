<template>
  <v-navigation-drawer v-model="productStore.drawerState" absolute temporary>
    <v-divider></v-divider>

    <v-list dense>
      <v-list-item link :to="RouteNames.Products">
        <v-list-item-content>
          <v-list-item-title>Products</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script lang="ts">
import RouteNames from "@/router/route-names";
import { ProductStore } from "@/store/product-store";
import { defineComponent, ref } from "vue";

export default defineComponent({
  setup() {
    const productStore = ProductStore();
    return { productStore, RouteNames };
  }
});
</script>
