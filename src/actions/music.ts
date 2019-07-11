import http from '@/axios';
import {
  GET_CELL_PHONE,
  GET_BANNER,
  GET_SONG_URL,
  GET_SONG_DETAIL,
  GET_ALBUM,
  GET_CHENK_MUSIC,
  GET_SEARCH_SUGGEST,
} from '@/constant/api';



// 搜索
export const get_search_suggest = async (arg: any) => {
  const { response }: any = await http(`${GET_SEARCH_SUGGEST}?${arg}`);
  return response;
};

// 任务取消接口改为任务改变
export const get_song_album = async (arg: any) => {
  const { response }: any = await http(`${GET_ALBUM}?id=${arg}`);
  return response;
};

// 获取也去详情
export const get_song_detail = async (arg: any) => {
  const { response }: any = await http(`${GET_SONG_DETAIL}?ids=${arg}`);
  return response;
};

// 任务取消接口改为任务改变
export const get_check_music = async (arg: any) => {
  const { response }: any = await http(`${GET_CHENK_MUSIC}?id=${arg}`);
  return response;
};

// 任务取消接口改为任务改变
export const get_song_url = async (arg: any) => {
  const { response }: any = await http(`${GET_SONG_URL}?id=${arg}`);
  return response;
};
// 任务取消接口改为任务改变
export const get_banner = async () => {
  const { response }: any = await http(`${GET_BANNER}`);
  return response;
};

// 任务取消接口改为任务改变
export const post_set_settin = async (args: any) => {
  const { response }: any = await http(`${GET_CELL_PHONE}?${args}`);
  return response;
};
