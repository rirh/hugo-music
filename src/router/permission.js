import router from "@/router";

router.beforeEach((to, from, next) => {
  document.title = to.meta.title || process.env.VUE_APP_TITLE;
  if (to.query.token) {
    console.log(to.query.token);
  } else {
    next();
  }
});
