<template>
  <div class="nextlist" v-clock>
    <h1 v-if="current_song.id">正在播放</h1>
    <Songs
      :image="current_song.image"
      :name="current_song.name"
      :id="current_song.id"
      :notShowHover="true"
      :desc="current_song.auth"
    />
    <!-- <h1>即将播放</h1> -->
    <!-- <Songs :image="it.image" :name="it.name" :id="it.id" :desc="it.auth" /> -->
    <div class="contal">
      <h1 v-if="list.value.length">播放列表</h1>
      <div>
        <Button
          v-if="list.value.length"
          @click="handle_clear_list"
          class="icon"
          icon-class="clear"
        >
          全部清空</Button
        >
      </div>
    </div>

    <div class="box fr-3" style="gap: 10px 10px">
      <Songs
        v-for="(it, i) in list.value"
        :key="it"
        :image="it.image"
        :name="it.name"
        :id="it.id"
        :desc="it.auth"
      >
        <div class="flex-1">
          <Button
            v-if="current_song.id !== it.id"
            @click="handle_delete_song(it.id, i)"
            class="flex-1-btn"
            icon-class="clear"
            iconButton
          >
          </Button>
        </div>
      </Songs>
    </div>
  </div>
</template>

<script setup>
import { computed, reactive, watchEffect } from "vue";
import { useStore } from "vuex";
import { dtToTime } from "@/utils";
import Songs from "@/components/Songs";
import Button from "@/components/Button";
const store = useStore();
const list = reactive({ value: [] });

watchEffect(() => {
  const play_list = store.state.sound.play_list;
  list.value = Object.keys(play_list).map((key) => {
    const it = play_list[key];
    const image = it?.songs[0]?.al?.picUrl;
    const name = it?.songs[0]?.name;
    const auth = it?.songs[0]?.ar;
    const durt = dtToTime(it?.songs[0]?.dt);
    const id = it.id;
    return {
      image,
      name,
      auth,
      durt,
      id,
    };
  });
  return store.state.sound.play_list;
});

const current_song = computed(() => {
  let result = {};
  const play_list = store.state.sound.play_list;
  const current_id = store.state.sound.current_id;
  const it = play_list[current_id];
  if (it) {
    const image = it?.songs[0]?.al?.picUrl;
    const name = it?.songs[0]?.name;
    const auth = it?.songs[0]?.ar;
    const durt = dtToTime(it?.songs[0]?.dt);
    const id = it.id;
    result = {
      image,
      name,
      auth,
      durt,
      id,
    };
  }
  return result;
});

const handle_clear_list = () => {
  store.dispatch("clear_play_list");
};
const handle_delete_song = (id, i) => {
  list.value.splice(i, 1);
  store.dispatch("delete_play_song", id);
};
</script>

<style lang="scss" scoped>
.nextlist {
  padding: 20px;
  min-height: 100vh;
  .contal {
    display: flex;
    align-items: center;
    justify-content: space-between;
    .icon {
      color: #666;
      font-size: 14px;
    }
  }
}
.flex-1 {
  flex: 1;
  display: flex;
  justify-content: flex-end;
  .flex-1-btn {
    color: #999;
    opacity: 0;
    transition: all 0.2s;
  }
  &:hover .flex-1-btn {
    opacity: 0.9;
  }
}
</style>
