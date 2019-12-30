<style lang="less" scoped>
.wapper {
  height: 100%;
  overflow: hidden;
  .panel {
    padding: 20px 20px 0 30px;
    border-bottom: solid 1px var(--line);
    height: 15vh;
    overflow: hidden;
    box-shadow: 0px 2px 2px #efefef;
    -webkit-box-shadow: 0px 2px 2px #efefef;
    -moz-box-shadow: 0px 2px 2px #efefef;
  }
  .con {
    height: 68vh;
    overflow: scroll;
  }
}
</style>

<template>
  <div class="wapper">
    <div class="panel">
      <Panel :keywords="keywords" :type="type_label" :count="count" @on-item="handleChangeType" />
    </div>
    <div class="con">
      <a-skeleton active :loading="loading">
        <components :is="components" :data="data" @on-pagination="handleChangePage"></components>
      </a-skeleton>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import { get_search } from '@/actions';
import Panel from './Panel/index.vue';
import Songs from './Songs/index.vue';
import Artists from './Artists/index.vue';
import Albums from './Albums/index.vue';
import Videos from './Videos/index.vue';
import Playlists from './Playlists/index.vue';
import Userprofiles from './Userprofiles/index.vue';
@Component({
  components: { Panel, Songs, Artists, Albums, Videos, Playlists, Userprofiles },
})
export default class SearchMain extends Vue {
  public keywords: string = '';
  public type_label = '单曲';
  public type_value = 1;
  public count: any = 0;
  public components: any = Songs;
  public data: any = {};
  public limit = 100;
  public offset = 1;
  public loading = true;

  public mounted() {
    // this.type_label = "单曲";
    this.init();
  }
  public beforeRouteEnter(to: any, from: any, next: any) {
    next();
  }
  @Watch('$route.query', { deep: true })
  public init() {
    this.loading = true;
    const {
      query: { keywords, type },
    }: any = this.$route;
    if (keywords) {
      this.keywords = keywords;
    }
    if (type) {
      this.type_value = Number(type);
    }
    this.handleQueryList();
  }
  public async handleQueryList() {
    const params = `keywords=${this.keywords}&type=${
      this.type_value
    }&limit=100&offset=${(this.offset - 1) * 100}`;
    const res = await get_search(params);
    this.loading = false;
    if (res.code === 200) {
      const object = res.result;
      this.data = object;
      switch (this.type_value) {
        case 1:
          this.components = Songs;
          break;
        case 100:
          this.components = Artists;
          break;
        case 10:
          this.components = Albums;
          break;
        case 1014:
          this.components = Videos;
          break;
        case 1000:
          this.components = Playlists;
          break;
        case 1002:
          this.components = Userprofiles;
          break;

        default:
          this.components = '';
          break;
      }
      for (const key in object) {
        if (object.hasOwnProperty(key)) {
          const element = object[key];
          if (typeof element === 'number') {
            this.count = element;
          }
        }
      }
    }
  }
  public handleChangePage(page: any) {
    this.offset = page;

    this.handleQueryList();
  }
  public async handleChangeType(list: any) {
    if (list.value === this.type_value) {
      return;
    }
    this.loading = true;
    this.type_label = list.label;
    this.type_value = list.value;
    this.count = ' ';
    this.offset = 1;
    this.handleQueryList();
  }
}
</script>