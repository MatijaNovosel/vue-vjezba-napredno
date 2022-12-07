<template>
  <div class="d-flex justify-center">
    <v-card min-width="400">
      <v-card-title>
        <span class="headline font-weight-bold">Login</span>
      </v-card-title>
      <form>
        <v-card-text class="font-weight-light">
          <ValidationProvider name="Username" rules="required" v-slot="{ errors }">
            <v-text-field
              label="Username"
              outlined
              v-model="state.formData.username"
              :error-messages="errors"
            ></v-text-field>
          </ValidationProvider>
          <ValidationProvider name="Password" rules="required" v-slot="{ errors }">
            <v-text-field
              label="Password"
              outlined
              type="password"
              v-model="state.formData.password"
              :error-messages="errors"
            ></v-text-field>
          </ValidationProvider>
        </v-card-text>
        <v-card-actions>
          <v-btn class="flex-grow-1" color="primary" type="submit">Login</v-btn>
        </v-card-actions>
      </form>
    </v-card>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive } from "vue";
import { required } from "vee-validate/dist/rules";
import { extend } from "vee-validate";
extend("required", required);

export default defineComponent({
  setup() {
    const state = reactive({
      formData: {
        username: "",
        password: ""
      }
    });
    return { state };
  }
});
</script>
