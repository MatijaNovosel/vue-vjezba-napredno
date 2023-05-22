import "@mdi/font/css/materialdesignicons.css";
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  Title,
  Tooltip
} from "chart.js";
import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
import { Field, Form } from "vee-validate";
import { createApp } from "vue";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import "vuetify/styles";
import App from "./App.vue";
import i18n from "./i18n";
import router from "./router/index";
import "./validators";
const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

const vuetify = createVuetify({
  components,
  directives
});

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  LineElement,
  CategoryScale,
  BarElement,
  LinearScale,
  PointElement
);

createApp(App)
  .use(pinia)
  .use(router)
  .use(i18n)
  .use(vuetify)
  .component("vv-field", Field)
  .component("vv-form", Form)
  .mount("#app");
