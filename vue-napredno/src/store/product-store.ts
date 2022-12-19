import { ProductQueryResponse } from "@/models/query-responses/product-query-response";
import { defineStore } from "pinia";
import { computed, reactive, ref } from "vue";

export const ProductStore = defineStore(
  "ProductStore",
  () => {
    const cart = reactive({
      items: [] as ProductQueryResponse[]
    });

    const uniqueItemsInCart = computed(() => {
      return cart.items
        .map((product) => product.id)
        .filter((value, index, self) => self.indexOf(value) === index).length;
    });

    function addToCart(product: ProductQueryResponse) {
      cart.items.push(product);
    }

    function removeFromCart(product: ProductQueryResponse) {
      const index = cart.items.findIndex((x) => x.id === product.id);
      cart.items.splice(index, 1);
    }

    return { cart, uniqueItemsInCart, addToCart, removeFromCart };
  },
  {
    persist: {
      storage: localStorage,
      paths: ["cart"]
    }
  }
);
