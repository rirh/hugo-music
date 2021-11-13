import { getSongUrl, getSongDetail, getLyric } from "@/api";

const DEF_ANALYSER_FFSIZE = 2048;
const FEAD_SIZE = 0.8;
let audioContext, audio_context, audio, source, gain, analyser, stereoInterval;

export default {
  namespace: true,
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
    current_mode_options: ["loop", "single", "random"],
    dashboard_open: false
  },
  mutations: {
    update_current_mode(state, payload) {
      state.current_mode = payload;
    },
    update_dashboard_open(state, payload) {
      state.dashboard_open = payload;
    },
    init_audio_context(state) {
      audioContext =
        window.AudioContext || // Default
        window.webkitAudioContext || // Safari and old versions of Chrome
        false;
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
    play_tips() {},
    /**
     * 左耳机伴奏增强 右边声道增强 合并以后再挣钱
     *
     */
    splitterMerger({ dispatch }) {
      dispatch("disconnect");
      const context = audio_context;
      const lGain = context.createGain();
      const rGain = context.createGain();
      // 声道离合器
      const splitter = context.createChannelSplitter(2);
      const merger = context.createChannelMerger(2);
      lGain.gain.value = 1;
      rGain.gain.value = 1;

      const leftFilter = context.createBiquadFilter();
      leftFilter.type = "lowshelf";
      // leftFilter.Q.value = 2;
      leftFilter.gain.value = 10;
      leftFilter.frequency.value = 392;

      const rightFilter = context.createBiquadFilter();
      rightFilter.type = "highshelf";
      // rightFilter.Q.value = 2;
      rightFilter.gain.value = 10;
      rightFilter.frequency.value = 82; // 临界点的 Hz，

      gain.connect(splitter);
      splitter.connect(lGain, 0);
      splitter.connect(rGain, 1);
      lGain.connect(leftFilter);
      rGain.connect(rightFilter);
      leftFilter.connect(merger, 0, 0);
      rightFilter.connect(merger, 0, 1);
      merger.connect(analyser);
      analyser.connect(context.destination);
    },
    removeVocal({ dispatch }) {
      dispatch("disconnect");
      const context = audio_context;
      const gain1 = context.createGain();
      const gain2 = context.createGain();
      const gain3 = context.createGain();
      const channelSplitter = context.createChannelSplitter(2);
      const channelMerger = context.createChannelMerger(2);

      // 反相音频组合
      gain1.gain.value = -1;
      gain2.gain.value = -1;

      gain.connect(analyser);
      analyser.connect(channelSplitter);

      // 交叉音轨，减去相同的音频部分（即人声）
      channelSplitter.connect(gain1, 0);
      gain1.connect(channelMerger, 0, 1);
      channelSplitter.connect(channelMerger, 1, 1);

      channelSplitter.connect(gain2, 1);
      gain2.connect(channelMerger, 0, 0);
      channelSplitter.connect(channelMerger, 0, 0);

      channelMerger.connect(gain3);
      gain3.connect(context.destination);
    },
    delay({ dispatch }) {
      dispatch("disconnect");
      const context = audio_context;

      const delay = context.createDelay();
      const gain1 = context.createGain();

      delay.delayTime.value = 0.06; // 延时0.06s
      gain1.gain.value = 1.2;

      // 两条平行通路

      // 1.source -> destination
      gain.connect(context.destination);

      // 2.source -> delay -> gain -> destination
      gain.connect(delay);
      delay.connect(gain1);
      gain1.connect(analyser);
      analyser.connect(context.destination);
    },
    highpassFilter({ dispatch }, freq) {
      dispatch("disconnect");
      const context = audio_context;
      const biquadFilter = context.createBiquadFilter();
      biquadFilter.type = "highpass"; // 低阶通过
      biquadFilter.Q.value = 4;
      biquadFilter.frequency.value = freq || 800; // 临界点的 Hz，默认800Hz
      gain.connect(biquadFilter);
      biquadFilter.connect(analyser);
      analyser.connect(context.destination);
    },
    lowpassFilter({ dispatch }, freq) {
      dispatch("disconnect");
      const context = audio_context;
      const biquadFilter = context.createBiquadFilter();
      biquadFilter.type = "lowpass"; // 低阶通过
      biquadFilter.Q.value = 2;
      biquadFilter.frequency.value = freq || 800; // 临界点的 Hz，默认800Hz
      gain.connect(biquadFilter);
      biquadFilter.connect(analyser);
      analyser.connect(context.destination);
    },
    stereo({ dispatch }, r) {
      dispatch("disconnect");
      const context = audio_context;
      const panner = context.createPanner();
      const gain1 = context.createGain();

      let index = 0;
      const radius = r || 20;
      panner.setOrientation(0, 0, 0, 0, 1, 0);
      // 让声源绕着收听者以20的半径旋转
      if (stereoInterval) clearInterval(stereoInterval);
      stereoInterval = setInterval(() => {
        panner.setPosition(
          Math.sin(index) * radius,
          0,
          Math.cos(index) * radius
        );
        index += 1 / 100;
      }, 16);
      gain1.gain.value = 100;
      gain.connect(gain1);
      gain.connect(panner);
      panner.connect(analyser);
      analyser.connect(context.destination);
    },
    enhanceVocal({ dispatch }) {
      dispatch("disconnect");
      const context = audio_context;
      const gain1 = context.createGain();
      const gain2 = context.createGain();
      const channelSplitter = context.createChannelSplitter(2);
      const channelMerger = context.createChannelMerger(2);

      gain1.gain.value = 2;
      gain2.gain.value = 2;

      gain.connect(channelSplitter);

      channelSplitter.connect(gain1, 0);
      gain1.connect(channelMerger, 0, 1);
      channelSplitter.connect(channelMerger, 1, 1);

      channelSplitter.connect(gain2, 1);
      gain2.connect(channelMerger, 0, 0);
      channelSplitter.connect(channelMerger, 0, 0);

      channelMerger.connect(analyser);
      analyser.connect(context.destination);
    },
    disconnect() {
      gain.disconnect(0);
      analyser.disconnect(0);
    },
    // 取消音效
    cancelEffect({ dispatch }) {
      dispatch("disconnect");
      const context = audio_context;
      gain.connect(analyser);
      analyser.connect(context.destination);
    },
    seek(_, len) {
      audio.currentTime = len;
    },
    play({ commit }) {
      gain.gain.value = 0;
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
    next({ dispatch, state }) {
      const list = Object.keys(state.play_list);
      const id = state.current_id;
      const randomNum = (min, max) =>
        Math.floor(Math.random() * (max - min + 1)) + min;
      const mode_func = {
        single: () => {
          dispatch("fetch_song_data", state.current_id);
        },
        loop: () => {
          const index = list.findIndex(it => Number(it) === id);
          const next_id = list[index + 1] || list[0];
          dispatch("fetch_song_data", next_id);
        },
        random: () => {
          const num = randomNum(0, list.length);
          const random_id = list[num];
          dispatch("fetch_song_data", random_id);
        }
      };
      if (mode_func[state.current_mode]) {
        mode_func[state.current_mode]();
      } else {
        dispatch("pause");
      }
    },
    fetch_song_data({ commit, dispatch, state }, id) {
      return new Promise((resolve, reject) => {
        if (!audio) commit("init_audio_context");
        dispatch("pause");
        const fetch_detail = play_list => {
          return new Promise((res, err) => {
            if (!play_list[id]) {
              Promise.all([
                getSongUrl({ id }),
                getSongDetail({ ids: id }),
                getLyric({ id })
              ])
                .then(([{ data, code }, detail, lyric]) => {
                  if (code !== 200) reject();
                  if (!data[0].url) reject();
                  const url = data[0]?.url?.split("http").join("https");
                  const music = { ...data[0], ...detail, ...lyric, url };
                  commit("update_play_list", music);
                  res(music);
                })
                .catch(error => err(error));
            } else {
              res(play_list[id]);
            }
          });
        };

        fetch_detail(state.play_list)
          .then(music => {
            commit("update_current_id", music.id);
            audio.src = music.url;
            audio.onloadedmetadata = async () => {
              if (audio.pause) dispatch("play");
              commit("update_current_duration", audio.duration);
              resolve();
            };
            audio.onended = () => {
              audio.currentTime = 0;
              dispatch("next");
            };
            audio.ontimeupdate = () => {
              commit("update_current_progress", audio.currentTime);
            };
            audio.onerror = error => {
              reject(error);
            };
          })
          .catch(() => {
            reject();
          });
      });
    }
  }
};
