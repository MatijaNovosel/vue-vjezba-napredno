import { LoginCustomerCommandResponse } from '@/models/command-responses/loginCustomerCommandResponse';
import { defineStore } from "pinia";
import { Ref, ref } from "vue";
import { UserDTO } from "./../models/query-responses/userListQueryResponse";

export const UserStore = defineStore(
  "UserStore",
  () => {
    const isLoggedIn = ref(false);
    const currentUser: Ref<LoginCustomerCommandResponse | null> = ref(null);

    const setCurrentUser = (result: LoginCustomerCommandResponse) => {
      isLoggedIn.value = true;
      currentUser.value = result;
    }

    return { isLoggedIn, currentUser, setCurrentUser };
  },
  {
    persist: {
      storage: localStorage
    }
  }
);
