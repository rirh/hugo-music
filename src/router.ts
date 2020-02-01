import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import Nav from '@/routers/';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      redirect: '/find/recommed',
      children: [
        ...Nav,
      ],
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue'),
    },
    {
      path: '/float',
      name: 'float',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/Float/index.vue'),
    }, {
      path: '/fullboard',
      name: '全屏播放',
      // <a-icon type="customer-service" />
      component: () => import('@/views/FullBoard/index.vue'),
      meta: { title: '全屏播放', keepAlive: true, permission: ['dashboard'] },
    },

  ],
});
