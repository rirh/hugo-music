<style lang="less" scoped>
.recommed {
  &-tips {
    text-align: left;
    margin-left: 13px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    &-icon {
      font-size: 24px;
    }
  }
  &-recommed {
    padding: 10px;
    width: 100%;
    &-lists {
      margin-top: 10px;
      display: flex;
      width: 100%;
      flex-wrap: wrap;
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
        right: 14px;
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
        height: 135px;
        width: 135px;
        overflow: hidden;
        object-fit: cover;
      }
      &-name {
        font-size: 13px;
        text-align: left;
        padding: 5px 0;
        // word-break: break-all;
        width: 135px;
        color: #333;
        font-weight: 450;
      }
    }
  }
}
</style>

<template>
  <a-skeleton class="recommed" :loading="loadingRecommed" active>
    <div class="recommed-recommed">
      <h3 class="recommed-tips">
        推荐歌单
        <AIconfont class="recommed-tips-icon" type="icon-right" />
      </h3>
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
            <img class="recommed-recommed-list-img" :src="recommed.picUrl" alt />
            <div class="recommed-recommed-list-name">{{recommed.name}}</div>
          </div>
        </div>
      </div>
    </div>
  </a-skeleton>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from "vue-property-decorator";

@Component({})
export default class Home extends Vue {
  loadingRecommed = false;
  @Prop() private data!: any;
  @Watch("data")
  handleChange(arg: any) {
    if (arg.length > 0) this.loadingRecommed = false;
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
