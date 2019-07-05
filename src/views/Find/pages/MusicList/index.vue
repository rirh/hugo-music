<style lang="less" scoped>
.musiclist {
  padding: 2.2vw;
}
</style>

<template>
  <div class="musiclist">
    <Panel :data="panels" />
    <br />
    <Tag :data="tags" @on-type="handleType" />
    <br />
    <List :data="list" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { get_play_high_qualty, get_cat_hot, get_cat_list } from "@/actions";
import axios from "axios";

import Panel from "./pages/Panel.vue";
import Tag from "./pages/Tag.vue";
import List from "./pages/List.vue";

@Component({ components: { Panel, Tag, List } })
export default class Home extends Vue {
  public limit = 101;
  public before = 0;
  public total = 0;
  public list = [];
  public tags = [];
  public panels = {};
  public cat = "";

  async mounted() {
    const { code, tags } = await get_cat_hot();
    if (code === 200) this.tags = tags;
    this.init();
    //  await axios.all([get_cat_hot(),get_play_high_qualty(`limit=${}`)])
  }
  handleType(item: any) {
    this.cat = item.name;
    this.init();
  }
  async init() {
    let params = ``;
    params = params + `limit=${this.limit}`;
    if (this.before) params += `&before=${this.before}`;
    if (this.cat) params += `&cat=${this.cat}`;
    const { code, lasttime, total, playlists } = await get_play_high_qualty(
      params
    );
    // this.before = lasttime;
    this.total = Math.floor(total / this.limit);
    this.list = playlists.slice(1, playlists.length);
    this.panels = playlists[0];
  }
}
</script>
