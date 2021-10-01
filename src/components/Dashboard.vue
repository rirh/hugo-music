<template>
  <div class="wapper" @click="handle_close_dashboard">
    <div class="left"><img class="pic" alt="" :src="detail.picUrl" /></div>
    <div class="right">
      <!-- {{ detail.lyric }} -->
      <h1>
        {{ detail.name }}
      </h1>
      <div>
        <strong class="al-name" :title="detail.al_name">
          专辑： {{ detail.al_name }}
        </strong>
        <strong class="ar-name" :title="detail.ar_name">
          歌手：{{ detail.ar_name }}</strong
        >
      </div>
      <ul class="lyric-wapper">
        <li
          :id="`lyric-${Object.keys(detail.lyric || {})[i]}`"
          v-for="(lyric, i) in Object.values(detail.lyric || {})"
          :key="i"
          :style="{
            color:
              detail.lyric_arr_lyric[i].includes(to_time(current_progress)) &&
              '#fff'
          }"
        >
          {{ lyric }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { computed, watch } from "vue";
// import play from "@/assets/image/play.svg";
// import pause from "@/assets/image/pause.svg";
import { useStore } from "vuex";
const store = useStore();
const handle_close_dashboard = () => {
  store.commit("update_dashboard_open", false);
};

// const current_duration = computed(() => store.state.sound.current_duration);
const current_progress = computed(() => store.state.sound.current_progress);
// const current_state = computed(() => store.state.sound.current_state);
const current_id = computed(() => store.state.sound.current_id);
const play_list = computed(() => store.state.sound.play_list);
// const percentage = computed(() => {
//   let result = 0;
//   result = Math.floor((current_progress.value / current_duration.value) * 100);
//   return result;
// });
// const emit = defineEmits(["on-open-dashbord"]);
// const handle_open_dashbord = () => {
//   emit("on-open-dashbord");
// };

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
    el.scrollIntoView({ behavior: "smooth" });
  }
});

const to_time = val => {
  const m = `${Math.floor((val / 60) % 60)}`.padStart(2, "0"),
    s = `${Math.floor(val % 60)}`.padStart(2, "0");
  return `${m}:${s}`;
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
    display: grid;
    place-items: center;
    width: 45vw;
    .pic {
      height: 40vh;
    }
  }
  .right {
    width: 55vw;
    color: #f2f2f2;

    .lyric-wapper {
      height: 60vh;
      overflow: auto;
      // margin: 0;
      padding: 0;
      margin-top: 50px;
      li {
        list-style-type: none;
        height: 50px;
        line-height: 50px;
        font-weight: bold;
        font-size: 24px;
        margin: 0;
        padding: 0;
        color: #999;
      }
    }
  }
}
</style>
