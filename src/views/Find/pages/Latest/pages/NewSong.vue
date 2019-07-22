
<style lang="less" scoped>
.wapper {
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  justify-content: flex-start;
  flex-wrap: wrap;
  &-list {
    min-width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1vw 1vw;
  }

  &-list-name {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    &-index {
      color: var(--textColor);
    }
    &-img {
      height: 7vw;
      width: 7vw;
      margin: 0.4vw 1vw;
    }
  }
}
.striped {
  background-color: var(--striped);
}
.wapper-list:hover {
  background-color: var(--stripedHover);
}
.imgbox {
  position: relative;
}
.play {
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
}
</style>

<template>
  <a-skeleton :loading="loadingDetail" active>
    <div class="wapper">
      <div
        class="wapper-list"
        v-for="(item,index) in data"
        :key="index"
        :class="{'striped':index%2===0}"
        @click="handleMusic(item)"
      >
        <div class="wapper-list-name">
          <span class="wapper-list-name-index">{{leftpad(index+1)}}</span>
          <span class="imgbox">
            <a-avatar
              class="wapper-list-name-img"
              shape="square"
              :onerror="errorImg"
              :src="item.album.picUrl"
              alt
            />
            <span class="play">
              <AIconfont type="icon-up1-copy" />
            </span>
          </span>

          <strong>{{item.name}}</strong>
        </div>
        <div>
          <span>{{item.artists.map(e=>e.name).toString().split(',').join('/') }}</span>
          <span>{{item.album.name}}</span>
        </div>
        <div>
          <span>{{transformTimer(item.duration/1000)}}</span>
        </div>
      </div>
    </div>
  </a-skeleton>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import { ERROR_IMG } from '@/constant/api';
import {
  transformW,
  transformatDate,
  transformTimer,
  leftpad,
} from '@/util/filters';

import {
  get_play_song_detail,
  get_play_song_comment,
  get_play_song_subscribers,
} from '@/actions';

@Component({ components: {} })
export default class Home extends Vue {
  public errorImg = ERROR_IMG;
  public loadingDetail = false;

  @Prop() public data: any;
  public leftpad = (e: any) => leftpad(e, 2, 0);

  public transformTimer = (e: any) => transformTimer(e);
  @Watch('data')
  public handleChange(arg: any) {
    if (arg) {
      this.loadingDetail = false;
    }
  }
  public handleMusic(item: any) {
    const params = {
      id: item.id,
      name: item.name,
      auth: item.artists.map((e: any) => e.name).toString().split(',').join('/'),
      image: item.album.picUrl,
      duration: item.duration,
    };
    this.$store.commit('updata_music_data', params);
  }
}
</script>
