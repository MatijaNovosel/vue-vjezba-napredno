<template>
  <v-sheet width="600" class="mx-auto mt-10" justify="center">
    <v-card class="m-5">
      <v-card-title class="headline">User Details</v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="12">
            <v-label>ID:</v-label>
            <v-text-field v-model="user.id" outlined dense readonly />
          </v-col>
          <v-col cols="12">
            <v-label>First Name:</v-label>
            <v-text-field v-model="user.firstName" outlined dense readonly />
          </v-col>
          <v-col cols="12">
            <v-label>Last Name:</v-label>
            <v-text-field v-model="user.lastName" outlined dense readonly />
          </v-col>
          <v-col cols="12">
            <v-label>Email:</v-label>
            <v-text-field v-model="user.email" outlined dense readonly />
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-sheet>
</template>

<script lang="ts" setup>
import { useRoute } from "vue-router";
import { IUserDetails } from "../models/userModels";
import { useUsersStore } from "../stores/users";

const route = useRoute();
const store = useUsersStore();
const user = store.getUserById(route.params.id.toString()) as IUserDetails;
</script>
