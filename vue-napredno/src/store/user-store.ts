import { currentUserQuery } from "./../models/query-responses/current-user-query";
import { UserDTO } from "./../models/query-responses/user-list-query-response";
import { ProductQueryResponse } from "@/models/query-responses/product-query-response";
import { defineStore } from "pinia";
import { reactive, Ref, ref } from "vue";
import { getCookie, setCookie } from "typescript-cookie";

export const UserStore = defineStore(
  "UserStore",
  () => {
    const isLoggedIn = ref(false);
    const token = ref("");
    const currentUser: Ref<currentUserQuery | null> = ref(null);
    return { isLoggedIn, token, currentUser };
  },
  {
    persist: {
      storage: localStorage,
      paths: ["isLoggedIn", "token", "currentUser"]
    }
  }
);
