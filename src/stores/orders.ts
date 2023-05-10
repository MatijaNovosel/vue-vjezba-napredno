import { IOrder } from "@/models/orderModels";
import { IProductsResponse } from "@/models/productModels";
import { OrderService } from "@/services/orderService";
import { defineStore } from "pinia";
import { ref } from "vue";
import { CartItem, CheckoutDetails } from "./../models/cartModels";
import { IOrderDetail } from "./../models/orderModels";
import { IUserDetails } from "./../models/userModels";
import { useUsersStore } from "./users";
const CARTDETAILS_KEY = "cartDetails";
const service = new OrderService();

export const useOrderStore = defineStore("orders", () => {
  const orders = ref<IOrder[]>([]);
  const cart = ref<CartItem[]>([]);
  const showCart = ref(false);
  const userStore = useUsersStore();

  const createOrder = async (newOrder: IOrder) => {
    service.createOrderAsync(newOrder);
  };

  const updateOrder = async (editedOrder: IOrder) => {
    service.updateOrderAsync(editedOrder);
  };

  const deleteOrder = async (id: number) => {
    if (id != 0) {
      service.deleteOrderAsync(id);
    }
  };

  const addToCart = (item: CartItem) => {
    cart.value.push(item);
  };

  const isItemInCart = (item: IProductsResponse | null) => {
    const items = cart.value.filter(
      (cartItem) => cartItem.productID === item?.id
    );
    if (items.length > 0) {
      return true;
    }
    return false;
  };

  const totalInCart = () => {
    const total = ref(0);
    cart.value.forEach((c) => (total.value += c.productPrice * c.quantity));
    return total.value;
  };

  const removeFromCart = (item: CartItem) => {
    const index = cart.value.findIndex((i) => i.productID === item.productID);
    if (index !== -1) {
      cart.value.splice(index, 1);
    }
  };

  const confirmPurchase = async (user: IUserDetails) => {
    const orderList = ref<IOrderDetail[]>([]);
    cart.value.forEach((c) =>
      orderList.value.push({
        productId: c.productID,
        quantity: c.quantity
      })
    );
    const order = {
      customerId: user.customerID,
      orderDetails: orderList.value
    };
    const cartDetails: CheckoutDetails = {
      user: user,
      totalAmount: totalInCart()
    };
    await service.createOrderAsync(order);
    saveCartDetailsToLocalStorage(cartDetails);

    orders.value.push(order);

    cart.value = [];
  };

  const saveCartDetailsToLocalStorage = (cartDetails: CheckoutDetails) => {
    localStorage.setItem(CARTDETAILS_KEY, JSON.stringify(cartDetails));
  };

  const loadCartDetailsFromLocalStorage = () => {
    const cartDetails = localStorage.getItem(CARTDETAILS_KEY);
    if (cartDetails === null) {
      return {};
    }
    return JSON.parse(cartDetails);
  };

  const getUserOrders = async () => {
    const nesto = await service.getUserOrdersAsync(13);
    return nesto;
  };

  return {
    createOrder,
    updateOrder,
    deleteOrder,
    addToCart,
    isItemInCart,
    removeFromCart,
    totalInCart,
    confirmPurchase,
    saveCartDetailsToLocalStorage,
    loadCartDetailsFromLocalStorage,
    getUserOrders,
    cart,
    showCart,
    orders
  };
});
