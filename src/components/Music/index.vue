<style lang="less" scoped>
.wapper {
  height: 100%;
  width: 100%;
  background-color: white;
  z-index: 4;
  position: relative;
}
#progress {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  margin: 0 !important;
  padding: 0 !important;
}

#progress /deep/ .ant-slider-handle {
  border-color: var(--red);
  background-color: var(--red);
}
#progress /deep/ .ant-slider-track {
  height: 3px;
}
#progress /deep/ .ant-slider-rail {
  height: 3px;
}
.music {
  display: flex;
  justify-content: center;
  height: 100%;
  &-flex {
    display: flex;
    align-items: center;
    flex: 1;
  }
  &-info {
    justify-content: flex-start;
    margin-left: 1vw;
    &-img {
      height: 4vw;
      width: 4vw;
      border-radius: 5px;
    }
    &-base {
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      margin-left: 1vw;
      text-align: left;
      overflow: hidden;
      &-name {
        font-weight: bold;
      }
      &-auth {
        color: var(--textColor);
        font-size: 12px;
      }
      &-duration {
        color: var(--tipsColor);
        font-size: 12px;
      }
    }
  }
  &-control {
    justify-content: center;
    font-size: 24px;
    &-heart {
      font-size: 20px;
      margin-right: 3vw;
      color: var(--textColor);
    }
    &-previous {
      color: var(--btnRed);
    }
    &-play {
      height: 40px;
      width: 40px;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 50%;
      background-color: var(--btnRed);
      color: white;
      margin: 0 2vw;
      padding: 0 !important;
      font-size: 24px;
      line-height: 0;
      border: none;
    }
    &-next {
      color: var(--btnRed);
    }
    &-share {
      margin-left: 3vw;
      color: var(--textColor);
    }
  }
  &-panel {
    justify-content: flex-end;
    font-size: 22px;
    color: var(--textColor);

    &-play {
      margin-right: 1vw;
    }
    &-plus {
      margin-right: 1vw;
    }
    &-cibiaoquanyi {
      font-size: 16px;
      margin-right: 1vw;
      font-weight: bold;
    }
    &-volume {
      margin-right: 3vw;
    }
  }
}
.ant-popover-inner-content {
  padding: 1vw 5px;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 200ms;
  -webkit-transform: opacity 200ms;
  -moz-transform: opacity 200ms;
  -ms-transform: opacity 200ms;
  -o-transform: opacity 200ms;
}
.playlist {
  display: flex;
  width: 100%;
  flex-direction: column;
  &-list {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
    &-name {
      flex: 0 0 50%;
    }
    &-auth {
      flex: 0 0 25%;
    }
    &-duration {
      flex: 0 0 25%;
    }
  }
}
</style>

<template>
  <div class="wapper">
    <a-slider
      id="progress"
      v-model="progress"
      @change="handleProgress"
      :defaultValue="0"
      :tooltipVisible="false"
    />
    <div class="music">
      <div class="music-flex">
        <div class="music-flex music-info" v-show="showinfo">
          <span>
            <img class="music-info-img" :src="img" alt />
          </span>
          <span class="music-info-base">
            <span>
              <span class="music-info-base-name">{{name}}</span>
              <span class="music-info-base-auth">&nbsp;-&nbsp;{{auth}}</span>
            </span>
            <span class="music-info-base-duration">
              {{transformTimer(cursor)||'00:00'}}
              &nbsp;/
              &nbsp;
              {{transformTimer(duration)||'00:00'}}
            </span>
          </span>
        </div>
      </div>
      <div class="music-flex music-control">
        <AIconfont class="music-control-heart" :type="true?'icon-heart-outline':'icon-heart'" />
        <AIconfont class="music-control-previous" type="icon-skip-previous" />
        <a-button type="primary" class="music-control-play" @click="handleStart">
          <transition name="fade" mode="out-in">
            <div>
              <AIconfont v-show="state!=='playing'" type="icon-play" />
              <AIconfont v-show="state==='playing'" type="icon-pause" />
            </div>
          </transition>
        </a-button>
        <AIconfont class="music-control-next" type="icon-skip-next" />
        <AIconfont class="music-control-share" type="icon-share" />
      </div>
      <div class="music-flex music-panel">
        <AIconfont class="music-panel-play" @click="visible=true" type="icon-playlist-play" />
        <AIconfont class="music-panel-plus" type="icon-playlist-plus" />
        <AIconfont class="music-panel-cibiaoquanyi" type="icon-cibiaoquanyi" />
        <!-- trigger="click" -->
        <a-popover class="music-panel-pop">
          <template slot="content">
            <div style="height:100px;">
              <a-slider vertical :defaultValue="100" v-model="volume" />
            </div>
          </template>
          <AIconfont @click="handleVolumeType" class="music-panel-volume" :type="volumetype" />
        </a-popover>
      </div>
    </div>
    <Drawer v-model="visible" :width="0.42">
      <div slot="content">
        <a-tabs defaultActiveKey="1">
          <a-tab-pane tab="播放列表" key="1">
            <dl class="playlist">
              <dd
                class="playlist-list"
                v-for="(song,index) in $store.state.music.list"
                :key="index"
                @dblclick="handleMusic(song)"
              >
                <span class="playlist-list-name">{{song.name}}</span>
                <span class="playlist-list-auth">{{song.auth}}</span>
                <span class="playlist-list-duration">{{transformTimer(song.duration/1000)}}</span>
              </dd>
            </dl>
          </a-tab-pane>
          <a-tab-pane tab="历史记录" key="2" forceRender>Content of Tab Pane 2</a-tab-pane>
        </a-tabs>
      </div>
    </Drawer>
    <!-- <audio ref="player" :src="music"></audio> -->
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { get_song_url, get_check_music } from '@/actions';
import { notification } from 'ant-design-vue';
import Drawer from '@/components/Drawer';
const player = new Audio();
@Component({ components: { Drawer } })
export default class Music extends Vue {
  get state() {
    return this.$store.state.music.state;
  }
  public showinfo = false;
  public progress = 0;
  public music = '';
  public img = '';
  public name = 'XXX';
  public auth = 'XXX';
  public player = player;
  public cursor = '0';
  public duration = '0';
  public volume = 100;
  public volumecach = 100;
  public volumetype = 'icon-volume-high';
  public visible = false;
  @Prop() private msg!: string;
  public handleProgress(msg: any) {
    const duration: any = this.duration;
    this.player.currentTime = (msg / 100) * duration;
  }

