<style lang="less" scoped>
.wapper {
  padding: 1vw 2vw 0vw 3vw;
  display: flex;
  overflow: scroll;
  &-left {
    flex: 0 0 65%;
    text-align: left;
    display: flex;
    flex-direction: column;

    &-vediobox {
      position: relative;
    }
    &-vedio {
      outline: none;
      // object-fit: fill;
      filter: brightness(80%), blur(20px);
      width: 100%;
      border-radius: 10px;
      background: rgba(255, 255, 255, 0.6);

      &-play {
        position: absolute;
        // right: 0;
        // top: 0;
        color: var(--red);
        background: rgba(255, 255, 255, 0.6);
        transform: translate(50%, -50%);
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        font-size: 40px;
        padding: 1vw;
        // opacity: 0;
        // transition: opacity 0.3s, right 0.3s, top 0.3s;
        opacity: 1;
        right: 50%;
        top: 50%;
      }
      &-controls {
        position: absolute;
        left: 3px;
        bottom: -100%;
        width: 98%;
        color: white;
        display: flex;
        align-items: center;
        justify-content: space-between;
        opacity: 0;
        transition: opacity 0.3s, bottom 0.3s;
        padding: 1vw;
        font-size: 13px;
        &-right {
          display: flex;
          justify-content: center;
          align-items: center;
        }
      }
      &-progress {
        position: absolute;
        bottom: -10px;
        width: 98%;
      }
    }
  }
  &-right {
    flex: 0 0 35%;
  }
}
.wapper-left-vediobox:hover .wapper-left-vedio-controls {
  opacity: 0.4;
  bottom: 5px;
}
</style>

<template>
  <a-skeleton :loading="loading" active>
    <div class="wapper">
      <div class="wapper-left">
        <h3>视频详情</h3>
        <div class="wapper-left-vediobox">
          <a-spin :spinning="spinning">
            <video
              id="notevedio"
              @click="handlePlay"
              class="wapper-left-vedio"
              ref="vedio"
              :height="filterHeight(data.height)"
              :style="{
              'object-fit':'fill',
               'background-image': `url(${data.cover})`,
               'filter':'brightness(60%), blur(20px)'
            }"
              autoplay
              :src="data.urls&&data.urls.url"
            ></video>
          </a-spin>
          <span
            @click.stop="handlePlay"
            v-show="state.state!=='playing'"
            class="wapper-left-vedio-play"
          >
            <AIconfont type="icon-up1-copy" />
          </span>
          <span class="wapper-left-vedio-controls">
            <span>
              {{transformSongTime(currtime)
              }}/{{transformSongTime(duration)}}
            </span>
            <span class="wapper-left-vedio-controls-right">
              <a-popover class="music-panel-pop">
                <template slot="content">
                  <div style="height:100px;">
                    <a-slider
                      vertical
                      :defaultValue="100"
                      :tooltipVisible="false"
                      v-model="volume"
                    />
                  </div>
                </template>
                <AIconfont
                  @click.stop="handleVolumeType"
                  class="music-panel-volume"
                  :type="volumetype"
                  :style="{'font-size':'18px'}"
                />
              </a-popover>
              <a-divider type="vertical" />
              <span>超清</span>
              <a-divider type="vertical" />
              <span>
                <AIconfont
                  :style="{'font-size':'18px'}"
                  @click="handleFull"
                  :type="isfull?'icon-fullscreen-exit':'icon-fullscreen'"
                />
              </span>
            </span>
          </span>
          <a-slider
            class="wapper-left-vedio-progress"
            autofocus
            id="progress"
            v-model="progress"
            @change="handleChangePro"
            @afterChange="handleProgress"
            :defaultValue="0"
            :tooltipVisible="false"
          />
        </div>
        <AuthInfo :data="data" />
        <Comment :data="comments" />
      </div>
      <div class="wapper-right">
        <Simi :data="simis" @on-simi="handleSimi" />
      </div>
    </div>
  </a-skeleton>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import { notification, message } from 'ant-design-vue';
