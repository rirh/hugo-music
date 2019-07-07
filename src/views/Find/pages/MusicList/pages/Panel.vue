<style lang="less" scoped>
.wapper {
  display: flex;
  // background-color: var(--red);
  border-radius: 10px;
  align-items: center;
  padding: 2vw;
  z-index: 0;

  // -webkit-filter: blur(20px);
  // -moz-filter: blur(20px);
  // -ms-filter: blur(20px);
  // -o-filter: blur(20px);
  // // filter: blur(20px);
  background-attachment: fixed;
  background-position: top;
  background-size: cover;
  position: relative;
  background-size: 100%;
  &-bg {
    position: absolute;
    height: 100%;
    width: 100%;
    top: 0;
    left: 0;
    border-radius: 10px;
    // -webkit-filter: blur(20px);
    // -moz-filter: blur(20px);
    // -ms-filter: blur(20px);
    // -o-filter: blur(20px);
    // filter: blur(20px);
    background-attachment: fixed;
    background-position: top;
    background-size: cover;
    position: relative;
    filter: blur(5px);
  }
  // &-left1 {
  //   position: absolute;
  //   height: 100%;
  //   width: 100%;
  //   top: 0;
  //   left: 0;
  //   border-radius: 10px;
  //   // -webkit-filter: blur(20px);
  //   // -moz-filter: blur(20px);
  //   // -ms-filter: blur(20px);
  //   // -o-filter: blur(20px);
  //   // filter: blur(20px);
  //   background-attachment: fixed;
  //   background-position: center;
  //   background-size: cover;
  //   background-repeat: no-repeat;
  //   filter: blur(5px);
  // }
  &-left {
    display: flex;
    align-items: center;
    justify-content: center;
    &-img {
      height: 14vw;
      width: 14vw;
      border-radius: 10px;
    }
  }
  &-right {
    display: flex;
    // align-items: flex-start;
    // justify-content: flex-start;
    flex-direction: column;
    text-align: left;
    margin-left: 1vw;
    &-title {
      color: var(--yellow);
      border: 1px solid var(--yellow);
      padding: 3px 10px;
      border-radius: 20px;
      width: 100px;
      font-weight: 500;
      &-icon {
        font-size: 16px;
        margin-right: 0.2vw;
      }
    }
    &-name {
      color: white;
      margin-top: 2vw;
      font-size: 16px;
    }
    &-copywriter {
      color: var(--white);
      margin-top: 1vw;
      font-size: 13px;
    }
  }
}
// .wapper:after {
//   content: "";
//   background: inherit;
//   filter: blur(20px);
//   z-index: 2;
// }
// .ape{
//     position: absolute;
//     height: 100%;
//     width: 100%;
//     top: 0;
//     left: 0;
//     border-radius: 10px;
//     // -webkit-filter: blur(20px);
//     // -moz-filter: blur(20px);
//     // -ms-filter: blur(20px);
//     // -o-filter: blur(20px);
//     // filter: blur(20px);
//     background-attachment: fixed;
//     background-position: center;
//     background-size: cover;
//     background-repeat: no-repeat;
//     filter: blur(5px);

// }
</style>

<template>
  <a-skeleton :loading="loadingPanel" active>
    <div class="wapper" :style="`background-image: url(${data&&data.coverImgUrl})`">
      <div class="wapper-bg" :style="`background-image: url(${data&&data.coverImgUrl})`"></div>
      <div class="wapper-left">
        <a-avatar
          shape="square"
          class="wapper-left-img"
          :onerror="errorImg"
          :src="data&&data.coverImgUrl"
          alt
        />
      </div>
      <div class="wapper-right">
        <div class="wapper-right-title">
          <AIconfont class="wapper-right-title-icon" type="icon-crown" />
          <span>精品歌单</span>
        </div>
        <div class="wapper-right-name">{{data&&data.name}}</div>
        <div class="wapper-right-copywriter">{{data&&data.copywriter}}</div>
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
  public loadingPanel = true;
  @Prop() public data: any;
  @Watch('data')
  public handleChange(arg: any) {
    if (arg.name) {
      this.loadingPanel = false;
    }
  }
}
</script>
