<template>
  <Skeleton
    style="margin:3%"
    v-if="loading"
    width="74%"
    height="70vh"
    animated
    bg="transparent"
  />
  <div class="wapper" id="top" v-else>
    <DescHeader
      :image="playlist?.coverImgUrl"
      :name="playlist?.name"
      :description="playlist?.description"
      :tracks="tracks"
      :showActions="Boolean(privileges[0]?.id)"
      @on-play="handle_play(privileges[0]?.id)"
    >
      <template v-slot:tracks>
        <div>
          <div>
            {{
              `${$t("searchResult.lastUpdate")}&nbsp;${dayjs(playlist?.updateTime).format(
                "YYYY/MM/DD/"
              )}`
            }}
            · {{ `${playlist?.trackCount}${$t("searchResult.songsTips")}` }}
          </div>
          <div class="count">
            <span>
              <svg-icon class="icon" icon-class="play"></svg-icon>
              {{ formatCount(playlist?.playCount) }}次播放
            </span>
            ·
            <span class="link">
              {{ formatCount(playlist?.subscribedCount) }}人订阅
            </span>
            ·
            <span class="link">
              {{ formatCount(playlist?.shareCount) }}次分享
            </span>
            ·
            <span class="link">
              {{ formatCount(playlist?.commentCount) }}条留言
            </span>
          </div>
        </div>
      </template>
    </DescHeader>
    <ul class="songs">
      <li
        class="track"
        @click="handle_play(it.id)"
        v-for="(it, i) in privileges"
        :key="it.id"
        :class="{ active: it.id === current_id }"
      >
        <div class="index">
          {{ i + 1 }}
        </div>
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
          {{
            it.publishTime
              ? dayjs(it.publishTime).format("YYYY年MM月DD日")
              : it.name
          }}
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
import { getPlayListDetail, getSongDetail } from "@/api";
import { artoString, formatCount } from "@/utils";
import dayjs from "dayjs";
import DescHeader from "@/components/DescHeader";
import Image from "@/components/Image";
import Skeleton from "@/components/Skleleton";

import { useStore } from "vuex";
const store = useStore();
const current_id = computed(() => store.state.sound.current_id);

const route = useRoute();
const playlist = ref({});
const privileges = ref([]);
const loading = ref(false);

const init = () => {
  loading.value = true;
  playlist.value = [];
  privileges.value = [];
  const id = route.params.id;
  getPlayListDetail({ id }).then(response => {
    const { playlist: playlist_res } = response;
    playlist.value = playlist_res;
    const ids = playlist_res?.trackIds.map(it => it.id).toString();
    getSongDetail({ ids }).then(({ songs }) => {
      privileges.value = songs;
      loading.value = false;
      const el = document.getElementById(`top`);
      el && el.scrollIntoView({ behavior: "smooth", block: "start" });
    });
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
  .count {
    line-height: 18px;
    word-break: break-word;
    font-weight: 600;
    opacity: 0.58;
    color: #000;
    font-size: 12px;
    .link {
      cursor: pointer;
      transition: all 200ms;
    }
    .link:hover {
      text-decoration: underline;
      color: #000;
    }

    .icon {
      margin-right: 3px;
      height: 8px;
      width: 8px;
    }
  }
  .songs {
    border-radius: 0.75em;
    box-sizing: border-box;
    padding: 0 40px;
    .index {
      font-weight: 600;
      font-size: 18px;
      margin: 0 20px 0 0;
    }
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
        width: 25vw;
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
