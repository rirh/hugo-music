<style lang="less" scoped>
.wapper {
  background-color: white;
  width: 100%;
  position: relative;
  overflow: scroll;
  padding-bottom: 9.1vw;
  &-commet {
    display: flex;
    width: 100%;
    margin-top: 5vw;
  }
  &-panel {
    display: flex;
    width: 100%;
    padding: 2vw 0 0 0;

    &-music {
      flex: 0 0 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-top: 0vw;
      flex-direction: column;
      padding: 8vw 0 0 0;
      position: relative;
      &-playneedle {
        position: absolute;
        top: -25px;
        left: 225px;
        transform: scale(0.4) rotate(-36deg);
        transform-origin: -10px -10px;
        z-index: 1;
      }
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
      padding: 2vw 1vw;
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
.playneedle-in {
  animation: roate-in 0.8s forwards;
}

.playneedle-out {
  animation: roate-out 0.8s forwards;
}
@keyframes roate-in {
  0% {
    transform: scale(0.4) rotate(-36deg);
  }
  100% {
    transform: scale(0.4) rotate(-10deg);
  }
}
@keyframes roate-out {
  0% {
    transform: scale(0.4) rotate(-10deg);
  }
  100% {
    transform: scale(0.4) rotate(-36deg);
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
    padding: 0 0.2vw;
    border-radius: 5px;
    margin-left: 1vw;
  }
  &-alia {
    text-align: left;
    margin: 0.6vw 0;
  }
}
.auth {
  text-align: left;
  display: flex;
  align-items: center;
  margin-bottom: 1vw;
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
  margin-right: 8vw;
  // width: 90%;
  &-line {
    margin: 0.5vw 0;
  }
}
.pro {
  position: absolute;
  top: 0;
  left: 0;
}
.commet {
  flex: 0 0 65%;
  text-align: left;
  padding: 0vw 2vw 0 6vw;

  &-item {
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    color: var(--black);
    font-size: 13px;
    font-weight: 500;
    width: 100%;
    margin: 1.2vw 0;
    &-left {
      padding: 0 2vw 0 0;
    }
    &-right {
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-content: flex-start;
      flex: 1;
      border-bottom: 1px solid #e8e8e8;
      padding: 0 0 1.5vw 0;
      &-beReplied {
        background-color: var(--stripedHover);
        padding: 0.5vw;
        width: 100%;
        margin: 0.5vw;
        text-align: left;
        border-radius: 2px;
      }
      &-contarl {
        color: var(--textColor);
        display: flex;
        align-items: center;
        justify-content: space-between;
        &-tips {
          font-size: 14px;
          display: flex;
          justify-content: center;
          align-items: center;
          &-report {
            font-size: 12px;
            opacity: 0;
          }
        }
      }
    }
  }
}
.simi {
  flex: 0 0 35%;
  text-align: left;
  padding: 2vw;
  &-item {
    display: flex;
    &-auth {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: center;
      margin-left: 1vw;
      &-name {
        font-size: 12px;
      }
    }
  }
  &-item:hover {
    background-color: var(--stripedHover);
  }
}
.avatar {
  position: relative;
  &-tips {
    position: absolute;
    height: 25px;
    width: 25px;
    transform: translate(-50%, -50%);
    left: 50%;
    top: 50%;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1;
    background-color: rgba(255, 255, 255, 0.66);
    &-icon {
      font-size: 18px;
      color: var(--red);
    }
  }
}
.commet-item:hover .commet-item-right-contarl-tips-report {
  opacity: 1;
}
.share {
  min-width: 30vw;
  &-item {
    padding: 1vw;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    color: var(--black);
    &-icon {
      margin: 0 2vw 0 2vw;
      color: white;
      background-color: var(--red);
      border-radius: 50%;
      height: 4vw;
      width: 4vw;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 24px;
    }
  }
  &-item:hover {
    background-color: var(--stripedHover);
  }
}
</style>

<template>
  <div class="wapper">
    <a-progress
      class="pro"
      :percent="percent"
      :showInfo="false"
      v-show="percent!==0"
      status="active"
      :strokeWidth="1"
    />
    <div class="wapper-panel">
      <div class="wapper-panel-music">
        <img
          :class="{'playneedle-in':$store.state.music.state==='playing','playneedle-out':$store.state.music.state!=='playing'}"
          class="wapper-panel-music-playneedle"
          src="../../assets/play_needle.png"
          alt
        />
        <div class="roate" ref="roate">
          <div class="wapper-panel-music-box">
            <a-avatar
              class="wapper-panel-music-box-img"
              :src="$store.state.music.data.image"
              :onerror="errorImg"
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
          {{$store.state.music.data.name
          &&($store.state.music.data.name.length>20
          ?`${$store.state.music.data.name.substring(0,10)}...`
          :$store.state.music.data.name)}}
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
            >{{songs.al&&(songs.al.name.length>10?`${songs.al.name.substring(0,6)}...`:songs.al.name)}}</router-link>
          </div>
          <div class="auth-item">
            <label for>歌手：</label>
            <router-link
              class="auth-item-val"
              :to="{
                 path: '/singer',
                 query:songs.ar&&songs.ar[0],
              }"
              @click.native="handleTogglePanel"
            >{{leftPadauth(songs).length>10?`${leftPadauth(songs).substring(0,8)}...`:leftPadauth(songs)}}</router-link>
          </div>
          <div class="auth-item">
            <label for>来源：</label>
            <router-link
              class="auth-item-val"
              :to="{
                 path: '/album-detail',
                 query: songs.al,
              }"
            >{{songs.al&&(songs.al.name.length>10?`${songs.al.name.substring(0,6)}...`:songs.al.name)}}</router-link>
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
      <div class="commet">
        <a-skeleton active :loading="comloading">
          <div>
            <div>
              <h3 style="font-size:14px;">
                听友评论&nbsp;
                <span
                  style="font-size:12px;color:var(--textColor)"
                >(已有{{comments.total}}条评论)</span>
              </h3>
              <a-input :value="null" @click="handleShowCommet" placeholder="发表评论">
                <AIconfont slot="prefix" type="icon-lead-pencil" />
                <span slot="suffix">
                  <AIconfont type="icon-emoticon" />&nbsp;
                  <AIconfont type="icon-mail-ru" />
                </span>
              </a-input>
            </div>
            <dl class="commet-wapper">
              <dt style="margin:1vw 0vw;font-size:12px;">
                <h3>精彩评论</h3>
              </dt>
              <dd
                class="commet-item"
                v-for="(item,cindex) in comments.hotComments||[]"
                :key="cindex"
              >
                <span class="commet-item-left">
                  <a-avatar
                    style="height:3.4vw;width:3.4vw;margin-top:.2vw;"
                    :onerror="errorImg"
                    :src="item.user&&item.user.avatarUrl"
                    alt
                  />
                </span>
                <span class="commet-item-right">
                  <span>
                    <span style="color:var(--link)">{{item.user&&item.user.nickname}}：</span>
                    <span>{{item.content}}</span>
                  </span>
                  <span
                    class="commet-item-right-beReplied"
                    v-for="(bitem,bindex) in item.beReplied"
                    :key="bindex"
                  >
                    <span style="color:var(--link)">@{{bitem.user&&bitem.user.nickname}}：</span>
                    <span>{{bitem.content}}</span>
                  </span>
                  <span class="commet-item-right-contarl">
                    <span>{{transformatDate(item.time)}}</span>
                    <span class="commet-item-right-contarl-tips">
                      <span
                        @click="handleReport"
                        class="commet-item-right-contarl-tips-report"
                      >举报&nbsp;&nbsp;&nbsp;</span>
                      <AIconfont
                        @click="handleResLike(item,cindex,'hot')"
                        :style="{color:item.liked?'var(--red)':'var(--textColor)'}"
                        :type="item.liked?'icon-thumb-up':'icon-thumb-up-outline'"
                      />
                      <span v-show="item.likedCount>0">&nbsp;{{item.likedCount}}</span>
                      <a-divider type="vertical" />
                      <a-popover :title="null" trigger="click" arrowPointAtCenter>
                        <template slot="content">
                          <div class="share">
                            <p @click="handleHideShare" class="share-item">
                              <span class="share-item-icon">
                                <AIconfont type="icon-wangyiyunyinle" />
                              </span>
                              <span class="share-item-con">分享到云音乐动态</span>
                            </p>
                            <p @click="handleHideShare" class="share-item">
                              <span class="share-item-icon">
                                <AIconfont type="icon-email" />
                              </span>
                              <span class="share-item-con">私信分享</span>
                            </p>
                          </div>
                        </template>
                        <AIconfont type="icon-share" />
                      </a-popover>
                      <a-divider type="vertical" />
                      <AIconfont @click="handleShowCommet" type="icon-comment-text-outline" />
                    </span>
                  </span>
                </span>
              </dd>
            </dl>
            <dl class="commet-wapper">
              <dt style="margin:1vw 0vw;font-size:12px;">
                <h3>最新评论（{{comments.total}}）</h3>
              </dt>
              <dd class="commet-item" v-for="(item,cindex) in comments.comments||[]" :key="cindex">
                <span class="commet-item-left">
                  <a-avatar
                    style="height:3.4vw;width:3.4vw;margin-top:.2vw;"
                    :onerror="errorImg"
                    :src="item.user&&item.user.avatarUrl"
                    alt
                  />
                </span>
                <span class="commet-item-right">
                  <span>
                    <span style="color:var(--link)">{{item.user&&item.user.nickname}}：</span>
                    <span>{{item.content}}</span>
                  </span>
                  <span
                    class="commet-item-right-beReplied"
                    v-for="(bitem,bindex) in item.beReplied"
                    :key="bindex"
                  >
                    <span style="color:var(--link)">@{{bitem.user&&bitem.user.nickname}}：</span>
                    <span>{{bitem.content}}</span>
                  </span>
                  <span class="commet-item-right-contarl">
                    <span>{{transformatDate(item.time,'new')}}</span>
                    <span class="commet-item-right-contarl-tips">
                      <span
                        @click="handleReport"
                        class="commet-item-right-contarl-tips-report"
                      >举报&nbsp;&nbsp;&nbsp;</span>
                      <AIconfont
                        @click="handleResLike(item,cindex)"
                        :style="{color:item.liked?'var(--red)':'var(--textColor)'}"
                        :type="item.liked?'icon-thumb-up':'icon-thumb-up-outline'"
                      />
                      <span v-show="item.likedCount>0">&nbsp;{{item.likedCount}}</span>
                      <a-divider type="vertical" />
                      <a-popover :title="null" trigger="click" arrowPointAtCenter>
                        <template slot="content">
                          <div class="share">
                            <p @click="handleHideShare" class="share-item">
                              <span class="share-item-icon">
                                <AIconfont type="icon-wangyiyunyinle" />
                              </span>
                              <span class="share-item-con">分享到云音乐动态</span>
                            </p>
                            <p @click="handleHideShare" class="share-item">
                              <span class="share-item-icon">
                                <AIconfont type="icon-email" />
                              </span>
                              <span class="share-item-con">私信分享</span>
                            </p>
                          </div>
                        </template>
                        <AIconfont type="icon-share" />
                      </a-popover>
                      <a-divider type="vertical" />
                      <AIconfont type="icon-comment-text-outline" @click="handleShowCommet" />
                    </span>
                  </span>
                </span>
              </dd>
            </dl>
          </div>
        </a-skeleton>
      </div>
      <div class="simi" v-show="simis.songs&&simis.songs.length!==0">
        <a-skeleton active :loading="similoading">
          <dl>
            <dt style="margin:1vw 0vw;font-size:15px;">
              <h3>相似歌曲</h3>
            </dt>
            <dd
              class="simi-item"
              @click="handleMusic(sitem)"
              v-for="(sitem,sindex) in simis.songs"
              :key="sindex"
            >
              <span class="avatar">
                <a-avatar
                  style="height:5vw;width:5vw;"
                  shape="square"
                  :onerror="errorImg"
                  :src="sitem.album&&sitem.album.picUrl"
                  alt
                />
                <span class="avatar-tips">
                  <AIconfont class="avatar-tips-icon" type="icon-up1-copy" />
                </span>
              </span>
              <span class="simi-item-auth">
                <h4 style="margin:0">{{sitem.name}}</h4>
                <div
                  class="simi-item-auth-name"
                >{{sitem.artists.map((e) => e.name).toString().split(',').join('/')}}</div>
              </span>
            </dd>
          </dl>
        </a-skeleton>
      </div>
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
  get_comment_music,
  get_simi_song,
  get_comment_like,
} from '@/actions';
import { ERROR_IMG } from '@/constant/api';
import { notification, message } from 'ant-design-vue';
import { download, transformatDate } from '@/util/filters';
import axios from 'axios';

