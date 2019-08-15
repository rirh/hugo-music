<style lang="less" scoped>
.lists {
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 1vw;
  flex-wrap: wrap;
  &-item {
    flex: 0 0 50%;
    overflow: hidden;
    padding: 0 1vw 3vw 1vw;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    &-info {
      align-self: flex-start;
      font-size: 12px;
      width: 100%;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      text-align: left;
      margin: 0.5vw 0 0;
    }
    &-box {
      position: relative;
      font-size: 12px;
      flex: 0 0 50%;
      margin-right: 2vw;
      &-count {
        position: absolute;
        color: white;
        top: 2px;
        right: 5px;
      }
      &-dur {
        position: absolute;
        color: white;
        right: 5px;
        bottom: 2px;
      }
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
        font-size: 20px;
        padding: 0.5vw;
        opacity: 0;
        transition: opacity 0.3s;
      }
    }
    &-img {
      height: 100px;
      width: 100%;
      filter: brightness(80%);
      transition: filter 0.2s;
    }
    &-title {
      font-size: 12px;
      width: 90%;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      text-align: left;
      margin: 0.5vw 0 0;
    }
    &-auth {
      font-size: 12px;
      color: var(--tagBg);
      text-align: left;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      text-align: left;
    }
  }
}
.lists-item-box:hover .lists-item-box-play {
  opacity: 1;
}
.lists-item-box:hover .lists-item-img {
  filter: brightness(95%);
}
h1{
  flex: 0 0 12%;
  text-align: left;
}
</style>

<template>
  <a-skeleton :loading="data.length===0" active>
    <div class="lists">
      <div
        class="lists-item"
        @click="handleItem(item)"
        v-for="(item,index) in data.data"
        :key="index"
      >
        <h1>{{index+1}}</h1>
        <div class="lists-item-box">
          <a-avatar
            class="lists-item-img"
            shape="square"
            :onerror="errorImg"
            :src="item.cover"
            alt
          />
          <span class="lists-item-box-count">
            <AIconfont type="icon-up1-copy" />
            <span>{{transformW(item.playCount)}}</span>
          </span>
          <span class="lists-item-box-dur"></span>
          <span class="lists-item-box-play">
            <AIconfont type="icon-up1-copy" />
          </span>
        </div>
        <div class="lists-item-info">
          <div class="lists-item-title">
            <strong>{{item.name}}</strong>
          </div>
          <div class="lists-item-auth">
            <span>{{item.artistName}}</span>
          </div>
          <div class="lists-item-auth">
            <span>{{item.briefDesc}}</span>
          </div>
        </div>
      </div>
    </div>
  </a-skeleton>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import { ERROR_IMG } from '@/constant/api';
import { get_cat_list } from '@/actions';
import { groupBy } from 'lodash';
import { transformW, transformSongTime } from '@/util/filters';
@Component({})
export default class Home extends Vue {
  public errorImg = ERROR_IMG;
  @Prop() public data: any;
  public transformW = (e: any) => transformW(e);
  public transformSongTime = (e: any) => transformSongTime(e);
  public handleItem(item: any) {
    this.$emit('on-item', item);
  }
}
</script>
