<style lang="less" scoped>
.wapper {
  height: 100%;
  width: 100%;
  background-color: white;
  border-top: 1px solid #f5f5f5;
  z-index: 4;
  position: relative;
}
#progress {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  margin: 0 !important;
  padding: 0 !important;
}

#progress /deep/ .ant-slider-handle {
  border-color: var(--red);
  background-color: var(--red);
}
#progress /deep/ .ant-slider-track {
  height: 3px;
}
#progress /deep/ .ant-slider-rail {
  height: 3px;
}
.music {
  display: flex;
  justify-content: center;
  height: 100%;
  &-flex {
    display: flex;
    align-items: center;
    flex: 1;
  }
  &-info {
    justify-content: flex-start;
    margin-left: 1vw;
    &-img {
      height: 4vw;
      width: 4vw;
      border-radius: 5px;
    }
    &-base {
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      margin-left: 1vw;
      text-align: left;
      overflow: hidden;
      &-name {
        font-weight: bold;
      }
      &-auth {
        color: var(--textColor);
        font-size: 12px;
      }
      &-duration {
        color: var(--tipsColor);
        font-size: 12px;
      }
    }
  }
  &-control {
    justify-content: center;
  }
  &-panel {
    justify-content: flex-end;
  }
}
</style>

<template>
  <div class="wapper">
    <a-slider id="progress" v-model="progress" :defaultValue="0" :tooltipVisible="false" />
    <div class="music">
      <div class="music-flex music-info">
        <span>
          <img class="music-info-img" :src="img" alt />
        </span>
        <span class="music-info-base">
          <span>
            <span class="music-info-base-name">{{name}}</span>
            <span class="music-info-base-auth">&nbsp;-&nbsp;{{auth}}</span>
          </span>
          <span
            class="music-info-base-duration"
          >{{transformTimer(cursor)}}/{{transformTimer(duration)}}</span>
        </span>
      </div>
      <div class="music-flex music-control">
        <a-icon type="heart" />
        <a-icon type="step-backward" />
        <div @click="state==='playing'?pause:play">
          <a-icon type="caret-right" />
        </div>

        <a-icon type="step-forward" />
      </div>
      <div class="music-flex music-panel"></div>
    </div>
    <audio ref="player" :src="music"></audio>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { get_song_url } from '@/actions';
@Component
export default class HelloWorld extends Vue {
  get state() {
    return this.$store.state.music.state;
  }
  public progress = 0;
  public music = '';
  public img = '';
  public name = 'XXX';
  public auth = 'XXX';
  public player = {};
  public cursor = '0';
  public duration = '0';
  @Prop() private msg!: string;

  @Watch('$store.state.music.data', { deep: true })
  public async handleMusic({ id, image, name, auth }: any) {
    this.img = image;
    this.name = name;
    this.auth = auth;
    this.handlePlay(id);
  }

  public async handlePlay(id: any) {
    if (!id) { return; }
    const { code, data } = await get_song_url(id);
    if (code === 200) {
      const [music] = data;
      (this as any).player.src = music.url;
      // this.music = music.url;
      this.play();
    }
  }
  public play() {
    if (this.player) {
      const play = async () => {
        const duration = (this as any).player.duration;
        this.duration = duration;
        this.$store.commit('updata_music_duration', duration);
        this.$store.commit('updata_music_state', 'playing');
        (this as any).player.play();

        (this as any).player.ontimeupdate = () => {
          const cursor = (this as any).player.currentTime;
          this.cursor = cursor;
          this.progress = (cursor / duration) * 100;
        };
      };
      (this as any).player.addEventListener('loadeddata', play);
      (this as any).player.addEventListener('ended', this.stop);
      (this as any).player.addEventListener('error', (error: any) => {
        throw error;
      });
    }
  }
  public pause() {
    const { state } = this.$store.state.music;
    if (this.player) {
      if (state === 'playing') {
        (this as any).player.pause();
        this.$store.commit('updata_music_state', 'pause');
      }
    }
  }
  public stop() {
    const { state } = this.$store.state.music;
    if (this.player) {
      if (state !== 'stop') {
        (this as any).player.stop();
        this.$store.commit('updata_music_state', 'stop');
      }
    }
  }

  public mounted() {
    this.player = this.$refs.player;
    // localStorage.setItem("a", '123123123');
    // const a= localStorage.getItem('a');
  }
  public transformTimer(duration: any) {
    let result: any = 0;
    if (duration) {
      const min: any = `${Math.floor(duration / 60)}`;
      const sco: any = `${Math.floor(duration % 60)}`;
      result = `${min.padStart(2, '0')}:${sco.padStart(2, '0')}`;
    }

    return result;
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
</style>
