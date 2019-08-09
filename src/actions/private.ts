import http from '@/axios';
import {
  GET_PERSONAL_FM,
} from '@/constant/api';
import { getStorage } from '@/util/filters';

// 私人fm
export const get_personal_fm = async () => {
  const { response }: any = await http(`${GET_PERSONAL_FM}`);
  return response;
};
// 给资源点赞
export const get_personal_fms = async (arg: any) => {
  const { response }: any = await http(`${GET_PERSONAL_FM}?${arg}`);
  return response;
};
