import { LoginCustomerCommandResponse } from '@/models/command-responses/loginCustomerCommandResponse';
import { defineStore } from "pinia";
import { Ref, ref } from "vue";
import { UserDTO } from "./../models/query-responses/userListQueryResponse";

export const UserStore = defineStore(
  "UserStore",
  () => {
    const isLoggedIn = ref(false);
    const token = ref("");
    const currentUser: Ref<LoginCustomerCommandResponse | null> = ref(null);
    return { isLoggedIn, token, currentUser };
  },
  {
    persist: {
      storage: localStorage
    }
  }
);
