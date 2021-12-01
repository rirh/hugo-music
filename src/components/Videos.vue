<template>
  <div class="wapper">
    <div class="mvs" @click="handle_play">
      <video
        v-if="current_url"
        @mouseleave="current_url = null"
        class="video"
        :src="current_url"
        autoplay
        muted
      ></video>
      <Image
        v-else
        class="img"
        @mouseenter="handle_load_video(item)"
        :src="item.coverUrl"
        alt=""
      />
    </div>
    <div>
      <div class="title" :title="item.title">{{ item.title }}</div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, toRefs, ref, defineEmits } from "vue";
import { getVideoUrl } from "@/api";
import Image from "@/components/Image";

const props = defineProps({
  item: Object
});
const { item } = toRefs(props);
const current_url = ref(null);

const emit = defineEmits(["on-play"]);
const handle_play = () => {
  emit("on-play", item);
};
const handle_load_video = async item => {
  const { urls: data, code } = await getVideoUrl(item.vid);
  if (code === 200) {
    const url = data[0].url;
    if (url && url !== current_url.value) current_url.value = url;
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
