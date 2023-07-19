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
        @mouseenter="handle_load_video"
        :src="image"
        alt=""
      />
    </div>
    <div>
      <div class="title" :title="name">{{ name }}</div>
      <div class="auth" :title="desc">{{ desc }}</div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, ref, defineEmits, reactive } from "vue";
import { getVideoUrl } from "@/api";
import Image from "@/components/Image";

const _props = defineProps({
  name: String,
  image: String,
  desc: String,
  id: Number,
});
const props = reactive(_props);
const current_url = ref(null);
const current_urls = reactive({});
const emit = defineEmits(["on-play"]);
const handle_play = () => emit("on-play", current_url.value);
const handle_load_video = async () => {
  if (!current_urls[props.id]) {
    const { urls, code } = await getVideoUrl(props.id);
    if (code === 200) {
      const url = urls[0]?.url || "";
      if (url) {
        current_urls[props.id] = url;
        if (url !== current_url.value) current_url.value = url;
      }
    }
  } else {
    current_url.value = current_urls[props.id];
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
      object-fit: cover;
      object-position: left -30px;
      &:hover {
        transform: scale(2.2);
        transform-origin: center;
        object-position: center;
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
