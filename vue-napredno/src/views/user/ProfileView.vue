<template>
  <v-row class="pa-6">
    <v-col md="2">
      <validation-observer v-slot="{ handleSubmit }" ref="updateUserForm">
        <form @submit.prevent="handleSubmit(updateUser)">
          <h1>Edit User</h1>
          <validation-provider name="Username" rules="required" v-slot="{ errors }">
            <v-text-field
              label="Username"
              v-model="state.formData.username"
              outlined
              :error-messages="errors"
            />
          </validation-provider>
          <validation-provider name="Username" rules="required" v-slot="{ errors }">
            <v-text-field
              label="First Name"
              v-model="state.formData.firstName"
              outlined
              :error-messages="errors"
            />
          </validation-provider>
          <validation-provider name="Username" rules="required" v-slot="{ errors }">
            <v-text-field
              label="Family Name"
              v-model="state.formData.familyName"
              outlined
              :error-messages="errors"
            />
          </validation-provider>
          <v-btn color="primary" type="submit">Update</v-btn>
        </form>
      </validation-observer>
    </v-col>
    <v-col md="10">
      <h1>Orders</h1>
      <v-expansion-panels>
        <v-expansion-panel v-for="item in state.userOrders" :key="item.orderNumber">
          <v-expansion-panel-header>
            <span>Date: {{ new Date(item.orderDate).toLocaleString() }}</span>
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <div class="d-flex flex-column">
              <span>Customer: {{ item.customerName }}</span>
              <span>Order Number: {{ item.orderNumber }}</span>
              <h3>Items</h3>
            </div>

            <div v-for="(detail, i) in item.orderDetails" class="d-flex flex-column">
              <v-divider />
              <span>Product: {{ detail.product }}</span>
              <span>Quantity: {{ detail.quantity }}</span>
              <span>Price: {{ detail.price }}</span>
              <span>Total: {{ detail.total }}</span>
            </div>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { getService, Types } from "@/di-container";
import { IForm } from "@/interfaces/iform";
import { IOrderService } from "@/interfaces/Iorder-service";
import { IUserService } from "@/interfaces/iuser-service";
import { LoginCustomerCommandResponse } from "@/models/command-responses/loginCustomerCommandResponse";
import { UserDTO } from "@/models/query-responses/userListQueryResponse";
import { UserOrdersQueryResponse } from "@/models/query-responses/userOrdersQueryResponse";
import { UserStore } from "@/store/userStore";
import { defineComponent, onMounted, reactive, ref } from "vue";

interface State {
  userData: LoginCustomerCommandResponse | UserDTO | null;
  formData: {
    username: string;
    firstName: string;
    familyName: string;
  };
  userOrders: UserOrdersQueryResponse[];
}

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

    const updateUserForm = ref<IForm | null>(null);
    const state: State = reactive({
      userData: props.id === userStore.currentUser?.id ? userStore.currentUser : null,
      formData: {
        username: "",
        firstName: "",
        familyName: ""
      },
      userOrders: []
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
    });
    return { state, updateUserForm, updateUser };
  }
});
</script>
