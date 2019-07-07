<style lang="less" scoped>
.recommed {
  padding: 1vw;
  &-tips {
    text-align: left;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin-left: 1vw;
    &-icon {
      font-size: 24px;
    }
  }
  &-recommed {
    padding: 4vw;
    width: 100%;
    &-lists {
      margin-top: 10px;
      display: flex;
      width: 100%;
      flex-wrap: wrap;
      align-items: flex-start;
    }
    &-list {
      flex: 0 0 20%;
      cursor: pointer;

      &-main {
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
      }
      &-playcount {
        position: absolute;
        right: 1.4vw;
        top: 0;
        color: white;
        &-logo {
          font-size: 14px;
        }
        &-count {
          font-weight: 500;
          font-size: 12px;
        }
      }
      &-img {
        border-radius: 5px;
        height: 20vh;
        width: 14vw;
        overflow: hidden;
        object-fit: cover;
      }
      &-img:hover {
        cursor: pointer;
        transition: filter 0.3s;
        filter: brightness(1.1) contrast(110%);
      }
      &-name {
        font-size: 13px;
        text-align: left;
        padding: 0.5vw 0;
        // word-break: break-all;
        width: 14vw;
        color: #333;
        font-weight: 450;
      }
    }
  }
}
</style>

<template>
  <a-skeleton :loading="loadingList" active>
    <div class="recommed">
      <div class="recommed-recommed">
        <div type="flex" class="recommed-recommed-lists">
          <!-- <div
            class="recommed-recommed-list"           
          >
            <div class="recommed-recommed-list-main">
              <span class="recommed-recommed-list-playcount">
                <AIconfont class="recommed-recommed-list-playcount-logo" type="icon-up1-copy" />
                <span
                  class="recommed-recommed-list-playcount-count"
                >{{transformW(123123)}}</span>
              </span>
              <img class="recommed-recommed-list-img" src="recommed.picUrl" alt />
              <div class="recommed-recommed-list-name">asdf</div>
            </div>
          </div>-->
          <div class="recommed-recommed-list" v-for="(recommed,index) in data" :key="index">
            <div class="recommed-recommed-list-main">
              <span class="recommed-recommed-list-playcount">
                <AIconfont class="recommed-recommed-list-playcount-logo" type="icon-up1-copy" />
                <span
                  class="recommed-recommed-list-playcount-count"
                >{{transformW(recommed.playCount)}}</span>
              </span>
              <a-avatar
                class="recommed-recommed-list-img"
                :onerror="errorImg"
                :src="recommed.coverImgUrl"
                alt
              />
              <div class="recommed-recommed-list-name">{{recommed.name}}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </a-skeleton>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import { ERROR_IMG } from '@/constant/api';

@Component({})
export default class Home extends Vue {
  public errorImg = ERROR_IMG;
  public loadingList = true;
  @Prop() public data: any;
  @Watch('data')
  public handleChange(arg: any) {
    if (arg.length > 0) {
      this.loadingList = false;
    }
  }

  /**
   * 转化为万做单位函数
   */
  public transformW(args: any) {
    let result: any = 0;
    const batter = 10000;
    const cursor = Number(args);
    if (!isNaN(cursor)) {
      if (cursor > batter) {
        const value = Math.floor(cursor / batter);
        result = `${value}万`;
      } else {
        result = cursor;
      }
    }
    return result;
  }
}
</script>
