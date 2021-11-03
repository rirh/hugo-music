import { createRouter, createWebHashHistory } from "vue-router";
import Layout from "@/components/Layout.vue";
const routes = [
  {
    path: "/",
    component: Layout,
    children: [
      {
        path: "/",
        component: () =>
          import(/* webpackChunkName: "about" */ "@/views/home/Home.vue")
      }
    ]
  },
  {
    path: "/detail",
    component: Layout,
    children: [
      {
        path: "/detail/:keywords",
        name: "Detail",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
          import(/* webpackChunkName: "about" */ "@/views/detail/index.vue")
      }
    ]
  },
  {
    path: "/*",
    redirect: "/"
  }
];

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes
});

export default router;
