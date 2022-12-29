import { createPinia, PiniaVuePlugin } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
import { ValidationObserver, ValidationProvider } from "vee-validate";
import Vue from "vue";
import VueApexCharts from "vue-apexcharts";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import router from "./router";

import "@/styles/global.scss";
import "@/validators/index";

Vue.use(PiniaVuePlugin);

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);
Vue.use(VueApexCharts);
Vue.component("apexchart", VueApexCharts);
Vue.component("validation-provider", ValidationProvider);
Vue.component("validation-observer", ValidationObserver);

Vue.config.productionTip = false;

new Vue({
  pinia,
  router,
  vuetify,
  render: (h) => h(App)
}).$mount("#app");
