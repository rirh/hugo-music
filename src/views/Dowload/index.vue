<style lang="less" scoped>
</style>

<template>
  <div>
    <ul>
      <li v-for="(item,index) in data" :key="index">{{item}}</li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { LOAD_MUSIC } from "@/constant/ipc";
import { ipcRenderer } from "electron";
@Component({})
export default class Download extends Vue {
  data = [];
  mounted() {
    setTimeout(() => {
      const result: any = ipcRenderer.sendSync(LOAD_MUSIC);
      const data = result.filter((e: any) => ~e.indexOf("mp3"));
      this.data = data;
    }, 100);
  }
}
</script>
