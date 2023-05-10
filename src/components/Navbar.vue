<template>
  <div>
    <v-app-bar color="blue" clipped left>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>
        {{ $t("appName") }}
      </v-toolbar-title>
      <v-text-field
        v-model="tasksStore.state.searchTerm"
        placeholder="Search"
        hide-details
        prepend-inner-icon="mdi-magnify"
        @input="searchTasks"
      />
      <v-spacer />
      <v-select
        max-width="50"
        v-model="$i18n.locale"
        label=".."
        :items="['hr', 'en']"
      />

      <v-btn v-if="isLoggedIn()" text @click="logout">
        {{ $t("logout") }}
      </v-btn>
      <v-btn
        v-if="isLoggedIn() && totalInCart() > 0"
        :to="{ name: ROUTE_NAMES.CART }"
      >
        <v-icon> mdi-cart-outline </v-icon>
      </v-btn>
    </v-app-bar>
    <v-navigation-drawer v-model="drawer">
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
        <v-divider></v-divider>
        <!-- <v-btn v-if="isLoggedIn()" text @click="goToProfile">
          {{ $t("myProfile") }}
        </v-btn> -->
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script lang="ts" setup>
import { useOrderStore } from "@/stores/orders";
import { useTasksStore } from "@/stores/tasks";
import { createDebounce } from "@/utils/helpers";
import { ref } from "vue";
import { useUsersStore } from "../stores/users";
import { ROUTE_NAMES, items } from "../utils/constants";

const drawer = ref(false);
const searchText = ref("");
const tasksStore = useTasksStore();
const { logout, isLoggedIn, state } = useUsersStore();
const { totalInCart } = useOrderStore();
const debounce = createDebounce();
const searchTasks = () => {
  debounce(() => {
    tasksStore.setSearchTerm(searchText.value);
  }, 1500);
};
// const goToProfile = () => {
//   if (isLoggedIn())
//     router.push({
//       name: ROUTE_NAMES.USER_DETAILS,
//       params: { id: 16 }
//     });
// };
tasksStore.state.searchTerm;
</script>
