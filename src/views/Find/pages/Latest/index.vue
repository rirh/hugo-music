<style lang="less">
.types {
  margin: 0 0 1vw 1vw;
  text-align: left;
}
</style>

<template>
  <a-tabs defaultActiveKey="1">
    <a-tab-pane tab="新歌速递" key="1">
      <div class="types">
        <span v-for="(type,tindex) in songstype" :key="tindex">
          <a-checkable-tag
            :key="tindex"
            :checked="type.key===selectedTypes"
            @change="selectedTypes=type.key"
          >{{type.lable}}</a-checkable-tag>
          <a-divider type="vertical" />
        </span>
      </div>

      <Song :data="songs"></Song>
    </a-tab-pane>
    <a-tab-pane tab="新碟上架" key="2" forceRender>
      <Album :data="albums"></Album>
    </a-tab-pane>
  </a-tabs>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import { get_top_song, get_top_album } from '@/actions';
import Song from './pages/NewSong.vue';
import Album from './pages/NewAlbum.vue';

@Component({
  components: { Song, Album },
})
export default class Home extends Vue {
  public songs = [];
  public albums = [];
  public selectedTypes = 0;
  public songstype = [
    {
      lable: '全部',
      key: 0,
    },
    {
      lable: '华语',
      key: 7,
    },
    {
      lable: '欧美',
      key: 96,
    },
    {
      lable: '日本',
      key: 8,
    },
    {
      lable: '韩国',
      key: 16,
    },
  ];
  public mounted() {
    this.initSong();
    this.initAlbum();
  }
  @Watch('selectedTypes')
  public async initSong() {
    const { code, data } = await get_top_song(`type=${this.selectedTypes}`);
    if (code === 200) { this.songs = data; }
  }
  public async initAlbum() {
    const { code, albums } = await get_top_album(``);
    if (code === 200) { this.albums = albums; }
  }
}
</script>
