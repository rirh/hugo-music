import { createI18n } from "vue-i18n/index";

const modules = require.context("@/assets/locales/", true, /\.json$/);

export const get_all_lang = () => {
  let messages = {};
  modules.keys().forEach((key) => {
    let [, _key] = key.split("/");
    [_key] = _key.split(".");
    messages[_key] = modules(key);
  });
  return messages;
};
export const messages = get_all_lang();

export const get_default_locale = () => {
  return process.env.VUE_APP_DEFAULT_LOCALE;
};

//注册i8n实例并引入语言文件
export default createI18n({
  legacy: false, // 使用Composition API，这里必须设置为false
  globalInjection: true,
  global: true,
  locale: get_default_locale(),
  fallbackLocale: get_default_locale(), // 默认语言
  messages,
});
