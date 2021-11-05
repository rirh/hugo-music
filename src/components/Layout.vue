<template>
  <div class="app-container" :class="{ drag: is_electron }">
    <div class="left">
      <Image
        @click="handle_change_theme"
        class="logo"
        alt="logo"
        src="https://6372-crypto2server-576164-1302901174.tcb.qcloud.la/z-org-logos/logo-512x160.png"
      />
      <NavHistory />
      <SearchBar />
    </div>
    <div class="right">
      <router-view v-slot="{ Component }">
        <transition
          enter-active-class="animate__animated animate__fadeIn"
          leave-active-class="animate__animated animate__fadeOut"
        >
          <keep-alive>
            <component :is="Component" />
          </keep-alive>
        </transition>
      </router-view>
      <CopyRigth />
    </div>
  </div>
  <PlayCon @on-open-dashbord="handle_open_dashbord" />
  <transition
    leave-active-class="animate__animated animate__fadeOutDown"
    enter-active-class="animate__animated animate__fadeInUp"
  >
    <Dashboard v-show="dashboard_open" />
  </transition>
</template>

<script setup>
import { ref, computed } from "vue";
import { useStore } from "vuex";
import PlayCon from "@/components/PlayContral.vue";
import Image from "@/components/Image";
import CopyRigth from "@/components/CopyRigth";
import NavHistory from "@/components/NavHistory";
import SearchBar from "@/components/SearchBar";

import Dashboard from "@/components/Dashboard.vue";
document.title = "Z ORG | MUSIC";

const store = useStore();
const is_electron = ref(process.env.IS_ELECTRON || false);
const dashboard_open = computed(() => store.state.sound.dashboard_open);

const handle_open_dashbord = () => {
  store.commit("update_dashboard_open", true);
};

const handle_change_theme = () => {
  let appearance =
    document.body.getAttribute("data-theme") === "dark" ? "light" : "dark";
  if (appearance === "auto" || appearance === undefined) {
    appearance = window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  }
  document.body.setAttribute("data-theme", appearance);
  document
    .querySelector('meta[name="theme-color"]')
    .setAttribute("content", appearance === "dark" ? "#222" : "#fff");
};
</script>

<style lang="scss" scoped>
.app-container {
  display: flex;
  height: 100vh;
  width: 100vw;
  box-sizing: border-box;
  min-width: 400px;
  background-image: url("https://vkceyugu.cdn.bspapp.com/VKCEYUGU-bc675619-37fc-44a5-a5ef-2ebfafdef02d/8ec3a59d-35f8-44aa-9ba3-166cce564194.svg"),
    url("https://vkceyugu.cdn.bspapp.com/VKCEYUGU-bc675619-37fc-44a5-a5ef-2ebfafdef02d/05d04fac-5900-4adf-9cbe-71d4e7d74e95.svg");
  background-repeat: no-repeat;
  background-size: 30vh 30vh, 20vh 20vh;
  background-position: right 113%, right -4%;
  background-attachment: fixed;
  box-shadow: 10px;
  box-sizing: border-box;
  z-index: -1;
  .left {
    width: 260px;
    min-width: 260px;
    max-height: min-content;
    height: 100%;
    min-height: 100vh;
    background: rgba(60, 60, 67, 0.03);
    text-align: left;
    border-right: 1px solid rgba(0, 0, 0, 0.1);
    padding: 15px 20px;
    position: relative;
  }
  .right {
    flex: 1;
    overflow: auto;
  }
  .logo {
    height: 45px;
    min-height: 35px;
    max-height: 80px;
    background: transparent;
    border-radius: 0;
    filter: var(--img-primary);
    cursor: pointer;
    text-decoration: none;
    margin-bottom: 30px;
    // aspect-ratio: 1/1;
  }
}
</style>
