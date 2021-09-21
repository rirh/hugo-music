<template>
  <div class="app-container">
    <el-row class="container">
      <el-col>
        <el-avatar
          class="logo"
          src="https://6372-crypto2server-576164-1302901174.tcb.qcloud.la/z-org-logos/logo-512x160.png"
        ></el-avatar>
      </el-col>
      <el-col>
        <el-select
          v-model="song"
          filterable
          remote
          class="search-la"
          ref="select"
          reserve-keyword
          autocomplete
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
        </el-select>
      </el-col>
      <el-col>{{ play_list }}</el-col>
      <el-col>
        {{ current_state }}- {{ current_progress }}/{{ current_duration }}
        <el-button @click="handle_toggle_play">
          暂停/播放
        </el-button>
        <el-slider :min="0" :max="100" @change="handle_seek_value"></el-slider>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { getSearchSuggest } from "@/api";

const router = useRouter();
const store = useStore();

const song = ref(null);
const song_options = ref([]);
const select = ref(null);
const loading = ref(false);
const play_list = computed(() => store.state.sound.play_list);
const current_duration = computed(() => store.state.sound.current_duration);
const current_progress = computed(() => store.state.sound.current_progress);
const current_state = computed(() => store.state.sound.current_state);

const handle_seek_value = val => {
  store.dispatch("seek", val);
};

const fetch_search_song = async keywords => {
  loading.value = true;
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
const handle_detail = () => {
  router.push(`/detail/${select.value.query}`);
};
const handle_toggle_play = () => {
  store.dispatch("toggle_play");
};
const handle_select = async id => {
  store.dispatch("fetch_song_data", id);
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
    margin-top: -20vh;
  }
  .logo {
    height: 60px;
    width: auto;
    background: transparent;
    margin-bottom: 30px;
    border-radius: 0;
  }
  .search-la {
    width: 50vw;
    border-width: 2px;
    border: 2px solid #000;
    border-radius: 5px;
    ::v-deep(input) {
      font-weight: bold;
    }
  }
}
</style>
