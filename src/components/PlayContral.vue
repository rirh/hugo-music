<template>
  <transition
    name="slide"
    leave-active-class="animate__animated animate__fadeOutDown"
    enter-active-class="animate__animated animate__fadeInUp"
  >
    <div
      @click="handle_open_dashbord"
      v-if="detail.ar_name"
      class="play-contral"
    >
      <div class="container" type="flex" align="middle">
        <div class="pic">
          <Image class="img" alt="" :src="detail.picUrl" />
          <div class="contal" @click.stop="handle_toggle_play">
            <span> </span>
            <svg-icon
              class="play"
              :icon-class="current_state !== 'play' ? 'play' : 'pause'"
            />
          </div>
        </div>
        <div class="con">
          <div class="title" v-show="detail.name">
            <span class="text-wrap">
              {{ detail.name }}
            </span>
            <strong class="lyric"> {{ detail.lyric }}</strong>
          </div>
          <transition name="fade">
            <div v-show="detail.al_name" class="artiles">
              <span class="al-name" :title="detail.al_name">
                专辑： <span>{{ detail.al_name }}</span>
              </span>
              <span class="ar-name" :title="detail.ar_name">
                歌手： <span>{{ detail.ar_name }}</span>
              </span>
            </div>
          </transition>
        </div>
      </div>
      <div class="pro">
        <span>{{ to_time(current_progress) }}</span> /
        <span>{{ to_time(current_duration) }}</span>
      </div>
      <div class="action">
        <button class="play-button" @click.stop="handle_change_mode">
          <svg-icon :icon-class="enModeToIcon(current_mode)" />
        </button>
        <button class="play-button" @click.stop="goNextList">
          <svg-icon icon-class="list" />
        </button>
        <button class="play-button" @click.stop="goNextSong">
          <svg-icon icon-class="next" />
        </button>
      </div>
      <div class="progress" :style="{ '--percent': percentage }"></div>
    </div>
  </transition>
</template>

<script setup>
import { computed, watch, defineEmits } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { enModeToIcon } from "@/utils";
import Image from "@/components/Image";
import Button from "@/components/Button";

const store = useStore();
const router = useRouter();
const current_mode_options = computed(
  () => store.state.sound.current_mode_options
);

const current_duration = computed(() => store.state.sound.current_duration);
const current_progress = computed(() => store.state.sound.current_progress);
const current_state = computed(() => store.state.sound.current_state);
const current_mode = computed(() => store.state.sound.current_mode);

const current_id = computed(() => store.state.sound.current_id);
const play_list = computed(() => store.state.sound.play_list);
const percentage = computed(() => {
  let result = 0;
  result = Math.floor((current_progress.value / current_duration.value) * 100);
  return result;
});
const emit = defineEmits(["on-open-dashbord"]);
const handle_open_dashbord = () => {
  emit("on-open-dashbord");
};

let temp_lyric = "";
watch(current_id, () => {
  temp_lyric = "";
});
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
        const lyric = lyr.split("\n");
        let lyric_result = {};
        lyric.forEach(lyri => {
          const [time, value] = lyri.split("]");
          let key = time.substr(1).split(".");
          key.splice(-1, 1);
          lyric_result[key.join(".")] = value;
        });
        const progress = to_time(current_progress.value);
        temp_lyric = lyric_result[progress] || temp_lyric;
        result.lyric = temp_lyric;
      }
    }
  }
  return result;
});

const to_time = val => {
  const m = `${Math.floor((val / 60) % 60)}`.padStart(2, "0"),
    s = `${Math.floor(val % 60)}`.padStart(2, "0");
  return `${m}:${s}`;
};

const handle_toggle_play = () => {
  store.dispatch("toggle_play");
};
const goNextList = () => {
  router.push("/next");
};
const goNextSong = () => {
  store.dispatch("next").then(() => {
    console.log("done!");
  });
};

const handle_change_mode = () => {
  const mode = current_mode.value;
  const options = current_mode_options.value;
  const index = options.findIndex(it => it === mode);
  const next_mode = options[index + 1] || options[0];
  store.commit("update_current_mode", next_mode);
};
// const handle_seek_value = val => {
//   store.dispatch("seek", val);
// };
</script>

