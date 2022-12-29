<template>
  <div class="pa-6">
    <v-card min-width="100%">
      <v-card-title>
        <h1 class="headline font-weight-bold">{{ state.product.name }}</h1>
      </v-card-title>
      <v-card-text class="font-weight-light">
        <div class="d-flex flex-column flex-gap-10">
          <span>Category: {{ state.product.categoryName }}</span>
          <span>Price: {{ state.product.unitPrice }}</span>
          <span>In stock: {{ state.product.unitsInStock }}</span>
          <span
            >Subproducts:
            <template v-for="(subproduct, i) in state.product.subProducts" v:key="i">
              {{ subproduct.name }}
            </template>
          </span>
        </div>

        <div v-if="itemsInCart > 0" class="d-flex flex-gap-10">
          <span>Quantity: {{ itemsInCart }}</span>
          <span>Total: {{ total }}</span>
          <v-btn
            v-if="itemsInCart > 0"
            outlined
            x-small
            @click="productStore.removeFromCart(state.product)"
          >
            <v-icon>mdi-minus</v-icon>
          </v-btn>
        </div>
      </v-card-text>
      <v-card-actions>
        <v-btn color="primary" @click="productStore.addToCart(state.product)">
          <v-icon>mdi-cart</v-icon>
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script lang="ts">
import { getService, Types } from "@/di-container";
import { IProductService } from "@/interfaces/iproduct-service";
import { ProductQueryResponse } from "@/models/query-responses/productQueryResponse";
import { ProductStore } from "@/store/productStore";
import { computed, defineComponent, onMounted, reactive } from "vue";

interface State {
  product: ProductQueryResponse;
}
export default defineComponent({
  props: {
    id: {
      type: Number,
      required: true
    }
  },
  setup(props) {
    const state: State = reactive({
      product: {
        id: 0,
        name: "",
        categoryName: "",
        unitsInStock: 0,
        unitPrice: 0,
        subProducts: []
      }
    });
    const productService = getService<IProductService>(Types.ProductService);

    const productStore = ProductStore();
    const itemsInCart = computed(
      () =>
        productStore.cart.items.filter((x) => {
          return x.id === state.product.id;
        }).length
    );

    const total = computed(() => itemsInCart.value * state.product.unitPrice);

    onMounted(async () => {
      state.product = await productService.getProduct(props.id);
    });

    return { state, itemsInCart, total, productStore };
  }
});
</script>
