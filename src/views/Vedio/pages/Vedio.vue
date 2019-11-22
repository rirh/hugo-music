<style lang="less" scoped>
.wapper {
  padding: 1vw 1vw 5vw 1vw;
}
</style>

<template>
  <a-skeleton :loading="loading" active>
    <div class="wapper">
      <Tags :data="tags" @on-type="handleType" />
      <Lists :data="data" @on-item="handleItem" />
    </div>
  </a-skeleton>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import {
  get_video_group_list,
  get_video_group,
  get_video_detail,
} from '@/actions';
import Tags from './vedio/Tag.vue';
import Lists from './vedio/List.vue';
@Component({ components: { Tags, Lists } })
export default class Radio extends Vue {
  public loading = false;
  public data = [];
  public tags = {};
  public async mounted() {
    await this.initTags();
    this.init((this as any).tags[1]);
  }
  public async init(item: any) {
    this.data = [];
    const res = await get_video_group(item ? `id=${item.id}` : '');
    if (res.code === 200) {
      this.data = res.datas;
    }
  }
  public async initTags() {
    const res = await get_video_group_list();
    if (res.code === 200) {
      this.tags = res.data;
    }
  }
  public async handleItem(item: any) {
    const res = await get_video_detail(`id=${item.data.vid}`);
    if (res.code === 200) {
      this.$store.commit('update_vedio_cursor', res);
      this.$store.commit('update_show_vedio_page', true);
      this.$router.push({
        path: '/vedio-detail',
        query: res,
      });
    }
  }

  public handleType(item: any) {
    this.init(item);
  }
}
</script>
