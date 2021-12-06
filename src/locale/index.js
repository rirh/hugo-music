import { createI18n } from "vue-i18n";
const modules = require.context("./locale/*", true, /\.js$/);
function getLangAll() {
  let message = {};
  getLangFiles(modules, message);
  return message;
}

/**
 * 获取所有语言文件
 * @param {Object} mList
 */
function getLangFiles(mList, msg) {
  for (let path in mList) {
    if (mList[path].default) {
      //  获取文件名
      let pathName = path.substr(path.lastIndexOf("/") + 1, 5);

      if (msg[pathName]) {
        msg[pathName] = {
          ...mList[pathName],
          ...mList[path].default
        };
      } else {
        msg[pathName] = mList[path].default;
      }
    }
  }
}
//注册i8n实例并引入语言文件
const i18n = createI18n({
  legacy: false, // 使用Composition API，这里必须设置为false
  globalInjection: true,
  global: true,
  locale: "zh-CN",
  fallbackLocale: "zh-CN", // 默认语言
  messages: getLangAll()
});

export default i18n;
