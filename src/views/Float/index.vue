<style lang="less" scoped>
</style>

<template>
  <div class="detail">悬浮窗口页面</div>
</template>
<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
@Component({})
export default class Floats extends Vue {
  @Prop() public data: any;
}
</script>