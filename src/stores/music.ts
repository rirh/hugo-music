
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
      switch (params) {
        case 'playing':
          audio.resume();
          // if (state.state === 'pause') { audio.resume(); }
          break;
        case 'pause':
          audio.suspend();

          // if (state.state === 'playing') { audio.suspend(); }
          break;
        case 'stop':
          // audio.stop();
          break;
        default:
          break;
      }
      state.state = params;
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
            audio = new Sound({ volume: state.vloume, url: music.url });
          }
          audio.set_url(music.url);
          audio.set_vloume(state.vloume);
          await audio.init();
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


class Sound {
  public DEF_ANALYSER_FFSIZE: string | number = 2048;
  public FADE_SEC: number = 0.8;

  private audio: any;
  private context: any;
  private source: any;
  private gain: any;
  private analyser: any;
  private filter: any;
  private url: any;
  private vloume: number | string = 1;
  private effectTimer: any;
  constructor(props: any = {}) {
    window.AudioContext = window.AudioContext || (window as any).webkitAudioContext;
    this.url = props.url;
    this.vloume = props.vloume;
  }
  public async init() {
    return new Promise(async (reslove, reject) => {
      this.context = new AudioContext();
      // this.audio = document.createElement('audio');
      if (this.audio) { this.stop(); this.audio = null; }
      this.audio = new Audio();
      this.audio.crossOrigin = 'anonymous';
      this.audio.src = this.url;
      this.audio.volume = 1;
      this.source = this.context.createMediaElementSource(this.audio);
      this.gain = this.context.createGain();
      this.gain.gain.value = this.vloume;
      this.analyser = this.context.createAnalyser();
      this.analyser.fftSize = this.DEF_ANALYSER_FFSIZE;
      this.source.connect(this.gain);
      this.gain.connect(this.context.destination);
      this.audio.oncanplay = () => {
        // 已经能够播放
        /**
         * TODO
         */
        if (this.url) {
          store.commit('update_music_state', 'playing');
          store.commit('update_music_cursor', this.audio.currentTime);
          store.commit('update_music_duration', this.audio.duration);
          reslove();
        }


      };
      this.audio.ontimeupdate = this.start_progress.bind(this);
      this.audio.onended = this.stop.bind(this);
    });
  }
  public set_url(url: string) {
    this.url = url;
  }
  public set_vloume(val: string) {
    this.vloume = val;
  }
  public start_progress() {
    store.commit('update_music_cursor', this.audio.currentTime);
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
    this.start_progress();
  }
  public stop() {
    this.audio.pause();
    // store.commit('update_music_state', 'stop');
  }
  public resume() {
    this.gain.gain.value = 0;
    this.audio.play();
    const currentTime: number = this.context.currentTime;
    this.gain.gain.linearRampToValueAtTime(this.vloume, currentTime + this.FADE_SEC);
  }
  public suspend() {
    const currentTime = this.context.currentTime;
    this.gain.gain.linearRampToValueAtTime(0, currentTime + this.FADE_SEC);
    setTimeout(() => {
      this.audio.pause();
    }, this.FADE_SEC * 800); // 延时
  }
  public disconnect() {
    this.gain.disconnect(0);
    this.analyser.disconnect(0);
  }
  // 设置音效
  public createSound() {
    /*
     * 标准 la 音为440hz， 高8音的频率为原音频的2倍
     * 音阶换算公式: n个半音 = 12 * log2(f1 / f2) (其中, f1 < f2时n < 0, 反之n > 0);
     * ->已知f2, 求f1, 其中 f1 小 f2 n个半音
     * ->则 f1 = f2 * Math.pow(2, -n / 12);
     */
    const i = Math.ceil(Math.random() * 10);
    const hz = 440;

    // create Oscillator node
    const oscillator = this.context.createOscillator();

    oscillator.frequency.value = hz * i; // value in hertz
    oscillator.connect(this.context.destination);
    oscillator.start();
    setTimeout(() => {
      oscillator.stop();
    }, 300);
  }

