import { getSongUrl } from "@/api";
const DEF_ANALYSER_FFSIZE = 2048;
const audioContext =
  AudioContext || window.AudioContext || window.webkitAudioContext;
const audio_context = new audioContext();
const audio = new Audio({
  crossOrigin: "anonymous"
});
const source = audio_context.createMediaElementSource(audio);
const gain = audio_context.createGain();
gain.gain.value = 1;
const analyser = audio_context.createAnalyser();
analyser.fftSize = DEF_ANALYSER_FFSIZE;
source.connect(gain);
gain.connect(audio_context.destination);
export default {
  state: {
    audio,
    audio_context,
    gain,
    play_list: {},
    current_url: "",
    current_state: "stop",
    current_duration: 0,
    current_progress: 0,
    current_mode: "loop",
    current_mode_options: ["loop", "order", "single", "random"]
  },
  mutations: {
    update_play_list(state, payload) {
      state.play_list[payload.id] = payload;
    },
    update_current_url(state, payload) {
      state.current_url = payload;
    },
    update_current_state(state, payload) {
      state.current_state = payload;
    },
    update_current_duration(state, payload) {
      state.current_duration = payload;
    },
    update_current_progress(state, payload) {
      state.current_progress = payload;
    }
  },
  actions: {
    seek() {},
    play({ commit }) {
      gain.gain.value = 0;
      audio.play();
      const currentTime = audio_context.currentTime;
      gain.gain.linearRampToValueAtTime(1, currentTime + 0.8);
      audio.play();
      commit("update_current_state", "play");
    },
    pause({ commit }) {
      const currentTime = audio_context.currentTime;
      gain.gain.linearRampToValueAtTime(0, currentTime + 0.8);
      audio.pause();
      commit("update_current_state", "pause");
    },
    toggle_play({ state, dispatch }) {
      if (state.current_state !== "play") {
        dispatch("play");
      } else {
        dispatch("pause");
      }
    },
    async fetch_song_data({ commit, dispatch }, id) {
      dispatch("pause");
      const { data, code } = await getSongUrl({ id });
      if (code !== 200) return;
      const [song] = data;
      commit("update_play_list", song);
      audio.src = song.url;
      audio.oncanplay = () => {
        dispatch("toggle_play");
        commit("update_current_duration", audio.duration);
      };
      audio.onended = () => {
        dispatch("pause");
      };
      audio.ontimeupdate = () => {
        commit("update_current_progress", audio.currentTime);
      };
    }
  }
};
