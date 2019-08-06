import http from '@/axios';
import {
  GET_CELL_PHONE,
  GET_USRE_PLAY_LIST,
  GET_USRE_DETAIL,
  GET_DAILY_SIGNIN,
  GET_LOGOUT,
  GET_SUBCOUNT,
  GET_LIKELIST,
  GET_UPDATE,
  GET_CAPTCHA_SENT,
  GET_CAPTCHA_VERIFY,
  GET_REDBIND,
  GET_USER_DJ,
  GET_DJ_SUBLISY,
  GET_USER_FOLLOWS,
  GET_USER_FOLLOWEDS,
  GET_FOLLOW,
} from '@/constant/api';
import { clearStorage } from '@/util/filters';
import store from '@/store';
import router from '@/router';

// 关注/取消关注
export const get_follow = async (args: any) => {
  const { response }: any = await http(`${GET_FOLLOW}?${args}`);
  return response;
};
// 获取用户粉丝列表
export const get_use_followeds = async (args: any) => {
  const { response }: any = await http(`${GET_USER_FOLLOWEDS}?${args}`);
  return response;
};
// 获取用户关注列表
export const get_use_follows = async (args: any) => {
  const { response }: any = await http(`${GET_USER_FOLLOWS}?${args}`);
  return response;
};
// 获取用户电台
export const get_user_dj = async (args: any) => {
  const { response }: any = await http(`${GET_USER_DJ}?${args}`);
  return response;
};
// 获取用户电台
export const get_dj_sublist = async (args: any) => {
  const { response }: any = await http(`${GET_DJ_SUBLISY}?${args}`);
  return response;
};
// 验证验证码
export const get_redbind = async (args: any) => {
  const { response }: any = await http(`${GET_REDBIND}?${args}`);
  return response;
};
// 验证验证码
export const get_captcha_verify = async (args: any) => {
  const { response }: any = await http(`${GET_CAPTCHA_VERIFY}?${args}`);
  return response;
};

// 发送验证码
export const get_captcha_sent = async (args: any) => {
  const { response }: any = await http(`${GET_CAPTCHA_SENT}?${args}`);
  return response;
};

// 修改用户信息
export const get_update = async (args: any) => {
  const { response }: any = await http(`${GET_UPDATE}?${args}`);
  return response;
};
// 收藏
export const get_likelist = async () => {
  const account = (store as any).state.user.user.account;
  if (account) {
    const { response }: any = await http(`${GET_LIKELIST}?uid=${account.id}`);
    store.commit('updata_likelist', response);
  }
};

// 获取用户信息 , 歌单，收藏，mv, dj 数量
export const get_subcount = async () => {
  const { response }: any = await http(`${GET_SUBCOUNT}`);
  return response;
};
// 签到
export const get_daily_signin = async () => {
  const { response }: any = await http(`${GET_DAILY_SIGNIN}`);
  return response;
};
// 任务取消接口改为任务改变
export const get_user_detail = async (args: any) => {
  const { response }: any = await http(`${GET_USRE_DETAIL}?${args}`);
  return response;
};
// 任务取消接口改为任务改变
export const get_user_playlist = async (args: any) => {
  const { response }: any = await http(`${GET_USRE_PLAY_LIST}?${args}`);
  return response;
};
// 手机号登录
export const get_phone_login = async (args: any) => {
  const { response }: any = await http(`${GET_CELL_PHONE}${args}`);
  return response;
};


// 退出
export const sign_out = async () => {
  const { response }: any = await http(`${GET_LOGOUT}`);
  if (response.code === 200) {
    clearStorage();
    store.commit('updata_user', {});
    store.commit('updata_user_detail', {});
    store.commit('updata_playlist', []);
    router.push({ path: '/' });
  }
};
