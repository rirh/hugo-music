<template>
  <main>
    <div v-for="(it, i) in response" :key="i">
      <div>
        <div class="title">
          <h1 :id="it.label">{{ it.label || "" }}</h1>
          <span>更多</span>
        </div>
        <div
          class="box fr-3"
          style="gap: 0px 10px;"
          v-if="it.label === 'songs'"
        >
          <songs v-for="item in it.values" :key="item.id" :item="item" />
        </div>
        <div class="box fr-5" v-if="it.label === 'albums'">
          <albums v-for="item in it.values" :key="item.id" :item="item" />
        </div>
        <div class="box fr-4" v-if="it.label === 'mvs'" style="gap: 36px 24px;">
          <mvs v-for="item in it.values" :key="item.id" :item="item" />
        </div>
        <div
          class="box fr-4"
          v-if="it.label === 'videos'"
          style="gap: 36px 24px;"
        >
          <videos v-for="item in it.values" :key="item.id" :item="item" />
        </div>
        <div
          class="box fr-4"
          v-if="it.label === 'artists'"
          style="gap: 36px 24px;"
        >
          <artists v-for="item in it.values" :key="item.id" :item="item" />
        </div>
        <div
          class="box fr-4"
          v-if="it.label === 'playlists'"
          style="gap: 36px 24px;"
        >
          <playlists v-for="item in it.values" :key="item.id" :item="item" />
        </div>
        <div
          class="box fr-4"
          v-if="it.label === 'userprofiles'"
          style="gap: 36px 24px;"
        >
          <userprofiles v-for="item in it.values" :key="item.id" :item="item" />
        </div>
        <div
          class="box fr-4"
          v-if="it.label === 'djRadios'"
          style="gap: 36px 24px;"
        >
          <djRadios v-for="item in it.values" :key="item.id" :item="item" />
        </div>
      </div>
      <!-- <h1 :id="it.label">{{ it.label || "" }}</h1>
      <div class="box">
        <template v-for="item in it.values" :key="item.id">
          <songs v-if="it.label === 'songs'" :item="item" />
          <albums v-else-if="it.label === 'albums'" :item="item" />
          <artists v-else-if="it.label === 'artists'" :item="item" />
          <playlists v-else-if="it.label === 'playlists'" :item="item" />
          <userprofiles v-else-if="it.label === 'userprofiles'" :item="item" />
          <mvs v-else-if="it.label === 'mvs'" :item="item" />
          <djRadios v-else-if="it.label === 'djRadios'" :item="item" />
          <videos v-else-if="it.label === 'videos'" :item="item" />
        </template>
      </div> -->
    </div>
  </main>
</template>

<script setup>
import { onMounted, ref, nextTick } from "vue";
import { useRoute, useRouter } from "vue-router";
import { getCloudSearch } from "@/api";
import songs from "./songs.vue";
import albums from "./albums.vue";
import artists from "./artists.vue";
import playlists from "./playlists.vue";
import userprofiles from "./userprofiles.vue";
import mvs from "./mvs.vue";
import djRadios from "./djRadios.vue";
import videos from "./videos.vue";
const route = useRoute();
const router = useRouter();
console.log(router)
const response = ref([]);
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
  ).then(res => {
    console.log(res);

    response.value = res.map(({ result, code }) => {
      if (code !== 200) result = {};
      else {
        let temp = {};
        for (const key in result) {
          if (Object.hasOwnProperty.call(result, key)) {
            const element = result[key];
            if (Array.isArray(element)) {
              temp.label = key;
              temp.values = element;
            } else {
              temp[key] = element;
            }
          }
        }
        result = temp;
      }
      return result;
    });
    nextTick(() => {
      if (route.query.type) {
        const type = route.query.type;
        document.getElementById(type).scrollIntoView({
          behavior: "smooth",
          block: "start"
        });
      }
    });
  });
});
</script>

<style lang="scss" scoped>
.box {
  display: grid;
  gap: 44px 24px;
}
.fr-2 {
  grid-template-columns: repeat(2, 1fr);
}
.fr-3 {
  grid-template-columns: repeat(3, 1fr);
}
.fr-4 {
  grid-template-columns: repeat(4, 1fr);
}
.fr-5 {
  grid-template-columns: repeat(5, 1fr);
}
.title {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
main {
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  overflow: auto;
  padding: 64px 10vw 96px 10vw;
  box-sizing: border-box;
  background-color: var(--color-primary);
}
@media (max-width: 1336px) {
  main {
    padding: 64px 5vw 96px 5vw;
  }
}
</style>
