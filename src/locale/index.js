import { createI18n } from "vue-i18n";
import en from "./en.json";
import zh from "./zh.json";
const messages = {
  en,
  zh
};
export default createI18n({
  // locale: "zh",
  // messgae
  locale: "zh", // set locale
  fallbackLocale: "zh", // set fallback locale
  messages
});
