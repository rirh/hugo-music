<style lang="less" scoped>
</style>

<template>
  <div>
    <span v-for="(type,tindex) in data" :key="tindex">
      <a-checkable-tag
        :key="tindex"
        :checked="type.key===selectedTypes"
        @change="selectedTypes=type.key"
      >{{type.lable}}</a-checkable-tag>
      <a-divider type="vertical" />
    </span>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Model } from 'vue-property-decorator';
import routers from '@/routers';

@Component
export default class Tags extends Vue {
  public selectedTypes: any = null;
  @Prop() private data!: string;
  @Model('change')
  private visible!: boolean;


}
</script>

