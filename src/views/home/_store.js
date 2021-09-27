import { getSongUrl, getSongDetail, getLyric } from "@/api";
const DEF_ANALYSER_FFSIZE = 2048;
const FEAD_SIZE = 0.8;
let audioContext, audio_context, audio, source, gain, analyser;
export default {
  state: {
    audio,
    audio_context,
    gain,
    play_list: {},
    current_url: "",
    current_id: "",
    current_state: "stop",
    current_duration: 0,
    current_progress: 0,
    current_mode: "loop",
    current_mode_options: ["loop", "order", "single", "random"]
  },
  mutations: {
    init_audio_context(state) {
      audioContext =
        AudioContext || window.AudioContext || window.webkitAudioContext;
      audio_context = new audioContext();
      audio = new Audio();
      audio.crossOrigin = "anonymous";
      source = audio_context.createMediaElementSource(audio);
      gain = audio_context.createGain();
      gain.gain.value = 1;
      analyser = audio_context.createAnalyser();
      analyser.fftSize = DEF_ANALYSER_FFSIZE;
      source.connect(gain);
      gain.connect(audio_context.destination);
      state.audio = audio;
      state.audio_context = audio_context;
      state.gain = gain;
    },
    update_play_list(state, payload) {
      state.play_list[payload.id] = payload;
      state.current_id = payload.id;
      state.current_url = payload.url;
    },
    update_current_id(state, payload) {
      state.current_id = payload;
    },
    update_song_detail(state, payload) {
      let song = state.play_list[payload.id];
      song = { ...song, ...payload };
      state.play_list[payload.id] = song;
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
      gain.gain.linearRampToValueAtTime(1, currentTime + FEAD_SIZE);
      audio.play();
      commit("update_current_state", "play");
    },
    pause({ commit }) {
      const currentTime = audio_context.currentTime;
      gain.gain.linearRampToValueAtTime(0, currentTime + FEAD_SIZE);
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
    async fetch_song_data({ commit, dispatch, state }, id) {
      if (!audio) commit("init_audio_context");
      dispatch("pause");
      let song;
      if (!state.play_list[id]) {
        const { data, code } = await getSongUrl({ id });
        if (code !== 200) return;
        let [music] = data;
        song = music;
      } else {
        song = state.play_list[id];
      }
      commit("update_play_list", song);
      const url = song.url.split("http").join("https");
      audio.src = url;
      audio.onloadedmetadata = async () => {
        dispatch("toggle_play");
        commit("update_current_duration", audio.duration);
        const is_detail = state.play_list[id]?.is_detail;
        if (is_detail) return;
        const responde_song_detail = await getSongDetail({ ids: id });
        responde_song_detail.id = id;
        responde_song_detail.is_detail = true;
        commit("update_song_detail", responde_song_detail);
        const responde_lyric_detail = await getLyric({ id });
        responde_lyric_detail.id = id;
        commit("update_song_detail", responde_lyric_detail);
      };
      audio.onended = () => {
        console.log("onended");
        audio.currentTime = 0;
        dispatch("pause");
      };
      audio.ontimeupdate = () => {
        commit("update_current_progress", audio.currentTime);
      };
      audio.onerror = error => {
        throw error;
      };
    }
  }
};
