<style lang="less" scoped>
.newsong {
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
}
</style>

<template>
  <a-skeleton class="newsong" :loading="loading" active>
    
  </a-skeleton>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator';

@Component({})
export default class Home extends Vue {
  public loading = true;
  @Prop() private data!: any;
  @Watch('data')
  public handleChange(arg: any) {
    if (arg.length > 0) { this.loading = false; }
  }
}
</script>
