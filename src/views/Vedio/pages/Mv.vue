<style lang="less" scoped>
.wapper {
  padding: 1vw 2vw 5vw 2vw;
  &-item {
    &-dt {
      display: flex;
      justify-content: space-between;
      align-items: center;
      &-tags {
        flex: 0 0 50%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-weight: bold;
      }
    }
  }
}
</style>

<template>
  <a-skeleton :loading="loading" active>
    <div class="wapper">
      <div class="wapper-item">
        <div class="wapper-item-dt">
          <h3>最新MV</h3>
          <span class="wapper-item-dt-tags">
            <span
              @click="initFirstMv(item.name==='全部'?'':item.name)"
              v-for="(item,index) in tags"
              :key="index"
            >{{item.name}}</span>
          </span>
        </div>
        <Lists :data="firstmv" @on-item="handleItem" />
      </div>
      <div class="wapper-item">
        <div class="wapper-item-dt">
          <h3>网易出品</h3>
        </div>
        <Lists :data="exclusicve" @on-item="handleItem" />
      </div>
      <div class="wapper-item">
        <div class="wapper-item-dt">
          <h3>MV排行榜</h3>
          <span class="wapper-item-dt-tags">
            <span
              @click="iniTopMV(item.name==='全部'?'':item.name)"
              v-for="(item,index) in tags"
              :key="index"
            >{{item.name}}</span>
          </span>
        </div>
        <Top :data="top" @on-item="handleItem" />
      </div>
    </div>
  </a-skeleton>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import {
  get_video_group_list,
  get_video_group,
  get_video_detail,
  get_mv_first,
  get_mv_exclusicve_rcmd,
  get_top_mv,
  get_mv_detail,
} from '@/actions';
import Tags from './vedio/Tag.vue';
import Lists from './mv/List.vue';
import Top from './mv/Top.vue';
import axios from 'axios';
@Component({ components: { Tags, Lists, Top } })
export default class Radio extends Vue {
  public loading = false;
  public data = [];
  public firstmv = {};
  public exclusicve = {};
  public top = {};
  public tags = [
    {
      name: '全部',
    },
    {
      name: '内地',
    },
    {
      name: '港台',
    },
    {
      name: '欧美',
    },
    {
      name: '日本',
    },
    {
      name: '韩国',
    },
  ];
  public async mounted() {
    this.loading = true;
    await axios.all([
      this.initFirstMv(''),
      this.initExclusicveRcmd(30),
      this.iniTopMV(''),
    ]);
    this.loading = false;
  }

  public async initFirstMv(args: any) {
    const res = await get_mv_first(`area=${args}`);
    if (res.code === 200) {
      this.firstmv = res;
    }
  }
  public async initExclusicveRcmd(args: any) {
    const res = await get_mv_exclusicve_rcmd(``);
    if (res.code === 200) {
      this.exclusicve = res;
    }
  }
  public async iniTopMV(args: any) {
    const res = await get_top_mv(`area=${args}`);
    if (res.code === 200) {
      this.top = res;
    }
  }
  public async handleItem(item: any) {
    const res = await get_mv_detail(`mvid=${item.id}`);
    if (res.code === 200) {
      this.$store.commit('update_vedio_cursor', res);
      this.$store.commit('update_show_vedio_page', true);
      this.$router.push({
        path: '/mv-detail',
        query: res,
      });
    }
  }
}
</script>
