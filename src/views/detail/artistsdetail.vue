<template>
  <div class="wapper">
    <div v-if="artist?.cover" class="base-info">
      <Image
        animate="animate__fadeIn"
        v-if="artist?.cover"
        :src="artist?.cover || ''"
      />
      <div class="desc">
        <h1>{{ artist.name }}</h1>
        <div class="title">
          {{ artist?.identifyTag?.toString() }}
          {{ secondaryExpertIdentiy?.toString() }}
          {{ artist?.transNames?.toString() }}
        </div>
        <div class="con">
          <span>{{ artist.musicSize }} 首歌</span> ·
          <span>{{ artist.albumSize }} 张专辑</span> ·
          <span>{{ artist.mvSize }} 个 MV</span>
        </div>
        <div class="det">{{ artist.briefDesc }}</div>
        <br />
        <div>
          <Button icon-class="play">播放</Button>
        </div>
      </div>
    </div>
    <ul class="songs">
      <li
        class="track"
        @click="handle_play(it.id)"
        v-for="it in privileges"
        :key="it.id"
        :class="{ active: it.id === current_id }"
      >
        <div>
          <Image
            class="pic"
            animate="animate__fadeInUp"
            v-if="it?.al?.picUrl"
            :src="it?.al?.picUrl || ''"
          />
        </div>
        <div>
          <div class="title">
            <strong :title="it.name">{{ it.name }} </strong>
            <span
              :title="it?.alia?.toString() ? `(${it?.alia?.toString()})` : ''"
            >
              {{
                it?.alia?.toString() ? `(${it?.alia?.toString()})` : ""
              }}</span
            >
          </div>
          <div class="title ar" :title="artoString(it.ar)">
            {{ artoString(it.ar) }}
          </div>
        </div>
        <div class="publishTime">
          {{ dayjs(it.publishTime).format("YYYY年MM月DD日") }}
        </div>
        <div class="time">
          {{ to_time(it.dt) }}
        </div>
      </li>
    </ul>
  </div>
</template>
<script setup>
import { ref, watch, computed } from "vue";
import { useRoute } from "vue-router";
import { getArtistDetail } from "@/api";
import { artoString } from "@/utils";
import dayjs from "dayjs";
import Image from "@/components/Image";
import Button from "@/components/Button";
import { useStore } from "vuex";
const store = useStore();
const current_id = computed(() => store.state.sound.current_id);

const route = useRoute();
const artist = ref({});
const privileges = ref([]);
const secondaryExpertIdentiy = ref([]);

const init = () => {
  const id = route.params.id;
  getArtistDetail({ id }).then(response => {
    const {
      artist: artist_res,
      secondaryExpertIdentiy: secondaryExpertIdentiy_res
    } = response.data;
    artist.value = artist_res;
    secondaryExpertIdentiy.value = secondaryExpertIdentiy_res.map(
      it => it.expertIdentiyName
    );
    // const ids = playlist_res?.trackIds.map(it => it.id).toString();
    // getSongDetail({ ids }).then(({ songs }) => {
    //   privileges.value = songs;
    // });
  });
};
const to_time = value => {
  if (!value) return "";
  const m = `${Math.floor((value / 60) % 60)}`.padStart(2, "0"),
    s = `${Math.floor(value % 60)}`.padStart(2, "0");
  return `${m}:${s}`;
};
const handle_play = id => {
  store.dispatch("fetch_song_data", id);
};
watch(
  () => route.params.id,
  () => {
    init();
  },
  { immediate: true }
);
</script>
<style lang="scss" scoped>
.wapper {
  padding: 20px;
  .base-info {
    display: grid;
    grid-template-columns: 270px auto;
    margin-bottom: 40px;
    width: 100%;
    // background-color: #fff;
    border-radius: 0.75em;
    padding: 20px;
    box-sizing: border-box;
    // align-items: flex-end;
    img {
      height: 270px;
      width: 100%;
      border-radius: 0.75em;
      user-select: none;
      aspect-ratio: 1/1;
      border: 1px solid rgba(0, 0, 0, 0.04);
      filter: blur(16 px) opacity(0.6);
      transform: scale(0.92, 0.96);
      border-radius: 50%;
    }
    .desc {
      margin-left: 20px;
      flex: 1;
      align-self: center;
      h1 {
        font-weight: 56px;
        font-weight: 700;
      }
      .title {
        font-size: 18px;
        opacity: 0.88;
        margin-top: 24px;
      }
      .con {
        font-size: 14px;
        opacity: 0.68;
        margin-top: 2px;
      }
      .det {
        font-size: 14px;
        opacity: 0.68;
        margin-top: 24px;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 3;
        overflow: hidden;
        cursor: pointer;
      }
    }
  }
  .songs {
    border-radius: 0.75em;
    box-sizing: border-box;
    ul,
    li {
      padding: 0;
      margin: 0;
    }
    li {
      list-style-type: none;
      display: flex;
      align-items: center;
      padding: 8px;
      border-radius: 12px;
      user-select: none;
      .pic {
        border-radius: 8px;
        height: 46px;
        width: 46px;
        margin-right: 20px;
        border: 1px solid rgba(0, 0, 0, 0.04);
        cursor: pointer;
      }
      .pic:hover {
        filter: drop-shadow(100 200 0 black);
      }
      .title {
        width: 30vw;
        min-width: 30vw;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 1;
        overflow: hidden;
        font-size: 18px;
        span {
          color: #aeaeae;
          margin-left: 4px;
          font-weight: 600;
        }
      }
      .ar {
        font-size: 13px;
      }
      .publishTime {
        width: 25vw;
        text-align: center;
        font-size: 16px;
        opacity: 0.88;
      }
      .time {
        font-size: 16px;
        opacity: 0.88;
        text-align: right;
        flex: 1;
      }
    }
    .active {
      background-color: rgba(0, 0, 0, 0.04);
    }
    li:hover {
      background-color: rgba(0, 0, 0, 0.04);
    }

    li.focus {
      transition: all 0.3s;
      background: var(--color-secondary-bg);
    }
  }
}
</style>
