<template>
  <v-sheet width="400" class="mx-auto">
    <vv-form @submit="handleSubmit">
      <vv-field v-model="email" :name="$t('Email')" v-slot="{ field, errors }">
        <v-text-field
          outlined
          clearable
          dense
          v-model="email"
          v-bind="field"
          :label="$t('Email')"
          :error-messages="errors"
          hide-details="auto"
          :counter="50"
          placeholder="Enter your username"
          solo
        />
      </vv-field>

      <vv-field
        v-model="password"
        :name="$t('Password')"
        v-slot="{ field, errors }"
      >
        <v-text-field
          v-bind="field"
          :error-messages="errors"
          v-model="password"
          type="password"
          hide-details="auto"
          :label="$t('password')"
          :counter="100"
          placeholder="Enter your password"
          solo
        />
      </vv-field>
      <v-template v-if="showRegistrationData">
        <vv-field
          v-model="firstName"
          :name="$t('First Name')"
          v-slot="{ field, errors }"
        >
          <v-text-field
            outlined
            clearable
            dense
            v-model="firstName"
            v-bind="field"
            :label="$t('First Name')"
            :error-messages="errors"
            hide-details="auto"
            :counter="50"
            placeholder="Enter your first name"
            solo
          />
        </vv-field>
        <vv-field
          v-model="lastName"
          :name="$t('Last Name')"
          rules="required"
          v-slot="{ errors, field }"
        >
          <v-text-field
            outlined
            clearable
            dense
            v-bind="field"
            v-model="lastName"
            :label="$t('Last Name')"
            :error-messages="errors"
            hide-details="auto"
            :counter="50"
            placeholder="Enter your last name"
            solo
          />
        </vv-field>
      </v-template>
      <v-card-actions>
        <v-btn type="submit" color="primary">{{
          showRegistrationData ? "Register" : "Login"
        }}</v-btn>
        <v-btn @click="showRegistrationData = !showRegistrationData">{{
          showRegistrationData
            ? "Already have an account?"
            : "Don't have an account yet?"
        }}</v-btn>
      </v-card-actions>
    </vv-form>
  </v-sheet>
</template>
<script lang="ts" setup>
import { useUsersStore } from "../stores/users";

import { ref } from "vue";

const store = useUsersStore();

const email = ref("");
const firstName = ref("");
const lastName = ref("");
const password = ref("");
const showRegistrationData = ref(false);

const handleSubmit = async () => {
  try {
    if (!showRegistrationData.value) {
      await store.login({ email: email.value, password: password.value });
    } else {
      await store.register({
        firstName: firstName.value,
        lastName: lastName.value,
        email: email.value,
        password: password.value
      });
    }
  } catch (error) {
    console.log(error);
  }
};
</script>
