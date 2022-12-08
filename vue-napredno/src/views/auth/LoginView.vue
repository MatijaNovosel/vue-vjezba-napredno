<template>
  <div class="d-flex justify-center">
    <v-card min-width="400">
      <v-card-title>
        <span class="headline font-weight-bold">Login</span>
      </v-card-title>
      <ValidationObserver v-slot="{ handleSubmit }" ref="loginForm">
        <form @submit.prevent="handleSubmit(login)">
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
      </ValidationObserver>
    </v-card>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, ref } from "vue";
import { required } from "vee-validate/dist/rules";
import { extend } from "vee-validate";
import { getService, Types } from "@/di-container";
import { IUserService } from "@/interfaces/userService";
import { LoginCustomerCommand } from "@/models/login-model";
extend("required", required);

export default defineComponent({
  setup() {
    const userService = getService<IUserService>(Types.UserService);

    const state = reactive({
      formData: {
        username: "",
        password: ""
      }
    });

    const loginForm = ref(null);

    async function login() {
      let loginModel: LoginCustomerCommand = {
        username: state.formData.username,
        password: state.formData.password
      };
      await userService.loginUser(loginModel);
      
    }

    return { state, loginForm, login };
  }
});
</script>
