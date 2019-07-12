<style lang="less" scoped>
.contant {
  background-color: var(--bgColor);
}
</style>

<template>
  <a-drawer
    :mask="false"
    :width="os.width*width"
    class="brawer"
    placement="right"
    :closable="false"
    @close="onClose"
    :visible="visible"
    :destroyOnClose="true"
  >
    <slot name="content" class="contant"></slot>
  </a-drawer>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch, Model } from "vue-property-decorator";
import { os } from "@/util/filters";
@Component({})
export default class Drawer extends Vue {
  public seachList = {};
  @Prop({ default: 0.364 }) private width!: number;
  @Prop()
  @Model("change")
  private visible!: boolean;
  public showDrawer() {
    this.visible = true;
  }
  public os = os();
  public onClose() {
    this.$emit("change", false);
  }
}
</script>