import {
  get_video_url,
  get_video_group,
  get_related_allvideo,
  get_video_detail,
  get_comment_video,
  get_mv_url,
  get_simi_mv,
  get_comment_mv,
  get_mv_detail,
} from '@/actions';
import { transformW, transformatDate, transformSongTime } from '@/util/filters';
import AuthInfo from './AuthInfo.vue';
import Simi from './Simi.vue';
import Comment from './Comment.vue';
import { screen } from 'electron';
@Component({ components: { AuthInfo, Simi, Comment } })
export default class Radio extends Vue {
  public loading = false;
  public spinning = false;
  public data = {};
  public tags = {};
  public vedio: any = {};
  public simis = {};
  public comments = {};
  public currtime = 0;
  public duration = 0;
  public volume = 100;
  public volumecach = 0;
  public volumetype = 'icon-volume-high';
  public isfull = false;
  // 进度条
  public progress = 0;

  get state() {
    return this.$store.state.vedio;
  }
  public transformW = (e: any) => transformW(e);
  public transformatDate = (e: any) => transformatDate(e, 1);
  public transformSongTime = (e: any) => transformSongTime(e);
  public filterHeight(args: any) {
    let result = 400;
    const min = 300;
    const max = 500;
    const cur = args / 2;
    result = cur;
    if (cur < min) {
      result = cur < min ? min : cur;
    } else if (cur > max) {
      result = cur > max ? max : cur;
    }
    return result;
  }
  public handleChangePro() {
    if (this.state.state === 'playing') {
      const vedio: any = document.getElementById('notevedio');
      vedio.pause();
      this.$store.commit('updata_vedio_state', 'pause');
    }
  }
  public handleProgress(msg: any) {
    const vedio: any = document.getElementById('notevedio');
    const duration: any = this.duration;
    vedio.currentTime = (msg / 100) * duration;
    vedio.play();
    this.$store.commit('updata_vedio_state', 'playing');
  }
  public handleFull() {
    const document: any = window.document;
    // 由于是chrome的支持其他的不需要兼容 这样就可以全屏
    const vedio: any = document.querySelector('.wapper-left-vediobox');
    const vediorel: any = document.getElementById('notevedio');
    if (this.isfull) {
      vediorel.height = this.filterHeight((this as any).data.height);
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      }
    } else {
      const { height } = (screen as any).getPrimaryDisplay().size;
      if (height) {
        vediorel.height = height;
        vedio.requestFullscreen();
      }
    }
    this.isfull = !this.isfull;
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
    const vedio: any = document.getElementById('notevedio');
    if (msg && vedio) {
      vedio.volume = msg / 100;
    }
  }

  public handleVolumeType() {
    const type = this.volumetype;
    const vedio: any = document.getElementById('notevedio');

    if (this.volume !== 0) {
      this.volumecach = this.volume;
    }
    if (type === 'icon-volume-off') {
      this.volumetype = 'icon-volume-medium';
      vedio.muted = false;
      this.volume = this.volumecach;
    } else {
      vedio.muted = true;
      this.volume = 0;
      this.volumetype = 'icon-volume-off';
    }
  }
  public async handleSimi(item: any) {
    const res = await get_mv_detail(`mvid=${item.id}`);
    if (res.code === 200) {
      this.$store.commit('updata_vedio_cursor', res);
    }
  }
  public handlePlay() {
    const state = this.state.state;
    const vedio: any = document.getElementById('notevedio');
    if (state === 'playing') {
      vedio.pause();
      this.$store.commit('updata_vedio_state', 'pause');
    } else {
      vedio.play();
      this.$store.commit('updata_vedio_state', 'playing');
    }
  }
  @Watch('$route', { deep: true })
  public handleToggleShow() {
    this.$store.commit('updata_show_vedio_page', false);
    this.$destroy();
  }
  public destroyed() {
    this.handleToggleShow();
  }

  @Watch('$store.state.vedio.cursor.data')
  public handleChange() {
    const data = this.$store.state.vedio.cursor.data;
    this.init(data);
  }
  public async init(data: any) {
    this.loading = true;
    const params = `id=${data.id}`;
    const res = await get_mv_url(params);
    const simi = await get_simi_mv(`mv${params}`);
    const comment = await get_comment_mv(params);

    this.loading = false;
    if (res.code === 200) {
      this.data = { ...data, urls: res.data };
      // console.log(this.data);
    }
    if (simi.code === 200) {
      this.simis = simi;
    }
    if (comment.code === 200) {
      this.comments = comment;
    }

    this.$store.commit('updata_vedio_state', 'playing');
    this.$store.commit('updata_music_state', 'pause');

    this.$nextTick(() => {
      const vedio: any = document.getElementById('notevedio');
      if (!vedio) {
        return;
      }
      vedio.onloadstart = () => {
        //       //  console.log(.log(`onloadstart  客户端开始请求数据  `);
        this.spinning = true;
      };
      vedio.onplaying = () => {
        this.spinning = false;
        this.$store.commit('updata_vedio_state', 'playing');
      };
      vedio.ontimeupdate = () => {
        this.currtime = vedio.currentTime;
        this.$store.commit('updata_vedio_currtime', vedio.currentTime);
        this.progress = (vedio.currentTime / this.duration) * 100;
        //       //  console.log(.log("---------" + this.currtime, vedio.duration);
      };
      vedio.onloadedmetadata = () => {
        //       //  console.log(.log(
        //   `获取视频meta信息完毕，这个时候播放器已经获取到了视频时长和视频资源的文件大小。 `
        // );
        this.duration = vedio.duration;
        this.$store.commit('updata_vedio_duration', vedio.duration);
      };
      vedio.onended = () => {
        this.progress = 0;
        vedio.pause();
        this.$store.commit('updata_vedio_state', 'pause');
        //       //  console.log(.log(` //播放结束 loop 的情况下不会触发  `);
      };
      vedio.onerror = function() {
        //       //  console.log(.log(`请求数据时遇到错误`);
        // 1.用户终止 2.网络错误 3.解码错误 4.URL无效
        const errorArr: any = {
          1: '用户终止',
          2: '网络错误',
          3: '解码错误',
          4: 'URL无效',
        };
        this.spinning = true;
        message.error({
          message: '提示',
          description: `检测到${
            errorArr[vedio.error.code]
          } 正在自动执行修复方案...`,
        });
        const data = this.$store.state.vedio.cursor.data;
        this.init(data);
      };

      // vedio.onratechange = function() {
      //   //  console.log(.log(`onratechange  //播放速率改变  `);
      // };
      // vedio.onseeking = function() {
      //   //  console.log(.log(` //seeking  寻找中 点击一个为（缓存）下载的区域`);
      // };
      // vedio.onseeked = function() {
      //   //  console.log(.log(` //seeked 寻找完毕 `);
      // };
      // vedio.onplay = function() {
      //   //  console.log(.log(`开始播放时触发 `);
      // };
      // vedio.onwaiting = () => {
      //   //  console.log(.log(
      //   //   `播放由于下一帧数据未获取到导致播放停止，但是播放器没有主动预期其停止，仍然在努力的获取数据，简单的说就是在等待下一帧视频数据，暂时还无法播放。 `,
      //   // );
      //   this.spinning = true;
      // };

      // vedio.oncanplay = function() {
      //   //  console.log(.log(
      //   //   `视频播放器已经可以开始播放视频了，但是只是预期可以正常播放，不保证之后的播放不会出现缓冲等待。 `,
      //   // );
      // };
      // vedio.onpause = function() {
      //   //  console.log(.log(`暂停播放时触发 `);
      // };

      // vedio.onvolumechange = function() {
      //   //  console.log(.log(`音量改变  `);
      // };

      // vedio.onloadeddata = function() {
      //   //  console.log(.log(`"视频播放器第一次完成了当前播放位置的视频渲染。"`);
      // };

      // vedio.onabort = function() {
      //   //  console.log(.log(`客户端主动终止下载（不是因为错误引起）， `);
      // };

      // vedio.onprogress = () => {
      //   // this.currtime = vedio.currentTime;

      //   //  console.log(.log('---------' + this.currtime, vedio.duration);
      // };
    });
  }

  public async mounted() {
    const data = this.$store.state.vedio.cursor.data;
    this.init(data);
    // (window as any).onresize = this.handleFull();
  }
}
</script>
