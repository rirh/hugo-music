<style lang="less" scoped>
.detail {
  margin: 2vw;
}
</style>

<template>
  <div class="detail">
    <Panel :data="album" />
    <MusicTable :data="privileges" :playlist="songs" />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import { get_play_list_detail, get_album_detail } from '@/actions';
import { ERROR_IMG } from '@/constant/api';
import { transformW, transformatDate } from '@/util/filters';
import Panel from './components/panel.vue';
import MusicTable from './components/tabs.vue';
@Component({ components: { Panel, MusicTable } })
export default class Home extends Vue {
  public errorImg = ERROR_IMG;
  public album = {};
  public privileges = {};
  public songs = {};
  public showDescription = false;
  public loadingDetail = true;
  public transformW = (e: any) => transformW(e);
  public transformatDate = (e: any) => transformatDate(e, false);
  public mounted() {
    const params = this.$route.query;
    if (params.id) {
      this.init(params.id);
    }
  }
  @Watch('$route.query')
  public handleChange(params: any) {
    if (params.id) {
      this.init(params.id);
    }
  }
  public async init(id: any) {
    const { code, songs, album } = await get_album_detail(
      `id=${id}`,
    );
    this.loadingDetail = false;
    if (code === 200) {
      this.album = album;
      this.songs = songs;
      this.privileges = album;
    }
  }
}
</script>
