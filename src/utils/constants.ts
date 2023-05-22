export const items = [
  { icon: "mdi-view-dashboard", title: "All Products", route: "/allproducts" },
  {
    icon: "mdi-list-box",
    title: "Products table",
    route: "/producttable"
  },
  {
    icon: "mdi-table-account",
    title: "Users",
    route: "/users"
  },
  {
    icon: "mdi-chart-bar",
    title: "Graphs",
    route: "/graphs"
  }
];
export const langs = ["en", "hr"];
export const ROUTE_NAMES = {
  ACTIVE: "/active",
  INACTIVE: "inactive",
  ARCHIVED: "archived",
  PRODUCTS: "/allproducts",
  DETAILS: "/details",
  LOGIN: "/login",
  REGISTER: "/register",
  PRODUCT_TABLE: "/producttable",
  CART: "/cart",
  CART_TABLE: "/table",
  CHECKOUT: "/checkout",
  USER_EDIT: "/useredit",
  USER_DETAILS: "/userdetails",
  USERS: "/users",
  GRAPHS: "/graphs"
};
export const PRODUCTS_URL = {
  BASE_URL: "https://localhost:44365/api/",
  PRODUCTS: "https://localhost:44365/api/Products/",
  BESTSELLING_PRODUCTS: "https://localhost:44365/api/Products/bestselling",
  SALES: "https://localhost:44365/api/Products/sales",
  PRODUCTS_BY_CATEGORY:
    "https://localhost:44365/api/Products/best-selling-by-category",
  ALL_CATEGORIES: "https://localhost:44365/api/Customer/categories"
};

export const USER_URL = {
  BASE: "https://localhost:44365/api/User",
  LOGIN: "https://localhost:44365/api/User/login",
  REGISTER: "https://localhost:44365/api/User/register",
  DETAILS: "https://localhost:44365/api/Customer/details?email=",
  ALL_USERS: "https://localhost:44365/api/User",
  SPENDING: "https://localhost:44365/api/Customer/spending"
};
export const ORDER_URL = {
  ORDERS: "https://localhost:44365/api/Orders",
  USER_ORDERS: "https://localhost:44365/api/Orders/details/"
};
export const tokenKey = "token";
export const userKey = "user";

export const chartOptions = {
  scales: {
    y: {
      beginAtZero: true,
      ticks: {
        callback: (value: number) => value,
        maxTicksLimit: 15
      },
      labels: {
        autoskip: true
      }
    }
  }
} as any;
export const colorArray = [
  "rgb(255, 99, 132)",
  "rgb(255, 159, 64)",
  "rgb(255, 205, 86)",
  "rgb(75, 192, 192)",
  "rgb(54, 162, 235)",
  "rgb(153, 102, 255)",
  "rgb(201, 203, 207)"
];
