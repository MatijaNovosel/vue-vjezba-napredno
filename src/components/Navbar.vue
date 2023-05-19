<template>
  <div>
    <v-app-bar color="blue" clipped left>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>
        {{ $t("appName") }}
      </v-toolbar-title>
      <v-spacer />
      <v-btn v-if="isLoggedIn" @click="store.logout">
        {{ $t("logout") }}
      </v-btn>
      <v-btn
        v-if="isLoggedIn && totalInCart() > 0"
        :to="{ name: ROUTE_NAMES.CART }"
      >
        <v-icon> mdi-cart-outline </v-icon>
      </v-btn>
    </v-app-bar>
    <v-navigation-drawer v-if="isLoggedIn" v-model="drawer">
      <v-list dense>
        <v-list-item v-for="(item, i) in items" :key="i" :to="item.route">
          <template #prepend>
            <v-icon>
              {{ item.icon }}
            </v-icon>
          </template>
          <v-list-item-title>
            {{ item.title }}
          </v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script lang="ts" setup>
import { storeToRefs } from "pinia";
import { ref } from "vue";
import { useOrderStore } from "../stores/orders";
import { useUsersStore } from "../stores/users";
import { ROUTE_NAMES, items } from "../utils/constants";

const drawer = ref(false);
const store = useUsersStore();
const { isLoggedIn } = storeToRefs(store);
const { totalInCart } = useOrderStore();
</script>