  public stereo(r: any) {
    this.disconnect();
    const panner = this.context.createPanner();
    const gain1 = this.context.createGain();

    let index = 0;
    const radius = r || 20;
    panner.setOrientation(0, 0, 0, 0, 1, 0);
    // 让声源绕着收听者以20的半径旋转
    this.effectTimer = setInterval(() => {
      panner.setPosition(Math.sin(index) * radius, 0, Math.cos(index) * radius);
      index += 1 / 100;
    }, 16);
    gain1.gain.value = 1;
    this.gain.connect(gain1);
    this.gain.connect(panner);
    panner.connect(this.analyser);
    this.analyser.connect(this.context.destination);
  }

  /*
 * 低通滤波器
 */
  public lowpassFilter(freq: any) {
    this.disconnect();
    const biquadFilter = this.context.createBiquadFilter();
    biquadFilter.type = 'lowpass'; // 低阶通过
    biquadFilter.Q.value = 2;
    biquadFilter.frequency.value = freq || 800; // 临界点的 Hz，默认800Hz
    this.gain.connect(biquadFilter);
    biquadFilter.connect(this.analyser);
    this.analyser.connect(this.context.destination);
  }
  /*
   * 高通滤波器
   */
  public highpassFilter(freq: any) {
    this.disconnect();
    const biquadFilter = this.context.createBiquadFilter();
    biquadFilter.type = 'highpass'; // 低阶通过
    biquadFilter.Q.value = 4;
    biquadFilter.frequency.value = freq || 800; // 临界点的 Hz，默认800Hz
    this.gain.connect(biquadFilter);
    biquadFilter.connect(this.analyser);
    this.analyser.connect(this.context.destination);
  }
  /*
  * 人声增益 -- perfect --
  */
  public enhanceVocal() {
    this.disconnect();
    const gain1 = this.context.createGain();
    const gain2 = this.context.createGain();
    const channelSplitter = this.context.createChannelSplitter(2);
    const channelMerger = this.context.createChannelMerger(2);

    gain1.gain.value = 2;
    gain2.gain.value = 2;

    this.gain.connect(channelSplitter);

    channelSplitter.connect(gain1, 0);
    gain1.connect(channelMerger, 0, 1);
    channelSplitter.connect(channelMerger, 1, 1);

    channelSplitter.connect(gain2, 1);
    gain2.connect(channelMerger, 0, 0);
    channelSplitter.connect(channelMerger, 0, 0);

    channelMerger.connect(this.analyser);
    this.analyser.connect(this.context.destination);
  }

  public removeVocal() {
    this.disconnect();
    const gain1 = this.context.createGain();
    const gain2 = this.context.createGain();
    const gain3 = this.context.createGain();
    const channelSplitter = this.context.createChannelSplitter(2);
    const channelMerger = this.context.createChannelMerger(2);

    // 反相音频组合
    gain1.gain.value = -1;
    gain2.gain.value = -1;

    this.gain.connect(this.analyser);
    this.analyser.connect(channelSplitter);

    // 交叉音轨，减去相同的音频部分（即人声）
    channelSplitter.connect(gain1, 0);
    gain1.connect(channelMerger, 0, 1);
    channelSplitter.connect(channelMerger, 1, 1);

    channelSplitter.connect(gain2, 1);
    gain2.connect(channelMerger, 0, 0);
    channelSplitter.connect(channelMerger, 0, 0);

    channelMerger.connect(gain3);
    gain3.connect(this.context.destination);
  }
  /*
  * 延时，回声效果
  */
  public delay() {
    this.disconnect();

    const delay = this.context.createDelay();
    const gain1 = this.context.createGain();

    delay.delayTime.value = 0.06; // 延时0.06s
    gain1.gain.value = 1.2;

    // 两条平行通路

    // 1.source -> destination
    this.gain.connect(this.context.destination);

    // 2.source -> delay -> gain -> destination
    this.gain.connect(delay);
    delay.connect(gain1);
    gain1.connect(this.analyser);
    this.analyser.connect(this.context.destination);
  }
  /*
       * 清除音效，还原原声
       */
  public cancelEffect() {
    this.disconnect();
    this.gain.connect(this.analyser);
    this.analyser.connect(this.context.destination);
  }
  /*
  *  左声道和右声道的分离并单独处理，最后合并，左耳低阶增强，右耳伴奏增强
  */
  public splitterMerger() {
    this.disconnect();
    const lGain = this.context.createGain();
    const rGain = this.context.createGain();
    // 声道离合器
    const splitter = this.context.createChannelSplitter(2);
    const merger = this.context.createChannelMerger(2);
    lGain.gain.value = 1;
    rGain.gain.value = 1;

    const leftFilter = this.context.createBiquadFilter();
    leftFilter.type = 'lowshelf';
    // leftFilter.Q.value = 2;
    leftFilter.gain.value = 10;
    leftFilter.frequency.value = 392;

    const rightFilter = this.context.createBiquadFilter();
    rightFilter.type = 'highshelf';
    // rightFilter.Q.value = 2;
    rightFilter.gain.value = 10;
    rightFilter.frequency.value = 82; // 临界点的 Hz，

    this.gain.connect(splitter);
    splitter.connect(lGain, 0);
    splitter.connect(rGain, 1);
    lGain.connect(leftFilter);
    rGain.connect(rightFilter);
    leftFilter.connect(merger, 0, 0);
    rightFilter.connect(merger, 0, 1);
    merger.connect(this.analyser);
    this.analyser.connect(this.context.destination);
  }




}



