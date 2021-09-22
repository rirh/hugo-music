<template>
  <el-row class="play-contral">
    <el-row class="container" type="flex" align="middle">
      <el-avatar class="pic" :src="detail.picUrl"></el-avatar>
      <div class="con">
        <el-row class="title" v-show="detail.name"> {{ detail.name }}</el-row>
        <el-row v-show="detail.al_name" class="artiles">
          <span class="al-name" :title="detail.al_name">
            专辑： {{ detail.al_name }}
          </span>
          <span class="ar-name" :title="detail.ar_name">
            歌手：{{ detail.ar_name }}</span
          >
        </el-row>
      </div>
      <div class="contal" @click="handle_toggle_play">
        <img :src="current_state !== 'play' ? play : pause" alt="" />
      </div>
    </el-row>
    <div class="pro">
      <span>{{ to_time(current_progress) }}</span> /
      <span>{{ to_time(current_duration) }}</span>
    </div>
    <div class="progress" :style="{ '--percent': percentage }"></div>
  </el-row>
</template>

<script setup>
import { computed } from "vue";
import { useStore } from "vuex";
import play from "@/assets/image/play.svg";
import pause from "@/assets/image/pause.svg";
const store = useStore();
const current_duration = computed(() => store.state.sound.current_duration);
const current_progress = computed(() => store.state.sound.current_progress);
const current_state = computed(() => store.state.sound.current_state);
const current_id = computed(() => store.state.sound.current_id);
const play_list = computed(() => store.state.sound.play_list);
const percentage = computed(() => {
  let result = 0;
  result = Math.floor((current_progress.value / current_duration.value) * 100);
  return result;
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
// const handle_seek_value = val => {
//   store.dispatch("seek", val);
// };
</script>

<style lang="scss" scoped>
.play-contral {
  min-height: 100px;
  height: 10vw;
  width: 100%;
  position: fixed;
  bottom: 0;
  left: 0;
  background-color: black;
  .container {
    position: relative;
    width: 100%;
    .pic {
      height: 4vw;
      width: 4vw;
      min-height: 60px;
      min-width: 60px;
      border-radius: 5px;
      margin: 0 10px;
      border: 1px solid white;
    }
    .con {
      flex: 1;
      .title {
        font-size: 18px;
        color: white;
        font-weight: bold;
        margin-bottom: 5px;
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
        }
        .al-name {
          display: inline-block; /*内联对象需加*/
          min-width: 100px;
          width: 20vw;
          word-break: keep-all; /* 不换行 */
          white-space: nowrap; /* 不换行 */
          overflow: hidden; /* 内容超出宽度时隐藏超出部分的内容 */
          text-overflow: ellipsis; /* 当对象内文本溢出时显示省略标记(...) ；需与overflow:hidden;一起使用。*/
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
      padding: 10px;
      background-color: rgba(255, 255, 255, 0.9);
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
      }
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
</style>
