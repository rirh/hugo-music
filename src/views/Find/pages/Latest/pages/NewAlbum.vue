
<style lang="less" scoped>
.album {
  display: flex;
  flex-wrap: wrap;
  padding-bottom: 8vw;
  -webkit-overflow-scrolling: touch;

  &-list {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex: 0 0 25%;
    margin: 0.5vw 0 0 0;
    cursor: pointer;

    &-box {
      width: 153px;
      height: 130px;
      // background-image: url("https://s2.music.126.net/style/web2/img/coverall.png?8661a9c0740afaf20956bb2941b2ecc8");
      background-image: url("../../../../../assets/coverall.png");
      background-position: 0 -845px;
      text-align: left;
      position: relative;
    }
    &-img {
      width: 130px;
      height: 130px;
      justify-items: flex-start;
      align-self: flex-start;
      &-play {
        position: absolute;
        right: 50%;
        top: 50%;
        color: var(--red);
        background: rgba(255, 255, 255, 0.6);
        transform: translate(50%, -50%);
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        font-size: 25px;
        padding: 1vw;
        opacity: 0;
      }
    }
  }
}
.album-list:hover .album-list-img-play {
  opacity: 1;
}
.album-list:hover .album-list-img {
  transition: filter 0.3s;
  filter: brightness(1.1) contrast(110%);
}
</style>

<template>
  <a-skeleton :loading="loadingAlbum" active>
    <div class="album">
      <div class="album-list" v-for="(item,index) in data" :key="index" @click="handleAlbum(item)">
        <span class="album-list-box">
          <a-avatar
            class="album-list-img"
            shape="square"
            :onerror="errorImg"
            :src="item.picUrl"
            alt
          />
          <span class="album-list-img-play">
            <AIconfont type="icon-up1-copy" />
          </span>
        </span>
        <span>{{item.name.length > 20 ? `${item.name.substring(0, 20)}...` : item.name}}</span>
        <span>{{subAr(item.artists)}}</span>
      </div>
    </div>
  </a-skeleton>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import { ERROR_IMG } from '@/constant/api';
import { transformW, transformatDate } from '@/util/filters';
import {
  get_play_song_detail,
  get_play_song_comment,
  get_play_song_subscribers,
} from '@/actions';

@Component({ components: {} })
export default class Home extends Vue {
  public errorImg = ERROR_IMG;

  public loadingAlbum = false;
  @Prop() public data: any;
  public subAr(msg: any) {
    let result = msg
      .map((e: any) => e.name)
      .toString()
      .split(',')
      .join('/');
    result = result.length > 14 ? `${result.substring(0, 14)}...` : result;
    return result;
  }
  public handleChange(arg: any) {
    if (arg) {
      this.loadingAlbum = false;
    }
  }
  public handleAlbum(item: any) {
    this.$router.push({
      path: '/album-detail',
      query: item,
    });
  }
}
</script>
