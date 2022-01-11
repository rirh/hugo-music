import { createApp } from "vue";
import i18n from "@/locale";
import App from "@/App.vue";
import "@/assets/icons"; // global css
import "animate.css";
import "@/assets/styles/index.scss"; // global css
import router from "./router";
import store from "./store";
import "@/registerServiceWorker";
import smoothscroll from "smoothscroll-polyfill";
import confetti from "canvas-confetti";
import SvgIcon from "@/assets/icons/index"; // svg组件
import "@/assets/styles/plyr.css";
import "@/router/permission";
import _package from "../package.json";

// kick off the polyfill!
smoothscroll.polyfill();
export default createApp(App)
  .use(store)
  .use(router)
  .use(SvgIcon)
  .use(i18n)
  .mount("#app");

if (store.state.settings.spreadflower) {
  var end = Date.now() + 5 * 1000;
  // go Buckeyes!
  var colors = ["#bb0000", "#ff0000"];

  (function frame() {
    confetti({
      particleCount: 2,
      angle: 60,
      spread: 55,
      origin: { x: 0 },
      colors: colors,
    });
    confetti({
      particleCount: 2,
      angle: 120,
      spread: 55,
      origin: { x: 1 },
      colors: colors,
    });

    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  })();
}

const print = (key, value) =>
  console.log(
    `%c ${key} %c ${value} %c `,
    "background:#20232a ; padding: 1px; border-radius: 3px 0 0 3px;  color: #fff",
    "background:#61dafb ;padding: 1px; border-radius: 0 3px 3px 0;  color: #20232a; font-weight: bold;",
    "background:transparent"
  );
print(_package.name, _package.version);
print("build time", `${process.env.VUE_APP_BUILD_TIME}`);
