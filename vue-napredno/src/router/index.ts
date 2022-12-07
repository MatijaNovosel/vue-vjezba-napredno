import LoginViewVue from "@/views/auth/LoginView.vue";
import ProductViewVue from "@/views/guest/product/ProductView.vue";
import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import RouteNames from "./route-names";

Vue.use(VueRouter);

const routes: RouteConfig[] = [
  { path: "/", redirect: "/login" },
  { path: "/login", name: RouteNames.Login, component: LoginViewVue },
  { path: "/products", name: RouteNames.Products, component: ProductViewVue }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
