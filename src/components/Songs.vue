<template>
  <div class="wapper" :class="[current_id === id && 'active']">
    <div
      :class="[
        index === 3 && 'rank-3',
        index === 2 && 'rank-2',
        index === 1 && 'rank-1'
      ]"
      class="index"
      v-if="index"
    >
      {{ `${index}`.padStart(2, "0") }}
    </div>
    <div class="song" v-if="image" @click="handle_play(id)">
      <Image
        class="image"
        animate="animate__slideInUp"
        :src="image"
        :alt="name"
      />
      <div>
        <Spinner v-if="loading" />
        <svg-icon
          class="play"
          :icon-class="current_id === id ? 'pause' : 'play'"
          alt=""
        />
      </div>
    </div>
    <div class="">
      <div class="title" :title="name">{{ name }}</div>
      <div class="auth" :title="desc">{{ desc }}</div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, computed, ref, watch } from "vue";
import Image from "@/components/Image";
import { useStore } from "vuex";
import Spinner from "@/components/Spinner";
const store = useStore();
const current_id = computed(() => store.state.sound.current_id);
const current_state = computed(() => store.state.sound.current_state);
const loading = ref(false);
watch(current_state, state => {
  if (state !== "play") {
    loading.value = false;
  }
});

defineProps({
  image: String,
  title: String,
  name: String,
  desc: String,
  id: Number,
  index: Number
});
const handle_play = id => {
  if (id) {
    loading.value = true;
    store.dispatch("fetch_song_data", id);
  }
};
</script>

<style lang="scss" scoped>
.wapper {
  display: flex;
  border-radius: 0.5em;
  padding: 10px 15px;
  align-items: center;
  // background-color: #fff;
  cursor: pointer;
  transition: all 200ms;
  width: 100%;
  box-sizing: border-box;
  min-width: 100%;
  .index {
    font-weight: 600;
    font-size: 18px;
    margin: 0 20px 0 0;
    columns: #666;
  }
  .song {
    text-align: center;
    display: flex;
    align-items: center;
    transition: transform 0.3s;
    position: relative;
    margin-right: 10px;

    .image {
      width: 40px;
      border-radius: 0.3em;
      user-select: none;
      aspect-ratio: 1/1;
    }
  }
  .title {
    font-weight: 600;
    line-height: 20px;
    word-break: break-all;
    font-size: 16px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    overflow: hidden;
  }
  .auth {
    font-size: 12px;
    opacity: 0.68;
    line-height: 18px;
    word-break: break-word;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
}
.play {
  opacity: 0;
  position: absolute;
  left: 50%;
  top: 50%;
  width: 0.75em;
  height: 0.75em;
  color: #fff;
  transform: translate(-50%, -50%);
  backdrop-filter: blur(8px);
  background: rgba(255, 255, 255, 0.14);
  padding: 8px;
  border-radius: 50%;
}
.active {
  background: rgba(0, 0, 0, 0.14);
}

.wapper:hover {
  background-color: rgba(60, 60, 67, 0.1);
}

.wapper:hover .play {
  opacity: 0.65;
}

.wapper:active .play {
  transform: translate(-50%, -50%) scale(0.85);
}
.rank-1 {
  // font-size: 0px;
  color: rgba($color: #f00, $alpha: 0.8);
}
.rank-2 {
  // font-size: 19px;
  color: rgba($color: #f00, $alpha: 0.6);
}
.rank-3 {
  color: rgba($color: #f00, $alpha: 0.4);
}
</style>
