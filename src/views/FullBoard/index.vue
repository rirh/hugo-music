<style lang="less" scoped>
.wapper {
  height: 100vh;
  width: 100vw;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--tagBg);

  &-menu:hover {
    font-weight: bold;
  }
  &-menu {
    position: absolute;
    left: 5px;
    top: 10px;
    display: flex;
    width: 60px;
    align-content: center;
    justify-content: space-around;
    &-tips {
      height: 13px;
      width: 13px;
      border-radius: 50%;
      border: 1px solid #c24d48;
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 2;
    }

    &-close {
      background-color: #fc605c;
    }
    &-min {
      background-color: #fdbc40;
    }
    &-zoom {
      background-color: #33c849;
    }
  }
  .previous {
    position: absolute;
    left: 0;
    top: 46vh;
    height: 8vh;
    width: 5vw;

    background-color: var(--tipsColor);
    border-bottom-right-radius: 8vh;
    border-top-right-radius: 8vh;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 42px;
    color: white;
    border: 1px solid var(--line);
    opacity: 0.8;
  }
  .next {
    position: absolute;
    right: 0;
    top: 46vh;
    height: 8vh;
    width: 5vw;
    background-color: var(--tipsColor);
    border-bottom-left-radius: 8vh;
    border-top-left-radius: 8vh;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 42px;
    color: white;
    border: 1px solid var(--line);
    opacity: 0.8;
  }
  .con {
    height: 100vh;
    position: relative;
    width: 500px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-direction: column;
    .playneedle {
      position: absolute;
      top: -15px;
      left: 182px;
      transform: scale(0.6) rotate(-36deg);
      transform-origin: 15px 15px;
      z-index: 1;
      will-change: transform;
    }

    .playneedle-in {
      animation: roate-in 0.8s forwards;
    }

    .playneedle-out {
      animation: roate-out 0.8s forwards;
    }
    @keyframes roate-in {
      0% {
        transform: scale(0.6) rotate(-45deg);
      }
      100% {
        transform: scale(0.6) rotate(-10deg);
      }
    }
    @keyframes roate-out {
      0% {
        transform: scale(0.6) rotate(-10deg);
      }
      100% {
        transform: scale(0.6) rotate(-45deg);
      }
    }
    .circletrow {
      background-image: url(/img/coverall.6cb90dbc.png);
      background-position: -521px 916px;
      text-align: left;
      position: relative;
      height: 205px;
      width: 205px;
      transform: scale(2.2);
      margin-top: 224px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .roate {
      animation: circle 25s infinite linear;
      -webkit-animation: circle 25s infinite linear;
    }
    @keyframes circle {
      0% {
        transform: scale(2.2) rotate(0deg);
      }
      100% {
        transform: scale(2.2) rotate(360deg);
      }
    }
    .cover {
      margin-top: 3px;
    }
    .play {
      position: absolute;
      height: 295.4px;
      width: 295.4px;
      background-color: var(--tagBg);
      color: white;
      font-size: 100px;
      border-radius: 50%;
      left: 104px;
      top: 179px;
      line-height: 295.4px;
      text-align: center;
      opacity: 0;
      will-change: opacity;
      cursor: pointer;
    }
    .panel {
      margin-top: 140px;
      color: white;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      .name {
        font-size: 30px;
        font-weight: bold;
      }
      .lyrics {
        height: 155px;
        // border: 1px solid var(--line);
        width: 500px;
        overflow: scroll;
        padding-top: 10px;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        flex-direction: column;
        &-line {
          font-size: 20px;
          line-height: 30px;
        }
      }
      .cl {
        margin-top: 10px;
        display: flex;
        align-content: center;
        justify-content: space-around;
        width: 70%;
        span {
          height: 60px;
          width: 60px;
          background-color: var(--tipsColor);
          border: 1px solid var(--line);
          color: white;
          border-radius: 50%;
          //   display: flex;
          //   justify-content: center;
          //   align-content: center;
          font-size: 30px;
          line-height: 60px;
          text-align: center;
        }
      }
    }
  }
}
.play:hover {
  opacity: 0.8 !important;
}
</style>