  @Watch('volume')
  public handleVolume(msg: any) {
    if (msg === 100) {
      this.volumetype = 'icon-volume-high';
    } else if (msg === 0) {
      this.volumetype = 'icon-volume-off';
    } else {
      this.volumetype = 'icon-volume-medium';
    }
    if (msg && this.play) {
      (this as any).player.volume = msg / 100;
    }
  }
  public handleStart() {
    if (this.cursor === '0') {
      return;
    }
    if (this.player.play) {
      const state = this.state;
      if (state === 'playing') {
        this.pause();
      } else {
        this.play();
      }
    }
  }

  @Watch('$store.state.music.data', { deep: true })
  public async handleMusic({ id, image, name, auth, duration }: any) {
    this.showinfo = true;
    this.img = image;
    this.name = name.length > 27 ? `${name.substring(0, 22)}...` : name;
    this.auth = auth;
    this.$store.commit('updata_music_list', {
      id,
      image,
      name,
      auth,
      duration,
    });
    this.handlePlay(id);
    this.visible = false;
  }
  public handleVolumeType() {
    const type = this.volumetype;
    if (this.volume !== 0) {
      this.volumecach = this.volume;
    }
    if (type === 'icon-volume-off') {
      this.volumetype = 'icon-volume-medium';
      this.player.muted = false;
      this.volume = this.volumecach;
    } else {
      this.player.muted = true;
      this.volume = 0;
      this.volumetype = 'icon-volume-off';
    }
  }
  public async handlePlay(id: any) {
    if (!id) {
      return;
    }

    const { success, message }: any = await get_check_music(id);
    if (!success) {
      notification.error({
        message: '提示',
        description: message,
      });
    }
    const { code, data } = await get_song_url(id);
    if (code !== 200) {
      return;
    }

    const [music] = data;
    (this as any).player.src = music.url;

    (this as any).player.addEventListener('pause', this.pause());
    (this as any).player.addEventListener('loadeddata', this.play());

    (this as any).player.addEventListener('ended', this.stop());
    (this as any).player.addEventListener('error', (error: any) => {
      throw error;
    });
    // this.music = music.url;
  }
  public async play() {
    if (this.player) {
      let duration: any;
      let currentTime: any;
      this.$store.commit('updata_music_state', 'playing');
      (this as any).player.play();
      (this as any).player.οnended = this.stop();

      // 拿到总时长
      (this as any).player.ondurationchange = () => {
        duration = (this as any).player.duration;
        this.duration = duration;
        (this as any).player.volume = this.volume / 100;
        this.$store.commit('updata_music_duration', duration);
        // 拿到当前时长
        (this as any).player.ontimeupdate = () => {
          currentTime = (this as any).player.currentTime;
          this.cursor = currentTime;
          this.progress = (currentTime / duration) * 100;
        };
      };
    }
  }
  public pause() {
    const { state } = this.$store.state.music;
    if (this.player) {
      if (state === 'playing') {
        (this as any).player.pause();
        this.$store.commit('updata_music_state', 'pause');
      }
    }
  }
  public stop() {
    const state = this.state;
    if (this.player) {
      if (state !== 'stop') {
        this.$store.commit('updata_music_state', 'stop');
        this.play();
      }
    }
  }

  // public mounted() {
  //   this.player = this.$refs.player;
  //   // localStorage.setItem("a", '123123123');
  //   // const a= localStorage.getItem('a');
  // }
  public transformTimer(duration: any) {
    let result: any = 0;
    if (duration) {
      const min: any = `${Math.floor(duration / 60)}`;
      const sco: any = `${Math.floor(duration % 60)}`;
      result = `${min.padStart(2, '0')}:${sco.padStart(2, '0')}`;
    }
    return result;
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
</style>
