<template>
  <router-view />
  <transition name="slide-up">
    <PlayCon v-if="Object.keys(play_list).length" />
  </transition>
</template>
<script setup>
import { computed } from "vue";
import { useStore } from "vuex";
import PlayCon from "@/views/home/components/PlayContral.vue";
const store = useStore();

const play_list = computed(() => store.state.sound.play_list);
</script>
