<style lang="less" scoped>
.wapper {
  display: flex;
  flex-direction: column;
  padding: 3vw;

  &-list {
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    flex-wrap: wrap;
    flex: 1;
    &-img {
      height: 17vw;
      width: 17vw;
    }
    &-top {
      margin-left: 3vw;
      display: flex;
      justify-content: flex-start;
      align-items: flex-start;
      flex-wrap: wrap;
      flex-direction: column;
      flex: 1;
      padding: 0 1vw;

      &-list {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        min-width: 100%;
        padding: 1vw 0.5vw;
      }

      &-list:hover {
        background-color: var(--stripedHover);
      }
    }
  }
}
.world {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  padding-bottom: 2vw;
  &-name {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    width: 13vw;
  }
  &-img {
    position: relative;
    &-count {
      position: absolute;
      right: 0.5vw;
      top: 0.2vw;
      color: var(--bgColor);
    }
    &-play {
      position: absolute;
      right: 50%;
      top: 50%;
      color: var(--red);
      background: rgba(255, 255, 255, 0.6);
      transform: translate(50%, -25%);
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 50%;
      font-size: 45px;
      padding: 1vw;
      opacity: 0;
    }
  }
}
.striped {
  background-color: var(--striped);
}
.space-between {
  margin: 1.5vw 0.6vw;
  overflow: hidden;
}
.space-between:hover .world-img-play {
  opacity: 1;
}
</style>

<template>
  <a-skeleton :loading="loadingTop" active>
    <dl class="wapper">
      <dt style="text-align:left">
        <h3>官方榜</h3>
      </dt>
      <dd v-for="(item,index) in list" :key="index" v-show="item.tracks.length">
        <div class="wapper-list">
          <span class="wapper-list-img">
            <a-avatar
              class="wapper-list-img"
              shape="square"
              :onerror="errorImg"
              :src="item&&item.coverImgUrl"
              @click="handleMusicDetail(item)"
              alt
            />
          </span>
          <dl class="wapper-list-top" @dblclick="handleMusic(item)">
            <dd
              class="wapper-list-top-list"
              :class="{'striped':tindex%2===0}"
              v-for="(top,tindex) in item.tracks"
              :key="tindex"
            >
              <span>
                <b style="color:var(--red)">{{tindex+1}}</b>&nbsp;&nbsp;
                <strong>{{top.first}}</strong>
              </span>
              <span>{{top.second}}</span>
            </dd>
            <dd class="wapper-list-top-list">
              <span>
                <strong>查看全部</strong>
              </span>
              <span>&nbsp;</span>
            </dd>
          </dl>
        </div>
      </dd>
      <dt style="text-align:left">
        <h3>全球榜</h3>
      </dt>
      <div class="world">
        <dd
          class="space-between"
          v-for="(item) in list"
          :key="item.id"
          v-show="!item.tracks.length"
        >
          <div class="wapper-list">
            <span class="wapper-list-img world-img">
              <a-avatar
                class="wapper-list-img"
                shape="square"
                :onerror="errorImg"
                :src="item&&item.coverImgUrl"
                @click="handleMusicDetail(item)"
                alt
              />
              <span class="world-img-count">
                <AIconfont type="icon-up1-copy" />
                <span>{{transformW(item.playCount)}}</span>
              </span>
              <span class="world-img-play">
                <AIconfont type="icon-up1-copy" />
              </span>
            </span>
          </div>
          <div class="world-name">{{item.name}}</div>
        </dd>
      </div>
    </dl>
  </a-skeleton>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import { ERROR_IMG } from '@/constant/api';
import { get_top_list } from '@/actions';
import {
  transformTimer,
  leftpad,
  scliceValue,
  transformW,
} from '@/util/filters';

@Component({})
export default class Home extends Vue {
  public errorImg = ERROR_IMG;
  public loadingTop = true;
  public list = [];

  @Prop() public data: any;
  public transformW = (e: any) => transformW(e);
  public async mounted() {
    const { code, list } = await get_top_list();
    this.loadingTop = false;
    if (code === 200) {
      this.list = list;
    }
  }
  @Watch('data')
  public handleChange(arg: any) {
    if (arg.name) {
      this.loadingTop = false;
    }
  }
  public handleMusicDetail(item: any) {
    this.$router.push({
      path: '/find/music/detail',
      query: { ...item },
    });
  }
  public handleMusic(item: any) {
    return false;
  }
}
</script>
