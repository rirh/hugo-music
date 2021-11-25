<template>
  <div class="wapper" :class="[current_id === id && !notShowHover && 'active']">
    <div
      class="index"
      :class="[
        index === 3 && 'rank-3',
        index === 2 && 'rank-2',
        index === 1 && 'rank-1'
      ]"
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
      <div class="btn-song">
        <Spinner v-if="loading" color="#fafafa" />
        <svg-icon
          v-else
          class="play"
          :icon-class="current_id === id ? 'pause' : 'play'"
          alt=""
        />
      </div>
    </div>
    <div class="">
      <div class="title" :title="name">
        {{ name }}
        <span v-if="subtitle" :title="subtitle">{{ subtitle }}</span>
      </div>
      <div class="auth" :title="artoString(desc)">
        <LinkWithArtists :artisits="desc" />
      </div>
    </div>
    <slot></slot>
  </div>
</template>

<script setup>
import { defineProps, computed, ref } from "vue";
import Image from "@/components/Image";
import { useStore } from "vuex";
import { artoString } from "@/utils";
import Spinner from "@/components/Spinner";
import LinkWithArtists from "@/components/LinkWithArtists";
const store = useStore();
const current_id = computed(() => store.state.sound.current_id);
const loading = ref(false);

defineProps({
  image: String,
  title: String,
  name: String,
  desc: {
    type: Array,
    default: () => []
  },
  id: Number,
  index: Number,
  subtitle: String,
  notShowHover: Boolean
});
const handle_play = id => {
  if (id) {
    loading.value = true;
    store
      .dispatch("fetch_song_data", id)
      .then(() => {
        loading.value = false;
      })
      .catch(() => {
        loading.value = false;
      });
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
    opacity: (0.7);
  }

  .rank-1 {
    // font-size: 0px;
    // color: rgba($color: #000, $alpha: 0.9);
    opacity: (0.9);
  }
  .rank-2 {
    // font-size: 19px;
    // color: rgba($color: #000, $alpha: 0.8);
    opacity: (0.8);
  }
  .rank-3 {
    // color: rgba($color: #000, $alpha: 0.7);
    opacity: (0.7);
  }
  .song {
    text-align: center;
    display: flex;
    align-items: center;
    transition: transform 0.3s;
    position: relative;
    margin-right: 10px;
    .btn-song {
      position: absolute;
      height: 100%;
      width: 100%;
      display: grid;
      place-items: center;
    }

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
    span {
      color: #aeaeae;
      margin-left: 4px;
      font-weight: 600;
    }
  }
  .auth {
    font-size: 12px;
    opacity: 0.68;
    line-height: 18px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    overflow: hidden;
  }
}
.play {
  opacity: 0;
  width: 0.75em;
  height: 0.75em;
  color: #fff;
  backdrop-filter: blur(8px);
  background: rgba(255, 255, 255, 0.14);
  padding: 8px;
  border-radius: 50%;
  transition: all 200ms;
}
.active {
  background: rgba(0, 0, 0, 0.14);
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
.wapper:hover .play {
  opacity: 1;
}
</style>
