<style lang="less" scoped>
.djprogram {
  padding: 10px;
  width: 100%;
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

  &-lists {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
  }
  &-list {
    flex: 0 0 42%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    border-top: 1px solid #efefef;
    margin: 0 4%;
    padding: 10px 0;
    cursor: pointer;

    &-left {
      &-img {
        height: 90px;
        width: 90px;
        border-radius: 5px;
        overflow: hidden;
        object-fit: cover;
      }
    }
    &-index {
      width: 10%;
      color: #999;
    }
    &-right {
      padding-left: 20px;
      align-self: flex-start;
      &-name {
        text-align: left;
        font-size: 14px;
        font-weight: 500;
      }
      &-auth {
        text-align: left;
      }
    }
  }
}
</style>

<template>
  <a-skeleton class="djprogram" :loading="loadingDjProgram" active>
    <div class="djprogram-main">
      <h3 class="djprogram-tips">
        主播电台
        <AIconfont class="djprogram-tips-icon" type="icon-right" />
      </h3>
      <dl class="djprogram-lists">
        <dd class="djprogram-list" v-for="(djprogram,index) in data" :key="index">
          <div class="djprogram-list-left">
            <img class="djprogram-list-left-img" :src="djprogram.picUrl" alt />
          </div>
          <div class="djprogram-list-right">
            <div class="djprogram-list-right-name">{{djprogram.name}}</div>
            <div class="djprogram-list-right-auth">{{djprogram.copywriter}}</div>
          </div>
        </dd>
      </dl>
    </div>
  </a-skeleton>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from "vue-property-decorator";

@Component({})
export default class Home extends Vue {
  loadingDjProgram = false;
  @Prop() private data!: any;
  @Watch("data")
  handleChange(arg: any) {
    console.log(arg);
    if (arg.length > 0) this.loadingDjProgram = false;
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
