<template>
  <v-navigation-drawer v-model="store.drawerState" absolute temporary>
    <v-list-item>
      <v-list-item-avatar>
        <v-img src="https://randomuser.me/api/portraits/men/78.jpg"></v-img>
      </v-list-item-avatar>

      <v-list-item-content>
        <v-list-item-title>John Leider</v-list-item-title>
      </v-list-item-content>
    </v-list-item>

    <v-divider></v-divider>

    <v-list dense>
      <v-list-item link :to="RouteNames.Products">
        <v-list-item-content>
          <v-list-item-title>aloo</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script lang="ts">
import RouteNames from "@/router/route-names";
import { EKupiStore } from "@/store";
import { defineComponent, ref } from "vue";

export default defineComponent({
  setup() {
    const store = EKupiStore();
    return { store, RouteNames };
  }
});
</script>
