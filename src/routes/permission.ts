import router from "./index";
import { useStore } from 'vuex'
import { useTitle } from '@vueuse/core'

router.beforeEach((to, from, next) => {
    const store = useStore();
    const title = useTitle()
    title.value = `${to.meta.title || import.meta.env.VITE_APP_TITLE}`;

    if (store.state.settings.userinfo._id) store.dispatch("verifedToken");
    if (to.query.token) {
        console.log(to.query.token);
    } else {
        next();
    }
});
