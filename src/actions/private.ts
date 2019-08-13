import http from '@/axios';
import {
  GET_PERSONAL_FM,
  GET_ARTIST_DESC,
  GET_ARTIST_ALBUM,
  GET_SIMI_ARTIST,
  GET_ARTISTS,
} from '@/constant/api';
import { getStorage } from '@/util/filters';


// 相似歌手
export const get_artists = async (arg: any) => {
  const { response }: any = await http(`${GET_ARTISTS}?${arg}`);
  return response;
};
// 相似歌手
export const get_simi_artist = async (arg: any) => {
  const { response }: any = await http(`${GET_SIMI_ARTIST}?${arg}`);
  return response;
};
// 歌手专辑
export const get_artist_album = async (arg: any) => {
  const { response }: any = await http(`${GET_ARTIST_ALBUM}?${arg}`);
  return response;
};
// 歌手详情
export const get_artist_desc = async (arg: any) => {
  const { response }: any = await http(`${GET_ARTIST_DESC}?${arg}`);
  return response;
};
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
