<template>
  <div class="text-center">
    <v-dialog
      width="500"
      v-model="appStateStore.addEditProductDialog.showDialog"
      @click:outside="closeDialog"
    >
      <v-card>
        <ValidationObserver v-slot="{ handleSubmit }" ref="addEditForm">
          <form @submit.prevent="handleSubmit(saveData)">
            <v-card-title
              v-if="!appStateStore.addEditProductDialog.isEditMode"
              class="text-h5 grey lighten-2"
              >Add new product</v-card-title
            >
            <v-card-title v-else class="text-h5 grey lighten-2">Edit product</v-card-title>
            <v-card-text>
              <div class="pt-6">
                <ValidationProvider name="Name" rules="required" v-slot="{ errors }">
                  <v-text-field
                    label="Name"
                    v-model="state.formData.name"
                    :error-messages="errors"
                    outlined
                  ></v-text-field>
                </ValidationProvider>
                <ValidationProvider name="category" rules="required" v-slot="{ errors }">
                  <v-select
                    label="Category"
                    v-model="state.formData.category"
                    :items="categories"
                    item-text="value"
                    item-value="id"
                    :error-messages="errors"
                    outlined
                  ></v-select>
                </ValidationProvider>
                <ValidationProvider name="UnitsInStock" rules="required" v-slot="{ errors }">
                  <v-text-field
                    label="Units in stock"
                    v-model="state.formData.unitsInStock"
                    :error-messages="errors"
                    outlined
                  ></v-text-field>
                </ValidationProvider>
                <ValidationProvider name="Price" rules="required" v-slot="{ errors }">
                  <v-text-field
                    label="Price"
                    v-model="state.formData.unitPrice"
                    :error-messages="errors"
                    outlined
                  ></v-text-field>
                </ValidationProvider>
              </div>
            </v-card-text>
            <v-divider />
            <v-card-actions>
              <v-spacer />
              <v-btn color="primary" text type="submit">Save</v-btn>
              <v-btn color="primary" text @click="closeDialog">Cancel</v-btn>
            </v-card-actions>
          </form>
        </ValidationObserver>
      </v-card>
    </v-dialog>
  </div>
</template>

<script lang="ts">
import { getService, Types } from "@/di-container";
import { ProductCategoryEnum } from "@/enums/product-category-enum";
import { IForm } from "@/interfaces/iform";
import { IProductService } from "@/interfaces/iproduct-service";
import { AddEditProductCommand } from "@/models/commands/add-product-command";
import { AppStateStore } from "@/store/app-state-store";
import { defineComponent, onMounted, reactive, ref, watch } from "vue";

export default defineComponent({
  setup(props, context) {
    const appStateStore = AppStateStore();
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
        subProducts: []
      }
    });
    const addEditForm = ref<IForm | null>(null);

    async function saveData() {
      let product: AddEditProductCommand = {
        categoryId: state.formData.category,
        name: state.formData.name,
        unitPrice: state.formData.unitPrice,
        unitsInStock: state.formData.unitsInStock,
        subProducts: []
      };
      if (!appStateStore.addEditProductDialog.isEditMode) {
        await productService.addProduct(product);
      } else {
        product.id = state.formData.id;
        await productService.editProduct(product);
      }
      context.emit("updateProductList");
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
      }
    });
    return { appStateStore, addEditForm, state, categories, closeDialog, saveData };
  }
});
</script>
