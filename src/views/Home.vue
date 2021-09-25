<template>
  <div class="app-container">
    <div class="container">
      <div>
        <img
          class="logo"
          src="https://6372-crypto2server-576164-1302901174.tcb.qcloud.la/z-org-logos/logo-512x160.png"
        />
      </div>
      <div v-t="{ path: 'message.hello' }"></div>
      <div>
        <button @click="handle_change_theme('light')">白色</button>
        <button @click="handle_change_theme('dark')">黑色</button>
        <button @click="handle_change_language('en')">en</button>
        <button @click="handle_change_language('zh')">zh</button>

        <!-- <el-select
          v-model="song"
          filterable
          remote
          class="search-la"
          ref="select"
          autofocus
          reserve-keyword
          autocomplete
          popper-append-to-body
          placeholder=" "
          :remote-method="fetch_search_song"
          :loading="loading"
          @change="handle_select"
          @keyup.enter="handle_detail"
        >
          <el-option-group
            v-for="group in song_options"
            :key="group.label"
            :label="group.label"
          >
            <el-option
              v-for="item in group.options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-option-group>
        </el-select> -->
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
// import { useRouter } from "vue-router";
import { useStore } from "vuex";
// import { getSearchSuggest } from "@/api";
import locale from "../locale";
// const router = useRouter();
const store = useStore();
onMounted(() => {
  store.dispatch("fetch_song_data", 1307411242);
});
// const song = ref(null);
// const song_options = ref([]);
// const select = ref(null);
// const loading = ref(false);

// const fetch_search_song = async keywords => {
//   loading.value = true;
//   const { result, code } = await getSearchSuggest({ keywords });
//   loading.value = false;
//   if (code !== 200) return;
//   if (!result.order) return;
//   song_options.value = result?.order.map(e => {
//     let options = result[e];
//     options = options.map(it => ({
//       ...it,
//       value: it.id,
//       label: `${it.name}${(it.artists &&
//         "-" + it.artists.map(artist => artist.name).join("/")) ||
//         ""}`
//     }));
//     return {
//       value: e,
//       label: e,
//       options
//     };
//   });
// };
// const handle_detail = () => {
//   router.push(`/detail/${select.value.query}`);
// };
// const handle_select = async id => {
//   store.dispatch("fetch_song_data", id);
// };
const handle_change_language = en => {
  console.log(en);
  locale.locale = en;
  console.log(locale);
};
const handle_change_theme = appearance => {
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
</script>

<style lang="scss" scoped>
.app-container {
  display: grid;
  place-items: center;
  height: 100vh;
  width: 100vw;
  box-sizing: border-box;
  .container {
    margin-top: -30vh;
  }
  .logo {
    height: 5.5vmax;
    min-height: 55px;
    width: auto;
    background: transparent;
    margin-bottom: 30px;
    border-radius: 0;
    filter: var(--img-primary);
  }

  .search-la {
    width: 50vw;
    min-width: 300px;
    border-width: 2px;
    border: 2px solid #000;
    border-radius: 5px;
    ::v-deep(input) {
      font-weight: bold;
    }
  }
}
</style>
