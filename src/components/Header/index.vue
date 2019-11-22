<style lang="less" scoped>
.wapper {
  height: 100%;
  width: 100%;
  background-color: var(--red);
  position: relative;

  &-menu:hover {
    font-weight: bold;
  }
  &-menu {
    position: absolute;
    left: 5px;
    top: 10px;
    display: flex;
    width: 60px;
    align-content: center;
    justify-content: space-evenly;
    &-tips {
      height: 13px;
      width: 13px;
      border-radius: 50%;
      border: 1px solid #c24d48;
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 2;
    }

    &-close {
      background-color: #fc605c;
    }
    &-min {
      background-color: #fdbc40;
    }
    &-zoom {
      background-color: #33c849;
    }
  }

  &-main {
    height: 100%;
    &-icon {
      color: var(--white);
      &-left {
        margin-right: 20px;
      }
      &-right {
        margin-right: 9px;
      }
    }
    &-menu {
      display: flex;
      text-align: left;
      padding: 0 !important;
    }
    &-seach {
      display: flex;
      border-radius: 20px;
      background-color: #db6965;
      align-items: center;
      height: 100%;
      &-icon {
        color: #f2cbc9;
        margin-left: 10px;
      }
      &-close1 {
        color: #f2cbc9;
        margin-right: 10px;
        z-index: 2;
      }
      &-close1:hover {
        color: var(--stripedHover);
      }

      &-input {
        outline: none;
        border: none;
        background-color: transparent !important;
        color: #f2cbc9;
        font-size: 13px;
        margin-left: 5px;
        // flex: 1;
        width: 60%;
      }
      &-input::placeholder {
        /* Chrome, Firefox, Opera, Safari 10.1+ */
        color: #f2cbc9;
        opacity: 1; /* Firefox */
      }

      &-input:-ms-input-placeholder {
        /* Internet Explorer 10-11 */
        color: #f2cbc9;
      }

      &-input::-ms-input-placeholder {
        /* Microsoft Edge */
        color: #f2cbc9;
      }
    }
    &-set {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      &-icon {
        margin-left: 20px;
        font-size: 23px;
        color: var(--white);
      }
    }
  }
}

.active {
  font-weight: bold;
}
.content {
  &-title {
    color: var(--textColor);
    display: flex;
    justify-content: flex-start;
    align-items: center;
    font-size: 12px;
    font-weight: 400;
    &-icon {
      font-size: 16px;
      font-weight: 100;
    }
  }
  &-con {
    padding: 3px 15px;
    width: 100%;
    color: var(--textColor);
    overflow: hidden;
    text-overflow: ellipsis;
    text-align: left;
  }
  &-con:hover {
    background-color: var(--stripedHover);
  }
}
.hot {
}
.name {
  color: var(--tipsColor);
  font-size: 13px;
  margin-bottom: 10px;
}

