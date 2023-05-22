<template>
  <Bar :data="chartData" :options="chartOptions" />
</template>

<script lang="ts" setup>
import { IUserDetails } from "@/models/userModels";
import { useUsersStore } from "@/stores/users";
import { chartOptions, colorArray } from "@/utils/constants";
import { computed, onMounted, reactive } from "vue";
import { Bar } from "vue-chartjs";

interface State {
  users: IUserDetails[];
  userNames: string[];
  quantityBought: number[];
}
const state: State = reactive({
  users: [],
  userNames: [],
  quantityBought: []
});

const store = useUsersStore();

const chartData = computed(() => {
  return {
    labels: state.userNames,
    datasets: [
      {
        label: "Money spent per user",
        backgroundColor: colorArray,
        data: state.quantityBought
      }
    ]
  };
});

onMounted(async () => {
  await store.getAllUsers();
  state.users = store.users;
  state.userNames = state.users.map(
    (users) => users.firstName + " " + users.lastName
  );
  state.quantityBought = state.users.map((user) => user.totalOrders);
  if (state.userNames !== null) {
    chartData.value.labels = state.userNames;
  }
  chartData.value.datasets[0].data = state.quantityBought;
});
</script>
