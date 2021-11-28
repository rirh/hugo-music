import request from "@/utils/request";
// 多选搜索
export function getSearchMultimatch(params) {
  return request({
    url: "/search/multimatch",
    method: "get",
    params
  });
}
// 搜索
export function getCloudSearch(params) {
  return request({
    url: "/cloudsearch",
    method: "get",
    params
  });
}

// 搜索建议
export function getSearchSuggest(params) {
  return request({
    url: "/search/suggest",
    method: "get",
    params
  });
}

// 获取音乐的url
export function getSongUrl(params) {
  return request({
    url: "/song/url",
    method: "get",
    params
  });
}

// 获取音乐的url
export function getSongDetail(params) {
  return request({
    url: "/song/detail",
    method: "get",
    params
  });
}

// 获取音乐的url
export function getLyric(params) {
  return request({
    url: "/lyric",
    method: "get",
    params
  });
}

// 获取mv的url
export function getMvUrl(id) {
  return request({
    url: `/mv/url?id=${id}`,
    method: "get"
  });
}
// 获取mv的url
export function getVideoUrl(id) {
  return request({
    url: `/video/url?id=${id}`,
    method: "get"
  });
}
// 获取mv的url
export function getPersonalizedNewsong() {
  return request({
    url: `/personalized/newsong`,
    method: "get"
  });
}
// 获取排行榜
export function getTopList() {
  return request({
    url: `/toplist`,
    method: "get"
  });
}
// 获取精品歌单
export function getHighQuality() {
  return request({
    url: `/top/playlist/highquality`,
    method: "get"
  });
}

// 获取热门歌手
export function getTopArtists() {
  return request({
    url: `/top/artists`,
    method: "get"
  });
}
// 获取建议搜索
export function getSearchHot(params) {
  return request({
    url: `/search/hot`,
    method: "get",
    params
  });
}

// 获取音乐评论
export function getCommentMusic(params) {
  return request({
    url: `/comment/music`,
    method: "get",
    params
  });
}

