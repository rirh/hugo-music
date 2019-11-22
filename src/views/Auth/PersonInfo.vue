<style lang="less" scoped>
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
    padding: 3vw;
    margin: 0 2vw;
    &-item {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      padding: 0 2vw;
    }
  }
  &-sgin {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  &-lists {
    border-bottom: 1px solid var(--bgColor);
    padding: 0.5vw 1vw 0.5vw 2vw;
    // margin: 0.5vw 1vw 0.5vw 2vw;
    &-list {
      display: flex;
      justify-content: center;
      align-items: center;
      line-height: 30px;
      height: 30px;
    }
  }
}
.signin {
  border-radius: 20px;
}
.detail-lists-list:hover {
  background-color: var(--stripedHover);
}
.lv {
  font-family: Arial, Helvetica, sans-serif;
}
</style>

<template>
  <div class="detail">
    <div class="detail-header">
      <span class="detail-header-item">
        <span
          style="font-size:28px;font-weight:bold;"
        >{{detail.profile&&detail.profile.allSubscribedCount}}</span>
        <span style="font-size:12px;">动态</span>
      </span>
      <a-divider type="vertical" />
      <span class="detail-header-item" @click="handleGoFollows('关注')">
        <span style="font-size:28px;font-weight:bold;">{{detail.profile&&detail.profile.follows}}</span>
        <span style="font-size:12px;">关注</span>
      </span>
      <a-divider type="vertical" />
      <span class="detail-header-item" @click="handleGoFollows('粉丝')">
        <span style="font-size:28px;font-weight:bold;">{{detail.profile&&detail.profile.followeds}}</span>
        <span style="font-size:12px;">粉丝</span>
      </span>
    </div>
    <div class="detail-sgin">
      <a-button
        class="signin"
        type="primary"
        :disabled="detail.pcSign"
        @click="handleSignin"
      >{{`${detail.pcSign?'已签到':'签到'}`}}</a-button>
    </div>
    <dl class="detail-lists">
      <dd class="detail-lists-list" @click="handleGoVip" style="justify-content: space-between">
        <span class="detail-lists-list">
          <AIconfont style="font-size:24px;" type="icon-account-star-variant" />
          <span>&nbsp;&nbsp;会员中心</span>
        </span>
        <span class="detail-lists-list">
          <span style="color:var(--textColor)">订购</span>
          <AIconfont style="font-size:24px;color:var(--textColor)" type="icon-chevron-right" />
        </span>
      </dd>
      <dd class="detail-lists-list" @click="handleGoLeaver" style="justify-content: space-between">
        <span class="detail-lists-list">
          <AIconfont style="font-size:24px;" type="icon-brightness-auto" />
          <span>&nbsp;&nbsp;等级</span>
        </span>
        <span class="detail-lists-list">
          <span class="lv" style="color:var(--textColor)">
            <strong>lv&nbsp;{{detail.level}}</strong>
          </span>
          <AIconfont style="font-size:24px;color:var(--textColor)" type="icon-chevron-right" />
        </span>
      </dd>
      <dd class="detail-lists-list" @click="handleGoShop" style="justify-content: space-between">
        <span class="detail-lists-list">
          <AIconfont style="font-size:24px;" type="icon-shopping" />
          <span>&nbsp;&nbsp;商城</span>
        </span>
        <span class="detail-lists-list">
          <AIconfont style="font-size:24px;color:var(--textColor)" type="icon-chevron-right" />
        </span>
      </dd>
    </dl>
    <dl class="detail-lists" @click="handleGoSetting">
      <dd class="detail-lists-list" style="justify-content: space-between">
        <span class="detail-lists-list">
          <AIconfont style="font-size:24px;" type="icon-settings" />
          <span>&nbsp;&nbsp;个人信息设置</span>
        </span>
        <span class="detail-lists-list">
          <AIconfont style="font-size:24px;color:var(--textColor)" type="icon-chevron-right" />
        </span>
      </dd>
      <dd
        class="detail-lists-list"
        @click="handleGoUserSetting"
        style="justify-content: space-between"
      >
        <span class="detail-lists-list">
          <AIconfont style="font-size:24px;" type="icon-cellphone-iphone" />
          <span>&nbsp;&nbsp;绑定社交账号</span>
        </span>
        <span class="detail-lists-list">
          <AIconfont style="font-size:24px;color:var(--textColor)" type="icon-chevron-right" />
        </span>
      </dd>
    </dl>
    <dl class="detail-lists" style="padding-bottom:0;margin-bottom:0;border:none">
      <dd @click="handleSignOut" class="detail-lists-list" style="justify-content: space-between">
        <span class="detail-lists-list">
          <AIconfont style="font-size:24px;" type="icon-settings" />
          <span>&nbsp;&nbsp;退出登录</span>
        </span>
        <span class="detail-lists-list">
          <AIconfont style="font-size:24px;color:var(--textColor)" type="icon-chevron-right" />
        </span>
      </dd>
    </dl>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Model } from 'vue-property-decorator';
import { get_daily_signin, get_user_detail, sign_out } from '@/actions';
import { notification } from 'ant-design-vue';
import { ipcRenderer, remote } from 'electron';
import { VIP_CENTER, USER_LEVER, HSOP_SEND } from '@/constant/ipc';

@Component
export default class Tags extends Vue {
  @Prop() private data!: string;
  @Prop() private show!: string;
  @Model('change')
  private visible!: boolean;
  public async handleSignOut(msg: any) {
    await sign_out();
    this.$emit('on-sign');
  }
  public handleGoSetting() {
    this.$router.push('/edit-user-info');
  }
  public handleGoVip() {
    ipcRenderer.send(VIP_CENTER);
  }
  public handleGoLeaver() {
    ipcRenderer.send(USER_LEVER);
  }
  public handleGoShop() {
    ipcRenderer.send(HSOP_SEND);
  }

  public handleGoFollows(args: any) {
    const userId = this.detail.profile.userId;
    this.$router.push({
      path: '/follows/index',
      query: { type: args, uid: userId },
    });
  }
  public handleGoUserSetting() {
    this.$emit('on-go');
    this.$router.push('/rebind-user-info');
  }
  get detail() {
    return this.$store.state.user.userDetail;
  }
  public async handleSignin() {
    if (this.detail.mobileSign) {
      return;
    }

    const userId = `uid=${this.detail.profile.userId}`;
    const { code, point, msg } = await get_daily_signin();
    if (code === 200) {
      notification.success({
        message: '恭喜',
        description: `签到成功！积分+${point}`,
      });
      const userdetail = await get_user_detail(userId);
      if (userdetail.code === 200) {
        this.$store.commit('update_user_detail', userdetail);
      }
    } else {
      notification.warning({
        message: '提示',
        description: msg,
      });
    }
  }
}
</script>

