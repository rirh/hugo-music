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
