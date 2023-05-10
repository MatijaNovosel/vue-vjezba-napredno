export const items = [
  { icon: "mdi-view-dashboard", title: "All Products", route: "/allproducts" }
];
export const langs = ["en", "hr"];
export const ROUTE_NAMES = {
  ACTIVE: "active",
  INACTIVE: "inactive",
  ARCHIVED: "archived",
  PRODUCTS: "allproducts",
  DETAILS: "details",
  LOGIN: "login",
  PRODUCT_TABLE: "producttable",
  CART: "cart",
  CART_TABLE: "table",
  CHECKOUT: "checkout",
  USER_DETAILS: "userdetails"
};
export const PRODUCTS_URL = {
  BASE_URL: "https://localhost:44365/api/",
  PRODUCTS: "https://localhost:44365/api/Products/",
  BESTSELLING_PRODUCTS: "https://localhost:44365/api/Products/bestselling",
  PRODUCTS_BY_CATEGORY:
    "https://localhost:44365/api/Products/best-selling-by-category"
};

export const USER_URL = {
  LOGIN: "https://localhost:44365/api/Authentication/login",
  REGISTER: "https://localhost:44365/api/Authentication/register",
  DETAILS: "https://localhost:44365/api/Customer/details?email="
};
export const ORDER_URL = {
  ORDERS: "https://localhost:44365/api/Orders",
  USER_ORDERS: "https://localhost:44365/api/Orders/details/"
};
export const tokenKey = "token";
export const userKey = "user";
