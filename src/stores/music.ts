const music = {
  state: {
    music: '',
    duration: 0,
    cursor: 0,
    state: 'stop',
    mode: '',
    data: {},
    list: [],
    history: [],
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
        state.history.push(params);
      }
    },
    clear_music_list(state: any) {
      state.list = [];
    },
    delete_music_list_item(state: any, params: any) {
      state.list.splice(params, 1);
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
      switch (state.state) {
        case 'playing':
          if (params.id !== state.data.id) {
            state.data = params;
          }
          break;
        case 'pause':
          if (params.id !== state.data.id) {
            state.data = params;
          }
          break;
        case 'stop':
          state.data = {};
          state.data = params;
          break;

        default:
          break;
      }

    },
  },
};

export default music;

