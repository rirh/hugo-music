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
} from '@/constant/api';
import { clearStorage } from '@/util/filters';
import store from '@/store';
import router from '@/router';

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
