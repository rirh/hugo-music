import axios from "axios";
axios.defaults.headers["Content-Type"] = "application/json;charset=utf-8";
// 不缓存图片
axios.defaults.headers["Cache-Control"] = "no-cache";
// 创建axios实例
const service = axios.create({
  // axios中请求配置有baseURL选项，表示请求URL公共部分
  baseURL: process.env.VUE_APP_BASE_API || process.env.VUE_APP_BASE_API,
  withCredentials: true,
  // 超时
  timeout: 60000
});

// request拦截器
service.interceptors.request.use(
  config => {
    // 是否需要设置 token
    if (config.params) config.params.timestamp = Date.now();
    return config;
  },
  error => {
    console.log(error);
    Promise.reject(error);
  }
);

// 响应拦截器
service.interceptors.response.use(
  res => {
    // 未设置状态码则默认成功状态
    if (res?.data?.cookie[0]) document.cookie = res.data.cookie[0];
    return res.data?.body;
  },
  error => {
    console.log("err" + error);
    let { message } = error;
    if (message == "Network Error") {
      message = "后端接口连接异常";
    } else if (message.includes("timeout")) {
      message = "系统接口请求超时";
    } else if (message.includes("Request failed with status code")) {
      message = "系统接口" + message.substr(message.length - 3) + "异常";
    }
    return Promise.reject(error);
  }
);

export default service;
