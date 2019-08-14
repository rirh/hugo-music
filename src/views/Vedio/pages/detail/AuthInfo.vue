<style lang="less" scoped>
.info {
  display: flex;
  flex-direction: column;
  text-align: left;
  justify-content: flex-start;
  align-items: flex-start;
  &-avatar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
  }
  &-auth {
    color: var(--black);
    margin-left: 1vw;
  }
  &-title {
    margin: 0;
    text-align: left;
  }
  &-time {
    color: var(--textColor);
    font-size: 12px;
    margin-bottom: 1vw;
  }
  &-description {
    color: var(--black);
    font-size: 13x;
    margin-top: 1vw;
  }
  &-action {
    margin-top: 1vw;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    &-report {
      font-size: 12px;
      color: var(--textColor);
      text-decoration: underline;
    }
  }
}
.info-action-report:hover {
  color: var(--black);
}
</style>

<template>
  <div class="info">
    <br />
    <div class="info-avatar">
      <span>
        <a-avatar
          :size="45"
          @click.stop="handleGoUser"
          icon="user"
          :src="data.creator&&data.creator.avatarUrl"
        />
        <span class="info-auth">&nbsp;{{data.creator&&data.creator.nickname}}</span>
      </span>
      <span>
        <a-button size="small" @click="handleCare">关注</a-button>
      </span>
    </div>
    <br />
    <div class="info-title">
      <h2>{{data.title}}</h2>
    </div>
    <div class="info-time">
      <span>发布：{{transformatDate(data.publishTime)}}</span>
      <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;播放：{{transformW(data.playTime)}}</span>
    </div>
    <div>
      <a-tag v-for="(item,index) in data.videoGroup" :key="index" color="var(--red)">{{item.name}}</a-tag>
    </div>
    <div class="info-description">{{data.description}}</div>
    <div class="info-action">
      <div>
        <a-button @click="handleCare">
          <AIconfont :type="data.praised?'icon-thumb-up':'icon-thumb-up-outline'" />
          <span>赞({{data.praisedCount}})</span>
        </a-button>&nbsp;
        <a-button @click="handleCare">
          <a-icon type="folder-add" />
          <span>收藏</span>
        </a-button>&nbsp;
        <a-button @click="handleCare">
          <AIconfont type="icon-share" />
          <span>分享({{data.shareCount}})</span>
        </a-button>
      </div>
      <div>
        <span class="info-action-report">举报</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { get_video_url, get_video_group } from '@/actions';
import { transformW, transformatDate } from '@/util/filters';

@Component({ components: {} })
export default class Radio extends Vue {
  @Prop() private data!: any;
  public transformW = (e: any) => transformW(e);
  public transformatDate = (e: any) => transformatDate(e, 1);
  public handleCare() {
    this.$emit('on-care');
  }
}
</script>
