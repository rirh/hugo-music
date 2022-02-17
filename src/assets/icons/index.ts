import SvgIcon from "src/components/SVGicon.vue"; // svg组件
const requireAll = requireContext => Object.keys(requireContext).map(it=>requireContext[it]());
const req = import.meta.glob('../icons/svg/*.svg');
requireAll(req);
export default {
  install(app) {
    // 此处形参为main.js文件中use()方法自动传进来的Vue实例
    app.component("svg-icon", SvgIcon);
  }
};
