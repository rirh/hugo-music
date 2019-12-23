<style lang="less" scoped>
.wapper {
  display: flex;
  height: 100vh;
  width: 100vw;
  background-color: #f4f4f4;
  border: 1px solid var(--line);
  flex-direction: column;
  overflow: hidden;
  .col {
    display: flex;
    justify-content: center;
    align-items: center;

    .icon {
      cursor: pointer;
      color: #b9b1b1;
    }
    // .icon:first-child {
    //   margin-bottom: 5px;
    // }
    .menu {
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: flex-start;
      font-size: 12px;
      height: 100vh;
      padding: 3px 5px;
      -webkit-app-region: drag;
    }
    .image {
      height: 100vh;
      display: flex;
      justify-items: center;
      align-items: center;
      margin-right: 5px;
      -webkit-app-region: drag;
    }
    .con {
      height: 100vh;
      flex: 1;
      display: flex;
      flex-direction: column;
      // -webkit-app-region: drag;

      .info {
        display: flex;
        flex: 1;
        -webkit-app-region: drag;
        .tit {
          padding: 3px 0 0 0;
          .name {
            font-size: 12px;
            line-height: 12px;
            color: var(--textcolor);
          }
          .ar {
            // margin-top: 5px;
            padding-top: 5px;
            font-size: 11px;
            line-height: 11px;
            color: #b9b1b1;
          }
        }
      }
      .icons {
        -webkit-app-region: drag;
        flex: 1;
        display: flex;
        justify-content: flex-end;
        align-items: center;

        .icon {
          font-size: 22px;
        }
        .heart {
          font-size: 18px;
          margin-right: 17px;
        }
        .playlist {
          font-size: 20px;
          margin-right: 10px;
        }
        .volume {
          font-size: 23px;
          margin-right: 2px;
        }
      }
    }
    .con:hover .playcon {
      display: flex;
    }
    .con:hover .tit {
      display: none;
    }
    .playcon {
      height: 31px;
      width: 40vw;
      // paddin g: 8px 0 0 0;

      justify-content: center;
      align-items: center;
      display: none;
      font-size: 25px;
      color: var(--red);
      .skip-previous {
        color: var(--red);
      }
      .play {
        height: 30px;
        width: 30px;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 50%;
        background-color: var(--btnRed);
        color: white;
        margin: 0 2vw;
        padding: 0 !important;
        font-size: 24px;
        line-height: 0;
        border: none;
      }
      .skip-next {
        color: var(--red);
      }
    }
    .range {
      display: flex;
      flex: 1;
      width: 100%;
      height: 100%;
      justify-content: center;
      align-items: center;
      #pro {
        width: 98%;
        // height: 3px;
        background: linear-gradient(var(--red), #b9b1b1);
        // box-shadow: 0 1px 1px var(--red), inset 0 3px 3px #b9b1b1; /*轨道内置阴影效果*/
      }
      input[type="range"] {
        -webkit-appearance: none;
        height: 3px;
        border-radius: 10px; /*这个属性设置使填充进度条时的图形为圆角*/
      }
      input[type="range"]::-webkit-slider-runnable-track {
        height: 3px;
        border-radius: 10px; /*将轨道设为圆角的*/
        box-shadow: 0 1px 1px #efefef, inset 0 3px 3px #b9b1b1; /*轨道内置阴影效果*/
      }
      input[type="range"]:focus {
        outline: none;
      }
      input[type="range"]::-webkit-slider-thumb {
        -webkit-appearance: none;
        height: 10px;
        width: 10px;
        // opacity: 0;
        margin-top: -3.5px; /*使滑块超出轨道部分的偏移量相等*/
        background: var(--red);
        border-radius: 50%; /*外观设置为圆形*/

        // background: linear-gradient(toright, #059cfa, #ff8344 12%, #ff8344);
        // border: solid 1px rgba(205, 224, 230, 0.5); /*设置边框*/
        // box-shadow: 0 0.125em 0.125em #3b4547; /*添加底部阴影*/
      }
      #pro:hover #pro::-webkit-slider-thumb {
        opacity: 1;
      }
    }
  }
}
</style>

<template>
  <div class="wapper">
    <div class="pl"></div>
    <div class="col">
      <div class="menu">
        <AIconfont class="icon" style="margin-bottom:5px" type="icon-close1" />
        <AIconfont class="icon" type="icon-application" />
      </div>
      <div class="image">
        <a-avatar
          class="img"
          :size="35"
          shape="square"
          icon="user"
          src="http://p2.music.126.net/Dz-IlMInzYLkRxuPCP4f9w==/109951164572397262.jpg"
        />
      </div>
      <div class="con">
        <div class="info">
          <div class="tit">
            <div class="name">归去来兮</div>
            <div class="ar">花粥--一碗</div>
          </div>
          <div class="playcon">
            <AIconfont class="icon skip-previous" type="icon-skip-previous" />
            <a-button type="primary" class="play" @click="handleStart">
              <transition name="fade" mode="out-in">
                <div>
                  <AIconfont v-if="state!=='playing'" type="icon-play" />
                  <AIconfont v-if="state==='playing'" type="icon-pause" />
                </div>
              </transition>
            </a-button>

            <AIconfont class="icon skip-next" type="icon-skip-next" />
          </div>
          <div class="icons">
            <AIconfont class="icon heart" type="icon-heart" />
            <AIconfont class="icon playlist" type="icon-playlist-play" />
            <AIconfont class="icon volume" type="icon-volume-low" />
          </div>
        </div>
        <div class="range">
          <input :value="20" id="pro" type="range" min="0" max="100" />
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
@Component({})
export default class Float extends Vue {
  @Prop() public data: any;
  public state = 'playing';
  public handleStart() {
    if (this.state === 'playing') { this.state = 'stop'; } else { this.state = 'playing'; }
  }
}
</script>