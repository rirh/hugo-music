<template>
  <div class="wapper" :style="style">
    <div class="left">
      <div>
        <img
          class="pic"
          crossorigin="Anonymous"
          alt=""
          id="pic"
          :src="detail.picUrl"
        />
      </div>
      <h1 class="title" style="margin-top:30px;opacity: 0.88;">
        {{ detail.name }}
      </h1>
      <div class="title" style="margin-top:10px;opacity: 0.58;">
        <strong class="al-name" :title="detail.al_name">
          专辑： <span class="link">{{ detail.al_name }}</span>
        </strong>
        <strong class="ar-name" :title="detail.ar_name">
          歌手：<span class="link">{{ detail.ar_name }}</span>
        </strong>
      </div>
      <br />
      <div class="slider">
        <span>{{ to_time(current_progress) || "00:00" }}</span>
        <vue3-slider
          v-model="progress"
          width="70%"
          :height="4"
          color="#fff"
          :max="current_duration"
          track-color="rgba(255,255,255,.18)"
          @drag-end="handle_seek"
        />
        <span>{{ to_time(current_duration) }}</span>
      </div>
      <div class="con-contal">
        <div>
          <img src="" alt="" />
        </div>
        <div class="contal" @click.stop="handle_toggle_play">
          <img :src="current_state !== 'play' ? play : pause" alt="" />
        </div>
      </div>
    </div>
    <div class="right">
      <img
        @click.stop="handle_close_dashboard"
        class="close"
        :src="down"
        alt="down"
        @load="handle_load_back"
      />
      <!-- {{ detail.lyric }} -->

      <ul class="lyric-wapper">
        <template
          v-for="(lyric, i) in Object.values(detail.lyric || {})"
          :key="i"
        >
          <li
            v-if="lyric"
            @click="handle_set_seek(detail.lyric_arr_lyric[i])"
            :id="`lyric-${Object.keys(detail.lyric || {})[i]}`"
            class="text"
            :class="{
              load: detail.lyric_arr_lyric[i].includes(
                to_time(current_progress)
              )
            }"
            :style="{}"
          >
            {{ lyric }}
          </li>
        </template>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { computed, watch, ref } from "vue";
import down from "@/assets/image/down.svg";
import vue3Slider from "vue3-slider";
import play from "@/assets/image/play.svg";
import pause from "@/assets/image/pause.svg";
import { useStore } from "vuex";
const store = useStore();
const handle_close_dashboard = () => {
  store.commit("update_dashboard_open", false);
};

const style = ref(null);

const current_duration = computed(() => store.state.sound.current_duration);
const current_progress = computed(() => store.state.sound.current_progress);
const current_state = computed(() => store.state.sound.current_state);
const current_id = computed(() => store.state.sound.current_id);
const play_list = computed(() => store.state.sound.play_list);
const progress = computed({
  get: () => current_progress.value || 0,
  set: () => {}
});
// const percentage = computed(() => {
//   let result = 0;
//   result = Math.floor((current_progress.value / current_duration.value) * 100);
//   return result;
// });
// const emit = defineEmits(["on-open-dashbord"]);
// const handle_open_dashbord = () => {
//   emit("on-open-dashbord");
// };

const handle_load_back = () => {
  // const Vibrant = require("node-vibrant");
  // const Color = require("color");
  // Vibrant.from(detail.value.picUrl, { colorCount: 1 })
  //   .getPalette()
  //   .then(palette => {
  //     const orignColor = Color.rgb(palette.DarkMuted._rgb);
  //     const color = orignColor
  //       .darken(0.1)
  //       .rgb()
  //       .string();
  //     const color2 = orignColor
  //       .lighten(0.28)
  //       .rotate(-30)
  //       .rgb()
  //       .string();
  //     this.background = `linear-gradient(to top left, ${color}, ${color2})`;
  //   });

  setTimeout(() => {
    let myImg = document.getElementById("pic");
    let { r, g, b } = getAverageRGB(myImg);

    style.value = { "background-color": `rgb(${r},${g},${b})` };
  }, 100);
};
const getAverageRGB = imgEl => {
  var blockSize = 5, // only visit every 5 pixels
    defaultRGB = { r: 0, g: 0, b: 0 }, // for non-supporting envs
    canvas = document.createElement("canvas"),
    context = canvas.getContext && canvas.getContext("2d"),
    data,
    width,
    height,
    i = -4,
    length,
    rgb = { r: 0, g: 0, b: 0 },
    count = 0;

  if (!context) {
    return defaultRGB;
  }

  height = canvas.height =
    imgEl.naturalHeight || imgEl.offsetHeight || imgEl.height;
  width = canvas.width = imgEl.naturalWidth || imgEl.offsetWidth || imgEl.width;

  context.drawImage(imgEl, 0, 0);

  try {
    data = context.getImageData(0, 0, width, height);
  } catch (e) {
    /* security error, img on diff domain */
    return defaultRGB;
  }

  length = data.data.length;

  while ((i += blockSize * 4) < length) {
    ++count;
    rgb.r += data.data[i];
    rgb.g += data.data[i + 1];
    rgb.b += data.data[i + 2];
  }

  // ~~ used to floor values
  rgb.r = ~~(rgb.r / count);
  rgb.g = ~~(rgb.g / count);
  rgb.b = ~~(rgb.b / count);

  return rgb;
};

