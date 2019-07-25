const user = {
  state: {
    // 用户信息
    user: {},
    // 用户列表
    playlist: [],
    // 用户详细信息
    userDetail: {},
  },
  mutations: {
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

