import request from "@/utils/request";
// 获取歌手详情
export function getArtistDetail(params: any) {
  return request({
    url: `/artist/detail`,
    method: "get",
    params,
  });
}

// 获取用户详情
export function getUserDetail(params: any) {
  return request({
    url: ` /user/detail`,
    method: "get",
    params,
  });
}
// 获取精品歌单
export function getPlayListDetail(params: any) {
  return request({
    url: `/playlist/detail`,
    method: "get",
    params,
  });
}
// 获取精品歌单
export function getAlbumDetail(params: any) {
  return request({
    url: `/album/detail`,
    method: "get",
    params,
  });
}

// 获取歌单详情
export function getAlbum(params: any) {
  return request({
    url: `/album`,
    method: "get",
    params,
  });
}
// 获取歌手热门50首
export function getArtistTopSong(params: any) {
  return request({
    url: `/artist/top/song`,
    method: "get",
    params,
  });
}

// 获取歌手专辑
export function getArtistAlbum(params: any) {
  return request({
    url: `/artist/album`,
    method: "get",
    params,
  });
}

// 获取歌手MV
export function getArtistMv(params: any) {
  return request({
    url: `/artist/mv`,
    method: "get",
    params,
  });
}
