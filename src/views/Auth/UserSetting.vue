<style lang="less" scoped>
.wapper {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-content: flex-start;
  padding: 1rem;
  overflow: scroll;
  font-size: 13px;
}
.list {
  display: flex;
  align-items: center;
  margin-top: 1rem;
  &-left {
    font-size: 35px;
    background-color: var(--yellow);
    border-radius: 50%;
    height: 5vw;
    width: 5vw;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    flex: 0 0 5vw;
    margin-right: 2vw;
    align-self: flex-start;
  }
  &-right {
    display: flex;
    flex-direction: column;
    text-align: left;
    flex: 1;
    background-color: var(--striped);
    padding: 0 1rem;

    &-token {
      display: flex;
      flex-direction: column;
      text-align: left;
    }
  }
}
</style>

<template>
  <!-- <a-spin :spinning="spinning"> -->
  <div class="wapper">
    <h2 style="text-align:left">注册账号</h2>
    <dl>
      <dd class="list" v-for="(item,index) in detail.bindings" :key="index">
        <span class="list-left">
          <AIconfont :type="item.type===1?'icon-cellphone-iphone':'icon-cellphone-android'" />
        </span>
        <span class="list-right">
          <span>
            <strong>绑定类型:</strong>
            {{item.type}}
          </span>
          <span>
            <strong>绑定时间:</strong>
            {{transformatDate(item.bindingTime)}}
          </span>
          <span class="list-right-token">
            <strong>token信息：</strong>
            <span v-for="(s,j) in JSON.parse(item.tokenJsonStr)" :key="j">
              <strong>{{j}}:</strong>
              {{s}}
            </span>
          </span>
          <span
            @click="visible=true"
            v-show="item.type===1"
            style="color:var(--link);text-decoration: underline"
          >更换手机</span>
        </span>
      </dd>
    </dl>
    <a-modal title="更换手机" v-model="visible" :mask="false" centered>
      <div>
        <p
          v-show="!oldverify"
        >您的手机号为:{{JSON.parse(phone.tokenJsonStr).cellphone.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2')}}</p>
        <a-input v-show="oldverify" v-model="phone2">
          <span @click="handleVisible" slot="addonAfter">{{timer==='获取验证码'?timer:`${timer} s`}}</span>
        </a-input>
        <p>为了安全我们会向您的手机发送验证码</p>
        <a-input v-show="!oldverify" v-model="captcha">
          <span @click="handleVisible" slot="addonAfter">{{timer==='获取验证码'?timer:`${timer} s`}}</span>
        </a-input>
        <a-input v-show="oldverify" v-model="captcha2"></a-input>
      </div>

      <template slot="footer">
        <a-button type="primary" @click="handleVifter">{{oldverify?'确认':'下一步'}}</a-button>
      </template>
    </a-modal>
  </div>
  <!-- </a-spin> -->
</template>

<script lang="ts">
import { Component, Prop, Vue, Model, Watch } from 'vue-property-decorator';
import {
  get_captcha_sent,
  get_captcha_verify,
  get_redbind,
  get_user_detail,
} from '@/actions';
import { transformatDate, getStorage } from '@/util/filters';
import { notification, message } from 'ant-design-vue';

@Component
export default class Tags extends Vue {
  public oldverify = false;
  public visible = false;
  public captcha = null;
  public captcha2 = null;
  public phone2 = null;
  public phone: any = {};
  public timer: any = '获取验证码';

  @Watch('visible')
  public async handleVisible(msg: any) {
    if (msg) {
      if (this.timer !== '获取验证码') {
        return;
      }
      const phone = JSON.parse(this.phone.tokenJsonStr).cellphone;
      const doTimer = () => {
        if (this.timer > 0) {
          this.timer = this.timer - 1;
          setTimeout(doTimer, 1000);
        } else {
          this.timer = '获取验证码';
        }
      };
      this.timer = 60;
      doTimer();
      const res = await get_captcha_sent(
        `phone=${this.oldverify ? this.phone2 : phone}`,
      );
      if (res.code === 200) {
        message.success('发送成功,请注意查收！');
      }
    }
  }
  public async handleVifter() {
    const phone = JSON.parse(this.phone.tokenJsonStr).cellphone;
    const vifter = async (args: any) => {
      let result = false;
      const res = await get_captcha_verify(args);
      if (res.code === 200) {
        this.oldverify = true;
        this.timer = '获取验证码';
        result = true;
      }
      return result;
    };
    if (this.captcha && this.oldverify) {
      const parasm = `phone=${this.phone2}&captcha=${this.captcha2}`;
      const isVifter = vifter(parasm);
      if (isVifter) {
        const res = await get_redbind(
          `phone=${phone}&oldcaptcha=${this.captcha}&captcha=${this.captcha2}`,
        );
        if (res.code === 200) {
          message.success('更换成功！');
          const userId = `uid=${this.detail.profile.userId}`;
          const resdetail = await get_user_detail(userId);
          if (resdetail.code === 200) {
            this.$store.commit('update_user_detail', resdetail);
          }
        }
      }
    } else {
      const parasm = `phone=${phone}&captcha=${this.captcha}`;
      vifter(parasm);
    }
  }
  public transformatDate = (res: any) => transformatDate(res, false);
  get detail() {
    const user = getStorage('user');
    this.phone = user.bindings.find((e: any) => e.type === 1);
    return user;
  }
}
</script>

