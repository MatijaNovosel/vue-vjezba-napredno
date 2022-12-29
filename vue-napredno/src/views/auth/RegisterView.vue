<template>
  <div class="d-flex justify-center pa-6">
    <v-card min-width="400">
      <v-card-title>
        <span class="headline font-weight-bold">Register</span>
      </v-card-title>
      <validation-observer v-slot="{ handleSubmit }" ref="registerForm">
        <form @submit.prevent="handleSubmit(register)">
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
            <validation-provider name="FirstName" rules="required" v-slot="{ errors }">
              <v-text-field
                label="First Name"
                outlined
                v-model="state.formData.firstName"
                :error-messages="errors"
              />
            </validation-provider>
            <validation-provider name="FamilyName" rules="required" v-slot="{ errors }">
              <v-text-field
                label="Family Name"
                outlined
                v-model="state.formData.familyName"
                :error-messages="errors"
              />
            </validation-provider>
          </v-card-text>
          <v-card-actions>
            <v-btn class="flex-grow-1" color="primary" type="submit">Register</v-btn>
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
    firstName: string;
    familyName: string;
  };
}

export default defineComponent({
  setup() {
    const userService = getService<IUserService>(Types.UserService);

    const state: State = reactive({
      formData: {
        username: "",
        password: "",
        firstName: "",
        familyName: ""
      }
    });

    const registerForm = ref<IForm | null>(null);

    async function register() {
      await userService.registerUser({ ...state.formData });
    }

    return { state, registerForm, register };
  }
});
</script>
