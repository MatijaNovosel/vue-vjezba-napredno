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
          <validation-provider name="FirstName" rules="required" v-slot="{ errors }">
            <v-text-field
              label="First Name"
              v-model="state.formData.firstName"
              outlined
              :error-messages="errors"
            />
          </validation-provider>
          <validation-provider name="FamilyName" rules="required" v-slot="{ errors }">
            <v-text-field
              label="Family Name"
              v-model="state.formData.familyName"
              outlined
              :error-messages="errors"
            />
          </validation-provider>
          <validation-provider name="OldPassword" rules="required" v-slot="{ errors }">
            <v-text-field
              type="password"
              label="Password"
              v-model="state.formData.oldPassword"
              outlined
              :error-messages="errors"
            />
          </validation-provider>
          <validation-provider name="NewPassword">
            <v-text-field
              type="password"
              label="New Password"
              v-model="state.formData.newPassword"
              outlined
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
import { AppStateStore } from "@/store/appStateStore";
import { UserStore } from "@/store/userStore";
import { defineComponent, onMounted, reactive, ref } from "vue";

interface State {
  userData: LoginCustomerCommandResponse | UserDTO | null;
  formData: {
    id: string;
    username: string;
    firstName: string;
    familyName: string;
    oldPassword: string;
    newPassword: string | null;
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
    const appStateStore = AppStateStore();
    const userStore = UserStore();
    const userService = getService<IUserService>(Types.UserService);
    const orderService = getService<IOrderService>(Types.OrderService);

    const updateUserForm = ref<IForm | null>(null);
    const state: State = reactive({
      userData: props.id === userStore.currentUser?.id ? userStore.currentUser : null,
      formData: {
        id: props.id,
        username: "",
        firstName: "",
        familyName: "",
        oldPassword: "",
        newPassword: null
      },
      userOrders: []
    });

    const updateUser = async () => {
      const result = await userService.updateUser({ ...state.formData });
      userStore.setCurrentUser(result);
      appStateStore.snackbar.color = "green";
      appStateStore.snackbar.show = true;
      appStateStore.snackbar.message = "Succesfully updated!";
    };

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
