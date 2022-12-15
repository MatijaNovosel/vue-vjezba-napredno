<template>
  <div class="text-center">
    <v-dialog v-model="state.isOpen" width="500">
      <v-card>
        <v-card-title>{{ state.title }}</v-card-title>
        <v-card-actions class="pt-0">
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="cancel">Cancel</v-btn>
          <v-btn color="primary" text @click="agree">Yes</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script lang="ts">
import { AppStateStore } from "@/store/app-state-store";
import { defineComponent, provide, reactive } from "vue";

export default defineComponent({
  setup(props, context) {
    const appStateStore = AppStateStore();

    const state = reactive({
      isOpen: false,
      resolve: (_val: boolean) => {},
      reject: (_val: boolean) => {},
      title: ""
    });

    const createConfirmDialog = (title: string) => {
      state.isOpen = true;
      state.title = title;
      return new Promise<boolean>((resolve, reject) => {
        state.resolve = resolve;
        state.reject = reject;
      });
    };

    const agree = () => {
      state.resolve(true);
      state.isOpen = false;
    };

    const cancel = () => {
      state.resolve(false);
      state.isOpen = false;
    };

    context.expose({ createConfirmDialog });

    return { appStateStore, state, agree, cancel };
  }
});
</script>
