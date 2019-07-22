<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { ipcRenderer, remote } from 'electron';
import { MAIN_DROP } from '@/constant/ipc';

@Component({})
export default class Home extends Vue {
  public preventDrop() {
    (window as any).document.ondragstart = (event: any) => {
      event.preventDefault();
      if (event.dataTransfer.files) {
        // ipcRenderer.send(MAIN_DROP, event.dataTransfer.files[0].path);
      }
    };
  }
  public mounted() {
    this.preventDrop();
  }
}
</script>

<style lang="less">
:root {
  --red: #d5504b;
  --btnRed: #d33a31;
  --white: #f0c2c0;
  --black: #2f2f2f;
  --bgColor: #ededed;
  --menuHover: #e2e2e2;
  --tipsColor: #888;
  --textColor: #999;
  --line: #efefef;
  --yellow: #e3a860;
  --borderColor: #efefef;
  --link: #5782b0;
  --striped: #fafafa;
  --stripedHover: #f2f2f3;
}
body {
  margin: 0;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  -webkit-overflow-scrolling: touch;
}
</style>
