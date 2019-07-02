<style lang="less" scoped>
.HolyGrail {
  display: flex;
  min-height: 100vh;
  flex-direction: column;
  background-color: antiquewhite;
  text-align: center;
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
}
.HolyGrail-content {
  flex: 1;
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
</style>

<template>
<body class="HolyGrail">
  <header>
    <Header />
  </header>
  <div class="HolyGrail-body">
    <main class="HolyGrail-content">
      <Contant />
    </main>
    <nav class="HolyGrail-nav">
      <Control />
    </nav>
  </div>
  <footer>
    <Music />
  </footer>
</body>
</template>

<script lang="ts">
import Header from '@/components/Header';
import Control from '@/components/Control';
import Contant from '@/components/Contant';
import Music from '@/components/Music';
import { Component, Vue } from 'vue-property-decorator';

@Component({ components: { Header, Control, Contant, Music } })
export default class Home extends Vue {}
</script>
