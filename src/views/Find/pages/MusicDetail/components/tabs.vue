<style lang="less" scoped>
.panel {
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
}
</style>

<template>
  <a-skeleton :loading="loadingDetail" active>
    <a-tabs defaultActiveKey="1" @change="callback">
      <a-tab-pane tab="歌曲列表" key="1">
        <div v-for="(item,index) in data" :key="index">{{item.id}}</div>
      </a-tab-pane>
      <a-tab-pane tab="评论" key="2" forceRender>Content of Tab Pane 2</a-tab-pane>
      <a-tab-pane tab="收藏者" key="3">Content of Tab Pane 3</a-tab-pane>
    </a-tabs>
  </a-skeleton>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from "vue-property-decorator";
import { ERROR_IMG } from "@/constant/api";
import { transformW, transformatDate } from "@/util/filters";

@Component({})
export default class Home extends Vue {
  public errorImg = ERROR_IMG;
  public showDescription = false;
  public loadingDetail = true;
  public transformW = (e: any) => transformW(e);
  public transformatDate = (e: any) => transformatDate(e, false);
  @Prop() public data: any;
  @Watch("data")
  public handleChange(arg: any) {
    if (arg) {
      this.loadingDetail = false;
    }
  }
  callback() {}
}
</script>
