import Vue from 'vue';
import { Button, Icon, Avatar, Row, Col } from 'ant-design-vue';

const IconFont: any = Icon.createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_1272441_ynetj48glqm.js',
});
Vue.component(Button.name, Button);
Vue.component(Icon.name, Icon);
Vue.component(Avatar.name, Avatar);
Vue.component(Row.name, Row);
Vue.component(Col.name, Col);
Vue.component(IconFont.name, IconFont);
