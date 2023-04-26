import "@mdi/font/css/materialdesignicons.css";
import { createPinia } from "pinia";
import { Field, Form } from "vee-validate";
import { createApp } from "vue";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import { VDataTable } from "vuetify/labs/VDataTable";
import "vuetify/styles";
import App from "./App.vue";
import i18n from "./i18n";
import router from "./router/routes";

const pinia = createPinia();

const vuetify = createVuetify({
  components,
  directives
});

createApp(App)
  .use(vuetify)
  .component("v-data-table", VDataTable)
  .use(router)
  .use(pinia)
  .use(i18n)
  .component("vv-field", Field)
  .component("vv-form", Form)
  .mount("#app");
