<template>
  <div class="d-flex justify-center pa-6">
    <v-card width="100%">
      <v-card-title>
        <span class="headline font-weight-bold">Product List</span>
      </v-card-title>
      <v-card-text class="font-weight-light">
        <v-data-table
          class="elevation-1"
          :options.sync="state.options"
          :headers="headers"
          :items="state.items"
          :server-items-length="state.totalItems"
          @pagination="getProductList"
          @click:row="openProfile"
        ></v-data-table>
      </v-card-text>
    </v-card>
  </div>
</template>
<script lang="ts">
import { getService, Types } from "@/di-container";
import { IUserService } from "@/interfaces/iuser-service";
import { UserDTO } from "@/models/query-responses/userListQueryResponse";
import router from "@/router";
import RouteNames from "@/router/routeNames";
import { defineComponent, onMounted, reactive } from "vue";

interface State {
  options: {
    page: number;
    itemsPerPage: number;
  };
  items: UserDTO[];
  totalItems: number;
}

export default defineComponent({
  setup() {
    const userService = getService<IUserService>(Types.UserService);
    const headers = [
      { text: "Username", value: "userName" },
      { text: "First Name", value: "firstName" },
      { text: "Family Name", value: "familyName" }
    ];

    const state: State = reactive({
      options: {
        page: 1,
        itemsPerPage: 5
      },
      items: [] as UserDTO[],
      totalItems: 0
    });

    function openProfile(user: UserDTO) {
      router.push({ name: RouteNames.Profile, params: { id: user.id } });
    }

    async function getProductList() {
      const { users, totalItems } = await userService.getUsers(
        state.options.page,
        state.options.itemsPerPage
      );
      state.items = users;
      state.totalItems = totalItems;
    }

    onMounted(async () => {
      getProductList();
    });
    return { headers, state, getProductList, openProfile };
  }
});
</script>
