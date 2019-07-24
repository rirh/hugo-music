const user = {
  state: {
    // 用户信息
    user: {},
    // 用户列表
    playlist: [],
  },
  mutations: {
    updata_user(state: any, params: any) {
      state.user = Object.assign(state.user, params);
    },
    updata_playlist(state: any, params: any) {
      state.playlist = params;
    },
  },
};

export default user;