// class Music {
//   private context: any;
//   private source: any;
//   private gain: any;
//   private analyser: any;
//   private filter: any;
//   private url: any;
//   private vloume: number | string = 1;
//   constructor(props: any = {}) {
//     window.AudioContext = window.AudioContext || (window as any).webkitAudioContext;
//   }
//   public async init() {
//     return new Promise(async (reslove, reject) => {
//       this.context = new AudioContext();
//       const url = this.url;
//       const { data } = await axios({ method: 'GET', url, responseType: 'arraybuffer' });
//       const buffer = await this.context.decodeAudioData(data);
//       this.source = this.context.createBufferSource();
//       this.source.buffer = buffer;
//       this.gain = this.context.createGain();
//       this.gain.gain.value = 0.5;
//       this.analyser = this.context.createAnalyser();
//       this.analyser.fftSize = 2048;
//       this.filter = this.context.createBiquadFilter();
//       this.filter.type = 'allpass'; // 低通 滤波器 详情可以见 BiquadFilterNode的文档
//       this.source.connect(this.filter);
//       this.filter.connect(this.analyser);
//       this.analyser.connect(this.gain);
//       this.gain.connect(this.context.destination);
//       this.source.onended = this.onended;
//       this.context.onstatechange = this.onstatechange;
//       // 更新总时长数据
//       store.commit('update_music_duration', this.source.buffer.duration);
//       reslove();
//     });
//   }
//   public set_url(url: string) {
//     this.url = url;
//   }
//   public set_vloume(val: string) {
//     this.vloume = val;
//   }
//   public start_progress() {
//     const start = () => {
//       const { state, currentTime } = this.source.context;
//       // console.log(state, currentTime);
//       setTimeout(() => {
//         store.commit('update_music_cursor', currentTime);
//         if (state === 'running') { start(); }
//       }, 1000);
//     };
//     store.commit('update_music_cursor', this.source.context.currentTime);
//     start();
//   }
//   public set_gain(val: number) {
//     this.gain = val;
//     this.gain.gain.value = 0.5;
//   }
//   public start() {
//     this.gain.gain.value = 0;
//     this.source.start(0); // 开始播放
//     const vloume = this.vloume;
//     this.gain.gain.linearRampToValueAtTime(vloume, 5);
//   }
//   public onended() {
//     store.commit('update_music_state', 'stop');
//     this.stop();
//     // 下一首 如果有下一首就播放下一首 没有就列表循环
//     const current = (store as any).state.music.data;
//     const list = (store as any).state.music.list;
//     let index = list.findIndex((e: any) => e.id === current.id);
//     index = index + 1;
//     if (index > list.length - 1) {
//       index = 0;
//     }
//     if (list[index]) {
//       store.commit('update_music_data', list[index]);
//     }

//   }
//   public onstatechange() {
//     const key = this.source.context.state;
//     let state: any = null;
//     switch (key) {
//       case 'suspended':
//         state = 'pause';
//         break;
//       case 'running':
//         state = 'playing';
//         break;
//       default:
//         break;
//     }
//     if (state) { store.commit('update_music_state', state); }
//   }
//   public stop() {
//     this.source.stop();
//   }
//   public resume() {
//     this.context.resume();
//     // 同步播放器当前数据
//     this.start_progress();
//   }
//   public suspend() {
//     this.context.suspend();
//   }


// }
