<template>
  <div
    v-show="loading"
    class="fm"
    :style="{ background: style.background }"
    data-theme="dark"
  >
    <Image class="cover" :src="url" @load="handle_load_back" />
    <div class="right-part">
      <div class="info">
        <div class="title" :style="{ color: style.text_color }">{{ name }}</div>
        <div class="artist" :style="{ color: style.text_color }">
          {{ desc }}
        </div>
      </div>
      <div class="controls">
        <div class="buttons">
          <button class="play-button button-icon " title="不喜欢"></button>
          <button
            class="play-button button-icon "
            @click="handle_play"
          ></button>
          <button
            @click="handle_next"
            class="play-button button-icon "
          ></button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, ref, toRefs, defineEmits } from "vue";
import rgbaster from "rgbaster";
import Image from "@/components/Image";
const style = ref({
  background: "#fff"
});
const loading = ref(false);
const props = defineProps({
  url: String,
  name: String,
  desc: String
});
const { url } = toRefs(props);
const emit = defineEmits(["on-play", "on-next"]);
const handle_next = () => emit("on-next");
const handle_play = () => emit("on-play");
const handle_load_back = () => {
  // setTimeout(() => {
  rgbaster(
    url.value, // 图片地址
    {
      ignore: ["rgb(255,255,255)", "rgb(0,0,0)"], // 要忽略识别的颜色
      scale: 0.6 // 查询时缩小图片，降低精度。换取识别速度提高
    }
  ).then(response => {
    const [primary, success] = response;
    style.value = {
      background: `linear-gradient(to top left,${primary.color}, ${success.color})`,
      text_color:
        primary.color
          .replace(new RegExp(/[rgb()]/g), ",")
          .split(",")
          .reduce((e, c) => (c.length ? e + "," + (255 - Number(c)) : e))
          .replace(",", "rgb(") + ")"
    };
    loading.value = true;
  });
  // }, 100);
};
</script>

<style lang="scss" scoped>
.fm {
  padding: 1rem;
  border-radius: 1rem;
  display: flex;
  height: 198px;
  box-sizing: border-box;
  border: 1px solid rgba($color: #000000, $alpha: 0.1);
}
.cover {
  height: 100%;
  clip-path: border-box;
  border-radius: 0.75rem;
  margin-right: 1.2rem;
  cursor: pointer;
  user-select: none;
}
.right-part {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  color: var(--color-text);
  width: 100%;
  .title {
    font-size: 1.6rem;
    font-weight: 600;
    margin-bottom: 0.6rem;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
    word-break: break-all;
  }
  .artist {
    opacity: 0.68;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
    word-break: break-all;
  }
  .controls {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    margin-left: -0.4rem;
    .buttons {
      display: flex;
    }
    .button-icon {
      margin: 0 8px 0 0;
      backdrop-filter: blur(8px);
      border: 1px solid rgba(255, 255, 255, 0.08);
      background: rgba(255, 255, 255, 0.14);
      border-radius: 50%;
      padding: 10px;
      display: flex;
      justify-content: center;
      align-items: center;
      &:hover {
        background: rgba(255, 255, 255, 0.44);
      }
      &:active {
        transform: scale(0.94);
      }
    }

    .svg-icon {
      width: 24px;
      height: 24px;
    }
    .svg-icon#thumbs-down {
      width: 22px;
      height: 22px;
    }
    .card-name {
      font-size: 1rem;
      opacity: 0.18;
      display: flex;
      align-items: center;
      font-weight: 600;
      user-select: none;
      .svg-icon {
        width: 18px;
        height: 18px;
        margin-right: 6px;
      }
    }
  }
}
</style>
