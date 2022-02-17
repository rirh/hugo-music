import { createI18n } from "vue-i18n";

const modules = import.meta.glob('../assets/locales/*.json');
// const data = await Promise.all(Object.keys(modules).map(it=>modules[it]()))  

export const get_all_lang = async () => {
  return new Promise((resolve, reject) => {
    let messages = {};
    Object.keys(modules).forEach(async it => {
      const { default: data } = await modules[it]()
      let _key = it.split("/");
      [_key] = _key[_key.length - 1].split(".");
      messages[_key] = data
    })
    resolve(messages)
  })


};
export const messages = await get_all_lang();

export const get_default_locale = () => {
  return `${import.meta.env.VITE_APP_DEFAULT_LOCALE}`;
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
