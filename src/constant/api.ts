// 服务器
export const host = 'https://music.huzhihui.org.cn/';
// export const host = 'http://localhost:3002/';

// 错误图片
// tslint:disable-next-line:no-var-requires
// export const ERROR_IMG = require(`../assets/error.jpg`);
export const ERROR_IMG = 'https://p2.music.126.net/6y-UleORITEDbvrOLV0Q8A==/5639395138885805.jpg';

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

// 获取播放url
export const GET_CHENK_MUSIC = `${host}check/music`;


// 获取歌曲详情
export const GET_SONG_DETAIL = `${host}song/detail`;

// 获取歌曲详情
export const GET_ALBUM = `${host}album`;

// 获取歌单分类
export const GET_CAT_LIST = `${host}playlist/catlist`;
// 获取热门分类
export const GET_CAT_HOT = `${host}playlist/hot`;
// 获取精品电台
export const GET_PLAY_HIGH_QUALITY = `${host}top/playlist/highquality`;
// 获取精品歌单详情
export const GET_PLAY_LIST_DETAIL = `${host}playlist/detail`;
// 获取精品歌单详情
export const GET_PLAY_SONG_DETAIL = `${host}song/detail`;
// 获取精品歌单评论
export const GET_PLAY_SONG_COMMENT = `${host}comment/playlist`;
// 获取精品歌单收藏者
export const GET_PLAY_SONG_SUBSCRIBERS = `${host}playlist/subscribers`;
// 建议搜索
export const GET_SEARCH_SUGGEST = `${host}search/suggest`;
// 歌单top
export const GET_TOP_LIST = `${host}toplist/detail`;
// 歌单
export const GET_ARTIST_LISY = `${host}artist/list`;
// 新歌速递
export const GET_TOP_SONG = `${host}top/song`;
// 新碟上架
export const GET_TOP_ALBUM = `${host}top/album`;
// 新碟详情
export const GET_ALBUM_DETAIL = `${host}album`;
// 专辑评论
export const GET_ALBUM_COMMENT = `${host}comment/album`;






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
export const GET_CELL_PHONE = `${host}login`;
// 2.邮箱登录
export const GET_LOGIN = `${host}login`;
/// /personalized
export const GET_RECOMMEND_RESOURCE = `${host}recommend/resource`;
/// 获取用户歌单
export const GET_USRE_PLAY_LIST = `${host}user/playlist`;
// /user/playlist?uid=32953014
/// 获取用户详情
export const GET_USRE_DETAIL = `${host}user/detail`;
// /user/detail
/// 签到
export const GET_DAILY_SIGNIN = `${host}daily_signin`;
// /daily_signin
/// 退出
export const GET_LOGOUT = `${host}logout`;
/// 获取用户信息 , 歌单，收藏，mv, dj 数量
export const GET_SUBCOUNT = `${host}user/subcount`;
// /user/subcount
/// 获取歌曲歌词
export const GET_LYRIC = `${host}lyric`;
/// 喜欢
export const GET_LIKE = `${host}like`;
// /like?id=347230
/// 喜欢的歌曲
export const GET_LIKELIST = `${host}likelist`;
/// 获得歌曲评论
export const GET_COMMENT_MUSIC = `${host}comment/music`;
/// 获得歌曲评论
export const GET_SIMI_SONG = `${host}simi/song`;
// /simi/song
/// 评论点赞
export const GET_COMMENT_LIKE = `${host}comment/like`;
// /resource/like
/// 资源点赞
export const GET_RESOURCE_LIKE = `${host}resource/like`;
// /resource/like
export const GET_UPDATE = `${host}user/update`;
// /user/GET_UPDATE
// 发送验证码
export const GET_CAPTCHA_SENT = `${host}captcha/sent`;
// /captcha/sent
// 验证验证码
export const GET_CAPTCHA_VERIFY = `${host}captcha/verify`;
// /captcha/sent
// 绑定验证码
export const GET_REDBIND = `${host}rebind`;
// /captcha/sent
// /rebind
// 用户电台
export const GET_USER_DJ = `${host}user/dj`;
// /user/dj
// 用户电台
export const GET_DJ_SUBLISY = `${host}dj/sublist`;
// /user/dj
// /dj/sublist
// 用户关注列表
export const GET_USER_FOLLOWS = `${host}user/follows`;
// /user/follows

// 用户粉丝列表
export const GET_USER_FOLLOWEDS = `${host}user/followeds`;
// /user/followeds
// 关注/取消关注
export const GET_FOLLOW = `${host}follow`;
// /follow
// 播放历史记录
export const GET_USER_RECORD = `${host}user/record`;
// /user/record
// 私人fm
export const GET_PERSONAL_FM = `${host}personal_fm`;
// /personal_fm
// 描述详情
export const GET_ARTIST_DESC = `${host}artist/desc`;
// /artist/desc
// 歌手专辑
export const GET_ARTIST_ALBUM = `${host}artist/album`;
// /artist/desc
// 相似歌手
export const GET_SIMI_ARTIST = `${host}simi/artist`;
// simi/artist
// 歌手单曲
export const GET_ARTISTS = `${host}artists`;
// // simi/artist
// 获取视频标签列表
export const GET_VIDEO_GROUP_LIST = `${host}video/group/list`;
// // simi/artist
// 获取视频标签下的视频
export const GET_VIDEO_GROUP = `${host}video/group`;
// video/group
// 获取视频详情
export const GET_VIDEO_DETAIL = `${host}video/detail`;
// video/group
// 获取视频详情
export const GET_VIDEO_URL = `${host}video/url`;
// /video/url
// 获取相关视频
export const GET_RELATED_ALLVIDEO = `${host}related/allvideo`;
// /related/allvideo
// 获取视频评论
export const GET_COMMENT_VIDEO = `${host}comment/video`;
// /comment/video
// 最新mv
export const GET_MV_FIRST = `${host}mv/first`;
// /mv/first
// 网易出品mv
export const GET_MV_EXCLUSICVE_RCMD = `${host}mv/exclusive/rcmd`;
// /mv/exclusive/rcmd
// 排行榜mv
export const GET_TOP_MV = `${host}top/mv`;
// /top/mv
// mv 详情
export const GET_MV_DETAIL = `${host}mv/detail`;
// /mv/detail
// mv 地址
export const GET_MV_URL = `${host}mv/url`;
// /mv/url
// 相似mv
export const GET_SIMI_MV = `${host}simi/mv`;
// /simi/mv
// mv评论
export const GET_COMMENT_MV = `${host}comment/mv`;
// /comment/mv
// /search/hot
// 热门搜索
export const GET_SEARCH_HOT = `${host}search/hot`;
// /msg/private
// 私信
export const GET_MSG_PRIVATE = `${host}msg/private`;
// 评论
export const GET_MSG_COMMENTS = `${host}msg/comments`;
// 艾特我
export const GET_MSG_FORWARDS = `${host}msg/forwards`;
// 通知
export const GET_MSG_NOTICES = `${host}msg/notices`;
// search
// 搜索
export const GET_SEARCH = `${host}search`;
