import http from '@/axios';
import { GET_CELL_PHONE, GET_USRE_PLAY_LIST } from '@/constant/api';


// 任务取消接口改为任务改变
export const get_user_playlist = async (args: any) => {
  const { response }: any = await http(`${GET_USRE_PLAY_LIST}?${args}`);
  return response;
};
// 手机号登录
export const get_phone_login = async (args: any) => {
  const { response }: any = await http(`${GET_CELL_PHONE}?${args}`);
  return response;
};
