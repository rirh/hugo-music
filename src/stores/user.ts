const user = {
  state: {
    // 用户信息
    user: {},
    // 用户列表
    playlist: [],
    // 用户详细信息
    userDetail: {},
    // 喜欢列表
    likelist: {},
  },
  mutations: {
    updata_likelist(state: any, params: any) {
      state.likelist = params;
    },
    updata_user_detail(state: any, params: any) {
      state.userDetail = params;
    },
    updata_user(state: any, params: any) {
      state.user = params;
    },
    updata_playlist(state: any, params: any) {
      state.playlist = params;
    },
  },
};

export default user;

