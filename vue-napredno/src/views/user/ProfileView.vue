<template>
  <div class="pa-6">
    {{ state.userData?.userName }}
    {{ state.userData?.firstName }}
    {{ state.userData?.familyName }}
  </div>
</template>

<script lang="ts">
import { getService, Types } from "@/di-container";
import { IUserService } from "@/interfaces/userService";
import { UserStore } from "@/store/user-store";
import { defineComponent, onMounted, PropType, reactive } from "vue";

export default defineComponent({
  props: {
    id: {
      type: Object as PropType<string>,
      required: true
    }
  },
  setup(props) {
    const userStore = UserStore();
    const userService = getService<IUserService>(Types.UserService);
    const state = reactive({
      userData: props.id === userStore.currentUser?.id ? userStore.currentUser : null
    });

    onMounted(async () => {
      if (state.userData === null) {
        state.userData = await userService.getUser(props.id);
      }
    });
    return { state };
  }
});
</script>
