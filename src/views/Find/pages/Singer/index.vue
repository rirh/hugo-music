<style lang="less" scoped>
.singer {
  display: flex;
  align-content: center;
  justify-content: flex-start;
  flex-direction: column;
  padding: 2vw;
  &-types {
    display: flex;
    align-content: center;
    justify-content: center;
    flex-wrap: wrap;
  }
  &-capps {
    display: flex;
    align-content: center;
    justify-content: center;
    flex-wrap: wrap;
  }
}
</style>

<template>
  <a-skeleton :loading="loadingSinger" active>
    <div class="singer">
      <div class="singer-types">
        <div>
          <strong>分类：</strong>
        </div>
        <div>
          <span v-for="(type,tindex) in types" :key="tindex">
            <a-checkable-tag
              :key="tindex"
              :checked="type.key===selectedTypes"
              @change="selectedTypes=type.key"
            >{{type.name}}</a-checkable-tag>
            <a-divider type="vertical" />
          </span>
        </div>
      </div>
      <div class="singer-capps">
        <div>
          <strong>筛选：</strong>
        </div>
        <div>
          <span>
            <a-checkable-tag :key="''" :checked="''===selectedCapps" @change="selectedCapps=''">全部</a-checkable-tag>
            <a-divider type="vertical" />
          </span>
          <span v-for="(type,cindex) in Capps" :key="cindex">
            <a-checkable-tag
              :key="type"
              :checked="type===selectedCapps"
              @change="selectedCapps=type"
            >{{type}}</a-checkable-tag>
            <a-divider type="vertical" />
          </span>
        </div>
      </div>
      <Singers :data="data"></Singers>
    </div>
  </a-skeleton>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import { ERROR_IMG } from '@/constant/api';
import { get_artist_list } from '@/actions';
import Singers from './components/Siners.vue';
import {
  transformTimer,
  leftpad,
  scliceValue,
  transformW,
} from '@/util/filters';

@Component({ components: { Singers } })
export default class Singer extends Vue {
  public errorImg = ERROR_IMG;
  public loadingSinger = true;
  public Capps = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  public selectedTypes = '';
  public selectedCapps = '';
  public types = [
    {
      name: '全部',
      key: '',
    },

    {
      name: '华语男歌手',
      key: 1001,
    },
    {
      name: '华语女歌手',
      key: 1002,
    },
    {
      name: '华语组合/乐队',
      key: 1003,
    },
    {
      name: '欧美男歌手',
      key: 2001,
    },
    {
      name: '欧美女歌手',
      key: 2002,
    },
    {
      name: '欧美组合/乐队',
      key: 2003,
    },
    {
      name: '日本男歌手',
      key: 6001,
    },
    {
      name: '日本女歌手',
      key: 6002,
    },
    {
      name: '日本组合/乐队',
      key: 6003,
    },
    {
      name: '韩国男歌手',
      key: 7001,
    },
    {
      name: '韩国女歌手',
      key: 7002,
    },
    {
      name: '韩国组合/乐队',
      key: 7003,
    },
    {
      name: '其他男歌手',
      key: 4001,
    },
    {
      name: '其他女歌手',
      key: 4002,
    },
    {
      name: '其他组合/乐队',
      key: 4003,
    },
  ];
  public data = [];

  public transformW = (e: any) => transformW(e);

  public async mounted() {
    this.init();
  }
  @Watch('selectedCapps')
  @Watch('selectedTypes')
  public async init() {
    const { code, artists } = await get_artist_list(
      `limit=100&cat=${this.selectedTypes}&initial=${this.selectedCapps}`,
    );
    this.loadingSinger = false;
    if (code === 200) {
      this.data = artists;
    }
  }

  public handleMusicDetail(item: any) {
    this.$router.push({
      path: '/find/music/detail',
      query: { ...item },
    });
  }
  public handleMusic(item: any) {return false; }
}
</script>
