import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import ProductTable from "../components/ProductTable.vue";
import AllProducts from "../views/AllProducts.vue";
import Login from "../views/Login.vue";
import ProductDetails from "../views/ProductDetails.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: "/producttable"
  },
  {
    path: "/producttable",
    name: "producttable",
    component: ProductTable
  },
  {
    path: "/allproducts",
    name: "allproducts",
    component: AllProducts
  },
  {
    path: "/details/:id",
    name: "details",
    component: ProductDetails,
    props: true
  },
  {
    path: "/login",
    name: "login",
    component: Login
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});
// router.beforeEach((to, from, next) => {
//   const isAuthenticated = useUsersStore().state.currentUser !== null;
//   if (to.name !== "login" && !isAuthenticated) {
//     router.push({ name: "login" });
//   } else {
//     next();
//   }
// });

export default router;
