import http from '@/axios';
import {
    GET_EVENT,
    GET_ARTIST_DESC,
    GET_ARTIST_ALBUM,
    GET_SIMI_ARTIST,
    GET_ARTISTS,
} from '@/constant/api';
import { getStorage } from '@/util/filters';


// 动态
export const get_event = async (arg: any) => {
    const { response }: any = await http(`${GET_EVENT}?${arg}`);
    return response;
};
// 相似歌手
export const get_simi_artisst = async (arg: any) => {
    const { response }: any = await http(`${GET_SIMI_ARTIST}?${arg}`);
    return response;
};
