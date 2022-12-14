<template>
  <div class="pa-6 d-flex">
    <v-col md="2">
      <ValidationObserver v-slot="{ handleSubmit }" ref="updateUserForm">
        <form @submit.prevent="handleSubmit(updateUser)">
          <h1>Edit User</h1>
          <ValidationProvider name="Username" rules="required" v-slot="{ errors }">
            <v-text-field
              label="Username"
              v-model="state.formData.username"
              outlined
              :error-messages="errors"
            ></v-text-field>
          </ValidationProvider>
          <ValidationProvider name="Username" rules="required" v-slot="{ errors }">
            <v-text-field
              label="First Name"
              v-model="state.formData.firstName"
              outlined
              :error-messages="errors"
            ></v-text-field>
          </ValidationProvider>
          <ValidationProvider name="Username" rules="required" v-slot="{ errors }">
            <v-text-field
              label="Family Name"
              v-model="state.formData.familyName"
              outlined
              :error-messages="errors"
            ></v-text-field>
          </ValidationProvider>
          <v-btn color="primary" type="submit">Update</v-btn>
        </form>
      </ValidationObserver>
    </v-col>
    <v-col md="10">
      <h1>Orders</h1>
      <v-expansion-panels>
        <v-expansion-panel v-for="item in state.userOrders" :key="item.orderNumber">
          <v-expansion-panel-header>
            <span>Date: {{ item.orderDate }}</span>
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <div class="d-flex flex-column">
              <span>Customer: {{ item.customerName }}</span>
              <span>Order Number: {{ item.orderNumber }}</span>
              <h3>Items</h3>
            </div>

            <div v-for="(detail, i) in item.orderDetails" class="d-flex flex-column">
              <v-divider />
              <a>Product: {{ detail.product }}</a>
              <a>Quantity: {{ detail.quantity }}</a>
              <a>Price: {{ detail.price }}</a>
              <a>Total: {{ detail.total }}</a>
            </div>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-col>
  </div>
</template>

<script lang="ts">
import { getService, Types } from "@/di-container";
import { IOrderService } from "@/interfaces/Iorder-service";
import { IUserService } from "@/interfaces/iuser-service";
import { UserOrdersQueryResponse } from "@/models/query-responses/user-orders-query-response";
import { UserStore } from "@/store/user-store";
import { ValidationObserver, ValidationProvider } from "vee-validate";
import { defineComponent, onMounted, PropType, reactive, ref } from "vue";
import { VCol, VTextField, VBtn } from "vuetify/lib";

export default defineComponent({
  props: {
    id: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const userStore = UserStore();
    const userService = getService<IUserService>(Types.UserService);
    const orderService = getService<IOrderService>(Types.OrderService);

    const updateUserForm = ref(null);
    const state = reactive({
      userData: props.id === userStore.currentUser?.id ? userStore.currentUser : null,
      formData: {
        username: "",
        firstName: "",
        familyName: ""
      },
      userOrders: [] as UserOrdersQueryResponse[]
    });

    async function updateUser() {}

    onMounted(async () => {
      if (state.userData === null) {
        state.userData = await userService.getUser(props.id);
      }
      state.formData.familyName = state.userData.familyName;
      state.formData.firstName = state.userData.firstName;
      state.formData.username = state.userData.userName;
      state.userOrders = await orderService.getUserOrders(state.userData.id);
      state.userOrders.forEach((el) => {
        el.orderDate = new Date(el.orderDate).toLocaleString();
      });
    });
    return { state, updateUserForm, updateUser };
  }
});
</script>
