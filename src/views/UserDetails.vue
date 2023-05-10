<template>
  <div>
    <v-card>
      <v-card-title>My Profile</v-card-title>
      <v-card-text>
        <v-form ref="form" v-model="valid">
          <v-text-field
            v-model="userStore.state.currentUser!.firstName"
            label="First Name"
            required
          ></v-text-field>
          <v-text-field
            v-model="userStore.state.currentUser!.lastName"
            label="Last Name"
            required
          ></v-text-field>
          <v-text-field
            v-model="userStore.state.currentUser!.email"
            label="Email"
            required
          ></v-text-field>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <!-- <v-btn color="primary" @click="saveProfile" :disabled="!valid"
            >Save Profile</v-btn
          > -->
      </v-card-actions>
    </v-card>
    <v-card>
      <v-card-title>My Orders</v-card-title>
      <v-card-text> </v-card-text>

      <v-data-table
        v-model:items-per-page="totalItems"
        :headers="itemHeaders as []"
        class="elevation-1"
        :items="userOrders"
        :loading="loading"
      ></v-data-table>
    </v-card>
  </div>
</template>
<script lang="ts" setup>
import { ICustomerOrders } from "@/models/orderModels";
import { useOrderStore } from "@/stores/orders";
import { onMounted, ref } from "vue";
import { VDataTable } from "vuetify/labs/VDataTable";
import { useUsersStore } from "../stores/users";

const userStore = useUsersStore();
const ordersStore = useOrderStore();
const totalItems = ref(10);
const loading = ref(true);
const itemHeaders = [
  { text: "Date", value: "orderDate" },
  { text: "Order Number", value: "orderNumber" },
  { text: "Total", value: "totalPrice" }
];
const valid = ref(false);
const userOrders = ref<ICustomerOrders[]>([]);

onMounted(async () => {
  loading.value = true;
  userOrders.value = await ordersStore.getUserOrders();
  console.log("user orders", userOrders.value);
  loading.value = false;
});
</script>