<template>
  <div class="wapper">
    <div class="wapper-menu">
      <span
        @click="handleMenu('close')"
        :class="{'focus':focus}"
        class="wapper-menu-tips wapper-menu-close pointer"
      >
        <!-- <strong>x</strong> -->
      </span>
      <span
        @click="handleMenu('min')"
        :class="{'focus':focus}"
        class="wapper-menu-tips wapper-menu-min pointer"
      >
        <!-- <strong>+</strong> -->
      </span>
      <span
        @click="handleMenu('zoom')"
        :class="{'focus':focus}"
        class="wapper-menu-tips wapper-menu-zoom pointer"
      >
        <!-- <strong>🤓</strong> -->
      </span>
    </div>
    <div class="previous">
      <AIconfont class="music-control-previous" @click="handlePrev" type="icon-skip-previous" />
    </div>
    <div class="next">
      <AIconfont class="music-control-next" @click="handleNext" type="icon-skip-next" />
    </div>
    <div class="con">
      <img
        :class="{'playneedle-in':$store.state.music.state==='playing','playneedle-out':$store.state.music.state!=='playing'}"
        class="playneedle"
        src="../../assets/play_needle.png"
        alt
      />
      <div class="circletrow roate" ref="roate">
        <a-avatar :size="132" class="cover" :src="$store.state.music.data.image" alt />
      </div>

      <div class="play" @click="handlePlay">
        <AIconfont v-show="$store.state.music.state!=='playing'" type="icon-play" />
        <AIconfont v-show="$store.state.music.state==='playing'" type="icon-pause" />
      </div>
      <div class="panel">
        {{$store.state.music.state}}
        <div
          class="name"
        >{{$store.state.music.data.name?`${$store.state.music.data.name}-`:''}}{{$store.state.music.data.auth}}</div>
        <div class="lyrics">
          <strong
            class="lyrics-line"
            v-for="(item,index) in parseLyric($store.state.music.lyric&&$store.state.music.lyric.lrc&&$store.state.music.lyric.lrc.lyric)"
            :key="index"
            :style="highLightLyric(item,index)"
          >{{item.contant}}</strong>
        </div>
        <div class="cl">
          <span>
            <AIconfont
              :style="{
              'margin-top':'5px',
              color:$store.state.music.like?'var(--red)':''
            }"
              :type="$store.state.music.like?'icon-heart':'icon-heart-outline'"
            />
          </span>
          <span>
            <AIconfont type="icon-play" />
          </span>
          <span>
            <AIconfont type="icon-play" />
          </span>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import { HAVE_BLUR, HAVE_FOCUS } from '@/constant/ipc';
import { parseLyric } from '@/util/filters';

@Component({})
export default class HelloWorld extends Vue {
  @Prop() public data: any;
  public focus = false;
  public img = '';
  public mounted() {
            const {ipcRenderer, remote} = require('electron');

            ipcRenderer.on(HAVE_BLUR, () => {
      this.focus = true;
    });
            ipcRenderer.on(HAVE_FOCUS, () => {
      this.focus = false;
    });
  }
  @Watch('$store.state.music', { deep: true })
  public handleChange(params: any) {
    const roateDom: any = this.$refs.roate;
    if (!params) {
      return;
    }
    if (params.state === 'playing') {
      roateDom.style.webkitAnimationPlayState = 'running';
    } else {
      roateDom.style.webkitAnimationPlayState = 'paused';
    }
  }
  public parseLyric = (str: any) => parseLyric(str);
  public highLightLyric(item: any, index: any) {
    let result = {};
    const cursor = this.$store.state.music.cursor;
    // const lyrics: any = this.$refs.lyrics;
    const filter = this.parseLyric(
      this.$store.state.music.lyric.lrc.lyric,
    ).filter((e: any) => {
      return cursor > e.time;
    });
    // if (filter.length > 9 && !this.isPress) {
    //   console.log(21 * (filter.length - 4));

    //   lyrics.scrollTop = 21 * (filter.length - 4);
    // }

    const tempTime = filter[filter.length - 2];
    if (tempTime) {
      if (item.time === tempTime.time) {
        result = {
          color: 'var(--black)',
        };
      }
    }
    return result;
  }
  public handlePrev() {
    this.$store.state.music.state = 'playing';
  }
  public handleNext() {
    this.$store.state.music.state = 'stop';
  }
  public handlePlay() {
    let state = this.$store.state.music.state;
    if (state === 'playing') {
      state = 'pause';
    } else {
      state = 'pause';
    }
    this.$store.commit('update_music_state', state);
  }

  public handleMenu(key: any) {
    // remote.getCurrentWindow().maximize();
    // remote.getCurrentWindow().minimize();
    // remote.getCurrentWindow().unmaximize();
    // remote.getCurrentWindow().restore();
            const {ipcRenderer, remote} = require('electron');

            const mainWindow = remote.getCurrentWindow();
            const build: any = {
      close: () => {
        // ipcRenderer.send(MAIN_CLOSE);
        if (mainWindow.isFullScreen()) {
          mainWindow.setFullScreen(false);
        }
        mainWindow.close();
      },
      min: () => {
        // 在全屏模式下点击缩小 先退出全屏模式然后会打开
        // ipcRenderer.send(MAIN_MIN);
        if (mainWindow.isFullScreen()) {
          mainWindow.setFullScreen(false);
          mainWindow.minimize();
        } else {
          mainWindow.minimize();
        }
        //
      },
      zoom: () => {
        if (mainWindow.isFullScreen()) {
          mainWindow.setFullScreen(false);
        } else {
          mainWindow.setFullScreen(true);
          this.$router.push('/fullboard');
        }
      },
    };
            build[key]();
            this.$router.back();
  }
}
</script>