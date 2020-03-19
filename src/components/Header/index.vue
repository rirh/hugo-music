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
    justify-content: space-around;
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

      // justify-content: spac;
      &-icon {
        font-size: 18px;
        color: white;
        width: 24%;
      }
    }
  }
}
.wapper-main-set-icon:hover {
  background-color: var(--setHover);
  border-radius: 7px;
  // padding: 3px;
  // padding: 3px;
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
.pointer {
  cursor: pointer;
}
.radio-group {
  width: 100%;
  border-radius: 20px;
  border: solid 1px #efefef;
  overflow: hidden;
}
.radio-group .ant-radio-button-wrapper {
  width: 25%;
  text-align: center;
  border: none;
  background: none;
}

#less {
  height: 20px;
  width: 20px;
  border-radius: 50%;
  background-color: #f4f4f4;

  border: 1px solid #efefef;
}
#red {
  height: 20px;
  width: 20px;
  border-radius: 50%;
  background-color: var(--red);
  border: 1px solid #efefef;
}

#black {
  height: 20px;
  width: 20px;
  border-radius: 50%;
  background-color: var(--black);
  border: 1px solid #efefef;
}

#auto {
  height: 20px;
  width: 20px;
  border-radius: 50%;
  background: linear-gradient(white, black);
  border: 1px solid #efefef;
}
.skin-wapper {
  display: flex;
  padding: 10px 15px;

  .item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: column;
    padding: 0 5px;
    position: relative;
    cursor: pointer;
    .text {
      font-size: 12px;
      margin-top: 5px;
      font-weight: bold;
    }
    .checked {
      position: absolute;
      left: 50%;
      top: 50%;
      color: #fff;
      transform: rotate(-50%, -50%);
    }

    .checked:after {
      content: " ";
      height: 6px;
      width: 2px;
      position: absolute;
      background-color: white;
      -webkit-transform: rotateX(45deg);
      transform: rotate(-45deg);
      left: -5px;
      top: -12px;
    }
    .checked:before {
      content: " ";
      height: 12px;
      width: 2px;
      position: absolute;
      background-color: white;
      -webkit-transform: rotateX(45deg);
      transform: rotate(42deg);
      left: 1px;
      top: -17px;
    }
    .red:after,
    .red:before {
      background-color: var(--red) !important;
    }
  }
}
.noti {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 74vh;
  overflow: hidden;
  .head {
    width: 100%;
  }
  .con {
    width: 100%;
    flex: 1;
  }
  .list::-webkit-scrollbar {
    width: 0 !important;
  }

  .list {
    display: flex;
    flex-direction: column;
    margin-top: 10px;
    height: 68vh;
    overflow-y: scroll;
    .item:hover {
      // background-color: var(--stripedHover);
    }
    .item {
      display: flex;
      transition: all 0.2s linear;

      .avatar {
        display: flex;
        justify-content: center;
        // align-items: center;
        padding: 5px 15px 0 0;
        margin: 0;
      }
      .cons {
        flex: 1;
        display: flex;
        flex-direction: column;
        padding-bottom: 10px;

        border-bottom: 1px solid var(--line);

        .user {
          display: flex;
          justify-content: space-between;
          .nickname {
            font-size: 12px;
            color: var(--link);
          }
          .lastmsgtime {
            font-size: 12px;
            color: var(--textColor);
          }
        }
        .content {
          width: 100%;
          display: flex;
          overflow: hidden;
          text-overflow: ellipsis;
          word-break: break-all;
          margin-top: 3px;
          font-size: 12px;
          color: var(--black);
        }
      }
    }
  }
}
</style>

