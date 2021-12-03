import request from "@/utils/request";
// 获取歌手详情
export function postUserParams(data) {
  return request({
    baseURL: process.env.VUE_APP_AURH_API,
    url: `/userParams`,
    method: "post",
    data
  });
}
// 发送验证码
export function postEmailCode(data) {
  return request({
    baseURL: process.env.VUE_APP_AURH_API,
    url: `/code`,
    method: "post",
    data
  });
}
