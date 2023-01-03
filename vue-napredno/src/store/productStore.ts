import { cartItem } from "@/models/icartItem";
import { ProductQueryResponse } from "@/models/query-responses/productQueryResponse";
import { defineStore } from "pinia";
import { computed, ComputedRef, reactive } from "vue";

interface Cart {
  items: ProductQueryResponse[];
}

export const ProductStore = defineStore(
  "ProductStore",
  () => {
    const cart: Cart = reactive({
      items: []
    });

    const allProducts: ProductQueryResponse[] = [];

    const cartItems: ComputedRef<cartItem[]> = computed(() => {
      let uniqueItems = [...new Map(cart.items.map((v) => [v.id, v])).values()];
      return uniqueItems.map((product) => ({
        product,
        amount: cart.items.filter((x) => x.id === product.id).length
      }));
    });

    function addToCart(product: ProductQueryResponse) {
      cart.items.push(product);
    }

    function removeFromCart(product: ProductQueryResponse) {
      const index = cart.items.findIndex((x) => x.id === product.id);
      cart.items.splice(index, 1);
    }

    return { cart, cartItems, allProducts, addToCart, removeFromCart };
  },
  {
    persist: {
      storage: localStorage
    }
  }
);
