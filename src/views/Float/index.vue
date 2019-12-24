<style lang="less" scoped>
.wapper {
  display: flex;
  height: 100vh;
  width: 100vw;
  background-color: #f4f4f4;
  border: 1px solid var(--line);
  border-radius: 10px;
  flex-direction: column;
  overflow: hidden;

  .col {
    display: flex;
    justify-content: center;
    align-items: center;
    .icon {
      cursor: pointer;
      color: #b9b1b1;
    }
    // .icon:first-child {
    //   margin-bottom: 5px;
    // }
    .menu {
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: flex-start;
      font-size: 12px;
      height: 100vh;
      box-sizing: border-box;
      padding: 3px 5px;
      -webkit-app-region: drag;
    }
    .image {
      height: 100vh;
      display: flex;
      justify-items: center;
      align-items: center;
      margin-right: 5px;
      -webkit-app-region: drag;
      position: relative;
      .allow {
        position: absolute;
      }
    }
    .con {
      height: 35px;
      flex: 1;
      display: flex;
      flex-direction: column;
      // -webkit-app-region: drag;

      .info {
        display: flex;
        flex: 1;
        -webkit-app-region: drag;
        .tit {
          padding: 3px 0 0 0;
          .name {
            font-size: 12px;
            line-height: 12px;
            color: var(--textcolor);
          }
          .ar {
            // margin-top: 5px;
            padding-top: 3px;
            font-size: 11px;
            line-height: 11px;
            color: #b9b1b1;
          }
        }
      }
      .icons {
        -webkit-app-region: drag;
        flex: 1;
        display: flex;
        justify-content: flex-end;
        align-items: center;

        .icon {
          font-size: 22px;
        }
        .heart {
          font-size: 18px;
          margin-right: 17px;
        }
        .playlist {
          font-size: 20px;
          margin-right: 10px;
        }
        .lyic {
          font-size: 16px;
          margin-right: 10px;
        }
        .volume {
          font-size: 23px;
          margin-right: 2px;
        }
      }
    }
    .con:hover .playcon {
      display: flex;
    }
    .con:hover .tit {
      display: none;
    }

    .playcon {
      height: 31px;
      width: 40vw;
      // paddin g: 8px 0 0 0;

      justify-content: space-evenly;
      align-items: center;
      display: none;
      font-size: 22px;
      color: var(--red);
      .skip-previous {
        color: var(--red);
      }
      .play {
        height: 27px;
        width: 27px;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 50%;
        background-color: var(--btnRed);
        color: white;
        margin: 0 2vw;
        padding: 0 !important;
        font-size: 20px;
        line-height: 0;
        border: none;
      }
      .skip-next {
        color: var(--red);
      }
    }
  }
}

.slider {
  width: 98%;
  // padding: 10px 0;
}

.slider-bar {
  height: 2px;
  position: relative;
  display: block;
  border-radius: 10px;
  background-color: #b9b1b1;
}
.slider:hover .slider-handle {
  opacity: 1;
}
.slider-handle {
  width: 8px;
  height: 8px;
  top: -3px;
  opacity: 0;
  position: absolute;
  border-radius: 50%;
  background-color: var(--red);
  // box-shadow: 0.5px 0.5px 2px 1px rgba(0, 0, 0, 0.32);
  transition: all 0s;
  will-change: transform;
  cursor: pointer;
  z-index: 3;
  transition-duration: 0s;
  left: 0px;
}

.slider-process {
  background-color: var(--red);
  width: 0px;
  height: 2px;
  // padding-right: 8px;
  border-radius: 1px;
}
</style>

