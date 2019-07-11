<style lang="less" scoped>
.detail {
  margin: 2vw;
}
</style>

<template>
  <div class="detail">
    <Panel :data="playlist" />
    <MusicTable :data="privileges" :playlist="playlist" />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { get_play_list_detail, get_play_song_detail } from '@/actions';
import { ERROR_IMG } from '@/constant/api';
import { transformW, transformatDate } from '@/util/filters';
import Panel from './components/panel.vue';
import MusicTable from './components/tabs.vue';
@Component({ components: { Panel, MusicTable } })
export default class Home extends Vue {
  public errorImg = ERROR_IMG;
  public playlist = {};
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

  public async init(id: any) {
    const { code, playlist, privileges } = await get_play_list_detail(
      `id=${id}`,
    );
    this.loadingDetail = false;
    if (code === 200) {
      this.playlist = playlist;
      this.privileges = privileges;
    }
  }
}
</script>
