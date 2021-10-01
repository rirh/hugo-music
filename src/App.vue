<template>
  <router-view />
  <PlayCon @on-open-dashbord="handle_open_dashbord" />
  <transition
    leave-active-class="animate__animated animate__fadeOutDown"
    enter-active-class="animate__animated animate__fadeInUp"
  >
    <Dashboard v-if="dashboard_open" />
  </transition>
</template>
<script setup>
import { computed } from "vue";
import { useStore } from "vuex";
import PlayCon from "@/views/home/components/PlayContral.vue";
import Dashboard from "@/components/Dashboard.vue";
document.title = "Z ORG | MUSIC";

const store = useStore();

const dashboard_open = computed(() => store.state.sound.dashboard_open);

const handle_open_dashbord = () => {
  store.commit("update_dashboard_open", true);
};
</script>