<template>
  <div class="wapper" :style="{'background-color':theme.wapper_bg}">
    <div class="wapper-menu" v-if="process.platform === 'win32'">
      <span
        @click="handleMenu('close')"
        :class="{'focus':focus}"
        class="wapper-menu-tips wapper-menu-close pointer"
      >
        <!-- <strong>x</strong> -->
      </span>
      <span
        @click="handleMenu('min')"
        :class="{'focus':focus}"
        class="wapper-menu-tips wapper-menu-min pointer"
      >
        <!-- <strong>+</strong> -->
      </span>
      <span
        @click="handleMenu('zoom')"
        :class="{'focus':focus}"
        class="wapper-menu-tips wapper-menu-zoom pointer"
      >
        <!-- <strong>🤓</strong> -->
      </span>
    </div>
    <a-row :gutter="14" type="flex" class="wapper-main" justify="space-around" align="middle">
      <a-col style="padding-left:50px" :span="4" :offset="1" v-show="$store.state.music.showPanel">
        <AIconfont
          class="pointer"
          style="font-size:32px;color"
          type="icon-chevron-down"
          @click="handleShowConrtal"
        />
      </a-col>
      <a-col v-show="!$store.state.music.showPanel" :span="5" style="text-align:right">
        <a-icon
          @click="handleBackRoute"
          type="left"
          class="wapper-main-icon wapper-main-icon-left pointer"
        />
        <a-icon
          @click="handleNextRoute"
          type="right"
          class="wapper-main-icon wapper-main-icon-right pointer"
        />
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
            class="wapper-main-seach-icon pointer"
            type="icon-iconseach"
            :style="{'color':$store.state.music.showPanel?'var(--textColot)':'#f2cbc9'}"
          />
          <input
            v-model="keywords"
            class="wapper-main-seach-input"
            :placeholder="$store.state.music.showPanel?'':'搜索'"
            type="text"
            @focus="showDrawer"
            @keydown.enter="handleGoSeachPage"
          />
          <AIconfont
            v-show="keywords!==''"
            class="wapper-main-close1-icon pointer"
            type="icon-close1"
            :style="{'color':theme.keywords_color}"
            @click.stop="handleClear"
          />
        </div>
      </a-col>
      <a-col :span="4" style="padding:0">
        <div class="wapper-main-set pointer">
          <AIconfont
            type="icon-settings"
            class="wapper-main-set-icon"
            :style="{'color':theme.settings_color}"
            @click="$router.push('/setting/index')"
          />
          <AIconfont
            class="wapper-main-set-icon pointer"
            type="icon-email"
            :style="{'color':theme.email_color}"
            @click="email_visible=true"
          />
          <a-popover placement="bottomRight" trigger="click">
            <template slot="content">
              <div class="skin-wapper">
                <div class="item" @click="handleChangeTheme('less')">
                  <div id="less">&nbsp;</div>
                  <div for="less" class="text">浅色</div>
                  <div v-show="theme.type==='less'" class="red checked"></div>
                </div>
                <div class="item" @click="handleChangeTheme('red')">
                  <div id="red">&nbsp;</div>
                  <div for="red" class="text">红色</div>
                  <div v-show="theme.type==='red'" class="checked"></div>
                </div>
                <div class="item" @click="handleChangeTheme('black')">
                  <div id="black">&nbsp;</div>
                  <div for="black" class="text">黑色</div>
                  <div v-show="theme.type==='black'" class="checked"></div>
                </div>
                <div class="item" @click="handleChangeTheme('auto')">
                  <div id="auto">&nbsp;</div>
                  <div for="auto" class="text">自动</div>
                  <div v-show="theme.type==='auto'" class="checked"></div>
                </div>
              </div>
            </template>
            <AIconfont
              class="wapper-main-set-icon pointer"
              type="icon-tshirt-crew"
              :style="{'color':theme.skin_color}"
            />
          </a-popover>

          <AIconfont
            class="wapper-main-set-icon pointer"
            type="icon-checkbox-multiple-blank"
            :style="{'color':theme.blank_color}"
            @click="handleFloatFrame"
          />
        </div>
      </a-col>
    </a-row>
    <Drawer v-model="seach_visible">
      <dl slot="content">
        <!-- 搜索热词 -->
        <div class="hot" v-show="!seachList.order">
          <div class="name">热门搜索</div>
          <div class="tag-con">
            <span
              class="tag pointer"
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
              class="tag pointer"
              v-for="(his,index) in hislist"
              :key="index"
              @click="keywords=his"
            >{{his}}</span>
          </div>
        </div>

        <div v-show="seachList.order" v-for="(order , key) in seachList.order" :key="key">
          <dt class="content-title">
            <AIconfont
              class="content-title-icon pointer"
              :type="types[order]&&types[order].icon||' '"
            ></AIconfont>&nbsp;&nbsp;
            <span>{{types[order]&&types[order].name}}</span>
          </dt>
          <br />
          <dd
            v-for="(song,index) in seachList[order]"
            class="content-con pointer"
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
    <Drawer v-model="email_visible">
      <dl slot="content">
        <div class="noti">
          <div class="head">
            <a-radio-group
              v-model="noti.type"
              @change="handleChangeNotType"
              class="radio-group"
              buttonStyle="solid"
            >
              <a-radio-button value="private">私信</a-radio-button>
              <a-radio-button value="comments">评论</a-radio-button>
              <a-radio-button value="forwards">@我</a-radio-button>
              <a-radio-button value="notices">通知</a-radio-button>
            </a-radio-group>
          </div>
          <div class="con">
            <a-empty v-show="noti.list.length===0">
              <span slot="description">暂无数据</span>
            </a-empty>
            <a-skeleton active avatar :loading="noti.loading">
              <dl class="list">
                <dd class="item" v-for="item in noti.list" :key="item.lastMsgTime">
                  <div class="avatar">
                    <a-avatar :size="40" :src="item.avatarUrl"></a-avatar>
                  </div>
                  <div class="cons">
                    <div class="user">
                      <div class="nickname" v-html="item.nickname"></div>
                      <div class="lastmsgtime">{{(item.lastmsgtime)}}</div>
                    </div>
                    <div class="content">{{item.msg}}</div>
                  </div>
                </dd>
              </dl>
            </a-skeleton>
          </div>
        </div>
        <div></div>
      </dl>
    </Drawer>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import Menu from '@/components/Menu';
