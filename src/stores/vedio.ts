const user = {
  state: {
    show: false,
    cursor: {},
    state: 'ready',
    currtime: 0,
    duration: 0,

  },
  mutations: {
    update_show_vedio_page(state: any, params: any) {
      state.show = params;
    },
    update_vedio_duration(state: any, params: any) {
      state.duration = params;
    },
    update_vedio_state(state: any, params: any) {
      state.state = params;
    },
    update_vedio_currtime(state: any, params: any) {
      state.currtime = params;
    },
    update_vedio_cursor(state: any, params: any) {
      state.cursor = params;
    },
    update_user(state: any, params: any) {
      state.user = params;
    },
    update_playlist(state: any, params: any) {
      state.playlist = params;
    },
  },
};

export default user;

