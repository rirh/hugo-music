<template>
  <div
    v-show="loading"
    class="fm"
    :style="{ background: style.background }"
    data-theme="dark"
  >
    <div class="cover">
      <Image class="cover" :src="url" @load="handle_load_back" />
    </div>
    <div class="right-part">
      <div class="info">
        <div class="title" :style="{ color: style.text_color }">{{ name }}</div>
        <div class="artist" :style="{ color: style.text_color }">
          {{ desc }}
        </div>
      </div>
      <div class="controls">
        <div class="buttons">
          <button
            :style="{ 'border-color': style.text_color }"
            class="play-button button-icon "
            @click="handle_play"
          >
            <Spinner :color="style.text_color" v-if="loading_play" />
            <svg-icon
              v-else
              :style="{ color: style.text_color }"
              class="svg-icon"
              icon-class="play"
            />
          </button>
          <button
            :style="{ 'border-color': style.text_color }"
            @click="handle_next"
            class="play-button button-icon "
          >
            <Spinner :color="style.text_color" v-if="loading_next" />
            <svg-icon
              v-else
              :style="{ color: style.text_color }"
              class="svg-icon"
              icon-class="next"
            />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {
  defineProps,
  ref,
  toRefs,
  defineEmits,
  computed,
  watch,
  nextTick
} from "vue";
import { useStore } from "vuex";
import rgbaster from "rgbaster";
import Image from "@/components/Image";
import Spinner from "@/components/Spinner";
const store = useStore();
const style = ref({
  background: "#fff"
});
const loading = ref(false);
const loading_play = ref(false);
const loading_next = ref(false);
const current_state = computed(() => store.state.sound.current_state);

const props = defineProps({
  url: String,
  name: String,
  desc: String
});
const { url } = toRefs(props);
watch(current_state, state => {
  if (state !== "play") {
    loading_play.value = false;
    loading_next.value = false;
  }
});

const emit = defineEmits(["on-play", "on-next"]);
const handle_next = () => {
  loading_next.value = true;
  emit("on-next");
};
const handle_play = () => {
  loading_play.value = true;
  emit("on-play");
};
const handle_load_back = () => {
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
    nextTick(() => {
      loading.value = true;
    });
  });
};
</script>

<style lang="scss" scoped>
.fm {
  padding: 1rem;
  border-radius: 1rem;
  display: flex;
  height: 198px;
  box-sizing: border-box;
}
.cover {
  height: 100%;
  clip-path: border-box;
  border-radius: 0.75rem;
  margin-right: 1.2rem;
  cursor: pointer;
  user-select: none;
  min-height: 100%;
  min-width: 166px;
  width: auto;
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
      height: 40px;
      width: 40px;
      opacity: 0.65;
      &:hover {
        background: rgba(255, 255, 255, 0.44);
      }
      &:active {
        transform: scale(0.94);
      }
    }

    .svg-icon {
      width: 1.2em;
      height: 1.2em;
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
