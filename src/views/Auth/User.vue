<style lang="less" scoped>
.wapper {
  display: flex;
  flex-direction: column;
  padding-bottom: 9.3vh;
  &-user {
    display: flex;
    padding: 2vw;

    &-info {
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: flex-start;
      flex: 1;
      padding: 0 2vw;
      &-2 {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        padding-bottom: 1vw;
        border-bottom: 1px solid var(--borderColor);
      }
      &-levelgender {
        display: flex;
        justify-content: flex-start;
        align-items: center;
      }
      &-level {
        border-radius: 20px;
        background-color: var(--tagBg);
        color: white;
        font-weight: bold;
        padding: 0.1vw 1vw;
      }
      &-gender {
        height: 23px;
        padding: 0 1vw;
        border-radius: 20px;
        font-weight: bold;
        font-size: 16px;
        display: flex;
        justify-content: center;
        align-items: center;
        color: white;
        margin-left: 0.2w;
      }
      &-edit {
        border-radius: 20px;
        color: white;
        padding: 0.1vw 1vw;
      }
    }
  }
  &-lists {
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    flex-direction: column;
    padding: 2vw;
    &-list {
      display: flex;
      flex-wrap: wrap;
    }
  }
}
.detail {
  display: flex;
  flex-direction: column;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  &-header {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 2vw 0 1vw 0;
    &-item {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      padding: 0 2vw;
    }
  }
}
</style>

<template>
  <div class="wapper">
    <div class="wapper-user">
      <div class="wapper-user-avatar">
        <a-avatar :size="215" icon="user" :src="detail.profile&&detail.profile.avatarUrl" />
      </div>
      <div class="wapper-user-info">
        <h1>{{detail.profile&&detail.profile.nickname}}</h1>
        <div class="wapper-user-info-2">
          <div class="wapper-user-info-levelgender">
            <a-button size="small" class="wapper-user-info-level">lv&nbsp;{{detail.level}}</a-button>&nbsp;
            <AIconfont
              class="wapper-user-info-gender"
              :style="{'background-color':detail.gender?'var(--red)':'var(--link)'}"
              :type="detail.gender?'icon-woman':'icon-man'"
            />
          </div>
          <div>
            <a-button @click="handleGoEdit" size="small" type="primary" class="wapper-user-info-edit">编辑个人信息</a-button>
          </div>
        </div>
        <div>
          <div class="detail-header">
            <span class="detail-header-item" style="padding-left:0">
              <span
                style="font-size:24px;font-weight:bold;"
              >{{detail.profile&&detail.profile.allSubscribedCount}}</span>
              <span style="font-size:12px;">动态</span>
            </span>
            <a-divider type="vertical" />
            <span class="detail-header-item">
              <span
                style="font-size:24px;font-weight:bold;"
              >{{detail.profile&&detail.profile.follows}}</span>
              <span style="font-size:12px;">关注</span>
            </span>
            <a-divider type="vertical" />
            <span class="detail-header-item">
              <span
                style="font-size:24px;font-weight:bold;"
              >{{detail.profile&&detail.profile.followeds}}</span>
              <span style="font-size:12px;">粉丝</span>
            </span>
          </div>
        </div>
        <div>
          <label>个人简介：</label>
          <span>{{detail.profile&&detail.profile.signature}}</span>
        </div>
      </div>
    </div>
    <div class="wapper-lists">
      <h2>我创建的歌单({{playlist.create.length}})</h2>
      <dl class="wapper-lists-list">
        <dd   style="flex:0 0 25%;" v-for="(item,index) in playlist.create" :key="index">
          <span>
            <a-avatar :size="150" icon="user" shape="square" :src="item.coverImgUrl" />
          </span>
          <span>{{item.name}}</span>
        </dd>
      </dl>
    </div>
    <div class="wapper-lists">
      <h2>我收藏的歌单({{playlist.marked.length}})</h2>
      <dl class="wapper-lists-list">
        <dd style="flex:0 0 25%" v-for="(item,index) in playlist.marked" :key="index">
          <span>
            <a-avatar :size="150" icon="user" shape="square" :src="item.coverImgUrl" />
          </span>
          <span></span>
        </dd>
      </dl>
    </div>

    <div></div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Model } from 'vue-property-decorator';
import { get_subcount } from '@/actions';

@Component
export default class Tags extends Vue {
  @Prop() private data!: string;
  @Prop() private show!: string;
  @Model('change')
  private visible!: boolean;
  get detail() {
    return this.$store.state.user.userDetail;
  }

  get playlist() {
    let result: any = {
      create: [],
      marked: [],
    };
    const playlist = this.$store.state.user.playlist;
    if (playlist.length) {
      const userId = this.detail.profile.userId;
      const findCreateList = (e: any) => e.userId === userId;
      const findMarkedList = (e: any) => e.userId !== userId;
      const createList = playlist.filter(findCreateList);
      const markedList = playlist.filter(findMarkedList);
      result = {
        create: createList,
        marked: markedList,
      };
    }
    return result;
  }
  public handleGoEdit() {
    this.$router.push('/edit-user-info');
  }
  public async mounted() {
    const res = await get_subcount();
  }
}
</script>