<style lang="scss" scoped>
.play-contral {
  min-height: 100px;
  height: 8vw;
  width: calc(100% - 295px);
  position: fixed;
  bottom: 0;
  right: 0;
  background-color: black;
  overflow: hidden;
  z-index: 2;
  .container {
    position: relative;
    width: 100%;
    display: flex;
    align-items: center;
    height: 100%;

    .pic {
      position: relative;
      .img {
        height: 4vw;
        width: 4vw;
        min-height: 60px;
        min-width: 60px;
        border-radius: 5px;
        margin: 0 10px;
        border: 1px solid white;
        filter: brightness(75%);
      }
    }
    .con {
      flex: 1;
      .title {
        font-size: 18px;
        color: white;
        font-weight: bold;
        margin-bottom: 5px;
        text-align: left;
        opacity: 0.88;
        overflow: hidden;
        white-space: nowrap;
        display: flex;
        align-items: center;
        .lyric {
          margin-left: 0px;
          font-size: 26px;
          opacity: 0.9;
          margin-left: 10px;
        }
      }
      .artiles {
        font-size: 12px;
        color: #999;
        font-weight: bold;
        text-align: left;

        .ar-name {
          display: inline-block; /*内联对象需加*/
          min-width: 100px;
          width: 20vw;
          word-break: keep-all; /* 不换行 */
          white-space: nowrap; /* 不换行 */
          overflow: hidden; /* 内容超出宽度时隐藏超出部分的内容 */
          text-overflow: ellipsis; /* 当对象内文本溢出时显示省略标记(...) ；需与overflow:hidden;一起使用。*/
          span {
            padding: 10px;
            cursor: pointer;
            opacity: 0.6;
            border-radius: 0.75em;
          }
          span:hover {
            background-color: hsla(0, 0%, 100%, 0.15);
            color: #fff;
            opacity: 0.8;
          }
          span:active {
            transform: scale(0.92);
          }
        }
        .al-name {
          display: inline-block; /*内联对象需加*/
          min-width: 100px;
          width: 20vw;
          word-break: keep-all; /* 不换行 */
          white-space: nowrap; /* 不换行 */
          overflow: hidden; /* 内容超出宽度时隐藏超出部分的内容 */
          text-overflow: ellipsis; /* 当对象内文本溢出时显示省略标记(...) ；需与overflow:hidden;一起使用。*/
          span {
            padding: 10px;
            cursor: pointer;
            opacity: 0.6;
            border-radius: 0.75em;
          }
          span:hover {
            background-color: hsla(0, 0%, 100%, 0.15);
            color: #fff;
            opacity: 0.8;
          }
          span:active {
            transform: scale(0.92);
          }
        }
      }
      @media screen and (min-width: 750px) {
        .title {
          font-size: 22px;
        }
        .artiles {
          font-size: 14px;
        }
      }
    }
    .contal {
      display: grid;
      place-items: center;
      border-radius: 50%;
      align-self: center;
      position: absolute;
      z-index: 1;
      left: 50%;
      top: 50%;
      backdrop-filter: blur(8px);
      border: 1px solid rgba(206, 126, 126, 0.08);
      border-radius: 50%;
      padding: 10px;
      transform: translate(-50%, -50%);
      .play {
        height: 1vw;
        width: 1vw;
        color: #fff;
      }
      img {
        min-height: 40px;
        min-width: 40px;
        height: 2vw;
        width: 2vw;
        color: white;
        opacity: 1;
        transition: all 0.3s;
        border-radius: 50%;
      }
    }
    .contal:hover {
      background: rgba(255, 255, 255, 0.14);
    }
    .contal:active .play {
      transform: scale(0.92);
    }
  }
  .pro {
    position: absolute;
    right: 0;
    top: 0;
    color: #999;
    padding: 10px;
    font-size: 12px;
    font-weight: bold;
  }
  .action {
    position: absolute;
    right: 0;
    bottom: 20px;
    display: flex;
    .play-button {
      padding-left: 1px;
    }
  }

  .progress {
    width: 100%;
    height: 3px;
    margin: 0;
    background-color: #000;
    font-size: 12px;
    position: absolute;
    top: 0;
    left: 0;
  }
  .progress::before {
    position: absolute;
    counter-reset: percent var(--percent);
    content: " ";
    left: 0;
    display: inline-block;
    width: calc(100% * var(--percent) / 100);
    max-width: 100%;
    height: inherit;
    text-align: left;
    background-color: #fff;
    transition: width 3s;
    border-radius: 3px;
  }
  @keyframes progress {
    from {
      width: 0;
    }

    to {
      width: calc(100% * var(--percent) / 100);
    }
  }
}

.text-wrap {
  display: block;
  white-space: pre;
  width: fit-content;
}

@keyframes text-wrap {
  75% {
    transform: translate3d(-51.5%, 0, 0);
  }

  100% {
    transform: translate3d(-51.5%, 0, 0);
  }
}

@media only screen and (max-width: 800px) {
  .lyric {
    display: none;
  }
  .text-wrap {
    animation: text-wrap var(--duration-text-wrap) infinite;
  }
}
</style>
