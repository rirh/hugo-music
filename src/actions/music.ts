import http from '@/axios';
import {
  GET_CELL_PHONE,
  GET_BANNER,
  GET_SONG_URL,
  GET_SONG_DETAIL,
  GET_ALBUM,
  GET_CHENK_MUSIC,
  GET_SEARCH_SUGGEST,
  GET_LYRIC,
  GET_LIKE,
  GET_COMMENT_MUSIC,
  GET_SIMI_SONG,
  GET_RESOURCE_LIKE,
  GET_COMMENT_LIKE,
  GET_SEARCH_HOT,
  GET_SEARCH,
} from '@/constant/api';
import { getStorage } from '@/util/filters';

// 搜索
export const get_search = async (arg: any = '') => {
  const { response }: any = await http(`${GET_SEARCH}?${arg}`);
  return response;
};

// 获取热门搜索
export const get_search_hot = async (arg: any = '') => {
  const { response }: any = await http(`${GET_SEARCH_HOT}?${arg}`);
  return response;
};

// 给评论点赞
export const get_comment_like = async (arg: any) => {
  const { response }: any = await http(`${GET_COMMENT_LIKE}?${arg}`);
  return response;
};
// 给资源点赞
export const get_resource_like = async (arg: any) => {
  const { response }: any = await http(`${GET_RESOURCE_LIKE}?${arg}`);
  return response;
};
// 获取相似音乐
export const get_simi_song = async (arg: any) => {
  const { response }: any = await http(`${GET_SIMI_SONG}?${arg}`);
  return response;
};
// 歌曲评价
export const get_comment_music = async (arg: any) => {
  const { response }: any = await http(`${GET_COMMENT_MUSIC}?${arg}`);
  return response;
};
// 收藏
export const get_like = async (arg: any) => {
  const { response }: any = await http(`${GET_LIKE}?${arg}`);
  return response;
};
// 歌词
export const get_lyric = async (arg: any) => {
  const { response }: any = await http(`${GET_LYRIC}?id=${arg}`);
  return response;
};
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
