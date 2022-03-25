<template>
  <Skeleton
    style="margin: 3%"
    v-if="loading"
    width="74%"
    height="70vh"
    animated
    bg="transparent"
  />
  <div class="albumsdetail" v-else>
    <DescHeader
      :image="playlist?.picUrl"
      :name="playlist?.name"
      :description="playlist?.description"
    >
      <template v-slot:tracks>
        <div>
          <div class="">
            <Link
              class="link"
              :to="`/artists/${it.id}`"
              v-for="it in playlist.artists"
              :key="it.id"
            >
              <strong>{{ it.name }}</strong>
            </Link>

            {{
              `发布于${dayjs(playlist?.publishTime).format("YYYY年MM月DD日")}`
            }}
            ·
            <span @click="handle_to_song">{{ `${playlist?.size}首音乐` }}</span>
          </div>
          <div class="count">
            {{ !playlist.onSale && "不" }}提供售卖
            <span class="link">
              {{ playlist.company && ` · ${playlist?.company}` }}
            </span>

            <span class="link">
              {{ playlist.subType && ` · ${playlist?.subType}` }}
            </span>
          </div>
        </div>
      </template>
      <template v-slot:action>
        <br />
        <div class="action">
          <Button
            v-if="Boolean(privileges[0]?.id)"
            @click="handle_play"
            icon-class="play"
            >播放</Button
          >&nbsp;
          <!-- <Button
            shape="round"
            v-if="Boolean(privileges[0]?.id)"
            @click="handle_play"
            icon-class="plus"
            class="play-button"
          ></Button> -->
        </div>
      </template>
    </DescHeader>
    <ul class="songs" name="songs" id="songs">
      <li
        class="track"
        @click="handle_play(it.id)"
        v-for="it in privileges"
        :key="it.id"
        :class="{ active: it.id === current_id }"
      >
        <SongWithInfo
          :image="it?.al?.picUrl"
          :name="it?.name"
          :subtitle="`${it.alia ? it.alia.toString() : ''} ${
            it.tns ? it.tns.toString() : ''
          }`"
          :id="it?.id"
          :desc="it?.ar"
          :publishTime="
            it.publishTime
              ? dayjs(it.publishTime).format('YYYY年MM月DD日')
              : it.name
          "
          :duration="to_time(it.dt / 1000)"
        />
      </li>
    </ul>
  </div>
</template>
<script setup>
import { ref, watch, computed } from "vue";
import { useRoute } from "vue-router";
import { getSongDetail, getAlbum } from "@/api";
import dayjs from "dayjs";
import Button from "@/components/Button";
import DescHeader from "@/components/DescHeader";
import SongWithInfo from "@/components/SongWithInfo";
import Skeleton from "@/components/Skleleton";
import Link from "@/components/Link";

import { useStore } from "vuex";
const store = useStore();
const current_id = computed(() => store.state.sound.current_id);

const route = useRoute();
const playlist = ref({});
const privileges = ref([]);
const loading = ref(true);
const init = () => {
  const id = route.params.id;
  loading.value = true;
  getAlbum({ id })
    .then((response) => {
      const { album, songs: s } = response;
      playlist.value = album;
      if (!s) return;
      const ids = s.map((it) => it.id).toString();
      getSongDetail({ ids })
        .then(({ songs }) => {
          loading.value = false;
          privileges.value = songs;
        })
        .catch(() => {
          loading.value = false;
        });
    })
    .catch(() => {
      loading.value = false;
    });
};
const to_time = (value) => {
  if (!value) return "";
  const m = `${Math.floor((value / 60) % 60)}`.padStart(2, "0"),
    s = `${Math.floor(value % 60)}`.padStart(2, "0");
  return `${m}:${s}`;
};
const handle_play = (id) => {
  store.dispatch("fetch_song_data", id);
};
watch(
  () => route.params.id,
  () => {
    init();
  },
  { immediate: true }
);
const handle_to_song = () => {
  document.getElementById("songs").scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
};
</script>
<style lang="scss" scoped>
.albumsdetail {
  padding: 20px;
  .count {
    font-size: 12px;
  }
  ul {
    padding: 0;
    margin: 0;
  }
  li {
    list-style-type: none;
    padding: 0 15px;
  }

  .action {
    display: flex;
  }
  .play-button {
    border-radius: 50%;
  }
}
</style>
