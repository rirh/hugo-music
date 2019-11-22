<style lang="less" >
.login /deep/ .ant-modal-body {
  padding: 1.5vw 3vw 3vw 3vw;
  border-top: 1vw solid var(--red);
  border-radius: 0.26vw;
}
.login {
  position: relative;
  &-input {
    font-weight: bold;
  }
  &-close {
    position: absolute;
    left: -2vw;
    top: -3vw;
    font-size: 20px;
  }
  &-close:hover {
    color: var(--tipsColor);
  }
  &-body {
    margin-top: 2vw;
    &-radio {
      margin: 0.8vw 0 2vw 0;
      display: flex;
      justify-content: space-between;
      color: var(--link);
    }
  }
}
</style>

<template>
  <div>
    <a-modal
      class="login"
      :visible="show"
      :width="370"
      :mask="false"
      :closable="false"
      centered
      :footer="null"
      @keyup.enter="handleSumit"
    >
      <a-spin class="login-body" :spinning="spinning">
        <AIconfont class="login-close" type="icon-close1" @click="$emit('change',false)" />
        <div v-show="logintype==='手机登录'">
          <a-input size="large" class="login-input" v-model="user" placeholder="请输入手机号"></a-input>
        </div>
        <div v-show="logintype!=='手机登录'">
          <a-input size="large" class="login-input" v-model="email" placeholder="请输入邮箱">
            <!-- <a-select slot="addonBefore" v-model="selected" @change="handleChange">
              <a-select-option v-for="(item) in CountryCode" :key="`${item}`"  >
                <span>{{item.phone_code}}&nbsp;</span>
                <span>{{item.cn}}</span>
              </a-select-option>
            </a-select>-->
          </a-input>
        </div>
        <div style="margin-top:10px">
          <a-input
            type="password"
            size="large"
            class="login-input"
            v-model="passowrd"
            placeholder="请输入密码"
          ></a-input>
        </div>
        <div class="login-body-radio">
          <a-radio-group v-model="logintype" size="small">
            <a-radio value="手机登录">手机</a-radio>
            <a-radio value="邮箱登录">邮箱</a-radio>
          </a-radio-group>
          <span>
            <span @click="handleIpcForget">忘记密码&nbsp;</span>
          </span>
        </div>

        <a-button type="primary" block @click="handleSumit">登录</a-button>
      </a-spin>
    </a-modal>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Model } from 'vue-property-decorator';
import axios from 'axios';
import routers from '@/routers';
import CountryCode from '@/lib/countrycode';
import {
  get_phone_login,
  get_user_playlist,
  get_user_detail,
  get_likelist,
} from '@/actions';
import { notification } from 'ant-design-vue';
import { setStorage } from '@/util/filters';
import { FORGET_PWD } from '@/constant/ipc';
import { ipcRenderer, remote } from 'electron';

@Component
export default class Tags extends Vue {
  public selected: any = '+86';
  public CountryCode = CountryCode;
  public spinning = false;
  public user = '';
  public passowrd = '';
  public email = '';
  public logintype = '手机登录';
  @Prop() private data!: string;
  @Prop() private show!: string;
  private visible!: boolean;
  public handleChange(msg: any) {
    this.CountryCode = msg;
  }
  // handleClose(){
  //   this.$emit('change',false)
  // }
  public handleIpcForget() {
    ipcRenderer.send(FORGET_PWD);
  }
  public async handleSumit() {
    const user = this.user;
    const email = this.email;
    const passowrd = this.passowrd;
    let params: any;
    this.spinning = true;
    if (this.logintype === '手机登录') {
      if (!user) {
        return;
      }
      if (user.length !== 11) {
        return;
      }
      params = `/cellphone?phone=${user}&password=${passowrd}`;
    } else {
      if (!email) {
        return;
      }
      if (!~email.indexOf('@')) {
        return;
      }
      if (!~email.indexOf('163')) {
        return;
      }
      params = `?email=${email}&password=${passowrd}`;
    }
    if (!passowrd) {
      return;
    }
    if (passowrd.length < 6) {
      return;
    }
    const res = await get_phone_login(params);
    this.spinning = false;
    if (res.code === 200) {
      setStorage('user', res);
      this.$store.commit('update_user', res);
      const userId = `uid=${res.profile.userId}`;
      const resAll = await axios.all([
        get_user_playlist(userId),
        get_user_detail(userId),
        get_likelist(),
      ]);
      const [playlist, userdetail]: any = resAll;
      if (playlist.code === 200) {
        this.$store.commit('update_playlist', playlist.playlist);
      }
      if (userdetail.code === 200) {
        this.$store.commit('update_user_detail', userdetail);
      }
      this.$router.push('/');
      this.$emit('change', false);
    }
  }
}
</script>

