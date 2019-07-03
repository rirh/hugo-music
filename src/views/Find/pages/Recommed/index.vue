<style lang="less" scoped>
/* For demo */
.wapper {
  width: 100%;
  padding-bottom: 10vh;
}
</style>


<template>
  <div class="wapper">
    <Swiper :data="banners" />
    <Recommed :data="recommeds" />
    <Exclusive :data="privates" />
    <Newsong :data="newsongs" />
    <RecommedMv :data="recommedmvs" />
    <DjProgram :data="djprograms"/>
  </div>
</template>

<script lang="ts">
import Swiper from "./components/Swiper.vue";
import Recommed from "./components/Recommed.vue";
import Exclusive from "./components/Exclusive.vue";
import Newsong from "./components/Newsong.vue";
import RecommedMv from "./components/RecommedMv.vue";
import DjProgram from "./components/DjProgram.vue";
import { Component, Vue } from "vue-property-decorator";
import {
  get_banner,
  get_personalized,
  get_private_content,
  get_new_song,
  get_personalized_mv,
  get_dj_program
} from "@/actions";
import axios from "axios";

@Component({
  components: { Swiper, Recommed, Exclusive, Newsong, RecommedMv, DjProgram }
})
export default class Home extends Vue {
  public loading = true;
  public banners = [];
  public recommeds = [];
  public privates = [];
  public newsongs = [];
  public recommedmvs = [];
  public djprograms = [];

  public async mounted() {
    this.init();
  }
  /**
   * 转化为万做单位函数
   */
  public transformW(args: any) {
    let result: any = 0;
    const batter = 10000;
    const cursor = Number(args);
    if (!isNaN(cursor)) {
      if (cursor > batter) {
        const value = Math.floor(cursor / batter);
        result = `${value}万`;
      } else {
        result = cursor;
      }
    }
    return result;
  }
  public async init() {
    this.loading = true;
    const respone = await axios.all([
      get_banner(),
      get_personalized(),
      get_private_content(),
      get_new_song(),
      get_personalized_mv(),
      get_dj_program()
    ]);
    this.loading = false;
    const [
      bannersRes,
      personaRes,
      privateRes,
      newsongRes,
      recommedmvRes,
      djprogramRes
    ] = respone;
    if (bannersRes.code === 200) {
      this.banners = bannersRes.banners;
    }
    if (personaRes.code === 200) {
      this.recommeds = personaRes.result.slice(0, 10);
    }
    if (privateRes.code === 200) {
      this.privates = privateRes.result;
    }
    if (newsongRes.code === 200) {
      this.newsongs = newsongRes.result;
    }
    if (recommedmvRes.code === 200) {
      this.recommedmvs = recommedmvRes.result;
    }
    if (djprogramRes.code === 200) {
      this.djprograms = djprogramRes.result;
    }
    
  }
}
</script>
