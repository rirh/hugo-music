<template>
  <div>
    <Skeleton
      style="margin:3%"
      v-show="loading"
      width="74%"
      height="80vh"
      animated
      bg="transparent"
    />
    <div v-show="!loading" class="container">
      <h1 v-show="daily.coverImgUrl">浏览</h1>
      <div class="recommand box fr-2">
        <DailyTracksCard
          v-show="daily.coverImgUrl"
          :url="daily.coverImgUrl"
          :loading="loading_daily"
          @on-play="handle_play_daily()"
        />
        <FMDailyTracksCard
          v-show="fm_daily.url"
          :url="fm_daily.url"
          :name="fm_daily.name"
          :desc="fm_daily.desc"
          :nextloading="loading_fm_next"
          :playloading="loading_fm_play"
          @on-play="handle_play_fm"
          @on-next="handle_next_fm"
        />
      </div>
      <h1>最新推出</h1>
      <div class="song fr-2 ">
        <div v-for="(it, index) in new_song_list" :key="index">
          <songs
            :image="it.picUrl"
            :name="it.name"
            :id="it.id"
            :desc="it?.song?.artists"
          />
        </div>
      </div>
      <h1>排行榜</h1>
      <div class="box fr-3 ">
        <div class="card" v-for="(it, index) in top_list" :key="index">
          <playlists
            :name="it.name"
            :oldesc="it.updateFrequency"
            :count="formatCount(it.playCount)"
            :id="it.id"
          />
          <!-- <div v-for="(songs, index) in top_list_songs" :key="index"> -->
          <br />
          <songs
            v-for="(it, rank) in top_list_songs[index]"
            :key="it?.id"
            :image="it?.al?.picUrl"
            :name="it?.al?.name"
            :id="it?.id"
            :desc="it?.ar"
            :index="rank + 1"
            notShowHover
          />
          <!-- </div> -->
        </div>
      </div>

      <h1>热门歌手</h1>
      <div class="song fr-6">
        <div v-for="(it, index) in aritsts_list" :key="index">
          <artists :image="it.picUrl" :name="it.name" :id="it.id" />
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { onMounted, ref } from "vue";
import { useStore } from "vuex";
import DailyTracksCard from "./DailyTracksCard";
import FMDailyTracksCard from "./FMDailyTracksCard";
import {
  getPersonalizedNewsong,
  getTopList,
  getHighQuality,
  getPlayListDetail,
  getSongDetail,
  getTopArtists
} from "@/api";
import { formatCount } from "@/utils";

import Skeleton from "@/components/Skleleton";
import songs from "@/components/Songs";
// import albums from "@/components/Albums";
import artists from "@/components/Artists";

import playlists from "@/components/Playlists";
// import userprofiles from "@/components/Userprofiles";
// import mvs from "@/components/Mvs";
// import djRadios from "@/components/DjRadios";
// import videos from "@/components/Videos";

const store = useStore();

const top_list = ref([]);
const top_list_songs = ref([]);
const new_song_list = ref([]);
const quality_song_list = ref([]);
const aritsts_list = ref([]);

const daily = ref([]);
const fm_daily = ref({});
const loading = ref(true);
const loading_daily = ref(false);
const loading_fm_play = ref(false);
const loading_fm_next = ref(false);

const RandomNum = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min;
onMounted(() => {
  init();
});
const init = () => {
  loading.value = true;
  Promise.all([
    getTopList(),
    getPersonalizedNewsong(),
    getHighQuality(),
    getTopArtists()
  ])
    .then(
      ([response_hot, response_song, response_quality, response_aritsts]) => {
        loading.value = false;
        const emun = [
          "新歌榜",
          "飙升榜",
          "热歌榜",
          "网络热歌榜",
          "美国Billboard榜",
          "原创榜"
        ];
        top_list.value = emun.map(it =>
          response_hot.list.find(song => song.name === it)
        );
        new_song_list.value = response_song.result;
        const { playlists } = response_quality;
        quality_song_list.value = playlists;
        const num = RandomNum(1, playlists.length - 1);
        daily.value = playlists[num];
        toggle_play_list();
        const start = RandomNum(6, response_aritsts.artists.length - 7);
        aritsts_list.value = response_aritsts.artists.slice(start, start + 6);
        fetch_top_song();
      }
    )
    .catch(error => {
      loading.value = false;
      throw error;
    });
};
const fetch_top_song = () => {
  const fetch_all_desc_arr = top_list.value.map(it =>
    getPlayListDetail({ id: it.id })
  );
  Promise.all(fetch_all_desc_arr)
    .then(async response => {
      const songs = response.map(it => {
        return it?.playlist?.tracks?.slice(0, 10);
      });
      top_list_songs.value = songs;
    })
    .catch(error => {
      throw error;
    });
};
const handle_play_daily = async () => {
  loading_daily.value = true;
  const { playlist } = await getPlayListDetail({ id: daily.value.id });
  if (!playlist.trackIds) return;
  const num = RandomNum(1, playlist.trackIds.length - 1);
  const { id } = playlist.trackIds[num];
  handle_play(id);
};
const handle_play_fm = () => {
  loading_fm_play.value = true;
  handle_play(fm_daily.value.id);
};
const handle_next_fm = async () => {
  loading_fm_next.value = true;
  await toggle_play_list();
  handle_play(fm_daily.value.id);
};
const toggle_play_list = async () => {
  const fm_num = RandomNum(1, quality_song_list.value.length - 1);
  const fm_daily_temp = quality_song_list.value[fm_num];
  const song = await fetch_list_detail(fm_daily_temp.id);
  const url = song?.al?.picUrl;
  const name = song.name;
  const id = song.id;
  const desc = song?.ar;
  fm_daily.value = {
    url,
    name,
    desc,
    id
  };
};
const fetch_list_detail = async id => {
  let result = {};
  const { playlist } = await getPlayListDetail({ id });
  const num = RandomNum(1, playlist.trackIds.length - 1);
  const { id: ids } = playlist.trackIds[num];
  const { songs } = await getSongDetail({ ids });
  [result] = songs;
  return result;
};
const handle_play = id => {
  store
    .dispatch("fetch_song_data", id)
    .then(() => {
      loading_daily.value = false;
      loading_fm_play.value = false;
      loading_fm_next.value = false;
    })
    .catch(() => {
      loading_daily.value = false;
      loading_fm_play.value = false;
      loading_fm_next.value = false;
    });
};
</script>

<style lang="scss" scoped>
.container {
  padding: 3em;
  h1 {
    margin-top: 50px;
  }

  .recommand {
    gap: 50px 40px;
  }
}
.card {
  background: var(--color-secondary);
  border: 1px solid var(--color-secondary);
  border-radius: 10px;
  box-shadow: rgb(0 0 0 / 2%) 0px 0px 7px 6px;
  padding: 10px;
  overflow: hidden;
}
.song {
  display: grid;
  gap: 0px 24px;
}
</style>