@Component
export default class Panel extends Vue {
  get isLike() {
    let result = this.like;
    const id = this.$store.state.music.data.id;
    const list = this.$store.state.user.likelist.ids;
    if (id && list) {
      result = list.some((e: any) => e === id);
    }
    return result;
  }
  // 解析歌词
  get parseLyric() {
    let result: any = [];

    if (this.songs.lyric) {
      if (this.songs.lyric.lrc) {
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
    }

    return result;
  }
  public songs: any = {};
  public comments: any = {};
  public simis: any = {};
  public comloading = true;
  public sonloading = true;
  public similoading = true;
  public visibleshare = false;

  public errorImg = ERROR_IMG;
  public isPress = false;
  public like = false;
  public percent = 0;

  @Prop() private msg!: string;
  public transformatDate = (e: any) => transformatDate(e, true);
  public async init() {
    const id = this.$store.state.music.data.id;
    this.comloading = true;
    this.sonloading = true;
    this.similoading = true;
    const res = await axios.all([
      get_song_detail(`${id}`),
      get_lyric(`${id}`),
      get_comment_music(`id=${id}`),
      get_simi_song(`id=${id}`),
      get_likelist(),
    ]);
    const [{ code, privileges, songs }, lyricres, commentres, simis] = res;
    this.comloading = false;
    this.sonloading = false;
    this.similoading = false;
    if (code === 200) {
      this.songs = songs[0];
    }
    if (lyricres.code === 200) {
      this.songs.lyric = lyricres;
    }
    if (commentres.code === 200) {
      this.comments = commentres;
    }
    if (simis.code === 200) {
      this.simis = simis;
    }
    await get_likelist();
    this.like = this.isLike;
  }
  public handleReport() {
    message.success('操作失败！社会注意核心价值观！');
  }
  public handleHideShare() {
    this.visibleshare = false;
  }
  public handleShowCommet() {
    // TODO
    return false;
  }
  public async handleResLike(item: any, index: any, state: any) {
    const id = this.$store.state.music.data.id;
    const { code } = await get_comment_like(
      `id=${id}&cid=${item.commentId}&t=${item.liked ? 0 : 1}&type=0`,
    );
    if (code === 200) {
      if (state === 'hot') {
        // this.$set(this.comments.hotComments[index], "liked", !item.liked);
        this.comments.hotComments[index].liked = !item.liked;
      } else {
        this.comments.comments[index].liked = !item.liked;
        // this.$set(this.comments.comments[index], "liked", !item.liked);
      }
      message.success('操作成功！');
    }
  }
  public handleMusic(item: any) {
    const params = {
      id: item.id,
      name: item.name,
      auth: item.artists
        .map((e: any) => e.name)
        .toString()
        .split(',')
        .join('/'),
      image: item.album.picUrl,
      duration: item.duration,
    };
    this.$store.commit('update_music_data', params);
  }
  public handleTogglePanel() {
    const showPanel = this.$store.state.music.showPanel;
    this.$store.commit('update_show_panel', !showPanel);
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
  public handleInit(args: any) {
    if (!args) {
      return;
    }
    this.init();
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
}
</script>


