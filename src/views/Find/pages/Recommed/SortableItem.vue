<style lang="less" scoped>
</style>

<template>
  <!-- <li class="list-item">{{item}}</li> -->
  <dd class="ordermodal-main-list">
    <span>{{item.name}}</span>
    <a-icon class="ordermodal-main-list-logo" type="align-right" />
  </dd>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch, Mixins } from 'vue-property-decorator';
import { ContainerMixin, ElementMixin } from 'vue-slicksort';
const mix: any = ElementMixin;
@Component({})
export default class Home extends Mixins(mix) {
  @Prop() private item!: any;
}
</script>
