export const items = [
  { icon: "mdi-view-dashboard", title: "Active", route: "/active" },
  { icon: "mdi-clock", title: "Inactive", route: "/inactive" },
  { icon: "mdi-archive", title: "Archived", route: "/archived" }
];
export const langs = ["en", "hr"];
export const ROUTE_NAMES = {
  ACTIVE: "active",
  INACTIVE: "inactive",
  ARCHIVED: "archived",
  PRODUCTS: "allproducts",
  DETAILS: "details",
  LOGIN: "login",
  PRODUCT_TABLE: "producttable"
};
export const API_URL = {
  BASE_URL: "https://localhost:44365/api/Products/",
  GET_PRODUCT: "https://localhost:44365/api/Products/",
  BESTSELLING_PRODUCTS: "https://localhost:44365/api/Products/bestselling",
  PRODUCTS_BY_CATEGORY:
    "https://localhost:44365/api/Products/best-selling-by-category",
  LOGIN: "https://localhost:44365/api/Authentication/login",
  REGISTER: "https://localhost:44365/api/Authentication/register"
};
