<template>
  <div class="wapper">
    <h1>正在播放</h1>
    <h1>即将播放</h1>
    <h1>播放列表</h1>
    <div v-for="it in list" :key="it">
      <Songs :image="it.image" :name="it.name" :id="it.id" :desc="it.auth" />
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useStore } from "vuex";
import { artoString, dtToTime } from "@/utils";
import Songs from "@/components/Songs";

const store = useStore();
const list = computed(() => {
  let result = [];
  const play_list = store.state.sound.play_list;
  result = Object.keys(play_list).map(key => {
    const it = play_list[key];
    const image = it?.songs[0]?.al?.picUrl;
    const name = it?.songs[0]?.name;
    const auth = artoString(it?.songs[0]?.ar);
    const durt = dtToTime(it?.songs[0]?.dt);
    const id = it.id;
    return {
      image,
      name,
      auth,
      durt,
      id
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
