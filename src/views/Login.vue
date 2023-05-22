<template>
  <vv-form @submit="handleSubmit">
    <v-sheet width="600" class="mx-auto mt-10" justify="center">
      <v-card-title>
        {{ $t("Login") }}
      </v-card-title>
      <v-card-text>
        <vv-field
          v-model="state.email"
          :name="$t('Email')"
          rules="required|email"
          v-slot="{ field, errors }"
        >
          <v-text-field
            outlined
            clearable
            dense
            :error-messages="errors"
            v-bind="field"
            v-model="state.email"
            :label="$t('Email')"
            hide-details="auto"
            :counter="50"
            placeholder="Enter your email"
            solo
          />
        </vv-field>
        <vv-field
          v-model="state.password"
          :name="$t('Password')"
          rules="required"
          v-slot="{ field, errors }"
        >
          <v-text-field
            :error-messages="errors"
            v-bind="field"
            type="password"
            v-model="state.password"
            :label="$t('Password')"
            hide-details="auto"
            :counter="50"
            placeholder="Enter your password"
          />
        </vv-field>
      </v-card-text>
      <v-card-actions>
        <v-btn type="submit">
          {{ $t("Login") }}
        </v-btn>
        <v-btn :to="{ name: ROUTE_NAMES.REGISTER }">
          {{ $t("Don't ave an account?,Register now") }}
        </v-btn>
      </v-card-actions>
    </v-sheet>
  </vv-form>
</template>

<script lang="ts" setup>
import router from "@/router";
import { ROUTE_NAMES } from "@/utils/constants";
import { reactive } from "vue";
import { useUsersStore } from "../stores/users";

interface State {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

const store = useUsersStore();
const state: State = reactive({
  email: "",
  password: "",
  firstName: "",
  lastName: ""
});

const handleSubmit = async () => {
  await store.login({ email: state.email, password: state.password });
  if (store.isLoggedIn) {
    router.push(ROUTE_NAMES.PRODUCTS);
  }
};
</script>
