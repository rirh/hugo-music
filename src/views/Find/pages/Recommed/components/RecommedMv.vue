<style lang="less" scoped>
.recommedmv {
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
  &-recommedmvs {
    padding: 10px;
    width: 100%;
    &-main {
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      &-list {
        flex: 0 0 25%;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        position: relative;
        cursor: pointer;

        &-tips {
          position: absolute;
          right: 16px;
          top: 4px;
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1;
          color: white;
        }
        &-img {
          border-radius: 5px;
          height: 100%;
          width: 90%;
          overflow: hidden;
          object-fit: cover;
        }
        &-name {
          font-size: 13px;
          text-align: left;
          padding: 5px 0;
          // word-break: break-all;
          width: 90%;
          color: #333;
          font-weight: 450;
        }
      }
    }
  }
}
</style>

<template>
  <a-skeleton class="recommedmv" :loading="loadingRecommedmv" active>
    <div class="recommedmv-recommedmvs">
      <h3 class="recommedmv-tips">
        推荐MV
        <AIconfont class="recommedmv-tips-icon" type="icon-right" />
      </h3>
      <div class="recommedmv-recommedmvs-main">
        <div
          v-for="(recommedmv,index) in data"
          :key="index"
          class="recommedmv-recommedmvs-main-list"
        >
          <span class="recommedmv-recommedmvs-main-list-tips">
            <AIconfont class="recommedmv-recommedmvs-list-playcount-logo" type="icon-up1-copy" />
            <span
              class="recommedmv-recommedmvs-list-playcount-count"
            >{{transformW(recommedmv.playCount)}}</span>
          </span>
          <img class="recommedmv-recommedmvs-main-list-img" :src="recommedmv.picUrl" alt />
          <div class="recommedmv-recommedmvs-main-list-name">
            <div>{{recommedmv.name}}</div>
            <div style="color:#999">{{recommedmv.artistName}}</div>
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
  loadingRecommedmv = false;
  @Prop() private data!: any;
  @Watch("data")
  handleChange(arg: any) {
    console.log(arg);
    if (arg.length > 0) this.loadingRecommedmv = false;
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
