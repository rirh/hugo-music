<style lang="less" scoped>
.exclusive {
  padding: 1vw;
  &-tips {
    text-align: left;
    margin-left: 1vw;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    &-icon {
      font-size: 24px;
    }
  }
  &-exclusive {
    &-main {
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      &-list {
        flex: 1;
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
          filter: brightness(80%);
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
.exclusive-exclusive-main-list:hover .exclusive-exclusive-main-list-img {
  filter: brightness(95%);
}
</style>

<template>
  <a-skeleton :loading="loadingExclusive" active>
    <div class="exclusive">
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
            <a-avatar
              shape="square"
              class="exclusive-exclusive-main-list-img"
              :onerror="errorImg"
              :src="exclusive.picUrl"
              alt
            />
            <div class="exclusive-exclusive-main-list-name">{{exclusive.name}}</div>
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
  public loadingExclusive = true;
  public errorImg = ERROR_IMG;
  @Prop() private data!: any;
  @Watch('data')
  public handleChange(arg: any) {
    if (arg.length > 0) {
      this.loadingExclusive = false;
    }
  }
}
</script>