const detail = computed(() => {
  let result = {};
  if (play_list.value[current_id.value]) {
    const song = play_list.value[current_id.value];
    if (song.songs) {
      const [detail] = song.songs;
      result.name = detail.name;
      result.picUrl = detail.al.picUrl;
      result.al_name = detail.al.name;
      result.ar_name = detail.ar.map(e => e.name).join("/");

      const lyr = song?.lrc?.lyric;
      if (lyr) {
        result.origin_lyric = lyr;
        const lyric = lyr.split("\n");
        result.lyric_arr_lyric = lyric;

        let lyric_result = {};
        lyric.forEach(lyri => {
          const [time, value] = lyri.split("]");
          let key = time.substr(1).split(".");
          key.splice(-1, 1);
          lyric_result[key.join(".")] = value;
        });
        result.lyric = lyric_result;
      }
    }
  }
  return result;
});

watch(current_progress, () => {
  const progress = to_time(current_progress.value);
  const times = Object.keys(detail.value.lyric || {});
  if (times.includes(progress)) {
    const el = document.getElementById(`lyric-${progress}`);
    el && el.scrollIntoView({ behavior: "smooth", block: "center" });
  }
});

const to_time = value => {
  if (!value) return "";
  const m = `${Math.floor((value / 60) % 60)}`.padStart(2, "0"),
    s = `${Math.floor(value % 60)}`.padStart(2, "0");
  return `${m}:${s}`;
};
const handle_seek = seek => {
  store.dispatch("seek", seek);
};
const handle_set_seek = row => {
  if (/\[(.*?)\]/g.test(row)) {
    const [, time] = /\[(.*?)\]/g.exec(row);
    if (time) {
      let [m, s] = time.split(":");
      const seek = Number(m) * 60 + Number(s);
      store.dispatch("seek", seek);
    }
  }
  // const [] = p1.substring(1,6)
};
const handle_toggle_play = () => {
  store.dispatch("toggle_play");
};
// const handle_toggle_play = () => {
//   store.dispatch("toggle_play");
// };
// const handle_seek_value = val => {
//   store.dispatch("seek", val);
// };
</script>

<style lang="scss" scoped>
.wapper {
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 2;
  display: flex;
  background-color: var(--color-hover-primary);

  .left {
    width: 60vw;
    color: var(--color-primary);
    text-align: left;
    .title {
      margin: 0 auto;
      text-align: center;
      cursor: pointer;
    }
    .pic {
      margin: 0 auto;
      width: 54vh;
      height: 54vh;
      margin-top: 50px;
      display: block;
      border-radius: 0.75em;
      user-select: none;
      object-fit: cover;
    }
    .slider {
      display: flex;
      align-items: center;
      justify-content: center;
      max-width: 400px;
      margin: 0 auto;
      span {
        font-size: 15px;
        opacity: 0.58;
        min-width: 28px;
        padding: 10px;
      }
    }
    .con-contal {
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .contal {
      padding: 10px;
      display: grid;
      place-items: center;
      border-radius: 50%;
      align-self: flex-end;
      margin: 10px 25px;
      img {
        min-height: 40px;
        min-width: 40px;
        height: 2vw;
        width: 2vw;
        color: #999;
        opacity: 1;
        transition: all 0.3s;
        border-radius: 50%;
        padding: 5px;
      }
      img:hover {
        background-color: hsla(0, 0%, 100%, 0.08);
        color: #fff;
        opacity: 0.8;
      }
      &:active {
        transform: scale(0.92);
      }
    }
  }
  .right {
    width: 40vw;
    color: var(--color-primary);
    .close {
      position: absolute;
      right: 30px;
      top: 30px;
      height: 24px;
      padding: 10px;
      border-radius: 10px;
      opacity: 0.7;

      &:hover {
        color: #fff;
        background-color: hsla(0, 0%, 100%, 0.08);
      }
      &:active {
        transform: scale(0.92);
      }
    }
    .lyric-wapper {
      height: 90vh;
      overflow: auto;
      // margin: 0;
      padding: 0;
      margin-top: 50px;
      li {
        list-style-type: none;
        font-weight: bold;
        padding: 10px 30px;
        margin: 0 40px 0 0px;
        font-size: 24px;
        color: var(--lyric-active-default);
        border-radius: 0.75em;
        cursor: pointer;
        opacity: 0.38;
        transition: all 0.3s;
        &:hover {
          background-color: hsla(0, 0%, 100%, 0.08);
        }
        &:active {
          transform: scale(0.92);
        }
      }
    }
    .lyric-wapper::-webkit-scrollbar {
      display: none;
    }
  }
}
.load {
  color: var(--color-primary) !important;
  font-size: 26px;
  opacity: 1;
}
.link {
  padding: 10px 15px;
  cursor: pointer;
  border-radius: 0.75em;
}
</style>