.history {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.trash {
  cursor: pointer;
}
.tag-con {
  display: flex;
  flex-wrap: wrap;
}
.tag {
  padding: 5px 15px;
  margin: 3px;
  border: 1px solid var(--borderColor);
  border-radius: 20px;
  font-size: 12px;
  transition: all 0.2s ease;
}
.tag:hover {
  background-color: var(--stripedHover);
}

.focus {
  background-color: var(--tagBg);
}
</style>

<template>
  <div
    class="wapper"
    :style="{'background-color':$store.state.music.showPanel?'white':'var(--red)'}"
  >
    <div class="wapper-menu">
      <span
        @click="handleMenu('close')"
        :class="{'focus':focus}"
        class="wapper-menu-tips wapper-menu-close"
      >
        <!-- <strong>x</strong> -->
      </span>
      <span
        @click="handleMenu('min')"
        :class="{'focus':focus}"
        class="wapper-menu-tips wapper-menu-min"
      >
        <!-- <strong>+</strong> -->
      </span>
      <span
        @click="handleMenu('zoom')"
        :class="{'focus':focus}"
        class="wapper-menu-tips wapper-menu-zoom"
      >
        <!-- <strong>🤓</strong> -->
      </span>
    </div>
    <a-row :gutter="14" type="flex" class="wapper-main" justify="space-around" align="middle">
      <a-col :span="4" :offset="1" v-show="$store.state.music.showPanel">
        <AIconfont style="font-size:32px" type="icon-chevron-down" @click="handleShowConrtal" />
      </a-col>
      <a-col v-show="!$store.state.music.showPanel" :span="5" style="text-align:right">
        <a-icon @click="handleBack" type="left" class="wapper-main-icon wapper-main-icon-left" />
        <a-icon type="right" class="wapper-main-icon wapper-main-icon-right" />
      </a-col>
      <a-col :span="10" class="wapper-main-menu">
        <Menu v-show="!$store.state.music.showPanel" />
      </a-col>

      <a-col :span="3" :offset="1" style="padding:0">
        <div
          class="wapper-main-seach"
          :style="{'background-color':$store.state.music.showPanel?'var(--bgColor)':'#db6965'}"
        >
          <AIconfont
            class="wapper-main-seach-icon"
            type="icon-iconseach"
            :style="{'color':$store.state.music.showPanel?'var(--textColot)':'#f2cbc9'}"
          />
          <input
            v-model="keywords"
            class="wapper-main-seach-input"
            placeholder="搜索"
            type="text"
            @focus="showDrawer"
          />
          <AIconfont
            v-show="keywords!==''"
            class="wapper-main-close1-icon"
            type="icon-close1"
            :style="{'color':$store.state.music.showPanel?'var(--textColot)':'#f2cbc9'}"
            @click.stop="handleClear"
          />
        </div>
      </a-col>
      <a-col :span="4" style="padding:0">
        <div class="wapper-main-set">
          <AIconfont
            type="icon-settings"
            class="wapper-main-set-icon"
            :style="{'color':$store.state.music.showPanel?'var(--textColot)':'#f2cbc9'}"
          />
          <AIconfont
            class="wapper-main-set-icon"
            type="icon-email"
            :style="{'color':$store.state.music.showPanel?'var(--textColot)':'#f2cbc9'}"
          />
          <AIconfont
            class="wapper-main-set-icon"
            type="icon-tshirt-crew"
            :style="{'color':$store.state.music.showPanel?'var(--textColot)':'#f2cbc9'}"
          />
        </div>
      </a-col>
    </a-row>
    <Drawer v-model="visible">
      <dl slot="content">
        <!-- 搜索热词 -->

        <div class="hot" v-show="!seachList.order">
          <div class="name">热门搜索</div>
          <div class="tag-con">
            <span
              class="tag"
              v-for="(hot,index) in hotSearchList.hots"
              :key="index"
              @click="keywords=hot.first"
            >{{hot.first}}</span>
          </div>
          <div v-show="hislist.length" style="margin-top:10px" class="name history">
            搜索历史
            <AIconfont class="trash" type="icon-delete" @click="handleClearStore" />
          </div>
          <div class="tag-con">
            <span
              class="tag"
              v-for="(his,index) in hislist"
              :key="index"
              @click="keywords=his"
            >{{his}}</span>
          </div>
        </div>

        <div v-show="seachList.order" v-for="(order , key) in seachList.order" :key="key">
          <dt class="content-title">
            <AIconfont class="content-title-icon" :type="types[order]&&types[order].icon||' '"></AIconfont>&nbsp;&nbsp;
            <span>{{types[order]&&types[order].name}}</span>
          </dt>
          <br />
          <dd
            v-for="(song,index) in seachList[order]"
            class="content-con"
            :key="index"
            @click="handleGoSeach(song,order)"
          >
            {{song.name}}
            <span v-for="(artist,aindex) in song.artists" :key="aindex">{{artist.name}}</span>
          </dd>
          <br />
        </div>
      </dl>
    </Drawer>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import Menu from '@/components/Menu';
import { ipcRenderer, remote } from 'electron';
import {
  MAIN_MIN,
  MAIN_ZOOM,
  MAIN_CLOSE,
  HAVE_BLUR,
  HAVE_FOCUS,
} from '@/constant/ipc';
import { get_search_suggest, get_search_hot } from '@/actions';
import { STORE_HISTORY_LIST } from '@/constant/store';
import Drawer from '@/components/Drawer';
import Store from 'electron-store';
const electron_store = new Store();

@Component({
  components: { Menu, Drawer },
})
export default class HelloWorld extends Vue {
  public visible = false;
  public keywords = '';
  public seachList = {};
  public focus = false;
  public types = {
    artists: {
      name: '歌手',
      icon: 'icon-account',
    },
    songs: {
      name: '单曲',
      icon: 'icon-music-note',
    },
    albums: {
      name: '歌单',
      icon: 'icon-music-circle',
    },
    mvs: {
      name: '视频',
      icon: 'icon-youtube-play',
    },
    playlists: {
      name: '歌单',
      icon: 'icon-playlist-play',
    },
  };
  public hotSearchList = [];
  public hislist = [];
  @Prop() private msg!: string;
  public mounted() {
    ipcRenderer.on(HAVE_BLUR, () => {
      this.focus = true;
    });
    ipcRenderer.on(HAVE_FOCUS, () => {
      this.focus = false;
    });
    this.init();
    this.asyncHisStore();
  }
  public async init() {
    const { code, result } = await get_search_hot();
    if (code === 200) {
      this.hotSearchList = result;
    }
  }
  public handleClear() {
    this.keywords = '';
    this.seachList = [];
  }
  public handleShowConrtal() {
    const showPanel = this.$store.state.music.showPanel;
    this.$store.commit('update_show_panel', !showPanel);
  }
  public handleMenu(key: any) {
    // remote.getCurrentWindow().maximize();
    // remote.getCurrentWindow().minimize();
    // remote.getCurrentWindow().unmaximize();
    // remote.getCurrentWindow().restore();
    const mainWindow = remote.getCurrentWindow();
    const build: any = {
      close: () => {
        // ipcRenderer.send(MAIN_CLOSE);
        mainWindow.unmaximize();
      },
      min: () => {
        // ipcRenderer.send(MAIN_MIN);
        mainWindow.minimize();
      },
      zoom: () => {
        if (mainWindow.isFullScreen()) {
          mainWindow.setFullScreen(false);
          return;
        }
        // ipcRenderer.send(MAIN_ZOOM);
        if (mainWindow.isMaximized()) {
          mainWindow.setFullScreen(true);
        } else {
          mainWindow.maximize();
        }
      },
    };
    build[key]();
  }
  // 历史记录功能待完善TODO
  // @Watch('$route')
  // public handleHistory(args: any) {

  // }
  @Watch('keywords')
  public async handleSeach(keywords: any) {
    if (keywords) {
      const res = await get_search_suggest(`keywords=${keywords}`);
      if (res.code === 200) {
        this.seachList = res.result;
      }
    } else {
      this.handleClear();
    }
  }

  public handleGoSeach(item: any, state: any) {
    switch (state) {
      case 'songs':
        const params = {
          id: item.id,
          name: item.name,
          auth: item.artists
            .map((e: any) => e.name)
            .toString()
            .split(',')
            .join('/'),
          image: item.artists[0].img1v1Url,
          duration: item.duration,
        };
        this.$store.commit('update_music_data', params);
        break;
      case 'playlists':
        this.$router.push({
          path: '/music-detail',
          query: item,
        });
        break;
      case 'albums':
        this.$router.push({
          path: '/album-detail',
          query: item,
        });
        break;
      case 'songs':
        break;

      default:
        break;
    }
    this.handleClear();
    this.asyncHisStore(item);
    this.visible = false;
  }
  public asyncHisStore(item: any = '') {
    let list = electron_store.get(STORE_HISTORY_LIST) || [];
    const hasName = list.some((e: any) => e === item.name);
    if (item.name !== '' && !hasName) { list.push(item.name); }
    list = list.filter((e: any) => e);
    electron_store.set(STORE_HISTORY_LIST, list);
    this.hislist = list;
  }
  public handleClearStore() {
    electron_store.set(STORE_HISTORY_LIST, []);
    this.hislist = [];
  }
  public showDrawer() {
    this.visible = true;
  }

  public handleBack() {
    this.$router.go(-1);
  }
}
</script>

