import { defineStore } from "pinia";
import { ref } from "vue";

export const EKupiStore = defineStore("EKupi", () => {
  const drawerState = ref(false);

  return { drawerState };
});
