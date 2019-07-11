<style lang="less" scoped>
.tabs {
  text-align: left;
}
</style>

<template>
  <a-skeleton :loading="loadingDetail" active>
    <a-tabs class="tabs" defaultActiveKey="1" @change="callback">
      <a-tab-pane class="tasb-list" tab="歌曲列表" key="1">
        <Song :data="songs" />
      </a-tab-pane>
      <a-tab-pane :tab="`评论 ${playlist.commentCount}`" key="2" forceRender>Content of Tab Pane 2</a-tab-pane>
      <a-tab-pane tab="收藏者" key="3">Content of Tab Pane 3</a-tab-pane>
      <!-- <a-button slot="tabBarExtraContent">Extra Action</a-button> -->
    </a-tabs>
  </a-skeleton>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import { ERROR_IMG } from '@/constant/api';
import { transformW, transformatDate } from '@/util/filters';
import { get_play_song_detail } from '@/actions';
import Song from './Song.vue';

@Component({ components: { Song } })
export default class Home extends Vue {
  public errorImg = ERROR_IMG;
  public showDescription = false;
  public loadingDetail = true;
  public songs = [];
  @Prop() public data: any;
  @Prop() public playlist: any;

  public transformW = (e: any) => transformW(e);
  public transformatDate = (e: any) => transformatDate(e, false);
  @Watch('data')
  public async handleChange(arg: any) {
    if (arg) {
      this.loadingDetail = false;
      const ids = this.data.map(({ id }: any) => id);
      const { code, songs } = await get_play_song_detail(
        `ids=${ids.toString()}`,
      );
      if (code === 200) { this.songs = songs; }
    }
  }
  public callback() {
    const a = 1;
  }
}
</script>
