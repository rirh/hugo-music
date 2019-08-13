<style lang="less" scoped>
.wapper {
  padding: 1vw;
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
import { get_video_group_list, get_video_group } from '@/actions';
import Tags from './vedio/Tag.vue';
import Lists from './vedio/List.vue';
@Component({ components: { Tags, Lists } })
export default class Radio extends Vue {
  public loading = false;
  public data = {};
  public tags = {};
  public async mounted() {
    this.initTags();
    this.init({});
  }
  public async init(item: any) {
    const res = await get_video_group(item ? `id=${item.id}` : '');
    if (res.code === 200) { this.data = res.datas; }
  }
  public async initTags() {
    const res = await get_video_group_list();
    if (res.code === 200) { this.tags = res.data; }
  }
  public handleItem(item: any) {
    this.$router.push({
      path: '/vedio',
      query: item,
    });
    this.$store.commit('updata_vedio_cursor', item);
    this.$store.commit('updata_show_vedio_page', true);
  }

  public handleType(item: any) {
    this.init(item);
  }
}
</script>
