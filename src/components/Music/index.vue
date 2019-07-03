<style lang="less" scoped>
.wapper {
  height: 100%;
  width: 100%;
  background-color: white;
  z-index: 4;

}
</style>

<template>
  <div class="wapper"></div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class HelloWorld extends Vue {
  @Prop() private msg!: string;
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
</style>
