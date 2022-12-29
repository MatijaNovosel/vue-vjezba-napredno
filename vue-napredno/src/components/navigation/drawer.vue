<template>
  <v-navigation-drawer v-model="appStateStore.drawerState" absolute temporary>
    <v-divider />
    <v-list>
      <v-list-item link :to="RouteNames.Products">
        <v-list-item-content>
          <v-list-item-title>Products</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <template v-if="userStore.currentUser?.permissions?.includes(PermissionPolicyEnum.Admin)">
        <v-list-item link :to="RouteNames.ProductList">
          <v-list-item-content>
            <v-list-item-title>Product List</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link :to="RouteNames.UserList">
          <v-list-item-content>
            <v-list-item-title>User List</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link :to="RouteNames.Statistics">
          <v-list-item-content>
            <v-list-item-title>Statistics</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </template>
    </v-list>
  </v-navigation-drawer>
</template>

<script lang="ts">
import { PermissionPolicyEnum } from "@/enums/permissionPolicyEnum";
import RouteNames from "@/router/routeNames";
import { AppStateStore } from "@/store/appStateStore";
import { UserStore } from "@/store/userStore";
import { defineComponent } from "vue";

export default defineComponent({
  setup() {
    const appStateStore = AppStateStore();
    const userStore = UserStore();
    return { appStateStore, userStore, PermissionPolicyEnum, RouteNames };
  }
});
</script>
