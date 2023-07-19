import { createApp } from 'vue'
// global css
import 'src/assets/styles/index.css'
import 'src/assets/styles/plyr.css'

import store from 'src/store/index'
import router from 'src/routes/index'
// default english language
import i18n from "src/locale/index";

// svg icon
import 'virtual:svg-icons-register'
import SvgIcon from "src/components/SVGicon.vue";

import App from './App.vue'

//  smooth scroll poly fill
import smoothscroll from "smoothscroll-polyfill";
import confetti from "canvas-confetti";

import _package from '../package.json'
const app = createApp(App);

app.use(store)
  .use(router)
  .use(i18n)
  .mount('#app')

app.component('svg-icon', SvgIcon)

smoothscroll.polyfill();

if ((store as any).state.settings.spreadflower) {
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

const print = (key: string, value: string) =>
  console.log(
    `%c ${key} %c ${value} %c `,
    "background:#20232a ; padding: 1px; border-radius: 3px 0 0 3px;  color: #fff",
    "background:#61dafb ;padding: 1px; border-radius: 0 3px 3px 0;  color: #20232a; font-weight: bold;",
    "background:transparent"
  );
print(_package.name, _package.version);
print("build time", `${import.meta.env.VITE_APP_BUILD_TIME}`);
export default app
