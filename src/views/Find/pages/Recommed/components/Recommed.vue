<style lang="less" scoped>
.recommed {
  padding: 1vw;
  &-tips {
    text-align: left;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin-left: 1vw;
    &-icon {
      font-size: 24px;
    }
  }
  &-recommed {
    padding: 4vw;
    width: 100%;
    &-lists {
      margin-top: 10px;
      display: flex;
      width: 100%;
      flex-wrap: wrap;
    }
    &-list {
      flex: 1;
      cursor: pointer;

      &-main {
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
      }
      &-playcount {
        position: absolute;
        right: 1.4vw;
        top: 0;
        color: white;
        z-index: 1;
        &-logo {
          font-size: 14px;
        }
        &-count {
          font-weight: 500;
          font-size: 12px;
        }
      }
      &-img {
        border-radius: 5px;
        height: 20vh;
        width: 14vw;
        overflow: hidden;
        object-fit: cover;
        position: relative;
        filter: brightness(80%);
        &-play {
          position: absolute;
          right: 2.2vw;
          bottom: -1vw;
          color: var(--red);
          background: rgba(255, 255, 255, 0.6);
          transform: translate(50%, -50%);
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          font-size: 25px;
          padding: 0.4vw;
          opacity: 0;
          transition: opacity 0.3s;
        }
      }
      &-name {
        font-size: 13px;
        text-align: left;
        padding: 0.5vw 0;
        // word-break: break-all;
        width: 14vw;
        color: #333;
        font-weight: 450;
      }
    }
  }
}
.recommed-recommed-list:hover .recommed-recommed-list-img-play {
  opacity: 1;
}
.recommed-recommed-list:hover .recommed-recommed-list-img {
  filter: brightness(95%);
}
</style>

<template>
  <a-skeleton :loading="loadingRecommed" active>
    <div class="recommed">
      <div class="recommed-recommed">
        <h3 class="recommed-tips" @click="$router.push({path:'/find/music'})">
          推荐歌单
          <AIconfont class="recommed-tips-icon" type="icon-right" />
        </h3>
        <div type="flex" class="recommed-recommed-lists">
          <!-- <div
            class="recommed-recommed-list"           
          >
            <div class="recommed-recommed-list-main">
              <span class="recommed-recommed-list-playcount">
                <AIconfont class="recommed-recommed-list-playcount-logo" type="icon-up1-copy" />
                <span
                  class="recommed-recommed-list-playcount-count"
                >{{transformW(123123)}}</span>
              </span>
              <img class="recommed-recommed-list-img" src="recommed.picUrl" alt />
              <div class="recommed-recommed-list-name">asdf</div>
            </div>
          </div>-->
          <div
            class="recommed-recommed-list"
            v-for="(recommed,index) in data.slice(0,10)"
            :key="index"
          >
            <div @click="handleDetail(recommed)" class="recommed-recommed-list-main">
              <span class="recommed-recommed-list-playcount">
                <AIconfont class="recommed-recommed-list-playcount-logo" type="icon-up1-copy" />
                <span
                  class="recommed-recommed-list-playcount-count"
                >{{transformW(recommed.playCount)}}</span>
              </span>
              <span class="recommed-recommed-list-img">
                <a-avatar
                  class="recommed-recommed-list-img"
                  :onerror="errorImg"
                  :src="recommed.picUrl"
                  alt
                />
                <span class="recommed-recommed-list-img-play">
                  <AIconfont @click.stop="handleRandomPlay(recommed)" type="icon-up1-copy" />
                </span>
              </span>

              <div class="recommed-recommed-list-name">{{recommed.name}}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </a-skeleton>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch, Emit } from 'vue-property-decorator';
import { get_play_list_detail, get_play_song_detail } from '@/actions';
import { ERROR_IMG } from '@/constant/api';

@Component({})
export default class Home extends Vue {
  public loadingRecommed = true;
  public errorImg = ERROR_IMG;

  @Prop() private data!: any;
  @Watch('data')
  public handleChange(arg: any) {
    if (arg.length > 0) {
      this.loadingRecommed = false;
    }
  }
  public handleDetail(item: any) {
    this.$router.push({
      path: '/music-detail',
      query: { ...item },
    });
  }
  public async handleRandomPlay(list: any) {
    this.$store.commit('update_music_loading', true);
    const { playlist, privileges } = await get_play_list_detail(
      `id=${list.id}`,
    );
    const ids = privileges.map(({ id }: any) => id);
    const { songs } = await get_play_song_detail(`ids=${ids.toString()}`);
    const current: any = Math.floor(Math.random() * songs.length - 1);
    const item = songs[current];
    const params = {
      id: item.id,
      name: item.name,
      auth: item.ar
        .map((e: any) => e.name)
        .toString()
        .split(',')
        .join('/'),
      image: item.al.picUrl,
      duration: item.dt,
    };
    this.$store.commit('update_music_loading', false);

    (this as any).$store.commit('update_music_data', params);
  }

  /**
   * 转化为万做单位函数
   */
  public transformW(args: any) {
    let result: any = 0;
    const batter = 10000;
    const cursor = Number(args);
    if (!isNaN(cursor)) {
      if (cursor > batter) {
        const value = Math.floor(cursor / batter);
        result = `${value}万`;
      } else {
        result = cursor;
      }
    }
    return result;
  }
}
</script>
