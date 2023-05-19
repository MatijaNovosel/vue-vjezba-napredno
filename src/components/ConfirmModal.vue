<template>
  <v-dialog width="600" v-model="state.showDialog" persistent>
    <v-card>
      <v-card-title>
        Are you sure you want to delete this product
      </v-card-title>
      <v-card-actions class="justify-end">
        <v-btn color="success" @click="emit('dialog-confirm')">
          {{ $t("Delete") }}
        </v-btn>
        <v-btn color="error" @click="emit('dialog-close')">
          {{ $t("cancel") }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts" setup>
import { defineEmits, defineProps, reactive, watch } from "vue";

interface State {
  showDialog: boolean;
}

const state: State = reactive({
  showDialog: false
});

const emit = defineEmits(["dialog-confirm", "dialog-close"]);

const props = defineProps({
  open: {
    required: true,
    type: Boolean,
    default: false
  }
});

watch(
  () => props.open,
  (val) => {
    state.showDialog = val;
  }
);
</script>
