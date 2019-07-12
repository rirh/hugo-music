<style lang="less" scoped>
.comments {
  font-size: 13px;
  text-align: left;
  &-textarea {
    width: 100%;
    border-color: var(--bgColor);
    border-radius: 10px;
    margin: 1vw 0;
    padding: 0.5vw;
    outline: none;
    &-commit {
      border-radius: 20px;
      color: var(--bgColor);
      border: none;
      background: -webkit-linear-gradient(180deg, var(--btnRed), var(--red));
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 0 1vw;
      width: 55px;
      font-weight: bold;
    }
  }
  &-title {
    font-size: 13px;
    margin: 1vw 0;
  }
  &-list {
    display: flex;
    justify-content: center;
    align-items: flex-start;
    margin: 1.2vw 0;
    &-img {
    }
    &-content {
      width: 100%;
      border-bottom: 1px solid #e8e8e8;
      color: var(--black);
      font-weight: 500;
      margin: 0 2vw;
      display: flex;
      justify-content: center;
      align-items: flex-start;
      flex-direction: column;
      &-name {
        color: var(--link);
      }
      &-time {
        color: var(--textColor);
        margin: 1vw 0;
        font-size: 12px;
        display: flex;
        width: 100%;
        justify-content: space-between;
        align-items: flex-start;
        &-tips {
          font-size: 14px;
          display: flex;
          justify-content: center;
          align-items: center;
          &-report {
            font-size: 12px;
            opacity: 0;
          }
        }
      }
      &-ber {
        background-color: var(--stripedHover);
        padding: 0.5vw;
        width: 100%;
        margin: 0.5vw;
        text-align: left;
      }
    }
  }
}
.comments-list:hover .comments-list-content-time-tips-report {
  opacity: 1;
}
.more {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 3vw 0;
}
.more-hot {
  border-radius: 20px;
  width: 140px;
  color: var(--bgColor);
  border: none;
  background: -webkit-linear-gradient(180deg, var(--btnRed), var(--red));
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>

<template>
  <a-skeleton :loading="loadingComment" active>
    <dl class="comments">
      <dd>
        <textarea
          class="comments-textarea"
          autofocus
          v-model="comment"
          placeholder="输入评论或@朋友"
          rows="3"
        ></textarea>
        <span>
          <a-button class="comments-textarea-commit" size="small">评论</a-button>
        </span>
      </dd>
      <dt class="comments-title">
        <h3>精彩评论</h3>
      </dt>
      <dd v-for="(item,index) in data.hotComments" :key="index">
        <div class="comments-list">
          <a-avatar class="comments-list-img" :onerror="errorImg" :src="item.user.avatarUrl" alt />
          <span class="comments-list-content">
            <span>
              <a class="comments-list-content-name">{{item.user.nickname}}:</a>
              <span class="comments-list-content-con">{{item.content}}</span>
            </span>
            <span
              class="comments-list-content-ber"
              v-for="(ber,bindex) in item.beReplied"
              :key="bindex"
            >
              <a class="comments-list-content-name">@{{ber.user.nickname}}:</a>
              <span class="comments-list-content-con">{{ber.content}}</span>
            </span>
            <span class="comments-list-content-time">
              <span>{{transformatDate(item.time)}}</span>
              <span class="comments-list-content-time-tips">
                <span class="comments-list-content-time-tips-report">举报&nbsp;&nbsp;&nbsp;</span>
                <AIconfont type="icon-thumb-up-outline" />
                <span v-show="item.likedCount>0">&nbsp;{{item.likedCount}}</span>
                <a-divider type="vertical" />
                <AIconfont type="icon-share" />
                <a-divider type="vertical" />
                <AIconfont type="icon-comment-text-outline" />
              </span>
            </span>
          </span>
        </div>
      </dd>
      <div class="more">
        <a-button class="more-hot">
          更多精彩评论
          <AIconfont type="icon-right" style="font-size:20px;margin-top: 3px;" />
        </a-button>
      </div>
      <dt class="comments-title">
        <h3>最新评论({{data.total}})</h3>
      </dt>
      <dd v-for="(item) in data.comments" :key="item.id">
        <div class="comments-list">
          <a-avatar class="comments-list-img" :onerror="errorImg" :src="item.user.avatarUrl" alt />
          <span class="comments-list-content">
            <span>
              <a class="comments-list-content-name">{{item.user.nickname}}:</a>
              <span class="comments-list-content-con">{{item.content}}</span>
            </span>
            <span class="comments-list-content-ber" v-for="(ber) in item.beReplied" :key="ber.id">
              <a class="comments-list-content-name">@{{ber.user.nickname}}:</a>
              <span class="comments-list-content-con">{{ber.content}}</span>
            </span>
            <span class="comments-list-content-time">
              <span>{{transformatDate(item.time)}}</span>
              <span class="comments-list-content-time-tips">
                <span class="comments-list-content-time-tips-report">举报&nbsp;&nbsp;&nbsp;</span>
                <AIconfont type="icon-thumb-up-outline" />
                <span v-show="item.likedCount>0">&nbsp;{{item.likedCount}}</span>
                <a-divider type="vertical" />
                <AIconfont type="icon-share" />
                <a-divider type="vertical" />
                <AIconfont type="icon-comment-text-outline" />
              </span>
            </span>
          </span>
        </div>
      </dd>
      <!-- <dt class="comments-title">
        <h3>最新评论</h3>
      </dt>
      <dd v-for="(item,index) in data.comments" :key="index">
        <div class="comments-list">
          <a-avatar class="comments-list-img" :onerror="errorImg" :src="item.user.avatarUrl" alt />
          <span class="comments-list-content">
            <a class="comments-list-content-name">{{item.user.nickname}}:</a>
            <span class="comments-list-content-con">{{item.content}}</span>
          </span>
        </div>
      </dd>-->
    </dl>
  </a-skeleton>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from "vue-property-decorator";
import { ERROR_IMG } from "@/constant/api";
import { get_play_song_detail } from "@/actions";
import {
  transformTimer,
  leftpad,
  scliceValue,
  transformatDate
} from "@/util/filters";

@Component({})
export default class Home extends Vue {
  public errorImg = ERROR_IMG;
  @Prop() public data: any;
  public showDescription = false;
  public loadingComment = true;
  public comment = "";

  public columns = [
    {
      name: "",
      key: "icon"
    },
    {
      name: "音乐标题",
      key: "name"
    },
    {
      name: "歌手",
      key: "ar"
    },
    {
      name: "专辑",
      key: "name"
    },
    {
      name: "时长",
      key: "name"
    }
  ];
  public transformTimer = (e: any) => transformTimer(e);
  public leftpad = (e: any) => leftpad(e, 2, 0);
  public scliceValue = (e: any, len: any) => scliceValue(e, len);
  public transformatDate = (e: any) => transformatDate(e, true);

  @Watch("data")
  public handleChange(arg: any) {
    if (arg) {
      this.loadingComment = false;
    }
  }
}
</script>
