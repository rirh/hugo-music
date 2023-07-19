<template>
  <div class="song-auto-complete-wapper no-drag">
    <input
      @focus="show_options = true"
      @blur="handle_blur"
      class="search-la"
      type="text"
      v-model="query"
      ref="searchRef"
      autofocus
      :placeholder="$t('home.suggtion')"
      @keyup.enter="handle_go_detail()"
    />
    <Spinner v-if="loading" class="spinner-er" />
    <div class="auto-complete-wapper">
      <transition
        name="fade"
        enter-active-class="animate__animated animate__fadeInDown"
      >
        <div v-if="show_options">
          <div
            v-for="group in song_options"
            :key="group.label"
            :label="group.label"
          >
            <div class="title item">
              <span>{{ group.label }}</span
              ><span @click="handle_go_detail(group.label)" class="more"
                >更多</span
              >
            </div>
            <div
              v-for="item in group.options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
              class="label item"
              @click="handle_select(group.label, item.value)"
            >
              {{ item.label }}
            </div>
          </div>
        </div>
      </transition>
    </div>
  </div>
  <br />
  <transition
    enter-active-class="animate__animated animate__fadeIn"
    leave-active-class="animate__animated animate__fadeOut"
  >
    <div>
      <Skeleton
        v-if="!hot_key_words.length"
        width="100%"
        height="30vh"
        animated
        bg="transparent"
      />
      <div
        v-else
        class="hot-words"
        @click="handle_key_words(key.first)"
        @dblclick="handle_go_search_page(key.first)"
        v-for="(key, i) in hot_key_words"
        :key="i"
        :title="key.first"
      >
        {{ key.first }}
      </div>
    </div>
  </transition>
</template>

<script setup>
import { throttle } from "lodash";
import { ref, watch, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { getSearchSuggest, getSearchHot } from "@/api";
import useDebouncedRef from "@/components/useDebouncedRef";
import Spinner from "@/components/Spinner";
import Skeleton from "@/components/Skleleton";

const router = useRouter();
const store = useStore();

const query = useDebouncedRef("", 600);

watch(
  query,
  throttle(function (q) {
    fetch_search_song(q);
  }, 200)
);
const song_options = ref([]);
const loading = ref(false);
const show_options = ref(false);
const hot_key_words = ref([]);
const searchRef = ref();
onMounted(() => {
  getSearchHot().then((response) => {
    hot_key_words.value = response.result.hots;
  });
});

const handle_key_words = (keywords) => {
  query.value = keywords;
  show_options.value = true;
};
const handle_blur = () => {
  setTimeout(() => {
    show_options.value = false;
  }, 200);
};
const fetch_search_song = async (e) => {
  loading.value = true;
  const keywords = e;
  const { result, code } = await getSearchSuggest({ keywords });
  loading.value = false;
  if (code !== 200) return;
  if (!result.order) return;
  song_options.value = result?.order.map((e) => {
    let options = result[e];
    options = options.map((it) => ({
      ...it,
      value: it.id,
      label: `${it.name}${
        (it.artists &&
          "-" + it.artists.map((artist) => artist.name).join("/")) ||
        ""
      }`,
    }));
    return {
      value: e,
      label: e,
      options,
    };
  });
  show_options.value = true;
  searchRef.value?.focus();
};
// const handle_detail = () => {
//   router.push(`/detail/${select.value.query}`);
// };
const handle_go_search_page = (keywords) => {
  router.push(`/detail/${keywords}`);
};
const handle_select = async (type, id) => {
  switch (type) {
    case "songs":
      store.dispatch("fetch_song_data", id);
      break;
    default:
      router.push(`/${type}/${id}`);
      break;
  }
};
const handle_go_detail = (label) => {
  if (label) label = `?type=${label}`;
  if (query.value) {
    router.push(`/detail/${query.value || ""}${label || ""}`);
  } else {
    setTimeout(() => {
      handle_go_detail();
    }, 600);
  }
};
</script>

<style lang="scss" scoped>
.search-la {
  padding: 10px;
  font-size: 16px;
  max-width: 600px;
  border-width: 2px;
  font-weight: bold;
  outline: none;
  height: 40px;
  border: none;
  box-sizing: border-box;
  max-width: 500px;
  text-transform: capitalize;
}
.search-la:focus .song-auto-complete-wapper {
  border: 2px solid var(--color-primary);
  border-radius: 5px;
}
.song-auto-complete-wapper {
  max-height: 45vh;
  border-left: 2px solid #666;
  border-right: 2px solid #666;
  border-top: 2px solid #666;
  position: relative;
  background: #fff;
  .spinner-er {
    position: absolute;
    right: 0px;
    top: 0px;
    height: 20px;
    width: 20px;
  }
  .auto-complete-wapper {
    overflow: auto;
    max-height: calc(45vh - 45px);
    border-top: 1px solid #eee;
    position: absolute;
    /* bottom: 0; */
    left: -2px;
    width: 100%;
    top: 100%;
    z-index: 1;
    border-left: 2px solid #666;
    border-right: 2px solid #666;
    border-bottom: 2px solid #666;
    top: calc(100% - 2px);
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;

    .item {
      padding: 5px;
      font-size: 16px;
      font-weight: bold;
      background-color: var(--color-primary);
      cursor: pointer;
      transition: all 0.2s;
    }
    .label:hover {
      background-color: var(--color-hover-primary);
      color: var(--color-primary);
    }
    .label:active {
      transform: scale(0.85);
    }
    .title {
      font-size: 14px;
      background-color: var(--color-primary);
      font-weight: normal;
      cursor: unset;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .more {
        font-weight: bold;
      }
      .more:hover {
        font-weight: bold;
        color: var(--color-hover-primary);
        cursor: pointer;
      }
    }
  }
}
.hot-words {
  font-size: 14px;
  color: #666;
  opacity: 0.75;
  margin-bottom: 3px;
  cursor: pointer;
}
.hot-words:hover {
  opacity: 0.9;
  text-decoration: underline;
}
</style>
