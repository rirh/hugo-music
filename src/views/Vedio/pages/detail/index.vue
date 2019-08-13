<style lang="less" scoped>
.wapper {
  padding: 1vw 2vw 12vw 3vw;
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
        bottom: 5px;
        width: 100%;
        color: white;
        display: flex;
        align-items: center;
        justify-content: space-between;
        opacity: 1;
        transition: opacity 0.3s;
      }
    }
  }
  &-right {
    flex: 0 0 35%;
  }
}
.wapper-left-vediobox:hover .wapper-left-vedio-play {
}
</style>

<template>
  <a-skeleton :loading="loading" active>
    <div class="wapper">
      <div class="wapper-left">
        <h3>视频详情</h3>
        <div class="wapper-left-vediobox">
          <video
            id="notevedio"
            @click="handlePlay"
            class="wapper-left-vedio"
            ref="vedio"
            :height="data.height/2<300?'350':data.height/2"
            :style="{
              'object-fit':data.height>data.width?'contain':'fill',
               'background-image': `url(${data.coverUrl})`
            }"
            autoplay
            v-for="(item,index) in data.urls"
            :key="index"
            :src="item.url"
          ></video>
          <span
            @click.stop="handlePlay"
            v-show="state.state!=='playing'"
            class="wapper-left-vedio-play"
          >
            <AIconfont type="icon-up1-copy" />
          </span>
          <span class="wapper-left-vedio-controls">todo</span>
        </div>
        <div>
          <a-avatar
            class="wapper-avatar-img"
            :size="50"
            @click.stop="handleGoUser"
            icon="user"
            :src="data.creator&&data.creator.avatarUrl"
          />
          <span>&nbsp;{{data.creator&&data.creator.nickname}}</span>
        </div>
        <div>
          <h2>{{data.title}}</h2>
        </div>
        <div>
          <span>发布：{{transformatDate(data.publishTime)}}</span>
          <span>播放：{{transformW(data.playTime)}}</span>
        </div>
        <div>
          <a-tag v-for="(item,index) in data.videoGroup" :key="index" color="pink">{{item.name}}</a-tag>
        </div>
        <div>{{data.description}}</div>
      </div>
      <div class="wapper-right"></div>
    </div>
  </a-skeleton>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { get_video_url, get_video_group } from '@/actions';
import { transformW, transformatDate } from '@/util/filters';

@Component({ components: {} })
export default class Radio extends Vue {
  public loading = false;
  public data = {};
  public tags = {};
  public vedio: any = {};
  get state() {
    return this.$store.state.vedio;
  }
  public transformW = (e: any) => transformW(e);
  public transformatDate = (e: any) => transformatDate(e, 1);
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
  public destroyed() {
    this.$store.commit('updata_show_vedio_page', false);
  }
  public async mounted() {
    const data = this.$store.state.vedio.cursor.data;
    const res = await get_video_url(`id=${data.vid}`);
    if (res.code === 200) {
      this.data = { ...data, urls: res.urls };
    }

    this.$store.commit('updata_vedio_state', 'playing');
    this.$store.commit('updata_music_state', 'pause');
  }
}
</script>
