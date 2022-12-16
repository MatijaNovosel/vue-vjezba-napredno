import { UserStore } from "./../store/user-store";
import LoginView from "@/views/auth/LoginView.vue";
import ProductView from "@/views/guest/product/ProductView.vue";
import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import RouteNames from "./route-names";
import ProductListView from "@/views/admin/products/ProductListView.vue";
import StatisticsView from "@/views/admin/statistics/StatisticsView.vue";
import RegisterView from "@/views/auth/RegisterView.vue";
import UserListView from "@/views/admin/users/UserListView.vue";
import ProfileView from "@/views/user/ProfileView.vue";
import ProductDetailsView from "@/views/guest/product/ProductDetailsView.vue";

Vue.use(VueRouter);

const routes: RouteConfig[] = [
  { path: "/", redirect: "/products" },
  { path: "/login", name: RouteNames.Login, component: LoginView },
  { path: "/register", name: RouteNames.Register, component: RegisterView },
  { path: "/products", name: RouteNames.Products, component: ProductView },
  {
    path: "/product-details-:id",
    name: RouteNames.ProductDetails,
    component: ProductDetailsView,
    props: true
  },
  { path: "/product-list", name: RouteNames.ProductList, component: ProductListView },
  { path: "/user-list", name: RouteNames.UserList, component: UserListView },
  { path: "/statistics", name: RouteNames.Statistics, component: StatisticsView },
  { path: "/profile-:id", name: RouteNames.Profile, component: ProfileView, props: true }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  const userStore = UserStore();
  if (to.name !== RouteNames.Login && to.name !== RouteNames.Products && !userStore.isLoggedIn) {
    next({ name: RouteNames.Login });
  } else next();
});

export default router;
