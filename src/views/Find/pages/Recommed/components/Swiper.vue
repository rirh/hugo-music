<style lang="less" scoped>
.ant-carousel /deep/ .slick-slide {
  text-align: center;
  height: 295px;
  overflow: hidden;
}

.ant-carousel /deep/ .slick-slider {
  width: 800px;
  height: 100%;
}
.ant-carousel /deep/ .custom-slick-arrow {
  width: 25px;
  height: 25px;
  font-size: 25px;
  color: #fff;
  background-color: rgba(31, 45, 61, 0.11);
  border-radius: 20px;
  opacity: 0.3;
}
.ant-carousel /deep/ .custom-slick-arrow:before {
  display: none;
}
.ant-carousel /deep/ .custom-slick-arrow:hover {
  opacity: 0.5;
}

.ant-carousel /deep/ .slick-slide h3 {
  color: #fff;
}
.swiper {
  &-swiper {
    display: flex;
    justify-content: center;
    align-items: center;
    &-list {
      border-radius: 20px;
      position: relative;
      cursor: pointer;

      &-img {
        height: 100%;
        width: 100%;
      }
      &-tips {
        position: absolute;
        right: 0;
        bottom: 0;
        height: 30px;
        line-height: 30px;
        width: 80px;
        border-top-left-radius: 20px;
        background-color: var(--btnRed);
        color: var(--white);
      }
    }
  }
}
</style>

<template>
  <a-skeleton class="swiper" :loading="loading" active>
    <div class="swiper-swiper">
      <a-carousel arrows autoplay>
        <div slot="prevArrow" class="custom-slick-arrow" style="left: 10px;zIndex: 1">
          <a-icon type="left-circle" />
        </div>
        <div slot="nextArrow" class="custom-slick-arrow" style="right: 10px">
          <a-icon type="right-circle" />
        </div>
        <div class="swiper-swiper-list" v-for="(banner,index) in data" :key="index">
          <img class="swiper-swiper-list-img" :src="banner.imageUrl" alt />
          <span class="swiper-swiper-list-tips">{{banner.typeTitle}}</span>
        </div>
      </a-carousel>
    </div>
  </a-skeleton>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from "vue-property-decorator";

@Component({})
export default class Home extends Vue {
  loading = true;
  @Prop() private data!: any;
  @Watch("data")
  handleChange(arg: any) {
    if (arg.length > 0) this.loading = false;
  }
}
</script>
