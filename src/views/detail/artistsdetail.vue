<template>
  <Skeleton
    style="margin:3%"
    v-if="loading"
    width="74%"
    height="70vh"
    animated
    bg="transparent"
  />
  <div v-else class="artistsdetail">
    <DescHeader
      :image="artist?.cover"
      :name="artist?.name"
      shape="round"
      :description="artist?.briefDesc"
    >
      <template v-slot:tracks>
        <div>
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
        </div>
      </template>
      <template v-slot:action>
        <br />
        <div class="action">
          <Button
            v-if="Boolean(songslist[0]?.id)"
            @click="handle_play"
            icon-class="play"
            >播放</Button
          >&nbsp;
          <!-- <Button
            shape="round"
            v-if="Boolean(songslist[0]?.id)"
            @click="handle_play"
            icon-class="plus"
            class="play-button"
          ></Button> -->
        </div>
      </template>
    </DescHeader>
    <h1>热门</h1>
    <div class="box fr-3" style="gap: 2px 0px;">
      <songs
        v-for="it in songslist"
        :key="it.id"
        :image="it?.al?.picUrl"
        :name="it.name"
        :id="it.id"
        :desc="it?.ar"
      />
    </div>
    <h1>专辑</h1>
    <div class="box fr-5">
      <albums
        v-for="it in albumslist"
        :key="it.id"
        :image="it.picUrl"
        :name="it.name"
        :desc="it.artists"
        :id="it.id"
      />
    </div>
    <h1>mv</h1>
    <div class="box fr-4">
      <mvs
        v-for="it in mvslist"
        :key="it.id"
        :image="it.imgurl"
        :name="it.name"
        :desc="it.artistName || it.imgurl16v9"
        :id="it.id"
        @on-play="handle_show_video"
      />
    </div>
  </div>
  <transition
    enter-active-class="animate__animated animate__fadeIn"
    leave-active-class="animate__animated animate__fadeOut"
  >
    <ModalWithVideo
      :open="videoData.open"
      :url="videoData.url"
      @on-close="handle_close_video"
    />
  </transition>
</template>
<script setup>
import { ref, watch, reactive } from "vue";
import { useRoute } from "vue-router";
import {
  getArtistDetail,
  getArtistTopSong,
  getArtistAlbum,
  getArtistMv
} from "@/api";
import DescHeader from "@/components/DescHeader";
import songs from "@/components/Songs.vue";
import albums from "@/components/Albums.vue";
import mvs from "@/components/Mvs.vue";
import Button from "@/components/Button";
import Skeleton from "@/components/Skleleton";
import ModalWithVideo from "@/components/ModalWithVideo";

import { useStore } from "vuex";
const store = useStore();

const route = useRoute();
const artist = ref({});
const secondaryExpertIdentiy = ref([]);
const songslist = ref([]);
const albumslist = ref([]);
const mvslist = ref([]);
const loading = ref(true);
const videoData = reactive({
  open: false,
  url: ""
});
const init = () => {
  loading.value = true;
  const id = route.params.id;
  Promise.all([
    getArtistDetail({ id }),
    getArtistTopSong({ id }),
    getArtistAlbum({ id, limit: 10 }),
    getArtistMv({ id })
  ])
    .then(response => {
      loading.value = false;
      const [artistDetail, songs, albums, mvs] = response;
      const {
        artist: artist_res,
        secondaryExpertIdentiy: secondaryExpertIdentiy_res
      } = artistDetail.data;
      artist.value = artist_res;
      secondaryExpertIdentiy.value = secondaryExpertIdentiy_res.map(
        it => it.expertIdentiyName
      );
      songslist.value = songs.songs;
      albumslist.value = albums.hotAlbums;
      mvslist.value = mvs.mvs;
    })
    .catch(() => {
      loading.value = false;
    });
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
const handle_close_video = () => {
  videoData.open = false;
};
const handle_show_video = url => {
  console.log(url);
  if (url) {
    videoData.open = true;
    videoData.url = url;
  }
};
</script>
<style lang="scss" scoped>
.artistsdetail {
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
