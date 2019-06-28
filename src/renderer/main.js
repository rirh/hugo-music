import Vue from 'vue';
import axios from 'axios';
import Antd from 'ant-design-vue';

import App from './App';
import router from './router';
import store from './store';
// eslint-disable-next-line import/first
import 'ant-design-vue/dist/antd.css';


if (!process.env.IS_WEB) Vue.use(require('vue-electron'));
Vue.use(Antd);
Vue.http = Vue.prototype.$http = axios;
Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  template: '<App/>',
}).$mount('#app');
