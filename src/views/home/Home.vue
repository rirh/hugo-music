<template>
  <div class="container">
    <h1 v-show="daily.coverImgUrl">For You</h1>
    <div class="box fr-2">
      <DailyTracksCard
        v-show="daily.coverImgUrl"
        :url="daily.coverImgUrl"
        @on-play="handle_play_daily()"
      />
      <FMDailyTracksCard
        v-show="fm_daily?.al?.picUrl"
        :url="fm_daily?.al?.picUrl"
        :name="fm_daily.name"
        :desc="artoString(fm_daily?.ar, 'name')"
        @on-play="handle_play_fm"
        @on-next="handle_next_fm"
      />
    </div>
    <h1>Top List</h1>
    <div class="box fr-5">
      <div v-for="(item, index) in top_list" :key="index">
        <albums
          :image="item.coverImgUrl"
          :name="item.name"
          :desc="item.updateFrequency"
        />
      </div>
    </div>
    <h1>New Songs</h1>
    <div class="song fr-2">
      <div v-for="(item, index) in new_song_list" :key="index">
        <songs
          :image="item.picUrl"
          :name="item.name"
          :id="item.id"
          :desc="artoString(item?.song?.artists, 'name')"
          @click="handle_play(item.id)"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useStore } from "vuex";
import DailyTracksCard from "./DailyTracksCard.vue";
import FMDailyTracksCard from "./FMDailyTracksCard.vue";
import {
  getPersonalizedNewsong,
  getTopList,
  getHighQuality,
  getPlayListDetail,
  getSongDetail
} from "@/api";
import { artoString } from "@/utils";

import songs from "@/components/Songs.vue";
import albums from "@/components/Albums.vue";
// import artists from "@/components/Artists.vue";
// import playlists from "@/components/Playlists.vue";
// import userprofiles from "@/components/Userprofiles.vue";
// import mvs from "@/components/Mvs.vue";
// import djRadios from "@/components/DjRadios.vue";
// import videos from "@/components/Videos.vue";

const store = useStore();
const top_list = ref([]);
const new_song_list = ref([]);
const quality_song_list = ref([]);
const daily = ref([]);
const fm_daily = ref({});

const RandomNum = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min;
onMounted(() => {
  getTopList().then(response => {
    const emun = ["热歌榜", "飙升榜", "新歌榜", "原创榜", "云音乐欧美热歌榜"];
    top_list.value = emun.map(it =>
      response.list.find(song => song.name === it)
    );
  });
  getPersonalizedNewsong().then(response => {
    new_song_list.value = response.result;
  });
  getHighQuality().then(async response => {
    const { playlists } = response;
    quality_song_list.value = playlists;
    const num = RandomNum(1, playlists.length - 1);
    daily.value = playlists[num];
    toggle_play_list();
  });
});
const handle_play_daily = async () => {
  const { playlist } = await getPlayListDetail({ id: daily.value.id });
  const num = RandomNum(1, playlist.trackIds.length - 1);
  const { id } = playlist.trackIds[num];
  handle_play(id);
};
const handle_play_fm = () => {
  handle_play(fm_daily.value.id);
};
const handle_next_fm = async () => {
  await toggle_play_list();
  handle_play_fm();
};
const toggle_play_list = async () => {
  const fm_num = RandomNum(1, quality_song_list.value.length - 1);
  const fm_daily_temp = quality_song_list.value[fm_num];
  const song = await fetch_list_detail(fm_daily_temp.id);
  fm_daily.value = {};
  fm_daily.value = song;
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
  store.dispatch("fetch_song_data", id);
};
</script>

<style lang="scss" scoped>
.container {
  padding: 20px;

  .box {
    display: grid;
    gap: 44px 24px;
  }
  .fr-2 {
    grid-template-columns: repeat(2, 1fr);
  }
  .fr-5 {
    grid-template-columns: repeat(5, 1fr);
  }
}
.song {
  display: grid;
  gap: 0px 24px;
}
</style>
