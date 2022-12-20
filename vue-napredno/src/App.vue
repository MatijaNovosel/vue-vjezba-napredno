<template>
  <v-app>
    <v-app-bar app color="primary" dark right>
      <v-spacer />
      <div class="d-flex flex-gap-20 justify-end">
        <template v-if="userStore.isLoggedIn">
          <ShoppingCartDialog />
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
              <span slot="badge">{{ productStore.uniqueItemsInCart }}</span>
              <v-icon>mdi-cart</v-icon>
            </v-badge>
          </v-btn>
        </template>

        <template v-else>
          <v-btn elevation="2" class="btn" :to="RouteNames.Login"> Log In </v-btn>
          <v-btn elevation="2" class="btn" :to="RouteNames.Register"> Register </v-btn>
        </template>
        <v-btn
          elevation="2"
          class="btn"
          @click="appStateStore.drawerState = !appStateStore.drawerState"
        >
          Menu
        </v-btn>
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
      <drawer />
      <router-view />
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue, { computed, defineComponent, reactive, ref } from "vue";
import { RouterView } from "vue-router";
import { VApp, VAppBar, VSpacer, VBtn, VMain } from "vuetify/lib";
import drawer from "./components/navigation/drawer.vue";
import { getService, Types } from "./di-container";
import { IUserService } from "./interfaces/iuser-service";
import { ProductListQueryResponse } from "./models/query-responses/product-list-query-response";
import { ProductQueryResponse } from "./models/query-responses/product-query-response";
import RouteNames from "./router/route-names";
import { AppStateStore } from "./store/app-state-store";
import { ProductStore } from "./store/product-store";
import { UserStore } from "./store/user-store";
import ShoppingCartDialog from "@/components/dialogs/ShoppingCartDialog.vue";

export default defineComponent({
  name: "App",
  components: { drawer, ShoppingCartDialog },
  setup() {
    const userStore = UserStore();
    const appStateStore = AppStateStore();
    const productStore = ProductStore();
    const userService = getService<IUserService>(Types.UserService);

    return { appStateStore, userService, userStore, productStore, RouteNames };
  }
});
</script>
