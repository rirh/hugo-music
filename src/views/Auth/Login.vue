<style lang="less" scoped>
</style>

<template>
  <div>
    <a-modal title="登录" :visible="show" :width="380" :mask="false" centered :footer="null">
      <div class="login">
        <div>
          <a-input v-model="user" placeholder="请输入账号">
            <!-- <a-select slot="addonBefore" v-model="selected" @change="handleChange">
              <a-select-option v-for="(item) in CountryCode" :key="`${item}`"  >
                <span>{{item.phone_code}}&nbsp;</span>
                <span>{{item.cn}}</span>
              </a-select-option>
            </a-select>-->
          </a-input>
        </div>
        <br />
        <div>
          <a-input v-model="passowrd" placeholder="请输入密码"></a-input>
        </div>
        <br />
        <a-button type="primary" block @click="handleSumit">登录</a-button>
      </div>
    </a-modal>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Model } from 'vue-property-decorator';
import axios from 'axios';
import routers from '@/routers';
import CountryCode from '@/lib/countrycode';
import { get_phone_login, get_user_playlist, get_user_detail } from '@/actions';
import { notification } from 'ant-design-vue';
import { setStorage } from '@/util/filters';

@Component
export default class Tags extends Vue {
  public selected: any = '+86';
  public CountryCode = CountryCode;
  public user = '';
  public passowrd = '';
  @Prop() private data!: string;
  @Prop() private show!: string;
  @Model('change')
  private visible!: boolean;
  public handleChange(msg: any) {
    this.CountryCode = msg;
  }
  public async handleSumit() {
    const res = await get_phone_login(
      `phone=${this.user}&password=${this.passowrd}`,
    );
    if (res.code === 200) {
      setStorage('user', res);
      this.$store.commit('updata_user', res);
      const userId = `uid=${res.profile.userId}`;
      const resAll = await axios.all([
        get_user_playlist(userId),
        get_user_detail(userId),
      ]);
      const [playlist, userdetail]: any = resAll;
      if (playlist.code === 200) {
        this.$store.commit('updata_playlist', playlist.playlist);
      }
      if (userdetail.code === 200) {
        this.$store.commit('updata_user_detail', userdetail);
      }
      this.$router.push('/');
      this.$emit('on-visible', false);
    }
  }
}
</script>

