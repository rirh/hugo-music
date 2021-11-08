import request from "@/utils/request";
// 获取歌手详情
export function getArtistDetail(params) {
  return request({
    url: `/artist/detail`,
    method: "get",
    params
  });
}

// 获取用户详情
export function getUserDetail(params) {
  return request({
    url: ` /user/detail`,
    method: "get",
    params
  });
}
