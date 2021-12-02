<template>
  <transition
    enter-active-class="animate__animated animate__fadeIn"
    leave-active-class="animate__animated animate__fadeOut"
  >
    <main>
      <h1>
        <strong>"{{ route.params.keywords }}"</strong> <span>搜索结果</span>
      </h1>
      <Skeleton
        style="margin:3%"
        v-if="loading"
        width="100%"
        height="40vh"
        animated
        bg="transparent"
      />
      <div v-else v-for="(it, i) in response" :key="i">
        <div>
          <div class="title">
            <h1 :id="it.label">{{ typeToText(it.label) || "" }}</h1>
            <Link :to="`/detail/${route.params.keywords}/${it.label}`">
              <span>更多</span>
            </Link>
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
              :desc="it?.ar"
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
              :desc="it.artists"
              :id="it.id"
            />
          </div>
          <div
            class="box fr-4"
            v-if="it.label === 'mvs'"
            style="gap: 36px 24px;"
          >
            <mvs
              v-for="it in it.values"
              :key="it.id"
              :image="it.cover"
              :name="it.name"
              :desc="it.artistName"
              :id="it.id"
              @on-play="handle_show_video"
            />
          </div>
          <div
            class="box fr-4"
            v-if="it.label === 'videos'"
            style="gap: 36px 24px;"
          >
            <videos
              v-for="it in it.values"
              :key="it.id"
              :image="it.coverUrl"
              :name="it.title"
              :desc="it.aliaName"
              :id="it.vid"
              @on-play="handle_show_video"
            />
          </div>
          <div
            class="box fr-4"
            v-if="it.label === 'playlists'"
            style="gap: 36px 24px;"
          >
            <playlists
              v-for="it in it.values"
              :key="it.vid"
              :image="it.coverUrl || ''"
              :name="it.title"
              :id="it.vid"
            />
          </div>
          <div
            class="box fr-5"
            v-if="it.label === 'userprofiles'"
            style="gap: 36px 24px;"
          >
            <userprofiles
              v-for="it in it.values"
              :key="it.userId"
              :image="it?.avatarUrl"
              :name="it.nickname"
              :id="it.userId"
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
      </div>
    </main>
  </transition>
  <ModalWithVideo
    :open="videoData.open"
    :url="videoData.url"
    @on-close="handle_close_video"
  />
</template>

<script setup>
import { onMounted, ref, nextTick, watch, reactive } from "vue";
import { useRoute } from "vue-router";
import { getCloudSearch } from "@/api";
import { typeToText } from "@/utils";
import Skeleton from "@/components/Skleleton";
import songs from "@/components/Songs.vue";
import albums from "@/components/Albums.vue";
import artists from "@/components/Artists.vue";
import playlists from "@/components/Playlists.vue";
import userprofiles from "@/components/Userprofiles.vue";
import mvs from "@/components/Mvs.vue";
import djRadios from "@/components/DjRadios.vue";
import videos from "@/components/Videos.vue";
import Link from "@/components/Link";
import ModalWithVideo from "@/components/ModalWithVideo";
const route = useRoute();
// const router = useRouter();
const response = ref([]);
const loading = ref(true);
const videoData = reactive({
  open: false,
  url: ""
});
onMounted(async () => {
  init();
});
watch(route, () => {
  init();
});
const handle_close_video = () => {
  videoData.open = false;
};
const handle_show_video = url => {
  console.log(url);

  videoData.open = true;
  videoData.url = url;
};
const init = () => {
  // type: 搜索类型；默认为 1 即单曲 , 取值意义 : 1: 单曲, 10: 专辑, 100: 歌手, 1000: 歌单, 1002: 用户, 1004: MV, 1006: 歌词, 1009: 电台, 1014: 视频, 1018:综合
  const types = [1, 10, 100, 1000, 1002, 1004, 1009, 1014];
  loading.value = true;
  Promise.all(
    types.map(type =>
      getCloudSearch({
        ...route.params,
        type,
        limit: 10,
        offset: 0
      })
    )
  )
    .then(res => {
      loading.value = false;
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
    })
    .catch(error => {
      loading.value = false;
      throw error;
    });
};
</script>

<style lang="scss" scoped>
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
  h1 {
    color: #6e7187;
    font-size: 36px;
    strong {
      color: #000;
    }
  }
}
@media (max-width: 1336px) {
  main {
    padding: 64px 5vw 96px 5vw;
  }
}
</style>
