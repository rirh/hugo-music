<style lang="less">
.HolyGrail {
  display: flex;
  width: 1000px;
  height: 670px;
  flex-direction: column;
  // background-color: antiquewhite;
  // text-align: center;
  overflow: hidden;
}
/* header,
footer {
  flex: 1;
} */
header {
  height: 7.3vh;
  background-color: bisque;
  -webkit-app-region: drag;
}
footer {
  height: 9.1vh;
  position: fixed;
  bottom: 0;
  width: 100%;
  z-index: 1;
  background-color: cornflowerblue;
}
.HolyGrail-body {
  display: flex;
  flex: 1;
  overflow: hidden;
}
.HolyGrail-content {
  flex: 1;
  overflow: hidden;
}
.HolyGrail-nav,
.HolyGrail-ads {
  /* 两个边栏的宽度设为12em */
  flex: 0 0 20%;
  background-color: aquamarine;
}
.HolyGrail-nav {
  /* 导航放到最左边 */
  order: -1;
}
@media (max-width: 768px) {
  .HolyGrail-body {
    flex-direction: column;
    flex: 1;
  }
  .HolyGrail-nav,
  .HolyGrail-ads,
  .HolyGrail-content {
    flex: auto;
  }
}

.ant-drawer {
  margin-top: 7.3vh;
}
.ant-drawer .ant-drawer-content-wrapper {
  // margin-top: 7.3vh;
  height: 83.6vh !important;
}

.ant-drawer .ant-drawer-mask {
  // opacity: 0!important;
  // margin-top: 7.3vh;
  height: 83.6vh !important;
}
.ant-popover-inner-content {
  padding: 5px 0px !important;
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.7s ease;
}

.fade-enter,
.fade-leave-active {
  transform: translateY(100%);
}
</style>

<template>
<body class="HolyGrail">
  <header>
    <Header />
  </header>

  <div class="HolyGrail-body" v-show="!$store.state.music.showPanel">
    <main class="HolyGrail-content">
      <Contant />
    </main>
    <nav v-show="!$store.state.vedio.show" class="HolyGrail-nav">
      <Control />
    </nav>
  </div>
  <transition name="fade" mode="out-in">
    <LyricsPanel v-show="$store.state.music.showPanel" />
  </transition>
  <!-- <transition name="fade" mode="out-in">
    <LyricsPanel v-show="$store.state.music.showPanel" />
  </transition>-->
  <footer v-show="!$store.state.vedio.show">
    <Music />
  </footer>
</body>
</template>

<script lang="ts">
import Header from '@/components/Header';
import Control from '@/components/Control';
import Contant from '@/components/Contant';
import LyricsPanel from '@/components/LyricsPanel';
import Music from '@/components/Music';
import { Component, Vue } from 'vue-property-decorator';

@Component({ components: { Header, Control, Contant, Music, LyricsPanel } })
export default class Home extends Vue {
  public handleScroll(e: any) {
    return false;
  }
}
</script>
