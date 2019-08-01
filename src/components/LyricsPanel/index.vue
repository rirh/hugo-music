<style lang="less" scoped>
.wapper {
  background-color: white;
  width: 100%;
  position: relative;
  &-commet {
    display: flex;
  }
  &-panel {
    display: flex;
    width: 100%;
    &-music {
      flex: 0 0 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-top: 0vw;
      flex-direction: column;
      &-action {
        display: flex;
        margin-top: 5vw;
        padding-top: 5vw;
        align-items: center;
        justify-content: space-around;
        width: 65%;
        &-btn {
          border-radius: 50%;
          padding: 0;
          margin: 0;
          height: 40px;
          width: 40px;
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 24px;
          background-color: var(--line);
        }
      }

      &-box {
        background-image: url("../../assets/coverall.png");
        background-position: -518px 916px;
        text-align: left;
        position: relative;
        height: 21vw;
        width: 21vw;
        transform: scale(1.6);

        &-img {
          position: absolute;
          left: 50%;
          top: 50%;
          height: 13.2vw;
          width: 13.2vw;
          transform: translate(-50%, -50%);
        }
      }
    }

    &-lyrics {
      flex: 0 0 50%;
      justify-content: flex-start;
      align-items: flex-start;
      flex-direction: column;
      padding: 2rem 1rem;
    }
  }
}
.roate {
  animation: circle 25s infinite linear;
  -webkit-animation: circle 25s infinite linear;
}
@keyframes circle {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
.name {
  text-align: left;
  display: flex;
  align-items: center;
  margin: 0;
  font-size: 22px;
  font-weight: 450;
  &-tips {
    color: var(--red);
    font-size: 13px;
    border: 1px solid var(--red);
    padding: 0 0.2rem;
    border-radius: 5px;
    margin-left: 1vw;
  }
  &-alia {
    text-align: left;
    margin: 0.6rem 0;
  }
}
.auth {
  text-align: left;
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
  &-item {
    flex: 0 0 33%;
    text-align: left;
    font-size: 12px;
    &-val {
      color: var(--link);
    }
  }
}
.lyrics {
  overflow: scroll;
  height: 33vw;
  display: flex;
  flex-direction: column;
  text-align: left;
  color: var(--textColor);
  border-right: 1px solid var(--line);
  margin-right: 8rem;
  // width: 90%;
  &-line {
    margin: 0.5rem 0;
  }
}
.pos {
  position: absolute;
  top: 0;
  left: 0;
}
</style>

<template>
  <div class="wapper">
    <a-progress
      class="pos"
      :percent="percent"
      :showInfo="false"
      v-show="percent!==0"
      status="active"
      :strokeWidth="1"
    />
    <div class="wapper-panel">
      <div class="wapper-panel-music">
        <div class="roate" ref="roate">
          <div class="wapper-panel-music-box">
            <a-avatar
              class="wapper-panel-music-box-img"
              :onerror="errorImg"
              :src="$store.state.music.data.image"
              alt
            />
          </div>
        </div>
        <div class="wapper-panel-music-action">
          <a-button @click="handleLike" class="wapper-panel-music-action-btn">
            <AIconfont
              :style="{
              'margin-top':'5px',
              color:like?'var(--red)':''
            }"
              :type="like?'icon-heart':'icon-heart-outline'"
            />
          </a-button>
          <a-button class="wapper-panel-music-action-btn">
            <AIconfont type="icon-playlist-plus" />
          </a-button>
          <a-button @click="handleDown" class="wapper-panel-music-action-btn">
            <AIconfont type="icon-package-down" />
          </a-button>
          <a-button class="wapper-panel-music-action-btn">
            <AIconfont type="icon-share" />
          </a-button>
        </div>
      </div>
      <div class="wapper-panel-lyrics">
        <h1 class="name">
          {{$store.state.music.data.name.length>20?`${$store.state.music.data.name.substring(0,10)}...`:$store.state.music.data.name}}
          <span
            class="name-tips"
          >标准音质</span>
        </h1>
        <div class="name-alia">
          <strong>{{songs.alia&&songs.alia.toString()}}</strong>
        </div>
        <div class="auth">
          <div class="auth-item">
            <label for>专辑：</label>
            <router-link
              class="auth-item-val"
              :to="{
                 path: '/album-detail',
                 query: songs.al,
              }"
              @click.native="handleTogglePanel"
            >{{songs.al&&(songs.al.name.length>10?`${songs.al.name.substring(0,8)}...`:songs.al.name)}}</router-link>
          </div>
          <div class="auth-item">
            <label for>歌手：</label>
            <router-link
              class="auth-item-val"
              to
            >{{leftPadauth(songs).length>10?`${leftPadauth(songs).substring(0,8)}...`:leftPadauth(songs)}}</router-link>
          </div>
          <div class="auth-item">
            <label for>专辑：</label>
            <router-link class="auth-item-val" to>{{songs.publishTime}}</router-link>
          </div>
        </div>
        <div class="lyrics" ref="lyrics">
          <strong
            class="lyrics-line"
            v-for="(item,index) in parseLyric"
            :key="index"
            :style="highLightLyric(item,index)"
          >{{item.contant}}</strong>
        </div>
      </div>
    </div>
    <div class="wapper-commet">
      <div></div>
      <div></div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import routers from '@/routers';
