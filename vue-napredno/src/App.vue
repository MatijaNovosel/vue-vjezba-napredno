<template>
  <v-app>
    <v-app-bar app color="primary" dark right>
      <v-spacer />
      <div class="d-flex flex-gap-20 justify-end">
        <template v-if="userStore.isLoggedIn">
          <shopping-cart-dialog />
          <v-btn elevation="2" class="btn" @click="userService.logoutUser"> Logout </v-btn>
          <v-btn
            elevation="2"
            class="btn"
            :to="{ name: RouteNames.Profile, params: { id: userStore.currentUser?.id } }"
          >
            Profile
          </v-btn>

          <v-btn @click="appStateStore.showCartDialog = true">
            <v-badge left>
              <span slot="badge">{{ productStore.cartItems.length }}</span>
              <v-icon>mdi-cart</v-icon>
            </v-badge>
          </v-btn>
        </template>

        <template v-else>
          <v-btn elevation="2" class="btn" :to="RouteNames.Login"> Log In </v-btn>
          <v-btn elevation="2" class="btn" :to="RouteNames.Register"> Register </v-btn>
        </template>
        <v-btn elevation="2" class="btn" @click="drawerState = !drawerState"> Menu </v-btn>
      </div>
    </v-app-bar>
    <v-main>
      <v-snackbar
        top
        color="red"
        elevation="2"
        width="80%"
        v-model="appStateStore.snackbar.show"
        timeout="3000"
      >
        {{ appStateStore.snackbar.message }}
      </v-snackbar>
      <drawer v-model="drawerState" />
      <router-view />
    </v-main>
  </v-app>
</template>

<script lang="ts">
import ShoppingCartDialog from "@/components/dialogs/ShoppingCartDialog.vue";
import { defineComponent, ref } from "vue";
import { RouterView } from "vue-router";
import Drawer from "./components/navigation/Drawer.vue";
import { getService, Types } from "./di-container";
import { IUserService } from "./interfaces/iuser-service";
import RouteNames from "./router/routeNames";
import { AppStateStore } from "./store/appStateStore";
import { ProductStore } from "./store/productStore";
import { UserStore } from "./store/userStore";

export default defineComponent({
  name: "App",
  components: { Drawer, ShoppingCartDialog },
  setup() {
    const userStore = UserStore();
    const appStateStore = AppStateStore();
    const productStore = ProductStore();
    const userService = getService<IUserService>(Types.UserService);

    const drawerState = ref(false);

    return {
      appStateStore,
      drawerState,
      userService,
      userStore,
      productStore,
      RouteNames
    };
  }
});
</script>
