<template>
  <div class="wapper">
    <div class="mvs">
      <video
        v-if="current_url"
        @mouseleave="current_url = null"
        class="video"
        :src="current_url"
        autoplay
        muted
      ></video>
      <img
        v-else
        class="img"
        @mouseenter="handle_load_video(item)"
        :src="item.cover"
        alt=""
      />
    </div>
    <div>
      <div class="title" :title="item.name">{{ item.name }}</div>
      <div class="auth" :title="auth">{{ auth }}</div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, toRefs, computed, ref } from "vue";
import { getMvUrl } from "@/api";
const props = defineProps({
  item: Object
});
const { item } = toRefs(props);
const current_url = ref(null);
const auth = computed(() => {
  const foo = JSON.parse(JSON.stringify(item.value));
  let result = "";
  if (foo.artists) {
    result = foo.artists.map(e => e.name).toString();
  }
  return result;
});
const handle_load_video = async item => {
  const { data, code } = await getMvUrl(item.id);
  if (code === 200) {
    const url = data.url;
    if (url !== current_url.value) current_url.value = url;
  }
};
</script>

<style lang="scss" scoped>
.wapper {
  display: block;
  .mvs {
    transition: all 0.3s;
    width: 100%;
    overflow: hidden;
    border-radius: 0.75em;
    .video {
      height: 120px;
      width: 100%;
      border-radius: 0.75em;
      transition: all 0.3s;
      user-select: none;
      aspect-ratio: 1/1;
      border: 1px solid rgba(0, 0, 0, 0.04);
      overflow: hidden;
      position: relative;
      cursor: pointer;
    }
    .img {
      height: 120px;
      width: 100%;
      border-radius: 0.75em;
      transition: all 0.3s;

      user-select: none;
      aspect-ratio: 1/1;
      border: 1px solid rgba(0, 0, 0, 0.04);
      overflow: hidden;
      position: relative;
      cursor: pointer;
      &:hover {
        transform: scale(2.2);
        transform-origin: center;
      }
    }
  }
  .title {
    font-weight: 600;
    line-height: 20px;
    word-break: break-all;
    font-size: 16px;
    overflow: hidden;
    text-overflow: ellipsis;
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
</style>
