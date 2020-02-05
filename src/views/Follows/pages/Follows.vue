<style lang="less" scoped>
.wapper {
  display: flex;
  padding: 1vw;
  justify-content: flex-start;
  align-items: flex-start;
  align-content: flex-start;
  flex-wrap: wrap;

  &-item {
    flex: 0 0 50%;
    text-align: left;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    margin: 1vw 0 0 0;
    // padding: 1vw;
    // box-shadow: 0px 1px 1px 1px #333;

    &-avatar {
      border: 1px solid #eee;
      box-shadow: 0px 1px 1px 1px #333;
    }
    &-con {
      display: flex;
      text-align: left;
      flex: 1;
      overflow: hidden;
      margin-left: 1vw;
      justify-content: center;
      align-items: center;
      &-left {
        display: flex;
        flex-direction: column;
        text-align: left;
        flex: 0 0 65%;
      }
      &-right {
        display: flex;
        text-align: center;
        flex: 0 0 35%;
        padding-left: 2vw;
      }
      &-followeds {
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 12px;
      }
    }
  }
}
</style>

<template>
  <!-- <a-spin :spinning="spinning"> -->
  <a-skeleton :loading="loading" active>
    <div class="wapper">
      <div class="wapper-item" v-for="(item,index) in data" :key="index">
        <a-avatar class="wapper-item-avatar" :size="95" icon="user" :src="item&&item.avatarUrl" />
        <span class="wapper-item-con">
          <span class="wapper-item-con-left">
            <strong>
              {{item.nickname}}
              <a-tag color="var(--red)" v-show="item.vipType!==0">&nbsp;cvip</a-tag>
            </strong>
            <span
              style="font-size:12px;margin-top:1vw;"
            >{{item.signature&&item.signature.length>15?`${item.signature.substring(0,12)}...`:item.signature}}</span>
            <span class="wapper-item-con-followeds">
              <span>歌单：{{item.playlistCount}}</span>
              <a-divider type="vertical" />
              <span>粉丝：{{item.followeds}}</span>
            </span>
          </span>
          <span class="wapper-item-con-right">
            <a-button
              size="small"
              style="font-size:12px"
              @click="handleAction(item,index)"
            >{{$route.query.type === "关注"?'私信':item.followed?"已关注":'关注'}}</a-button>
          </span>
        </span>
      </div>
    </div>
  </a-skeleton>

  <!-- </a-spin> -->
</template>

<script lang="ts">
import { Component, Prop, Vue, Model, Watch } from 'vue-property-decorator';
import { get_use_follows, get_use_followeds, get_follow } from '@/actions';
import { transformatDate, getStorage } from '@/util/filters';
import { notification, message } from 'ant-design-vue';

@Component
export default class Follows extends Vue {
  public loading = true;
  public data: any = [];
  public async handleAction(args: any, index: any) {
    const params = this.$route;
    if (params.query.type === '粉丝') {
      const res = await get_follow(
        `id=${args.userId}&t=${args.followed ? 0 : 1}`,
      );
      if (res.code === 200) {
        message.success('操作成功！');
        this.data[index].followed = !this.data[index].followed;
      }
    }
  }
  public async mounted() {
    const params = this.$route;
    const args = `uid=${params.query.uid}`;
    this.init(args);
  }
  @Watch('$route.query', { deep: true })
  public handleChangeQuery() {
    const params = this.$route;
    const args = `uid=${params.query.uid}`;
    this.init(args);
  }
  public async init(args: any) {
    this.loading = true;
    const params = this.$route;
    let res: any;
    if (params.query && params.query.type === '关注') {
      res = await get_use_follows(args);
      this.loading = false;
      if (res.code === 200) {
        this.data = res.follow;
      }
    } else {
      res = await get_use_followeds(args);
      this.loading = false;
      if (res.code === 200) {
        this.data = res.followeds;
      }
    }
  }
}
</script>

