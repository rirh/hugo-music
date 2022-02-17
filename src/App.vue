<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import { onMounted } from "vue";
import { useStore } from "vuex";

const store = useStore();
onMounted(() => {
  store.dispatch(
    "chengeApparance",
    store.state.settings.appearance || import.meta.env.VITE_APP_DEFAULT_THEME
  );
});
window.addEventListener("visibilitychange", () => {
  if (document.visibilityState === "visible") {
    store.dispatch(
      "chengeApparance",
      store.state.settings.appearance || import.meta.env.VITE_APP_DEFAULT_THEME
    );
  }
});
</script>

<template>
  <router-view></router-view>
</template>
