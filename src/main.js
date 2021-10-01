import { createApp } from "vue";
import i18n from "./locale";
import App from "./App.vue";
import "@/assets/styles/index.scss"; // global css
import "animate.css"
import router from "./router";
import store from "./store";
import "./registerServiceWorker";

export default createApp(App)
  .use(store)
  .use(router)
  .use(i18n)
  .mount("#app");
