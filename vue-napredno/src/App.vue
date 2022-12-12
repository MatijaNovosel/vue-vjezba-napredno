<template>
  <v-app>
    <v-app-bar app color="primary" dark right>
      <v-spacer />
      <div class="d-flex flex-gap-20 justify-end">
        <template v-if="userStore.isLoggedIn">
          <v-btn elevation="2" class="btn" @click="userService.logoutUser"> Logout </v-btn>
          <v-btn elevation="2" class="btn" :to="{ name: RouteNames.Profile, params: { id: userStore.currentUser?.id }}"> Profile </v-btn>
        </template>

        <template v-else>
          <v-btn elevation="2" class="btn" :to="RouteNames.Login"> Log In </v-btn>
          <v-btn elevation="2" class="btn" :to="RouteNames.Register"> Register </v-btn>
        </template>
        <v-btn
          elevation="2"
          class="btn"
          @click="productStore.drawerState = !productStore.drawerState"
        >
          Menu
        </v-btn>
      </div>
    </v-app-bar>
    <v-main>
      <drawer />
      <router-view />
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue, { defineComponent, ref } from "vue";
import { RouterView } from "vue-router";
import { VApp, VAppBar, VSpacer, VBtn, VMain } from "vuetify/lib";
import drawer from "./components/navigation/drawer.vue";
import { getService, Types } from "./di-container";
import { IUserService } from "./interfaces/userService";
import RouteNames from "./router/route-names";
import { ProductStore } from "./store/product-store";
import { UserStore } from "./store/user-store";

export default defineComponent({
  name: "App",
  components: { drawer },
  setup() {
    const productStore = ProductStore();
    const userStore = UserStore();
    const userService = getService<IUserService>(Types.UserService);

    return { productStore, userService, userStore, RouteNames };
  }
});
</script>
