<template>
  <main>
    <h1>"{{ route.params.keywords }}"搜索结果</h1>
    <div></div>
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
          <songs
            v-for="it in it.values"
            :key="it.id"
            :image="it?.al?.picUrl"
            :name="it.name"
            :id="it.id"
            :desc="artoString(it?.song?.artists, 'name')"
          />
        </div>
        <div
          class="box fr-5"
          v-if="it.label === 'artists'"
          style="gap: 36px 24px;"
        >
          <artists
            v-for="it in it.values"
            :key="it.id"
            :image="it.picUrl"
            :name="it.name"
            :id="it.id"
          />
        </div>
        <div class="box fr-5" v-if="it.label === 'albums'">
          <albums
            v-for="it in it.values"
            :key="it.id"
            :image="it.picUrl"
            :name="it.name"
            :desc="artoString(it.artists, 'name')"
            :id="it.id"
          />
        </div>
        <div class="box fr-4" v-if="it.label === 'mvs'" style="gap: 36px 24px;">
          <mvs v-for="it in it.values" :key="it.id" :item="it" />
        </div>
        <div
          class="box fr-4"
          v-if="it.label === 'videos'"
          style="gap: 36px 24px;"
        >
          <videos v-for="it in it.values" :key="it.id" :item="it" />
        </div>

        <div
          class="box fr-4"
          v-if="it.label === 'playlists'"
          style="gap: 36px 24px;"
        >
          <playlists
            v-for="it in it.values"
            :key="it.id"
            :image="it.coverImgUrl || ''"
            :name="it.name"
            :id="it.id"
          />
        </div>
        <div
          class="box fr-5"
          v-if="it.label === 'userprofiles'"
          style="gap: 36px 24px;"
        >
          <userprofiles
            v-for="it in it.values"
            :key="it.id"
            :image="it?.avatarUrl"
            :name="it.nickname"
            :id="it.id"
          />
        </div>
        <div
          class="box fr-4"
          v-if="it.label === 'djRadios'"
          style="gap: 36px 24px;"
        >
          <djRadios v-for="it in it.values" :key="it.id" :it="it" />
        </div>
      </div>
      <!-- <h1 :id="it.label">{{ it.label || "" }}</h1>
      <div class="box">
        <template v-for="it in it.values" :key="it.id">
          <songs v-if="it.label === 'songs'" :it="it" />
          <albums v-else-if="it.label === 'albums'" :it="it" />
          <artists v-else-if="it.label === 'artists'" :it="it" />
          <playlists v-else-if="it.label === 'playlists'" :it="it" />
          <userprofiles v-else-if="it.label === 'userprofiles'" :it="it" />
          <mvs v-else-if="it.label === 'mvs'" :it="it" />
          <djRadios v-else-if="it.label === 'djRadios'" :it="it" />
          <videos v-else-if="it.label === 'videos'" :it="it" />
        </template>
      </div> -->
    </div>
  </main>
</template>

<script setup>
import { onMounted, ref, nextTick, watch } from "vue";
import { useRoute } from "vue-router";
import { getCloudSearch } from "@/api";
import { artoString } from "@/utils";
import songs from "@/components/Songs.vue";
import albums from "@/components/Albums.vue";
import artists from "@/components/Artists.vue";
import playlists from "@/components/Playlists.vue";
import userprofiles from "@/components/Userprofiles.vue";
import mvs from "@/components/Mvs.vue";
import djRadios from "@/components/DjRadios.vue";
import videos from "@/components/Videos.vue";
const route = useRoute();
// const router = useRouter();
const response = ref([]);

onMounted(async () => {
  init();
});
watch(route, () => {
  init();
});
const init = () => {
  // type: 搜索类型；默认为 1 即单曲 , 取值意义 : 1: 单曲, 10: 专辑, 100: 歌手, 1000: 歌单, 1002: 用户, 1004: MV, 1006: 歌词, 1009: 电台, 1014: 视频, 1018:综合
  const types = [1, 10, 100, 1000, 1002, 1004, 1009, 1014];
  Promise.all(
    types.map(type =>
      getCloudSearch({
        ...route.params,
        type,
        limit: 10,
        offset: 0
      })
    )
  ).then(res => {
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
};
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
  span {
    color: #999;
    font-size: 14px;
  }
}
main {
  overflow: auto;
  padding: 64px 30px 96px 30px;
  box-sizing: border-box;
  background-color: var(--color-primary);
  width: 100%;
}
@media (max-width: 1336px) {
  main {
    padding: 64px 5vw 96px 5vw;
  }
}
</style>
