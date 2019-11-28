<style lang="less" scoped>
</style>
<template>
  <Avatar ref="image" v-on="$listeners" :src="src" v-bind="$attrs"></Avatar>
</template>
<script lang="ts">
/**
 * HOC VUE组件
 * 问题：
 * 音乐播放器的图片使用ant-design-vue Avatar组件实现；
 * 当有tab切换页且图片很多时页面非常卡顿,体验不好需要优化
 * 解决
 * 使用高阶组件对avatar进行封装
 * 监听图片是否在可见视图中 对可见的图片进行网络请求实现懒加载
 *
 */
import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import ant from 'ant-design-vue';
const Avatar: any = ant.Avatar;
@Component({
  components: {
    Avatar,
  },
})
export default class Avatars extends Vue {
  //   @Prop() public data: any;
  public cach = '';
  public realadder = '';
  public src = '';
  @Watch('$attrs', { deep: true })
  public asyncSrc(params: any) {
    if (params.src) {
      this.src = params.src;
    }
  }

  public mounted() {
    this.realadder = this.$attrs.src;
    const image_dom: any = this.$refs.image;
    // this.lazyLoad(imageDom.$el, (this as any).$attrs.src);
    const observer = new IntersectionObserver((entries: any) => {
      entries.forEach((el: any) => {
        const isintersecting = el.isIntersecting;

        if (isintersecting) {
          this.src = this.realadder;
        }
      });
    });
    // const dom: any = document.querySelector(".HolyGrail-content");
    observer.observe(image_dom.$el);
    // console.log( window.document);

    // window.document.addEventListener("scroll", () => {
    //   console.log("滚动中...");
    //   this.lazyLoad(imageDom.$el, (this as any).$attrs.src);
    // });
  }
}
</script>

