<style lang="less" scoped>
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 10px 15px;
  .play-all {
    border-radius: 20px;
    padding: 0 15px;
    font-weight: bold;
  }
  .open-dir {
    font-size: 13px;
    color: var(--link);
    margin-left: 10px;
  }
  .search {
    border: none;
  }
}
.dt {
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  border: 1px solid #efefef;
  font-size: 13px;
}
.dd {
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-size: 13px;
  height: 100%;
  text-align: center;
  padding: 7px 0;
  background-color: #efefef;
}
.dd:hover {
  background-color: #efefef;
}
.name {
  width: 30%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.singer {
  width: 20%;
}
.alume {
  width: 20%;
}
.size {
  width: 10%;
}
.time {
  width: 20%;
}
.dt span {
  height: 100%;
  text-align: center;
  padding: 7px 0;
}
.dt span:hover {
  background-color: #efefef;
}
</style>

<template>
  <div>
    <dl>
      <dt class="header">
        <span>
          <a-button class="play-all" type="primary">播放全部</a-button>
          <span class="open-dir" @click="handleOpenDir()">打开目录</span>
        </span>
        <span>
          <a-input size="small" class="search" type="text" placeholder="搜索下载歌曲">
            <a-icon slot="prefix" type="search" />
          </a-input>
        </span>
      </dt>

      <div style="margin-top:4vh">
        <dt class="dt">
          <span class="name">音乐标题</span>
          <span class="singer">歌手</span>
          <span class="alume">专辑</span>
          <span class="size">大小</span>
          <span class="time">下载时间</span>
        </dt>
        <dd
          class="dd"
          :style="{'background-color':index%2!==0?'#fff':'#efefef'}"
          v-for="(item,index) in data"
          :key="index"
        >
          <span class="name">{{item}}</span>
          <span class="singer"></span>
          <span class="alume"></span>
          <span class="size"></span>
          <span class="time"></span>
        </dd>
      </div>
    </dl>
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
      console.log(result);

      const data = result.filter((e: any) => ~e.indexOf("mp3"));
      this.data = data;
    }, 100);
  }
  handleOpenDir() {
    const { shell } = require("electron").remote;
    const tmp = require("tmp");
    shell.showItemInFolder(`${tmp.tmpdir}`);
  }
}
</script>
