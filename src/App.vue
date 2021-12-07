<template>
  <router-view />
</template>
<script setup>
import { onMounted } from "vue";
import { useStore } from "vuex";

const store = useStore();
if ("serviceWorker" in navigator)
  navigator.serviceWorker.register("/service-worker.js").then(reg => {
    // sometime later…
    reg.update();
  });
onMounted(() => {
  store.dispatch("chengeApparance", store.state.settings.appearance);
});
window.addEventListener("visibilitychange", () => {
  if (document.visibilityState === "visible") {
    store.dispatch("chengeApparance", store.state.settings.appearance);
  }
});
</script>
