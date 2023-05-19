<template>
  <vv-form @submit="handleSubmit">
    <v-sheet width="600" class="mx-auto mt-10" justify="center">
      <v-card-title>
        {{ $t("Register") }}
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
        <vv-field
          v-model="state.firstName"
          :name="$t('FirstName')"
          rules="required"
          v-slot="{ field, errors }"
        >
          <v-text-field
            outlined
            clearable
            dense
            v-model="state.firstName"
            v-bind="field"
            :label="$t('FirstName')"
            :error-messages="errors"
            hide-details="auto"
            :counter="50"
            placeholder="Enter your first name"
            solo
          />
        </vv-field>
        <vv-field
          v-model="state.lastName"
          :name="$t('LastName')"
          rules="required"
          v-slot="{ errors, field }"
        >
          <v-text-field
            outlined
            clearable
            dense
            v-bind="field"
            v-model="state.lastName"
            :label="$t('LastName')"
            :error-messages="errors"
            hide-details="auto"
            :counter="50"
            placeholder="Enter your last name"
            solo
          />
        </vv-field>
      </v-card-text>
      <v-card-actions>
        <v-btn type="submit">
          {{ $t("Register") }}
        </v-btn>
        <v-btn @click="goToLogin">
          {{ $t("Already have an account,go to login") }}
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
const store = useUsersStore();

interface State {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}
const state: State = reactive({
  email: "",
  password: "",
  firstName: "",
  lastName: ""
});

const handleSubmit = async () => {
  try {
    await store.register({
      firstName: state.firstName,
      lastName: state.lastName,
      email: state.email,
      password: state.password
    });
    router.push(ROUTE_NAMES.PRODUCTS);
  } catch (error) {
    console.error(error);
  }
};

const goToLogin = () => {
  router.back();
};
</script>
