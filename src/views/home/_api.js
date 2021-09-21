import request from "@/utils/request";
// 多选搜索
export function getSearchMultimatch(params) {
  return request({
    url: "/search/multimatch",
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
