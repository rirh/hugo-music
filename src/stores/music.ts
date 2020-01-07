
import { ipcRenderer } from 'electron';
import { SEND_STORE, OPEN_FLOAT } from '@/constant/ipc';
import axios from 'axios';
import { get_song_url, get_lyric } from '@/actions';
import store from '../store';
/**
 * 定义为全局数据控制器
 * 只要数据改变监听改变进行对应的操作
 */
let audio: any;
const music = {
  state: {
    music: '',
    duration: 0,
    cursor: 0,
    state: 'stop',
    mode: '',
    data: {},
    list: [],
    lyric: [],
    history: [],
    like: false,
    url: '',
    showPanel: false,
    ctx: null,
    vloume: 1,
  },


  mutations: {
    update_music_seek(state: any, value: any) {
      audio.seek(value);
    },
    update_like(state: any, params: any) {
      state.list = params;
    },
    update_lyric(state: any, params: any) {
      state.lyric = params;
    },
    update_show_panel(state: any, params: any) {
      state.showPanel = params;
    },
    async update_music_list(state: any, params: any) {
      const data = { ...state };
      data.show = false;
      ipcRenderer.send(OPEN_FLOAT, data);
      // state.player
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
    update_music_cursor(state: any, params: any) {
      state.cursor = params;
    },
    update_music_duration(state: any, params: any) {
      state.duration = params;
    },
    update_music_state(state: any, params: any) {
      state.state = params;
      switch (state.state) {
        case 'playing':
          audio.resume();
          break;
        case 'pause':
          audio.suspend();
          break;
        case 'stop':
          audio.stop();
          break;
        default:
          break;
      }
    },
    async  update_music_data(state: any, params: any) {
      if (params.id !== state.data.id) {
        state.data = params;
        const [musics, lyrics] = await axios.all(
          [
            get_song_url(params.id),
            get_lyric(params.id),
          ]);
        if (musics.code === 200) {
          const [music] = musics.data;
          if (!audio || !audio.init) {
            audio = new Music({ url: music.url, vloume: 1 });
            await audio.init(music.url);
            audio.start();
          } else {
            audio.stop();
            await audio.init(music.url);
            audio.start();
          }
          store.commit('update_music_list', params);
        }
        if (lyrics.code === 200) {
          store.commit('update_lyric', lyrics);
        }
      }
    },
  },
};

export default music;

class Music {
  public context: any;
  public source: any;
  public gain: any;
  public analyser: any;
  public filter: any;
  public url: any;
  public vloume: number | string = 1;
  constructor(props: any) {
    window.AudioContext = window.AudioContext || (window as any).webkitAudioContext;
    this.url = props.url;
    this.vloume = props.vloume;
    // this.init(this.url);
  }

  public async init(url: any) {
    return new Promise(async (reslove, reject) => {
      this.context = new AudioContext();
      const { data } = await axios({ method: 'GET', url, responseType: 'arraybuffer' });
      const buffer = await this.context.decodeAudioData(data);
      this.source = this.context.createBufferSource();
      this.source.buffer = buffer;
      this.gain = this.context.createGain();
      this.gain.gain.value = this.vloume;
      this.analyser = this.context.createAnalyser();
      this.analyser.fftSize = 2048;
      this.filter = this.context.createBiquadFilter();
      this.filter.type = 'allpass'; // 低通 滤波器 详情可以见 BiquadFilterNode的文档
      this.source.connect(this.filter);
      this.filter.connect(this.analyser);
      this.analyser.connect(this.gain);
      this.gain.connect(this.context.destination);
      this.source.onended = this.onended;
      this.context.onstatechange = this.onstatechange;
      // 更新总时长数据
      store.commit('update_music_duration', this.source.buffer.duration);
      reslove();
    });

  }
  public async seek(value: any) {
    const len = this.source.buffer.duration;
    const playtime = (value * len / 100);
    this.stop();
    await this.init(this.url);
    this.source.start(0, playtime);
  }
  public async_cursor() {
    const start = () => {
      const { state, currentTime } = this.source.context;
      // console.log(state, currentTime);
      setTimeout(() => {
        store.commit('update_music_cursor', currentTime);
        if (state === 'running') { start(); }
      }, 1000);

    };

    store.commit('update_music_cursor', this.source.context.currentTime);
    start();

  }
  public set_gain(val: number) {
    // this.gain = val;
    this.gain.gain.value = val;
  }
  public start() {
    this.gain.gain.value = 0;
    this.source.start(0); // 开始播放
    const vloume = this.vloume;
    this.gain.gain.linearRampToValueAtTime(vloume, 5);
    this.async_cursor();
  }
  public onended() {
    store.commit('update_music_state', 'stop');
  }
  public onstatechange() {
    const key = this.source.context.state;
    let state: any = null;
    switch (key) {
      case 'suspended':
        state = 'pause';
        break;
      case 'running':
        state = 'playing';
        break;
      default:
        break;
    }
    if (state) { store.commit('update_music_state', state); }
  }
  public stop() {
    this.source.stop();
  }
  public resume() {
    this.context.resume();
    // 同步播放器当前数据
    this.async_cursor();
  }
  public suspend() {
    this.context.suspend();
  }


}