<template>
  <div class="wapper">
    <div class="pl"></div>
    <div class="col">
      <div class="menu">
        <AIconfont class="icon" style="margin-bottom:3px" type="icon-close1" @click="handlehide" />
        <AIconfont class="icon" type="icon-application" />
      </div>
      <div class="image">
        <!-- <AIconfont class="allow top" type="icon-chevron-down" /> -->
        <a-avatar class="img" :size="35" shape="square" icon="user" :src="music.image" />
        <!-- <AIconfont class="allow bottom" type="icon-chevron-up" /> -->
      </div>
      <div class="con">
        <div class="info">
          <div class="tit">
            <div class="name">{{music.name}}</div>
            <div class="ar">{{music.auth}}</div>
          </div>
          <div class="playcon">
            <AIconfont class="icon skip-previous" type="icon-skip-previous" />
            <a-button type="primary" class="play" @click="handleStart">
              <transition name="fade" mode="out-in">
                <div>
                  <AIconfont v-if="state!=='playing'" type="icon-play" />
                  <AIconfont v-if="state==='playing'" type="icon-pause" />
                </div>
              </transition>
            </a-button>

            <AIconfont class="icon skip-next" type="icon-skip-next" />
          </div>
          <div class="icons">
            <AIconfont class="icon heart" type="icon-heart" />
            <AIconfont class="icon playlist" type="icon-playlist-play" />
            <span class="icon lyic">词</span>
            <AIconfont class="icon volume" type="icon-volume-low" />
          </div>
        </div>
        <!-- <div class="range" @click="barClick">
          <div class="slider-bar" ref="elem">
            <div class="thumb" :style="{ left: position + 'px' }" @mousedown="dragStart($event, 0)"></div>
            <div class="slider-process" :style="{ width: position + 'px' }"></div>
        </div>-->
        <!-- <input :value="20" id="pro" type="range" min="0" max="100" /> -->
        <!-- </div> -->
        <div class="slider" @click="barClick">
          <div class="slider-bar" ref="elem">
            <div
              class="slider-handle"
              :style="{ left: position + 'px' }"
              @mousedown="dragStart($event, 0)"
            ></div>
            <div class="slider-process" :style="{ width: position + 'px' }"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import { ipcRenderer, remote, BrowserWindow } from 'electron';
import { ACCEPT_STORE } from '@/constant/ipc';
@Component({})
export default class Float extends Vue {
  @Prop() public data: any;
  public state = 'playing';
  public mainwin: any = null;
  public music = {
    image: '',
    name: '',
    auth: '',
  };
  public position = 100;
  public dragging = false;
  public width: any = null;
  public offset: any = null;
  public mounted() {
    ipcRenderer.on(ACCEPT_STORE, (event: any, arg: any) => {
      // console.log('pong2', arg);
      if (arg.win) { this.mainwin = arg.win; }
      if (arg && arg.data) {
        this.asyncMusic(arg.data);
      } // prints "pong"
    });
    this.$nextTick(function() {
      this.width = (this as any).$refs.elem.offsetWidth;
      this.offset = (this as any).$refs.elem.getBoundingClientRect().left;
      this.bindListener();
    });
  }
  public handleStart() {
    if (this.state === 'playing') {
      this.state = 'stop';
    } else {
      this.state = 'playing';
    }
  }
  public handlehide() {
    const win = remote.getCurrentWindow();
    // debugger;
    if (win) {
      const main = remote.BrowserWindow.fromId(this.mainwin);
      main.show();
      win.close();
    }
  }

  public asyncMusic({ id, image, name, auth, duration }: any) {
    this.music.image = image;
    this.music.name = name;
    this.music.auth = auth;
  }

  public bindListener() {
    document.addEventListener('mousemove', this.drag);
    document.addEventListener('mouseup', this.dragEnd);
  }
  public getPosition(ev: any) {
    return ev.clientX - this.offset;
  }
  public setPosition(pos: any) {
    this.position = pos;
  }
  public barClick(ev: any) {
    const pos = this.getPosition(ev);
    this.setPosition(pos);
  }
  public dragStart() {
    this.dragging = true;
  }
  public drag(ev: any) {
    if (!this.dragging) {
      return;
    }
    const pos = this.getPosition(ev);
    if (pos > 0 && pos < this.width) {
      this.setPosition(pos);
    }
  }
  public dragEnd() {
    if (!this.dragging) {
      return;
    }
    this.dragging = false;
  }
}
</script>