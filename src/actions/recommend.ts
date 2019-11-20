/**
 * 个性推荐接口
 */
import http from '@/axios';
import {
  GET_PERSONALIZED,
  GET_PRIVATE_CONTENT,
  GET_NEW_SONG,
  GET_PERSONALIZED_MV,
  GET_DJ_PROGRAM,
  GET_CAT_LIST,
  GET_CAT_HOT,
  GET_PLAY_HIGH_QUALITY,
  GET_PLAY_LIST_DETAIL,
  GET_PLAY_SONG_DETAIL,
  GET_PLAY_SONG_COMMENT,
  GET_PLAY_SONG_SUBSCRIBERS,
  GET_TOP_LIST,
  GET_ARTIST_LISY,
  GET_TOP_SONG,
  GET_TOP_ALBUM,
  GET_ALBUM_DETAIL,
  GET_ALBUM_COMMENT,
} from '@/constant/api';



export const get_album_comment = async (args: any) => {
  const { response }: any = await http(`${GET_ALBUM_COMMENT}?${args}`);
  return response;
};

export const get_album_detail = async (args: any) => {
  const { response }: any = await http(`${GET_ALBUM_DETAIL}?${args}`);
  return response;
};

export const get_top_album = async (args: any) => {
  const { response }: any = await http(`${GET_TOP_ALBUM}?${args}`);
  return response;
};
export const get_top_song = async (args: any) => {
  const { response }: any = await http(`${GET_TOP_SONG}?${args}`);
  return response;
};
export const get_artist_list = async (args: any) => {
  const { response }: any = await http(`${GET_ARTIST_LISY}?${args}`);
  return response;
};
export const get_top_list = async () => {
  const { response }: any = await http(`${GET_TOP_LIST}`);
  return response;
};
export const get_play_song_subscribers = async (args: any) => {
  const { response }: any = await http(`${GET_PLAY_SONG_SUBSCRIBERS}?${args}`);
  return response;
};
export const get_play_song_comment = async (args: any) => {
  const { response }: any = await http(`${GET_PLAY_SONG_COMMENT}?${args}`);
  return response;
};
export const get_play_song_detail = async (args: any) => {
  const { response }: any = await http(`${GET_PLAY_SONG_DETAIL}?${args}`);
  return response;
};
export const get_play_list_detail = async (args: any) => {
  const { response }: any = await http(`${GET_PLAY_LIST_DETAIL}?${args}`);
  return response;
};
export const get_play_high_qualty = async (args: any) => {
  const { response }: any = await http(`${GET_PLAY_HIGH_QUALITY}?${args}`);
  return response;
};
export const get_cat_hot = async () => {
  const { response }: any = await http(`${GET_CAT_HOT}`);
  return response;
};
export const get_cat_list = async () => {
  const { response }: any = await http(`${GET_CAT_LIST}`);
  return response;
};
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
