import SvgIcon from "@/components/SVGicon"; // svg组件
const requireAll = requireContext => requireContext.keys().map(requireContext);
const req = require.context("./svg", false, /\.svg$/);
requireAll(req);
export default {
  install(app) {
    // 此处形参为main.js文件中use()方法自动传进来的Vue实例
    app.component("svg-icon", SvgIcon);
  }
};
