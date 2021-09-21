import { createApp } from "vue";
import App from "./App.vue";
import "element-plus/dist/index.css";
import ElementPlus from "element-plus";
import "@/assets/styles/index.scss"; // global css
import "./registerServiceWorker";
import router from "./router";
import store from "./store";

createApp(App)
  .use(store)
  .use(router)
  .use(ElementPlus)
  .mount("#app");
