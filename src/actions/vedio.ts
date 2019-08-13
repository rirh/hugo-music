import http from '@/axios';
import {
  GET_VIDEO_GROUP_LIST,
  GET_VIDEO_GROUP,

} from '@/constant/api';
import { getStorage } from '@/util/filters';

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
