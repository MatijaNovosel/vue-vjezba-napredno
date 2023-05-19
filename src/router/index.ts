import { createRouter, createWebHistory } from "vue-router";
import { useUsersStore } from "../stores/users";
import { ROUTE_NAMES } from "../utils/constants";
import routes from "./routes";

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});
router.beforeEach((to, from, next) => {
  const store = useUsersStore();

  if (to.matched.some((record) => record.meta.isAuth)) {
    if (store.isLoggedIn) {
      next();
    } else {
      if (to.name !== ROUTE_NAMES.LOGIN) {
        next({
          name: ROUTE_NAMES.LOGIN
        });
      } else {
        next({
          name: ROUTE_NAMES.PRODUCTS
        });
      }
    }
  } else {
    next();
  }
});

export default router;
