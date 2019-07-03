import http from '@/axios';
import {
  GET_PERSONALIZED,
  GET_PRIVATE_CONTENT,
  GET_NEW_SONG,
  GET_PERSONALIZED_MV,
  GET_DJ_PROGRAM,
} from '@/constant/api';


export const get_dj_program = async () => {
  const { response }: any = await http(`${GET_DJ_PROGRAM}`);
  return response;
};

export const get_personalized_mv = async () => {
  const { response }: any = await http(`${GET_PERSONALIZED_MV}`);
  return response;
};
export const get_personalized = async () => {
  const { response }: any = await http(`${GET_PERSONALIZED}`);
  return response;
};
export const get_new_song = async () => {
  const { response }: any = await http(`${GET_NEW_SONG}`);
  return response;
};
// 独家放送
// 说明 : 调用此接口 , 可获取独家放送

// 接口地址 : /personalized/privatecontent

// 调用例子 : /personalized/privatecontent
export const get_private_content = async () => {
  const { response }: any = await http(`${GET_PRIVATE_CONTENT}`);
  return response;
};
