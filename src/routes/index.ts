import { createRouter, createWebHistory } from "vue-router";
import routes from "./routes";
export default createRouter({
    history: createWebHistory(`${import.meta.env.VITE_APP_BASE_URL}`),
    routes,
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition
        } else {
            return { top: 0, behavior: 'smooth' }
        }
    },
})