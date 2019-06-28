// 服务器
export const host = 'https://music.huzhihui.org.cn/';
// 1. 手机登录

// 必选参数 : phone: 手机号码 password: 密码

// 接口地址 : /login/cellphone

// 可选参数 : countrycode: 国家码，用于国外手机号登陆，例如美国传入：1

// 调用例子 : /login/cellphone?phone=xxx&password=yyy
export const GET_CELL_PHONE = `${host}login/cellphone`;
