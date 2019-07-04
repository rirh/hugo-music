const music = {
  state: {
    music: '',
    duration: 0,
    cursor: 0,
    state: 'stop',
    mode: '',
    data: {},
  },
  mutations: {
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

