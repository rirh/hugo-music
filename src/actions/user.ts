import http from '@/axios';
import { GET_CELL_PHONE } from '@/constant/api';


// 任务取消接口改为任务改变
export const get_cell_phone = async (args: any) => {
  const { response }: any = await http(`${GET_CELL_PHONE}?${args}`);
  return response;
};

// 任务取消接口改为任务改变
export const post_set_settings = async (args: any) => {
  const { response }: any = await http(`${GET_CELL_PHONE}?${args}`);
  return response;
};
