<template>
  <div class="wapper">
    <h1>正在播放</h1>
    <h1>即将播放</h1>
    <h1>播放列表</h1>
    <div v-for="it in list" :key="it">
      {{ it.name }}
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useStore } from "vuex";
const store = useStore();
const play_list = computed(() => store.state.sound.play_list);
const list = computed(() => {
  let result = [];
  result = Object.keys(play_list).map(it => {
    const image = it?.songs[0];
    return {
      image
    };
  });
  return result;
});
</script>

<style lang="scss" scoped>
.wapper {
  padding: 20px;
}
</style>