import {
  get_song_detail,
  get_lyric,
  get_like,
  get_likelist,
  get_song_url,
} from '@/actions';
import { ERROR_IMG } from '@/constant/api';
import { notification, message } from 'ant-design-vue';
import { download } from '@/util/filters';

@Component
export default class Panel extends Vue {
  public songs: any = {};
  public errorImg = ERROR_IMG;
  public isPress = false;
  public like = false;
  public percent = 0;
  @Prop() private msg!: string;
  public async init() {
    const id = this.$store.state.music.data.id;
    const { code, privileges, songs } = await get_song_detail(`${id}`);
    const res = await get_lyric(`${id}`);
    if (code === 200) {
      this.songs = songs[0];
    }
    if (res.code === 200) {
      this.songs.lyric = res;
    }
    await get_likelist();
    this.like = this.isLike;
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
  public handleTogglePanel() {
    const showPanel = this.$store.state.music.showPanel;
    this.$store.commit('updata_show_panel', !showPanel);
  }
  public async handleDown() {
    // StreamDownload=new StreamDownload();
    const id = this.$store.state.music.data.id;
    const name = this.$store.state.music.data.name;
    const { code, data } = await get_song_url(id);
    if (code !== 200) {
      return;
    }
    const [music] = data;
    download(
      music.url,
      `${name}.${music.type}`,
      (arg: any, percentage: any, total: any) => {
        if (arg === 'progress') {
          // 显示进度
          this.percent = (percentage / total) * 100;
        } else if (arg === 'finished') {
          // 通知完成
          this.percent = 0;
          message.success('下载成功！');
        }
      },
    );
  }

  public async handleLike() {
    const id = this.$store.state.music.data.id;
    const { code } = await get_like(`id=${id}&like=${!this.like}`);
    if (code === 200) {
      await get_likelist();
      this.like = !this.like;
      notification.success({
        message: '恭喜',
        description: `操作成功！`,
      });
    }
  }
  public highLightLyric(item: any, index: any) {
    let result = {};
    const cursor = this.$store.state.music.cursor;
    // const lyrics: any = this.$refs.lyrics;
    const filter = this.parseLyric.filter((e: any) => {
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
  public leftPadauth(songs: any) {
    let result = '';
    if (songs.ar) {
      result = songs.ar
        .map((e: any) => e.name)
        .toString()
        .split(',')
        .join('/');
    }
    return result;
  }
  @Watch('$store.state.music.data', { deep: true })
  public handleInit() {
    this.init();
  }
  @Watch('$store.state.music', { deep: true })
  public handleChange(params: any) {
    const roateDom: any = this.$refs.roate;
    if (params.state === 'playing') {
      roateDom.style.webkitAnimationPlayState = 'running';
    } else {
      roateDom.style.webkitAnimationPlayState = 'paused';
    }
  }
  // 解析歌词
  get parseLyric() {
    let result: any = [];

    if (this.songs.lyric) {
      const lyric = this.songs.lyric.lrc.lyric;
      const ly = lyric.split('\n');
      const splitLyric = (e: any) => {
        const crr = e.split(']');
        const [tit, contant] = crr;
        const timer = tit.split('[')[1];
        let timerArr: any = `${timer}`.split('.');
        const [h, s] = timerArr;
        timerArr = h.split(':');
        const [a, b] = timerArr;
        let time: any = `${Number(a) * 60 + Number(b)}.${s}`;
        if (isNaN(time)) {
          time = '';
        }
        // if (!contant) { contant = ''; }
        return { time, contant };
      };
      result = ly.map(splitLyric);
    }

    return result;
  }
}
</script>


