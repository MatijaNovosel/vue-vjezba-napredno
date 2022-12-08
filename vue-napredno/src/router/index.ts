import { UserStore } from "./../store/user-store";
import LoginView from "@/views/auth/LoginView.vue";
import ProductView from "@/views/guest/product/ProductView.vue";
import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import RouteNames from "./route-names";
import ProductListView from "@/views/admin/products/ProductListView.vue";

Vue.use(VueRouter);

const routes: RouteConfig[] = [
  { path: "/", redirect: "/login" },
  { path: "/login", name: RouteNames.Login, component: LoginView },
  { path: "/products", name: RouteNames.Products, component: ProductView },
  { path: "/product-list", name: RouteNames.ProductList, component: ProductListView }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

/*router.beforeEach((to, from, next) => {
  const userStore = UserStore();
  if (to.name !== RouteNames.Login && !userStore.isLoggedIn) next({ name: RouteNames.Login });
  else next();
});*/

export default router;
