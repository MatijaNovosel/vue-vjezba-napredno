<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <div class="d-flex flex-gap-20">
        <v-btn elevation="2" class="btn" :to="RouteNames.Login"> Log In </v-btn>
        <v-btn elevation="2" class="btn"> Register </v-btn>
        <v-btn elevation="2" class="btn"> Logout </v-btn>
        <v-btn elevation="2" class="btn" @click="store.drawerState = !store.drawerState">
          Toggle
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
import drawer from "./components/navigation/drawer.vue";
import RouteNames from "./router/route-names";
import { EKupiStore } from "./store";

export default defineComponent({
  name: "App",
  components: { drawer },
  setup() {
    const store = EKupiStore();

    return { store, RouteNames };
  }
});
</script>
