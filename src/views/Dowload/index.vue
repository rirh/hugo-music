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
  margin: 0;
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
          <span>&nbsp;{{path}}&nbsp;</span>
          <span class="open-dir" @click="handleOpenDir()">打开目录</span>
          &nbsp;
          <a-icon type="sync" :spin="spin" @click="init()" />
        </span>
        <span>
          <a-input
            @input="handleFilter()"
            v-model="search"
            size="small"
            class="search"
            type="text"
            placeholder="搜索下载歌曲"
          >
            <a-icon slot="prefix" type="search" />
            <a-icon
              slot="suffix"
              v-show="search"
              type="close"
              style="color: rgba(0,0,0,.45)"
              @click="search='';init()"
            />
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
          @dblclick="handlePlay(item)"
          v-for="(item,index) in data"
          :key="index"
          :style="{'background-color':index%2!==0?'#fff':'#efefef'}"
        >
          <span class="name">{{item.name||item}}</span>
          <span class="singer">{{item.siger||item}}</span>
          <span class="alume"></span>
          <span class="size"></span>
          <span class="time"></span>
        </dd>
      </div>
    </dl>
  </div>
</template>

<script lang="ts">
import { remote } from 'electron';
import { Component, Vue } from 'vue-property-decorator';
import { LOAD_MUSIC } from '@/constant/ipc';
import { ipcRenderer } from 'electron';
@Component({})
export default class Download extends Vue {
  public data = [];
  public search = '';
  public spin = false;
  public path = remote.app.getPath('music');

  public mounted() {
    this.init();
  }

  public init() {
    this.spin = true;
    setTimeout(() => {
      const result: any = ipcRenderer.sendSync(LOAD_MUSIC);
      const data = result.filter((e: any) => {
        if (~e.indexOf('mp3') && e.split('-')[0]) {
          return e;
        }
      });

      this.data = data.map((e: any) => {
        const [item] = e.split('.');
        const [siger, name] = item.split('-');

        return {
          siger,
          name,
          orgin: e,
          path: `${this.path}/${e}`,
        };
      });
      this.spin = false;
    }, 200);
  }
  public handleFilter() {
    const data = this.data;
    const keyword = this.search;
    if (keyword) {
      const result = data.filter((e: any) => ~e.indexOf(keyword)) || [];
      this.data = result;
    } else {
      this.init();
    }
  }
  public handleOpenDir() {
    const { shell } = require('electron').remote;
    // const tmp = require("tmp");
    shell.showItemInFolder(`${this.path}`);
  }
  public handlePlay(item: any) {
    const params: any = {
      id: 0,
      path: item.path,
      local: true,
    };
    this.$store.commit('update_music_data', params);
  }
}
</script>
