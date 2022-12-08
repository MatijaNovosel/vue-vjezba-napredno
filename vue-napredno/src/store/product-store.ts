import { ProductQueryResponse } from "@/models/query-responses/product-query-response";
import { defineStore } from "pinia";
import { reactive, ref } from "vue";

export const ProductStore = defineStore("ProductStore", () => {
  const drawerState = ref(false);

  const cart = reactive({
    items: [] as ProductQueryResponse[]
  });

  function addToCart(product: ProductQueryResponse) {
    cart.items.push(product);
  }

  function removeFromCart(product: ProductQueryResponse) {
    const index = cart.items.findIndex((x) => x.id === product.id);
    cart.items.splice(index, 1);
  }

  return { drawerState, cart, addToCart, removeFromCart };
});