import axios from 'axios';
import { ipcRenderer, remote, BrowserWindow } from 'electron';
import {
  MAIN_MIN,
  MAIN_ZOOM,
  MAIN_CLOSE,
  HAVE_BLUR,
  HAVE_FOCUS,
  OPEN_FLOAT,
  SEND_STORE,
} from '@/constant/ipc';
import {
  get_search_suggest,
  get_search_hot,
  get_song_detail,
  get_msg_private,
  get_msg_comments,
  get_msg_forwards,
  get_msg_notices,
} from '@/actions';
import { STORE_HISTORY_LIST, STORE_USER_INFO } from '@/constant/store';
import Drawer from '@/components/Drawer';
import moment from 'moment';
import Store from 'electron-store';
const electron_store = new Store();

@Component({
  components: { Menu, Drawer },
})
export default class HelloWorld extends Vue {
  public seach_visible = false;
  public email_visible = false;
  public process = process.versions.electron;
  // public skin_visible = false;
  // 通知消息的骨架屏
  public theme = {
    type: 'red',
    wapper_bg: 'var(--red)',
    keywords_color: 'white',
    settings_color: 'white',
    email_color: 'white',
    skin_color: 'white',
    blank_color: 'white',
  };
  public loading_no: boolean = true;
  public noti: any = {
    type: 'private',
    loading: true,
    list: [],
  };

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
    const [host_res, private_res] = await axios.all([
      get_search_hot(),
      get_msg_private(''),
    ]);
    if (host_res.code === 200) {
      this.hotSearchList = host_res.result;
    }
    if (private_res.code === 200) {
      // 过滤其他没用信息
      this.noti.list = private_res.msgs.map((e: any) => ({
        ...e,
        avatarUrl: e.fromUser.avatarUrl || '',
        nickname: e.fromUser.nickname || '',
        lastmsgtime: moment(e.lastMsgTime).format('MM月DD日') || '',
        msg: JSON.parse(e.lastMsg).msg,
      }));
      this.noti.type = 'private';
      this.noti.loading = false;
    }
  }
  public handleGoSeachPage() {
    if (this.keywords) {
      this.seach_visible = false;
      const params = { keywords: this.keywords };
      this.$router.push({
        path: `/search/index?keywords=${this.keywords}&type=1`,
      });
    }
  }
  /**
   * handleChangeNotType
   */
  public async handleChangeNotType(e: EventListenerOrEventListenerObject) {
    const key = this.noti.type;
    this.noti.loading = true;
    let res: any;

    switch (key) {
      case 'private':
        res = await get_msg_private('');
        if (res.code === 200) {
          this.noti.list = res.msgs.map((e: any) => ({
            ...e,
            avatarUrl: e.fromUser.avatarUrl || '',
            nickname: e.fromUser.nickname || '',
            lastmsgtime: moment(e.lastMsgTime).format('MM月DD日') || '',
            msg: JSON.parse(e.lastMsg).msg,
          }));
        }
        break;
      case 'comments':
        const {
          account: { id },
        } = electron_store.get(STORE_USER_INFO);
        if (id) {
          res = await get_msg_comments(`uid=${id}`);
          if (res.code === 200) {
            this.noti.list = res.comments.map((e: any) => ({
              ...e,
              avatarUrl: e.user.avatarUrl,
              nickname: e.user.nickname,
              lastmsgtime: moment(e.time).format('YYYY年MM月DD日'),
              msg: `回复我：${e.content}`,
            }));
          }
        } else {
          res = false;
        }
        break;
      case 'forwards':
        res = await get_msg_forwards('');
        this.noti.list = [];
        break;
      case 'notices':
        res = await get_msg_notices('');
        if (res.code === 200) {
          this.noti.list = res.notices.map((e: any) => ({
            ...e,
            avatarUrl: `${JSON.parse(e.notice).user.avatarUrl}` || '',
            nickname:
              `${
                JSON.parse(e.notice).user.nickname
              } <span style="color:var(--textColor)">赞了你的评论<span>` || '',
            lastmsgtime: moment(e.time).format('YYYY年MM月DD日') || '',
            msg: JSON.parse(e.notice).comment.content,
          }));
        }
        break;
      default:
        break;
    }
    this.noti.loading = false;
  }
  /**
   * format
   */
  public format(time: Date) {
    return moment(time).format('MM月DD日');
  }

  public handleFloatFrame() {
    const show = true;
    const data = this.$store.state.music && this.$store.state.music;
    data.show = true;
    const win = (remote as any).BrowserWindow.getFocusedWindow();
    if (win && data.data.image) {
      data.id = win.id;
      ipcRenderer.send(OPEN_FLOAT, data);
      win.hide();
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
        if (mainWindow.isFullScreen()) {
          mainWindow.setFullScreen(false);
        }
        mainWindow.close();
      },
      min: () => {
        // 在全屏模式下点击缩小 先退出全屏模式然后会打开
        // ipcRenderer.send(MAIN_MIN);
        if (mainWindow.isFullScreen()) {
          mainWindow.setFullScreen(false);
          mainWindow.minimize();
        } else {
          mainWindow.minimize();
        }
        //
      },
      zoom: () => {
        if (mainWindow.isFullScreen()) {
          mainWindow.setFullScreen(false);
        } else {
          mainWindow.setFullScreen(true);
          this.$router.push('/fullboard');
        }
      },
    };
    build[key]();
  }
  @Watch('$store.state.music.showPanel')
  public handleAsyncPanel(msg: any) {
    if (msg) {
      document.documentElement.style.setProperty(`--setHover`, '#e2e2e2');
      this.theme.wapper_bg = 'white';
      this.theme.keywords_color = 'var(--textColot)';
      this.theme.settings_color = 'var(--textColot)';
      this.theme.email_color = 'var(--textColot)';
      this.theme.skin_color = 'var(--textColot)';
      this.theme.blank_color = 'var(--textColot)';
    } else {
      document.documentElement.style.setProperty(`--setHover`, '#bd5448');
      this.theme.wapper_bg = 'var(--red)';
      this.theme.keywords_color = 'white';
      this.theme.settings_color = 'white';
      this.theme.email_color = 'white';
      this.theme.skin_color = 'white';
      this.theme.blank_color = 'white';
    }
  }

  // 历史记录功能待完善TODO
  // @Watch('$route')
  // public handleHistory(args: any) {

  // }
  // @Watch("theme.type")
  public handleChangeTheme(key: any = 'red') {
    this.theme.type = key;
    let result = {
      bg: 'var(--red)',
      txt: 'white',
    };
    const showPanel = (this as any).$store.state.music.showPanel;
    switch (key) {
      case 'less':
        this.theme.wapper_bg = 'white';
        this.theme.keywords_color = 'var(--textColot)';
        this.theme.settings_color = 'var(--textColot)';
        this.theme.email_color = 'var(--textColot)';
        this.theme.skin_color = 'var(--textColot)';
        this.theme.blank_color = 'var(--textColot)';

        break;
      case 'red':
        this.theme.wapper_bg = 'var(--red)';
        this.theme.keywords_color = 'white';
        this.theme.settings_color = 'white';
        this.theme.email_color = 'white';
        this.theme.skin_color = 'white';
        this.theme.blank_color = 'white';
        break;
      case 'black':
        result = {
          bg: 'var(--red)',
          txt: 'white',
        };
        break;
      case 'auto':
        result = {
          bg: 'var(--red)',
          txt: 'white',
        };
        break;

      default:
        break;
    }
    if (showPanel) {
      result.bg = 'white';
      result.txt = 'var(--textColot)';
    }

    return result;
  }
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

  public async handleGoSeach(item: any, state: any) {
    switch (state) {
      case 'songs':
        const { code, songs } = await get_song_detail(`${item.id}`);
        const [song] = songs;
        const image = song.al.picUrl;
        const params = {
          id: item.id,
          name: item.name,
          auth: item.artists
            .map((e: any) => e.name)
            .toString()
            .split(',')
            .join('/'),
          image: image || item.artists[0].img1v1Url,
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

      default:
        break;
    }
    this.handleClear();
    this.asyncHisStore(item);
    this.seach_visible = false;
  }
  public asyncHisStore(item: any = '') {
    let list = electron_store.get(STORE_HISTORY_LIST) || [];
    const hasName = list.some((e: any) => e === item.name);
    if (item.name !== '' && !hasName) {
      list.push(item.name);
    }
    list = list.filter((e: any) => e);
    electron_store.set(STORE_HISTORY_LIST, list);
    this.hislist = list;
  }
  public handleClearStore() {
    electron_store.set(STORE_HISTORY_LIST, []);
    this.hislist = [];
  }
  public showDrawer() {
    this.seach_visible = true;
  }

  public handleBackRoute() {
    // this.$router.go(-1);
    // console.log(this.$router, this.$route);
    window.history.back();
  }
  public handleNextRoute() {
    window.history.forward();
    // this.$router.go(-1);
    // console.log(this.$router, this.$route);
  }
}
</script>

