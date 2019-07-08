<style lang="less" scoped>
.musiclist {
  padding: 2.2vw 2.2vw 5.6vw 2.2vw;
}
</style>

<template>
  <div class="musiclist">
    <Panel :data="panels" />
    <br />
    <Tag :data="tags" @on-type="handleType" />
    <List :data="list" @on-item="handleDetail" />
    <Pagination :data="total" @on-change="handlePage" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { get_play_high_qualty, get_cat_hot, get_cat_list } from '@/actions';
import axios from 'axios';

import Panel from './pages/Panel.vue';
import Tag from './pages/Tag.vue';
import List from './pages/List.vue';
import Pagination from './pages/Pagination.vue';

@Component({ components: { Panel, Tag, List, Pagination } })
export default class Home extends Vue {
  public limit = 96;
  public before = 0;
  public total = { total: 0, lasttime: 0 };
  public list = [];
  public tags = [];
  public panels = {};
  public cat = '';
  public lasttime = 0;

  public handlePage(page: any) {
    // this.before = 0;
    this.before = this.total.lasttime;
    this.init();
  }
  public handleDetail(item: any) {
    this.$router.push({
      path: '/find/music/detail',
      query: { ...item },
    });
  }
  public async mounted() {
    const { code, tags } = await get_cat_hot();
    if (code === 200) {
      this.tags = tags;
    }
    this.init();
    //  await axios.all([get_cat_hot(),get_play_high_qualty(`limit=${}`)])
  }
  public handleType(item: any) {
    this.cat = item.name;
    this.limit = 100;
    this.before = 0;
    this.init();
  }
  public async init() {
    let params = ``;
    params = params + `limit=${this.limit}`;
    if (this.before) {
      params += `&before=${this.before}`;
    }
    if (this.cat) {
      params += `&cat=${this.cat}`;
    }
    const {
      code,
      lasttime,
      total,
      playlists,
      msg,
    } = await get_play_high_qualty(params);
    if (code === 200 && playlists.length > 0) {
      // this.before = lasttime;
      this.total = { total, lasttime };
      this.list = playlists.slice(1, playlists.length);
      this.panels = playlists[0];
    } else {
      const myNotification = new Notification('提示', {
        body: msg,
      });
      myNotification.onclick = () => {
        console.log('通知被点击');
      };
    }
  }
}
</script>
