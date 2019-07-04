// 服务器
export const host = 'https://music.huzhihui.org.cn/';


// 错误图片
export const ERROR_IMG = `http://wx3.sinaimg.cn/large/006ARE9vgy1fwods66zi5g308c06wdfx.gif`;
// 无需登录
/// banner
export const GET_BANNER = `${host}banner`;
/// /personalized
// 推荐歌单
export const GET_PERSONALIZED = `${host}personalized`;
/// /personalized/mv
// 推荐mv
export const GET_PERSONALIZED_MV = `${host}personalized/mv`;
// 推荐电台
export const GET_DJ_PROGRAM = `${host}personalized/djprogram`;

// 获取播放url
export const GET_SONG_URL = `${host}song/url`;


// 独家放送
// 说明 : 调用此接口 , 可获取独家放送

// 接口地址 : /personalized/privatecontent

// 调用例子 : /personalized/privatecontent
export const GET_PRIVATE_CONTENT = `${host}personalized/privatecontent`;
// 推荐新音乐
// 说明 : 调用此接口 , 可获取推荐新音乐
export const GET_NEW_SONG = `${host}personalized/newsong`;



// 1. 手机登录

// 必选参数 : phone: 手机号码 password: 密码

// 接口地址 : /login/cellphone

// 可选参数 : countrycode: 国家码，用于国外手机号登陆，例如美国传入：1

// 调用例子 : /login/cellphone?phone=xxx&password=yyy
export const GET_CELL_PHONE = `${host}login/cellphone`;
// 2.邮箱登录
export const GET_LOGIN = `${host}login`;
/// /personalized
export const GET_RECOMMEND_RESOURCE = `${host}recommend/resource`;
