<style lang="less" scoped>
.pagination {
  margin-bottom: 4vw;
}
</style>

<template>
  <div class="pagination">
    <a-skeleton :loading="loadingPagination" active>
      <a-pagination @change="onchange" v-model="current" :defaultPageSize="100" :total="data.total" />
    </a-skeleton>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch, Emit } from 'vue-property-decorator';

@Component({})
export default class Home extends Vue {
  public loadingPagination = false;
  @Prop() public data: any;
  public current = 1;
  @Emit('on-change')
  public onchange(n: any) {
    return n;
  }
  public handleChange(arg: any) {
    if (arg.length > 0) {
      this.loadingPagination = true;
    }
  }
}
</script>
