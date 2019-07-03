<style lang="less" scoped>
.wapper {
  height: 100%;
  width: 100%;
  background-color: var(--red);
  position: relative;

  &-menu:hover {
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
      &-input {
        outline: none;
        border: none;
        background-color: transparent !important;
        color: #f2cbc9;
        font-size: 13px;
        margin-left: 5px;
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
        font-size: 18px;
        color: var(--white);
      }
    }
  }
}
</style>

<template>
  <div class="wapper">
    <div class="wapper-menu">
      <span @click="handleMenu('close')" class="wapper-menu-tips wapper-menu-close">
        <!-- <strong>x</strong> -->
      </span>
      <span @click="handleMenu('min')" class="wapper-menu-tips wapper-menu-min">
        <!-- <strong>+</strong> -->
      </span>
      <span @click="handleMenu('zoom')" class="wapper-menu-tips wapper-menu-zoom">
        <!-- <strong>🤓</strong> -->
      </span>
    </div>
    <a-row :gutter="14" type="flex" class="wapper-main" justify="space-around" align="middle">
      <a-col :span="5" style="text-align:right">
        <a-icon @click="handleBack" type="left" class="wapper-main-icon wapper-main-icon-left" />
        <a-icon type="right" class="wapper-main-icon wapper-main-icon-right" />
      </a-col>
      <a-col :span="10" class="wapper-main-menu">
        <Menu />
      </a-col>

      <a-col :span="3" :offset="1" style="padding:0">
        <div class="wapper-main-seach">
          <AIconfont class="wapper-main-seach-icon" type="icon-iconseach" />
          <input class="wapper-main-seach-input" placeholder="搜索" type="text" />
        </div>
      </a-col>
      <a-col :span="4" style="padding:0">
        <div class="wapper-main-set">
          <a-icon type="setting" class="wapper-main-set-icon" />
          <AIconfont class="wapper-main-set-icon" type="icon-185078emailmailstreamline" />
          <AIconfont class="wapper-main-set-icon" type="icon-pifu" />
        </div>
      </a-col>
    </a-row>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import Menu from '@/components/Menu';
import { ipcRenderer, remote } from 'electron';
import { MAIN_MIN, MAIN_ZOOM, MAIN_CLOSE } from '@/constant/ipc';
@Component({
  components: { Menu },
})
export default class HelloWorld extends Vue {
  @Prop() private msg!: string;
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
  public handleBack() {
    this.$router.go(-1);
  }
}
</script>

