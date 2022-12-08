import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import VueApexCharts from "vue-apexcharts";
import vuetify from "./plugins/vuetify";
import { createPinia, PiniaVuePlugin } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
import { ValidationObserver, ValidationProvider } from "vee-validate";
import "@/styles/global.scss";

Vue.use(VueApexCharts);
Vue.component("apexchart", VueApexCharts);

Vue.component("ValidationProvider", ValidationProvider);
Vue.component("ValidationObserver", ValidationObserver);

Vue.config.productionTip = false;

Vue.use(PiniaVuePlugin);

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

new Vue({
  pinia,
  router,
  vuetify,
  render: (h) => h(App)
}).$mount("#app");
