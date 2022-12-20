<template>
  <v-navigation-drawer v-model="appStateStore.drawerState" absolute temporary>
    <v-divider></v-divider>

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
import RouteNames from "@/router/route-names";
import { AppStateStore } from "@/store/app-state-store";
import { UserStore } from "@/store/user-store";
import { defineComponent, ref } from "vue";
import { PermissionPolicyEnum } from "@/enums/permission-policy-enum";

export default defineComponent({
  setup() {
    const appStateStore = AppStateStore();
    const userStore = UserStore();
    return { appStateStore, userStore, PermissionPolicyEnum, RouteNames };
  }
});
</script>
