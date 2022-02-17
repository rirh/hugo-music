
<template>
  <div class="app-container" :class="{ drag: is_electron }">
    <div class="left" :style="{ 'padding-top': is_electron ? '30px' : '15px' }">
      <Link to="/">
        <Image
          class="logo"
          alt="logo"
          src="https://6372-crypto2server-576164-1302901174.tcb.qcloud.la/z-org-logos/logo-512x160.png"
        />
      </Link>
      <NavHistory />
      <SearchBar />
      <Link class="setting" to="/settings">
        <svg-icon class="icon" icon-class="settings" />
      </Link>
    </div>
    <div class="right">
      <router-view v-slot="{ Component }">
        <transition
          enter-active-class="animate__animated animate__fadeIn"
          leave-active-class="animate__animated animate__fadeOut"
        >
          <!-- <keep-alive> -->
          <component :is="Component" />
          <!-- </keep-alive> -->
        </transition>
      </router-view>
      <CopyRigth />
      <PlayerBar @on-open-dashbord="handle_open_dashbord" />
    </div>
  </div>
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
import PlayerBar from "@/components/PlayerBar.vue";
import Image from "@/components/Image";
import CopyRigth from "@/components/CopyRigth";
import NavHistory from "@/components/NavHistory";
import SearchBar from "@/components/SearchBar";
import Link from "@/components/Link";

import Dashboard from "@/components/Dashboard.vue";
document.title = "Z ORG | MUSIC";

const store = useStore();
const is_electron = ref( import.meta.env.IS_ELECTRON || false);
const dashboard_open = computed(() => store.state.sound.dashboard_open);

const handle_open_dashbord = () => {
  store.commit("update_dashboard_open", true);
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
  box-sizing: border-box;
  z-index: -1;
  .left {
    width: 295px;
    min-width: 295px;
    max-height: min-content;
    height: 100%;
    min-height: 100vh;
    background: var(--color-primary);
    text-align: left;
    border-right: 1px solid rgba(var(--color-hover-primary-rgb), 0.1);
    padding: 15px 20px;
    position: relative;
    box-sizing: border-box;
    .setting {
      position: absolute;
      left: 20px;
      bottom: 20px;

      .icon {
        color: #666;
        height: 24px;
        width: 24px;
        transition: all 0.2s;
      }
      .icon:hover {
        color: var(--color-text);
        transform: scale(1.1);
      }
      .icon:active {
        transform: scale(0.85);
      }
    }
  }
  .right {
    flex: 1;
    overflow: auto;
    position: relative;
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
