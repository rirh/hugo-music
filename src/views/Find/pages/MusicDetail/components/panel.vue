<style lang="less" scoped>
.panel {
  display: flex;

  &-left {
    display: flex;
    flex: 0 0 30%;
    justify-content: center;
    align-items: center;
    &-img {
      height: 20vw;
      width: 20vw;
      background-size: 100%;
    }
  }
  &-right {
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    flex-direction: column;
    text-align: left;
    padding-left: 2vw;
    &-title {
      display: flex;
      justify-content: center;
      align-items: center;
      &-tag {
        border: 1px solid var(--red);
        border-radius: 3px;
        color: var(--red);
        padding: 0 0.5vw;
        display: flex;
        justify-content: center;
        align-items: center;
        font-weight: bold;
      }
      &-name {
        margin: 0;
        font-weight: bold;
        font-size: 22px;
      }
    }
    &-auth {
      display: flex;
      margin: 1.5vw 0;
      align-items: center;
      &-img {
        background-size: 100%;
        height: 2.5vw;
        width: 2.5vw;
      }
      &-name {
        color: var(--link);
        font-size: 12px;
      }
      &-time {
        font-size: 12px;
      }
    }
    &-button {
      display: flex;
      align-items: center;
      &-play {
        border-radius: 20px;
        color: white;
        padding: 0.45vw 1vw;
        display: flex;
        justify-content: center;
        align-items: center;
        font-weight: 500;
        font-size: 13px;
        background: -webkit-linear-gradient(180deg, var(--red), var(--red));
        &-circle {
          margin: 0 1vw;
        }
        &-plus {
          padding-left: 1vw;
          border-left: 1px solid var(--red);
          font-size: 15px;
        }
        &-circle:hover {
          background-color: var(--btnRed);
        }
        &-plus:hover {
          background-color: var(--btnRed);
        }
      }
      &-start {
        border-radius: 20px;
        padding: 0.45vw 1.2vw;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-left: 1vw;
        border: 1px solid var(--textColor);
      }
      &-share {
        border-radius: 20px;
        padding: 0.45vw 1.2vw;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-left: 1vw;
        border: 1px solid var(--textColor);
      }
      &-dowload {
        border-radius: 20px;
        padding: 0.45vw 1.2vw;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-left: 1vw;
        border: 1px solid var(--textColor);
      }
    }
    &-tags {
      font-size: 12px;
      display: flex;
      justify-content: center;
      align-items: center;
      margin: 1.5vw 0 0 0;
      &-list {
        color: var(--link);
        font-size: 12px;
      }
    }
    &-song {
      font-size: 12px;
      margin-top: 0.5vw;
    }
    &-description {
      font-size: 12px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
    }
  }
}
</style>

<template>
  <a-skeleton :loading="loadingDetail" active>
    <div class="panel">
      <div class="panel-left">
        <a-avatar
          class="panel-left-img"
          :onerror="errorImg"
          :src="data.coverImgUrl"
          shape="square"
          alt
        />
      </div>
      <div class="panel-right">
        <div class="panel-right-title">
          <span class="panel-right-title-tag">歌单</span>
          <h2 class="panel-right-title-name">&nbsp;{{data.name}}</h2>
        </div>
        <div class="panel-right-auth">
          <a-avatar
            class="panel-right-auth-img"
            :onerror="errorImg"
            :src="data.creator&&data.creator.avatarUrl"
            alt
          />
          <span
            class="panel-right-auth-name"
          >&nbsp;&nbsp;{{data.creator&&data.creator.nickname}}&nbsp;&nbsp;</span>
          <span class="panel-right-auth-time">{{transformatDate(data.createTime)}}创建</span>
        </div>
        <div class="panel-right-button">
          <span class="panel-right-button-play">
            <span class="panel-right-button-play-circle">
              <a-icon style="font-size: 16px;" type="play-circle" />
              <span>&nbsp;播放全部</span>
            </span>
            <span class="panel-right-button-play-plus">
              <a-icon type="plus" />
            </span>
          </span>
          <span class="panel-right-button-start">
            <a-icon style="font-size: 18px;" type="folder-add" />
            &nbsp;收藏({{transformW(data.trackCount)}})
          </span>
          <span class="panel-right-button-share">
            <AIconfont style="font-size: 18px;" type="icon-share" />
            &nbsp;分享({{data.shareCount}})
          </span>
          <span class="panel-right-button-dowload">
            <a-icon style="font-size: 18px;" type="download" />&nbsp;下载全部
          </span>
        </div>
        <div class="panel-right-tags">
          <strong>标签&nbsp;:&nbsp;</strong>
          <span v-for="(tag,index) in data.tags" :key="index">
            <span class="panel-right-tags-list">&nbsp;{{tag}}&nbsp;</span>
            <span v-show="index!==data.tags.length-1">/</span>
          </span>
        </div>
        <div class="panel-right-song">
          <span>
            <strong>歌曲数:</strong>
            {{data.tracks&&data.tracks.length}}&nbsp;&nbsp;&nbsp;
          </span>
          <span>
            <strong>播放数:</strong>
            {{transformW(data.playCount)}}
          </span>
        </div>
        <div class="panel-right-description">
          <div>
            <strong>简介:</strong>
            <span>
              {{(data.description&&data.description.substring(0,12))}}
              <span
                v-show="!showDescription"
              >...</span>
            </span>
          </div>
          <div>
            <a-icon
              v-show="!showDescription"
              @click="showDescription=!showDescription"
              type="caret-up"
            />
            <a-icon
              v-show="showDescription"
              @click="showDescription=!showDescription"
              type="caret-down"
            />
          </div>
          <!-- <span>
            <strong>简介:</strong>
            {{(data.description)}}
          </span>-->
        </div>
        <div
          v-show="showDescription"
        >{{(data.description&&data.description.substring(12,data.description.length))}}</div>
      </div>
    </div>
  </a-skeleton>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import { get_play_list_detail } from '@/actions';
import { ERROR_IMG } from '@/constant/api';
import { transformW, transformatDate } from '@/util/filters';

@Component({})
export default class Home extends Vue {
  public errorImg = ERROR_IMG;
  @Prop() public data: any;
  public showDescription = false;
  public loadingDetail = true;
  @Watch('data')
  public handleChange(arg: any) {
    if (arg) {
      this.loadingDetail = false;
    }
  }
  public transformW = (e: any) => transformW(e);
  public transformatDate = (e: any) => transformatDate(e, false);
}
</script>
