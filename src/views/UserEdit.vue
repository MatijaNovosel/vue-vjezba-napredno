<template>
  <div>
    <v-card>
      <v-card-title>My Profile</v-card-title>
      <v-card-text>
        <v-form ref="form" v-model="valid">
          <v-text-field
            v-model="user.firstName"
            label="First Name"
            required
          ></v-text-field>
          <v-text-field
            v-model="user.lastName"
            label="Last Name"
            required
          ></v-text-field>
          <v-text-field
            v-model="user.email"
            label="Email"
            required
          ></v-text-field>
        </v-form>
      </v-card-text>
      <v-btn color="green" @click="saveProfile()" :disabled="!valid"
        >Save Profile</v-btn
      >
      <v-spacer />
    </v-card>
    <v-card>
      <v-card-title>My Orders</v-card-title>
      <v-card-text> </v-card-text>
      <v-data-table
        v-model:items-per-page="totalItems"
        :headers="itemHeaders"
        class="elevation-1"
        :items="userOrders"
        :loading="loading"
      ></v-data-table>
    </v-card>
  </div>
</template>
<script lang="ts" setup>
import router from "@/router";
import { onMounted, ref } from "vue";
import { VDataTable } from "vuetify/labs/VDataTable";
import { ICustomerOrders } from "../models/orderModels";
import { IUserDetails } from "../models/userModels";
import { useOrderStore } from "../stores/orders";
import { useUsersStore } from "../stores/users";

const userStore = useUsersStore();
const ordersStore = useOrderStore();
const totalItems = ref(10);
const loading = ref(true);
const itemHeaders = [
  { title: "Date", key: "orderDate", sortable: false },
  { title: "Order Number", key: "orderNumber", sortable: false },
  { title: "Total", key: "totalPrice", sortable: false }
];
const valid = ref(false);
const userOrders = ref<ICustomerOrders[]>([]);
const user = userStore.currentUser as IUserDetails;

onMounted(async () => {
  loading.value = true;
  userOrders.value = await ordersStore.getUserOrders(user.customerID);
  loading.value = false;
});

const saveProfile = async () => {
  await userStore.editUser();
  router.back();
};
</script>
