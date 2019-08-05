<style lang="less" scoped>
.wapper {
  display: flex;
  padding: 1rem;
  font-size: 13px;

  &-info {
    flex: 0 0 70%;
    display: flex;
    padding: 0 3rem 0 1rem;
    flex-direction: column;
    &-item {
      display: flex;
      width: 100%;
      align-items: center;
      justify-content: space-between;
      margin-top: 10px;
    }
    &-label {
      flex: 0 0 10%;
      text-align: left;
      font-weight: bold;
    }
  }
  &-avatar {
    display: flex;
    flex-direction: column;
  }
}
</style>

<template>
  <a-spin :spinning="spinning">
    <div class="wapper">
      <div class="wapper-info">
        <div class="wapper-info-item">
          <label class="wapper-info-label">昵称:</label>
          <a-input placeholder="昵称" v-model="form.nickname" />
        </div>
        <div class="wapper-info-item">
          <label style="align-self: flex-start;" class="wapper-info-label">介绍:</label>
          <a-textarea
            v-model="form.signature"
            placeholder="介绍"
            :autosize="{ minRows: 3, maxRows: 10 }"
          />
        </div>
        <div class="wapper-info-item" style="justify-content: flex-start">
          <label style="align-self: flex-start;" class="wapper-info-label">性别:</label>
          <a-radio-group v-model="form.gender" name="radioGroup" :defaultValue="1">
            <a-radio :value="0">保密</a-radio>
            <a-radio :value="1">男</a-radio>
            <a-radio :value="2">女</a-radio>
          </a-radio-group>
        </div>
        <div class="wapper-info-item">
          <label class="wapper-info-label">生日:</label>
          <a-select v-model="years" defaultValue="2019" style="width: 140px" @change="handleChange">
            <a-select-option v-for="(y,yindex) in year" :key="yindex" :value="y">{{y}}年</a-select-option>
          </a-select>
          <a-select v-model="months" defaultValue="2" style="width: 140px" @change="handleChange">
            <a-select-option v-for="(m,mindex) in month" :key="mindex" :value="m">{{m}}月</a-select-option>
          </a-select>
          <a-select v-model="days" defaultValue="2" style="width: 140px" @change="handleChange">
            <a-select-option v-for="(d,dindex) in day" :key="dindex" :value="d">{{d}}日</a-select-option>
          </a-select>
        </div>
        <div class="wapper-info-item">
          <label class="wapper-info-label">地区:</label>
          <a-select v-model="form.province" style="width: 140px" @change="handleChangeCity">
            <a-select-option v-for="(c,cindex) in city" :key="cindex" :value="c.id">{{c.name}}</a-select-option>
          </a-select>
          <a-select v-model="form.city" style="width: 140px">
            <a-select-option v-for="(c,cindex) in citycities" :key="cindex" :value="c.id">{{c.name}}</a-select-option>
          </a-select>
          <a-select defaultValue="lucy" style="width: 140px;opacity: 0;" @change="handleChange">
            <a-select-option value="jack">Jack</a-select-option>
          </a-select>
        </div>

        <div class="wapper-info-item" style="justify-content:center;margin-top:2rem">
          <a-button type="primary" @click="handleSumit">保存</a-button>&nbsp;&nbsp;&nbsp;&nbsp;
          <a-button @click="$router.push('/userinfo')">取消</a-button>
        </div>
      </div>
      <div class="wapper-avatar">
        <a-avatar
          :size="150"
          icon="user"
          shape="square"
          :src="detail&&detail.avatarUrl"
          style="margin-bottom:1rem"
        />
        <a-button :disabled="true" type="primary">修改头像</a-button>
      </div>
    </div>
  </a-spin>
</template>

<script lang="ts">
import { Component, Prop, Vue, Model } from 'vue-property-decorator';
import { get_update, get_user_detail } from '@/actions';
import city from '@/lib/city';
import { notification, message } from 'ant-design-vue';

@Component
export default class Tags extends Vue {
  public spinning = false;
  public form = {
    // gender: 性别 0:保密 1:男性 2:女性
    // birthday: 出生日期,时间戳 unix timestamp
    // nickname: 用户昵称
    // province: 省份id
    // city: 城市id
    // signature：用户签名
    gender: 0,
    birthday: '',
    nickname: '',
    province: '',
    city: '',
    signature: '',
  };
  public city: any = city;
  public citycities: any = [];
  public years: any = null;
  public months: any = null;
  public days: any = null;
  public handleChangeCity(item: any, index: any) {
    this.citycities = this.city[index];
  }
  public findCityindex() {
    let result = 0;
    const findIndex = (e: any) => e.id === this.form.province;
    const index = this.city.findIndex(findIndex);
    if (index) {
      result = index;
    }
    return result;
  }
  get detail() {
    return (
      this.$store.state.user.userDetail &&
      this.$store.state.user.userDetail.profile
    );
  }
  get year() {
    const result: any = [];
    const oyear = new Date().getFullYear() + 1;
    for (let index = 1920; index < oyear; index++) {
      result.push(index);
    }
    return result;
  }
  get month() {
    const result: any = [];
    for (let index = 1; index < 13; index++) {
      result.push(index);
    }
    return result;
  }
  public getDaysInOneMonth(year: any, month: any) {
    month = parseInt(month, 10);
    const d = new Date(year, month, 0); // 这个是都可以兼容的
    const date = new Date(year + '/' + month + '/0'); // IE浏览器可以获取天数，谷歌浏览器会返回NaN
    return d.getDate();
  }
  get day() {
    const oyear = this.years;
    const omonth = this.months;
    const day = this.getDaysInOneMonth(oyear, omonth);
    const result: any = [];
    for (let index = 1; index < day + 1; index++) {
      result.push(index);
    }
    return result;
  }
  public async handleSumit() {
    this.spinning = true;
    const {
      nickname,
      gender,
      birthday,
      province,
      city,
      signature,
    }: any = this.form;
    const obirthday = new Date(
      `${this.years}-${this.months}-${this.days} 00:00:00`,
    ).getTime();
    const res = await get_update(`
    gender=${gender}
    &signature=${signature}
    &city=${city}
    &nickname=${nickname}
    &birthday=${obirthday}
    &province=${province}`);
    this.spinning = false;
    if (res.code === 200) {
      const userId = `uid=${this.detail.userId}`;
      const userdetail = await get_user_detail(userId);
      this.$store.commit('updata_user_detail', userdetail);
      message.success('修改成功！');
    }
  }
  public handleChange() {
    const oyear = this.years;
    const omonth = this.months;
    const oday = this.getDaysInOneMonth(oyear, omonth);
    if (this.days > oday) {
      this.days = 1;
    }
  }
  public async mounted() {
    const {
      nickname,
      gender,
      birthday,
      province,
      city,
      signature,
    } = this.detail;
    // city = this.city[`0,${province}`][city];
    // province = this.city[0][province];
    this.form.province = province;
    this.form.city = city;
    const index = this.findCityindex();
    const obj = this.city[index].cities;
    const array: any = [];
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        const k = obj[key];
        array.push({
          id: key,
          name: obj[key],
        });
      }
    }
    this.citycities = array;

    this.form = { nickname, gender, birthday, province, city, signature };
    const d = new Date(birthday);
    this.years = d.getFullYear();
    this.months = d.getMonth() + 1;
    this.days = d.getDate();
  }
}
</script>

