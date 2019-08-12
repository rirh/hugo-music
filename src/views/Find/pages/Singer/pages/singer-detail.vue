<style lang="less" scoped>
.wapper {
  display: flex;
  flex-direction: column;
  overflow: scroll;
}
.panel {
  display: flex;
  padding: 2vw;
  flex: 0 0 37.5%;
  &-img {
    width: 100%;
    height: 100%;
    max-width: 100%;
    max-height: 100%;
  }
  &-con {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    text-align: left;
    flex: 1;
    margin-left: 2vw;
    &-name {
      font-size: 18px;
      font-size: 24px;
      font-weight: bold;
      margin: 0;
    }
    &-alias {
      font-weight: normal;
      font-size: 12px;
      color: var(--bgcolor);
      margin: 1vw 0 0 0;
    }
    &-action {
      margin: 1vw 0;
    }
    &-num {
      font-size: 12px;
      color: var(--bgcolor);
    }
  }
}
.con {
  flex: 1;
  overflow-y: scroll;
}
</style>

<template>
  <div class="wapper">
    <div class="panel">
      <a-avatar
        shape="square"
        class="panel-img"
        :size="200"
        :onerror="errorImg"
        :src="$route.query&&$route.query.img1v1Url"
        alt
      />
      <span class="panel-con">
        <h2 class="panel-con-name">{{$route.query&&$route.query.name}}</h2>
        <strong class="panel-con-alias">{{filterName($route.query&&$route.query.alias)}}</strong>
        <span class="panel-con-action">
          <a-button type="primary" @click="$router.push('/userinfo')">
            <a-icon style="font-size: 18px;" type="folder-add" />收藏
          </a-button>&nbsp;
          <a-button type="primary" @click="$router.push('/userinfo')">
            <AIconfont type="icon-account" />个人主页
          </a-button>
        </span>
        <span class="panel-con-num">
          <label>单曲数：</label>
          <span>{{$route.query&&$route.query.musicSize}}</span>
          &nbsp;&nbsp;
          <label>专辑数：</label>
          <span>{{$route.query&&$route.query.albumSize}}</span>
        </span>
      </span>
    </div>
    <a-tabs class="con" defaultActiveKey="1" v-model="currtab" @change="callback">
      <a-tab-pane tab="歌手详情" key="1">
        <Singerdesc :data="artist" />
      </a-tab-pane>
      <a-tab-pane tab="歌手专辑" key="2" forceRender>
        <Singeralbum :data="album" />
      </a-tab-pane>
      <a-tab-pane tab="相似歌手" key="3">
        <Singersimi :data="simi" />
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import { get_artist_desc, get_artist_album, get_simi_artist } from '@/actions';
import { ERROR_IMG } from '@/constant/api';
import Singerdesc from './singer-detail-desc.vue';
import Singeralbum from './singer-detail-album.vue';
import Singersimi from './singer-detail-simi.vue';
import axios from 'axios';

@Component({ components: { Singerdesc, Singeralbum, Singersimi } })
export default class Radio extends Vue {
  public errorImg = ERROR_IMG;
  public currtab = '1';
  public artist = {};
  public album = {};
  public simi = {};
  public async mounted() {
    this.handleReload(this.$route.query);
  }
  @Watch('$route.query', { deep: true })
  public async handleReload(args: any) {
    this.artist = {};
    this.album = {};
    this.simi = {};
    this.currtab = '1';
    const res = await get_artist_desc(`id=${args.id}`);
    if (res.code === 200) { this.artist = res; }
  }
  public filterName(args: any) {
    let result = '';
    if (args) {
      if (args instanceof Array) {
        result = args
          .map((e: any) => e)
          .join('/')
          .toString();
      } else {
        result = args;
      }
    }
    return result;
  }

  public async callback(args: any) {
    args = Number(args);
    if (args === 2) {
      if (JSON.stringify(this.album) === '{}') {
        const res = await get_artist_album(`id=${this.$route.query.id}`);
        if (res.code === 200) { this.album = res; }
      }
    } else if (args === 3) {
      if (JSON.stringify(this.album) === '{}') {
        const res = await get_simi_artist(`id=${this.$route.query.id}`);
        if (res.code === 200) { this.simi = res; }
      }
    }
  }
}
</script>
