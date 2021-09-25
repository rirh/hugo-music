import { createI18n } from "vue-i18n/index";
import en from "./en.json";
import zh from "./zh.json";

const messages = {
  en,
  zh
};
const i18n = createI18n({
  // locale: "zh",
  // messgae
  locale: "en", // set locale
  messages
});

export default i18n;
