<template>
  <v-data-table
    v-model:items-per-page="state.itemsPerPage"
    :headers="tableHeaders"
    :items-length="state.totalItems"
    :items="state.items"
    :loading="state.loading"
    class="elevation-1"
    return-object
    @click:row="goToUserDetails"
    @update:options="loadData"
  />
</template>
<script lang="ts" setup>
import { reactive } from "vue";
import { VDataTable } from "vuetify/labs/VDataTable";
import { IUserDetails } from "../models/userModels";
import router from "../router";
import { useUsersStore } from "../stores/users";
import { ROUTE_NAMES } from "../utils/constants";
interface State {
  itemsPerPage: number;
  totalItems: number;
  loading: boolean;
  page: number;
  items: IUserDetails[];
  selectedUser: IUserDetails | null;
}
const store = useUsersStore();
const state: State = reactive({
  totalItems: 10,
  itemsPerPage: 10,
  loading: false,
  page: 1,
  items: store.users,
  selectedUser: null
});
const loadData = async () => {
  state.loading = true;
  await store.getAllUsers();
  state.loading = false;
};
const goToUserDetails = (event: any, user: any) => {
  state.selectedUser = user.item.value as IUserDetails;

  router.push({
    name: ROUTE_NAMES.USER_DETAILS,
    params: { id: state.selectedUser.id }
  });
};

const tableHeaders = [
  { title: "ID", key: "id", sortable: true, align: "start" },
  { title: "First Name", key: "firstName", sortable: true, align: "start" },
  { title: "Last Name", key: "lastName", sortable: true, align: "start" },
  { title: "Email", key: "email", sortable: true, align: "start" },
  { title: "Total Spending", key: "totalOrders", sortable: true }
] as any;
</script>
