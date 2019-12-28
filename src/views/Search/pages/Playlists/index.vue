<style lang="less" scoped>
.list {
  display: flex;
  flex-direction: column;
  .item {
    display: flex;
    font-size: 13px;
    padding: 7px 0;
    align-items: center;
  }
  .item:hover {
    background-color: var(--stripedHover);
  }
  .coverImgUrl {
    margin-left: 30px;
  }
  .name {
    flex: 1;
    margin-left: 30px;
    color: var(--black);
    font-weight: 500;
    font-size: 14px;
  }
  .trackCount {
    width: 13%;
    color: var(--textColor);
    font-size: 12px;
  }
  .creator {
    width: 20%;
    text-align: left;
    color: var(--textColor);
    font-weight: normal;
    font-size: 12px;
  }
}
.pagination {
  width: 100%;
  display: flex;
  justify-content: center;
  align-content: center;
}
.striped {
  background-color: var(--striped);
}
</style>

<template>
  <dl class="list">
    <dd
      class="item"
      :class="{'striped':index%2===0}"
      v-for="(playlist,index) in data.playlists"
      :key="playlist.id"
      @click="handleGoPlaylist(playlist)"
    >
      <a-avatar
        class="coverImgUrl"
        :size="60"
        shape="square"
        icon="user"
        :src="playlist.coverImgUrl&&playlist.coverImgUrl"
      />
      <span class="name">{{(playlist.name)}}</span>
      <span class="trackCount">{{playlist.trackCount}}首</span>
      <b class="creator" v-show="playlist.creator.nickname">by&nbsp;{{playlist.creator.nickname}}</b>
    </dd>
    <div class="pagination">
      <a-pagination
        v-model="current"
        :total="countfilter(data.playlistCount)"
        :defaultPageSize="100"
        @change="handleChangeSize"
      />
    </div>
  </dl>
</template>
<script lang="ts">
import { Component, Vue, Prop, Watch, Emit } from 'vue-property-decorator';
import {
  transformW,
  transformatDate,
  transformTimer,
  leftpad,
} from '@/util/filters';
@Component({})
export default class Artists extends Vue {
  @Prop() public data: any;
  public loading = true;
  public current = 1;
  public count = 0;
  public transformTimer = (e: any) => transformTimer(e);
  public countfilter(count: number) {
    let result = 0;
    if (count) {
      result = count;
      this.count = count;
    } else {
      result = this.count;
    }
    return result;
  }

  public handleGoPlaylist(item: any) {
    this.$router.push({
      path: '/music-detail',
      query: { ...item },
    });
  }
  @Emit('on-pagination')
  public handleChangeSize(page: any) {
    // this.current = page;
    this.loading = true;
    return page;
  }
}
</script>