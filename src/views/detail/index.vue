<template>
  <el-row>
    <el-page-header
      @back="goBack"
      :content="`${route.params.keywords}的搜索详情页`"
    >
    </el-page-header>
  </el-row>
</template>

<script setup>
import { onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { getCloudSearch } from "@/api";
const route = useRoute();
const router = useRouter();
onMounted(async () => {
  // type: 搜索类型；默认为 1 即单曲 , 取值意义 : 1: 单曲, 10: 专辑, 100: 歌手, 1000: 歌单, 1002: 用户, 1004: MV, 1006: 歌词, 1009: 电台, 1014: 视频, 1018:综合
  const types = [1, 10, 100, 1000, 1002, 1004, 1009, 1014];
  Promise.all(
    types.map(type =>
      getCloudSearch({
        ...route.params,
        type
      })
    )
  ).then(response => {
    console.log(response);
  });
});
const goBack = () => {
  router.back();
};
</script>

<style lang="scss" scoped></style>
