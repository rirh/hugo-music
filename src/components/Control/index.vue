<style lang="less" scoped>
.wapper {
  height: 100%;
  width: 100%;
  background-color: var(--bgColor);
  overflow: hidden;
  &-avatar {
    height: 50px;
    display: flex;
    justify-content: flex-start;
    align-content: center;
    // justify-items: center;
    align-items: center;
    padding: 10px;
    color: var(--textColor);
    &-nickname {
      font-weight: 500;
      margin-left: 10px;
    }
    &-icon {
      color: #999;
      margin-left: 5px;
      font-size: 14px;
    }
  }
  &-tips {
    width: 100%;
    justify-self: flex-start;
    display: flex;
    color: var(--tipsColor);
    margin-left: 1vw;
  }
  &-main {
    margin-top: 10px;
    &-list {
      display: flex;
      height: 36px;
      align-items: center;
      cursor: default;
      margin: 0;
      &-icon {
        font-size: 18px;
        margin-left: 2vw;
      }
      &-link {
        margin-left: 10px;
        font-weight: 500;
        flex: 1;
        text-align: left;
        font-size: 13px;
      }
    }
    .active {
      background-color: var(--menuHover);
      color: var(--red);
    }
    &-list:hover {
      background-color: var(--menuHover);
    }
  }
}
</style>

<template>
  <div class="wapper">
    <div class="wapper-avatar">
      <a-avatar
        class="wapper-avatar-img"
        :size="40"
        icon="user"
        src="https://p4.music.126.net/3MgFgSJlCOwuBpeQYgfBeA==/109951164091701286.jpg"
      />
      <span class="wapper-avatar-nickname">凛榕YESE</span>
      <a-icon class="wapper-avatar-icon" type="caret-right" />
    </div>
    <dl class="wapper-main">
      <dd
        :class="{'active':activeMenu(menu)}"
        class="wapper-main-list"
        v-for="(menu,index) in menu1"
        :key="index"
      >
        <AIconfont class="wapper-main-list-icon" :type="menu.type" />
        <!-- <a-icon class="wapper-main-list-icon" :type="menu.type" /> -->
        <router-link class="wapper-main-list-link" tag="span" :to="menu.path">{{menu.name}}</router-link>
      </dd>
    </dl>
    <h5 class="wapper-tips">我的音乐</h5>
    <dl class="wapper-main">
      <dd
        :class="{'active':activeMenu(menu)}"
        class="wapper-main-list"
        v-for="(menu,index) in menu2"
        :key="index"
      >
        <AIconfont class="wapper-main-list-icon" :type="menu.type" />
        <!-- <a-icon class="wapper-main-list-icon" :type="menu.type" /> -->
        <router-link class="wapper-main-list-link" tag="span" :to="menu.path">{{menu.name}}</router-link>
      </dd>
    </dl>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import Nav from "@/routers";

@Component
export default class HelloWorld extends Vue {
  get menu1() {
    let result = [];
    const menus = JSON.parse(JSON.stringify(this.menus));
    result = menus.slice(0, 4);
    return result;
  }
  get menu2() {
    let result = [];
    const menus = JSON.parse(JSON.stringify(this.menus));
    result = menus.slice(4, menus.length);
    return result;
  }
  public menus = Nav;
  @Prop() private msg!: string;
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
