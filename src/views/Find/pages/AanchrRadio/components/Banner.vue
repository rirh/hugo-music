<style lang="less" scoped>
</style>

<template>
  <div class="detail">
    <Banner />
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
@Component({ components: { Banner } })
export default class Banner extends Vue {
  @Prop() public data: any;
}
</script>
