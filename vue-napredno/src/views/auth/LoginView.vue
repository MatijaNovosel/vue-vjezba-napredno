<template>
  <div class="d-flex justify-center pa-6">
    <v-card min-width="400">
      <v-card-title>
        <span class="headline font-weight-bold">Login</span>
      </v-card-title>
      <validation-observer v-slot="{ handleSubmit }" ref="loginForm">
        <form @submit.prevent="handleSubmit(login)">
          <v-card-text class="font-weight-light">
            <validation-provider name="Username" rules="required" v-slot="{ errors }">
              <v-text-field
                label="Username"
                outlined
                v-model="state.formData.username"
                :error-messages="errors"
              />
            </validation-provider>
            <validation-provider name="Password" rules="required" v-slot="{ errors }">
              <v-text-field
                label="Password"
                outlined
                type="password"
                v-model="state.formData.password"
                :error-messages="errors"
              />
            </validation-provider>
          </v-card-text>
          <v-card-actions>
            <v-btn class="flex-grow-1" color="primary" type="submit">Login</v-btn>
          </v-card-actions>
        </form>
      </validation-observer>
    </v-card>
  </div>
</template>
<script lang="ts">
import { getService, Types } from "@/di-container";
import { IForm } from "@/interfaces/iform";
import { IUserService } from "@/interfaces/iuser-service";
import { defineComponent, reactive, ref } from "vue";

interface State {
  formData: {
    username: string;
    password: string;
  };
}

export default defineComponent({
  setup() {
    const userService = getService<IUserService>(Types.UserService);

    const state: State = reactive({
      formData: {
        username: "",
        password: ""
      }
    });

    const loginForm = ref<IForm | null>(null);

    async function login() {
      await userService.loginUser({ ...state.formData });
    }

    return { state, loginForm, login };
  }
});
</script>
