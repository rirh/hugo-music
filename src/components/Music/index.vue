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
    padding: 0.5vw;
    &-name {
      flex: 0 0 50%;
    }
    &-auth {
      flex: 0 0 30%;
    }
    &-duration {
      flex: 0 0 20%;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  }
}

.music-img-box {
  position: relative;
  &-up {
    font-weight: bold;
    position: absolute;
    top: 1px;
    left: 0;
    width: 100%;
    text-align: center;
    color: white;
    font-size: 18px;
  }
  &-down {
    font-weight: bold;
    position: absolute;
    bottom: 1px;
    left: 0;
    width: 100%;
    text-align: center;
    color: white;
    font-size: 18px;
  }
}

// .music-info-img:hover {
//   cursor: pointer;
//   // transition: filter 0.1s;
//   // filter: brightness(1.1) contrast(110%);
//   filter: blur(2px);
// }
.show {
  display: none;
}
.music-img-box:hover .music-info-img {
  cursor: pointer;
  // transition: filter 0.1s;
  // filter: brightness(1.1) contrast(110%);
  filter: blur(2px);
}
.music-img-box:hover .show {
  display: block;
}
.striped {
  background-color: var(--striped);
}
.playlist-list:hover {
  background-color: var(--stripedHover);
}
.delete {
  opacity: 0;
  font-size: 22px;
}
.playlist-list:hover .delete {
  opacity: 1;
}
.drawer /deep/ .ant-drawer-body {
  padding: 0;
}
.drawer /deep/ .ant-tabs-bar {
  margin: 0;
}
</style>

<template>
  <div class="wapper">
    <a-slider
      autofocus
      id="progress"
      v-model="progress"
      @afterChange="handleProgress"
      :defaultValue="0"
      :tooltipVisible="false"
    />
    <div class="music">
      <div class="music-flex">
        <div class="music-flex music-info" v-show="showinfo">
          <span class="music-img-box" @click="handleShowConrtal">
            <!-- <img class="music-info-img" :src="img" alt /> -->
            <a-avatar shape="square" class="music-info-img" :onerror="errorImg" :src="img" alt />
            <AIconfont
              class="music-img-box-up show"
              :type="`icon-arrow-${$store.state.music.showPanel?'down':'up'}`"
            />
            <AIconfont
              class="music-img-box-down show"
              :type="`icon-arrow-${$store.state.music.showPanel?'up':'down'}`"
            />
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
        <AIconfont class="music-control-heart" :type="isLike?'icon-heart-outline':'icon-heart'" />
        <AIconfont class="music-control-previous" @click="handlePrev" type="icon-skip-previous" />
        <a-button type="primary" class="music-control-play" @click="handleStart">
          <transition name="fade" mode="out-in">
            <div>
              <AIconfont v-show="state!=='playing'" type="icon-play" />
              <AIconfont v-show="state==='playing'" type="icon-pause" />
            </div>
          </transition>
        </a-button>
        <AIconfont class="music-control-next" @click="handleNext" type="icon-skip-next" />
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
    <Drawer class="drawer" v-model="visible" :width="0.42">
      <div slot="content">
        <a-tabs defaultActiveKey="1">
          <a-tab-pane tab="播放列表" key="1">
            <dl class="playlist">
              <dd
                class="playlist-list"
                v-for="(song,index) in $store.state.music.list"
                :key="index"
                :class="{'striped':index%2===0}"
                @dblclick="$store.commit('updata_music_data', song)"
              >
                <span class="playlist-list-name">{{song.name}}</span>
                <span
                  class="playlist-list-auth"
                >{{ song.auth.length > 15 ? `${song.auth.substring(0, 10)}...` : song.auth}}</span>
                <span class="playlist-list-duration">
                  {{transformTimer(song.duration/1000)}}
                  <AIconfont class="delete" type="icon-delete" @click="handleDelete(index)" />
                </span>
              </dd>
            </dl>
          </a-tab-pane>
          <a-tab-pane tab="历史记录" key="2" forceRender>
            <dl class="playlist">
              <dd
                class="playlist-list"
                v-for="(song,index) in $store.state.music.history"
                :key="index"
                :class="{'striped':index%2===0}"
                @dblclick="$store.commit('updata_music_data', song)"
              >
                <span class="playlist-list-name">{{song.name}}</span>
                <span
                  class="playlist-list-auth"
                >{{ song.auth.length > 15 ? `${song.auth.substring(0, 10)}...` : song.auth}}</span>
                <span class="playlist-list-duration">
                  {{transformTimer(song.duration/1000)}}
                  <AIconfont class="delete" type="icon-delete" @click="handleDelete(index)" />
                </span>
              </dd>
            </dl>
          </a-tab-pane>
          <span slot="tabBarExtraContent">
            <span @click="handleEmptyList">
              <AIconfont type="icon-delete"></AIconfont>清空
            </span>
          </span>
        </a-tabs>
      </div>
    </Drawer>
    <!-- <audio ref="player" :src="music"></audio> -->
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { get_song_url, get_check_music, get_user_record } from '@/actions';
import { notification, Modal } from 'ant-design-vue';
import Drawer from '@/components/Drawer';
import { ERROR_IMG } from '@/constant/api';

const player = new Audio();

