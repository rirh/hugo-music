import http from '@/axios';
import {
  GET_VIDEO_GROUP_LIST,
  GET_VIDEO_GROUP,
  GET_VIDEO_DETAIL,
  GET_VIDEO_URL,
  GET_RELATED_ALLVIDEO,
  GET_COMMENT_VIDEO,
  GET_MV_FIRST,
  GET_MV_EXCLUSICVE_RCMD,
  GET_TOP_MV,
  GET_MV_DETAIL,
  GET_MV_URL,
  GET_SIMI_MV,
  GET_COMMENT_MV,
} from '@/constant/api';
import { getStorage } from '@/util/filters';

// 相似mv
export const get_comment_mv = async (arg: any) => {
  const { response }: any = await http(`${GET_COMMENT_MV}?${arg}`);
  return response;
};
// 相似mv
export const get_simi_mv = async (arg: any) => {
  const { response }: any = await http(`${GET_SIMI_MV}?${arg}`);
  return response;
};
// mv 地址
export const get_mv_url = async (arg: any) => {
  const { response }: any = await http(`${GET_MV_URL}?${arg}`);
  return response;
};
// mv 详情
export const get_mv_detail = async (arg: any) => {
  const { response }: any = await http(`${GET_MV_DETAIL}?${arg}`);
  return response;
};
// 排行榜mv
export const get_top_mv = async (arg: any) => {
  const { response }: any = await http(`${GET_TOP_MV}?${arg}`);
  return response;
};
// 网易出品mv
export const get_mv_exclusicve_rcmd = async (arg: any) => {
  const { response }: any = await http(`${GET_MV_EXCLUSICVE_RCMD}?${arg}`);
  return response;
};
// 最新mv
export const get_mv_first = async (arg: any) => {
  const { response }: any = await http(`${GET_MV_FIRST}?${arg}`);
  return response;
};

// 相关视频评论
export const get_comment_video = async (arg: any) => {
  const { response }: any = await http(`${GET_COMMENT_VIDEO}?${arg}`);
  return response;
};
// 相关视频推荐
export const get_related_allvideo = async (arg: any) => {
  const { response }: any = await http(`${GET_RELATED_ALLVIDEO}?${arg}`);
  return response;
};
// 获取视频链接
export const get_video_url = async (arg: any) => {
  const { response }: any = await http(`${GET_VIDEO_URL}?${arg}`);
  return response;
};
// 获取视频详情
export const get_video_detail = async (arg: any) => {
  const { response }: any = await http(`${GET_VIDEO_DETAIL}?${arg}`);
  return response;
};
// 获取视频标签列表
export const get_video_group_list = async () => {
  const { response }: any = await http(`${GET_VIDEO_GROUP_LIST}`);
  return response;
};
// 获取视频标签下的视频
export const get_video_group = async (arg: any) => {
  const { response }: any = await http(`${GET_VIDEO_GROUP}?${arg}`);
  return response;
};
