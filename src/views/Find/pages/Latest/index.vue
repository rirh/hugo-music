<style lang="less">
</style>

<template>
  <a-tabs defaultActiveKey="1">
    <a-tab-pane tab="新歌速递" key="1">
      <Song :data="songs"></Song>
    </a-tab-pane>
    <a-tab-pane tab="新碟上架" key="2" forceRender>
      <Album :data="albums"></Album>
    </a-tab-pane>
  </a-tabs>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { get_top_song, get_top_album } from '@/actions';
import Song from './pages/NewSong.vue';
import Album from './pages/NewAlbum.vue';

@Component({
  components: { Song, Album },
})
export default class Home extends Vue {
  public songs = [];
  public albums = [];
  public mounted() {
    this.initSong();
    this.initAlbum();
  }
  public async initSong() {
    const { code, data } = await get_top_song(``);
    if (code === 200) { this.songs = data; }

  }
  public async initAlbum() {
    const { code, albums } = await get_top_album(``);
    if (code === 200) { this.albums = albums; }
  }
}
</script>
