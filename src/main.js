import { createApp } from "vue";
import i18n from "./locale";
import App from "./App.vue";
import "animate.css";
import "@/assets/styles/index.scss"; // global css
import router from "./router";
import store from "./store";
import "./registerServiceWorker";
import smoothscroll from "smoothscroll-polyfill";
import confetti from "canvas-confetti";
// kick off the polyfill!
smoothscroll.polyfill();
export default createApp(App)
  .use(store)
  .use(router)
  .use(i18n)
  .mount("#app");

var end = Date.now() + 5 * 1000;

// go Buckeyes!
var colors = ["#bb0000", "#ff0000"];

(function frame() {
  confetti({
    particleCount: 2,
    angle: 60,
    spread: 55,
    origin: { x: 0 },
    colors: colors
  });
  confetti({
    particleCount: 2,
    angle: 120,
    spread: 55,
    origin: { x: 1 },
    colors: colors
  });

  if (Date.now() < end) {
    requestAnimationFrame(frame);
  }
})();
