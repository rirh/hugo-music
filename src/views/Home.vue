<template>
  <div class="app-container" :class="{ drag: is_electron }">
    <div class="left">
      <img
        @click="handle_change_theme"
        class="logo"
        alt="logo"
        src="https://6372-crypto2server-576164-1302901174.tcb.qcloud.la/z-org-logos/logo-512x160.png"
      />
      <div>
        <div class="song-auto-complete-wapper no-drag">
          <input
            @focus="show_options = true"
            @blur="handle_blur"
            class="search-la"
            type="text"
            v-model="query"
            autofocus
            @keyup.enter="handle_go_detail()"
          />
          <Spinner v-if="loading" class="spinner" />
          <div class="auto-complete-wapper">
            <transition
              name="fade"
              enter-active-class="animate__animated animate__fadeInDown"
            >
              <div v-if="show_options">
                <div
                  v-for="group in song_options"
                  v-show="group.label === 'songs'"
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
                    @click="handle_select(item.value)"
                  >
                    {{ item.label }}
                  </div>
                </div>
              </div>
            </transition>
          </div>
        </div>
      </div>
    </div>
    <div class="right">
      <Main style="width:100%" />
    </div>
    <!-- <div class="container">
     
      
    </div> -->
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { getSearchSuggest } from "@/api";
import useDebouncedRef from "@/components/useDebouncedRef";
import Spinner from "@/components/Spinner";
import Main from "@/views/detail/index.vue";
// import locale from "../locale";
const router = useRouter();
const store = useStore();
const is_electron = ref(process.env.IS_ELECTRON || false);
onMounted(() => {
  // store.dispatch("fetch_song_data", 1307411242);
});
const query = useDebouncedRef("", 400);
watch(query, q => {
  // 发起API请求
  fetch_search_song(q);
});
// const song = ref(null);
const song_options = ref([]);
// const select = ref(null);
const loading = ref(false);
const show_options = ref(false);
const handle_blur = () => {
  setTimeout(() => {
    show_options.value = false;
  }, 200);
};
const fetch_search_song = async e => {
  loading.value = true;
  const keywords = e;
  const { result, code } = await getSearchSuggest({ keywords });
  loading.value = false;
  if (code !== 200) return;
  if (!result.order) return;
  song_options.value = result?.order.map(e => {
    let options = result[e];
    options = options.map(it => ({
      ...it,
      value: it.id,
      label: `${it.name}${(it.artists &&
        "-" + it.artists.map(artist => artist.name).join("/")) ||
        ""}`
    }));
    return {
      value: e,
      label: e,
      options
    };
  });
};
// const handle_detail = () => {
//   router.push(`/detail/${select.value.query}`);
// };
const handle_select = async id => {
  store.dispatch("fetch_song_data", id);
};
// const handle_change_language = en => {
//   console.log(en);
//   locale.locale = en;
//   console.log(locale);
// };
const handle_change_theme = () => {
  let appearance =
    document.body.getAttribute("data-theme") === "dark" ? "light" : "dark";
  if (appearance === "auto" || appearance === undefined) {
    appearance = window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  }
  document.body.setAttribute("data-theme", appearance);
  document
    .querySelector('meta[name="theme-color"]')
    .setAttribute("content", appearance === "dark" ? "#222" : "#fff");
};
const handle_go_detail = label => {
  if (label) label = `?type=${label}`;
  router.push(`/detail/${query.value || ""}${label || ""}`);
};
</script>

<style lang="scss" scoped>
.app-container {
  display: flex;
  height: 100vh;
  width: 100vw;
  box-sizing: border-box;
  text-align: center;
  min-width: 400px;
  background-image: url("~@/assets/image/bg.svg"),
    url("~@/assets/image/bg2.svg");
  background-repeat: no-repeat;
  background-size: 30vh 30vh, 20vh 20vh;
  background-position: right 113%, right -4%;
  background-attachment: fixed;
  box-shadow: 10px;
  box-sizing: border-box;
  .left {
    width: 260px;
    min-width: 260px;
    max-height: min-content;
    height: 100%;
    background: rgba(60, 60, 67, 0.03);
    text-align: left;
    border-right: 1px solid rgba(0, 0, 0, 0.1);
    padding: 15px 20px;
  }
  .right {
    flex: 1;
    overflow: auto;
  }

  .container {
    margin-top: -40vh;
  }
  .logo {
    height: 50px;
    min-height: 35px;
    max-height: 80px;
    background: transparent;
    border-radius: 0;
    filter: var(--img-primary);
    cursor: pointer;
    text-decoration: none;
    margin-bottom: 30px;
    // aspect-ratio: 1/1;
  }

  .search-la {
    padding: 10px;
    font-size: 16px;
    max-width: 600px;
    border-width: 2px;
    font-weight: bold;
    outline: none;
    height: 45px;
    border: none;
    box-sizing: border-box;
    max-width: 500px;
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
    .spinner {
      position: absolute;
      right: 0px;
      top: 0px;
    }
    .auto-complete-wapper {
      overflow: auto;
      text-align: left;
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
      }
      .label:hover {
        background-color: var(--color-hover-primary);
        color: var(--color-primary);
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
}
@media only screen and (max-width: 800px) {
  .app-container {
    background-image: none;
  }
}
</style>
