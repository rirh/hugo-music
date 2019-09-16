import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import '@/plugin/antd';
// import { Button, Icon, Avatar, Row, Col } from 'ant-design-vue';
import './registerServiceWorker';
// import 'ant-design-vue/dist/antd.css';
// import { Button } from 'ant-design-vue';
// Vue.component(Button.name, Button);
// Vue.component(Icon.name, Icon);
// Vue.component(Avatar.name, Avatar);
// Vue.component(Row.name, Row);
// Vue.component(Col.name, Col);




Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
  mounted() {
    this.$router.push('/');
  },
}).$mount('#app');