@Component({ components: { Drawer } })
export default class Music extends Vue {
  // 播放状态
  get state() {
    return this.$store.state.music.state;
  }
  get isLike() {
    let result = this.like;
    const id = this.$store.state.music.data.id;
    const list = this.$store.state.user.likelist.ids;
    if (id && list) {
      result = list.some((e: any) => e === id);
    }
    return result;
  }
  get detail() {
    return this.$store.state.user.userDetail;
  }
  public errorImg = ERROR_IMG;
  // 显示歌曲信息
  public showinfo = false;
  // 进度条
  public progress = 0;
  // 音乐信息
  public music = '';
  public img = '';
  public name = 'XXX';
  public auth = 'XXX';
  // 缓存实体
  public player = player;
  public cursor = '0';
  public duration = '0';
  public volume = 100;
  public volumecach = 100;
  public volumetype = 'icon-volume-high';
  public like = false;

  // 音量弹窗显示
  public visible = false;
  // 抛出进度可以外部控制
  @Prop() private msg!: string;
  public handleDelete(index: any) {
    this.$store.commit('delete_music_list_item', index);
  }
  public handleEmptyList() {
    Modal.confirm({
      title: '确定清空列表？',
      content: '清空以后需要重新添加',
      okText: '确定',
      cancelText: '取消',
      onOk: () => {
        this.$store.commit('clear_music_list');
      },
    });
  }
  public mounted() {
    // const { Howl, Howler } = require("howler");
    // const sound = new Howl({
    //   src: [
    //     // '',
    //     `http://m10.music.126.net/20190726115052/06a1706
    // d69314af28bb7f34b409ccb54/ymusic/ddb8/1c79/6efe/e805c67fb5a6a8ea9f19e945f8025585.mp3`
    //   ]
    // });
    // setTimeout(() => {
    //   console.log(1);
    //   var index = 1;
    //   // sound.rate(1.0, id2);
    //   // sound.seek(1, id2);
    //   sound.unload(true);
    //   sound._src =
    //     " http://m701.music.126.net/20190726121
    // 120/f4f7c616ea03287f58dcfda300ab2fd8/jdymusic/5452/565e/0309/c8db991f98a45b9ee5f44ccbc3c88a75.mp3";
    //   // console.log(1);
    //   // // sound.playString(
    //   // //   "http://m701.music.126.net/20190726121120/
    // f4f7c616ea03287f58dcfda300ab2fd8/jdymusic/5452/565e/0309/c8db991f98a45b9ee5f44ccbc3c88a75.mp3"
    //   // // );
    //   sound.load();
    // }, 10000);
    // console.log(sound);
    // // Howl._src =
    // //   "http://m10.music.126.net/20190726115052/06a17
    // 06d69314af28bb7f34b409ccb54/ymusic/ddb8/1c79/6efe/e805c67fb5a6a8ea9f19e945f8025585.mp3";
    // var id1 = sound.play();
    // var id2 = sound.play();
  }
  public handleShowConrtal() {
    const showPanel = this.$store.state.music.showPanel;
    this.$store.commit('updata_show_panel', !showPanel);
  }
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
  // 播放暂停按钮
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
    this.name = name.length > 20 ? `${name.substring(0, 10)}...` : name;
    this.auth = auth.length > 5 ? `${auth.substring(0, 6)}...` : auth;
    this.$store.commit('updata_music_list', {
      id,
      image,
      name,
      auth,
      duration,
    });
    const myNotification = new Notification(this.name, {
      body: this.auth,
      icon: this.img,
    });
    await this.asyncPlay(id);
    // this.visible = false;
  }

  public handlePrev() {
    const current = this.$store.state.music.data;
    const list = this.$store.state.music.list;
    let index = list.findIndex((e: any) => e.id === current.id);
    // index = index - 1 < 0 ? list.length - 1 : index - 1;
    index = index - 1;

    if (index < 0) {
      index = list.length - 1;
    }
    if (list[index]) {
      this.$store.commit('updata_music_data', list[index]);
    }
  }
  public handleNext() {
    const current = this.$store.state.music.data;
    const list = this.$store.state.music.list;
    let index = list.findIndex((e: any) => e.id === current.id);
    index = index + 1;
    if (index > list.length - 1) {
      index = 0;
    }
    if (list[index]) {
      this.$store.commit('updata_music_data', list[index]);
    }
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
  public async asyncPlay(id: any) {
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

    // (this as any).player.addEventListener("ended", this.stop());
    (this as any).player.addEventListener('error', (error: any) => {
      throw error;
    });
    this.music = music.url;
  }
  public async play() {
    if (this.player) {
      let duration: any;
      let currentTime: any;
      this.$store.commit('updata_music_state', 'playing');
      (this as any).player.play();
      this.player.onended = () => {
        this.stop();
        this.handleNext();
      };

      // 拿到总时长
      (this as any).player.ondurationchange = () => {
        duration = (this as any).player.duration;
        this.duration = duration;
        (this as any).player.volume = this.volume / 100;
        this.$store.commit('updata_music_duration', duration);
        // 拿到当前时长
        (this as any).player.ontimeupdate = () => {
          currentTime = (this as any).player.currentTime;
          this.$store.commit('updata_music_cursor', currentTime);
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
        // this.showinfo = false;
        this.progress = 0;
        this.cursor = '0';
        this.$store.commit('updata_music_state', 'stop');
        // this.play();
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
