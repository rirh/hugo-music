<style lang="less" scoped>
</style>

<template>
  <dl ref="lists" class="ordermodal-main-lists" >
    <slot />
  </dl>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch, Mixins } from 'vue-property-decorator';
import { ContainerMixin, ElementMixin } from 'vue-slicksort';
const mix: any = ContainerMixin;
@Component({})
export default class Home extends Mixins(mix) {}
</script>
