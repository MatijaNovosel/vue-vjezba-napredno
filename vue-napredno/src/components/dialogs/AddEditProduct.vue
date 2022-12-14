<template>
  <div class="text-center">
    <v-dialog
      width="500"
      v-model="appStateStore.addEditProductDialog.showDialog"
      @click:outside="closeDialog"
    >
      <v-card>
        <ValidationObserver v-slot="{ handleSubmit }" ref="addEditForm">
          <form @submit.prevent="handleSubmit()">
            <v-card-title
              v-if="!appStateStore.addEditProductDialog.isEditMode"
              class="text-h5 grey lighten-2"
              >Add new product</v-card-title
            >
            <v-card-title v-else class="text-h5 grey lighten-2">Edit product</v-card-title>
            <v-card-text>
              <ValidationProvider name="Name" rules="required" v-slot="{ errors }">
                <v-text-field
                  label="Name"
                  v-model="state.formData.name"
                  :error-messages="errors"
                ></v-text-field>
              </ValidationProvider>
              <ValidationProvider name="category" rules="required" v-slot="{ errors }">
                <v-text-field
                  label="Category"
                  v-model="state.formData.categoryId"
                  :error-messages="errors"
                ></v-text-field>
              </ValidationProvider>
              <ValidationProvider name="UnitsInStock" rules="required" v-slot="{ errors }">
                <v-text-field
                  label="Units in stock"
                  v-model="state.formData.unitsInStock"
                  :error-messages="errors"
                ></v-text-field>
              </ValidationProvider>
              <ValidationProvider name="Price" rules="required" v-slot="{ errors }">
                <v-text-field
                  label="Price"
                  v-model="state.formData.unitPrice"
                  :error-messages="errors"
                ></v-text-field>
              </ValidationProvider>
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
import { AppStateStore } from "@/store/app-state-store";
import { defineComponent, onMounted, reactive, ref, watch } from "vue";

export default defineComponent({
  setup(props, context) {
    const appStateStore = AppStateStore();
    const state = reactive({
      formData: {
        name: "",
        categoryId: null,
        unitsInStock: 0,
        unitPrice: 0,
        subProducts: []
      }
    });
    const addEditForm = ref(null);

    function closeDialog() {
      //addEditForm.value?.reset();
      state.formData.name = "";
      state.formData.categoryId = null;
      state.formData.unitsInStock = 0;
      state.formData.unitPrice = 0;
      state.formData.subProducts = [];
      context.emit("close");
    }

    watch(appStateStore.addEditProductDialog, (val) => {
      state.formData.name = val.item?.name as string;
      //handle category
      //state.formData.category =
      state.formData.unitPrice = val.item?.unitPrice as number;
      state.formData.unitsInStock = val.item?.unitsInStock as number;
    });
    return { appStateStore, addEditForm, state, closeDialog };
  }
});
</script>
