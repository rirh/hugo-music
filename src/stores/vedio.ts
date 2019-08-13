const user = {
  state: {
    show: false,
    cursor: {},
    state: 'ready',
    currtime: '',

  },
  mutations: {
    updata_show_vedio_page(state: any, params: any) {
      state.show = params;
    },
    updata_vedio_state(state: any, params: any) {
      state.state = params;
    },
    updata_vedio_currtime(state: any, params: any) {
      state.currtime = params;
    },
    updata_vedio_cursor(state: any, params: any) {
      state.cursor = params;
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

