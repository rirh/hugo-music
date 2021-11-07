<template>
  <div>
    <Image :src="playlist.coverImgUrl" />
    <div>{{ playlist.description }}</div>
  </div>
</template>
<script setup>
import { ref, watch } from "vue";
import { useRoute } from "vue-router";
import { getPlayListDetail } from "@/api";
import Image from "@/components/Image";
const route = useRoute();
const playlist = ref({});
const privileges = ref([]);

const init = () => {
  const id = route.params.id;
  getPlayListDetail({ id }).then(response => {
    const { playlist: playlist_res, privileges: privileges_res } = response;
    playlist.value = playlist_res;
    privileges.value = privileges_res;
  });
};

watch(
  () => route.params.id,
  () => {
    init();
  },
  { immediate: true }
);
</script>
<style lang="scss" scoped></style>
