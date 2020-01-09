<style lang="less" scoped>
.list {
  display: flex;
  flex-direction: column;
  .head span {
    display: flex;
    justify-content: flex-start;
    align-content: center;
    color: var(--textColor);
    font-weight: normal;
  }
  .head,
  .item {
    display: flex;
    font-size: 13px;
    padding: 7px 0;
  }
  .item:hover {
    background-color: var(--stripedHover);
  }
  .name {
    flex: 1;
    margin-left: 30px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    display: block;
    span {
      margin-right: 10px;
      color: var(--textColor);
    }
    b {
      color: var(--link);
      font-weight: normal;
    }
  }
  .artists {
    margin-left: 10px;
    width: 10%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    display: block;
  }
  .album {
    margin-left: 10px;
    width: 25%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    display: block;
  }
  .duration {
    margin-left: 10px;
    width: 10%;
    overflow: hidden;
    color: var(--textColor);
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
    <dt class="head">
      <span class="name" style="padding-left: 72px;">音乐标题</span>
      <span class="artists">歌手</span>
      <span class="album">专辑</span>
      <span class="duration">时长</span>
    </dt>
    <dd
      class="item"
      :class="{'striped':index%2===0}"
      v-for="(song,index) in data.songs"
      :key="song.id"
      @click="handlePlay(song)"
    >
      <span class="name">
        <span>{{indexfilter(index)}}</span>
        <span>
          <AIconfont class="icon heart" type="icon-heart"></AIconfont>
        </span>
        <span>
          <AIconfont class="icon download" type="icon-Addtodownload-copy"></AIconfont>
        </span>
        <b>{{song.name}}</b>
      </span>
      <span class="artists">{{artistsfilter(song.artists)}}</span>
      <span class="album">{{song.album.name}}</span>
      <span class="duration">{{transformTimer(song.duration/1000)}}</span>
    </dd>
    <div class="pagination">
      <a-pagination
        v-model="current"
        :total="countfilter(data.songCount)"
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
export default class Songs extends Vue {
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
  @Watch('data', { deep: true })
  public handleCloseLoading() {
    this.loading = false;
  }
  public indexfilter(index: number) {
    // return Number(index) * Number(this.current) < 9
    //   ? `0${index + 1}`
    //   : this.current * index + 1;
    index = index + 1 + (this.current - 1) * 100;
    return index >= 10 ? index : `0${index}`;
  }
  public artistsfilter(item: any) {
    let result = '';
    const name = item.map((e: any) => e.name).join(',');
    if (name) {
      result = name;
    }
    return result;
  }
  public handlePlay(args: any) {
    const params = {
      id: args.id,
      name: args.name,
      auth: args.artists
        .map((e: any) => e.name)
        .toString()
        .split(',')
        .join('/'),
      image: args.album.artist.img1v1Url,
      duration: args.duration,
    };
    this.$store.commit('update_music_data', params);
  }
  @Emit('on-pagination')
  public handleChangeSize(page: any) {
    // this.current = page;
    this.loading = true;
    return page;
  }
}
</script>