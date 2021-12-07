import router from "@/router";
import store from "@/store";

router.beforeEach((to, from, next) => {
  // const store = useStore();
  document.title = to.meta.title || process.env.VUE_APP_TITLE;
  if (store.state.settings.userinfo._id) store.dispatch("verifedToken");
  if (to.query.token) {
    console.log(to.query.token);
  } else {
    next();
  }
});
