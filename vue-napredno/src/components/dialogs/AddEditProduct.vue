<template>
  <div class="text-center">
    <v-dialog
      width="500"
      v-model="appStateStore.addEditProductDialog.showDialog"
      @click:outside="closeDialog"
    >
      <v-card>
        <validation-observer v-slot="{ handleSubmit }" ref="addEditForm">
          <form @submit.prevent="handleSubmit(saveData)">
            <v-card-title
              v-if="!appStateStore.addEditProductDialog.isEditMode"
              class="text-h5 grey lighten-2"
              >Add new product</v-card-title
            >
            <v-card-title v-else class="text-h5 grey lighten-2">Edit product</v-card-title>
            <v-card-text>
              <div class="pt-6">
                <validation-provider name="Name" rules="required" v-slot="{ errors }">
                  <v-text-field
                    label="Name"
                    v-model="state.formData.name"
                    :error-messages="errors"
                    outlined
                  />
                </validation-provider>
                <validation-provider name="category" rules="required" v-slot="{ errors }">
                  <v-select
                    label="Category"
                    v-model="state.formData.category"
                    :items="categories"
                    item-text="value"
                    item-value="id"
                    :error-messages="errors"
                    outlined
                  />
                </validation-provider>
                <validation-provider name="UnitsInStock" rules="required" v-slot="{ errors }">
                  <v-text-field
                    label="Units in stock"
                    v-model="state.formData.unitsInStock"
                    :error-messages="errors"
                    outlined
                  />
                </validation-provider>
                <validation-provider name="Price" rules="required" v-slot="{ errors }">
                  <v-text-field
                    label="Price"
                    v-model="state.formData.unitPrice"
                    :error-messages="errors"
                    outlined
                  />
                </validation-provider>
                <validation-provider name="Price" rules="required" v-slot="{ errors }">
                  <v-select
                    v-model="state.formData.subProducts"
                    :items="productStore.allProducts"
                    item-text="name"
                    item-value="id"
                    outlined
                    label="Subproducts"
                    multiple
                  />
                </validation-provider>
              </div>
            </v-card-text>
            <v-divider />
            <v-card-actions>
              <v-spacer />
              <v-btn color="primary" text type="submit">Save</v-btn>
              <v-btn color="primary" text @click="closeDialog">Cancel</v-btn>
            </v-card-actions>
          </form>
        </validation-observer>
      </v-card>
    </v-dialog>
  </div>
</template>

<script lang="ts">
import { getService, Types } from "@/di-container";
import { ProductCategoryEnum } from "@/enums/productCategoryEnum";
import { IForm } from "@/interfaces/iform";
import { IProductService } from "@/interfaces/iproduct-service";
import { AddEditProductCommand } from "@/models/commands/addProductCommand";
import { AppStateStore } from "@/store/appStateStore";
import { ProductStore } from "@/store/productStore";
import { defineComponent, reactive, ref, watch } from "vue";

export default defineComponent({
  setup(props, context) {
    const appStateStore = AppStateStore();
    const productStore = ProductStore();
    const productService = getService<IProductService>(Types.ProductService);
    const categories = Object.entries(ProductCategoryEnum)
      .filter((e) => !isNaN(e[0] as any))
      .map((e) => ({ value: e[1], id: parseInt(e[0]) }));

    const state = reactive({
      formData: {
        id: 0,
        name: "",
        category: 0,
        unitsInStock: 0,
        unitPrice: 0,
        subProducts: [] as number[]
      }
    });
    const addEditForm = ref<IForm | null>(null);

    async function saveData() {
      const product: AddEditProductCommand = {
        categoryId: state.formData.category,
        name: state.formData.name,
        unitPrice: state.formData.unitPrice,
        unitsInStock: state.formData.unitsInStock,
        subProductIds: state.formData.subProducts
      };
      if (!appStateStore.addEditProductDialog.isEditMode) {
        await productService.addProduct(product);
      } else {
        product.id = state.formData.id;
        await productService.editProduct(product);
      }
      context.emit("update-product-list");
      closeDialog();
    }

    function closeDialog() {
      addEditForm.value?.reset();
      state.formData.name = "";
      state.formData.category = 0;
      state.formData.unitsInStock = 0;
      state.formData.unitPrice = 0;
      state.formData.subProducts = [];
      context.emit("close");
    }

    watch(appStateStore.addEditProductDialog, (val) => {
      if (
        appStateStore.addEditProductDialog.showDialog === true &&
        appStateStore.addEditProductDialog.item !== undefined
      ) {
        state.formData.id = val.item?.id as number;
        state.formData.name = val.item?.name as string;
        state.formData.category =
          categories.find((x) => x.value === val.item?.categoryName)?.id ?? 0;
        state.formData.unitPrice = val.item?.unitPrice as number;
        state.formData.unitsInStock = val.item?.unitsInStock as number;
        val.item?.subProducts.forEach((element) => {
          state.formData.subProducts.push(element.id);
        });
      }
    });
    return { appStateStore, addEditForm, state, categories, productStore, closeDialog, saveData };
  }
});
</script>
