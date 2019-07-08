<style lang="less" scoped>
.wapper {
  height: 100%;
  width: 98%;
  margin-left: 2%;
  background-color: var(--red);
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  &-link {
    color: var(--white);
    font-weight: 500;
    cursor: default;
    z-index: 2;
  }
  &-link:hover {
    font-weight: bold;
    color: white;
  }
}
.active {
  font-weight: bold;
  color: white;
}
</style>

<template>
  <div class="wapper">
    <router-link
      :class="{'active':activeMenu(menu)}"
      class="wapper-link"
      v-for="(menu,index) in router"
      tag="span"
      v-show="!menu.show"
      :key="index"
      :to="menu.path"
    >{{menu.name}}</router-link>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import routers from '@/routers';

@Component
export default class HelloWorld extends Vue {
  @Prop() private msg!: string;
  get router() {
    let result: any = [];
    const router: any = routers;
    const { fullPath }: any = this.$route;
    if (fullPath) {
      const findFatherRouter = (e: any) => ~fullPath.indexOf(e.path);
      const routerCursor = router.find(findFatherRouter);
      if (routerCursor) {
        result = routerCursor.children;
      }
    }
    return result;
  }
  public activeMenu(arg: any) {
    let result = false;
    const { fullPath } = this.$route;
    if (~fullPath.indexOf(arg.path)) {
      result = true;
    }
    return result;
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
</style>
