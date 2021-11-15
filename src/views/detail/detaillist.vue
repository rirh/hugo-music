<template>
  <div class="detaillist">
    <h1>
      搜索{{ typeToText(router.params.type) }}
      <strong>"{{ router.params.keywords }}"</strong>， {{ total }}&nbsp;条结果
    </h1>
    <br />
    <div
      class="box"
      :class="[
        router.params.type === 'songs' && 'fr-3',
        (router.params.type === 'playlists' ||
          router.params.type === 'mvs' ||
          router.params.type === 'videos') &&
          'fr-4',
        (router.params.type === 'albums' ||
          router.params.type === 'artists' ||
          router.params.type === 'userprofiles') &&
          'fr-5'
      ]"
      style="gap: 30px 35px;"
    >
      <div v-for="it in list" :key="it.id">
        <component
          :is="componentslist[router.params.type]"
          :image="
            it?.avatarUrl || it.coverImgUrl || it.picUrl || it?.al?.picUrl
          "
          :name="it.name || it.nickname"
          :id="it.id || it.userId"
          :desc="it.artists || it?.song?.artists"
        ></component>
      </div>
    </div>
    <Skeleton
      style="margin:3%"
      v-if="loading"
      width="74%"
      height="70vh"
      animated
      bg="transparent"
    />
    <div class="loadmore" v-show="list.length < total">
      <Button @click="handle_load_more">加载更多</Button>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { getCloudSearch } from "@/api";
import { typeToText } from "@/utils";
import Skeleton from "@/components/Skleleton";
import Button from "@/components/Button";
import songs from "@/components/Songs.vue";
import albums from "@/components/Albums.vue";
import artists from "@/components/Artists.vue";
import playlists from "@/components/Playlists.vue";
import userprofiles from "@/components/Userprofiles.vue";
import mvs from "@/components/Mvs.vue";
import djRadios from "@/components/DjRadios.vue";
import videos from "@/components/Videos.vue";
const componentslist = ref({
  songs,
  albums,
  artists,
  playlists,
  userprofiles,
  mvs,
  djRadios,
  videos
});
const router = useRoute();
const query = ref({
  limit: 20,
  offset: 0,
  type: 1,
  keywords: ""
});
const list = ref([]);
const total = ref(0);
const loading = ref(true);
const type_list = {
  songs: 1,
  albums: 10,
  artists: 100,
  playlists: 1000,
  userprofiles: 1002,
  mvs: 1004,
  djRadios: 1009,
  videos: 1014
};
onMounted(() => {
  const { keywords, type } = router.params;
  query.value = {
    ...query.value,
    keywords,
    type: type_list[type] || 1
  };
  init();
});
const init = () => {
  loading.value = true;
  getCloudSearch(query.value)
    .then(({ result }) => {
      loading.value = false;
      const type = router.params.type;
      const data = result[type];
      const count = result[`${type.substring(0, type.length - 1)}Count`];
      total.value = count;
      list.value = [...list.value, ...data];
    })
    .catch(() => {
      loading.value = false;
    });
};
const handle_load_more = () => {
  query.value = {
    ...query.value,
    offset: list.value.length
  };
  init();
};
</script>

<style lang="scss" scoped>
.detaillist {
  padding: 20px;
  h1 {
    color: #999;
    strong {
      color: #000;
    }
  }
  .loadmore {
    display: grid;
    place-items: center;
    margin-top: 30px;
  }
}
</style>
