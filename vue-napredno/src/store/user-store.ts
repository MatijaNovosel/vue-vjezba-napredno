import { ProductQueryResponse } from "@/models/query-responses/product-query-response";
import { defineStore } from "pinia";
import { reactive, ref } from "vue";
import { getCookie, setCookie } from "typescript-cookie";

export const UserStore = defineStore("UserStore", () => {
  const isLoggedIn = ref(getCookie("authCookie") !== undefined && getCookie("authCookie") !== "");

  return { isLoggedIn };
});
