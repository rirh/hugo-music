<style lang="less" scoped>
.contant {
  background-color: var(--bgColor);
}
.brawer /deep/ .ant-drawer-body {
  padding: 0;
}
.brawer {
  margin-top: 7.3vh;
}
.ant-drawer.ant-drawer-open .ant-drawer-mask {
  opacity: 0;
}
</style>

<template>
  <a-drawer
    :closable="false"
    :mask="true"
    :width="os.width*width"
    wrapClassName="brawer"
    placement="right"
    @close="onClose"
    :visible="visible"
    :destroyOnClose="true"
    :maskStyle="{'display':showMake?'block':'none'}"
  >
    <slot name="content" class="contant"></slot>
  </a-drawer>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch, Model } from 'vue-property-decorator';
import { os } from '@/util/filters';
@Component({})
export default class Drawer extends Vue {
  public seachList = {};
  public os = os();
  public showMake = false;
  @Prop({ default: 0.364 }) private width!: number;
  @Prop()
  @Model('change')
  private visible!: boolean;
  public showDrawer() {
    this.visible = true;
  }
  @Watch('visible')
  public handleChange(msg: any) {
    const timer = msg ? 100 : 300;
    setTimeout(() => {
      this.showMake = msg;
    }, timer);
  }
  public onClose() {
    this.$emit('change', false);
  }
}
</script>

