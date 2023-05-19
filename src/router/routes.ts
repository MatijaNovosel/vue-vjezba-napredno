import { RouteRecordRaw } from "vue-router";
import CartTableVue from "../components/CartTable.vue";
import { ROUTE_NAMES } from "../utils/constants";
import AllProducts from "../views/AllProducts.vue";
import AllUsers from "../views/AllUsers.vue";
import Cart from "../views/Cart.vue";
import Checkout from "../views/Checkout.vue";
import Graphs from "../views/Graphs.vue";
import Login from "../views/Login.vue";
import ProductDetails from "../views/ProductDetails.vue";
import ProductTable from "../views/ProductTable.vue";
import Registration from "../views/Registration.vue";
import UserDetails from "../views/UserDetails.vue";
import UserEdit from "../views/UserEdit.vue";
const routes: RouteRecordRaw[] = [
  {
    path: "/",
    redirect: "/login"
  },
  {
    path: "/producttable",
    name: ROUTE_NAMES.PRODUCT_TABLE,
    component: ProductTable,
    meta: {
      isAuth: true
    }
  },
  {
    path: "/allproducts",
    name: ROUTE_NAMES.PRODUCTS,
    component: AllProducts,
    meta: {
      isAuth: true
    }
  },
  {
    path: "/details/:id",
    name: ROUTE_NAMES.DETAILS,
    component: ProductDetails,
    props: true,
    meta: {
      isAuth: true
    }
  },
  {
    path: "/login",
    name: ROUTE_NAMES.LOGIN,
    component: Login
  },
  {
    path: "/register",
    name: ROUTE_NAMES.REGISTER,
    component: Registration
  },
  {
    path: "/cart",
    name: ROUTE_NAMES.CART,
    component: Cart,
    meta: {
      isAuth: true
    }
  },
  {
    path: "/table",
    name: ROUTE_NAMES.CART_TABLE,
    component: CartTableVue,
    meta: {
      isAuth: true
    }
  },
  {
    path: "/checkout",
    name: ROUTE_NAMES.CHECKOUT,
    component: Checkout,
    meta: {
      isAuth: true
    }
  },
  {
    path: "/useredit/:id",
    name: ROUTE_NAMES.USER_EDIT,
    component: UserEdit,
    meta: {
      isAuth: true
    }
  },
  {
    path: "/users",
    name: ROUTE_NAMES.USERS,
    component: AllUsers,
    meta: {
      isAuth: true
    }
  },
  {
    path: "/userdetails/:id",
    name: ROUTE_NAMES.USER_DETAILS,
    component: UserDetails,
    meta: {
      isAuth: true
    }
  },
  {
    path: "/graphs",
    name: ROUTE_NAMES.GRAPHS,
    component: Graphs,
    meta: {
      isAuth: true
    }
  }
];

export default routes;
