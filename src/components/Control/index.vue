<style lang="less" scoped>
.wapper {
  height: 100%;
  width: 100%;
  background-color: var(--bgColor);
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;
  padding-bottom: 9.3vh;

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
      color: var(--textColor);
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
.playlist /deep/ .ant-collapse {
  border: none;
  background-color: var(--bgColor);
}
.playlist /deep/ .ant-collapse-header {
  background-color: var(--bgColor);
  color: var(--textColor);
}
.playlist /deep/ .ant-collapse > .ant-collapse-item > .ant-collapse-header {
  color: var(--textColor);
  text-align: left;
  font-weight: bold;
  font-size: 13px;
  padding: 3px 0 10px 30px;
}
.playlist /deep/ .ant-collapse > .ant-collapse-item {
  border: none;
}
.playlist /deep/ .ant-collapse-content {
  background-color: var(--bgColor);
  border: none;
}
.playlist /deep/ .ant-collapse-content > .ant-collapse-content-box {
  padding: 0;
  text-align: left;
}
</style>

<template>
  <div class="wapper">
    <div class="wapper-avatar" @click="showLogin">
      <a-avatar
        class="wapper-avatar-img"
        :size="40"
        icon="user"
        :src="user.profile&&user.profile.avatarUrl"
      />
      <span class="wapper-avatar-nickname">{{user.profile?user.profile.nickname:'未登录'}}</span>
      <a-icon class="wapper-avatar-icon" type="caret-right" />
    </div>
    <dl class="wapper-main">
      <dd
        :class="{'active':activeMenu(menu)}"
        class="wapper-main-list"
        v-for="(menu,index) in menu1"
        v-show="!menu.show"
        :key="index"
      >
        <AIconfont class="wapper-main-list-icon" :type="menu.type" />
        <!-- <a-icon class="wapper-main-list-icon" :type="menu.type" /> -->
        <router-link
          class="wapper-main-list-link"
          tag="span"
          :to="menu.path"
        >{{menu.name.length>10?`${menu.name.substring(0,8)}...`:menu.name}}</router-link>
      </dd>
    </dl>
    <h5 class="wapper-tips">我的音乐</h5>
    <dl class="wapper-main">
      <dd
        :class="{'active':activeMenu(menu)}"
        class="wapper-main-list"
        v-for="(menu,index) in menu2"
        v-show="!menu.show"
        :key="index"
      >
        <AIconfont class="wapper-main-list-icon" :type="menu.type" />
        <!-- <a-icon class="wapper-main-list-icon" :type="menu.type" /> -->
        <router-link
          class="wapper-main-list-link"
          tag="span"
          :to="menu.path"
        >{{menu.name.length>10?`${menu.name.substring(0,8)}...`:menu.name}}</router-link>
      </dd>
    </dl>
    <div class="playlist">
      <a-collapse>
        <a-collapse-panel v-for="(v,k) in playlist" :key="k" :header="k==='create'?'创建的歌单':'收藏的歌单'">
          <dd
            :class="{'active':activeMenu(menu)}"
            class="wapper-main-list"
            v-for="(menu,index) in v"
            :key="index"
          >
            <AIconfont class="wapper-main-list-icon" type="icon-music-circle" />
            <!-- <a-icon class="wapper-main-list-icon" :type="menu.type" /> -->
            <router-link
              class="wapper-main-list-link"
              tag="span"
              :to="{
               path: '/music-detail',
               query: menu 
            }"
            >{{menu.name.length>10?`${menu.name.substring(0,8)}...`:menu.name}}</router-link>
          </dd>
        </a-collapse-panel>
      </a-collapse>
    </div>
    <Login :show="show" @on-visible="show=false" />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import Nav from '@/routers';
import Login from '@/views/Auth/Login.vue';
import { getStorage } from '@/util/filters';

@Component({
  components: { Login },
})
export default class HelloWorld extends Vue {
  get user() {
    return this.$store.state.user.user;
  }
  get playlist() {
    let result: any = {};
    const playlist = this.$store.state.user.playlist;
    if (playlist.length) {
      const userId = this.user.profile.userId;
      const findCreateList = (e: any) => e.userId === userId;
      const findMarkedList = (e: any) => e.userId !== userId;
      const createList = playlist.filter(findCreateList);
      const markedList = playlist.filter(findMarkedList);
      result = {
        create: createList,
        marked: markedList,
      };
    }

    return result;
  }

  public show = false;
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
  public showLogin() {
    const isLogin = this.user.profile;
    // if (!isLogin) {
    this.show = true;
    // }
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

