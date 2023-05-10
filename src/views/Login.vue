<template>
  <vv-form @submit="handleSubmit">
    <v-sheet width="600" class="mx-auto mt-10" justify="center">
      <v-card-title>
        {{ showRegistrationData ? $t("Register") : $t("Login") }}
      </v-card-title>
      <v-card-text>
        <vv-field
          v-model="email"
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
            v-model="email"
            :label="$t('Email')"
            hide-details="auto"
            :counter="50"
            placeholder="Enter your email"
            solo
          />
        </vv-field>
        <vv-field
          v-model="password"
          :name="$t('Password')"
          rules="required"
          v-slot="{ field, errors }"
        >
          <v-text-field
            outlined
            clearable
            dense
            :error-messages="errors"
            v-bind="field"
            v-model="password"
            :label="$t('Password')"
            hide-details="auto"
            :counter="50"
            placeholder="Enter your password"
            solo
          />
        </vv-field>
        <v-template v-if="showRegistrationData">
          <vv-field
            v-model="firstName"
            :name="$t('FirstName')"
            rules="required"
            v-slot="{ field, errors }"
          >
            <v-text-field
              outlined
              clearable
              dense
              v-model="firstName"
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
            v-model="lastName"
            :name="$t('LastName')"
            rules="required"
            v-slot="{ errors, field }"
          >
            <v-text-field
              outlined
              clearable
              dense
              v-bind="field"
              v-model="lastName"
              :label="$t('LastName')"
              :error-messages="errors"
              hide-details="auto"
              :counter="50"
              placeholder="Enter your last name"
              solo
            />
          </vv-field>
        </v-template>
      </v-card-text>
      <v-card-actions>
        <v-btn type="submit">
          {{ showRegistrationData ? $t("Register") : $t("Login") }}
        </v-btn>
        <v-btn @click="showRegistrationData = !showRegistrationData">
          {{ !showRegistrationData ? $t("Register") : $t("Login") }}
        </v-btn>
      </v-card-actions>
    </v-sheet>
  </vv-form>
</template>

<script lang="ts" setup>
import { useUsersStore } from "@/stores/users";
import { ref } from "vue";
const store = useUsersStore();

const email = ref("");
const password = ref("");
const firstName = ref("");
const lastName = ref("");
const showRegistrationData = ref(false);

const handleSubmit = async () => {
  try {
    if (showRegistrationData.value) {
      await store.register({
        firstName: firstName.value,
        lastName: lastName.value,
        email: email.value,
        password: password.value
      });
    } else {
      await store.login({ email: email.value, password: password.value });
    }
  } catch (error) {
    console.error(error);
  }
};
</script>
