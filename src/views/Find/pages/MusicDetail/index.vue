<style lang="less" scoped>
.detail {
  display: flex;
  margin: 2vw;

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
        padding: 0.45vw 1.2vw;
        display: flex;
        justify-content: center;
        align-items: center;
        font-weight: 500;
        font-size: 14px;
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
    <div class="detail">
      <div class="detail-left">
        <a-avatar
          class="detail-left-img"
          :onerror="errorImg"
          :src="playlist.coverImgUrl"
          shape="square"
          alt
        />
      </div>
      <div class="detail-right">
        <div class="detail-right-title">
          <span class="detail-right-title-tag">歌单</span>
          <h2 class="detail-right-title-name">{{playlist.name}}</h2>
        </div>
        <div class="detail-right-auth">
          <a-avatar
            class="detail-right-auth-img"
            :onerror="errorImg"
            :src="playlist.creator&&playlist.creator.avatarUrl"
            alt
          />
          <span
            class="detail-right-auth-name"
          >&nbsp;&nbsp;{{playlist.creator&&playlist.creator.nickname}}&nbsp;&nbsp;</span>
          <span class="detail-right-auth-time">{{transformatDate(playlist.createTime)}}创建</span>
        </div>
        <div class="detail-right-button">
          <span class="detail-right-button-play">
            <span class="detail-right-button-play-circle">
              <a-icon style="font-size: 16px;" type="play-circle" />
              <span>&nbsp;播放全部</span>
            </span>
            <span class="detail-right-button-play-plus">
              <a-icon type="plus" />
            </span>
          </span>
          <span class="detail-right-button-start">
            <a-icon style="font-size: 18px;" type="folder-add" />
            &nbsp;收藏({{transformW(playlist.trackCount)}})
          </span>
          <span class="detail-right-button-share">
            <AIconfont style="font-size: 18px;" type="icon-share" />
            &nbsp;分享({{playlist.shareCount}})
          </span>
          <span class="detail-right-button-dowload">
            <a-icon style="font-size: 18px;" type="download" />&nbsp;下载全部
          </span>
        </div>
        <div class="detail-right-tags">
          <strong>标签&nbsp;:&nbsp;</strong>
          <span v-for="(tag,index) in playlist.tags" :key="index">
            <span class="detail-right-tags-list">&nbsp;{{tag}}&nbsp;</span>
            <span v-show="index!==playlist.tags.length-1">/</span>
          </span>
        </div>
        <div class="detail-right-song">
          <span>
            <strong>歌曲数:</strong>
            {{playlist.tracks&&playlist.tracks.length}}&nbsp;&nbsp;&nbsp;
          </span>
          <span>
            <strong>播放数:</strong>
            {{transformW(playlist.playCount)}}
          </span>
        </div>
        <div class="detail-right-description">
          <div>
            <strong>简介:</strong>
            <span>
              {{(playlist.description&&playlist.description.substring(0,12))}}
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
            {{(playlist.description)}}
          </span>-->
        </div>
        <div
          v-show="showDescription"
        >{{(playlist.description&&playlist.description.substring(12,playlist.description.length))}}</div>
      </div>
    </div>
  </a-skeleton>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { get_play_list_detail } from '@/actions';
import { ERROR_IMG } from '@/constant/api';
import { transformW, transformatDate } from '@/util/filters';

@Component({})
export default class Home extends Vue {
  public errorImg = ERROR_IMG;
  public playlist = {};
  public privileges = {};
  public showDescription = false;
  public loadingDetail = true;
  public transformW = (e: any) => transformW(e);
  public transformatDate = (e: any) => transformatDate(e, false);
  public mounted() {
    const params = this.$route.query;
    if (params.id) { this.init(params.id); }
  }

  public async init(id: any) {
    const { code, playlist, privileges } = await get_play_list_detail(
      `id=${id}`,
    );
    this.loadingDetail = false;
    if (code === 200) {
      this.playlist = playlist;
      this.privileges = privileges;
    }
  }
}
</script>
