const music = {
  state: {
    music: '',
    duration: 0,
    cursor: 0,
    state: 'stop',
    mode: '',
    data: {},
    list: [],
    like: false,
    showPanel: false,
  },
  mutations: {
    updata_like(state: any, params: any) {
      state.list = params;
    },
    updata_show_panel(state: any, params: any) {
      state.showPanel = params;
    },
    updata_music_list(state: any, params: any) {
      const isalive = state.list.some((e: any) => e.id === params.id);
      if (!isalive) {
        state.list.push(params);
      }
    },
    updata_music_cursor(state: any, params: any) {
      state.cursor = params;
    },
    updata_music_duration(state: any, params: any) {
      state.duration = params;
    },
    updata_music_state(state: any, params: any) {
      state.state = params;
    },
    updata_music_data(state: any, params: any) {
      state.data = params;
    },
  },
};

export default music;

