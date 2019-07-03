<style lang="less" scoped>
.exclusive {
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
  &-exclusive {
    padding: 10px;
    width: 100%;
    &-main {
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      &-list {
        flex: 0 0 33%;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        position: relative;
        cursor: pointer;

        &-tips {
          position: absolute;
          left: 16px;
          top: 4px;
          height: 20px;
          width: 20px;
          border-radius: 50%;
          border: 1px solid #f4f4f4;
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1;
          background-color: rgba(0, 0, 0, 0.56);
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
  <a-skeleton class="exclusive" :loading="loadingExclusive" active>
    <div class="exclusive-exclusive">
      <h3 class="exclusive-tips">
        独家放送
        <AIconfont class="exclusive-tips-icon" type="icon-right" />
      </h3>
      <div class="exclusive-exclusive-main">
        <div v-for="(exclusive,index) in data" :key="index" class="exclusive-exclusive-main-list">
          <span class="exclusive-exclusive-main-list-tips">
            <AIconfont type="icon-up1-copy" />
          </span>
          <img class="exclusive-exclusive-main-list-img" :src="exclusive.picUrl" alt />
          <div class="exclusive-exclusive-main-list-name">{{exclusive.name}}</div>
        </div>
      </div>
    </div>
  </a-skeleton>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from "vue-property-decorator";

@Component({})
export default class Home extends Vue {
  loadingExclusive = false;
  @Prop() private data!: any;
  @Watch("data")
  handleChange(arg: any) {
    if (arg.length > 0) this.loadingExclusive = false;
  }
}
</script>
